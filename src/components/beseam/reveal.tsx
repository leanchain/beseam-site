"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

/**
 * Section-level reveal, fired by the viewport rather than by mount.
 *
 * It used to animate on mount, which meant every section on the page had
 * already played by the time the reader reached it -- the motion was spent on
 * an empty room. The reference we were asked to match (atomz.ai) stages the
 * page instead: a section waits, dimmed, until it is actually on screen and
 * then rises into place. Same 520ms curve, same `marketing-reveal` keyframes;
 * only the trigger moved.
 *
 * An element already in view when the observer attaches fires on the first
 * callback, so the hero still plays on load.
 *
 * Reduced motion and a missing IntersectionObserver both render the children
 * plainly. Scripting off is covered once, globally, by the `<noscript>` block
 * in `app/layout.tsx` -- there are two dozen call sites and none of them
 * should have to carry their own fallback.
 */
type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 14,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [phase, setPhase] = useState<"waiting" | "playing" | "static">(
    "waiting",
  );

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
      // A low threshold, because these wrap whole sections: on a tall one, a
      // tenth of the element is already more than a screenful.
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const style: CSSProperties =
    phase === "playing"
      ? ({
          "--reveal-y": String(y) + "px",
          animationDelay: String(delay) + "s",
        } as CSSProperties)
      : phase === "waiting"
        ? { opacity: 0 }
        : {};

  return (
    <div
      ref={ref}
      className={
        "marketing-stage " +
        (phase === "playing" ? "marketing-reveal " : "") +
        (className ?? "")
      }
      style={style}
    >
      {children}
    </div>
  );
}

export default Reveal;
