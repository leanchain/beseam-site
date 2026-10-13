import {
  BookOpen,
  Bot,
  Braces,
  Gauge,
  LayoutGrid,
  Layers,
  ListChecks,
  MessageSquareText,
  Package,
  Scale,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

import type { ProductPageData } from "@/lib/product-pages";

/** German product pages (Swiss spelling: ss, never ß; formal "Sie"). */
export const PRODUCT_PAGES_DE: readonly ProductPageData[] = [
  {
    slug: "ai-visibility-tracking",
    name: "KI-Sichtbarkeit verfolgen",
    metaTitle: "KI-Sichtbarkeit für Onlineshops verfolgen | Beseam",
    metaDescription:
      "Sehen Sie, wann ChatGPT, Claude, Gemini und andere KI-Assistenten Ihre Produkte empfehlen und wie KI-Sichtbarkeit zu Traffic und Umsatz wird.",
    headline: "Sehen Sie, wann KI Ihre Produkte empfiehlt",
    intro:
      "Beseam beobachtet die Antworten von ChatGPT, Claude, Gemini, Google AI Mode, Perplexity und Copilot auf die Fragen Ihrer Kundinnen und Kunden. Sehen Sie, wo Ihre Marke und Ihre Produkte genannt werden, wer stattdessen empfohlen wird und wie KI-Sichtbarkeit zu Traffic und Umsatz wird.",
    heroCard: {
      visual: {
        kind: "visibility",
        label: "Wasserdichte Stiefel für den Arbeitsweg",
        rows: [
          { prompt: "ChatGPT", recommended: true },
          { prompt: "Claude", recommended: true },
          { prompt: "Gemini", recommended: false },
          { prompt: "Google AI Mode", recommended: true },
          { prompt: "Perplexity", recommended: false },
          { prompt: "Copilot", recommended: true },
        ],
      },
      sticker: "Empfohlen von 4 von 6 Assistenten",
    },
    benefitsHeading: "Wissen Sie genau, wo Sie in der KI-Suche stehen",
    benefits: [
      {
        title: "Alle grossen KI-Assistenten",
        body: "Verfolgen Sie ChatGPT, Claude, Gemini, Google AI Mode, Perplexity und Copilot an einem Ort, für die Fragen, die Kundinnen und Kunden wirklich stellen.",
        icon: Bot,
      },
      {
        title: "Bis auf Produktebene",
        body: "Sehen Sie, welche Produkte empfohlen werden, welche fehlen und welche Mitbewerber an ihrer Stelle erscheinen.",
        icon: Package,
      },
      {
        title: "Mit Umsatz verknüpft",
        body: "Verbinden Sie KI-Sichtbarkeit mit Traffic und Umsatz aus KI-Assistenten, aufgeschlüsselt nach Thema, Frage, Produkt und Landingpage.",
        icon: TrendingUp,
      },
    ],
    stepsHeading: "So funktioniert das Verfolgen der KI-Sichtbarkeit",
    steps: [
      {
        title: "Shopify-Shop verbinden",
        body: "Beseam importiert Ihren Katalog und erstellt die Fragen, die Kundinnen und Kunden zu Ihren Produkten stellen.",
      },
      {
        title: "Antworten verfolgen",
        body: "Beseam stellt diese Fragen regelmässig verschiedenen KI-Assistenten und hält fest, wer empfohlen wird.",
      },
      {
        title: "Wirkung sehen",
        body: "Verfolgen Sie, wie sich Ihre KI-Sichtbarkeit, Ihr Traffic und Ihr Umsatz über die Zeit entwickeln.",
      },
    ],
    faqs: [
      {
        question: "Welche KI-Assistenten verfolgt Beseam?",
        answer:
          "Beseam verfolgt ChatGPT, Claude, Gemini, Google AI Mode, Perplexity und Copilot, anhand der Fragen, die Ihre Kundinnen und Kunden zu Ihren Produkten stellen.",
      },
      {
        question: "Was ist KI-Sichtbarkeit?",
        answer:
          "KI-Sichtbarkeit beschreibt, wie oft und wie prominent KI-Assistenten Ihre Marke und Ihre Produkte nennen oder empfehlen, wenn Kundinnen und Kunden fragen, was sie kaufen sollen.",
      },
      {
        question:
          "Kann ich sehen, welche Mitbewerber die KI statt mir empfiehlt?",
        answer:
          "Ja. Für jede verfolgte Frage zeigt Beseam, welche Marken und Produkte der Assistent empfohlen hat. So sehen Sie, wer an Ihrer Stelle erscheint.",
      },
      {
        question: "Woher weiss Beseam, welche Fragen verfolgt werden sollen?",
        answer:
          "Beseam erstellt die Fragen aus Ihrem eigenen Katalog: die Art von Fragen, die Kundinnen und Kunden KI-Assistenten stellen, bevor sie Produkte wie Ihre kaufen.",
      },
      {
        question: "Wie oft prüft Beseam die Antworten der KI?",
        answer:
          "Beseam stellt dieselben Fragen regelmässig verschiedenen KI-Assistenten. So können Sie verfolgen, wie sich Ihre Sichtbarkeit über die Zeit verändert.",
      },
      {
        question: "Wie hängt KI-Sichtbarkeit mit Umsatz zusammen?",
        answer:
          "Beseam verknüpft KI-Sichtbarkeit mit Traffic und Umsatz aus KI-Assistenten, aufgeschlüsselt nach Thema, Frage, Produkt und Landingpage. So sehen Sie, was eine Empfehlung wert ist.",
      },
      {
        question: "Warum antworten KI-Assistenten unterschiedlich?",
        answer:
          "Jeder Assistent nutzt sein eigenes Modell, eigene Quellen und eigene Aktualisierungszyklen. Dieselbe Frage kann deshalb zu unterschiedlichen Empfehlungen führen. Darum verfolgt Beseam sie nebeneinander.",
      },
      {
        question:
          "Was kann ich tun, wenn die KI meine Produkte nicht empfiehlt?",
        answer:
          "Beseam zeigt, was Sie zuerst verbessern sollten: Produktbeschreibungen, Inhalte oder technische Probleme, sortiert nach erwarteter Umsatzwirkung.",
      },
    ],
  },
  {
    slug: "product-descriptions",
    name: "Produktbeschreibungen",
    metaTitle: "KI-optimierte Produktbeschreibungen für Onlineshops | Beseam",
    metaDescription:
      "Optimieren Sie Produktbeschreibungen und -daten, damit ChatGPT und andere KI-Assistenten Ihre Produkte verstehen und der richtigen Kundschaft empfehlen.",
    headline: "Produktbeschreibungen, die KI versteht und empfiehlt",
    intro:
      "KI-Assistenten empfehlen die Produkte, die sie am besten verstehen. Beseam optimiert Ihre Beschreibungen und ergänzt fehlende Produktdaten, damit Assistenten wissen, was jedes Produkt ist, für wen es gedacht ist und wann sie es empfehlen sollten.",
    heroCard: {
      visual: {
        kind: "description",
        before: {
          label: "Vorher",
          text: "Unser beliebtester Stiefel. Stylish, bequem und perfekt für jede Jahreszeit!",
        },
        after: {
          label: "Für KI optimiert",
          text: "Ein wasserdichter Chelsea-Boot aus Leder mit griffiger Gummisohle, gemacht für den täglichen Arbeitsweg im Regen. EU 36–46, in normaler und weiter Passform. Fällt normal aus.",
        },
      },
      sticker: "Bereit zur Freigabe",
    },
    benefitsHeading:
      "Beschreibungen, die zu den Fragen Ihrer Kundschaft passen",
    benefits: [
      {
        title: "Für echte Fragen geschrieben",
        body: "Beschreibungen beantworten, was Kundinnen und Kunden die KI vor dem Kauf fragen: Einsatzzweck, Passform, Material und für wen das Produkt gedacht ist.",
        icon: MessageSquareText,
      },
      {
        title: "Vollständige Produktdaten",
        body: "Beseam findet fehlende Attribute wie Grössen, Materialien und technische Daten und schlägt vor, wie Sie sie ergänzen.",
        icon: ListChecks,
      },
      {
        title: "Für den ganzen Katalog",
        body: "Optimieren Sie Hunderte oder Tausende Produkte, beginnend mit denen, die für Ihren Umsatz am wichtigsten sind.",
        icon: Layers,
      },
    ],
    stepsHeading: "So funktioniert die Optimierung von Produktbeschreibungen",
    steps: [
      {
        title: "Lücken finden",
        body: "Beseam liest jedes Produkt und vergleicht es mit dem, was Kundinnen und Kunden KI-Assistenten fragen.",
      },
      {
        title: "Vorschläge prüfen",
        body: "Erhalten Sie optimierte Beschreibungen und ergänzte Produktdaten, sortiert nach erwarteter Umsatzwirkung.",
      },
      {
        title: "Freigeben oder automatisieren",
        body: "Veröffentlichen Sie Änderungen mit einem Klick, oder lassen Sie Beseam die Arten von Änderungen, denen Sie vertrauen, automatisch umsetzen.",
      },
    ],
    faqs: [
      {
        question: "Warum sind Produktbeschreibungen für die KI-Suche wichtig?",
        answer:
          "KI-Assistenten empfehlen Produkte, die sie eindeutig einer Frage zuordnen können. Konkrete, vollständige Beschreibungen und Produktdaten machen diese Zuordnung möglich.",
      },
      {
        question: "Welche Produkte optimiert Beseam zuerst?",
        answer:
          "Beseam sortiert Produkte nach ihrer erwarteten Umsatzwirkung. Ihre Bestseller und Produkte mit dem grössten Potenzial kommen zuerst.",
      },
      {
        question: "Überschreibt Beseam meine bestehenden Beschreibungen?",
        answer:
          "Nicht ohne Ihre Freigabe. Jede vorgeschlagene Änderung wartet auf Sie, ausser Sie automatisieren diese Art von Änderung. Alle Änderungen bleiben rückgängig machbar.",
      },
      {
        question: "Wie sieht eine für KI optimierte Produktbeschreibung aus?",
        answer:
          "Sie nennt die Fakten, nach denen Kundinnen und Kunden fragen, wie Einsatzzweck, Passform, Material, Grössen und technische Daten, in klarer Sprache. Vage Werbefloskeln weichen konkreten Details, die die KI einer Frage zuordnen kann.",
      },
      {
        question: "Welche Produktdaten ergänzt Beseam?",
        answer:
          "Beseam findet fehlende Attribute wie Grössen, Materialien und technische Daten und schlägt vor, wie Sie sie ergänzen, für jedes Produkt und jede Variante.",
      },
      {
        question: "Kann ich Vorschläge prüfen, bevor sie live gehen?",
        answer:
          "Ja. Jeder Vorschlag wartet auf Ihre Prüfung, ausser Sie automatisieren diese Art von Änderung. Alle Änderungen bleiben rückgängig machbar.",
      },
      {
        question:
          "Wirkt sich die Optimierung für KI auf mein Google-Ranking aus?",
        answer:
          "Klare, konkrete Produktinformationen belohnen Suchmaschinen und KI-Assistenten gleichermassen. Die Optimierung für KI und für Google zielt deshalb in dieselbe Richtung.",
      },
      {
        question: "Mit welchen Shop-Plattformen funktioniert Beseam?",
        answer:
          "Beseam funktioniert derzeit mit Shopify-Shops. Sie verbinden Ihren Shop mit einem Klick, ohne Ihren Theme-Code anzufassen.",
      },
    ],
  },
  {
    slug: "content-creation",
    name: "Content-Erstellung",
    metaTitle: "KI-optimierte Inhalte für Onlineshops | Beseam",
    metaDescription:
      "Kategorieseiten, Vergleiche, Blogs und Ratgeber, auf die KI-Assistenten zurückgreifen, wenn Kundinnen und Kunden fragen, was sie kaufen sollen.",
    headline: "Inhalte, die Ihren Shop in KI-Antworten bringen",
    intro:
      "Wenn Kundinnen und Kunden die KI fragen, was sie kaufen sollen, greifen Assistenten auf Seiten zurück, die erklären, vergleichen und empfehlen. Beseam hilft Ihnen, Kategorieseiten, Vergleichsseiten, Blogs und Ratgeber zu erstellen und zu optimieren, die Ihre Produkte in diese Antworten bringen.",
    heroCard: {
      visual: {
        kind: "pages",
        label: "Gefundene Content-Lücken",
        rows: [
          {
            type: "Kategorie",
            title: "Wasserdichte Stiefel für den Arbeitsweg",
            status: "Neue Seite",
          },
          {
            type: "Ratgeber",
            title: "So wählen Sie eine Regenjacke",
            status: "Entwurf bereit",
          },
          {
            type: "Vergleich",
            title: "Leinen- oder Baumwollhemden",
            status: "Neue Seite",
          },
          {
            type: "Kategorie",
            title: "Hautpflege für empfindliche Haut",
            status: "Verbessern",
          },
        ],
      },
      sticker: "Nach Umsatzwirkung sortiert",
    },
    benefitsHeading: "Die Seiten, auf die KI-Assistenten zurückgreifen",
    benefits: [
      {
        title: "Kategorieseiten",
        body: "Machen Sie Kategorieseiten zu klaren Übersichten, die KI-Assistenten helfen, den richtigen Teil Ihres Sortiments zu empfehlen.",
        icon: LayoutGrid,
      },
      {
        title: "Vergleichsseiten",
        body: "Beantworten Sie Fragen wie „Welches soll ich kaufen?“ mit klaren Vergleichen, in denen Ihre Produkte vorkommen.",
        icon: Scale,
      },
      {
        title: "Blogs und Ratgeber",
        body: "Decken Sie die Themen ab, zu denen sich Kundinnen und Kunden vor dem Kauf informieren, damit Assistenten Ihren Shop als Quelle nennen.",
        icon: BookOpen,
      },
    ],
    stepsHeading: "So funktioniert die Content-Erstellung",
    steps: [
      {
        title: "Content-Lücken finden",
        body: "Beseam zeigt, für welche Fragen es in Ihrem Shop noch keine gute Seite gibt.",
      },
      {
        title: "Entwurf erhalten",
        body: "Beseam bereitet neue Seiten oder Verbesserungen bestehender Seiten vor, rund um Ihre eigenen Produkte.",
      },
      {
        title: "Freigeben und veröffentlichen",
        body: "Prüfen, bearbeiten und freigeben, und dann verfolgen, wie sich die Inhalte auf Ihre KI-Sichtbarkeit auswirken.",
      },
    ],
    faqs: [
      {
        question: "Welche Art von Inhalten erstellt Beseam?",
        answer:
          "Beseam erstellt und optimiert Kategorieseiten, Vergleichsseiten, Blogartikel und Kaufratgeber, alle rund um Ihre eigenen Produkte.",
      },
      {
        question: "Muss ich die Inhalte selbst schreiben?",
        answer:
          "Nein. Beseam bereitet Entwürfe vor, die Sie prüfen, bearbeiten und freigeben, bevor etwas live geht.",
      },
      {
        question: "Warum sind Inhalte für die KI-Suche wichtig?",
        answer:
          "KI-Assistenten stützen ihre Empfehlungen auf Quellen, die Produkte erklären und vergleichen. Hilfreiche Inhalte in Ihrem eigenen Shop geben ihnen einen Grund, Ihre Produkte zu nennen.",
      },
      {
        question: "Wie findet Beseam Content-Lücken?",
        answer:
          "Beseam vergleicht die Fragen, die Kundinnen und Kunden KI-Assistenten stellen, mit den Seiten in Ihrem Shop und zeigt, für welche Fragen es noch keine gute Seite gibt.",
      },
      {
        question: "Welche Inhalte schlägt Beseam zuerst vor?",
        answer:
          "Content-Lücken werden nach erwarteter Umsatzwirkung sortiert. Sie beginnen also mit den Seiten, die am ehesten Verkäufe bringen.",
      },
      {
        question: "Kann Beseam bestehende Seiten verbessern?",
        answer:
          "Ja. Neben neuen Seiten schlägt Beseam Verbesserungen für Ihre bestehenden Kategorieseiten, Blogartikel und Ratgeber vor.",
      },
      {
        question: "Schaden mit KI geschriebene Inhalte der SEO?",
        answer:
          "Entscheidend ist, ob Inhalte hilfreich sind. Die Entwürfe von Beseam basieren auf Ihren eigenen Produkten und den Fragen Ihrer Kundschaft, und Sie prüfen und bearbeiten sie, bevor etwas live geht.",
      },
      {
        question: "Woran erkenne ich, ob neue Inhalte wirken?",
        answer:
          "Beseam verfolgt, wie sich Ihre KI-Sichtbarkeit nach der Veröffentlichung entwickelt, für genau die Fragen, für die die Inhalte geschrieben wurden.",
      },
    ],
  },
  {
    slug: "technical-performance",
    name: "Technische Performance",
    metaTitle: "Technische KI-Suchoptimierung für Onlineshops | Beseam",
    metaDescription:
      "Beheben Sie Probleme mit strukturierten Daten, Crawler-Zugriff und langsamen Seiten, damit KI-Assistenten jede Seite Ihres Shops lesen können.",
    headline: "Machen Sie jede Seite Ihres Shops für KI lesbar",
    intro:
      "KI-Assistenten können nur empfehlen, was sie lesen können. Beseam prüft Ihre strukturierten Daten, den Crawler-Zugriff und die Ladezeit und zeigt genau, was Sie beheben sollten, damit Assistenten jede Seite Ihres Shops lesen und ihr vertrauen.",
    heroCard: {
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
            label: "Preise und Lager pro Variante",
            ok: false,
            detail: "Nicht synchron",
          },
          { label: "Zugriff für KI-Crawler", ok: true, detail: "Erlaubt" },
          { label: "Sitemap", ok: true, detail: "Vollständig" },
          { label: "Ladezeit der Produktseiten", ok: true, detail: "Schnell" },
        ],
      },
      sticker: "Nach jeder Korrektur neu geprüft",
    },
    benefitsHeading: "Technische Hürden beseitigen",
    benefits: [
      {
        title: "Strukturierte Daten",
        body: "Prüfen Sie, ob Produkt-, Preis- und Verfügbarkeitsdaten vorhanden sind und mit dem übereinstimmen, was Kundinnen und Kunden auf der Seite sehen.",
        icon: Braces,
      },
      {
        title: "Crawler-Zugriff",
        body: "Stellen Sie sicher, dass KI-Crawler Zugang haben und die wichtigen Seiten erreichen, statt versehentlich blockiert zu werden.",
        icon: ShieldCheck,
      },
      {
        title: "Ladezeit",
        body: "Finden Sie langsame Produktseiten und die Ursachen dahinter, gemessen mit echten Browsertests.",
        icon: Gauge,
      },
    ],
    stepsHeading: "So funktioniert die technische Optimierung",
    steps: [
      {
        title: "Shop scannen",
        body: "Beseam prüft Ihre Seiten, die Sitemap, die robots-Datei und die strukturierten Daten.",
      },
      {
        title: "Korrekturen priorisieren",
        body: "Probleme werden danach sortiert, wie viele Produkte sie betreffen und welche Umsatzwirkung zu erwarten ist.",
      },
      {
        title: "Beheben und prüfen",
        body: "Setzen Sie die Korrekturen um, und Beseam prüft erneut, ob sie gewirkt haben.",
      },
    ],
    faqs: [
      {
        question: "Was sind strukturierte Daten, und warum braucht die KI sie?",
        answer:
          "Strukturierte Daten sind maschinenlesbare Informationen über Ihre Produkte, wie Name, Preis und Verfügbarkeit. KI-Assistenten und Suchmaschinen nutzen sie, um Ihre Produkte zuverlässig zu verstehen.",
      },
      {
        question:
          "Kann mein Shop KI-Crawler blockieren, ohne dass ich es merke?",
        answer:
          "Ja. Bot-Schutz, Firewall-Regeln oder Einstellungen in der robots.txt können KI-Crawler versehentlich blockieren. Beseam prüft, ob sie Ihre Seiten erreichen.",
      },
      {
        question: "Beeinflusst die Ladezeit die KI-Sichtbarkeit?",
        answer:
          "Langsame oder fehlerhafte Seiten sind für Crawler schwerer vollständig zu lesen. Schnelle, stabile Seiten machen es wahrscheinlicher, dass Assistenten alle Ihre Produktinformationen sehen.",
      },
      {
        question: "Was prüft Beseam?",
        answer:
          "Beseam prüft Ihre Seiten, die Sitemap, die robots-Datei, die strukturierten Daten, den Crawler-Zugriff und die Ladezeit, gemessen mit echten Browsertests.",
      },
      {
        question: "Welche KI-Crawler sollten meinen Shop erreichen können?",
        answer:
          "KI-Unternehmen nutzen eigene Crawler, etwa OAI-SearchBot und GPTBot von OpenAI, PerplexityBot und ClaudeBot. Erreichen sie Ihre Seiten nicht, haben Assistenten weniger Grundlage, um Ihre Produkte zu empfehlen.",
      },
      {
        question:
          "Warum müssen strukturierte Daten mit der Seite übereinstimmen?",
        answer:
          "Wenn strukturierte Daten und die sichtbare Seite sich widersprechen, etwa bei Preis oder Lagerbestand, wissen Suchmaschinen und KI-Assistenten nicht, was stimmt, und vertrauen Ihren Produkten womöglich weniger.",
      },
      {
        question: "Wie werden technische Probleme priorisiert?",
        answer:
          "Probleme werden danach sortiert, wie viele Produkte sie betreffen und welche Umsatzwirkung zu erwarten ist. So beheben Sie zuerst, was am meisten zählt.",
      },
      {
        question: "Woran erkenne ich, dass eine Korrektur gewirkt hat?",
        answer:
          "Nachdem Sie eine Korrektur umgesetzt haben, prüft Beseam erneut, ob das Problem behoben ist.",
      },
    ],
  },
];
