import type { Dictionary } from "./en";

export const de: Dictionary = {
  nav: {
    skipToContent: "Zum Inhalt springen",
    homeAriaLabel: "Beseam Startseite",
    primaryAriaLabel: "Hauptnavigation",
    mobileAriaLabel: "Mobile Navigation",
    openNavigation: "Navigation öffnen",
    closeNavigation: "Navigation schließen",
    links: {
      platform: "Plattform",
      howWeWork: "So arbeiten wir",
      report: "AI Shopping Report",
    },
    login: "Anmelden",
    cta: "Shop scannen",
  },
  switcher: {
    triggerAriaLabel: "Sprache wechseln",
    listboxAriaLabel: "Sprache",
    names: { en: "English", de: "Deutsch" },
  },
  footer: {
    homeAriaLabel: "Beseam Startseite",
    tagline: {
      before: "Machen Sie es leichter, Produkte zu",
      highlight: "finden, auszuwählen und zu kaufen",
    },
    description:
      "Beseam beobachtet fortlaufend die Kaufreise, findet, was sich zu verbessern lohnt, setzt genehmigte Änderungen um, wo dies unterstützt wird, und misst, was sich verändert hat.",
    groups: {
      product: {
        label: "Produkt",
        links: {
          platform: "Plattform",
          aiShoppingDiscovery: "KI-Shopping-Sichtbarkeit",
          compare: "Compare",
        },
      },
      aiShoppingAgents: {
        label: "KI-Einkaufsagenten",
        links: {
          aiShoppingData: "KI-Shopping-Daten",
          forShoppingAgents: "Für Einkaufsagenten",
          report: "AI Shopping Report",
        },
      },
      company: {
        label: "Unternehmen",
        links: {
          howWeWork: "So arbeiten wir",
          about: "Über uns",
          manifesto: "Manifest",
          contact: "Kontakt",
        },
      },
      fieldbook: {
        label: "Fieldbook",
        links: {
          fieldbook: "Fieldbook",
        },
      },
    },
    copyright: (year: number) => `© ${year} Beseam. Alle Rechte vorbehalten.`,
    privacy: "Datenschutz",
    terms: "Nutzungsbedingungen",
    bot: "BeseamBot",
    madeWith: "Mit Liebe in der Schweiz gemacht",
    swissFlagAriaLabel: "Schweizer Flagge",
  },
  meta: {
    home: {
      title:
        "Beseam | Sehen Sie, warum die KI sich für einen anderen entschieden hat",
      description:
        "Beseam zeigt Ihnen, wo KI-Einkaufsassistenten Ihre Produkte auslassen, warum das passiert, was zu beheben ist und ob die Behebung funktioniert hat. Kostenloser Store-Scan; kundenseitige Änderungen nur mit Ihrer Zustimmung.",
      imageAlt: "Beseam findet, behebt und misst E-Commerce-Wachstumschancen",
    },
    scan: {
      title: "Kostenloser Store-Scan | Beseam",
      description:
        "Eine technische Auffindbarkeits-Analyse Ihres öffentlichen Storefronts: was Suchmaschinen und KI-Assistenten auf Ihren Produktseiten, in Ihren Katalogdaten und Ihren Website-Signalen sehen können – und was zuerst verbessert werden sollte. Keine Anmeldung, kein Store-Zugriff nötig. Kein Keyword-Report.",
    },
  },
};
