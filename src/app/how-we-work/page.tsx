import Link from "next/link";

import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

import { BookReviewCta } from "@/components/beseam/book-review-cta";
import FaqGrid from "@/components/beseam/faq-grid";
import FirstMonthPromise from "@/components/beseam/first-month-promise";
import { Reveal } from "@/components/beseam/reveal";
import TrackedLink from "@/components/beseam/tracked-link";
import { buildPublicMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPublicMetadata({
  title: "How Beseam Works With Ecommerce Teams | Beseam",
  description:
    "See what happens after the first scan: what Beseam watches, what your team decides, how changes are approved, and how the same signals are checked again afterward.",
  path: "/how-we-work",
});

// /platform explains the machine. This page explains the working relationship:
// what happens after the first look, what Beseam handles, what the merchant
// decides, and the rules that keep customer-facing work under merchant control.
// Avoid repeating the platform capability map or turning this into an agency
// process page with invented week-by-week promises.

const CONTENTS = [
  { label: "What happens after you start", href: "#stages" },
  { label: "What Beseam handles, and what you decide", href: "#roles" },
  { label: "The rules we keep", href: "#rules" },
  { label: "Questions people ask", href: "#questions" },
] as const;

const STAGES = [
  {
    step: "01",
    label: "Start with a snapshot",
    title: "See what the public storefront says before you connect anything.",
    body: "The free scan reads the same public pages a shopper, search engine, or shopping agent can reach. No store login, no private data, and no changes. It gives you a concrete starting point instead of asking you to configure a platform before you know why you need it.",
    yours: "Your domain. That is enough to start.",
  },
  {
    step: "02",
    label: "Connect and set the rules",
    title: "Give Beseam the context it cannot learn from a page alone.",
    body: "Connect the store and define the boundaries: brand language, claims you will not make, products or fields that are off limits, and who can approve changes. Add analytics, behavior, search, or other data only when it makes a real decision better.",
    yours: "Access, constraints, and the people who can say yes or no.",
  },
  {
    step: "03",
    label: "Beseam keeps watching",
    title: "The checks continue without your team babysitting them.",
    body: "Beseam keeps asking the relevant shopper questions, checking product and store evidence, and reading connected behavior or outcome signals. It brings forward the things worth attention instead of asking you to inspect every source yourself.",
    yours: "Tell Beseam when priorities or business rules change.",
  },
  {
    step: "04",
    label: "A change reaches you",
    title: "You get a proposed change with the evidence already attached.",
    body: "You see what happened, what Beseam thinks is worth changing, the exact scope of the change, and why it is being proposed. Approve it, reject it, or leave it alone. Where the connection supports the change, Beseam can apply it after approval; otherwise the implementation is written out for whoever ships it.",
    yours:
      "A yes, a no, or a not-this-one. Customer-facing changes wait for you.",
  },
  {
    step: "05",
    label: "Check again",
    title: "The work is not finished when the change ships.",
    body: "Beseam checks the relevant signal again: the same shopper question, the same page or journey, or a before-and-after outcome when the data supports it. What moved, what stayed flat, and what remains uncertain become evidence for the next decision.",
    yours: "Nothing to manufacture. Flat results count too.",
  },
] as const;

const BESEAM_HANDLES = [
  "Run the recurring checks across the signals you have connected.",
  "Keep the original observation and supporting evidence together.",
  "Rank the findings that appear worth acting on first.",
  "Prepare the specific change and the reason behind it.",
  "Apply approved changes where the connection supports them.",
  "Re-check the relevant signal and keep the result with the work.",
] as const;

const YOU_DECIDE = [
  "What the brand will and will not say or do.",
  "Which systems and deeper data sources Beseam may use.",
  "Which products, fields, or journeys are off limits.",
  "Whether a customer-facing change is approved.",
  "When a business priority changes enough to override the normal ranking.",
] as const;

const ARTIFACTS = [
  {
    name: "The original signal",
    detail:
      "The shopper question, answer, page, journey, or outcome that started the work, kept in its original context.",
  },
  {
    name: "The evidence",
    detail:
      "What Beseam observed, which facts support it, and where an explanation is still only a hypothesis.",
  },
  {
    name: "The change and approval",
    detail:
      "The exact proposed change, what it affects, your decision, and what actually went live.",
  },
  {
    name: "The re-check",
    detail:
      "The same relevant signal checked again, with the before-and-after result attached to the change.",
  },
] as const;

const RULES = [
  [
    "Customer-facing changes wait for your approval.",
    "Monitoring, diagnosis, and re-checking can run in the background. Publishing does not quietly become autonomous.",
  ],
  [
    "Facts and hypotheses stay different.",
    "If the evidence shows what happened but not why, Beseam says that. A likely cause does not get promoted into a fact.",
  ],
  [
    "The comparison stays honest.",
    "The same question or relevant signal is checked again. Beseam does not swap in a friendlier test after the change.",
  ],
  [
    "Flat results are results.",
    "If the signal does not move, the record says so. The next decision starts from that evidence instead of hiding it.",
  ],
] as const;

const REFUSALS = [
  "Promise a ranking, recommendation, conversion lift, or revenue result we do not control.",
  "Claim a cause when the evidence only supports a possible explanation.",
  "Hide the underlying evidence behind a single score when you need to inspect it.",
  "Publish a customer-facing change outside the approval rules you set.",
] as const;

const FAQS = [
  {
    question: "Can Beseam make a change without us approving it?",
    answer:
      "Customer-facing changes follow the approval rules you set. Beseam can keep monitoring, gathering evidence, and preparing work without waiting for you, but a change that requires approval does not go live until it has it.",
  },
  {
    question: "How much work does my team have to do?",
    answer:
      "Your team sets the boundaries, gives Beseam the access it needs, and makes the decisions that require judgment. Beseam handles recurring checks, evidence gathering, prioritization, proposed work, supported implementation after approval, and re-checking.",
  },
  {
    question: "How soon do we get the first change?",
    answer:
      "As soon as there is a finding worth acting on and enough context to propose a responsible change. Beseam does not manufacture an edit just to make onboarding look busy.",
  },
  {
    question: "What if we say no to a change?",
    answer:
      "It does not ship. The rejection remains part of the work record, and the decision becomes context for future work instead of the same unsuitable idea returning as if nothing was learned.",
  },
  {
    question: "Is this an agency or a managed service?",
    answer:
      "Beseam is software. It keeps monitoring, evidence, proposed work, approvals, execution where supported, and measurement connected. Setup can be hands-on because the rules matter, but the product is designed to reduce ongoing manual coordination rather than create a consulting dependency.",
  },
  {
    question: "What if a change does not help?",
    answer:
      "Then the re-check should show that. Beseam keeps the flat or uncertain result next to the change and uses it as evidence for what to revisit or investigate next rather than turning every completed change into a success story.",
  },
] as const;

function ResponsibilityList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-7 border-t border-black/14">
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-3 border-b border-black/12 py-4 text-[14.5px] leading-[1.62] text-black/68"
        >
          <span
            aria-hidden
            className="mt-[0.7em] h-px w-3 shrink-0 bg-signal-ink"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function HowWeWorkPage() {
  return (
    <>
      <section className="border-b border-black/14 bg-ground">
        <div className="mx-auto max-w-[92rem] px-5 pb-14 pt-20 sm:px-8 sm:pb-16 sm:pt-24 lg:px-10 lg:pb-20 lg:pt-28">
          <nav
            aria-label="Breadcrumb"
            className="text-[13px] text-muted-foreground"
          >
            <Link href="/" className="hover:text-signal-ink">
              Beseam
            </Link>
            <span aria-hidden className="mx-2">
              /
            </span>
            <span>How we work</span>
          </nav>

          <Reveal>
            <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.8fr)] lg:items-end lg:gap-20">
              <div>
                <h1 className="max-w-[15ch] text-balance font-display text-[clamp(3rem,5.8vw,5rem)] font-normal leading-[0.98] tracking-[-0.03em] text-ink-deep">
                  Beseam does the checking. You make the decisions.
                </h1>
              </div>
              <div>
                <p className="max-w-[52ch] text-[18px] leading-[1.7] text-black/66 [text-wrap:pretty]">
                  Beseam runs the recurring checks, brings you the evidence and
                  the exact next change, waits for your approval when customers
                  will see it, then checks what happened afterward.
                </p>
                <p className="mt-4 max-w-[52ch] text-[18px] leading-[1.7] text-ink-deep">
                  Your team steps in for decisions, not repetitive checking.
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <TrackedLink
                    href="/scan"
                    eventName="how_we_work_scan_clicked"
                    eventCategory="conversion"
                    placement="how_we_work_hero"
                    className="group inline-flex min-h-12 items-center justify-center gap-2 bg-signal-ink px-6 text-[15px] font-semibold text-white"
                  >
                    Scan my store
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </TrackedLink>
                  <Link
                    href="/platform"
                    className="group inline-flex min-h-12 items-center gap-2 px-1 text-[15px] font-semibold text-ink-deep underline decoration-black/25 underline-offset-[6px] hover:decoration-signal-ink"
                  >
                    See the platform
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <nav
              aria-label="On this page"
              className="mt-14 border-t border-black/16 pt-4"
            >
              <ol className="grid gap-px bg-black/10 sm:grid-cols-2 lg:grid-cols-4">
                {CONTENTS.map((item, index) => (
                  <li key={item.href} className="bg-ground">
                    <a
                      href={item.href}
                      className="group flex h-full items-baseline gap-3 py-4 pr-4 text-[14px] leading-[1.45] text-black/62 transition-colors hover:text-signal-ink lg:pr-6"
                    >
                      <span className="font-mono text-[11px] tabular-nums text-black/35 transition-colors group-hover:text-signal-ink">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="max-w-[24ch]">{item.label}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </Reveal>
        </div>
      </section>

      <section
        id="stages"
        className="scroll-mt-24 border-b border-white/12 bg-ink-deep text-white"
      >
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-end lg:gap-20">
              <h2 className="max-w-[15ch] text-balance font-display text-[clamp(2.2rem,3.8vw,3.6rem)] font-normal leading-[1.04] tracking-[-0.025em]">
                What happens after you start.
              </h2>
              <p className="max-w-[52ch] self-end text-[17px] leading-[1.75] text-white/68 [text-wrap:pretty]">
                Start with what is public. Connect more only when it helps. From
                there, Beseam keeps checking until there is something worth your
                decision.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <ol className="mt-14">
              {STAGES.map((stage, index) => {
                const last = index === STAGES.length - 1;
                return (
                  <li
                    key={stage.step}
                    className="relative grid gap-6 border-t border-white/14 py-10 pl-7 sm:pl-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.55fr)] lg:gap-16"
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute left-0 top-0 w-px bg-white/14 ${last ? "h-10" : "h-full"}`}
                    />
                    <span
                      aria-hidden="true"
                      className={`absolute -left-[3px] top-[38px] h-[7px] w-[7px] ${
                        last ? "border border-signal bg-ink-deep" : "bg-signal"
                      }`}
                    />
                    <div>
                      <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.12em] text-signal">
                        <span className="tabular-nums">{stage.step}</span>
                        <span className="text-white/45">{stage.label}</span>
                      </p>
                      <h3 className="mt-5 max-w-[29ch] text-balance text-[clamp(1.25rem,1.7vw,1.55rem)] font-semibold leading-[1.25] tracking-[-0.015em] text-white">
                        {stage.title}
                      </h3>
                      <p className="mt-4 max-w-[64ch] text-[15px] leading-[1.75] text-white/62 [text-wrap:pretty]">
                        {stage.body}
                      </p>
                    </div>
                    <div className="lg:pt-[3.25rem]">
                      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/38">
                        What we need from you
                      </p>
                      <p className="mt-3 max-w-[32ch] border-l border-white/20 pl-4 text-[14.5px] leading-[1.6] text-white/82">
                        {stage.yours}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-8 border-t border-white/16 pt-8">
              <div className="grid gap-5 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:items-end lg:gap-16">
                <h3 className="max-w-[18ch] font-display text-[clamp(1.8rem,2.6vw,2.5rem)] font-normal leading-[1.08] tracking-[-0.02em] text-white">
                  Every change keeps its history.
                </h3>
                <p className="max-w-[50ch] text-[14.5px] leading-[1.7] text-white/58">
                  You should be able to open a change later and see why it
                  existed, what you approved, and what happened next without
                  reconstructing the story from separate tools.
                </p>
              </div>
              <div className="mt-7 grid gap-px border border-white/14 bg-white/14 sm:grid-cols-2 lg:grid-cols-4">
                {ARTIFACTS.map((item, index) => (
                  <article key={item.name} className="bg-ink-deep px-5 py-6">
                    <p className="font-mono text-[10px] tabular-nums tracking-[0.1em] text-signal">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h4 className="mt-3 text-[15px] font-semibold leading-[1.35] text-white">
                      {item.name}
                    </h4>
                    <p className="mt-2 text-[12.75px] leading-[1.6] text-white/54">
                      {item.detail}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        id="roles"
        className="scroll-mt-24 border-b border-black/14 bg-ground-2"
      >
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-end lg:gap-20">
              <h2 className="max-w-[16ch] text-balance font-display text-[clamp(2.1rem,3.4vw,3.3rem)] font-normal leading-[1.05] tracking-[-0.025em] text-ink-deep">
                Automate the checking, not the judgment.
              </h2>
              <p className="max-w-[50ch] self-end text-[16px] leading-[1.7] text-black/62 [text-wrap:pretty]">
                Beseam should remove repetitive checking and assembly work, not
                quietly take over decisions that belong to the brand.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-12 grid gap-px border border-black/12 bg-black/12 lg:grid-cols-2">
              <article className="bg-white px-6 py-8 sm:px-8 sm:py-9">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-signal-ink">
                  Beseam handles
                </p>
                <h3 className="mt-4 max-w-[20ch] text-[22px] font-semibold leading-[1.28] tracking-[-0.015em] text-ink-deep">
                  The recurring work around the decision.
                </h3>
                <ResponsibilityList items={BESEAM_HANDLES} />
              </article>
              <article className="bg-white px-6 py-8 sm:px-8 sm:py-9">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-signal-ink">
                  You decide
                </p>
                <h3 className="mt-4 max-w-[20ch] text-[22px] font-semibold leading-[1.28] tracking-[-0.015em] text-ink-deep">
                  The boundaries and choices only the brand can own.
                </h3>
                <ResponsibilityList items={YOU_DECIDE} />
              </article>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        id="rules"
        className="scroll-mt-24 border-b border-black/14 bg-white"
      >
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-0">
            <Reveal>
              <div className="lg:pr-16">
                <h2 className="max-w-[18ch] text-balance font-display text-[clamp(2.1rem,3.4vw,3.3rem)] font-normal leading-[1.05] tracking-[-0.025em] text-ink-deep">
                  The rules matter most when the answer is not obvious.
                </h2>
                <div className="mt-10 border-t border-black/16">
                  {RULES.map(([rule, detail]) => (
                    <div key={rule} className="border-b border-black/12 py-7">
                      <p className="max-w-[30ch] text-balance font-display text-[clamp(1.4rem,2vw,1.9rem)] font-normal leading-[1.18] tracking-[-0.02em] text-ink-deep">
                        {rule}
                      </p>
                      <p className="mt-3 max-w-[50ch] text-[15px] leading-[1.7] text-black/58 [text-wrap:pretty]">
                        {detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <div className="lg:border-l lg:border-black/14 lg:pl-16">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-signal-ink">
                  What Beseam will not do
                </p>
                <ul className="mt-8 border-t border-black/16">
                  {REFUSALS.map((line) => (
                    <li
                      key={line}
                      className="flex gap-4 border-b border-black/12 py-6 text-[15.5px] leading-[1.65] text-black/70 [text-wrap:pretty]"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[0.7em] h-px w-4 shrink-0 bg-signal-ink"
                      />
                      <span className="max-w-[42ch]">{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <FaqGrid
        id="questions"
        heading="Questions teams ask before handing over access."
        intro={
          <>
            <p>
              The short version: start public, add access deliberately, and keep
              customer-facing decisions under your control.
            </p>
            <p className="mt-5 font-semibold text-ink-deep">
              Want to walk through one product with us?
            </p>
            <p className="mt-2">
              Twenty minutes, live. Bring a product or question you think should
              be performing better.
            </p>
          </>
        }
        action={
          <BookReviewCta
            variant="primary"
            location="how_we_work_faq"
            label="Book the 20-minute review"
          />
        }
        items={FAQS}
      />

      <FirstMonthPromise />
    </>
  );
}
