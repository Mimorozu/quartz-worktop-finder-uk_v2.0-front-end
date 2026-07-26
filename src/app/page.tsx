import { prisma } from "@/lib/prisma";
import { extractPostcodeArea } from "@/lib/postcode";
import { SearchForm } from "@/components/SearchForm";
import { CompanyCard } from "@/components/CompanyCard";
import { Footer } from "@/components/Footer";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Kitchen Worktop Experts",
    url: "https://kitchenworktopexperts.co.uk",
    description:
      "Free directory of verified stone masons and kitchen worktop specialists across the UK",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://kitchenworktopexperts.co.uk/?postcode={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Kitchen Worktop Experts",
    description:
      "Directory service connecting customers with verified stone mason specialists",
    url: "https://kitchenworktopexperts.co.uk",
    areaServed: { "@type": "Country", name: "United Kingdom" },
    serviceType: "Stone Mason Directory",
  },
];

const FEATURES = [
  {
    title: "Verified Specialists",
    description:
      "Every stone mason in our directory is verified and experienced in kitchen worktop fabrication",
  },
  {
    title: "Direct Pricing",
    description: "Go straight to the source and save money by cutting out the middlemen",
  },
  {
    title: "Local Experts",
    description: "Find experienced stone masons in your area who understand local requirements",
  },
  {
    title: "Instant Results",
    description: "Find local quartz kitchen fitters instantly",
  },
];

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ postcode?: string }>;
}) {
  const { postcode: rawPostcode } = await searchParams;
  const searchPerformed = Boolean(rawPostcode);
  const postcodeEntered = (rawPostcode ?? "").toUpperCase().trim();

  const results = searchPerformed ? await searchCompanies(postcodeEntered) : [];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="relative overflow-hidden bg-gradient-to-br from-slate to-slate-dark text-white text-center px-5 pt-20 pb-24">
        <div className="relative">
          <div className="text-2xl font-bold mb-3 tracking-tight">
            Quartz Worktop <span className="text-gold">Experts</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold mb-3 tracking-tight">
            Find Verified Stone Masons
          </h1>
          <p className="text-lg sm:text-xl opacity-90 font-light">
            Connect directly with kitchen worktop specialists across the UK
          </p>
        </div>
      </header>

      <main className="max-w-[1100px] mx-auto px-5">
        <SearchForm defaultValue={postcodeEntered} />

        {searchPerformed ? (
          <section className="mt-16 mb-16">
            <div className="mb-8">
              <h2 className="text-3xl font-semibold text-slate mb-2">
                Stone Masons Near You
              </h2>
              <p className="text-muted text-lg">
                Found {results.length} verified specialist{results.length !== 1 ? "s" : ""}{" "}
                covering {postcodeEntered}
              </p>
            </div>

            {results.length > 0 ? (
              results.map((company) => (
                <CompanyCard
                  key={company.id}
                  id={company.id}
                  companyName={company.companyName}
                  description={company.description}
                  city={company.city}
                  county={company.county}
                  postcode={postcodeEntered}
                />
              ))
            ) : (
              <div className="bg-white p-12 rounded-xl text-center border-2 border-dashed border-border">
                <div className="text-6xl mb-5 opacity-30">🔍</div>
                <h3 className="text-2xl font-semibold text-slate mb-3">
                  No stone masons found in your area
                </h3>
                <p className="text-muted">
                  We couldn&apos;t find any verified stone masons covering {postcodeEntered}.
                </p>
                <p className="text-muted">
                  Try searching a nearby postcode or check back soon as we&apos;re always
                  adding new specialists.
                </p>
              </div>
            )}
          </section>
        ) : (
          <HomeIntro />
        )}
      </main>

      <Footer />
    </>
  );
}

async function searchCompanies(postcodeEntered: string) {
  const area = extractPostcodeArea(postcodeEntered);
  if (!area) return [];

  return prisma.company.findMany({
    where: {
      active: true,
      coveragePostcodes: { some: { postcodeArea: area } },
    },
    orderBy: { companyName: "asc" },
    select: {
      id: true,
      companyName: true,
      description: true,
      city: true,
      county: true,
    },
  });
}

async function HomeIntro() {
  const companyCount = await prisma.company.count({ where: { active: true } });

  return (
    <>
      <div className="bg-white rounded-xl p-8 sm:p-10 mt-10 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <Stat value={`${companyCount}+`} label="Verified Stone Masons" />
          <Stat value="15+" label="Years Experience" />
          <Stat value="100%" label="Free Service" />
        </div>
      </div>

      <div className="bg-white p-8 sm:p-12 rounded-xl mt-10 mb-16 shadow-sm">
        <h2 className="text-3xl font-semibold text-slate mb-6">
          Welcome to Kitchen Worktop Experts
        </h2>
        <p className="text-body-text leading-8 mb-4">
          We connect homeowners and builders directly with verified stone mason specialists
          across the UK who cut and install premium kitchen worktops.
        </p>
        <p className="text-body-text leading-8 mb-4">
          Our directory features only genuine stone fabricators working with natural granite,
          marble, and engineered quartz. No middlemen, no markup - just direct access to the
          craftsmen who&apos;ll transform your kitchen.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="text-center p-6 bg-page-bg rounded-lg">
              <h3 className="text-slate font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-4xl font-bold text-gold mb-2">{value}</div>
      <div className="text-muted font-medium">{label}</div>
    </div>
  );
}
