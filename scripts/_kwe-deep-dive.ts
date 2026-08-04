import { GoogleAdsApi, fromMicros } from "google-ads-api";

const apiClient = new GoogleAdsApi({
  client_id: process.env.GOOGLE_ADS_CLIENT_ID!,
  client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
  developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN!,
});

const customer = apiClient.Customer({
  customer_id: process.env.GOOGLE_ADS_CUSTOMER_ID!,
  login_customer_id: process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID || undefined,
  refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN!,
});

const FROM = "2026-01-01";
const TO = "2026-08-03";

async function main() {
  console.log("\n=== KEYWORD PERFORMANCE ===");
  const keywords = await customer.query(`
    SELECT
      ad_group_criterion.keyword.text,
      ad_group_criterion.keyword.match_type,
      metrics.clicks,
      metrics.impressions,
      metrics.cost_micros,
      metrics.conversions,
      metrics.ctr,
      metrics.average_cpc
    FROM keyword_view
    WHERE campaign.name = 'KWE - Search - Birmingham'
      AND segments.date BETWEEN '${FROM}' AND '${TO}'
    ORDER BY metrics.clicks DESC
  `);
  for (const row of keywords) {
    console.log({
      text: row.ad_group_criterion?.keyword?.text,
      matchType: row.ad_group_criterion?.keyword?.match_type,
      clicks: row.metrics?.clicks,
      impressions: row.metrics?.impressions,
      ctr: row.metrics?.ctr,
      avgCpc: fromMicros(row.metrics?.average_cpc ?? 0),
      cost: fromMicros(row.metrics?.cost_micros ?? 0),
      conversions: row.metrics?.conversions,
    });
  }

  console.log("\n=== SEARCH TERMS (actual queries) ===");
  const searchTerms = await customer.query(`
    SELECT
      search_term_view.search_term,
      segments.keyword.info.text,
      metrics.clicks,
      metrics.impressions,
      metrics.cost_micros,
      metrics.conversions
    FROM search_term_view
    WHERE campaign.name = 'KWE - Search - Birmingham'
      AND segments.date BETWEEN '${FROM}' AND '${TO}'
    ORDER BY metrics.clicks DESC
  `);
  for (const row of searchTerms) {
    console.log({
      searchTerm: row.search_term_view?.search_term,
      matchedKeyword: row.segments?.keyword?.info?.text,
      clicks: row.metrics?.clicks,
      impressions: row.metrics?.impressions,
      cost: fromMicros(row.metrics?.cost_micros ?? 0),
      conversions: row.metrics?.conversions,
    });
  }

  console.log("\n=== CLICKS BY HOUR OF DAY ===");
  const byHour = await customer.query(`
    SELECT segments.hour, metrics.clicks, metrics.impressions, metrics.conversions
    FROM campaign
    WHERE campaign.name = 'KWE - Search - Birmingham'
      AND segments.date BETWEEN '${FROM}' AND '${TO}'
    ORDER BY segments.hour ASC
  `);
  for (const row of byHour) {
    console.log({
      hour: row.segments?.hour,
      clicks: row.metrics?.clicks,
      impressions: row.metrics?.impressions,
      conversions: row.metrics?.conversions,
    });
  }

  console.log("\n=== CLICKS BY DAY OF WEEK ===");
  const byDow = await customer.query(`
    SELECT segments.day_of_week, metrics.clicks, metrics.impressions, metrics.conversions
    FROM campaign
    WHERE campaign.name = 'KWE - Search - Birmingham'
      AND segments.date BETWEEN '${FROM}' AND '${TO}'
  `);
  for (const row of byDow) {
    console.log({
      day: row.segments?.day_of_week,
      clicks: row.metrics?.clicks,
      impressions: row.metrics?.impressions,
      conversions: row.metrics?.conversions,
    });
  }

  console.log("\n=== DEVICE ===");
  const byDevice = await customer.query(`
    SELECT segments.device, metrics.clicks, metrics.impressions, metrics.conversions, metrics.cost_micros
    FROM campaign
    WHERE campaign.name = 'KWE - Search - Birmingham'
      AND segments.date BETWEEN '${FROM}' AND '${TO}'
  `);
  for (const row of byDevice) {
    console.log({
      device: row.segments?.device,
      clicks: row.metrics?.clicks,
      impressions: row.metrics?.impressions,
      cost: fromMicros(row.metrics?.cost_micros ?? 0),
      conversions: row.metrics?.conversions,
    });
  }
}

main().catch((err) => {
  console.error("ERROR:", err);
  process.exit(1);
});
