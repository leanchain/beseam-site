"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import Link from "next/link";

import {
  ArrowRight,
  BarChart3,
  Bot,
  MousePointer2,
  ShoppingBag,
} from "lucide-react";

/**
 * One machine, not four cards. Four signals are a fixed set of inputs; what
 * teams run on them is not. Selecting a signal traces it: the wire lights, the
 * input contract rewrites, and every use case it feeds stays lit while the rest
 * recede. The worked example lives in ConnectedEvidence; this section carries
 * coverage.
 */

const SIGNALS = [
  {
    id: "discovery",
    label: "AI discovery",
    layer: "Off-site",
    hue: "#b8441d",
    scope: "Where products enter — or miss — the shortlist.",
    inputs: [
      "chatgpt",
      "google_ai_mode",
      "gemini",
      "perplexity",
      "copilot",
      "google_search",
    ],
    caveat:
      "Point-in-time samples, dated and repeatable. Never a model’s hidden ranking logic.",
    does: "Shortlist visibility",
    Icon: Bot,
  },
  {
    id: "store",
    label: "Store & product",
    layer: "Storefront",
    hue: "#2e5da6",
    scope: "What the page answers, and what it offers next.",
    inputs: [
      "product_pages",
      "onsite_search",
      "collections",
      "catalog_feed",
      "recommendations",
    ],
    caveat:
      "Public storefront data only. No store login, no private customer data.",
    does: "Catalog and page readiness",
    Icon: ShoppingBag,
  },
  {
    id: "behavior",
    label: "Shopper behavior",
    layer: "Journey",
    hue: "#1f7a4d",
    scope: "What shoppers refine, open, ignore, and abandon.",
    inputs: [
      "query_refinement",
      "product_opens",
      "add_to_cart",
      "checkout_dropoff",
      "session_replay",
    ],
    caveat:
      "What shoppers did. Why it happened stays a hypothesis until it is tested.",
    does: "Proactive personalization",
    Icon: MousePointer2,
  },
  {
    id: "revenue",
    label: "Revenue",
    layer: "Outcome",
    hue: "#8a6a1b",
    scope: "What changed after the decision was acted on.",
    inputs: ["conversion", "orders", "attribution", "revenue_after_change"],
    caveat:
      "Measured after the change ships, against the same questions that exposed the gap.",
    does: "Impact and attribution",
    Icon: BarChart3,
  },
] as const;

type SignalId = (typeof SIGNALS)[number]["id"];

const HUE: Record<SignalId, string> = SIGNALS.reduce(
  (acc, signal) => ({ ...acc, [signal.id]: signal.hue }),
  {} as Record<SignalId, string>,
);

/** Every entry is a real surface in the product, tagged with what composes it. */
const USE_CASES: readonly {
  name: string;
  detail: string;
  uses: readonly SignalId[];
  /** Runs in the storefront on every request, not as a report. */
  live?: boolean;
}[] = [
  {
    name: "AI answer visibility",
    detail:
      "Named for the questions that matter, and what supported the answer.",
    uses: ["discovery"],
  },
  {
    name: "Competitors chosen instead",
    detail: "What appears in your place, tracked over time.",
    uses: ["discovery"],
  },
  {
    name: "Agent readiness",
    detail: "Whether shopping agents can read the storefront at all.",
    uses: ["discovery", "store"],
  },
  {
    name: "Catalog truth",
    detail: "Fields, variants, freshness, and stock as a shopper meets them.",
    uses: ["store"],
  },
  {
    name: "Product page evidence",
    detail: "What the page answers, and what it leaves open.",
    uses: ["store"],
  },
  {
    name: "Store health and crawlability",
    detail: "Indexability, structured facts, machine readability.",
    uses: ["store"],
  },
  {
    name: "Brand claims and trust",
    detail: "Claims with enough evidence behind them to reuse safely.",
    uses: ["store"],
  },
  {
    name: "Personalized search and recommendations",
    detail: "Ranked results and placements, served live and measured.",
    uses: ["store", "behavior", "revenue"],
    live: true,
  },
  {
    name: "Why buyers leave",
    detail: "Sessions, replay, heatmaps, and the friction they show.",
    uses: ["behavior"],
  },
  {
    name: "Funnels, cohorts, journeys",
    detail: "Where shoppers move forward, and who stops.",
    uses: ["behavior", "revenue"],
  },
  {
    name: "Revenue and attribution",
    detail:
      "Actual revenue, observed changes, attribution, and estimates stay separate.",
    uses: ["revenue"],
  },
  {
    name: "What changed",
    detail: "Before and after, tied to one completed change.",
    uses: ["discovery", "revenue"],
  },
  {
    name: "One change list",
    detail:
      "Every proposed change with an owner, approval status, and a check afterward.",
    uses: ["discovery", "store", "behavior", "revenue"],
  },
];

/** Signal wires: a 3.5rem track as tall as the map row, drawn in real pixels. */
const TRACK_W = 56;

/**
 * Where the use-case wires stop: the 3.5rem gutter the grid reserves for them
 * (`lg:pl-14`). Wires live in the margin; the cards themselves say which ones
 * are lit with their own border.
 */
const FAN_GUTTER = 56;

const hair = (value: number) => Math.round(value) + 0.5;

/** A drawn line: leaves and arrives horizontally, curves once in between. */
function curve(y0: number, y1: number, endX = TRACK_W) {
  const from = hair(y0);
  const to = hair(y1);
  if (Math.abs(to - from) < 1) return `M0 ${from} H ${endX}`;
  return `M0 ${from} C ${endX * 0.45} ${from}, ${endX * 0.6} ${to}, ${endX} ${to}`;
}

function useTrackHeight() {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    const element = ref.current;
    if (!element || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver((entries) => {
      setHeight(entries[0]?.contentRect.height ?? 0);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return { ref, height };
}

function ColumnHead({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex h-11 shrink-0 items-center justify-between gap-3 border-b border-black/12 bg-ground px-4 sm:px-5">
      {children}
    </div>
  );
}

function HeadLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-black/58">
      {children}
    </p>
  );
}

function MonoNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.1em] text-black/55">
      {children}
    </p>
  );
}

export default function ConnectedSystemMap({
  exploreHref = "/platform",
  exploreLabel = "Explore the platform",
}: {
  exploreHref?: string | null;
  exploreLabel?: string;
}) {
  const [activeId, setActiveId] = useState<SignalId>("discovery");
  const activeIndex = Math.max(
    0,
    SIGNALS.findIndex((signal) => signal.id === activeId),
  );
  const active = SIGNALS[activeIndex];
  const inTrack = useTrackHeight();

  // Both wire sets meet the platform box itself, not the row's midpoint, so its
  // centre is measured in the shared coordinate space every column body starts from.
  const platformRef = useRef<HTMLDivElement>(null);
  const [nodeY, setNodeY] = useState<number | null>(null);

  // Use-case wires are drawn over the whole right region, so each related card
  // is measured in that region's own pixel space.
  const fanRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [fan, setFan] = useState<{
    w: number;
    h: number;
    cards: { x: number; y: number }[];
  } | null>(null);

  const measureFan = useCallback(() => {
    const element = fanRef.current;
    if (!element) return;
    const box = element.getBoundingClientRect();
    setFan({
      w: box.width,
      h: box.height,
      cards: cardRefs.current.map((card) => {
        if (!card) return { x: 0, y: 0 };
        const rect = card.getBoundingClientRect();
        return {
          x: rect.left - box.left,
          y: rect.top - box.top + rect.height / 2,
        };
      }),
    });
  }, []);

  const measureNode = useCallback(() => {
    const track = inTrack.ref.current;
    const box = platformRef.current;
    if (!track || !box) return;
    const trackBox = track.getBoundingClientRect();
    if (trackBox.height === 0) return;
    const platformBox = box.getBoundingClientRect();
    setNodeY(platformBox.top + platformBox.height / 2 - trackBox.top);
  }, [inTrack.ref]);

  useLayoutEffect(() => {
    measureFan();
    measureNode();
    if (typeof ResizeObserver === "undefined") return;
    const measure = () => {
      measureFan();
      measureNode();
    };
    const observer = new ResizeObserver(measure);
    if (fanRef.current) observer.observe(fanRef.current);
    if (platformRef.current) observer.observe(platformRef.current);
    cardRefs.current.forEach((card) => card && observer.observe(card));
    return () => observer.disconnect();
  }, [measureFan, measureNode, activeId]);

  return (
    <div className="border-y-2 border-ink-deep bg-white">
      <div className="grid lg:grid-cols-[minmax(13rem,0.74fr)_3.5rem_minmax(16rem,0.96fr)_minmax(24rem,1.7fr)]">
        {/* Signals — the fixed set */}
        <div className="flex flex-col border-b border-black/12 lg:border-b-0 lg:border-r">
          <ColumnHead>
            <HeadLabel>Signals</HeadLabel>
            <MonoNote>Fixed set</MonoNote>
          </ColumnHead>
          <div
            role="group"
            aria-label="Information across the shopper journey"
            className="grid min-h-0 flex-1 sm:grid-cols-2 lg:grid-cols-1 lg:grid-rows-4"
          >
            {SIGNALS.map((signal, index) => {
              const Icon = signal.Icon;
              const selected = signal.id === activeId;
              return (
                <button
                  key={signal.id}
                  type="button"
                  aria-pressed={selected}
                  aria-controls="decision-readout use-case-grid"
                  onMouseEnter={() => setActiveId(signal.id)}
                  onFocus={() => setActiveId(signal.id)}
                  onClick={() => setActiveId(signal.id)}
                  className={`group relative flex min-h-[6.75rem] flex-col justify-center border-black/12 px-4 py-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-signal-ink sm:px-5 ${
                    index > 0 ? "border-t" : ""
                  } ${index % 2 === 1 ? "sm:border-l lg:border-l-0" : ""} ${
                    index > 1 ? "sm:border-t" : ""
                  } ${selected ? "" : "hover:bg-black/[0.025]"}`}
                  style={
                    selected
                      ? { backgroundColor: `${signal.hue}0f` }
                      : undefined
                  }
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-2.5">
                      <span
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border transition-colors"
                        style={
                          selected
                            ? {
                                backgroundColor: signal.hue,
                                borderColor: signal.hue,
                                color: "#ffffff",
                              }
                            : undefined
                        }
                      >
                        <Icon
                          aria-hidden="true"
                          className={`h-3.5 w-3.5 ${selected ? "" : "text-black/58"}`}
                        />
                      </span>
                      <p className="text-[14px] font-semibold leading-[1.25] text-ink-deep">
                        {signal.label}
                      </p>
                    </div>
                    <span
                      className="shrink-0 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] transition-colors"
                      style={{
                        color: selected ? signal.hue : "rgba(0,0,0,0.58)",
                      }}
                    >
                      {signal.layer}
                    </span>
                  </div>
                  <p className="mt-2.5 max-w-[32ch] text-[12px] leading-[1.5] text-black/60">
                    {signal.scope}
                  </p>
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 right-0 top-0 hidden w-px transition-colors lg:block"
                    style={{
                      backgroundColor: selected ? signal.hue : "transparent",
                    }}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Signals → platform */}
        <div aria-hidden="true" className="hidden flex-col lg:flex">
          <ColumnHead />
          <div ref={inTrack.ref} className="relative min-h-0 flex-1">
            {inTrack.height > 0 ? (
              <svg
                viewBox={`0 0 ${TRACK_W} ${inTrack.height}`}
                width={TRACK_W}
                height={inTrack.height}
                className="block h-full w-full"
              >
                {SIGNALS.map((signal, index) => (
                  <path
                    key={signal.id}
                    d={curve(
                      inTrack.height * (0.125 + index * 0.25),
                      nodeY ?? inTrack.height / 2,
                    )}
                    fill="none"
                    strokeWidth={1}
                    className="stroke-black/12"
                  />
                ))}
                <path
                  key={activeId}
                  d={curve(
                    inTrack.height * (0.125 + activeIndex * 0.25),
                    nodeY ?? inTrack.height / 2,
                  )}
                  fill="none"
                  pathLength={1}
                  strokeDasharray={1}
                  strokeWidth={1.5}
                  stroke={active.hue}
                  className="signal-wire-draw"
                />
              </svg>
            ) : null}
            <span
              className="absolute right-0 h-1.5 w-1.5 -translate-y-1/2 translate-x-1/2 rounded-full"
              style={{
                backgroundColor: active.hue,
                top: nodeY ?? "50%",
              }}
            />
          </div>
        </div>

        {/* Context and platform */}
        <div className="flex flex-col border-b border-black/12 lg:border-b-0 lg:border-r">
          <ColumnHead>
            <HeadLabel>One shopper journey</HeadLabel>
            <MonoNote>Coverage</MonoNote>
          </ColumnHead>
          <div
            id="decision-readout"
            className="flex min-h-0 flex-1 flex-col justify-center gap-5 px-5 py-7 sm:px-6"
          >
            <p className="max-w-[30ch] text-[15px] font-semibold leading-[1.35] text-ink-deep">
              {active.does}
            </p>

            <div>
              <MonoNote>Input — what {active.label} reads</MonoNote>
              <div className="mt-2 rounded-md border border-black/14 bg-ground px-4 py-3">
                <p className="font-mono text-[11.5px] leading-[1.7] text-ink-deep">
                  {active.inputs.join(", ")}
                </p>
              </div>
              <p className="mt-2 text-[11.5px] leading-[1.5] text-black/58">
                {active.caveat}
              </p>
            </div>

            <div>
              <MonoNote>Platform</MonoNote>
              <div
                ref={platformRef}
                className="mt-2 rounded-md border-2 border-ink-deep px-5 py-5"
              >
                <p className="font-display text-[clamp(1.4rem,1.9vw,1.85rem)] leading-[1.1] tracking-[-0.02em] text-ink-deep">
                  What will this shopper choose?
                </p>
              </div>
              <p className="mt-2.5 text-[12.5px] leading-[1.6] text-black/62">
                Connected evidence. Reviewed, governed actions.
              </p>
            </div>

            <p className="font-mono text-[11.5px] leading-[1.5] text-black/55">
              output: what a shopper sees next, and evidence of what changed.
            </p>
          </div>
        </div>

        {/* Use cases — the growing set */}
        <div className="flex flex-col">
          <ColumnHead>
            <HeadLabel>What teams run on it</HeadLabel>
            <div className="flex items-center gap-5">
              <span className="hidden xl:inline">
                <MonoNote>The list keeps growing</MonoNote>
              </span>
              {exploreHref ? (
                <Link
                  href={exploreHref}
                  className="group inline-flex items-center gap-1.5 whitespace-nowrap text-[12px] font-semibold text-signal-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-ink focus-visible:ring-offset-2"
                >
                  {exploreLabel}
                  <ArrowRight
                    aria-hidden="true"
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              ) : (
                <MonoNote>Connected coverage</MonoNote>
              )}
            </div>
          </ColumnHead>

          <div ref={fanRef} className="relative min-h-0 flex-1 lg:pl-14">
            {fan && fan.w > 0 ? (
              <svg
                aria-hidden="true"
                viewBox={`0 0 ${fan.w} ${fan.h}`}
                width={fan.w}
                height={fan.h}
                className="pointer-events-none absolute inset-0 z-10 hidden h-full w-full lg:block"
              >
                {(() => {
                  // One wire per lit row, and every wire stops in the gutter
                  // the grid already reserves (`lg:pl-14`). They used to be
                  // drawn to each card's own left edge, which for the right
                  // -hand column meant crossing the left-hand card to get
                  // there -- a line through a sentence, on the section whose
                  // whole claim is that the trace is legible.
                  const origin = nodeY ?? fan.h / 2;
                  const drawn = new Set<number>();
                  return USE_CASES.map((item, index) => {
                    const card = fan.cards[index];
                    if (!item.uses.includes(activeId) || !card) return null;
                    const row = Math.round(card.y);
                    if (drawn.has(row)) return null;
                    drawn.add(row);
                    return (
                      <g key={`${activeId}-${item.name}`}>
                        <path
                          d={curve(origin, card.y, FAN_GUTTER)}
                          fill="none"
                          pathLength={1}
                          strokeDasharray={1}
                          strokeWidth={1.25}
                          stroke={active.hue}
                          className="signal-wire-draw"
                        />
                        <circle
                          cx={FAN_GUTTER}
                          cy={hair(card.y)}
                          r={2}
                          fill={active.hue}
                        />
                      </g>
                    );
                  });
                })()}
              </svg>
            ) : null}
            <span
              aria-hidden="true"
              className="absolute left-0 hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full lg:block"
              style={{ backgroundColor: active.hue, top: nodeY ?? "50%" }}
            />

            <ul
              id="use-case-grid"
              className="relative grid h-full grid-cols-2 gap-2 p-2 sm:gap-2.5 sm:p-2.5"
            >
              {USE_CASES.map((item, index) => {
                const related = item.uses.includes(activeId);
                return (
                  <li
                    key={item.name}
                    ref={(node) => {
                      cardRefs.current[index] = node;
                    }}
                    className={`relative rounded-md border px-3.5 py-3 transition-[background-color,border-color,box-shadow] duration-300 sm:px-4 ${
                      related ? "bg-white" : "bg-ground"
                    }`}
                    style={{
                      borderColor: related ? active.hue : "rgba(0,0,0,0.10)",
                      // Lit cards lift off the ground; the rest stay flat on
                      // it, so the difference reads before any text does.
                      boxShadow: related
                        ? `0 0 0 1px ${active.hue}, 0 6px 16px -12px rgba(0,0,0,0.5)`
                        : undefined,
                    }}
                  >
                    <span
                      aria-hidden="true"
                      className="flex h-[3px] w-full overflow-hidden"
                    >
                      {item.uses.map((use) => (
                        <span
                          key={use}
                          className="h-full flex-1 transition-colors duration-300"
                          style={{
                            backgroundColor: related
                              ? HUE[use]
                              : "rgba(0,0,0,0.09)",
                          }}
                        />
                      ))}
                    </span>
                    <span className="sr-only">
                      Signals used:{" "}
                      {item.uses
                        .map(
                          (use) =>
                            SIGNALS.find((signal) => signal.id === use)?.label,
                        )
                        .join(", ")}
                      .
                    </span>
                    <p
                      className={`mt-2.5 text-[13px] font-semibold leading-[1.3] transition-colors duration-300 ${
                        related ? "text-ink-deep" : "text-black/64"
                      }`}
                    >
                      {item.name}
                      {item.live ? (
                        <span className="ml-1.5 inline-block whitespace-nowrap rounded-md bg-ink-deep px-1.5 py-[1px] align-[2px] font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-white">
                          Served live
                        </span>
                      ) : null}
                    </p>
                    {/* At rest the grid is a list of names; the sentence is
                        what selection buys you. Kept in the DOM and only
                        faded, so card heights never change and the wires
                        measured against them stay put. */}
                    <p
                      className={`mt-1 hidden text-[11.5px] leading-[1.45] text-black/62 transition-opacity duration-300 sm:block ${
                        related ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      {item.detail}
                    </p>
                  </li>
                );
              })}
              {/* Not a capability, so not a card: the overflow note is dashed
                  and rule-less, which stops the eye counting it as a
                  fourteenth thing the platform does. */}
              <li className="rounded-md border border-dashed border-black/16 px-3.5 py-3 sm:px-4">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-black/45">
                  + more
                </p>
                <p className="mt-2 text-[11.5px] leading-[1.45] text-black/55">
                  Campaigns, reliability, experiments, segments, media studio,
                  marketplaces, fit. Not every capability is enabled for every
                  store.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* The finding -> change -> result loop used to be restated here. It is
          the whole subject of `#actions` directly above, so all this strip
          keeps is the affordance: what to click, and what clicking does. */}
      <div className="flex flex-wrap items-center justify-end gap-x-8 gap-y-3 border-t border-black/12 bg-ground px-4 py-3 sm:px-5">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-black/58">
          Select a signal to light what it feeds
        </p>
      </div>
    </div>
  );
}
