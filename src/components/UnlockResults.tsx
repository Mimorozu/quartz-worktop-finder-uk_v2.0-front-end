"use client";

import { useCallback, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { UNLOCK_PRICE_LABEL, UNLOCK_PRICE_PENCE, UNLOCK_CURRENCY } from "@/lib/pricing";
import { extractPostcodeArea } from "@/lib/postcode";
import { trackEvent } from "@/lib/gtag";

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

export function UnlockResults({
  postcode,
  resultCount,
  paymentsReady,
}: {
  postcode: string;
  resultCount: number;
  paymentsReady: boolean;
}) {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [error, setError] = useState(false);

  const fetchClientSecret = useCallback(async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postcode }),
    });
    const data = await res.json();
    if (!data.success || !data.clientSecret) {
      setError(true);
      throw new Error(data.error ?? "Failed to start checkout");
    }
    return data.clientSecret as string;
  }, [postcode]);

  if (checkoutOpen && stripePromise) {
    return (
      <div className="mb-8 rounded-2xl border border-gold/30 bg-gold/5 p-6 sm:p-8">
        <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    );
  }

  return (
    <div className="mb-8 rounded-2xl border border-gold/30 bg-gold/5 p-6 text-center sm:p-8">
      <p className="font-display text-xl font-semibold text-slate">
        {resultCount} more verified specialist{resultCount !== 1 ? "s" : ""} in this area
      </p>
      <p className="mx-auto mt-1 max-w-md text-sm text-muted">
        You&apos;ve already seen one for free above — unlock company names and contact details
        for the rest.
      </p>
      <p className="mx-auto mt-3 flex max-w-md items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gold">
        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6 0a4 4 0 10-4-4"
          />
        </svg>
        100+ homeowners have already connected with specialists this way
      </p>

      {paymentsReady ? (
        <>
          <button
            type="button"
            onClick={() => {
              trackEvent("begin_checkout", {
                value: UNLOCK_PRICE_PENCE / 100,
                currency: UNLOCK_CURRENCY.toUpperCase(),
                postcode_area: extractPostcodeArea(postcode),
              });
              setError(false);
              setCheckoutOpen(true);
            }}
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-8 py-3.5 font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-gold-dark hover:shadow-lg hover:shadow-gold/30 active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {`Unlock the rest — ${UNLOCK_PRICE_LABEL}`}
          </button>
          <p className="mx-auto mt-3 max-w-md text-xs text-muted">
            A worktop project is a big investment — for less than the price of a coffee,
            compare quotes from verified specialists before you commit.
          </p>
          {error && (
            <p className="mt-3 text-sm text-danger-border">
              Something went wrong starting checkout. Please try again.
            </p>
          )}
        </>
      ) : (
        <p className="mt-5 inline-block rounded-xl border border-dashed border-border px-6 py-3 text-sm font-medium text-muted">
          Online payments are coming soon — check back shortly.
        </p>
      )}
    </div>
  );
}
