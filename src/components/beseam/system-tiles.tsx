import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/beseam/reveal";

/**
 * What the reader has just been shown, laid out as the system it is: one
 * record of evidence, and the three things that read from it.
 *
 * The shape is borrowed from atomz.ai's "Agent OS" grid -- a wide foundation
 * tile above a row of tiles that run on it, each carrying a boxed eyebrow, a
 * one-line claim, a set of capability chips and a link into the page that
 * details it. The shape is all that is borrowed. Beseam has no product suite
 * to enumerate and the landing-page ruling in
 * `docs/internal/strategy/AI_COMMERCE_CONTROL_PLANE_TRACKER.md` explicitly
 * forbids turning the homepage into one, so the tiles name the parts of a
 * single system -- what is watched, what is proposed, what is proven, and the
 * free way in -- rather than four things to buy. Added on the user's explicit
 * instruction, over that ruling; if the ruling is re-read later, this section
 * is the thing to reconsider first.
 *
 * Every chip is a restatement of a claim the page has already made and
 * supported above. Nothing here introduces a number: sample sizes live on
 * /benchmarks and /data, and this section links out rather than quoting.
 */
const FOUNDATION = {
  eyebrow: "The foundation",
  name: "The evidence layer",
  detail:
    "Beseam keeps checking the same shopper journey, and every check it runs stays in one record.",
  capabilities: [
    "AI answer checks",
    "Product-page gaps",
    "Shopper behavior",
    "Before → after history",
  ],
  href: "/ai-visibility-monitoring",
  linkLabel: "What Beseam watches",
} as const;

const RUNS_ON = [
  {
    eyebrow: "Runs on the evidence",
    name: "Growth plan",
    detail:
      "What is worth improving next, with the finding that argues for it.",
    capabilities: [
      "Ranked by evidence",
      "Your approval first",
      "Applied for you",
    ],
    href: "/platform",
    linkLabel: "Platform in detail",
  },
  {
    eyebrow: "Runs on the evidence",
    name: "Results",
    detail: "The same journey checked again after every approved change.",
    capabilities: [
      "Before → after",
      "Measured kept apart from estimated",
      "One record per change",
    ],
    href: "/how-we-work",
    linkLabel: "How we measure",
  },
  {
    eyebrow: "Runs on the evidence",
    badge: "Free",
    name: "Store scan",
    detail: "Where you stand today, before anything is installed.",
    capabilities: ["No install", "No card", "What to fix first"],
    href: "/scan",
    linkLabel: "Run the free scan",
  },
] as const;

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <li className="bg-white px-2 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-black/56 ring-1 ring-black/12">
      {children}
    </li>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center border border-black/18 px-2 py-1 font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-black/52">
      {children}
    </span>
  );
}

function TileLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group mt-5 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-signal-ink"
    >
      {label}
      <ArrowRight
        aria-hidden="true"
        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
      />
    </Link>
  );
}

export default function SystemTiles() {
  return (
    <section id="system" className="scroll-mt-24 bg-white">
      <div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end lg:gap-16">
            <div>
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-signal-ink">
                What runs on the evidence
              </p>
              <h2 className="mt-7 max-w-[20ch] text-balance font-display text-[clamp(2.3rem,3.8vw,3.9rem)] font-normal leading-[1.03] tracking-[-0.02em] text-ink-deep">
                One record of evidence, and the work that runs on it.
              </h2>
            </div>
            <p className="max-w-[50ch] text-[16px] leading-[1.7] text-black/64">
              The plan, the proof, and the free scan are not three tools. They
              read from the same checks, which is why a result can always be
              traced back to the finding that started it.
            </p>
          </div>
        </Reveal>

        {/* The foundation carries the full measure and the row sits under it:
            the layout is the argument, in the same way the wire under #proof
            is. Break the row apart and the tiles read as a menu. */}
        <Reveal delay={0.06}>
          <div className="mt-12 border-t-2 border-ink-deep bg-ground px-5 py-6 ring-1 ring-black/12 sm:px-7 sm:py-8 lg:mt-16">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start lg:gap-16">
              <div>
                <Eyebrow>{FOUNDATION.eyebrow}</Eyebrow>
                <h3 className="mt-4 font-display text-[26px] font-normal leading-[1.15] tracking-[-0.015em] text-ink-deep">
                  {FOUNDATION.name}
                </h3>
                <p className="mt-2.5 max-w-[42ch] text-[14.5px] leading-[1.6] text-black/64">
                  {FOUNDATION.detail}
                </p>
                <TileLink href={FOUNDATION.href} label={FOUNDATION.linkLabel} />
              </div>
              <ul className="flex flex-wrap gap-1.5 lg:justify-end">
                {FOUNDATION.capabilities.map((capability) => (
                  <Chip key={capability}>{capability}</Chip>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {RUNS_ON.map((tile, index) => (
            <Reveal key={tile.name} delay={0.1 + index * 0.06}>
              <article className="flex h-full flex-col bg-ground px-5 py-6 ring-1 ring-black/12">
                <div className="flex flex-wrap items-center gap-1.5">
                  <Eyebrow>{tile.eyebrow}</Eyebrow>
                  {"badge" in tile ? (
                    <span className="inline-flex items-center border border-signal-ink/35 px-2 py-1 font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-signal-ink">
                      {tile.badge}
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-4 font-display text-[22px] font-normal leading-[1.15] tracking-[-0.015em] text-ink-deep">
                  {tile.name}
                </h3>
                <p className="mt-2.5 max-w-[34ch] text-[14.5px] leading-[1.6] text-black/64">
                  {tile.detail}
                </p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {tile.capabilities.map((capability) => (
                    <Chip key={capability}>{capability}</Chip>
                  ))}
                </ul>
                {/* Pushed to the bottom edge so three tiles of different
                    length still share one line of links. */}
                <div className="mt-auto">
                  <TileLink href={tile.href} label={tile.linkLabel} />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
