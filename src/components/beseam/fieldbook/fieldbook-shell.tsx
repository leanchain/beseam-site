import type { ReactNode } from "react";

import Link from "next/link";

import { ArrowLeft, ArrowRight } from "lucide-react";

import {
  FieldbookSidebar,
  FieldbookToolbar,
} from "@/components/beseam/fieldbook/fieldbook-navigation";
import FieldbookToc from "@/components/beseam/fieldbook/fieldbook-toc";
import type { FieldbookHeading } from "@/lib/fieldbook-content";
import {
  getAdjacentFieldbookPages,
  getFieldbookNavigation,
  getFieldbookSearchIndex,
} from "@/lib/fieldbook-navigation";

export default function FieldbookShell({
  currentHref,
  headings = [],
  children,
  wide = false,
}: {
  currentHref: string;
  headings?: FieldbookHeading[];
  children: ReactNode;
  wide?: boolean;
}) {
  const navigation = getFieldbookNavigation();
  const searchEntries = getFieldbookSearchIndex();
  const { previous, next } = getAdjacentFieldbookPages(currentHref);

  return (
    <div className="min-h-screen bg-[var(--beseam-surface)] text-[var(--beseam-ink)]">
      <FieldbookToolbar groups={navigation} searchEntries={searchEntries} />
      <div
        className={
          wide
            ? "mx-auto grid max-w-[92rem] gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[15rem_minmax(0,1fr)] lg:px-10 lg:py-12"
            : "mx-auto grid max-w-[92rem] gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[15rem_minmax(0,1fr)] lg:px-10 lg:py-12 xl:grid-cols-[15rem_minmax(0,48rem)_13rem] xl:gap-10"
        }
      >
        <FieldbookSidebar groups={navigation} />
        <article className="min-w-0">
          {children}
          <FieldbookPager previous={previous} next={next} />
        </article>
        {!wide && <FieldbookToc headings={headings} />}
      </div>
    </div>
  );
}

function FieldbookPager({
  previous,
  next,
}: {
  previous?: { title: string; href: string };
  next?: { title: string; href: string };
}) {
  if (!previous && !next) return null;
  return (
    <nav
      className="mt-16 grid gap-px border border-black/16 bg-black/16 sm:grid-cols-2"
      aria-label="Fieldbook pagination"
    >
      {previous ? (
        <Link
          href={previous.href}
          className="group bg-[var(--beseam-surface)] p-5 transition-colors hover:bg-[var(--beseam-panel)]"
        >
          <span className="font-display font-semibold text-[8px] uppercase tracking-[0.08em] text-black/36">
            Previous
          </span>
          <span className="mt-3 flex items-center gap-2 text-[13px] font-semibold text-[var(--beseam-ink)]">
            <ArrowLeft className="h-4 w-4 text-[var(--beseam-accent)] transition-transform group-hover:-translate-x-0.5" />
            {previous.title}
          </span>
        </Link>
      ) : (
        <span className="hidden bg-[var(--beseam-surface)] sm:block" />
      )}
      {next ? (
        <Link
          href={next.href}
          className="group bg-[var(--beseam-surface)] p-5 text-right transition-colors hover:bg-[var(--beseam-panel)]"
        >
          <span className="font-display font-semibold text-[8px] uppercase tracking-[0.08em] text-black/36">
            Next
          </span>
          <span className="mt-3 flex items-center justify-end gap-2 text-[13px] font-semibold text-[var(--beseam-ink)]">
            {next.title}
            <ArrowRight className="h-4 w-4 text-[var(--beseam-accent)] transition-transform group-hover:translate-x-0.5" />
          </span>
        </Link>
      ) : null}
    </nav>
  );
}
