import type { ReactNode } from "react";

import Link from "next/link";

import { ArrowRight, Sparkles, X } from "lucide-react";

import { BookReviewCta } from "@/components/beseam/book-review-cta";
import FaqGrid from "@/components/beseam/faq-grid";
import FirstMonthPromise from "@/components/beseam/first-month-promise";
import Halftone from "@/components/beseam/halftone";
import HeroChat, { HeroCard } from "@/components/beseam/hero-chat";
import MobileStickyCta from "@/components/beseam/mobile-sticky-cta";
import { Reveal } from "@/components/beseam/reveal";
import SolutionPillars from "@/components/beseam/solution-pillars";
import TrackedLink from "@/components/beseam/tracked-link";
import { getDictionary } from "@/i18n";
import { localizedPath, type Locale } from "@/i18n/locale-rules.mjs";
import { getPageCopy } from "@/i18n/pages";
import { APP_REGISTER_URL } from "@/lib/app-urls";
import { getProductPages, type ProductPageData } from "@/lib/product-pages";
import { SITE_URL } from "@/lib/seo";

/** Same pastel tiles as the homepage cards, in a fixed order. */
const TILES = ["#ffe680", "#e3d3ff", "#c6efdc"] as const;

/**
 * One product or solution page (/product/[slug], /solutions/[slug]) in the homepage's visual language: a
 * cream hero with the two actions, three benefit cards, three steps, a short
 * FAQ (also published as FAQPage structured data), the shared closing call to
 * action, and links to the other product pages.
 */
export default function ProductPage({
  page,
  basePath,
  siblings,
  locale = "en",
}: {
  page: ProductPageData;
  locale?: Locale;
  /** "/product" or "/solutions": where this page and its siblings live. */
  basePath: string;
  /** The other pages in the same section, linked at the bottom. */
  siblings: readonly ProductPageData[];
}) {
  const t = getDictionary(locale);
  const copy = getPageCopy(locale);
  const link = (href: string) => localizedPath(href, locale);
  const url = `${SITE_URL}${link(`${basePath}/${page.slug}`)}`;
  const others = siblings.filter((other) => other.slug !== page.slug);
  const chat = page.heroChat;
  const heroCard = page.heroCard;
  // A hero visual puts the text left and the visual right on desktop.
  const split = Boolean(chat || heroCard);
  const hasQuestions = Boolean(page.shopperQuestions?.items.length);

  const related = (page.relatedProducts ?? []).map((slug) => {
    const product = getProductPages(locale).find(
      (candidate) => candidate.slug === slug,
    );
    if (!product) throw new Error(`Unknown related product: ${slug}`);
    return product;
  });

  // Every content section below the hero, in page order. Each one gets its
  // background from its position, so neighbours never share a colour,
  // whichever optional sections a page has.
  const bands: ((warm: boolean) => ReactNode)[] = [];
  const { shopperQuestions, pillars, checklist, mistakes } = page;
  if (shopperQuestions && hasQuestions) {
    bands.push((warm) => (
      <Band warm={warm} heading={shopperQuestions.heading}>
        {/* Shown as prompts, the way shoppers type them into an AI
            assistant. */}
        <ul className="mx-auto mt-10 flex max-w-[60rem] flex-wrap justify-center gap-3 lg:mt-12">
          {shopperQuestions.items.map((question) => (
            <li
              key={question}
              className="inline-flex items-center gap-2.5 rounded-full border border-black/10 bg-white px-4 py-2.5 text-[15px] text-ink-deep shadow-[0_8px_20px_-16px_rgba(17,19,24,0.4)]"
            >
              <Sparkles
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-[#a98bf0]"
              />
              {question}
            </li>
          ))}
        </ul>
      </Band>
    ));
  }
  if (pillars) {
    bands.push((warm) => (
      <Band warm={warm} heading={pillars.heading} intro={pillars.intro}>
        <SolutionPillars items={pillars.items} warm={warm} locale={locale} />
      </Band>
    ));
  }
  if (checklist) {
    bands.push((warm) => (
      <Band warm={warm} heading={checklist.heading} intro={checklist.intro}>
        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-6">
          {checklist.items.map(({ title, body }, index) => (
            <li
              key={title}
              className={`rounded-media p-6 ${warm ? "bg-white" : "bg-[#fff9e8]"}`}
            >
              <span
                className="flex h-9 w-9 items-center justify-center rounded-full font-display text-[14px] font-semibold text-ink-deep"
                style={{ background: TILES[index % TILES.length] }}
              >
                {index + 1}
              </span>
              <h3 className="mt-4 text-[17px] font-semibold tracking-[-0.01em] text-ink-deep">
                {title}
              </h3>
              <p className="mt-2 text-[15px] leading-[1.6] text-black/64">
                {body}
              </p>
            </li>
          ))}
        </ol>
      </Band>
    ));
  }
  // Industry pages with pillars cover the same ground in more depth.
  if (!pillars || page.showBenefits)
    bands.push((warm) => (
      <Band warm={warm} heading={page.benefitsHeading}>
        <ul className="mt-10 grid gap-5 md:grid-cols-3 md:grid-rows-[auto_auto_1fr] lg:mt-12 lg:gap-6">
          {page.benefits.map(({ title, body, icon: Icon }, index) => (
            <li
              key={title}
              className="rounded-media border border-black/10 bg-white p-6 sm:p-7 md:row-span-3 md:grid md:grid-rows-subgrid md:gap-0"
            >
              <span
                className="flex h-12 w-12 items-center justify-center rounded-media text-ink-deep"
                style={{ background: TILES[index % TILES.length] }}
              >
                <Icon aria-hidden="true" className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-[19px] font-semibold tracking-[-0.01em] text-ink-deep">
                {title}
              </h3>
              <p className="mt-2 text-[15px] leading-[1.6] text-black/64">
                {body}
              </p>
            </li>
          ))}
        </ul>
      </Band>
    ));
  if (mistakes) {
    bands.push((warm) => (
      <Band warm={warm} heading={mistakes.heading}>
        <ul className="mx-auto mt-10 grid max-w-[64rem] gap-5 md:grid-cols-2 lg:mt-12 lg:gap-6">
          {mistakes.items.map(({ title, body }) => (
            <li
              key={title}
              className="flex gap-4 rounded-media border border-black/10 bg-white p-6 sm:p-7"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-media bg-[#ffd3e2] text-ink-deep">
                <X aria-hidden="true" className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-[18px] font-semibold tracking-[-0.01em] text-ink-deep">
                  {title}
                </h3>
                <p className="mt-2 text-[15px] leading-[1.6] text-black/64">
                  {body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Band>
    ));
  }
  bands.push((warm) => (
    <Band warm={warm} heading={page.stepsHeading}>
      <ol className="mt-10 grid gap-5 md:grid-cols-3 lg:mt-12 lg:gap-6">
        {page.steps.map(({ title, body }, index) => (
          <li
            key={title}
            className={`rounded-media p-6 sm:p-7 ${
              warm ? "bg-white/70" : "bg-[#fff9e8]"
            }`}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-signal-ink font-mono text-[13px] font-semibold text-white">
              {index + 1}
            </span>
            <h3 className="mt-5 text-[18px] font-semibold tracking-[-0.01em] text-ink-deep">
              {title}
            </h3>
            <p className="mt-2 text-[15px] leading-[1.6] text-black/64">
              {body}
            </p>
          </li>
        ))}
      </ol>
    </Band>
  ));
  bands.push((warm) => (
    <FaqGrid
      heading={copy.common.faqHeading}
      items={page.faqs}
      eyebrow={null}
      className={warm ? "bg-[#fff9e8]" : "bg-ground"}
    />
  ));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: page.metaTitle,
        description: page.metaDescription,
        inLanguage: locale,
        about: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Beseam", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: page.name, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: page.faqs.map((faq) => ({
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
        {split ? (
          <Halftone
            corner="bottom-right"
            size={200}
            className="hidden xl:block"
          />
        ) : (
          <Halftone
            corner="bottom-right"
            size={300}
            className="hidden lg:block"
          />
        )}
        <div
          className={`relative z-10 mx-auto px-5 py-16 text-center sm:px-8 sm:py-20 lg:px-10 lg:py-24 ${
            split
              ? "grid max-w-[76rem] items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:text-left"
              : "max-w-[56rem]"
          }`}
        >
          <Reveal>
            <nav
              aria-label={copy.common.breadcrumb}
              className="text-[13px] font-medium text-black/55"
            >
              <Link
                href={link("/")}
                className="text-ink-deep underline-offset-4 hover:underline"
              >
                Beseam
              </Link>
              <span aria-hidden="true" className="mx-2">
                /
              </span>
              <span>{page.name}</span>
            </nav>
            <h1
              className={`mx-auto mt-6 max-w-[20ch] text-balance font-display font-semibold leading-[1.02] tracking-[-0.035em] text-ink-deep ${
                split
                  ? "text-[clamp(2.6rem,4.4vw,3.75rem)] lg:mx-0"
                  : "text-[clamp(2.6rem,5vw,4.25rem)]"
              }`}
            >
              {page.headline}
            </h1>
            <p
              className={`mx-auto mt-6 max-w-[62ch] text-[17px] leading-[1.7] text-black/72 sm:text-[18px] ${split ? "lg:mx-0" : ""}`}
            >
              {page.intro}
            </p>
            <div
              className={`mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row ${split ? "lg:justify-start" : ""}`}
            >
              <TrackedLink
                href={APP_REGISTER_URL}
                eventName="marketing_primary_cta_clicked"
                eventCategory="conversion"
                placement={`product_${page.slug}_hero`}
                preserveUtm
                className="group inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-button bg-signal-ink px-7 py-3 text-[15px] font-semibold leading-tight text-white focus-visible:ring-2 focus-visible:ring-signal-ink focus-visible:ring-offset-3 sm:w-auto"
              >
                {t.hero.ctaStart}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </TrackedLink>
              <BookReviewCta
                label={t.hero.ctaDemo}
                location={`product_${page.slug}_hero`}
                className="w-full border border-black/15 bg-white text-ink-deep transition-colors hover:border-black/40 sm:w-auto"
              />
            </div>
          </Reveal>
          {chat ? <HeroChat chat={chat} locale={locale} /> : null}
          {heroCard && !chat ? (
            <HeroCard card={heroCard} locale={locale} />
          ) : null}
        </div>
      </section>

      {bands.map((band, index) => (
        <div key={index}>{band(index % 2 === 1)}</div>
      ))}

      <FirstMonthPromise locale={locale} />
      <section className="bg-ground">
        <div className="mx-auto max-w-[76rem] px-5 py-12 sm:px-8 lg:px-10 lg:py-14">
          {related.length ? (
            <>
              <p className="font-display text-[11px] font-semibold uppercase tracking-[0.08em] text-black/50">
                {copy.productPage.relatedProducts}
              </p>
              <ul
                className={`mb-10 mt-4 grid gap-3 ${
                  related.length === 4
                    ? "sm:grid-cols-2 lg:grid-cols-4"
                    : "sm:grid-cols-3"
                }`}
              >
                {related.map((product) => (
                  <li key={product.slug}>
                    <LinkCard href={link(`/product/${product.slug}`)}>
                      {product.name}
                    </LinkCard>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
          <p className="font-display text-[11px] font-semibold uppercase tracking-[0.08em] text-black/50">
            {related.length
              ? copy.productPage.moreIndustries
              : copy.productPage.moreFromBeseam}
          </p>
          <ul
            className={`mt-4 grid gap-3 ${
              others.length === 4
                ? "sm:grid-cols-2 lg:grid-cols-4"
                : "sm:grid-cols-3"
            }`}
          >
            {others.map((other) => (
              <li key={other.slug}>
                <LinkCard href={link(`${basePath}/${other.slug}`)}>
                  {other.name}
                </LinkCard>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <MobileStickyCta />
    </div>
  );
}

/** One full-width content section with a centred heading. */
function Band({
  warm,
  heading,
  intro,
  children,
}: {
  warm: boolean;
  heading: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <section className={warm ? "bg-[#fff9e8]" : "bg-ground"}>
      <div className="mx-auto max-w-[76rem] px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
        <Reveal>
          <h2 className="mx-auto max-w-[22ch] text-balance text-center font-display text-[clamp(2rem,3.2vw,3rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink-deep">
            {heading}
          </h2>
          {intro ? (
            <p className="mx-auto mt-5 max-w-[60ch] text-center text-[17px] leading-[1.7] text-black/64">
              {intro}
            </p>
          ) : null}
          {children}
        </Reveal>
      </div>
    </section>
  );
}

function LinkCard({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between gap-3 rounded-media border border-black/10 bg-white px-5 py-4 text-[15px] font-semibold text-ink-deep transition-colors hover:border-black/30"
    >
      {children}
      <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
