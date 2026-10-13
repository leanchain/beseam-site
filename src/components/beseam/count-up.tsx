"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A number that counts up from zero once, the first time it scrolls into
 * view. It renders the final value on the server and without motion, so the
 * page reads correctly before (or without) the animation.
 */
export default function CountUp({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  delay = 0,
  duration = 900,
}: {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  /** Milliseconds to wait after the number comes into view. */
  delay?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (
      !el ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      typeof IntersectionObserver === "undefined"
    ) {
      return;
    }
    setValue(0);
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        const start = performance.now() + delay;
        const tick = (now: number) => {
          const t = Math.min(1, Math.max(0, (now - start) / duration));
          setValue(to * (1 - Math.pow(1 - t, 3)));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [to, delay, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}
