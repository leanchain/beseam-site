import Link from "next/link";

import { ArrowRight, Check, ShoppingBag, X } from "lucide-react";

import { ActionsScreen, ImpactScreen } from "@/components/beseam/app-screens";
import { Reveal } from "@/components/beseam/reveal";
const CHOICE_EVIDENCE = [
  ["Suitable for daily commuting?", "Not answered", false],
  ["Waterproof rating?", "20,000 mm", true],
  ["Fit over layers?", "Not answered", false],
  ["Returns?", "30 days", true],
] as const;

const EXPLANATIONS = [
  {
    title: "The product is not relevant",
    detail:
      "The jacket matches the commuter use case and appears on another AI engine.",
    state: "Ruled out",
    active: false,
  },
  {
    title: "The product is unavailable",
    detail:
      "The product and common sizes are in stock when the answers are checked.",
    state: "Ruled out",
    active: false,
  },
  {
    title: "The deciding information is weak",
    detail:
      "The page gives a waterproof rating but does not clearly answer commuting suitability or fit over layers.",
    state: "Strongest evidence",
    active: true,
  },
] as const;

function StepHeader({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="font-display text-[11px] font-semibold uppercase tracking-[0.08em] text-signal-ink">
        {number} · {title}
      </p>
      <div className="mt-4 max-w-[42ch] text-[15px] leading-[1.7] text-black/64">
        {children}
      </div>
    </div>
  );
}

export default function BuyingDecisionStory() {
  return (
    <section
      id="decision-story"
      className="scroll-mt-24 border-y border-black/16 bg-white"
    >
      <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.78fr)] lg:items-end lg:gap-20">
            <div>
              <p className="font-display text-[12px] font-semibold uppercase tracking-[0.08em] text-signal-ink">
                One buying decision
              </p>
              <h2 className="mt-6 max-w-[18ch] text-balance font-display text-[clamp(2.4rem,4vw,4rem)] font-normal leading-[1.03] tracking-[-0.02em] text-ink-deep">
                Follow the same shopper question from AI answer to result.
              </h2>
            </div>
            <div>
              <p className="max-w-[46ch] text-[17px] leading-[1.7] text-black/66">
                “Which waterproof jacket works for commuting?” Beseam checks
                which products AI recommends, what the products actually answer,
                what may explain the gap, what should change, and what happens
                when the same question is checked again.
              </p>
              <p className="mt-4 font-display text-[11px] font-semibold uppercase tracking-[0.08em] text-signal-ink">
                Observe → Understand → Act → Learn
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.03}>
          <div className="mt-12 grid border-y border-black/14 bg-ground sm:grid-cols-5">
            {[
              ["Shopper question", "Waterproof jacket for commuting"],
              ["AI shortlist", "Urban Shell missed on 2 of 3"],
              ["Product evidence", "Key deciding answers are weak"],
              ["Approved change", "Add use case and fit guidance"],
              ["Recheck", "Ask the same question again"],
            ].map(([label, detail], index) => (
              <div
                key={label}
                className={`relative px-4 py-5 sm:px-5 ${index > 0 ? "border-t border-black/12 sm:border-l sm:border-t-0" : ""}`}
              >
                <p className="font-display text-[10px] font-semibold uppercase tracking-[0.08em] text-black/46">
                  {label}
                </p>
                <p className="mt-2 text-[13px] font-semibold leading-[1.45] text-ink-deep">
                  {detail}
                </p>
                {index < 4 ? (
                  <ArrowRight
                    aria-hidden="true"
                    className="absolute -right-2.5 top-1/2 z-10 hidden h-5 w-5 -translate-y-1/2 bg-ground text-signal-ink sm:block"
                  />
                ) : null}
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 border-t-2 border-ink-deep lg:mt-16">
          <Reveal delay={0.04}>
            <article className="grid gap-8 border-b border-black/14 py-10 lg:grid-cols-[minmax(14rem,0.42fr)_minmax(0,1fr)] lg:gap-16 lg:py-14">
              <StepHeader number="01" title="Find">
                <p>See which products AI recommends for the buying question.</p>
              </StepHeader>

              <div className="space-y-6">
                <div className="border border-black/16 bg-ground">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/12 bg-white px-5 py-4">
                    <div>
                      <p className="font-display text-[10px] font-semibold uppercase tracking-[0.08em] text-black/44">
                        Shopper question · illustrative example
                      </p>
                      <p className="mt-1 text-[15px] font-semibold text-ink-deep">
                        Which waterproof jacket works for commuting?
                      </p>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-3">
                    <div className="border-b border-black/12 p-5 sm:border-b-0 sm:border-r">
                      <p className="font-display text-[10px] font-semibold uppercase tracking-[0.08em] text-black/44">
                        ChatGPT
                      </p>
                      <p className="mt-4 text-[14px] font-semibold text-ink-deep">
                        RidgeNorth · Norra · Westpeak
                      </p>
                      <p className="mt-2 flex items-center gap-2 text-[12px] text-black/58">
                        <X
                          className="h-3.5 w-3.5 text-signal-ink"
                          aria-hidden="true"
                        />
                        Urban Shell was not named
                      </p>
                    </div>
                    <div className="border-b border-black/12 p-5 sm:border-b-0 sm:border-r">
                      <p className="font-display text-[10px] font-semibold uppercase tracking-[0.08em] text-black/44">
                        Google AI Mode
                      </p>
                      <p className="mt-4 text-[14px] font-semibold text-ink-deep">
                        Urban Shell · RidgeNorth · Norra
                      </p>
                      <p className="mt-2 flex items-center gap-2 text-[12px] text-black/58">
                        <Check
                          className="h-3.5 w-3.5 text-[#1a6b43]"
                          aria-hidden="true"
                        />
                        Urban Shell was named
                      </p>
                    </div>
                    <div className="p-5">
                      <p className="font-display text-[10px] font-semibold uppercase tracking-[0.08em] text-black/44">
                        Copilot
                      </p>
                      <p className="mt-4 text-[14px] font-semibold text-ink-deep">
                        Westpeak · Norra · RidgeNorth
                      </p>
                      <p className="mt-2 flex items-center gap-2 text-[12px] text-black/58">
                        <X
                          className="h-3.5 w-3.5 text-signal-ink"
                          aria-hidden="true"
                        />
                        Urban Shell was not named
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(16rem,0.65fr)]">
                  <div className="border border-black/16 bg-white">
                    <div className="flex items-center justify-between gap-4 border-b border-black/12 px-5 py-4">
                      <div>
                        <p className="font-display text-[10px] font-semibold uppercase tracking-[0.08em] text-black/44">
                          Product page · illustrative example
                        </p>
                        <p className="mt-1 text-[16px] font-semibold text-ink-deep">
                          Urban Shell Jacket
                        </p>
                      </div>
                      <span className="border border-black/16 px-2 py-1 font-display font-semibold text-[10px] uppercase tracking-[0.08em] text-black/48">
                        In stock
                      </span>
                    </div>
                    <div className="grid sm:grid-cols-2">
                      {CHOICE_EVIDENCE.map(
                        ([question, answer, present], index) => (
                          <div
                            key={question}
                            className={`p-5 ${index % 2 === 0 ? "sm:border-r" : ""} ${index < 2 ? "border-b border-black/12" : ""}`}
                          >
                            <p className="text-[13px] leading-[1.5] text-black/60">
                              {question}
                            </p>
                            <p
                              className={`mt-2 flex items-center gap-2 text-[14px] font-semibold ${present ? "text-ink-deep" : "text-signal-ink"}`}
                            >
                              {present ? (
                                <Check
                                  className="h-3.5 w-3.5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <X className="h-3.5 w-3.5" aria-hidden="true" />
                              )}
                              {answer}
                            </p>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                  <div className="border border-black/16 bg-[#fff9e8] p-6">
                    <p className="font-display text-[10px] font-semibold uppercase tracking-[0.08em] text-black/44">
                      The gap
                    </p>
                    <p className="mt-4 text-[17px] font-semibold leading-snug text-ink-deep">
                      Your product is relevant, but two of three assistants
                      leave it out.
                    </p>
                    <p className="mt-4 text-[13px] leading-[1.65] text-black/58">
                      Beseam keeps the answer and product evidence together.
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
          <Reveal delay={0.04}>
            <article className="grid gap-8 border-b border-black/14 py-10 lg:grid-cols-[minmax(14rem,0.42fr)_minmax(0,1fr)] lg:gap-16 lg:py-14">
              <StepHeader number="02" title="Prepare">
                <p>Test competing explanations before acting.</p>
              </StepHeader>

              <div className="grid gap-px border border-black/14 bg-black/14 sm:grid-cols-3">
                {EXPLANATIONS.map((item) => (
                  <article
                    key={item.title}
                    className={
                      item.active ? "bg-[#fff4ee] p-6" : "bg-white p-6"
                    }
                  >
                    <p
                      className={`font-display text-[10px] font-semibold uppercase tracking-[0.08em] ${item.active ? "text-signal-ink" : "text-black/42"}`}
                    >
                      {item.state}
                    </p>
                    <h3 className="mt-4 text-[16px] font-semibold leading-snug text-ink-deep">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-[13px] leading-[1.65] text-black/58">
                      {item.detail}
                    </p>
                  </article>
                ))}
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.04}>
            <article className="grid gap-8 border-b border-black/14 py-10 lg:grid-cols-[minmax(14rem,0.42fr)_minmax(0,1fr)] lg:gap-16 lg:py-14">
              <StepHeader number="03" title="Approve">
                <p>
                  Choose the next move, then review and approve the exact
                  change.
                </p>
              </StepHeader>

              <div className="space-y-6">
                <ActionsScreen />
                <div className="border border-black/16 bg-white">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/12 bg-ground px-5 py-4">
                    <div className="flex items-center gap-2">
                      <ShoppingBag
                        className="h-4 w-4 text-signal-ink"
                        aria-hidden="true"
                      />
                      <p className="text-[15px] font-semibold text-ink-deep">
                        Shopify changes prepared
                      </p>
                    </div>
                    <span className="border border-signal-ink/30 bg-signal-ink/[0.07] px-2.5 py-1 font-display text-[10px] font-semibold uppercase tracking-[0.09em] text-signal-ink">
                      Awaiting approval
                    </span>
                  </div>
                  <div className="grid gap-px bg-black/12 sm:grid-cols-2">
                    <div className="bg-white p-6">
                      <p className="font-display text-[10px] font-semibold uppercase tracking-[0.08em] text-black/44">
                        Product copy
                      </p>
                      <p className="mt-3 text-[15px] font-semibold text-ink-deep">
                        Add the commuting use case and waterproof context.
                      </p>
                      <p className="mt-2 text-[12px] leading-[1.6] text-black/56">
                        Urban Shell Jacket · product page
                      </p>
                    </div>
                    <div className="bg-white p-6">
                      <p className="font-display text-[10px] font-semibold uppercase tracking-[0.08em] text-black/44">
                        Fit guidance
                      </p>
                      <p className="mt-3 text-[15px] font-semibold text-ink-deep">
                        Explain how the jacket fits over everyday layers.
                      </p>
                      <p className="mt-2 text-[12px] leading-[1.6] text-black/56">
                        Previous value retained for review and rollback
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end border-t border-black/12 px-5 py-4">
                    <span className="bg-signal-ink px-4 py-2 text-[12px] font-semibold text-white">
                      Review changes
                    </span>
                  </div>
                </div>
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.04}>
            <article className="grid gap-8 py-10 lg:grid-cols-[minmax(14rem,0.42fr)_minmax(0,1fr)] lg:gap-16 lg:py-14">
              <StepHeader number="04" title="Measure">
                <p>Did more shoppers choose it?</p>
              </StepHeader>
              <div className="bg-ink-deep p-1">
                <ImpactScreen />
              </div>
            </article>
          </Reveal>
        </div>
        <Reveal delay={0.06}>
          <Link
            href="/platform"
            className="mt-10 inline-flex min-h-10 items-center gap-2 text-[14px] font-semibold text-ink-deep underline decoration-black/25 underline-offset-6 hover:decoration-signal-ink"
          >
            See how Beseam follows the decision beyond AI shopping
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
