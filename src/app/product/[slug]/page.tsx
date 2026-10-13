import type { Metadata } from "next";

import ProductPage from "@/components/beseam/product-page";
import { PRODUCT_PAGES, getProductPage } from "@/lib/product-pages";
import { buildPublicMetadata, languageAlternates } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return PRODUCT_PAGES.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const page = getProductPage((await params).slug);
  return buildPublicMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: `/product/${page.slug}`,
    languages: languageAlternates(`/product/${page.slug}`),
  });
}

export default async function ProductRoute({ params }: Params) {
  return (
    <ProductPage
      page={getProductPage((await params).slug)}
      basePath="/product"
      siblings={PRODUCT_PAGES}
    />
  );
}
