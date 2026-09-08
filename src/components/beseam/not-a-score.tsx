import { Reveal } from "@/components/beseam/reveal";

/**
 * The one section on the page that says what Beseam is *not*.
 *
 * Every other section here is a claim followed by an artifact that backs it,
 * and after four of them in a row the page reads as a capability list however
 * good the individual claims are. This one carries no artifact, no eyebrow and
 * no supporting column -- a single line with air around it, placed between the
 * published research and the work, so the reader arrives at the table having
 * just been told what the table is for.
 *
 * It also names the thing Beseam is arguing against, which nothing else on the
 * page does. The category ships scores: a number, a grade, a dashboard that
 * tells a merchant where they stand and stops. The stance is that the number
 * is the cheap half.
 *
 * The claim is deliberately about a category and never about a named
 * competitor -- `docs/internal/strategy/AI_COMMERCE_CONTROL_PLANE_TRACKER.md`
 * forbids editorialising about a named brand, and a stance does not need one.
 */
export default function NotAScore() {
  return (
    <section
      id="not-a-score"
      className="scroll-mt-24 border-y border-black/10 bg-ground"
    >
      <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-28 lg:px-10 lg:py-32">
        <Reveal>
          <p className="max-w-[20ch] text-balance font-display text-[clamp(2.4rem,4.4vw,4.4rem)] font-normal leading-[1.02] tracking-[-0.025em] text-ink-deep">
            A score tells you where you stand. It does not move you.
          </p>
          <p className="mt-8 max-w-[58ch] text-[16px] leading-[1.75] text-black/64 sm:text-[17px]">
            Most tools in this category end at a number. Beseam starts there: it
            finds the one change behind the number, makes it when you approve
            it, then asks the same shopper question again to see whether the
            answer moved.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
