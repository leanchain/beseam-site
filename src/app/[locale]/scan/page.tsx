import type { Metadata } from "next";

import ScanPageContent from "@/components/beseam/scan-page-content";
import { getDictionary } from "@/i18n";
import { LOCALES, type Locale } from "@/i18n/locale-rules.mjs";
import { buildPublicMetadata } from "@/lib/seo";

type Params = { params: Promise<{ locale: Locale }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return LOCALES.filter((locale) => locale !== "en").map((locale) => ({
    locale,
  }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = getDictionary(locale);
  return buildPublicMetadata({
    title: t.meta.scan.title,
    description: t.meta.scan.description,
    path: `/${locale}/scan`,
    languages: {
      en: "/scan",
      de: "/de/scan",
      nl: "/nl/scan",
      "x-default": "/scan",
    },
  });
}

export default async function LocalizedScan({ params }: Params) {
  const { locale } = await params;
  return <ScanPageContent locale={locale} />;
}
