import Link from "next/link";

import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Boxes,
  ClipboardCheck,
  FolderGit2,
  MessagesSquare,
  Workflow,
} from "lucide-react";
import type { Metadata } from "next";

import FieldbookSearch from "@/components/beseam/fieldbook/fieldbook-search";
import {
  ECOSYSTEM_RESOURCES,
  FEATURED_RESOURCES,
} from "@/lib/commerce-fieldbook";
import { getFieldbookDocuments } from "@/lib/fieldbook-content";
import { getFieldbookSearchIndex } from "@/lib/fieldbook-navigation";
import {
  FIELDBOOK_SOCIAL_IMAGE,
  SITE_URL,
  buildPublicMetadata,
} from "@/lib/seo";

export const metadata: Metadata = buildPublicMetadata({
  title: "Commerce Fieldbook | Beseam",
  description:
    "Commerce problem guides, agent skills, team playbooks, open-source projects, standards, and official references maintained by Beseam.",
  path: "/resources",
  image: FIELDBOOK_SOCIAL_IMAGE,
});

const SECTIONS = [
  {
    title: "Start here",
    href: "/resources/start-here",
    description:
      "Learn what the Fieldbook treats as a fact, an estimate, a hypothesis, or a verified result.",
    icon: BookOpen,
  },
  {
    title: "Problems",
    href: "/resources/problems",
    description:
      "Find the symptom closest to yours, then collect the details needed to narrow the cause.",
    icon: ClipboardCheck,
  },
  {
    title: "AI Shopping Report",
    href: "/benchmarks",
    description:
      "See the public AI shopping report, including exact questions, engine-level results, dates, and method.",
    icon: BarChart3,
  },
  {
    title: "Agent skills",
    href: "/resources/skills",
    description:
      "Use a written procedure with a defined input list, output format, checks, and limits.",
    icon: Workflow,
  },
  {
    title: "Playbooks",
    href: "/resources/playbooks",
    description:
      "Give each team a role, an order of work, and a clear definition of done.",
    icon: Boxes,
  },
  {
    title: "Projects and references",
    href: "/resources/projects",
    description:
      "Read the standards, platform documentation, and open-source tools used by the guides.",
    icon: FolderGit2,
  },
  {
    title: "Contribute",
    href: "/resources/contribute",
    description:
      "Send a correction, missing problem, useful project, or publishable field result.",
    icon: MessagesSquare,
  },
] as const;

export default function ResourcesPage() {
  const problems = getFieldbookDocuments("problems");
  const skills = getFieldbookDocuments("skills");
  const playbooks = getFieldbookDocuments("playbooks");
  const searchEntries = getFieldbookSearchIndex();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/resources#webpage`,
        url: `${SITE_URL}/resources`,
        name: "Beseam Commerce Fieldbook",
        description:
          "Commerce problem guides, agent skills, team playbooks, projects, standards, and primary references maintained by Beseam.",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en",
        mainEntity: { "@id": `${SITE_URL}/resources#sections` },
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/resources#sections`,
        numberOfItems: SECTIONS.length,
        itemListElement: SECTIONS.map((section, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: section.title,
          url: `${SITE_URL}${section.href}`,
          description: section.description,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${SITE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Commerce Fieldbook",
            item: `${SITE_URL}/resources`,
          },
        ],
      },
    ],
  };

  return (
    <div className="bg-ground text-ink-deep">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="border-b border-black/18">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <nav
            aria-label="Breadcrumb"
            className="text-[13px] text-muted-foreground"
          >
            <Link href="/" className="hover:text-signal-ink">
              Beseam
            </Link>
            <span aria-hidden className="mx-2">
              /
            </span>
            <span>Resources</span>
          </nav>
          <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end lg:gap-20">
            <div>
              <h1 className="max-w-[18ch] font-serif text-[clamp(2.8rem,6.2vw,4.5rem)] font-normal leading-[1] tracking-[-0.02em]">
                Find the commerce problem in front of you.
              </h1>
              <Link
                href="/resources/start-here"
                className="mt-8 inline-flex min-h-12 items-center gap-3 bg-signal-ink px-5 text-[13px] font-semibold text-white"
              >
                Open the Fieldbook <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="max-w-2xl">
              <p className="text-[19px] leading-[1.72] text-black/66">
                The Fieldbook is Beseam&apos;s practical library for diagnosing
                commerce problems. Start with a symptom, then use the evidence
                rules, checklists, agent skills, playbooks, standards, and
                primary sources needed to investigate it without guessing.
              </p>
              <div className="mt-8">
                <FieldbookSearch entries={searchEntries} />
              </div>
              <p className="mt-5 font-mono text-[12px] uppercase tracking-[0.09em] text-black/62">
                {problems.length} problem guides · {skills.length} agent skills
                · {playbooks.length} playbooks · {ECOSYSTEM_RESOURCES.length}{" "}
                reviewed references
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/18 bg-ground-2">
        <div className="mx-auto grid max-w-[92rem] sm:grid-cols-2 lg:grid-cols-3">
          {SECTIONS.map(({ title, href, description, icon: Icon }, index) => {
            // Seven tiles in a three-column grid left the last one alone with
            // the row's rules running on across two empty cells. The odd one
            // out takes the rest of the row instead, and it is the right tile
            // for it: contributing is not browsing.
            const spans = index === SECTIONS.length - 1;
            return (
              <Link
                key={href}
                href={href}
                className={`group border-b border-black/16 p-7 transition-colors hover:bg-panel-white lg:p-9 ${
                  spans
                    ? "sm:col-span-2 lg:col-span-3"
                    : "sm:border-r lg:min-h-[18rem]"
                }`}
              >
                <Icon className="h-5 w-5 text-signal-ink" strokeWidth={1.6} />
                <h2 className="mt-9 font-serif text-[30px] tracking-[-0.02em] text-ink-deep">
                  {title}
                </h2>
                <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-black/62">
                  {description}
                </p>
                <span className="mt-7 inline-flex items-center gap-2 text-[12px] font-semibold text-signal-ink">
                  Browse section{" "}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="border-b border-black/18">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,1.35fr)] lg:gap-20">
            <div>
              <h2 className="max-w-[18ch] font-serif text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.04] tracking-[-0.02em]">
                Pick the closest symptom.
              </h2>
            </div>
            <div className="border-t border-black/18">
              {problems.slice(0, 5).map((problem, index) => (
                <Link
                  key={problem.href}
                  href={problem.href}
                  className="group grid gap-4 border-b border-black/16 py-5 sm:grid-cols-[2.5rem_13rem_1fr_auto]"
                >
                  <span className="font-mono text-[12px] text-black/62">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-signal-ink">
                      {problem.frontmatter.category}
                    </span>
                    <span className="mt-1.5 block text-[14px] font-semibold text-ink-deep">
                      {problem.frontmatter.navTitle ??
                        problem.frontmatter.title}
                    </span>
                  </span>
                  <span className="text-[12px] leading-relaxed text-black/62">
                    {problem.frontmatter.summary}
                  </span>
                  <ArrowRight className="h-4 w-4 text-signal-ink transition-transform group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/18 bg-ink-deep text-white">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
          <div className="flex flex-col gap-6 border-b border-white/16 pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="max-w-[20ch] font-serif text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.04] tracking-[-0.02em]">
                Read the rule before you change the store.
              </h2>
            </div>
            <Link
              href="/resources/projects"
              className="inline-flex items-center gap-2 text-[12px] font-semibold text-signal"
            >
              Browse all {ECOSYSTEM_RESOURCES.length} resources{" "}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-px bg-white/16 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED_RESOURCES.map((resource) => (
              <article key={resource.slug} className="bg-ink-deep p-6">
                <p className="font-mono text-[12px] uppercase tracking-[0.09em] text-white/72">
                  {resource.category}
                </p>
                <h3 className="mt-4 text-[17px] font-semibold">
                  {resource.name}
                </h3>
                <p className="mt-3 text-[12px] leading-relaxed text-white/72">
                  {resource.summary}
                </p>
                <p className="mt-5 font-mono text-[12px] uppercase tracking-[0.08em] text-signal">
                  {resource.kind} · {resource.license}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
