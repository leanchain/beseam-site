"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";

import { ArrowRight } from "lucide-react";

import type { PageCopy } from "@/i18n/pages";

type DashboardCopy = PageCopy["fit"]["dashboard"];

/**
 * The figures from the product video's dashboard. They are illustrative, and
 * the dashboard says so in its badge.
 */
const FUNNEL = [18240, 15960, 6310, 5480, 2190] as const;
const CONVERSION = { used: 6.4, notUsed: 2.9 } as const;
const RETURNS = { used: 5.1, notUsed: 13.7 } as const;

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
 * of widget sessions, conversion and size-related returns with and without
 * Beseam Fit, and activity over time. Numbers count up, bars fill and lines
 * draw once it scrolls into view; with reduced motion it shows the final
 * state straight away.
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

  const integer = new Intl.NumberFormat(numberLocale);
  const decimal = new Intl.NumberFormat(numberLocale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const percent = (value: number) => `${decimal.format(value)}%`;
  const lift = decimal.format(CONVERSION.used / CONVERSION.notUsed);
  const drop = Math.round((1 - RETURNS.used / RETURNS.notUsed) * 100);

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
                    {integer.format(Math.round(value * progress))}
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

        {/* With and without Beseam Fit. */}
        <div className="grid gap-4 md:grid-cols-2">
          <Comparison
            title={copy.conversion}
            hint={copy.conversionHint}
            badge={`${lift}× ${copy.higher}`}
            badgeClass="bg-signal text-ink-deep"
            rows={[
              { label: copy.used, value: CONVERSION.used, strong: true },
              { label: copy.notUsed, value: CONVERSION.notUsed },
            ]}
            scale={8}
            progress={progress}
            format={percent}
          />
          <Comparison
            title={copy.returns}
            hint={copy.returnsHint}
            badge={`−${drop}%`}
            badgeClass="text-white"
            badgeStyle={{ background: ACCENT }}
            rows={[
              { label: copy.used, value: RETURNS.used, strong: true },
              { label: copy.notUsed, value: RETURNS.notUsed },
            ]}
            scale={16}
            progress={progress}
            format={percent}
          />
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
      </div>
    </div>
  );
}

function Comparison({
  title,
  hint,
  badge,
  badgeClass,
  badgeStyle,
  rows,
  scale,
  progress,
  format,
}: {
  title: string;
  hint: string;
  badge: string;
  badgeClass: string;
  badgeStyle?: CSSProperties;
  rows: { label: string; value: number; strong?: boolean }[];
  /** The value that fills a bar completely. */
  scale: number;
  progress: number;
  format: (value: number) => string;
}) {
  return (
    <div className="rounded-media border border-black/10 p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[13px] font-semibold text-ink-deep">{title}</p>
          <p className="mt-0.5 text-[12px] text-black/50">{hint}</p>
        </div>
        <span
          className={`shrink-0 rounded-button px-2.5 py-1 text-[12px] font-semibold transition-opacity duration-500 ${badgeClass}`}
          style={{ ...badgeStyle, opacity: progress > 0.6 ? 1 : 0 }}
        >
          {badge}
        </span>
      </div>
      <ul className="mt-4 space-y-3">
        {rows.map((row) => (
          <li key={row.label}>
            <div className="flex items-baseline justify-between gap-3 text-[13px]">
              <span className="text-black/64">{row.label}</span>
              <span className="font-semibold tabular-nums text-ink-deep">
                {format(row.value * progress)}
              </span>
            </div>
            <span className="mt-1.5 block h-2 overflow-hidden rounded-full bg-black/[0.07]">
              <span
                className={`block h-full rounded-full ${row.strong ? "bg-ink-deep" : "bg-black/25"}`}
                style={{
                  width: `${Math.min(100, (row.value / scale) * 100 * progress)}%`,
                }}
              />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
