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
                Your first 30 days
              </p>
              {/* One balanced sentence at the shared section clamp. The
                  headline used to be two spans, the second held on one line by
                  `sm:whitespace-nowrap`, and it promised "Pay when Beseam
                  proves its value" -- a condition -- above an eyebrow that
                  promised a 30-day clock. The clock is the offer; it is stated
                  once, in the eyebrow and the copy beside it. */}
              <h2 className="mt-5 max-w-[18ch] text-balance font-display text-[clamp(2.2rem,3.3vw,3.4rem)] font-normal leading-[1.04] tracking-[-0.02em] text-ink-deep">
                See what Beseam finds before you pay.
              </h2>
            </div>
            <div>
              <p className="max-w-[50ch] text-[17px] leading-[1.72] text-black/64">
                Use Beseam free for 30 days. See what it finds, approve the
                changes that need your judgment, and see what moved.
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
