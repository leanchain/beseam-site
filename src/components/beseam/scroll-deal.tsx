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
 * the stage is taller than the panel by the scroll the deal is worth, the panel
 * sticks near the top of the screen inside it, and the scroll that would have
 * moved the page deals the next panel instead. Once the row is whole the stage runs
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
  footer,
}: {
  className?: string;
  cells: DealCell[];
  /**
   * Held with the row. The pin starts where the section does, so the reader
   * keeps the heading that says what they are looking at -- and the sticky site
   * header, which the panel clears rather than hides under, keeps its own line.
   */
  header?: ReactNode;
  /**
   * Dealt last, as one more beat of the same sequence -- a closing line lands
   * under the finished row while the section is still held, rather than being
   * scrolled up into view once the pin has already let go. It fades without
   * the rise: by then nothing else on screen is moving.
   */
  footer?: ReactNode;
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
        panel.setAttribute("data-dealt", "");
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

      // Pinned, the panel stands still between the moment the stage's top meets
      // its sticky offset and the moment the panel's bottom meets the stage's:
      // that span is the whole deal, so measure against it rather than against
      // the screen. Where the CSS declines to pin, fall back to the row's own
      // travel through the viewport, so a phone still gets them one at a time.
      const style = window.getComputedStyle(panel);
      const pinned = style.position === "sticky";
      const offset = pinned ? parseFloat(style.top) || 0 : 0;
      const travel = pinned
        ? stage.offsetHeight - panel.offsetHeight
        : Math.max(rect.height * 0.6, viewport * 0.35);
      if (travel <= 0) {
        settle();
        return;
      }
      const entered = pinned ? offset - rect.top : viewport * 0.85 - rect.top;
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
        if (panel.dataset.dealFade === undefined) {
          panel.style.transform =
            step === 1
              ? "none"
              : `translateY(${((1 - step) * 14).toFixed(2)}px)`;
        }

        // A panel that has landed plays whatever flow it holds -- see
        // `.vig-step` in globals.css. The flag comes off again on the way back
        // up, so scrolling away and returning replays the flow rather than
        // leaving a panel frozen on its last frame. Same rule as everything
        // else here: state is a function of position, never a queue.
        if (step === 1) panel.setAttribute("data-dealt", "");
        else panel.removeAttribute("data-dealt");
      });

      arrows.forEach((arrow, index) => {
        const drawn = Math.min(Math.max((dealt - (index + 0.55)) / 0.45, 0), 1);
        arrow.style.clipPath = `inset(0 ${((1 - drawn) * 100).toFixed(1)}% 0 0)`;
      });
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(paint);
    };

    // The stage is the panel plus the scroll the deal is worth -- a third of a
    // screen per panel, so five beats cost about a screen and a half rather than
    // holding the reader for two. Sized here rather than in CSS because only the
    // measured panel counts: a stage sized off `100vh` would pin for however
    // much taller than the panel the screen happens to be.
    const resize = () => {
      // The CSS media query says when pinning is *allowed*. The content still
      // has to fit below the site header. If it does not, sticky positioning
      // will preserve the panel's bottom by sliding its top above the viewport,
      // which leaves only a slice of the section heading visible. Disable the
      // pin for that viewport instead of clipping the story the user is reading.
      stage.removeAttribute("data-deal-unpinned");
      const stickyStyle = window.getComputedStyle(panel);
      const stickyTop = parseFloat(stickyStyle.top) || 0;
      const stickyAllowed = stickyStyle.position === "sticky";
      const availableHeight = (window.innerHeight || 1) - stickyTop - 16;
      const contentFits = panel.offsetHeight <= availableHeight;

      if (stickyAllowed && !contentFits) {
        stage.setAttribute("data-deal-unpinned", "");
      }

      if (stickyAllowed && contentFits) {
        const height = Math.round(
          panel.offsetHeight + panels.length * (window.innerHeight || 1) * 0.32,
        );
        stage.style.setProperty("--deal-stage-height", `${height}px`);
      } else {
        stage.style.removeProperty("--deal-stage-height");
      }
      paint();
    };

    resize();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", resize);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", resize);
    };
  }, []);

  /** The pre-deal state, also what the server sends. */
  const hidden: CSSProperties = { opacity: 0, transform: "translateY(14px)" };
  const steps = cells.length + (footer ? 1 : 0);

  return (
    <div
      ref={stageRef}
      className="deal-stage relative"
      style={
        {
          "--deal-stage-height": `calc(100vh + ${steps * 40}vh)`,
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
        {footer ? (
          <div data-deal-panel data-deal-fade style={{ opacity: 0 }}>
            {footer}
          </div>
        ) : null}
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
          "<style>.deal-stage{height:auto!important}.deal-panel{position:static!important;min-height:0!important}[data-deal-panel]{opacity:1!important;transform:none!important}[data-deal-arrow]{clip-path:none!important}.vig-step{opacity:1!important;transform:none!important}.vig-type{max-width:none!important;border-right-color:transparent!important}</style>",
      }}
    />
  );
}

export default ScrollDeal;
