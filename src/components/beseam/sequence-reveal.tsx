"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

/**
 * Scroll-triggered sibling of `Reveal`.
 *
 * `Reveal` fires on mount, so a grid of four panels resolves as one block long
 * before a visitor reaches it. A merchant reading the four-step flow said the
 * panels were too dense to take in at once and asked to see them "one after
 * another", so this variant waits until the group is actually on screen and
 * then plays each panel `index * gap` seconds apart.
 *
 * It reuses the `marketing-reveal` keyframes rather than pulling in a motion
 * library, and it is deliberately used in exactly two sections — #one-system
 * and #proof — because a page where every section moves is worse than one that
 * does not move at all.
 *
 * Reduced motion and a missing IntersectionObserver both fall back to static
 * markup. `SequenceRevealFallback` covers scripting being off entirely.
 */
type SequenceRevealProps = {
  children: ReactNode;
  className?: string;
  /** Position in the sequence: step n waits n x `gap` seconds. */
  index?: number;
  /** Seconds between consecutive steps. */
  gap?: number;
  y?: number;
};

export function SequenceReveal({
  children,
  className,
  index = 0,
  gap = 0.18,
  y = 16,
}: SequenceRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [phase, setPhase] = useState<"waiting" | "playing" | "static">(
    "waiting",
  );
  const [stacked, setStacked] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const hasMedia = typeof window.matchMedia === "function";

    // Stacked layouts arrive one panel at a time on their own, so the queue
    // position would only make the last one sit and wait after it is already
    // on screen. The stagger is for panels that land together.
    setStacked(hasMedia && window.matchMedia("(max-width: 1023px)").matches);

    const reduced =
      hasMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || typeof IntersectionObserver === "undefined") {
      setPhase("static");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setPhase("playing");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const step = stacked ? 0 : index;

  const style: CSSProperties =
    phase === "playing"
      ? ({
          "--reveal-y": String(y) + "px",
          "--seq-base": String(step * gap + 0.2) + "s",
          animationDelay: String(step * gap) + "s",
        } as CSSProperties)
      : phase === "waiting"
        ? { opacity: 0 }
        : {};

  return (
    <div
      ref={ref}
      className={
        "sequence-reveal " +
        (phase === "playing" ? "marketing-reveal is-playing " : "") +
        (className ?? "")
      }
      style={style}
    >
      {children}
    </div>
  );
}

/**
 * Without scripting the observer never runs and the panels would stay at
 * `opacity: 0`. Render this once alongside a sequence.
 */
export function SequenceRevealFallback() {
  return (
    <noscript
      dangerouslySetInnerHTML={{
        __html:
          "<style>.sequence-reveal{opacity:1!important;transform:none!important}</style>",
      }}
    />
  );
}

export default SequenceReveal;
