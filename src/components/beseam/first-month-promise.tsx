import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/beseam/reveal";
import TrackedLink from "@/components/beseam/tracked-link";
import { APP_REGISTER_URL } from "@/lib/app-urls";

/**
 * The closing beat: one offer, one action.
 *
 * This was two cards -- a free scan beside Beseam Growth -- each with its own
 * step rail and its own button. Both halves repeated the page: the scan is in
 * the navbar and under the hero form, and "Find / Prepare / Approve / Apply /
 * Measure" is drawn twice above (`connected-evidence.tsx`,
 * `what-beseam-does.tsx`). The closer's job is to be signed up on, so it now
 * carries the offer and the one button that starts it, and nothing else.
 *
 * That button goes to `APP_REGISTER_URL` -- the destination and the wording
 * the mobile sticky CTA and both platform-page buttons already use. It used to
 * open the Cal.com booking modal under the label "Start my free 30 days", so
 * the click did not do what it said; booking a review lives on the scan result
 * (`answer-check.tsx`).
 *
 * Split, measure and padding are the page's shared ones -- 0.72fr of heading
 * against 1.28fr of copy, 4rem apart (`measure-impact.tsx`,
 * `category-benchmarks-section.tsx`) -- so the last section lines up with the
 * two above it instead of inventing a closing layout of its own.
 *
 * The offer is three short sentences in one line of thought: what the other
 * tools do, what Beseam does instead, what it costs to find out. No asides,
 * no em-dash clause, no list of what the plan includes -- an earlier draft
 * carried all three and read as branching. The category contrast is load
 * bearing: the AI-visibility tools price by tracked prompts, models and
 * projects (`comparisons.ts`, Peec AI row), so watching is their meter, and
 * Beseam's claim is that watching was never the product.
 *
 * The headline is two block spans, not one balanced line: the sentences must
 * not merge mid-thought. What is deliberately absent is the
 * `sm:whitespace-nowrap` the second span used to carry -- it forced a break
 * after "Beseam", which is the break a merchant read back to us as random.
 *
 * The second sentence says "it", not "Beseam", for the same reason. At the
 * width this column actually has on a laptop (~480px, 0.72fr of the shared
 * split) "Pay when Beseam proves its value." wraps to "Pay when Beseam /
 * proves its value." -- the exact line she was reading. "Pay when it proves
 * its value." wraps to "Pay when it / proves its value.", a phrase boundary,
 * and the copy beside it names Beseam twice so the pronoun has an antecedent.
 * Measured in the browser at 480px and 350px, not guessed.
 */
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
                The offer
              </p>
              <h2 className="mt-5 max-w-[20ch] text-balance font-display text-[clamp(2.2rem,3.3vw,3.4rem)] font-normal leading-[1.04] tracking-[-0.02em] text-ink-deep">
                <span className="block">Start free.</span>
                <span className="block">Pay when it proves its value.</span>
              </h2>
            </div>
            <div>
              <p className="max-w-[48ch] text-[17px] leading-[1.72] text-black/64">
                Other tools watch and report. Beseam watches, makes the change
                you approve, and shows you what moved. Your first 30 days are
                free.
              </p>
              <TrackedLink
                href={APP_REGISTER_URL}
                eventName="marketing_primary_cta_clicked"
                eventCategory="conversion"
                placement="first_month_promise"
                preserveUtm
                className="group mt-8 inline-flex min-h-12 items-center justify-center gap-2 bg-signal-ink px-7 text-[15px] font-semibold text-white transition-colors hover:bg-pigment"
              >
                Start free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </TrackedLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
