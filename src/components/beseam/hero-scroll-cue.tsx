"use client";

import { useEffect, useState } from "react";

/**
 * Decorative "more below" affordance pinned to the bottom of the full-height
 * hero. Present on load, fades out as soon as the visitor starts scrolling,
 * and returns if they scroll back to the very top. Purely decorative --
 * aria-hidden, and the mouse-wheel dot is dropped under reduced motion
 * rather than frozen mid-animation (see .hero-scroll-wheel in globals.css).
 */
export default function HeroScrollCue() {
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
      className={`pointer-events-none absolute inset-x-0 bottom-6 z-10 flex flex-col items-center gap-2 transition-opacity duration-300 sm:bottom-8 ${
        atTop ? "opacity-100" : "opacity-0"
      }`}
    >
      <span className="flex h-8 w-5 items-start justify-center rounded-full border border-black/25 p-1.5">
        <span className="motion-safe-only h-1.5 w-1 rounded-full bg-black/45 hero-scroll-wheel" />
      </span>
      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-black/45">
        Scroll
      </span>
    </div>
  );
}
