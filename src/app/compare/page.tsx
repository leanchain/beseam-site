import type { Metadata } from "next";

import CompareHubPage from "@/components/beseam/compare-hub-page";
import { getPageCopy } from "@/i18n/pages";
import {
  COMPARE_SOCIAL_IMAGE,
  buildPublicMetadata,
  languageAlternates,
} from "@/lib/seo";

const t = getPageCopy("en").compare;

export const metadata: Metadata = buildPublicMetadata({
  title: t.metaTitle,
  description: t.metaDescription,
  path: "/compare",
  image: COMPARE_SOCIAL_IMAGE,
  languages: languageAlternates("/compare"),
});

export default function CompareRoute() {
  return <CompareHubPage />;
}
