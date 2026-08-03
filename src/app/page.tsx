import Image from "next/image";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { extractPostcodeArea } from "@/lib/postcode";
import { isPostcodeAreaUnlocked } from "@/lib/unlock";
import { isStripeConfigured } from "@/lib/stripe";
import { getClientIp } from "@/lib/client-ip";
import { NavBar } from "@/components/NavBar";
import { SearchForm } from "@/components/SearchForm";
import { CompanyCard } from "@/components/CompanyCard";
import { CompanyTeaser } from "@/components/CompanyTeaser";
import { UnlockResults } from "@/components/UnlockResults";
import { RevealItem } from "@/components/RevealItem";
import { Footer } from "@/components/Footer";
import { PurchaseTracker } from "@/components/PurchaseTracker";
import { SITE_URL } from "@/lib/site";
import { searchCompaniesByPostcodeArea } from "@/lib/search";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Kitchen Worktop Experts",
    url: SITE_URL,
    description:
      "Free directory of verified quartz worktop specialists and stone masons across the UK",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/?postcode={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Kitchen Worktop Experts",
    description:
      "Directory service connecting customers with verified quartz worktop specialists and stone masons across the UK",
    url: SITE_URL,
    areaServed: { "@type": "Country", name: "United Kingdom" },
  },
];

const FEATURES = [
  {
    title: "Verified specialists",
    description:
      "Every specialist in our directory is verified and experienced in kitchen worktop fabrication.",
    icon: "check",
  },
  {
    title: "Direct pricing",
    description: "Go straight to the source and save money by cutting out the middlemen.",
    icon: "tag",
  },
  {
    title: "Local experts",
    description: "Find experienced specialists in your area who understand local requirements.",
    icon: "pin",
  },
  {
    title: "Instant results",
    description: "Find local quartz kitchen fitters in seconds, not days.",
    icon: "bolt",
  },
] as const;

const FEATURE_ICONS: Record<string, string> = {
  check: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  tag: "M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.83.699 2.528 0l7.243-7.243c.699-.699.699-1.829 0-2.528l-9.581-9.581A2.25 2.25 0 009.568 3zM6 6h.008v.008H6V6z",
  pin: "M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z",
  bolt: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 22.5 12 13.5H3.75z",
};

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{
    postcode?: string;
    ga_txn?: string;
    ga_value?: string;
    ga_currency?: string;
  }>;
}) {
  const {
    postcode: rawPostcode,
    ga_txn: gaTxn,
    ga_value: gaValue,
    ga_currency: gaCurrency,
  } = await searchParams;
  const searchPerformed = Boolean(rawPostcode);
  const postcodeEntered = (rawPostcode ?? "").toUpperCase().trim();

  const postcodeArea = searchPerformed ? extractPostcodeArea(postcodeEntered) : null;
  const results = postcodeArea ? await searchCompaniesByPostcodeArea(postcodeArea) : [];
  const clientIp = getClientIp(await headers());
  const unlocked = postcodeArea ? await isPostcodeAreaUnlocked(postcodeArea, clientIp) : false;

  if (postcodeArea) {
    await prisma.searchLog.create({
      data: {
        postcode: postcodeEntered,
        postcodeArea,
        resultCount: results.length,
        userIp: clientIp,
      },
    });
  }
  const cleanPath = searchPerformed
    ? `/?postcode=${encodeURIComponent(postcodeEntered)}`
    : "/";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PurchaseTracker
        transactionId={gaTxn ?? null}
        value={gaValue ? Number(gaValue) : null}
        currency={gaCurrency ?? null}
        cleanPath={cleanPath}
      />

      <NavBar />

      <header className="relative overflow-hidden bg-slate-dark px-5 pt-20 pb-28 text-white sm:pt-24">
        <Image
          src="/kitchen.webp"
          alt="Dark stone kitchen island with a pendant light and marble worktop"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_85%]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-dark via-slate-dark/80 to-slate-dark/10 sm:via-slate-dark/85 sm:to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-dark to-transparent" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 15% 0%, rgba(184,99,31,0.28), transparent 60%)",
          }}
        />

        <div className="relative mx-auto max-w-[1100px] text-center sm:text-left">
          <div className="mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            <span className="h-px w-6 bg-gold/60" />
            Quartz Worktop Finder UK
          </div>
          <h1 className="max-w-2xl font-display text-4xl font-medium tracking-tight mb-4 sm:text-6xl">
            Find verified quartz worktop specialists near you
          </h1>
          <p className="max-w-xl text-lg font-light text-white/70 sm:text-xl">
            Connect directly with kitchen worktop specialists across the UK — no middlemen,
            no markup.
          </p>
        </div>
      </header>

      <main className="max-w-[1100px] mx-auto px-5">
        <SearchForm
          defaultValue={postcodeEntered}
          resultCount={results.length}
          searchPerformed={searchPerformed}
        >
          {searchPerformed ? (
            <section className="mb-16">
              {results.length > 0 ? (
                unlocked ? (
                  results.map((company, index) => (
                    <RevealItem key={company.id} index={index}>
                      <CompanyCard
                        id={company.id}
                        companyName={company.companyName}
                        description={company.description}
                        city={company.city}
                        county={company.county}
                        postcode={postcodeEntered}
                      />
                    </RevealItem>
                  ))
                ) : (
                  <>
                    <RevealItem key={results[0].id} index={0}>
                      <CompanyCard
                        id={results[0].id}
                        companyName={results[0].companyName}
                        description={results[0].description}
                        city={results[0].city}
                        county={results[0].county}
                        postcode={postcodeEntered}
                        freePreview
                      />
                    </RevealItem>
                    {results.length > 1 && (
                      <>
                        <RevealItem index={results.length - 1}>
                          <UnlockResults
                            postcode={postcodeEntered}
                            resultCount={results.length - 1}
                            paymentsReady={isStripeConfigured()}
                          />
                        </RevealItem>
                        {results.slice(1).map((company, index) => (
                          <RevealItem key={company.id} index={index + 1}>
                            <CompanyTeaser
                              city={company.city}
                              servicesOffered={company.services_offered}
                            />
                          </RevealItem>
                        ))}
                      </>
                    )}
                  </>
                )
              ) : (
                <RevealItem index={0}>
                  <div className="rounded-2xl border-2 border-dashed border-border bg-surface p-12 text-center">
                    <svg
                      className="mx-auto mb-5 h-14 w-14 text-muted-light"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                      />
                    </svg>
                    <h3 className="mb-3 font-display text-2xl font-semibold text-slate">
                      No quartz worktop specialists found in your area
                    </h3>
                    <p className="text-muted">
                      We couldn&apos;t find any verified specialists covering{" "}
                      {postcodeEntered}.
                    </p>
                    <p className="text-muted">
                      Try searching a nearby postcode or check back soon as we&apos;re always
                      adding new specialists.
                    </p>
                  </div>
                </RevealItem>
              )}
            </section>
          ) : (
            <HomeIntro />
          )}
        </SearchForm>
      </main>

      <Footer />
    </>
  );
}

async function HomeIntro() {
  const companyCount = await prisma.company.count({ where: { active: true } });

  return (
    <>
      <div className="mt-10 rounded-2xl border border-border/60 bg-surface px-8 py-10 shadow-sm sm:px-12">
        <div className="grid grid-cols-1 divide-y divide-border sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
          <Stat value={`${companyCount}+`} label="Verified specialists" />
          <Stat value="15+" label="Years experience" />
          <Stat value="100%" label="Free to search" />
        </div>
      </div>

      <div className="mt-10 mb-16 rounded-2xl border border-border/60 bg-surface p-8 sm:p-12">
        <h2 className="mb-6 font-display text-3xl font-semibold text-slate">
          Welcome to Kitchen Worktop Experts
        </h2>
        <p className="mb-4 max-w-[65ch] leading-8 text-body-text">
          We connect homeowners and builders directly with verified quartz worktop specialists
          and stone masons across the UK who cut and install premium kitchen worktops.
        </p>
        <p className="mb-4 max-w-[65ch] leading-8 text-body-text">
          Our directory features only genuine fabricators working with natural granite,
          marble, and engineered quartz. No middlemen, no markup — just direct access to the
          craftsmen who&apos;ll transform your kitchen.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="flex gap-4 border-t border-border pt-6">
              <svg
                className="mt-0.5 h-6 w-6 shrink-0 text-gold"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d={FEATURE_ICONS[feature.icon]}
                />
              </svg>
              <div>
                <h3 className="mb-1 font-semibold text-slate">{feature.title}</h3>
                <p className="text-sm text-muted">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="px-4 py-4 text-center first:pt-0 sm:py-0">
      <div className="font-display text-4xl font-semibold text-gold mb-2">{value}</div>
      <div className="text-muted font-medium">{label}</div>
    </div>
  );
}
