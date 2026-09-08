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

const LOOP_STEPS = ["Find", "Prepare", "Approve", "Apply", "Measure"] as const;

const START = -90;
const SPAN = 360 / LOOP_STEPS.length;
/** Clears the node ring (asin(25/122) ~ 12deg) plus the arrowhead. */
const TRIM = 19;

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
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <figure className={className}>
      <svg
        viewBox="26 26 462 340"
        role="img"
        aria-labelledby="beseam-loop-title beseam-loop-desc"
        className={`h-auto w-full max-w-[32rem] ${
          tone === "dark" ? "text-white" : "text-ink-deep"
        }`}
      >
        <title id="beseam-loop-title">The Beseam operating loop</title>
        <desc id="beseam-loop-desc">
          Five steps arranged in a circle, each arrow pointing to the next:
          Find, Prepare, Approve, Apply, Measure. Measure leads back to Find.
        </desc>

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
            <path d="M0 0 L10 5 L0 10 Z" fill="currentColor" />
          </marker>
        </defs>

        {LOOP_STEPS.map((label, index) => {
          const from = polar(START + index * SPAN + TRIM, R);
          const to = polar(START + (index + 1) * SPAN - TRIM, R);
          return (
            <path
              key={`arc-${label}`}
              d={`M ${from.x.toFixed(1)} ${from.y.toFixed(1)} A ${R} ${R} 0 0 1 ${to.x.toFixed(1)} ${to.y.toFixed(1)}`}
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.38"
              strokeWidth="1.5"
              markerEnd="url(#beseam-loop-arrow)"
            />
          );
        })}

        {LOOP_STEPS.map((label, index) => {
          const angle = START + index * SPAN;
          const node = polar(angle, R);
          const caption = polar(angle, R + 46);
          const cos = Math.cos((angle * Math.PI) / 180);
          const anchor =
            Math.abs(cos) < 0.25 ? "middle" : cos > 0 ? "start" : "end";

          return (
            <g key={label}>
              <circle
                cx={node.x}
                cy={node.y}
                r="25"
                fill="currentColor"
                fillOpacity="0.05"
                stroke="currentColor"
                strokeOpacity="0.28"
                strokeWidth="1.25"
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
              <text
                x={caption.x}
                y={caption.y}
                textAnchor={anchor}
                dominantBaseline="central"
                fill="currentColor"
                className="text-[17px] font-semibold"
              >
                {label}
              </text>
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
          Continuous
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
          loop
        </text>
      </svg>

      <figcaption
        className={`mt-4 max-w-[36ch] text-[13px] leading-[1.6] ${
          tone === "dark" ? "text-white/60" : "text-black/54"
        }`}
      >
        Measure does not end the work. It starts the next Find.
      </figcaption>
    </figure>
  );
}
