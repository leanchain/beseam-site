"use client";

import { useLayoutEffect } from "react";

/**
 * Sizes the hero so the research rail's bottom edge lands exactly on the
 * viewport's bottom edge on load -- no gap, no peek of the next (dark)
 * section. Measures the real, rendered nav and rail heights instead of a
 * guessed constant, so it stays exact whether the rail wraps to one line or
 * three. Runs in useLayoutEffect (before paint) against the CSS var's
 * `11rem` fallback, so there is nothing to flash.
 */
export default function HeroViewportFit() {
  useLayoutEffect(() => {
    const root = document.documentElement;

    const update = () => {
      const nav = document.querySelector("header");
      const rail = document.getElementById("research-rail");
      const navH = nav?.getBoundingClientRect().height ?? 0;
      const railH = rail?.getBoundingClientRect().height ?? 0;
      root.style.setProperty("--hero-reserve", `${navH + railH}px`);
    };

    update();
    window.addEventListener("resize", update);

    const rail = document.getElementById("research-rail");
    const ro = rail ? new ResizeObserver(update) : null;
    ro?.observe(rail as Element);

    return () => {
      window.removeEventListener("resize", update);
      ro?.disconnect();
    };
  }, []);

  return null;
}
