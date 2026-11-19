"use client";

import { useEffect, useId, useRef, useState } from "react";

import { ArrowRight } from "lucide-react";

import type { PageCopy } from "@/i18n/pages";

type DashboardCopy = PageCopy["fit"]["dashboard"];

/**
 * Made-up figures that show the layout of the analytics. They are labelled as
 * an illustration on the dashboard itself, and the dashboard shows no result
 * (no with/without comparison, no lift): a number here must never read as
 * something Beseam Fit achieved.
 */
const FUNNEL = [18240, 15960, 6310, 5480, 2190] as const;

/**
 * Thousands separators, written out. `Intl.NumberFormat("de-CH")` groups with
 * U+2019 in Node and with an ASCII apostrophe in some browsers, so server and
 * client markup differed and React threw a hydration error (#418). A fixed
 * table renders the same everywhere. A locale missing here fails the build.
 */
const GROUP_SEPARATOR: Record<string, string> = {
  "en-GB": ",",
  "de-CH": "'",
  "nl-NL": ".",
};

function formatInteger(value: number, locale: string) {
  const separator = GROUP_SEPARATOR[locale];
  if (separator === undefined) {
    throw new Error(`No thousands separator defined for locale ${locale}`);
  }
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}

const ACCENT = "#e8573a";
const DURATION_MS = 1600;

/**
 * Two daily series over 120 days, rising with some wobble, as in the video.
 * A fixed formula rather than random numbers, so server and client render
 * the same markup.
 */
const DAYS = 120;
const recommended = Array.from({ length: DAYS }, (_, day) => {
  const trend = 18 + 52 * (1 - Math.exp(-day / 45));
  return trend + 5 * Math.sin(day / 4.5) + 3 * Math.sin(day / 1.7);
});
const addedToCart = recommended.map(
  (value, day) => value * 0.4 + 2 * Math.sin(day / 3.1),
);

function linePath(values: readonly number[], width: number, height: number) {
  const max = 80;
  return values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * width;
      const y = height - (value / max) * height;
      return `${index === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

/**
 * Animated version of the analytics dashboard shown in the video: the funnel
 * of widget sessions and activity over time, as an illustration. Numbers
 * count up and lines draw once it scrolls into view; with reduced motion it
 * shows the final state straight away.
 */
export default function FitDashboard({
  copy,
  numberLocale,
}: {
  copy: DashboardCopy;
  numberLocale: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // useId can contain characters that break a url(#...) reference.
  const clipId = `fit-chart-${useId().replace(/[^a-zA-Z0-9-]/g, "")}`;
  // 1 on the server, so the markup without JavaScript is complete.
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const element = ref.current;
    if (!element) return;
    setProgress(0);
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / DURATION_MS);
          setProgress(1 - Math.pow(1 - t, 3));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.3 },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  const chartWidth = 600;
  const chartHeight = 140;

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-media border border-black/10 bg-white text-left shadow-[0_30px_70px_-40px_rgba(17,19,24,0.45)]"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/10 px-5 py-4 sm:px-7">
        <p className="font-display text-[18px] font-semibold tracking-[-0.02em] text-ink-deep sm:text-[20px]">
          {copy.title}
        </p>
        <div className="flex items-center gap-2 text-[12px] font-semibold">
          <span className="rounded-button bg-signal px-2.5 py-1 text-ink-deep">
            {copy.badge}
          </span>
          <span className="text-black/50">{copy.period}</span>
        </div>
      </div>

      <div className="space-y-4 p-5 sm:p-7">
        {/* The funnel of sessions with the widget. */}
        <div className="rounded-media border border-black/10 p-4 sm:p-5">
          <p className="text-[13px] font-semibold text-ink-deep">
            {copy.sessions}
          </p>
          <ol className="mt-4 grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3 lg:grid-cols-5">
            {FUNNEL.map((value, index) => {
              const previous = FUNNEL[index - 1];
              const last = index === FUNNEL.length - 1;
              return (
                <li key={copy.funnel[index]} className="min-w-0">
                  <p className="truncate text-[12px] text-black/55">
                    {copy.funnel[index]}
                  </p>
                  <p
                    className="mt-1 font-display text-[24px] font-semibold tabular-nums leading-none tracking-[-0.02em] sm:text-[28px]"
                    style={{ color: last ? ACCENT : "#111318" }}
                  >
                    {formatInteger(Math.round(value * progress), numberLocale)}
                  </p>
                  {previous ? (
                    <p className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-black/45">
                      <ArrowRight aria-hidden="true" className="h-3 w-3" />
                      {Math.round((value / previous) * 100)}%
                    </p>
                  ) : null}
                </li>
              );
            })}
          </ol>
        </div>

        {/* Activity over time. */}
        <div className="rounded-media border border-black/10 p-4 sm:p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-[13px] font-semibold text-ink-deep">
                {copy.activity}
              </p>
              <p className="mt-0.5 text-[12px] text-black/50">
                {copy.activityHint}
              </p>
            </div>
            <div className="flex items-center gap-4 text-[12px] text-black/55">
              <span className="inline-flex items-center gap-1.5">
                <span
                  className="h-0.5 w-4 rounded-full"
                  style={{ background: ACCENT }}
                />
                {copy.legendRecommended}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-0.5 w-4 rounded-full bg-ink-deep" />
                {copy.legendCart}
              </span>
            </div>
          </div>
          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            preserveAspectRatio="none"
            aria-hidden="true"
            className="mt-4 block h-32 w-full sm:h-40"
          >
            {/* The lines are revealed left to right by a growing clip. */}
            <defs>
              <clipPath id={clipId}>
                <rect width={chartWidth * progress} height={chartHeight} />
              </clipPath>
            </defs>
            <g clipPath={`url(#${clipId})`}>
              <path
                d={`${linePath(recommended, chartWidth, chartHeight)} L${chartWidth},${chartHeight} L0,${chartHeight} Z`}
                fill={ACCENT}
                opacity={0.08}
              />
              {[
                { values: recommended, color: ACCENT },
                { values: addedToCart, color: "#111318" },
              ].map(({ values, color }) => (
                <path
                  key={color}
                  d={linePath(values, chartWidth, chartHeight)}
                  fill="none"
                  stroke={color}
                  strokeWidth={2}
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </g>
          </svg>
        </div>

        <p className="text-[12px] leading-snug text-black/55">{copy.note}</p>
      </div>
    </div>
  );
}
