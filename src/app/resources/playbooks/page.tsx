import Link from "next/link";

import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

import FieldbookShell from "@/components/beseam/fieldbook/fieldbook-shell";
import { getFieldbookDocuments } from "@/lib/fieldbook-content";
import { FIELDBOOK_SOCIAL_IMAGE, buildPublicMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPublicMetadata({
  title: "Commerce Playbooks | Beseam Commerce Fieldbook",
  description:
    "Coordinated ecommerce investigation and verification sequences for catalog, storefront, discovery, and purchase operations.",
  path: "/resources/playbooks",
  image: FIELDBOOK_SOCIAL_IMAGE,
});

export default function PlaybooksPage() {
  const playbooks = getFieldbookDocuments("playbooks");
  return (
    <FieldbookShell currentHref="/resources/playbooks">
      <header className="border-b border-black/18 pb-10">
        <p className="font-display font-semibold text-[9px] uppercase tracking-[0.08em] text-[var(--beseam-accent)]">
          Commerce Fieldbook / Playbooks
        </p>
        <h1 className="mt-6 max-w-[13ch] font-serif text-[clamp(3.2rem,5vw,5.2rem)] leading-[0.98] tracking-[-0.05em]">
          Coordinate the investigation, not just the checklist.
        </h1>
        <p className="mt-7 max-w-3xl text-[18px] leading-relaxed text-black/62">
          Playbooks connect roles, evidence, controlled actions, and exit
          criteria when a workflow crosses system or team boundaries.
        </p>
      </header>
      <div className="mt-8 border-t border-black/18">
        {playbooks.map((playbook, index) => (
          <Link
            key={playbook.href}
            href={playbook.href}
            className="group grid gap-4 border-b border-black/16 py-6 sm:grid-cols-[2.5rem_1fr_auto]"
          >
            <span className="font-mono text-[9px] text-black/34">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>
              <span className="font-display font-semibold text-[8px] uppercase tracking-[0.09em] text-[var(--beseam-accent)]">
                {playbook.frontmatter.category}
              </span>
              <span className="mt-2 block text-[17px] font-semibold text-[var(--beseam-ink)]">
                {playbook.frontmatter.title}
              </span>
              <span className="mt-2 block text-[13px] leading-relaxed text-black/52">
                {playbook.frontmatter.summary}
              </span>
            </span>
            <ArrowRight className="h-4 w-4 text-[var(--beseam-accent)] transition-transform group-hover:translate-x-0.5" />
          </Link>
        ))}
      </div>
    </FieldbookShell>
  );
}
