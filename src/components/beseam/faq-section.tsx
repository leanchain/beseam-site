import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/locale-rules.mjs";

/**
 * The same `faq.items` the `FAQPage` graph in `seo-json-ld.ts` is built from,
 * so what a crawler is told and what a visitor reads cannot drift apart or
 * end up in two different languages.
 */
export default function FaqSection({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const items = Object.entries(t.faq.items);

  return (
    <section id="faq" className="scroll-mt-24 bg-ground-2">
      <div className="mx-auto grid max-w-[92rem] gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20 lg:px-10 lg:py-28">
        <div>
          <h2 className="max-w-[20ch] font-display text-[clamp(2rem,3.1vw,2.6rem)] font-normal leading-[1.06] tracking-[-0.02em] text-ink-deep">
            {t.faq.heading}
          </h2>
        </div>
        <div className="border-t border-black/25">
          {items.map(([key, faq]) => (
            <details key={key} className="group border-b border-black/18">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-5 text-[16px] font-semibold text-ink-deep transition-colors marker:content-none hover:bg-black/[0.045] hover:text-signal-ink focus-visible:ring-2 focus-visible:ring-signal-ink">
                <span>{faq.question}</span>
                <span
                  aria-hidden
                  className="font-mono text-[22px] font-normal text-signal-ink transition-[transform,color] group-hover:text-ink-deep group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="max-w-[68ch] pb-6 pr-10 text-[15px] leading-relaxed text-black/62">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
