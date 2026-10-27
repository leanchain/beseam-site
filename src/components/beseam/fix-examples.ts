/**
 * Worked examples, built from the store's own details.
 *
 * The merchant asked for "an embedded example here, like a generated version of
 * my site with the positive example in it. In this way, I could adapt to clear
 * visual instructions instead of guessing what's meant exactly."
 *
 * So these are not documentation samples to translate. They use the brand and
 * product we actually read, and the country and currency we detected, so the
 * merchant can compare them against their own page.
 */

export type FixExample = {
  /** One line saying what this snippet is, in plain words. */
  caption: string;
  /** Where it belongs on the page. */
  placement: string;
  code: string;
};

const q = (value: string) => JSON.stringify(value);

type ExampleLocale = "en" | "de" | "nl";

// Only the prose is translated; the snippet is schema.org markup, whose keys and
// values are the same in every language.
const TEXT = {
  en: {
    returnsCaption:
      "Your returns terms, written so search engines can read them. Change 30 days and free returns to whatever your policy actually says.",
    shippingCaption:
      "Your delivery cost and time, written so search engines can read them. Change the 0 and the 2 to 5 days to your real rate and timings.",
    offerPlacement:
      "Goes inside the Offer block of the product data already on your product pages.",
    identityCaption:
      "Your product with its brand and main image attached, which is what a listing shows.",
    identityPlacement: "Part of the product data on the product page.",
    product: "Your product",
    country: "YOUR_COUNTRY",
    currency: "YOUR_CURRENCY",
  },
  de: {
    returnsCaption:
      "Ihre Rückgabebedingungen, so geschrieben, dass Suchmaschinen sie lesen können. Ändern Sie 30 Tage und kostenlose Rücksendung auf das, was Ihre Richtlinie tatsächlich sagt.",
    shippingCaption:
      "Ihre Versandkosten und Lieferzeit, so geschrieben, dass Suchmaschinen sie lesen können. Ändern Sie die 0 und die 2 bis 5 Tage auf Ihren tatsächlichen Tarif und Ihre echten Lieferzeiten.",
    offerPlacement:
      "Gehört in den Offer-Block der Produktdaten, die bereits auf Ihren Produktseiten stehen.",
    identityCaption:
      "Ihr Produkt mit Marke und Hauptbild, also mit dem, was ein Eintrag zeigt.",
    identityPlacement: "Teil der Produktdaten auf der Produktseite.",
    product: "Ihr Produkt",
    country: "IHR_LAND",
    currency: "IHRE_WAEHRUNG",
  },
  nl: {
    returnsCaption: "Je retourvoorwaarden in een formaat dat zoekmachines kunnen lezen. Pas de 30 dagen en gratis retourzending aan je eigen beleid aan.",
    shippingCaption: "Je verzendkosten en levertijd in een formaat dat zoekmachines kunnen lezen. Pas 0 en 2 tot 5 dagen aan je werkelijke tarieven en tijden aan.",
    offerPlacement: "Hoort in het Offer-blok van de productgegevens op je productpagina's.",
    identityCaption: "Je product met merknaam en hoofdafbeelding, zoals een vermelding het toont.",
    identityPlacement: "Onderdeel van de productgegevens op de productpagina.",
    product: "Je product",
    country: "JOUW_LAND",
    currency: "JOUW_VALUTA",
  },
} as const;

function returnPolicyExample(
  country: string,
  text: (typeof TEXT)[ExampleLocale],
): FixExample {
  const code = [
    "{",
    '  "@type": "Offer",',
    '  "hasMerchantReturnPolicy": {',
    '    "@type": "MerchantReturnPolicy",',
    `    "applicableCountry": ${q(country)},`,
    '    "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",',
    '    "merchantReturnDays": 30,',
    '    "returnMethod": "https://schema.org/ReturnByMail",',
    '    "returnFees": "https://schema.org/FreeReturn"',
    "  }",
    "}",
  ].join("\n");
  return {
    caption: text.returnsCaption,
    placement: text.offerPlacement,
    code,
  };
}

function shippingExample(
  country: string,
  currency: string,
  text: (typeof TEXT)[ExampleLocale],
): FixExample {
  const code = [
    "{",
    '  "@type": "Offer",',
    '  "shippingDetails": {',
    '    "@type": "OfferShippingDetails",',
    '    "shippingRate": {',
    '      "@type": "MonetaryAmount",',
    '      "value": 0,',
    `      "currency": ${q(currency)}`,
    "    },",
    '    "shippingDestination": {',
    '      "@type": "DefinedRegion",',
    `      "addressCountry": ${q(country)}`,
    "    },",
    '    "deliveryTime": {',
    '      "@type": "ShippingDeliveryTime",',
    '      "transitTime": {',
    '        "@type": "QuantitativeValue",',
    '        "minValue": 2,',
    '        "maxValue": 5,',
    '        "unitCode": "DAY"',
    "      }",
    "    }",
    "  }",
    "}",
  ].join("\n");
  return {
    caption: text.shippingCaption,
    placement: text.offerPlacement,
    code,
  };
}

function productIdentityExample(
  brand: string,
  product: string,
  image: string,
  text: (typeof TEXT)[ExampleLocale],
): FixExample {
  const code = [
    "{",
    '  "@type": "Product",',
    `  "name": ${q(product)},`,
    '  "brand": {',
    '    "@type": "Brand",',
    `    "name": ${q(brand)}`,
    "  },",
    `  "image": [${q(image)}]`,
    "}",
  ].join("\n");
  return {
    caption: text.identityCaption,
    placement: text.identityPlacement,
    code,
  };
}

/** The example for a finding, or null when we cannot show one honestly. */
export function fixExampleFor(
  code: string,
  context: {
    brand: string;
    product: string | null;
    country: string | null;
    currency: string | null;
    image: string | null;
    locale?: ExampleLocale;
  },
): FixExample | null {
  const text = TEXT[context.locale ?? "en"];
  // Guessing a currency would put a wrong number in front of the merchant, which
  // is exactly the habit this work exists to remove. When we do not know it, the
  // snippet says so in the place they have to edit anyway.
  const country = context.country || text.country;
  const currency = context.currency || text.currency;

  if (code.includes("return_policy") || code.includes("merchant_return")) {
    return returnPolicyExample(country, text);
  }
  if (code.includes("shipping_details") || code.includes("merchant.shipping")) {
    return shippingExample(country, currency, text);
  }
  if (code.includes("image_missing") || code.includes("brand_missing")) {
    return productIdentityExample(
      context.brand,
      context.product || text.product,
      context.image || "https://your-store.example/product-photo.jpg",
      text,
    );
  }
  return null;
}
