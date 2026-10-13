import Link from "next/link";

import { ArrowRight, Check } from "lucide-react";

import { Reveal } from "@/components/beseam/reveal";

const PRIORITY_SIGNALS = [
  "Shopper reach",
  "Evidence strength",
  "Effort to change",
] as const;

export default function WhyBeseam() {
  return (
    <section
      id="why"
      className="scroll-mt-24 border-t border-black/14 bg-[#f5e9e2]"
    >
      <div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <Reveal>
          <div>
            <p className="font-display text-[12px] font-semibold uppercase tracking-[0.08em] text-signal-ink">
              Why Beseam
            </p>
            <h2 className="mt-5 max-w-[20ch] text-balance font-display text-[clamp(2rem,3.2vw,3.2rem)] font-normal leading-[1.04] tracking-[-0.02em] text-ink-deep">
              You don&rsquo;t need another dashboard. You need to know what to
              fix next.
            </h2>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-px border border-black/14 bg-black/14 lg:grid-cols-2">
          <Reveal delay={0.04}>
            <article className="h-full bg-white p-7 sm:p-8">
              <p className="font-display text-[11px] font-semibold uppercase tracking-[0.08em] text-signal-ink">
                Prioritize
              </p>
              <h3 className="mt-4 max-w-[18ch] font-display text-[clamp(1.6rem,2.4vw,2.2rem)] font-normal leading-[1.1] tracking-[-0.02em] text-ink-deep">
                A list of findings is not a plan.
              </h3>
              <p className="mt-4 max-w-[46ch] text-[15px] leading-[1.7] text-black/64">
                Beseam shows what matters most and why.
              </p>
              <ul className="mt-6 border-t border-black/14">
                {PRIORITY_SIGNALS.map((signal) => (
                  <li
                    key={signal}
                    className="flex items-center gap-3 border-b border-black/12 py-3 text-[13px] text-black/66 last:border-b-0"
                  >
                    <Check
                      className="h-3.5 w-3.5 shrink-0 text-signal-ink"
                      aria-hidden="true"
                    />
                    {signal}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>

          <Reveal delay={0.06}>
            <article className="h-full bg-[#fff8f4] p-7 sm:p-8">
              <p className="font-display text-[11px] font-semibold uppercase tracking-[0.08em] text-signal-ink">
                Continuous loop
              </p>
              <h3 className="mt-4 max-w-[18ch] font-display text-[clamp(1.6rem,2.4vw,2.2rem)] font-normal leading-[1.1] tracking-[-0.02em] text-ink-deep">
                Beseam keeps going after the finding.
              </h3>
              <p className="mt-4 max-w-[44ch] text-[15px] leading-[1.7] text-black/64">
                It keeps finding what to improve, prepares the change, gets your
                approval when customers will see it, applies it, and checks what
                happened.
              </p>
              <Link
                href="/#how-it-works"
                className="group mt-6 inline-flex min-h-11 items-center gap-2 text-[14px] font-semibold text-ink-deep underline decoration-black/30 underline-offset-6 hover:decoration-signal-ink"
              >
                See how Beseam works
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
