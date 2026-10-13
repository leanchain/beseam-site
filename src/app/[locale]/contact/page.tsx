import type { Metadata } from "next";

import ContactPage from "@/components/beseam/contact-page";
import type { Locale } from "@/i18n/locale-rules.mjs";
import { getPageCopy } from "@/i18n/pages";
import { buildPublicMetadata, languageAlternates } from "@/lib/seo";

type Params = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = getPageCopy(locale).contact;
  return buildPublicMetadata({
    title: t.metaTitle,
    description: t.metaDescription,
    path: `/${locale}/contact`,
    languages: languageAlternates("/contact"),
  });
}

export default async function LocalizedContactRoute({ params }: Params) {
  const { locale } = await params;
  return <ContactPage locale={locale} />;
}
