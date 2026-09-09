import { ImpactScreen } from "@/components/beseam/app-screens";
import { Reveal } from "@/components/beseam/reveal";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/locale-rules.mjs";

/**
 * The measured outcome beat: keep the original signal, approved change, and
 * before/after result visibly attached without presenting examples as customer proof.
 *
 * The two columns are centred on the row axis, matching the AI Shopping
 * Report section. This was top-aligned for a while: at the old 0.5fr/1.5fr
 * split the copy column was much shorter than the panel, so centring left the
 * eyebrow floating 11-20px under the panel's top edge and a merchant read the
 * row as having two top edges. On the shared 0.72fr/1.28fr split the two
 * columns are close enough in height that centring reads as one row, and it
 * keeps this beat aligned with the section it sits under.
 */
export default function MeasureImpact({ locale = "en" }: { locale?: Locale }) {
  const t = getDictionary(locale);

  return (
    <section id="impact" className="scroll-mt-24 bg-ink-deep text-white">
      <div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <Reveal>
          {/* Same split as the AI Shopping Report section above
              (`category-benchmarks-section.tsx`): 0.72fr of copy against
              1.28fr of evidence, 4rem apart. Two adjacent sections that both
              put text beside a panel should not each invent their own
              column widths. */}
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-center lg:gap-16">
            <div>
              <h2 className="max-w-[18ch] text-balance font-display text-[clamp(2.25rem,3.4vw,3.5rem)] font-normal leading-[1.05] tracking-[-0.02em]">
                {t.sections.impact.heading}
              </h2>
              <p className="mt-5 max-w-[44ch] text-[15px] leading-[1.7] text-white/64">
                {t.sections.impact.body}
              </p>
            </div>
            <ImpactScreen />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
