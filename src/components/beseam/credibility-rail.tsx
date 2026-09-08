import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { BENCHMARK_RUN } from "@/data/category-benchmarks";

/**
 * A single-line research banner directly under the hero: one published
 * finding plus a link to the full report and method, kept as compact as a
 * site announcement bar. Sample sizes (questions, engines, answers) live on
 * /benchmarks and /data.
 */
const SOLO_SHARE = Math.round(
  (BENCHMARK_RUN.singleEngineOnly / BENCHMARK_RUN.namings) * 100,
);

export default function CredibilityRail() {
  return (
    <section
      id="research-rail"
      aria-label="Research finding"
      className="border-y border-black/14 bg-[#faf1eb]"
    >
      <div className="mx-auto flex max-w-[92rem] flex-wrap items-baseline justify-center gap-x-2.5 gap-y-1 px-5 py-3 text-center sm:px-8 lg:px-10">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-signal-ink">
          New research
        </span>
        <p className="text-[13px] font-medium leading-[1.4] text-black/70">
          {SOLO_SHARE}% of brand appearances occurred on only one AI
          assistant.
        </p>
        <Link
          href="/benchmarks"
          className="group inline-flex items-center gap-1 text-[13px] font-semibold text-ink-deep underline decoration-black/25 underline-offset-4 hover:decoration-signal-ink"
        >
          See the report &amp; method
          <ArrowRight
            aria-hidden="true"
            className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </section>
  );
}
