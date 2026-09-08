import type { Locale } from "@/i18n/locale-rules.mjs";
import { STORE_HEALTH_FAQS } from "@/lib/store-health-faqs";

export default function FaqSection({ locale }: { locale: Locale }) {
  void locale;
  return (
    <section id="faq" className="scroll-mt-24 bg-ground-2">
      <div className="mx-auto grid max-w-[92rem] gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20 lg:px-10 lg:py-28">
        <div>
          <h2 className="max-w-[20ch] font-display text-[clamp(2rem,3.1vw,2.6rem)] font-normal leading-[1.06] tracking-[-0.02em] text-ink-deep">
            FAQ
          </h2>
        </div>
        <div className="border-t border-black/25">
          {STORE_HEALTH_FAQS.map((faq) => (
            <details
              key={faq.question}
              className="group border-b border-black/18"
            >
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
