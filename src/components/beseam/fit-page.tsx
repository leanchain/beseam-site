import Link from "next/link";

import { BarChart3, Check, Languages, Zap } from "lucide-react";

import { BookReviewCta } from "@/components/beseam/book-review-cta";
import FaqGrid from "@/components/beseam/faq-grid";
import FitDashboard from "@/components/beseam/fit-dashboard";
import Halftone from "@/components/beseam/halftone";
import Logo from "@/components/beseam/logo";
import { Reveal } from "@/components/beseam/reveal";
import { getDictionary } from "@/i18n";
import { localizedPath, type Locale } from "@/i18n/locale-rules.mjs";
import { getPageCopy } from "@/i18n/pages";
import { SITE_URL } from "@/lib/seo";

const FEATURE_ICONS = [Zap, BarChart3, Languages] as const;
const TILES = ["#ffe680", "#e3d3ff", "#c6efdc"] as const;

/**
 * /fit: the landing page for Beseam Fit, the shoe size recommender sold as a
 * Shopify app. Hero with a demo call to action, the product video, the three
 * steps a shopper takes, the learning loop, features, the analytics
 * dashboard, FAQ and a closing call to action. The copy follows the video's
 * storyline.
 */
export default function FitPage({ locale = "en" }: { locale?: Locale }) {
  const t = getDictionary(locale);
  const copy = getPageCopy(locale);
  const fit = copy.fit;
  const url = `${SITE_URL}${localizedPath("/fit", locale)}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: fit.metaTitle,
        description: fit.metaDescription,
        inLanguage: locale,
        about: { "@id": `${url}#app` },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${url}#app`,
        name: "Beseam Fit",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web, Shopify",
        description: fit.metaDescription,
        url,
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Beseam", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: fit.breadcrumb, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: fit.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };

  const demo = (placement: string, dark = false) => (
    <BookReviewCta
      label={t.hero.ctaDemo}
      location={placement}
      className={`w-full sm:w-auto ${
        dark
          ? "bg-signal text-ink-deep transition-colors hover:bg-white focus-visible:ring-white focus-visible:ring-offset-pigment"
          : ""
      }`}
    />
  );

  return (
    <div className="bg-ground text-[#151515]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero, with the video straight below it on the same cream ground. */}
      <section className="relative isolate overflow-hidden bg-[#fff9e8]">
        <Halftone corner="top-right" size={240} className="hidden lg:block" />
        <div className="relative z-10 mx-auto max-w-[76rem] px-5 pb-14 pt-16 text-center sm:px-8 sm:pt-20 lg:px-10 lg:pb-20 lg:pt-24">
          <Reveal>
            <nav
              aria-label={copy.common.breadcrumb}
              className="text-[13px] font-medium text-black/55"
            >
              <Link
                href={localizedPath("/", locale)}
                className="text-ink-deep underline-offset-4 hover:underline"
              >
                Beseam
              </Link>
              <span aria-hidden="true" className="mx-2">
                /
              </span>
              <span>{fit.breadcrumb}</span>
            </nav>
            <p className="mx-auto mt-6 inline-flex rounded-button bg-signal px-3 py-1 text-[13px] font-semibold text-ink-deep">
              {fit.eyebrow}
            </p>
            <h1 className="mx-auto mt-5 max-w-[18ch] text-balance font-display text-[clamp(2.6rem,5vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink-deep">
              {fit.headline}
            </h1>
            <p className="mx-auto mt-6 max-w-[60ch] text-[17px] leading-[1.7] text-black/72 sm:text-[18px]">
              {fit.intro}
            </p>
            <div className="mt-9">{demo("fit_hero")}</div>
          </Reveal>

          <Reveal delay={0.08}>
            <figure className="mx-auto mt-12 max-w-[60rem] overflow-hidden rounded-media border border-black/10 bg-white shadow-[0_30px_70px_-40px_rgba(17,19,24,0.55)] lg:mt-16">
              {/* Muted so it may autoplay; the controls let a visitor
                  unmute, pause or replay it. */}
              <video
                className="block aspect-video w-full"
                src="/videos/beseam-fit.mp4"
                poster="/images/fit/video-poster.jpg"
                autoPlay
                muted
                loop
                playsInline
                controls
                preload="metadata"
                aria-label={fit.videoLabel}
              />
            </figure>
          </Reveal>
        </div>
      </section>

      {/* The three steps a shopper takes. */}
      <section className="bg-ground">
        <div className="mx-auto max-w-[76rem] px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
          <Reveal>
            <h2 className="mx-auto max-w-[22ch] text-balance text-center font-display text-[clamp(2rem,3.2vw,3rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink-deep">
              {fit.stepsHeading}
            </h2>
            <ol className="mt-10 grid gap-4 md:grid-cols-3 lg:mt-12">
              {fit.steps.map((step, index) => (
                <li
                  key={step.title}
                  className="rounded-media border border-black/10 bg-white p-6 md:p-7"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-deep text-[14px] font-semibold text-white">
                    {index + 1}
                  </span>
                  <h3 className="mt-5 text-balance font-display text-[20px] font-semibold leading-[1.2] tracking-[-0.02em] text-ink-deep">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-black/64">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* The learning loop: recommended, ordered, returned, improved. */}
      <section className="bg-[#fff9e8]">
        <div className="mx-auto grid max-w-[76rem] items-center gap-12 px-5 py-12 sm:px-8 sm:py-14 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-16">
          <Reveal>
            <h2 className="text-balance font-display text-[clamp(2rem,3.2vw,3rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink-deep">
              {fit.learnHeading}
            </h2>
            <p className="mt-5 max-w-[52ch] text-[17px] leading-[1.7] text-black/64">
              {fit.learnBody}
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <LearningLoop steps={fit.loop} />
          </Reveal>
        </div>
      </section>

      {/* Features. */}
      <section className="bg-ground">
        <div className="mx-auto max-w-[76rem] px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
          <Reveal>
            <h2 className="mx-auto max-w-[22ch] text-balance text-center font-display text-[clamp(2rem,3.2vw,3rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink-deep">
              {fit.featuresHeading}
            </h2>
            <ul className="mt-10 grid gap-4 md:grid-cols-3 lg:mt-12">
              {fit.features.map((feature, index) => {
                const Icon = FEATURE_ICONS[index % FEATURE_ICONS.length];
                return (
                  <li
                    key={feature.title}
                    className="rounded-media p-6 md:p-7"
                    style={{ background: TILES[index % TILES.length] }}
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-media bg-white/70 text-ink-deep">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 font-display text-[20px] font-semibold leading-[1.2] tracking-[-0.02em] text-ink-deep">
                      {feature.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-black/70">
                      {feature.body}
                    </p>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Analytics: why they matter, and the dashboard from the video. */}
      <section className="bg-[#fff9e8]">
        <div className="mx-auto max-w-[76rem] px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
          <Reveal>
            <h2 className="mx-auto max-w-[22ch] text-balance text-center font-display text-[clamp(2rem,3.2vw,3rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink-deep">
              {fit.analyticsHeading}
            </h2>
            <p className="mx-auto mt-5 max-w-[56ch] text-center text-[17px] leading-[1.7] text-black/64">
              {fit.analyticsBody}
            </p>
            <ul className="mx-auto mt-8 grid max-w-[60rem] gap-3 md:grid-cols-3">
              {fit.analyticsPoints.map((point) => (
                <li
                  key={point}
                  className="flex gap-2.5 text-[15px] leading-snug text-black/72"
                >
                  <Check
                    aria-hidden="true"
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#1a6b43]"
                  />
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="mx-auto mt-10 max-w-[64rem] lg:mt-12">
              <FitDashboard
                copy={fit.dashboard}
                numberLocale={copy.common.dateLocale}
              />
            </div>
          </Reveal>
        </div>
      </section>

      <FaqGrid
        heading={copy.common.faqHeading}
        items={fit.faqs}
        eyebrow={null}
        className="bg-ground"
      />

      {/* Closing call to action. */}
      <section className="relative isolate overflow-hidden bg-pigment">
        <div className="relative mx-auto max-w-[76rem] px-5 py-16 text-center sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <Reveal>
            <h2 className="mx-auto max-w-[20ch] text-balance font-display text-[clamp(2.25rem,3.6vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-white">
              {fit.closingHeading}
            </h2>
            <p className="mx-auto mt-5 max-w-[52ch] text-[17px] leading-[1.7] text-white/70">
              {fit.closingBody}
            </p>
            <div className="mt-10">{demo("fit_closing", true)}</div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

/**
 * Four labelled steps around a ring, with the fit model in the middle: the
 * same loop the video draws. On narrow screens the labels sit on the ring's
 * edges as on desktop; the ring only scales.
 */
function LearningLoop({ steps }: { steps: readonly string[] }) {
  const positions = [
    "left-1/2 top-0 -translate-x-1/2 -translate-y-1/2",
    "right-0 top-1/2 translate-x-1/4 -translate-y-1/2",
    "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
    "left-0 top-1/2 -translate-x-1/4 -translate-y-1/2",
  ];
  return (
    <div className="mx-auto w-full max-w-[22rem] px-8 py-6">
      <div className="relative aspect-square rounded-full border-2 border-dashed border-[#e8573a]/50">
        <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1 rounded-full bg-ink-deep text-white shadow-[0_18px_40px_-20px_rgba(17,19,24,0.6)]">
          <Logo variant="inverted" hideWordmark className="text-[34px]" />
          <span className="text-[12px] font-semibold">Beseam Fit</span>
        </div>
        {steps.map((step, index) => (
          <span
            key={step}
            className={`absolute whitespace-nowrap rounded-full border border-black/10 bg-white px-3.5 py-1.5 text-[13px] font-semibold text-ink-deep shadow-[0_8px_20px_-14px_rgba(17,19,24,0.45)] ${positions[index]}`}
          >
            {step}
          </span>
        ))}
      </div>
    </div>
  );
}
