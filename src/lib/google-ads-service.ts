import "server-only";
import { enums, resources, toMicros, fromMicros, ResourceNames } from "google-ads-api";
import { getGoogleAdsCustomer } from "@/lib/google-ads";

export type CampaignSummary = {
  id: string;
  name: string;
  status: string;
  dailyBudget: number;
  clicks: number;
  impressions: number;
  cost: number;
  conversions: number;
  conversionsValue: number;
};

export async function listCampaigns(): Promise<CampaignSummary[]> {
  const customer = getGoogleAdsCustomer();

  const rows = await customer.report({
    entity: "campaign",
    attributes: ["campaign.id", "campaign.name", "campaign.status", "campaign_budget.amount_micros"],
    metrics: [
      "metrics.clicks",
      "metrics.impressions",
      "metrics.cost_micros",
      "metrics.conversions",
      "metrics.conversions_value",
    ],
    date_constant: "LAST_30_DAYS",
  });

  return rows.map((row) => ({
    id: String(row.campaign?.id ?? ""),
    name: row.campaign?.name ?? "",
    status: String(row.campaign?.status ?? "UNKNOWN"),
    dailyBudget: fromMicros(row.campaign_budget?.amount_micros ?? 0),
    clicks: Number(row.metrics?.clicks ?? 0),
    impressions: Number(row.metrics?.impressions ?? 0),
    cost: fromMicros(row.metrics?.cost_micros ?? 0),
    conversions: Number(row.metrics?.conversions ?? 0),
    conversionsValue: Number(row.metrics?.conversions_value ?? 0),
  }));
}

export async function createCampaign({
  name,
  dailyBudgetGbp,
  finalUrl,
  keywords,
}: {
  name: string;
  dailyBudgetGbp: number;
  finalUrl: string;
  keywords: string[];
}): Promise<void> {
  const customer = getGoogleAdsCustomer();
  const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID!;
  const budgetResourceName = ResourceNames.campaignBudget(customerId, "-1");

  // Step 1: budget + campaign, created PAUSED so nothing spends before review.
  const budgetAndCampaign = await customer.mutateResources([
    {
      entity: "campaign_budget",
      operation: "create",
      resource: {
        resource_name: budgetResourceName,
        name: `${name} Budget`,
        delivery_method: enums.BudgetDeliveryMethod.STANDARD,
        amount_micros: toMicros(dailyBudgetGbp),
      },
    },
    {
      entity: "campaign",
      operation: "create",
      resource: {
        name,
        status: enums.CampaignStatus.PAUSED,
        advertising_channel_type: enums.AdvertisingChannelType.SEARCH,
        maximize_conversions: {},
        campaign_budget: budgetResourceName,
        network_settings: {
          target_google_search: true,
          target_search_network: false,
          target_content_network: false,
        },
      },
    },
  ] as never);

  const campaignResourceName =
    budgetAndCampaign.mutate_operation_responses?.[1]?.campaign_result?.resource_name;
  if (!campaignResourceName) {
    throw new Error("Google Ads did not return a campaign resource name.");
  }

  // Step 2: ad group under the new campaign.
  const adGroupResult = await customer.mutateResources([
    {
      entity: "ad_group",
      operation: "create",
      resource: {
        name: `${name} Ad Group`,
        campaign: campaignResourceName,
        status: enums.AdGroupStatus.ENABLED,
        type: enums.AdGroupType.SEARCH_STANDARD,
      },
    },
  ] as never);

  const adGroupResourceName =
    adGroupResult.mutate_operation_responses?.[0]?.ad_group_result?.resource_name;
  if (!adGroupResourceName) {
    throw new Error("Google Ads did not return an ad group resource name.");
  }

  // Step 3: keywords + a single responsive search ad in the new ad group.
  await customer.mutateResources([
    ...keywords.map((keyword) => ({
      entity: "ad_group_criterion" as const,
      operation: "create" as const,
      resource: {
        ad_group: adGroupResourceName,
        status: enums.AdGroupCriterionStatus.ENABLED,
        keyword: {
          text: keyword,
          match_type: enums.KeywordMatchType.PHRASE,
        },
      },
    })),
    {
      entity: "ad_group_ad",
      operation: "create",
      resource: {
        ad_group: adGroupResourceName,
        status: enums.AdGroupAdStatus.ENABLED,
        ad: {
          final_urls: [finalUrl],
          responsive_search_ad: {
            headlines: [
              { text: name.slice(0, 30) },
              { text: "Free UK Directory".slice(0, 30) },
              { text: "Find Local Specialists".slice(0, 30) },
            ],
            descriptions: [
              { text: "Compare verified quartz worktop specialists near you. No middlemen." },
              { text: "Search by postcode and connect directly with local fabricators." },
            ],
          },
        },
      },
    },
  ] as never);
}

export async function setCampaignStatus(
  campaignId: string,
  status: "ENABLED" | "PAUSED"
): Promise<void> {
  const customer = getGoogleAdsCustomer();
  const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID!;

  await customer.campaigns.update([
    {
      resource_name: `customers/${customerId}/campaigns/${campaignId}`,
      status: enums.CampaignStatus[status],
    } as resources.ICampaign,
  ]);
}

export async function updateCampaignBudget(
  campaignId: string,
  dailyBudgetGbp: number
): Promise<void> {
  const customer = getGoogleAdsCustomer();
  const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID!;

  const [campaign] = await customer.report({
    entity: "campaign",
    attributes: ["campaign_budget.resource_name"],
    constraints: { "campaign.id": campaignId },
    limit: 1,
  });

  const budgetResourceName = campaign?.campaign_budget?.resource_name;
  if (!budgetResourceName) {
    throw new Error(`Could not find budget for campaign ${campaignId} (customer ${customerId}).`);
  }

  await customer.campaignBudgets.update([
    {
      resource_name: budgetResourceName,
      amount_micros: toMicros(dailyBudgetGbp),
    },
  ]);
}
