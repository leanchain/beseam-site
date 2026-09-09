import { Reveal } from "@/components/beseam/reveal";

/**
 * What the platform can do, in full, without a single fabricated screenshot.
 *
 * Every line is a real capability behind a real entitlement key in
 * `frontend/src/lib/entitlements.ts`, described in the app's own words from
 * `frontend/src/lib/primary-navigation.ts`. `dayOne` marks the ones that
 * survive at `guided` depth -- what a store gets on the first login. The rest
 * carry `minDepth: 'expert'` there, which is what "opens later" means: it is
 * a depth and entitlement fact, not a price list.
 *
 * Deliberately a list, not a matrix: no plan columns, no checkmarks, no
 * comparison ticks. The tracker's landing-page ruling forbids rebuilding the
 * product-suite grid, and a merchant reading this has one question -- is the
 * thing I need in here -- which names answer faster than a table.
 */

type Capability = {
  name: string;
  detail: string;
  dayOne?: boolean;
};

const AREAS: { area: string; scope: string; items: Capability[] }[] = [
  {
    area: "Discovery",
    scope: "Off-site",
    items: [
      {
        name: "AI shopping visibility",
        detail:
          "Shopper questions asked across assistants, who gets named, and how often you do.",
        dayOne: true,
      },
      {
        name: "Competitors and citations",
        detail:
          "Which brands appear in your place, and which sources the answers cite.",
        dayOne: true,
      },
      {
        name: "Agent readiness",
        detail:
          "Whether shopping agents can read the storefront well enough to use it.",
        dayOne: true,
      },
    ],
  },
  {
    area: "Products",
    scope: "Catalog",
    items: [
      {
        name: "Catalog truth",
        detail:
          "Product issues, channel readiness, fixes, publication, and verification.",
        dayOne: true,
      },
      {
        name: "Brand",
        detail:
          "Approved brand identity, trust evidence, and the source material used across commerce.",
      },
      {
        name: "Merchandising",
        detail:
          "Recommendation placements, merchandising controls, catalog coverage, and measured incrementality.",
      },
    ],
  },
  {
    area: "Store",
    scope: "Storefront",
    items: [
      {
        name: "Store health",
        detail:
          "Whether the store is healthy enough to sell and advertise safely.",
      },
      {
        name: "Inspection",
        detail:
          "Page evidence, technical issues, remediation, and post-change verification.",
      },
      {
        name: "Reliability",
        detail:
          "Monitoring, incidents, performance, and runtime errors that threaten commerce.",
      },
    ],
  },
  {
    area: "Conversion",
    scope: "Journey",
    items: [
      {
        name: "Analytics",
        detail:
          "Revenue, funnels, cohorts, journeys, reports, and onsite-search intelligence.",
      },
      {
        name: "Behavior",
        detail:
          "Why buyers leave, sessions, replay, heatmaps, and zone-level evidence.",
      },
      {
        name: "Optimization",
        detail:
          "Experiments, personalization, decisioning, and optimization missions.",
      },
    ],
  },
  {
    area: "Campaigns",
    scope: "Paid and creative",
    items: [
      {
        name: "Google & Meta",
        detail:
          "Connect, validate, draft, approve, publish, and measure campaigns safely.",
      },
      {
        name: "Creative Studio",
        detail:
          "Create product, brand, organic, and advertising image and video assets.",
      },
    ],
  },
  {
    area: "Plan and proof",
    scope: "Every store",
    items: [
      {
        name: "Store state",
        detail:
          "Current store state, largest commercial issue, and the next decision to make.",
        dayOne: true,
      },
      {
        name: "Growth plan",
        detail:
          "One ranked plan for opportunities, approvals, execution, and proof.",
        dayOne: true,
      },
      {
        name: "Results",
        detail:
          "Verified outcomes with booked, observed, attributed, and modeled money kept separate.",
        dayOne: true,
      },
    ],
  },
];

export default function PlatformCapabilities() {
  return (
    <section className="border-b border-rule bg-white">
      <div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-end lg:gap-20">
            <h2 className="max-w-[15ch] font-display text-[clamp(2.2rem,3.6vw,3.4rem)] font-normal leading-[1.04] tracking-[-0.02em] text-ink-deep">
              Everything the platform can do.
            </h2>
            <p className="max-w-[52ch] text-[16px] leading-[1.7] text-black/64">
              One system, six areas of work. The ones marked{" "}
              <span className="font-semibold text-ink-deep">day one</span> are
              live as soon as a store is connected; the rest open as a store has
              the data and the reason to use them.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-12 grid border-t-2 border-ink-deep sm:grid-cols-2 lg:grid-cols-3">
            {AREAS.map(({ area, scope, items }) => (
              <div
                key={area}
                className="border-b border-black/12 px-0 py-7 sm:border-r sm:px-6 sm:first:pl-0 lg:px-8 lg:[&:nth-child(3n)]:border-r-0 lg:[&:nth-child(3n+1)]:pl-0"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-signal-ink">
                    {area}
                  </p>
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-black/40">
                    {scope}
                  </p>
                </div>

                <ul className="mt-5 flex flex-col gap-5">
                  {items.map(({ name, detail, dayOne }) => (
                    <li key={name}>
                      <p className="flex flex-wrap items-baseline gap-x-2 text-[15px] font-semibold leading-[1.3] text-ink-deep">
                        {name}
                        {dayOne ? (
                          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-[#1a6b43]">
                            Day one
                          </span>
                        ) : null}
                      </p>
                      <p className="mt-1 max-w-[42ch] text-[13px] leading-[1.55] text-black/60">
                        {detail}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
