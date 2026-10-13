/**
 * Beseam's signature edge element: a few thin two-colour rays fanning in from
 * one corner of a block, fading out well before they reach any content (the
 * name, Be-seam, reads as "beam"). Kept deliberately quiet -- six hairline
 * rays at about half strength, one corner per block -- so it accents a block
 * rather than decorating it.
 *
 * The rays are drawn once, from the bottom-right; the other corners mirror
 * that drawing. The fade is a mask on the element itself, so it mirrors with
 * it. The parent must be `relative` and clip its overflow.
 */
export type BeamCorner =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

const PLACEMENT: Record<BeamCorner, string> = {
  "bottom-right": "-bottom-3 -right-3",
  "top-right": "-top-3 -right-3 -scale-y-100",
  "bottom-left": "-bottom-3 -left-3 -scale-x-100",
  "top-left": "-top-3 -left-3 rotate-180",
};

const FADE = "radial-gradient(circle at 100% 100%, #000 10%, transparent 58%)";

export default function Beams({
  corner = "bottom-right",
  size = 320,
  colors = ["#f5c400", "#a98bf0"],
  opacity = 0.55,
}: {
  corner?: BeamCorner;
  /** Width and height in CSS pixels. */
  size?: number;
  /** The two alternating ray colours. */
  colors?: readonly [string, string];
  opacity?: number;
}) {
  const [a, b] = colors;
  const rays: readonly [number, number, string][] = [
    [60, 0, a],
    [100, 0, b],
    [140, 0, a],
    [0, 60, b],
    [0, 100, a],
    [0, 140, b],
  ];
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 200"
      className={`pointer-events-none absolute z-0 ${PLACEMENT[corner]}`}
      style={{
        width: size,
        height: size,
        opacity,
        maskImage: FADE,
        WebkitMaskImage: FADE,
      }}
    >
      {rays.map(([x, y, stroke]) => (
        <line
          key={`${x}-${y}`}
          x1="200"
          y1="200"
          x2={x}
          y2={y}
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}
