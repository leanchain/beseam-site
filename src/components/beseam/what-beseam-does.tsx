import type { CSSProperties } from "react";

import Image from "next/image";

import {
  ArrowRight,
  Check,
  CheckCircle2,
  MousePointer2,
  Radar,
  ShoppingBag,
  Star,
  WandSparkles,
  X,
} from "lucide-react";

import { ChannelIcon } from "@/components/beseam/channel-icon";
import LoopDiagram from "@/components/beseam/loop-diagram";
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
const ASKED = "waterproof jacket for commuting, size M, under €200";

/**
 * What the assistant read out of the question before it answered. Every cell
 * is derivable from `ASKED` on its own -- no invented constraint the shopper
 * never gave -- because the panel is claiming the assistant understood the
 * question, and a cell with nothing behind it in the query would be a lie
 * about how these engines work.
 */
const PARSED = [
  { label: "Use case", value: "Commuting" },
  { label: "Material", value: "Waterproof" },
  { label: "Size", value: "Size M" },
  { label: "Price", value: "Under €200" },
] as const;

/**
 * The two listings the answer leads with, shown the way an assistant shows
 * them: a picture, the product, the store and the price.
 *
 * Two different jackets, both free-licensed, both cropped to the same card
 * band so they read as two listings rather than two photographs:
 * `commuter-shell.webp` is a crop of "red-jacket" (CC0, StockSnap, no
 * attribution required) and `rain-jacket.webp` a crop of "Windbreaker Jacket,
 * Hood Outside Transparency" (CC0, Ingolfson, Wikimedia Commons) -- the same
 * cutout the merchant's own product uses two tiles along.
 *
 * No real brand's product photo stands in for an invented listing: everything
 * here is an anonymous garment under a made-up name, and the frame says
 * EXAMPLE.
 *
 * No match score. The mock this follows carried "97% MATCH" per card, which is
 * a number Beseam never computed -- the same rule that keeps a projected lift
 * off the Actions queue.
 */
const ANSWER_PICKS = [
  {
    product: "Ridgeline Commuter Shell",
    store: "Northvale Outfitters",
    price: "€168",
    image: "/images/picks/commuter-shell.webp",
  },
  {
    product: "Halden 3-Layer Rain Jacket",
    store: "Halden Rainwear",
    price: "€142",
    image: "/images/picks/rain-jacket.webp",
  },
] as const;

/** The merchant's own product, so the last two panels have something to sell. */
const PRODUCT = { name: "City Shell", price: "€149" } as const;

/**
 * The four things a shopper wants to know before buying this jacket, and what
 * the product page says back. Two are answered, two are not.
 *
 * `ADDED_CONTEXT` below answers those same two, by name. That is the whole
 * argument of the row -- panel two finds the gap, panel three closes it -- so
 * the two lists have to keep matching. Change a question here and change it
 * there, or the section stops being one story and becomes three drawings.
 */
const PAGE_QUESTIONS = [
  { question: "Waterproof rating", answer: "20,000 mm", answered: true },
  {
    question: "Breathable for commuting",
    answer: "Not answered",
    answered: false,
  },
  {
    question: "Fits over a suit jacket",
    answer: "Not answered",
    answered: false,
  },
  { question: "Return window", answer: "60 days", answered: true },
] as const;

const ADDED_CONTEXT = [
  { question: "Breathable for commuting", answer: "3-layer shell, pit zips" },
  { question: "Fits over a suit jacket", answer: "Regular cut, size up" },
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
      className="flex h-[23rem] flex-col rounded-md bg-white p-3.5 ring-1 ring-black/10"
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

      {/* Typed, because a shopper types it. Fifty-one characters, which is
          the count `steps(51)` in globals.css is pacing -- edit the string
          and the timing function has to move with it. */}
      <span
        className="vig-type mt-2 max-w-full shrink-0 text-[12.5px] font-semibold leading-[1.3] text-ink-deep"
        style={{ "--vig-chars": ASKED.length } as CSSProperties}
      >
        {ASKED}
      </span>

      {/* The assistant taking the question apart before it answers. This is
          the part a merchant never sees and cannot argue with: the engine
          already knows what the shopper meant by every clause.

          One badge per clause rather than a four-column table: the clauses
          are read individually, not compared down a column, and a badge that
          is as wide as its own content wraps where the panel is narrow
          instead of squeezing four columns into a phone. */}
      {/* One badge per clause, and the value carries it alone. Label plus
          value would not fit on one line here at a readable size -- four
          `USE CASE Commuting` pairs need about 407px against the panel's 396
          -- and this section has a floor of 11px that a merchant put there,
          so the labels went rather than the type size. `Size M` says its own
          field; the other three already did. */}
      <ul className="mt-2.5 flex shrink-0 flex-wrap gap-1.5 border-b border-black/10 pb-2.5">
        {PARSED.map((field, index) => (
          <li
            key={field.label}
            className="vig-step shrink-0 whitespace-nowrap rounded-md border border-black/12 px-1.5 py-0.5 text-[11px] font-medium text-ink-deep"
            style={vig(index, "1.15s")}
          >
            {field.value}
          </li>
        ))}
      </ul>

      {/* The answer, not the scoreboard: the assistant's own cards, dealt one
          at a time, and the reader watches the answer finish without their
          own store in it. */}
      <ol className="mt-2.5 grid shrink-0 grid-cols-2 gap-2">
        {ANSWER_PICKS.map((pick, index) => (
          <li
            key={pick.product}
            className="vig-step flex min-w-0 flex-col overflow-hidden rounded-md border border-black/12"
            style={vig(index + 4, "1.25s")}
          >
            <span className="flex h-[8.5rem] shrink-0 items-center justify-center overflow-hidden bg-[#f4f1ed]">
              {/* Unoptimised on purpose: two 60px-tall thumbnails inside an
                  animated panel are not worth a second network round trip
                  through the image route. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={pick.image}
                alt=""
                className="h-full w-full object-cover"
              />
            </span>
            <span className="min-w-0 truncate px-2 pt-1.5 text-[11.5px] font-medium leading-[1.25] text-ink-deep">
              {pick.product}
            </span>
            <span className="min-w-0 truncate px-2 pb-1.5 font-mono text-[11.5px] text-black/50">
              {pick.store} · {pick.price}
            </span>
          </li>
        ))}
      </ol>

      {/* The answer did not stop at two. Saying so is the difference between
          a short list and a place the merchant is missing from. */}
      <p
        className="vig-step mt-2 shrink-0 font-mono text-[11px] text-black/40"
        style={vig(6, "1.25s")}
      >
        and seven more, none of them yours
      </p>

      <div
        className="vig-step vig-stamp mt-auto flex shrink-0 items-center gap-1.5 border-t border-black/10 pt-2 text-signal-ink"
        style={vig(7, "1.35s")}
      >
        <X className="h-3.5 w-3.5 shrink-0" />
        <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.06em]">
          Your store, not named
        </span>
      </div>
    </div>
  );
}

const SIZES = ["S", "M", "L", "XL"] as const;

function StoreVignette() {
  return (
    <div
      aria-hidden="true"
      className="flex h-[23rem] flex-col overflow-hidden rounded-md bg-white ring-1 ring-black/10"
    >
      {/* A product page opens the way a product page opens: the trail, then
          the name, then the price -- full width, above the gallery, because
          the tile is showing a page and a page's title is not a caption to
          the photograph beside it. */}
      <div
        className="vig-step shrink-0 border-b border-black/10 px-3.5 pb-2 pt-2.5"
        style={vig(0, "0.2s")}
      >
        <p className="truncate font-mono text-[11.5px] uppercase tracking-[0.07em] text-black/55">
          Home / Jackets / {PRODUCT.name}
        </p>
        <div className="mt-1 flex items-baseline justify-between gap-3">
          <span className="min-w-0 truncate text-[15px] font-semibold leading-[1.2] text-ink-deep">
            {PRODUCT.name}
          </span>
          <span className="shrink-0 text-[15px] font-semibold text-ink-deep">
            {PRODUCT.price}
          </span>
        </div>
      </div>

      {/* Gallery and buy box -- the half of the page the shopper is actually
          looking at when the questions start. It is here so the panel reads
          as a page rather than as a checklist with a photograph stapled to
          it; the size the shopper asked for two tiles back is the one
          selected. */}
      <div
        className="vig-step flex shrink-0 gap-3 px-3.5 py-3"
        style={vig(1, "0.2s")}
      >
        <span className="flex w-[35%] shrink-0 items-center justify-center bg-ground/60 ring-1 ring-black/8">
          <Image
            src={PRODUCT_PHOTO.src}
            alt=""
            width={PRODUCT_PHOTO.width}
            height={PRODUCT_PHOTO.height}
            className="h-[6.5rem] w-auto object-contain"
          />
        </span>

        <div className="flex min-w-0 flex-1 flex-col">
          <span className="flex items-center gap-1.5">
            <span className="flex items-center gap-px">
              {[0, 1, 2, 3, 4].map((star) => (
                <Star
                  key={star}
                  className={`h-3 w-3 shrink-0 ${
                    star < 4
                      ? "fill-ink-deep/70 text-ink-deep/70"
                      : "fill-black/12 text-black/12"
                  }`}
                  strokeWidth={0}
                />
              ))}
            </span>
            <span className="truncate font-mono text-[11.5px] text-black/45">
              128 reviews
            </span>
          </span>

          <div className="mt-2.5 flex items-center gap-1.5">
            <span className="shrink-0 font-mono text-[11.5px] uppercase tracking-[0.07em] text-black/45">
              Size
            </span>
            {SIZES.map((size) => (
              <span
                key={size}
                className={`flex h-[1.35rem] w-[1.35rem] shrink-0 items-center justify-center text-[11.5px] font-medium ${
                  size === "M"
                    ? "bg-ink-deep text-white"
                    : "text-black/50 ring-1 ring-black/12"
                }`}
              >
                {size}
              </span>
            ))}
          </div>

          {/* The call to action is the page's, so it is the page's colour:
              ink, not signal. Signal in this section means the thing that is
              wrong, and a rust-coloured buy button would outshout the two
              crosses the panel exists to show. */}
          <span className="mt-2.5 flex items-center justify-center bg-ink-deep py-[7px] font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-white">
            Add to cart
          </span>
          <span className="mt-1.5 truncate font-mono text-[11.5px] text-black/55">
            In stock · ships tomorrow
          </span>
        </div>
      </div>

      {/* The questions run the full width of the page, under the buy box,
          where a product page keeps its details: a tick is not the
          interesting row -- the two crosses are, and they are the ones the
          last panel picks up. */}
      <div className="flex min-h-0 flex-1 flex-col border-t border-black/10 px-3.5 pb-3 pt-2">
        <span
          className="vig-step shrink-0 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-black/60"
          style={vig(1, "0.2s")}
        >
          What shoppers ask here
        </span>

        {/* The rows share the height the block has, rather than bunching
            under the label with the verdict stranded below them. */}
        <ul className="mt-1.5 flex min-h-0 flex-1 flex-col">
          {PAGE_QUESTIONS.map((row, index) => (
            <li
              key={row.question}
              className="vig-step flex flex-1 items-center gap-2 border-b border-black/8 last:border-0"
              style={vig(index + 2, "0.2s")}
            >
              {row.answered ? (
                <Check className="h-3.5 w-3.5 shrink-0 text-black/35" />
              ) : (
                <X className="h-3.5 w-3.5 shrink-0 text-signal-ink" />
              )}
              <span className="min-w-0 flex-1 truncate text-[12px] text-ink-deep">
                {row.question}
              </span>
              <span
                className={`shrink-0 font-mono text-[11px] ${
                  row.answered ? "text-black/50" : "text-signal-ink"
                }`}
              >
                {row.answer}
              </span>
            </li>
          ))}
        </ul>

        {/* The verdict is the panel, so it stamps rather than drifts in. It
            counts the crosses directly above it and nothing else. */}
        <div
          className="vig-step vig-stamp mt-2 flex shrink-0 items-center gap-1.5 border-t border-black/10 pt-2 text-signal-ink"
          style={vig(6, "0.2s")}
        >
          <X className="h-3.5 w-3.5 shrink-0" />
          <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.06em]">
            Two questions unanswered
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * The four rows as the shopper finds them once Beseam has filled the gaps:
 * `PAGE_QUESTIONS` is the page, `ADDED_CONTEXT` is what was added, and the
 * match is made here rather than by hand. Break the pairing and the last
 * panel prints "Not answered" in green, which is exactly the kind of drift
 * that should be visible instead of quietly plausible.
 */
const ANSWERED_PAGE = PAGE_QUESTIONS.map((row) => {
  const added = ADDED_CONTEXT.find((entry) => entry.question === row.question);
  return {
    question: row.question,
    answer: added ? added.answer : row.answer,
    added: Boolean(added),
  };
});

/** What the shopper asked for in panel one, carried onto the page. */
const SHOPPER_WANTS = ["waterproof", "size M", "commuting"] as const;

/** The one green in the section: the colour of the shopper deciding. */
const CHOSE = "#1a6b43";

/**
 * The same product page as the middle panel, after the fix -- same frame,
 * same four rows, same buy box. A differently drawn panel would have the
 * reader comparing two layouts; this one has them comparing the two rows
 * that flipped, which is the argument the section is making.
 */
function PersonalizationVignette() {
  return (
    <div
      aria-hidden="true"
      className="flex h-[23rem] flex-col overflow-hidden rounded-md bg-white ring-1 ring-black/10"
    >
      <div
        className="vig-step shrink-0 border-b border-black/10 px-3.5 pb-2 pt-2.5"
        style={vig(0, "0.2s")}
      >
        <p className="truncate font-mono text-[11.5px] uppercase tracking-[0.07em] text-black/55">
          Home / Jackets / {PRODUCT.name}
        </p>
        <div className="mt-1 flex items-baseline justify-between gap-3">
          <span className="min-w-0 truncate text-[15px] font-semibold leading-[1.2] text-ink-deep">
            {PRODUCT.name}
          </span>
          <span className="shrink-0 text-[15px] font-semibold text-ink-deep">
            {PRODUCT.price}
          </span>
        </div>
      </div>

      {/* The page knows who is reading it: the shopper's own words from the
          first panel, on the page they landed on. */}
      <div
        className="vig-step flex shrink-0 flex-wrap items-center gap-1.5 border-b border-black/10 bg-ground/50 px-3.5 py-1.5"
        style={vig(1, "0.2s")}
      >
        <span className="shrink-0 font-mono text-[11.5px] uppercase tracking-[0.07em] text-black/45">
          For this shopper
        </span>
        {SHOPPER_WANTS.map((want) => (
          <span
            key={want}
            className="shrink-0 rounded-sm bg-white px-1.5 py-px font-mono text-[11.5px] text-black/55 ring-1 ring-black/10"
          >
            {want}
          </span>
        ))}
      </div>

      <div
        className="vig-step flex shrink-0 gap-3 px-3.5 py-2.5"
        style={vig(2, "0.2s")}
      >
        <span className="flex w-[35%] shrink-0 items-center justify-center bg-ground/60 ring-1 ring-black/8">
          <Image
            src={PRODUCT_PHOTO.src}
            alt=""
            width={PRODUCT_PHOTO.width}
            height={PRODUCT_PHOTO.height}
            className="h-[5.25rem] w-auto object-contain"
          />
        </span>

        <div className="flex min-w-0 flex-1 flex-col">
          <span className="flex items-center gap-1.5">
            <span className="flex items-center gap-px">
              {[0, 1, 2, 3, 4].map((star) => (
                <Star
                  key={star}
                  className={`h-3 w-3 shrink-0 ${
                    star < 4
                      ? "fill-ink-deep/70 text-ink-deep/70"
                      : "fill-black/12 text-black/12"
                  }`}
                  strokeWidth={0}
                />
              ))}
            </span>
            <span className="truncate font-mono text-[11.5px] text-black/45">
              128 reviews
            </span>
          </span>

          <div className="mt-2 flex items-center gap-1.5">
            <span className="shrink-0 font-mono text-[11.5px] uppercase tracking-[0.07em] text-black/45">
              Size
            </span>
            {SIZES.map((size) => (
              <span
                key={size}
                className={`flex h-[1.35rem] w-[1.35rem] shrink-0 items-center justify-center text-[11.5px] font-medium ${
                  size === "M"
                    ? "bg-ink-deep text-white"
                    : "text-black/50 ring-1 ring-black/12"
                }`}
              >
                {size}
              </span>
            ))}
          </div>

          {/* The same button as the middle panel, in the only state this
              section spends green on: the shopper went through with it. */}
          <span
            className="vig-stamp mt-2 flex items-center justify-center gap-1.5 py-[7px] font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-white"
            style={{ backgroundColor: CHOSE }}
          >
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
            Added to cart
          </span>
        </div>
      </div>

      {/* The same four rows, in the same order, at the same size. Two of them
          now carry an answer instead of a cross -- and they say what the
          answer is, because a chip reading "breathable" would not have told
          the shopper anything they could act on. */}
      <div className="flex min-h-0 flex-1 flex-col border-t border-black/10 px-3.5 pb-3 pt-2">
        <div
          className="vig-step flex shrink-0 items-center justify-between gap-2"
          style={vig(2, "0.2s")}
        >
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-black/60">
            What shoppers ask here
          </span>
          <span
            className="flex shrink-0 items-center gap-1 font-mono text-[11.5px] font-semibold uppercase tracking-[0.07em]"
            style={{ color: CHOSE }}
          >
            <WandSparkles className="h-3 w-3 shrink-0" />
            Two added
          </span>
        </div>

        <ul className="mt-1.5 flex min-h-0 flex-1 flex-col">
          {ANSWERED_PAGE.map((row, index) => (
            <li
              key={row.question}
              className="vig-step flex flex-1 items-center gap-2 border-b border-black/8 last:border-0"
              style={vig(index + 3, "0.2s")}
            >
              <Check
                className="h-3.5 w-3.5 shrink-0"
                style={{ color: row.added ? CHOSE : "rgba(0,0,0,0.35)" }}
              />
              <span className="min-w-0 flex-1 truncate text-[12px] text-ink-deep">
                {row.question}
              </span>
              <span
                className={`shrink-0 truncate font-mono text-[11px] ${
                  row.added ? "font-semibold" : "text-black/50"
                }`}
                style={row.added ? { color: CHOSE } : undefined}
              >
                {row.answer}
              </span>
            </li>
          ))}
        </ul>

        {/* The verdict the middle panel earned, answered. It counts the same
            four rows that panel counted. */}
        <div
          className="vig-step vig-stamp mt-2 flex shrink-0 items-center gap-1.5 border-t border-black/10 pt-2"
          style={{ ...vig(7, "0.2s"), color: CHOSE }}
        >
          <CheckCircle2 className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
          <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.06em]">
            All four answered
          </span>
        </div>
      </div>
    </div>
  );
}

const VIGNETTES = [
  DiscoveryVignette,
  StoreVignette,
  PersonalizationVignette,
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
                  <h2 className="max-w-[18ch] text-balance font-display text-[clamp(2.3rem,3.8vw,3.9rem)] font-normal leading-[1.03] tracking-[-0.02em] text-ink-deep">
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
                        className="hidden items-center justify-center text-signal-ink xl:absolute xl:z-10 xl:flex xl:bg-ground"
                        // Geometry inline, not as utilities: the box is one
                        // 2rem square centred on a border, used nowhere else,
                        // and inline values cannot be missed by a stale
                        // Tailwind build the way a fresh `xl:top-1/2` can.
                        // It only resolves where the element is shown (xl).
                        style={{
                          top: "50%",
                          left: "-1rem",
                          height: "2rem",
                          width: "2rem",
                          transform: "translateY(-50%)",
                        }}
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
            <div className="mt-5 border-y border-white/10 bg-ink-deep px-5 py-6 text-white sm:px-6 sm:py-7 lg:px-8">
              {/* The loop, drawn as a loop.

                  This band used to carry the five steps as a rail of chips
                  with a return path drawn under it. The words were right and
                  the return path was already there, but a rail still reads
                  left-to-right first and closes second -- the same shape the
                  manifesto was called out for. `LoopDiagram` is the picture
                  that sentence was promising, and it is the figure already
                  serving /how-we-work and /manifesto, so the homepage is
                  reusing the drawing rather than owning a second one.

                  Cost, stated because it is real: the figure is roughly 380px
                  tall against the rail's ~100px, and it gives up the
                  full-measure footer rule under the panels. The right column
                  is never narrower than the svg's own 32rem cap at any
                  breakpoint, so no label is scaled below its 11px floor --
                  do not wrap it in anything tighter. */}
              <div className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center lg:gap-12">
                {/* This column used to restate the five steps as a sentence,
                    under an eyebrow reading "Continuous loop" -- which the
                    ring's own centre also says. Three tellings of one idea in
                    one band. It now carries only what the ring cannot draw:
                    who holds the gate, and what "measure" is measured
                    against. */}
                <div>
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-signal">
                    Nothing ships without you
                  </p>
                  <p className="mt-3 max-w-[38ch] text-[15px] leading-[1.65] text-white/72">
                    Every customer-facing change waits at step 03 until you
                    approve it.
                  </p>
                  <p className="mt-5 max-w-[40ch] border-t border-white/12 pt-4 text-[14px] leading-[1.6] text-white/56">
                    And step 05 checks the same journey it started from — AI
                    appearances, product visits, add to cart — so a change is
                    measured against the state it changed.
                  </p>
                </div>
                <LoopDiagram tone="dark" detail animate />
              </div>
            </div>
          }
        />
      </div>
    </section>
  );
}
