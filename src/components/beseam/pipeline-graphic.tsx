import { Activity, ArrowRight, Check, MousePointerClick } from "lucide-react";

import { ChannelIcon } from "@/components/beseam/channel-icon";

/**
 * The full operating pipeline, drawn rather than written — dark-register
 * variant of the vignette grammar used on the homepage. Each stage shows the
 * thing itself: the inputs Beseam observes, the checks that rule explanations
 * in or out, the queue the evidence becomes, and what moved (and what did
 * not) afterwards. Figures mirror the ImpactScreen example ledger and carry
 * the same “Example” stamp; everything else is words and marks, not counts.
 */

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-[11.5rem] flex-col justify-center gap-2.5 border border-white/14 bg-white/[0.03] px-4 py-4">
      {children}
    </div>
  );
}

/** Every input system Beseam observes, as one column of sources. */
function ObserveVignette() {
  return (
    <Panel>
      <div className="flex items-center justify-between gap-3 pb-1">
        <span className="font-display text-[9px] font-semibold uppercase tracking-[0.08em] text-white/56">
          AI answers
        </span>
        <span className="flex items-center gap-2 text-white/70">
          <ChannelIcon brand="openai" className="h-3.5 w-3.5" />
          <ChannelIcon brand="gemini" className="h-3.5 w-3.5" />
          <ChannelIcon brand="perplexity" className="h-3.5 w-3.5" />
          <ChannelIcon brand="claude" className="h-3.5 w-3.5" />
        </span>
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-2.5">
        <span className="font-display text-[9px] font-semibold uppercase tracking-[0.08em] text-white/56">
          Search & shopping
        </span>
        <ChannelIcon brand="google" className="h-3.5 w-3.5 text-white/70" />
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-2.5">
        <span className="font-display text-[9px] font-semibold uppercase tracking-[0.08em] text-white/56">
          Store, catalog & orders
        </span>
        <ChannelIcon brand="shopify" className="h-3.5 w-3.5 text-white/70" />
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-2.5">
        <span className="font-display text-[9px] font-semibold uppercase tracking-[0.08em] text-white/56">
          Google Analytics
        </span>
        <ChannelIcon brand="google" className="h-3.5 w-3.5 text-white/70" />
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-2.5">
        <span className="font-display text-[9px] font-semibold uppercase tracking-[0.08em] text-white/56">
          Microsoft Clarity
        </span>
        <MousePointerClick
          aria-hidden="true"
          className="h-3.5 w-3.5 text-white/70"
        />
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-2.5">
        <span className="font-display text-[9px] font-semibold uppercase tracking-[0.08em] text-white/56">
          Sessions & tracking
        </span>
        <Activity aria-hidden="true" className="h-3.5 w-3.5 text-white/70" />
      </div>
    </Panel>
  );
}

/** The processing that turns inputs into explanations and drafts. */
function UnderstandVignette() {
  return (
    <Panel>
      {(
        [
          [
            "Shopper behavior",
            "Sessions and funnels checked against the shopping question",
          ],
          ["Likely causes", "What may be making shoppers hesitate"],
          ["Proposed changes", "Changes prepared from the strongest findings"],
        ] as const
      ).map(([title, detail], index) => (
        <div
          key={title}
          className={index > 0 ? "border-t border-white/10 pt-2.5" : ""}
        >
          <div className="flex items-center justify-between gap-2">
            <span className="font-display text-[9px] font-semibold uppercase tracking-[0.08em] text-white/78">
              {title}
            </span>
            <Check
              aria-hidden="true"
              className="h-3 w-3 shrink-0 text-signal"
            />
          </div>
          <p className="mt-1 text-[10.5px] leading-[1.45] text-white/50">
            {detail}
          </p>
        </div>
      ))}
    </Panel>
  );
}

/** The evidence as a queue of approvable work. */
function ActVignette() {
  return (
    <Panel>
      {(
        [
          // The band, not a P-number. The queue dropped P0-P3: severity is
          // normalised inside an issue class, so the same number means a
          // different thing per class and ranking them against each other was
          // the inversion the product removed.
          ["Top 5%", "Add commuting use case", "Approve", true],
          ["Top 25%", "Explain fit over layers", "In motion", false],
          ["—", "Ask commuter questions again", "Measuring", false],
        ] as const
      ).map(([priority, task, step, lead]) => (
        <div key={task} className="flex items-center gap-2">
          <span
            className={`shrink-0 rounded-sm border px-1 py-0.5 font-mono text-[8.5px] font-semibold ${
              lead
                ? "border-signal/50 bg-signal/[0.12] text-signal"
                : "border-white/18 bg-white/[0.04] text-white/56"
            }`}
          >
            {priority}
          </span>
          <span
            className={`min-w-0 flex-1 truncate text-[11px] ${
              lead ? "font-medium text-white" : "text-white/62"
            }`}
          >
            {task}
          </span>
          <span
            className={`shrink-0 px-1.5 py-0.5 font-display text-[8.5px] font-semibold uppercase tracking-[0.06em] ${
              lead
                ? "bg-signal text-[#16110e]"
                : "border border-white/18 text-white/56"
            }`}
          >
            {step}
          </span>
        </div>
      ))}
      <div className="mt-1 flex items-center gap-2 border-t border-white/10 pt-2.5">
        <Check aria-hidden="true" className="h-3 w-3 shrink-0 text-signal" />
        <span className="font-display font-semibold text-[8.5px] uppercase tracking-[0.06em] text-white/50">
          Customer-facing changes require approval
        </span>
      </div>
    </Panel>
  );
}

/** What moved — and what did not. */
function LearnVignette() {
  return (
    <Panel>
      <span className="absolute right-2.5 top-1.5 font-display font-semibold text-[8px] uppercase tracking-[0.08em] text-white/40">
        Example
      </span>
      {(
        [
          // AI-answer measurements only. `ImpactRecord.metric_name` records
          // representation, brand_appearance and first_party_citation[_position];
          // there is no conversion, behaviour or money member, so a row for one
          // would be a result the product cannot produce.
          ["Named by AI", "9 → 23%", "+14 pts", true],
          ["Cites your page", "1 in 12 → 1 in 4", "+3 answers", true],
          ["Placed at", "5th → 2nd", "+3 places", true],
          ["Rival answers", "unchanged", "No change", false],
        ] as const
      ).map(([label, range, delta, moved]) => (
        <div key={label} className="flex items-center gap-2">
          <span className="truncate font-display font-semibold text-[9px] uppercase tracking-[0.06em] text-white/56">
            {label}
          </span>
          <span className="h-px min-w-3 flex-1 bg-white/12" />
          <span className="shrink-0 font-mono text-[9px] tabular-nums text-white/50">
            {range}
          </span>
          <span
            className={`w-14 shrink-0 text-right font-mono text-[9px] font-semibold tabular-nums ${
              moved ? "text-signal" : "text-white/45"
            }`}
          >
            {delta}
          </span>
        </div>
      ))}
      <p className="mt-1 border-t border-white/10 pt-2.5 font-display font-semibold text-[8.5px] uppercase tracking-[0.06em] text-white/50">
        Same question, asked again
      </p>
    </Panel>
  );
}

// Four panels, and the loop has five steps -- so these are named with four of
// the five canonical nouns rather than with a fourth vocabulary of their own.
// Approve is the panel that carries Apply, because applying is what approval
// releases and the panel says so.
const STAGES = [
  {
    number: "01",
    title: "Find",
    body: "AI answers, analytics, sessions, and store data watched together.",
    Vignette: ObserveVignette,
  },
  {
    number: "02",
    title: "Prepare",
    body: "Use the data to find what may explain the problem and what to change.",
    Vignette: UnderstandVignette,
  },
  {
    number: "03",
    title: "Approve",
    body: "You approve customer-facing changes before Beseam applies them.",
    Vignette: ActVignette,
  },
  {
    number: "04",
    title: "Measure",
    body: "What moved and what did not, kept next to the change.",
    Vignette: LearnVignette,
  },
] as const;

export default function PipelineGraphic() {
  return (
    <ol className="mt-10 grid gap-8 border-t border-white/14 pt-8 md:grid-cols-2 md:gap-6 xl:grid-cols-4">
      {STAGES.map(({ number, title, body, Vignette }, index) => (
        <li key={number} className="relative">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-[11px] font-semibold tabular-nums text-signal">
              {number}
            </span>
            <h3 className="text-[17px] font-semibold text-white">{title}</h3>
            {index < STAGES.length - 1 ? (
              <ArrowRight
                aria-hidden="true"
                className="ml-auto hidden h-4 w-4 text-white/30 xl:block"
              />
            ) : null}
          </div>
          <div className="mt-4">
            <Vignette />
          </div>
          <p className="mt-3 max-w-[32ch] text-[13px] leading-[1.55] text-white/62">
            {body}
          </p>
        </li>
      ))}
    </ol>
  );
}
