"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { verifySession } from "@/lib/dal";
import { prisma } from "@/lib/prisma";

function parsePostcodeAreas(raw: string): string[] {
  return raw
    .split(",")
    .map((area) => area.trim().toUpperCase())
    .filter(Boolean);
}

function companyFieldsFromFormData(formData: FormData) {
  const field = (name: string) => String(formData.get(name) ?? "").trim();

  return {
    companyName: field("company_name"),
    contactName: field("contact_name") || null,
    phone: field("phone"),
    email: field("email") || null,
    website: field("website") || null,
    addressLine1: field("address_line1") || null,
    addressLine2: field("address_line2") || null,
    city: field("city") || null,
    county: field("county") || null,
    postcode: field("postcode") || null,
    description: field("description") || null,
  };
}

export async function createCompany(formData: FormData) {
  await verifySession();

  const fields = companyFieldsFromFormData(formData);
  const postcodeAreas = parsePostcodeAreas(String(formData.get("postcode_areas") ?? ""));

  const company = await prisma.company.create({ data: fields });

  if (postcodeAreas.length > 0) {
    await prisma.coveragePostcode.createMany({
      data: postcodeAreas.map((postcodeArea) => ({
        companyId: company.id,
        postcodeArea,
      })),
    });
  }

  revalidatePath("/admin/companies");
  redirect("/admin/companies?added=1");
}

export async function updateCompany(id: number, formData: FormData) {
  await verifySession();

  const fields = companyFieldsFromFormData(formData);
  const postcodeAreas = parsePostcodeAreas(String(formData.get("postcode_areas") ?? ""));

  await prisma.$transaction([
    prisma.company.update({ where: { id }, data: fields }),
    prisma.coveragePostcode.deleteMany({ where: { companyId: id } }),
    ...(postcodeAreas.length > 0
      ? [
          prisma.coveragePostcode.createMany({
            data: postcodeAreas.map((postcodeArea) => ({
              companyId: id,
              postcodeArea,
            })),
          }),
        ]
      : []),
  ]);

  revalidatePath("/admin/companies");
  redirect("/admin/companies?updated=1");
}

export async function deleteCompany(id: number) {
  await verifySession();

  await prisma.company.delete({ where: { id } });

  revalidatePath("/admin/companies");
  redirect("/admin/companies?deleted=1");
}
