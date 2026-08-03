import type { Metadata } from "next";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Get Listed",
  description:
    "List your stone mason or quartz worktop business on Quartz Worktop Finder and connect directly with homeowners searching in your area.",
};

const BENEFITS = [
  {
    title: "Direct leads, no bidding",
    description:
      "Homeowners searching your coverage area see your business and contact you directly — no lead auctions, no shared leads sold to competitors.",
  },
  {
    title: "Verified badge",
    description:
      "Listed businesses appear with a verified badge, building trust with homeowners before they even pick up the phone.",
  },
  {
    title: "Set your own coverage",
    description:
      "Tell us the postcode areas you cover — you only show up in searches relevant to where you actually work.",
  },
];

export default function GetListedPage() {
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
            For Stone Masons &amp; Fabricators
          </div>
          <h1 className="max-w-2xl font-display text-4xl font-medium tracking-tight mb-4 sm:text-5xl">
            Get listed on Quartz Worktop Finder
          </h1>
          <p className="max-w-xl text-lg font-light text-white/70">
            Connect directly with homeowners searching for verified quartz, granite and marble
            specialists in your area — no middlemen, no shared leads.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-[1100px] px-5 py-16">
        <div className="mb-16 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-3">
          {BENEFITS.map((benefit) => (
            <div key={benefit.title} className="border-t border-border pt-6">
              <h3 className="mb-2 font-semibold text-slate">{benefit.title}</h3>
              <p className="text-sm text-muted">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-gold/30 bg-gold/5 p-8 text-center sm:p-12">
          <h2 className="mb-3 font-display text-2xl font-semibold text-slate">
            Interested in joining the directory?
          </h2>
          <p className="mx-auto mb-6 max-w-md text-muted">
            Email us with your business name, coverage areas, and contact details, and
            we&apos;ll get you listed.
          </p>
          <a
            href="mailto:mimorozu@gmail.com?subject=Get%20Listed%20-%20Kitchen%20Worktop%20Experts"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-8 py-3.5 font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-gold-dark hover:shadow-lg hover:shadow-gold/30"
          >
            Email us to get listed
          </a>
        </div>
      </main>

      <Footer />
    </>
  );
}
