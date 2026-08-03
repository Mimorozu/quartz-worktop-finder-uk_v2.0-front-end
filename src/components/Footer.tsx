import Link from "next/link";
import { CITIES } from "@/lib/cities";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-slate-dark px-5 py-12 text-white">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-white/40">
            Areas we cover
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {CITIES.map((city) => (
              <Link
                key={city.slug}
                href={`/quartz-worktops/${city.slug}`}
                className="text-white/60 transition-colors hover:text-gold"
              >
                {city.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-8 border-t border-white/10 pt-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="text-center sm:text-left">
            <div className="font-display text-xl font-semibold">
              Quartz Worktop <span className="text-gold">Finder</span>
            </div>
            <p className="mt-2 max-w-xs text-sm text-white/60">
              Connecting you with verified stone mason specialists across the UK.
            </p>
            <p className="mt-6 text-xs text-white/40">
              &copy; {new Date().getFullYear()} Quartz Worktop Finder. All rights reserved.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 text-sm sm:items-end">
            <div className="flex gap-6">
              <Link href="/privacy" className="text-white/70 transition-colors hover:text-gold">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-white/70 transition-colors hover:text-gold">
                Terms of Service
              </Link>
            </div>
            <Link href="/admin/login" className="text-xs text-white/30 hover:text-white/50">
              Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
