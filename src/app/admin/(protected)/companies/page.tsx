import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "All Companies" };

export default async function CompaniesPage({
  searchParams,
}: {
  searchParams: Promise<{ added?: string; updated?: string; deleted?: string }>;
}) {
  const { added, updated, deleted } = await searchParams;

  const companies = await prisma.company.findMany({
    orderBy: { companyName: "asc" },
  });

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-white mb-1.5">All Companies</h1>
        <p className="text-muted-light">Manage your stone mason directory</p>
      </div>

      {(added || updated || deleted) && (
        <div className="bg-success-bg text-success-text border border-success-border rounded-lg px-5 py-4 mb-6 font-medium">
          {added && "✓ Company added successfully!"}
          {updated && "✓ Company updated successfully!"}
          {deleted && "✓ Company deleted successfully!"}
        </div>
      )}

      <div className="bg-slate rounded-xl border border-border-dark overflow-hidden">
        <div className="px-6 py-5 bg-slate-dark border-b border-border-dark">
          <h2 className="text-lg font-semibold text-white">Companies</h2>
          <p className="text-muted-light text-sm mt-1">Total: {companies.length} companies</p>
        </div>

        {companies.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] border-collapse">
              <thead>
                <tr>
                  {["Company Name", "Phone", "Email", "City", "County", "Date Added", "Actions"].map(
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
                {companies.map((company) => (
                  <tr key={company.id} className="hover:bg-slate-dark/60">
                    <td className="px-6 py-4 font-semibold text-white border-b border-border-dark">
                      {company.companyName}
                    </td>
                    <td className="px-6 py-4 text-muted-light border-b border-border-dark">
                      {company.phone}
                    </td>
                    <td className="px-6 py-4 text-muted-light border-b border-border-dark">
                      {company.email}
                    </td>
                    <td className="px-6 py-4 text-muted-light border-b border-border-dark">
                      {company.city}
                    </td>
                    <td className="px-6 py-4 text-muted-light border-b border-border-dark">
                      {company.county}
                    </td>
                    <td className="px-6 py-4 text-muted-light border-b border-border-dark">
                      {company.dateAdded.toLocaleDateString("en-GB")}
                    </td>
                    <td className="px-6 py-4 border-b border-border-dark">
                      <Link
                        href={`/admin/companies/${company.id}/edit`}
                        className="text-gold hover:text-gold-dark hover:underline font-medium"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center text-muted-light py-16">
            <div className="text-5xl mb-4 opacity-30">📋</div>
            <h3 className="text-white text-lg mb-2">No companies found</h3>
            <p>Add your first company to get started!</p>
          </div>
        )}
      </div>
    </>
  );
}
