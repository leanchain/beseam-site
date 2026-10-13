import { ArrowRight } from "lucide-react";

import AiPlatformsStrip from "@/components/beseam/ai-platforms-strip";
import { BookReviewCta } from "@/components/beseam/book-review-cta";
import FeatureRows from "@/components/beseam/feature-rows";
import FirstMonthPromise from "@/components/beseam/first-month-promise";
import FixesSection from "@/components/beseam/fixes-section";
import Halftone from "@/components/beseam/halftone";
import HowItWorks from "@/components/beseam/how-it-works";
import ProductCategories from "@/components/beseam/product-categories";
import QuoteSection from "@/components/beseam/quote-section";
import { Reveal } from "@/components/beseam/reveal";
import TrackedLink from "@/components/beseam/tracked-link";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/locale-rules.mjs";
import { APP_REGISTER_URL } from "@/lib/app-urls";

/**
 * The homepage: the hero promise and its two actions, four feature rows,
 * what Beseam fixes, how it works, the product types, a customer quote, and a closing call to action that repeats
 * the hero's two actions.
 *
 * Every section below is handed the locale explicitly. None of them reads the
 * path, because under `output: "export"` a server component has no request to
 * read it from -- the page that mounts this composition is the one that knows.
 */
export default function ProductionHomepage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <div className="bg-ground text-[#151515]">
      {/* A light cream-yellow block (Sunny palette) with a sunflower marker
          on the accent phrase. */}
      <section
        id="home-hero"
        className="relative isolate overflow-hidden bg-[#fff9e8]"
      >
        {/* The top corner sits beside the headline, so it only appears once
            the page is wide enough to keep the dots clear of it. */}
        <Halftone corner="top-left" size={230} className="hidden xl:block" />
        {/* The platforms strip is kept narrow so it ends before this
            corner; on narrower screens the set is smaller, and on phones and
            tablets the buttons and strip fill the corner, so it is left out. */}
        <Halftone
          corner="bottom-right"
          size={300}
          className="hidden xl:block 2xl:hidden"
        />
        <Halftone
          corner="bottom-right"
          size={440}
          className="hidden 2xl:block"
        />
        <Halftone
          corner="bottom-right"
          size={140}
          className="hidden lg:block xl:hidden"
        />
        <div
          id="ai-check"
          className="pointer-events-none relative z-10 mx-auto flex max-w-[92rem] scroll-mt-24 items-center justify-center px-5 pb-12 pt-16 sm:px-8 sm:pb-14 sm:pt-20 lg:px-10 lg:pb-16 lg:pt-24"
        >
          <Reveal className="w-full">
            <div className="mx-auto w-full max-w-[76rem] text-center">
              <h1 className="pointer-events-auto mx-auto text-balance font-display text-[clamp(3rem,5.6vw,5rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink-deep">
                {/* The accented phrase closes the first line, so it never
                    breaks; the rest of the sentence gets a line of its own. */}
                <span className="lg:whitespace-nowrap">
                  {t.hero.headlineBefore}
                  <span className="box-decoration-clone rounded-[0.12em] bg-signal px-[0.1em]">
                    {t.hero.headlineAccent}
                  </span>
                </span>
                <span className="block">{t.hero.headlineAfter.trim()}</span>
              </h1>
              <p className="pointer-events-auto mx-auto mt-6 max-w-[64ch] text-[17px] leading-[1.7] text-black/72 sm:text-[18px]">
                {t.hero.sub}
              </p>
              <div className="pointer-events-auto mx-auto mt-9 flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
                <TrackedLink
                  href={APP_REGISTER_URL}
                  eventName="marketing_primary_cta_clicked"
                  eventCategory="conversion"
                  placement="homepage_hero"
                  preserveUtm
                  className="rounded-button group inline-flex min-h-12 w-full items-center justify-center gap-3 bg-signal-ink px-7 py-3 text-[15px] font-semibold leading-tight text-white focus-visible:ring-2 focus-visible:ring-signal-ink focus-visible:ring-offset-3 sm:w-auto"
                >
                  {t.hero.ctaStart}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </TrackedLink>
                <BookReviewCta
                  label={t.hero.ctaDemo}
                  location="homepage_hero"
                  className="w-full border border-black/15 bg-white text-ink-deep transition-colors hover:border-black/40 sm:w-auto"
                />
              </div>
            </div>
          </Reveal>
        </div>
        <AiPlatformsStrip locale={locale} />
      </section>

      <FeatureRows locale={locale} />
      <FixesSection locale={locale} />
      <HowItWorks locale={locale} />
      <ProductCategories locale={locale} />
      <QuoteSection locale={locale} />
      <FirstMonthPromise locale={locale} />
    </div>
  );
}
