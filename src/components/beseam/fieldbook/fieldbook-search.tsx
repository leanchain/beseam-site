"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { useRouter } from "next/navigation";

import { ArrowRight, Command, Search, X } from "lucide-react";

import type { FieldbookSearchEntry } from "@/lib/fieldbook-content";

export default function FieldbookSearch({
  entries,
  compact = false,
}: {
  entries: FieldbookSearchEntry[];
  compact?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
      if (event.key === "/" && !isTypingTarget(event.target)) {
        event.preventDefault();
        setOpen(true);
      }
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!open) return;
    const frame = window.requestAnimationFrame(() => inputRef.current?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [open]);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return entries.slice(0, 8);
    const terms = normalized.split(/\s+/).filter(Boolean);
    return entries
      .map((entry) => {
        const title = entry.title.toLowerCase();
        const category = `${entry.section} ${entry.category}`.toLowerCase();
        const body = `${entry.summary} ${entry.keywords}`.toLowerCase();
        const score = terms.reduce((total, term) => {
          if (title === term) return total + 20;
          if (title.includes(term)) return total + 10;
          if (category.includes(term)) return total + 5;
          if (body.includes(term)) return total + 2;
          return total;
        }, 0);
        return { entry, score };
      })
      .filter(({ score }) => score > 0)
      .sort(
        (left, right) =>
          right.score - left.score ||
          left.entry.title.localeCompare(right.entry.title),
      )
      .slice(0, 12)
      .map(({ entry }) => entry);
  }, [entries, query]);

  function choose(entry: FieldbookSearchEntry) {
    setOpen(false);
    setQuery("");
    router.push(entry.href);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          compact
            ? "rounded-button inline-flex h-10 items-center gap-2 border border-black/18 bg-[var(--beseam-surface)] px-3 text-[12px] font-medium text-black/58 transition-colors hover:border-black/30 hover:text-[var(--beseam-ink)]"
            : "flex min-h-11 w-full items-center justify-between gap-4 border border-black/18 bg-[var(--beseam-surface)] px-4 text-left text-[13px] text-black/48 transition-colors hover:border-black/30 hover:text-[var(--beseam-ink)]"
        }
        aria-label="Search the Commerce Fieldbook"
      >
        <span className="inline-flex items-center gap-2">
          <Search className="h-4 w-4" />
          {compact
            ? "Search"
            : "Search problems, skills, playbooks, and projects"}
        </span>
        <span className="hidden items-center gap-1 border border-black/14 px-1.5 py-0.5 font-mono text-[9px] text-black/36 sm:inline-flex">
          <Command className="h-2.5 w-2.5" />K
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-ink-deep/58 px-4 pt-[8vh] backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Search the Commerce Fieldbook"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <div className="w-full max-w-2xl border border-black/24 bg-[var(--beseam-surface)] shadow-[0_28px_90px_rgba(17,19,24,0.28)]">
            <div className="flex items-center gap-3 border-b border-black/16 px-4">
              <Search className="h-5 w-5 shrink-0 text-[var(--beseam-accent)]" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search the Fieldbook"
                className="h-16 min-w-0 flex-1 bg-transparent text-[17px] text-[var(--beseam-ink)] outline-none placeholder:text-black/34"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-button inline-flex h-10 w-10 items-center justify-center border border-black/16 text-black/48 hover:text-[var(--beseam-ink)]"
                aria-label="Close search"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="max-h-[64vh] overflow-y-auto p-2">
              {results.length > 0 ? (
                results.map((entry) => (
                  <button
                    key={`${entry.href}-${entry.title}`}
                    type="button"
                    onClick={() => choose(entry)}
                    className="group grid w-full grid-cols-[1fr_auto] gap-5 border-b border-black/12 px-4 py-4 text-left transition-colors last:border-b-0 hover:bg-[var(--beseam-panel)]"
                  >
                    <span>
                      <span className="font-display font-semibold text-[9px] uppercase tracking-[0.09em] text-[var(--beseam-accent)]">
                        {entry.section} · {entry.category}
                      </span>
                      <span className="mt-1.5 block text-[15px] font-semibold text-[var(--beseam-ink)]">
                        {entry.title}
                      </span>
                      <span className="mt-1 block text-[12px] leading-relaxed text-black/50">
                        {entry.summary}
                      </span>
                    </span>
                    <ArrowRight className="mt-5 h-4 w-4 text-[var(--beseam-accent)] transition-transform group-hover:translate-x-0.5" />
                  </button>
                ))
              ) : (
                <div className="px-5 py-12 text-center">
                  <p className="font-serif text-[28px] text-[var(--beseam-ink)]">
                    No matching Fieldbook pages.
                  </p>
                  <p className="mt-2 text-[13px] text-black/48">
                    Try a symptom, platform, standard, or workflow name.
                  </p>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between border-t border-black/14 px-4 py-3 font-display font-semibold text-[9px] uppercase tracking-[0.08em] text-black/36">
              <span>{results.length} results</span>
              <span>Esc to close · / to search</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.isContentEditable
  );
}
