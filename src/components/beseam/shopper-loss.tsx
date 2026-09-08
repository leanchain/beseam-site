import type { ReactNode } from "react";

import { X } from "lucide-react";

import { ChannelIcon } from "@/components/beseam/channel-icon";
import ProductArt, {
  type ProductArtKind,
} from "@/components/beseam/product-art";
import { Reveal } from "@/components/beseam/reveal";

/**
 * The first substantial section on the page, and the one that has to do the
 * comprehension work: a merchant should recognise their own store in one of
 * these three situations before they read a full sentence.
 *
 * One category per situation — electronics, apparel, supplements — because
 * those are the shelves most visitors sell on, and because three different
 * categories say "this is about stores like yours" faster than three variations
 * of the same shelf would.
 *
 * Each row pairs a specimen that looks like the surface a shopper actually sees
 * — an assistant answer, a collection page, a cart — with a three-line ledger
 * that says what Beseam finds, what gets changed, and what the change is for.
 *
 * Everything inside a specimen is labelled "Example" and carries no store name,
 * count, or percentage. The brand names in the assistant answer are invented.
 * A fabricated figure here would read as a case study, and manufactured
 * evidence is the one thing this product must never show. Replace with a real
 * scan when one is cleared for publication.
 */

function SpecimenFrame({
  label,
  children,
}: {
  label: ReactNode;
  children: ReactNode;
}) {
  return (
    <figure className="border border-black/16 bg-white shadow-[0_18px_44px_-32px_rgba(17,19,24,0.5)]">
      <figcaption className="flex items-center justify-between gap-3 border-b border-black/12 bg-ground px-4 py-2.5 sm:px-5">
        <span className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-black/58">
          {label}
        </span>
        <span className="shrink-0 bg-black/[0.06] px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-black/58">
          Example
        </span>
      </figcaption>
      {children}
    </figure>
  );
}

function SpecimenLabel({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-black/58">
      {children}
    </p>
  );
}

function SpecimenVerdict({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-3 border-t border-black/12 bg-signal-ink/[0.07] px-4 py-4 sm:px-6">
      <X
        aria-hidden="true"
        className="mt-0.5 h-4 w-4 shrink-0 text-signal-ink"
      />
      <p className="text-[14px] font-semibold leading-[1.5] text-ink-deep">
        {children}
      </p>
    </div>
  );
}

/* 01 — electronics. The shopper asks, and the answer is somebody else. */

const ANSWER_RESULTS = [
  {
    name: "Nordwave",
    note: "Its pages give battery life with noise cancelling switched on.",
  },
  {
    name: "Kestrel Audio",
    note: "Says on every page which phones it pairs with.",
  },
  {
    name: "Lumen Go",
    note: "Answers the sweat-and-running question in the description.",
  },
] as const;

function DiscoverySpecimen() {
  return (
    <SpecimenFrame
      label={
        <>
          <ChannelIcon brand="openai" className="h-3.5 w-3.5" />
          Shopping assistant
        </>
      }
    >
      <div className="px-4 py-5 sm:px-6">
        <SpecimenLabel>A shopper asked</SpecimenLabel>
        <p className="mt-2.5 font-display text-[clamp(1.15rem,1.7vw,1.45rem)] leading-[1.32] text-ink-deep">
          &ldquo;Which wireless earbuds are best for running?&rdquo;
        </p>
      </div>

      <div className="border-t border-black/12 px-4 py-5 sm:px-6">
        <SpecimenLabel>The answer named</SpecimenLabel>
        <ol className="mt-3.5">
          {ANSWER_RESULTS.map((result, index) => (
            <li
              key={result.name}
              className="flex items-start gap-3.5 border-t border-black/10 py-3 first:border-t-0 first:pt-0 last:pb-0"
            >
              <span
                aria-hidden="true"
                className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center bg-ink-deep font-mono text-[11px] font-semibold tabular-nums text-white"
              >
                {index + 1}
              </span>
              <span>
                <span className="block text-[15px] font-semibold text-ink-deep">
                  {result.name}
                </span>
                <span className="mt-0.5 block text-[13px] leading-[1.55] text-black/56">
                  {result.note}
                </span>
              </span>
            </li>
          ))}
        </ol>
      </div>

      <SpecimenVerdict>Your store is not in the answer.</SpecimenVerdict>
    </SpecimenFrame>
  );
}

/* 02 — apparel. The products are right there, and nothing says which one. */

const COLLECTION: readonly {
  kind: ProductArtKind;
  name: string;
  price: string;
}[] = [
  { kind: "tee", name: "Everyday Tee", price: "€39" },
  { kind: "hoodie", name: "Heavy Hoodie", price: "€89" },
  { kind: "shell", name: "Rain Shell", price: "€149" },
];

const UNANSWERED = [
  "Does it run big or small?",
  "What is it actually made of?",
  "Which one is warm enough?",
] as const;

function ChoiceSpecimen() {
  return (
    <SpecimenFrame label="Collection page">
      <div className="grid grid-cols-3">
        {COLLECTION.map((product) => (
          <div
            key={product.name}
            className="border-l border-black/10 px-3 pb-4 pt-3 first:border-l-0 sm:px-4 sm:pt-4"
          >
            <div className="flex aspect-square items-center justify-center bg-[#f4f1ed]">
              <ProductArt kind={product.kind} className="h-[86%] w-[86%]" />
            </div>
            <p className="mt-3 text-[13px] font-semibold leading-tight text-ink-deep">
              {product.name}
            </p>
            <p className="mt-1 font-mono text-[12px] tabular-nums text-black/56">
              {product.price}
            </p>
          </div>
        ))}
      </div>

      <div className="border-t border-black/12 px-4 py-5 sm:px-6">
        <SpecimenLabel>What no page answers</SpecimenLabel>
        <ul className="mt-3.5 flex flex-col gap-2.5">
          {UNANSWERED.map((question) => (
            <li
              key={question}
              className="flex items-center gap-2.5 text-[14px] leading-[1.5] text-ink-deep"
            >
              <X
                aria-hidden="true"
                className="h-3.5 w-3.5 shrink-0 text-signal-ink"
              />
              {question}
            </li>
          ))}
        </ul>
      </div>

      <SpecimenVerdict>
        Three products, one photo each, and no reason to choose.
      </SpecimenVerdict>
    </SpecimenFrame>
  );
}

/* 03 — supplements. Decided, and lost in the last three clicks. */

const CART_LINES = [
  { label: "Subtotal", value: "€64.00", muted: false },
  { label: "Delivery", value: "Calculated at the next step", muted: true },
  { label: "Total", value: "—", muted: true },
] as const;

const JOURNEY = [
  "Product page",
  "Added to cart",
  "Cart",
  "Delivery details",
  "Payment",
  "Order placed",
] as const;

const STOP_INDEX = 3;

function CheckoutSpecimen() {
  return (
    <SpecimenFrame label="Cart and checkout">
      <div className="grid sm:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div className="px-4 py-5 sm:px-6">
          <SpecimenLabel>Cart</SpecimenLabel>
          <div className="mt-3.5 flex items-center gap-3 border-b border-black/12 pb-3.5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#f4f1ed]">
              <ProductArt kind="protein" className="h-10 w-10" />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-ink-deep">
                Whey Protein &middot; Vanilla
              </p>
              <p className="mt-0.5 text-[12px] text-black/58">
                900 g &middot; 1 item
              </p>
            </div>
          </div>
          <dl>
            {CART_LINES.map((line) => (
              <div
                key={line.label}
                className="flex items-baseline justify-between gap-4 border-b border-black/10 py-2.5 last:border-b-0"
              >
                <dt className="text-[13px] text-black/58">{line.label}</dt>
                <dd
                  className={`text-right font-mono text-[12px] tabular-nums ${
                    line.muted ? "text-signal-ink" : "text-ink-deep"
                  }`}
                >
                  {line.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="border-t border-black/12 px-4 py-5 sm:border-l sm:border-t-0 sm:px-6">
          <SpecimenLabel>This session</SpecimenLabel>
          <ol className="mt-3.5">
            {JOURNEY.map((step, index) => {
              const reached = index <= STOP_INDEX;
              const stop = index === STOP_INDEX;
              return (
                <li
                  key={step}
                  className="relative flex items-center gap-3 pb-3.5 last:pb-0"
                >
                  {index < JOURNEY.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className={`absolute left-[4px] top-3 h-full w-px ${
                        index < STOP_INDEX ? "bg-signal-ink" : "bg-black/14"
                      }`}
                    />
                  ) : null}
                  <span
                    aria-hidden="true"
                    className={`relative h-2.5 w-2.5 shrink-0 rounded-full ${
                      stop
                        ? "bg-signal-ink ring-4 ring-signal-ink/20"
                        : reached
                          ? "bg-signal-ink"
                          : "border border-black/25 bg-white"
                    }`}
                  />
                  <span
                    className={`text-[13px] leading-tight ${
                      stop
                        ? "font-semibold text-ink-deep"
                        : reached
                          ? "text-ink-deep"
                          : "text-black/38"
                    }`}
                  >
                    {step}
                  </span>
                  {stop ? (
                    <span className="ml-auto shrink-0 bg-signal-ink px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.08em] text-white">
                      Stops here
                    </span>
                  ) : null}
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      <SpecimenVerdict>
        The delivery cost only appears after they have typed in an address.
      </SpecimenVerdict>
    </SpecimenFrame>
  );
}

type Situation = {
  stage: string;
  category: string;
  heading: string;
  lead: string;
  rows: readonly (readonly [string, string])[];
  Specimen: () => ReactNode;
};

const SITUATIONS: readonly Situation[] = [
  {
    stage: "Finding it",
    category: "Electronics",
    heading: "You can’t be chosen if you’re never considered.",
    lead: "A shopper asks an assistant, or types into a search box, and gets three other brands. Nothing else about your store gets a chance.",
    rows: [
      [
        "Beseam finds",
        "The buying questions your products belong in, and the ones that name somebody else instead.",
      ],
      [
        "Beseam prepares",
        "The product-page words, detail, and structure that can help you turn up for those questions, ready for your approval.",
      ],
      [
        "You are aiming for",
        "Being one of the options a shopper actually considers.",
      ],
    ],
    Specimen: DiscoverySpecimen,
  },
  {
    stage: "Choosing it",
    category: "Clothing",
    heading: "They see it and pick something else.",
    lead: "The product is right there. Nothing on the page answers the question standing between the shopper and the button: will this fit, will this work for me, what is it actually for.",
    rows: [
      [
        "Beseam finds",
        "The questions your product pages leave unanswered, product by product.",
      ],
      [
        "Beseam prepares",
        "The title, description, sizing and fit, images, and page changes most likely to make the choice easier.",
      ],
      [
        "You are aiming for",
        "More of the visits you already pay for turning into carts.",
      ],
    ],
    Specimen: ChoiceSpecimen,
  },
  {
    stage: "Buying it",
    category: "Supplements",
    heading: "They choose you. Then the purchase breaks.",
    lead: "Cart, delivery, payment. A cost turns up late, a field breaks, an option is missing, and a shopper who had already decided walks away.",
    rows: [
      [
        "Beseam finds",
        "Where sessions stop, and what the sessions that stopped had in common.",
      ],
      [
        "Beseam prepares",
        "The fix for the step that is losing them, ready for your approval before it changes the store.",
      ],
      [
        "You are aiming for",
        "Fewer decided shoppers lost in the last three clicks.",
      ],
    ],
    Specimen: CheckoutSpecimen,
  },
];

export default function ShopperLoss() {
  return (
    <section
      id="where-you-lose"
      className="scroll-mt-24 border-t border-black/14 bg-white"
    >
      <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-16">
            <div>
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-signal-ink">
                Where choices are lost
              </p>
              <h2 className="mt-7 max-w-[22ch] text-balance font-display text-[clamp(2.3rem,3.8vw,3.9rem)] font-normal leading-[1.03] tracking-[-0.02em] text-ink-deep">
                Three places a sale quietly disappears.
              </h2>
            </div>
            <p className="max-w-[50ch] text-[17px] leading-[1.7] text-black/64">
              Many lost sales show up in one of these three moments. Beseam
              helps you see where shoppers are dropping out and what deserves
              attention first, without pretending one signal proves the cause.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 sm:mt-16 lg:mt-20">
          {SITUATIONS.map(({ Specimen, ...situation }, index) => {
            const flipped = index % 2 === 1;
            return (
              <Reveal key={situation.stage} delay={0.04}>
                <article
                  className={`grid gap-9 border-black/14 lg:grid-cols-2 lg:items-center lg:gap-14 xl:gap-20 ${
                    index > 0
                      ? "mt-14 border-t pt-14 sm:mt-16 sm:pt-16 lg:mt-20 lg:pt-20"
                      : ""
                  }`}
                >
                  <div className={flipped ? "lg:order-2" : undefined}>
                    <Specimen />
                  </div>

                  <div className={flipped ? "lg:order-1" : undefined}>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="font-mono text-[12px] font-semibold tabular-nums text-signal-ink">
                        0{index + 1}
                      </span>
                      <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.12em] text-black/58">
                        {situation.stage}
                      </p>
                      <span
                        aria-hidden="true"
                        className="h-1 w-1 rounded-full bg-black/25"
                      />
                      <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-black/56">
                        {situation.category}
                      </p>
                    </div>
                    <h3 className="mt-4 max-w-[18ch] text-balance font-display text-[clamp(1.75rem,2.6vw,2.55rem)] font-normal leading-[1.08] tracking-[-0.02em] text-ink-deep">
                      {situation.heading}
                    </h3>
                    <p className="mt-5 max-w-[54ch] text-[16px] leading-[1.7] text-black/64">
                      {situation.lead}
                    </p>

                    <dl className="mt-8 border-t-2 border-ink-deep">
                      {situation.rows.map(([term, detail]) => (
                        <div
                          key={term}
                          className="grid gap-1 border-b border-black/14 py-4 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-6"
                        >
                          <dt className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-signal-ink">
                            {term}
                          </dt>
                          <dd className="max-w-[52ch] text-[15px] leading-[1.6] text-black/72">
                            {detail}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
