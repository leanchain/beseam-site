import type { Metadata } from "next";

import PricingPage from "@/components/beseam/pricing-page";
import { getPageCopy } from "@/i18n/pages";
import { PRICING_PUBLIC } from "@/lib/pricing";
import { buildPublicMetadata, languageAlternates } from "@/lib/seo";

const t = getPageCopy("en").pricing;

export const metadata: Metadata = buildPublicMetadata({
  title: t.metaTitle,
  description: t.metaDescription,
  path: "/pricing",
  noIndex: !PRICING_PUBLIC,
  languages: languageAlternates("/pricing"),
});

export default function PricingRoute() {
  return <PricingPage />;
}
