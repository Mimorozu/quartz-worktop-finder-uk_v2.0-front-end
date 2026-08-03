"use client";

import { useEffect, useSyncExternalStore } from "react";
import { isAnalyticsConfigured } from "@/lib/gtag";

const STORAGE_KEY = "kwe_cookie_consent";

type Consent = "granted" | "denied";

const listeners = new Set<() => void>();

function readConsent(): Consent | null {
  return localStorage.getItem(STORAGE_KEY) as Consent | null;
}

function writeConsent(status: Consent) {
  localStorage.setItem(STORAGE_KEY, status);
  listeners.forEach((notify) => notify());
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function getServerSnapshot(): Consent | null {
  return null;
}

function updateGtagConsent(status: Consent) {
  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      analytics_storage: status,
      ad_storage: status,
      ad_user_data: status,
      ad_personalization: status,
    });
  }
}

export function CookieConsentBanner() {
  const consent = useSyncExternalStore(subscribe, readConsent, getServerSnapshot);

  useEffect(() => {
    if (consent === "granted") updateGtagConsent("granted");
  }, [consent]);

  if (!isAnalyticsConfigured() || consent !== null) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-surface p-4 shadow-[0_-10px_30px_-15px_rgba(29,26,22,0.25)] sm:p-5">
      <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p className="text-center text-sm text-body-text sm:text-left">
          We use analytics cookies to understand how visitors use our directory. See our{" "}
          <a href="/privacy" className="text-gold underline hover:text-gold-dark">
            Privacy Policy
          </a>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => {
              writeConsent("denied");
              updateGtagConsent("denied");
            }}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted transition-colors hover:border-slate hover:text-slate"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={() => {
              writeConsent("granted");
              updateGtagConsent("granted");
            }}
            className="rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-gold-dark"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
