"use client";

import { useEffect, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";

import { Check, Plug, TrendingUp, Zap } from "lucide-react";

import Halftone from "@/components/beseam/halftone";
import { Reveal } from "@/components/beseam/reveal";
import { getDictionary, type Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/locale-rules.mjs";

type Steps = Dictionary["sections"]["howItWorks"]["steps"];
type StepKey = keyof Steps;

const STEPS: readonly StepKey[] = ["connect", "actions", "approve", "measure"];
const STEP_MS = 6000;

/**
 * Four steps on one side, one animated product panel on the other. The steps
 * play in order on their own, each with a progress bar; hovering the section
 * or tabbing into it pauses it, and clicking a step jumps there. The progress bar's own CSS
 * animation drives the timing, so pausing the bar pauses the sequence.
 *
 * With reduced motion the sequence never auto-advances and nothing animates:
 * the steps are plain tabs.
 */
export default function HowItWorks({ locale = "en" }: { locale?: Locale }) {
  const t = getDictionary(locale).sections.howItWorks;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [autoplay, setAutoplay] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setAutoplay(!query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const next = () => setActive((index) => (index + 1) % STEPS.length);

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    const delta = event.key === "ArrowDown" ? 1 : -1;
    const target = (active + delta + STEPS.length) % STEPS.length;
    setActive(target);
    document.getElementById(`how-step-${STEPS[target]}`)?.focus();
  };

  return (
    <section
      id="how-it-works"
      className="scroll-mt-24 bg-ground px-3 py-10 sm:px-6 sm:py-12 lg:px-10 lg:py-14"
    >
      {/* A contained sunflower card on the white page, rather than a
          full-width band: it stands out without becoming a wall of colour. */}
      <div className="relative isolate mx-auto max-w-[80rem] overflow-hidden rounded-media bg-signal px-5 py-12 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
        {/* White and lilac, since yellow dots would vanish on the card. */}
        <Halftone
          corner="top-left"
          size={130}
          colors={["#ffffff", "#a98bf0"]}
          className="hidden lg:block"
        />
        <Halftone
          corner="bottom-right"
          size={170}
          colors={["#ffffff", "#a98bf0"]}
          className="hidden lg:block"
        />
        <Reveal className="relative z-10">
          <h2 className="text-balance text-center font-display text-[clamp(2.25rem,3.6vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink-deep">
            {t.heading}
          </h2>
          <div
            className="mt-10 grid items-center gap-8 lg:mt-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14"
            onPointerEnter={() => setPaused(true)}
            onPointerLeave={() => setPaused(false)}
            // Keyboard focus pauses; a mouse click focuses the step too, but
            // the pointer handlers above already cover that case.
            onFocus={(event) => {
              if ((event.target as HTMLElement).matches(":focus-visible")) {
                setPaused(true);
              }
            }}
            onBlur={() => setPaused(false)}
          >
            <div
              role="tablist"
              aria-orientation="vertical"
              aria-label={t.heading}
              className="flex flex-col gap-3"
            >
              {STEPS.map((key, index) => {
                const step = t.steps[key];
                const selected = index === active;
                return (
                  <button
                    key={key}
                    id={`how-step-${key}`}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls="how-panel"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActive(index)}
                    onKeyDown={onKeyDown}
                    className={`relative overflow-hidden rounded-media border px-5 py-4 text-left transition-colors focus-visible:ring-2 focus-visible:ring-signal-ink ${
                      selected
                        ? "border-black/12 bg-white shadow-[0_18px_40px_-28px_rgba(17,19,24,0.4)]"
                        : "border-transparent hover:bg-white/40"
                    }`}
                  >
                    <span className="flex items-center gap-4">
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-mono text-[13px] font-semibold transition-colors ${
                          selected
                            ? "bg-signal-ink text-white"
                            : "bg-black/[0.08] text-black/70"
                        }`}
                      >
                        {index + 1}
                      </span>
                      <span>
                        <span className="block font-display font-semibold text-[11px] uppercase tracking-[0.08em] text-black/60">
                          {t.stepLabel(index + 1)}
                        </span>
                        <span
                          className={`block text-[18px] font-semibold tracking-[-0.01em] ${
                            selected ? "text-ink-deep" : "text-black/75"
                          }`}
                        >
                          {step.title}
                        </span>
                      </span>
                    </span>
                    {/* Only the active step shows its body: the list reads
                        as an accordion that follows the sequence. */}
                    <span
                      className={`grid transition-[grid-template-rows] duration-300 ${
                        selected ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <span className="overflow-hidden">
                        <span className="block pl-13 pt-2 text-[15px] leading-[1.6] text-black/64">
                          {step.body}
                        </span>
                      </span>
                    </span>
                    {selected && autoplay && (
                      <span
                        key={`progress-${active}`}
                        aria-hidden="true"
                        className="how-step-progress absolute inset-x-0 bottom-0 h-[3px] origin-left bg-signal"
                        style={{
                          animationDuration: `${STEP_MS}ms`,
                          animationPlayState: paused ? "paused" : "running",
                        }}
                        onAnimationEnd={next}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <div
              id="how-panel"
              role="tabpanel"
              aria-labelledby={`how-step-${STEPS[active]}`}
              className="rounded-media bg-[#fff9e8] p-6 sm:p-10"
            >
              {/* Keyed on the step, so each panel mounts fresh and replays
                  its entrance. */}
              <StepPanel
                key={STEPS[active]}
                step={STEPS[active]}
                steps={t.steps}
                animate={autoplay}
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * Counts up from 0, one item every `stepMs` after `startMs`, so list rows can
 * appear or flip one after another. Without animation everything is shown.
 */
function useStagger(
  enabled: boolean,
  count: number,
  startMs: number,
  stepMs: number,
) {
  const [shown, setShown] = useState(enabled ? 0 : count);
  useEffect(() => {
    if (!enabled) return;
    const timers = Array.from({ length: count }, (_, index) =>
      window.setTimeout(() => setShown(index + 1), startMs + index * stepMs),
    );
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [enabled, count, startMs, stepMs]);
  return shown;
}

/** True one frame after mount, so CSS transitions run from their start state. */
function useEntered(enabled: boolean) {
  const [entered, setEntered] = useState(!enabled);
  useEffect(() => {
    if (!enabled) return;
    const frame = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(frame);
  }, [enabled]);
  return entered;
}

function StepPanel({
  step,
  steps,
  animate,
}: {
  step: StepKey;
  steps: Steps;
  animate: boolean;
}) {
  const entered = useEntered(animate);
  // Rows in the actions list slide in; in the approve panel the two rows
  // flip to approved and then the automate switch turns on.
  const shown = useStagger(
    animate,
    3,
    step === "approve" ? 900 : 300,
    step === "approve" ? 900 : 350,
  );
  const fade = `transition-all duration-500 ${
    entered ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
  }`;

  switch (step) {
    case "connect":
      return (
        <Card label={steps.connect.visual.label} className={fade}>
          <div className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-button bg-[#95bf47] text-[15px] font-bold text-white">
                S
              </span>
              <span className="text-[15px] font-semibold text-ink-deep">
                Shopify
              </span>
            </span>
            <span
              className={`inline-flex items-center gap-2 rounded-button px-3 py-2 text-[13px] font-semibold transition-colors duration-500 delay-700 ${
                entered
                  ? "bg-[#1f7a4d]/[0.1] text-[#1a6b43]"
                  : "bg-signal-ink text-white"
              }`}
            >
              {entered ? (
                <Check aria-hidden="true" className="h-4 w-4" />
              ) : (
                <Plug aria-hidden="true" className="h-4 w-4" />
              )}
              {entered
                ? steps.connect.visual.done
                : steps.connect.visual.action}
            </span>
          </div>
          <div className="mt-6">
            <div className="flex items-baseline justify-between text-[13px]">
              <span className="text-black/58">
                {steps.connect.visual.imported}
              </span>
              <span className="font-mono tabular-nums text-ink-deep">
                1,240
              </span>
            </div>
            <Bar value={entered ? 100 : 0} />
          </div>
        </Card>
      );
    case "actions": {
      const copy = steps.actions.visual;
      const rows = [
        { label: copy.items.description, value: "+€2.4k", high: true },
        { label: copy.items.data, value: "+€1.1k", high: true },
        { label: copy.items.speed, value: "+€600", high: false },
      ];
      return (
        <Card label={copy.label} className={fade}>
          <ol className="space-y-2.5">
            {rows.map(({ label, value, high }, index) => (
              <li
                key={label}
                className={`flex items-center gap-3 rounded-button border border-black/8 px-3 py-2.5 transition-all duration-500 ${
                  shown > index
                    ? "translate-x-0 opacity-100"
                    : "translate-x-4 opacity-0"
                }`}
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black/[0.06] font-mono text-[12px] font-semibold text-black/62">
                  {index + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[14px] font-medium leading-snug text-ink-deep">
                    {label}
                  </span>
                  <span
                    className={`text-[11px] font-semibold ${
                      high ? "text-signal-ink" : "text-black/50"
                    }`}
                  >
                    {high ? copy.impact.high : copy.impact.medium}
                  </span>
                </span>
                <span className="shrink-0 font-mono text-[13px] font-semibold tabular-nums text-[#1a6b43]">
                  {value}
                </span>
              </li>
            ))}
          </ol>
        </Card>
      );
    }
    case "approve": {
      const copy = steps.approve.visual;
      const rows = [copy.items.description, copy.items.data];
      const automated = shown > rows.length;
      return (
        <Card label={copy.label} className={fade}>
          <ul className="divide-y divide-black/8">
            {rows.map((item, index) => {
              const approved = shown > index;
              return (
                <li
                  key={item}
                  className="flex items-center justify-between gap-4 py-3"
                >
                  <span className="text-[14px] text-ink-deep">{item}</span>
                  <span
                    className={`inline-flex shrink-0 items-center gap-1.5 rounded-button px-2.5 py-1 text-[12px] font-semibold transition-colors duration-300 ${
                      approved
                        ? "bg-[#1f7a4d]/[0.1] text-[#1a6b43]"
                        : "bg-signal-ink text-white"
                    }`}
                  >
                    {approved && (
                      <Check aria-hidden="true" className="h-3.5 w-3.5" />
                    )}
                    {approved ? copy.approved : copy.approve}
                  </span>
                </li>
              );
            })}
          </ul>
          <div className="mt-3 flex items-center justify-between gap-4 rounded-button bg-black/[0.04] px-3 py-3">
            <span className="flex items-center gap-2 text-[14px] font-medium text-ink-deep">
              <Zap aria-hidden="true" className="h-4 w-4 text-signal-ink" />
              {copy.automate}
            </span>
            <span
              className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-300 ${
                automated ? "bg-signal-ink" : "bg-black/20"
              }`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-[left] duration-300 ${
                  automated ? "left-[1.375rem]" : "left-0.5"
                }`}
              />
            </span>
          </div>
        </Card>
      );
    }
    case "measure": {
      const bars = [28, 34, 31, 42, 48, 55, 63];
      return (
        <Card label={steps.measure.visual.label} className={fade}>
          <div className="flex h-36 items-end gap-2">
            {bars.map((height, index) => (
              <span
                key={index}
                className="flex-1 rounded-t-[4px] bg-signal-ink/80 transition-[height] duration-700 ease-out"
                style={{
                  height: entered ? `${height + 30}%` : "4%",
                  transitionDelay: `${index * 90}ms`,
                }}
              />
            ))}
          </div>
          <p className="mt-4 flex items-center gap-2 text-[15px] font-semibold text-[#1a6b43]">
            <TrendingUp aria-hidden="true" className="h-4 w-4" />
            {steps.measure.visual.lift}
          </p>
        </Card>
      );
    }
  }
}

function Card({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`overflow-hidden rounded-media border border-black/12 bg-white shadow-[0_18px_40px_-24px_rgba(17,19,24,0.35)] ${className ?? ""}`}
    >
      <p className="border-b border-black/10 px-5 py-3 font-display font-semibold text-[11px] uppercase tracking-[0.08em] text-black/50">
        {label}
      </p>
      <div className="flex min-h-[15rem] flex-col justify-center px-5 py-5">
        {children}
      </div>
    </div>
  );
}

function Bar({ value, delay = 0 }: { value: number; delay?: number }) {
  return (
    <span className="mt-2 block h-2 overflow-hidden rounded-full bg-black/[0.07]">
      <span
        className="block h-full rounded-full bg-signal-ink transition-[width] duration-1000 ease-out"
        style={{ width: `${value}%`, transitionDelay: `${delay}ms` }}
      />
    </span>
  );
}
