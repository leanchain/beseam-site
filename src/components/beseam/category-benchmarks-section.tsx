import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { BENCHMARK_INK } from "@/components/beseam/category-benchmark";
import { Reveal } from "@/components/beseam/reveal";
import { BENCHMARK_RUN, CATEGORY_BENCHMARKS } from "@/data/category-benchmarks";

const SCORED_BENCHMARKS = CATEGORY_BENCHMARKS.map((benchmark) => ({
  ...benchmark,
  singleEngineBrands: benchmark.brands.filter(
    (brand) => brand.namedBy.length === 1,
  ).length,
}));

const CATEGORIES = Array.from(
  new Set(SCORED_BENCHMARKS.map((benchmark) => benchmark.category)),
);

const BY_CATEGORY = CATEGORIES.map((category) =>
  SCORED_BENCHMARKS.filter((benchmark) => benchmark.category === category).sort(
    (a, b) =>
      b.singleEngineBrands - a.singleEngineBrands ||
      b.brands.length - a.brands.length,
  ),
);

const HIGHLIGHTS = Array.from(
  { length: Math.max(...BY_CATEGORY.map((benchmarks) => benchmarks.length)) },
  (_, index) =>
    BY_CATEGORY.map((benchmarks) => benchmarks[index]).filter(Boolean),
)
  .flat()
  .slice(0, 6)
  .map((benchmark) => ({
    ...benchmark,
    soloShare: benchmark.singleEngineBrands / benchmark.brands.length,
  }))
  .sort((a, b) => b.soloShare - a.soloShare);

const SOLO_SHARE = Math.round(
  (BENCHMARK_RUN.singleEngineOnly / BENCHMARK_RUN.namings) * 100,
);

const AGREEMENT_BANDS = [
  {
    label: "One assistant only",
    value: BENCHMARK_RUN.singleEngineOnly,
    color: "#cbd5e1",
  },
  {
    label: "Two assistants",
    value: BENCHMARK_RUN.twoEngines,
    color: "#94a3b8",
  },
  {
    label: "Every assistant",
    value: BENCHMARK_RUN.everyEngine,
    color: BENCHMARK_INK.consensus,
  },
] as const;

export default function CategoryBenchmarksSection() {
  if (CATEGORY_BENCHMARKS.length === 0) return null;

  return (
    <section
      id="benchmarks"
      className="scroll-mt-24 border-t border-black/14 bg-white"
    >
      <div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-center lg:gap-16">
            <div>
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-signal-ink">
                AI Shopping Report
              </p>
              <h2 className="mt-6 max-w-[18ch] text-balance font-display text-[clamp(2.2rem,3.6vw,3.6rem)] font-normal leading-[1.04] tracking-[-0.02em] text-ink-deep">
                Products can be visible in one place and missed in another.
              </h2>
              <p className="mt-6 max-w-[48ch] text-[16px] leading-[1.7] text-black/64">
                Beseam asks the same buying questions across AI assistants to
                find where your products appear, where they are missed, and how
                those results differ. In the latest run,{" "}
                <strong className="font-semibold text-ink-deep">
                  {SOLO_SHARE}% of brand appearances occurred on only one
                  assistant.
                </strong>
              </p>
              <Link
                href="/benchmarks"
                className="mt-7 inline-flex min-h-11 items-center gap-2 text-[14px] font-semibold text-ink-deep underline decoration-black/25 underline-offset-6 hover:decoration-signal-ink"
              >
                See the report and method
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <p className="mt-7 max-w-[38ch] border-l-2 border-signal-ink pl-4 text-[13.5px] font-medium leading-[1.55] text-black/68">
                A readable catalog gets you considered. Beseam follows whether
                you get chosen, and shows what changed.
              </p>
            </div>

            <div>
              <figure className="border-t-2 border-ink-deep pt-4">
                <figcaption className="flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-black/52">
                  <span className="font-semibold text-black/62">
                    How often assistants agreed
                  </span>
                  <span>{BENCHMARK_RUN.namings} brand appearances</span>
                </figcaption>

                <div
                  className="mt-4 flex h-8 gap-[2px] border border-black/18 bg-white p-[3px]"
                  aria-label={`${BENCHMARK_RUN.singleEngineOnly} brand appearances occurred on one assistant only, ${BENCHMARK_RUN.twoEngines} on two assistants, and ${BENCHMARK_RUN.everyEngine} on every assistant`}
                >
                  {AGREEMENT_BANDS.map((band) => (
                    <span
                      key={band.label}
                      className="h-full"
                      style={{
                        flexBasis: `${(band.value / BENCHMARK_RUN.namings) * 100}%`,
                        backgroundColor: band.color,
                      }}
                      aria-hidden="true"
                    />
                  ))}
                </div>

                <dl className="mt-3 grid gap-3 sm:grid-cols-3">
                  {AGREEMENT_BANDS.map((band) => (
                    <div
                      key={band.label}
                      className="flex min-w-0 items-center gap-2 font-mono text-[10.5px] tabular-nums"
                    >
                      <span
                        className="h-2 w-2 shrink-0 rounded-[2px]"
                        style={{ backgroundColor: band.color }}
                        aria-hidden="true"
                      />
                      <dd className="flex shrink-0 items-baseline gap-1 text-ink-deep">
                        <span className="font-semibold">{band.value}</span>
                        <span className="text-black/44">
                          (
                          {Math.round(
                            (band.value / BENCHMARK_RUN.namings) * 100,
                          )}
                          %)
                        </span>
                      </dd>
                      <dt className="min-w-0 font-semibold uppercase tracking-[0.08em] text-black/56">
                        {band.label}
                      </dt>
                    </div>
                  ))}
                </dl>
              </figure>

              <div className="mt-6 border-t-2 border-ink-deep">
                <div
                  className="grid items-end gap-x-2 border-b border-black/12 px-1 py-2.5 font-mono text-[9px] font-semibold uppercase tracking-[0.08em] text-black/46 sm:gap-x-4"
                  style={{
                    gridTemplateColumns: "8.5rem minmax(0, 1fr) 7.5rem",
                  }}
                >
                  <span>Category</span>
                  <span>Where assistants disagreed most</span>
                  <span className="text-right">Brands on one assistant</span>
                </div>
                <ul>
                  {HIGHLIGHTS.map((benchmark) => (
                    <li
                      key={benchmark.slug}
                      className="group grid items-center gap-x-2 border-b border-black/12 px-1 py-2.5 transition-colors hover:bg-black/[0.025] sm:gap-x-4"
                      style={{
                        gridTemplateColumns: "8.5rem minmax(0, 1fr) 7.5rem",
                      }}
                    >
                      <span className="min-w-0 truncate whitespace-nowrap font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-signal-ink">
                        {benchmark.category}
                      </span>

                      <Link
                        href={`/benchmarks#${benchmark.slug}`}
                        className="min-w-0 truncate whitespace-nowrap text-[15px] leading-none text-ink-deep underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-black/30"
                      >
                        &ldquo;{benchmark.question}&rdquo;
                      </Link>

                      <span className="flex items-center justify-end gap-2.5">
                        <span
                          aria-hidden="true"
                          className="h-2 w-14 shrink-0 bg-black/[0.07] sm:w-16"
                        >
                          <span
                            className="block h-full bg-signal-ink"
                            style={{
                              width: `${Math.round(benchmark.soloShare * 100)}%`,
                            }}
                          />
                        </span>
                        <span className="w-12 shrink-0 whitespace-nowrap text-right font-mono text-[12px] tabular-nums text-ink-deep">
                          {benchmark.singleEngineBrands}
                          <span className="text-black/40">
                            {" "}
                            of {benchmark.brands.length}
                          </span>
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
