import Link from "next/link";

import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

import FieldbookShell from "@/components/beseam/fieldbook/fieldbook-shell";
import { getFieldbookDocuments } from "@/lib/fieldbook-content";
import { FIELDBOOK_SOCIAL_IMAGE, buildPublicMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPublicMetadata({
  title: "Ecommerce Problems | Beseam Commerce Fieldbook",
  description:
    "Evidence-first investigation paths for common ecommerce discovery, catalog, purchase, and measurement problems.",
  path: "/resources/problems",
  image: FIELDBOOK_SOCIAL_IMAGE,
});

export default function ProblemsIndexPage() {
  const problems = getFieldbookDocuments("problems");
  return (
    <FieldbookShell currentHref="/resources/problems">
      <header className="border-b border-black/18 pb-10">
        <p className="font-display font-semibold text-[9px] uppercase tracking-[0.08em] text-[var(--beseam-accent)]">
          Commerce Fieldbook / Problems
        </p>
        <h1 className="mt-6 max-w-[12ch] font-serif text-[clamp(3.2rem,5vw,5.2rem)] leading-[0.98] tracking-[-0.05em]">
          Start with what your team can actually observe.
        </h1>
        <p className="mt-7 max-w-3xl text-[18px] leading-relaxed text-black/62">
          Problem guides separate symptoms, evidence, investigation moves, and
          premature conclusions before recommending a workflow.
        </p>
      </header>
      <div className="mt-8 border-t border-black/18">
        {problems.map((problem, index) => (
          <Link
            key={problem.href}
            href={problem.href}
            className="group grid gap-4 border-b border-black/16 py-6 sm:grid-cols-[2.5rem_1fr_auto]"
          >
            <span className="font-mono text-[9px] text-black/34">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>
              <span className="font-display font-semibold text-[8px] uppercase tracking-[0.09em] text-[var(--beseam-accent)]">
                {problem.frontmatter.category} ·{" "}
                {problem.frontmatter.difficulty}
              </span>
              <span className="mt-2 block text-[17px] font-semibold text-[var(--beseam-ink)]">
                {problem.frontmatter.title}
              </span>
              <span className="mt-2 block text-[13px] leading-relaxed text-black/52">
                {problem.frontmatter.summary}
              </span>
            </span>
            <ArrowRight className="h-4 w-4 text-[var(--beseam-accent)] transition-transform group-hover:translate-x-0.5" />
          </Link>
        ))}
      </div>
    </FieldbookShell>
  );
}
