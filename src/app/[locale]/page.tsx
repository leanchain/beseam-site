import type { Metadata } from "next";

import FaqSection from "@/components/beseam/faq-section";
import MobileStickyCta from "@/components/beseam/mobile-sticky-cta";
import ProductionHomepage from "@/components/beseam/production-homepage";
import CookieConsent from "@/components/cookie-consent";
import { getDictionary } from "@/i18n";
import { HOME_SOCIAL_IMAGE, buildPublicMetadata } from "@/lib/seo";
import { homeJsonLd } from "@/lib/seo-json-ld";

const LOCALE = "de" as const;
const t = getDictionary(LOCALE);

export const dynamicParams = false;
export function generateStaticParams() {
  return [{ locale: "de" }];
}

export const metadata: Metadata = buildPublicMetadata({
  title: t.meta.home.title,
  description: t.meta.home.description,
  path: "/de",
  image: HOME_SOCIAL_IMAGE,
  imageAlt: t.meta.home.imageAlt,
  languages: { en: "/", de: "/de", "x-default": "/" },
});

export default function GermanHome() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd(LOCALE)) }}
      />
      <ProductionHomepage locale={LOCALE} />
      <FaqSection locale={LOCALE} />
      <MobileStickyCta />
      <CookieConsent />
    </>
  );
}
