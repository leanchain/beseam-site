import type { Metadata } from "next";

import ComparisonPage from "@/components/beseam/comparison-page";
import type { Locale } from "@/i18n/locale-rules.mjs";
import { COMPARISONS, getComparison } from "@/lib/comparisons";
import {
  COMPARE_SOCIAL_IMAGE,
  buildPublicMetadata,
  languageAlternates,
} from "@/lib/seo";

type Params = { params: Promise<{ locale: Locale; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return COMPARISONS.map((comparison) => ({ slug: comparison.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, slug } = await params;
  const comparison = getComparison(slug, locale);
  if (!comparison) return {};
  return buildPublicMetadata({
    title: comparison.metaTitle,
    description: comparison.metaDescription,
    path: `/${locale}/compare/${slug}`,
    image: COMPARE_SOCIAL_IMAGE,
    imageAlt: `Beseam vs ${comparison.name}`,
    type: "article",
    modifiedTime: comparison.lastReviewed,
    section: comparison.category,
    tags: [comparison.name, comparison.category],
    languages: languageAlternates(`/compare/${slug}`),
  });
}

export default async function LocalizedComparisonRoute({ params }: Params) {
  const { locale, slug } = await params;
  return <ComparisonPage slug={slug} locale={locale} />;
}
