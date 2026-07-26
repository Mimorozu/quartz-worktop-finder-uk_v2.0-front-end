"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/lib/actions/auth";

const LINKS = [
  { href: "/admin/companies/new", label: "Add Company" },
  { href: "/admin/companies", label: "View All" },
  { href: "/admin/analytics", label: "Analytics" },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <header className="bg-slate border-b border-border-dark py-5">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 flex flex-wrap items-center justify-between gap-5">
        <div className="text-lg font-bold text-white">
          Kitchen Worktop <span className="text-gold">Experts</span>
        </div>
        <nav className="flex flex-wrap gap-2">
          {LINKS.map((link) => {
            const isActive =
              link.href === "/admin/companies"
                ? pathname === "/admin/companies" ||
                  (pathname.startsWith("/admin/companies/") &&
                    !pathname.startsWith("/admin/companies/new"))
                : pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4.5 py-2.5 rounded-md font-medium text-sm transition-all ${
                  isActive
                    ? "bg-gold text-white"
                    : "text-muted-light hover:bg-border-dark hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <form action={logout}>
            <button
              type="submit"
              className="px-4.5 py-2.5 rounded-md font-medium text-sm border border-border-dark text-red-400 hover:bg-red-950 hover:border-red-800 hover:text-red-300 transition-all"
            >
              Logout
            </button>
          </form>
        </nav>
      </div>
    </header>
  );
}
