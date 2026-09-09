import type { Locale } from "@/i18n/locale-rules.mjs";
import { getDictionary } from "@/i18n";
import { SITE_URL } from "@/lib/seo";

const HOME_PATH: Record<Locale, string> = {
  en: "/",
  de: "/de",
};

/**
 * The homepage's `@graph` JSON-LD, shared by `src/app/page.tsx` and
 * `src/app/[locale]/page.tsx` so the two pages cannot drift the way two
 * copies of the same literal object would (the same "one place per concern"
 * move the dictionary makes for copy).
 *
 * `Organization` (root layout) and `SoftwareApplication` describe the site
 * and the product, not this page, so their `@id`/`url` stay anchored to
 * `SITE_URL` regardless of locale. `WebPage` and the `FAQPage` wrapper are
 * page-scoped, so their `@id`/`url` follow the locale's path. The FAQ
 * questions and answers come from `t.faq.items` -- the same source the visible
 * FAQ section renders -- so the German page's structured data is German, and
 * a crawler is never told something in a language the page does not say it in.
 */
export function homeJsonLd(locale: Locale) {
  const t = getDictionary(locale);
  const url = `${SITE_URL}${HOME_PATH[locale]}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: t.meta.home.title,
        description: t.meta.home.description,
        about: { "@id": `${SITE_URL}/#organization` },
        inLanguage: locale,
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE_URL}/#software`,
        name: "Beseam",
        url: `${SITE_URL}/`,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description:
          "Beseam continuously finds strong ecommerce growth opportunities, prepares supported fixes for brand-owner approval, applies approved changes, and measures what changes afterward.",
        featureList: [
          "Find where shoppers may be missed across discovery and the store",
          "Prioritize growth opportunities by evidence and projected impact",
          "Ask the brand owner to approve before customer-facing changes are applied",
          "Measure what changed with before-and-after evidence",
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        name: "Questions about Beseam",
        mainEntity: Object.values(t.faq.items).map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };
}
