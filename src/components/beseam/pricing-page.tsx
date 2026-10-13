import { Fragment } from "react";

import { Check, Minus } from "lucide-react";

import { BookReviewCta } from "@/components/beseam/book-review-cta";
import FaqGrid from "@/components/beseam/faq-grid";
import FirstMonthPromise from "@/components/beseam/first-month-promise";
import Halftone from "@/components/beseam/halftone";
import MobileStickyCta from "@/components/beseam/mobile-sticky-cta";
import PricingPlans from "@/components/beseam/pricing-plans";
import { Reveal } from "@/components/beseam/reveal";
import { localizedPath, type Locale } from "@/i18n/locale-rules.mjs";
import { getPageCopy } from "@/i18n/pages";
import { getPricing } from "@/lib/pricing";
import { SITE_URL } from "@/lib/seo";

/**
 * The pricing page, in any language: plans with a billing switch, a
 * custom-plan band, a feature comparison and a pricing FAQ. All plans,
 * prices and limits come from `src/lib/pricing.ts` and are a DRAFT until
 * confirmed.
 */
export default function PricingPage({ locale = "en" }: { locale?: Locale }) {
  const t = getPageCopy(locale).pricing;
  const { plans, comparison, faqs } = getPricing(locale);
  const url = `${SITE_URL}${localizedPath("/pricing", locale)}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: t.jsonLdName,
        inLanguage: locale,
        about: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };

  return (
    <div className="bg-ground text-[#151515]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative isolate overflow-hidden bg-[#fff9e8]">
        <Halftone corner="top-left" size={200} className="hidden xl:block" />
        <Halftone
          corner="bottom-right"
          size={240}
          className="hidden xl:block"
        />
        <div className="relative z-10 mx-auto max-w-[76rem] px-5 pb-16 pt-16 sm:px-8 sm:pt-20 lg:px-10 lg:pb-20 lg:pt-24">
          <Reveal className="text-center">
            <h1 className="mx-auto max-w-[20ch] text-balance font-display text-[clamp(2.6rem,5vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink-deep">
              {t.title}
            </h1>
            <p className="mx-auto mt-6 max-w-[56ch] text-[17px] leading-[1.7] text-black/72 sm:text-[18px]">
              {t.intro}
            </p>
          </Reveal>
          <Reveal delay={0.06} className="mt-10 lg:mt-12">
            <PricingPlans locale={locale} />
          </Reveal>

          <Reveal
            delay={0.1}
            className="mt-6 flex flex-col gap-5 rounded-media bg-pigment p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8"
          >
            <div>
              <h2 className="font-display text-[22px] font-semibold tracking-[-0.02em]">
                {t.enterpriseTitle}
              </h2>
              <p className="mt-1.5 max-w-[60ch] text-[15px] leading-[1.6] text-white/72">
                {t.enterpriseBody}
              </p>
            </div>
            <BookReviewCta
              label={t.talkToUs}
              location="pricing_enterprise"
              className="w-full shrink-0 bg-signal text-ink-deep transition-colors hover:bg-white focus-visible:ring-white focus-visible:ring-offset-pigment sm:w-auto"
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-ground">
        <div className="mx-auto max-w-[76rem] px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
          <Reveal>
            <h2 className="mx-auto max-w-[22ch] text-balance text-center font-display text-[clamp(2rem,3.2vw,3rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink-deep">
              {t.compareHeading}
            </h2>
            {/* Fits a phone: tighter text and padding below sm instead of a
                sideways-scrolling table. */}
            <div className="mt-10 lg:mt-12">
              <table className="w-full table-fixed border-collapse text-left text-[13px] sm:text-[15px]">
                <thead>
                  <tr>
                    <th scope="col" className="w-[40%] pb-4 sm:w-[46%]">
                      <span className="sr-only">{t.feature}</span>
                    </th>
                    {plans.map((plan) => (
                      <th
                        key={plan.id}
                        scope="col"
                        className="pb-4 text-center font-display text-[14px] font-semibold text-ink-deep sm:text-[17px]"
                      >
                        {plan.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((group) => (
                    <Fragment key={group.group}>
                      <tr>
                        <th
                          scope="colgroup"
                          colSpan={4}
                          className="rounded-media bg-[#fff9e8] px-2.5 py-3 font-display text-[12px] font-semibold uppercase tracking-[0.08em] text-black/56 sm:px-4"
                        >
                          {group.group}
                        </th>
                      </tr>
                      {group.rows.map((row) => (
                        <tr key={row.label} className="border-b border-black/8">
                          <th
                            scope="row"
                            className="px-2.5 py-3 font-normal leading-snug text-black/72 sm:px-4 sm:py-3.5"
                          >
                            {row.label}
                          </th>
                          {row.values.map((value, index) => (
                            <td
                              key={plans[index]?.id}
                              className="px-1 py-3 text-center font-medium text-ink-deep sm:px-4 sm:py-3.5"
                            >
                              {value === true ? (
                                <>
                                  <Check
                                    aria-hidden="true"
                                    className="mx-auto h-5 w-5"
                                  />
                                  <span className="sr-only">{t.included}</span>
                                </>
                              ) : value === false ? (
                                <>
                                  <Minus
                                    aria-hidden="true"
                                    className="mx-auto h-5 w-5 text-black/25"
                                  />
                                  <span className="sr-only">
                                    {t.notIncluded}
                                  </span>
                                </>
                              ) : (
                                value
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      <FaqGrid
        heading={t.faqHeading}
        items={faqs}
        eyebrow={null}
        className="bg-[#fff9e8]"
      />

      <FirstMonthPromise locale={locale} />
      <MobileStickyCta />
    </div>
  );
}
