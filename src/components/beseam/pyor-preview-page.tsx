import type { ReactNode } from "react";

import Link from "next/link";

import { ArrowRight, X } from "lucide-react";

import LiveAnswerCheck from "@/components/beseam/answer-check";
import { ActionsScreen, ImpactScreen } from "@/components/beseam/app-screens";
import { ChannelIcon } from "@/components/beseam/channel-icon";
import { BENCHMARK_RUN } from "@/data/category-benchmarks";

/**
 * An alternative homepage in the register of pyor.review, kept at
 * /preview/pyor so it can be read next to the real one rather than instead
 * of it. Nothing here is wired into the nav or the sitemap.
 *
 * What is borrowed is structure, not looks. The page keeps Beseam's world --
 * the same ground, the same Lora display face, the same signal ink, the same
 * hard edges -- and changes three things about how it argues:
 *
 *   1. Every section heading is a claim with a number in it, and the number
 *      is either read off `BENCHMARK_RUN` or is counting the artifact printed
 *      directly beneath it. No heading names a theme.
 *   2. No eyebrows. The production page labels every section before it speaks;
 *      here the claim carries itself, which is also what the craft floor asks
 *      for. It removes eight lines of chrome from the page.
 *   3. One column, document width. The production homepage is 92rem of grid;
 *      this is 64rem of argument, read top to bottom, and the artifacts are
 *      the only things that break the measure.
 *
 * The hero claim is the ruled one and is quoted, not rewritten: the tracker
 * freezes it to 2026-10-05.
 */

const SOLO_SHARE = Math.round(
  (BENCHMARK_RUN.singleEngineOnly / BENCHMARK_RUN.namings) * 100,
);

/**
 * The stores in the illustrated answer. Invented, and the card says EXAMPLE
 * in its own frame: the real dated cross-engine runs are on /benchmarks with
 * brands the assistants genuinely named.
 */
const ANSWER_PICKS = [
  { product: "Ridgeline Commuter Shell", store: "Northvale Outfitters" },
  { product: "Halden 3-Layer Rain Jacket", store: "Halden Rainwear" },
  { product: "Spoke Packable Waterproof", store: "Storm & Spoke" },
] as const;

const AGREEMENT = [
  {
    label: "One assistant only",
    value: BENCHMARK_RUN.singleEngineOnly,
    tone: "bg-signal-ink",
  },
  {
    label: "Two assistants",
    value: BENCHMARK_RUN.twoEngines,
    tone: "bg-signal-ink/40",
  },
  {
    label: "Every assistant",
    value:
      BENCHMARK_RUN.namings -
      BENCHMARK_RUN.singleEngineOnly -
      BENCHMARK_RUN.twoEngines,
    tone: "bg-ink-deep/70",
  },
] as const;

/**
 * One beat. A claim, an optional line of prose, an optional artifact -- and
 * nothing else, so the page has exactly one shape and the artifacts are what
 * varies.
 *
 * Every beat shares one container width and therefore one left rail. An
 * earlier draft widened the two beats whose artifacts are tables; their
 * headings then started 128px left of every other heading, which read as a
 * mistake rather than as emphasis. The measure is held by the text itself
 * (`22ch`, `68ch`), so the wide artifacts can have the room without moving
 * the edge the page is read down.
 *
 * `dark` is not decoration. `ImpactScreen` is drawn white-on-dark -- on the
 * production page it sits on `bg-ink-deep` -- so the beat that carries it has
 * to supply the ground it was authored for, or its row labels disappear. That
 * it also gives a long light column its one interruption is why the proof got
 * it and not some other beat.
 */
function Beat({
  claim,
  lede,
  children,
  dark = false,
}: {
  claim: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
  dark?: boolean;
}) {
  return (
    <section
      className={
        dark ? "border-t border-ink-deep bg-ink-deep" : "border-t border-rule"
      }
    >
      <div className="mx-auto max-w-[80rem] px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
        <h2
          className={`max-w-[22ch] text-balance font-display text-[clamp(2rem,3.6vw,3.1rem)] font-normal leading-[1.06] tracking-[-0.022em] ${
            dark ? "text-white" : "text-ink-deep"
          }`}
        >
          {claim}
        </h2>
        {lede ? (
          <p
            className={`mt-5 max-w-[68ch] text-[16px] leading-[1.75] sm:text-[17px] ${
              dark ? "text-white/62" : "text-black/64"
            }`}
          >
            {lede}
          </p>
        ) : null}
        {children ? <div className="mt-10 min-w-0">{children}</div> : null}
      </div>
    </section>
  );
}

/** The published run, drawn at the width each bucket actually occupies. */
function AgreementBar() {
  return (
    <figure className="border border-black/14 bg-panel-white">
      <figcaption className="flex items-baseline justify-between gap-4 border-b border-black/10 px-4 py-3">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-black/60">
          How often assistants agreed
        </span>
        <span className="font-mono text-[11px] tabular-nums text-black/45">
          {BENCHMARK_RUN.namings} brand appearances · asked{" "}
          {BENCHMARK_RUN.askedOn}
        </span>
      </figcaption>

      <div className="px-4 py-4">
        <div className="flex h-3 w-full overflow-hidden">
          {AGREEMENT.map((band) => (
            <div
              key={band.label}
              className={band.tone}
              style={{
                width: `${(band.value / BENCHMARK_RUN.namings) * 100}%`,
              }}
            />
          ))}
        </div>

        <dl className="mt-4 grid gap-3 sm:grid-cols-3">
          {AGREEMENT.map((band) => (
            <div key={band.label} className="flex items-baseline gap-2">
              <span
                aria-hidden="true"
                className={`h-2 w-2 shrink-0 translate-y-[-1px] ${band.tone}`}
              />
              <dt className="font-mono text-[11px] uppercase tracking-[0.06em] text-black/55">
                {band.label}
              </dt>
              <dd className="ml-auto font-mono text-[12px] font-semibold tabular-nums text-ink-deep">
                {band.value}
                <span className="ml-1 font-normal text-black/45">
                  ({Math.round((band.value / BENCHMARK_RUN.namings) * 100)}%)
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </figure>
  );
}

/** The answer a shopper gets, with the merchant absent from it. */
function AnswerCard() {
  return (
    <figure className="border border-black/14 bg-panel-white">
      <figcaption className="flex items-center justify-between gap-3 border-b border-black/10 px-4 py-3">
        <span className="min-w-0 truncate text-[14px] font-medium text-ink-deep">
          “best waterproof jacket for commuting, size M, under $200”
        </span>
        <span className="flex shrink-0 items-center gap-2">
          <ChannelIcon
            brand="openai"
            className="h-4 w-4 text-ink-deep/55"
            aria-hidden="true"
          />
          <span className="border border-black/15 px-1.5 py-px font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-black/45">
            Example
          </span>
        </span>
      </figcaption>

      <ol className="px-4 py-3">
        {ANSWER_PICKS.map((pick, index) => (
          <li
            key={pick.product}
            className="flex items-baseline gap-3 border-b border-black/8 py-2.5 last:border-0"
          >
            <span className="shrink-0 font-mono text-[12px] tabular-nums text-black/40">
              {index + 1}.
            </span>
            <span className="min-w-0 flex-1 truncate text-[14px] font-medium text-ink-deep">
              {pick.product}
            </span>
            <span className="shrink-0 font-mono text-[12px] text-black/50">
              {pick.store}
            </span>
          </li>
        ))}
      </ol>

      <p className="border-t border-black/10 px-4 py-3 font-mono text-[12px] text-black/45">
        and six more, none of them yours
      </p>

      <p className="flex items-center gap-2 border-t border-black/10 bg-signal-ink/[0.05] px-4 py-3 font-mono text-[12px] font-semibold uppercase tracking-[0.07em] text-signal-ink">
        <X className="h-4 w-4 shrink-0" aria-hidden="true" />
        Your store, not named
      </p>
    </figure>
  );
}

export default function PyorPreviewPage() {
  return (
    <div className="bg-ground text-[#151515] [&_::selection]:bg-signal-ink/20">
      {/* The one authored moment on the page: the rule under the claim draws
          itself once, on arrival, and nothing else animates. */}
      <section className="px-5 pb-16 pt-20 sm:px-8 sm:pb-20 sm:pt-28 lg:pt-32">
        <div className="mx-auto max-w-[80rem]">
          <h1 className="max-w-[16ch] text-balance font-display text-[clamp(2.9rem,6.2vw,4.6rem)] font-normal leading-[0.99] tracking-[-0.028em] text-ink-deep">
            See why AI picked{" "}
            <span className="relative whitespace-nowrap text-signal-ink">
              someone else
              <span
                aria-hidden="true"
                className="pyor-underline absolute inset-x-0 bottom-[0.06em] block h-[3px] origin-left bg-signal-ink/35"
              />
            </span>
            .
          </h1>

          <p className="mt-7 max-w-[62ch] text-[17px] leading-[1.7] text-black/64 sm:text-[19px]">
            Beseam asks the buying questions your shoppers ask, finds the one
            reason the answer names someone else, makes the change you approve,
            and asks the question again to see whether the answer moved.
          </p>

          <div className="mt-10 max-w-[46rem]">
            <LiveAnswerCheck placement="pyor_preview_hero" handOffTo="/scan" />
          </div>

          <p className="mt-4 text-[13.5px] leading-[1.6] text-black/55">
            Free · reads only your public storefront · no login ·{" "}
            <Link
              href="#answer"
              className="font-medium text-ink-deep underline decoration-black/25 underline-offset-4 hover:decoration-signal-ink"
            >
              or read a finished example first
            </Link>
          </p>
        </div>
      </section>

      <Beat
        claim={
          <>
            {BENCHMARK_RUN.questions} questions, {BENCHMARK_RUN.engines.length}{" "}
            assistants. {SOLO_SHARE}% of brands were named by only one.
          </>
        }
        lede={
          <>
            We asked the same buying questions across{" "}
            {BENCHMARK_RUN.engines.join(", ")} and recorded every brand each one
            named. Most brands showed up in one place and were missing from the
            other two — which is why a store can look fine and still be absent
            from the answer a shopper actually reads.
          </>
        }
      >
        <AgreementBar />
        <Link
          href="/benchmarks"
          className="mt-6 inline-flex min-h-11 items-center gap-2 text-[14px] font-semibold text-ink-deep underline decoration-black/25 underline-offset-6 hover:decoration-signal-ink"
        >
          See the report and method
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </Beat>

      <div id="answer" className="scroll-mt-20">
        <Beat
          claim="Nine stores in that answer. Yours is not one of them."
          lede="This is what being invisible looks like from the shopper's side. Not a low score — a list of nine competitors, with a size, a use case and a budget all handled, and no reason for the assistant to have mentioned you."
        >
          <AnswerCard />
        </Beat>
      </div>

      {/* No artifact under this one on purpose. It is the page taking a
          position, and a diagram would make it look like a feature. */}
      <Beat
        claim="A score tells you where you stand. It does not move you."
        lede="Most tools in this category end at a number. Beseam starts there: it finds the one change behind the number, makes it when you approve it, then asks the same shopper question again to see whether the answer moved."
      />

      <Beat
        claim="Everything Beseam watched. One change to approve first."
        lede="Findings arrive ranked by what they are worth and what they cost you to approve. Each one carries the evidence it came from, so you can hand it to a developer or a merchandiser without re-explaining it."
      >
        <div className="sm:hidden">
          <ActionsScreen compact />
        </div>
        <div className="hidden sm:block">
          <ActionsScreen />
        </div>
      </Beat>

      <Beat
        dark
        claim="Ask the same question again. That is the whole proof."
        lede="After a change goes live, Beseam re-asks the questions that exposed the gap. The before and the after are the same question, which is the only way the comparison means anything."
      >
        <ImpactScreen />
      </Beat>

      <Beat
        claim="Start free. Pay when Beseam proves its value."
        lede="Thirty days. See what it finds, approve the changes that need your judgment, watch them get applied, and see what moved before you pay anything."
      >
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link
            href="/scan"
            className="inline-flex min-h-12 items-center gap-2 bg-signal-ink px-6 text-[15px] font-semibold text-white transition-colors hover:bg-ink-deep"
          >
            Scan my store
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href="/how-we-work"
            className="text-[14.5px] font-semibold text-ink-deep underline decoration-black/25 underline-offset-6 hover:decoration-signal-ink"
          >
            See how Beseam measures it
          </Link>
        </div>
      </Beat>
    </div>
  );
}
