import Link from "next/link";

import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

import FieldbookShell from "@/components/beseam/fieldbook/fieldbook-shell";
import { getFieldbookDocuments } from "@/lib/fieldbook-content";
import { FIELDBOOK_SOCIAL_IMAGE, buildPublicMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPublicMetadata({
  title: "Agent Skills | Beseam Commerce Fieldbook",
  description:
    "Versioned, evidence-aware ecommerce workflows for Claude, coding agents, other assistants, and human operators.",
  path: "/resources/skills",
  image: FIELDBOOK_SOCIAL_IMAGE,
});

export default function SkillsIndexPage() {
  const skills = getFieldbookDocuments("skills");
  return (
    <FieldbookShell currentHref="/resources/skills">
      <header className="border-b border-black/18 pb-10">
        <p className="font-display font-semibold text-[9px] uppercase tracking-[0.08em] text-[var(--beseam-accent)]">
          Commerce Fieldbook / Agent skills
        </p>
        <h1 className="mt-6 max-w-[12ch] font-serif text-[clamp(3.2rem,5vw,5.2rem)] leading-[0.98] tracking-[-0.05em]">
          Reusable workflows, not magic prompts.
        </h1>
        <p className="mt-7 max-w-3xl text-[18px] leading-relaxed text-black/62">
          Each skill states its inputs, expected output, checks, safety
          boundaries, version, and supporting primary references.
        </p>
      </header>
      <div className="mt-8 grid gap-px border border-black/16 bg-black/16 sm:grid-cols-2">
        {skills.map((skill) => (
          <Link
            key={skill.href}
            href={skill.href}
            className="group flex min-h-full flex-col bg-[var(--beseam-surface)] p-6 transition-colors hover:bg-[var(--beseam-panel)]"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="font-display font-semibold text-[8px] uppercase tracking-[0.09em] text-[var(--beseam-accent)]">
                {skill.frontmatter.category}
              </span>
              <span className="font-display font-semibold text-[8px] uppercase tracking-[0.08em] text-black/36">
                v{skill.frontmatter.version}
              </span>
            </div>
            <h2 className="mt-5 text-[18px] font-semibold leading-snug text-[var(--beseam-ink)]">
              {skill.frontmatter.title}
            </h2>
            <p className="mt-3 text-[13px] leading-relaxed text-black/52">
              {skill.frontmatter.summary}
            </p>
            <p className="mt-5 font-display font-semibold text-[8px] uppercase tracking-[0.08em] text-black/34">
              Works with {skill.frontmatter.worksWith?.join(" · ")}
            </p>
            <span className="mt-auto inline-flex items-center gap-2 pt-6 text-[11px] font-semibold text-[var(--beseam-accent)]">
              Open skill{" "}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </FieldbookShell>
  );
}
