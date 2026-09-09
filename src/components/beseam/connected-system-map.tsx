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

import type { Dictionary } from "@/i18n";
import { useDictionary } from "@/i18n/use-locale";

/**
 * One machine, not four cards. Four signals are a fixed set of inputs; what
 * teams run on them is not. Selecting a signal traces it: the wire lights, the
 * input contract rewrites, and every use case it feeds stays lit while the rest
 * recede. The worked example lives in ConnectedEvidence; this section carries
 * coverage.
 */

/**
 * Ids, hues, icons and the input tokens; the words are in `t.systemMap.signals`
 * under the same ids. The tokens stay here and stay untranslated because they
 * are field names shown as field names -- a German `produktseiten` would name
 * an identifier nothing in the product emits.
 */
const SIGNALS = [
  {
    id: "discovery",
    hue: "#b8441d",
    inputs: [
      "chatgpt",
      "google_ai_mode",
      "gemini",
      "perplexity",
      "copilot",
      "google_search",
    ],
    Icon: Bot,
  },
  {
    id: "store",
    hue: "#2e5da6",
    inputs: [
      "product_pages",
      "onsite_search",
      "collections",
      "catalog_feed",
      "recommendations",
    ],
    Icon: ShoppingBag,
  },
  {
    id: "behavior",
    hue: "#1f7a4d",
    inputs: [
      "query_refinement",
      "product_opens",
      "add_to_cart",
      "checkout_dropoff",
      "session_replay",
    ],
    Icon: MousePointer2,
  },
  {
    id: "revenue",
    hue: "#8a6a1b",
    inputs: ["conversion", "orders", "attribution", "revenue_after_change"],
    Icon: BarChart3,
  },
] as const;

type SignalId = (typeof SIGNALS)[number]["id"];

const HUE: Record<SignalId, string> = SIGNALS.reduce(
  (acc, signal) => ({ ...acc, [signal.id]: signal.hue }),
  {} as Record<SignalId, string>,
);

/**
 * Every entry is a real surface in the product, tagged with what composes it.
 * Which signals a card reads is architecture and stays here; its name and the
 * sentence under it are in `t.systemMap.cards` under the same ids.
 */
const USE_CASES: readonly {
  id: keyof Dictionary["systemMap"]["cards"];
  uses: readonly SignalId[];
}[] = [
  { id: "getDiscovered", uses: ["discovery", "store"] },
  { id: "productsChoose", uses: ["discovery", "store"] },
  { id: "fitSizing", uses: ["store", "behavior"] },
  { id: "understandBehavior", uses: ["store", "behavior", "revenue"] },
  { id: "personalizeTest", uses: ["store", "behavior", "revenue"] },
  { id: "journeyHealth", uses: ["store", "behavior"] },
  { id: "creativeStudio", uses: ["discovery", "store", "behavior"] },
  {
    id: "prioritizeMeasure",
    uses: ["discovery", "store", "behavior", "revenue"],
  },
  { id: "campaigns", uses: ["discovery", "store", "revenue"] },
];

type UseCaseId = (typeof USE_CASES)[number]["id"];

/** Signal wires: a 3.5rem track as tall as the map row, drawn in real pixels. */
const TRACK_W = 56;

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
  exploreLabel,
  scrollProgress,
}: {
  exploreHref?: string | null;
  /** Overrides the localized default; omit it and the link reads the page's
   *  own language rather than an English string baked into a caller. */
  exploreLabel?: string;
  /** Homepage section-level scroll progress. The parent owns the sticky stage. */
  scrollProgress?: number;
}) {
  const t = useDictionary().systemMap;
  const interactionRef = useRef(false);
  const [activeId, setActiveId] = useState<SignalId>("discovery");
  const [activeUseCaseId, setActiveUseCaseId] = useState<UseCaseId | null>(
    null,
  );
  const activeUseCase = activeUseCaseId
    ? (USE_CASES.find((item) => item.id === activeUseCaseId) ?? null)
    : null;
  const activeSignalIds: readonly SignalId[] = activeUseCase
    ? activeUseCase.uses
    : [activeId];
  const activeIndex = Math.max(
    0,
    SIGNALS.findIndex((signal) => signal.id === activeId),
  );
  const active = SIGNALS[activeIndex];
  const activeWords = t.signals[active.id];
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
  }, [measureFan, measureNode, activeId, activeUseCaseId]);

  useEffect(() => {
    if (scrollProgress === undefined || interactionRef.current) return;
    const clamped = Math.max(0, Math.min(1, scrollProgress));
    const nextIndex = Math.min(
      SIGNALS.length - 1,
      Math.floor(clamped * SIGNALS.length),
    );
    setActiveUseCaseId(null);
    setActiveId(SIGNALS[nextIndex].id);
  }, [scrollProgress]);

  return (
    <div className="border-y-2 border-ink-deep bg-white">
      <div className="grid lg:grid-cols-[minmax(13rem,0.74fr)_3.5rem_minmax(16rem,0.96fr)_minmax(24rem,1.7fr)]">
        {/* Signals — the fixed set */}
        <div className="flex flex-col border-b border-black/12 lg:border-b-0 lg:border-r">
          <ColumnHead>
            <HeadLabel>{t.columns.signals.label}</HeadLabel>
            <MonoNote>{t.columns.signals.note}</MonoNote>
          </ColumnHead>
          <div
            role="group"
            aria-label={t.signalsAriaLabel}
            className="grid min-h-0 flex-1 sm:grid-cols-2 lg:grid-cols-1 lg:grid-rows-4"
          >
            {SIGNALS.map((signal, index) => {
              const Icon = signal.Icon;
              const words = t.signals[signal.id];
              const selected = activeSignalIds.includes(signal.id);
              // An unselected row still earns its space: it says how much of
              // the right-hand column it feeds, which is the one fact the
              // grid cannot show until you pick it.
              const feeds = USE_CASES.filter((item) =>
                item.uses.includes(signal.id),
              ).length;
              return (
                <button
                  key={signal.id}
                  type="button"
                  aria-pressed={selected}
                  aria-controls="decision-readout use-case-grid"
                  onMouseEnter={() => {
                    interactionRef.current = true;
                    setActiveUseCaseId(null);
                    setActiveId(signal.id);
                  }}
                  onMouseLeave={() => {
                    interactionRef.current = false;
                  }}
                  onFocus={() => {
                    interactionRef.current = true;
                    setActiveUseCaseId(null);
                    setActiveId(signal.id);
                  }}
                  onBlur={() => {
                    interactionRef.current = false;
                  }}
                  onClick={() => {
                    setActiveUseCaseId(null);
                    setActiveId(signal.id);
                  }}
                  className={`group relative flex min-h-[6.75rem] flex-col justify-center border-black/12 px-4 py-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-signal-ink sm:px-5 ${
                    index > 0 ? "border-t" : ""
                  } ${index % 2 === 1 ? "sm:border-l lg:border-l-0" : ""} ${
                    index > 1 ? "sm:border-t" : ""
                  } ${selected ? "" : "hover:bg-black/[0.025]"}`}
                  style={
                    selected
                      ? {
                          backgroundColor: `${signal.hue}17`,
                          boxShadow: `inset 3px 0 0 0 ${signal.hue}`,
                        }
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
                        {words.label}
                      </p>
                    </div>
                    <span
                      className="shrink-0 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] transition-colors"
                      style={{
                        color: selected ? signal.hue : "rgba(0,0,0,0.58)",
                      }}
                    >
                      {words.layer}
                    </span>
                  </div>
                  {/* One slot, fixed height, two states: the sentence when the
                      signal is chosen, its share of the grid when it is not.
                      Fixed so the four rows never change height. */}
                  <div className="relative mt-2.5 min-h-[2.25rem]">
                    <p
                      className={`max-w-[32ch] text-[12px] leading-[1.5] text-black/70 transition-opacity duration-300 ${
                        selected ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      {words.scope}
                    </p>
                    <p
                      aria-hidden={selected}
                      className={`absolute inset-x-0 top-0 font-mono text-[11px] uppercase tracking-[0.08em] text-black/45 transition-opacity duration-300 ${
                        selected ? "opacity-0" : "opacity-100"
                      }`}
                    >
                      {t.feedsBefore}
                      {feeds}
                      {t.feedsBetween}
                      {USE_CASES.length}
                    </p>
                  </div>
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
                {activeSignalIds.map((signalId) => {
                  const index = SIGNALS.findIndex(
                    (signal) => signal.id === signalId,
                  );
                  return (
                    <path
                      key={signalId}
                      d={curve(
                        inTrack.height * (0.125 + index * 0.25),
                        nodeY ?? inTrack.height / 2,
                      )}
                      fill="none"
                      pathLength={1}
                      strokeDasharray={1}
                      strokeWidth={1.5}
                      stroke={HUE[signalId]}
                      className="signal-wire-draw"
                    />
                  );
                })}
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
            <HeadLabel>{t.columns.journey.label}</HeadLabel>
            <MonoNote>{t.columns.journey.note}</MonoNote>
          </ColumnHead>
          <div
            id="decision-readout"
            className="flex min-h-0 flex-1 flex-col justify-center gap-5 px-5 py-7 sm:px-6"
          >
            <p className="max-w-[30ch] text-[15px] font-semibold leading-[1.35] text-ink-deep">
              {activeWords.does}
            </p>

            <div>
              <MonoNote>
                {t.inputBefore}
                {activeWords.label}
                {t.inputAfter}
              </MonoNote>
              <div className="mt-2 rounded-md border border-black/14 bg-ground px-4 py-3">
                <p className="font-mono text-[11.5px] leading-[1.7] text-ink-deep">
                  {active.inputs.join(", ")}
                </p>
              </div>
              {/* The scope line stays: it is the only place on the page that
                  says what Beseam does not read. */}
              <p className="mt-2 text-[11.5px] leading-[1.5] text-black/58">
                {activeWords.caveat}
              </p>
            </div>

            <div>
              <MonoNote>{t.platformLabel}</MonoNote>
              <div
                ref={platformRef}
                className="mt-2 rounded-md border-2 border-ink-deep px-5 py-5"
              >
                <p className="font-display text-[clamp(1.4rem,1.9vw,1.85rem)] leading-[1.1] tracking-[-0.02em] text-ink-deep">
                  {t.platformQuestion}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Use cases — the growing set */}
        <div className="flex flex-col">
          <ColumnHead>
            <HeadLabel>{t.columns.useCases.label}</HeadLabel>
            <div className="flex items-center gap-5">
              {exploreHref ? (
                <Link
                  href={exploreHref}
                  className="group inline-flex items-center gap-1.5 whitespace-nowrap text-[12px] font-semibold text-signal-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-ink focus-visible:ring-offset-2"
                >
                  {exploreLabel ?? t.explore}
                  <ArrowRight
                    aria-hidden="true"
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              ) : (
                <MonoNote>{t.columns.useCases.noLinkNote}</MonoNote>
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
                className="pointer-events-none absolute inset-0 z-20 hidden h-full w-full lg:block"
              >
                {(() => {
                  const origin = nodeY ?? fan.h / 2;
                  return USE_CASES.map((item, index) => {
                    const card = fan.cards[index];
                    const shouldDraw = activeUseCaseId
                      ? item.id === activeUseCaseId
                      : item.uses.includes(activeId);
                    if (!shouldDraw || !card) return null;
                    return (
                      <g key={`${activeId}-${item.id}`}>
                        <path
                          d={curve(origin, card.y, card.x)}
                          fill="none"
                          pathLength={1}
                          strokeDasharray={1}
                          strokeWidth={1.25}
                          stroke={active.hue}
                          className="signal-wire-draw"
                        />
                        <circle
                          cx={hair(card.x)}
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
              className="relative z-10 grid h-full grid-cols-2 gap-2 p-2 sm:gap-2.5 sm:p-2.5"
            >
              {USE_CASES.map((item, index) => {
                const card = t.cards[item.id];
                const related = activeUseCaseId
                  ? item.id === activeUseCaseId
                  : item.uses.includes(activeId);
                const activate = () => {
                  interactionRef.current = true;
                  setActiveUseCaseId(item.id);
                  setActiveId(item.uses[0]);
                };
                const release = () => {
                  interactionRef.current = false;
                  setActiveUseCaseId(null);
                };
                return (
                  <li
                    key={item.id}
                    ref={(node) => {
                      cardRefs.current[index] = node;
                    }}
                    className="min-w-0"
                  >
                    <button
                      type="button"
                      aria-pressed={activeUseCaseId === item.id}
                      onMouseEnter={activate}
                      onMouseLeave={release}
                      onFocus={activate}
                      onBlur={release}
                      onClick={activate}
                      className={`relative h-full w-full cursor-pointer rounded-md border px-3.5 py-2.5 text-left transition-[background-color,border-color,box-shadow] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-ink sm:px-4 ${
                        related ? "bg-white" : "bg-ground"
                      }`}
                      style={{
                        borderColor: related ? active.hue : "rgba(0,0,0,0.10)",
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
                        {t.signalsUsed}{" "}
                        {item.uses
                          .map((use) => t.signals[use].label)
                          .join(", ")}
                        .
                      </span>
                      <p
                        className={`mt-2 text-[13px] font-semibold leading-[1.3] transition-colors duration-300 ${
                          related ? "text-ink-deep" : "text-black/64"
                        }`}
                      >
                        {card.name}
                      </p>
                      <div className="relative mt-1 hidden min-h-[2.05rem] sm:block">
                        <p
                          className={`text-[11.5px] leading-[1.45] text-black/62 transition-opacity duration-300 ${
                            related ? "opacity-100" : "opacity-0"
                          }`}
                        >
                          {card.detail}
                        </p>
                        <p
                          aria-hidden="true"
                          className={`absolute inset-x-0 top-0 font-mono text-[10.5px] uppercase tracking-[0.08em] text-black/42 transition-opacity duration-300 ${
                            related ? "opacity-0" : "opacity-100"
                          }`}
                        >
                          {item.uses.map((use) => t.short[use]).join(" · ")}
                        </p>
                      </div>
                    </button>
                  </li>
                );
              })}
              <li className="rounded-md border border-dashed border-black/16 px-3.5 py-3 sm:px-4">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-black/45">
                  {t.moreLabel}
                </p>
                <p className="mt-2 text-[11.5px] leading-[1.45] text-black/55">
                  {t.moreDetail}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
