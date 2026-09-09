import Link from "next/link";

import { Reveal } from "@/components/beseam/reveal";

type JourneyArea = {
  step: string;
  name: string;
  headline: string;
  sees: string[];
  becomes: string[];
};

const JOURNEY_AREAS: JourneyArea[] = [
  {
    step: "01",
    name: "Discovery",
    headline: "Know where shoppers find you — and who gets chosen instead.",
    sees: [
      "Shopper questions across AI assistants and search",
      "Products and competitors named in the answer",
      "Sources and citations when the surface exposes them",
      "The exact question and answer kept together",
    ],
    becomes: [
      "Questions worth watching again",
      "Missing or conflicting product evidence to investigate",
      "A re-check after an approved change",
    ],
  },
  {
    step: "02",
    name: "Product & store",
    headline:
      "See whether your product gives shoppers what they need to choose.",
    sees: [
      "Catalog fields, variants, availability and freshness",
      "Product-page content and structured data",
      "Store health, onsite search and merchandising signals",
      "Fit, recommendation and content evidence where connected",
    ],
    becomes: [
      "Specific catalog and content corrections",
      "Product-page and technical fixes",
      "Merchandising or experience changes to review",
    ],
  },
  {
    step: "03",
    name: "Behavior",
    headline: "See where buying intent turns into hesitation.",
    sees: [
      "Search refinements and product opens",
      "Add-to-cart and checkout movement",
      "Funnels, journeys and sessions when connected",
      "Page reliability and quiet errors that interrupt purchase",
    ],
    becomes: [
      "A clearer view of where shoppers stop",
      "Evidence attached to the affected product or journey",
      "A smaller set of problems worth acting on first",
    ],
  },
  {
    step: "04",
    name: "Outcomes",
    headline: "See whether the change actually moved anything.",
    sees: [
      "Conversion, orders and revenue where connected",
      "The original AI or store signal checked again",
      "Before-and-after windows attached to the same work item",
      "What moved, what stayed flat and what remains uncertain",
    ],
    becomes: [
      "A measured result instead of a completed-task badge",
      "Evidence for what to keep, revisit or investigate next",
      "A better starting point for the next decision",
    ],
  },
];

type CapabilityGroup = {
  name: string;
  promise: string;
  capabilities: readonly string[];
};

/**
 * Marketing view of the real capability surface. This deliberately does not
 * mirror the entitlement bundles one-for-one: /admin is organized around how
 * access is granted; this page is organized around the jobs a merchant can get
 * done. Advertising stays out while its admin bundle is explicitly marked
 * experimental/disabled on the production surface.
 */
const CAPABILITY_GROUPS: readonly CapabilityGroup[] = [
  {
    name: "Get discovered",
    promise: "See how products appear before the shopper reaches your store.",
    capabilities: [
      "AI shopping visibility",
      "Recurring shopper-question checks",
      "Competitors named instead",
      "Search Console signals",
      "On-demand and scheduled re-checks",
    ],
  },
  {
    name: "Make products easier to choose",
    promise:
      "Strengthen the product evidence that carries the buying decision.",
    capabilities: [
      "Catalog workspace and product diagnostics",
      "Store health and deep scans",
      "PDP and page-level inspections",
      "Structured product evidence",
      "Product and content proposals",
      "Verification after a fix",
    ],
  },
  {
    name: "Fit & sizing",
    promise: "Help shoppers choose the right size with less guesswork.",
    capabilities: [
      "Fit recommendations",
      "Guided foot measurement",
      "Fit analytics",
      "Measurement imports",
      "Product and size overrides",
      "Configurable sizing widget",
    ],
  },
  {
    name: "Understand shoppers",
    promise: "See what people do between arriving and buying.",
    capabilities: [
      "Revenue, funnels and cohorts",
      "Journeys and attribution",
      "Onsite-search behavior",
      "Session replay",
      "Click and scroll heatmaps",
      "Tracker, ShopifyQL, GA4, Clarity and PostHog inputs",
    ],
  },
  {
    name: "Personalize & test",
    promise:
      "Change the experience deliberately and measure it against a baseline.",
    capabilities: [
      "Product recommendations",
      "Personalization and decisioning",
      "Experiments and A/B tests",
      "Merchandising rules",
      "Affinity-based recommendations",
      "Holdout-based measurement",
    ],
  },
  {
    name: "Keep the store healthy",
    promise: "Catch technical problems before they quietly cost purchases.",
    capabilities: [
      "Web Vitals",
      "Frontend error telemetry",
      "Monitors and alerts",
      "Incidents",
      "Scheduled reliability checks",
      "Connection health",
    ],
  },
  {
    name: "Create what the change needs",
    promise: "Prepare the content and assets required to ship the improvement.",
    capabilities: [
      "Product content",
      "Collection and blog drafts",
      "Media library and asset management",
      "Moderation",
      "AI image generation",
      "AI video generation",
    ],
  },
  {
    name: "Measure what worked",
    promise: "Keep the outcome attached to the work that preceded it.",
    capabilities: [
      "Conversion, orders and revenue",
      "Commerce ledger",
      "Before-and-after measurement",
      "AI and storefront re-checks",
      "Impact measurement",
      "Flat or uncertain results kept visible",
    ],
  },
];

const WORKSPACE = [
  {
    name: "One growth plan",
    detail:
      "Findings from different signals land in one ranked queue instead of separate tool inboxes.",
  },
  {
    name: "Evidence stays attached",
    detail:
      "The question, observation, affected product or journey, and supporting facts travel with the work.",
  },
  {
    name: "Approval before exposure",
    detail:
      "Customer-facing changes wait for your yes. What Beseam can apply directly depends on the connected system.",
  },
  {
    name: "Connection health",
    detail:
      "You can see which sources are reporting, which are stale, and which evidence a decision actually used.",
  },
  {
    name: "Impact in the same record",
    detail:
      "The re-check or before-and-after result stays with the change instead of becoming a separate report.",
  },
] as const;

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.1em] text-signal-ink">
        {title}
      </p>
      <ul className="mt-3 grid gap-y-2">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-2.5 text-[13.5px] leading-[1.55] text-black/62"
          >
            <span
              aria-hidden
              className="mt-[0.65em] h-px w-2 shrink-0 bg-black/28"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
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
              Follow the buying journey without splitting it across separate
              tools.
            </h2>
            <p className="max-w-[54ch] text-[16px] leading-[1.7] text-black/64">
              You do not need every data source on day one. Beseam starts with
              the storefront and store connection, then adds deeper discovery,
              behavior, analytics, or revenue signals when they help answer a
              real question.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 border-t-2 border-ink-deep lg:mt-16">
          {JOURNEY_AREAS.map((area, index) => (
            <Reveal key={area.name} delay={0.03 * index}>
              <article className="grid gap-7 border-b border-black/14 py-9 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.11fr)_minmax(0,1.11fr)] lg:gap-14 lg:py-10">
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[11px] font-semibold tabular-nums text-signal-ink">
                      {area.step}
                    </span>
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-black/52">
                      {area.name}
                    </p>
                  </div>
                  <h3 className="mt-4 max-w-[25ch] text-balance text-[21px] font-semibold leading-[1.28] tracking-[-0.015em] text-ink-deep">
                    {area.headline}
                  </h3>
                </div>
                <List title="What Beseam checks" items={area.sees} />
                <List title="What Beseam does with it" items={area.becomes} />
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.08}>
          <div className="mt-16 border-t border-black/14 pt-14 lg:mt-20 lg:pt-16">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-end lg:gap-20">
              <div>
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-signal-ink">
                  Capabilities
                </p>
                <h3 className="mt-4 max-w-[16ch] font-display text-[clamp(2rem,3.1vw,3rem)] font-normal leading-[1.06] tracking-[-0.02em] text-ink-deep">
                  More of the buying journey, without more disconnected tools.
                </h3>
              </div>
              <p className="max-w-[54ch] text-[15.5px] leading-[1.72] text-black/62">
                The four stages above are the organizing story. Underneath them,
                Beseam has dedicated capabilities for discovery, product
                readiness, fit, analytics, behavior, personalization,
                reliability, creative work, and measurement. Turn on only what
                the store actually needs.
              </p>
            </div>

            <div className="mt-10 grid gap-px border border-black/12 bg-black/12 sm:grid-cols-2 lg:grid-cols-4">
              {CAPABILITY_GROUPS.map((group) => (
                <article
                  key={group.name}
                  className="flex min-h-full flex-col bg-white px-5 py-6 sm:px-6 sm:py-7"
                >
                  <h4 className="text-[16px] font-semibold leading-[1.3] tracking-[-0.01em] text-ink-deep">
                    {group.name}
                  </h4>
                  <p className="mt-2 min-h-[3.2rem] text-[12.75px] leading-[1.6] text-black/56">
                    {group.promise}
                  </p>
                  <ul className="mt-5 border-t border-black/12 pt-3">
                    {group.capabilities.map((capability) => (
                      <li
                        key={capability}
                        className="flex gap-2 py-1.5 text-[12.5px] leading-[1.5] text-black/64"
                      >
                        <span
                          aria-hidden
                          className="mt-[0.65em] h-px w-2 shrink-0 bg-signal-ink/55"
                        />
                        <span>{capability}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <p className="mt-5 max-w-[72ch] text-[12.5px] leading-[1.6] text-black/48">
              Availability depends on the connected systems and capabilities
              enabled for the store. Customer-facing publishing and generated
              assets remain separately controlled.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-14 grid gap-8 bg-ground-2 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-14">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-signal-ink">
                The workspace
              </p>
              <h3 className="mt-4 max-w-[18ch] font-display text-[clamp(1.9rem,2.7vw,2.6rem)] font-normal leading-[1.08] tracking-[-0.02em] text-ink-deep">
                Different signals. One record of what to do next.
              </h3>
              <p className="mt-4 max-w-[38ch] text-[14.5px] leading-[1.7] text-black/60">
                The same work item can carry evidence from discovery, the store,
                shopper behavior, and outcomes without losing the thread.
              </p>
            </div>
            <div className="grid gap-px border border-black/12 bg-black/12 sm:grid-cols-2">
              {WORKSPACE.map((item) => (
                <div
                  key={item.name}
                  className="bg-white px-5 py-5 sm:px-6 sm:py-6"
                >
                  <p className="text-[14px] font-semibold text-ink-deep">
                    {item.name}
                  </p>
                  <p className="mt-2 text-[12.75px] leading-[1.6] text-black/58">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-10 max-w-[70ch] border-l-2 border-signal-ink pl-5 text-[15px] leading-[1.7] text-black/70">
            <p>
              Start with what is public. The free scan reads storefront pages
              only. Connect the store for ongoing work, then add deeper sources
              only when they help answer a real question.
            </p>
            <p className="mt-4">
              Want to see the snapshot first?{" "}
              <Link
                href="/scan"
                className="font-semibold text-ink-deep underline decoration-signal-ink/40 underline-offset-4 transition-colors hover:text-signal-ink hover:decoration-signal-ink"
              >
                Scan my store
              </Link>
              .
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
