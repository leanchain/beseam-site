#!/usr/bin/env python3
"""Generate the canonical Beseam logo mark.

Construction:
- one geometric B silhouette;
- one S ribbon drawn on top;
- no ornament along the S boundary (stitches were removed in review);
- the upper and lower terminals remain sharp;
- all non-terminal joins are C1-smooth cubic Hermite curves.
"""

from __future__ import annotations

import math
from pathlib import Path
from typing import Callable

ROOT = Path(__file__).resolve().parents[1]
BRAND_DIR = ROOT / "public" / "brand"

# Tight SVG bounds: exactly the geometric B silhouette, with no internal padding.
VIEWBOX_X = 62
VIEWBOX_Y = 62
VIEWBOX_W = 484
VIEWBOX_H = 696

INK = "#111318"
SECONDARY = "#b8441d"
WHITE = "#ffffff"

B_PATH = (
    "M 62 62 "
    "H 300 "
    "C 430 62, 522 132, 522 244 "
    "C 522 318, 480 370, 414 396 "
    "C 493 421, 546 485, 546 574 "
    "C 546 690, 446 758, 308 758 "
    "H 62 Z"
)

# S skeleton.
# x(t) = CX + A*cos(pi*t) - B*sin(2*pi*t)
# gives: top-right -> upper-left -> center -> lower-right -> bottom-left.
Y_TOP = 150.0
Y_BOTTOM = 670.0
HEIGHT = Y_BOTTOM - Y_TOP
CX = 292.0
A = 60.0
B = 118.0

# Full ribbon width = 2 * HALF_WIDTH.
HALF_WIDTH = 59.0

# Continue the terminal-shape progression from beseam-mark-secondary.svg
# through beseam-mark-secondary (Copy).svg. The Copy used a short 12% taper;
# keep that span and push the curvature one step further with cubic easing.
TOP_OPEN_END = 0.12
BOTTOM_CLOSE_START = 0.88


def center_x(t: float) -> float:
    return CX + A * math.cos(math.pi * t) - B * math.sin(2.0 * math.pi * t)


def center_dx(t: float) -> float:
    return -A * math.pi * math.sin(math.pi * t) - 2.0 * math.pi * B * math.cos(2.0 * math.pi * t)


def y_at(t: float) -> float:
    return Y_TOP + HEIGHT * t


def top_open(u: float) -> float:
    """Next progression after the Copy: stronger cubic ease-out from the tip."""
    return 1.0 - (1.0 - u) ** 3


def top_open_d(u: float) -> float:
    return 3.0 * (1.0 - u) ** 2


def bottom_close(u: float) -> float:
    """Mirrored cubic close: hold the S body longer, then resolve into the tip."""
    return u**3


def bottom_close_d(u: float) -> float:
    return 3.0 * u * u


def left_offset(t: float) -> tuple[float, float]:
    """Left boundary offset and derivative.

    At the TOP both boundaries start on +HALF_WIDTH (upper inner tip), then
    this left boundary peels across to -HALF_WIDTH. It stays parallel to the
    S skeleton for the rest of the body, including the lower terminal.
    """
    if t < TOP_OPEN_END:
        u = t / TOP_OPEN_END
        ease = top_open(u)
        value = HALF_WIDTH * (1.0 - 2.0 * ease)
        derivative = -2.0 * HALF_WIDTH * top_open_d(u) / TOP_OPEN_END
        return value, derivative
    return -HALF_WIDTH, 0.0


def right_offset(t: float) -> tuple[float, float]:
    """Right boundary offset and derivative.

    This boundary stays at +HALF_WIDTH until the LOWER terminal, where it
    crosses inward and meets the left boundary at -HALF_WIDTH. That puts the
    lower point on the lower inner edge while preserving full width above it.
    """
    if t > BOTTOM_CLOSE_START:
        u = (t - BOTTOM_CLOSE_START) / (1.0 - BOTTOM_CLOSE_START)
        ease = bottom_close(u)
        value = HALF_WIDTH * (1.0 - 2.0 * ease)
        derivative = -2.0 * HALF_WIDTH * bottom_close_d(u) / (1.0 - BOTTOM_CLOSE_START)
        return value, derivative
    return HALF_WIDTH, 0.0


def boundary(
    t: float, offset_fn: Callable[[float], tuple[float, float]]
) -> tuple[tuple[float, float], tuple[float, float]]:
    """Return point and d(point)/dt for a boundary.

    Horizontal offsets are deliberate here: both boundaries retain the exact
    same S rhythm instead of being distorted by changing normal directions.
    """
    offset, offset_d = offset_fn(t)
    point = (center_x(t) + offset, y_at(t))
    derivative = (center_dx(t) + offset_d, HEIGHT)
    return point, derivative


def hermite_path(
    ts: list[float],
    offset_fn: Callable[[float], tuple[float, float]],
    *,
    move: bool,
) -> str:
    """Convert analytic boundary samples into C1-continuous cubic Beziers."""
    commands: list[str] = []
    p0, d0 = boundary(ts[0], offset_fn)
    if move:
        commands.append(f"M {p0[0]:.2f} {p0[1]:.2f}")

    for t0, t1 in zip(ts, ts[1:]):
        p0, d0 = boundary(t0, offset_fn)
        p1, d1 = boundary(t1, offset_fn)
        dt = t1 - t0
        c1 = (p0[0] + d0[0] * dt / 3.0, p0[1] + d0[1] * dt / 3.0)
        c2 = (p1[0] - d1[0] * dt / 3.0, p1[1] - d1[1] * dt / 3.0)
        commands.append(f"C {c1[0]:.2f} {c1[1]:.2f}, " f"{c2[0]:.2f} {c2[1]:.2f}, " f"{p1[0]:.2f} {p1[1]:.2f}")

    return " ".join(commands)


def build_s_path() -> str:
    # Extra knots around the two terminal transitions; broad body knots track
    # the S lobes and crossover without over-segmenting the SVG.
    forward_ts = [
        0.0,
        0.04,
        0.08,
        TOP_OPEN_END,
        0.20,
        0.30,
        0.40,
        0.50,
        0.60,
        0.70,
        0.80,
        BOTTOM_CLOSE_START,
        0.92,
        0.96,
        1.0,
    ]
    reverse_ts = list(reversed(forward_ts))

    left = hermite_path(forward_ts, left_offset, move=True)
    right = hermite_path(reverse_ts, right_offset, move=False)
    return f"{left} {right} Z"


def render_svg(*, b_fill: str, s_fill: str, title: str) -> str:
    """Render the mark: an S inlaid in a B, and nothing else.

    The mark used to carry 20 zipper teeth along the S boundary, read as
    stitching. In review it was read as a worm and then a centipede, and it
    dragged in a needle-and-thread association that misdescribes an AI
    discovery product. The teeth are gone; the clip path that trimmed them at
    the B's edge went with them.
    """
    s_path = build_s_path()
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="{VIEWBOX_X} {VIEWBOX_Y} {VIEWBOX_W} {VIEWBOX_H}" role="img" aria-labelledby="title">
  <title id="title">{title}</title>
  <path d="{B_PATH}" fill="{b_fill}"/>
  <path d="{s_path}" fill="{s_fill}"/>
</svg>
"""


def main() -> None:
    BRAND_DIR.mkdir(parents=True, exist_ok=True)

    default_svg = render_svg(b_fill=INK, s_fill=WHITE, title="Beseam logo mark")
    secondary_svg = render_svg(
        b_fill=SECONDARY,
        s_fill=WHITE,
        title="Beseam logo mark — secondary",
    )
    inverted_svg = render_svg(
        b_fill=WHITE,
        s_fill=INK,
        title="Beseam logo mark — inverted",
    )
    secondary_inverted_svg = render_svg(
        b_fill=WHITE,
        s_fill=SECONDARY,
        title="Beseam logo mark — secondary inverted",
    )

    (BRAND_DIR / "beseam-mark.svg").write_text(default_svg)
    (BRAND_DIR / "beseam-mark-default.svg").write_text(default_svg)
    (BRAND_DIR / "beseam-mark-secondary.svg").write_text(secondary_svg)
    (BRAND_DIR / "beseam-mark-inverted.svg").write_text(inverted_svg)
    (BRAND_DIR / "beseam-mark-secondary-inverted.svg").write_text(secondary_inverted_svg)


if __name__ == "__main__":
    main()
