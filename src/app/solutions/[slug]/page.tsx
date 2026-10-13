import type { Metadata } from "next";

import ProductPage from "@/components/beseam/product-page";
import { buildPublicMetadata, languageAlternates } from "@/lib/seo";
import { SOLUTION_PAGES, getSolutionPage } from "@/lib/solution-pages";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return SOLUTION_PAGES.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const page = getSolutionPage((await params).slug);
  return buildPublicMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: `/solutions/${page.slug}`,
    languages: languageAlternates(`/solutions/${page.slug}`),
  });
}

export default async function SolutionRoute({ params }: Params) {
  return (
    <ProductPage
      page={getSolutionPage((await params).slug)}
      basePath="/solutions"
      siblings={SOLUTION_PAGES}
    />
  );
}
