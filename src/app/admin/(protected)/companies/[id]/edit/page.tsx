import { notFound } from "next/navigation";
import { CompanyForm } from "@/components/admin/CompanyForm";
import { prisma } from "@/lib/prisma";
import { updateCompany, deleteCompany } from "@/lib/actions/companies";

export const metadata = { title: "Edit Company" };

export default async function EditCompanyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idParam } = await params;
  const id = Number(idParam);

  const company = await prisma.company.findUnique({
    where: { id },
    include: { coveragePostcodes: true },
  });

  if (!company) {
    notFound();
  }

  const postcodeAreas = company.coveragePostcodes
    .map((cp) => cp.postcodeArea)
    .join(", ");

  const updateCompanyWithId = updateCompany.bind(null, id);
  const deleteCompanyWithId = deleteCompany.bind(null, id);

  return (
    <>
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-white mb-1.5">
            Edit {company.companyName}
          </h1>
          <p className="text-muted-light">Update this stone mason&apos;s listing</p>
        </div>
        <form action={deleteCompanyWithId}>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-lg font-medium text-sm border border-border-dark text-red-400 hover:bg-red-950 hover:border-red-800 hover:text-red-300 transition-all"
          >
            Delete Company
          </button>
        </form>
      </div>

      <CompanyForm
        action={updateCompanyWithId}
        submitLabel="Save Changes"
        values={{
          companyName: company.companyName,
          contactName: company.contactName,
          phone: company.phone,
          email: company.email,
          website: company.website,
          addressLine1: company.addressLine1,
          addressLine2: company.addressLine2,
          city: company.city,
          county: company.county,
          postcode: company.postcode,
          description: company.description,
          postcodeAreas,
        }}
      />
    </>
  );
}
