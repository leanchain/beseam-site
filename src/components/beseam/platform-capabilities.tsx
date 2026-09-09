import { Reveal } from "@/components/beseam/reveal";

type CapabilityGroup = {
  area: string;
  name: string;
  promise: string;
  examples: readonly string[];
  more?: boolean;
};

/**
 * The homepage already explains the buying journey and how signals become
 * work. /platform goes one level deeper: concrete jobs a commerce team can
 * hand to Beseam. Titles stay in merchant language; the smaller examples name
 * the product surfaces underneath without turning this into an admin menu.
 */
const CAPABILITY_GROUPS: readonly CapabilityGroup[] = [
  {
    area: "Product pages",
    name: "Fix product pages at scale",
    promise:
      "Find missing product facts, weak PDP content, and catalog issues, then prepare the fix for review.",
    examples: ["PDP audits", "Catalog diagnostics", "Structured data"],
  },
  {
    area: "Search & merchandising",
    name: "Tune what shoppers find",
    promise:
      "See where store search fails and control which relevant products get surfaced, ranked, or filtered.",
    examples: ["Onsite search", "Ranking & filters", "Merchandising rules"],
  },
  {
    area: "Fit & sizing",
    name: "Reduce sizing uncertainty",
    promise:
      "Measure shoppers, recommend product-level sizes, and see where fit guidance still needs work.",
    examples: ["Foot measurement", "Fit recommendations", "Sizing analytics"],
  },
  {
    area: "Personalization",
    name: "Control recommendations",
    promise:
      "Use shopper and product context to decide which products to recommend, order, and present.",
    examples: ["Recommendations", "Affinity signals", "Decisioning"],
  },
  {
    area: "Experiments",
    name: "Test changes safely",
    promise:
      "Run controlled experiments and keep a baseline so a promising idea does not become an unmeasured rollout.",
    examples: ["A/B tests", "Holdouts", "Experiment results"],
  },
  {
    area: "Store health",
    name: "Catch store problems early",
    promise:
      "Find slow pages, frontend errors, broken flows, and stale connections before they quietly cost purchases.",
    examples: ["Web Vitals", "Errors & alerts", "Reliability checks"],
  },
  {
    area: "Creative studio",
    name: "Create product content & media",
    promise:
      "Turn an approved improvement into the copy, images, video, and store assets needed to ship it.",
    examples: ["Product content", "AI images", "AI video"],
  },
  {
    area: "Campaigns",
    name: "Build campaign work from insights",
    promise:
      "Carry what you learn about products and shoppers into campaign plans, messages, and creative variants.",
    examples: ["Campaign planning", "Creative variants", "Offer inputs"],
  },
  {
    area: "Measurement",
    name: "Measure revenue impact",
    promise:
      "Keep conversion, orders, revenue, and re-checks tied to the change that came before them.",
    examples: ["Before & after", "Revenue impact", "Commerce ledger"],
  },
  {
    area: "More",
    name: "+ more across your stack",
    promise:
      "Bring in specialist signals when the question needs them without turning every integration into another dashboard to manage.",
    examples: ["Session replay", "Attribution", "Integrations"],
    more: true,
  },
];

export default function PlatformCapabilities() {
  return (
    <section className="border-b border-rule bg-white">
      <div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-end lg:gap-20">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-signal-ink">
                Capabilities
              </p>
              <h2 className="mt-4 max-w-[17ch] font-display text-[clamp(2.2rem,3.6vw,3.4rem)] font-normal leading-[1.04] tracking-[-0.02em] text-ink-deep">
                The jobs you can hand to Beseam.
              </h2>
            </div>
            <p className="max-w-[58ch] text-[16px] leading-[1.72] text-black/62">
              Use one capability for a specific problem or combine several
              around the same product, campaign, or shopper journey. The work
              stays connected to the same store context, evidence, approvals,
              and results.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
          {CAPABILITY_GROUPS.map((group, index) => (
            <Reveal
              key={group.name}
              delay={Math.min(index * 0.025, 0.16)}
              className={group.more ? "sm:col-span-2 lg:col-span-3" : undefined}
            >
              <article
                className={`flex h-full flex-col border border-black/12 px-6 py-6 sm:px-7 sm:py-7 ${
                  group.more
                    ? "min-h-0 bg-ink-deep text-white lg:grid lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-center lg:gap-14"
                    : "min-h-[17rem] bg-ground-2"
                }`}
              >
                <div className={group.more ? "lg:max-w-[34rem]" : undefined}>
                  <div className="flex items-center justify-between gap-4">
                    <p
                      className={`font-mono text-[10.5px] font-semibold uppercase tracking-[0.11em] ${
                        group.more ? "text-signal" : "text-signal-ink"
                      }`}
                    >
                      {group.area}
                    </p>
                    <span
                      className={`font-mono text-[10.5px] tabular-nums ${
                        group.more ? "text-white/36" : "text-black/34"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3
                    className={`mt-5 max-w-[24ch] text-[19px] font-semibold leading-[1.25] tracking-[-0.015em] ${
                      group.more ? "text-white" : "text-ink-deep"
                    }`}
                  >
                    {group.name}
                  </h3>
                  <p
                    className={`mt-3 max-w-[43ch] text-[13.5px] leading-[1.65] ${
                      group.more ? "text-white/64" : "text-black/58"
                    }`}
                  >
                    {group.promise}
                  </p>
                </div>

                <ul
                  className={`mt-auto flex flex-wrap gap-2 pt-6 ${
                    group.more ? "lg:mt-0 lg:justify-end lg:pt-0" : ""
                  }`}
                >
                  {group.examples.map((example) => (
                    <li
                      key={example}
                      className={`border px-2.5 py-1 text-[11.5px] leading-[1.35] ${
                        group.more
                          ? "border-white/16 text-white/66"
                          : "border-black/12 bg-white text-black/58"
                      }`}
                    >
                      {example}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="mt-5 max-w-[72ch] text-[12.5px] leading-[1.6] text-black/48">
          Availability depends on the systems connected to the store.
          Customer-facing publishing and generated assets remain separately
          controlled.
        </p>
      </div>
    </section>
  );
}
