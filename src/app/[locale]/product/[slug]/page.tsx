import type { Metadata } from "next";

import ProductPage from "@/components/beseam/product-page";
import type { Locale } from "@/i18n/locale-rules.mjs";
import {
  PRODUCT_PAGES,
  getProductPage,
  getProductPages,
} from "@/lib/product-pages";
import { buildPublicMetadata, languageAlternates } from "@/lib/seo";

type Params = { params: Promise<{ locale: Locale; slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return PRODUCT_PAGES.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = getProductPage(slug, locale);
  return buildPublicMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: `/${locale}/product/${slug}`,
    languages: languageAlternates(`/product/${slug}`),
  });
}

export default async function LocalizedProductRoute({ params }: Params) {
  const { locale, slug } = await params;
  return (
    <ProductPage
      page={getProductPage(slug, locale)}
      basePath="/product"
      siblings={getProductPages(locale)}
      locale={locale}
    />
  );
}
