import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { ActionsScreen, ImpactScreen } from "@/components/beseam/app-screens";
import DecisionBridge from "@/components/beseam/decision-bridge";
import PipelineGraphic from "@/components/beseam/pipeline-graphic";
import { Reveal } from "@/components/beseam/reveal";
import TrackedLink from "@/components/beseam/tracked-link";
import { APP_REGISTER_URL } from "@/lib/app-urls";
import type { MarketingPageData } from "@/lib/marketing-pages";

export default function PlatformPageContent({
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
        "@id": `${baseUrl}/platform#webpage`,
        url: `${baseUrl}/platform`,
        name: page.metaTitle,
        description: page.description,
        isPartOf: { "@id": `${baseUrl}/#website` },
        about: { "@id": `${baseUrl}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Beseam", item: baseUrl },
          {
            "@type": "ListItem",
            position: 2,
            name: "Platform",
            item: `${baseUrl}/platform`,
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
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
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
            <span>Platform</span>
          </nav>

          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(20rem,0.72fr)] lg:items-end lg:gap-16">
            <div>
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-signal-ink">
                Platform
              </p>
              <h1 className="mt-5 max-w-[17ch] text-balance font-display text-[clamp(2.8rem,5.4vw,4.8rem)] font-normal leading-[1.01] tracking-[-0.025em] text-ink-deep">
                {page.headline}
              </h1>
            </div>
            <div>
              <p className="max-w-[50ch] text-[18px] leading-[1.72] text-black/66">
                {page.intro}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <TrackedLink
                  href={APP_REGISTER_URL}
                  eventName="marketing_primary_cta_clicked"
                  eventCategory="conversion"
                  placement="platform_hero"
                  preserveUtm
                  className="group inline-flex min-h-12 items-center justify-center gap-2 bg-signal-ink px-6 text-[15px] font-semibold text-white"
                >
                  Start free
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </TrackedLink>
                <TrackedLink
                  href="/scan"
                  eventName="platform_scan_clicked"
                  eventCategory="conversion"
                  placement="platform_hero"
                  className="group inline-flex min-h-12 items-center justify-center gap-2 border border-black/28 px-6 text-[15px] font-semibold text-ink-deep hover:border-signal-ink hover:text-signal-ink"
                >
                  Run the free scan
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </TrackedLink>
              </div>
            </div>
          </div>

          <p className="mt-12 max-w-[72ch] border-t border-rule pt-6 text-[14px] font-medium leading-relaxed text-ink-deep">
            {page.proofLine}
          </p>
        </div>
      </section>

      <DecisionBridge
        surfaceClassName="bg-ground-2"
        eyebrow="How the platform fits together"
        heading="Follow the shopper before, during, and after the visit."
        body="AI discovery, product pages, shopper behavior, and revenue show different parts of the same journey. Pick one to see what Beseam checks, what it may change, and what it measures afterward."
        exploreHref={null}
      />

      <section className="border-y border-black/16 bg-white">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-end lg:gap-16">
              <div>
                <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-signal-ink">
                  From signal to outcome
                </p>
                <h2 className="mt-7 max-w-[17ch] text-balance font-display text-[clamp(2.3rem,3.8vw,3.9rem)] font-normal leading-[1.03] tracking-[-0.02em] text-ink-deep">
                  Find what to change. Then check what happened.
                </h2>
              </div>
              <p className="max-w-[52ch] text-[16px] leading-[1.75] text-black/64">
                Beseam does not ask you to manage every tool yourself. It keeps
                finding what is worth improving and prepares customer-facing
                changes for your approval. Results shows what happened after
                each change.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-12">
            <Reveal delay={0.04}>
              <div>
                <div className="mb-5">
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-signal-ink">
                    Growth plan
                  </p>
                  <h3 className="mt-3 text-[20px] font-semibold text-ink-deep">
                    See what Beseam is moving forward.
                  </h3>
                  <p className="mt-2 max-w-[48ch] text-[14px] leading-[1.65] text-black/60">
                    What Beseam found, the proposed change, your approval, what
                    was applied, and the result stay together in one place.
                  </p>
                </div>
                <ActionsScreen />
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div>
                <div className="mb-5">
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-signal-ink">
                    Results
                  </p>
                  <h3 className="mt-3 text-[20px] font-semibold text-ink-deep">
                    Keep the result next to the change.
                  </h3>
                  <p className="mt-2 max-w-[48ch] text-[14px] leading-[1.65] text-black/60">
                    Directly measured results stay separate from estimates so a
                    useful result does not turn into an inflated claim.
                  </p>
                </div>
                <div className="bg-ink-deep p-1">
                  <ImpactScreen />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-b border-technical-rule bg-ink-deep text-white">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-end lg:gap-16">
              <div>
                <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-signal">
                  How Beseam works
                </p>
                <h2 className="mt-7 max-w-[16ch] font-display text-[clamp(2.3rem,3.8vw,3.9rem)] font-normal leading-[1.03] tracking-[-0.02em]">
                  Observe. Understand. Act. Learn.
                </h2>
              </div>
              <p className="max-w-[50ch] text-[16px] leading-[1.75] text-white/68">
                The same loop runs across discovery, products, behavior,
                conversion, and revenue. Each part helps Beseam decide what to
                check or change next without giving you another dashboard.
              </p>
            </div>
          </Reveal>
          <PipelineGraphic />
        </div>
      </section>

      {/* After the dark act the page runs three light beats before the
          oxblood close. They step down the ground ramp rather than repeating
          one value, so each boundary is visible without a rule doing the work. */}
      <section className="border-y border-rule bg-panel-white">
        <div className="mx-auto grid max-w-[92rem] gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-20 lg:px-10 lg:py-24">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-signal-ink">
              Current boundary
            </p>
            <h2 className="mt-5 max-w-[18ch] font-display text-[clamp(2rem,3.2vw,2.9rem)] font-normal leading-[1.06] tracking-[-0.02em] text-ink-deep">
              What Beseam does not claim.
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

      <section className="border-b border-rule bg-ground-2">
        <div className="mx-auto grid max-w-[92rem] gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,1.35fr)] lg:gap-20 lg:px-10 lg:py-24">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-signal-ink">
              FAQ
            </p>
            <h2 className="mt-5 max-w-[16ch] font-display text-[clamp(2rem,3.2vw,2.9rem)] font-normal leading-[1.06] tracking-[-0.02em] text-ink-deep">
              Questions about the platform.
            </h2>
          </div>
          <div className="border-t border-rule">
            {page.faqs.map((faq) => (
              <details
                key={faq.question}
                className="group border-b border-rule"
              >
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-5 text-[16px] font-semibold text-ink-deep marker:content-none focus-visible:ring-2 focus-visible:ring-signal-ink">
                  {faq.question}
                  <span
                    aria-hidden
                    className="flex h-7 w-7 shrink-0 items-center justify-center border border-rule text-[18px] font-normal text-signal-ink transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="max-w-[68ch] pb-6 pr-10 text-[15px] leading-relaxed text-black/62">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {page.related.length > 0 ? (
        <section className="border-b border-rule bg-ground-3">
          <div className="mx-auto max-w-[92rem] px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
            <div className="grid gap-8 lg:grid-cols-[minmax(14rem,0.45fr)_minmax(0,1fr)] lg:gap-16">
              <div>
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-signal-ink">
                  Keep exploring
                </p>
                <h2 className="mt-4 text-[24px] font-semibold tracking-[-0.02em] text-ink-deep">
                  Go deeper where it matters.
                </h2>
              </div>
              <nav
                aria-label="Related platform pages"
                className="border-t border-rule"
              >
                {page.related.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex min-h-14 items-center justify-between gap-5 border-b border-rule py-4 text-[15px] font-semibold text-ink-deep"
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
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <h2 className="max-w-[19ch] font-display text-[clamp(2.3rem,3.8vw,3.9rem)] font-normal leading-[1.04] tracking-[-0.02em]">
            Connect your store. Beseam keeps the loop moving.
          </h2>
          <p className="mt-5 max-w-[58ch] text-[17px] leading-[1.72] text-white/76">
            Beseam keeps finding what to improve, prepares the change, asks for
            your approval when it affects customers, applies approved changes,
            and checks what happened.
          </p>
          <div className="mt-8">
            <TrackedLink
              href={APP_REGISTER_URL}
              eventName="marketing_primary_cta_clicked"
              eventCategory="conversion"
              placement="platform_footer"
              preserveUtm
              className="group inline-flex min-h-12 items-center justify-center gap-2 bg-signal-ink px-6 text-[15px] font-semibold text-white transition-colors hover:bg-pigment"
            >
              Start free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </TrackedLink>
          </div>
        </div>
      </section>
    </>
  );
}
