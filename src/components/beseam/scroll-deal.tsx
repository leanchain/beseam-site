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
 * scroll the section is given, and the connector arrow draws out of the panel
 * that just landed before the next one starts, so the row reads left to right
 * as one chain. Scroll back and it plays backwards -- the state is a function
 * of position, never a queue that has already fired.
 *
 * On a screen with room for it the section also holds still while this happens:
 * the stage is a screen taller than the panel for every step, the panel is
 * `position: sticky` in the middle of it, and the scroll that would have moved
 * the page deals the next panel instead. Once the row is whole the stage runs
 * out and the page carries on down. Nothing is intercepted -- there is no
 * wheel handler and no scroll lock, the page is simply scrolling a tall element
 * whose contents do not move, so a trackpad fling, a scrollbar drag and a
 * Page Down all behave exactly as they always do.
 *
 * Where the CSS declines to pin (narrow, short, or reduced motion -- see
 * `.deal-stage` in globals.css) the same scrub runs off the row's own travel
 * through the viewport, which is what a phone gets: the panels are stacked, so
 * they arrive one at a time anyway.
 *
 * Reduced motion shows everything at once, and so does `ScrollDealFallback`
 * when scripting is off -- without the frame loop the panels would never be
 * anything but hidden.
 */
export function ScrollDeal({
  className,
  cells,
  header,
}: {
  className?: string;
  cells: DealCell[];
  /** Kept inside the pinned panel, so the section holds together while it deals. */
  header?: ReactNode;
}) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const panel = panelRef.current;
    if (!stage || !panel) return;

    const panels = Array.from(
      stage.querySelectorAll<HTMLElement>("[data-deal-panel]"),
    );
    const arrows = Array.from(
      stage.querySelectorAll<HTMLElement>("[data-deal-arrow]"),
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
      const rect = stage.getBoundingClientRect();
      const viewport = window.innerHeight || 1;

      // Pinned, the stage is taller than the screen and the panel stands still
      // inside it: how far the stage has passed the top IS the progress. Where
      // the CSS declines to pin, fall back to the row's own travel through the
      // viewport, so a phone still gets the panels one at a time.
      const pinned = window.getComputedStyle(panel).position === "sticky";
      const travel = pinned
        ? stage.offsetHeight - viewport
        : Math.max(rect.height * 0.6, viewport * 0.35);
      if (travel <= 0) {
        settle();
        return;
      }
      const entered = pinned ? -rect.top : viewport * 0.85 - rect.top;
      const progress = Math.min(Math.max(entered / travel, 0), 1);

      // Pinned, the last panel lands a little before the release, so the row is
      // whole for a beat before the page starts moving again.
      const dealt = Math.min(
        progress * panels.length * (pinned ? 1.18 : 1),
        panels.length,
      );

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
    <div
      ref={stageRef}
      className="deal-stage relative"
      style={
        {
          "--deal-stage-height": `calc(100vh + ${cells.length * 40}vh)`,
        } as CSSProperties
      }
    >
      <div ref={panelRef} className="deal-panel">
        {header}
        <div className={className}>
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
      </div>
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
          "<style>.deal-stage{height:auto!important}.deal-panel{position:static!important;min-height:0!important}[data-deal-panel]{opacity:1!important;transform:none!important}[data-deal-arrow]{clip-path:none!important}</style>",
      }}
    />
  );
}

export default ScrollDeal;
