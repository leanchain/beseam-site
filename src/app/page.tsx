import type { Metadata } from "next";

import FaqSection from "@/components/beseam/faq-section";
import MobileStickyCta from "@/components/beseam/mobile-sticky-cta";
import ProductionHomepage from "@/components/beseam/production-homepage";
import CookieConsent from "@/components/cookie-consent";
import { HOME_SOCIAL_IMAGE, buildPublicMetadata } from "@/lib/seo";
import { STORE_HEALTH_FAQS } from "@/lib/store-health-faqs";
export const metadata: Metadata = buildPublicMetadata({
  title: "Beseam | See why AI picked someone else",
  description:
    "Beseam shows you where AI shopping assistants leave your products out, why, what to fix, and whether the fix worked. Free store scan; customer-facing changes only with your approval.",
  path: "/",
  image: HOME_SOCIAL_IMAGE,
  imageAlt:
    "Beseam finding, fixing, and measuring ecommerce growth opportunities",
});

export default function Home() {
  const pageJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://beseam.com/#webpage",
        url: "https://beseam.com/",
        name: "Beseam | See why AI picked someone else",
        description:
          "Beseam shows you where AI shopping assistants leave your products out, why, what to fix, and whether the fix worked. Free store scan; customer-facing changes only with your approval.",
        about: { "@id": "https://beseam.com/#organization" },
        inLanguage: "en",
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://beseam.com/#software",
        name: "Beseam",
        url: "https://beseam.com/",
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
        "@id": "https://beseam.com/#faq",
        name: "Questions about Beseam",
        mainEntity: STORE_HEALTH_FAQS.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
      <ProductionHomepage />
      <FaqSection />
      <MobileStickyCta />
      <CookieConsent />
    </>
  );
}
