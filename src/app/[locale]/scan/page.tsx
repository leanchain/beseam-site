import type { Metadata } from "next";

import ScanPageContent from "@/components/beseam/scan-page-content";
import { getDictionary } from "@/i18n";
import { buildPublicMetadata } from "@/lib/seo";

const LOCALE = "de" as const;
const t = getDictionary(LOCALE);

export const dynamicParams = false;
export function generateStaticParams() {
  return [{ locale: "de" }];
}

export const metadata: Metadata = buildPublicMetadata({
  title: t.meta.scan.title,
  description: t.meta.scan.description,
  path: "/de/scan",
  languages: { en: "/scan", de: "/de/scan", "x-default": "/scan" },
});

export default function GermanScan() {
  return <ScanPageContent locale={LOCALE} />;
}
