import { Reveal } from "@/components/beseam/reveal";

const STEPS = [
  ["01", "Find", "See where shoppers are missed or may drop out."],
  ["02", "Prepare", "Work out what may explain it, and what to change."],
  ["03", "Approve", "You decide. Nothing customer-facing ships without it."],
  ["04", "Apply", "The change goes live, with a way back."],
  ["05", "Measure", "Ask the same question again and see what changed."],
] as const;

/**
 * One operating vocabulary across the product and marketing site:
 * Find → Prepare → Approve → Apply → Measure.
 *
 * It used to read Observe → Understand → Act → Learn here, See → Understand →
 * Fix → Prove in the internal tracker, and Proposals / To do / Waiting / Done
 * in the app itself. A visitor met three vocabularies for one loop before they
 * ever signed up. This is the one that survives, for the reason that decided
 * it: it is the only one with **Approve** in it, and approval before change is
 * the promise the whole product is built around.
 */
export default function OperatingLoop() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-24 border-t border-black/14 bg-ground"
    >
      <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-end lg:gap-16">
            <div>
              <p className="font-display text-[12px] font-semibold uppercase tracking-[0.08em] text-signal-ink">
                One continuous growth loop
              </p>
              <h2 className="mt-7 max-w-[16ch] text-balance font-display text-[clamp(2.25rem,3.4vw,3.5rem)] font-normal leading-[1.05] tracking-[-0.02em] text-ink-deep">
                Beseam runs the loop.
              </h2>
            </div>
            <p className="max-w-[50ch] text-[16px] leading-[1.75] text-black/64">
              Beseam keeps finding what to improve, prepares the change, gets
              approval, applies it, and checks what happened — continuously.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <ol className="mt-10 grid border-t-2 border-ink-deep sm:grid-cols-5">
            {STEPS.map(([number, title, body], index) => (
              <li
                key={title}
                className={`border-b border-black/14 py-4 sm:border-b-0 sm:px-5 sm:py-4 ${index > 0 ? "sm:border-l" : "sm:pl-0"}`}
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[10px] font-semibold tabular-nums text-signal-ink">
                    {number}
                  </span>
                  <h3 className="text-[15px] font-semibold text-ink-deep">
                    {title}
                  </h3>
                </div>
                <p className="mt-1.5 text-[13px] leading-[1.5] text-black/58">
                  {body}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
