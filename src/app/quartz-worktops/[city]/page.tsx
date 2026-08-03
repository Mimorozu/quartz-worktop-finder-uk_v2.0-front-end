import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CITIES, getCityBySlug } from "@/lib/cities";
import { searchCompaniesByAreaCodes } from "@/lib/search";
import { CompanyCard } from "@/components/CompanyCard";
import { CompanyTeaser } from "@/components/CompanyTeaser";
import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";

export function generateStaticParams() {
  return CITIES.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return {};

  const title = `Quartz Worktop Specialists in ${city.name}`;
  const description = `Find verified quartz worktop and stone mason specialists covering ${city.name}. Compare local fabricators for granite, marble and quartz worktops — no middlemen, no markup.`;

  return {
    title,
    description,
    alternates: { canonical: `/quartz-worktops/${city.slug}` },
    openGraph: { title, description },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) notFound();

  const results = await searchCompaniesByAreaCodes(city.areaCodes);
  const [firstResult, ...rest] = results;

  return (
    <>
      <NavBar />

      <header className="relative overflow-hidden bg-slate-dark px-5 pt-20 pb-16 text-white sm:pt-24">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 15% 0%, rgba(184,99,31,0.28), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-[1100px]">
          <div className="mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            <span className="h-px w-6 bg-gold/60" />
            Quartz Worktop Finder UK
          </div>
          <h1 className="max-w-2xl font-display text-4xl font-medium tracking-tight mb-4 sm:text-5xl">
            Quartz Worktop Specialists in {city.name}
          </h1>
          <p className="max-w-xl text-lg font-light text-white/70">
            {results.length > 0
              ? `We've verified ${results.length} quartz worktop specialist${
                  results.length !== 1 ? "s" : ""
                } covering ${city.name} — compare local fabricators for granite, marble and quartz worktops, direct with no middlemen.`
              : `We're still adding verified specialists covering ${city.name}. Search your postcode below to check current coverage.`}
          </p>
        </div>
      </header>

      <main className="max-w-[1100px] mx-auto px-5 py-12">
        {firstResult && (
          <CompanyCard
            id={firstResult.id}
            companyName={firstResult.companyName}
            description={firstResult.description}
            city={firstResult.city}
            county={firstResult.county}
            postcode={city.name}
            citySlug={city.slug}
            freePreview={rest.length > 0}
          />
        )}

        {rest.length > 0 && (
          <div className="mb-8 rounded-2xl border border-gold/30 bg-gold/5 p-6 text-center sm:p-8">
            <p className="font-display text-xl font-semibold text-slate">
              {rest.length} more verified specialist{rest.length !== 1 ? "s" : ""} in {city.name}
            </p>
            <p className="mx-auto mt-1 max-w-md text-sm text-muted">
              Search your postcode on our homepage to unlock company names and contact details
              for every specialist covering your area.
            </p>
            <Link
              href="/"
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-8 py-3.5 font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-gold-dark hover:shadow-lg hover:shadow-gold/30"
            >
              Search your postcode
            </Link>
          </div>
        )}

        {rest.map((company) => (
          <CompanyTeaser
            key={company.id}
            city={company.city}
            servicesOffered={company.services_offered}
          />
        ))}

        {results.length === 0 && (
          <div className="rounded-2xl border-2 border-dashed border-border bg-surface p-12 text-center">
            <h3 className="mb-3 font-display text-2xl font-semibold text-slate">
              No specialists listed for {city.name} yet
            </h3>
            <p className="mb-5 text-muted">
              Try searching your exact postcode — coverage areas are more specific than city
              boundaries.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-8 py-3.5 font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-gold-dark"
            >
              Search your postcode
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
