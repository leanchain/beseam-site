"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";

export type DealCell = {
  key: string;
  className?: string;
  content: ReactNode;
};

/**
 * Deals a row of panels one at a time, paced by the scroll rather than a timer.
 *
 * A merchant reading #one-system said the four squares were too small to take
 * in at once and asked to see them "one after another". A timed stagger only
 * moved the problem: the panels still arrive on their own schedule, and either
 * they race ahead of the reader or they make a fast reader wait. Here the scroll
 * position is the clock. Each panel fades and rises across its own slice of the
 * row's travel through the viewport, and the connector arrow draws out of the
 * panel that just landed before the next one starts, so the row reads left to
 * right as one chain. Scroll back and it plays backwards -- the state is a
 * function of position, never a queue that has already fired.
 *
 * Nothing here intercepts the scroll: the page scrolls normally and the styles
 * are written straight to the nodes once per frame, so no React render is
 * involved in the scrub.
 *
 * `travel` is the distance over which the whole row is dealt: 60% of the row's
 * own height, floored at a third of the viewport so a single-row layout at `xl`
 * still gets a real stretch of scroll rather than a flicker.
 *
 * Reduced motion shows everything at once, and so does `ScrollDealFallback`
 * when scripting is off -- without the frame loop the panels would never be
 * anything but hidden.
 */
export function ScrollDeal({
  className,
  cells,
}: {
  className?: string;
  cells: DealCell[];
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const panels = Array.from(
      root.querySelectorAll<HTMLElement>("[data-deal-panel]"),
    );
    const arrows = Array.from(
      root.querySelectorAll<HTMLElement>("[data-deal-arrow]"),
    );
    if (panels.length === 0) return;

    const settle = () => {
      for (const panel of panels) {
        panel.style.opacity = "1";
        panel.style.transform = "none";
      }
      for (const arrow of arrows) arrow.style.clipPath = "none";
    };

    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      settle();
      return;
    }

    let frame = 0;
    const paint = () => {
      frame = 0;
      const rect = root.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const travel = Math.max(rect.height * 0.6, viewport * 0.35);
      const entered = viewport * 0.85 - rect.top;
      const dealt = Math.min(Math.max(entered / travel, 0), 1) * panels.length;

      panels.forEach((panel, index) => {
        const step = Math.min(Math.max((dealt - index) / 0.6, 0), 1);
        panel.style.opacity = String(step);
        panel.style.transform =
          step === 1 ? "none" : `translateY(${((1 - step) * 14).toFixed(2)}px)`;
      });

      arrows.forEach((arrow, index) => {
        const drawn = Math.min(Math.max((dealt - (index + 0.55)) / 0.45, 0), 1);
        arrow.style.clipPath = `inset(0 ${((1 - drawn) * 100).toFixed(1)}% 0 0)`;
      });
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(paint);
    };

    paint();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  /** The pre-deal state, also what the server sends. */
  const hidden: CSSProperties = { opacity: 0, transform: "translateY(14px)" };

  return (
    <div ref={rootRef} className={className}>
      {cells.map((cell) => (
        <div
          key={cell.key}
          data-deal-panel
          className={cell.className}
          style={hidden}
        >
          {cell.content}
        </div>
      ))}
    </div>
  );
}

/**
 * Without scripting the frame loop never runs and the panels would stay at the
 * pre-deal state, so show the row as it stands.
 */
export function ScrollDealFallback() {
  return (
    <noscript
      dangerouslySetInnerHTML={{
        __html:
          "<style>[data-deal-panel]{opacity:1!important;transform:none!important}[data-deal-arrow]{clip-path:none!important}</style>",
      }}
    />
  );
}

export default ScrollDeal;
