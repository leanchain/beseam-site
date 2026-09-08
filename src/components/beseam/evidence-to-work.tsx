import { ActionsScreen } from "@/components/beseam/app-screens";
import { Reveal } from "@/components/beseam/reveal";

/**
 * Product-first proof that evidence becomes an approvable change rather than
 * another report. The queue is the whole beat.
 *
 * This used to be a two-column row with a sticky left rail carrying four
 * stacked items -- eyebrow, headline, a paragraph restating the loop, and an
 * approval callout. A merchant read them back to us as giving no new
 * information, and they were right: the loop is spelled out twice above
 * (`ConnectedEvidence`, `WhatBeseamDoes`), and "You approve" is a labelled
 * step in both. The rail is gone; only the eyebrow and the headline stay, and
 * the table gets the full measure.
 *
 * Same 92rem measure and padding as every other section on the page, so the
 * queue lines up with the beats above and below it rather than sitting in its
 * own inset column.
 */
export default function EvidenceToWork() {
  return (
    <section id="actions" className="scroll-mt-24 bg-white">
      <div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <Reveal>
          <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-signal-ink">
            From finding to change
          </p>
          <h2 className="mt-5 max-w-[26ch] text-balance font-display text-[clamp(2.2rem,3.3vw,3.4rem)] font-normal leading-[1.04] tracking-[-0.02em] text-ink-deep">
            Beseam finds what to improve next.
          </h2>

          {/* No label row anywhere above the rows. This beat used to stack
              three of them before any content -- "Merchant view",
              "Finding -> change -> apply -> check", and the table's own
              column labels -- which a merchant counted back to us and asked
              us to simplify. All three are gone. Residual risk: the table
              names none of its columns, so `ActionsScreen`'s values have to
              stay self-describing (see the docstring in app-screens.tsx). */}
          <div className="mt-9 min-w-0 sm:mt-11">
            <div className="sm:hidden">
              <ActionsScreen compact />
            </div>
            <div className="hidden sm:block">
              <ActionsScreen />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
