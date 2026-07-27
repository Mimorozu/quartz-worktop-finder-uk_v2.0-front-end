import Link from "next/link";
import { Footer } from "@/components/Footer";

export function LegalLayout({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="bg-slate-dark px-5 py-10 text-center text-white">
        <div className="font-display text-xl font-semibold mb-2.5">
          Kitchen Worktop <span className="text-gold">Experts</span>
        </div>
        <Link href="/" className="text-white/80 transition-colors hover:text-gold">
          ← Back to Directory
        </Link>
      </header>

      <main className="max-w-[900px] mx-auto my-10 px-5">
        <div className="bg-surface p-8 sm:p-12 rounded-2xl border border-border/60 shadow-sm prose-legal">
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-slate mb-2">{title}</h1>
          <p className="text-muted mb-8">
            <strong className="text-slate">Last Updated:</strong> {lastUpdated}
          </p>
          {children}
        </div>
      </main>

      <Footer />
    </>
  );
}

export function Notice({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-notice-bg border-l-4 border-gold p-5 my-6 rounded">{children}</div>
  );
}

export function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-semibold text-slate mt-9 mb-4">{children}</h2>;
}

export function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="text-lg font-semibold text-slate mt-5 mb-2.5">{children}</h3>;
}

export function P({ children }: { children: React.ReactNode }) {
  return <p className="text-body-text leading-8 mb-4">{children}</p>;
}

export function Ul({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc ml-6 mb-4 space-y-2 text-body-text leading-8">{children}</ul>;
}
