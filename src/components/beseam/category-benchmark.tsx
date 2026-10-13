import type { CategoryBenchmark } from "@/data/category-benchmarks";
import type { Locale } from "@/i18n/locale-rules.mjs";
import { getPageCopy } from "@/i18n/pages";

/**
 * One published category benchmark: a real shopper question, and which brands
 * each assistant named in reply.
 *
 * The figure is a presence matrix, not a rank: one column per engine, one row
 * per brand, a mark where that engine named it. The engine is named at the top
 * of its column and carries its own tally for this question, so a reader can
 * see both who agreed and how differently each engine answers.
 *
 * Register note: like `gap-track-figure.tsx`, this is a quotation from the
 * product rather than editorial chrome: data palette, tabular numerals, a
 * stated denominator, method printed under the figure. Terracotta never
 * appears inside the frame.
 */

/** Shared data ink, reused by the run-level figures on /benchmarks. */
export const BENCHMARK_INK = {
  /** An engine that named the brand. */
  named: "#a98bf0",
  /** An engine that answered and did not name it. */
  absent: "#ddd6c6",
  /** Named by every engine that answered. */
  consensus: "#1d1c1a",
} as const;

/** Column headings stay short so three engines fit a phone width. */
const SHORT_ENGINE: Record<string, string> = {
  "Google AI Mode": "AI Mode",
};

export function engineLabel(engine: string) {
  return SHORT_ENGINE[engine] ?? engine;
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function formatBenchmarkDate(iso: string, dateLocale?: string) {
  if (dateLocale) {
    return new Intl.DateTimeFormat(dateLocale, {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(`${iso}T00:00:00Z`));
  }
  const [year, month, day] = iso.split("-");
  const index = Number(month) - 1;
  if (!year || !day || Number.isNaN(index) || !MONTHS[index]) return iso;
  return `${Number(day)} ${MONTHS[index]} ${year}`;
}

export default function CategoryBenchmarkFigure({
  benchmark,
  index,
  maxBrands,
  locale = "en",
}: {
  benchmark: CategoryBenchmark;
  index: number;
  maxBrands?: number;
  locale?: Locale;
}) {
  const copy = getPageCopy(locale);
  const t = copy.report;
  const { question, askedOn, engines, brands } = benchmark;
  const category = t.categoryNames[benchmark.category] ?? benchmark.category;
  const date = formatBenchmarkDate(
    askedOn,
    locale === "en" ? undefined : copy.common.dateLocale,
  );

  const engineCount = engines.length;
  const shown = maxBrands ? brands.slice(0, maxBrands) : brands;
  const hidden = brands.length - shown.length;
  const soloCount = brands.filter((b) => b.namedBy.length === 1).length;
  const perEngine = engines.map((engine) => ({
    engine,
    named: brands.filter((b) => b.namedBy.includes(engine)).length,
  }));

  // Identical templates on every row keep the columns aligned while each row
  // stays its own hover target.
  const columns = {
    gridTemplateColumns: `minmax(0,1fr) repeat(${engineCount}, minmax(3rem,4.25rem))`,
  };

  return (
    <figure id={benchmark.slug} className="scroll-mt-24">
      <div className="rounded-t-media border border-b-0 border-black/10 bg-white px-5 py-6 sm:px-7">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <span className="rounded-button bg-[#e3d3ff] px-2.5 py-1 text-[12px] font-semibold text-ink-deep">
            {category}
          </span>
          <span className="text-[13px] tabular-nums text-black/55">
            {t.figEngines(engineCount, date)}
          </span>
        </div>

        <p className="mt-5 max-w-[42ch] font-display text-[20px] font-semibold leading-[1.3] tracking-[-0.01em] text-ink-deep">
          &ldquo;{question}&rdquo;
        </p>

        <p className="mt-3 text-[15px] leading-relaxed text-black/64">
          {t.figTotals(brands.length, soloCount)}
        </p>

        <div
          className="mt-6 grid items-end gap-x-2 border-b border-black/12 pb-2"
          style={columns}
          aria-hidden="true"
        >
          <span className="text-[13px] font-semibold text-black/50">
            {t.figBrand}
          </span>
          {perEngine.map(({ engine, named }) => (
            <span key={engine} className="flex flex-col items-center gap-1">
              <span
                className="text-[12px] font-semibold text-black/62"
                title={engine}
              >
                {engineLabel(engine)}
              </span>
              <span className="text-[13px] font-semibold tabular-nums text-ink-deep">
                {named}
              </span>
            </span>
          ))}
        </div>

        <div>
          {shown.map((row) => {
            const consensus = row.namedBy.length === engineCount;
            return (
              <div
                key={row.brand}
                className="grid items-center gap-x-2 border-b border-black/[0.06] py-2 transition-colors last:border-b-0 hover:bg-[#fff9e8]"
                style={columns}
              >
                {/* Names wrap rather than truncate: a clipped brand is the one
                    fact the row exists to carry. */}
                <span
                  className={`pr-2 text-[14px] leading-snug ${
                    consensus ? "font-semibold text-ink-deep" : "text-black/82"
                  }`}
                >
                  {row.brand}
                </span>
                {engines.map((engine) => {
                  const named = row.namedBy.includes(engine);
                  return (
                    <span
                      key={engine}
                      className="flex justify-center"
                      aria-hidden="true"
                    >
                      <span
                        className={named ? "h-3 w-3 rounded-full" : "h-px w-3"}
                        style={{
                          backgroundColor: named
                            ? consensus
                              ? BENCHMARK_INK.consensus
                              : BENCHMARK_INK.named
                            : BENCHMARK_INK.absent,
                        }}
                      />
                    </span>
                  );
                })}
                <span className="sr-only">
                  {t.figNamedBy(row.brand, t.list(row.namedBy))}
                </span>
              </div>
            );
          })}
        </div>

        {hidden > 0 ? (
          <p className="mt-3 text-[14px] text-black/55">{t.figMore(hidden)}</p>
        ) : null}
      </div>

      <figcaption className="grid gap-1 rounded-b-media border border-black/10 bg-[#fff9e8] px-5 py-4 sm:px-7">
        <span className="text-[13px] font-semibold text-ink-deep">
          {t.figCaption(
            index + 1,
            t.lowercaseCategories ? category.toLowerCase() : category,
          )}
        </span>
        <span className="text-[13px] leading-relaxed text-black/62">
          {t.figNote(t.list(engines), date)}
        </span>
      </figcaption>
    </figure>
  );
}
