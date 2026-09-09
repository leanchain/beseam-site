import { Reveal } from "@/components/beseam/reveal";

/**
 * The platform told the way the product itself packages it.
 *
 * Source of truth is the admin's own capability model --
 * `frontend/src/app/(app)/admin/components/service-capability-bundles.ts`:
 * three sections (`BUNDLE_SECTIONS`), one always-included Foundation, the
 * packages a store adds, and four products that share one storefront signal.
 * The wording here is the merchant-facing version of those bundle
 * descriptions; the shape is theirs, not a marketing invention.
 *
 * Advertising is deliberately absent. Every key in that bundle is
 * `FeatureMaturity.EXPERIMENTAL` in `backend/src/modules/entitlements/registry.py`,
 * so it resolves to disabled under production surface mode -- a page that
 * sold it would be selling something a merchant cannot switch on.
 *
 * A list of names, never a plan matrix: the tracker's landing-page ruling
 * forbids rebuilding the product-suite grid here.
 */

type Package = {
  name: string;
  line: string;
  includes: string;
};

/**
 * Foundation is the anchor of the story, so it is a panel with its parts
 * named one by one rather than a card with a run of middots. The parts are
 * the admin bundle's own list: operator action queue, commerce ledger,
 * connection health, minimum catalog sync, impact measurement.
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
    line: "Who gets named when shoppers ask AI assistants, checked on a schedule.",
    includes:
      "AI visibility workspace · your own checks · scheduled monitoring · Search Console sync",
  },
  {
    name: "Commerce readiness",
    line: "Whether the catalog and the pages can answer the question that decides the sale.",
    includes:
      "Catalog workspace · store health · page inspection · product and content proposals",
  },
  {
    name: "Creative Studio",
    line: "Making the assets a change needs, with review before anything is used.",
    includes: "Media library · moderation · image and video generation",
  },
];

const TRACKER: Package[] = [
  {
    name: "Analytics",
    line: "Revenue, funnels, cohorts, journeys, and onsite-search intelligence.",
    includes: "",
  },
  {
    name: "Behavior",
    line: "Why buyers leave: sessions, replay, heatmaps, zone-level evidence.",
    includes: "",
  },
  {
    name: "Personalization",
    line: "Experiments, decisioning, and recommendation placements, measured against a holdout.",
    includes: "",
  },
  {
    name: "Reliability",
    line: "Web vitals, errors, monitors, and incidents that threaten commerce.",
    includes: "",
  },
];

function ActLabel({
  step,
  children,
}: {
  step: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="font-mono text-[11px] font-semibold tabular-nums text-signal-ink">
        {step}
      </span>
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-black/58">
        {children}
      </p>
    </div>
  );
}

function PackageCard({
  item,
  dark = false,
}: {
  item: Package;
  dark?: boolean;
}) {
  return (
    <div
      className={`flex min-h-full flex-col border-b px-0 py-6 sm:border-b-0 sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0 ${
        dark ? "border-white/14" : "border-black/12"
      }`}
    >
      <p
        className={`text-[17px] font-semibold tracking-[-0.01em] ${
          dark ? "text-white" : "text-ink-deep"
        }`}
      >
        {item.name}
      </p>
      <p
        className={`mt-2 max-w-[38ch] text-[13.5px] leading-[1.6] ${
          dark ? "text-white/70" : "text-black/62"
        }`}
      >
        {item.line}
      </p>
      {item.includes ? (
        <p
          className={`mt-4 max-w-[40ch] text-[11.5px] leading-[1.6] ${
            dark ? "text-white/48" : "text-black/48"
          }`}
        >
          {item.includes}
        </p>
      ) : null}
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

        {/* Act two: what a store adds. */}
        <Reveal delay={0.06}>
          <div className="mt-12 border-t border-black/16 pt-7">
            <ActLabel step="02">Added when the store needs it</ActLabel>
            <p className="mt-5 max-w-[46ch] text-[22px] leading-[1.25] tracking-[-0.01em] text-ink-deep">
              Three ways to work on what the core found.
            </p>
            <div className="mt-6 grid sm:grid-cols-3">
              {ADDED.map((item) => (
                <PackageCard key={item.name} item={item} />
              ))}
            </div>
          </div>
        </Reveal>

        {/* Act three: the family that shares one signal. */}
        <Reveal delay={0.08}>
          <div className="mt-12 bg-ink-deep px-6 py-9 text-white sm:px-8 sm:py-10">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[11px] font-semibold tabular-nums text-signal">
                03
              </span>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-white/58">
                One signal, four products
              </p>
            </div>
            <p className="mt-5 max-w-[34ch] text-[22px] leading-[1.25] tracking-[-0.01em] text-white">
              The storefront signal you turn on once pays for four things.
            </p>
            <p className="mt-3 max-w-[56ch] text-[14px] leading-[1.65] text-white/64">
              Analytics, behavior, personalization and reliability all read the
              same tracker. Switch on any one of them and the ingestion is
              already running for the rest.
            </p>
            <div className="mt-8 grid border-t border-white/16 pt-2 sm:grid-cols-2 lg:grid-cols-4">
              {TRACKER.map((item) => (
                <PackageCard key={item.name} item={item} dark />
              ))}
            </div>
          </div>
        </Reveal>

        {/* The line that matters more than the list. */}
        <Reveal delay={0.1}>
          <p className="mt-10 max-w-[68ch] border-l-2 border-signal-ink pl-5 text-[15px] leading-[1.7] text-black/70">
            Nothing that touches the storefront rides along with a package.
            Publishing a change, running an action, and paid generation are
            switched on one at a time, by you, on purpose.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
