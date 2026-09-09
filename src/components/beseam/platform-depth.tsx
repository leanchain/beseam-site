import { Reveal } from "@/components/beseam/reveal";

/**
 * The second tier of the app, named rather than sold.
 *
 * Every entry here is a real destination in
 * `frontend/src/lib/primary-navigation.ts`, under the label the app uses and
 * with the app's own one-line description. Groups carry `minDepth: 'expert'`
 * there, which is exactly what the copy says: a store grows into them.
 *
 * Deliberately not a matrix. No plan columns, no checkmarks, no "included in"
 * -- the tracker's landing-page ruling forbids turning the marketing surface
 * back into a product-suite grid, and a list of names is enough to answer the
 * only question a merchant has here: is the thing I need already in there?
 */

const DEPTH = [
  {
    group: "Store",
    items: [
      [
        "Store Health",
        "Whether the store is healthy enough to sell and advertise safely.",
      ],
      [
        "Inspection",
        "Page evidence, technical issues, remediation, and post-change verification.",
      ],
      [
        "Reliability",
        "Monitoring, incidents, performance, and runtime errors that threaten commerce.",
      ],
    ],
  },
  {
    group: "Conversion",
    items: [
      [
        "Analytics",
        "Revenue, funnels, cohorts, journeys, reports, and onsite-search intelligence.",
      ],
      [
        "Behavior",
        "Why buyers leave, sessions, replay, heatmaps, and zone-level evidence.",
      ],
      [
        "Optimization",
        "Experiments, personalization, decisioning, and optimization missions.",
      ],
    ],
  },
  {
    group: "Campaigns",
    items: [
      [
        "Google & Meta",
        "Connect, validate, draft, approve, publish, and measure campaigns safely.",
      ],
      [
        "Creative Studio",
        "Create product, brand, organic, and advertising image and video assets.",
      ],
    ],
  },
] as const;

export default function PlatformDepth() {
  return (
    <section className="border-b border-rule bg-ground-2">
      <div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:items-end lg:gap-20">
            <h2 className="max-w-[16ch] font-display text-[clamp(2rem,3.2vw,2.9rem)] font-normal leading-[1.06] tracking-[-0.02em] text-ink-deep">
              The rest opens as you grow into it.
            </h2>
            <p className="max-w-[52ch] text-[15px] leading-[1.7] text-black/64">
              The five above are what every store starts with. These are the
              same system, deeper in: they appear when a store has the data and
              the reason to use them, not as an upsell screen.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-10 grid border-t border-black/16 md:grid-cols-3">
            {DEPTH.map(({ group, items }) => (
              <div
                key={group}
                className="border-b border-black/12 py-7 md:border-r md:px-7 md:last:border-r-0 md:last:pr-0 md:first:pl-0"
              >
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-signal-ink">
                  {group}
                </p>
                <ul className="mt-5 flex flex-col gap-4">
                  {items.map(([name, detail]) => (
                    <li key={name}>
                      <p className="text-[15px] font-semibold leading-[1.3] text-ink-deep">
                        {name}
                      </p>
                      <p className="mt-1 max-w-[38ch] text-[13px] leading-[1.55] text-black/60">
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
