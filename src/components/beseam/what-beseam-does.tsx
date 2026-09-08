import {
  ArrowRight,
  BarChart3,
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
import ProductArt from "@/components/beseam/product-art";
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
const DOMAINS = [
  {
    title: "Get found",
    scope: "AI · search · feeds",
    detail: "If shoppers never see you, they cannot choose you.",
    Icon: Radar,
  },
  {
    title: "See why shoppers hesitate",
    scope: "Product pages · search · behavior",
    detail: "Find the unanswered question that makes the shopper hesitate.",
    Icon: MousePointer2,
  },
  {
    title: "Help shoppers choose",
    scope: "Recommendations · personalization",
    detail: "Add the missing information that helps the shopper choose.",
    Icon: ShoppingBag,
  },
  {
    title: "See what changed",
    scope: "Conversion · orders · revenue",
    detail: "Check the same journey again and see what improved.",
    Icon: BarChart3,
  },
] as const;

function DiscoveryVignette() {
  return (
    <div
      aria-hidden="true"
      className="flex h-[11rem] flex-col bg-white p-3.5 ring-1 ring-black/10"
    >
      <div className="flex flex-col gap-1 border-b border-black/10 pb-2.5">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-black/60">
          Buying question
        </span>
        <span className="min-w-0 truncate text-[12px] font-medium text-ink-deep">
          best waterproof jacket for commuting
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-center gap-2.5">
        {(
          [
            ["openai", "ChatGPT", true],
            ["gemini", "Gemini", true],
            ["perplexity", "Perplexity", false],
          ] as const
        ).map(([brand, name, named]) => (
          <div key={brand} className="flex items-center gap-2">
            <ChannelIcon
              brand={brand}
              className={`h-[18px] w-[18px] shrink-0 ${named ? "text-ink-deep/70" : "text-black/30"}`}
            />
            <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.06em] text-black/56">
              {name}
            </span>
            <span className="h-px min-w-3 flex-1 bg-black/10" />
            <span
              className={`shrink-0 font-mono text-[12px] font-semibold uppercase tracking-[0.06em] ${
                named ? "text-[#1a6b43]" : "text-signal-ink"
              }`}
            >
              {named ? "Named" : "Not named"}
            </span>
          </div>
        ))}
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
        <ProductArt kind="shell" className="h-14 w-14" />
        <span className="mt-1.5 text-[11px] font-semibold text-ink-deep">
          City Shell
        </span>
        <span className="mt-0.5 font-mono text-[11px] text-black/60">
          20,000 mm
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center border-l border-black/10 px-3.5">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-black/60">
          What blocks the choice
        </span>
        <p className="mt-2 text-[12.5px] font-semibold leading-[1.3] text-ink-deep">
          Breathable enough for commuting?
        </p>
        <div className="mt-2 flex items-center gap-1.5 text-signal-ink">
          <X className="h-3.5 w-3.5 shrink-0" />
          <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.06em]">
            No answer
          </span>
        </div>
        <p className="mt-2 font-mono text-[11px] leading-[1.4] text-black/60">
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
        <span className="shrink-0 font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-black/60">
          Shopper wants
        </span>
        <span className="h-px min-w-3 flex-1 bg-black/10" />
        <span className="shrink-0 bg-ground px-1.5 py-0.5 font-mono text-[11px] text-black/60 ring-1 ring-black/8">
          waterproof
        </span>
        <span className="shrink-0 bg-signal-ink/[0.06] px-1.5 py-0.5 font-mono text-[11px] font-semibold text-signal-ink ring-1 ring-signal-ink/18">
          commuting
        </span>
      </div>

      <div className="mt-2.5 flex min-h-0 flex-1 overflow-hidden ring-1 ring-black/10">
        <div className="flex w-[42%] min-w-0 items-center gap-2.5 bg-ground/65 px-2.5">
          <ProductArt kind="shell" className="h-11 w-11 shrink-0" />
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
          <div className="mt-2 flex flex-wrap gap-1.5">
            <span className="bg-white px-1.5 py-0.5 font-mono text-[11px] text-black/60 ring-1 ring-black/8">
              Commuting use case
            </span>
            <span className="bg-white px-1.5 py-0.5 font-mono text-[11px] font-semibold text-ink-deep ring-1 ring-signal-ink/16">
              Breathable shell
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function RevenueVignette() {
  return (
    <div
      aria-hidden="true"
      className="flex h-[11rem] flex-col bg-white p-3.5 ring-1 ring-black/10"
    >
      <div className="flex items-center justify-between gap-2 border-b border-black/10 pb-2.5">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-black/60">
          After the approved change
        </span>
        <span className="shrink-0 font-mono text-[11px] text-black/60">
          before → after
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-center gap-2.5">
        {(["AI appearances", "Product visits", "Add to cart"] as const).map(
          (label) => (
            <div key={label} className="flex items-center gap-2">
              <span className="truncate font-mono text-[12px] uppercase tracking-[0.05em] text-black/52">
                {label}
              </span>
              <span className="h-px min-w-2 flex-1 bg-black/10" />
              <span className="shrink-0 font-mono text-[12px] font-semibold uppercase tracking-[0.04em] text-signal-ink">
                Checked again
              </span>
            </div>
          ),
        )}
      </div>
    </div>
  );
}

const VIGNETTES = [
  DiscoveryVignette,
  StoreVignette,
  PersonalizationVignette,
  RevenueVignette,
] as const;

const LOOP = [
  { label: "Find what to improve", Icon: Radar },
  { label: "Prepare the change", Icon: WandSparkles },
  { label: "You approve", Icon: CheckCircle2 },
  { label: "Beseam applies it", Icon: Send },
  { label: "Check and repeat", Icon: RefreshCw },
] as const;

/**
 * The grid drops to four across only at `xl`. Between 1024px and 1280px four
 * panels squeezed each one under 15rem, which is the width at which the labels
 * stopped being readable in the first place.
 */
const CELL_RULES = [
  "sm:pl-0",
  "sm:border-l",
  "sm:pl-0 xl:border-l xl:pl-5",
  "sm:border-l",
] as const;

export default function WhatBeseamDoes() {
  return (
    <section id="one-system" className="scroll-mt-24 bg-ground">
      <div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        {/* Outside the stage on purpose: the pin holds the row, not the
            heading. Pinning from the heading down put its eyebrow under the
            sticky site header and held a screen that was mostly type. */}
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
              where confidence drops, questions go unanswered, or the journey
              stops.
            </p>
          </div>
        </Reveal>

        <ScrollDealFallback />
        <ScrollDeal
          className="mt-12 grid border-t-2 border-ink-deep sm:grid-cols-2 lg:mt-16 xl:grid-cols-4"
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
                      <p className="mt-1.5 font-mono text-[11px] font-semibold uppercase leading-[1.35] tracking-[0.07em] text-black/46">
                        {domain.scope}
                      </p>
                    </div>
                    {index < DOMAINS.length - 1 ? (
                      <span
                        data-deal-arrow
                        aria-hidden="true"
                        className="hidden items-center text-signal-ink xl:absolute xl:-right-[1.35rem] xl:top-[1.6rem] xl:z-10 xl:flex xl:bg-ground"
                      >
                        {/* Overlaps the head: the icon draws its own shaft
                            from 3px inside its box, so a line stopping at the
                            box edge leaves a visible break in the connector. */}
                        <span
                          className="h-px w-8 bg-signal-ink/70"
                          style={{ marginRight: -4 }}
                        />
                        <ArrowRight className="h-3.5 w-3.5 shrink-0" />
                      </span>
                    ) : null}
                  </div>
                  <div className="mt-4">
                    <Vignette />
                  </div>
                  <p className="mt-3.5 max-w-[33ch] text-[14.5px] leading-[1.55] text-black/64">
                    {domain.detail}
                  </p>
                </article>
              ),
            };
          })}
          footer={
            <div className="mt-5 border-y border-white/10 bg-ink-deep px-5 py-3.5 text-white sm:px-6 lg:px-8">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-8">
                <p className="shrink-0 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-signal">
                  Continuous loop
                </p>
                <ol className="relative grid flex-1 gap-y-3 before:absolute before:left-5 before:right-5 before:top-3.5 before:hidden before:h-px before:bg-white/16 sm:grid-cols-5 sm:gap-0 sm:before:block">
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
              </div>
            </div>
          }
        />
      </div>
    </section>
  );
}
