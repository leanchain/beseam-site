import {
  BadgeCheck,
  CheckCircle2,
  Cpu,
  Droplet,
  FlaskConical,
  Footprints,
  Layers,
  Package,
  Palette,
  Plug,
  RefreshCw,
  Ruler,
  Shirt,
  Sparkles,
} from "lucide-react";

import type { ProductPageData } from "@/lib/product-pages";

/**
 * German solution pages (Swiss spelling: ss, never ß; formal "Sie"). Same
 * structure, images and links as the English pages in `solution-pages.ts`.
 */
const steps = (category: string) =>
  [
    {
      title: "Shopify-Shop verbinden",
      body: "Beseam importiert Ihren Katalog, ohne Ihren Theme-Code anzufassen.",
    },
    {
      title: "Sehen, wo Sie fehlen",
      body: `Beseam stellt KI-Assistenten die Fragen, die Kundinnen und Kunden im Bereich ${category} stellen, und zeigt, wo Ihre Produkte fehlen.`,
    },
    {
      title: "Das Wichtigste zuerst verbessern",
      body: "Erhalten Sie Verbesserungen, sortiert nach erwarteter Umsatzwirkung, und geben Sie sie frei oder lassen Sie Beseam sie automatisch umsetzen.",
    },
  ] as const;

const catalogueFaq = {
  question: "Funktioniert Beseam auch mit grossen Katalogen?",
  answer:
    "Ja. Beseam ist für Shops mit Hunderten oder Tausenden Produkten und Varianten gemacht und beginnt mit den Produkten, die für Ihren Umsatz am wichtigsten sind.",
} as const;

const platformFaq = {
  question: "Funktioniert Beseam mit meiner Shop-Plattform?",
  answer:
    "Beseam funktioniert derzeit mit Shopify-Shops. Sie verbinden Ihren Shop mit einem Klick, ohne Ihren Theme-Code anzufassen.",
} as const;

const trackedCompetitorsAnswer =
  "Ja. Für jede verfolgte Frage zeigt Beseam, welche Marken und Produkte der Assistent empfohlen hat. So sehen Sie, wer an Ihrer Stelle erscheint.";

const timelineAnswer =
  "Einen festen Zeitrahmen gibt es nicht: Er hängt vom Assistenten ab und davon, wie oft er seine Informationen aktualisiert. Beseam stellt dieselben Fragen über die Zeit, damit Sie sehen, wann Ihre Produkte auftauchen.";

const crawlerMistake = {
  title: "KI-Crawler versehentlich blockiert",
  body: "Bot-Schutz, Firewall-Regeln oder Einstellungen in der robots.txt können KI-Crawler aussperren, ohne dass Sie es merken.",
};

const notKnowingMistake = (what: string) => ({
  title: "Nicht wissen, wo Sie stehen",
  body: `Ohne die Fragen Ihrer Kundschaft zu verfolgen, wissen Sie nicht, ob die KI ${what} empfiehlt oder die eines Mitbewerbers.`,
});

const ALL_PRODUCTS = [
  "ai-visibility-tracking",
  "product-descriptions",
  "content-creation",
  "technical-performance",
] as const;

const TRACKING_POINTS = [
  "Verfolgt pro Frage, Produkt und Assistent",
  "Sehen Sie, welche Marken stattdessen empfohlen werden",
  "Verknüpft mit Traffic und Umsatz aus KI-Assistenten",
] as const;

export const SOLUTION_PAGES_DE: readonly ProductPageData[] = [
  {
    slug: "footwear",
    name: "Schuhe",
    metaTitle: "KI-Suchoptimierung für Schuh-Onlineshops | Beseam",
    metaDescription:
      "Lassen Sie Ihre Schuhe von ChatGPT, Gemini und anderen KI-Assistenten empfehlen. Verfolgen Sie Ihre Sichtbarkeit und optimieren Sie Seiten und Technik.",
    headline:
      "Lassen Sie Ihre Schuhe empfehlen, wenn Kundinnen und Kunden die KI fragen",
    intro:
      "Kundinnen und Kunden fragen KI-Assistenten nach Laufschuhen für Plattfüsse, wasserdichten Stiefeln für die Stadt oder Sneakers, die normal ausfallen. Beseam verfolgt, wo Ihre Schuhe in diesen Antworten erscheinen, und optimiert Ihre Produktseiten, Inhalte und Technik, damit Assistenten sie empfehlen.",
    heroChat: {
      prompt:
        "Wasserdichte Lederstiefel für den täglichen Arbeitsweg, weite Passform?",
      reply:
        "Für den täglichen Weg im Regen eignet sich ein wasserdichter Lederstiefel mit griffiger Sohle. Diesen gibt es auch in weiter Passform:",
      product: {
        name: "City Leather Boot",
        store: "ihrshop.com",
        price: "€149",
        image: "/images/catalog/boot.webp",
        facts: ["Wasserdicht", "Weite Passform", "Fällt normal aus"],
      },
      sticker: "Empfohlen von 3 von 4 Assistenten",
    },
    shopperQuestions: {
      heading: "Was Kundinnen und Kunden die KI zu Schuhen fragen",
      items: [
        "Beste Laufschuhe für Plattfüsse unter 150 €",
        "Wasserdichte Lederstiefel für den täglichen Arbeitsweg",
        "Fallen diese Sneakers normal aus?",
        "Bequeme Schuhe, um den ganzen Tag zu stehen",
        "Trailrunning-Schuhe für breite Füsse",
        "Vegane Sneakers, die lange halten",
      ],
    },
    pillars: {
      heading: "Alles, damit die KI Ihre Schuhe empfiehlt",
      intro:
        "Gute Produktseiten sind nur ein Teil davon. Beseam deckt die vier Dinge ab, die entscheiden, ob KI-Assistenten Ihre Schuhe empfehlen oder die eines anderen.",
      items: [
        {
          product: "ai-visibility-tracking",
          title: "Sehen Sie, bei welchen Schuh-Fragen Sie erscheinen",
          body: "Beseam stellt KI-Assistenten die Fragen Ihrer Kundschaft, von Laufschuhen für Plattfüsse bis zu wasserdichten Stiefeln für den Arbeitsweg, und zeigt, wo Ihre Schuhe empfohlen werden und wer stattdessen erscheint.",
          points: [
            "Verfolgt pro Frage, Produkt und Assistent",
            "Sehen Sie, welche Mitbewerber stattdessen empfohlen werden",
            "Verknüpft mit Traffic und Umsatz aus KI-Assistenten",
          ],
          visual: {
            kind: "visibility",
            label: "KI-Sichtbarkeit · Schuh-Fragen",
            rows: [
              { prompt: "Laufschuhe für Plattfüsse", recommended: true },
              {
                prompt: "Wasserdichte Stiefel für den Arbeitsweg",
                recommended: false,
              },
              { prompt: "Trailschuhe in weiter Passform", recommended: true },
              { prompt: "Vegane Sneakers, die halten", recommended: false },
            ],
          },
        },
        {
          product: "product-descriptions",
          title: "Produktseiten, die Fragen zu Passform und Grösse beantworten",
          body: "Wer Schuhe online kauft, will vorher Weite, Grösse und Einsatzzweck kennen. Beseam überarbeitet Beschreibungen und ergänzt fehlende Produktdaten, damit Assistenten jeden Schuh einer konkreten Anfrage zuordnen können.",
          points: [
            "Grössenberatung und Weite im Text, nicht nur in einer Tabelle",
            "Einsatzzweck, Material und Wetterschutz",
            "Vollständige Daten für jede Grösse und Farbe",
          ],
          visual: {
            kind: "description",
            before: {
              label: "Vorher",
              text: "Unser beliebtester Laufschuh. Stylish, bequem und in vier Farben erhältlich. Perfekt für jeden Lauf!",
            },
            after: {
              label: "Für KI optimiert",
              text: "Ein wasserdichter Trailrunning-Schuh mit breiter Zehenbox und 8 mm Sprengung, gemacht für nasse und schlammige Trails. EU 38–47, in normaler und weiter Passform. Fällt normal aus.",
            },
          },
        },
        {
          product: "content-creation",
          title: "Inhalte für die Frage „Welchen Schuh soll ich kaufen?“",
          body: "Viele Schuh-Fragen drehen sich nicht um ein einzelnes Produkt: Kundinnen und Kunden bitten die KI, zu vergleichen, zu erklären und bei der Wahl zu helfen. Beseam hilft Ihnen, Kategorieseiten, Vergleiche und Kaufratgeber zu erstellen, die Ihr Sortiment in diese Antworten bringen.",
          points: [
            "Kategorieseiten für Bedürfnisse wie weite Passform oder vegan",
            "Vergleiche wie Trail- oder Strassenlaufschuhe",
            "Kaufratgeber zu Grösse, Passform und Pflege",
          ],
          visual: {
            kind: "pages",
            label: "Gefundene Content-Lücken",
            rows: [
              {
                type: "Kategorie",
                title: "Laufschuhe in weiter Passform",
                status: "Neue Seite",
              },
              {
                type: "Vergleich",
                title: "Trail- oder Strassenlaufschuhe",
                status: "Neue Seite",
              },
              {
                type: "Ratgeber",
                title: "So finden Sie Ihre Laufschuhgrösse",
                status: "Entwurf bereit",
              },
            ],
          },
        },
        {
          product: "technical-performance",
          title: "Produktdaten, die die KI lesen und denen sie vertrauen kann",
          body: "Schuhe gibt es in vielen Grössen und Farben, da passieren bei Produktdaten schnell Fehler. Beseam prüft, ob strukturierte Daten, Preise und Lagerbestand mit Ihren Seiten übereinstimmen und ob KI-Crawler sie erreichen.",
          points: [
            "Strukturierte Daten für jede Grössenvariante",
            "Lagerbestand pro Grösse, der zur Seite passt",
            "KI-Crawler zugelassen, Seiten laden schnell",
          ],
          visual: {
            kind: "checks",
            label: "Technische Prüfung",
            rows: [
              {
                label: "Strukturierte Produktdaten",
                ok: true,
                detail: "Vorhanden",
              },
              {
                label: "Lager pro Grössenvariante",
                ok: false,
                detail: "Nicht synchron",
              },
              { label: "Zugriff für KI-Crawler", ok: true, detail: "Erlaubt" },
              {
                label: "Ladezeit der Produktseiten",
                ok: true,
                detail: "Schnell",
              },
            ],
          },
        },
      ],
    },
    checklist: {
      heading: "Was die KI von einem Schuh-Onlineshop braucht",
      intro:
        "KI-Assistenten empfehlen Schuhe, die sie verstehen, vergleichen und denen sie vertrauen können. Diese Details zählen am meisten, auf Ihren Produktseiten und darüber hinaus.",
      items: [
        {
          title: "Grössen und Grössenberatung",
          body: "Verfügbare Grössen in einem klaren System (EU, UK oder US) und ob der Schuh klein, gross oder normal ausfällt.",
        },
        {
          title: "Weite und Passform",
          body: "Normale, weite oder schmale Passform und die Form der Zehenbox. Fragen nach weiter Passform sind häufig und bleiben oft unbeantwortet.",
        },
        {
          title: "Einsatzzweck",
          body: "Wofür der Schuh gemacht ist: Strasse, Trail, Wandern, Büro oder langes Stehen. Assistenten empfehlen Schuhe für Situationen.",
        },
        {
          title: "Material und Schutz",
          body: "Material von Obermaterial, Futter und Sohle, ob der Schuh vegan ist und ob er wasserdicht oder atmungsaktiv ist.",
        },
        {
          title: "Technische Daten",
          body: "Für Sportschuhe: Sprengung, Dämpfung, Gewicht und Stabilität, die Fakten, nach denen Assistenten vergleichen.",
        },
        {
          title: "Kategorieseiten für häufige Bedürfnisse",
          body: "Seiten für weite, vegane oder wasserdichte Schuhe geben Assistenten einen klaren Überblick über Ihr Angebot.",
        },
        {
          title: "Ratgeber und Vergleiche",
          body: "Inhalte zu Grösse, Passform und der Wahl des richtigen Schuhs geben Assistenten einen Grund, Ihren Shop zu nennen.",
        },
        {
          title: "Korrekte Daten pro Variante",
          body: "Strukturierte Daten, Preise und Lagerbestand für jede Grösse und Farbe, passend zu dem, was Kundinnen und Kunden auf der Seite sehen.",
        },
      ],
    },
    benefitsHeading: "Wie Beseam Schuh-Onlineshops hilft",
    benefits: [
      {
        title: "Grösse und Passform, klar beschrieben",
        body: "Beschreiben Sie Grösse, Weite und Passform, die Details, nach denen vor dem Online-Schuhkauf am meisten gefragt wird.",
        icon: Ruler,
      },
      {
        title: "Material und Einsatzzweck",
        body: "Beschreiben Sie Material, Wasserdichtigkeit und wofür jeder Schuh gemacht ist, vom Trailrunning bis ins Büro.",
        icon: Footprints,
      },
      {
        title: "Jede Variante abgedeckt",
        body: "Halten Sie Grössen, Farben und Lagerdaten vollständig, damit die KI keinen Schuh empfiehlt, der nicht verfügbar ist.",
        icon: Layers,
      },
    ],
    mistakes: {
      heading: "Häufige Fehler, die Schuhe aus KI-Antworten fernhalten",
      items: [
        notKnowingMistake("Ihre Schuhe"),
        {
          title: "Werbesprache statt Fakten",
          body: "„Stylish und bequem“ gibt einem Assistenten nichts in die Hand. Weite, Sprengung, Material und Einsatzzweck schon.",
        },
        {
          title: "Grössenangaben in einem Bild versteckt",
          body: "Grössentabellen als Bild sind für die KI schwer zu lesen. Schreiben Sie die Grössenberatung in den Text und in Ihre Produktdaten.",
        },
        {
          title: "Nur Produktseiten, keine Ratgeber",
          body: "Bei „Welchen Laufschuh soll ich kaufen?“ greifen Assistenten auf Ratgeber und Vergleiche zurück. Ohne sie ist Ihr Shop nicht Teil der Antwort.",
        },
        {
          title: "Ausverkaufte Grössen als verfügbar angezeigt",
          body: "Wenn Produktdaten und Lagerbestand sich widersprechen, überspringen Assistenten Ihre Schuhe womöglich oder schicken Kundinnen und Kunden in eine Sackgasse.",
        },
        crawlerMistake,
      ],
    },
    stepsHeading: "So funktioniert Beseam für Schuh-Onlineshops",
    steps: steps("Schuhe"),
    faqs: [
      {
        question: "Wie bringe ich ChatGPT dazu, meine Schuhe zu empfehlen?",
        answer:
          "Finden Sie zuerst heraus, bei welchen Schuh-Fragen Sie erscheinen. Sorgen Sie dann dafür, dass Ihre Produktseiten Grösse, Passform, Material und Einsatzzweck nennen, ergänzen Sie Inhalte für die Fragen, zu denen sich Ihre Kundschaft informiert, und halten Sie Ihre Produktdaten korrekt. Beseam deckt alle vier Punkte ab und zeigt, was Sie zuerst verbessern sollten.",
      },
      {
        question:
          "Welche Produktinformationen sind bei Schuhen am wichtigsten?",
        answer:
          "Grössen und Grössenberatung, Weite und Passform, Einsatzzweck, Material, Wetterschutz und bei Sportschuhen technische Daten wie Sprengung und Dämpfung. Zusammen ermöglichen sie der KI, einen Schuh einer konkreten Anfrage zuzuordnen.",
      },
      {
        question:
          "Welche Inhalte helfen Schuh-Onlineshops, empfohlen zu werden?",
        answer:
          "Kategorieseiten für häufige Bedürfnisse wie weite oder wasserdichte Schuhe, Vergleiche wie Trail- oder Strassenlaufschuhe und Kaufratgeber zu Grösse und Passform. Auf solche Inhalte greifen KI-Assistenten zurück, wenn Kundinnen und Kunden um Rat fragen.",
      },
      {
        question:
          "Welche technischen Probleme sind bei Schuh-Onlineshops häufig?",
        answer:
          "Strukturierte Daten, denen Grössenvarianten fehlen, Lagerbestände pro Grösse, die nicht zur Seite passen, und KI-Crawler, die vom Bot-Schutz blockiert werden. Weil Schuhe in vielen Grössen und Farben vorkommen, betreffen kleine Datenfehler viele Produkte gleichzeitig.",
      },
      {
        question:
          "Kann ich sehen, welche Schuhmarken die KI statt meiner empfiehlt?",
        answer: trackedCompetitorsAnswer,
      },
      {
        question:
          "Wie lange dauert es, bis meine Schuhe in KI-Antworten erscheinen?",
        answer: timelineAnswer,
      },
      catalogueFaq,
      platformFaq,
    ],
    relatedProducts: ALL_PRODUCTS,
  },
  {
    slug: "fashion-apparel",
    name: "Mode & Bekleidung",
    metaTitle: "KI-Suchoptimierung für Mode-Onlineshops | Beseam",
    metaDescription:
      "Lassen Sie Ihre Mode von ChatGPT, Gemini und anderen KI-Assistenten empfehlen. Verfolgen Sie Ihre Sichtbarkeit und optimieren Sie Seiten und Technik.",
    headline: "Lassen Sie Ihre Mode von der KI empfehlen",
    intro:
      "Kundinnen und Kunden fragen die KI nach einem Leinenhemd für eine Sommerhochzeit, einem Wintermantel, der über einen Blazer passt, oder Jeans für grosse Männer. Beseam verfolgt, wo Ihre Mode in diesen Antworten erscheint, und optimiert Ihre Produktseiten, Inhalte und Technik, damit Assistenten sie empfehlen.",
    heroChat: {
      prompt: "Bio-Baumwoll-T-Shirt, das nach dem Waschen in Form bleibt?",
      reply:
        "Achten Sie auf schwerere, vorgewaschene Bio-Baumwolle, die Wäsche für Wäsche in Form bleibt. Dieses hier passt gut:",
      product: {
        name: "Everyday Organic Tee",
        store: "ihrshop.com",
        price: "€35",
        image: "/images/catalog/tshirt.webp",
        facts: ["Bio-Baumwolle", "Vorgewaschen", "Normale Passform"],
      },
      sticker: "Empfohlen von 3 von 4 Assistenten",
    },
    shopperQuestions: {
      heading: "Was Kundinnen und Kunden die KI zu Mode fragen",
      items: [
        "Leinenhemd für eine Sommerhochzeit",
        "Warmer Wintermantel, der über einen Blazer passt",
        "Nachhaltige Jeans für grosse Männer",
        "Was trage ich in einem Smart-Casual-Büro?",
        "Luftige Kleider für heisses Wetter",
        "Bio-Baumwoll-T-Shirt, das in Form bleibt",
      ],
    },
    pillars: {
      heading: "Alles, damit die KI Ihre Mode empfiehlt",
      intro:
        "Gute Produktseiten sind nur ein Teil davon. Beseam deckt die vier Dinge ab, die entscheiden, ob KI-Assistenten Ihre Mode empfehlen oder die eines anderen.",
      items: [
        {
          product: "ai-visibility-tracking",
          title: "Sehen Sie, bei welchen Mode-Fragen Sie erscheinen",
          body: "Beseam stellt KI-Assistenten die Fragen Ihrer Kundschaft, vom Outfit für eine Sommerhochzeit bis zu Jeans für grosse Männer, und zeigt, wo Ihre Mode empfohlen wird und wer stattdessen erscheint.",
          points: TRACKING_POINTS,
          visual: {
            kind: "visibility",
            label: "KI-Sichtbarkeit · Mode-Fragen",
            rows: [
              {
                prompt: "Leinenhemd für eine Sommerhochzeit",
                recommended: true,
              },
              { prompt: "Jeans für grosse Männer", recommended: false },
              {
                prompt: "Mantel, der über einen Blazer passt",
                recommended: true,
              },
              {
                prompt: "Luftige Kleider für heisses Wetter",
                recommended: false,
              },
            ],
          },
        },
        {
          product: "product-descriptions",
          title: "Produktseiten, die Fragen zu Passform und Anlass beantworten",
          body: "Kundinnen und Kunden fragen, wie ein Kleidungsstück sitzt, woraus es ist und wann man es trägt. Beseam überarbeitet Beschreibungen und ergänzt fehlende Produktdaten, damit Assistenten jedes Teil einer konkreten Anfrage zuordnen können.",
          points: [
            "Schnitt, Passform und Grössenberatung im Text",
            "Stoff, Gewicht und Pflegehinweise",
            "Anlässe und Styling, für jede Farbe und Grösse",
          ],
          visual: {
            kind: "description",
            before: {
              label: "Vorher",
              text: "Unser meistverkauftes Leinenhemd. Mühelos stylish und perfekt für den Sommer. In fünf Farben erhältlich.",
            },
            after: {
              label: "Für KI optimiert",
              text: "Ein Hemd mit lockerer Passform aus 100 % europäischem Leinen, leicht genug für heisse Tage und elegant genug für eine Sommerhochzeit. Endet knapp unter der Hüfte. Fällt normal aus; für einen engeren Sitz eine Grösse kleiner wählen.",
            },
          },
        },
        {
          product: "content-creation",
          title: "Inhalte für die Frage „Was soll ich anziehen?“",
          body: "Viele Mode-Fragen drehen sich um Anlässe, Stile und Vergleiche, nicht um ein einzelnes Produkt. Beseam hilft Ihnen, Kategorieseiten, Stilratgeber und Vergleiche zu erstellen, die Ihr Sortiment in diese Antworten bringen.",
          points: [
            "Kategorieseiten für Anlässe wie Hochzeiten oder das Büro",
            "Stilratgeber, etwa was man im Smart-Casual-Büro trägt",
            "Ratgeber zu Passform und Stoffen, etwa Leinen oder Baumwolle",
          ],
          visual: {
            kind: "pages",
            label: "Gefundene Content-Lücken",
            rows: [
              {
                type: "Kategorie",
                title: "Outfits für Hochzeitsgäste im Sommer",
                status: "Neue Seite",
              },
              {
                type: "Ratgeber",
                title: "Was trage ich im Smart-Casual-Büro?",
                status: "Entwurf bereit",
              },
              {
                type: "Vergleich",
                title: "Leinen- oder Baumwollhemden",
                status: "Neue Seite",
              },
            ],
          },
        },
        {
          product: "technical-performance",
          title: "Produktdaten, die die KI lesen und denen sie vertrauen kann",
          body: "Jedes Kleidungsstück gibt es in mehreren Farben und Grössen, da passieren bei Produktdaten schnell Fehler. Beseam prüft, ob strukturierte Daten, Preise und Lagerbestand mit Ihren Seiten übereinstimmen und ob KI-Crawler sie erreichen.",
          points: [
            "Strukturierte Daten für jede Farbe und Grösse",
            "Lagerbestand pro Variante, der zur Seite passt",
            "KI-Crawler zugelassen, Seiten laden schnell",
          ],
          visual: {
            kind: "checks",
            label: "Technische Prüfung",
            rows: [
              {
                label: "Strukturierte Produktdaten",
                ok: true,
                detail: "Vorhanden",
              },
              { label: "Farbvarianten", ok: false, detail: "Daten fehlen" },
              { label: "Zugriff für KI-Crawler", ok: true, detail: "Erlaubt" },
              {
                label: "Ladezeit der Produktseiten",
                ok: true,
                detail: "Schnell",
              },
            ],
          },
        },
      ],
    },
    checklist: {
      heading: "Was die KI von einem Mode-Onlineshop braucht",
      intro:
        "KI-Assistenten empfehlen Mode, die sie verstehen, vergleichen und der sie vertrauen können. Diese Details zählen am meisten, auf Ihren Produktseiten und darüber hinaus.",
      items: [
        {
          title: "Schnitt, Passform und Grössenberatung",
          body: "Schmale, normale oder lockere Passform, die Länge und ob das Teil klein, gross oder normal ausfällt.",
        },
        {
          title: "Stoff und Gewicht",
          body: "Die Materialien und wie sich der Stoff anfühlt und trägt: leichtes Leinen, schwere Baumwolle, Stretch-Denim.",
        },
        {
          title: "Anlass und Saison",
          body: "Wann man es trägt: Hochzeiten, Büro, Ferien oder der Arbeitsweg im Winter. Assistenten empfehlen Mode für Situationen.",
        },
        {
          title: "Farben und Varianten",
          body: "Klare Farbnamen und jede Farbe und Grösse als eigene Variante, nicht nur „in fünf Farben erhältlich“.",
        },
        {
          title: "Pflege und Nachhaltigkeit",
          body: "Pflegehinweise und allfällige Zertifizierungen oder recycelte Materialien, klar im Text genannt.",
        },
        {
          title: "Kategorieseiten für häufige Bedürfnisse",
          body: "Seiten für Anlässe, Stile und Passformen geben Assistenten einen klaren Überblick über Ihr Angebot.",
        },
        {
          title: "Stilratgeber und Vergleiche",
          body: "Inhalte dazu, was man trägt und wie man wählt, geben Assistenten einen Grund, Ihren Shop zu nennen.",
        },
        {
          title: "Korrekte Daten pro Variante",
          body: "Strukturierte Daten, Preise und Lagerbestand für jede Farbe und Grösse, passend zu dem, was Kundinnen und Kunden auf der Seite sehen.",
        },
      ],
    },
    benefitsHeading: "Was die KI braucht, um Ihre Mode zu empfehlen",
    benefits: [
      {
        title: "Schnitte, Passformen und Grössen",
        body: "Beschreiben Sie Schnitt, Passform und Grössen, damit Assistenten Kleidung Körpertypen und Vorlieben zuordnen können.",
        icon: Shirt,
      },
      {
        title: "Anlässe und Styling",
        body: "Verbinden Sie Produkte mit den Anlässen und Stilen, nach denen gefragt wird, von Hochzeiten bis ins Büro.",
        icon: Sparkles,
      },
      {
        title: "Farben und Materialien",
        body: "Machen Sie Farben, Stoffe und Pflegehinweise eindeutig, für jede Variante Ihres Sortiments.",
        icon: Palette,
      },
    ],
    mistakes: {
      heading: "Häufige Fehler, die Mode aus KI-Antworten fernhalten",
      items: [
        notKnowingMistake("Ihre Mode"),
        {
          title: "Stimmung statt Fakten",
          body: "„Mühelos stylish“ gibt einem Assistenten nichts in die Hand. Passform, Stoff, Länge und Anlass schon.",
        },
        {
          title: "Passform-Tipps nur in Bewertungen",
          body: "Wenn „eine Grösse kleiner wählen“ nur in Kundenbewertungen steht, übersehen Assistenten es womöglich. Schreiben Sie es in die Beschreibung.",
        },
        {
          title: "Keine Seiten für Anlässe",
          body: "Bei „Was ziehe ich an eine Sommerhochzeit an?“ greifen Assistenten auf Kategorieseiten und Ratgeber zurück. Ohne sie ist Ihr Sortiment nicht Teil der Antwort.",
        },
        {
          title: "Unklare Farbnamen",
          body: "„Sand“, „Stone“ und „Oat“ sagen allein wenig. Ergänzen Sie die klare Farbe, damit Assistenten die Anfrage zuordnen können.",
        },
        crawlerMistake,
      ],
    },
    stepsHeading: "So funktioniert Beseam für Mode-Onlineshops",
    steps: steps("Mode"),
    faqs: [
      {
        question:
          "Wie bringe ich KI-Assistenten dazu, meine Mode zu empfehlen?",
        answer:
          "Finden Sie zuerst heraus, bei welchen Mode-Fragen Sie erscheinen. Sorgen Sie dann dafür, dass Ihre Produktseiten Schnitt, Passform, Stoff und Anlass nennen, ergänzen Sie Inhalte für die Fragen, zu denen sich Ihre Kundschaft informiert, und halten Sie Ihre Produktdaten korrekt. Beseam deckt alle vier Punkte ab und zeigt, was Sie zuerst verbessern sollten.",
      },
      {
        question: "Welche Produktinformationen sind bei Mode am wichtigsten?",
        answer:
          "Schnitt und Passform, Grössenberatung, Stoff und Gewicht, Anlass und Saison, Farben und Pflege. Zusammen ermöglichen sie der KI, ein Kleidungsstück einer konkreten Anfrage zuzuordnen.",
      },
      {
        question: "Warum sind Anlässe für die KI-Suche wichtig?",
        answer:
          "Kundinnen und Kunden fragen die KI oft, was sie zu einem bestimmten Anlass tragen sollen. Produktseiten und Kategorien, die diese Anlässe nennen, werden von Assistenten leichter empfohlen.",
      },
      {
        question:
          "Welche Inhalte helfen Mode-Onlineshops, empfohlen zu werden?",
        answer:
          "Kategorieseiten für Anlässe und Stile, Stilratgeber, etwa was man im Büro trägt, und Vergleiche zu Stoffen oder Passformen. Auf solche Inhalte greifen KI-Assistenten zurück, wenn Kundinnen und Kunden um Rat fragen.",
      },
      {
        question:
          "Kann ich sehen, welche Marken die KI statt meiner empfiehlt?",
        answer: trackedCompetitorsAnswer,
      },
      {
        question:
          "Wie lange dauert es, bis meine Mode in KI-Antworten erscheint?",
        answer: timelineAnswer,
      },
      catalogueFaq,
      platformFaq,
    ],
    relatedProducts: ALL_PRODUCTS,
  },
  {
    slug: "beauty-cosmetics",
    name: "Beauty & Kosmetik",
    metaTitle: "KI-Suchoptimierung für Beauty-Onlineshops | Beseam",
    metaDescription:
      "Lassen Sie Ihre Beauty- und Hautpflegeprodukte von ChatGPT und anderen KI-Assistenten empfehlen. Mit KI-Sichtbarkeit, besseren Seiten und Technik.",
    headline: "Lassen Sie Ihre Beauty-Produkte von der KI empfehlen",
    intro:
      "Kundinnen und Kunden fragen die KI, welches Serum gegen fahle Haut hilft, welcher Sonnenschutz zu empfindlicher Haut passt oder welches Shampoo sulfatfrei ist. Beseam verfolgt, wo Ihre Produkte in diesen Antworten erscheinen, und optimiert Ihre Produktseiten, Inhalte und Technik, damit Assistenten sie empfehlen.",
    heroChat: {
      prompt: "Parfümfreie Feuchtigkeitscreme für empfindliche Haut?",
      reply:
        "Bei empfindlicher Haut unterstützt eine parfümfreie Feuchtigkeitscreme mit Ceramiden die Hautbarriere. Diese hier passt zu dem, was Sie suchen:",
      product: {
        name: "Calm Barrier Moisturiser",
        store: "ihrshop.com",
        price: "€24",
        // "A jar of cream with mint leaves on a white table" by Maria
        // Kovalets, unsplash.com/photos/Y89Qfa_H7-o (Unsplash licence).
        image: "/images/catalog/moisturiser.webp",
        facts: ["Parfümfrei", "Ceramide", "Empfindliche Haut"],
      },
      sticker: "Empfohlen von 3 von 4 Assistenten",
    },
    shopperQuestions: {
      heading: "Was Kundinnen und Kunden die KI zu Beauty fragen",
      items: [
        "Bestes Vitamin-C-Serum gegen fahle Haut",
        "Parfümfreie Feuchtigkeitscreme für empfindliche Haut",
        "Sulfatfreies Shampoo für lockiges Haar",
        "Mineralischer Sonnenschutz ohne Weissschleier",
        "Vegane, tierversuchsfreie Mascara",
        "Retinol-Alternative für Einsteiger",
      ],
    },
    pillars: {
      heading: "Alles, damit die KI Ihre Beauty-Produkte empfiehlt",
      intro:
        "Gute Produktseiten sind nur ein Teil davon. Beseam deckt die vier Dinge ab, die entscheiden, ob KI-Assistenten Ihre Produkte empfehlen oder die eines anderen.",
      items: [
        {
          product: "ai-visibility-tracking",
          title: "Sehen Sie, bei welchen Beauty-Fragen Sie erscheinen",
          body: "Beseam stellt KI-Assistenten die Fragen Ihrer Kundschaft, von Seren gegen fahle Haut bis zu sulfatfreiem Shampoo, und zeigt, wo Ihre Produkte empfohlen werden und wer stattdessen erscheint.",
          points: TRACKING_POINTS,
          visual: {
            kind: "visibility",
            label: "KI-Sichtbarkeit · Beauty-Fragen",
            rows: [
              { prompt: "Vitamin-C-Serum gegen fahle Haut", recommended: true },
              { prompt: "Mineralischer Sonnenschutz", recommended: false },
              { prompt: "Sulfatfreies Shampoo für Locken", recommended: true },
              {
                prompt: "Retinol-Alternative für Einsteiger",
                recommended: false,
              },
            ],
          },
        },
        {
          product: "product-descriptions",
          title:
            "Produktseiten, die Fragen zu Inhaltsstoffen und Hauttypen beantworten",
          body: "Beauty-Kundinnen und -Kunden fragen, was in einem Produkt steckt, was es bewirkt und ob es zu ihnen passt. Beseam überarbeitet Beschreibungen und ergänzt fehlende Produktdaten, damit Assistenten jedes Produkt einem konkreten Bedürfnis zuordnen können.",
          points: [
            "Wichtige Inhaltsstoffe und ihre Wirkung",
            "Hauttypen, Haartypen und Anliegen",
            "Anwendung und wovon es frei ist",
          ],
          visual: {
            kind: "description",
            before: {
              label: "Vorher",
              text: "Unser legendäres Glow-Serum. Ein kleines Fläschchen Magie für strahlende, gesund aussehende Haut. Sie werden es lieben!",
            },
            after: {
              label: "Für KI optimiert",
              text: "Ein Serum mit 15 % Vitamin C und Hyaluronsäure für fahle, ungleichmässige Haut. Leicht und parfümfrei, für normale bis Mischhaut. Morgens vor dem Sonnenschutz auftragen.",
            },
          },
        },
        {
          product: "content-creation",
          title: "Inhalte für die Frage „Was soll ich verwenden?“",
          body: "Viele Beauty-Fragen drehen sich um Routinen, Inhaltsstoffe und Vergleiche. Beseam hilft Ihnen, Kategorieseiten, Routine-Ratgeber und Erklärungen zu Inhaltsstoffen zu erstellen, die Ihr Sortiment in diese Antworten bringen.",
          points: [
            "Kategorieseiten nach Hauttyp oder Anliegen",
            "Routine-Ratgeber, etwa eine Morgenroutine für trockene Haut",
            "Erklärungen und Vergleiche zu Inhaltsstoffen",
          ],
          visual: {
            kind: "pages",
            label: "Gefundene Content-Lücken",
            rows: [
              {
                type: "Kategorie",
                title: "Hautpflege für empfindliche Haut",
                status: "Neue Seite",
              },
              {
                type: "Ratgeber",
                title: "Morgenroutine für trockene Haut",
                status: "Entwurf bereit",
              },
              {
                type: "Vergleich",
                title: "Mineralischer oder chemischer Sonnenschutz",
                status: "Neue Seite",
              },
            ],
          },
        },
        {
          product: "technical-performance",
          title: "Produktdaten, die die KI lesen und denen sie vertrauen kann",
          body: "Farbtöne, Grössen und Nachfüllpackungen vervielfachen Ihre Varianten, und Inhaltsstofflisten stecken oft in Bildern. Beseam prüft, ob strukturierte Daten, Preise und Lagerbestand mit Ihren Seiten übereinstimmen und ob KI-Crawler sie erreichen.",
          points: [
            "Strukturierte Daten für jeden Farbton und jede Grösse",
            "Inhaltsstofflisten als Text, nicht als Bild",
            "KI-Crawler zugelassen, Seiten laden schnell",
          ],
          visual: {
            kind: "checks",
            label: "Technische Prüfung",
            rows: [
              {
                label: "Strukturierte Produktdaten",
                ok: true,
                detail: "Vorhanden",
              },
              {
                label: "Inhaltsstofflisten",
                ok: false,
                detail: "Nur als Bild",
              },
              { label: "Zugriff für KI-Crawler", ok: true, detail: "Erlaubt" },
              {
                label: "Ladezeit der Produktseiten",
                ok: true,
                detail: "Schnell",
              },
            ],
          },
        },
      ],
    },
    checklist: {
      heading: "Was die KI von einem Beauty-Onlineshop braucht",
      intro:
        "KI-Assistenten empfehlen Beauty-Produkte, die sie verstehen, vergleichen und denen sie vertrauen können. Diese Details zählen am meisten, auf Ihren Produktseiten und darüber hinaus.",
      items: [
        {
          title: "Wichtige Inhaltsstoffe",
          body: "Die Wirkstoffe, wo relevant ihre Konzentration, und was jeder davon bewirkt.",
        },
        {
          title: "Haut- und Haartypen",
          body: "Für wen das Produkt passt: trockene, fettige, empfindliche oder Mischhaut, lockiges, feines oder gefärbtes Haar.",
        },
        {
          title: "Anliegen, die es angeht",
          body: "Fahle Haut, Rötungen, Frizz oder Trockenheit. Kundinnen und Kunden fragen die KI nach Anliegen, nicht nach Produktnamen.",
        },
        {
          title: "Frei von und Zertifizierungen",
          body: "Parfümfrei, vegan, tierversuchsfrei oder sulfatfrei, klar im Text genannt.",
        },
        {
          title: "Anwendung",
          body: "Wann und wie man es aufträgt und womit man es kombiniert, damit Assistenten es in eine Routine einordnen können.",
        },
        {
          title: "Kategorieseiten nach Anliegen",
          body: "Seiten nach Hauttyp oder Anliegen geben Assistenten einen klaren Überblick über Ihr Angebot.",
        },
        {
          title: "Routinen und Ratgeber zu Inhaltsstoffen",
          body: "Inhalte zu Routinen und Inhaltsstoffen geben Assistenten einen Grund, Ihren Shop zu nennen.",
        },
        {
          title: "Korrekte Daten pro Variante",
          body: "Strukturierte Daten, Preise und Lagerbestand für jeden Farbton und jede Grösse, passend zu dem, was Kundinnen und Kunden auf der Seite sehen.",
        },
      ],
    },
    benefitsHeading: "Was die KI braucht, um Ihre Beauty-Produkte zu empfehlen",
    benefits: [
      {
        title: "Inhaltsstoffe klar beschrieben",
        body: "Nennen Sie die wichtigen Inhaltsstoffe und ihre Wirkung, die Details, nach denen Beauty-Kundschaft die KI zuerst fragt.",
        icon: FlaskConical,
      },
      {
        title: "Passend zu Haut- und Haartypen",
        body: "Verbinden Sie jedes Produkt mit den Haut- und Haartypen und Anliegen, für die es gemacht ist.",
        icon: Droplet,
      },
      {
        title: "Klare, einheitliche Angaben",
        body: "Halten Sie Produktversprechen, Zertifizierungen und Anwendungshinweise in Ihrem ganzen Shop klar und einheitlich.",
        icon: BadgeCheck,
      },
    ],
    mistakes: {
      heading:
        "Häufige Fehler, die Beauty-Produkte aus KI-Antworten fernhalten",
      items: [
        notKnowingMistake("Ihre Produkte"),
        {
          title: "Hype statt Fakten",
          body: "„Ein kleines Fläschchen Magie“ gibt einem Assistenten nichts in die Hand. Inhaltsstoffe, Hauttypen und Anliegen schon.",
        },
        {
          title: "Inhaltsstofflisten als Bild",
          body: "Inhaltsstofflisten auf Produktfotos sind für die KI schwer zu lesen. Schreiben Sie sie in den Text und in Ihre Produktdaten.",
        },
        {
          title: "Kein Hauttyp und kein Anliegen genannt",
          body: "Wenn auf Ihrer Seite nicht steht, dass ein Produkt zu empfindlicher Haut passt, empfehlen Assistenten es nicht, wenn danach gefragt wird.",
        },
        {
          title: "Keine Routinen oder Ratgeber",
          body: "Bei „Welche Routine passt zu trockener Haut?“ greifen Assistenten auf Ratgeber zurück. Ohne sie ist Ihr Shop nicht Teil der Antwort.",
        },
        crawlerMistake,
      ],
    },
    stepsHeading: "So funktioniert Beseam für Beauty-Onlineshops",
    steps: steps("Beauty"),
    faqs: [
      {
        question:
          "Wie bringe ich ChatGPT dazu, meine Beauty-Produkte zu empfehlen?",
        answer:
          "Finden Sie zuerst heraus, bei welchen Beauty-Fragen Sie erscheinen. Sorgen Sie dann dafür, dass Ihre Produktseiten wichtige Inhaltsstoffe, Haut- oder Haartypen und Anliegen nennen, ergänzen Sie Inhalte für die Fragen, zu denen sich Ihre Kundschaft informiert, und halten Sie Ihre Produktdaten korrekt. Beseam deckt alle vier Punkte ab und zeigt, was Sie zuerst verbessern sollten.",
      },
      {
        question: "Warum sind Inhaltsstoffe für die KI-Suche wichtig?",
        answer:
          "Beauty-Kundinnen und -Kunden fragen oft nach bestimmten Inhaltsstoffen oder danach, was sie meiden sollen. Produktseiten, die Inhaltsstoffe klar nennen, ermöglichen es KI-Assistenten, Ihre Produkte diesen Fragen zuzuordnen.",
      },
      {
        question:
          "Welche Inhalte helfen Beauty-Onlineshops, empfohlen zu werden?",
        answer:
          "Kategorieseiten nach Hauttyp oder Anliegen, Routine-Ratgeber und Erklärungen zu Inhaltsstoffen. Auf solche Inhalte greifen KI-Assistenten zurück, wenn Kundinnen und Kunden um Rat fragen.",
      },
      {
        question: "Ändert Beseam meine Produktversprechen?",
        answer:
          "Nicht ohne Ihre Freigabe. Jede vorgeschlagene Änderung wartet auf Sie, ausser Sie automatisieren diese Art von Änderung. So behalten Sie die Kontrolle über Versprechen und Formulierungen. Alle Änderungen bleiben rückgängig machbar.",
      },
      {
        question:
          "Kann ich sehen, welche Marken die KI statt meiner empfiehlt?",
        answer: trackedCompetitorsAnswer,
      },
      {
        question:
          "Wie lange dauert es, bis meine Produkte in KI-Antworten erscheinen?",
        answer: timelineAnswer,
      },
      catalogueFaq,
      platformFaq,
    ],
    relatedProducts: ALL_PRODUCTS,
  },
  {
    slug: "consumer-electronics",
    name: "Unterhaltungselektronik",
    metaTitle: "KI-Suchoptimierung für Elektronik-Onlineshops | Beseam",
    metaDescription:
      "Lassen Sie Ihre Elektronik von ChatGPT, Gemini und anderen KI-Assistenten empfehlen. Verfolgen Sie Ihre Sichtbarkeit und optimieren Sie Daten und Technik.",
    headline:
      "Lassen Sie Ihre Elektronik empfehlen, wenn Kundinnen und Kunden die KI fragen",
    intro:
      "Kundinnen und Kunden fragen die KI, welche Noise-Cancelling-Kopfhörer am längsten durchhalten, welcher Laptop Bildbearbeitung schafft oder welches Ladegerät zu ihrem Telefon passt. Beseam verfolgt, wo Ihre Produkte in diesen Antworten erscheinen, und optimiert Ihre Produktseiten, Inhalte und Technik, damit Assistenten sie richtig vergleichen.",
    heroChat: {
      prompt: "Noise-Cancelling-Kopfhörer mit der längsten Akkulaufzeit?",
      reply:
        "Wenn Ihnen die Akkulaufzeit am wichtigsten ist, achten Sie auf 40 Stunden oder mehr mit eingeschaltetem Noise Cancelling. Dieses Paar ist eine starke Wahl:",
      product: {
        name: "Studio ANC Headphones",
        store: "ihrshop.com",
        price: "€229",
        // "Black and brown wireless headphones" by Blaz Erzetic,
        // unsplash.com/photos/tqAmHGbIPdM (Unsplash licence).
        image: "/images/catalog/headphones.webp",
        facts: ["50 h Akku", "Noise Cancelling", "USB-C"],
      },
      sticker: "Empfohlen von 3 von 4 Assistenten",
    },
    shopperQuestions: {
      heading: "Was Kundinnen und Kunden die KI zu Elektronik fragen",
      items: [
        "Noise-Cancelling-Kopfhörer mit der längsten Akkulaufzeit",
        "Laptop unter 1000 € für Bildbearbeitung",
        "USB-C-Ladegerät, das mit meinem Telefon funktioniert",
        "Smartwatch, die mit Android kompatibel ist",
        "Beste günstige Lautsprecher für einen kleinen Raum",
        "Saugroboter für Tierhaare",
      ],
    },
    pillars: {
      heading: "Alles, damit die KI Ihre Elektronik empfiehlt",
      intro:
        "Gute Produktseiten sind nur ein Teil davon. Beseam deckt die vier Dinge ab, die entscheiden, ob KI-Assistenten Ihre Produkte empfehlen oder die eines anderen.",
      items: [
        {
          product: "ai-visibility-tracking",
          title: "Sehen Sie, bei welchen Elektronik-Fragen Sie erscheinen",
          body: "Beseam stellt KI-Assistenten die Fragen Ihrer Kundschaft, von Kopfhörern mit der längsten Akkulaufzeit bis zu Ladegeräten für ein bestimmtes Telefon, und zeigt, wo Ihre Produkte empfohlen werden und wer stattdessen erscheint.",
          points: [
            "Verfolgt pro Frage, Produkt und Assistent",
            "Sehen Sie, welche Marken und Shops stattdessen empfohlen werden",
            "Verknüpft mit Traffic und Umsatz aus KI-Assistenten",
          ],
          visual: {
            kind: "visibility",
            label: "KI-Sichtbarkeit · Elektronik-Fragen",
            rows: [
              { prompt: "Kopfhörer mit längstem Akku", recommended: true },
              { prompt: "Laptop für Bildbearbeitung", recommended: false },
              { prompt: "Smartwatch für Android", recommended: true },
              { prompt: "Saugroboter für Tierhaare", recommended: false },
            ],
          },
        },
        {
          product: "product-descriptions",
          title:
            "Produktseiten, die Fragen zu technischen Daten und Kompatibilität beantworten",
          body: "Wer Elektronik kauft, vergleicht nach Fakten: Akkulaufzeit, Kompatibilität, Abmessungen. Beseam überarbeitet Beschreibungen und ergänzt fehlende technische Daten, damit Assistenten Ihre Produkte richtig vergleichen.",
          points: [
            "Vollständige, einheitliche technische Daten",
            "Kompatibilität mit Geräten und Systemen",
            "Lieferumfang und für wen es gedacht ist",
          ],
          visual: {
            kind: "description",
            before: {
              label: "Vorher",
              text: "Erleben Sie Sound wie nie zuvor. Premium-Audio, ganztägiger Komfort und modernste Technologie.",
            },
            after: {
              label: "Für KI optimiert",
              text: "Over-Ear-Kopfhörer mit aktivem Noise Cancelling und bis zu 50 Stunden Akkulaufzeit mit eingeschaltetem ANC. Bluetooth 5.3, Multipoint-Verbindung mit iOS und Android, USB-C-Schnellladen: 10 Minuten reichen für 5 Stunden.",
            },
          },
        },
        {
          product: "content-creation",
          title: "Inhalte für die Frage „Welches soll ich kaufen?“",
          body: "Wer Elektronik kauft, informiert sich vorher und bittet die KI um Vergleiche. Beseam hilft Ihnen, Vergleiche, Kaufratgeber und Kategorieseiten zu erstellen, die Ihr Sortiment in diese Antworten bringen.",
          points: [
            "Vergleiche zwischen Modellen und Kategorien",
            "Kaufratgeber, etwa zur Wahl eines Laptops für Bildbearbeitung",
            "Kategorieseiten für Bedürfnisse wie Reisen oder Gaming",
          ],
          visual: {
            kind: "pages",
            label: "Gefundene Content-Lücken",
            rows: [
              {
                type: "Vergleich",
                title: "Over-Ear oder In-Ear mit Noise Cancelling",
                status: "Neue Seite",
              },
              {
                type: "Ratgeber",
                title: "So wählen Sie einen Laptop für Bildbearbeitung",
                status: "Entwurf bereit",
              },
              {
                type: "Kategorie",
                title: "Kopfhörer für unterwegs",
                status: "Neue Seite",
              },
            ],
          },
        },
        {
          product: "technical-performance",
          title: "Preise, Lager und technische Daten, denen die KI vertraut",
          body: "Preise und Lagerbestände ändern sich bei Elektronik oft, und Assistenten vergleichen sie über Shops hinweg. Beseam prüft, ob strukturierte Daten, Preise und Verfügbarkeit mit Ihren Seiten übereinstimmen und ob KI-Crawler sie erreichen.",
          points: [
            "Preise und Lager, die zur Seite passen",
            "Strukturierte Daten mit Kennungen wie der GTIN",
            "KI-Crawler zugelassen, Seiten laden schnell",
          ],
          visual: {
            kind: "checks",
            label: "Technische Prüfung",
            rows: [
              {
                label: "Strukturierte Produktdaten",
                ok: true,
                detail: "Vorhanden",
              },
              {
                label: "Preis in den Produktdaten",
                ok: false,
                detail: "Veraltet",
              },
              { label: "Zugriff für KI-Crawler", ok: true, detail: "Erlaubt" },
              {
                label: "Ladezeit der Produktseiten",
                ok: true,
                detail: "Schnell",
              },
            ],
          },
        },
      ],
    },
    checklist: {
      heading: "Was die KI von einem Elektronik-Onlineshop braucht",
      intro:
        "KI-Assistenten empfehlen Elektronik, die sie vergleichen und der sie vertrauen können. Diese Details zählen am meisten, auf Ihren Produktseiten und darüber hinaus.",
      items: [
        {
          title: "Vollständige technische Daten",
          body: "Die Werte, nach denen verglichen wird, wie Akkulaufzeit, Bildschirmgrösse, Speicher oder Leistung, im Text und in den Produktdaten.",
        },
        {
          title: "Kompatibilität",
          body: "Mit welchen Geräten, Betriebssystemen, Anschlüssen und Zubehörteilen das Produkt funktioniert.",
        },
        {
          title: "Einsatzzweck",
          body: "Für wen und wofür es gedacht ist: Reisen, Gaming, Homeoffice oder Bildbearbeitung. Assistenten empfehlen Produkte für Situationen.",
        },
        {
          title: "Produktkennungen",
          body: "Marke, Modellnummer und GTIN, damit Assistenten das genaue Produkt erkennen und vergleichen können.",
        },
        {
          title: "Lieferumfang und Garantie",
          body: "Mitgeliefertes Zubehör, Garantie und Rückgabebedingungen, klar auf der Seite genannt.",
        },
        {
          title: "Vergleiche und Kaufratgeber",
          body: "Inhalte, die Modelle vergleichen und Entscheidungen erklären, geben Assistenten einen Grund, Ihren Shop zu nennen.",
        },
        {
          title: "Kategorieseiten für Bedürfnisse",
          body: "Seiten für Bedürfnisse wie Reisekopfhörer oder günstige Laptops geben Assistenten einen klaren Überblick.",
        },
        {
          title: "Korrekte Preise und Lagerbestände",
          body: "Strukturierte Daten, Preise und Verfügbarkeit, die zu dem passen, was Kundinnen und Kunden sehen, und bei Änderungen aktualisiert werden.",
        },
      ],
    },
    benefitsHeading: "Was die KI braucht, um Ihre Elektronik zu empfehlen",
    benefits: [
      {
        title: "Korrekte technische Daten",
        body: "Halten Sie technische Daten vollständig und einheitlich, damit Assistenten Ihre Produkte anhand der richtigen Fakten vergleichen.",
        icon: Cpu,
      },
      {
        title: "Kompatibilität klar benannt",
        body: "Machen Sie klar, mit welchen Geräten, Systemen und Zubehörteilen jedes Produkt funktioniert.",
        icon: Plug,
      },
      {
        title: "Preise und Lager synchron",
        body: "Sorgen Sie dafür, dass Preise und Verfügbarkeit auf Ihren Seiten mit Ihren Produktdaten übereinstimmen.",
        icon: RefreshCw,
      },
    ],
    mistakes: {
      heading: "Häufige Fehler, die Elektronik aus KI-Antworten fernhalten",
      items: [
        notKnowingMistake("Ihre Produkte"),
        {
          title: "Slogans statt technischer Daten",
          body: "„Sound wie nie zuvor“ gibt einem Assistenten nichts zum Vergleichen. Akkulaufzeit, Kompatibilität und Abmessungen schon.",
        },
        {
          title: "Technische Daten nur im PDF oder Bild",
          body: "Datenblätter als PDF oder Bild sind für die KI schwer zu lesen. Schreiben Sie die wichtigsten Werte in den Text und in die Produktdaten.",
        },
        {
          title: "Kompatibilität nicht erwähnt",
          body: "Wenn auf Ihrer Seite nicht steht, dass ein Ladegerät mit einem bestimmten Telefon funktioniert, empfehlen Assistenten es für diese Frage nicht.",
        },
        {
          title: "Veraltete Preise in den Produktdaten",
          body: "Wenn strukturierte Daten und Seite bei Preis oder Lager nicht übereinstimmen, überspringen Assistenten Ihre Produkte womöglich.",
        },
        crawlerMistake,
      ],
    },
    stepsHeading: "So funktioniert Beseam für Elektronik-Onlineshops",
    steps: steps("Elektronik"),
    faqs: [
      {
        question:
          "Wie bringe ich KI-Assistenten dazu, meine Elektronik zu empfehlen?",
        answer:
          "Finden Sie zuerst heraus, bei welchen Elektronik-Fragen Sie erscheinen. Sorgen Sie dann dafür, dass Ihre Produktseiten technische Daten, Kompatibilität und Einsatzzweck nennen, ergänzen Sie Vergleiche und Kaufratgeber, und halten Sie Preise und Lager korrekt. Beseam deckt alle vier Punkte ab und zeigt, was Sie zuerst verbessern sollten.",
      },
      {
        question: "Warum sind technische Daten für die KI-Suche so wichtig?",
        answer:
          "Wer Elektronik kauft, bittet die KI, Produkte anhand konkreter Fakten wie Akkulaufzeit oder Kompatibilität zu vergleichen. Fehlen diese Fakten oder widersprechen sie sich, empfehlen Assistenten eher einen Mitbewerber.",
      },
      {
        question:
          "Welche Inhalte helfen Elektronik-Onlineshops, empfohlen zu werden?",
        answer:
          "Vergleiche zwischen Modellen, Kaufratgeber, die Entscheidungen erklären, und Kategorieseiten für bestimmte Bedürfnisse. Auf solche Inhalte greifen KI-Assistenten zurück, wenn Kundinnen und Kunden fragen, welches Produkt sie kaufen sollen.",
      },
      {
        question:
          "Warum sind Preise und Lagerbestand für die KI-Suche wichtig?",
        answer:
          "Assistenten vergleichen Produkte über Shops hinweg und vermeiden Empfehlungen für Artikel, die nicht verfügbar oder falsch ausgepreist wirken. Strukturierte Daten, die mit Ihren Seiten übereinstimmen, helfen ihnen, Ihrem Shop zu vertrauen.",
      },
      {
        question: "Kann ich sehen, welche Shops die KI statt meinem empfiehlt?",
        answer: trackedCompetitorsAnswer,
      },
      {
        question:
          "Wie lange dauert es, bis meine Produkte in KI-Antworten erscheinen?",
        answer: timelineAnswer,
      },
      catalogueFaq,
      platformFaq,
    ],
    relatedProducts: ALL_PRODUCTS,
  },
  {
    slug: "shopify",
    name: "Beseam für Shopify",
    metaTitle: "KI-Suchoptimierung für Shopify-Shops | Beseam",
    metaDescription:
      "Verbinden Sie Ihren Shopify-Shop mit einem Klick. Verfolgen Sie Ihre KI-Sichtbarkeit und optimieren Sie Seiten und Technik, damit ChatGPT Sie empfiehlt.",
    headline: "KI-Suchoptimierung, gemacht für Shopify",
    intro:
      "Verbinden Sie Ihren Shopify-Shop mit einem Klick. Beseam importiert Ihren Katalog, ohne Ihren Theme-Code anzufassen, verfolgt, wie KI-Assistenten über Ihre Produkte sprechen, und optimiert Ihre Produktseiten, Inhalte und Technik, beginnend mit den Änderungen, die am meisten Umsatz bringen können.",
    heroChat: {
      prompt: "Leichte Jacke für den Frühling?",
      reply:
        "Für den Frühling eignet sich ein leichter Blouson, der einen Schauer abhält und über einen Pullover passt. Dieser hier passt gut:",
      product: {
        name: "Lightweight Bomber Jacket",
        store: "ihrshop.myshopify.com",
        price: "€119",
        // "Brown bomber jacket on hanger" by Tobias Tullius,
        // unsplash.com/photos/Fg15LdqpWrs (Unsplash licence).
        image: "/images/catalog/bomber-jacket.webp",
        facts: ["Wasserabweisend", "Leicht", "Normale Passform"],
      },
      sticker: "Empfohlen von 3 von 4 Assistenten",
    },
    pillars: {
      heading:
        "Alles, was Ihr Shopify-Shop braucht, um von der KI empfohlen zu werden",
      intro:
        "Beseam deckt die vier Dinge ab, die entscheiden, ob KI-Assistenten Ihre Produkte empfehlen, alles über eine einzige Verbindung zu Ihrem Shopify-Shop.",
      items: [
        {
          product: "ai-visibility-tracking",
          title: "Sehen Sie, bei welchen Fragen Ihr Shop erscheint",
          body: "Beseam erstellt die Fragen Ihrer Kundschaft aus Ihrem Shopify-Katalog, stellt sie verschiedenen KI-Assistenten und zeigt, wo Ihre Produkte empfohlen werden und wer stattdessen erscheint.",
          points: [
            "Fragen aus Ihrem eigenen Katalog",
            "Verfolgt pro Frage, Produkt und Assistent",
            "Verknüpft mit Traffic und Umsatz aus KI-Assistenten",
          ],
          visual: {
            kind: "visibility",
            label: "KI-Sichtbarkeit · Ihr Katalog",
            rows: [
              { prompt: "Leichte Jacke für den Frühling", recommended: true },
              {
                prompt: "Wasserdichte Stiefel für den Arbeitsweg",
                recommended: false,
              },
              { prompt: "Kleine Jacke für die Reise", recommended: true },
              { prompt: "Warme Velohandschuhe", recommended: false },
            ],
          },
        },
        {
          product: "product-descriptions",
          title: "Bessere Produktseiten, direkt in Shopify veröffentlicht",
          body: "Beseam liest jedes Produkt und jede Variante in Ihrem Shop, überarbeitet Beschreibungen und ergänzt fehlende Produktdaten. Geben Sie die Änderungen frei, und sie werden in Ihrem Shop veröffentlicht, oder automatisieren Sie die Änderungen, denen Sie vertrauen.",
          points: [
            "Jedes Produkt und jede Variante Ihres Katalogs",
            "Sortiert nach erwarteter Umsatzwirkung",
            "Mit wenigen Klicks freigegeben, jederzeit rückgängig machbar",
          ],
          visual: {
            kind: "description",
            before: {
              label: "Vorher",
              text: "Unsere Lieblings-Regenjacke. Stylish trocken bleiben, wohin der Tag Sie auch führt!",
            },
            after: {
              label: "Für KI optimiert",
              text: "Eine leichte, vollständig wasserdichte Jacke mit verschweissten Nähten und reflektierenden Details, gemacht für den Veloweg zur Arbeit. Lässt sich in die eigene Tasche verstauen. Normale Passform mit Platz für eine Schicht darunter.",
            },
          },
        },
        {
          product: "content-creation",
          title: "Kategorieseiten, Ratgeber und Vergleiche",
          body: "Assistenten greifen auf Seiten zurück, die erklären und vergleichen. Beseam hilft Ihnen, Kategorieseiten, Blogartikel und Kaufratgeber in Ihrem Shop zu erstellen und zu verbessern, rund um Ihre eigenen Produkte.",
          points: [
            "Kategorieseiten, die Ihr Sortiment erklären",
            "Kaufratgeber und Vergleiche für Ihren Blog",
            "Entwürfe, die Sie prüfen, bevor etwas live geht",
          ],
          visual: {
            kind: "pages",
            label: "Gefundene Content-Lücken",
            rows: [
              {
                type: "Kategorie",
                title: "Regenkleidung fürs Velo",
                status: "Verbessern",
              },
              {
                type: "Ratgeber",
                title: "So wählen Sie eine Regenjacke",
                status: "Entwurf bereit",
              },
              {
                type: "Vergleich",
                title: "Wasserdicht oder wasserabweisend",
                status: "Neue Seite",
              },
            ],
          },
        },
        {
          product: "technical-performance",
          title:
            "Ein Shopify-Shop, den die KI lesen und dem sie vertrauen kann",
          body: "Themes und Apps können strukturierte Daten unvollständig oder doppelt ausgeben. Beseam prüft, ob Produktdaten, Preise und Lagerbestand mit Ihren Seiten übereinstimmen und ob KI-Crawler sie erreichen.",
          points: [
            "Strukturierte Daten aus Theme und Apps",
            "Preise und Lager pro Variante",
            "Zugriff für KI-Crawler und Ladezeit",
          ],
          visual: {
            kind: "checks",
            label: "Technische Prüfung",
            rows: [
              {
                label: "Strukturierte Produktdaten",
                ok: false,
                detail: "Doppelt",
              },
              {
                label: "Preise und Lager pro Variante",
                ok: true,
                detail: "Synchron",
              },
              { label: "Zugriff für KI-Crawler", ok: true, detail: "Erlaubt" },
              {
                label: "Ladezeit der Produktseiten",
                ok: true,
                detail: "Schnell",
              },
            ],
          },
        },
      ],
    },
    checklist: {
      heading: "Was die KI von einem Shopify-Shop braucht",
      intro:
        "KI-Assistenten empfehlen Produkte, die sie verstehen, vergleichen und denen sie vertrauen können. Diese Details zählen in einem Shopify-Shop am meisten.",
      items: [
        {
          title: "Konkrete Produktbeschreibungen",
          body: "Einsatzzweck, Passform, Material und technische Daten in der Beschreibung, nicht nur ein Slogan und ein Foto.",
        },
        {
          title: "Vollständige Produktdaten",
          body: "Produkttyp, Hersteller, Optionen und Attribute für jedes Produkt ausgefüllt, nicht leer gelassen.",
        },
        {
          title: "Klare Varianten",
          body: "Jede Grösse und Farbe als eigene Variante mit klarem Namen, Preis und Lagerbestand.",
        },
        {
          title: "Kategorieseiten mit Kontext",
          body: "Kategorien mit einer kurzen Beschreibung, was darin ist und für wen, nicht nur ein Produktraster.",
        },
        {
          title: "Ratgeber und Vergleiche",
          body: "Blogartikel und Ratgeber, die Kauffragen beantworten, geben Assistenten einen Grund, Ihren Shop zu nennen.",
        },
        {
          title: "Saubere strukturierte Daten",
          body: "Ein vollständiger Satz strukturierter Produktdaten, ohne Konflikte zwischen Theme und Apps.",
        },
        {
          title: "Offen für KI-Crawler",
          body: "Einstellungen in robots.txt und Bot-Schutz, die KI-Crawler Ihre Produkte und Kategorien erreichen lassen.",
        },
        {
          title: "Schnelle Produktseiten",
          body: "Seiten, die schnell und vollständig laden, auch mit mehreren installierten Apps.",
        },
      ],
    },
    benefitsHeading: "Gemacht für Shopify-Shops",
    showBenefits: true,
    benefits: [
      {
        title: "Verbindung mit einem Klick",
        body: "Verbinden Sie Ihren Shopify-Shop mit einem Klick. Keine Entwickler, keine Theme-Änderungen.",
        icon: Plug,
      },
      {
        title: "Ihr ganzer Katalog",
        body: "Beseam liest jedes Produkt und jede Variante in Ihrem Shop, egal wie gross der Katalog ist.",
        icon: Package,
      },
      {
        title: "Änderungen, die Sie freigeben",
        body: "Geben Sie vorgeschlagene Änderungen mit wenigen Klicks frei, oder automatisieren Sie die, denen Sie vertrauen. Alle Änderungen bleiben rückgängig machbar.",
        icon: CheckCircle2,
      },
    ],
    mistakes: {
      heading: "Häufige Fehler, die Shopify-Shops aus KI-Antworten fernhalten",
      items: [
        notKnowingMistake("Ihre Produkte"),
        {
          title: "Lieferantenbeschreibungen unverändert übernommen",
          body: "Von Lieferanten kopierte Beschreibungen gleichen denen hunderter anderer Shops und beantworten selten die Fragen Ihrer Kundschaft.",
        },
        {
          title: "Leere Kategorieseiten",
          body: "Eine Kategorie mit nur einem Produktraster sagt Assistenten wenig. Eine kurze, konkrete Beschreibung hilft ihnen, sie zu verstehen.",
        },
        {
          title: "Widersprüchliche strukturierte Daten",
          body: "Wenn Theme und App beide Produktdaten ausgeben, erhalten Assistenten womöglich widersprüchliche Preise oder Lagerbestände.",
        },
        {
          title: "Zu viele Apps bremsen die Seiten",
          body: "Jede App fügt Skripte hinzu. Langsame oder unvollständige Seiten sind für Crawler schwerer zu lesen.",
        },
        crawlerMistake,
      ],
    },
    stepsHeading: "So funktioniert Beseam mit Shopify",
    steps: [
      {
        title: "Shopify verbinden",
        body: "Verbinden Sie Ihren Shop mit einem Klick. Beseam importiert Ihren Katalog, ohne Ihren Theme-Code anzufassen.",
      },
      {
        title: "KI-Sichtbarkeit verfolgen",
        body: "Sehen Sie, wie ChatGPT, Claude, Gemini und andere Assistenten die Fragen Ihrer Kundschaft beantworten.",
      },
      {
        title: "Optimieren und messen",
        body: "Geben Sie die vorgeschlagenen Änderungen frei oder automatisieren Sie sie, und verfolgen Sie, wie Ihr KI-Traffic und Ihr Umsatz wachsen.",
      },
    ],
    faqs: [
      {
        question: "Funktioniert Beseam mit Shopify?",
        answer:
          "Ja. Beseam verbindet sich mit einem Klick mit Shopify und importiert Ihren Katalog, ohne Ihren Theme-Code anzufassen.",
      },
      {
        question:
          "Wie bringe ich ChatGPT dazu, meine Shopify-Produkte zu empfehlen?",
        answer:
          "Finden Sie zuerst heraus, bei welchen Fragen Ihr Shop erscheint. Machen Sie dann Ihre Produktbeschreibungen konkret, ergänzen Sie Kategorieseiten und Ratgeber für die Fragen, zu denen sich Ihre Kundschaft informiert, und halten Sie Ihre strukturierten Daten sauber. Beseam deckt alle vier Punkte ab und zeigt, was Sie zuerst verbessern sollten.",
      },
      {
        question: "Brauche ich Entwickler, um Beseam einzurichten?",
        answer:
          "Nein. Die Verbindung mit Shopify braucht einen Klick, den Rest erledigt Beseam.",
      },
      {
        question: "Ändert Beseam meinen Shopify-Shop ohne meine Freigabe?",
        answer:
          "Nein. Jede Änderung, die Kundinnen und Kunden sehen, wartet auf Ihre Freigabe, ausser Sie automatisieren diese Art von Änderung. Alle Änderungen bleiben rückgängig machbar.",
      },
      {
        question: "Welche KI-Assistenten verfolgt Beseam?",
        answer:
          "Beseam verfolgt ChatGPT, Claude, Gemini, Google AI Mode, Perplexity und Copilot, anhand der Fragen, die Ihre Kundinnen und Kunden zu Ihren Produkten stellen.",
      },
      {
        question: "Können Shopify-Apps meine KI-Sichtbarkeit beeinflussen?",
        answer:
          "Ja. Apps können doppelte strukturierte Daten ausgeben, Seiten verlangsamen oder verändern, was Crawler sehen. Beseam prüft Ihren Shop so, wie er tatsächlich ausgeliefert wird, inklusive dessen, was Ihre Apps hinzufügen.",
      },
      {
        question:
          "Wie lange dauert es, bis meine Produkte in KI-Antworten erscheinen?",
        answer: timelineAnswer,
      },
      catalogueFaq,
    ],
    relatedProducts: ALL_PRODUCTS,
  },
];
