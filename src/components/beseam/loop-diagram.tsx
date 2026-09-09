import type { CSSProperties } from "react";

import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/locale-rules.mjs";

/**
 * The loop, drawn as a loop.
 *
 * The manifesto called the work "one continuous loop" and then showed five
 * rows of a list, which is a table wearing a loop's caption. A merchant read
 * it back to us exactly that way: "It doesn't seem like a loop. It's a table."
 * This is the picture that sentence was promising.
 *
 * Inline SVG on purpose -- no dependency, no animation, and every colour comes
 * from `currentColor`, so it follows the surrounding theme instead of burning
 * a palette into an exported asset. The wrapper decides the ink.
 *
 * Legibility is the whole point of the picture, so the geometry is sized for
 * it. The viewBox is cropped to the drawing's own bounding box rather than a
 * round 520x424 with 60-odd units of dead margin, because that margin is
 * rendered-pixel budget the labels never get back: the same merchant who
 * could not read the four-step panels said "it's so small" about a square she
 * had to lean in to read. On top of that, the two smallest texts step up
 * below `sm`, where the figure is squeezed into a ~350px column and the
 * uniform scale factor drops to ~0.76 -- without the step the numerals and
 * the centre caption render at ~9px on a phone. Nothing in this figure is
 * allowed to render below 11px at 390px, 768px, 1280px or 1440px.
 *
 * Do not add a `max-w` override at the call site: the svg already self-caps
 * at `max-w-[32rem]`, and a narrower wrapper scales every label down with it.
 *
 * Rendered once per page; the marker id is static for that reason.
 */
const CX = 260;
const CY = 212;
const R = 122;

/**
 * The live ring borrows `#proof`'s palette exactly, not approximately: the
 * evidence trace draws its wires as a dimmed accent rail with accent dashes
 * marching on it, never grey, and the two figures are one screen apart. The
 * rail mix and the accent are the same values `connected-evidence.tsx` uses --
 * change one and change both, or the sections stop reading as one system.
 *
 * Only the arcs and the node rings take it. Numerals, labels and the centre
 * caption stay on `currentColor`, because they are read rather than traced and
 * accent text at 13px on ink loses too much contrast.
 */
const ACCENT = "#e8653a";
const ACCENT_RAIL = `color-mix(in srgb, ${ACCENT} 34%, transparent)`;
const ACCENT_RING = `color-mix(in srgb, ${ACCENT} 52%, transparent)`;

/**
 * The verb is the step; the second line is who does it and to what.
 *
 * The bare verbs alone cost the homepage something real when this figure
 * replaced the chip rail there: "Approve" does not say the merchant approves,
 * and "Apply" does not say Beseam is the one shipping it. The rail's labels
 * did ("You approve", "Beseam applies it"). `detail` puts that back without
 * touching /how-we-work or /manifesto, where a numbered list underneath
 * already spells the same five steps out and a second gloss would just be a
 * third telling.
 *
 * Order and the gate flag are geometry, so they stay here; the words are in
 * `t.loop.steps`, keyed by the same ids.
 */
const LOOP_STEPS = [
  { id: "find" },
  { id: "prepare" },
  { id: "approve", gate: true },
  { id: "apply" },
  { id: "measure" },
] as const;

const START = -90;
const SPAN = 360 / LOOP_STEPS.length;
/**
 * Clears the node ring (asin(25/122) ~ 12deg) plus the arrowhead.
 *
 * 19deg left a 38deg hole in a 72deg arc -- more gap than stroke, which reads
 * as five separate strokes rather than a ring. 15.5 is the smallest value that
 * still lands the arrowhead clear of the node it points at.
 */
const TRIM = 15.5;

function polar(deg: number, radius: number) {
  const rad = (deg * Math.PI) / 180;
  return {
    x: CX + radius * Math.cos(rad),
    y: CY + radius * Math.sin(rad),
  };
}

export default function LoopDiagram({
  className,
  tone = "light",
  detail = false,
  animate = false,
  locale = "en",
  size = "default",
}: {
  className?: string;
  tone?: "light" | "dark";
  /** Second line under each step naming the actor. See `LOOP_STEPS`. */
  detail?: boolean;
  /** Marching current on the ring. Off by default: /how-we-work and
   *  /manifesto were shipped as a still figure and are not being changed
   *  underneath. */
  animate?: boolean;
  /** Defaulted because /how-we-work and /manifesto mount this propless and
   *  have no German route; the homepage hands it the page's own locale. */
  locale?: Locale;
  /** `default` keeps the original 32rem cap. `lg` is the platform variant. */
  size?: "default" | "lg";
}) {
  const t = getDictionary(locale).loop;

  return (
    <figure
      className={className}
      style={size === "lg" ? { width: "35rem", maxWidth: "100%" } : undefined}
    >
      <svg
        viewBox="26 26 462 340"
        role="img"
        aria-labelledby="beseam-loop-title beseam-loop-desc"
        className={`h-auto w-full ${size === "lg" ? "max-w-none" : "max-w-[32rem]"} ${
          tone === "dark" ? "text-white" : "text-ink-deep"
        }`}
      >
        <title id="beseam-loop-title">{t.title}</title>
        <desc id="beseam-loop-desc">{t.desc}</desc>

        <defs>
          <marker
            id="beseam-loop-arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="5.5"
            markerHeight="5.5"
            orient="auto-start-reverse"
          >
            <path
              d="M0 0 L10 5 L0 10 Z"
              fill={animate ? ACCENT_RAIL : "currentColor"}
            />
          </marker>
        </defs>

        {LOOP_STEPS.map(({ id }, index) => {
          const from = polar(START + index * SPAN + TRIM, R);
          const to = polar(START + (index + 1) * SPAN - TRIM, R);
          const d = `M ${from.x.toFixed(1)} ${from.y.toFixed(1)} A ${R} ${R} 0 0 1 ${to.x.toFixed(1)} ${to.y.toFixed(1)}`;
          return (
            <g key={`arc-${id}`}>
              {/* Rail first, current over it: the arc has to stay readable
                  when the dashes are frozen by reduced motion, and the
                  arrowhead belongs to the rail so it never marches. */}
              <path
                d={d}
                fill="none"
                stroke={animate ? ACCENT_RAIL : "currentColor"}
                strokeOpacity={animate ? undefined : 0.38}
                strokeWidth="1.5"
                markerEnd="url(#beseam-loop-arrow)"
              />
              {animate ? (
                <path
                  d={d}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  className="loop-current text-signal"
                  style={{ "--loop-i": index } as CSSProperties}
                />
              ) : null}
            </g>
          );
        })}

        {LOOP_STEPS.map((step, index) => {
          const words = t.steps[step.id];
          const angle = START + index * SPAN;
          const node = polar(angle, R);
          const caption = polar(angle, R + 46);
          const cos = Math.cos((angle * Math.PI) / 180);
          const anchor =
            Math.abs(cos) < 0.25 ? "middle" : cos > 0 ? "start" : "end";
          /* The one step the merchant performs. Nothing else in the ring is
             signal-coloured, so the gate is findable in a glance -- which is
             the whole reason the loop is on a marketing page. */
          const gate = detail && "gate" in step && step.gate;

          return (
            <g key={step.id} className={gate ? "text-signal" : undefined}>
              <circle
                cx={node.x}
                cy={node.y}
                r="25"
                fill={animate && !gate ? ACCENT : "currentColor"}
                fillOpacity={gate ? 0.12 : animate ? 0.07 : 0.05}
                stroke={animate && !gate ? ACCENT_RING : "currentColor"}
                strokeOpacity={gate ? 0.85 : animate ? undefined : 0.28}
                strokeWidth={gate ? 1.75 : 1.25}
              />
              <text
                x={node.x}
                y={node.y}
                textAnchor="middle"
                dominantBaseline="central"
                fill="currentColor"
                fillOpacity="0.6"
                className="font-mono text-[15px] font-semibold sm:text-[13px]"
              >
                {"0" + String(index + 1)}
              </text>
              {/* Two lines centre on the one-line baseline rather than
                  hanging off it, so turning `detail` on does not shift the
                  ring's optical centre. 9px each way keeps the second line
                  clear of the node ring at every step. */}
              <text
                x={caption.x}
                y={detail ? caption.y - 9 : caption.y}
                textAnchor={anchor}
                dominantBaseline="central"
                fill="currentColor"
                className="text-[17px] font-semibold"
              >
                {words.label}
              </text>
              {detail ? (
                <text
                  x={caption.x}
                  y={caption.y + 9}
                  textAnchor={anchor}
                  dominantBaseline="central"
                  fill="currentColor"
                  fillOpacity={gate ? 0.9 : 0.55}
                  className="text-[12.5px]"
                >
                  {words.detail}
                </text>
              ) : null}
            </g>
          );
        })}

        <text
          x={CX}
          y={CY - 8}
          textAnchor="middle"
          dominantBaseline="central"
          fill="currentColor"
          fillOpacity="0.45"
          className="font-mono text-[15px] font-semibold uppercase tracking-[0.12em] sm:text-[12px]"
        >
          {t.centre.line1}
        </text>
        <text
          x={CX}
          y={CY + 14}
          textAnchor="middle"
          dominantBaseline="central"
          fill="currentColor"
          fillOpacity="0.45"
          className="font-mono text-[15px] font-semibold uppercase tracking-[0.12em] sm:text-[12px]"
        >
          {t.centre.line2}
        </text>
      </svg>

      {/* The caption explains a picture that, with `detail` on, no longer
          needs explaining: 05 is labelled "the same journey" and its arrow
          lands on 01 in view. Left in for the bare figure, where the verbs
          alone do leave the question open. */}
      {detail ? null : (
        <figcaption
          className={`mt-4 max-w-[36ch] text-[13px] leading-[1.6] ${
            tone === "dark" ? "text-white/60" : "text-black/54"
          }`}
        >
          {t.caption}
        </figcaption>
      )}
    </figure>
  );
}
