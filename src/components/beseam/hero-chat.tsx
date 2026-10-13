import type { CSSProperties } from "react";

import Image from "next/image";

import { Check, Sparkles, TrendingUp } from "lucide-react";

import RevealOnView from "@/components/beseam/reveal-on-view";
import { Visual } from "@/components/beseam/solution-pillars";
import type { Locale } from "@/i18n/locale-rules.mjs";
import { getPageCopy } from "@/i18n/pages";
import type { HeroCardData, HeroChatData } from "@/lib/product-pages";

/** Stagger delay for one `.fx-item` / `.fx-pop` element, in ms. */
const fx = (ms: number) => ({ "--fx-delay": `${ms}ms` }) as CSSProperties;

/**
 * The industry-page hero visual: a shopper's question to an AI assistant and
 * the answer recommending the webshop's product, drawn in markup like the
 * homepage cards. It builds itself once on load: question, reply, product
 * card, then the sticker. The product and store are made up.
 */
export default function HeroChat({
  chat,
  locale = "en",
}: {
  chat: HeroChatData;
  locale?: Locale;
}) {
  const copy = getPageCopy(locale).productPage;
  return (
    <figure className="relative mx-auto w-full max-w-[30rem]">
      <RevealOnView className="space-y-3">
        {/* The shopper's question, right-aligned like a sent message. */}
        <div className="flex justify-end">
          <p
            className="fx-item max-w-[85%] rounded-media rounded-br-sm bg-ink-deep px-4 py-3 text-[15px] leading-snug text-white shadow-[0_18px_40px_-24px_rgba(17,19,24,0.45)]"
            style={fx(150)}
          >
            {chat.prompt}
          </p>
        </div>

        <div
          className="fx-item rounded-media border border-black/12 bg-white p-4 shadow-[0_18px_40px_-24px_rgba(17,19,24,0.35)] sm:p-5"
          style={fx(500)}
        >
          <p className="flex items-center gap-2 font-display text-[11px] font-semibold uppercase tracking-[0.08em] text-black/50">
            <Sparkles aria-hidden="true" className="h-4 w-4 text-[#a98bf0]" />
            {copy.aiAssistant}
          </p>
          <p className="mt-3 text-[15px] leading-[1.6] text-ink-deep">
            {chat.reply}
          </p>

          <div
            className="fx-item mt-4 flex gap-4 rounded-media border border-black/10 p-3"
            style={fx(850)}
          >
            <Image
              src={chat.product.image}
              alt=""
              width={480}
              height={360}
              sizes="112px"
              priority
              className="h-24 w-28 shrink-0 rounded-[6px] object-cover"
            />
            <div className="min-w-0">
              <p className="text-[15px] font-semibold leading-snug text-ink-deep">
                {chat.product.name}
              </p>
              <p className="mt-0.5 text-[13px] text-black/56">
                {chat.product.store} · {chat.product.price}
              </p>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {chat.product.facts.map((fact) => (
                  <li
                    key={fact}
                    className="inline-flex items-center gap-1 rounded-button bg-[#c6efdc] px-2 py-0.5 text-[12px] font-semibold text-ink-deep"
                  >
                    <Check aria-hidden="true" className="h-3 w-3" />
                    {fact}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div
          className="fx-pop absolute -bottom-4 -left-3 sm:-left-8"
          style={fx(1250)}
        >
          <span className="inline-flex items-center gap-2 rounded-button bg-signal px-3 py-2 text-[13px] font-semibold text-ink-deep shadow-[0_10px_24px_-12px_rgba(17,19,24,0.5)]">
            <TrendingUp aria-hidden="true" className="h-4 w-4" />
            {chat.sticker}
          </span>
        </div>
      </RevealOnView>
    </figure>
  );
}

/**
 * The product-page hero visual: one of the pillar cards, larger, with a
 * sticker, built once on load like the chat on the industry pages.
 */
export function HeroCard({
  card,
  locale = "en",
}: {
  card: HeroCardData;
  locale?: Locale;
}) {
  return (
    <figure className="relative mx-auto w-full max-w-[30rem]">
      <RevealOnView>
        <Visual visual={card.visual} locale={locale} />
        <div
          className="fx-pop absolute -bottom-4 -left-3 sm:-left-8"
          style={fx(1250)}
        >
          <span className="inline-flex items-center gap-2 rounded-button bg-signal px-3 py-2 text-[13px] font-semibold text-ink-deep shadow-[0_10px_24px_-12px_rgba(17,19,24,0.5)]">
            <TrendingUp aria-hidden="true" className="h-4 w-4" />
            {card.sticker}
          </span>
        </div>
      </RevealOnView>
    </figure>
  );
}
