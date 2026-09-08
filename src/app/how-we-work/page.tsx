import Link from "next/link";

import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

import { BookReviewCta } from "@/components/beseam/book-review-cta";
import FirstMonthPromise from "@/components/beseam/first-month-promise";
import LoopDiagram from "@/components/beseam/loop-diagram";
import { Reveal } from "@/components/beseam/reveal";
import { buildPublicMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPublicMetadata({
  title: "How Beseam Works for Commerce Teams",
  description:
    "Beseam keeps finding what to improve, prepares the change, asks for your approval, applies approved changes, and checks what happened.",
  path: "/how-we-work",
});

// One vocabulary for the loop, everywhere: Find -> Prepare -> Approve -> Apply
// -> Measure. See `components/beseam/operating-loop.tsx` for why this is the
// one that survived.
const LOOP = [
  ["01", "Find", "See where shoppers miss you, hesitate, or leave."],
  ["02", "Prepare", "Work out what may explain it, and what to change."],
  [
    "03",
    "Approve",
    "You decide. Nothing customer-facing ships without your yes.",
  ],
  ["04", "Apply", "The change goes live, with a way back."],
  ["05", "Measure", "Ask the same question again and see what changed."],
] as const;

const RESPONSIBILITIES = [
  {
    yours: "Goals, rules, and priorities",
    ours: "Keep finding what is worth improving across AI discovery, your store, shopper behavior, and sales.",
  },
  {
    yours: "Brand choices Beseam cannot make for you",
    ours: "Show why a change is worth making and what to check afterward.",
  },
  {
    yours: "Approve customer-facing changes",
    ours: "Apply approved changes and check what happened.",
  },
] as const;

export default function HowWeWorkPage() {
  return (
    <>
      <section className="border-b border-black/14 bg-ground">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.75fr)] lg:items-end lg:gap-20">
              <div>
                <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-signal-ink">
                  How Beseam works for commerce teams
                </p>
                <h1 className="mt-6 max-w-[15ch] text-balance font-display text-[clamp(3rem,5.8vw,5rem)] font-normal leading-[0.98] tracking-[-0.025em] text-ink-deep">
                  Beseam keeps finding what to improve.
                </h1>
              </div>
              <div>
                <p className="max-w-[52ch] text-[18px] leading-[1.7] text-black/66">
                  You set the goals and rules. Beseam keeps finding what to
                  improve, prepares the change, asks for approval, applies it,
                  and checks what changed.
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <BookReviewCta
                    variant="primary"
                    location="how_we_work_hero"
                    label="See Beseam work"
                  />
                  <Link
                    href="/platform"
                    className="group inline-flex min-h-12 items-center gap-2 px-1 text-[15px] font-semibold text-ink-deep underline decoration-black/25 underline-offset-6 hover:decoration-signal-ink"
                  >
                    See the platform
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-white/12 bg-ink-deep text-white">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-[minmax(28rem,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
              <div>
                <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-signal">
                  The loop behind the outcome
                </p>
                <h2 className="mt-5 max-w-[18ch] font-display text-[clamp(2.2rem,3.8vw,3.8rem)] font-normal leading-[1.04] tracking-[-0.02em]">
                  <span className="lg:block lg:whitespace-nowrap">
                    One outcome.
                  </span>{" "}
                  <span className="lg:block lg:whitespace-nowrap">
                    One continuous loop.
                  </span>
                </h2>
              </div>
              <div>
                <p className="max-w-[64ch] text-[17px] leading-[1.75] text-white/68">
                  Beseam keeps watching what happens, works out what may be
                  worth changing, gets your approval, applies the change, and
                  checks what happened next.
                </p>
                <LoopDiagram tone="dark" className="mt-10" />
                <ol className="mt-10 grid border-t border-white/16 md:grid-cols-5">
                  {LOOP.map(([number, title, body], index) => (
                    <li
                      key={number}
                      className={`border-b border-white/14 py-6 md:border-b-0 md:px-5 ${index > 0 ? "md:border-l" : "md:pl-0"}`}
                    >
                      <span className="font-mono text-[11px] font-semibold text-signal">
                        {number}
                      </span>
                      <h3 className="mt-3 text-[17px] font-semibold text-white">
                        {title}
                      </h3>
                      <p className="mt-2 text-[13px] leading-[1.6] text-white/56">
                        {body}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-black/14 bg-white">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-[minmax(14rem,0.5fr)_minmax(0,1.5fr)] lg:gap-20">
              <div>
                <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-signal-ink">
                  The operating relationship
                </p>
                <h2 className="mt-5 max-w-[14ch] font-display text-[clamp(2.2rem,3.6vw,3.5rem)] font-normal leading-[1.05] tracking-[-0.02em] text-ink-deep">
                  Beseam keeps moving. You approve customer-facing changes.
                </h2>
                <p className="mt-5 max-w-[36ch] text-[15px] leading-[1.7] text-black/60">
                  Your team sets the goals, rules, and brand choices. Beseam
                  keeps the improvement loop moving so you do not have another
                  tool to manage.
                </p>
              </div>
              <div className="border-t-2 border-ink-deep">
                <div className="hidden grid-cols-2 gap-8 border-b border-black/14 py-4 text-[12px] font-semibold uppercase tracking-[0.1em] text-black/42 sm:grid">
                  <span>Your team</span>
                  <span>Beseam</span>
                </div>
                {RESPONSIBILITIES.map((row) => (
                  <div
                    key={row.yours}
                    className="grid gap-3 border-b border-black/14 py-6 sm:grid-cols-2 sm:gap-8"
                  >
                    <div>
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-black/38 sm:hidden">
                        Your team
                      </span>
                      <p className="mt-1 text-[15px] font-semibold text-ink-deep sm:mt-0">
                        {row.yours}
                      </p>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-black/38 sm:hidden">
                        Beseam
                      </span>
                      <p className="mt-1 text-[15px] leading-[1.6] text-black/64 sm:mt-0">
                        {row.ours}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-black/14 bg-ground">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <article className="border-t-2 border-ink-deep pt-6">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-signal-ink">
                  What Beseam is doing
                </p>
                <h2 className="mt-4 text-[25px] font-semibold tracking-[-0.02em] text-ink-deep">
                  You can see what Beseam is doing.
                </h2>
                <p className="mt-4 max-w-[52ch] text-[15px] leading-[1.7] text-black/62">
                  The Growth plan shows what Beseam found, what it wants to
                  change, the expected impact, whether you approved it, and what
                  happens next.
                </p>
                <Link
                  href="/platform"
                  className="mt-6 inline-flex min-h-10 items-center gap-2 text-[14px] font-semibold text-ink-deep underline decoration-black/25 underline-offset-6 hover:decoration-signal-ink"
                >
                  See how changes are tracked
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>

              <article className="border-t-2 border-signal-ink pt-6">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-signal-ink">
                  The measured outcome
                </p>
                <h2 className="mt-4 text-[25px] font-semibold tracking-[-0.02em] text-ink-deep">
                  You can see whether the change helped.
                </h2>
                <p className="mt-4 max-w-[52ch] text-[15px] leading-[1.7] text-black/62">
                  After a change is applied, Beseam checks the same shopper and
                  store data again. Directly measured results stay separate from
                  estimates so the page does not overclaim what happened.
                </p>
                <Link
                  href="/platform"
                  className="mt-6 inline-flex min-h-10 items-center gap-2 text-[14px] font-semibold text-ink-deep underline decoration-black/25 underline-offset-6 hover:decoration-signal-ink"
                >
                  See how outcomes are measured
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            </div>
          </Reveal>
        </div>
      </section>

      <FirstMonthPromise />
    </>
  );
}
