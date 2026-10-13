import type { Metadata } from "next";

import ContactPage from "@/components/beseam/contact-page";
import { getPageCopy } from "@/i18n/pages";
import { buildPublicMetadata, languageAlternates } from "@/lib/seo";

const t = getPageCopy("en").contact;

export const metadata: Metadata = buildPublicMetadata({
  title: t.metaTitle,
  description: t.metaDescription,
  path: "/contact",
  languages: languageAlternates("/contact"),
});

export default function ContactRoute() {
  return <ContactPage />;
}
