import Link from "next/link";

import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

import CategoryBenchmarkFigure, {
  BENCHMARK_INK,
  engineLabel,
  formatBenchmarkDate,
} from "@/components/beseam/category-benchmark";
import { Reveal } from "@/components/beseam/reveal";
import {
  BENCHMARK_ENGINES,
  BENCHMARK_RUN,
  CATEGORY_BENCHMARKS,
} from "@/data/category-benchmarks";
import { SITE_URL, buildPublicMetadata } from "@/lib/seo";

const hasBenchmarks = CATEGORY_BENCHMARKS.length > 0;
export const metadata: Metadata = buildPublicMetadata({
  title: "AI Shopping Report | Beseam",
  description:
    "The Beseam AI Shopping Report asks the same public shopper questions across AI assistants and publishes which engine named which brand, with dates, denominators, and methodology.",
  path: "/benchmarks",
  noIndex: !hasBenchmarks,
});

const METHOD = [
  [
    "The question",
    "A question a real shopper would type, asked verbatim on every engine. Published exactly as it was asked: never rewritten afterwards to fit the result.",
  ],
  [
    "The engines",
    "Each assistant is asked the same question and kept in its own column, so every mark on this page is attributable to the engine that made it.",
  ],
  [
    "The denominator",
    "Every count is out of the engines that actually answered, and that number is printed on the figure. Nothing is averaged across questions or categories.",
  ],
  [
    "The date",
    "Answers move. Each figure carries the date it was run and is never quietly refreshed underneath the same numbers.",
  ],
  [
    "Whose data this is",
    "Public brands, observed from the outside. No customer store, no private catalog, and no claim about why any brand was or was not named.",
  ],
  [
    "What is not claimed",
    "Being named is not a ranking and not an endorsement, and a brand that went unnamed is not judged here: only recorded as absent from that answer.",
  ],
] as const;

const WORDS = ["", "one", "two", "three", "four", "five"];

/** Agreement steps read light to dark; the top step is the figures' consensus green. */
const SPREAD_RAMP = ["#cbd5e1", "#94a3b8", "#64748b", "#475569"];

export default function BenchmarksPage() {
  const engineCount = BENCHMARK_RUN.engines.length;

  // Derived from the entries themselves, so the bar and the ledger can never
  // drift from the rows printed underneath them.
  const spreadCounts = new Map<number, number>();
  for (const benchmark of CATEGORY_BENCHMARKS) {
    for (const brand of benchmark.brands) {
      const named = brand.namedBy.length;
      spreadCounts.set(named, (spreadCounts.get(named) ?? 0) + 1);
    }
  }
  const totalNamings = Array.from(spreadCounts.values()).reduce(
    (sum, count) => sum + count,
    0,
  );
  const spread = Array.from(spreadCounts.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([engines, count]) => ({
      engines,
      count,
      share: totalNamings > 0 ? count / totalNamings : 0,
      color:
        engines === engineCount
          ? BENCHMARK_INK.consensus
          : SPREAD_RAMP[Math.min(engines - 1, SPREAD_RAMP.length - 1)],
      label:
        engines === engineCount
          ? `All ${WORDS[engines] ?? engines} engines`
          : engines === 1
            ? "One engine only"
            : `${(WORDS[engines] ?? `${engines}`).replace(/^./, (c) => c.toUpperCase())} engines`,
    }));
  const soloShare = Math.round(
    ((spreadCounts.get(1) ?? 0) / (totalNamings || 1)) * 100,
  );

  const engineRows = BENCHMARK_ENGINES.map((engine) => ({
    ...engine,
    perAnswer: engine.answers > 0 ? engine.namings / engine.answers : 0,
    soleShare: engine.namings > 0 ? engine.soleNamings / engine.namings : 0,
  }));
  const widest = Math.max(...engineRows.map((engine) => engine.namings), 1);
  const loudest = engineRows.reduce((a, b) =>
    b.perAnswer > a.perAnswer ? b : a,
  );
  const quietest = engineRows.reduce((a, b) =>
    b.perAnswer < a.perAnswer ? b : a,
  );
  const spreadRatio =
    quietest.perAnswer > 0 ? loudest.perAnswer / quietest.perAnswer : 0;

  const categories = Array.from(
    new Set(CATEGORY_BENCHMARKS.map((b) => b.category)),
  );
  const datasetJsonLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": `${SITE_URL}/benchmarks#dataset`,
    name: "Beseam AI Shopping Report data",
    description:
      "Observed brand namings from public shopper questions asked across configured AI shopping and answer surfaces, with the exact questions, dates, engines, and denominators published.",
    url: `${SITE_URL}/benchmarks`,
    creator: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    dateModified: BENCHMARK_RUN.askedOn,
    temporalCoverage: BENCHMARK_RUN.askedOn,
    isAccessibleForFree: true,
    inLanguage: "en",
    keywords: ["AI shopping report", "AI shopping", "ecommerce", ...categories],
    measurementTechnique:
      "The same public shopper question is asked across the configured engines. Only completed answers are counted, each naming is attributed to the engine that made it, and each published figure states its denominator.",
    variableMeasured: [
      "Brand namings by shopper question",
      "Engines naming each brand",
      "Completed answer count",
    ],
  };

  return (
    <div className="bg-ground text-[#151515]">
      {hasBenchmarks ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetJsonLd) }}
        />
      ) : null}

      <section>
        <div className="mx-auto max-w-[92rem] px-5 pb-16 pt-20 sm:px-8 sm:pt-28 lg:px-10">
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
            <span>AI Shopping Report</span>
          </nav>
          <Reveal className="mt-10">
            <h1 className="max-w-[20ch] text-balance font-display text-[clamp(2.6rem,5vw,4.5rem)] font-normal leading-[1.02] tracking-[-0.02em] text-ink-deep"></h1>
            <p className="mt-8 max-w-[68ch] text-[17px] leading-[1.7] text-black/68">
              We asked the same {BENCHMARK_RUN.questions} shopping questions to{" "}
              {BENCHMARK_RUN.engines.join(", ")} across{" "}
              {categories.join(", ").toLowerCase()}. We kept every completed
              answer and recorded which brands each assistant named.
            </p>
            <p className="mt-6 font-mono text-[12px] uppercase tracking-[0.12em] text-black/55">
              <span className="tabular-nums">
                {formatBenchmarkDate(BENCHMARK_RUN.askedOn)}
              </span>
              <span className="px-2 text-black/28">/</span>
              <span className="tabular-nums">{engineCount}</span> engines
              <span className="px-2 text-black/28">/</span>
              <span className="tabular-nums">
                {BENCHMARK_RUN.answersCompleted}
              </span>{" "}
              completed answers
              <span className="px-2 text-black/28">/</span>
              <span className="tabular-nums">{totalNamings}</span> brand namings
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <figure className="mt-14 border-t-2 border-ink-deep pt-6">
              <figcaption className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                <h2 className="max-w-[26ch] text-balance font-display text-[clamp(1.7rem,2.6vw,2.4rem)] font-normal leading-[1.1] tracking-[-0.015em] text-ink-deep">
                  {soloShare}% of brand appearances happened on just one
                  assistant.
                </h2>
                <span className="font-mono text-[12px] uppercase tracking-[0.1em] text-black/55">
                  <span className="tabular-nums">{totalNamings}</span>{" "}
                  appearances, by assistants naming
                </span>
              </figcaption>

              <div className="mt-6 flex h-14 gap-[2px] border border-black/18 bg-white p-[3px]">
                {spread.map((step) => (
                  <span
                    key={step.engines}
                    className="h-full"
                    style={{
                      flexBasis: `${step.share * 100}%`,
                      backgroundColor: step.color,
                    }}
                    aria-hidden="true"
                  />
                ))}
              </div>

              <dl className="mt-5 grid gap-x-8 gap-y-6 sm:grid-cols-3">
                {spread.map((step) => (
                  <div key={step.engines}>
                    <dt className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-black/62">
                      <span
                        className="h-2.5 w-2.5 rounded-[2px]"
                        style={{ backgroundColor: step.color }}
                        aria-hidden="true"
                      />
                      {step.label}
                    </dt>
                    <dd className="mt-2 flex items-baseline gap-2.5">
                      <span className="font-display text-[clamp(1.7rem,2.6vw,2.3rem)] leading-none tabular-nums text-ink-deep">
                        {step.count}
                      </span>
                      <span className="font-mono text-[12px] tabular-nums text-black/55">
                        {Math.round(step.share * 100)}%
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </figure>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-black/14 bg-white">
        <div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-end lg:gap-16">
              <h2 className="max-w-[18ch] text-balance font-display text-[clamp(2rem,3.1vw,3rem)] font-normal leading-[1.05] tracking-[-0.02em] text-ink-deep">
                The assistants do not answer alike.
              </h2>
              <p className="max-w-[62ch] text-[16px] leading-[1.7] text-black/64">
                Across the same {BENCHMARK_RUN.questions} questions,{" "}
                {loudest.engine} put {spreadRatio.toFixed(1)}× as many brands in
                front of a shopper per answer as {quietest.engine}. Where an
                engine answered and named nothing at all, that is recorded too.
              </p>
            </div>

            <table className="mt-10 w-full border-collapse text-left">
              <caption className="sr-only">
                Per-engine totals across the {BENCHMARK_RUN.questions} charted
                questions
              </caption>
              <thead>
                <tr className="border-b-2 border-ink-deep font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-black/54">
                  <th scope="col" className="py-3 pr-4 font-semibold">
                    Engine
                  </th>
                  <th
                    scope="col"
                    className="hidden py-3 pr-4 text-right font-semibold sm:table-cell"
                  >
                    Answers
                  </th>
                  <th scope="col" className="py-3 pr-4 font-semibold">
                    Brands named
                  </th>
                  <th
                    scope="col"
                    className="py-3 pr-4 text-right font-semibold"
                  >
                    Per answer
                  </th>
                  <th
                    scope="col"
                    className="hidden py-3 pr-4 text-right font-semibold sm:table-cell"
                  >
                    Named by it alone
                  </th>
                  <th
                    scope="col"
                    className="hidden py-3 text-right font-semibold lg:table-cell"
                  >
                    Answered, named nothing
                  </th>
                </tr>
              </thead>
              <tbody>
                {engineRows.map((engine) => (
                  <tr
                    key={engine.engine}
                    className="border-b border-black/12 align-middle"
                  >
                    <th
                      scope="row"
                      className="py-4 pr-4 text-[15px] font-semibold text-ink-deep"
                    >
                      {engine.engine}
                    </th>
                    <td className="hidden py-4 pr-4 text-right font-mono text-[13px] tabular-nums text-black/70 sm:table-cell">
                      {engine.answers}
                    </td>
                    <td className="py-4 pr-4">
                      <span className="flex items-center gap-3">
                        <span
                          className="h-2.5 w-full max-w-[18rem] shrink bg-black/[0.07]"
                          aria-hidden="true"
                        >
                          <span
                            className="block h-full"
                            style={{
                              width: `${(engine.namings / widest) * 100}%`,
                              backgroundColor: BENCHMARK_INK.named,
                            }}
                          />
                        </span>
                        <span className="w-8 shrink-0 font-mono text-[13px] tabular-nums text-ink-deep">
                          {engine.namings}
                        </span>
                      </span>
                    </td>
                    <td className="py-4 pr-4 text-right font-mono text-[13px] tabular-nums text-ink-deep">
                      {engine.perAnswer.toFixed(1)}
                    </td>
                    <td className="hidden py-4 pr-4 text-right font-mono text-[13px] tabular-nums text-black/70 sm:table-cell">
                      {engine.soleNamings}
                      <span className="text-black/40">
                        {" "}
                        ({Math.round(engine.soleShare * 100)}%)
                      </span>
                    </td>
                    <td className="hidden py-4 text-right font-mono text-[13px] tabular-nums text-black/70 lg:table-cell">
                      {engine.silentAnswers}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="mt-4 max-w-[80ch] text-[13px] leading-relaxed text-black/58">
              One row per engine over the same {BENCHMARK_RUN.questions}{" "}
              questions, {formatBenchmarkDate(BENCHMARK_RUN.askedOn)}. A naming
              is one brand in one answer; &ldquo;named by it alone&rdquo; counts
              the brands no other engine repeated on that question. Volume is
              not quality, and this is not a ranking of the engines.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-ground-2">
        <div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-b-2 border-ink-deep pb-4">
              <h2 className="max-w-[24ch] text-balance font-display text-[clamp(1.7rem,2.6vw,2.4rem)] font-normal leading-[1.1] tracking-[-0.015em] text-ink-deep">
                Every question, and which engine named what.
              </h2>
              <p className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-black/58">
                <span className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-[2px]"
                    style={{ backgroundColor: BENCHMARK_INK.named }}
                    aria-hidden="true"
                  />
                  Named
                </span>
                <span className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-[2px]"
                    style={{ backgroundColor: BENCHMARK_INK.consensus }}
                    aria-hidden="true"
                  />
                  Named by all {WORDS[engineCount] ?? engineCount}
                </span>
                <span className="flex items-center gap-2">
                  <span
                    className="h-px w-2.5"
                    style={{ backgroundColor: BENCHMARK_INK.absent }}
                    aria-hidden="true"
                  />
                  Not named
                </span>
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-14">
            {CATEGORY_BENCHMARKS.map((benchmark, index) => (
              <Reveal key={benchmark.slug} delay={(index % 2) * 0.05}>
                <CategoryBenchmarkFigure benchmark={benchmark} index={index} />
              </Reveal>
            ))}
          </div>

          <p className="mt-10 max-w-[80ch] text-[13px] leading-relaxed text-black/58">
            Columns run in the same order on every figure:{" "}
            {BENCHMARK_RUN.engines.map(engineLabel).join(", ")}. The number
            under an engine is how many brands it named for that question, so a
            column of rules under a 0 is an engine that answered and named
            nothing. An engine that returned no completed answer is left out of
            the question entirely rather than shown as a zero.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
            <Reveal>
              <h2 className="max-w-[16ch] text-balance font-display text-[clamp(2rem,3.1vw,3rem)] font-normal leading-[1.05] tracking-[-0.02em] text-ink-deep">
                How every figure on this page is produced.
              </h2>
              <p className="mt-7 max-w-md text-[16px] leading-[1.7] text-black/64">
                The same discovery check shown on the Beseam homepage, pointed
                at a public category instead of a customer store. The date and
                denominator stay attached so the result can be interpreted in
                context.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <dl className="border-t border-black/14">
                {METHOD.map(([term, detail]) => (
                  <div
                    key={term}
                    className="grid gap-2 border-b border-black/14 py-5 sm:grid-cols-[11rem_1fr] sm:gap-8"
                  >
                    <dt className="font-mono text-[12px] font-semibold uppercase tracking-[0.1em] text-black/62">
                      {term}
                    </dt>
                    <dd className="text-[14px] leading-relaxed text-black/64">
                      {detail}
                    </dd>
                  </div>
                ))}
              </dl>

              <Link
                href="/scan"
                className="mt-9 inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold text-[#151515] underline decoration-black/30 underline-offset-8 transition-colors hover:decoration-signal-ink"
              >
                Check my store
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
