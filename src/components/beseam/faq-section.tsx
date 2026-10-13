import FaqGrid from "@/components/beseam/faq-grid";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/locale-rules.mjs";

/**
 * The same `faq.items` the `FAQPage` graph in `seo-json-ld.ts` is built from,
 * so what a crawler is told and what a visitor reads cannot drift apart or
 * end up in two different languages.
 */
export default function FaqSection({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const items = Object.values(t.faq.items);

  // The heading already says "FAQ", so the small label above it would only
  // repeat it.
  return (
    <FaqGrid id="faq" heading={t.faq.heading} items={items} eyebrow={null} />
  );
}
