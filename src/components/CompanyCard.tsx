"use client";

import { useState } from "react";

type ContactInfo = {
  phone: string | null;
  email: string | null;
  website: string | null;
};

export function CompanyCard({
  id,
  companyName,
  description,
  city,
  county,
  postcode,
}: {
  id: number;
  companyName: string;
  description: string | null;
  city: string | null;
  county: string | null;
  postcode: string;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "revealed" | "error">(
    "idle"
  );
  const [contact, setContact] = useState<ContactInfo | null>(null);

  const location = [city, county].filter(Boolean).join(", ");
  const initials = companyName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  async function handleReveal() {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact-reveal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyId: id, postcode }),
      });
      const data = await res.json();
      if (data.success) {
        setContact(data);
        setStatus("revealed");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="group relative mb-6 overflow-hidden rounded-2xl border border-border/70 bg-surface p-6 transition-all hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_20px_40px_-15px_rgba(29,26,22,0.25)] sm:p-8">
      <div className="flex flex-wrap items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/10 font-display text-lg font-semibold text-gold">
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="flex flex-wrap items-center gap-2.5 font-display text-2xl font-semibold text-slate">
            {companyName}
            <span className="inline-flex items-center gap-1 rounded-md bg-verified/10 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-verified">
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
              Verified
            </span>
          </h3>
          {location && <p className="mt-1 text-sm text-muted">{location}</p>}
        </div>
      </div>

      {description && (
        <div className="mt-6 border-t border-border pt-6 leading-relaxed whitespace-pre-line text-body-text">
          {description}
        </div>
      )}

      <button
        type="button"
        onClick={handleReveal}
        disabled={status === "loading" || status === "revealed"}
        className="mt-5 w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white transition-all bg-gold hover:bg-gold-dark hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold/30 active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:translate-y-0 disabled:hover:shadow-none disabled:active:scale-100 data-[revealed=true]:bg-verified data-[revealed=true]:hover:bg-verified"
        data-revealed={status === "revealed"}
      >
        {status === "loading" && (
          <>
            <svg
              className="w-5 h-5 animate-spin"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Loading...
          </>
        )}
        {status === "revealed" && (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Contact Details Shown
          </>
        )}
        {(status === "idle" || status === "error") && (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            {status === "error" ? "Error - Please try again" : "Show Contact Details"}
          </>
        )}
      </button>

      {status === "revealed" && contact && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
          {contact.phone && (
            <InfoItem label="Phone">
              <a href={`tel:${contact.phone}`} className="text-gold font-medium hover:text-gold-dark hover:underline">
                {contact.phone}
              </a>
            </InfoItem>
          )}
          {contact.email && (
            <InfoItem label="Email">
              <a href={`mailto:${contact.email}`} className="text-gold font-medium hover:text-gold-dark hover:underline">
                {contact.email}
              </a>
            </InfoItem>
          )}
          {contact.website && (
            <InfoItem label="Website">
              <a
                href={`/go/${id}?postcode=${encodeURIComponent(postcode)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold font-medium hover:text-gold-dark hover:underline"
              >
                Visit Website
              </a>
            </InfoItem>
          )}
        </div>
      )}
    </div>
  );
}

function InfoItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-lg bg-page-bg p-3">
      <div className="flex-1">
        <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted">
          {label}
        </div>
        <div className="text-slate">{children}</div>
      </div>
    </div>
  );
}
