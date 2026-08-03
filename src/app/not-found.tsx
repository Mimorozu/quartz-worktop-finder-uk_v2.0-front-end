import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-page-bg px-5 text-center">
      <div className="mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
        <span className="h-px w-6 bg-gold/60" />
        Kitchen Worktop Experts
      </div>
      <h1 className="mb-4 font-display text-4xl font-medium tracking-tight text-slate sm:text-5xl">
        Page not found
      </h1>
      <p className="mb-8 max-w-md text-muted">
        The page you&apos;re looking for doesn&apos;t exist, or may have moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-8 py-3.5 font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-gold-dark hover:shadow-lg hover:shadow-gold/30"
      >
        Back to homepage
      </Link>
    </div>
  );
}
