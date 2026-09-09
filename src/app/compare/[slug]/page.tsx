import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import type { Metadata } from "next";

import { BookReviewCta } from "@/components/beseam/book-review-cta";
import FaqGrid from "@/components/beseam/faq-grid";
import {
  COMPARISONS,
  getComparison,
  getPracticalComparison,
} from "@/lib/comparisons";
import { buildPublicMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return COMPARISONS.map((comparison) => ({ slug: comparison.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const comparison = getComparison(slug);

  if (!comparison) return {};

  return buildPublicMetadata({
    title: comparison.metaTitle,
    description: comparison.metaDescription,
    path: `/compare/${comparison.slug}`,
    image: "/images/social/compare.png",
    imageAlt: `Beseam vs ${comparison.name}`,
    type: "article",
    modifiedTime: comparison.lastReviewed,
    section: "Platform comparisons",
    tags: [comparison.name, comparison.category, "buying decisions"],
  });
}

export default async function ComparisonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const comparison = getComparison(slug);

  if (!comparison) notFound();

  const practical = getPracticalComparison(slug);
  const related = COMPARISONS.filter(
    (item) => item.slug !== comparison.slug,
  ).slice(0, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `https://beseam.com/compare/${comparison.slug}#article`,
    headline: comparison.metaTitle,
    description: comparison.metaDescription,
    mainEntityOfPage: {
      "@id": `https://beseam.com/compare/${comparison.slug}`,
    },
    author: { "@id": "https://beseam.com/#organization" },
    publisher: { "@id": "https://beseam.com/#organization" },
    dateModified: comparison.lastReviewed,
    articleSection: "Platform comparisons",
    inLanguage: "en",
    isAccessibleForFree: true,
    image: {
      "@type": "ImageObject",
      url: "https://beseam.com/images/social/compare.png",
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
        item: "https://beseam.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Comparisons",
        item: "https://beseam.com/compare",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `Beseam vs ${comparison.name}`,
        item: `https://beseam.com/compare/${comparison.slug}`,
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

      <header className="border-b border-black/18">
        <div className="mx-auto max-w-[92rem] px-5 pb-18 pt-10 sm:px-8 sm:pb-24 sm:pt-14 lg:px-10 lg:pb-28">
          <Link
            href="/compare"
            className="inline-flex items-center gap-2 text-[12px] font-semibold text-black/62 transition-colors hover:text-signal-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All comparisons
          </Link>

          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(22rem,0.58fr)] lg:items-end lg:gap-20">
            <div>
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-signal-ink">
                Beseam vs {comparison.name}
              </p>
              <h1 className="mt-7 max-w-[18ch] font-serif text-[clamp(2.8rem,5.7vw,4.5rem)] font-normal leading-[1] tracking-[-0.02em]">
                {comparison.headline}
              </h1>
            </div>
            <div className="border-t border-black/24 pt-6 lg:pb-2">
              <p className="text-[17px] leading-[1.68] text-black/66">
                {comparison.intro}
              </p>
              <p className="mt-5 font-mono text-[12px] uppercase tracking-[0.1em] text-black/62">
                {comparison.category} · reviewed{" "}
                {formatReviewDate(comparison.lastReviewed)}
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="border-b border-black/18 bg-ground-2">
        <div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
          <div className="grid border-y border-black/24 lg:grid-cols-3">
            {[
              [`Choose ${comparison.name} when`, comparison.competitorSummary],
              ["Choose Beseam when", comparison.beseamSummary],
              ["Use both when", comparison.useTogetherSummary],
            ].map(([title, detail], index) => (
              <div
                key={title}
                className="border-b border-black/18 py-7 lg:border-b-0 lg:border-r lg:px-7 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
              >
                <span className="font-mono text-[12px] text-black/62">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-5 font-serif text-[27px] leading-[1.05] tracking-[-0.02em]">
                  {title}
                </h2>
                <p className="mt-5 text-[14px] leading-relaxed text-black/62">
                  {detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-black/18">
        <div className="mx-auto max-w-[92rem] px-5 py-14 sm:px-8 sm:py-16 lg:px-10">
          <div className="grid gap-8 border-y border-black/24 py-8 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-16">
            <div>
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.12em] text-signal-ink">
                What it does not replace
              </p>
              <h2 className="mt-4 font-serif text-[34px] leading-[1.02] tracking-[-0.02em]">
                What Beseam does not replace
              </h2>
            </div>
            <p className="max-w-[68ch] self-end text-[16px] leading-[1.72] text-black/64">
              {comparison.notAReplacementFor}
            </p>
          </div>
        </div>
      </section>

      {practical ? (
        <section className="border-b border-black/18 bg-ground-2">
          <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
            <div className="grid gap-12 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-16">
              <div>
                <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.12em] text-signal-ink">
                  In practice
                </p>
                <h2 className="mt-5 max-w-[15ch] font-serif text-[38px] leading-[1.04] tracking-[-0.02em]">
                  What changes in practice.
                </h2>
                <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.1em] text-black/58">
                  Checked {formatReviewDate(practical.reviewedAt)}
                </p>
              </div>

              <div>
                <div className="border-t border-black/24">
                  <div className="hidden grid-cols-[0.72fr_1fr_1fr] border-b border-black/18 py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-black/58 md:grid">
                    <span>Practical question</span>
                    <span>{comparison.name}</span>
                    <span>Beseam</span>
                  </div>
                  {practical.rows.map((row) => (
                    <div
                      key={row.criterion}
                      className="grid gap-4 border-b border-black/18 py-6 md:grid-cols-[0.72fr_1fr_1fr] md:gap-8"
                    >
                      <h3 className="text-[14px] font-semibold text-black/82">
                        {row.criterion}
                      </h3>
                      <div>
                        <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-black/54 md:hidden">
                          {comparison.name}
                        </span>
                        <p className="mt-1 text-[13px] leading-relaxed text-black/62 md:mt-0">
                          {row.competitor}
                        </p>
                      </div>
                      <div>
                        <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-signal-ink md:hidden">
                          Beseam
                        </span>
                        <p className="mt-1 text-[13px] leading-relaxed text-black/68 md:mt-0">
                          {row.beseam}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <a
                  href={practical.source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-[12px] font-semibold text-black/62 transition-colors hover:text-signal-ink"
                >
                  {practical.source.label}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="border-b border-black/18">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[19rem_minmax(0,1fr)] lg:gap-16">
            <div>
              <h2 className="max-w-[18ch] font-serif text-[38px] leading-[1.04] tracking-[-0.02em]">
                Choose the tool that fits the job.
              </h2>
            </div>

            <div className="grid gap-0 border-y border-black/24 md:grid-cols-2">
              <div className="border-b border-black/18 py-7 md:border-b-0 md:border-r md:pr-8">
                <h3 className="text-[17px] font-semibold">
                  Choose {comparison.name} when
                </h3>
                <ul className="mt-5 space-y-4">
                  {comparison.chooseCompetitorWhen.map((item) => (
                    <li
                      key={item}
                      className="grid grid-cols-[1rem_1fr] gap-3 text-[14px] leading-relaxed text-black/62"
                    >
                      <span
                        className="mt-[0.65rem] h-px bg-black/35"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="py-7 md:pl-8">
                <h3 className="text-[17px] font-semibold">
                  Choose Beseam when
                </h3>
                <ul className="mt-5 space-y-4">
                  {comparison.chooseBeseamWhen.map((item) => (
                    <li
                      key={item}
                      className="grid grid-cols-[1rem_1fr] gap-3 text-[14px] leading-relaxed text-black/62"
                    >
                      <span
                        className="mt-[0.65rem] h-px bg-signal-ink"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/18 bg-ink-deep text-white">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
          <div>
            <div className="max-w-2xl">
              <h2 className="max-w-[18ch] font-serif text-[38px] leading-[1.04] tracking-[-0.02em]">
                Compare how each tool works.
              </h2>
            </div>

            <div className="mt-12 border-t border-white/22">
              <div className="hidden grid-cols-[0.72fr_1fr_1fr] border-b border-white/22 py-3 font-mono text-[12px] uppercase tracking-[0.13em] text-white/72 md:grid">
                <span>Question</span>
                <span>{comparison.name}</span>
                <span>Beseam</span>
              </div>
              {comparison.rows.map((row) => (
                <div
                  key={row.criterion}
                  className="grid gap-4 border-b border-white/16 py-6 md:grid-cols-[0.72fr_1fr_1fr] md:gap-8"
                >
                  <h3 className="text-[14px] font-semibold text-white/86">
                    {row.criterion}
                  </h3>
                  <div>
                    <span className="font-mono text-[12px] uppercase tracking-[0.1em] text-white/72 md:hidden">
                      {comparison.name}
                    </span>
                    <p className="mt-1 text-[13px] leading-relaxed text-white/72 md:mt-0">
                      {row.competitor}
                    </p>
                  </div>
                  <div>
                    <span className="font-mono text-[12px] uppercase tracking-[0.1em] text-signal md:hidden">
                      Beseam
                    </span>
                    <p className="mt-1 text-[13px] leading-relaxed text-white/72 md:mt-0">
                      {row.beseam}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/18">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
          <div>
            <div className="max-w-2xl">
              <h2 className="max-w-[18ch] font-serif text-[38px] leading-[1.04] tracking-[-0.02em]">
                What happens after the signal appears?
              </h2>
            </div>

            <div className="mt-12 border-t border-black/24">
              {comparison.workflow.map((item, index) => (
                <div
                  key={item.step}
                  className="grid gap-5 border-b border-black/18 py-7 md:grid-cols-[3rem_12rem_1fr_1fr] md:gap-7"
                >
                  <span className="font-mono text-[12px] text-black/62">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-[15px] font-semibold">{item.step}</h3>
                  <p className="text-[13px] leading-relaxed text-black/62">
                    {item.competitor}
                  </p>
                  <p className="text-[13px] leading-relaxed text-black/68">
                    {item.beseam}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/18 bg-ground-2">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
          <div>
            <div className="max-w-[68ch]">
              <p className="text-[14px] leading-relaxed text-black/62">
                {comparison.evidence.caption}
              </p>
            </div>
            <figure className="mt-10 border border-black/22 bg-ink-deep p-2">
              <Image
                src={comparison.evidence.src}
                alt={comparison.evidence.alt}
                width={1600}
                height={1000}
                className="h-auto w-full"
              />
            </figure>
          </div>
        </div>
      </section>

      <FaqGrid heading="Before you change the stack." items={comparison.faqs} />

      <section className="border-b border-black/18">
        <div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-16">
            <div>
              <h2 className="font-serif text-[31px] leading-[1.04] tracking-[-0.02em]">
                Sources reviewed
              </h2>
              <p className="mt-4 font-mono text-[12px] uppercase tracking-[0.1em] text-black/62">
                Official product sources ·{" "}
                {formatReviewDate(comparison.lastReviewed)}
              </p>
            </div>
            <ul className="border-t border-black/24">
              {comparison.sources.map((source) => (
                <li key={source.url} className="border-b border-black/18 py-5">
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-start gap-3 text-[14px] font-semibold text-black/66 transition-colors hover:text-signal-ink"
                  >
                    {source.label}
                    <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-b border-black/18 bg-ink-deep text-white">
        <div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-16">
            <div>
              <h2 className="font-serif text-[31px] leading-[1.04] tracking-[-0.02em]">
                Related comparisons
              </h2>
            </div>
            <div className="border-t border-white/22">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/compare/${item.slug}`}
                  className="group grid gap-3 border-b border-white/16 py-5 sm:grid-cols-[12rem_minmax(0,1fr)_auto] sm:items-start"
                >
                  <span className="text-[14px] font-semibold text-white/88">
                    Beseam vs {item.name}
                  </span>
                  <span className="text-[13px] leading-relaxed text-white/72">
                    {item.headline}
                  </span>
                  <ArrowRight className="h-4 w-4 text-signal transition-transform group-hover:translate-x-0.5" />
                </Link>
              ))}
              <Link
                href="/compare"
                className="group flex items-center gap-2 py-6 text-[13px] font-semibold text-white/72 transition-colors hover:text-white"
              >
                See all comparisons
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/18">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
          <div className="grid border-y border-black/24 lg:grid-cols-[minmax(0,1fr)_19rem]">
            <div className="py-10 pr-0 lg:py-14 lg:pr-16">
              <h2 className="max-w-[18ch] font-serif text-[clamp(2.1rem,4.2vw,3.5rem)] font-normal leading-[1.04] tracking-[-0.02em]">
                Keep the systems that work. Connect the evidence they leave
                apart.
              </h2>
            </div>
            <div className="border-t border-black/24 py-8 lg:border-l lg:border-t-0 lg:py-0 lg:pl-8">
              <div className="flex h-full flex-col justify-center">
                <p className="text-[14px] leading-relaxed text-black/62">
                  In a 20-minute store review, we use one real finding to show
                  how Beseam connects the tools already in place and keeps the
                  loop moving from evidence to measured change.
                </p>
                <BookReviewCta
                  location={`comparison_${comparison.slug}`}
                  label="See Beseam with my stack"
                  className="mt-7 w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}

function formatReviewDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}
