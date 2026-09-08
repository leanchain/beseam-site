/**
 * Logo exploration — one hero, one alternate. The bar: a double reading, the
 * FedEx-arrow test. Not used in production.
 *
 * REJECTED direction — kept only as a record, do not revive. Both concepts are
 * built on needle-and-thread imagery, and the sewing read was ruled out for the
 * brand: it implies fabric/tailoring, not AI shopping visibility. The shipped
 * mark in `./logo.tsx` dropped its stitch marks for the same reason.
 *
 * Hero · Seam-stitch B: a drawn grotesque B that is literally two pieces of
 * material sewn together — the split is a true zigzag stitch (computed, even
 * pitch), ink above, terracotta below. Reads as a solid two-tone B at 16px;
 * the stitch reveals at size. The letter and the name are the same fact.
 *
 * Alternate · Needle b: lowercase b as needle and thread — the stem carries a
 * needle eye, the bowl is the thread loop. One soft element against the sharp
 * brand, justified: it is the thread.
 */

const SIGNAL = "#e8653a";

const B_PATH =
  "M6 3h15.5L26 6.5v5.3l-2.8 2.6 4.6 2.6v8.3L23.2 29H6zM11 7.5h8.8l1.4 1.1v1.8l-1.4 1.1H11zm0 10.7h10.8l1.6 1.2v3.2l-1.6 1.2H11z";

const SEAM_UP =
  "-1.17,24.63 0.65,20.59 4.83,22.06 6.65,18.02 10.83,19.50 12.65,15.46 16.83,16.93 18.65,12.89 22.83,14.36 24.65,10.32 28.83,11.80 30.65,7.76 34.83,9.23 40,-6 -6,-6";
const SEAM_LO =
  "-1.65,23.53 0.17,19.49 4.35,20.96 6.17,16.92 10.35,18.39 12.17,14.35 16.35,15.83 18.17,11.79 22.35,13.26 24.17,9.22 28.35,10.69 30.17,6.65 34.35,8.13 40,38 -6,38";

export function SeamStitchB({
  className,
  uid = "ss",
}: {
  className?: string;
  /** Unique per rendered instance so clipPath ids never collide. */
  uid?: string;
}) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <defs>
        <clipPath id={`${uid}-u`}>
          <polygon points={SEAM_UP} />
        </clipPath>
        <clipPath id={`${uid}-l`}>
          <polygon points={SEAM_LO} />
        </clipPath>
      </defs>
      <path
        d={B_PATH}
        fill="currentColor"
        fillRule="evenodd"
        clipPath={`url(#${uid}-u)`}
      />
      <path
        d={B_PATH}
        fill={SIGNAL}
        fillRule="evenodd"
        clipPath={`url(#${uid}-l)`}
      />
    </svg>
  );
}

export function NeedleB({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <path
        d="M8.2 3h4.2v26H8.2zM9.5 5h1.6v3.4H9.5z"
        fill={SIGNAL}
        fillRule="evenodd"
      />
      <path
        d="M8.4 21a8 8 0 1 0 16 0 8 8 0 1 0-16 0zm4.2 0a3.8 3.8 0 1 1 7.6 0 3.8 3.8 0 1 1-7.6 0z"
        fill={SIGNAL}
        fillRule="evenodd"
      />
    </svg>
  );
}

export default function LogoConcepts() {
  return (
    <div className="mx-auto max-w-[64rem] px-5 py-12 sm:px-8 lg:px-10">
      <div className="grid gap-px border border-black/14 bg-black/14 lg:grid-cols-[1.4fr_1fr]">
        <article className="bg-white p-8">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-signal-ink">
            Hero · Seam-stitch B
          </p>
          <p className="mt-2 max-w-[52ch] text-[12.5px] leading-[1.55] text-black/58">
            Two pieces of material sewn into one letter. The split is a real
            zigzag stitch — even pitch, computed — so the mark says the name
            without a diagram: B, seamed. At 16px it reads as a two-tone B.
          </p>

          <div className="mt-6 flex flex-wrap items-end justify-between gap-8 border-t border-black/10 pt-6">
            <SeamStitchB uid="h-l" className="h-20 w-20 text-[#16181d]" />
            <div className="flex items-center gap-2.5 text-[26px] font-semibold tracking-[-0.05em] text-ink-deep">
              <SeamStitchB uid="h-w" className="h-[0.92em] w-[0.92em]" />
              Beseam
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-5">
            <span className="flex items-center gap-3">
              <SeamStitchB uid="h-s" className="h-4 w-4 text-[#16181d]" />
              <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-black/40">
                16px
              </span>
            </span>
            <span className="bg-ink-deep p-3">
              <SeamStitchB uid="h-d" className="h-8 w-8 text-white" />
            </span>
          </div>
        </article>

        <article className="bg-white p-8">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-black/50">
            Alternate · Needle b
          </p>
          <p className="mt-2 text-[12.5px] leading-[1.55] text-black/58">
            Lowercase b as needle and thread: the stem carries the eye, the
            bowl is the loop. The one soft element in a sharp brand — it is
            the thread.
          </p>

          <div className="mt-6 flex flex-wrap items-end justify-between gap-6 border-t border-black/10 pt-6">
            <NeedleB className="h-20 w-20" />
            <div className="flex items-center gap-2 text-[22px] font-semibold tracking-[-0.04em] text-ink-deep">
              <NeedleB className="h-[0.95em] w-[0.95em]" />
              beseam
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-5">
            <span className="flex items-center gap-3">
              <NeedleB className="h-4 w-4" />
              <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-black/40">
                16px
              </span>
            </span>
            <span className="bg-ink-deep p-3">
              <NeedleB className="h-8 w-8" />
            </span>
          </div>
        </article>
      </div>
    </div>
  );
}
