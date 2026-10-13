import Link from "next/link";

import type { Metadata } from "next";

import { buildPublicMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPublicMetadata({
  title: "BeseamBot | Beseam Website Audit Crawler",
  description:
    "Official information about BeseamBot, Beseam's public website audit crawler, including its User-Agent, robots.txt behavior, throttling, and contact details.",
  path: "/bot",
});

const USER_AGENT = "BeseamBot/1.0 (+https://beseam.com/bot)";

export default function BotPage() {
  return (
    <div className="bg-ground text-[#151515]">
      <section className="border-b border-black/18">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end lg:gap-20">
            <div>
              <p className="font-display text-[12px] font-semibold uppercase tracking-[0.08em] text-signal-ink">
                Official crawler information
              </p>
              <h1 className="mt-7 max-w-[14ch] font-display text-[clamp(2.8rem,6.2vw,4.5rem)] font-normal leading-[1] tracking-[-0.02em] text-ink-deep">
                BeseamBot
              </h1>
            </div>
            <div>
              <p className="max-w-[64ch] text-[19px] leading-[1.72] text-black/66">
                BeseamBot is Beseam&apos;s website audit crawler. It visits
                public ecommerce pages to inspect crawlability, structured data,
                links, rendered page evidence, and technical signals that can
                affect product discovery and store experience.
              </p>
              <div className="mt-7 border border-black/18 bg-white px-5 py-4">
                <p className="font-display text-[11px] font-semibold uppercase tracking-[0.08em] text-black/48">
                  User-Agent
                </p>
                <code className="mt-2 block overflow-x-auto font-mono text-[13px] leading-6 text-ink-deep">
                  {USER_AGENT}
                </code>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/18 bg-white">
        <div className="mx-auto grid max-w-[92rem] gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-3 lg:gap-12 lg:px-10 lg:py-24">
          <div>
            <p className="font-display text-[12px] font-semibold uppercase tracking-[0.08em] text-signal-ink">
              What it accesses
            </p>
            <p className="mt-5 text-[16px] leading-[1.72] text-black/66">
              Public storefront pages, sitemaps, public commerce discovery
              endpoints, and the page resources needed to inspect rendered
              storefront content. BeseamBot does not sign in, submit forms, or
              attempt to bypass authentication.
            </p>
          </div>
          <div>
            <p className="font-display text-[12px] font-semibold uppercase tracking-[0.08em] text-signal-ink">
              Why it visits
            </p>
            <p className="mt-5 text-[16px] leading-[1.72] text-black/66">
              Beseam uses crawl evidence for store audits and monitoring. A
              crawl may cover a merchant storefront or a publicly accessible
              competitor storefront when it is part of a Beseam analysis
              workflow.
            </p>
          </div>
          <div>
            <p className="font-display text-[12px] font-semibold uppercase tracking-[0.08em] text-signal-ink">
              Operator
            </p>
            <p className="mt-5 text-[16px] leading-[1.72] text-black/66">
              Beseam operates BeseamBot. This page at beseam.com is the
              canonical public description linked directly from the crawler
              User-Agent.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-black/18 bg-ground-2">
        <div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-20">
            <div>
              <p className="font-display text-[12px] font-semibold uppercase tracking-[0.08em] text-signal-ink">
                Polite crawling
              </p>
              <h2 className="mt-6 max-w-[15ch] font-display text-[clamp(2.25rem,3.4vw,3.5rem)] font-normal leading-[1.05] tracking-[-0.02em] text-ink-deep">
                Built to respect the storefront.
              </h2>
            </div>
            <div className="grid gap-7 sm:grid-cols-2">
              {[
                [
                  "robots.txt",
                  "BeseamBot honors rules addressed to User-agent: BeseamBot and does not fetch pages that those rules disallow.",
                ],
                [
                  "Request pacing",
                  "The default crawl starts at no more than one top-level request per second per host. A robots.txt Crawl-delay can slow it further.",
                ],
                [
                  "Rate limits",
                  "HTTP 429 responses trigger backoff. BeseamBot honors Retry-After and reduces crawl pressure rather than immediately retrying at the same rate.",
                ],
                [
                  "Browser rendering",
                  "When JavaScript rendering is required, BeseamBot blocks unnecessary images, media, and fonts to reduce load while keeping the page evidence needed for an audit.",
                ],
              ].map(([title, body]) => (
                <div key={title} className="border-t border-black/22 pt-5">
                  <h3 className="text-[16px] font-semibold text-ink-deep">
                    {title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.68] text-black/62">
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/18 bg-ground">
        <div className="mx-auto grid max-w-[92rem] gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20 lg:px-10 lg:py-24">
          <div>
            <p className="font-display text-[12px] font-semibold uppercase tracking-[0.08em] text-signal-ink">
              Control access
            </p>
            <h2 className="mt-6 font-display text-[clamp(2.1rem,3vw,3rem)] font-normal leading-[1.08] tracking-[-0.02em] text-ink-deep">
              Use standard robots.txt rules.
            </h2>
            <p className="mt-5 max-w-[54ch] text-[16px] leading-[1.72] text-black/66">
              Site operators can block BeseamBot completely, restrict selected
              paths, or request a slower crawl using standard robots directives.
            </p>
          </div>
          <div className="space-y-5">
            <div className="border border-black/18 bg-ink-deep p-5 text-white">
              <p className="font-display text-[11px] font-semibold uppercase tracking-[0.08em] text-white/48">
                Block BeseamBot
              </p>
              <pre className="mt-4 overflow-x-auto font-mono text-[13px] leading-6 text-white/88">{`User-agent: BeseamBot\nDisallow: /`}</pre>
            </div>
            <div className="border border-black/18 bg-white p-5">
              <p className="font-display text-[11px] font-semibold uppercase tracking-[0.08em] text-black/48">
                Ask for a slower crawl
              </p>
              <pre className="mt-4 overflow-x-auto font-mono text-[13px] leading-6 text-ink-deep">{`User-agent: BeseamBot\nCrawl-delay: 5`}</pre>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <div className="grid gap-8 border-t border-black/22 pt-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div>
              <h2 className="font-display text-[clamp(2rem,3vw,3rem)] font-normal leading-[1.08] tracking-[-0.02em] text-ink-deep">
                Questions about BeseamBot traffic?
              </h2>
              <p className="mt-4 max-w-[62ch] text-[16px] leading-[1.7] text-black/62">
                If you see traffic you do not expect, include the affected
                domain and approximate time so we can investigate the crawl.
              </p>
            </div>
            <Link
              href="/contact"
              className="rounded-button inline-flex min-h-11 items-center justify-center border border-signal-ink px-5 py-3 text-[14px] font-semibold text-signal-ink transition-colors hover:bg-signal-ink hover:text-white"
            >
              Contact Beseam
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
