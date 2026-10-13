import type { Metadata } from "next";

import ReportPage from "@/components/beseam/report-page";
import { CATEGORY_BENCHMARKS } from "@/data/category-benchmarks";
import type { Locale } from "@/i18n/locale-rules.mjs";
import { getPageCopy } from "@/i18n/pages";
import { buildPublicMetadata, languageAlternates } from "@/lib/seo";

type Params = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = getPageCopy(locale).report;
  return buildPublicMetadata({
    title: t.metaTitle,
    description: t.metaDescription,
    path: `/${locale}/benchmarks`,
    noIndex: CATEGORY_BENCHMARKS.length === 0,
    languages: languageAlternates("/benchmarks"),
  });
}

export default async function LocalizedReportRoute({ params }: Params) {
  const { locale } = await params;
  return <ReportPage locale={locale} />;
}
