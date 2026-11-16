import type { Metadata } from "next";

import FitPage from "@/components/beseam/fit-page";
import type { Locale } from "@/i18n/locale-rules.mjs";
import { getPageCopy } from "@/i18n/pages";
import { buildPublicMetadata, languageAlternates } from "@/lib/seo";

type Params = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = getPageCopy(locale).fit;
  return buildPublicMetadata({
    title: t.metaTitle,
    description: t.metaDescription,
    path: `/${locale}/fit`,
    languages: languageAlternates("/fit"),
  });
}

export default async function LocalizedFitRoute({ params }: Params) {
  const { locale } = await params;
  return <FitPage locale={locale} />;
}
