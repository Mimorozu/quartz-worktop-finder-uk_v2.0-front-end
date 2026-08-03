import { isGoogleAdsConfigured } from "@/lib/google-ads";
import { listCampaigns } from "@/lib/google-ads-service";
import {
  createCampaignAction,
  setCampaignStatusAction,
  updateCampaignBudgetAction,
} from "@/lib/actions/google-ads";

export const metadata = { title: "Google Ads" };

const inputClass =
  "w-full px-4 py-3 bg-slate-dark border-2 border-border-dark rounded-lg text-white placeholder:text-muted transition-all focus:outline-none focus:border-gold focus:ring-4 focus:ring-gold/10";
const labelClass = "block mt-5 mb-2 font-semibold text-sm text-white first:mt-0";

export default async function GoogleAdsPage() {
  if (!isGoogleAdsConfigured()) {
    return (
      <div className="bg-slate p-8 rounded-xl border border-border-dark">
        <h1 className="text-2xl font-semibold text-white mb-2">Google Ads</h1>
        <p className="text-muted-light">
          Not configured yet. Add the GOOGLE_ADS_* variables to .env (see{" "}
          <code className="text-gold">scripts/google-ads-auth.ts</code> to mint a refresh token),
          then reload this page.
        </p>
      </div>
    );
  }

  const campaigns = await listCampaigns();

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-white mb-1.5">Google Ads</h1>
        <p className="text-muted-light">Manage campaigns for this site (last 30 days)</p>
      </div>

      <div className="bg-slate rounded-xl border border-border-dark overflow-hidden mb-8">
        <div className="px-6 py-5 bg-slate-dark border-b border-border-dark">
          <h2 className="text-lg font-semibold text-white">Campaigns</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse">
            <thead>
              <tr>
                {["Name", "Status", "Daily Budget", "Clicks", "Impressions", "Cost", "Conversions", "Actions"].map(
                  (heading) => (
                    <th
                      key={heading}
                      className="text-left px-6 py-4 bg-slate-dark text-sm font-semibold uppercase tracking-wide border-b border-border-dark"
                    >
                      {heading}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {campaigns.length > 0 ? (
                campaigns.map((campaign) => (
                  <tr key={campaign.id} className="hover:bg-slate-dark/60">
                    <td className="px-6 py-4 font-semibold text-white border-b border-border-dark">
                      {campaign.name}
                    </td>
                    <td className="px-6 py-4 border-b border-border-dark">
                      <span
                        className={`inline-block px-3 py-1 rounded-full font-semibold text-xs text-white ${
                          campaign.status === "ENABLED" ? "bg-verified" : "bg-[#4a5568]"
                        }`}
                      >
                        {campaign.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 border-b border-border-dark">
                      <form action={updateCampaignBudgetAction} className="flex items-center gap-2">
                        <input type="hidden" name="campaign_id" value={campaign.id} />
                        <span className="text-muted-light">£</span>
                        <input
                          type="number"
                          name="daily_budget"
                          step="0.01"
                          min="1"
                          defaultValue={campaign.dailyBudget}
                          className="w-24 px-2 py-1.5 bg-slate-dark border border-border-dark rounded text-white text-sm"
                        />
                        <button
                          type="submit"
                          className="text-xs font-semibold text-gold hover:text-gold-dark"
                        >
                          Save
                        </button>
                      </form>
                    </td>
                    <td className="px-6 py-4 text-muted-light border-b border-border-dark">
                      {campaign.clicks.toLocaleString("en-GB")}
                    </td>
                    <td className="px-6 py-4 text-muted-light border-b border-border-dark">
                      {campaign.impressions.toLocaleString("en-GB")}
                    </td>
                    <td className="px-6 py-4 text-muted-light border-b border-border-dark">
                      {campaign.cost.toLocaleString("en-GB", { style: "currency", currency: "GBP" })}
                    </td>
                    <td className="px-6 py-4 text-muted-light border-b border-border-dark">
                      {campaign.conversions.toLocaleString("en-GB")}
                    </td>
                    <td className="px-6 py-4 border-b border-border-dark">
                      <form
                        action={setCampaignStatusAction.bind(
                          null,
                          campaign.id,
                          campaign.status === "ENABLED" ? "PAUSED" : "ENABLED"
                        )}
                      >
                        <button
                          type="submit"
                          className="px-3 py-1.5 rounded-md font-medium text-xs border border-border-dark text-muted-light hover:bg-border-dark hover:text-white transition-all"
                        >
                          {campaign.status === "ENABLED" ? "Pause" : "Enable"}
                        </button>
                      </form>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center text-muted-light py-10">
                    No campaigns yet — create one below
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-slate p-6 sm:p-9 rounded-xl border border-border-dark">
        <h2 className="text-lg font-semibold text-white mb-1">New Campaign</h2>
        <p className="text-muted-light text-sm mb-4">
          Created paused, on Search only with Maximize Conversions bidding — review and enable
          from the table above.
        </p>
        <form action={createCampaignAction}>
          <label className={labelClass}>Campaign Name *</label>
          <input
            type="text"
            name="name"
            required
            placeholder="e.g., Quartz Worktops - UK Search"
            className={inputClass}
          />

          <label className={labelClass}>Daily Budget (£) *</label>
          <input
            type="number"
            name="daily_budget"
            step="0.01"
            min="1"
            required
            placeholder="e.g., 20"
            className={inputClass}
          />

          <label className={labelClass}>Destination URL *</label>
          <input
            type="text"
            name="final_url"
            required
            placeholder="https://quartzworktopfinderuk.com/"
            className={inputClass}
          />

          <label className={labelClass}>Keywords *</label>
          <input
            type="text"
            name="keywords"
            required
            placeholder="e.g., quartz worktops, quartz worktop cost, quartz worktop specialists"
            className={inputClass}
          />
          <span className="text-xs text-muted-light mt-1.5 block">
            Comma-separated, added as phrase match
          </span>

          <button
            type="submit"
            className="mt-8 px-6 py-3 rounded-lg font-semibold bg-gold text-white transition-all hover:bg-gold-dark hover:-translate-y-0.5"
          >
            Create Campaign
          </button>
        </form>
      </div>
    </>
  );
}
