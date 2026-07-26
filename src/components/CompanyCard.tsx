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
    <div className="group relative bg-white p-6 sm:p-8 mb-6 rounded-xl border border-border shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:border-gold overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold to-gold-dark opacity-0 transition-opacity group-hover:opacity-100" />

      <h3 className="flex flex-wrap items-center gap-2.5 text-2xl font-semibold text-slate mb-5">
        {companyName}
        <span className="bg-verified text-white text-xs px-2.5 py-1 rounded-full font-semibold uppercase tracking-wide">
          Verified
        </span>
      </h3>

      {description && (
        <div className="mt-6 pt-6 border-t border-border text-body-text leading-relaxed whitespace-pre-line">
          {description}
        </div>
      )}

      <button
        type="button"
        onClick={handleReveal}
        disabled={status === "loading" || status === "revealed"}
        className="mt-5 w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-semibold text-white transition-all bg-gold hover:bg-gold-dark hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold/30 disabled:cursor-not-allowed disabled:translate-y-0 disabled:hover:shadow-none data-[revealed=true]:bg-verified data-[revealed=true]:hover:bg-verified"
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
          {location && (
            <InfoItem label="Location">
              <span>{location}</span>
            </InfoItem>
          )}
        </div>
      )}
    </div>
  );
}

function InfoItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 p-3 bg-page-bg rounded-lg">
      <div className="flex-1">
        <div className="font-semibold text-muted text-xs uppercase tracking-wide mb-1">
          {label}
        </div>
        <div className="text-slate">{children}</div>
      </div>
    </div>
  );
}
