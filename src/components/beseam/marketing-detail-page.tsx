import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { ActionsScreen, ImpactScreen } from "@/components/beseam/app-screens";
import PipelineGraphic from "@/components/beseam/pipeline-graphic";
import TrackedLink from "@/components/beseam/tracked-link";
import { APP_REGISTER_URL } from "@/lib/app-urls";
import type { MarketingPageData } from "@/lib/marketing-pages";
const PLATFORM_SURFACES = [
  {
    stage: "Finding",
    question: "Will shoppers see the product?",
    items: [
      "AI shopping discovery",
      "External search",
      "Store search",
      "Marketplaces",
    ],
  },
  {
    stage: "Choosing",
    question: "Does the shopper have enough reason and evidence to choose it?",
    items: [
      "Shopper questions",
      "Products and product pages",
      "Comparison and recommendations",
      "Sizing and fit",
      "Reviews, price, and product facts",
    ],
  },
  {
    stage: "Buying",
    question: "What stops a shopper who is ready to buy?",
    items: [
      "Behavior and friction",
      "Cart and checkout",
      "Delivery and payment",
      "Store reliability",
    ],
  },
  {
    stage: "Change and check",
    question: "What should change, and did it help?",
    items: [
      "What to improve first",
      "Approval and changes",
      "What changed afterward",
      "Conversion, orders, and revenue evidence",
    ],
  },
] as const;
export default function MarketingDetailPage({
  page,
}: {
  page: MarketingPageData;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://beseam.com";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": baseUrl + "/" + page.slug + "#webpage",
        url: baseUrl + "/" + page.slug,
        name: page.metaTitle,
        description: page.description,
        isPartOf: { "@id": baseUrl + "/#website" },
        about: { "@id": baseUrl + "/#organization" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Beseam",
            item: baseUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: page.eyebrow,
            item: baseUrl + "/" + page.slug,
          },
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="border-b border-rule bg-ground">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <nav
            aria-label="Breadcrumb"
            className="text-[13px] text-muted-foreground"
          >
            <Link href="/" className="hover:text-signal-ink">
              Beseam
            </Link>
            <span aria-hidden className="mx-2">
              /
            </span>
            <span>{page.eyebrow}</span>
          </nav>

          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.12fr)_minmax(18rem,0.68fr)] lg:items-end lg:gap-16">
            <div>
              <p className="text-[14px] font-semibold text-signal-ink">
                {page.eyebrow}
              </p>
              <h1 className="mt-4 max-w-[17ch] text-balance font-display text-[clamp(2.6rem,5.4vw,4.5rem)] font-normal leading-[1.02] tracking-[-0.02em] text-ink">
                {page.headline}
              </h1>
            </div>
            <div>
              <p className="text-[18px] leading-relaxed text-foreground">
                {page.intro}
              </p>
              <div className="mt-7">
                <TrackedLink
                  href={APP_REGISTER_URL}
                  eventName="marketing_primary_cta_clicked"
                  eventCategory="conversion"
                  placement={page.slug + "_hero"}
                  preserveUtm
                  className="group inline-flex min-h-12 items-center justify-center gap-2 bg-signal-ink px-6 text-[15px] font-semibold text-white"
                >
                  Start for free
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </TrackedLink>
              </div>
            </div>
          </div>

          <p className="mt-12 max-w-[68ch] border-t border-rule pt-6 text-[14px] font-medium leading-relaxed text-ink">
            {page.proofLine}
          </p>
        </div>
      </section>

      <section className="border-b border-rule bg-panel-white">
        <div className="section-pad-tight mx-auto max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-[minmax(14rem,0.45fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <h2 className="editorial-subheading text-ink">
                {page.observationsHeading ?? "What Beseam sees here"}
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-foreground">
                {page.observationsIntro ??
                  "The evidence this page contributes to the wider Beseam system."}
              </p>
            </div>
            <div className="border-t border-rule">
              {page.observations.map((observation, index) => {
                const Icon = observation.icon;
                return (
                  <article
                    key={observation.title}
                    className="grid gap-3 border-b border-rule py-6 sm:grid-cols-[2.25rem_minmax(0,0.65fr)_minmax(0,1fr)] sm:gap-6"
                  >
                    <span className="flex flex-col items-start gap-1.5 text-[12px] font-semibold tabular-nums text-signal-ink">
                      {Icon ? (
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      ) : null}
                      0{index + 1}
                    </span>
                    <h3 className="text-[17px] font-semibold text-ink">
                      {observation.title}
                    </h3>
                    <p className="text-[14px] leading-relaxed text-foreground">
                      {observation.detail}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      {page.slug === "platform" ? (
        <>
          <section className="border-b border-rule bg-ground">
            <div className="section-pad-tight mx-auto max-w-6xl px-6">
              <div className="grid gap-10 lg:grid-cols-[minmax(14rem,0.45fr)_minmax(0,1fr)] lg:gap-16">
                <div>
                  <p className="text-[14px] font-semibold text-signal-ink">
                    What is in the platform
                  </p>
                  <h2 className="editorial-subheading mt-4 text-ink">
                    Follow the shopper across the whole journey.
                  </h2>
                  <p className="mt-4 max-w-[44ch] text-[15px] leading-relaxed text-foreground">
                    Beseam is not one dashboard for every commerce metric. It
                    connects the product surfaces that help explain whether a
                    shopper found you, chose you, completed the purchase, and
                    responded differently after a change.
                  </p>
                </div>
                <div className="grid gap-px border border-rule bg-rule sm:grid-cols-2">
                  {PLATFORM_SURFACES.map((surface, index) => (
                    <article key={surface.stage} className="bg-panel-white p-6">
                      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-signal-ink">
                        0{index + 1} · {surface.stage}
                      </p>
                      <h3 className="mt-4 max-w-[24ch] text-[17px] font-semibold leading-snug text-ink">
                        {surface.question}
                      </h3>
                      <ul className="mt-5 border-t border-rule">
                        {surface.items.map((item) => (
                          <li
                            key={item}
                            className="border-b border-rule py-3 text-[13px] leading-relaxed text-foreground last:border-b-0"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              </div>

              <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-12">
                <div>
                  <div className="mb-5">
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-signal-ink">
                      Act
                    </p>
                    <h3 className="mt-3 text-[20px] font-semibold text-ink">
                      Turn what Beseam found into a specific change.
                    </h3>
                  </div>
                  <ActionsScreen />
                </div>
                <div>
                  <div className="mb-5">
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-signal-ink">
                      Learn
                    </p>
                    <h3 className="mt-3 text-[20px] font-semibold text-ink">
                      Keep the result attached to the change.
                    </h3>
                  </div>
                  <div className="bg-ink-deep p-1">
                    <ImpactScreen />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="border-b border-technical-rule bg-ink-deep text-white">
            <div className="section-pad-tight mx-auto max-w-6xl px-6">
              <div className="max-w-4xl">
                <p className="text-[14px] font-semibold text-signal">
                  How Beseam works
                </p>
                <h2 className="mt-4 max-w-[20ch] font-display text-[clamp(2.1rem,3.6vw,3.5rem)] font-normal leading-[1.06] tracking-[-0.02em] text-white">
                  Observe. Understand. Act. Learn.
                </h2>
              </div>
              <PipelineGraphic />
            </div>
          </section>
        </>
      ) : null}

      <section className="bg-ground">
        <div className="section-pad-tight mx-auto max-w-6xl px-6">
          <div className="space-y-16">
            {page.sections.map((section, index) => {
              const SectionIcon = section.icon;
              return (
                <article
                  key={section.title}
                  className="grid gap-8 border-t border-rule pt-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20"
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <p className="text-[12px] font-semibold tabular-nums text-signal-ink">
                        0{index + 1}
                      </p>
                      {SectionIcon ? (
                        <SectionIcon
                          className="h-5 w-5 text-signal-ink"
                          aria-hidden="true"
                        />
                      ) : null}
                    </div>
                    <h2 className="editorial-subheading mt-3 text-ink">
                      {section.title}
                    </h2>
                    <p className="mt-4 text-[15px] leading-relaxed text-foreground">
                      {section.body}
                    </p>
                  </div>
                  <ul className="border-t border-rule">
                    {section.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-3 border-b border-rule py-5 text-[15px] leading-relaxed text-foreground"
                      >
                        <span
                          aria-hidden
                          className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 bg-signal-ink"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {page.limits && page.limits.length > 0 ? (
        <section className="border-y border-rule bg-panel-white">
          <div className="section-pad-tight mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-20">
            <div>
              <p className="text-[14px] font-semibold text-signal-ink">
                Current product boundary
              </p>
              <h2 className="editorial-subheading mt-4 text-ink">
                What Beseam does not claim
              </h2>
            </div>
            <ul className="grid gap-px border border-rule bg-rule sm:grid-cols-2">
              {page.limits.map((limit) => (
                <li
                  key={limit}
                  className="bg-panel-white px-5 py-5 text-[14px] leading-relaxed text-foreground"
                >
                  {limit}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="border-b border-rule bg-ground">
        <div className="section-pad-tight mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,1.35fr)] lg:gap-20">
          <div>
            <h2 className="editorial-subheading text-ink">
              Questions about {page.eyebrow.toLowerCase()}
            </h2>
          </div>
          <div className="border-t border-rule">
            {page.faqs.map((faq) => (
              <details
                key={faq.question}
                className="group border-b border-rule"
              >
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-5 text-[16px] font-semibold text-ink marker:content-none focus-visible:ring-2 focus-visible:ring-signal-ink">
                  {faq.question}
                  <span
                    aria-hidden
                    className="flex h-7 w-7 shrink-0 items-center justify-center border border-rule text-[18px] font-normal text-signal-ink transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="max-w-[68ch] pb-6 pr-10 text-[15px] leading-relaxed text-foreground">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
      {page.related.length > 0 ? (
        <section className="border-b border-rule bg-panel-white">
          <div className="section-pad-tight mx-auto max-w-6xl px-6">
            <div className="grid gap-8 lg:grid-cols-[minmax(14rem,0.45fr)_minmax(0,1fr)] lg:gap-16">
              <div>
                <p className="text-[14px] font-semibold text-signal-ink">
                  Keep exploring
                </p>
                <h2 className="editorial-subheading mt-4 text-ink">
                  Related pages
                </h2>
              </div>
              <nav
                aria-label={`Related to ${page.eyebrow}`}
                className="border-t border-rule"
              >
                {page.related.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex min-h-14 items-center justify-between gap-5 border-b border-rule py-4 text-[15px] font-semibold text-ink"
                  >
                    {item.label}
                    <ArrowRight
                      className="h-4 w-4 shrink-0 text-signal-ink transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-pigment text-white">
        <div className="section-pad mx-auto max-w-6xl px-6">
          <h2 className="max-w-[20ch] font-display text-[clamp(2.1rem,3.6vw,3.5rem)] font-normal leading-[1.06] tracking-[-0.02em]">
            Keep the loop moving after the first finding.
          </h2>
          <p className="mt-5 max-w-[68ch] text-[18px] leading-relaxed">
            Beseam keeps finding what to improve, prepares the change, gets your
            approval, applies it, and checks the same things again afterward.
          </p>
          <div className="mt-8">
            <TrackedLink
              href={APP_REGISTER_URL}
              eventName="marketing_primary_cta_clicked"
              eventCategory="conversion"
              placement={page.slug + "_footer"}
              preserveUtm
              className="group inline-flex min-h-12 items-center justify-center gap-2 bg-signal-ink px-6 text-[15px] font-semibold text-white transition-colors hover:bg-pigment"
            >
              Start for free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </TrackedLink>
          </div>
        </div>
      </section>
    </>
  );
}
