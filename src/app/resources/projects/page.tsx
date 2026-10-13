import type { Metadata } from "next";

import FieldbookShell from "@/components/beseam/fieldbook/fieldbook-shell";
import ResourceIndex from "@/components/beseam/resource-index";
import {
  ECOSYSTEM_RESOURCES,
  FIELD_REVIEW_DATE,
  RESOURCE_CATEGORIES,
} from "@/lib/commerce-fieldbook";
import { FIELDBOOK_SOCIAL_IMAGE, buildPublicMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPublicMetadata({
  title: "Projects and References | Beseam Commerce Fieldbook",
  description:
    "A reviewed index of agent skills, commerce platforms, standards, primary documentation, testing tools, and operational references.",
  path: "/resources/projects",
  image: FIELDBOOK_SOCIAL_IMAGE,
});

export default function ProjectsPage() {
  return (
    <FieldbookShell currentHref="/resources/projects" wide>
      <header className="border-b border-black/18 pb-10">
        <p className="font-display font-semibold text-[9px] uppercase tracking-[0.08em] text-[var(--beseam-accent)]">
          Commerce Fieldbook / Projects and references
        </p>
        <div className="mt-6 grid gap-8 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:items-end xl:gap-16">
          <h1 className="max-w-[12ch] font-serif text-[clamp(3.2rem,5vw,5.3rem)] leading-[0.98] tracking-[-0.05em]">
            The wider ecosystem behind better commerce operations.
          </h1>
          <div>
            <p className="max-w-2xl text-[17px] leading-relaxed text-black/62">
              {ECOSYSTEM_RESOURCES.length} reviewed resources across{" "}
              {RESOURCE_CATEGORIES.length} operational categories. Every entry
              names its maintainer, license or usage boundary, review date, and
              practical reason for inclusion.
            </p>
            <p className="mt-4 text-[12px] leading-relaxed text-black/46">
              Beseam curates the index; it does not repackage external work as
              its own. The official source remains authoritative for current
              releases, compatibility, support, and usage terms.
            </p>
            <p className="mt-4 font-display font-semibold text-[8px] uppercase tracking-[0.09em] text-[var(--beseam-accent)]">
              Catalog review date · {FIELD_REVIEW_DATE}
            </p>
          </div>
        </div>
      </header>
      <div className="mt-10">
        <ResourceIndex resources={ECOSYSTEM_RESOURCES} />
      </div>
    </FieldbookShell>
  );
}
