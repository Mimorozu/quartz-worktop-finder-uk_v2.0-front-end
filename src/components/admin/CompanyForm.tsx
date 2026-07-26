import Link from "next/link";

type CompanyFormValues = {
  companyName?: string;
  contactName?: string | null;
  phone?: string;
  email?: string | null;
  website?: string | null;
  addressLine1?: string | null;
  addressLine2?: string | null;
  city?: string | null;
  county?: string | null;
  postcode?: string | null;
  description?: string | null;
  postcodeAreas?: string;
};

const inputClass =
  "w-full px-4 py-3 bg-slate-dark border-2 border-border-dark rounded-lg text-white placeholder:text-muted transition-all focus:outline-none focus:border-gold focus:ring-4 focus:ring-gold/10";
const labelClass = "block mt-5 mb-2 font-semibold text-sm text-white first:mt-0";

export function CompanyForm({
  action,
  values,
  submitLabel,
}: {
  action: (formData: FormData) => void | Promise<void>;
  values?: CompanyFormValues;
  submitLabel: string;
}) {
  return (
    <form action={action} className="bg-slate p-6 sm:p-9 rounded-xl border border-border-dark">
      <label className={labelClass}>Company Name *</label>
      <input
        type="text"
        name="company_name"
        defaultValue={values?.companyName}
        placeholder="e.g., Premium Stone Works Ltd"
        required
        className={inputClass}
      />

      <label className={labelClass}>Contact Name</label>
      <input
        type="text"
        name="contact_name"
        defaultValue={values?.contactName ?? ""}
        placeholder="e.g., John Smith"
        className={inputClass}
      />

      <label className={labelClass}>Phone *</label>
      <input
        type="text"
        name="phone"
        defaultValue={values?.phone}
        placeholder="e.g., 01234 567890"
        required
        className={inputClass}
      />

      <label className={labelClass}>Email</label>
      <input
        type="email"
        name="email"
        defaultValue={values?.email ?? ""}
        placeholder="e.g., info@company.co.uk"
        className={inputClass}
      />

      <label className={labelClass}>Website</label>
      <input
        type="text"
        name="website"
        defaultValue={values?.website ?? ""}
        placeholder="https://www.company.co.uk"
        className={inputClass}
      />

      <label className={labelClass}>Address Line 1</label>
      <input
        type="text"
        name="address_line1"
        defaultValue={values?.addressLine1 ?? ""}
        placeholder="Street address"
        className={inputClass}
      />

      <label className={labelClass}>Address Line 2</label>
      <input
        type="text"
        name="address_line2"
        defaultValue={values?.addressLine2 ?? ""}
        placeholder="Additional address info"
        className={inputClass}
      />

      <label className={labelClass}>City</label>
      <input
        type="text"
        name="city"
        defaultValue={values?.city ?? ""}
        placeholder="e.g., Cheltenham"
        className={inputClass}
      />

      <label className={labelClass}>County</label>
      <input
        type="text"
        name="county"
        defaultValue={values?.county ?? ""}
        placeholder="e.g., Gloucestershire"
        className={inputClass}
      />

      <label className={labelClass}>Postcode</label>
      <input
        type="text"
        name="postcode"
        defaultValue={values?.postcode ?? ""}
        placeholder="e.g., GL50 2PR"
        className={inputClass}
      />

      <label className={labelClass}>Coverage Areas (Postcode Areas) *</label>
      <input
        type="text"
        name="postcode_areas"
        defaultValue={values?.postcodeAreas ?? ""}
        required
        placeholder="e.g., GL1, GL2, GL3, GL50, GL51"
        className={inputClass}
      />
      <span className="text-xs text-muted-light mt-1.5 block">
        Enter postcode areas separated by commas
      </span>

      <label className={labelClass}>Description</label>
      <textarea
        name="description"
        defaultValue={values?.description ?? ""}
        placeholder="Brief description of the company and their services..."
        rows={5}
        className={`${inputClass} resize-y`}
      />

      <div className="flex flex-wrap gap-3 mt-8">
        <button
          type="submit"
          className="px-6 py-3 rounded-lg font-semibold bg-gold text-white transition-all hover:bg-gold-dark hover:-translate-y-0.5"
        >
          {submitLabel}
        </button>
        <Link
          href="/admin/companies"
          className="px-6 py-3 rounded-lg font-semibold bg-border-dark text-white transition-all hover:bg-slate-dark"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
