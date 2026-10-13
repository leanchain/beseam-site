"use client";

import { useState } from "react";

import { ArrowRight, Check } from "lucide-react";

import TrackedLink from "@/components/beseam/tracked-link";
import type { Locale } from "@/i18n/locale-rules.mjs";
import { getPageCopy } from "@/i18n/pages";
import { APP_REGISTER_URL } from "@/lib/app-urls";
import { annualMonthly, getPricing } from "@/lib/pricing";

/**
 * The three self-serve plans with a monthly/annual switch. Monthly is the
 * default, so the first price a visitor sees is the one they would pay
 * without committing to a year.
 */
export default function PricingPlans({ locale = "en" }: { locale?: Locale }) {
  const [annual, setAnnual] = useState(false);
  const copy = getPageCopy(locale);
  const t = copy.pricing;
  const money = (amount: number) =>
    `€${amount.toLocaleString(copy.common.dateLocale)}`;

  return (
    <div>
      <div className="flex justify-center">
        <div
          role="group"
          aria-label={t.billingPeriod}
          className="inline-flex rounded-button border border-black/12 bg-white p-1"
        >
          {[
            { value: false, label: t.monthly },
            { value: true, label: t.annual },
          ].map((option) => (
            <button
              key={option.label}
              type="button"
              aria-pressed={annual === option.value}
              onClick={() => setAnnual(option.value)}
              className={`inline-flex min-h-10 items-center gap-2 rounded-[6px] px-4 text-[14px] font-semibold transition-colors ${
                annual === option.value
                  ? "bg-signal-ink text-white"
                  : "text-black/64 hover:text-ink-deep"
              }`}
            >
              {option.label}
              {option.value ? (
                <span
                  className={`rounded-[4px] px-1.5 py-0.5 text-[11px] ${
                    annual ? "bg-signal text-ink-deep" : "bg-signal/70"
                  }`}
                >
                  {t.twoMonthsFree}
                </span>
              ) : null}
            </button>
          ))}
        </div>
      </div>

      {/* On desktop the cards share one row grid (name, audience, price,
          billing, button, features), so buttons and lists line up whatever
          the text lengths. */}
      <ul className="mt-10 grid gap-5 lg:mt-12 lg:grid-cols-3 lg:grid-rows-[repeat(5,auto)_1fr] lg:gap-x-6 lg:gap-y-0">
        {getPricing(locale).plans.map((plan) => {
          const price = annual ? annualMonthly(plan.monthly) : plan.monthly;
          return (
            <li
              key={plan.id}
              className={`relative flex flex-col rounded-media border bg-white p-6 sm:p-8 lg:row-span-6 lg:grid lg:grid-rows-subgrid ${
                plan.highlighted
                  ? "border-ink-deep shadow-[0_18px_40px_-24px_rgba(17,19,24,0.45)] ring-1 ring-ink-deep"
                  : "border-black/10"
              }`}
            >
              {plan.highlighted ? (
                <span className="absolute -top-3.5 left-6 rounded-button bg-signal px-2.5 py-1 text-[12px] font-semibold text-ink-deep sm:left-8">
                  {t.mostPopular}
                </span>
              ) : null}
              <h3 className="font-display text-[22px] font-semibold tracking-[-0.02em] text-ink-deep">
                {plan.name}
              </h3>
              <p className="mt-1.5 text-[15px] leading-[1.5] text-black/60">
                {plan.audience}
              </p>
              <p className="mt-6 flex items-baseline gap-1.5">
                <span className="font-display text-[44px] font-semibold leading-none tracking-[-0.03em] text-ink-deep">
                  {money(price)}
                </span>
                <span className="text-[15px] text-black/56">{t.perMonth}</span>
              </p>
              <p className="mt-2 min-h-[1.25rem] text-[13px] text-black/56">
                {annual
                  ? t.billedAnnually(money(plan.monthly * 10))
                  : t.billedMonthly}
              </p>
              <TrackedLink
                href={APP_REGISTER_URL}
                eventName="marketing_primary_cta_clicked"
                eventCategory="conversion"
                placement={`pricing_${plan.id}`}
                preserveUtm
                className={`group mt-6 inline-flex min-h-12 items-center justify-center gap-3 rounded-button px-6 text-[15px] font-semibold ${
                  plan.highlighted
                    ? "bg-signal-ink text-white"
                    : "border border-black/15 bg-white text-ink-deep transition-colors hover:border-black/40"
                }`}
              >
                {t.startTrial}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </TrackedLink>
              <div className="mt-7 border-t border-black/8 pt-6">
                {plan.includesFrom ? (
                  <p className="text-[14px] font-semibold text-ink-deep">
                    {t.everythingIn(plan.includesFrom)}
                  </p>
                ) : null}
                <ul className={`space-y-3 ${plan.includesFrom ? "mt-4" : ""}`}>
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-[15px] leading-[1.45] text-black/72"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-signal text-ink-deep">
                        <Check aria-hidden="true" className="h-3 w-3" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
