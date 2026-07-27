"use client";

import { useContext } from "react";
import { RevealCompleteContext } from "@/components/RevealItem";

export function CompanyTeaser() {
  const complete = useContext(RevealCompleteContext);

  return (
    <div className="relative mb-6 overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-[0_20px_40px_-15px_rgba(29,26,22,0.15)] sm:p-8">
      <div
        className="flex flex-wrap items-start gap-4 select-none animate-[teaser-reveal_4s_ease-out_forwards]"
        aria-hidden="true"
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/10">
          <svg className="h-5 w-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15a3 3 0 100-6 3 3 0 000 6z M12 3v2m0 14v2m9-9h-2M5 12H3m15.36-6.36l-1.42 1.42M7.05 16.95l-1.42 1.42m0-12.73l1.42 1.42M16.95 16.95l1.42 1.42"
            />
          </svg>
        </div>
        <div className="min-w-0 flex-1">
          <div className="h-6 w-48 rounded bg-slate/20" />
          <div className="mt-3 h-4 w-full max-w-md rounded bg-slate/10" />
          <div className="mt-2 h-4 w-3/4 max-w-sm rounded bg-slate/10" />
        </div>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-surface/35 px-6 text-center">
        {complete ? (
          <div className="flex flex-col items-center gap-2 animate-[fade-in_0.4s_ease-out]">
            <svg className="h-6 w-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 10-8 0v4h8z"
              />
            </svg>
            <p className="font-semibold text-slate">Verified specialist</p>
            <p className="text-sm text-muted">Unlock this search to see who it is</p>
          </div>
        ) : (
          <div
            className="h-10 w-10 animate-spin rounded-full border-[3px] border-gold/20 border-t-gold"
            aria-hidden="true"
          />
        )}
      </div>
    </div>
  );
}
