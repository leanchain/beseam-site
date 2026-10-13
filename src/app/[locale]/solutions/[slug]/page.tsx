import type { Metadata } from "next";

import ProductPage from "@/components/beseam/product-page";
import type { Locale } from "@/i18n/locale-rules.mjs";
import { buildPublicMetadata, languageAlternates } from "@/lib/seo";
import {
  SOLUTION_PAGES,
  getSolutionPage,
  getSolutionPages,
} from "@/lib/solution-pages";

type Params = { params: Promise<{ locale: Locale; slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return SOLUTION_PAGES.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = getSolutionPage(slug, locale);
  return buildPublicMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: `/${locale}/solutions/${slug}`,
    languages: languageAlternates(`/solutions/${slug}`),
  });
}

export default async function LocalizedSolutionRoute({ params }: Params) {
  const { locale, slug } = await params;
  return (
    <ProductPage
      page={getSolutionPage(slug, locale)}
      basePath="/solutions"
      siblings={getSolutionPages(locale)}
      locale={locale}
    />
  );
}
