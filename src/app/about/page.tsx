import type { Metadata } from "next";

import AboutPage from "@/components/beseam/about-page";
import { getPageCopy } from "@/i18n/pages";
import { buildPublicMetadata, languageAlternates } from "@/lib/seo";

const t = getPageCopy("en").about;

export const metadata: Metadata = buildPublicMetadata({
  title: t.metaTitle,
  description: t.metaDescription,
  path: "/about",
  languages: languageAlternates("/about"),
});

export default function AboutRoute() {
  return <AboutPage />;
}
