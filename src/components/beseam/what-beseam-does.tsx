import type { CSSProperties } from "react";

import Image from "next/image";

import {
  ArrowRight,
  CheckCircle2,
  MousePointer2,
  Radar,
  RefreshCw,
  Send,
  ShoppingBag,
  WandSparkles,
  X,
} from "lucide-react";

import { ChannelIcon } from "@/components/beseam/channel-icon";
import { Reveal } from "@/components/beseam/reveal";
import {
  ScrollDeal,
  ScrollDealFallback,
} from "@/components/beseam/scroll-deal";

/**
 * The four-step flow: a shopper asks a buying question, the assistant either
 * names you or does not, the shopper lands on the product page, looks for the
 * one thing they need to know, and leaves when it is not there.
 *
 * Two things a merchant told us shaped this. The panels used to draw their
 * labels at 7.5px, which she could not read without leaning in ("it's so
 * small"), so nothing in this section goes below 11px and the panels are a
 * third taller. And all four used to appear at once, which she asked to be
 * dealt one after another.
 *
 * A timed stagger did not carry that -- four panels landing inside half a
 * second still read as one block, and a slower timer only makes a fast reader
 * wait. `ScrollDeal` paces the row by scroll position instead: each panel is
 * dealt across its own slice of the row's travel through the viewport, the
 * connector arrow draws out of the panel that just landed before the next one
 * rises, and scrolling back plays it backwards. The reader sets the pace.
 */
/**
 * A real garment, not a drawing: the panels are showing a merchant's product
 * page, and a shopper never sees an illustration there. Cut out on a
 * transparent ground so it sits on the panel's own paper.
 *
 * Source: "Windbreaker Jacket, Hood Outside Transparency.png" by Ingolfson,
 * Wikimedia Commons, CC0 -- no attribution required, kept here because the
 * next person to touch this file will want to know where it came from.
 */
const PRODUCT_PHOTO = {
  src: "/images/city-shell.webp",
  width: 520,
  height: 456,
} as const;

/**
 * A beat inside a vignette's flow: `--vig-i` is its place in the order,
 * `--vig-base` the moment the panel's flow starts. Both are read by the
 * `.vig-step` rule in globals.css, which is where the timing lives.
 */
const vig = (index: number, base?: string): CSSProperties =>
  ({
    "--vig-i": index,
    ...(base ? { "--vig-base": base } : {}),
  }) as CSSProperties;

/**
 * `capabilities` replaced a single "AI · search · feeds" line under the title.
 * Same words, boxed: a shopper-journey stage is a set of surfaces Beseam
 * watches, and a row of chips says "these, specifically" where a dot-separated
 * line read as a caption to be skipped.
 */
/**
 * The discovery panel used to answer its own question with three verdict
 * words -- ChatGPT NAMED, Gemini NAMED, Perplexity NOT NAMED. That is the
 * scoreboard, not the result: a merchant reading it still has to take our
 * word for what the assistant actually said, and the thing that stings --
 * seeing three other stores in the answer and not yours -- never appears.
 *
 * So the panel shows the answer instead. It is an illustration, not a
 * capture: the stores below are invented and the panel says EXAMPLE where a
 * date would go, because the one thing this product must never show is
 * manufactured evidence dressed as a finding. The real, dated, cross-engine
 * runs are two sections down in #benchmarks and on /benchmarks, with brands
 * the assistants genuinely named. Keep it that way -- if these names ever
 * need to be real, take them from `category-benchmarks.ts` and print the
 * engine and date with them.
 */
const ANSWER_PICKS = [
  "Northvale Outfitters",
  "Storm & Spoke",
  "Halden Rainwear",
] as const;

const DOMAINS = [
  {
    title: "Get found",
    capabilities: ["AI answers", "Search", "Product feeds"],
    detail: "If shoppers never see you, they cannot choose you.",
    Icon: Radar,
  },
  {
    title: "See why shoppers hesitate",
    capabilities: ["Product pages", "On-site search", "Behavior"],
    detail: "Find the unanswered question that makes the shopper hesitate.",
    Icon: MousePointer2,
  },
  {
    title: "Help shoppers choose",
    capabilities: ["Recommendations", "Personalization"],
    detail: "Add the missing information that helps the shopper choose.",
    Icon: ShoppingBag,
  },
] as const;

function DiscoveryVignette() {
  return (
    <div
      aria-hidden="true"
      className="flex h-[11rem] flex-col bg-white p-3.5 ring-1 ring-black/10"
    >
      <div className="flex shrink-0 items-center justify-between gap-2 border-b border-black/10 pb-2">
        <span className="vig-step font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-black/60">
          Buying question
        </span>
        {/* The engine mark and the word EXAMPLE travel together, in the panel's
            own frame: this is what an assistant answer looks like, and it is
            not a capture. A real one would carry a date here instead. */}
        <div className="flex shrink-0 items-center gap-1.5">
          <ChannelIcon
            brand="openai"
            className="h-[15px] w-[15px] shrink-0 text-ink-deep/55"
          />
          <span className="border border-black/15 px-1.5 py-px font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-black/45">
            Example
          </span>
        </div>
      </div>

      {/* Typed, because a shopper types it. Thirty-six characters, which is
          the count `steps(36)` in globals.css is pacing -- edit the string
          and the timing function has to move with it. */}
      <span
        className="vig-type mt-2 max-w-full shrink-0 text-[12.5px] font-semibold leading-[1.3] text-ink-deep"
        style={{ "--vig-chars": 36 } as CSSProperties}
      >
        best waterproof jacket for commuting
      </span>

      {/* The answer, not the scoreboard. Three stores arrive one at a time,
          the way an assistant lists them, and the reader watches the list
          finish without their own store in it. */}
      <ol className="mt-2 flex min-h-0 flex-1 flex-col justify-center gap-1">
        {ANSWER_PICKS.map((store, index) => (
          <li
            key={store}
            className="vig-step flex items-baseline gap-1.5"
            style={vig(index, "0.95s")}
          >
            <span className="shrink-0 font-mono text-[11px] text-black/40">
              {index + 1}.
            </span>
            <span className="min-w-0 truncate text-[12px] font-medium text-ink-deep">
              {store}
            </span>
          </li>
        ))}
      </ol>

      <div
        className="vig-step vig-stamp mt-1.5 flex shrink-0 items-center gap-1.5 border-t border-black/10 pt-2 text-signal-ink"
        style={vig(3, "1.05s")}
      >
        <X className="h-3.5 w-3.5 shrink-0" />
        <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.06em]">
          Your store, not named
        </span>
      </div>
    </div>
  );
}

function StoreVignette() {
  return (
    <div
      aria-hidden="true"
      className="flex h-[11rem] overflow-hidden bg-white ring-1 ring-black/10"
    >
      <div className="flex w-[36%] min-w-0 flex-col items-center justify-center bg-ground/60 px-2">
        <Image
          src={PRODUCT_PHOTO.src}
          alt=""
          width={PRODUCT_PHOTO.width}
          height={PRODUCT_PHOTO.height}
          className="h-[3.9rem] w-auto object-contain"
        />
        <span className="mt-1.5 text-[11px] font-semibold text-ink-deep">
          City Shell
        </span>
        <span className="mt-0.5 font-mono text-[11px] text-black/60">
          20,000 mm
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center border-l border-black/10 px-3.5">
        <span
          className="vig-step font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-black/60"
          style={vig(0, "0.2s")}
        >
          What blocks the choice
        </span>
        <p
          className="vig-step mt-2 text-[12.5px] font-semibold leading-[1.3] text-ink-deep"
          style={vig(1, "0.2s")}
        >
          Breathable enough for commuting?
        </p>
        {/* The verdict is the panel, so it stamps rather than drifts in. */}
        <div
          className="vig-step vig-stamp mt-2 flex items-center gap-1.5 text-signal-ink"
          style={vig(3, "0.2s")}
        >
          <X className="h-3.5 w-3.5 shrink-0" />
          <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.06em]">
            No answer
          </span>
        </div>
        <p
          className="vig-step mt-2 font-mono text-[11px] leading-[1.4] text-black/60"
          style={vig(4, "0.2s")}
        >
          Question not answered on the page
        </p>
      </div>
    </div>
  );
}

function PersonalizationVignette() {
  return (
    <div
      aria-hidden="true"
      className="flex h-[11rem] flex-col bg-white p-3.5 ring-1 ring-black/10"
    >
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
        <span
          className="vig-step shrink-0 font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-black/60"
          style={vig(0, "0.2s")}
        >
          Shopper wants
        </span>
        <span className="h-px min-w-3 flex-1 bg-black/10" />
        <span
          className="vig-step shrink-0 bg-ground px-1.5 py-0.5 font-mono text-[11px] text-black/60 ring-1 ring-black/8"
          style={vig(1, "0.2s")}
        >
          waterproof
        </span>
        <span
          className="vig-step shrink-0 bg-signal-ink/[0.06] px-1.5 py-0.5 font-mono text-[11px] font-semibold text-signal-ink ring-1 ring-signal-ink/18"
          style={vig(2, "0.2s")}
        >
          commuting
        </span>
      </div>

      <div className="mt-2.5 flex min-h-0 flex-1 overflow-hidden ring-1 ring-black/10">
        <div className="flex w-[42%] min-w-0 items-center gap-2.5 bg-ground/65 px-2.5">
          <Image
            src={PRODUCT_PHOTO.src}
            alt=""
            width={PRODUCT_PHOTO.width}
            height={PRODUCT_PHOTO.height}
            className="h-11 w-auto shrink-0 object-contain"
          />
          <div className="min-w-0">
            <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-black/60">
              You’re viewing
            </p>
            <p className="mt-0.5 truncate text-[12px] font-semibold text-ink-deep">
              City Shell
            </p>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-center border-l border-black/10 bg-signal-ink/[0.045] px-3">
          <div className="flex items-center gap-1.5">
            <WandSparkles className="h-3.5 w-3.5 shrink-0 text-signal-ink" />
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-signal-ink">
              Helpful context
            </span>
          </div>
          {/* The two chips are the fix arriving: they fill in after the
              shopper's wants have been read, one then the other. */}
          <div className="mt-2 flex flex-wrap gap-1.5">
            <span
              className="vig-step bg-white px-1.5 py-0.5 font-mono text-[11px] text-black/60 ring-1 ring-black/8"
              style={vig(4, "0.2s")}
            >
              Commuting use case
            </span>
            <span
              className="vig-step bg-white px-1.5 py-0.5 font-mono text-[11px] font-semibold text-ink-deep ring-1 ring-signal-ink/16"
              style={vig(5, "0.2s")}
            >
              Breathable shell
            </span>
          </div>
        </div>
      </div>

      {/* The panel is about the shopper choosing, so it ends where choosing
          ends. Green, because nothing else in this section is. */}
      <div
        className="vig-step vig-stamp mt-2 flex items-center gap-1.5 bg-[#1a6b43]/[0.07] px-2 py-1.5 ring-1 ring-[#1a6b43]/20"
        style={vig(7, "0.2s")}
      >
        <CheckCircle2
          className="h-3.5 w-3.5 shrink-0 text-[#1a6b43]"
          strokeWidth={2}
        />
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.07em] text-[#1a6b43]">
          Added to cart
        </span>
      </div>
    </div>
  );
}

const VIGNETTES = [
  DiscoveryVignette,
  StoreVignette,
  PersonalizationVignette,
] as const;

const LOOP = [
  { label: "Find what to improve", Icon: Radar },
  { label: "Prepare the change", Icon: WandSparkles },
  { label: "You approve", Icon: CheckCircle2 },
  { label: "Beseam applies it", Icon: Send },
  { label: "Check and repeat", Icon: RefreshCw },
] as const;

/**
 * Three panels, not four. The fourth was "See what changed" -- which is what
 * the loop bar underneath already promises, in the same words. Folding it down
 * there leaves the row as the shopper's journey (found, hesitating, choosing)
 * and buys each panel another 3rem of width to say it in.
 */
const CELL_RULES = [
  "sm:pl-0",
  "sm:border-l",
  "sm:pl-0 xl:border-l xl:pl-5",
] as const;

export default function WhatBeseamDoes() {
  return (
    <section id="one-system" className="scroll-mt-24 bg-ground">
      <div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        {/* Heading, row and loop bar are one pinned panel: the scroll stops
            where the section starts, under the sticky site header, and what it
            holds still is the whole section rather than a slice of it. */}
        <ScrollDealFallback />
        <ScrollDeal
          className="mt-12 grid border-t-2 border-ink-deep sm:grid-cols-2 lg:mt-16 xl:grid-cols-3"
          header={
            <Reveal>
              <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end lg:gap-16">
                <div>
                  <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-signal-ink">
                    From being considered to being chosen
                  </p>
                  <h2 className="mt-7 max-w-[18ch] text-balance font-display text-[clamp(2.3rem,3.8vw,3.9rem)] font-normal leading-[1.03] tracking-[-0.02em] text-ink-deep">
                    Being considered doesn’t mean being chosen.
                  </h2>
                </div>
                <p className="max-w-[50ch] text-[16px] leading-[1.7] text-black/64">
                  Beseam follows the shopper from discovery to purchase to find
                  where confidence drops, questions go unanswered, or the
                  journey stops.
                </p>
              </div>
            </Reveal>
          }
          cells={DOMAINS.map((domain, index) => {
            const Vignette = VIGNETTES[index];
            return {
              key: domain.title,
              className: `relative border-b border-black/14 py-5 sm:px-5 sm:py-6 xl:border-b-0 ${CELL_RULES[index]}`,
              content: (
                <article>
                  <div className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-signal-ink text-white">
                      <domain.Icon
                        aria-hidden="true"
                        className="h-[18px] w-[18px]"
                        strokeWidth={1.8}
                      />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-[17px] font-semibold leading-[1.25] text-ink-deep">
                        {domain.title}
                      </h3>
                    </div>
                    {/* The hand-off between tiles: one mark, centred on the
                        rule that divides them and on the cell's own height,
                        so it lands in the gutter beside the vignettes rather
                        than tacked to a heading.

                        It hangs off the receiving cell's left edge, not the
                        leaving cell's right edge, because that rule is the
                        receiving cell's own `border-l`: a child paints over
                        its parent's border, so the ground fill cuts a clean
                        gap in the line instead of having the line run
                        straight through the arrow. DOM order is unchanged,
                        so `data-deal-arrow` still wipes each one in after the
                        panel it leaves. */}
                    {index > 0 ? (
                      <span
                        data-deal-arrow
                        aria-hidden="true"
                        className="hidden xl:absolute xl:-left-4 xl:top-1/2 xl:z-10 xl:flex xl:h-8 xl:w-8 xl:-translate-y-1/2 xl:items-center xl:justify-center xl:bg-ground xl:text-signal-ink"
                      >
                        <ArrowRight
                          className="h-[18px] w-[18px] shrink-0"
                          strokeWidth={2.25}
                        />
                      </span>
                    ) : null}
                  </div>
                  <div className="mt-4">
                    <Vignette />
                  </div>
                  <p className="mt-3.5 max-w-[33ch] text-[14.5px] leading-[1.55] text-black/64">
                    {domain.detail}
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {domain.capabilities.map((capability) => (
                      <li
                        key={capability}
                        className="bg-white px-2 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-black/56 ring-1 ring-black/12"
                      >
                        {capability}
                      </li>
                    ))}
                  </ul>
                </article>
              ),
            };
          })}
          footer={
            <div className="mt-5 border-y border-white/10 bg-ink-deep px-5 py-3.5 text-white sm:px-6 lg:px-8">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:gap-8">
                <p className="shrink-0 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-signal lg:pt-1.5">
                  Continuous loop
                </p>
                {/* The rail runs between the steps, not past them: it starts on
                    the first icon's centre and stops on the last one's, which
                    is 26px into a column (12px of padding, half of a 28px
                    icon) and a fifth of the row from the right edge. */}
                <div className="relative flex-1">
                  <span
                    aria-hidden="true"
                    className="absolute hidden h-px bg-white/16 sm:block"
                    style={{ left: 26, right: "calc(20% - 26px)", top: 14 }}
                  />
                  <ol className="relative grid gap-y-3 sm:grid-cols-5 sm:gap-0">
                    {LOOP.map(({ label, Icon }, index) => (
                      <li
                        key={label}
                        className="relative z-10 flex items-center gap-2.5 sm:flex-col sm:items-start sm:gap-2 sm:px-3"
                      >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center bg-ink-deep text-signal ring-1 ring-white/18">
                          <Icon
                            className="h-3.5 w-3.5"
                            strokeWidth={1.8}
                            aria-hidden="true"
                          />
                        </span>
                        <span className="text-[12px] font-semibold leading-[1.3] text-white/82">
                          {label}
                        </span>
                        {index < LOOP.length - 1 ? (
                          <ArrowRight
                            className="ml-auto h-3.5 w-3.5 text-signal sm:hidden"
                            aria-hidden="true"
                          />
                        ) : null}
                      </li>
                    ))}
                  </ol>

                  {/* The return path. Five steps on a straight rail read as a
                      list that ends; the rail now turns down after the last
                      step and comes back under the row into the first, which
                      is the shape of the thing the words claim. */}
                  <div
                    aria-hidden="true"
                    className="relative mt-2 hidden h-4 sm:block"
                  >
                    <span
                      className="absolute top-0 block h-4 rounded-b-[14px] border-b border-l border-r border-white/18"
                      style={{ left: 26, right: "calc(20% - 26px)" }}
                    />
                    <span
                      className="absolute top-0 block h-2 w-2 border-l border-t border-signal"
                      style={{
                        left: 26,
                        transform: "translate(-50%, -50%) rotate(45deg)",
                      }}
                    />
                  </div>

                  <p className="mt-2.5 font-mono text-[11px] uppercase leading-[1.5] tracking-[0.1em] text-white/45">
                    <span className="text-signal">Before → after</span> · the
                    same journey — AI appearances, product visits, add to cart —
                    checked again after every approved change
                  </p>
                </div>
              </div>
            </div>
          }
        />
      </div>
    </section>
  );
}
