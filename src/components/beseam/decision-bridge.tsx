"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

import ConnectedSystemMap from "@/components/beseam/connected-system-map";
import { Reveal } from "@/components/beseam/reveal";

type CompactBridgeCopy = {
  center: string;
  inputs: readonly string[];
  outputs: readonly string[];
  link: string;
};

type DecisionBridgeProps = {
  id?: string;
  eyebrow?: string;
  heading?: string;
  body?: string;
  exploreHref?: string | null;
  exploreLabel?: string;
  /** Homepage copy still marks this as the section that gets the desktop
   * scroll-pinned treatment. The visual itself is now the same connected map
   * at every breakpoint; there is no separate mobile summary. */
  compact?: CompactBridgeCopy;
  surfaceClassName?: string;
};

export default function DecisionBridge({
  id = "one-system",
  eyebrow = "Shopping is moving from finding products to choosing products",
  heading = "See the whole shopper journey in one place.",
  body = "AI discovery, product pages, shopper behavior, and revenue should not live in separate dashboards. Beseam keeps them together, finds what to improve, prepares the change, and checks what happened afterward. You approve customer-facing changes.",
  exploreHref = "/platform",
  exploreLabel,
  compact,
  surfaceClassName = "bg-ground",
}: DecisionBridgeProps) {
  const pinDesktop = Boolean(compact);
  const stageRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [stageHeight, setStageHeight] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useLayoutEffect(() => {
    if (!pinDesktop || typeof window === "undefined") return;
    const panel = panelRef.current;
    if (!panel) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const measure = () => {
      const canPin =
        window.innerWidth >= 1024 &&
        window.innerHeight >= 800 &&
        !reduced.matches;
      setStageHeight(
        canPin
          ? Math.ceil(
              panel.getBoundingClientRect().height + window.innerHeight * 1.8,
            )
          : null,
      );
    };

    measure();
    const observer =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(measure);
    observer?.observe(panel);
    window.addEventListener("resize", measure);
    reduced.addEventListener?.("change", measure);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", measure);
      reduced.removeEventListener?.("change", measure);
    };
  }, [pinDesktop]);

  useEffect(() => {
    if (!pinDesktop || stageHeight === null || typeof window === "undefined") {
      setScrollProgress(0);
      return;
    }
    const stage = stageRef.current;
    const panel = panelRef.current;
    if (!stage || !panel) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const stageRect = stage.getBoundingClientRect();
      const panelHeight = panel.getBoundingClientRect().height;
      const scrollDistance = Math.max(stageRect.height - panelHeight, 1);
      const stickyTop = 88;
      setScrollProgress(
        Math.max(0, Math.min(1, (stickyTop - stageRect.top) / scrollDistance)),
      );
    };
    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pinDesktop, stageHeight]);

  return (
    <section
      id={id}
      className={`scroll-mt-24 border-t border-black/10 ${surfaceClassName}`}
    >
      <div
        ref={stageRef}
        style={
          stageHeight === null ? undefined : { height: `${stageHeight}px` }
        }
      >
        <div
          ref={panelRef}
          className={`mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 ${
            stageHeight === null
              ? "lg:py-28"
              : "sticky top-[5.5rem] lg:pt-8 lg:pb-16"
          }`}
        >
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end lg:gap-16">
              <div>
                {eyebrow ? (
                  <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-signal-ink">
                    {eyebrow}
                  </p>
                ) : null}
                <h2
                  className={`${eyebrow ? "mt-7 " : ""}max-w-[18ch] text-balance font-display text-[clamp(2.3rem,3.8vw,3.9rem)] font-normal leading-[1.03] tracking-[-0.02em] text-ink-deep`}
                >
                  {heading}
                </h2>
              </div>
              <p className="max-w-[52ch] text-[16px] leading-[1.75] text-black/64">
                {body}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className={stageHeight === null ? "mt-12 lg:mt-16" : "mt-8"}>
              <ConnectedSystemMap
                exploreHref={exploreHref}
                exploreLabel={exploreLabel}
                scrollProgress={stageHeight === null ? undefined : scrollProgress}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
