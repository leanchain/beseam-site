import { ArrowRight } from "lucide-react";

import LiveAnswerCheck, {
  ScanAssurances,
  ScanReturns,
} from "@/components/beseam/answer-check";
import { BookReviewCta } from "@/components/beseam/book-review-cta";
import TrackedLink from "@/components/beseam/tracked-link";
import type { Locale } from "@/i18n/locale-rules.mjs";
import { APP_REGISTER_URL } from "@/lib/app-urls";

// The four groups of checks the public scan actually runs, in the order they
// run (`storefront.py`, `page_audit.py`). The fourth is deliberately the limit
// rather than a feature: a one-off sample, not the ongoing product.
const SCAN_CONTENTS = [
  {
    label: "Your storefront",
    detail:
      "Robots file, sitemap, and whether search and AI crawlers are allowed in at all.",
  },
  {
    label: "Your catalog data",
    detail:
      "Categories, brand, descriptions, images, variant options, SKUs and barcodes, availability, duplicates.",
  },
  {
    label: "Your product pages",
    detail:
      "We read a sample of pages in full, then compare them with your catalog — names, prices and stock that do not match.",
  },
  {
    label: "A sample AI answer",
    detail:
      "One look at how assistants describe your store today. Asked once here; asked on a schedule in the app.",
  },
] as const;

/**
 * The scan page's body, shared by `src/app/scan/page.tsx` and
 * `src/app/[locale]/scan/page.tsx` so there is one place to translate when
 * Task 10 moves this copy to German -- not two files that can drift. This
 * task keeps the body English on both routes; `locale` is threaded through
 * only so it is in place for that later change.
 */
export default function ScanPageContent({ locale }: { locale: Locale }) {
  void locale;

  return (
    <section className="min-h-screen bg-[#faf1eb] text-ink-deep">
      <div className="mx-auto max-w-[92rem] px-5 py-14 sm:px-8 sm:py-16 lg:px-10">
        {/* The headline argues for running a scan, so it belongs to the
            preamble and leaves with it. A shrunken version of it above a
            finished audit is a second, weaker title for a card that already
            names the store, the platform, the market and the run. */}
        <div className="mx-auto max-w-[76rem]">
          <LiveAnswerCheck
            placement="ai_discovery_scan"
            preamble={
              <>
                {/* The word "free" used to arrive in the `FreeScanPromise`
                    heading that sat above the field. That block moved below
                    the field, so the label moves up here -- it is the reason a
                    cold visitor keeps reading, and it costs one line. */}
                <p className="text-center text-[12.5px] font-semibold uppercase tracking-[0.16em] text-black/45">
                  Free store scan
                </p>
                <h1 className="mx-auto mt-5 max-w-[22ch] text-balance text-center font-display text-[clamp(2.8rem,5vw,4.8rem)] font-normal leading-[1] tracking-[-0.025em]">
                  See what may stop shoppers from buying.
                </h1>
                {/* Two lines and then the field. The scope of the read, what
                    comes back and the boundary of a one-off scan are all worth
                    saying -- they are just not worth saying before the one
                    action this page has, which they used to push a full screen
                    down. They now sit under the field, in `belowForm`. */}
                <p className="mx-auto mt-7 max-w-[52ch] text-center text-[17px] leading-[1.7] text-black/64">
                  Enter your domain and the scan starts. We read your public
                  store the way a search engine or an AI assistant reads it, and
                  the findings land on this page as they arrive.
                </p>
                <div className="mb-9 mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
                  <ScanAssurances />
                  <p className="text-[13px] text-black/50">
                    Usually about a minute.
                  </p>
                </div>
              </>
            }
            belowForm={
              <div className="mx-auto w-full max-w-3xl text-left">
                {/* What is actually in the audit. Naming the groups of checks
                    is the difference between "we read your store" and a scope a
                    merchant can judge -- and the last cell is honest that the
                    free read is one slice of the product. */}
                <h2 className="text-[15px] font-semibold tracking-[-0.015em] text-ink-deep">
                  What the scan reads
                </h2>
                <div className="mt-4 grid gap-px border border-black/12 bg-black/12 sm:grid-cols-2">
                  {SCAN_CONTENTS.map((item) => (
                    <div key={item.label} className="bg-white p-5">
                      <p className="text-[13px] font-semibold text-ink-deep">
                        {item.label}
                      </p>
                      <p className="mt-2 text-[12.5px] leading-[1.6] text-black/58">
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </div>
                {/* The kind of assessment, and the one it is not. A merchant
                    who typed a domain expecting keyword analysis has to be able
                    to correct that before the findings arrive and do it for
                    us. */}
                <p className="mt-4 max-w-[62ch] text-[13.5px] leading-[1.6] text-black/62">
                  Every finding names the products behind it and links to the
                  pages we read. It is not a keyword report — we do not measure
                  search demand, and shopper questions come later, not here.
                </p>

                <h2 className="mt-12 text-[15px] font-semibold tracking-[-0.015em] text-ink-deep">
                  What you get back
                </h2>
                <div className="mt-4">
                  <ScanReturns />
                </div>

                {/* The boundary line closes the section it belongs to: the
                    one-off nature of the scan is the reason the dark panel
                    below it exists. */}
                <p className="mt-8 text-[14.5px] font-semibold leading-[1.55] tracking-[-0.01em] text-ink-deep">
                  This scan reads your store once. Beseam keeps checking, and
                  proves what changed.{" "}
                  <a
                    href="#beyond-the-scan"
                    className="font-semibold text-ink-deep underline decoration-black/25 underline-offset-4 hover:decoration-signal-ink"
                  >
                    See what runs continuously →
                  </a>
                </p>
              </div>
            }
            formNote={
              // Same reassurance the homepage hero used to carry, moved here:
              // it belongs between the field and the result, not the hero.
              <p className="mx-auto mt-2 max-w-3xl text-center text-[12.5px] leading-snug text-black/54">
                Free scan reads your store once.
                <span className="block">
                  Beseam: Find &rarr; Prepare &rarr; Approve &rarr; Apply &rarr;
                  Measure
                </span>
              </p>
            }
          />
        </div>

        {/* Two doors, ranked. The upgrade the scan cannot give you — questions
            asked on a schedule, kept answers, a recheck — is the primary path;
            the product review stays as the assisted one. */}
        <div
          id="beyond-the-scan"
          data-print-hide
          className="mx-auto mt-20 max-w-[76rem] scroll-mt-24 bg-ink-deep px-6 py-12 text-white sm:px-10 sm:py-14"
        >
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div>
              <h2 className="max-w-[25ch] font-display text-[clamp(1.9rem,3.2vw,3rem)] font-normal leading-[1.04] tracking-[-0.025em]">
                Questions on a schedule, and a recheck after the fix.
              </h2>
              <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/66">
                In Beseam you read and edit the shopper questions before any of
                them run, the answers are kept as evidence, fixes are ordered by
                what is worth doing first, and the same questions are asked
                again after a change so you can see what moved.
              </p>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/54">
                Or bring your store to a twenty-minute review, and we will use
                one real finding to show what Beseam found, what it would
                change, and what it checks again afterward.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
              <TrackedLink
                href={APP_REGISTER_URL}
                eventName="scan_continue_clicked"
                eventCategory="conversion"
                placement="scan_page"
                preserveUtm
                className="group inline-flex min-h-12 items-center justify-center gap-2 bg-white px-6 text-[15px] font-semibold text-ink-deep transition-colors hover:bg-signal hover:text-ink-deep"
              >
                Start ongoing checks
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                />
              </TrackedLink>
              <BookReviewCta
                location="scan_page"
                label="See Beseam on my store"
                className="border border-white/45 bg-transparent text-white hover:bg-white hover:text-ink-deep"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
