import Link from "next/link";

import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

import { BookReviewCta } from "@/components/beseam/book-review-cta";
import FirstMonthPromise from "@/components/beseam/first-month-promise";
import { Reveal } from "@/components/beseam/reveal";
import { buildPublicMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPublicMetadata({
  title: "How We Work With Ecommerce Brands",
  description:
    "What the first few weeks look like, what you end up with, the rules we keep, and what we will not do. Nothing customers see goes live without your yes.",
  path: "/how-we-work",
});

// This page is the working relationship, not the machine. The machine is drawn
// twice already -- the connected map on the homepage (`#system`) and the
// capability acts on `/platform` -- so the loop rail and loop diagram that used
// to live here were a third telling of the same thing and are gone.
//
// The spine is the one that recurs across the pages that do this well (Decagon's
// week-by-week rollout, Retool's Day 1/30/60/90 guide, Sanity's "a technical
// team assigned to you", Work & Co's named principles, Cub Studio's objection
// FAQ placed where the steps end): name the tradeoff, put a calendar on the
// relationship, name what the merchant ends up with, give the rules ownable
// names rather than category labels, say the refusals plainly, then answer the
// questions that kill deals.
//
// Copy register: how a person talks. Contractions, short sentences, no literary
// constructions. The earlier draft avoided every contraction and read like a
// brochure -- that was the tell.
//
// Composition: every act used to be the same two-column slab, so the page had
// one rhythm and no centre. The hero now carries a contents rail, the calendar
// is the one drawn thing (a rail with ticks, the last tick hollow where the
// work hands itself over), rules and refusals are a diptych rather than two
// more slabs, and the review CTA rides inside the FAQ instead of taking a band
// of its own in front of the closing promise.
//
// Two things are deliberately absent. There is no worked example with invented
// questions or fabricated competitors -- the site's rule is that evidence is
// real or it is not shown, and a made-up transcript on a page arguing for
// attached evidence is self-defeating. And no trial length is stated: billing
// configures none, so the promise is the one `first-month-promise.tsx` makes.

const CONTENTS = [
  { label: "What the first weeks look like", href: "#weeks" },
  { label: "What you end up with", href: "#hold" },
  { label: "What we will and will not do", href: "#rules" },
  { label: "Questions people ask", href: "#questions" },
] as const;

// The calendar. Labelled by event rather than day count: the only duration on
// this page that is a promise is the twenty minutes, because it is the only one
// we control end to end.
const STAGES = [
  {
    when: "The first call",
    title: "Twenty minutes, your store, live.",
    body: "Pick one product that should be selling and isn't. We look at it with you and tell you what we find. If you don't need us, we'll say so.",
    from: "Nothing. No connection, no contract.",
  },
  {
    when: "The first week",
    title: "Your rules come before your catalogue.",
    body: "We connect your store with read-only access and agree what's off limits: the words you own, the claims you can't make, the products nobody touches. Nothing customers see changes this week.",
    from: "Read-only access, and an hour with someone who can answer brand questions.",
  },
  {
    when: "The first change",
    title: "One change, written out, with the proof behind it.",
    body: "You see the question a shopper asked, the answer they got, what we found behind it, the exact change, and what we think it'll do. You say yes, no, or not this one. We make the changes your store lets us make and write up the rest, so your developer isn't left guessing.",
    from: "A yes, a no, or a not this one.",
  },
  {
    when: "After it ships",
    title: "We ask the same questions again.",
    body: "Same questions, same places, and we put the answers side by side. Some changes move things. Some don't, and you hear about those too, with the evidence and what we think we got wrong.",
    from: "Nothing. That part's on us.",
  },
  {
    when: "By month three",
    title: "Less of this should reach you.",
    body: "The early weeks are hands-on on purpose. Every call we make by hand teaches us what your brand allows. Once the patterns repeat, more of it runs without asking you. If we're still doing week-one work in month six, we got something wrong.",
    from: "Fewer decisions than the month before.",
  },
] as const;

const ARTIFACTS = [
  {
    name: "The question and the answer",
    detail:
      "Kept whole, not squashed into a score. You can read the answer your product got left out of.",
  },
  {
    name: "The change, written out",
    detail:
      "The field, what it said, what it says now, and why. Easy to undo, easy to hand to whoever ships it.",
  },
  {
    name: "Before and after",
    detail:
      "The same questions asked again and set side by side, with the date they were asked.",
  },
  {
    name: "What you approved",
    detail:
      "What you said yes to, when, and what went live because of it. Yours to export.",
  },
] as const;

const RULES = [
  [
    "Nothing goes live without your yes.",
    "Not once. Not to save time. Not because the change looked obvious.",
  ],
  [
    "We ask the same question again.",
    "The original question, rerun. Never a friendlier one swapped in afterwards.",
  ],
  [
    "You hear about the flops too.",
    "If a change did nothing, we tell you it did nothing.",
  ],
] as const;

const REFUSALS = [
  "Say we know the cause when the evidence only points at it. A guess gets called a guess.",
  "Promise you a spot in an answer. Nobody controls that, us included.",
  "Put a score in front of you instead of what it's made of.",
  "Charge you before you've seen it do something.",
] as const;

const FAQS = [
  {
    question: "What do you need access to?",
    answer:
      "Read-only access to your store to start. The first look needs nothing at all: the public scan reads what any shopper can already see, with no login and nothing private.",
  },
  {
    question: "How long before the first change?",
    answer:
      "The first week goes on rules and access, not edits. The first change reaches you once there's something worth changing and we know what you won't allow. One you'll approve beats three you have to police.",
  },
  {
    question: "Who does the work if it needs a developer?",
    answer:
      "We make the changes your store connection allows, once you've approved them. Anything else you get written out — the field, the value, the reason — so your developer or agency is shipping it, not working it out.",
  },
  {
    question: "What if we say no to a change?",
    answer:
      "It doesn't ship. The reason goes into your rules, so the same idea doesn't come back next month with different wording.",
  },
  {
    question: "What does it cost?",
    answer:
      "You start free and pay once it's proved it's worth it. One subscription instead of a tool plus an agency, and we don't take a cut of your ad spend.",
  },
  {
    question: "What if nothing we change moves anything?",
    answer:
      "Then you'll see that, in the rerun, with the date on it. We'd rather show you a flat line than a score that hides one. You decide what that's worth.",
  },
] as const;

export default function HowWeWorkPage() {
  return (
    <>
      <section className="border-b border-black/14 bg-ground">
        <div className="mx-auto max-w-[92rem] px-5 pb-14 pt-20 sm:px-8 sm:pb-16 sm:pt-24 lg:px-10 lg:pb-20 lg:pt-28">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.8fr)] lg:items-end lg:gap-20">
              <div>
                <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-signal-ink">
                  How we work
                </p>
                <h1 className="mt-6 max-w-[14ch] text-balance font-display text-[clamp(3rem,5.8vw,5rem)] font-normal leading-[0.98] tracking-[-0.03em] text-ink-deep">
                  Finding it was never the hard part.
                </h1>
              </div>
              <div>
                <p className="max-w-[52ch] text-[18px] leading-[1.7] text-black/66 [text-wrap:pretty]">
                  Most tools hand you a list and stop. Someone still has to
                  write the change, get it signed off, ship it, and check
                  afterwards whether it did anything.
                </p>
                <p className="mt-4 max-w-[52ch] text-[18px] leading-[1.7] text-ink-deep">
                  That&rsquo;s the part we do with you.
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <BookReviewCta
                    variant="primary"
                    location="how_we_work_hero"
                    label="Book the 20-minute review"
                  />
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

          {/* A contents rail rather than a scroll of surprises: four promises,
              and the page keeps them in this order. */}
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
                      className="group flex h-full items-baseline gap-3 py-4 pr-4 text-[14px] leading-[1.45] text-black/62 transition-colors hover:text-signal-ink sm:pr-8"
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

      {/* The calendar is the centre of the page and the one thing a visitor
          cannot get from `/platform`: what happens, in what order, and what it
          costs them at each step. The last tick is hollow -- by then the work
          should be running without anyone asking. */}
      <section
        id="weeks"
        className="scroll-mt-24 border-b border-white/12 bg-ink-deep text-white"
      >
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-end lg:gap-20">
              <h2 className="max-w-[15ch] text-balance font-display text-[clamp(2.2rem,3.8vw,3.6rem)] font-normal leading-[1.04] tracking-[-0.025em]">
                What the first weeks look like.
              </h2>
              <p className="max-w-[52ch] self-end text-[17px] leading-[1.75] text-white/68 [text-wrap:pretty]">
                No onboarding project, no eight-week discovery. This is the
                order things happen in, and the note next to each step is
                everything it costs you.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <ol className="mt-14">
              {STAGES.map((stage, index) => {
                const last = index === STAGES.length - 1;
                return (
                  <li
                    key={stage.when}
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
                        <span className="tabular-nums">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-white/45">{stage.when}</span>
                      </p>
                      <h3 className="mt-5 max-w-[26ch] text-balance text-[clamp(1.25rem,1.7vw,1.55rem)] font-semibold leading-[1.25] tracking-[-0.015em] text-white">
                        {stage.title}
                      </h3>
                      <p className="mt-4 max-w-[58ch] text-[15px] leading-[1.75] text-white/62 [text-wrap:pretty]">
                        {stage.body}
                      </p>
                    </div>
                    <div className="lg:pt-[3.25rem]">
                      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/38">
                        What it costs you
                      </p>
                      <p className="mt-3 max-w-[30ch] border-l border-white/20 pl-4 text-[14.5px] leading-[1.6] text-white/82">
                        {stage.from}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </Reveal>
        </div>
      </section>

      <section
        id="hold"
        className="scroll-mt-24 border-b border-black/14 bg-ground-2"
      >
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-end lg:gap-20">
              <h2 className="max-w-[15ch] text-balance font-display text-[clamp(2.1rem,3.4vw,3.3rem)] font-normal leading-[1.05] tracking-[-0.025em] text-ink-deep">
                What you end up with.
              </h2>
              <p className="max-w-[48ch] self-end text-[16px] leading-[1.7] text-black/62 [text-wrap:pretty]">
                Not a dashboard you have to remember to log into. Four things
                you can forward to a developer, a buyer or your board as they
                are.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-12 grid gap-px border border-black/12 bg-black/12 sm:grid-cols-2 lg:grid-cols-4">
              {ARTIFACTS.map((item, index) => (
                <article
                  key={item.name}
                  className="flex flex-col bg-panel-white px-6 py-8 sm:px-7 sm:py-9"
                >
                  <p className="font-mono text-[11px] tabular-nums tracking-[0.1em] text-signal-ink">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 max-w-[18ch] text-balance text-[18px] font-semibold leading-[1.3] tracking-[-0.01em] text-ink-deep">
                    {item.name}
                  </h3>
                  <p className="mt-3 text-[14.5px] leading-[1.7] text-black/60 [text-wrap:pretty]">
                    {item.detail}
                  </p>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Rules and refusals as one diptych: the promise and its cost belong on
          the same spread, and two more stacked slabs was the thing that made
          the page feel generated. */}
      <section
        id="rules"
        className="scroll-mt-24 border-b border-black/14 bg-white"
      >
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-0">
            <Reveal>
              <div className="lg:pr-16">
                <h2 className="max-w-[18ch] text-balance font-display text-[clamp(2.1rem,3.4vw,3.3rem)] font-normal leading-[1.05] tracking-[-0.025em] text-ink-deep">
                  Three rules we keep on the bad weeks.
                </h2>
                <div className="mt-10 border-t border-black/16">
                  {RULES.map(([rule, detail]) => (
                    <div key={rule} className="border-b border-black/12 py-7">
                      <p className="max-w-[26ch] text-balance font-display text-[clamp(1.45rem,2.1vw,1.95rem)] font-normal leading-[1.18] tracking-[-0.02em] text-ink-deep">
                        {rule}
                      </p>
                      <p className="mt-3 max-w-[46ch] text-[15px] leading-[1.7] text-black/58 [text-wrap:pretty]">
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
                  And what we will not do
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
                      <span className="max-w-[40ch]">{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section
        id="questions"
        className="scroll-mt-24 border-b border-black/14 bg-ground"
      >
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.62fr)_minmax(0,1.38fr)] lg:gap-20">
              <div>
                <h2 className="max-w-[16ch] text-balance font-display text-[clamp(2rem,3.2vw,3rem)] font-normal leading-[1.06] tracking-[-0.025em] text-ink-deep">
                  The questions people actually ask.
                </h2>
                <p className="mt-5 max-w-[32ch] text-[15px] leading-[1.7] text-black/60">
                  Better answered here than on the third call.
                </p>

                <div className="mt-10 border-t border-black/16 pt-8">
                  <p className="max-w-[30ch] text-[17px] font-semibold leading-[1.5] tracking-[-0.01em] text-ink-deep">
                    Pick one product that should be selling and isn&rsquo;t.
                  </p>
                  <p className="mt-3 max-w-[34ch] text-[14.5px] leading-[1.65] text-black/60">
                    Twenty minutes, live. You keep what we find either way.
                  </p>
                  <div className="mt-6">
                    <BookReviewCta
                      variant="primary"
                      location="how_we_work_faq"
                      label="Book the 20-minute review"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-black/16">
                {FAQS.map((faq) => (
                  <details
                    key={faq.question}
                    className="group border-b border-black/14"
                  >
                    <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 text-[16.5px] font-semibold tracking-[-0.01em] text-ink-deep transition-colors marker:content-none hover:text-signal-ink focus-visible:ring-2 focus-visible:ring-signal-ink">
                      {faq.question}
                      <span
                        aria-hidden="true"
                        className="flex h-7 w-7 shrink-0 items-center justify-center border border-black/20 text-[18px] font-normal text-signal-ink transition-transform duration-300 ease-out group-open:rotate-45 motion-reduce:transition-none"
                      >
                        +
                      </span>
                    </summary>
                    <p className="max-w-[66ch] pb-7 pr-10 text-[15px] leading-[1.72] text-black/64 [text-wrap:pretty]">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <FirstMonthPromise />
    </>
  );
}
