export const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

declare global {
  interface Window {
    clarity: (...args: unknown[]) => void;
  }
}

export function updateClarityConsent(granted: boolean) {
  if (typeof window !== "undefined" && typeof window.clarity === "function") {
    window.clarity("consent", granted);
  }
}
