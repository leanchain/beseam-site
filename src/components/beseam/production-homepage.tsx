import { Check } from "lucide-react";

import LiveAnswerCheck from "@/components/beseam/answer-check";
import CategoryBenchmarksSection from "@/components/beseam/category-benchmarks-section";
import ConnectedEvidence from "@/components/beseam/connected-evidence";
import CredibilityRail from "@/components/beseam/credibility-rail";
import EvidenceToWork from "@/components/beseam/evidence-to-work";
import FirstMonthPromise from "@/components/beseam/first-month-promise";
import HeroSurfaceShift from "@/components/beseam/hero-surface-shift";
import MeasureImpact from "@/components/beseam/measure-impact";
import { Reveal } from "@/components/beseam/reveal";
import WhatBeseamDoes from "@/components/beseam/what-beseam-does";

/**
 * Section order is the argument:
 *
 * claim → credibility → signature evidence trace → breadth → published
 * research → proposed work → truthful measurement mechanism → ways to start
 *
 * The most ownable proof arrives before the capability catalogue, and the
 * published benchmarks sit after "How Beseam works" rather than ahead of it:
 * the report corroborates the claim, it does not open with it.
 *
 * Hero copy is ruled, not iterated: visibility-first (tracker §Canonical
 * landing-page audit, 2026-09-05), frozen until 2026-10-05 except for bugs or
 * wording quoted from a merchant.
 */
const SCAN_RETURNS = [
  "Can AI shopping agents read your store?",
  "See where you stand",
  "What to fix first",
] as const;

export default function ProductionHomepage() {
  return (
    <div className="bg-ground text-[#151515]">
      <section id="home-hero" className="relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[80svh]">
          <HeroSurfaceShift />
        </div>
        <div
          id="ai-check"
          className="pointer-events-none relative z-10 mx-auto flex min-h-[80svh] max-w-[92rem] scroll-mt-24 items-center justify-center px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-24"
        >
          <Reveal className="w-full">
            <div className="mx-auto w-full max-w-[76rem] text-center">
              <h1 className="pointer-events-auto mx-auto max-w-[18ch] text-balance font-display text-[clamp(3rem,5.6vw,5rem)] font-normal leading-[0.98] tracking-[-0.025em] text-ink-deep">
                See why AI picked{" "}
                <span className="text-signal-ink">someone else</span>.
              </h1>
              <p className="pointer-events-auto mx-auto mt-6 max-w-[64ch] text-[17px] leading-[1.7] text-black/64 sm:text-[18px]">
                Beseam keeps watching AI discovery, your store, and your
                shoppers to find what is worth improving, makes the changes you
                approve, and shows you what changed.
              </p>
              <div className="pointer-events-auto mx-auto mt-9 w-full">
                <LiveAnswerCheck
                  placement="homepage_hero"
                  handOffTo="/scan"
                  formNote={
                    <div className="mx-auto mt-2 flex flex-col items-center text-center">
                      <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                        {SCAN_RETURNS.map((item) => (
                          <li
                            key={item}
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
      </section>

      <CredibilityRail />
      <ConnectedEvidence />
      <WhatBeseamDoes />
      <CategoryBenchmarksSection />
      <EvidenceToWork />
      <MeasureImpact />
      <FirstMonthPromise />
    </div>
  );
}
