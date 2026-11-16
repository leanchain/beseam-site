import type { Metadata } from "next";

import FitPage from "@/components/beseam/fit-page";
import { getPageCopy } from "@/i18n/pages";
import { buildPublicMetadata, languageAlternates } from "@/lib/seo";

const t = getPageCopy("en").fit;

export const metadata: Metadata = buildPublicMetadata({
  title: t.metaTitle,
  description: t.metaDescription,
  path: "/fit",
  languages: languageAlternates("/fit"),
});

export default function FitRoute() {
  return <FitPage />;
}
