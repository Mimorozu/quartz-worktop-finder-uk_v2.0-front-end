"use client";

import { createContext, useContext } from "react";

export const RevealCountContext = createContext(Infinity);
export const RevealCompleteContext = createContext(true);

export function RevealItem({ index, children }: { index: number; children: React.ReactNode }) {
  const revealedCount = useContext(RevealCountContext);
  const visible = index < revealedCount;

  return (
    <div className={visible ? "animate-[reveal-up_0.5s_ease-out_backwards]" : "hidden"}>
      {children}
    </div>
  );
}
