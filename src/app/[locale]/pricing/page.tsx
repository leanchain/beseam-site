import type { Metadata } from "next";

import PricingPage from "@/components/beseam/pricing-page";
import type { Locale } from "@/i18n/locale-rules.mjs";
import { getPageCopy } from "@/i18n/pages";
import { PRICING_PUBLIC } from "@/lib/pricing";
import { buildPublicMetadata, languageAlternates } from "@/lib/seo";

type Params = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = getPageCopy(locale).pricing;
  return buildPublicMetadata({
    title: t.metaTitle,
    description: t.metaDescription,
    path: `/${locale}/pricing`,
    noIndex: !PRICING_PUBLIC,
    languages: languageAlternates("/pricing"),
  });
}

export default async function LocalizedPricingRoute({ params }: Params) {
  const { locale } = await params;
  return <PricingPage locale={locale} />;
}
