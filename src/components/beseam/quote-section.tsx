import { Reveal } from "@/components/beseam/reveal";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/locale-rules.mjs";

/**
 * A single customer quote, large and centred, with the customer's name and
 * an initials avatar once they are filled in. The copy lives in
 * `sections.quote`. The copy lives in `sections.quote`.
 */
export default function QuoteSection({ locale = "en" }: { locale?: Locale }) {
  const t = getDictionary(locale).sections.quote;
  // A drafted quote is shown in local previews only. It goes live once a
  // real customer has approved it, so visitors never read words no customer
  // said.
  if (!t.approved && process.env.NODE_ENV === "production") return null;
  const initials = t.name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <section id="quote" className="scroll-mt-24 bg-ground">
      <div className="mx-auto max-w-[56rem] px-5 py-16 text-center sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <Reveal>
          <figure>
            <svg
              aria-hidden="true"
              viewBox="0 0 48 36"
              className="mx-auto h-9 w-12 text-signal"
            >
              <path
                fill="currentColor"
                d="M0 36V22C0 9.6 5.6 2.3 16.8 0l2.4 4.6C13 6.4 9.9 10 9.4 15.4H19V36H0Zm29 0V22c0-12.4 5.6-19.7 16.8-22l2.2 4.6C41.9 6.4 38.8 10 38.3 15.4H48V36H29Z"
              />
            </svg>
            <blockquote className="mt-8">
              <p className="text-balance font-display text-[clamp(1.6rem,2.6vw,2.4rem)] font-semibold leading-[1.2] tracking-[-0.025em] text-ink-deep">
                {t.text}
              </p>
            </blockquote>
            {t.name ? (
              <figcaption className="mt-10 flex items-center justify-center gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e3d3ff] font-display text-[15px] font-semibold text-ink-deep"
                >
                  {initials}
                </span>
                <span className="text-left">
                  <span className="block text-[16px] font-semibold text-ink-deep">
                    {t.name}
                  </span>
                  <span className="block text-[14px] text-black/60">
                    {t.role}
                  </span>
                </span>
              </figcaption>
            ) : null}
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
