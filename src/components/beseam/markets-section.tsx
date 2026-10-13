import { Reveal } from "@/components/beseam/reveal";

/**
 * Markets are a product capability, not a dropdown, so the section shows the
 * thing that can actually differ: what a shopper asks, the comparison set, and
 * the assumptions around the purchase. These are illustrations, not claims
 * about every shopper or catalogue in a country.
 */
const MARKETS = [
  {
    place: "Switzerland",
    flag: "🇨🇭",
    language: "Deutsch",
    question: "„Welche Regenjacke eignet sich zum Velofahren im Winter?“",
    translation: "Which rain jacket works for cycling in winter?",
    rows: [
      [
        "The words",
        "A Swiss-German shopper may say Velo where a Germany-focused page says Fahrrad.",
      ],
      [
        "The comparison",
        "The relevant comparison set may be local outdoor retailers rather than the brands that surface in another market.",
      ],
      [
        "The assumption",
        "Shoppers may expect CHF pricing and clear cross-border return information.",
      ],
    ],
  },
  {
    place: "United Kingdom",
    flag: "🇬🇧",
    language: "English",
    question: "“Best waterproof jacket for cycling to work?”",
    translation: null,
    rows: [
      [
        "The words",
        "A UK shopper may phrase the use case as “cycling to work” rather than using the same wording as another market.",
      ],
      [
        "The comparison",
        "Marketplace listings may compete alongside brand stores.",
      ],
      [
        "The assumption",
        "Delivery speed and return terms may be taken for granted or asked about differently.",
      ],
    ],
  },
  {
    place: "Italy",
    flag: "🇮🇹",
    language: "Italiano",
    question:
      "«Qual è la migliore giacca antipioggia per andare in bici in città?»",
    translation: "Which is the best rain jacket for cycling in the city?",
    rows: [
      [
        "The words",
        "A shopper may use antipioggia and describe an urban use case as in città.",
      ],
      [
        "The comparison",
        "Italian-language product pages may become more relevant in the comparison set.",
      ],
      [
        "The assumption",
        "Sizing guidance and delivery expectations can differ from an English-language market.",
      ],
    ],
  },
] as const;

export default function MarketsSection() {
  return (
    <section
      id="markets"
      className="scroll-mt-24 border-y border-black/18 bg-ink-deep text-white"
    >
      <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-end lg:gap-16">
            <div>
              <p className="font-display text-[12px] font-semibold uppercase tracking-[0.08em] text-signal">
                Markets
              </p>
              <h2 className="mt-7 max-w-[20ch] text-balance font-display text-[clamp(2.3rem,3.8vw,3.9rem)] font-normal leading-[1.03] tracking-[-0.02em]">
                What helps a shopper choose changes by market.
              </h2>
            </div>
            <p className="max-w-[46ch] text-[17px] leading-[1.72] text-white/70">
              Language, competitors, delivery expectations, and buying questions
              change by market.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="mt-12 grid border-t-2 border-white/70 lg:mt-16 lg:grid-cols-3">
            {MARKETS.map((market) => (
              <article
                key={market.place}
                className="border-b border-white/14 py-8 lg:border-b-0 lg:border-l lg:border-white/14 lg:px-8 lg:py-9 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0"
              >
                <p className="flex flex-wrap items-baseline gap-x-2.5 font-display text-[11px] font-semibold uppercase tracking-[0.08em] text-signal">
                  <span aria-hidden="true" className="text-[15px] leading-none">
                    {market.flag}
                  </span>
                  {market.place}
                  <span
                    aria-hidden="true"
                    className="h-1 w-1 rounded-full bg-white/30"
                  />
                  <span className="text-white/56">{market.language}</span>
                </p>

                <p
                  lang={
                    market.language === "Deutsch"
                      ? "de"
                      : market.language === "Italiano"
                        ? "it"
                        : "en"
                  }
                  className="mt-5 font-display text-[clamp(1.2rem,1.65vw,1.55rem)] leading-[1.32] text-white/92 lg:min-h-[3.9em]"
                >
                  {market.question}
                </p>
                {market.translation ? (
                  <p className="mt-2 text-[12px] leading-[1.5] text-white/56">
                    {market.translation}
                  </p>
                ) : (
                  <p
                    aria-hidden="true"
                    className="mt-2 hidden text-[12px] leading-[1.5] text-transparent lg:block"
                  >
                    &nbsp;
                  </p>
                )}

                <dl className="mt-7 border-t border-white/14">
                  {market.rows.map(([term, detail]) => (
                    <div
                      key={term}
                      className="border-b border-white/12 py-3.5 last:border-b-0"
                    >
                      <dt className="font-display text-[10px] font-semibold uppercase tracking-[0.08em] text-white/58">
                        {term}
                      </dt>
                      <dd className="mt-1.5 max-w-[46ch] text-[14px] leading-[1.6] text-white/74">
                        {detail}
                      </dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mt-10 text-[12px] text-white/48">
            Illustrative examples. Your market differences come from observed
            evidence.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
