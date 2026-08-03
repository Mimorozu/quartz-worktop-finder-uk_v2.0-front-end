import "server-only";
import { prisma } from "@/lib/prisma";
import { postcodeAreaMatchesCity } from "@/lib/cities";

export type SearchResultCompany = {
  id: number;
  companyName: string;
  description: string | null;
  city: string | null;
  county: string | null;
  services_offered: string | null;
};

export async function searchCompaniesByPostcodeArea(
  postcodeArea: string
): Promise<SearchResultCompany[]> {
  return prisma.company.findMany({
    where: {
      active: true,
      coveragePostcodes: { some: { postcodeArea } },
    },
    orderBy: { companyName: "asc" },
    select: {
      id: true,
      companyName: true,
      description: true,
      city: true,
      county: true,
      services_offered: true,
    },
  });
}

export async function searchCompaniesByAreaCodes(
  areaCodes: string[]
): Promise<SearchResultCompany[]> {
  const companies = await prisma.company.findMany({
    where: { active: true },
    orderBy: { companyName: "asc" },
    select: {
      id: true,
      companyName: true,
      description: true,
      city: true,
      county: true,
      services_offered: true,
      coveragePostcodes: { select: { postcodeArea: true } },
    },
  });

  return companies
    .filter((company) =>
      company.coveragePostcodes.some((cp) => postcodeAreaMatchesCity(cp.postcodeArea, areaCodes))
    )
    .map((company) => ({
      id: company.id,
      companyName: company.companyName,
      description: company.description,
      city: company.city,
      county: company.county,
      services_offered: company.services_offered,
    }));
}

// The "free preview" result on both postcode search and city pages is always
// the first alphabetically-sorted company — these let the reveal endpoints
// verify a companyId is genuinely that free result, server-side, rather than
// trusting the client.
export async function getFreePreviewCompanyIdForPostcodeArea(
  postcodeArea: string
): Promise<number | null> {
  const company = await prisma.company.findFirst({
    where: { active: true, coveragePostcodes: { some: { postcodeArea } } },
    orderBy: { companyName: "asc" },
    select: { id: true },
  });
  return company?.id ?? null;
}

export async function getFreePreviewCompanyIdForAreaCodes(
  areaCodes: string[]
): Promise<number | null> {
  const companies = await searchCompaniesByAreaCodes(areaCodes);
  return companies[0]?.id ?? null;
}
