import type { Metadata } from "next";

import FaqSection from "@/components/beseam/faq-section";
import MobileStickyCta from "@/components/beseam/mobile-sticky-cta";
import ProductionHomepage from "@/components/beseam/production-homepage";
import CookieConsent from "@/components/cookie-consent";
import { getDictionary } from "@/i18n";
import { LOCALES, type Locale } from "@/i18n/locale-rules.mjs";
import { buildPublicMetadata, homeSocialImage } from "@/lib/seo";
import { homeJsonLd } from "@/lib/seo-json-ld";

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
    title: t.meta.home.title,
    description: t.meta.home.description,
    path: `/${locale}`,
    image: homeSocialImage(locale),
    imageAlt: t.meta.home.imageAlt,
    languages: { en: "/", de: "/de", nl: "/nl", "x-default": "/" },
  });
}

export default async function LocalizedHome({ params }: Params) {
  const { locale } = await params;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd(locale)) }}
      />
      <ProductionHomepage locale={locale} />
      <FaqSection locale={locale} />
      <MobileStickyCta />
      <CookieConsent />
    </>
  );
}
