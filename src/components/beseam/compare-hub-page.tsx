import Link from "next/link";

import { ArrowRight } from "lucide-react";

import {
  Band,
  CompareCta,
  CompareHero,
  TILES,
} from "@/components/beseam/compare-ui";
import { localizedPath, type Locale } from "@/i18n/locale-rules.mjs";
import { getPageCopy } from "@/i18n/pages";
import { getComparisons } from "@/lib/comparisons";
import { SITE_URL } from "@/lib/seo";

export default function CompareHubPage({ locale = "en" }: { locale?: Locale }) {
  const copy = getPageCopy(locale);
  const t = copy.compare;
  const link = (href: string) => localizedPath(href, locale);
  const comparisons = getComparisons(locale);
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t.jsonLdName,
    numberOfItems: comparisons.length,
    itemListElement: comparisons.map((comparison, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: t.vs(comparison.name),
      url: `${SITE_URL}${link(`/compare/${comparison.slug}`)}`,
    })),
  };

  return (
    <div className="bg-ground text-ink-deep">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <CompareHero
        crumbs={[{ label: "Beseam", href: link("/") }, { label: t.breadcrumb }]}
        breadcrumbLabel={copy.common.breadcrumb}
        title={t.title}
        intro={t.intro}
        meta={t.meta}
      />

      <Band heading={t.gridHeading(comparisons.length)}>
        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-6">
          {comparisons.map((comparison, index) => (
            <li key={comparison.slug}>
              <Link
                href={link(`/compare/${comparison.slug}`)}
                className="group flex h-full flex-col rounded-media border border-black/10 bg-white p-6 transition-colors hover:border-black/30 sm:p-7"
              >
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-media font-display text-[17px] font-semibold text-ink-deep"
                  style={{ background: TILES[index % TILES.length] }}
                  aria-hidden="true"
                >
                  {comparison.name.charAt(0)}
                </span>
                <h3 className="mt-5 text-[19px] font-semibold tracking-[-0.01em] text-ink-deep">
                  {t.vs(comparison.name)}
                </h3>
                <p className="mt-2 flex-1 text-[15px] leading-[1.6] text-black/64">
                  {comparison.headline}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-semibold text-ink-deep group-hover:underline group-hover:underline-offset-4">
                  {t.compare}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Band>

      <CompareCta
        heading={t.hubCtaHeading}
        body={t.hubCtaBody}
        location="comparison_hub"
        buttonLabel={t.ctaButton}
      />
    </div>
  );
}
