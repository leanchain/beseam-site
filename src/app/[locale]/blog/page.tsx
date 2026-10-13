import type { Metadata } from "next";

import BlogIndexPage from "@/components/beseam/blog-index-page";
import type { Locale } from "@/i18n/locale-rules.mjs";
import { getPageCopy } from "@/i18n/pages";
import { buildPublicMetadata, languageAlternates } from "@/lib/seo";

type Params = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = getPageCopy(locale).blog;
  return buildPublicMetadata({
    title: t.metaTitle,
    description: t.metaDescription,
    path: `/${locale}/blog`,
    languages: languageAlternates("/blog"),
  });
}

export default async function LocalizedBlogRoute({ params }: Params) {
  const { locale } = await params;
  return <BlogIndexPage locale={locale} />;
}
