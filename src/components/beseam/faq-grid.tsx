import type { ReactNode } from "react";

import { Reveal } from "@/components/beseam/reveal";

export type FaqItem = {
  question: string;
  answer: string;
};

type FaqGridProps = {
  id?: string;
  heading: ReactNode;
  items: readonly FaqItem[];
  eyebrow?: ReactNode;
  intro?: ReactNode;
  action?: ReactNode;
  className?: string;
};

/**
 * Shared public-site FAQ treatment. The header introduces the topic; questions
 * always use the full content width below it instead of being compressed into
 * a right-hand rail. Desktop gets two columns, narrow screens one.
 */
export default function FaqGrid({
  id,
  heading,
  items,
  eyebrow = "FAQ",
  intro,
  action,
  className = "bg-ground-2",
}: FaqGridProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 border-b border-black/14 ${className}`}
    >
      <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <Reveal>
          <div className="grid gap-7 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end lg:gap-16">
            <div>
              {eyebrow ? (
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-signal-ink">
                  {eyebrow}
                </p>
              ) : null}
              <h2 className="mt-5 max-w-[18ch] text-balance font-display text-[clamp(2rem,3.2vw,3rem)] font-normal leading-[1.06] tracking-[-0.025em] text-ink-deep">
                {heading}
              </h2>
            </div>

            {intro || action ? (
              <div className="max-w-[54ch] lg:justify-self-end">
                {intro ? (
                  <div className="text-[15px] leading-[1.7] text-black/60">
                    {intro}
                  </div>
                ) : null}
                {action ? <div className="mt-6">{action}</div> : null}
              </div>
            ) : null}
          </div>

          <div className="mt-12 grid items-start border-t border-black/24 lg:mt-14 lg:grid-cols-2 lg:gap-x-14">
            {items.map((faq) => (
              <details
                key={faq.question}
                className="group w-full border-b border-black/16"
              >
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 text-[16px] font-semibold tracking-[-0.01em] text-ink-deep transition-colors marker:content-none hover:text-signal-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-signal-ink sm:text-[16.5px]">
                  <span className="max-w-[42ch]">{faq.question}</span>
                  <span
                    aria-hidden="true"
                    className="flex h-7 w-7 shrink-0 items-center justify-center border border-black/20 text-[18px] font-normal text-signal-ink transition-transform duration-300 ease-out group-open:rotate-45 motion-reduce:transition-none"
                  >
                    +
                  </span>
                </summary>
                <p className="max-w-[62ch] pb-7 pr-10 text-[15px] leading-[1.72] text-black/64 [text-wrap:pretty]">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
