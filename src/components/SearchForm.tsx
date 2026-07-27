"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { RevealCountContext, RevealCompleteContext } from "@/components/RevealItem";

const COUNT_DURATION_MS = 10000;
const MIN_TICK_MS = 150;
const MAX_TICK_MS = 800;
const OVERLAY_FADE_MS = 300;

export function SearchForm({
  defaultValue,
  resultCount,
  searchPerformed,
  children,
}: {
  defaultValue?: string;
  resultCount: number;
  searchPerformed: boolean;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [counting, setCounting] = useState(false);
  const [displayCount, setDisplayCount] = useState(resultCount);
  const [progress, setProgress] = useState(0);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const wasPending = useRef(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = String(new FormData(e.currentTarget).get("postcode") ?? "").trim();
    if (!value) return;
    wasPending.current = true;
    setOverlayVisible(true);
    setDisplayCount(1);
    setProgress(0);
    startTransition(() => {
      router.push(`/?postcode=${encodeURIComponent(value)}`);
    });
  }

  useEffect(() => {
    if (isPending) return;
    if (!wasPending.current) return;
    wasPending.current = false;

    const target = searchPerformed ? resultCount : 0;
    let tickTimeoutId: ReturnType<typeof setTimeout> | undefined;
    let cancelled = false;

    const kickoffId = setTimeout(() => {
      if (target === 0) {
        setCounting(false);
        setDisplayCount(0);
        setProgress(100);
        return;
      }

      setCounting(true);
      let elapsed = 0;

      const tick = () => {
        if (cancelled) return;
        const remaining = COUNT_DURATION_MS - elapsed;
        if (remaining <= 0) {
          setDisplayCount(target);
          setProgress(100);
          setCounting(false);
          return;
        }
        const delay = Math.min(remaining, MIN_TICK_MS + Math.random() * (MAX_TICK_MS - MIN_TICK_MS));
        tickTimeoutId = setTimeout(() => {
          elapsed += delay;
          const fraction = Math.min(elapsed / COUNT_DURATION_MS, 1);
          const value = fraction >= 1 ? target : 1 + Math.floor(fraction * (target - 1));
          setDisplayCount(value);
          setProgress(Math.round(fraction * 100));
          if (fraction >= 1) {
            setCounting(false);
          } else {
            tick();
          }
        }, delay);
      };

      tick();
    }, 0);

    return () => {
      cancelled = true;
      clearTimeout(kickoffId);
      clearTimeout(tickTimeoutId);
    };
  }, [isPending, resultCount, searchPerformed]);

  useEffect(() => {
    if (isPending || !overlayVisible) return;
    const hideId = setTimeout(() => setOverlayVisible(false), OVERLAY_FADE_MS);
    return () => clearTimeout(hideId);
  }, [isPending, overlayVisible]);

  const overlayFadedIn = isPending;
  const loadingBarVisible = isPending || counting;
  const revealedCount = isPending ? 0 : displayCount;
  const animationsComplete = !isPending && !counting;

  return (
    <>
      <div className="relative z-10 -mt-14 rounded-2xl border border-border/60 bg-surface p-6 shadow-[0_25px_50px_-15px_rgba(29,26,22,0.3)] sm:-mt-16 sm:p-10">
        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.15em] text-muted sm:text-left">
          Search by postcode
        </p>
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex max-w-xl flex-col gap-3 sm:flex-row"
        >
          <input
            type="text"
            name="postcode"
            placeholder="e.g., GL50 2PR"
            defaultValue={defaultValue}
            required
            className="flex-1 rounded-xl border-2 border-border bg-white px-6 py-4 text-base text-slate transition-all placeholder:text-muted-light focus:border-gold focus:outline-none focus:ring-4 focus:ring-gold/15"
          />
          <button
            type="submit"
            disabled={isPending}
            className="whitespace-nowrap rounded-xl bg-gold px-10 py-4 font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-gold-dark hover:shadow-lg hover:shadow-gold/25 active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isPending ? "Searching…" : "Search"}
          </button>
        </form>
      </div>

      {searchPerformed && (
        <div className="mt-16 mb-8">
          <h2 className="font-display text-3xl font-semibold text-slate mb-2">
            {displayCount} quartz worktop specialist{displayCount === 1 ? "" : "s"} near you
          </h2>
          <p className="text-muted text-lg">covering {defaultValue}</p>

          {loadingBarVisible && (
            <div className="mt-4 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-border">
              <div
                className="h-full rounded-full bg-gold transition-[width] duration-150 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      )}

      <div className="relative">
        <RevealCountContext.Provider value={revealedCount}>
          <RevealCompleteContext.Provider value={animationsComplete}>
            {children}
          </RevealCompleteContext.Provider>
        </RevealCountContext.Provider>

        {overlayVisible && (
          <div
            className="absolute inset-0 z-20 rounded-2xl bg-surface/95 backdrop-blur-sm transition-opacity duration-300"
            style={{ opacity: overlayFadedIn ? 1 : 0 }}
          />
        )}
      </div>
    </>
  );
}
