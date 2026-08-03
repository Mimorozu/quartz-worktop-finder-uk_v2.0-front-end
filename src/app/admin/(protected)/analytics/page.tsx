import { prisma } from "@/lib/prisma";

export const metadata = { title: "Analytics" };

export default async function AnalyticsPage() {
  const [
    companies,
    clicksByCompanyAndType,
    lastClickByCompany,
    totalReveals,
    totalWebsiteClicks,
    recentActivity,
    totalSearches,
    totalPaidUnlocks,
    paidRevenue,
  ] = await Promise.all([
    prisma.company.findMany({
      select: { id: true, companyName: true },
    }),
    prisma.websiteClick.groupBy({
      by: ["companyId", "clickType"],
      _count: { _all: true },
    }),
    prisma.websiteClick.groupBy({
      by: ["companyId"],
      _max: { clickedAt: true },
    }),
    prisma.websiteClick.count({ where: { clickType: "contact_reveal" } }),
    prisma.websiteClick.count({ where: { clickType: "website" } }),
    prisma.websiteClick.findMany({
      orderBy: { clickedAt: "desc" },
      take: 20,
      include: { company: { select: { companyName: true } } },
    }),
    prisma.searchLog.count(),
    prisma.searchUnlock.count({ where: { status: "paid" } }),
    prisma.searchUnlock.aggregate({
      where: { status: "paid" },
      _sum: { amount: true },
    }),
  ]);

  const conversionRate = totalSearches > 0 ? (totalPaidUnlocks / totalSearches) * 100 : 0;
  const totalRevenue = (paidRevenue._sum.amount ?? 0) / 100;

  const countFor = (companyId: number, clickType: "contact_reveal" | "website") =>
    clicksByCompanyAndType.find(
      (row) => row.companyId === companyId && row.clickType === clickType
    )?._count._all ?? 0;

  const lastClickFor = (companyId: number) =>
    lastClickByCompany.find((row) => row.companyId === companyId)?._max.clickedAt ?? null;

  const leaderboard = companies
    .map((company) => {
      const contactReveals = countFor(company.id, "contact_reveal");
      const websiteClicks = countFor(company.id, "website");
      return {
        ...company,
        contactReveals,
        websiteClicks,
        totalClicks: contactReveals + websiteClicks,
        lastClick: lastClickFor(company.id),
      };
    })
    .sort((a, b) => b.contactReveals - a.contactReveals || a.companyName.localeCompare(b.companyName));

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-white mb-1.5">Lead Analytics</h1>
        <p className="text-muted-light">Track which stone masons are getting the most interest</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
        <StatCard label="Total Contact Reveals" value={totalReveals} />
        <StatCard label="Total Website Clicks" value={totalWebsiteClicks} />
        <StatCard label="Companies Listed" value={companies.length} />
      </div>

      <div className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-light">
        Search → Payment Funnel
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        <StatCard label="Postcode Searches" value={totalSearches} />
        <StatCard label="Paid Unlocks" value={totalPaidUnlocks} />
        <StatCard
          label="Total Revenue"
          value={totalRevenue.toLocaleString("en-GB", { style: "currency", currency: "GBP" })}
        />
        <StatCard label="Conversion Rate" value={`${conversionRate.toFixed(1)}%`} />
      </div>

      <div className="bg-slate rounded-xl border border-border-dark overflow-hidden mb-8">
        <div className="px-6 py-5 bg-slate-dark border-b border-border-dark">
          <h2 className="text-lg font-semibold text-white">Leads by Company</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] border-collapse">
            <thead>
              <tr>
                {["Company Name", "Contact Reveals", "Website Clicks", "Total", "Last Activity"].map(
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
              {leaderboard.map((row) => (
                <tr key={row.id} className="hover:bg-slate-dark/60">
                  <td className="px-6 py-4 font-semibold text-white border-b border-border-dark">
                    {row.companyName}
                  </td>
                  <td className="px-6 py-4 border-b border-border-dark">
                    <Badge value={row.contactReveals} />
                  </td>
                  <td className="px-6 py-4 border-b border-border-dark">
                    <Badge value={row.websiteClicks} color="#4299e1" />
                  </td>
                  <td className="px-6 py-4 text-muted-light border-b border-border-dark">
                    {row.totalClicks}
                  </td>
                  <td className="px-6 py-4 text-muted-light border-b border-border-dark">
                    {row.lastClick ? row.lastClick.toLocaleString("en-GB") : "Never"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-slate rounded-xl border border-border-dark overflow-hidden">
        <div className="px-6 py-5 bg-slate-dark border-b border-border-dark">
          <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse">
            <thead>
              <tr>
                {["Company", "Action", "Postcode Searched", "When"].map((heading) => (
                  <th
                    key={heading}
                    className="text-left px-6 py-4 bg-slate-dark text-sm font-semibold uppercase tracking-wide border-b border-border-dark"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentActivity.length > 0 ? (
                recentActivity.map((click) => (
                  <tr key={click.id} className="hover:bg-slate-dark/60">
                    <td className="px-6 py-4 font-semibold text-white border-b border-border-dark">
                      {click.company.companyName}
                    </td>
                    <td className="px-6 py-4 border-b border-border-dark">
                      {click.clickType === "contact_reveal" ? (
                        <span className="text-gold font-semibold">📞 Contact Reveal</span>
                      ) : (
                        <span className="text-[#4299e1]">🌐 Website Click</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-muted-light border-b border-border-dark">
                      {click.userPostcode}
                    </td>
                    <td className="px-6 py-4 text-muted-light border-b border-border-dark">
                      {click.clickedAt.toLocaleString("en-GB")}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center text-muted-light py-10">
                    No activity tracked yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function StatCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="bg-slate p-6 rounded-xl border border-border-dark">
      <div className="text-muted-light text-sm uppercase tracking-wide mb-2">{label}</div>
      <div className="text-4xl font-bold text-gold">
        {typeof value === "number" ? value.toLocaleString("en-GB") : value}
      </div>
    </div>
  );
}

function Badge({ value, color }: { value: number; color?: string }) {
  return (
    <span
      className="inline-block px-3 py-1 rounded-full font-semibold text-sm text-white"
      style={{ backgroundColor: value === 0 ? "#4a5568" : color ?? "#d69e2e" }}
    >
      {value}
    </span>
  );
}
