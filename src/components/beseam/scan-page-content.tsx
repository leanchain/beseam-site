import { Check } from "lucide-react";

import LiveAnswerCheck, {
  ScanAssurances,
} from "@/components/beseam/answer-check";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/locale-rules.mjs";

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
                <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-2">
                  <h2 className="text-[13px] font-semibold tracking-[-0.01em] text-ink-deep">
                    {t.returnsHeading}
                  </h2>
                  <p className="text-[12px] text-black/42">{t.scopeNote}</p>
                </div>
                <div className="mt-4 grid border border-black/14 bg-white sm:grid-cols-3">
                  {t.returns.map(({ term, detail }, index) => (
                    <div
                      key={term}
                      className="border-b border-black/12 p-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0 sm:p-6"
                    >
                      <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.1em] text-signal-ink">
                        0{index + 1}
                      </p>
                      <h3 className="mt-2 text-[15px] font-semibold tracking-[-0.01em] text-ink-deep">
                        {term}
                      </h3>
                      <p className="mt-2 text-[13px] leading-[1.6] text-black/58">
                        {detail}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex items-start justify-center gap-2 text-center text-[12.5px] leading-relaxed text-black/52">
                  <Check
                    aria-hidden="true"
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#1f7a4d]"
                  />
                  <p>{t.once}</p>
                </div>
              </div>
            }
          />
        </div>
      </div>
    </section>
  );
}
