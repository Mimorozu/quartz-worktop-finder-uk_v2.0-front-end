import { CompanyForm } from "@/components/admin/CompanyForm";
import { createCompany } from "@/lib/actions/companies";

export const metadata = { title: "Add Company" };

export default function NewCompanyPage() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-white mb-1.5">Add New Company</h1>
        <p className="text-muted-light">Add a verified stone mason to the directory</p>
      </div>

      <CompanyForm action={createCompany} submitLabel="Add Company" />
    </>
  );
}
