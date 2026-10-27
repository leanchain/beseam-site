import type { Locale } from "@/i18n/locale-rules.mjs";

/**
 * Whether the pricing page is public. While false, the page still works at
 * /pricing (and /de, /nl) for anyone with the link, but it is left out of
 * the menu, footer and sitemap and marked "noindex". Flip to true to launch.
 */
export const PRICING_PUBLIC = false;

/**
 * DRAFT pricing, proposed for review: none of these plans, prices or limits
 * are confirmed. Change them here; the pricing page and its FAQ structured
 * data read from this file only. Prices and limits are shared; only the text
 * differs per language.
 *
 * Prices are in euros per month, excluding VAT. Annual billing gives two
 * months free (pay for ten, get twelve).
 */
export type Plan = {
  id: "starter" | "growth" | "scale";
  name: string;
  /** Who the plan is for, in one line. */
  audience: string;
  monthly: number;
  /** Shown on the plan card, in order. */
  features: readonly string[];
  /** The plan the card's feature list builds on, if any. */
  includesFrom?: string;
  highlighted?: boolean;
};

type Cell = string | boolean;
export type ComparisonGroup = {
  group: string;
  rows: readonly { label: string; values: readonly [Cell, Cell, Cell] }[];
};
export type Faq = { question: string; answer: string };

/**
 * Annual billing: two months free, shown as a monthly equivalent. Rounded
 * down, so the shown price is never above what the yearly total works out to.
 */
export const annualMonthly = (monthly: number) =>
  Math.floor((monthly * 10) / 12);

const PRICES = { starter: 199, growth: 349, scale: 799 } as const;

type PricingCopy = {
  plans: readonly Plan[];
  comparison: readonly ComparisonGroup[];
  faqs: readonly Faq[];
};

const EN: PricingCopy = {
  plans: [
    {
      id: "starter",
      name: "Starter",
      audience: "For webshops getting started with AI search",
      monthly: PRICES.starter,
      features: [
        "Up to 500 products",
        "100 shopper questions, tracked daily",
        "All 6 AI assistants",
        "Product description optimisation",
        "Technical check",
        "1 Shopify store",
      ],
    },
    {
      id: "growth",
      name: "Growth",
      audience: "For webshops turning AI into a revenue channel",
      monthly: PRICES.growth,
      highlighted: true,
      includesFrom: "Starter",
      features: [
        "Up to 1,000 products",
        "300 shopper questions, tracked daily",
        "10 content pages per month",
        "AI traffic and revenue attribution",
        "Competitor insights",
      ],
    },
    {
      id: "scale",
      name: "Scale",
      audience: "For large catalogues and multiple markets",
      monthly: PRICES.scale,
      includesFrom: "Growth",
      features: [
        "Up to 5,000 products",
        "750 shopper questions, tracked daily",
        "30 content pages per month",
        "Automate the changes you trust",
        "Multiple markets and languages",
        "Up to 3 Shopify stores",
        "Onboarding call and priority support",
      ],
    },
  ],
  comparison: [
    {
      group: "Catalogue and tracking",
      rows: [
        { label: "Products", values: ["500", "1,000", "5,000"] },
        { label: "Shopper questions", values: ["100", "300", "750"] },
        {
          label: "AI answers tracked per month",
          values: ["18,000", "54,000", "135,000"],
        },
        { label: "AI assistants tracked", values: ["6", "6", "6"] },
        { label: "Tracking frequency", values: ["Daily", "Daily", "Daily"] },
        { label: "Competitor insights", values: [false, true, true] },
        { label: "Shopify stores", values: ["1", "1", "3"] },
      ],
    },
    {
      group: "Optimisation",
      rows: [
        {
          label: "Product description optimisation",
          values: [true, true, true],
        },
        { label: "Technical check", values: [true, true, true] },
        { label: "Content pages per month", values: [false, "10", "30"] },
        {
          label: "Automate approved change types",
          values: [false, false, true],
        },
        {
          label: "Multiple markets and languages",
          values: [false, false, true],
        },
      ],
    },
    {
      group: "Results and support",
      rows: [
        {
          label: "AI traffic and revenue attribution",
          values: [false, true, true],
        },
        { label: "Email support", values: [true, true, true] },
        {
          label: "Onboarding call and priority support",
          values: [false, false, true],
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Can I try Beseam for free?",
      answer:
        "Yes. Every plan starts with a 14-day free trial, so you can see the first results for your webshop before you pay anything.",
    },
    {
      question: "What counts as a product?",
      answer:
        "Each product in your Shopify catalogue counts once, whatever the number of sizes or colours. Variants are always included.",
    },
    {
      question: "What is a tracked shopper question?",
      answer:
        "A question shoppers ask AI assistants, such as “waterproof boots for commuting”. Beseam asks each tracked question across all six assistants and records which products are recommended.",
    },
    {
      question: "Can I change plans later?",
      answer:
        "Yes. You can upgrade or downgrade at any time. Upgrades apply straight away; downgrades apply from your next billing period.",
    },
    {
      question: "Is there a long-term contract?",
      answer:
        "No. Monthly plans can be cancelled at any time. Annual plans give you two months free and run for twelve months.",
    },
    {
      question: "What happens if my catalogue grows past my plan?",
      answer:
        "Beseam keeps working on your most important products and lets you know when it's time to move to a larger plan.",
    },
    {
      question: "Are prices including VAT?",
      answer:
        "Prices are shown in euros, excluding VAT. VAT is added where it applies, based on your billing address.",
    },
    {
      question: "Do you offer plans for larger catalogues or agencies?",
      answer:
        "Yes. For catalogues over 5,000 products, several brands or agency use, we put together a custom plan. Book a demo to talk it through.",
    },
  ],
};

const DE: PricingCopy = {
  plans: [
    {
      id: "starter",
      name: "Starter",
      audience: "Für Onlineshops, die mit der KI-Suche beginnen",
      monthly: PRICES.starter,
      features: [
        "Bis zu 500 Produkte",
        "100 Kundenfragen, täglich verfolgt",
        "Alle 6 KI-Assistenten",
        "Optimierung der Produktbeschreibungen",
        "Technische Prüfung",
        "1 Shopify-Shop",
      ],
    },
    {
      id: "growth",
      name: "Growth",
      audience: "Für Onlineshops, die KI zu einem Umsatzkanal machen",
      monthly: PRICES.growth,
      highlighted: true,
      includesFrom: "Starter",
      features: [
        "Bis zu 1000 Produkte",
        "300 Kundenfragen, täglich verfolgt",
        "10 Content-Seiten pro Monat",
        "Zuordnung von KI-Traffic und Umsatz",
        "Einblicke in Mitbewerber",
      ],
    },
    {
      id: "scale",
      name: "Scale",
      audience: "Für grosse Kataloge und mehrere Märkte",
      monthly: PRICES.scale,
      includesFrom: "Growth",
      features: [
        "Bis zu 5000 Produkte",
        "750 Kundenfragen, täglich verfolgt",
        "30 Content-Seiten pro Monat",
        "Änderungen automatisieren, denen Sie vertrauen",
        "Mehrere Märkte und Sprachen",
        "Bis zu 3 Shopify-Shops",
        "Onboarding-Call und Priority-Support",
      ],
    },
  ],
  comparison: [
    {
      group: "Katalog und Tracking",
      rows: [
        { label: "Produkte", values: ["500", "1000", "5000"] },
        { label: "Kundenfragen", values: ["100", "300", "750"] },
        {
          label: "Verfolgte KI-Antworten pro Monat",
          values: ["18’000", "54’000", "135’000"],
        },
        { label: "Verfolgte KI-Assistenten", values: ["6", "6", "6"] },
        {
          label: "Tracking-Häufigkeit",
          values: ["Täglich", "Täglich", "Täglich"],
        },
        { label: "Einblicke in Mitbewerber", values: [false, true, true] },
        { label: "Shopify-Shops", values: ["1", "1", "3"] },
      ],
    },
    {
      group: "Optimierung",
      rows: [
        {
          label: "Optimierung der Produktbeschreibungen",
          values: [true, true, true],
        },
        { label: "Technische Prüfung", values: [true, true, true] },
        { label: "Content-Seiten pro Monat", values: [false, "10", "30"] },
        {
          label: "Freigegebene Änderungsarten automatisieren",
          values: [false, false, true],
        },
        { label: "Mehrere Märkte und Sprachen", values: [false, false, true] },
      ],
    },
    {
      group: "Ergebnisse und Support",
      rows: [
        {
          label: "Zuordnung von KI-Traffic und Umsatz",
          values: [false, true, true],
        },
        { label: "Support per E-Mail", values: [true, true, true] },
        {
          label: "Onboarding-Call und Priority-Support",
          values: [false, false, true],
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Kann ich Beseam kostenlos testen?",
      answer:
        "Ja. Jeder Plan beginnt mit einer 14-tägigen kostenlosen Testphase. So sehen Sie die ersten Ergebnisse für Ihren Shop, bevor Sie etwas bezahlen.",
    },
    {
      question: "Was zählt als Produkt?",
      answer:
        "Jedes Produkt in Ihrem Shopify-Katalog zählt einmal, unabhängig von der Anzahl Grössen oder Farben. Varianten sind immer inbegriffen.",
    },
    {
      question: "Was ist eine verfolgte Kundenfrage?",
      answer:
        "Eine Frage, die Kundinnen und Kunden KI-Assistenten stellen, etwa „wasserdichte Stiefel für den Arbeitsweg“. Beseam stellt jede verfolgte Frage allen sechs Assistenten und hält fest, welche Produkte empfohlen werden.",
    },
    {
      question: "Kann ich den Plan später wechseln?",
      answer:
        "Ja. Sie können jederzeit upgraden oder downgraden. Upgrades gelten sofort, Downgrades ab der nächsten Abrechnungsperiode.",
    },
    {
      question: "Gibt es eine lange Vertragslaufzeit?",
      answer:
        "Nein. Monatliche Pläne sind jederzeit kündbar. Jährliche Pläne schenken Ihnen zwei Monate und laufen zwölf Monate.",
    },
    {
      question: "Was passiert, wenn mein Katalog grösser wird als mein Plan?",
      answer:
        "Beseam arbeitet weiter an Ihren wichtigsten Produkten und gibt Ihnen Bescheid, wenn es Zeit für einen grösseren Plan ist.",
    },
    {
      question: "Sind die Preise inklusive Mehrwertsteuer?",
      answer:
        "Die Preise sind in Euro und ohne Mehrwertsteuer angegeben. Die Mehrwertsteuer kommt dort hinzu, wo sie anfällt, abhängig von Ihrer Rechnungsadresse.",
    },
    {
      question: "Gibt es Pläne für grössere Kataloge oder Agenturen?",
      answer:
        "Ja. Für Kataloge mit mehr als 5000 Produkten, mehrere Marken oder Agenturen stellen wir einen individuellen Plan zusammen. Buchen Sie eine Demo, um es zu besprechen.",
    },
  ],
};

const NL: PricingCopy = {
  plans: [
    {
      id: "starter",
      name: "Starter",
      audience: "Voor webshops die beginnen met AI-zoekopdrachten",
      monthly: PRICES.starter,
      features: [
        "Tot 500 producten",
        "100 klantvragen, dagelijks gevolgd",
        "Alle 6 AI-assistenten",
        "Optimalisatie van productbeschrijvingen",
        "Technische controle",
        "1 Shopify-webshop",
      ],
    },
    {
      id: "growth",
      name: "Growth",
      audience: "Voor webshops die van AI een omzetkanaal maken",
      monthly: PRICES.growth,
      highlighted: true,
      includesFrom: "Starter",
      features: [
        "Tot 1.000 producten",
        "300 klantvragen, dagelijks gevolgd",
        "10 contentpagina's per maand",
        "Toewijzing van AI-verkeer en omzet",
        "Inzicht in concurrenten",
      ],
    },
    {
      id: "scale",
      name: "Scale",
      audience: "Voor grote catalogi en meerdere markten",
      monthly: PRICES.scale,
      includesFrom: "Growth",
      features: [
        "Tot 5.000 producten",
        "750 klantvragen, dagelijks gevolgd",
        "30 contentpagina's per maand",
        "Automatiseer de wijzigingen die je vertrouwt",
        "Meerdere markten en talen",
        "Tot 3 Shopify-webshops",
        "Onboardinggesprek en priority support",
      ],
    },
  ],
  comparison: [
    {
      group: "Catalogus en volgen",
      rows: [
        { label: "Producten", values: ["500", "1.000", "5.000"] },
        { label: "Klantvragen", values: ["100", "300", "750"] },
        {
          label: "Gevolgde AI-antwoorden per maand",
          values: ["18.000", "54.000", "135.000"],
        },
        { label: "Gevolgde AI-assistenten", values: ["6", "6", "6"] },
        {
          label: "Frequentie",
          values: ["Dagelijks", "Dagelijks", "Dagelijks"],
        },
        { label: "Inzicht in concurrenten", values: [false, true, true] },
        { label: "Shopify-webshops", values: ["1", "1", "3"] },
      ],
    },
    {
      group: "Optimalisatie",
      rows: [
        {
          label: "Optimalisatie van productbeschrijvingen",
          values: [true, true, true],
        },
        { label: "Technische controle", values: [true, true, true] },
        { label: "Contentpagina's per maand", values: [false, "10", "30"] },
        {
          label: "Goedgekeurde soorten wijzigingen automatiseren",
          values: [false, false, true],
        },
        { label: "Meerdere markten en talen", values: [false, false, true] },
      ],
    },
    {
      group: "Resultaten en support",
      rows: [
        {
          label: "Toewijzing van AI-verkeer en omzet",
          values: [false, true, true],
        },
        { label: "Support per e-mail", values: [true, true, true] },
        {
          label: "Onboardinggesprek en priority support",
          values: [false, false, true],
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Kan ik Beseam gratis proberen?",
      answer:
        "Ja. Elk abonnement begint met een gratis proefperiode van 14 dagen, zodat je de eerste resultaten voor je webshop ziet voordat je iets betaalt.",
    },
    {
      question: "Wat telt als product?",
      answer:
        "Elk product in je Shopify-catalogus telt één keer, ongeacht het aantal maten of kleuren. Varianten zijn altijd inbegrepen.",
    },
    {
      question: "Wat is een gevolgde klantvraag?",
      answer:
        "Een vraag die klanten aan AI-assistenten stellen, zoals ‘waterdichte laarzen voor woon-werkverkeer’. Beseam stelt elke gevolgde vraag aan alle zes assistenten en legt vast welke producten worden aanbevolen.",
    },
    {
      question: "Kan ik later van abonnement wisselen?",
      answer:
        "Ja. Je kunt op elk moment upgraden of downgraden. Upgrades gelden meteen; downgrades gaan in vanaf je volgende factuurperiode.",
    },
    {
      question: "Zit ik vast aan een lang contract?",
      answer:
        "Nee. Maandabonnementen zijn op elk moment opzegbaar. Jaarabonnementen geven je twee maanden gratis en lopen twaalf maanden.",
    },
    {
      question:
        "Wat gebeurt er als mijn catalogus groter wordt dan mijn abonnement?",
      answer:
        "Beseam blijft werken aan je belangrijkste producten en laat je weten wanneer het tijd is voor een groter abonnement.",
    },
    {
      question: "Zijn de prijzen inclusief btw?",
      answer:
        "Prijzen zijn in euro en exclusief btw. Btw wordt toegevoegd waar die van toepassing is, op basis van je factuuradres.",
    },
    {
      question: "Hebben jullie abonnementen voor grotere catalogi of bureaus?",
      answer:
        "Ja. Voor catalogi met meer dan 5.000 producten, meerdere merken of bureaus stellen we een abonnement op maat samen. Plan een demo om het te bespreken.",
    },
  ],
};

const PRICING: Record<Locale, PricingCopy> = { en: EN, de: DE, nl: NL };

export function getPricing(locale: Locale): PricingCopy {
  return PRICING[locale];
}

/** English pricing data, for callers that are not language-aware. */
export const PLANS = EN.plans;
export const COMPARISON = EN.comparison;
export const PRICING_FAQS = EN.faqs;
