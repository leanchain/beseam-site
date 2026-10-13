import type { Metadata } from "next";

import ScanPageContent from "@/components/beseam/scan-page-content";
import { getDictionary } from "@/i18n";
import { buildPublicMetadata } from "@/lib/seo";

const LOCALE = "en" as const;
const t = getDictionary(LOCALE);

export const metadata: Metadata = buildPublicMetadata({
  title: t.meta.scan.title,
  description: t.meta.scan.description,
  path: "/scan",
  languages: {
    en: "/scan",
    de: "/de/scan",
    nl: "/nl/scan",
    "x-default": "/scan",
  },
});

export default function ScanPage() {
  return <ScanPageContent locale={LOCALE} />;
}
