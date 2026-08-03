import type { Metadata } from "next";
import Link from "next/link";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { getGuidesByCategory } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Guides",
  description:
    "Guides on quartz worktop costs, choosing a material, comparing brands, and installation and aftercare — for homeowners across the UK.",
};

const CATEGORIES = [
  {
    title: "Costs & pricing",
    description:
      "What quartz, granite and marble worktops actually cost, how specialists price by the metre, and where extra costs like templating or old worktop removal come in.",
  },
  {
    title: "Choosing a material",
    description:
      "How quartz, granite and marble compare on durability, maintenance, heat resistance and looks — and how to work out which is right for your kitchen.",
  },
  {
    title: "Brands compared",
    description:
      "How the major quartz and stone brands stack up against each other, so you know what you're paying for before you choose a slab.",
  },
  {
    title: "Installation & aftercare",
    description:
      "What to expect on installation day, how to prepare your kitchen beforehand, and how to keep a worktop looking new for years.",
  },
] as const;

export default function GuidesPage() {
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
            Guides
          </div>
          <h1 className="max-w-2xl font-display text-4xl font-medium tracking-tight mb-4 sm:text-5xl">
            Everything you need to know before you buy a worktop
          </h1>
          <p className="max-w-xl text-lg font-light text-white/70">
            Independent guides on cost, material choice, brands and installation — written to
            help you go into a quote with the right questions.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-[1100px] px-5 py-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {CATEGORIES.map((category) => {
            const guides = getGuidesByCategory(category.title);

            return (
              <div
                key={category.title}
                className="rounded-2xl border border-border/60 bg-surface p-8"
              >
                <h2 className="mb-3 font-display text-2xl font-semibold text-slate">
                  {category.title}
                </h2>
                <p className="mb-5 leading-relaxed text-body-text">{category.description}</p>

                {guides.length > 0 ? (
                  <ul className="space-y-2">
                    {guides.map((guide) => (
                      <li key={guide.slug} className="flex items-center gap-2">
                        <Link
                          href={`/guides/${guide.slug}`}
                          className="font-medium text-gold underline-offset-2 hover:underline"
                        >
                          {guide.title}
                        </Link>
                        {guide.draft && (
                          <span className="rounded-full bg-muted-light/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted">
                            Draft
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-xs font-semibold uppercase tracking-wide text-gold">
                    First guides launching soon
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </>
  );
}
