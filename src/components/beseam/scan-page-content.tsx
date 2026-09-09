import { ArrowRight, Check } from "lucide-react";

import LiveAnswerCheck, {
  ScanAssurances,
} from "@/components/beseam/answer-check";
import { BookReviewCta } from "@/components/beseam/book-review-cta";
import TrackedLink from "@/components/beseam/tracked-link";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/locale-rules.mjs";
import { APP_REGISTER_URL } from "@/lib/app-urls";

/**
 * Conversion page for the public scan. The cold state earns one action — enter
 * a store — so outcomes lead and scan mechanics stay secondary. Once a result
 * exists, AnswerCheck owns the page and this pre-scan framing disappears.
 */
export default function ScanPageContent({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).scan;

  return (
    <section className="min-h-screen bg-[#faf1eb] text-ink-deep">
      <div className="mx-auto max-w-[92rem] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-[76rem]">
          <LiveAnswerCheck
            placement="ai_discovery_scan"
            glowInput
            preamble={
              <>
                <div className="flex items-center justify-center gap-2">
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-signal-ink"
                    aria-hidden="true"
                  />
                  <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-black/48">
                    {t.eyebrow}
                  </p>
                </div>
                <h1 className="mx-auto mt-5 max-w-[20ch] text-balance text-center font-display text-[clamp(2.65rem,5vw,4.75rem)] font-normal leading-[0.98] tracking-[-0.03em]">
                  {t.heading}
                </h1>
                <p className="mx-auto mt-6 max-w-[56ch] text-center text-[17px] leading-[1.7] text-black/64 sm:text-[18px]">
                  {t.intro}
                </p>
                <div className="mb-8 mt-6 flex flex-col items-center gap-2.5 sm:mb-9">
                  <ScanAssurances />
                  <p className="text-[12.5px] text-black/46">{t.duration}</p>
                </div>
              </>
            }
            belowForm={
              <div className="mx-auto w-full max-w-5xl text-left">
                <div className="mt-2 grid border border-black/14 bg-white sm:grid-cols-3">
                  {t.returns.map(({ term, detail }, index) => (
                    <div
                      key={term}
                      className="border-b border-black/12 p-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0 sm:p-6"
                    >
                      <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.1em] text-signal-ink">
                        0{index + 1}
                      </p>
                      <h2 className="mt-2 text-[15px] font-semibold tracking-[-0.01em] text-ink-deep">
                        {term}
                      </h2>
                      <p className="mt-2 text-[13px] leading-[1.6] text-black/58">
                        {detail}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-10 border-t border-black/12 pt-7">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-2">
                    <h2 className="text-[14px] font-semibold tracking-[-0.01em] text-ink-deep">
                      {t.contentsHeading}
                    </h2>
                    <p className="text-[12px] text-black/42">{t.scopeNote}</p>
                  </div>
                  <div className="mt-4 grid gap-x-7 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
                    {t.contents.map((item) => (
                      <div
                        key={item.label}
                        className="flex items-start gap-2.5"
                      >
                        <Check
                          aria-hidden="true"
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#1f7a4d]"
                        />
                        <div>
                          <p className="text-[12.5px] font-semibold text-ink-deep">
                            {item.label}
                          </p>
                          <p className="mt-1 text-[11.5px] leading-[1.5] text-black/50">
                            {item.detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="mt-5 max-w-[72ch] text-[12px] leading-[1.6] text-black/46">
                    {t.notKeywordReport}
                  </p>
                </div>

                <div
                  id="beyond-the-scan"
                  data-print-hide
                  className="mt-12 scroll-mt-24 bg-ink-deep px-6 py-8 text-white sm:px-8 sm:py-9"
                >
                  <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
                    <div>
                      <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.1em] text-white/44">
                        {t.beyond.eyebrow}
                      </p>
                      <h2 className="mt-2 max-w-[27ch] text-[22px] font-semibold leading-[1.25] tracking-[-0.02em] sm:text-[24px]">
                        {t.beyond.heading}
                      </h2>
                      <p className="mt-3 max-w-2xl text-[13.5px] leading-[1.65] text-white/64">
                        {t.beyond.body}
                      </p>
                    </div>
                    <div className="flex min-w-[15rem] flex-col gap-3">
                      <TrackedLink
                        href={APP_REGISTER_URL}
                        eventName="scan_continue_clicked"
                        eventCategory="conversion"
                        placement="scan_page"
                        preserveUtm
                        className="group inline-flex min-h-12 items-center justify-center gap-2 bg-white px-6 text-[14px] font-semibold text-ink-deep transition-colors hover:bg-signal hover:text-ink-deep"
                      >
                        {t.beyond.start}
                        <ArrowRight
                          aria-hidden="true"
                          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                        />
                      </TrackedLink>
                      <BookReviewCta
                        location="scan_page"
                        label={t.beyond.book}
                        className="border border-white/36 bg-transparent text-white hover:bg-white hover:text-ink-deep"
                      />
                    </div>
                  </div>
                </div>
              </div>
            }
          />
        </div>
      </div>
    </section>
  );
}
