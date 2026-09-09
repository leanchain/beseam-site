"use client";

import { useEffect, useState } from "react";

import { useDictionary } from "@/i18n/use-locale";

/**
 * Decorative "more below" affordance pinned to the bottom of the full-height
 * hero. Desktop/tablet only: phones already communicate vertical scrolling through
 * the native page gesture, so a mouse-shaped affordance there is redundant.
 * Present on load, fades out as soon as the visitor starts scrolling,
 * and returns if they scroll back to the very top. Purely decorative --
 * aria-hidden, and the mouse-wheel dot is dropped under reduced motion
 * rather than frozen mid-animation (see .hero-scroll-wheel in globals.css).
 */
export default function HeroScrollCue() {
  // A client component in the root of a static export has no locale prop to
  // take, so it reads the one signal it does have: the path.
  const t = useDictionary();
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 bottom-8 z-10 hidden flex-col items-center gap-2 transition-opacity duration-300 md:flex ${
        atTop ? "opacity-100" : "opacity-0"
      }`}
    >
      <span className="flex h-8 w-5 items-start justify-center rounded-full border border-black/25 p-1.5">
        <span className="motion-safe-only h-1.5 w-1 rounded-full bg-black/45 hero-scroll-wheel" />
      </span>
      <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-black/45">
        {t.hero.scrollCue}
      </span>
    </div>
  );
}
