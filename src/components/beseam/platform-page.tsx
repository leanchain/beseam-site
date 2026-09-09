import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { ActionsScreen } from "@/components/beseam/app-screens";
import FaqGrid from "@/components/beseam/faq-grid";
import LoopDiagram from "@/components/beseam/loop-diagram";
import PlatformCapabilities from "@/components/beseam/platform-capabilities";
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
              <h1 className="max-w-[17ch] text-balance font-display text-[clamp(2.8rem,5.4vw,4.8rem)] font-normal leading-[1.01] tracking-[-0.025em] text-ink-deep">
                {page.headline}
              </h1>
            </div>
            <div>
              <p className="max-w-[50ch] text-[18px] leading-[1.72] text-black/66">
                {page.intro}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <TrackedLink
                  href="/scan"
                  eventName="platform_scan_clicked"
                  eventCategory="conversion"
                  placement="platform_hero"
                  className="group inline-flex min-h-12 items-center justify-center gap-2 bg-signal-ink px-6 text-[15px] font-semibold text-white"
                >
                  Scan my store
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </TrackedLink>
                <TrackedLink
                  href={APP_REGISTER_URL}
                  eventName="marketing_primary_cta_clicked"
                  eventCategory="conversion"
                  placement="platform_hero"
                  preserveUtm
                  className="group inline-flex min-h-12 items-center justify-center gap-2 border border-black/28 px-6 text-[15px] font-semibold text-ink-deep hover:border-signal-ink hover:text-signal-ink"
                >
                  Start free
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

      {/* Show the product before explaining its breadth. A visitor should see
          the queue a merchant actually works from, then understand the four
          parts of the buying journey that can feed it. The connected-system
          map stays on the homepage; /platform goes deeper on what each signal
          becomes rather than recreating an internal package catalogue. */}
      <section className="border-b border-rule bg-ground-2">
        <div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <Reveal>
            <div className="grid gap-6 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,1.35fr)] lg:items-end lg:gap-20">
              <h2 className="max-w-[17ch] font-display text-[clamp(2rem,3.2vw,2.9rem)] font-normal leading-[1.06] tracking-[-0.02em] text-ink-deep">
                See the work, not another dashboard.
              </h2>
              <p className="max-w-[52ch] self-end text-[15px] leading-[1.72] text-black/62">
                Beseam turns the strongest findings into one ranked queue: what
                to change, why it matters, what it affects, and whether it needs
                your approval before a shopper sees it.
              </p>
            </div>
          </Reveal>
          {/* The queue alone, at the full measure. The results ledger belongs
              to the pipeline below, whose Measure panel already carries those
              figures -- printing them twice on one page made the second copy
              read as a different measurement. Four columns do not survive half
              a grid, and the compact card view needs `min-w-0` or it blows the
              mobile page out horizontally (the homepage's `EvidenceToWork`
              carries the same guard). */}
          <Reveal delay={0.06}>
            <div className="mt-8 min-w-0">
              <div className="sm:hidden">
                <ActionsScreen compact />
              </div>
              <div className="hidden sm:block">
                <ActionsScreen />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <PlatformCapabilities />
      <section className="border-b border-technical-rule bg-ink-deep text-white">
        <div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-center lg:gap-16">
              <div>
                <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-signal">
                  One finding, end to end
                </p>
                <h2 className="mt-6 max-w-[16ch] font-display text-[clamp(2.2rem,3.5vw,3.4rem)] font-normal leading-[1.04] tracking-[-0.02em]">
                  Keep the question, change, and result in the same loop.
                </h2>
                <p className="mt-5 max-w-[50ch] text-[16px] leading-[1.75] text-white/68">
                  A finding is useful only if it can become a specific decision
                  and be checked again afterward. Here is that loop.
                </p>
                <Link
                  href="/how-we-work"
                  className="group mt-5 inline-flex items-center gap-2 text-[14px] font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-signal"
                >
                  See how the approval and re-check process works
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
              <LoopDiagram
                tone="dark"
                detail
                animate
                size="lg"
                className="mx-auto lg:mx-0 lg:ml-auto"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <FaqGrid heading="Questions about the platform." items={page.faqs} />

      {/* The related links are a pager, not a section: one flat row of
          destinations between the FAQ and the close. The signal hairline under
          each label is the only motion. */}
      {page.related.length > 0 ? (
        <nav
          aria-label="Related platform pages"
          className="border-b border-rule bg-ground-3"
        >
          <ul className="mx-auto grid max-w-[92rem] divide-y divide-rule px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-8 lg:px-10">
            {page.related.map((item) => (
              <li
                key={item.href}
                className="sm:px-7 sm:first:pl-0 sm:last:pr-0"
              >
                <Link
                  href={item.href}
                  className="group flex flex-col gap-2.5 py-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-ink sm:py-8"
                >
                  <span className="flex items-start justify-between gap-5">
                    <span className="max-w-[22ch] text-[16px] font-semibold leading-[1.3] tracking-[-0.01em] text-ink-deep transition-colors group-hover:text-signal-ink">
                      {item.label}
                    </span>
                    <ArrowRight
                      className="mt-0.5 h-4 w-4 shrink-0 text-black/45 transition duration-300 ease-out group-hover:translate-x-1 group-hover:text-signal-ink"
                      aria-hidden="true"
                    />
                  </span>
                  <span
                    aria-hidden="true"
                    className="relative hidden h-px w-full bg-black/12 sm:block"
                  >
                    <span className="absolute inset-0 origin-left scale-x-0 bg-signal-ink transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}

      <section className="bg-pigment text-white">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <h2 className="max-w-[19ch] font-display text-[clamp(2.3rem,3.8vw,3.9rem)] font-normal leading-[1.04] tracking-[-0.02em]">
            Start with your store. Connect more only when it helps answer a real
            question.
          </h2>
          <p className="mt-5 max-w-[58ch] text-[17px] leading-[1.72] text-white/76">
            Start with the storefront and store connection. Add deeper data only
            when it helps explain a problem, choose the next change, or measure
            what happened afterward.
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
