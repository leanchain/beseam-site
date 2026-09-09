import Link from "next/link";

import { ArrowRight, Bot, Braces, Database, FileText } from "lucide-react";
import type { Metadata } from "next";

import { Reveal } from "@/components/beseam/reveal";
import { buildPublicMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPublicMetadata({
  title: "For AI Shopping Agents | Beseam",
  description:
    "Machine-readable Beseam resources for AI shopping agents, researchers, and developers: public shopping data, JSON, CSV, method, llms.txt, robots.txt, and crawler information.",
  path: "/agents",
});

const RESOURCES = [
  {
    title: "AI shopping data",
    detail:
      "Public shopping questions and the brands named by each AI assistant.",
    href: "/data",
    label: "Browse the data",
    Icon: Database,
  },
  {
    title: "JSON dataset",
    detail:
      "Full run metadata, assistant totals, questions, and brand appearances.",
    href: "/data/ai-shopping.json",
    label: "Open JSON",
    Icon: Braces,
  },
  {
    title: "AI Shopping Report",
    detail: "Human-readable charts, questions, dates, and the full method.",
    href: "/benchmarks",
    label: "Open the report",
    Icon: FileText,
  },
  {
    title: "BeseamBot",
    detail:
      "User-Agent, crawl rules, request pacing, and how to control access.",
    href: "/bot",
    label: "Crawler information",
    Icon: Bot,
  },
] as const;

export default function AgentsPage() {
  return (
    <div className="bg-ground text-ink-deep">
      <section className="border-b border-black/18">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <nav className="text-[13px] text-muted-foreground">
            <Link href="/" className="hover:text-signal-ink">
              Beseam
            </Link>
            <span aria-hidden className="mx-2">
              /
            </span>
            <span>Agents</span>
          </nav>
          <Reveal className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(22rem,0.68fr)] lg:items-end lg:gap-20">
            <div>
              <h1 className="max-w-[15ch] font-display text-[clamp(2.8rem,6vw,4.7rem)] font-normal leading-[1] tracking-[-0.025em]">
                Public Beseam data, made easy for machines to read.
              </h1>
            </div>
            <div>
              <p className="max-w-[60ch] text-[18px] leading-[1.72] text-black/66">
                If you build or research AI shopping agents, start here. These
                are the public Beseam pages and files that are meant to be read,
                downloaded, or crawled.
              </p>
              <p className="mt-5 text-[14px] leading-relaxed text-black/54">
                This is research data, not a live product feed or recommendation
                API.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-black/18 bg-ground-2">
        <div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <div className="grid gap-px border border-black/18 bg-black/18 md:grid-cols-2">
            {RESOURCES.map(({ title, detail, href, label, Icon }) => (
              <article key={title} className="bg-white p-6 sm:p-7">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center bg-ink-deep text-signal">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <h2 className="text-[19px] font-semibold">{title}</h2>
                </div>
                <p className="mt-4 max-w-[50ch] text-[14px] leading-[1.65] text-black/60">
                  {detail}
                </p>
                <a
                  href={href}
                  className="mt-6 inline-flex min-h-11 items-center gap-2 text-[14px] font-semibold text-signal-ink underline decoration-signal-ink/30 underline-offset-6 hover:decoration-signal-ink"
                >
                  {label}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-black/18 bg-white">
        <div className="mx-auto grid max-w-[92rem] gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[minmax(16rem,0.55fr)_minmax(0,1.45fr)] lg:gap-20 lg:px-10 lg:py-24">
          <div>
            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.12em] text-signal-ink">
              Direct machine-readable links
            </p>
            <h2 className="mt-5 max-w-[15ch] font-display text-[clamp(2rem,3vw,3rem)] font-normal leading-[1.06]">
              Use the format that fits your agent.
            </h2>
          </div>
          <div className="border-t border-black/22">
            {[
              ["AGENTS.md", "/AGENTS.md"],
              ["agents.md", "/agents.md"],
              ["JSON", "/data/ai-shopping.json"],
              ["CSV", "/data/ai-shopping.csv"],
              ["llms.txt", "/llms.txt"],
              ["robots.txt", "/robots.txt"],
              ["Sitemap", "/sitemap.xml"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="group flex min-h-14 items-center justify-between gap-6 border-b border-black/16 py-3 text-[14px]"
              >
                <span className="font-semibold">{label}</span>
                <code className="min-w-0 truncate font-mono text-[11px] text-black/52 group-hover:text-signal-ink">
                  {href}
                </code>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-black/18 bg-ground">
        <div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[minmax(16rem,0.55fr)_minmax(0,1.45fr)] lg:gap-20">
            <div>
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.12em] text-signal-ink">
                Protocol status
              </p>
              <h2 className="mt-5 max-w-[14ch] font-display text-[clamp(2rem,3vw,3rem)] font-normal leading-[1.06]">
                Static data today. Protocols when they are real.
              </h2>
            </div>
            <div className="border-t border-black/22">
              {[
                [
                  "AGENTS.md",
                  "Available",
                  "Agent-readable guide to Beseam's public files and how to interpret the data.",
                ],
                [
                  "llms.txt",
                  "Available",
                  "Compact index of the public pages and machine-readable data.",
                ],
                [
                  "MCP",
                  "Not exposed yet",
                  "No public MCP endpoint is advertised on beseam.com today.",
                ],
                [
                  "A2A",
                  "Not exposed yet",
                  "No A2A Agent Card is published until there is an actual A2A service behind it.",
                ],
              ].map(([name, status, detail]) => (
                <div
                  key={name}
                  className="grid gap-2 border-b border-black/16 py-5 sm:grid-cols-[9rem_9rem_minmax(0,1fr)] sm:gap-5"
                >
                  <span className="font-semibold">{name}</span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-signal-ink">
                    {status}
                  </span>
                  <span className="text-[14px] leading-[1.6] text-black/60">
                    {detail}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/18 bg-ground">
        <div className="mx-auto grid max-w-[92rem] gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-20 lg:px-10 lg:py-24">
          <div>
            <h2 className="text-[22px] font-semibold">
              What you can use it for
            </h2>
            <ul className="mt-6 border-t border-black/18">
              {[
                "Compare which assistants named the same brands.",
                "Test shopping questions against your own agent or model.",
                "Study how much brand overlap changes by question.",
                "Cite the public report and method behind the dataset.",
              ].map((item) => (
                <li
                  key={item}
                  className="border-b border-black/14 py-4 text-[14px] leading-[1.6] text-black/62"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-[22px] font-semibold">What it is not</h2>
            <ul className="mt-6 border-t border-black/18">
              {[
                "Not a live product catalog or inventory feed.",
                "Not a recommendation or ranking API.",
                "Not private customer or merchant data.",
                "Not proof of why an assistant named or missed a brand.",
              ].map((item) => (
                <li
                  key={item}
                  className="border-b border-black/14 py-4 text-[14px] leading-[1.6] text-black/62"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-ink-deep text-white">
        <div className="mx-auto grid max-w-[92rem] gap-8 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:px-10">
          <div>
            <h2 className="max-w-[25ch] font-display text-[clamp(2rem,3vw,3rem)] font-normal leading-[1.06]">
              Want another public format or dataset?
            </h2>
            <p className="mt-4 max-w-[58ch] text-[14px] leading-[1.7] text-white/62">
              Tell us what your shopping agent needs. We can use that feedback
              to decide what public data to expose next.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex min-h-12 items-center justify-center gap-2 bg-signal-ink px-6 text-[14px] font-semibold text-white"
          >
            Contact Beseam
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
