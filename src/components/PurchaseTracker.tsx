"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { trackEvent } from "@/lib/gtag";

// Fires a GA4 purchase event once for the redirect back from
// /api/checkout/confirm, then strips the ga_* params from the URL so a
// refresh or back-navigation can't double-count the same purchase.
export function PurchaseTracker({
  transactionId,
  value,
  currency,
  cleanPath,
}: {
  transactionId: string | null;
  value: number | null;
  currency: string | null;
  cleanPath: string;
}) {
  const router = useRouter();
  const fired = useRef(false);

  useEffect(() => {
    if (!transactionId || fired.current) return;
    fired.current = true;

    trackEvent("purchase", {
      transaction_id: transactionId,
      value: value ?? undefined,
      currency: (currency ?? "gbp").toUpperCase(),
    });

    router.replace(cleanPath, { scroll: false });
  }, [transactionId, value, currency, cleanPath, router]);

  return null;
}
