import type { CSSProperties } from "react";

import Link from "next/link";

import { AlertTriangle, ArrowRight, Check, Sparkles, X } from "lucide-react";

import RevealOnView from "@/components/beseam/reveal-on-view";
import { localizedPath, type Locale } from "@/i18n/locale-rules.mjs";
import { getPageCopy } from "@/i18n/pages";
import {
  getProductPages,
  type PillarData,
  type PillarVisual,
} from "@/lib/product-pages";

/** Stagger delay for one `.fx-item` / `.fx-pop` element, in ms. */
const fx = (ms: number) => ({ "--fx-delay": `${ms}ms` }) as CSSProperties;

/**
 * The four Beseam products applied to one industry, as alternating rows in
 * the homepage feature-row style: copy with a link to the product page on one
 * side, a small illustrative card on the other. The cards' contents are
 * examples, not customer results.
 */
export default function SolutionPillars({
  items,
  warm,
  locale = "en",
}: {
  items: readonly PillarData[];
  locale?: Locale;
  /** Whether the surrounding band is cream, so the stages contrast with it. */
  warm: boolean;
}) {
  const copy = getPageCopy(locale);
  return (
    <div className="mt-12 space-y-14 lg:mt-16 lg:space-y-20">
      {items.map((item, index) => {
        const product = getProductPages(locale).find(
          (p) => p.slug === item.product,
        );
        if (!product) throw new Error(`Unknown product: ${item.product}`);
        const visualFirst = index % 2 === 1;
        return (
          <div
            key={item.product}
            className="grid items-center gap-8 lg:grid-cols-2 lg:gap-20"
          >
            <div className={visualFirst ? "lg:order-2" : undefined}>
              <p className="font-display text-[12px] font-semibold uppercase tracking-[0.08em] text-black/50">
                {product.name}
              </p>
              <h3 className="mt-3 max-w-[22ch] text-balance font-display text-[clamp(1.75rem,2.6vw,2.4rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-ink-deep">
                {item.title}
              </h3>
              <p className="mt-5 max-w-[48ch] text-[16px] leading-[1.7] text-black/64">
                {item.body}
              </p>
              <ul className="mt-5 space-y-2.5">
                {item.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 text-[15px] leading-[1.5] text-ink-deep"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-signal text-ink-deep">
                      <Check aria-hidden="true" className="h-3 w-3" />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
              <Link
                href={localizedPath(`/product/${product.slug}`, locale)}
                className="group mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-ink-deep underline-offset-4 hover:underline"
              >
                {copy.productPage.explore(product.name)}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
            <div className={visualFirst ? "lg:order-1" : undefined}>
              <RevealOnView
                className={`mx-auto w-full max-w-[34rem] rounded-media px-5 py-8 sm:px-10 sm:py-10 ${
                  warm ? "bg-white/70" : "bg-[#fff9e8]"
                }`}
              >
                <Visual visual={item.visual} locale={locale} />
              </RevealOnView>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Card({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-media border border-black/12 bg-white shadow-[0_18px_40px_-24px_rgba(17,19,24,0.35)]">
      <p className="border-b border-black/10 px-4 py-3 font-display text-[11px] font-semibold uppercase tracking-[0.08em] text-black/50">
        {label}
      </p>
      <div className="px-4 py-2">{children}</div>
    </div>
  );
}

function Status({
  good,
  delay,
  children,
}: {
  good: boolean;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`fx-pop inline-flex shrink-0 items-center gap-1.5 rounded-button px-2 py-0.5 text-[12px] font-semibold ${
        good
          ? "bg-[#1f7a4d]/[0.1] text-[#1a6b43]"
          : "bg-[#ffd3e2] text-ink-deep"
      }`}
      style={fx(delay)}
    >
      {good ? (
        <Check aria-hidden="true" className="h-3.5 w-3.5" />
      ) : (
        <X aria-hidden="true" className="h-3.5 w-3.5" />
      )}
      {children}
    </span>
  );
}

export function Visual({
  visual,
  locale = "en",
}: {
  visual: PillarVisual;
  locale?: Locale;
}) {
  const copy = getPageCopy(locale).productPage;
  switch (visual.kind) {
    case "visibility":
      return (
        <Card label={visual.label}>
          <ul className="divide-y divide-black/8">
            {visual.rows.map(({ prompt, recommended }, index) => (
              <li
                key={prompt}
                className="fx-item flex items-center justify-between gap-3 py-3"
                style={fx(150 + index * 150)}
              >
                <span className="flex min-w-0 items-center gap-2 text-[14px] font-medium text-ink-deep">
                  <Sparkles
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-[#a98bf0]"
                  />
                  {prompt}
                </span>
                <Status good={recommended} delay={450 + index * 150}>
                  {recommended ? copy.recommended : copy.competitor}
                </Status>
              </li>
            ))}
          </ul>
        </Card>
      );
    case "description":
      return (
        <div className="space-y-3">
          <div
            className="fx-item rounded-media border border-black/10 bg-white p-4"
            style={fx(150)}
          >
            <p className="inline-flex items-center gap-1.5 rounded-button bg-black/[0.06] px-2 py-0.5 text-[12px] font-semibold text-black/60">
              <X aria-hidden="true" className="h-3.5 w-3.5" />
              {visual.before.label}
            </p>
            <p className="mt-3 text-[14px] leading-[1.6] text-black/56">
              {visual.before.text}
            </p>
          </div>
          <div
            className="fx-item rounded-media border-2 border-ink-deep bg-white p-4 shadow-[0_18px_40px_-24px_rgba(17,19,24,0.35)]"
            style={fx(450)}
          >
            <p className="inline-flex items-center gap-1.5 rounded-button bg-signal px-2 py-0.5 text-[12px] font-semibold text-ink-deep">
              <Sparkles aria-hidden="true" className="h-3.5 w-3.5" />
              {visual.after.label}
            </p>
            <p className="mt-3 text-[14px] leading-[1.6] text-ink-deep">
              {visual.after.text}
            </p>
          </div>
        </div>
      );
    case "pages":
      return (
        <Card label={visual.label}>
          <ul className="divide-y divide-black/8">
            {visual.rows.map(({ type, title, status }, index) => (
              <li
                key={title}
                className="fx-item flex items-center gap-3 py-3"
                style={fx(150 + index * 150)}
              >
                {/* Type above the title on phones, beside it from sm up, so
                    long German labels never push the row wider. */}
                <span className="min-w-0 flex-1 sm:flex sm:items-center sm:gap-3">
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.04em] text-black/50 sm:w-[5.5rem] sm:shrink-0 sm:text-[12px]">
                    {type}
                  </span>
                  <span className="mt-0.5 block text-[14px] font-medium leading-snug text-ink-deep sm:mt-0 sm:min-w-0 sm:flex-1">
                    {title}
                  </span>
                </span>
                <span
                  className="fx-pop shrink-0 rounded-button bg-signal px-2 py-0.5 text-[12px] font-semibold text-ink-deep"
                  style={fx(450 + index * 150)}
                >
                  {status}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      );
    case "checks":
      return (
        <Card label={visual.label}>
          <ul className="divide-y divide-black/8">
            {visual.rows.map(({ label, ok, detail }, index) => (
              <li
                key={label}
                className="fx-item flex items-center gap-3 py-3"
                style={fx(150 + index * 130)}
              >
                <span
                  className={`fx-pop flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                    ok
                      ? "bg-signal-ink text-white"
                      : "bg-[#ffd3e2] text-ink-deep"
                  }`}
                  style={fx(400 + index * 130)}
                >
                  {ok ? (
                    <Check aria-hidden="true" className="h-3.5 w-3.5" />
                  ) : (
                    <AlertTriangle aria-hidden="true" className="h-3.5 w-3.5" />
                  )}
                </span>
                <span className="min-w-0 flex-1 text-[14px] font-medium text-ink-deep">
                  {label}
                </span>
                <span
                  className={`shrink-0 text-[13px] font-semibold ${
                    ok ? "text-black/56" : "text-ink-deep"
                  }`}
                >
                  {detail}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      );
  }
}
