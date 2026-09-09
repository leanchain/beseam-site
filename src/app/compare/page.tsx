import Link from "next/link";

import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

import { BookReviewCta } from "@/components/beseam/book-review-cta";
import { COMPARISONS } from "@/lib/comparisons";
import { buildPublicMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPublicMetadata({
  title: "Compare Beseam with AI Discovery, Analytics, and Ecommerce Tools",
  description:
    "Compare what each tool does best, where Beseam differs, and how Beseam turns a shopper problem into an approved change and checks the result.",
  path: "/compare",
  image: "/images/social/compare.png",
});

const COMPARISON_LAYERS = [
  {
    title: "AI discovery surfaces",
    eyebrow: "Discovery",
    description:
      "Tools built to measure how brands appear across ChatGPT, AI search, answer engines, citations, and competitor recommendations.",
    categories: ["AI discovery & visibility"],
  },
  {
    title: "Analytics & behavior",
    eyebrow: "Evidence",
    description:
      "Systems that explain traffic, sessions, journeys, friction, and digital experience after a shopper reaches the store.",
    categories: [
      "Web analytics",
      "Behavior analytics",
      "Experience analytics",
      "Session replay & product analytics",
    ],
  },
  {
    title: "Experimentation & product",
    eyebrow: "Intervention",
    description:
      "Platforms for product analytics, hypotheses, feature delivery, experiments, rollouts, and learning from controlled changes.",
    categories: [
      "Product analytics",
      "Experimentation",
      "All-in-one product platform",
    ],
  },
  {
    title: "Commerce & reliability",
    eyebrow: "Commercial truth",
    description:
      "Tools that measure ecommerce performance, attribution, and technical failures that can block or distort revenue.",
    categories: ["Commerce analytics", "Ecommerce error monitoring"],
  },
] as const;

const FEATURED_COMPARISON_SLUGS = [
  "profound",
  "triple-whale",
  "google-analytics",
  "hotjar",
  "microsoft-clarity",
  "noibu",
] as const;

const FEATURED_COMPARISON_SLUG_SET = new Set<string>(FEATURED_COMPARISON_SLUGS);

export default function ComparePage() {
  const comparisonIndex = new Map(
    COMPARISONS.map((comparison, index) => [comparison.slug, index]),
  );
  const featuredComparisons = FEATURED_COMPARISON_SLUGS.map((slug) =>
    COMPARISONS.find((comparison) => comparison.slug === slug),
  ).filter((comparison): comparison is (typeof COMPARISONS)[number] =>
    Boolean(comparison),
  );

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Beseam platform comparisons",
    numberOfItems: COMPARISONS.length,
    itemListElement: COMPARISONS.map((comparison, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `Beseam vs ${comparison.name}`,
      url: `https://beseam.com/compare/${comparison.slug}`,
    })),
  };

  return (
    <div className="bg-ground text-ink-deep">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <section className="border-b border-black/18">
        <div className="mx-auto max-w-[92rem] px-5 pb-20 pt-16 sm:px-8 sm:pb-24 sm:pt-20 lg:px-10 lg:pb-28 lg:pt-24">
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
            <span>Comparisons</span>
          </nav>
          <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,0.88fr)_minmax(22rem,0.62fr)] lg:items-end lg:gap-20">
            <div>
              <h1 className="max-w-[18ch] font-serif text-[clamp(2.8rem,6vw,4.5rem)] font-normal leading-[1] tracking-[-0.02em]">
                See how Beseam differs from the tools you already use.
              </h1>
            </div>
            <div className="border-t border-black/24 pt-6 lg:pb-2">
              <p className="max-w-xl text-[18px] leading-[1.65] text-black/66">
                Beseam does not replace every tool below. These pages show what
                each tool does best, what Beseam does differently, and when it
                makes sense to use both.
              </p>
              <p className="mt-5 font-mono text-[12px] uppercase tracking-[0.11em] text-black/62">
                Official product sources · AI discovery set reviewed 22 August
                2026
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/18 bg-ground-2">
        <div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
          <div className="grid gap-8 border-t border-black/24 pt-5 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-10">
            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.12em] text-signal-ink">
              Start here
            </p>
            <div className="max-w-2xl">
              <h2 className="font-serif text-[34px] leading-[1.02] tracking-[-0.02em]">
                Start with these six.
              </h2>
              <p className="mt-4 text-[14px] leading-relaxed text-black/62">
                These six make the differences easiest to see: where shoppers
                find products, what they do next, what breaks before purchase,
                and what your team can change.
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 border-l border-t border-black/24 md:grid-cols-3">
            {featuredComparisons.map((comparison) => (
              <Link
                key={comparison.slug}
                href={`/compare/${comparison.slug}`}
                className="group flex flex-col justify-between gap-8 border-b border-r border-black/18 bg-white p-6 transition-colors hover:bg-[#fffdfb] sm:p-7"
              >
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.09em] text-signal-ink">
                    {comparison.category}
                  </span>
                  <h3 className="mt-5 text-[20px] font-semibold text-black/84">
                    Beseam vs {comparison.name}
                  </h3>
                  <p className="mt-3 text-[13px] leading-relaxed text-black/62">
                    {comparison.headline}
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 text-[12px] font-semibold text-signal-ink">
                  Compare
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-black/18">
        <div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
          <div>
            <div className="max-w-2xl">
              <h2 className="font-serif text-[34px] leading-[1.02] tracking-[-0.02em]">
                More tools in the stack.
              </h2>
              <p className="mt-5 text-[14px] leading-relaxed text-black/62">
                {COMPARISONS.length - featuredComparisons.length} additional
                comparisons across discovery, analytics, behavior,
                experimentation, commerce measurement, and reliability.
              </p>
            </div>

            <div className="mt-14 space-y-16">
              {COMPARISON_LAYERS.map((layer) => {
                const comparisons = COMPARISONS.filter(
                  (comparison) =>
                    !FEATURED_COMPARISON_SLUG_SET.has(comparison.slug) &&
                    layer.categories.some(
                      (category) => category === comparison.category,
                    ),
                );

                if (comparisons.length === 0) return null;

                return (
                  <div key={layer.title}>
                    <div className="grid gap-5 border-t border-black/24 pt-5 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-10">
                      <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.12em] text-signal-ink">
                        {layer.eyebrow}
                      </p>
                      <div className="max-w-2xl">
                        <h3 className="font-serif text-[28px] leading-[1.05] tracking-[-0.02em]">
                          {layer.title}
                        </h3>
                        <p className="mt-3 text-[14px] leading-relaxed text-black/62">
                          {layer.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-7 grid grid-cols-1 border-l border-t border-black/24 md:grid-cols-3">
                      {comparisons.map((comparison) => {
                        const index = comparisonIndex.get(comparison.slug) ?? 0;

                        return (
                          <Link
                            key={comparison.slug}
                            href={`/compare/${comparison.slug}`}
                            className="group flex flex-col justify-between gap-8 border-b border-r border-black/18 p-6 transition-colors hover:bg-panel-white sm:p-7"
                          >
                            <div>
                              <div className="flex items-center justify-between gap-3">
                                <span className="font-mono text-[12px] text-black/62">
                                  {String(index + 1).padStart(2, "0")}
                                </span>
                                <span className="font-mono text-[12px] uppercase tracking-[0.09em] text-signal-ink">
                                  {comparison.category}
                                </span>
                              </div>
                              <h4 className="mt-5 text-[19px] font-semibold text-black/84">
                                {comparison.name}
                              </h4>
                              <p className="mt-3 text-[13px] leading-relaxed text-black/62">
                                {comparison.headline}
                              </p>
                            </div>
                            <span className="inline-flex items-center gap-2 text-[12px] font-semibold text-signal-ink">
                              Compare
                              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/18 bg-ink-deep text-white">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
          {/* Five steps, so the loop gets the full measure and one row of its
              own. Held in a 0.75/1.25 split it ran as 4 + 1, and the column
              rules carried on across the two empty cells. */}
          <div>
            <div>
              <h2 className="max-w-[18ch] font-serif text-[clamp(2.2rem,4.6vw,3.5rem)] font-normal leading-[1.04] tracking-[-0.02em]">
                See the problem. Understand it. Change it. Check again.
              </h2>
            </div>

            <div className="mt-12 grid border-y border-white/22 md:grid-cols-2 lg:grid-cols-5">
              {[
                [
                  "Find",
                  "See what is happening across discovery, behavior, commerce, and revenue.",
                ],
                [
                  "Prepare",
                  "Connect the evidence, identify what may explain the pattern, and turn it into a specific change.",
                ],
                [
                  "Approve",
                  "You decide. Nothing customer-facing ships without your yes.",
                ],
                ["Apply", "The change goes live, with a way back."],
                [
                  "Measure",
                  "Check the original signal again and carry the result into the next decision.",
                ],
              ].map(([title, detail], index) => (
                <div
                  key={title}
                  className="border-b border-white/16 py-7 md:border-r md:px-6 lg:border-b-0 lg:last:border-r-0 lg:last:pr-0"
                >
                  <span className="font-mono text-[11px] text-signal">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-[17px] font-semibold text-white/92">
                    {title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-white/68">
                    {detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="border-b border-black/18 bg-ground-2">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
          <div className="grid border-y border-black/24 lg:grid-cols-[minmax(0,1fr)_19rem]">
            <div className="py-10 pr-0 lg:py-14 lg:pr-16">
              <h2 className="max-w-[18ch] font-serif text-[clamp(2.1rem,4.2vw,3.5rem)] font-normal leading-[1.04] tracking-[-0.02em]">
                See how Beseam fits around the tools you already use.
              </h2>
            </div>
            <div className="border-t border-black/24 py-8 lg:border-l lg:border-t-0 lg:py-0 lg:pl-8">
              <div className="flex h-full flex-col justify-center">
                <p className="text-[14px] leading-relaxed text-black/62">
                  In a 20-minute store review, we use one real finding to show
                  how Beseam connects the systems already in place, prepares a
                  change for approval, and checks what happens afterward.
                </p>
                <BookReviewCta
                  location="comparison_hub"
                  label="See Beseam with my stack"
                  className="mt-7 w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
