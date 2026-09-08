import { ArrowRight, Check, TrendingUp } from "lucide-react";

/**
 * The product, rebuilt in HTML rather than screenshotted.
 *
 * Everything else drawn on this page is the shopper's world: an assistant
 * answer, a collection page, a cart. None of it shows what a merchant would
 * actually log into, which is the one thing a visitor cannot picture. These
 * two screens are Beseam's own: the Growth plan and the Results ledger.
 *
 * Rebuilt, not captured, because a screenshot goes stale silently and blurs on
 * a retina display. Structure, column order, and row anatomy follow the real
 * screens; the accent is the landing signal rather than the app's own primary.
 *
 * The real queue is wider. This marketing view keeps only the columns needed to
 * understand the decision: the change, the share of booked sales it touches,
 * effort, and status.
 *
 * It carries no column-label row at all. A merchant counted three stacked
 * header rows back to us before any content -- a section label, a screen
 * chrome row, and the labels themselves -- and asked for the table to be
 * simplified, so all three went. That is a deliberate trade: a marketing
 * table can drop its labels only while every value says what it is. The
 * `band` column is the one that could not, so it names itself in the data
 * ("Top 5% of your booked sales", "Top quarter of booked sales"); change,
 * effort, and status read from their own values. Any new column has to be
 * self-describing the same way, or the label row comes back.
 *
 * This applies everywhere `ActionsScreen` is used -- /#actions, the platform,
 * marketing-detail, buying-decision and playbook pages all render the same
 * unlabelled table.
 *
 * All figures in these reconstructed product views are illustrative.
 *
 * There is no impact column and no priority badge, because the product has
 * neither. It used to show `$$$$$` and `High / Medium / Low`, and both were
 * inventions of this file: the app shows one column here, a band of how much of
 * the store's own booked sales the row touches, and it is deliberately ordinal
 * -- no currency glyph, because a CHF merchant reading `$$$` is being shown a
 * currency nobody measured, and no projected lift, because the product refuses
 * to put a number on a change it has not made yet.
 */

const QUEUE_ROWS = [
  {
    title: "Add the commuting use case to the Urban Shell product page.",
    why: "The shopper asked for a commuting jacket, and the product page never answers whether this one fits that use case.",
    band: "Top 5% of your booked sales",
    effort: "Quick",
    step: "Needs approval",
    lead: true,
  },
  {
    title: "Explain how Urban Shell fits over everyday layers.",
    why: "The shopper opened the size guide, and fit over layers is still unanswered at the decision point.",
    band: "Top quarter of booked sales",
    effort: "Quick",
    step: "In motion",
    lead: false,
  },
  {
    title: "Ask the commuter questions again after the product-page change.",
    why: "Ask the same shopping question again before saying the change helped discovery.",
    band: "Not measured",
    effort: "Quick",
    step: "Measuring",
    lead: false,
  },
] as const;

const EFFORT_TONE: Record<string, string> = {
  Quick: "border-[#1f7a4d]/35 bg-[#1f7a4d]/[0.08] text-[#1a6b43]",
  Hard: "border-black/20 bg-black/[0.04] text-black/62",
};

function ScreenChrome({
  title,
  meta,
  tone = "light",
}: {
  title: string;
  meta: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div
      className={`flex items-baseline justify-between gap-4 border-b px-4 py-3 sm:px-5 ${
        dark ? "border-white/12 bg-white/[0.03]" : "border-black/12 bg-ground"
      }`}
    >
      <p
        className={`text-[15px] font-semibold tracking-[-0.01em] ${
          dark ? "text-white" : "text-ink-deep"
        }`}
      >
        {title}
      </p>
      <p
        className={`font-mono text-[10px] uppercase tracking-[0.1em] ${
          dark ? "text-white/50" : "text-black/50"
        }`}
      >
        {meta}
      </p>
    </div>
  );
}

/** /actions, cropped to the columns a merchant acts on. */
export function ActionsScreen({ compact = false }: { compact?: boolean } = {}) {
  if (compact) {
    return (
      <div className="border border-black/16 bg-white">
        {QUEUE_ROWS.map((row) => (
          <div
            key={row.title}
            className={`border-b border-black/10 px-3.5 py-3 last:border-b-0 ${
              row.lead ? "bg-signal-ink/[0.06]" : "bg-white"
            }`}
          >
            {/* Stacked, not four columns. At 390px the four-column grid left
                the change itself about 130px wide -- one or two words a line,
                eight lines deep -- while the badges sat in air. The title
                takes the full width and the three values read as one meta
                line under it. */}
            <p className="text-[13px] font-medium leading-[1.35] text-[#151515]">
              {row.title}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1.5">
              <span
                className={`inline-flex shrink-0 items-center rounded-md px-2 py-0.5 text-[10px] font-semibold ${
                  row.lead
                    ? "bg-[var(--secondary)] text-[var(--secondary-foreground)]"
                    : "border border-black/18 bg-white text-[#3f3f3f]"
                }`}
              >
                {row.step}
              </span>
              <span className="inline-flex shrink-0 items-center rounded-md border border-[#1f7a4d]/35 bg-[#1f7a4d]/[0.08] px-1.5 py-0.5 text-[10px] font-semibold text-[#1a6b43]">
                {row.effort}
              </span>
              <span className="text-[11px] leading-[1.35] text-black/58">
                {row.band}
              </span>
            </div>
          </div>
        ))}
        <p className="border-t border-black/10 px-3.5 py-2 text-[11px] leading-[1.5] text-black/50">
          Illustrative example · not customer results.
        </p>
      </div>
    );
  }

  return (
    <div className="border border-black/16 bg-white">
      <div className="relative overflow-x-auto">
        <div className="min-w-[60rem]">
          {QUEUE_ROWS.map((row) => (
            <div
              key={row.title}
              className={`grid items-center gap-4 border-b border-black/10 px-4 py-3.5 last:border-b-0 sm:px-5 ${
                row.lead ? "bg-signal-ink/[0.06]" : ""
              }`}
              style={{
                gridTemplateColumns: "minmax(0,1fr) 11rem 5rem 8.5rem",
              }}
            >
              <div>
                <p
                  className={`leading-[1.4] ${
                    row.lead
                      ? "text-[15px] font-semibold text-ink-deep"
                      : "text-[14px] text-black/78"
                  }`}
                >
                  {row.title}
                </p>
                <p className="mt-1 max-w-[68ch] text-[12px] leading-[1.55] text-black/54">
                  {row.why}
                </p>
              </div>

              <span className="text-[11px] leading-[1.4] text-black/70">
                {row.band}
              </span>

              <span
                className={`inline-flex shrink-0 items-center rounded-md border px-1.5 py-0.5 text-[11px] font-medium ${
                  EFFORT_TONE[row.effort] ?? EFFORT_TONE.Hard
                }`}
              >
                {row.effort}
              </span>

              <span
                className={`inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-md px-2 py-1 text-[11px] font-semibold ${
                  row.lead
                    ? "bg-[var(--secondary)] text-[var(--secondary-foreground)]"
                    : "border border-black/20 text-black/70"
                }`}
              >
                {row.step}
                {row.lead ? (
                  <ArrowRight aria-hidden="true" className="h-3 w-3" />
                ) : null}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* One footer row, not two stacked ones: the standing note and the
          illustrative stamp were two full-width bars of grey type under a
          three-row table. */}
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-black/12 bg-ground px-4 py-2.5 text-[11px] leading-[1.5] sm:px-5">
        <p className="text-black/54">
          Every change keeps what Beseam found, the owner, status, and what to
          check afterward together.
        </p>
        <p className="shrink-0 text-black/50">
          Illustrative example · not customer results.
        </p>
      </div>
    </div>
  );
}

/**
 * Figures are illustrative and the frame says so. This follows the same standard as the
 * specimens in ShopperLoss, which carry invented brand names under an
 * “Example” stamp. A percentage with no stamp would read as a case study.
 *
 * Every metric here is phrased so that up is the win. An earlier draft had a
 * row reading “Decreased · search exits · −23%”, which is a genuine
 * improvement and still scans as damage: a visitor reads the minus sign, not
 * the metric name. Where a fix reduces something, name the thing that grew
 * instead.
 *
 * The assistant row leads. Being named in an AI answer is the thing this
 * product exists for, and an earlier draft parked it on “No change”, which
 * argued against the entire page from inside the product screenshot.
 */
// Every row is a question about AI answers, because those are the measurements
// the product actually records: `ImpactRecord.metric_name` is representation,
// brand_appearance and first_party_citation[_position], and nothing else. Two
// earlier rows here read `Store search -> page +11 pts` and `page -> add to
// cart +0.5 pts`, which are the numbers a merchant would most like to see and
// the ones we do not measure. A results screen must not show a row the product
// cannot produce.
const LEDGER_ROWS = [
  {
    metric: "Commuter answers naming Urban Shell",
    before: "9%",
    after: "23%",
    delta: "+14 pts",
  },
  {
    metric: "Answers citing your own product page",
    before: "1 in 12",
    after: "1 in 4",
    delta: "+3 answers",
  },
  {
    metric: "Where you sit when you are named",
    before: "5th",
    after: "2nd",
    delta: "+3 places",
  },
] as const;

/** /impact, the outcome ledger with example figures. */
export function ImpactScreen() {
  return (
    <div className="min-w-0 border border-white/16 bg-white/[0.02]">
      <ScreenChrome title="Results" meta="Example figures" tone="dark" />

      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-white/12 px-4 py-3 sm:px-5">
        <span className="inline-flex items-center gap-2 text-[12px] text-white/70">
          <Check aria-hidden="true" className="h-3.5 w-3.5 text-signal" />
          Change verified
        </span>
        <span className="text-[12px] text-white/70">
          Measured window{" "}
          <span className="font-semibold text-white">28 days</span>
        </span>
      </div>

      {LEDGER_ROWS.map((row) => (
        <div
          key={row.metric}
          className="flex items-center gap-3 border-b border-white/10 px-4 py-2.5 last:border-b-0 sm:px-5"
        >
          <TrendingUp
            aria-hidden="true"
            className="h-3.5 w-3.5 shrink-0 text-signal"
          />
          <span className="min-w-0 flex-1 truncate text-[13px] text-white/72">
            {row.metric}
          </span>
          <span className="shrink-0 whitespace-nowrap text-[13px] tabular-nums text-white/50">
            {row.before} →{" "}
            <span className="font-semibold text-white/88">{row.after}</span>
          </span>
          <span className="w-[4.75rem] shrink-0 whitespace-nowrap text-right text-[13px] font-semibold tabular-nums text-signal">
            {row.delta}
          </span>
        </div>
      ))}

      <p className="border-t border-white/12 px-4 py-2.5 text-[11px] leading-[1.5] text-white/50 sm:px-5">
        Illustrative example · not customer results.
      </p>
    </div>
  );
}
