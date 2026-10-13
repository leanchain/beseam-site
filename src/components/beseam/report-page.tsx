import Link from "next/link";

import CategoryBenchmarkFigure, {
  BENCHMARK_INK,
  engineLabel,
  formatBenchmarkDate,
} from "@/components/beseam/category-benchmark";
import FirstMonthPromise from "@/components/beseam/first-month-promise";
import Halftone from "@/components/beseam/halftone";
import { Reveal } from "@/components/beseam/reveal";
import {
  BENCHMARK_ENGINES,
  BENCHMARK_RUN,
  CATEGORY_BENCHMARKS,
} from "@/data/category-benchmarks";
import { localizedPath, type Locale } from "@/i18n/locale-rules.mjs";
import { getPageCopy } from "@/i18n/pages";
import { SITE_URL } from "@/lib/seo";

const hasBenchmarks = CATEGORY_BENCHMARKS.length > 0;

/** Agreement steps read light to dark lilac; the top step is the figures' consensus charcoal. */
const SPREAD_RAMP = ["#e3d3ff", "#c9b2f7", "#a98bf0", "#7d5fd0"];

export default function ReportPage({ locale = "en" }: { locale?: Locale }) {
  const copy = getPageCopy(locale);
  const t = copy.report;
  const dateLocale = locale === "en" ? undefined : copy.common.dateLocale;
  const date = (iso: string) => formatBenchmarkDate(iso, dateLocale);
  const categoryName = (category: string) =>
    t.categoryNames[category] ?? category;
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
          ? t.allEngines(engines)
          : engines === 1
            ? t.oneEngine
            : t.nEngines(engines),
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
    inLanguage: locale,
    keywords: ["AI shopping report", "AI shopping", "ecommerce", ...categories],
    measurementTechnique:
      "The same public shopper question is asked across the configured engines. Only completed answers are counted, each naming is attributed to the engine that made it, and each published figure states its denominator.",
    variableMeasured: [
      "Brand namings by shopper question",
      "Engines naming each brand",
      "Completed answer count",
    ],
  };

  const stats = [
    [date(BENCHMARK_RUN.askedOn), t.statDate],
    [String(engineCount), t.statEngines],
    [String(BENCHMARK_RUN.answersCompleted), t.statAnswers],
    [String(totalNamings), t.statNamings],
  ] as const;
  const categoryList = t.list(
    categories.map((category) =>
      t.lowercaseCategories
        ? categoryName(category).toLowerCase()
        : categoryName(category),
    ),
  );

  return (
    <div className="bg-ground text-[#151515]">
      {hasBenchmarks ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetJsonLd) }}
        />
      ) : null}

      <header className="relative isolate overflow-hidden bg-[#fff9e8]">
        <Halftone corner="top-right" size={220} className="hidden xl:block" />
        <div className="relative z-10 mx-auto max-w-[76rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <nav
            aria-label={copy.common.breadcrumb}
            className="text-[13px] font-medium text-black/55"
          >
            <Link
              href={localizedPath("/", locale)}
              className="text-ink-deep underline-offset-4 hover:underline"
            >
              Beseam
            </Link>
            <span aria-hidden className="mx-2">
              /
            </span>
            <span>{t.breadcrumb}</span>
          </nav>
          <Reveal className="mt-8">
            <h1 className="max-w-[18ch] text-balance font-display text-[clamp(2.6rem,5vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink-deep">
              {t.title}
            </h1>
            <p className="mt-6 max-w-[62ch] text-[17px] leading-[1.7] text-black/72 sm:text-[18px]">
              {t.intro(
                BENCHMARK_RUN.questions,
                t.list(BENCHMARK_RUN.engines),
                categoryList,
              )}
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <dl className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {stats.map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-media border border-black/10 bg-white px-5 py-4"
                >
                  <dt className="text-[13px] font-medium text-black/55">
                    {label}
                  </dt>
                  <dd className="mt-1 font-display text-[clamp(1.4rem,2.2vw,1.9rem)] font-semibold leading-tight tabular-nums tracking-[-0.02em] text-ink-deep">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </header>

      <section className="bg-ground">
        <div className="mx-auto max-w-[76rem] px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
          <Reveal>
            <figure>
              <figcaption>
                <h2 className="mx-auto max-w-[24ch] text-balance text-center font-display text-[clamp(2rem,3.2vw,3rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink-deep">
                  {t.soloHeading(soloShare)}
                </h2>
                <p className="mt-4 text-center text-[16px] text-black/60">
                  {t.soloSub(totalNamings)}
                </p>
              </figcaption>

              <div className="mt-10 flex h-14 gap-1 overflow-hidden rounded-media border border-black/10 bg-white p-1.5 lg:mt-12">
                {spread.map((step) => (
                  <span
                    key={step.engines}
                    className="h-full rounded-[4px]"
                    style={{
                      flexBasis: `${step.share * 100}%`,
                      backgroundColor: step.color,
                    }}
                    aria-hidden="true"
                  />
                ))}
              </div>

              <dl className="mt-5 grid gap-3 sm:grid-cols-3 sm:gap-4">
                {spread.map((step) => (
                  <div
                    key={step.engines}
                    className="rounded-media bg-[#fff9e8] px-5 py-4"
                  >
                    <dt className="flex items-center gap-2 text-[14px] font-semibold text-black/64">
                      <span
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: step.color }}
                        aria-hidden="true"
                      />
                      {step.label}
                    </dt>
                    <dd className="mt-2 flex items-baseline gap-2.5">
                      <span className="font-display text-[clamp(1.7rem,2.6vw,2.3rem)] font-semibold leading-none tabular-nums text-ink-deep">
                        {step.count}
                      </span>
                      <span className="text-[14px] font-medium tabular-nums text-black/55">
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

      <section className="bg-[#fff9e8]">
        <div className="mx-auto max-w-[76rem] px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
          <Reveal>
            <h2 className="mx-auto max-w-[22ch] text-balance text-center font-display text-[clamp(2rem,3.2vw,3rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink-deep">
              {t.aliasHeading}
            </h2>
            <p className="mx-auto mt-5 max-w-[60ch] text-center text-[17px] leading-[1.7] text-black/64">
              {t.aliasBody(
                BENCHMARK_RUN.questions,
                loudest.engine,
                spreadRatio.toLocaleString(copy.common.dateLocale, {
                  maximumFractionDigits: 1,
                  minimumFractionDigits: 1,
                }),
                quietest.engine,
              )}
            </p>

            <div className="mt-10 overflow-hidden rounded-media border border-black/10 bg-white lg:mt-12">
              <table className="w-full border-collapse text-left">
                <caption className="sr-only">
                  {t.tableCaption(BENCHMARK_RUN.questions)}
                </caption>
                <thead>
                  <tr className="border-b border-black/10 text-[13px] font-semibold text-black/55">
                    <th scope="col" className="px-5 py-4 font-semibold">
                      {t.colEngine}
                    </th>
                    <th
                      scope="col"
                      className="hidden px-4 py-4 text-right font-semibold sm:table-cell"
                    >
                      {t.colAnswers}
                    </th>
                    <th scope="col" className="px-4 py-4 font-semibold">
                      {t.colNamed}
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-4 text-right font-semibold"
                    >
                      {t.colPerAnswer}
                    </th>
                    <th
                      scope="col"
                      className="hidden px-4 py-4 text-right font-semibold sm:table-cell"
                    >
                      {t.colAlone}
                    </th>
                    <th
                      scope="col"
                      className="hidden px-5 py-4 text-right font-semibold lg:table-cell"
                    >
                      {t.colNothing}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {engineRows.map((engine) => (
                    <tr
                      key={engine.engine}
                      className="border-b border-black/[0.06] align-middle last:border-b-0"
                    >
                      <th
                        scope="row"
                        className="px-5 py-4 text-[16px] font-semibold text-ink-deep"
                      >
                        {engine.engine}
                      </th>
                      <td className="hidden px-4 py-4 text-right text-[15px] tabular-nums text-black/70 sm:table-cell">
                        {engine.answers}
                      </td>
                      <td className="px-4 py-4">
                        <span className="flex items-center gap-3">
                          <span
                            className="h-3 w-full max-w-[18rem] shrink overflow-hidden rounded-full bg-black/[0.06]"
                            aria-hidden="true"
                          >
                            <span
                              className="block h-full rounded-full"
                              style={{
                                width: `${(engine.namings / widest) * 100}%`,
                                backgroundColor: BENCHMARK_INK.named,
                              }}
                            />
                          </span>
                          <span className="w-8 shrink-0 text-[15px] font-semibold tabular-nums text-ink-deep">
                            {engine.namings}
                          </span>
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right text-[15px] font-semibold tabular-nums text-ink-deep">
                        {engine.perAnswer.toFixed(1)}
                      </td>
                      <td className="hidden px-4 py-4 text-right text-[15px] tabular-nums text-black/70 sm:table-cell">
                        {engine.soleNamings}
                        <span className="text-black/40">
                          {" "}
                          ({Math.round(engine.soleShare * 100)}%)
                        </span>
                      </td>
                      <td className="hidden px-5 py-4 text-right text-[15px] tabular-nums text-black/70 lg:table-cell">
                        {engine.silentAnswers}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mx-auto mt-5 max-w-[80ch] text-center text-[14px] leading-relaxed text-black/58">
              {t.tableNote(
                BENCHMARK_RUN.questions,
                date(BENCHMARK_RUN.askedOn),
              )}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-ground">
        <div className="mx-auto max-w-[76rem] px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
          <Reveal>
            <h2 className="mx-auto max-w-[24ch] text-balance text-center font-display text-[clamp(2rem,3.2vw,3rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink-deep">
              {t.questionsHeading}
            </h2>
            <p className="mt-6 flex flex-wrap items-center justify-center gap-2 text-[14px] font-semibold text-ink-deep">
              <span className="flex items-center gap-2 rounded-button bg-[#fff9e8] px-3 py-1.5">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: BENCHMARK_INK.named }}
                  aria-hidden="true"
                />
                {t.legendNamed}
              </span>
              <span className="flex items-center gap-2 rounded-button bg-[#fff9e8] px-3 py-1.5">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: BENCHMARK_INK.consensus }}
                  aria-hidden="true"
                />
                {t.legendAll(engineCount)}
              </span>
              <span className="flex items-center gap-2 rounded-button bg-[#fff9e8] px-3 py-1.5">
                <span
                  className="h-px w-3"
                  style={{ backgroundColor: BENCHMARK_INK.absent }}
                  aria-hidden="true"
                />
                {t.legendNot}
              </span>
            </p>
          </Reveal>

          <div className="mt-10 grid gap-8 lg:mt-12 lg:grid-cols-2 lg:gap-8">
            {CATEGORY_BENCHMARKS.map((benchmark, index) => (
              <Reveal key={benchmark.slug} delay={(index % 2) * 0.05}>
                <CategoryBenchmarkFigure
                  benchmark={benchmark}
                  index={index}
                  locale={locale}
                />
              </Reveal>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-[80ch] text-center text-[14px] leading-relaxed text-black/58">
            {t.columnsNote(t.list(BENCHMARK_RUN.engines.map(engineLabel)))}
          </p>
        </div>
      </section>

      <section className="bg-[#fff9e8]">
        <div className="mx-auto max-w-[76rem] px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
          <Reveal>
            <h2 className="mx-auto max-w-[22ch] text-balance text-center font-display text-[clamp(2rem,3.2vw,3rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink-deep">
              {t.methodHeading}
            </h2>
            <p className="mx-auto mt-5 max-w-[60ch] text-center text-[17px] leading-[1.7] text-black/64">
              {t.methodIntro}
            </p>
            <dl className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-6">
              {t.method.map(([term, detail], index) => (
                <div
                  key={term}
                  className="rounded-media border border-black/10 bg-white p-6"
                >
                  <dt className="flex items-center gap-3 text-[17px] font-semibold text-ink-deep">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-signal text-[13px] font-semibold">
                      {index + 1}
                    </span>
                    {term}
                  </dt>
                  <dd className="mt-3 text-[15px] leading-[1.6] text-black/64">
                    {detail}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <FirstMonthPromise locale={locale} />
    </div>
  );
}
