import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ArrowRight,
  Check,
  Combine,
  ExternalLink,
  Sparkles,
  Wrench,
} from "lucide-react";

import {
  Band,
  CompareCta,
  CompareHero,
  CompareTable,
  LinkCard,
  TILES,
} from "@/components/beseam/compare-ui";
import FaqGrid from "@/components/beseam/faq-grid";
import { localizedPath, type Locale } from "@/i18n/locale-rules.mjs";
import { getPageCopy } from "@/i18n/pages";
import {
  getComparison,
  getComparisons,
  getPracticalComparison,
} from "@/lib/comparisons";
import { COMPARE_SOCIAL_IMAGE, SITE_URL } from "@/lib/seo";

export default function ComparisonPage({
  slug,
  locale = "en",
}: {
  slug: string;
  locale?: Locale;
}) {
  const comparison = getComparison(slug, locale);
  if (!comparison) notFound();

  const copy = getPageCopy(locale);
  const t = copy.compare;
  const link = (href: string) => localizedPath(href, locale);
  const formatReviewDate = (value: string) =>
    new Intl.DateTimeFormat(copy.common.dateLocale, {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(`${value}T00:00:00Z`));
  const url = `${SITE_URL}${link(`/compare/${comparison.slug}`)}`;
  const practical = getPracticalComparison(slug, locale);
  const related = getComparisons(locale)
    .filter((item) => item.slug !== comparison.slug)
    .slice(0, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: comparison.metaTitle,
    description: comparison.metaDescription,
    mainEntityOfPage: {
      "@id": url,
    },
    author: { "@id": "https://beseam.com/#organization" },
    publisher: { "@id": "https://beseam.com/#organization" },
    dateModified: comparison.lastReviewed,
    articleSection: "Platform comparisons",
    inLanguage: locale,
    isAccessibleForFree: true,
    image: {
      "@type": "ImageObject",
      url: `${SITE_URL}${COMPARE_SOCIAL_IMAGE}`,
      width: 1200,
      height: 630,
    },
    about: [
      { "@type": "Thing", name: comparison.name },
      { "@type": "Thing", name: comparison.category },
      { "@type": "Thing", name: "Buying decisions" },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: comparison.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Beseam",
        item: `${SITE_URL}${link("/")}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t.breadcrumb,
        item: `${SITE_URL}${link("/compare")}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: t.vs(comparison.name),
        item: url,
      },
    ],
  };

  return (
    <article className="bg-ground text-ink-deep">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <CompareHero
        crumbs={[
          { label: "Beseam", href: link("/") },
          { label: t.breadcrumb, href: link("/compare") },
          { label: t.vs(comparison.name) },
        ]}
        title={comparison.headline}
        intro={comparison.intro}
        breadcrumbLabel={copy.common.breadcrumb}
        meta={t.reviewed(
          comparison.category,
          formatReviewDate(comparison.lastReviewed),
        )}
      />

      <Band heading={t.choiceHeading(comparison.name)}>
        <ul className="mt-10 grid gap-5 md:grid-cols-3 md:grid-rows-[auto_auto_1fr] lg:mt-12 lg:gap-6">
          {(
            [
              [
                t.chooseCompetitor(comparison.name),
                comparison.competitorSummary,
                Wrench,
              ],
              [t.chooseBeseam, comparison.beseamSummary, Sparkles],
              [t.useBoth, comparison.useTogetherSummary, Combine],
            ] as const
          ).map(([title, detail, Icon], index) => (
            <li
              key={title}
              className="rounded-media border border-black/10 bg-white p-6 sm:p-7 md:row-span-3 md:grid md:grid-rows-subgrid md:gap-0"
            >
              <span
                className="flex h-12 w-12 items-center justify-center rounded-media text-ink-deep"
                style={{ background: TILES[index % TILES.length] }}
              >
                <Icon aria-hidden="true" className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-[19px] font-semibold tracking-[-0.01em] text-ink-deep">
                {title}
              </h3>
              <p className="mt-2 text-[15px] leading-[1.6] text-black/64">
                {detail}
              </p>
            </li>
          ))}
        </ul>
        <div className="mx-auto mt-6 max-w-[64rem] rounded-media bg-[#fff9e8] p-6 sm:p-7">
          <h3 className="text-[17px] font-semibold text-ink-deep">
            {t.notReplace}
          </h3>
          <p className="mt-2 text-[15px] leading-[1.65] text-black/68">
            {comparison.notAReplacementFor}
          </p>
        </div>
      </Band>

      {practical ? (
        <Band
          warm
          heading={t.practiceHeading}
          intro={t.checked(formatReviewDate(practical.reviewedAt))}
        >
          <CompareTable
            firstLabel={t.practicalQuestion}
            competitor={comparison.name}
            rows={practical.rows.map((row) => ({
              label: row.criterion,
              competitor: row.competitor,
              beseam: row.beseam,
            }))}
          />
          <a
            href={practical.source.url}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-[14px] font-medium text-black/56 transition-colors hover:text-ink-deep"
          >
            {practical.source.label}
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </Band>
      ) : null}

      <Band warm={!practical} heading={t.fitHeading}>
        <div className="mx-auto mt-10 grid max-w-[64rem] gap-5 md:grid-cols-2 lg:mt-12 lg:gap-6">
          {(
            [
              [comparison.name, comparison.chooseCompetitorWhen, false],
              ["Beseam", comparison.chooseBeseamWhen, true],
            ] as const
          ).map(([name, items, beseam]) => (
            <div
              key={name}
              className={`rounded-media bg-white p-6 sm:p-7 ${
                beseam
                  ? "border border-ink-deep ring-1 ring-ink-deep"
                  : "border border-black/10"
              }`}
            >
              <h3 className="text-[19px] font-semibold tracking-[-0.01em] text-ink-deep">
                {t.chooseWhen(name)}
              </h3>
              <ul className="mt-5 space-y-3.5">
                {items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[15px] leading-[1.55] text-black/72"
                  >
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                        beseam ? "bg-signal" : "bg-black/[0.06]"
                      } text-ink-deep`}
                    >
                      <Check aria-hidden="true" className="h-3 w-3" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Band>

      <Band warm={Boolean(practical)} heading={t.howHeading}>
        <CompareTable
          firstLabel={t.question}
          competitor={comparison.name}
          rows={comparison.rows.map((row) => ({
            label: row.criterion,
            competitor: row.competitor,
            beseam: row.beseam,
          }))}
        />
      </Band>

      <Band warm={!practical} heading={t.workflowHeading}>
        <CompareTable
          firstLabel={t.step}
          competitor={comparison.name}
          numbered
          rows={comparison.workflow.map((item) => ({
            label: item.step,
            competitor: item.competitor,
            beseam: item.beseam,
          }))}
        />
      </Band>

      <Band warm={Boolean(practical)} heading={t.evidenceHeading}>
        <p className="mx-auto mt-5 max-w-[62ch] text-center text-[16px] leading-[1.7] text-black/64">
          {comparison.evidence.caption}
        </p>
        <figure className="mt-10 overflow-hidden rounded-media border border-black/10 bg-white p-2 shadow-[0_18px_40px_-24px_rgba(17,19,24,0.35)] lg:mt-12">
          <Image
            src={comparison.evidence.src}
            alt={comparison.evidence.alt}
            width={1600}
            height={1000}
            className="h-auto w-full rounded-[6px]"
          />
        </figure>
      </Band>

      <FaqGrid
        heading={t.faqHeading}
        items={comparison.faqs}
        eyebrow={null}
        className={practical ? "bg-ground" : "bg-[#fff9e8]"}
      />

      <section className={practical ? "bg-[#fff9e8]" : "bg-ground"}>
        <div className="mx-auto grid max-w-[76rem] gap-10 px-5 py-12 sm:px-8 sm:py-14 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-16">
          <div>
            <h2 className="font-display text-[24px] font-semibold tracking-[-0.02em] text-ink-deep">
              {t.sourcesHeading}
            </h2>
            <p className="mt-1.5 text-[13px] font-medium text-black/50">
              {t.sourcesMeta(formatReviewDate(comparison.lastReviewed))}
            </p>
            <ul className="mt-5 space-y-2.5">
              {comparison.sources.map((source) => (
                <li key={source.url}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="inline-flex items-start gap-2 text-[15px] font-medium text-black/68 underline-offset-4 transition-colors hover:text-ink-deep hover:underline"
                  >
                    {source.label}
                    <ExternalLink className="mt-1 h-3.5 w-3.5 shrink-0" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-[24px] font-semibold tracking-[-0.02em] text-ink-deep">
              {t.relatedHeading}
            </h2>
            <ul className="mt-5 space-y-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <LinkCard href={link(`/compare/${item.slug}`)}>
                    {t.vs(item.name)}
                  </LinkCard>
                </li>
              ))}
            </ul>
            <Link
              href={link("/compare")}
              className="group mt-5 inline-flex items-center gap-1.5 text-[15px] font-semibold text-ink-deep underline-offset-4 hover:underline"
            >
              {t.seeAll}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      <CompareCta
        heading={t.detailCtaHeading}
        body={t.detailCtaBody}
        buttonLabel={t.ctaButton}
        location={`comparison_${comparison.slug}`}
      />
    </article>
  );
}
