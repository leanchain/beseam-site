import { ArrowRight } from "lucide-react";

import { BookReviewCta } from "@/components/beseam/book-review-cta";
import Halftone from "@/components/beseam/halftone";
import { Reveal } from "@/components/beseam/reveal";
import TrackedLink from "@/components/beseam/tracked-link";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/locale-rules.mjs";
import { APP_REGISTER_URL } from "@/lib/app-urls";

/**
 * The closing call to action: one title on the brand's dark pigment band (not
 * the near-black of the impact section above it) and the same two
 * actions as the hero, so a visitor who scrolled the whole page ends where
 * they started.
 */
export default function FirstMonthPromise({
  showManifestoLink = true,
  locale = "en",
}: {
  showManifestoLink?: boolean;
  locale?: Locale;
}) {
  void showManifestoLink;
  const t = getDictionary(locale);

  return (
    <section
      id="promise"
      className="relative isolate scroll-mt-24 overflow-hidden bg-pigment"
    >
      <Halftone
        corner="top-left"
        size={220}
        colors={["#ffe14d", "#ff8fb3"]}
        opacity={0.7}
        className="hidden lg:block"
      />
      {/* Below desktop width the stacked buttons reach the corners, so the
          sets are smaller or left out there. */}
      <Halftone
        corner="bottom-right"
        size={380}
        colors={["#ffe14d", "#ff8fb3"]}
        opacity={0.7}
        className="hidden lg:block"
      />
      <Halftone
        corner="bottom-right"
        size={110}
        colors={["#ffe14d", "#ff8fb3"]}
        opacity={0.7}
        className="lg:hidden"
      />
      <div className="relative mx-auto max-w-[76rem] px-5 py-16 text-center sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <Reveal>
          <h2 className="mx-auto max-w-[20ch] text-balance font-display text-[clamp(2.25rem,3.6vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-white">
            {t.sections.promise.heading}
          </h2>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <TrackedLink
              href={APP_REGISTER_URL}
              eventName="marketing_primary_cta_clicked"
              eventCategory="conversion"
              placement="first_month_promise"
              preserveUtm
              className="group inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-button bg-signal px-7 py-3 text-[15px] font-semibold leading-tight text-ink-deep transition-colors hover:bg-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-pigment sm:w-auto"
            >
              {t.hero.ctaStart}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </TrackedLink>
            <BookReviewCta
              label={t.hero.ctaDemo}
              location="first_month_promise"
              className="w-full bg-white text-ink-deep transition-colors hover:bg-white/88 focus-visible:ring-white focus-visible:ring-offset-pigment sm:w-auto"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
