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
    headline: "See whether the product evidence can carry the decision.",
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
    headline: "Keep the result next to the change that preceded it.",
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
              Four parts of the buying journey. One place to work on them.
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
                <List title="What Beseam sees" items={area.sees} />
                <List title="What it becomes" items={area.becomes} />
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.08}>
          <div className="mt-14 grid gap-8 bg-ground-2 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-14">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-signal-ink">
                The workspace
              </p>
              <h3 className="mt-4 max-w-[18ch] font-display text-[clamp(1.9rem,2.7vw,2.6rem)] font-normal leading-[1.08] tracking-[-0.02em] text-ink-deep">
                Different signals. One record of what to do next.
              </h3>
              <p className="mt-4 max-w-[38ch] text-[14.5px] leading-[1.7] text-black/60">
                This is the part that makes Beseam a platform rather than a
                collection of monitoring tools.
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

        <Reveal delay={0.1}>
          <div className="mt-10 max-w-[70ch] border-l-2 border-signal-ink pl-5 text-[15px] leading-[1.7] text-black/70">
            <p>
              Start without handing over the keys. The free scan reads public
              storefront pages only. Ongoing work starts with the store, and
              deeper sources are added only when they make a decision better.
            </p>
            <p className="mt-4">
              Want to see the snapshot first?{" "}
              <Link
                href="/scan"
                className="font-semibold text-ink-deep underline decoration-signal-ink/40 underline-offset-4 transition-colors hover:text-signal-ink hover:decoration-signal-ink"
              >
                Run the free store scan
              </Link>
              .
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
