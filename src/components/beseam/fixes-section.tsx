import type { ReactNode } from "react";

import Link from "next/link";

import { ArrowUpRight, FileText, Gauge, PenLine } from "lucide-react";

import { Reveal } from "@/components/beseam/reveal";
import { getDictionary, type Dictionary } from "@/i18n";
import { localizedPath, type Locale } from "@/i18n/locale-rules.mjs";

type FixKey = keyof Dictionary["sections"]["fixes"]["items"];

/**
 * What Beseam actually fixes, in three cards: product descriptions, content
 * (collection and comparison pages, blogs, guides) and technical performance.
 * Sits right before "How it works".
 */
const FIXES: readonly {
  key: FixKey;
  tile: string;
  icon: ReactNode;
  /** The matching product page (in the reader's language). */
  href: string;
}[] = [
  {
    key: "descriptions",
    tile: "#ffe680",
    href: "/product/product-descriptions",
    icon: <FileText aria-hidden="true" className="h-6 w-6" />,
  },
  {
    key: "content",
    tile: "#e3d3ff",
    href: "/product/content-creation",
    icon: <PenLine aria-hidden="true" className="h-6 w-6" />,
  },
  {
    key: "technical",
    tile: "#c6efdc",
    href: "/product/technical-performance",
    icon: <Gauge aria-hidden="true" className="h-6 w-6" />,
  },
];

export default function FixesSection({ locale = "en" }: { locale?: Locale }) {
  const dictionary = getDictionary(locale);
  const t = dictionary.sections.fixes;
  // Same label as the product-type cards.
  const learnMore = dictionary.sections.categories.learnMore;

  return (
    <section id="what-beseam-fixes" className="scroll-mt-24 bg-ground">
      <div className="mx-auto max-w-[76rem] px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
        <Reveal>
          <h2 className="mx-auto max-w-[22ch] text-balance text-center font-display text-[clamp(2.25rem,3.6vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink-deep">
            {t.heading}
          </h2>
          <ul className="mt-10 grid gap-5 md:grid-cols-3 md:grid-rows-[auto_auto_1fr_auto] lg:mt-14 lg:gap-6">
            {FIXES.map(({ key, tile, icon, href }) => (
              <li
                key={key}
                className="rounded-media border border-black/10 bg-white p-6 sm:p-7 md:row-span-4 md:grid md:grid-rows-subgrid md:gap-0"
              >
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-media text-ink-deep"
                  style={{ background: tile }}
                >
                  {icon}
                </span>
                <h3 className="mt-5 text-[19px] font-semibold tracking-[-0.01em] text-ink-deep">
                  {t.items[key].title}
                </h3>
                <p className="mt-2 text-[15px] leading-[1.6] text-black/64">
                  {t.items[key].body}
                </p>
                <Link
                  href={localizedPath(href, locale)}
                  className="group mt-4 inline-flex items-center gap-1.5 self-start justify-self-start text-[15px] font-semibold text-ink-deep underline-offset-4 hover:underline"
                >
                  {learnMore}
                  <span className="sr-only">: {t.items[key].title}</span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 text-black/50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink-deep"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
