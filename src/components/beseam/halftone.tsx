import type { BeamCorner } from "@/components/beseam/beams";

/**
 * Halftone edge element: a two-colour dot grid that dissolves out of one
 * corner of a block, like pixels resolving into a product. A true halftone --
 * the dots shrink with distance from the corner rather than fading -- with
 * the two colours on alternating rows, offset half a step like a print
 * screen. Small dots at about 80% strength, one corner per block, so it
 * reads as a deliberate accent without competing with the content.
 *
 * Drawn once, growing from the bottom-right; other corners mirror it. The
 * parent must be `relative` and clip its overflow.
 */
const PLACEMENT: Record<BeamCorner, string> = {
  "bottom-right": "bottom-0 right-0",
  "top-right": "top-0 right-0 -scale-y-100",
  "bottom-left": "bottom-0 left-0 -scale-x-100",
  "top-left": "top-0 left-0 rotate-180",
};

const STEP = 12;
const MAX_RADIUS = 3.6;

export default function Halftone({
  corner = "bottom-right",
  size = 280,
  colors = ["#f5c400", "#a98bf0"],
  opacity = 0.8,
  className = "",
}: {
  corner?: BeamCorner;
  /** Width and height in CSS pixels. */
  size?: number;
  /** The two alternating dot colours. */
  colors?: readonly [string, string];
  opacity?: number;
  /** Extra classes, e.g. to show a set only from a breakpoint up. */
  className?: string;
}) {
  const count = Math.ceil(size / STEP);
  const dots: { x: number; y: number; r: number; fill: string }[] = [];
  for (let row = 0; row < count; row += 1) {
    for (let col = 0; col < count; col += 1) {
      const x = size - col * STEP - (row % 2 ? STEP / 2 : 0);
      const y = size - row * STEP;
      const distance = Math.hypot(size - x, size - y) / size;
      const r = MAX_RADIUS * (1 - distance * 1.15);
      if (r < 0.35 || x < 0) continue;
      dots.push({ x, y, r, fill: colors[row % 2] });
    }
  }
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${size} ${size}`}
      className={`pointer-events-none absolute z-0 ${PLACEMENT[corner]} ${className}`}
      style={{ width: size, height: size, opacity }}
    >
      {dots.map(({ x, y, r, fill }) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={r.toFixed(2)} fill={fill} />
      ))}
    </svg>
  );
}
