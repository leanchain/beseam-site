import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  FileText,
  Radar,
  RefreshCw,
  Store,
  WandSparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Reveal } from "@/components/beseam/reveal";
import TrackedLink from "@/components/beseam/tracked-link";
import { APP_REGISTER_URL } from "@/lib/app-urls";

/**
 * Two offers, one grid.
 *
 * An earlier version drew the free scan as an arrow chain and Beseam Growth as
 * an icon rail on a rule, gave only the second card a tint and a horizontal
 * padding the first did not have, and let the two calls to action land at
 * whatever height their copy happened to reach. A merchant said the layout
 * looked random, and she was reading it correctly.
 *
 * Both cards now share `StepRail`, mirror the same padding across the gutter,
 * and pin the button with `mt-auto` so the two calls to action sit on one line
 * whatever the copy above them does.
 *
 * Both calls to action enter the product: the free scan at `/scan`, and the
 * 30-day start at `APP_REGISTER_URL` -- the same destination the mobile sticky
 * CTA and both platform-page buttons use. The second button used to open the
 * Cal.com booking modal under the label "Start my free 30 days", so the click
 * did not do what it said. Booking a review stays where it belongs, on the
 * scan result (`answer-check.tsx`).
 */
type Step = { label: string; Icon: LucideIcon };

const SCAN_STEPS: readonly Step[] = [
  { label: "AI discovery", Icon: Radar },
  { label: "Product pages", Icon: FileText },
  { label: "Store issues", Icon: AlertTriangle },
];

const GROWTH_STEPS: readonly Step[] = [
  { label: "Find", Icon: Radar },
  { label: "Prepare", Icon: WandSparkles },
  { label: "Approve", Icon: CheckCircle2 },
  { label: "Apply", Icon: Store },
  { label: "Measure", Icon: RefreshCw },
];

function StepRail({ steps }: { steps: readonly Step[] }) {
  return (
    <ol
      className="relative mt-7 grid gap-3 before:absolute before:left-4 before:right-4 before:top-3.5 before:h-px before:bg-black/12"
      style={{
        gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))`,
      }}
    >
      {steps.map(({ label, Icon }) => (
        <li key={label} className="relative z-10 min-w-0">
          <span className="flex h-7 w-7 items-center justify-center bg-[#faf1eb] text-signal-ink ring-1 ring-black/12">
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
          <span className="mt-2 block text-[11.5px] font-semibold leading-[1.35] text-black/62">
            {label}
          </span>
        </li>
      ))}
    </ol>
  );
}

function CardHead({
  Icon,
  eyebrow,
  title,
  tone,
}: {
  Icon: LucideIcon;
  eyebrow: string;
  title: string;
  tone: "plain" | "accent";
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center ${
          tone === "accent"
            ? "bg-ink-deep text-signal"
            : "bg-white text-signal-ink ring-1 ring-black/12"
        }`}
      >
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p
          className={`font-mono text-[10px] font-semibold uppercase tracking-[0.12em] ${
            tone === "accent" ? "text-signal-ink" : "text-black/48"
          }`}
        >
          {eyebrow}
        </p>
        <p className="mt-0.5 text-[14px] font-semibold text-ink-deep">
          {title}
        </p>
      </div>
    </div>
  );
}

export default function FirstMonthPromise({
  showManifestoLink = true,
}: {
  showManifestoLink?: boolean;
}) {
  void showManifestoLink;

  return (
    <section id="promise" className="scroll-mt-24 bg-[#faf1eb]">
      <div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-end lg:gap-16">
            <div>
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-signal-ink">
                Ways to start
              </p>
              {/* Sized and spaced like every other section headline on the
                  page (`measure-impact.tsx`, `evidence-to-work.tsx`): one
                  sentence, the same clamp and `mt-5`, and `text-balance`
                  instead of the `whitespace-nowrap` span that forced an
                  unbreakable line into the narrower of the two columns.

                  The eyebrow names the beat rather than the offer. "30 days
                  free" sat here while spanning both cards, and card 01 is a
                  scan with no trial attached; the 30 days now appear once, in
                  the lede, next to the card they belong to. */}
              <h2 className="mt-5 max-w-[18ch] text-balance font-display text-[clamp(2.2rem,3.3vw,3.4rem)] font-normal leading-[1.04] tracking-[-0.02em] text-ink-deep">
                See what Beseam finds before you pay.
              </h2>
            </div>
            <p className="max-w-[44ch] text-[15px] leading-[1.7] text-black/62">
              Run a free scan, or use Beseam free for 30 days: see what it
              finds, approve the changes that need your judgment, watch them get
              applied, and see what moved.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="mt-12 grid border-y-2 border-ink-deep lg:mt-16 lg:grid-cols-2">
            <article className="flex flex-col py-8 lg:py-10 lg:pr-12">
              <CardHead
                Icon={Radar}
                eyebrow="01 · Free scan"
                title="See where shoppers may lose you"
                tone="plain"
              />
              <StepRail steps={SCAN_STEPS} />
              <div className="mt-auto pt-7">
                <TrackedLink
                  href="/scan"
                  eventName="marketing_primary_cta_clicked"
                  eventCategory="conversion"
                  placement="first_month_promise"
                  preserveUtm
                  className="inline-flex min-h-12 items-center justify-center gap-2 border border-black/40 bg-transparent px-6 text-[15px] font-semibold text-[#151515] transition-colors hover:border-signal-ink hover:text-signal-ink"
                >
                  Scan my store
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </TrackedLink>
              </div>
            </article>

            <article className="flex flex-col border-t border-black/16 py-8 lg:border-l lg:border-t-0 lg:border-black/16 lg:py-10 lg:pl-12">
              <CardHead
                Icon={Store}
                eyebrow="02 · Beseam Growth"
                title="Continuous improvement with your approval"
                tone="accent"
              />
              <StepRail steps={GROWTH_STEPS} />
              <div className="mt-auto pt-7">
                <TrackedLink
                  href={APP_REGISTER_URL}
                  eventName="marketing_primary_cta_clicked"
                  eventCategory="conversion"
                  placement="first_month_promise"
                  preserveUtm
                  className="group inline-flex min-h-12 items-center justify-center gap-2 bg-signal-ink px-6 text-[15px] font-semibold text-white transition-colors hover:bg-pigment"
                >
                  Start free
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </TrackedLink>
              </div>
            </article>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
