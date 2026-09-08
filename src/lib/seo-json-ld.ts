import type { Locale } from "@/i18n/locale-rules.mjs";
import { getDictionary } from "@/i18n";
import { SITE_URL } from "@/lib/seo";
import { STORE_HEALTH_FAQS } from "@/lib/store-health-faqs";

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
 * questions/answers themselves stay English in this task -- Task 7 owns that
 * copy.
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
        mainEntity: STORE_HEALTH_FAQS.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };
}
