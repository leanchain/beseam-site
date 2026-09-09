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
