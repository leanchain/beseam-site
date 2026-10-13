import type { Metadata } from "next";

import AboutPage from "@/components/beseam/about-page";
import type { Locale } from "@/i18n/locale-rules.mjs";
import { getPageCopy } from "@/i18n/pages";
import { buildPublicMetadata, languageAlternates } from "@/lib/seo";

type Params = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = getPageCopy(locale).about;
  return buildPublicMetadata({
    title: t.metaTitle,
    description: t.metaDescription,
    path: `/${locale}/about`,
    languages: languageAlternates("/about"),
  });
}

export default async function LocalizedAboutRoute({ params }: Params) {
  const { locale } = await params;
  return <AboutPage locale={locale} />;
}
