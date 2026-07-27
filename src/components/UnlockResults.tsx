"use client";

import { useCallback, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { UNLOCK_PRICE_LABEL } from "@/lib/pricing";

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
        {resultCount} verified specialist{resultCount !== 1 ? "s" : ""} found
      </p>
      <p className="mx-auto mt-1 max-w-md text-sm text-muted">
        Unlock company names and contact details for every result in this search.
      </p>

      {paymentsReady ? (
        <>
          <button
            type="button"
            onClick={() => {
              setError(false);
              setCheckoutOpen(true);
            }}
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-8 py-3.5 font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-gold-dark hover:shadow-lg hover:shadow-gold/30 active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {`Unlock all results — ${UNLOCK_PRICE_LABEL}`}
          </button>
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
