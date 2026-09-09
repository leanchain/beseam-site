import Link from "next/link";

import { Reveal } from "@/components/beseam/reveal";

/**
 * The platform told the way the product itself packages it.
 *
 * Source of truth is the admin's own capability model --
 * `frontend/src/app/(app)/admin/components/service-capability-bundles.ts`:
 * three sections (`BUNDLE_SECTIONS`), one always-included Foundation, the
 * packages a store adds, and four products that share one storefront signal.
 * Names and parts are that file's `primaryFeatures` in merchant words; the
 * shape is theirs, not a marketing invention.
 *
 * Each added package carries the situation that calls for it, because the
 * question a visitor actually has is not "what is in it" but "is this me".
 *
 * Advertising is deliberately absent. Every key in that bundle is
 * `FeatureMaturity.EXPERIMENTAL` in `backend/src/modules/entitlements/registry.py`,
 * so it resolves to disabled under production surface mode -- a page that
 * sold it would be selling something a merchant cannot switch on.
 *
 * A story, never a plan matrix: the tracker's landing-page ruling forbids
 * rebuilding the product-suite grid here.
 */

type Package = {
  name: string;
  line: string;
  trigger?: string;
  parts: string[];
};

/**
 * Foundation is the anchor of the story, so it is a panel with its parts
 * named one by one. The parts are the admin bundle's own list: operator
 * action queue, commerce ledger, connection health, minimum catalog sync,
 * impact measurement.
 */
const FOUNDATION_PARTS: { name: string; detail: string }[] = [
  {
    name: "Growth plan",
    detail: "The queue of what to do next, ranked, with the evidence attached.",
  },
  {
    name: "Commerce ledger",
    detail: "Orders, revenue, and products kept as one record.",
  },
  {
    name: "Connection health",
    detail: "Whether every source is still reporting, and since when.",
  },
  {
    name: "Catalog sync",
    detail: "Your products, current enough to be checked against.",
  },
  {
    name: "Impact measurement",
    detail: "What an applied change did, read after the fact.",
  },
];

const ADDED: Package[] = [
  {
    name: "Visibility",
    line: "Who gets named when a shopper asks an assistant instead of searching.",
    trigger:
      "Buyers start with a model, and nobody in the building knows what it says about you.",
    parts: [
      "AI visibility workspace",
      "Checks you write yourself",
      "Scheduled crawl",
      "Search Console sync",
    ],
  },
  {
    name: "Commerce readiness",
    line: "Whether the catalog and the pages answer the question that decides the sale.",
    trigger:
      "Traffic arrives, and from there the product page has to carry it alone.",
    parts: [
      "Catalog workspace",
      "Store health",
      "Page inspection",
      "Product and content proposals, review-only",
    ],
  },
  {
    name: "Creative Studio",
    line: "The assets a change needs, made and moderated where the change lives.",
    trigger: "The fix is a missing photo or a video, not a sentence.",
    parts: ["Media library", "Moderation", "Image and video generation"],
  },
];

const TRACKER: Package[] = [
  {
    name: "Analytics",
    line: "What the store earned, and the path people took to get there.",
    parts: [
      "Revenue and funnels",
      "Cohorts and journeys",
      "Onsite-search intelligence",
      "Every source revocable on its own",
    ],
  },
  {
    name: "Behavior",
    line: "Why buyers leave the page they were meant to buy on.",
    parts: ["Session replay", "Heatmaps", "Zone-level evidence"],
  },
  {
    name: "Personalization",
    line: "Changing what a shopper sees, and proving the change earned it.",
    parts: [
      "Experiments",
      "Decisioning",
      "Recommendation placements",
      "Measured against a holdout",
    ],
  },
  {
    name: "Reliability",
    line: "The slow pages and quiet errors that cost orders without an alert.",
    parts: ["Web vitals", "Errors", "Monitors and alerts", "Incidents"],
  },
];

/** The three steps every tracker-backed product shares, said once. */
const SIGNAL_CHAIN = [
  "One tracker on the storefront",
  "Daily aggregation",
  "Four products reading it",
];

function ActLabel({
  step,
  dark = false,
  children,
}: {
  step: string;
  dark?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-baseline gap-3">
      <span
        className={`font-mono text-[11px] font-semibold tabular-nums ${
          dark ? "text-signal" : "text-signal-ink"
        }`}
      >
        {step}
      </span>
      <p
        className={`font-mono text-[11px] font-semibold uppercase tracking-[0.12em] ${
          dark ? "text-white/58" : "text-black/58"
        }`}
      >
        {children}
      </p>
    </div>
  );
}

function PartsList({
  parts,
  dark = false,
}: {
  parts: string[];
  dark?: boolean;
}) {
  return (
    <ul className="grid gap-y-1.5">
      {parts.map((part) => (
        <li
          key={part}
          className={`flex gap-2.5 text-[12.5px] leading-[1.5] ${
            dark ? "text-white/58" : "text-black/58"
          }`}
        >
          <span
            aria-hidden
            className={`mt-[0.5em] h-px w-2 shrink-0 ${
              dark ? "bg-white/32" : "bg-black/28"
            }`}
          />
          {part}
        </li>
      ))}
    </ul>
  );
}

/** Light ledger row: name, the situation that calls for it, the parts. */
function PackageRow({ item }: { item: Package }) {
  return (
    <div className="grid gap-5 border-t border-black/14 py-7 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-12">
      <div>
        <p className="text-[18px] font-semibold tracking-[-0.01em] text-ink-deep">
          {item.name}
        </p>
        <p className="mt-2 max-w-[30ch] text-[13.5px] leading-[1.6] text-black/62">
          {item.line}
        </p>
      </div>
      <div>
        <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.1em] text-signal-ink">
          Add it when
        </p>
        <p className="mt-2 max-w-[34ch] text-[14px] leading-[1.65] text-ink-deep">
          {item.trigger}
        </p>
      </div>
      <PartsList parts={item.parts} />
    </div>
  );
}

/** Dark card for the tracker family. */
function TrackerCard({ item }: { item: Package }) {
  return (
    <div className="border-t border-white/16 py-6">
      <p className="text-[17px] font-semibold tracking-[-0.01em] text-white">
        {item.name}
      </p>
      <p className="mt-2 max-w-[32ch] text-[13.5px] leading-[1.6] text-white/68">
        {item.line}
      </p>
      <div className="mt-4">
        <PartsList parts={item.parts} dark />
      </div>
    </div>
  );
}

export default function PlatformCapabilities() {
  return (
    <section className="border-b border-rule bg-white">
      <div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-end lg:gap-20">
            <h2 className="max-w-[15ch] font-display text-[clamp(2.2rem,3.6vw,3.4rem)] font-normal leading-[1.04] tracking-[-0.02em] text-ink-deep">
              It starts small and grows with the store.
            </h2>
            <p className="max-w-[52ch] text-[16px] leading-[1.7] text-black/64">
              Beseam is not a bundle of tools you pick from on day one. Every
              store starts with the same working core, adds the parts its own
              situation calls for, and grows into the ones that need a season of
              data behind them.
            </p>
          </div>
        </Reveal>

        {/* Act one: what is always there. */}
        <Reveal delay={0.04}>
          <div className="mt-12 border-t-2 border-ink-deep pt-7 lg:mt-16">
            <ActLabel step="01">Always on</ActLabel>
            <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-16">
              <div>
                <p className="max-w-[24ch] text-[22px] leading-[1.25] tracking-[-0.01em] text-ink-deep">
                  One core, on the first day, before anything is bought.
                </p>
                <p className="mt-4 max-w-[34ch] text-[14px] leading-[1.7] text-black/60">
                  It is the part that decides what to do next, so no store runs
                  without it and nobody pays extra for it.
                </p>
              </div>
              <div className="border border-black/12 bg-ground-2 px-6 py-6 sm:px-7 sm:py-7">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <p className="text-[17px] font-semibold tracking-[-0.01em] text-ink-deep">
                    Foundation
                  </p>
                  <span className="inline-flex items-center rounded-md border border-signal-ink/35 px-2 py-0.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.1em] text-signal-ink">
                    Included with every plan
                  </span>
                </div>
                <div className="mt-6 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
                  {FOUNDATION_PARTS.map((part) => (
                    <div
                      key={part.name}
                      className="border-t border-black/14 pt-3 pb-4"
                    >
                      <p className="text-[13.5px] font-semibold text-ink-deep">
                        {part.name}
                      </p>
                      <p className="mt-1.5 max-w-[30ch] text-[12.5px] leading-[1.55] text-black/58">
                        {part.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Act two: what a store adds, and the situation that asks for it. */}
        <Reveal delay={0.06}>
          <div className="mt-14 border-t border-black/16 pt-7">
            <ActLabel step="02">Added when the store needs it</ActLabel>
            <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-16">
              <p className="max-w-[24ch] text-[22px] leading-[1.25] tracking-[-0.01em] text-ink-deep">
                Three ways to work on what the core found.
              </p>
              <p className="max-w-[46ch] self-end text-[14px] leading-[1.7] text-black/60">
                Each one answers a different kind of problem, so a store carries
                the ones its own findings keep pointing at.
              </p>
            </div>
            <div className="mt-8 border-b border-black/14">
              {ADDED.map((item) => (
                <PackageRow key={item.name} item={item} />
              ))}
            </div>
          </div>
        </Reveal>

        {/* Act three: the family that shares one signal. */}
        <Reveal delay={0.08}>
          <div className="mt-14 bg-ink-deep px-6 py-10 text-white sm:px-9 sm:py-12">
            <ActLabel step="03" dark>
              One signal, four products
            </ActLabel>
            <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-16">
              <p className="max-w-[24ch] text-[22px] leading-[1.25] tracking-[-0.01em] text-white">
                One tracker. All four run on it.
              </p>
              <p className="max-w-[46ch] self-end text-[14px] leading-[1.7] text-white/64">
                These are the products that need your own traffic behind them.
                Switch on any one and the ingestion is already running for the
                rest, so the second one costs a decision, not a rollout.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-white/16 pt-3 pb-4">
              {SIGNAL_CHAIN.map((step, index) => (
                <span key={step} className="flex items-center gap-3">
                  {index > 0 ? (
                    <span aria-hidden className="text-[11px] text-white/32">
                      &rarr;
                    </span>
                  ) : null}
                  <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-white/60">
                    {step}
                  </span>
                </span>
              ))}
            </div>

            <div className="grid gap-x-12 sm:grid-cols-2">
              {TRACKER.map((item) => (
                <TrackerCard key={item.name} item={item} />
              ))}
            </div>
          </div>
        </Reveal>

        {/* The two lines that matter more than the list: what never rides
            along with a package, and where the free part ends. The commercial
            boundary lives here rather than in a band of its own -- a platform
            page that stops to price itself stops telling the story, and /scan
            is where the free read is actually taken. No price and no trial
            length is stated, because none is configured in billing. */}
        <Reveal delay={0.1}>
          <div className="mt-10 max-w-[68ch] border-l-2 border-signal-ink pl-5 text-[15px] leading-[1.7] text-black/70">
            <p>
              Nothing that touches the storefront rides along with a package.
              Publishing a change, running an action, and paid generation are
              switched on one at a time, by you, on purpose.
            </p>
            <p className="mt-4">
              Finding out starts free:{" "}
              <Link
                href="/scan"
                className="font-semibold text-ink-deep underline decoration-signal-ink/40 underline-offset-4 transition-colors hover:text-signal-ink hover:decoration-signal-ink"
              >
                the storefront read
              </Link>{" "}
              needs no account, and the answer check needs a verified work
              email. Changing the store and watching what the change did is the
              subscription.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
