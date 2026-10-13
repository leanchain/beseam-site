"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

/**
 * Plays a one-time entrance for the `.fx-item` / `.fx-pop` elements inside
 * it, the first time it scrolls into view (see `globals.css`). It never
 * loops: the page's one continuously moving element is "How it works".
 *
 * The hidden start state only applies when scripting is on and the visitor
 * has not asked for reduced motion, so without either the content is simply
 * there.
 */
export default function RevealOnView({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      typeof IntersectionObserver === "undefined"
    ) {
      setShown(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-shown={shown ? "true" : "false"}
      className={`fx-scope ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
