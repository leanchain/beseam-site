import type { Dictionary } from "./en";

/**
 * Swiss orthography: this file has no Eszett anywhere, and must not grow one.
 * Switzerland dropped the letter, and Beseam is Swiss -- the footer says so.
 * Every Eszett is written ss (Grösse, schliessen, heisst, grösser). A German
 * reader sees a Swiss spelling, not a mistake; do not "correct" these back.
 *
 * It is not free: ss is one character wider than Eszett, so any Eszett-bearing string
 * that sits in a measured or clipped box grew by a character when this rule
 * was applied. The measurements noted in the comments below already account
 * for it.
 */
export const de: Dictionary = {
  nav: {
    skipToContent: "Zum Inhalt springen",
    homeAriaLabel: "Beseam Startseite",
    primaryAriaLabel: "Hauptnavigation",
    mobileAriaLabel: "Mobile Navigation",
    openNavigation: "Navigation öffnen",
    closeNavigation: "Navigation schliessen",
    links: {
      platform: "Plattform",
      howWeWork: "So arbeiten wir",
      report: "KI-Shopping-Bericht",
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
  cookies: {
    ariaLabel: "Cookie-Auswahl",
    text: "Essenzielle Cookies halten die Website funktionsfähig. Optionale Analyse-Cookies werden erst geladen, wenn Sie zustimmen.",
    policy: "Datenschutzerklärung",
    reject: "Analyse ablehnen",
    accept: "Analyse akzeptieren",
  },
  notice: {
    text: "Diese Seite gibt es noch nicht auf Deutsch.",
    link: "Zur deutschen Startseite",
    dismiss: "Hinweis schliessen",
  },
  footer: {
    homeAriaLabel: "Beseam Startseite",
    tagline: {
      before: "Produkte leichter",
      highlight: "finden, wählen, kaufen",
    },
    description:
      "Beseam beobachtet fortlaufend die Kaufreise, findet, was sich zu verbessern lohnt, setzt genehmigte Änderungen um, wo dies unterstützt wird, und misst, was sich verändert hat.",
    groups: {
      product: {
        label: "Produkt",
        links: {
          platform: "Plattform",
          aiShoppingDiscovery: "KI-Shopping-Sichtbarkeit",
          compare: "Vergleich",
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
    privacy: "Datenschutzerklärung",
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
        "Beseam zeigt Ihnen, wo KI-Einkaufsassistenten Ihre Produkte auslassen, warum das passiert, was zu beheben ist und ob die Behebung funktioniert hat. Kostenloser Shop-Scan; kundenseitige Änderungen nur mit Ihrer Zustimmung.",
      imageAlt: "Beseam findet, behebt und misst E-Commerce-Wachstumschancen",
      schemaSoftwareDescription:
        "Beseam findet fortlaufend starke Wachstumschancen im E-Commerce, bereitet unterstützte Änderungen zur Freigabe durch die Marke vor, setzt freigegebene Änderungen um und misst, was sich danach verändert.",
      schemaFeatures: [
        "Erkennen, wo Kundschaft in der Produktsuche oder im Shop verloren gehen kann",
        "Wachstumschancen nach Belegen und erwarteter Wirkung priorisieren",
        "Vor kundenseitigen Änderungen die Freigabe der Marke einholen",
        "Mit Vorher-Nachher-Belegen messen, was sich verändert hat",
      ],
      schemaFaqName: "Fragen zu Beseam",
    },
    scan: {
      title: "Kostenloser Shop-Scan | Beseam",
      description:
        "Eine technische Auffindbarkeits-Analyse Ihres öffentlichen Shops: was Suchmaschinen und KI-Assistenten auf Ihren Produktseiten, in Ihren Katalogdaten und Ihren Website-Signalen sehen können – und was zuerst verbessert werden sollte. Keine Anmeldung, kein Shop-Zugriff nötig. Kein Keyword-Report.",
    },
  },

  // Der Akzent steht im Deutschen mitten im Satz, nicht am Ende: "einen
  // anderen" ist die Stelle, an der es wehtut. "Einen" und nicht "jemand":
  // gewählt wurde ein anderes Produkt, keine Person.
  hero: {
    headlineBefore: "Sehen Sie, warum die KI ",
    headlineAccent: "einen anderen",
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
            label: "Grösse & Passform",
            description:
              "Hinweise zu Passform und Grösse für die richtige Variante.",
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
        label: "Was Beseam tun kann",
        noLinkNote: "Verbundene Ergebnisse",
      },
    },
    feedsBefore: "Speist ",
    feedsBetween: " von ",
    // "Input: was X liest" läuft bei 1024px aus der Spalte (die Zeile bricht
    // nicht um). "Input für X" sagt dasselbe und bleibt kürzer als die
    // englische Zeile, deshalb bleibt `inputAfter` leer.
    inputBefore: "Input für ",
    inputAfter: "",
    platformLabel: "Plattform",
    platformQuestion: "Wofür entscheidet sich die Kundschaft?",
    explore: "Plattform ansehen",
    signalsUsed: "Genutzte Signale:",
    moreLabel: "+ mehr",
    moreDetail:
      "Immersive Produkterlebnisse, Marktplätze, Marken-Workflows und weitere spezialisierte Funktionen, sofern aktiviert.",
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
      getDiscovered: {
        name: "Gefunden werden",
        detail:
          "Sichtbarkeitslücken in KI und Suche finden und die Belege für die Auswahl stärken.",
      },
      productsChoose: {
        name: "Produkte leichter wählbar machen",
        detail:
          "Katalog, Produktseiten, Merchandising und entscheidungsrelevante Belege verbessern.",
      },
      fitSizing: {
        name: "Die richtige Passform finden",
        detail:
          "Grössenhilfe, Messung, Fit-Empfehlungen und produktspezifische Anpassungen nutzen.",
      },
      understandBehavior: {
        name: "Kundenverhalten verstehen",
        detail:
          "Analytics, Kaufreisen, Replay, Heatmaps, Suchverhalten und Conversion-Signale verbinden.",
      },
      personalizeTest: {
        name: "Personalisieren & testen",
        detail:
          "Suche, Empfehlungen, Merchandising und Experimente an den Kontext der Kundschaft anpassen.",
      },
      journeyHealth: {
        name: "Die Kaufreise stabil halten",
        detail:
          "Performance-Probleme, Frontend-Fehler, Incidents und Zuverlässigkeitsprobleme erkennen.",
      },
      creativeStudio: {
        name: "Content & Produktmedien erstellen",
        detail:
          "Produktcontent, kreative Assets, Bilder, Videos und reichhaltigere Produkterlebnisse vorbereiten.",
      },
      prioritizeMeasure: {
        name: "Priorisieren & Wirkung messen",
        detail:
          "Belege in eine priorisierte Änderungsliste überführen und Vorher/Nachher-Ergebnisse anhängen.",
      },
      campaigns: {
        name: "Kampagnen starten & verbessern",
        detail:
          "Google- und Meta-Kampagnen vorbereiten, veröffentlichen und messen, sofern aktiviert.",
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
          why: "Die Kundschaft öffnete die Grössentabelle, und die Passform über weiterer Kleidung bleibt im Entscheidungsmoment offen.",
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
    // Nicht "Studie": das deutsche Wort verspricht Design, Stichprobe und
    // Begutachtung. Dahinter steht ein wiederholter Benchmark-Lauf.
    eyebrow: "Neue Auswertung",
    // Geschütztes Leerzeichen vor dem Prozentzeichen: die Zeile ist einzeilig
    // und die Zahl darf nicht von ihrer Einheit getrennt umbrechen.
    finding: (share: number) =>
      `${share} % der Markennennungen entfielen auf nur einen KI-Assistenten.`,
    link: "Bericht & Methodik ansehen",
  },

  sections: {
    proof: {
      heading: "Sehen Sie, was der Entscheidung im Weg steht.",
      body: "Beseam sieht sich an, was die Kundschaft getan hat, prüft Produkt-, Such- und Bestandsdaten, schliesst schwächere Erklärungen aus und macht aus dem stärksten Befund eine konkrete Änderung.",
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
      heading: "Genannt zu werden heisst nicht, gewählt zu werden.",
      body: "Beseam verfolgt die Kundschaft von der Entdeckung bis zum Kauf, um zu finden, wo das Vertrauen sinkt, Fragen offen bleiben oder der Weg endet.",
      discovery: {
        buyingQuestion: "Kauffrage",
        example: "Beispiel",
        // 53 Zeichen, zwei mehr als das englische Original: DIN 5008 setzt ein
        // Leerzeichen vor das Euro-Zeichen, und "Grösse" ist schweizerisch
        // geschrieben. what-beseam-does.tsx zählt diese Zeichenkette selbst
        // und setzt Breite und Schrittzahl danach -- die Länge darf sich
        // also von der englischen unterscheiden.
        asked: "wasserdichte Jacke zum Pendeln, Grösse M, unter 200 €",
        parsed: {
          useCase: "Pendeln",
          material: "Wasserdicht",
          size: "Grösse M",
          price: "Unter 200 €",
        },
        andMore: "und sieben weitere, keine davon Ihre",
        verdict: "Ihr Shop: nicht genannt",
      },
      store: {
        breadcrumb: (product: string) => `Start / Jacken / ${product}`,
        reviews: "128 Bewertungen",
        size: "Grösse",
        addToCart: "In den Warenkorb",
        stock: "Auf Lager · Lieferung morgen",
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
          returnWindow: { question: "Rückgabefrist", answer: "30 Tage" },
        },
        verdict: "Zwei Fragen offen",
      },
      personalization: {
        forThisShopper: "Für diese Person",
        wants: {
          waterproof: "wasserdicht",
          size: "Grösse M",
          commuting: "Pendeln",
        },
        addedToCart: "Hinzugefügt",
        twoAdded: "Zwei ergänzt",
        added: {
          breathable: "3-Lagen-Shell, Unterarmbelüftung",
          suitJacket: "Normale Passform, grösser",
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
        note: "Und Schritt 05 prüft denselben Weg, an dem er begonnen hat (KI-Nennungen, Produktbesuche, Warenkorb), damit eine Änderung an dem Zustand gemessen wird, den sie verändert hat.",
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
        question: "Grösste Uneinigkeit",
        solo: "Marken, nur ein Assistent",
      },
      outOf: (total: number) => ` von ${total}`,
    },

    actions: {
      heading: "Beseam findet, was als Nächstes zu verbessern ist.",
    },

    system: {
      eyebrow: "Ein verbundenes Bild",
      heading: "Ein Problem. Alle Belege dahinter.",
      body: "Eine verpasste Empfehlung, zögernde Kundschaft oder ein verlorener Verkauf lässt sich selten mit nur einem Tool erklären. Beseam verbindet KI-Entdeckung, Ihren Shop, das Verhalten der Kundschaft und die Ergebnisse, damit die nächste Änderung mit dem vollständigen Bild beginnt.",
      compact: {
        inputs: [
          "KI & Suche",
          "Produkt & Shop",
          "Kundenverhalten",
          "Bestellungen & Umsatz",
        ],
        center: "Beseam verbindet die Belege",
        outputs: [
          "Was ist passiert?",
          "Was steht im Weg?",
          "Was sollte sich ändern?",
          "Hat es funktioniert?",
        ],
        link: "Plattform ansehen",
      },
    },

    impact: {
      heading: "Es zählt nur, wenn sich das Ergebnis bewegt.",
      body: "Nach einer Änderung stellt Beseam dieselben Kundenfragen erneut und zeigt, ob die Antworten jetzt Ihren Shop nennen.",
    },

    promise: {
      headingLine1: "Kostenlos starten.",
      headingLine2: "Bezahlen, wenn die Wirkung messbar ist.",
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
      scanVsBeseam: {
        question:
          "Was ist der Unterschied zwischen dem kostenlosen Scan und Beseam?",
        answer:
          "Der kostenlose Scan ist eine einmalige Prüfung Ihres öffentlichen Shops. Beseam arbeitet danach weiter: Es verbindet die relevanten Signale, findet, was Aufmerksamkeit verdient, bereitet Änderungen vor, setzt unterstützte Änderungen nach Freigabe um und prüft anschliessend, was passiert ist.",
      },
      watch: {
        question: "Was beobachtet Beseam eigentlich?",
        answer:
          "Je nach Anbindung kann Beseam KI- und Suchsichtbarkeit, Katalog- und Shopdaten, Kundenverhalten, Passform, Experimente, Zuverlässigkeit, Kampagnen, Conversion, Bestellungen und Umsatz nutzen. Sie brauchen nicht jede Quelle; Beseam nutzt die Belege, die für das untersuchte Problem relevant sind.",
      },
      priority: {
        question: "Wie entscheidet Beseam, was zuerst Aufmerksamkeit verdient?",
        answer:
          "Beseam bringt die Belege zu einem Problem an einen Ort, trennt beobachtete Fakten von möglichen Erklärungen und berücksichtigt unter anderem Belegstärke, betroffene Produkte oder Kaufreisen, Geschäftskontext, Aufwand und Risiko. Die Begründung für die Priorität bleibt mit der Arbeit verbunden.",
      },
      changes: {
        question: "Was kann Beseam tatsächlich ändern?",
        answer:
          "Wo das angebundene System es unterstützt, kann Beseam Änderungen an Produktdaten, Inhalten, Merchandising, Shop-Suche, Empfehlungen und Personalisierung, Passform- und Grössenerlebnissen, Experimenten, kreativen Assets, Kampagnen und anderen bearbeitbaren Teilen der Kaufreise vorbereiten oder umsetzen. Kundenseitige Änderungen folgen Ihren Freigaberegeln.",
      },
      alongside: {
        question:
          "Ersetzt Beseam meine Analyse-, Personalisierungs- oder Monitoring-Tools?",
        answer:
          "Nicht unbedingt. Bestehende Tools können spezialisierte Belegquellen bleiben. Beseam verbindet relevante Signale rund um dasselbe Produkt, dieselbe Kundenfrage, Kaufreise oder dasselbe Geschäftsproblem, macht aus den stärksten Befunden konkrete Arbeit und hält das Ergebnis damit verbunden. Welche Integrationen verfügbar sind, hängt von Ihrem Setup ab.",
      },
      approval: {
        question: "Was braucht eine Freigabe, bevor es live geht?",
        answer:
          "Sie legen die Regeln fest. Beseam kann weiter prüfen, Belege sammeln und Arbeit vorbereiten, ohne auf Sie zu warten. Kundenseitige Änderungen, die eine Freigabe erfordern, gehen jedoch erst danach live. Änderungen, die Markenurteil brauchen, bleiben zur Prüfung liegen.",
      },
      measurement: {
        question: "Wie erkennt Beseam, ob eine Änderung funktioniert hat?",
        answer:
          "Beseam prüft das Signal erneut, das das Problem sichtbar gemacht hat. Das kann dieselbe KI-Kauffrage, eine Shop- oder Zuverlässigkeitsprüfung, Kundenverhalten, ein Experiment, Kampagnenleistung, Conversion, Bestellungen oder Umsatz sein. Der Vorher-Nachher-Vergleich bleibt bei der Änderung, und beobachtete Bewegung bleibt getrennt von Kausalität, die die Daten nicht belegen können.",
      },
      connect: {
        question: "Was muss ich verbinden, um zu starten?",
        answer:
          "Beginnen Sie mit Ihrer Domain. Für die laufende Arbeit verbinden Sie zuerst den Shop und ergänzen Analyse-, Verhaltens-, Such-, Kampagnen-, Kunden- oder Umsatzdaten nur dann, wenn sie helfen, ein Problem zu erklären, eine freigegebene Änderung umzusetzen oder das Ergebnis zu messen.",
      },
    },
  },

  answerCheck: {
    steps: {
      labels: {
        storefront: "Ihr Shop wird gelesen",
        catalog: "Produkte und Preise werden geprüft",
        pages: "Ihre Produktseiten werden geprüft",
        questions: "Mögliche Kundenfragen werden formuliert",
        answers: "Ihre Produkte in der KI-Suche werden geprüft",
      },
      technical: (position: number, total: number) =>
        `Ihr Shop wird gescannt · Schritt ${position} von ${total}`,
      readingDomain: (domain: string) => `${domain} wird gelesen`,
      readingStorefront: "Ihr Shop wird gelesen",
      resultsAsTheyArrive:
        "Nützliche Befunde erscheinen, sobald sie bereit sind. Sie müssen nicht auf alles warten.",
      questionsLater:
        "Dieser erste Scan ist die Momentaufnahme. In Beseam laufen die Prüfungen danach weiter.",
      quickEstimate: "Erste Ergebnisse erscheinen normalerweise in weniger als einer Minute.",
      fullAuditRunning: "Vollständige Analyse läuft",
      fullAuditEstimate: "Nach der Bestätigung normalerweise 2–5 Minuten.",
      progressDetails: "Scan-Fortschritt anzeigen",
      currentStep: "Jetzt",
      progress: (done: number, total: number) => `${done} von ${total}`,
      productsFound: (count: number) =>
        `${count} ${count === 1 ? "Produkt" : "Produkte"} gefunden`,
      pagesAnalyzed: (count: number) =>
        `${count} ${count === 1 ? "Produktseite" : "Produktseiten"} analysiert`,
      pagesProgress: (done: number, total: number) =>
        `${done} von ${total} Produktseiten bisher analysiert`,
      pagesFinishing:
        "Ihre Produkte und Preise stehen bereits unten, während diese Prüfung abgeschlossen wird",
      pagesFailed:
        "Diese Seiten konnten bei diesem Durchlauf nicht vollständig gelesen werden",
      questionsWritten: (count: number) =>
        `${count} ${count === 1 ? "Frage" : "Fragen"} formuliert`,
      questionsFromProducts: "Aus den gefundenen Produkten formuliert",
      confirmEmail: (channels: string) =>
        `Bestätigen Sie Ihre E-Mail, dann fahren wir mit ${channels} fort`,
      askingChannels: (channels: string) => `${channels} werden befragt`,
    },
    result: {
      productsFound: "Produkte geprüft",
      productPagesSampled: "Produktseiten stichprobenartig geprüft",
      answersNamed: "verwertbare KI-Antworten nannten Sie",
      answersPending: "KI-Antworten stehen aus",
      opportunitiesFound: (count: number) =>
        count === 1 ? "Chance gefunden" : "Chancen gefunden",
      prioritiesFound: (count: number) =>
        count === 1 ? "Priorität" : "Prioritäten",
      supportingFindings: (count: number) =>
        count === 1 ? "stützender Befund" : "stützende Befunde",
      statusRejected: "Dieser Shop konnte nicht gelesen werden",
      statusRunning: "Läuft noch",
      statusFreeReady: "Kostenloser Scan bereit",
      statusFailed: "Analyse unvollständig",
      statusComplete: "Scan abgeschlossen",
      shareAria: "Diesen Scan teilen",
      moreActions: "Weitere Berichtsaktionen",
      linkCopied: "Link kopiert",
      shared: "Geteilt",
      copyFailed: "Kopieren fehlgeschlagen",
      share: "Teilen",
      print: "Drucken",
      brandAppearance: "KI-Sichtbarkeit",
      strong: "Stark",
      mixed: "Gemischt",
      weak: "Schwach",
      barelyVisible: "In dieser Stichprobe nicht gesehen",
      brandEverywhere: "Ihre Marke erschien in jeder beobachteten Antwort.",
      brandNowhere: "Ihre Marke erschien in keiner beobachteten Antwort.",
      brandMissing: (missed: number, total: number) =>
        `Ihre Marke fehlte in ${missed} von ${total} beobachteten Antworten.`,
      frequentAlternative: "Häufigste Alternative:",
      byAssistant: "Nach Assistent",
      assistants: (count: number) =>
        `${count} ${count === 1 ? "Assistent" : "Assistenten"}`,
      namedYou: "nannte Sie",
      noAnswer: "keine Antwort",
      didNotNameYou: "nannte Sie nicht",
      noImage: "Kein Bild",
      yours: "Ihr Produkt",
      merchant: "Händler",
      assistant: "Assistent",
      commerceStorefront: "Commerce-Shop",
      storefront: "Shop",
      openProduct: "Produkt öffnen →",
      details: "Details",
      close: "Schliessen",
      headlineAll: (brand: string, total: number) =>
        `${brand} wurde in allen ${total} verwertbaren geprüften KI-Antworten genannt.`,
      headlineNone: (brand: string, total: number) =>
        `${brand} wurde in keiner der ${total} verwertbaren geprüften KI-Antworten genannt.`,
      headlineMissed: (brand: string, missed: number, total: number) =>
        `${brand} fehlte in ${missed} von ${total} verwertbaren geprüften KI-Antworten.`,
      headlineFindings: (brand: string, count: number) =>
        `Wir haben den öffentlichen Shop von ${brand} gelesen und ${count} ${count === 1 ? "Chance" : "Chancen"} gefunden, die sich anzusehen lohnen.`,
      headlinePriorities: (brand: string, count: number) =>
        `${count} ${count === 1 ? "Punkt lohnt sich" : "Punkte lohnen sich"} bei ${brand} zuerst zu beheben.`,
      prioritySupport: (count: number) =>
        count > 0
          ? `Wir würden hier anfangen. ${count} ${count === 1 ? "weiterer Befund bleibt" : "weitere Befunde bleiben"} unten als stützender Nachweis.`
          : "Wir würden hier anfangen. Der Nachweis unten zeigt, warum jeder Punkt wichtig ist.",
      headlineReading: (brand: string) =>
        `Der Shop von ${brand} wird gerade gelesen.`,
      headlineClear: (brand: string) =>
        `Auf den lesbaren Seiten von ${brand} ist nichts Offensichtliches aufgefallen.`,
      sampledSupport:
        "Das sind Momentaufnahmen, keine Rangliste. Verwertbare Antworten und Versuche ohne Antwort werden unten getrennt gezeigt.",
      moreMayFollow:
        "Weitere Befunde können folgen, während Ihre Produktseiten fertig gelesen werden.",
      findingsSupport:
        "Jeder Punkt steht unten in klaren Worten, mit den Belegen direkt darunter.",
      readingSupport:
        "Die Ergebnisse erscheinen unten, sobald ein Teil abgeschlossen ist.",
      clearSupport:
        "Das ist ein gutes Zeichen, aber ein öffentlicher Scan weniger Seiten kann nicht alles ausschliessen.",
    },
    findings: {
      priorityFirst: "Zuerst sinnvoll",
      priorityLook: "Einen Blick wert",
      priorityMinor: "Klein",
      areas: {
        discovery: "Gefunden werden",
        listing: "Wie Ihre Produkte gelistet sind",
        page: "Was die Produktseite der Kundschaft sagt",
        trust: "Vertrauen und Sicherheit",
        markets: "Märkte und Sprachen",
        searchStructured: "Suche & strukturierte Daten",
        internationalization: "Internationalisierung",
        trustDelivery: "Vertrauen & Auslieferung",
        machineReadability: "Maschinenlesbarkeit",
        productEvidence: "Produktbelege",
      },
      recommendation: "Nachweis & nächsten Schritt ansehen",
      close: "Schliessen",
      improveNext: "Als Nächstes:",
      startFixing: "In Beseam weiterbearbeiten",
      evidence: "Nachweis",
      proofObserved: "Beobachtet",
      proofInput: "Verwendete Eingabe",
      proofExpected: "Erwartet",
      proofSource: "Gelesen aus",
      proofRecommendation: "Empfehlung",
      proofSourceLabel: (source: string) =>
        ({
          rendered_page: "der gerenderten öffentlichen Seite",
          http_response_headers: "den HTTP-Antwort-Headern",
          html_source: "dem HTML-Seitenquelltext",
          catalog_record: "dem Katalogdatensatz",
          platform_api: "einer Plattform-API-Antwort",
          feed_export: "dem exportierten Feed",
          sitemap: "der Sitemap",
          robots_txt: "robots.txt",
          serp_result: "einem Suchergebnis",
          ai_channel_answer: "einer KI-Assistenten-Antwort",
          crawl_metadata: "Crawl-Metadaten",
          derived: "mehreren beobachteten Eingaben",
          declared: "vom Händler bereitgestellten Daten",
        })[source] ?? source.replaceAll("_", " "),
      proofInputLabel: (label: string) =>
        ({
          acao: "Access-Control-Allow-Origin",
          acac: "Access-Control-Allow-Credentials",
          acam: "Access-Control-Allow-Methods",
          acah: "Access-Control-Allow-Headers",
          found_types: "Erkannte Zugangsdaten-Muster",
          redacted_matches: "Durchsuchbares Quellmuster",
          source_locations: "Position im Quelltext",
          cache_control: "Cache-Control",
          pragma: "Pragma",
          insecure_ws: "Unsichere WebSocket-URLs",
        })[label] ?? label.replaceAll("_", " "),
      checks: (count: number) => `${count} Prüfungen`,
      moreSampledPages: (count: number) =>
        `+ ${count} weitere ${count === 1 ? "Stichprobenseite" : "Stichprobenseiten"}`,
      moreProofChecks: (count: number) =>
        `${count} weitere ${count === 1 ? "Prüfung" : "Prüfungen"} ansehen`,
      productsSeenOn: "Bei diesen Produkten gesehen",
      seePage: "Seite ansehen →",
      rawCatalog: "Gelesene Roh-Katalogdatei →",
      fullPageReport: "Vollständigen Seitenbericht öffnen →",
      heading: "Diese zuerst beheben",
      intro:
        "Mit diesen Prioritäten würden wir beginnen. Öffnen Sie einen Punkt für den Nachweis und den nächsten Schritt.",
      stillReading: "Wird noch gelesen.",
      moreMayAppear:
        " Weitere Befunde können erscheinen, während Ihre Produktseiten fertig werden.",
      showOther: (count: number) =>
        `${count} stützende ${count === 1 ? "Befund" : "Befunde"} anzeigen`,
      readingPages: "Ihre Produktseiten werden noch gelesen.",
      aiVisibilityTitle: "Sichtbarkeit bei KI-Shopping",
      aiVisibilityAllMissed: (count: number) =>
        `Ihre Marke fehlte in allen ${count} verwertbaren KI-Shopping-${count === 1 ? "Antwort" : "Antworten"}.`,
      aiVisibilitySomeMissed: (missed: number, total: number) =>
        `Ihre Marke fehlte in ${missed} von ${total} verwertbaren KI-Shopping-Antworten.`,
      aiVisibilityWhy:
        "Wenn ein Assistent eine Kauffrage beantwortet, ohne Sie zu nennen, kann die Kundschaft schon vor dem Besuch Ihres Shops zu Alternativen gelenkt werden.",
      aiVisibilityNext:
        "Öffnen Sie unten die Fragen, um zu sehen, was gefragt wurde, welche Assistenten eine verwertbare Antwort lieferten, wen sie stattdessen nannten und welche Produktbelege Sie zuerst stärken sollten.",
      aiVisibilityAttempts: (usable: number, total: number) =>
        `${usable} von ${total} Assistenten-Versuchen lieferten eine verwertbare Antwort.`,
      aiVisibilityRivals: (names: string) => `Genannte Alternativen: ${names}.`,
      discoveryFiles: {
        llms: "Eine kurze Zusammenfassung Ihres Shops für KI-Assistenten, die danach suchen. Optional.",
        agents:
          "Hinweise für KI-Agenten, die Ihren Shop im Auftrag von Kundinnen und Kunden durchsuchen. Optional.",
        skill:
          "Beschreibt in einem Format, das einige KI-Werkzeuge lesen, was ein Assistent in Ihrem Shop tun kann. Sehr neu und optional. Überspringen Sie dies, sofern Sie nicht bereits mit KI-Agenten arbeiten.",
        ucp: "Eine maschinenlesbare Beschreibung Ihres Shops für Commerce-Agenten. Optional.",
      },
    },
    boundary: {
      heading: "Wo dieser Scan endet",
      intro:
        "Ein öffentlicher Scan reicht nur bis zu einem gewissen Punkt. Hier sehen Sie genau, wie weit er ging und was danach weiterläuft.",
      did: "Was dieser Scan getan hat",
      didPublic:
        "Ihren öffentlichen Shop so gelesen, wie es jeder Besucher kann: ohne Anmeldung und ohne Shop-Zugriff.",
      didPages: (count: number) =>
        `Die Seitenprüfungen auf ${count} ${count === 1 ? "Produktseite" : "Produktseiten"} ausgeführt, plus robots.txt, Sitemap und Crawler-Zugriff.`,
      didPagesSample:
        "Die Seitenprüfungen auf einer Stichprobe Ihrer Produktseiten ausgeführt, plus robots.txt, Sitemap und Crawler-Zugriff.",
      didCatalog:
        "Ihre Katalogdaten mit dem verglichen, was jede Seite tatsächlich ausgibt: Namen, Preise und Verfügbarkeit.",
      not: "Was er nicht getan hat",
      notKeepAsking:
        "Nicht weiter gefragt. Die KI-Antworten oben wurden bei diesem Durchlauf einmalig erhoben.",
      notAskLive:
        "ChatGPT oder Google AI Mode nicht live zu Ihren Produkten befragt. Hier ist keine fortlaufende KI-Antwort enthalten.",
      notRepeat:
        "Nicht selbstständig wiederholt. Hinter einem öffentlichen Scan steht kein Zeitplan.",
      notHistory:
        "Keine Historie geführt. Es gibt keinen früheren Durchlauf zum Vergleichen.",
      next: "Was in Beseam beginnt",
      nextItems: [
        "Kundenfragen, die Sie lesen und bearbeiten, bevor eine davon läuft.",
        "Diese Fragen nach Zeitplan statt nur einmal stellen.",
        "Die Antworten mit Datum als Beleg aufbewahren.",
        "Behebungen danach ordnen, was sich zuerst lohnt.",
        "Dieselben Fragen nach einer Änderung erneut stellen, damit Sie sehen, was sich bewegt hat.",
      ],
    },
    continue: {
      opportunities: (count: number) =>
        count === 0
          ? "Keine offensichtliche Lücke in dieser Momentaufnahme"
          : `${count} ${count === 1 ? "Chance" : "Chancen"} gefunden`,
      nextLabel: "In Beseam fortfahren",
      once: (count: number) =>
        count === 0
          ? "Dieser Scan ist eine Momentaufnahme. Beseam beobachtet weiter, was sich verändert."
          : "Dieser Scan hat die Lücken gefunden. Beseam arbeitet daran weiter.",
      body: "Nehmen Sie diesen Shop direkt mit in Beseam. Lassen Sie Discovery- und Shop-Prüfungen weiterlaufen, machen Sie aus den stärksten Befunden vorbereitete Änderungen, geben Sie kundenseitige Änderungen zuerst frei und prüfen Sie danach erneut, was sich bewegt hat.",
      benefits: [
        "Denselben Shop weiter beobachten",
        "Befunde in vorbereitete Änderungen verwandeln",
        "Zuerst freigeben, danach erneut messen",
      ],
      prepared: "Von Beseam vorbereitet",
      approval: "Braucht Ihre Freigabe",
      afterConnection: "Nach Verbindung geprüft",
      start: "Diesen Shop weiter beobachten",
      mobileStart: "Diese Punkte beobachten",
      carryStore: (domain: string) =>
        `${domain} wird in die Einrichtung übernommen. Sie starten nicht von vorn.`,
      closingEyebrow: "Nächster Schritt",
      closingTitle: (count: number) =>
        count === 1
          ? "Lassen Sie Beseam diese Priorität weiter beobachten."
          : `Lassen Sie Beseam diese ${count} Prioritäten weiter beobachten.`,
      closingBody:
        "Beseam prüft den Shop weiter, bereitet Änderungen zur Freigabe vor und zeigt, was sich nach jeder Änderung verbessert hat.",
      reviewWithFinding: "Möchten Sie das lieber gemeinsam mit uns durchgehen?",
      reviewWithoutFinding:
        "Möchten Sie das lieber gemeinsam mit uns durchgehen?",
      startingWith: (headline: string) => `Ausgehend von „${headline}“`,
      reviewBody:
        "In 20 Minuten nutzen wir einen Befund aus diesem Scan und zeigen den vollständigen Kreislauf an Ihrem Shop: Beleg, vorgeschlagene Änderung, Freigabe und erneute Prüfung.",
      reviewCta: "20-minütige Shop-Durchsprache buchen",
    },
    visibility: {
      googleSearch: "Google-Suche:",
      excerpt: "Auszug der Antwort · nicht die vollständige Antwort",
      unreachable: (channel: string, error: string) =>
        `${channel} war nicht erreichbar: ${error}`,
      noWrittenAnswer: (channel: string) =>
        `${channel} lieferte für diese Frage keine schriftliche Antwort.`,
      namedYou: "Nannte Sie",
      didNotNameYou: "Nannte Sie nicht",
      noVerdict: "Kein Ergebnis",
      namedInstead: "stattdessen genannt:",
      productsSurfaced: "Produkte, die der Kundschaft gezeigt wurden",
      noProducts: "Es wurden keine Produkte gezeigt",
      addsUpTo: "Was daraus folgt",
      noUsableAnswer: "Kein Assistent lieferte hier eine verwertbare Antwort.",
      verdictAll: (count: number) =>
        count === 1
          ? "Der befragte Assistent nannte Sie bei dieser Frage."
          : `Alle ${count} befragten Assistenten nannten Sie bei dieser Frage.`,
      verdictNone: (count: number, rivals: string) =>
        `Keiner der ${count} befragten ${count === 1 ? "Assistenten" : "Assistenten"} nannte Sie bei dieser Frage.${rivals}`,
      verdictSome: (named: number, count: number, rivals: string) =>
        `${named} von ${count} befragten Assistenten nannten Sie.${rivals}`,
      rivalsTail: (names: string, count: number) =>
        ` Stattdessen ${count === 1 ? "wurde" : "wurden"} ${names} vorgeschlagen.`,
      askedOne: "separat an 1 Assistenten gestellt",
      askedMany: (count: number) =>
        `separat an jeden von ${count} Assistenten gestellt`,
      title: "Wie KI-Shopping-Assistenten Sie sehen",
      summary: (named: number, total: number, questions: number) =>
        `${named === 0 ? `Keine der ${total}` : named === total ? `Alle ${total}` : `${named} von ${total}`} verwertbaren KI-Shopping-${total === 1 ? "Antworten nannte" : "Antworten nannten"} Sie · ${questions} ${questions === 1 ? "Kauffrage" : "Kauffragen"}`,
      summaryWithAttempts: (
        named: number,
        usable: number,
        attempts: number,
        questions: number,
      ) =>
        `${named === 0 ? `Keine der ${usable}` : named === usable ? `Alle ${usable}` : `${named} von ${usable}`} verwertbaren KI-Shopping-${usable === 1 ? "Antworten nannte" : "Antworten nannten"} Sie · ${attempts} Versuche über ${questions} ${questions === 1 ? "Kauffrage" : "Kauffragen"}`,
      usableAttempts: (usable: number, total: number) =>
        `${usable} von ${total} Versuchen lieferten eine verwertbare Antwort`,
      noUsableAttempts: (total: number) =>
        `${total} ${total === 1 ? "Versuch" : "Versuche"} · keine verwertbare Antwort`,
      noUsableSummary: (attempts: number, questions: number) =>
        `0/${attempts} Assistenten-Versuche lieferten eine verwertbare Antwort · ${questions} ${questions === 1 ? "Kauffrage" : "Kauffragen"}`,
      checking: "Es wird geprüft, was der Kundschaft gezeigt wird",
      competitors: "Konkurrenten, die genannt wurden, wenn Sie es nicht wurden",
      assistantEvidence: "Assistenten-Belege ansehen",
      openQuestion:
        "Öffnen Sie eine Frage, um die Antwort jedes Assistenten zu sehen",
      askedIn: (language: string) => `Gefragt auf ${language}`,
    },
    summary: {
      evidenceHeading: "Stützende Nachweise",
      evidenceIntro:
        "Die Prioritäten stehen bereits oben. Öffnen Sie diese Bereiche nur, wenn Sie nachvollziehen möchten, wie wir zu ihnen gekommen sind.",
      productCatalog: "Produktkatalog",
      noCatalogBrandSite:
        "Kein Produktkatalog gefunden. Als Markenwebsite geprüft.",
      homepage: "Ihre Startseite",
      homepageGated:
        "Bestätigen Sie Ihre E-Mail; dann lesen wir Ihre Startseite genau",
      homepageReading: "Startseite und Vertrauensseiten werden jetzt gelesen",
      homepageFailed:
        "Wir konnten Ihre Startseite bei diesem Durchlauf nicht lesen.",
      homepageCompleted: "Startseitenprüfung abgeschlossen",
      homepageSummary: (_score: number, failed: number, _total: number) =>
        `Startseite geprüft · ${failed ? "Punkte zum Prüfen gefunden" : "keine offensichtlichen Probleme gefunden"}`,
      trustPages: "Vertrauensseiten",
      aboutPage: "Über-uns-Seite",
      contactPage: "Kontaktseite",
      pageCouldNotRead:
        "Wir konnten diese Seite bei diesem Durchlauf nicht lesen.",
      openFullReport: "Vollständigen Bericht öffnen",
      store: "Shop",
      catalog: "Katalog",
      productPages: "Produktseiten",
      collectionPageAudits: "Kollektionsseiten",
      collectionPagesGated: (count: number) =>
        `Bis zu ${count} repräsentative ${count === 1 ? "Kollektionsseite" : "Kollektionsseiten"} · nach E-Mail-Bestätigung`,
      collectionPagesReading:
        "Repräsentative Kollektionsseiten werden jetzt gelesen",
      collectionPagesUnavailable:
        "Bei diesem Durchlauf war keine repräsentative Kollektionsseite für eine genaue Prüfung verfügbar.",
      contentPageAudits: "Redaktion & Inhalte",
      contentPagesGated: (count: number) =>
        `Bis zu ${count} repräsentative Inhalts${count === 1 ? "seite" : "seiten"} · nach E-Mail-Bestätigung`,
      contentPagesReading:
        "Repräsentative redaktionelle und Inhaltsseiten werden jetzt gelesen",
      contentPagesUnavailable:
        "Bei diesem Durchlauf war keine repräsentative redaktionelle/Inhaltsseite für eine genaue Prüfung verfügbar.",
      sampledPageGroupSummary: (
        pages: number,
        failed: number,
        _evaluated: number,
        unreadable: number,
      ) =>
        `${pages} ${pages === 1 ? "Seite" : "Seiten"} geprüft · ${failed ? "Probleme gefunden" : "keine offensichtlichen Probleme gefunden"}${unreadable ? ` · ${unreadable} nicht lesbar` : ""}`,
      templatePatterns: "Auf mehreren geprüften Seiten wiederholt",
      templatePatternCoverage: (affected: number, total: number) =>
        `${affected}/${total} geprüfte Seiten`,
      templatePatternHint:
        "Da dies auf mehreren Seiten desselben Typs auftritt, kann die gemeinsame Vorlage statt nur einer einzelnen Seite die Ursache sein.",
      pdpLayoutCoverage: "PDP-Layout-Abdeckung",
      pdpLayoutCoverageSummary: (
        detected: number,
        covered: number,
        audits: number,
      ) =>
        `${detected} ${detected === 1 ? "Layout" : "Layouts"} erkannt · ${covered} in ${audits} ${audits === 1 ? "Prüfung" : "Prüfungen"} vertreten`,
      pdpLayoutsAllCovered: "Alle erkannten Layouts vertreten",
      pdpLayoutsPartiallyCovered: (covered: number, detected: number) =>
        `${covered} von ${detected} erkannten Layouts vertreten`,
      pdpLayoutAuditCount: (count: number) => `${count} geprüft`,
      pdpLayoutObservedCount: (count: number) =>
        `${count} passende ${count === 1 ? "PDP-Kandidatenseite" : "PDP-Kandidatenseiten"}`,
      pdpLayoutPublicTemplate: "Template-Schlüssel öffentlich erkennbar",
      pdpLayoutStructural: "aus der Seitenstruktur erkannt",
      pdpLayoutSampleNote: (count: number) =>
        `Aus ${count} öffentlichen PDPs erkannt. Dies ist eine repräsentative Stichprobe, kein vollständiges Theme-/Template-Inventar.`,
      sampledPageGroupGatedBody:
        "Wir prüfen einige repräsentative Seiten statt jede URL zu crawlen. So bleibt der Scan schnell und prüft trotzdem die Vorlagen, die Käufer und Assistenten tatsächlich sehen.",
      publicFootprint: "Öffentliche Präsenz",
      localePaths: "Sprachpfade",
      domains: "Domains",
      whatExists: "Was vorhanden ist",
      discoverable: "Kann es gefunden werden?",
      productPagesLabel: "Produktseiten",
      collections: "Kollektionen",
      collectionUrls: "Kollektions-URLs",
      pages: "Seiten",
      articles: "Artikel",
      blogs: "Blogs",
      policies: "Richtlinien",
      localeCopies: "Lokalisierte URL-Kopien",
      searchPageSignals: "Suche & Seitensignale",
      productShoppingData: "Produkt- & Shoppingdaten",
      contentMerchandising: "Inhalt & Merchandising",
      trustConfidence: "Vertrauen & Kaufsicherheit",
      marketsLocalization: "Märkte & Lokalisierung",
      technicalSecurity: "Technik & Sicherheit",
      notMeasured: "Nicht gemessen",
      readable: "Lesbar",
      open: "Offen",
      unavailable: "Nicht verfügbar",
      found: "Gefunden",
      declared: "Deklariert",
      notFound: "Nicht gefunden",
      blocked: (count: number) => `${count} blockiert`,
      quickNotMeasured: "Im Schnellscan nicht gemessen",
      primary: "Primär",
      primaryStorefront: "Primärer Shop",
      platformUnknown: "Plattform unbekannt",
      publicUrls: "Öffentliche URLs gefunden",
      productsSampled: (count: number) =>
        `${count} Produkte stichprobenartig geprüft`,
      localePathCount: (count: number) => `${count} Sprachpfade`,
      storeSummary: (
        products: string,
        _collections: string,
        _location: string,
        sitemap: string,
        crawler: string,
      ) =>
        `${products} Produkte gefunden · Sitemap ${sitemap} · Such-Crawler-Zugriff ${crawler}`,
      internalReachSummary: (
        links: number,
        products: number,
        collections: number,
      ) =>
        `${links} Homepage-Links · ${products} Produktlinks · ${collections} Kollektionslinks`,
      pageAuditSummary: (
        pages: number,
        failed: number,
        _evaluated: number,
        _unchecked: number,
      ) =>
        `${pages} ${pages === 1 ? "Produktseite" : "Produktseiten"} geprüft · ${failed ? "Probleme gefunden" : "keine offensichtlichen Probleme gefunden"}`,
      localizedCopies: (count: number) => `${count}+ lokalisierte URL-Kopien`,
      robots: "robots.txt",
      sitemap: "Sitemap",
      searchCrawlers: "Such-Crawler",
      assistantCrawlers: "KI-Crawler",
      blockedUrls: "Durch robots.txt blockierte URLs",
      internalReach: "Interne Erreichbarkeit",
      orphanProducts: "Verwaiste Produkte",
      discoveryFiles: "Discovery-Dateien",
      sitemapFreshness: "Sitemap-Aktualität",
      sitemapImages: "Bilder in der Sitemap",
      allowed: (allowed: number, total: number) =>
        `${allowed}/${total} zugelassen`,
      noDates: "Keine Datumsangaben vorhanden",
      noImages: "Keine Bildeinträge vorhanden",
      lowerBounds:
        "Werte mit + sind Untergrenzen, weil das schnelle URL-Inventar die Grenze von 5'000 URLs erreicht hat.",
      homepageSample:
        "Homepage-Pfade werden hier nur stichprobenartig geprüft. Echte Abdeckung verwaister Seiten braucht den vollständigen internen Linkgraphen.",
      emergingFiles: (present: number, total: number) =>
        `Diese vier Dateien sind neue Konventionen, um KI-Assistenten mitzuteilen, was Ihr Shop ist und wie er genutzt werden kann. ${present} von ${total} sind veröffentlicht. Keine davon ist erforderlich, keine ist heute nachweislich ein Rankingfaktor, und eine fehlende Datei ist kein Fehler. Wir zeigen sie, weil veröffentlichende Shops für Assistenten leichter korrekt zu lesen sind, nicht weil Sie ohne sie etwas falsch machen.`,
      catalogQuestion: "Können Produkte verstanden und unterschieden werden?",
      countsChecked: "die Werte unten beziehen sich auf die geprüften Produkte",
      withGap: (count: number) =>
        `${count} Produkte mit mindestens einer Lücke`,
      catalogSummary: (
        checked: string,
        gaps: number,
        unavailable: number,
        _consistency: number,
      ) =>
        `${checked} · ${gaps} haben mindestens eine Kataloglücke · ${unavailable} derzeit nicht verfügbar`,
      catalogGaps: (count: number) =>
        `${count} ${count === 1 ? "Kataloglücke" : "Kataloglücken"}`,
      productTypes: (count: number) => `${count} Produkttypen`,
      categories: "Kategorien & Kollektionen",
      withoutCategory: "ohne Kategorie",
      withoutTags: "ohne Tags",
      membership: "Kollektionszugehörigkeit:",
      commonTypes: "Häufige Produkttypen:",
      collectionsList: "Kollektionen:",
      identity: "Produktidentität",
      withoutId: "ohne SKU/Barcode",
      brandVendorGaps: "Marken-/Herstellerlücken",
      idConflicts: "Identifikator-Konflikte",
      variants: "Varianten & Kaufoptionen",
      withVariants: "Produkte mit Varianten",
      noBuyerOptions: "zeigen keine Kaufoptionen",
      variantOptionGaps: "echte Variantenoptionslücken",
      variantIdGaps: "Varianten-ID-Lücken",
      options: "Optionen:",
      productInfo: "Produktinformationen",
      wellDescribed: "gut beschrieben",
      missingDescriptions: "fehlende Beschreibungen",
      thin: "dünn",
      withoutImages: "ohne Bilder",
      duplicateCopy: "doppelte Texte",
      availability: "Verfügbarkeit",
      unavailableProducts: "nicht verfügbare Produkte",
      variantsAcross: "Varianten über",
      checkedProducts: "geprüfte Produkte",
      consistency: "Produktkonsistenz",
      comparingPages: "Beispiel-Produktseiten werden verglichen…",
      sampledGaps: "Stichproben-Lücken",
      consistencyBody: (pages: number) =>
        `Katalog ↔ Seitendaten für Preis, Verfügbarkeit, Produktdaten und Kaufattribute auf ${pages} Beispiel-Produktseiten.`,
      standsOut: "Was auffällt",
      high: "Hoch",
      catalogLimited:
        "Katalogweite Details sind bei diesem Shop eingeschränkt; die repräsentativen Produktseiten folgen unten.",
      pagesReading: (count: number) =>
        `${count} Produktseiten · werden gerade gelesen`,
      pagesFailed: (count: number) =>
        `${count} Produktseiten · konnten nicht vollständig gelesen werden`,
      pagesUnavailable:
        "Eine repräsentative Produktseitenprüfung war bei diesem Durchlauf nicht verfügbar",
      pagesGated: (count: number) =>
        `${count} Produktseiten · nach Ihrer E-Mail-Bestätigung`,
      pagesGatedBody:
        "Diese Seiten genau zu lesen ist die langsame Hälfte des Scans, und Ihre E-Mail-Bestätigung startet sie. Die Shop- und Katalogbelege oben bleiben genau dort, wo sie sind.",
      inspecting: (count: number) =>
        `${count} repräsentative Produktseiten werden geprüft`,
      evidenceReady:
        "Shop- und Katalogbelege sind oben bereits verfügbar. Ergebnisse auf Seitenebene erscheinen hier automatisch.",
      pdpFailed:
        "Die Shop- und Katalogbeobachtungen bleiben gültig. Die repräsentative Produktseitenprüfung konnte bei diesem Durchlauf nicht abgeschlossen werden.",
            sampleShows: "Was die Stichprobe der Produktseiten zeigt",
      pdpRepeatedPatterns: "Wiederholt auf den geprüften Produktseiten",
      pdpRepeatedHint:
        "Diese Muster sollten Sie beheben, bevor Sie einzelnen Seitendetails nachgehen.",
      sampledPagesDisclosure: (count: number) =>
        `${count} geprüfte ${count === 1 ? "Produktseite" : "Produktseiten"} anzeigen`,
      needAttention: (count: number) => `${count} brauchen Aufmerksamkeit`,
      checked: (count: number) => `von ${count} geprüft`,
      couldNotCheck: (count: number) => ` · ${count} konnten wir nicht prüfen`,
      health: (score: number) => `Zustand ${score}`,
      needAttentionOf: (failed: number, total: number) =>
        `${failed} von ${total} brauchen Aufmerksamkeit`,
      openReport: "Seitenbericht öffnen",
      reportUnavailable: "Bericht nicht verfügbar",
    },
    deeper: {
      eyebrow: "Als Nächstes · vollständige Analyse",
      title: "Bestätigen Sie Ihre E-Mail, bevor wir die vollständige Analyse starten.",
      intro:
        "Die ersten Chancen sehen Sie oben. Ein Klick in Ihrem Posteingang startet die tiefere Seitenprüfung und KI-Analyse – einschliesslich dessen, was ChatGPT und Google AI Mode Kundinnen und Kunden zeigen.",
      assurances: [
        "Kostenlos",
        "Kein Konto",
        "Eine E-Mail, keine Marketingliste",
      ],
      aiPages: "KI-Analyse Seite für Seite",
      aiPagesDetail:
        "Öffnen Sie einen Produktseitenbericht: KI geht die Seite neben den Befunden oben durch und schreibt konkrete Verbesserungen samt zugrunde liegendem Seitentext zurück.",
      shopperAnswers: "ChatGPT + Google AI Mode",
      shopperAnswersDetail: (count: number) =>
        `Fragen aus den ${count} eben gelesenen ${count === 1 ? "Produkt" : "Produkten"} werden an ChatGPT und Google AI Mode gestellt; die Antworten werden aufgezeichnet.`,
      alternatives: "Stattdessen gezeigte Konkurrenten",
      alternativesDetail:
        "Die konkurrierenden Marken und Produkte, die an Ihrer Stelle erscheinen.",
    },
    email: {
      sentTo: (email: string) => `Gesendet an ${email}`,
      completeTitle: "Ihr Link ist im Posteingang.",
      continueTitle: "Bestätigen Sie ihn, um die vollständige Analyse zu starten.",
      completeBody:
        "Nichts auf dieser Seite verschwindet. Der Link öffnet dieselbe Analyse jederzeit wieder.",
      continueBody:
        "Klicken Sie auf den Link im Posteingang. Dann starten wir Seitenprüfung, KI-Analyse und die Fragen an Shopping-Assistenten. Diese Seite bleibt währenddessen erhalten.",
      differentEmail: "An eine andere E-Mail senden",
      label: "Geschäftliche E-Mail",
      runningLabel: "Vollständige Analyse starten",
      completeLabel: "Diese Analyse behalten",
      completeIntro: (domain: string) =>
        `Die Analyse für ${domain} ist fertig. Hinterlassen Sie eine Adresse; wir senden Ihnen den Link, damit Sie sie jederzeit öffnen können.`,
      runningIntro: (domain: string) =>
        `Wir haben die ersten Chancen auf ${domain} gefunden. Bestätigen Sie Ihre E-Mail, um die tiefere Seitenprüfung, KI-Analyse sowie die Checks mit ChatGPT und Google AI Mode zu starten.`,
      placeholder: "sie@firma.ch",
      sending: "Wird gesendet…",
      send: "Senden",
      runningCta: "Bestätigungslink senden",
      completeCta: "Analyse per E-Mail senden",
      assurances: [
        "Kein Konto",
        "Keine Karte",
        "Eine E-Mail, keine Marketingliste",
      ],
      sent: "E-Mail gesendet",
      clickContinue: "Ein Klick im Posteingang startet die vollständige Analyse.",
      openSent: (email: string) =>
        `Öffnen Sie den Link, den wir an ${email} gesendet haben. Nichts auf dieser Seite verschwindet. Sie können weiterlesen oder später zurückkehren.`,
      sendAgain: "Erneut senden",
      differentAddress: "Andere Adresse verwenden",
      confirmTitle: "Bestätigen Sie Ihre E-Mail, um die vollständige Analyse zu starten",
      confirmBody:
        "Wir senden einen Link. Ein Klick startet die Analyse: ohne Konto, ohne Karte und ohne Marketingliste.",
      addEmail: "E-Mail hinzufügen",
      privacyPrefix: "Siehe unsere",
      privacy: "Datenschutzerklärung",
    },
    errors: {
      scanDomain: "Diese Domain konnte nicht gescannt werden.",
      serviceUnavailable: "Der Scan-Dienst ist derzeit nicht verfügbar.",
      missingToken:
        "Diesem Bestätigungslink fehlt das Token. Starten Sie den Scan unten neu oder fahren Sie fort.",
      usedToken:
        "Dieser Bestätigungslink ist ungültig oder wurde bereits verwendet. Starten Sie den Scan erneut, wenn Sie einen neuen Link brauchen.",
      verifyUnavailable:
        "Dieser Link konnte gerade nicht bestätigt werden. Versuchen Sie den Link aus Ihrer E-Mail erneut.",
      enterDomain: "Geben Sie Ihre Shop-Domain ein.",
      enterEmail: "Geben Sie Ihre geschäftliche E-Mail ein.",
      invalidEmail: "Geben Sie eine gültige geschäftliche E-Mail ein.",
      ownDomain: "Geben Sie die Domain Ihres eigenen Shops ein.",
      rateLimited:
        "Derzeit gibt es zu viele Scan-Anfragen. Versuchen Sie es in Kürze erneut.",
      sendEmail: "Die Bestätigungs-E-Mail konnte nicht gesendet werden.",
      sendEmailNow:
        "Die Bestätigungs-E-Mail konnte gerade nicht gesendet werden.",
      retrying: "Wird erneut versucht…",
      tryAgain: "Erneut versuchen",
      pollExhausted:
        "Diese Analyse dauert länger als erwartet. Bereits gefundene Belege bleiben erhalten; wenn der Worker gestoppt hat, zeigen wir keinen endlosen Ladezustand.",
      auditDidNotFinish: "Diese Analyse wurde nicht abgeschlossen.",
      auditDidNotFinishBody:
        "Die bereits gezeigten Ergebnisse bleiben erhalten. Wiederholen Sie nur die offenen Prüfungen — Sie müssen Ihre E-Mail nicht erneut bestätigen.",
      retryAudit: "Offene Prüfungen erneut ausführen",
      retryAuditRunning: "Analyse wird erneut ausgeführt…",
      running: "Läuft…",
      runAgain: "Erneut ausführen",
      rejectedTitle: (domain: string) =>
        `${domain} konnte nicht gelesen werden.`,
      blockedExplanation:
        "Ihr Shop hat unsere Anfrage abgewiesen. Meist liegt das an einer Firewall- oder Bot-Schutzregel; das bedeutet nicht, dass mit Ihrem Shop etwas nicht stimmt.",
      noProductsExplanation:
        "Die Website war erreichbar, aber wir konnten keine öffentlichen Produktseiten finden. Das passiert bei Shops, die Produkte erst nach einer Anmeldung anzeigen, oder bei Websites, die kein Shop sind.",
      genericExplanation:
        "Die Domain antwortete nicht auf eine öffentliche Anfrage. Sie könnte falsch geschrieben, geparkt oder vorübergehend offline sein.",
      blockedSuggestions: [
        "Prüfen Sie, ob die Domain wirklich der Shop ist, den Kundinnen und Kunden nutzen, und keine Staging- oder Admin-Adresse.",
        "Fragen Sie die Person, die den Shop betreut, ob Bot-Schutz externe Leser blockiert. Dieselbe Regel blockiert häufig auch Suchmaschinen.",
      ],
      noProductsSuggestions: [
        "Versuchen Sie die Domain, auf der Kundinnen und Kunden tatsächlich Produkte ansehen, einschliesslich eines möglichen Marktpräfixes.",
        "Wenn Ihre Produkte erst nach einer Anmeldung sichtbar sind, kann ein öffentlicher Scan sie nicht erreichen; wir können sie aber gemeinsam mit Ihnen ansehen.",
      ],
      genericSuggestions: [
        "Prüfen Sie die Schreibweise und versuchen Sie es ohne www oder nachgestellten Pfad.",
        "Wenn die Website in Ihrem Browser live ist, warten Sie einen Moment und führen Sie den Scan erneut aus.",
      ],
      reported: (reason: string) => `Vom Scan gemeldet: ${reason}`,
      continueCta: "Diesen Shop in Beseam verbinden",
      reviewCta: "Hilfe mit diesem Shop bekommen",
    },
  },
  scan: {
    eyebrow: "Kostenloser Shop-Scan",
    heading:
      "Sehen Sie, was Ihre Produkte schwerer auffindbar, vergleichbar oder kaufbar macht.",
    intro:
      "Geben Sie Ihre Shop-Domain ein. Beseam liest den öffentlichen Shop und zeigt, wo Produkte übersehen werden, schwer vergleichbar sind oder Kaufhürden schaffen können, mit Belegen und dem sinnvollsten nächsten Schritt.",
    duration: "Dauert meist etwa eine Minute.",
    promiseBody:
      "Wir lesen Ihren öffentlichen Shop so, wie eine Suchmaschine oder ein KI-Assistent ihn liest: Ihre Produktseiten, Ihre Katalogdaten und Ihre Website-Einstellungen. Den Link zu Ihrer Analyse schicken wir Ihnen per E-Mail. Sie sehen, was diese Systeme sehen, und was zuerst zu beheben ist. Es ist kein Keyword-Report. Wir messen keine Suchnachfrage, und Kundenfragen kommen später, nicht hier.",
    assurances: [
      "Kein Konto, keine Karte",
      "Nur öffentliche Shop-Seiten",
      "Kein Zugriff auf Ihren Shop",
    ],
    formNote: {
      line: "Der kostenlose Scan liest Ihren Shop einmal.",
      // Ausgeschrieben, nicht aus `loop.steps` zusammengesetzt: dort heisst
      // Schritt 02 "Planen", weil im Ring nur 68px Platz sind. In einem Satz
      // steht "Vorbereiten".
      loop: "Beseam: Finden → Vorbereiten → Freigeben → Umsetzen → Messen",
    },
    form: {
      domainLabel: "Shop-Domain",
      websiteHoneypot: "Webseite",
      // Beispiel-Domain, nicht Marke: "ihrshop.de" zeigt einem deutschen
      // Besucher das erwartete Format, "yourstore.com" zeigt ein fremdes.
      domainPlaceholder: "ihrshop.de",
      submit: "Shop scannen",
      submitting: "Wir lesen Ihren Shop…",
      again: "Anderen Shop scannen",
      startNote:
        "Startet sofort. Nach Ihrer E-Mail fragen wir erst, wenn die ersten Befunde auf dem Bildschirm stehen.",
    },
    contentsHeading: "Was wir prüfen",
    scopeNote: "Nur öffentlicher Shop · kein Shop-Zugriff",
    contents: [
      {
        label: "Ihr Shop-Auftritt",
        detail:
          "Robots-Datei, Sitemap und ob Such- und KI-Crawler überhaupt hereingelassen werden.",
      },
      {
        label: "Ihre Katalogdaten",
        detail:
          "Kategorien, Marke, Beschreibungen, Bilder, Variantenoptionen, SKUs und Barcodes, Verfügbarkeit, Dubletten.",
      },
      {
        label: "Ihre Produktseiten",
        detail:
          "Wir lesen eine Stichprobe von Seiten vollständig und vergleichen sie mit Ihrem Katalog: Namen, Preise und Bestände, die nicht zusammenpassen.",
      },
      {
        label: "Eine Beispiel-KI-Antwort",
        detail:
          "Ein Blick darauf, wie Assistenten Ihren Shop heute beschreiben. Hier einmal gefragt; in der App regelmässig.",
      },
    ],
    notKeywordReport:
      "Jeder Befund nennt die Produkte dahinter und verlinkt die Seiten, die wir gelesen haben. Es ist kein Keyword-Report. Wir messen keine Suchnachfrage, und Kundenfragen kommen später, nicht hier.",
    returnsHeading: "Was Sie zurückbekommen",
    returns: [
      {
        term: "Was wir finden können",
        detail:
          "Wie viele Ihrer Produkte öffentlich sind, dazu eine Stichprobe vollständig gelesener Produktseiten.",
      },
      {
        term: "Wo Sie Kundschaft verlieren können",
        detail:
          "In klaren Worten: welche Produkte übersprungen werden können, schwer zu vergleichen oder schwer zu kaufen sind.",
      },
      {
        term: "Was zuerst zu beheben ist",
        detail:
          "Ein nächster Schritt je Befund, mit dem Beleg darunter. Ein öffentlicher Scan kann keine Umsatzwirkung beweisen, und wir behaupten es nicht.",
      },
    ],
    once: "Dieser Scan liest Ihren Shop einmal. Beseam prüft weiter und belegt, was sich verändert hat.",
    continuous: "Sehen, was fortlaufend läuft →",
    beyond: {
      eyebrow: "Nach dem kostenlosen Scan",
      heading:
        "Ein Scan findet die Lücke. Beseam arbeitet weiter, wenn Sie die Seite verlassen.",
      body: "Lassen Sie dieselben Kundenfragen weiterlaufen, machen Sie aus den stärksten Befunden vorbereitete Änderungen, geben Sie kundenseitige Änderungen frei und prüfen Sie die Belege danach erneut.",
      review:
        "Oder bringen Sie Ihren Shop in eine zwanzigminütige Durchsprache: An einem echten Befund zeigen wir, was Beseam gefunden hat, was es ändern würde und was es danach erneut prüft.",
      start: "Kostenlos mit meinem Shop starten",
      book: "20-minütige Shop-Durchsprache buchen",
    },
  },
};
