import ContactContent from "@/components/beseam/contact-content";
import { localizedPath, type Locale } from "@/i18n/locale-rules.mjs";
import { getPageCopy } from "@/i18n/pages";
import { SITE_URL } from "@/lib/seo";

/** The contact page, in any language: structured data plus the content. */
export default function ContactPage({ locale = "en" }: { locale?: Locale }) {
  const t = getPageCopy(locale).contact;
  const url = `${SITE_URL}${localizedPath("/contact", locale)}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": `${url}#webpage`,
        url,
        name: t.jsonLdName,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        inLanguage: locale,
      },
      {
        "@type": "ContactPoint",
        contactType: "customer support and sales",
        url,
        availableLanguage: ["English", "German", "Dutch"],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Beseam",
            item: `${SITE_URL}${localizedPath("/", locale)}`,
          },
          { "@type": "ListItem", position: 2, name: t.breadcrumb, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactContent locale={locale} />
    </>
  );
}
