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
    short: { en: "EN", de: "DE" },
    names: { en: "English", de: "Deutsch" },
  },
  notice: {
    text: "Diese Seite gibt es noch nicht auf Deutsch.",
    link: "Zur deutschen Startseite",
    dismiss: "Hinweis schließen",
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

  // Der Akzent steht im Deutschen mitten im Satz, nicht am Ende: "jemand
  // anderen" ist die Stelle, an der es wehtut.
  hero: {
    headlineBefore: "Sehen Sie, warum die KI ",
    headlineAccent: "jemand anderen",
    headlineAfter: " gewählt hat.",
    sub: "Beseam beobachtet fortlaufend die KI-Sichtbarkeit, Ihren Shop und Ihre Kundschaft, findet, was sich zu verbessern lohnt, setzt Ihre freigegebenen Änderungen um und zeigt Ihnen deren Wirkung.",
    scanReturns: {
      readable: "Können KI-Einkaufsagenten Ihren Shop lesen?",
      standing: "Sehen, wo Sie stehen",
      fixFirst: "Was zuerst zu beheben ist",
    },
    scrollCue: "Scrollen",
  },

  // Kurz halten: die Knoten sitzen auf festen Koordinaten, ein längeres Label
  // überlappt seinen Nachbarn. Markennamen (ChatGPT, Gemini, AI Mode, Google,
  // Buy Box, Amazon, eBay, Otto, Galaxus) bleiben unverändert.
  heroGraph: {
    satelliteValues: { "recs.3": "an" },
    hubs: {
      ai: {
        label: "KI-Antworten",
        satellites: {
          0: "ChatGPT",
          1: "Gemini",
          2: "AI Mode",
          3: "Quellen",
        },
        metrics: {
          0: "ChatGPT-Sichtbarkeit",
          1: "Gemini-Sichtbarkeit",
          2: "Google AI Mode",
        },
        capabilities: {
          0: {
            label: "Wurden Sie genannt?",
            description:
              "Prüfen, wie Produkte und Marke in KI-Shopping-Kanälen erscheinen.",
          },
          1: {
            label: "Was hat sich geändert?",
            description:
              "Dieselben Kundenfragen erneut stellen und zeigen, was sich geändert hat.",
          },
          2: {
            label: "Fragen mit Ihrer Nennung",
            description:
              "Messen, ob Produkte bei den relevanten Kundenfragen vorkommen.",
          },
          3: {
            label: "Wer wurde stattdessen gewählt?",
            description:
              "Produkte beobachten, die statt oder neben Ihrem Katalog erscheinen.",
          },
          4: {
            label: "Welche Quellen stützen das?",
            description:
              "Die Quellen verfolgen, die die Produktbeschreibung stützen.",
          },
        },
      },
      search: {
        label: "Suchergebnisse",
        satellites: {
          0: "JSON-LD",
          1: "indexierbar",
          2: "Anfragen",
          3: "Snippets",
        },
        metrics: {
          0: "JSON-LD-Abdeckung",
          1: "Indexierbarkeit",
          2: "Anfragen-Treffer",
        },
        capabilities: {
          0: {
            label: "Anfragen, die Sie finden",
            description:
              "Suchergebnisse mit den Produkten verbinden, die Kundschaft sucht.",
          },
          1: {
            label: "Maschinenlesbare Fakten",
            description:
              "Strukturierte Produktdaten, die Such- und Shopping-Systeme lesen können.",
          },
          2: {
            label: "Ist die Seite auffindbar?",
            description:
              "Ob wichtige Produktseiten gefunden und indexiert werden können.",
          },
          3: {
            label: "Passen die Begriffe?",
            description: "Wie gut Produktfakten zu echten Suchanfragen passen.",
          },
          4: {
            label: "Was die Suche zeigt",
            description:
              "Sichtbare und strukturierte Produktdaten für reichhaltigere Suchergebnisse.",
          },
        },
      },
      catalog: {
        label: "Produkte in der Auswahl",
        satellites: {
          0: "Felder",
          1: "Aktualität",
          2: "Varianten",
          3: "Bestand",
        },
        metrics: {
          0: "Vollständigkeit",
          1: "Aktualität",
          2: "Variantenabdeckung",
        },
        capabilities: {
          0: {
            label: "Verfügbare Produkte",
            description:
              "Die Produkte und Varianten, die Kundschaft wirklich wählen kann.",
          },
          1: {
            label: "Wählbare Varianten",
            description:
              "Produktfakten je Variante, verfügbar im Moment der Wahl.",
          },
          2: {
            label: "Sinnvolle Ergänzungen",
            description: "Produktfakten, die die Wahl erleichtern können.",
          },
          3: {
            label: "Freigegebene Änderungen",
            description:
              "Von Ihnen freigegebene Produktänderungen, bereit für den Shop.",
          },
          4: {
            label: "Variantenauswahl",
            description: "Abdeckung der Variantenfakten im gesamten Katalog.",
          },
          5: {
            label: "Bestand stimmt",
            description:
              "Übereinstimmung zwischen Katalogbestand und sichtbarem Shop.",
          },
        },
      },
      brand: {
        label: "Markenvertrauen",
        satellites: {
          0: "Aussagen",
          1: "Identität",
          2: "Vertrauen",
          3: "Belege",
        },
        metrics: {
          0: "Freigegebene Aussagen",
          1: "Identitätsabdeckung",
          2: "Vertrauensbelege",
        },
        capabilities: {
          0: {
            label: "Wer Sie sind",
            description:
              "Markeninformationen, die beim Vergleich mit Alternativen verfügbar sind.",
          },
          1: {
            label: "Aktuelle Markendaten",
            description: "Die sichtbaren Markeninformationen aktuell halten.",
          },
          2: {
            label: "Belegte Aussagen",
            description:
              "Aussagen mit genug Beleg, um sie sicher weiterzuverwenden.",
          },
          3: {
            label: "Richtlinien und Belege",
            description: "Richtlinien, Belege und Vertrauensangaben zur Marke.",
          },
          4: {
            label: "Überall dieselbe Aussage",
            description:
              "Übereinstimmung zwischen freigegebenem Markenkontext und dem, was Kundschaft sieht.",
          },
        },
      },
      truth: {
        label: "Produktfakten",
        satellites: {
          0: "Preis",
          1: "Versand",
          2: "Bewertungen",
          3: "Fakten",
        },
        metrics: {
          0: "Abgedeckte Fakten",
          1: "Versandangaben",
          2: "Strukturierte Fakten",
        },
        capabilities: {
          0: {
            label: "Preis & Verfügbarkeit",
            description:
              "Übereinstimmung von Preis, Verfügbarkeit und Angebotsstatus.",
          },
          1: {
            label: "Preis stimmt",
            description:
              "Preisgleichheit über Katalog, Schema und sichtbare Produktseite.",
          },
          2: {
            label: "Lieferauskunft",
            description: "Versandangaben in den Daten und auf der Seite.",
          },
          3: {
            label: "Bewertungsbeleg",
            description:
              "Ob Bewertungen dort sichtbar sind, wo entschieden wird.",
          },
          4: {
            label: "Fakten passen zur Seite",
            description:
              "Ob strukturierte Produktdaten zu dem passen, was auf der Seite steht.",
          },
          5: {
            label: "Nach der Änderung prüfen",
            description:
              "Dieselben Produktangaben nach einer freigegebenen Änderung prüfen.",
          },
        },
      },
      creative: {
        label: "Was sie sehen",
        satellites: {
          0: "Bilder",
          1: "Video",
          2: "Markenpassung",
          3: "Material",
        },
        metrics: {
          0: "Bildabdeckung",
          1: "Markenkonsistenz",
          2: "Videoabdeckung",
        },
        capabilities: {
          0: {
            label: "Was zuerst zu sehen ist",
            description:
              "Bilder und Inhalte, die Kundschaft sieht, bevor sie genauer vergleicht.",
          },
          1: {
            label: "Produktbilder",
            description:
              "Bilder, die Produkt und Anwendungsfall verständlich machen.",
          },
          2: {
            label: "Produktvideo",
            description:
              "Video, das Fragen beantwortet, die reine Fakten offenlassen.",
          },
          3: {
            label: "Ist der Beleg klar?",
            description:
              "Prüfen, ob Bilder oder Video die Produktaussage stützen.",
          },
          4: {
            label: "Vorhandene Belege",
            description:
              "Wiederverwendbares Material zu Produkt und Markenkontext.",
          },
          5: {
            label: "Inhalte zum Einsatz",
            description:
              "Inhalte, die zeigen, ob das Produkt zum Bedarf passt.",
          },
        },
      },
      campaigns: {
        // Nicht "Gesehene Anzeigen": das Label überlappt bei 1024 px den Wert
        // "91%" des Nachbarsatelliten um 13,9 px -- gemessen, nicht geschätzt.
        label: "Anzeigen",
        satellites: {
          0: "Google Ads",
          1: "Meta Ads",
          2: "Zielseite",
          3: "Tracking",
        },
        metrics: {
          0: "Google-Ads-Bereitschaft",
          1: "Meta-Ads-Bereitschaft",
          2: "Zielseiten-Bereitschaft",
        },
        capabilities: {
          0: {
            label: "Trägt die Anzeige?",
            description:
              "Prüfen, ob Produkt, Tracking und Zielseite das Versprechen der Anzeige tragen.",
          },
          1: {
            label: "Angebot und Aussage",
            description: "Das Versprechen, das Kundschaft vor dem Klick sieht.",
          },
          2: {
            label: "Freigegebene Änderung",
            description:
              "Eine von Ihnen freigegebene Kampagnenänderung samt Begründung.",
          },
          3: {
            label: "Antwortet die Zielseite?",
            description:
              "Prüfen, ob die Zielseite die Frage der Anzeige beantwortet.",
          },
          4: {
            label: "Motivvarianten",
            description:
              "Alternative Aussagen und Motive für dasselbe Produkt und denselben Bedarf.",
          },
          5: {
            label: "Was den Klick bringt",
            description: "Sehen, welche Produktaussage Aufmerksamkeit bekommt.",
          },
          6: {
            label: "Wer klickte und kaufte?",
            description:
              "Kampagnenreaktion mit dem weiteren Kaufweg verbinden.",
          },
          7: {
            label: "Klickkosten",
            description:
              "Kosten bezahlter Zugriffe getrennt von den folgenden Käufen halten.",
          },
        },
      },
      onsite: {
        label: "Shop-Suche",
        satellites: {
          0: "Treffer",
          1: "Top 3",
          2: "Null Treffer",
          3: "Filter",
        },
        metrics: {
          0: "Trefferabdeckung",
          1: "Top-3-Platzierung",
          2: "Null-Treffer-Quote",
        },
        capabilities: {
          0: {
            label: "Wonach gesucht wurde",
            description:
              "Die Worte, mit denen Kundschaft das passende Produkt sucht.",
          },
          1: {
            label: "Welche Produkte kamen",
            description: "Wo relevante Produkte in der Shop-Suche erscheinen.",
          },
          2: {
            label: "Suche ohne Treffer",
            description: "Suchen, die kein brauchbares Produkt zurückgeben.",
          },
          3: {
            label: "Was danach geschah",
            description: "Verhalten der Kundschaft nach einem Suchergebnis.",
          },
          4: {
            label: "Was das Ranking formt",
            description:
              "Regeln und Produktdaten, die die gezeigten Optionen beeinflussen.",
          },
        },
      },
      recs: {
        label: "Was empfohlen wird",
        satellites: {
          0: "Abdeckung",
          1: "Affinität",
          2: "Regeln",
          3: "Holdout",
        },
        metrics: {
          0: "Katalogabdeckung",
          1: "Affinitätsgüte",
          2: "Holdout-Abdeckung",
        },
        capabilities: {
          0: {
            label: "Was empfohlen wurde",
            description: "Die Produkte, die der Shop der Kundschaft zeigt.",
          },
          1: {
            label: "Warum diese Produkte?",
            description: "Die Regeln und Produktdaten hinter den Empfehlungen.",
          },
          2: {
            label: "Passung zum Bedarf",
            description: "Wie gut das Produkt zum erkennbaren Bedarf passt.",
          },
          3: {
            label: "Geeignete Produkte",
            description:
              "Wie viel des Katalogs in Empfehlungen auftauchen kann.",
          },
          4: {
            label: "Halfen die Empfehlungen?",
            description: "Empfehlungen mit dem späteren Verhalten vergleichen.",
          },
        },
      },
      pdp: {
        label: "Produktseite",
        satellites: {
          0: "Belege",
          1: "Richtlinien",
          2: "Vertrauen",
          3: "Inhalt",
        },
        metrics: {
          0: "Beantwortete Fragen",
          1: "Klarheit der Richtlinien",
          2: "Vertrauensabdeckung",
        },
        capabilities: {
          0: {
            label: "Beantwortete Fragen",
            description:
              "Angaben auf der Produktseite zu den Fragen vor der Wahl.",
          },
          1: {
            label: "Was fehlt?",
            description:
              "Lücken auf der Produktseite finden, ohne jede Lücke zur Ursache zu erklären.",
          },
          2: {
            label: "Nach der Änderung prüfen",
            description:
              "Dieselben Angaben der Produktseite nach der Änderung prüfen.",
          },
          3: {
            label: "Fakten passen zur Seite",
            description:
              "Übereinstimmung von sichtbarem Inhalt und strukturierten Fakten.",
          },
          4: {
            label: "Größe & Passform",
            description:
              "Hinweise zu Passform und Größe für die richtige Variante.",
          },
          5: {
            label: "Bewertungen & Vertrauen",
            description:
              "Bewertungen und Vertrauensangaben im Moment der Entscheidung.",
          },
          6: {
            label: "Rückgabe & Lieferung",
            description:
              "Richtlinien und Lieferangaben vor dem Kaufentschluss.",
          },
        },
      },
      behavior: {
        label: "Was sie dann tun",
        satellites: {
          0: "Interaktion",
          1: "Reibung",
          2: "Suchen",
          3: "Aufzeichnung",
        },
        metrics: {
          0: "Interaktionsrate",
          1: "Reibungs-Sitzungen",
          2: "Beobachtete Suchen",
        },
        capabilities: {
          0: {
            label: "Was Kundschaft tat",
            description:
              "Navigation, Interaktion, Kauf und Reibung entlang des Kaufwegs.",
          },
          1: {
            label: "Wo sie zögerten",
            description:
              "Verhalten, das auf Unsicherheit oder Reibung hindeuten kann.",
          },
          2: {
            label: "Wonach sie suchten",
            description:
              "Suchverhalten, verbunden mit dem, was danach geschah.",
          },
          3: {
            label: "Was sie öffneten",
            description:
              "Welche Produkte, Seiten und Angaben tatsächlich gesehen wurden.",
          },
          4: {
            label: "Wo sie abbrachen",
            description: "Der Punkt im Kaufweg, an dem es nicht weiterging.",
          },
          5: {
            label: "Aufzeichnung",
            description:
              "Aufzeichnungen zeigen Reibung, beweisen aber keine Ursache.",
          },
          6: {
            label: "Interaktionsmuster",
            description:
              "Sehen, welche Seitenteile genutzt und welche ignoriert werden.",
          },
        },
      },
      checkout: {
        label: "Checkout",
        satellites: {
          0: "Abschluss",
          1: "Zahlung",
          2: "Abbruch",
          3: "Fehler",
        },
        metrics: {
          0: "Abschlussquote",
          1: "Zahlungserfolg",
          2: "Abbruchquote",
        },
        capabilities: {
          0: {
            label: "Wo der Checkout stoppte",
            description: "Beobachtete Abbrüche auf dem Kaufweg.",
          },
          1: {
            label: "Zahlungserfolg",
            description:
              "Beobachtete Zahlungsabschlüsse in erfassten Checkouts.",
          },
          2: {
            label: "Lieferhürden",
            description:
              "Lieferkosten und -zeiten, die die Wahl noch kippen können.",
          },
          3: {
            label: "Technische Fehler",
            description: "Laufzeitfehler, die den Kaufabschluss stören können.",
          },
          4: {
            label: "Hielt die Behebung?",
            description: "Dieselben Checkout-Daten nach der Änderung prüfen.",
          },
        },
      },
      revenue: {
        label: "Kauf",
        satellites: {
          0: "Bestellungen",
          1: "CVR",
          2: "AOV",
          3: "Wirkung",
        },
        metrics: {
          0: "Bestellungen",
          1: "Conversion-Rate",
          2: "Beobachtete Wirkung",
        },
        capabilities: {
          0: {
            label: "Gab es einen Kauf?",
            description: "Gebuchte Bestellungen und Umsatz als Kaufbeleg.",
          },
          1: {
            label: "Was änderte sich danach?",
            description:
              "Vorher-Nachher-Messung zu einer abgeschlossenen Änderung.",
          },
          2: {
            label: "Beobachtet vs. zugeordnet",
            description:
              "Direkt beobachteten und zugeordneten Umsatz getrennt halten.",
          },
          3: {
            label: "Kaufweg",
            description: "Wo Kundschaft weitergeht oder stehen bleibt.",
          },
          4: {
            label: "Wer hat sich verändert?",
            description:
              "Sehen, wie sich Ergebnisse je Kundengruppe unterscheiden.",
          },
          5: {
            label: "Stimmt der Umsatz?",
            description:
              "Prüfen, ob der erfasste Umsatz zu den Shop-Daten passt.",
          },
        },
      },
      marketplaces: {
        label: "Marktplätze",
        satellites: {
          0: "Amazon",
          1: "eBay",
          2: "Otto",
          3: "Galaxus",
        },
        metrics: {
          0: "Amazon-Sichtbarkeit",
          1: "eBay-Sichtbarkeit",
          2: "Buy-Box-Abdeckung",
        },
        capabilities: {
          0: {
            label: "Wer gewinnt die Buy Box?",
            description:
              "Anteil der erfassten Angebote, die die Buy Box gegen Mitbewerber gewinnen.",
          },
          1: {
            label: "Ist es vergleichbar?",
            description:
              "Pflichtfelder und Bilder des Marktplatzes über alle erfassten SKUs.",
          },
          2: {
            label: "Stimmt der Preis?",
            description:
              "Erfasste Angebote, deren Preis zum eigenen Shop passt.",
          },
          3: {
            label: "Auf welchem Platz?",
            description:
              "Mittlere erfasste Position auf der Kategorieseite des Marktplatzes.",
          },
          4: {
            label: "Genug Belege?",
            description:
              "Erfasste Produkte mit genug Bewertungen für die Wahl.",
          },
        },
      },
    },
  },

  // Die fünf Schrittnamen stehen zweimal: als Beschriftung im Ring und in
  // `desc`. Wer einen Schritt umbenennt, benennt ihn in `desc` mit um.
  loop: {
    title: "Der Beseam-Kreislauf",
    desc: "Fünf Schritte im Kreis angeordnet, jeder Pfeil zeigt auf den nächsten: Finden, Vorbereiten, Freigeben, Umsetzen, Messen. Messen führt zurück zu Finden.",
    steps: {
      find: { label: "Finden", detail: "was zu verbessern ist" },
      prepare: { label: "Planen", detail: "Änderung" },
      approve: { label: "Freigeben", detail: "Sie entscheiden" },
      apply: { label: "Umsetzen", detail: "Beseam setzt um" },
      measure: { label: "Messen", detail: "gleicher Weg" },
    },
    // Die Beschriftungen 02 und 05 stehen an den seitlichen Rändern der
    // viewBox und werden dort abgeschnitten. Gemessen: 02 hat rund 68px, 05
    // hat 74,2px Platz. Deshalb "Planen" statt "Vorbereiten", "Änderung" ohne
    // Artikel und "gleicher Weg" (73,3px) statt "derselbe Weg" (76,6px).
    // Wer diese vier Zeichenketten verlängert, schneidet sie ab.
    centre: { line1: "Fortlaufender", line2: "Kreislauf" },
    caption: "Messen beendet die Arbeit nicht. Es startet das nächste Finden.",
  },

  systemMap: {
    signalsAriaLabel: "Informationen entlang der Kaufreise",
    columns: {
      signals: { label: "Signale", note: "Feste Menge" },
      journey: { label: "Eine Kaufreise", note: "Abdeckung" },
      useCases: {
        label: "Was Teams damit tun",
        note: "Die Liste wächst weiter",
        noLinkNote: "Verbundene Abdeckung",
      },
    },
    feedsBefore: "Speist ",
    feedsBetween: " von ",
    // "Input — was X liest" läuft bei 1024px aus der Spalte (die Zeile bricht
    // nicht um). "Input für X" sagt dasselbe und bleibt kürzer als die
    // englische Zeile, deshalb bleibt `inputAfter` leer.
    inputBefore: "Input für ",
    inputAfter: "",
    platformLabel: "Plattform",
    platformQuestion: "Wofür entscheidet sich die Kundschaft?",
    explore: "Plattform ansehen",
    signalsUsed: "Genutzte Signale:",
    servedLive: "Live ausgespielt",
    moreLabel: "+ mehr",
    moreDetail:
      "Kampagnen, Zuverlässigkeit, Experimente, Segmente, Media Studio, Marktplätze, Passform. Nicht jede Funktion ist für jeden Shop freigeschaltet.",
    hint: "Signal wählen, um zu sehen, was es speist",
    // `scope` und `caveat` sitzen in schmalen Spalten mit fester Zeilenhöhe:
    // die deutschen Zeilen bleiben deshalb so lang wie die englischen, nicht
    // so nah wie möglich am englischen Wortlaut.
    signals: {
      discovery: {
        label: "KI-Sichtbarkeit",
        layer: "Extern",
        scope: "Wo Produkte in die Auswahl kommen – oder nicht.",
        caveat:
          "Datierte, wiederholbare Stichproben. Nie die verborgene Ranking-Logik eines Modells.",
        does: "Sichtbarkeit in der Auswahl",
      },
      store: {
        label: "Shop & Produkt",
        layer: "Im Shop",
        scope: "Was die Seite beantwortet und was sie anbietet.",
        caveat:
          "Nur öffentliche Shop-Daten. Kein Login, keine privaten Kundendaten.",
        does: "Katalog- und Seitenqualität",
      },
      behavior: {
        // Weiches Trennzeichen (U+00AD): "Kundenverhalten" ist ein Wort ohne
        // Umbruchstelle und schiebt sich sonst bei 1024px über das Ebenen-
        // Kürzel rechts daneben. Die englische Zeile bricht an ihrem Leerraum.
        label: "Kunden­verhalten",
        layer: "Kaufreise",
        scope: "Was Kundschaft verfeinert, öffnet, ignoriert, abbricht.",
        caveat:
          "Was die Kundschaft getan hat. Warum, bleibt eine Hypothese, bis es geprüft ist.",
        does: "Proaktive Personalisierung",
      },
      revenue: {
        label: "Umsatz",
        layer: "Ergebnis",
        scope: "Was sich verändert hat, nachdem gehandelt wurde.",
        caveat:
          "Gemessen nach der Umsetzung, an denselben Fragen, die die Lücke zeigten.",
        does: "Wirkung und Attribution",
      },
    },
    short: {
      discovery: "Sichtbarkeit",
      store: "Shop",
      behavior: "Verhalten",
      revenue: "Umsatz",
    },
    cards: {
      aiAnswerVisibility: {
        name: "Sichtbarkeit in KI-Antworten",
        detail:
          "Genannt bei den Fragen, die zählen – und was die Antwort stützte.",
      },
      competitors: {
        name: "Wer stattdessen gewählt wird",
        detail: "Was an Ihrer Stelle erscheint, über die Zeit verfolgt.",
      },
      agentReadiness: {
        name: "Agent-Tauglichkeit",
        detail: "Ob Shopping-Agenten den Shop überhaupt lesen können.",
      },
      catalogTruth: {
        name: "Katalogwahrheit",
        detail: "Felder, Varianten, Aktualität und Bestand, wie sie ankommen.",
      },
      productPageEvidence: {
        name: "Belege auf der Produktseite",
        detail: "Was die Seite beantwortet und was sie offen lässt.",
      },
      storeHealth: {
        name: "Shop-Zustand und Crawlbarkeit",
        detail: "Indexierbarkeit, strukturierte Fakten, Maschinenlesbarkeit.",
      },
      brandClaims: {
        name: "Markenaussagen und Vertrauen",
        detail: "Aussagen mit genug Belegen, um sie sicher weiterzuverwenden.",
      },
      personalizedSearch: {
        name: "Personalisierte Suche und Empfehlungen",
        detail: "Ergebnisse und Platzierungen, live ausgespielt und gemessen.",
      },
      whyBuyersLeave: {
        name: "Warum Kundschaft abspringt",
        detail: "Sitzungen, Replay, Heatmaps und die Reibung, die sie zeigen.",
      },
      funnels: {
        name: "Funnels, Kohorten, Kaufreisen",
        detail: "Wo Kundschaft weitergeht und wer stehen bleibt.",
      },
      revenueAttribution: {
        name: "Umsatz und Attribution",
        detail:
          "Umsatz, beobachtete Änderungen, Attribution und Schätzungen bleiben getrennt.",
      },
      whatChanged: {
        name: "Was sich verändert hat",
        detail: "Vorher und nachher, an eine erledigte Änderung gebunden.",
      },
      oneChangeList: {
        name: "Eine Änderungsliste",
        detail:
          "Jede vorgeschlagene Änderung mit Zuständigkeit, Freigabestatus und Prüfung danach.",
      },
    },
  },

  appScreens: {
    illustrative: "Beispielhafte Darstellung · keine Kundenergebnisse.",
    actions: {
      columns: {
        change: "Änderung",
        salesShare: "Umsatzanteil",
        effort: "Aufwand",
        status: "Status",
      },
      efforts: { quick: "Schnell", hard: "Aufwendig" },
      rows: {
        commuting: {
          title:
            "Den Anwendungsfall Pendeln auf der Produktseite von Urban Shell ergänzen.",
          why: "Die Kundschaft suchte eine Jacke zum Pendeln, und die Produktseite beantwortet nirgends, ob sie dafür geeignet ist.",
          band: "Top 5 % Ihres verbuchten Umsatzes",
          step: "Freigabe nötig",
        },
        layers: {
          title: "Erklären, wie Urban Shell über Alltagskleidung passt.",
          why: "Die Kundschaft öffnete die Größentabelle, und die Passform über weiterer Kleidung bleibt im Entscheidungsmoment offen.",
          band: "Oberes Viertel des verbuchten Umsatzes",
          step: "In Arbeit",
        },
        recheck: {
          title:
            "Die Pendel-Fragen nach der Änderung an der Produktseite erneut stellen.",
          why: "Dieselbe Kauffrage erneut stellen, bevor gesagt wird, die Änderung habe der Sichtbarkeit geholfen.",
          band: "Nicht gemessen",
          step: "Wird gemessen",
        },
      },
      note: "Jede Änderung hält zusammen, was Beseam gefunden hat, wer zuständig ist, welchen Status sie hat und was danach zu prüfen ist.",
    },
    impact: {
      title: "Ergebnisse",
      meta: "Beispielwerte",
      verified: "Änderung bestätigt",
      windowLabel: "Messzeitraum",
      windowValue: "28 Tage",
      // Die Delta-Spalte ist 4,75rem breit und bricht nicht um: "%-Pkt." und
      // "Zitate" stehen für Prozentpunkte und zitierende Antworten, weil die
      // ausgeschriebenen Wörter aus der Spalte laufen.
      rows: {
        naming: {
          metric: "Antworten zum Pendeln, die Urban Shell nennen",
          before: "9 %",
          after: "23 %",
          delta: "+14 %-Pkt.",
        },
        citing: {
          metric: "Antworten, die Ihre Produktseite zitieren",
          before: "1 von 12",
          after: "1 von 4",
          delta: "+3 Zitate",
        },
        position: {
          metric: "Ihre Position, wenn Sie genannt werden",
          before: "5.",
          after: "2.",
          delta: "+3 Plätze",
        },
      },
    },
  },

  rail: {
    ariaLabel: "Forschungsergebnis",
    eyebrow: "Neue Studie",
    // Geschütztes Leerzeichen vor dem Prozentzeichen: die Zeile ist einzeilig
    // und die Zahl darf nicht von ihrer Einheit getrennt umbrechen.
    finding: (share: number) =>
      `${share} % der Markennennungen entfielen auf nur einen KI-Assistenten.`,
    link: "Bericht & Methodik ansehen",
  },

  sections: {
    proof: {
      heading: "Sehen Sie, was der Entscheidung im Weg steht.",
      body: "Beseam sieht sich an, was die Kundschaft getan hat, prüft Produkt-, Such- und Bestandsdaten, schließt schwächere Erklärungen aus und macht aus dem stärksten Befund eine Änderung, die Sie freigeben und erneut prüfen können.",
      traceLabel: "Beispielanalyse",
      traceScope: "Suche im Shop · schematisch",
      queries: {
        searched: { label: "Gesucht", value: "„wasserdichte Jacke“" },
        thenAdded: {
          label: "Dann ergänzt",
          value: "... „zum Pendeln“",
        },
      },
      signal: "Bekam dieselben Jacken zurück und ging, ohne eine zu öffnen.",
      whatHappenedNext: "Was dann geschah",
      candidates: {
        onsiteSearch: {
          domain: "Suche im Shop",
          verdict: "Suche funktioniert",
          claim: "Die Verfeinerung lieferte gar keine Treffer.",
          why: "Sie liefert die wasserdichten Jacken weiterhin.",
        },
        productPages: {
          domain: "Produktseiten",
          claim: "Keine dieser Jacken erwähnt das Pendeln.",
          why: "Weder in den Titeln noch in den Beschreibungen oder Tags.",
        },
        availability: {
          domain: "Verfügbarkeit",
          verdict: "Bestand ist da",
          claim: "Die gelieferten Jacken sind nicht auf Lager.",
          why: "Fast alle sind im Markt der Kundschaft auf Lager.",
        },
      },
      strongestEvidence: "Stärkster Befund",
      ruledOut: "Ausgeschlossen",
      proposedChange: "Vorgeschlagene Änderung",
      change:
        "Den Anwendungsfall Pendeln auf den gefundenen Jacken-Produktseiten ergänzen.",
      approve: "Sie geben frei",
      applies: "Beseam setzt um",
      checkAgain: "Erneut prüfen",
      mobile: {
        whatTheShopperDid: "Was die Kundschaft tat",
        query: "wasserdichte Jacke",
        refinement: "+ zum Pendeln",
        signal:
          "Dieselben Jacken zurück. Die Kundschaft ging, ohne eine zu öffnen.",
        findings: {
          onsiteSearch: {
            domain: "Suche im Shop",
            finding: "Suche funktioniert.",
            detail:
              "Die verfeinerte Suche liefert weiterhin die wasserdichten Jacken.",
          },
          productPages: {
            domain: "Produktseiten",
            finding: "Das Pendeln kommt nicht vor.",
            detail: "Weder in Titeln, Beschreibungen noch Tags.",
          },
          availability: {
            domain: "Verfügbarkeit",
            finding: "Bestand ist vorhanden.",
            detail:
              "Fast alle gefundenen Jacken sind im Markt der Kundschaft auf Lager.",
          },
        },
      },
    },

    oneSystem: {
      heading: "Genannt zu werden heißt nicht, gewählt zu werden.",
      body: "Beseam verfolgt die Kundschaft von der Entdeckung bis zum Kauf, um zu finden, wo das Vertrauen sinkt, Fragen offen bleiben oder der Weg endet.",
      discovery: {
        buyingQuestion: "Kauffrage",
        example: "Beispiel",
        // Genau 51 Zeichen, wie das englische Original: `steps(51)` in
        // globals.css tippt diese Zeichenkette Zeichen für Zeichen.
        asked: "wasserdichte Jacke zum Pendeln, Größe M, unter 200€",
        parsed: {
          useCase: "Pendeln",
          material: "Wasserdicht",
          size: "Größe M",
          price: "Unter 200 €",
        },
        andMore: "und sieben weitere, keine davon Ihre",
        verdict: "Ihr Shop: nicht genannt",
      },
      store: {
        breadcrumb: (product: string) => `Start / Jacken / ${product}`,
        reviews: "128 Bewertungen",
        size: "Größe",
        addToCart: "In den Warenkorb",
        stock: "Auf Lager · Versand morgen",
        whatShoppersAsk: "Was hier gefragt wird",
        questions: {
          waterproofRating: {
            question: "Wasserdichtigkeit",
            answer: "20.000 mm",
          },
          // "beim" statt "zum" läuft in der 145px breiten, abgeschnittenen
          // Zeile über -- gemessen, nicht geschätzt.
          breathable: {
            question: "Atmungsaktiv zum Pendeln",
            answer: "Nicht beantwortet",
          },
          suitJacket: {
            question: "Passt über ein Sakko",
            answer: "Nicht beantwortet",
          },
          returnWindow: { question: "Rückgabefrist", answer: "60 Tage" },
        },
        verdict: "Zwei Fragen offen",
      },
      personalization: {
        forThisShopper: "Für diese Person",
        wants: {
          waterproof: "wasserdicht",
          size: "Größe M",
          commuting: "Pendeln",
        },
        addedToCart: "Hinzugefügt",
        twoAdded: "Zwei ergänzt",
        added: {
          breathable: "3-Lagen-Shell, Pit-Zips",
          suitJacket: "Normale Passform, größer",
        },
        verdict: "Alle vier beantwortet",
      },
      domains: {
        getFound: {
          title: "Gefunden werden",
          capabilities: {
            aiAnswers: "KI-Antworten",
            search: "Suche",
            productFeeds: "Produktfeeds",
          },
          detail: "Wer Sie nie sieht, kann Sie auch nicht wählen.",
        },
        hesitate: {
          title: "Sehen, warum Kundschaft zögert",
          capabilities: {
            productPages: "Produktseiten",
            onsiteSearch: "Shop-Suche",
            behavior: "Verhalten",
          },
          detail: "Die offene Frage finden, die die Kundschaft zögern lässt.",
        },
        choose: {
          title: "Bei der Wahl helfen",
          capabilities: {
            recommendations: "Empfehlungen",
            personalization: "Personalisierung",
          },
          detail: "Die fehlende Information ergänzen, die bei der Wahl hilft.",
        },
      },
      gate: {
        eyebrow: "Nichts geht ohne Sie live",
        body: "Jede kundenseitige Änderung wartet bei Schritt 03 auf Ihre Freigabe.",
        note: "Und Schritt 05 prüft denselben Weg, an dem er begonnen hat — KI-Nennungen, Produktbesuche, Warenkorb — damit eine Änderung an dem Zustand gemessen wird, den sie verändert hat.",
      },
    },

    benchmarks: {
      eyebrow: "AI Shopping Report",
      heading: "Sichtbar an einer Stelle, übersehen an einer anderen.",
      // Der Befund trägt im Deutschen den Zeitbezug mit, weil "Im letzten
      // Durchlauf" vor der Zahl die Verbzweitstellung brechen würde.
      body: "Beseam stellt dieselben Kauffragen in mehreren KI-Assistenten, um zu finden, wo Ihre Produkte auftauchen, wo sie fehlen und wie weit die Ergebnisse auseinandergehen. ",
      finding: (share: number) =>
        `Im letzten Durchlauf entfielen ${share} % der Markennennungen auf nur einen Assistenten.`,
      link: "Bericht und Methodik ansehen",
      pullQuote:
        "Ein lesbarer Katalog bringt Sie in die Auswahl. Beseam verfolgt, ob Sie gewählt werden, und zeigt, was sich verändert hat.",
      figureLabel: "Übereinstimmung der Assistenten",
      appearances: (namings: number) => `${namings} Markennennungen`,
      agreementAriaLabel: (one: number, two: number, every: number) =>
        `${one} Markennennungen entfielen auf nur einen Assistenten, ${two} auf zwei Assistenten und ${every} auf jeden Assistenten`,
      bands: {
        one: "Nur ein Assistent",
        two: "Zwei Assistenten",
        every: "Jeder Assistent",
      },
      // Die Spaltenüberschriften bleiben kürzer als die englischen: die
      // mittlere Spalte ist auf schmalen Viewports ohnehin schon zu eng.
      columns: {
        category: "Kategorie",
        question: "Größte Uneinigkeit",
        solo: "Marken, nur ein Assistent",
      },
      outOf: (total: number) => ` von ${total}`,
    },

    actions: {
      heading: "Beseam findet, was als Nächstes zu verbessern ist.",
    },

    system: {
      heading: "Der ganze Shop, zusammen betrachtet.",
      body: "Was die KI über Sie sagt, was Ihre Seiten sagen und was Ihre Kundschaft tut. Getrennt sind das einzelne Berichte; zusammen zeigen sie, was sich bewegt hat und was sich mitbewegt hat.",
    },

    impact: {
      heading: "Es zählt nur, wenn sich das Ergebnis bewegt.",
      body: "Nach einer Änderung stellt Beseam dieselben Kundenfragen erneut — und zeigt, ob die Antworten jetzt Ihren Shop nennen.",
    },

    promise: {
      headingLine1: "Kostenlos starten.",
      headingLine2: "Zahlen, wenn es sich beweist.",
      body: "Beseam beobachtet, bereitet die Änderung vor, setzt sie nach Ihrer Freigabe um und zeigt Ihnen, was sich bewegt hat – ein Abo statt Tool plus Agentur. Testen Sie kostenlos und sehen Sie die Wirkung, bevor Sie etwas zahlen.",
      cta: "Kostenlos starten",
    },

    stickyCta: {
      cta: "Kostenlos starten",
    },
  },

  faq: {
    heading: "FAQ",
    items: {
      connect: {
        question: "Was muss ich verbinden, um zu starten?",
        answer:
          "Beginnen Sie mit Ihrer Domain. Shop-, Analyse-, Such-, Verhaltens- oder Kundendaten kommen erst dazu, wenn sie Beseam helfen, das Problem zu verstehen oder eine freigegebene Änderung umzusetzen.",
      },
      priority: {
        question: "Wie entscheidet Beseam, was zuerst behoben wird?",
        answer:
          "Beseam sieht sich an, was Ihre Kundschaft getan hat, was im Shop passiert ist und was sich im Umsatz verändert hat. Es trennt Fakten von möglichen Erklärungen und zeigt, was sich zuerst zu beheben lohnt – mit der Begründung dabei.",
      },
      changes: {
        question: "Was kann Beseam tatsächlich ändern?",
        answer:
          "Mit den passenden Zugriffsrechten kann Beseam Produktdaten, Inhalte, Merchandising, die Shop-Suche, Empfehlungen und andere bearbeitbare Teile des Shops ändern. Was umgesetzt werden kann, hängt vom angebundenen System und den Freigaberegeln ab, die Sie wählen.",
      },
      approval: {
        question: "Was braucht eine Freigabe, bevor es live geht?",
        answer:
          "Sie legen die Regeln fest. Beseam bereitet kundenseitige Änderungen vor und setzt sie erst nach der erforderlichen Freigabe um. Änderungen, die eine Markenentscheidung verlangen, bleiben zur Prüfung liegen. Wo das System ein Rollback unterstützt, sichert Beseam den vorherigen Stand.",
      },
      cadence: {
        question: "Wie oft prüft Beseam?",
        answer:
          "Nach dem ersten Scan läuft es weiter. Beseam stellt täglich eine wechselnde Auswahl Ihrer Kundenfragen erneut, damit eine Antwort, die sich ändert, sofort auffällt. Eine wöchentliche E-Mail sagt Ihnen, was sich bewegt hat, was auf Ihre Freigabe wartet und was als Nächstes zu beheben ist. Sie müssen sie nicht jeden Tag öffnen.",
      },
      measurement: {
        question: "Wie misst Beseam, ob eine Änderung geholfen hat?",
        answer:
          "Beseam stellt nach der Änderung dieselben Kundenfragen erneut und zeigt, ob die Antworten jetzt Ihren Shop nennen. Der Vorher-Nachher-Vergleich bleibt bei der Änderung, und Beseam behauptet nicht, die Änderung habe etwas bewirkt, was die Daten nicht belegen können.",
      },
    },
  },
};
