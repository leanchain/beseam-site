import { ImpactScreen } from "@/components/beseam/app-screens";
import { Reveal } from "@/components/beseam/reveal";

/**
 * The measured outcome beat: keep the original signal, approved change, and
 * before/after result visibly attached without presenting examples as customer proof.
 *
 * The two columns are top-aligned, not centred. A merchant read this section
 * back to us as "a really random layout" and pointed at the positioning of
 * the items: with `lg:items-center` the eyebrow started 11-20px below the
 * Results panel's top edge at every desktop width, so the row had two top
 * edges and no rule saying which one was the row's. `lg:items-start` gives it
 * one, the same way the two `#promise` cards share one.
 */
export default function MeasureImpact() {
  return (
    <section id="impact" className="scroll-mt-24 bg-ink-deep text-white">
      <div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[minmax(13rem,0.5fr)_minmax(0,1.5fr)] lg:items-start lg:gap-14">
            <div>
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-signal">
                The outcome
              </p>
              <h2 className="mt-6 max-w-[13ch] text-balance font-display text-[clamp(2.25rem,3.4vw,3.5rem)] font-normal leading-[1.05] tracking-[-0.02em]">
                It only matters if the outcome moves.
              </h2>
              <p className="mt-5 max-w-[32ch] text-[14.5px] leading-[1.7] text-white/64">
                After a change, Beseam asks the same shopper questions again —
                and shows whether the answers now name your store.
              </p>
            </div>
            <ImpactScreen />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
