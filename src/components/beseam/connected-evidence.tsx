import type { CSSProperties, ReactNode } from "react";

import { ArrowRight, X } from "lucide-react";

import { Reveal } from "@/components/beseam/reveal";
import { SequenceReveal } from "@/components/beseam/sequence-reveal";
import { getDictionary, type Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/locale-rules.mjs";

/**
 * The trace forks on purpose. A single-file chain shows a story any tool could
 * tell; showing the two explanations that were checked and ruled out is the
 * part a merchant cannot get anywhere else, and it is what separates an
 * observation from an assertion.
 *
 * Drawn as a graph, not a table. The two searches enter from the top and
 * converge on what the shopper did next; that node forks into the three
 * explanations. Only the node that survives gets a plate, so the eye lands on
 * it first.
 *
 * The accent runs the whole live path — query, query, what happened next, the
 * explanation that held, the change, the proof — so the circuit reads as one
 * continuous thing. The two branches that failed are dashed, grey, and end on a
 * cross.
 *
 * The three branches must stay independent explanations of the same signal. An
 * earlier draft asked whether search returned nothing for the added word, which
 * is not an alternative at all — it is what the confirmed cause produces, so it
 * could never be ruled out. If this example is ever reworded, check that each
 * branch could be true while the other two are false.
 *
 * Everything below is schematic and labelled as such. It carries no counts,
 * percentages, or store names: a fabricated figure would read as a case study,
 * and manufactured evidence is the one thing this product must never show.
 * Replace with a real scan when one is cleared for publication.
 */
/**
 * Which branch held is structure, not copy: it decides the colour, the plate
 * and the wire, so it stays here while the words come from the dictionary.
 * Translating a branch can never move the cause to a different one.
 */
type CandidateCopy = { domain: string; claim: string; why: string };
type CauseCandidate = CandidateCopy & { cause: true };
type RuledOut = CandidateCopy & { verdict: string; cause: false };
type Candidate = CauseCandidate | RuledOut;

function candidatesFor(t: Dictionary): readonly Candidate[] {
  const candidates = t.sections.proof.candidates;
  return [
    { ...candidates.onsiteSearch, cause: false },
    { ...candidates.productPages, cause: true },
    { ...candidates.availability, cause: false },
  ];
}

type MobileFinding = {
  domain: string;
  finding: string;
  detail: string;
  issue: boolean;
};

function mobileFindingsFor(t: Dictionary): readonly MobileFinding[] {
  const findings = t.sections.proof.mobile.findings;
  return [
    { ...findings.onsiteSearch, issue: false },
    { ...findings.productPages, issue: true },
    { ...findings.availability, issue: false },
  ];
}

/**
 * Edges land on the centre of each node. Two columns with a 1.5rem gap put the
 * first centre at (100% - 1.5rem) / 4; three columns with a 3.5rem gap put it
 * at (100% - 7rem) / 6. Change a gap and this has to change with it.
 */
const QUERY_EDGE = "calc((100% - 1.5rem) / 4)";
const BRANCH_EDGE = "calc((100% - 7rem) / 6)";
const ACCENT = "#e8653a";

/**
 * The live path is drawn twice: a dimmed rail that holds the shape, and dashes
 * that march along it (`.trace-flow-*` in globals.css) so the trace reads as a
 * run in progress rather than a finished picture. Only the live path moves --
 * the two ruled-out branches stay static dashed grey, because a wire that ends
 * on a cross should not look like it is still carrying anything.
 *
 * Each overlay covers a straight run and stops 1rem short of the corner, which
 * is the `rounded-*-2xl` radius: change the radius and the `-4` insets move
 * with it. The 1px offsets that sit an overlay on the border rather than beside
 * it are inline: Tailwind emits neither `-left-px` nor `left-[-1px]` here, and
 * a missing inset silently parks the overlay at the elbow's static position
 * instead -- which is how the first cut ended up floating above the wire.
 */
const ACCENT_RAIL = `color-mix(in srgb, ${ACCENT} 34%, transparent)`;

function StepLabel({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-white/56">
      {children}
    </p>
  );
}

function NodeDot({
  tone = "live",
}: {
  /** live = on the path, cause = the node that held, dead = ruled out */
  tone?: "live" | "cause" | "dead";
}) {
  const style =
    tone === "cause"
      ? "bg-signal ring-4 ring-signal/20"
      : tone === "live"
        ? "bg-signal"
        : "border border-white/40 bg-ink-deep";
  return (
    <span
      aria-hidden="true"
      className={`block h-2.5 w-2.5 rounded-full ${style}`}
    />
  );
}

/** The two searches drop and converge on what happened next. */
function Converge() {
  return (
    <div aria-hidden="true" className="relative hidden h-14 lg:block">
      <span
        className="absolute bottom-6 top-0 rounded-bl-2xl border-b border-l"
        style={{ left: QUERY_EDGE, right: "50%", borderColor: ACCENT_RAIL }}
      >
        <span
          className="trace-flow-down absolute bottom-4 top-0 w-px"
          style={{ left: -1 }}
        />
        <span
          className="trace-flow-right absolute left-4 right-0 h-px"
          style={{ bottom: -1 }}
        />
      </span>
      <span
        className="absolute bottom-6 top-0 rounded-br-2xl border-b border-r"
        style={{ left: "50%", right: QUERY_EDGE, borderColor: ACCENT_RAIL }}
      >
        <span
          className="trace-flow-down absolute bottom-4 top-0 w-px"
          style={{ right: -1 }}
        />
        <span
          className="trace-flow-right trace-flow-back absolute left-0 right-4 h-px"
          style={{ bottom: -1 }}
        />
      </span>
      <span
        className="trace-flow-down absolute bottom-0 left-1/2 top-8 w-px"
        style={{ backgroundColor: ACCENT_RAIL }}
      />
    </div>
  );
}

/** One node in, three explanations out. */
function Fork() {
  return (
    <div aria-hidden="true" className="relative hidden h-16 lg:block">
      <span
        className="trace-flow-down absolute left-1/2 top-0 h-7 w-px"
        style={{ backgroundColor: ACCENT_RAIL }}
      />
      <span
        className="absolute bottom-0 top-7 rounded-tl-2xl border-l border-t border-dashed border-white/28"
        style={{ left: BRANCH_EDGE, right: "50%" }}
      />
      <span
        className="absolute bottom-0 top-7 rounded-tr-2xl border-r border-t border-dashed border-white/28"
        style={{ left: "50%", right: BRANCH_EDGE }}
      />
      <span
        className="trace-flow-down absolute bottom-0 left-1/2 top-7 w-px"
        style={{ backgroundColor: ACCENT_RAIL }}
      />
    </div>
  );
}

/**
 * The two ruled-out branches already end on the cross in their own chip, so
 * nothing carries past them here. Only the observed one runs on to the change.
 */
function Tails() {
  return (
    <div aria-hidden="true" className="relative hidden h-14 lg:block">
      <span
        className="trace-flow-down absolute inset-y-0 left-1/2 w-px"
        style={{ backgroundColor: ACCENT_RAIL }}
      />
    </div>
  );
}

/**
 * A ruled-out branch collapses to its verdict.
 *
 * Three equal cards asked a first-time reader to take in three explanations
 * before knowing which one mattered, and the two that did not matter were the
 * longest to read. The chip states the verdict; the hypothesis and the evidence
 * that killed it are one hover -- or one tap, which is why the chip is a button
 * and `.branch-detail` answers to `:focus-within` too -- away. Nothing is
 * deleted: the fork still shows that two explanations were checked and closed.
 *
 * The panel is absolutely positioned so opening it cannot move the graph.
 */
function RuledOutBranch({
  item,
  seqRow,
  ruledOutLabel,
}: {
  item: RuledOut;
  seqRow: number;
  ruledOutLabel: string;
}) {
  return (
    <div
      data-seq-row
      style={{ "--seq-row": seqRow } as CSSProperties}
      className="branch relative"
    >
      <button
        type="button"
        className="flex w-full items-center gap-2.5 border border-dashed border-white/25 px-4 py-3 text-left transition-colors hover:border-white/45 focus-visible:border-white/60 focus-visible:outline-none"
      >
        <X aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-white/40" />
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-white/44">
          {item.domain}
        </span>
        <span className="ml-auto text-[14px] leading-[1.4] text-white/60">
          {item.verdict}
        </span>
      </button>
      <div className="branch-detail absolute inset-x-0 top-full z-10 mt-2 border border-white/16 bg-ink-deep px-4 py-3.5">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-white/44">
          {ruledOutLabel}
        </p>
        <p className="mt-2 text-[13px] leading-[1.5] text-white/52 line-through decoration-white/28">
          {item.claim}
        </p>
        <p className="mt-1.5 text-[13px] leading-[1.6] text-white/72">
          {item.why}
        </p>
      </div>
    </div>
  );
}

function MobileTrace({ t }: { t: Dictionary }) {
  const proof = t.sections.proof;
  const findings = mobileFindingsFor(t);
  const issue = findings.find((item) => item.issue);
  const ruledOut = findings.filter((item) => !item.issue);

  return (
    <div className="lg:hidden">
      <div className="border-y border-white/14">
        <div className="py-5">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-[11px] font-semibold tabular-nums text-signal">
              01
            </span>
            <StepLabel>{proof.mobile.whatTheShopperDid}</StepLabel>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-[12px]">
            <span className="bg-white/[0.06] px-2 py-1 text-white/78">
              {proof.mobile.query}
            </span>
            <ArrowRight
              className="h-3.5 w-3.5 text-signal"
              aria-hidden="true"
            />
            <span className="bg-signal/[0.08] px-2 py-1 text-signal">
              {proof.mobile.refinement}
            </span>
          </div>
          <p className="mt-3 text-[15px] leading-[1.5] text-white/88">
            {proof.mobile.signal}
          </p>
        </div>

        <div className="border-t border-white/14 py-5">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-[11px] font-semibold tabular-nums text-signal">
              02
            </span>
            <StepLabel>{proof.strongestEvidence}</StepLabel>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {ruledOut.map((item) => (
              <span
                key={item.domain}
                className="bg-white/[0.05] px-2 py-1 text-[11px] text-white/48"
              >
                {item.finding}
              </span>
            ))}
          </div>
          {issue ? (
            <div className="mt-3 border-l-2 border-signal bg-signal/[0.07] px-4 py-3.5">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-signal">
                {issue.domain}
              </p>
              <p className="mt-1.5 text-[16px] font-medium leading-[1.4] text-white">
                {issue.finding}
              </p>
              <p className="mt-1 text-[12px] leading-[1.5] text-white/58">
                {issue.detail}
              </p>
            </div>
          ) : null}
        </div>

        <div className="border-t border-white/14 py-5">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-[11px] font-semibold tabular-nums text-signal">
              03
            </span>
            <StepLabel>{proof.proposedChange}</StepLabel>
          </div>
          <p className="mt-3 text-[15px] font-medium leading-[1.5] text-white/90">
            {proof.change}
          </p>
          <div className="mt-4 flex items-center gap-2 text-[11px] font-semibold text-white/80">
            <span>{proof.approve}</span>
            <ArrowRight
              className="h-3 w-3 shrink-0 text-signal"
              aria-hidden="true"
            />
            <span>{proof.applies}</span>
            <ArrowRight
              className="h-3 w-3 shrink-0 text-signal"
              aria-hidden="true"
            />
            <span>{proof.checkAgain}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ConnectedEvidence({
  locale = "en",
}: {
  locale?: Locale;
}) {
  const t = getDictionary(locale);
  const proof = t.sections.proof;
  const queries = Object.entries(proof.queries);
  const candidates = candidatesFor(t);

  return (
    <section
      id="proof"
      className="scroll-mt-24 border-y border-black/18 bg-ink-deep text-white"
    >
      <div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-end lg:gap-16">
            <div>
              <h2 className="max-w-[16ch] text-balance font-display text-[clamp(2.25rem,3.4vw,3.5rem)] font-normal leading-[1.05] tracking-[-0.02em]">
                {proof.heading}
              </h2>
            </div>
            <div className="max-w-[50ch] text-[16px] leading-[1.75] text-white/72">
              <p>{proof.body}</p>
            </div>
          </div>
        </Reveal>

        <SequenceReveal index={0}>
          <div className="mt-10 lg:border lg:border-white/16 lg:bg-white/[0.02]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-y border-white/12 py-3 lg:border-t-0 lg:border-b lg:px-6">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-signal">
                {proof.traceLabel}
              </p>
              <p className="text-[12px] text-white/56">{proof.traceScope}</p>
            </div>

            <div className="relative pb-8 pt-6 sm:pb-10 sm:pt-9 lg:px-10">
              <MobileTrace t={t} />

              <div className="hidden lg:block">
                <div className="grid grid-cols-2 gap-6">
                  {queries.map(([key, query], i) => (
                    <div
                      key={key}
                      data-seq-row
                      style={{ "--seq-row": i } as CSSProperties}
                      className="relative text-center"
                    >
                      <span className="mb-3 flex justify-center">
                        <NodeDot />
                      </span>
                      <StepLabel>{query.label}</StepLabel>
                      <p className="mt-2 text-[17px] leading-[1.4] text-white/88">
                        {query.value}
                      </p>
                    </div>
                  ))}
                </div>

                <Converge />

                <div
                  data-seq-row
                  style={{ "--seq-row": 2 } as CSSProperties}
                  className="relative text-center"
                >
                  <span className="mb-3 flex justify-center">
                    <NodeDot />
                  </span>
                  <StepLabel>{proof.whatHappenedNext}</StepLabel>
                  <p className="mt-2 text-[clamp(1.1rem,1.7vw,1.4rem)] leading-[1.4] text-white/92">
                    {proof.signal}
                  </p>
                </div>

                <Fork />

                <div className="grid grid-cols-3 items-stretch gap-14">
                  {candidates.map((item, i) =>
                    item.cause ? (
                      <div key={item.domain} className="flex flex-col">
                        <span className="mb-4 flex justify-center">
                          <NodeDot tone="cause" />
                        </span>
                        <article
                          data-seq-row
                          style={{ "--seq-row": i + 3 } as CSSProperties}
                          className="relative flex flex-1 flex-col gap-3.5 border border-signal/70 bg-signal/[0.08] px-5 py-5"
                        >
                          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-white/64">
                            {item.domain}
                          </p>
                          <p className="text-[17px] font-medium leading-[1.4] text-white">
                            {item.claim}
                          </p>
                          <p className="self-start bg-signal px-2 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-[#16110e]">
                            {proof.strongestEvidence}
                          </p>
                          <p className="mt-auto pt-1 text-[13px] leading-[1.6] text-white/78">
                            {item.why}
                          </p>
                        </article>
                      </div>
                    ) : (
                      <div key={item.domain} className="flex flex-col">
                        <span className="mb-4 flex justify-center">
                          <NodeDot tone="dead" />
                        </span>
                        <RuledOutBranch
                          item={item}
                          seqRow={i + 3}
                          ruledOutLabel={proof.ruledOut}
                        />
                      </div>
                    ),
                  )}
                </div>

                <Tails />
                <div className="border border-signal/45 bg-signal/[0.05] px-6 py-5 text-center">
                  <StepLabel>{proof.proposedChange}</StepLabel>
                  <p className="mt-2.5 text-[17px] font-medium leading-[1.5] text-white/94">
                    {proof.change}
                  </p>
                  <p className="mt-3 font-mono text-[11.5px] font-semibold uppercase tracking-[0.08em] text-white/62">
                    {`${proof.approve} → ${proof.applies} → ${proof.checkAgain}`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </SequenceReveal>
      </div>
    </section>
  );
}
