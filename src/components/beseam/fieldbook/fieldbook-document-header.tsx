import Link from "next/link";

import { CalendarDays, Gauge, GitBranch, Users } from "lucide-react";

import type { FieldbookDocument } from "@/lib/fieldbook-content";

export default function FieldbookDocumentHeader({
  document,
}: {
  document: FieldbookDocument;
}) {
  const { frontmatter } = document;
  return (
    <header className="border-b border-black/18 pb-10">
      <div className="flex flex-wrap items-center gap-2 font-display font-semibold text-[9px] uppercase tracking-[0.08em] text-black/42">
        <Link href="/resources" className="text-[var(--beseam-accent)]">
          Fieldbook
        </Link>
        <span>/</span>
        <span>{frontmatter.category}</span>
      </div>
      <h1 className="mt-6 max-w-[14ch] font-serif text-[clamp(3rem,5vw,5.2rem)] font-normal leading-[0.98] tracking-[-0.05em] text-[var(--beseam-ink)]">
        {frontmatter.title}
      </h1>
      <p className="mt-7 max-w-3xl text-[18px] leading-[1.7] text-black/62">
        {frontmatter.summary}
      </p>
      {frontmatter.audienceNote && (
        <div className="mt-6 flex max-w-3xl items-start gap-3 border-l-2 border-[var(--beseam-accent)] bg-[var(--beseam-panel)] px-4 py-3">
          <Users className="mt-0.5 h-4 w-4 shrink-0 text-[var(--beseam-accent)]" />
          <p className="text-[13px] leading-relaxed text-black/68">
            <span className="font-semibold text-[var(--beseam-ink)]">
              Who does this:{" "}
            </span>
            {frontmatter.audienceNote}
          </p>
        </div>
      )}
      <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 border-t border-black/14 pt-5 font-display font-semibold text-[9px] uppercase tracking-[0.08em] text-black/42">
        {frontmatter.version && (
          <span className="inline-flex items-center gap-2">
            <GitBranch className="h-3 w-3" />
            Version {frontmatter.version}
          </span>
        )}
        {frontmatter.difficulty && (
          <span className="inline-flex items-center gap-2">
            <Gauge className="h-3 w-3" />
            {frontmatter.difficulty}
          </span>
        )}
        <span className="inline-flex items-center gap-2">
          <CalendarDays className="h-3 w-3" />
          Reviewed {frontmatter.reviewedAt}
        </span>
      </div>
      {frontmatter.worksWith && frontmatter.worksWith.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {frontmatter.worksWith.map((item) => (
            <span
              key={item}
              className="border border-black/14 bg-[var(--beseam-panel)] px-2.5 py-1 font-display font-semibold text-[8px] uppercase tracking-[0.07em] text-black/46"
            >
              {item}
            </span>
          ))}
        </div>
      )}
    </header>
  );
}
