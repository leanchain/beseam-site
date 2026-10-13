import type { Metadata } from "next";

import ReportPage from "@/components/beseam/report-page";
import { CATEGORY_BENCHMARKS } from "@/data/category-benchmarks";
import { getPageCopy } from "@/i18n/pages";
import { buildPublicMetadata, languageAlternates } from "@/lib/seo";

const t = getPageCopy("en").report;

export const metadata: Metadata = buildPublicMetadata({
  title: t.metaTitle,
  description: t.metaDescription,
  path: "/benchmarks",
  noIndex: CATEGORY_BENCHMARKS.length === 0,
  languages: languageAlternates("/benchmarks"),
});

export default function ReportRoute() {
  return <ReportPage />;
}
