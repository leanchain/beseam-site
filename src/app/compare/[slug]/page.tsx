import type { Metadata } from "next";

import ComparisonPage from "@/components/beseam/comparison-page";
import { COMPARISONS, getComparison } from "@/lib/comparisons";
import {
  COMPARE_SOCIAL_IMAGE,
  buildPublicMetadata,
  languageAlternates,
} from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return COMPARISONS.map((comparison) => ({ slug: comparison.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const comparison = getComparison(slug);
  if (!comparison) return {};
  return buildPublicMetadata({
    title: comparison.metaTitle,
    description: comparison.metaDescription,
    path: `/compare/${comparison.slug}`,
    image: COMPARE_SOCIAL_IMAGE,
    imageAlt: `Beseam vs ${comparison.name}`,
    type: "article",
    modifiedTime: comparison.lastReviewed,
    section: "Platform comparisons",
    tags: [comparison.name, comparison.category, "buying decisions"],
    languages: languageAlternates(`/compare/${comparison.slug}`),
  });
}

export default async function ComparisonRoute({ params }: Params) {
  const { slug } = await params;
  return <ComparisonPage slug={slug} />;
}
