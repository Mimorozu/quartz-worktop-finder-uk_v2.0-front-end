"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Find an Installer" },
  { href: "/guides", label: "Guides" },
  { href: "/get-listed", label: "Get Listed" },
];

export function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-white/10 bg-slate-dark px-5 py-5 text-white">
      <div className="mx-auto flex max-w-[1100px] items-center justify-center gap-6 sm:gap-12">
        {LINKS.map((link) => {
          const isActive =
            link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive ? "page" : undefined}
              className={`relative pb-2 text-xs font-semibold uppercase tracking-[0.12em] transition-colors sm:text-sm ${
                isActive ? "text-white" : "text-white/60 hover:text-gold"
              }`}
            >
              {link.label}
              {isActive && (
                <span
                  className="absolute inset-x-0 bottom-0 h-px bg-gold"
                  aria-hidden="true"
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
