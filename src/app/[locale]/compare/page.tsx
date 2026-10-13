import type { Metadata } from "next";

import CompareHubPage from "@/components/beseam/compare-hub-page";
import type { Locale } from "@/i18n/locale-rules.mjs";
import { getPageCopy } from "@/i18n/pages";
import {
  COMPARE_SOCIAL_IMAGE,
  buildPublicMetadata,
  languageAlternates,
} from "@/lib/seo";

type Params = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = getPageCopy(locale).compare;
  return buildPublicMetadata({
    title: t.metaTitle,
    description: t.metaDescription,
    path: `/${locale}/compare`,
    image: COMPARE_SOCIAL_IMAGE,
    languages: languageAlternates("/compare"),
  });
}

export default async function LocalizedCompareRoute({ params }: Params) {
  const { locale } = await params;
  return <CompareHubPage locale={locale} />;
}
