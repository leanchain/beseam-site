import Link from "next/link";

import { ArrowRight } from "lucide-react";

import FieldbookDocumentHeader from "@/components/beseam/fieldbook/fieldbook-document-header";
import { FieldbookMdx } from "@/components/beseam/fieldbook/fieldbook-mdx";
import FieldbookShell from "@/components/beseam/fieldbook/fieldbook-shell";
import SkillActions from "@/components/beseam/fieldbook/skill-actions";
import { getResource } from "@/lib/commerce-fieldbook";
import {
  getFieldbookDocument,
  type FieldbookDocument,
} from "@/lib/fieldbook-content";
import { SITE_URL } from "@/lib/seo";

export default async function FieldbookDocumentPage({
  document,
}: {
  document: FieldbookDocument;
}) {
  const relatedSkills = (document.frontmatter.relatedSkills ?? [])
    .map((slug) => getFieldbookDocument("skills", slug))
    .filter((item): item is FieldbookDocument => Boolean(item));
  const relatedProblems = (document.frontmatter.relatedProblems ?? [])
    .map((slug) => getFieldbookDocument("problems", slug))
    .filter((item): item is FieldbookDocument => Boolean(item));
  const relatedResources = (document.frontmatter.relatedResources ?? [])
    .map(getResource)
    .filter((item): item is NonNullable<ReturnType<typeof getResource>> =>
      Boolean(item),
    );
  const isSkill = document.section === "skills";
  const copyText = `# ${document.frontmatter.title}\n\n${document.frontmatter.summary}\n\n${document.content}`;
  const sectionLabel =
    document.section === "start-here"
      ? "Start here"
      : document.section === "problems"
        ? "Problems"
        : document.section === "skills"
          ? "Agent skills"
          : document.section === "playbooks"
            ? "Playbooks"
            : "Commerce Fieldbook";
  const sectionHref =
    document.section === "pages"
      ? "/resources"
      : `/resources/${document.section}`;
  const breadcrumbs = [
    { name: "Home", item: `${SITE_URL}/` },
    { name: "Commerce Fieldbook", item: `${SITE_URL}/resources` },
    ...(sectionHref !== "/resources" && sectionHref !== document.href
      ? [{ name: sectionLabel, item: `${SITE_URL}${sectionHref}` }]
      : []),
    { name: document.frontmatter.title, item: `${SITE_URL}${document.href}` },
  ];
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${SITE_URL}${document.href}#article`,
        headline: document.frontmatter.title,
        description: document.frontmatter.summary,
        mainEntityOfPage: { "@id": `${SITE_URL}${document.href}` },
        author: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        dateModified: document.frontmatter.reviewedAt,
        inLanguage: "en",
        isAccessibleForFree: true,
        articleSection: sectionLabel,
        keywords: [
          document.frontmatter.category,
          document.frontmatter.kind,
          ...(document.frontmatter.worksWith ?? []),
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}${document.href}#breadcrumb`,
        itemListElement: breadcrumbs.map((crumb, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: crumb.name,
          item: crumb.item,
        })),
      },
    ],
  };

  return (
    <FieldbookShell currentHref={document.href} headings={document.headings}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FieldbookDocumentHeader document={document} />
      {isSkill && (
        <SkillActions
          copyText={copyText}
          downloadHref={`/fieldbook/skills/${document.slug}/SKILL.md`}
        />
      )}
      <div className="mt-12">
        <FieldbookMdx source={document.content} />
      </div>
      {(relatedSkills.length > 0 ||
        relatedProblems.length > 0 ||
        relatedResources.length > 0) && (
        <section className="mt-14 border-t border-black/18 pt-9">
          <p className="font-display text-[9px] font-semibold uppercase tracking-[0.08em] text-[var(--beseam-accent)]">
            Related pages
          </p>
          <h2 className="mt-4 font-serif text-[32px] tracking-[-0.035em] text-[var(--beseam-ink)]">
            Keep working on this issue
          </h2>
          {(relatedSkills.length > 0 || relatedProblems.length > 0) && (
            <div className="mt-6 grid gap-px border border-black/16 bg-black/16 sm:grid-cols-2">
              {[...relatedProblems, ...relatedSkills].map((related) => (
                <Link
                  key={related.href}
                  href={related.href}
                  className="group bg-[var(--beseam-surface)] p-5 transition-colors hover:bg-[var(--beseam-panel)]"
                >
                  <p className="font-display font-semibold text-[8px] uppercase tracking-[0.09em] text-[var(--beseam-accent)]">
                    {related.frontmatter.kind}
                  </p>
                  <h3 className="mt-3 text-[15px] font-semibold text-[var(--beseam-ink)]">
                    {related.frontmatter.title}
                  </h3>
                  <p className="mt-2 text-[12px] leading-relaxed text-black/50">
                    {related.frontmatter.summary}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold text-[var(--beseam-accent)]">
                    Open page{" "}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          )}
          {relatedResources.length > 0 && (
            <div className="mt-6 border-t border-black/14">
              {relatedResources.map((resource) => (
                <Link
                  key={resource.slug}
                  href={`/resources/projects/${resource.slug}`}
                  className="group grid gap-3 border-b border-black/14 py-4 sm:grid-cols-[12rem_1fr_auto]"
                >
                  <div>
                    <p className="font-display font-semibold text-[8px] uppercase tracking-[0.08em] text-black/38">
                      {resource.kind}
                    </p>
                    <h3 className="mt-1.5 text-[13px] font-semibold text-[var(--beseam-ink)]">
                      {resource.name}
                    </h3>
                  </div>
                  <p className="text-[12px] leading-relaxed text-black/50">
                    {resource.summary}
                  </p>
                  <ArrowRight className="h-3.5 w-3.5 text-[var(--beseam-accent)] transition-transform group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          )}
        </section>
      )}
    </FieldbookShell>
  );
}
