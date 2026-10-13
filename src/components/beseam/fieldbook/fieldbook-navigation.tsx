"use client";

import { useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { BookOpen, ChevronRight, Menu, X } from "lucide-react";

import FieldbookSearch from "@/components/beseam/fieldbook/fieldbook-search";
import type { FieldbookSearchEntry } from "@/lib/fieldbook-content";
import type { FieldbookNavGroup } from "@/lib/fieldbook-navigation";
import { cn } from "@/lib/utils";

export function FieldbookToolbar({
  groups,
  searchEntries,
}: {
  groups: FieldbookNavGroup[];
  searchEntries: FieldbookSearchEntry[];
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <div className="sticky top-[4.5rem] z-40 border-b border-black/16 bg-[var(--beseam-surface)]/96 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-[92rem] items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-[13px] font-semibold text-[var(--beseam-ink)]"
          >
            <BookOpen className="h-4 w-4 text-[var(--beseam-accent)]" />
            Commerce Fieldbook
          </Link>
          <div className="hidden w-full max-w-md sm:block">
            <FieldbookSearch entries={searchEntries} compact />
          </div>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="rounded-button inline-flex h-10 items-center gap-2 border border-black/18 px-3 text-[12px] font-semibold text-[var(--beseam-ink)] lg:hidden"
            aria-label="Browse Fieldbook navigation"
          >
            <Menu className="h-4 w-4" />
            Browse
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-[90] bg-ink-deep/48 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Fieldbook navigation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setMobileOpen(false);
          }}
        >
          <div className="ml-auto flex h-full w-[min(92vw,24rem)] flex-col bg-[var(--beseam-surface)] shadow-2xl">
            <div className="flex h-[4.5rem] items-center justify-between border-b border-black/16 px-5">
              <span className="font-serif text-[22px] text-[var(--beseam-ink)]">
                Browse the Fieldbook
              </span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="rounded-button inline-flex h-10 w-10 items-center justify-center border border-black/16"
                aria-label="Close Fieldbook navigation"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="border-b border-black/14 p-4 sm:hidden">
              <FieldbookSearch entries={searchEntries} />
            </div>
            <nav
              className="flex-1 overflow-y-auto px-5 py-6"
              aria-label="Commerce Fieldbook"
            >
              <FieldbookNavGroups
                groups={groups}
                pathname={pathname}
                onNavigate={() => setMobileOpen(false)}
              />
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

export function FieldbookSidebar({ groups }: { groups: FieldbookNavGroup[] }) {
  const pathname = usePathname();
  return (
    <aside className="hidden min-w-0 border-r border-black/14 pr-6 lg:block">
      <nav
        className="sticky top-[9.5rem] max-h-[calc(100vh-11rem)] overflow-y-auto pb-10"
        aria-label="Commerce Fieldbook"
      >
        <FieldbookNavGroups groups={groups} pathname={pathname} />
      </nav>
    </aside>
  );
}

function FieldbookNavGroups({
  groups,
  pathname,
  onNavigate,
}: {
  groups: FieldbookNavGroup[];
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <div className="space-y-7">
      {groups.map((group) => (
        <section key={group.title}>
          <h2 className="font-display text-[9px] font-semibold uppercase tracking-[0.08em] text-black/38">
            {group.title}
          </h2>
          <ul className="mt-2 space-y-0.5">
            {group.items.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    className={cn(
                      "group flex min-h-9 items-center justify-between gap-3 border-l-2 px-3 py-2 text-[12px] leading-snug transition-colors",
                      active
                        ? "border-[var(--beseam-accent)] bg-[var(--beseam-panel)] font-semibold text-[var(--beseam-ink)]"
                        : "border-transparent text-black/54 hover:border-black/18 hover:text-[var(--beseam-ink)]",
                    )}
                  >
                    <span>{item.title}</span>
                    {item.badge ? (
                      <span className="font-display font-semibold text-[8px] uppercase tracking-[0.06em] text-black/34">
                        {item.badge}
                      </span>
                    ) : active ? (
                      <ChevronRight className="h-3.5 w-3.5 text-[var(--beseam-accent)]" />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
