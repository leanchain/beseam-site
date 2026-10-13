"use client";

import { useEffect, useState } from "react";

import type { FieldbookHeading } from "@/lib/fieldbook-content";
import { cn } from "@/lib/utils";

export default function FieldbookToc({
  headings,
}: {
  headings: FieldbookHeading[];
}) {
  const [activeId, setActiveId] = useState(headings[0]?.id ?? "");

  useEffect(() => {
    if (headings.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (left, right) =>
              left.boundingClientRect.top - right.boundingClientRect.top,
          );
        if (visible[0]?.target.id) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-18% 0px -70% 0px", threshold: [0, 1] },
    );
    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((element): element is HTMLElement => Boolean(element));
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <aside className="hidden xl:block">
      <div className="sticky top-[9.5rem] border-l border-black/14 pl-5">
        <p className="font-display text-[9px] font-semibold uppercase tracking-[0.08em] text-black/38">
          On this page
        </p>
        <ul className="mt-4 space-y-2.5">
          {headings.map((heading) => (
            <li
              key={heading.id}
              className={heading.level === 3 ? "pl-3" : undefined}
            >
              <a
                href={`#${heading.id}`}
                className={cn(
                  "block text-[11px] leading-relaxed transition-colors",
                  activeId === heading.id
                    ? "font-semibold text-[var(--beseam-accent)]"
                    : "text-black/46 hover:text-[var(--beseam-ink)]",
                )}
              >
                {heading.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
