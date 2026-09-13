import { Check } from "lucide-react";

import LiveAnswerCheck from "@/components/beseam/answer-check";
import CategoryBenchmarksSection from "@/components/beseam/category-benchmarks-section";
import CredibilityRail from "@/components/beseam/credibility-rail";
import EvidenceToWork from "@/components/beseam/evidence-to-work";
import FirstMonthPromise from "@/components/beseam/first-month-promise";
import HeroScrollCue from "@/components/beseam/hero-scroll-cue";
import HeroSurfaceShift from "@/components/beseam/hero-surface-shift";
import HeroViewportFit from "@/components/beseam/hero-viewport-fit";
import MeasureImpact from "@/components/beseam/measure-impact";
import { Reveal } from "@/components/beseam/reveal";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/locale-rules.mjs";

/**
 * Launch-home section order is deliberately narrower than the platform:
 *
 * promise + live scan → credibility → independent discovery proof → fix →
 * verify → one next step
 *
 * The public scan is the primary product proof. The benchmark section adds an
 * independent discovery signal, then the existing work and measurement beats
 * show what happens after Beseam finds something. Broad shopper-journey and
 * connected-system explanations remain available on /platform; they do not
 * compete with the launch job on Home.
 *
 * Every section below is handed the locale explicitly. None of them reads the
 * path, because under `output: "export"` a server component has no request to
 * read it from -- the page that mounts this composition is the one that knows.
 */
export default function ProductionHomepage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const scanReturns = Object.entries(t.hero.scanReturns);

  return (
    <div className="bg-ground text-[#151515]">
      <section id="home-hero" className="relative isolate overflow-hidden">
        <HeroViewportFit />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[calc(100svh-var(--hero-reserve))]">
          <HeroSurfaceShift />
        </div>
        <div
          id="ai-check"
          className="pointer-events-none relative z-10 mx-auto flex min-h-[calc(100svh-var(--hero-reserve))] max-w-[92rem] scroll-mt-24 items-center justify-center px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-24"
        >
          <Reveal className="w-full">
            <div className="mx-auto w-full max-w-[76rem] text-center">
              <h1 className="pointer-events-auto mx-auto max-w-[18ch] text-balance font-display text-[clamp(3rem,5.6vw,5rem)] font-normal leading-[0.98] tracking-[-0.025em] text-ink-deep">
                {t.hero.headlineBefore}
                <span className="text-signal-ink">{t.hero.headlineAccent}</span>
                {t.hero.headlineAfter}
              </h1>
              <p className="pointer-events-auto mx-auto mt-6 max-w-[64ch] text-[17px] leading-[1.7] text-black/64 sm:text-[18px]">
                {t.hero.sub}
              </p>
              <div className="pointer-events-auto mx-auto mt-9 w-full">
                <LiveAnswerCheck
                  placement="homepage_hero"
                  handOffTo={locale === "de" ? "/de/scan" : "/scan"}
                  glowInput
                  formNote={
                    <div className="mx-auto mt-2 flex flex-col items-center text-center">
                      <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                        {scanReturns.map(([key, item]) => (
                          <li
                            key={key}
                            className="flex items-center gap-2 text-[13px] leading-snug text-black/62"
                          >
                            <Check
                              aria-hidden="true"
                              className="h-3.5 w-3.5 shrink-0 text-signal-ink"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  }
                />
              </div>
            </div>
          </Reveal>
        </div>
        <HeroScrollCue />
      </section>

      <CredibilityRail locale={locale} />
      <CategoryBenchmarksSection locale={locale} compact />
      <EvidenceToWork locale={locale} />
      <MeasureImpact locale={locale} />
      <FirstMonthPromise locale={locale} />
    </div>
  );
}
