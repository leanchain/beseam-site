import type { BlogPost } from "@/lib/blog-posts";

/** German blog posts (Swiss spelling: ss, never ß; formal "Sie"). */
export const BLOG_POSTS_DE: readonly BlogPost[] = [
  {
    slug: "get-products-recommended-by-chatgpt",
    title: "So empfehlen ChatGPT und andere KI-Assistenten Ihre Produkte",
    metaTitle: "Produkte von ChatGPT empfehlen lassen: Leitfaden 2026",
    metaDescription:
      "Ein praktischer Leitfaden: wie ChatGPT und Gemini Produkte für Empfehlungen auswählen, und fünf Schritte, die Ihre Produkte in KI-Antworten bringen.",
    excerpt:
      "Wie KI-Assistenten entscheiden, welche Produkte sie empfehlen, und die fünf Schritte, die Ihren Shop in ihre Antworten bringen.",
    summary:
      "KI-Assistenten empfehlen Produkte, die sie finden, verstehen und denen sie vertrauen können. Damit Ihre Produkte empfohlen werden, sorgen Sie dafür, dass Assistenten Ihren Shop erreichen (Produkt-Feeds und Crawler-Zugriff), geben Sie jeder Produktseite die konkreten Fakten, nach denen gefragt wird, veröffentlichen Sie Inhalte, die Kauffragen beantworten, halten Sie Preise und Lagerbestand korrekt und verfolgen Sie die Fragen, bei denen Sie gewinnen wollen.",
    published: "2026-10-11",
    updated: "2026-10-11",
    readingMinutes: 8,
    image: {
      src: "/images/blog/get-products-recommended-by-chatgpt.de.svg",
      og: "/images/blog/get-products-recommended-by-chatgpt.de.png",
      alt: "Illustration: Eine Kundin fragt einen KI-Assistenten nach wasserdichten Stiefeln, und der Assistent empfiehlt das Produkt eines Onlineshops.",
    },
    keywords: [
      "Produkte von ChatGPT empfehlen lassen",
      "ChatGPT Shopping",
      "KI-Suchoptimierung für E-Commerce",
      "KI-Produktempfehlungen",
      "Generative Engine Optimization",
    ],
    sections: [
      {
        id: "why-it-matters",
        heading: "Warum sind KI-Empfehlungen für Onlineshops wichtig?",
        blocks: [
          {
            type: "p",
            text: "Immer mehr Kundinnen und Kunden fragen einen KI-Assistenten, was sie kaufen sollen, statt sich durch Suchergebnisse zu klicken. Der Assistent antwortet mit einer kurzen Liste von Produkten, und oft klickt man direkt auf eines davon. Sind Ihre Produkte nicht auf dieser Liste, sind Sie nicht Teil der Entscheidung.",
          },
          {
            type: "p",
            text: "Der Traffic ist im Vergleich zu Suche und Werbung noch klein, aber er wächst schnell und er konvertiert. Laut Daten von Adobe zu US-Onlineshops lagen die Besuche über KI-Assistenten im Juli 2026 62 % über dem Vorjahr, konvertierten 60 % besser als anderer Traffic und brachten 53 % mehr Umsatz pro Besuch. Im März 2025 konvertierte derselbe Traffic noch 38 % schlechter.",
          },
          {
            type: "callout",
            title: "Was das bedeutet",
            text: "KI wird zu einem eigenen Verkaufskanal. Shops, die jetzt empfohlen werden, bauen einen Vorsprung auf, der später schwer aufzuholen ist.",
          },
        ],
      },
      {
        id: "how-assistants-choose",
        heading: "Wie entscheidet ChatGPT, welche Produkte es empfiehlt?",
        blocks: [
          {
            type: "p",
            text: "OpenAI sagt, dass seine Produktergebnisse unabhängig ausgewählt werden und keine Werbung sind. Sie können also nicht für eine Aufnahme bezahlen. Im Hilfecenter nennt OpenAI die Faktoren, nach denen Händler für ein Produkt gereiht werden: **Verfügbarkeit, Preis, Qualität und ob ein Händler Hersteller oder Hauptverkäufer** des Artikels ist. OpenAI sagt auch, dass sich diese Faktoren weiterentwickeln werden.",
          },
          {
            type: "p",
            text: "Im Hintergrund kombinieren Assistenten zwei Arten von Informationen: strukturierte Produktdaten aus Händler-Feeds und Katalogen und das, was sie im offenen Web lesen, darunter Ihre Produktseiten, Bewertungen und Artikel. Andere Assistenten arbeiten ähnlich: Sie müssen Ihr Produkt finden, verstehen, was es ist und für wen es gedacht ist, und darauf vertrauen können, dass die Fakten stimmen.",
          },
          {
            type: "table",
            head: [
              "Was der Assistent braucht",
              "Woher er es bekommt",
              "Was Sie steuern",
            ],
            rows: [
              [
                "Ihr Produkt finden",
                "Produkt-Feeds, Katalog-Integrationen, Crawler",
                "Feed-Einrichtung, Crawler-Zugriff, Sitemap",
              ],
              [
                "Es verstehen",
                "Produktseiten, Produktdaten, strukturierte Daten",
                "Beschreibungen, Attribute, Schema",
              ],
              [
                "Ihm vertrauen",
                "Übereinstimmende Preise und Lager, Bewertungen, andere Quellen",
                "Datenqualität, Bewertungen, Inhalte",
              ],
            ],
          },
        ],
      },
      {
        id: "step-1-access",
        heading:
          "Schritt 1: Sorgen Sie dafür, dass KI-Assistenten Ihre Produkte erreichen",
        blocks: [
          {
            type: "p",
            text: "Assistenten können nur empfehlen, was sie lesen können. Beginnen Sie mit zwei Prüfungen.",
          },
          {
            type: "ul",
            items: [
              "**Produkt-Feeds und Kataloge.** OpenAI sagt, dass Shopify-Produktdaten bereits über den Shopify Catalog in ChatGPT eingebunden sind, ohne zusätzlichen Aufwand für einzelne Händler. Händler auf anderen Plattformen können sich bewerben, um einen Produkt-Feed direkt zu senden. Prüfen Sie in Ihrem Shopify-Admin unter Vertriebskanäle, welche KI-Kanäle für Ihren Shop aktiv sind, denn die Verfügbarkeit unterscheidet sich je nach Kanal und Land.",
              "**Crawler-Zugriff.** KI-Unternehmen nutzen eigene Crawler, etwa OAI-SearchBot von OpenAI. Bot-Schutz, Firewall-Regeln oder eine alte Regel in der robots.txt können sie blockieren, ohne dass es jemand merkt. Prüfen Sie, ob die Crawler der Assistenten, die Ihnen wichtig sind, Ihre Produkt- und Kategorieseiten erreichen.",
            ],
          },
        ],
      },
      {
        id: "step-2-product-pages",
        heading:
          "Schritt 2: Geben Sie jeder Produktseite die Fakten, nach denen gefragt wird",
        blocks: [
          {
            type: "p",
            text: "Kundinnen und Kunden stellen Assistenten konkrete Fragen: „wasserdichte Stiefel für den Arbeitsweg, weite Passform“ oder „parfümfreie Feuchtigkeitscreme für empfindliche Haut“. Ein Assistent kann Ihr Produkt dieser Frage nur zuordnen, wenn Ihre Seite diese Fakten klar nennt.",
          },
          {
            type: "ul",
            items: [
              "Sagen Sie, wofür das Produkt gedacht ist und zu wem es passt, nicht nur, was es ist.",
              "Nennen Sie die Eigenschaften, nach denen verglichen wird: Grösse und Passform, Material, Inhaltsstoffe, technische Daten, Kompatibilität.",
              "Ersetzen Sie Werbefloskeln wie „perfekt für jeden Anlass“ durch Fakten.",
              "Halten Sie dieselben Fakten auch in Ihren Produktdaten fest, nicht nur im Beschreibungstext.",
            ],
          },
          {
            type: "p",
            text: "Unser Leitfaden zu [Produktbeschreibungen, die KI-Assistenten empfehlen](/blog/product-descriptions-for-ai-search) zeigt Schritt für Schritt, wie das geht, mit Vorher-nachher-Beispielen.",
          },
        ],
      },
      {
        id: "step-3-content",
        heading:
          "Schritt 3: Veröffentlichen Sie Inhalte zu den Fragen, die Ihre Kundschaft recherchiert",
        blocks: [
          {
            type: "p",
            text: "Viele Kauffragen drehen sich nicht um ein einzelnes Produkt. Kundinnen und Kunden bitten Assistenten, zu vergleichen, zu erklären und bei der Wahl zu helfen: „Trail- oder Strassenlaufschuhe“, „was ziehe ich an eine Sommerhochzeit an“, „mineralischer oder chemischer Sonnenschutz“. Assistenten beantworten solche Fragen mit Seiten, die erklären und vergleichen.",
          },
          {
            type: "ul",
            items: [
              "**Kategorieseiten** mit einer kurzen, konkreten Einleitung, was darin ist und für wen.",
              "**Vergleiche** zwischen Produkttypen oder Modellen, die Sie verkaufen.",
              "**Kaufratgeber** zu Grösse, Passform, Material oder zur richtigen Wahl.",
            ],
          },
          {
            type: "p",
            text: "Bauen Sie jede Seite rund um Ihre eigenen Produkte auf, und beantworten Sie die Frage im ersten Absatz. Assistenten bevorzugen Seiten, die schnell zum Punkt kommen.",
          },
        ],
      },
      {
        id: "step-4-accuracy",
        heading:
          "Schritt 4: Halten Sie Preise, Lager und strukturierte Daten korrekt",
        blocks: [
          {
            type: "p",
            text: "Verfügbarkeit und Preis stehen nicht ohne Grund auf der Liste der Ranking-Faktoren von OpenAI: Ein Assistent will niemanden zu einem ausverkauften Produkt oder einem falschen Preis schicken. Sorgen Sie dafür, dass Ihre strukturierten Daten, Ihr Produkt-Feed und die sichtbare Seite bei Preis und Lagerbestand für jede Variante übereinstimmen. Doppelte strukturierte Daten aus Theme und App sind in Shopify-Shops eine häufige Ursache für Widersprüche.",
          },
        ],
      },
      {
        id: "step-5-track",
        heading:
          "Schritt 5: Verfolgen Sie die Fragen, bei denen Sie gewinnen wollen",
        blocks: [
          {
            type: "p",
            text: "Was Sie nicht messen, können Sie nicht verbessern. Erstellen Sie eine Liste mit 20 bis 50 Fragen, die Ihre Kundschaft stellt, nach Kategorie und Bedürfnis, und stellen Sie sie regelmässig in ChatGPT, Gemini, Google AI Mode, Perplexity, Copilot und Claude. Notieren Sie, welche Produkte empfohlen werden, welche Ihrer Produkte fehlen und wer stattdessen erscheint.",
          },
          {
            type: "p",
            text: "Verbinden Sie es dann mit Umsatz: Unser Leitfaden [So messen Sie KI-Traffic und Umsatz in GA4 und Shopify](/blog/track-ai-traffic-ga4-shopify) zeigt, wie Sie sehen, was Besucherinnen und Besucher aus KI-Assistenten kaufen.",
          },
          {
            type: "callout",
            title: "Für den ganzen Katalog",
            text: "Hunderte Produkte und Fragen von Hand zu prüfen, ist nicht realistisch. [Beseam](/product/ai-visibility-tracking) verfolgt Ihre Produkte in sechs KI-Assistenten, findet, was sie aus Antworten fernhält, und sortiert die Verbesserungen nach erwarteter Umsatzwirkung.",
          },
        ],
      },
    ],
    faqs: [
      {
        question:
          "Kann ich dafür bezahlen, dass ChatGPT meine Produkte empfiehlt?",
        answer:
          "Nein. OpenAI sagt, dass seine Produktergebnisse unabhängig ausgewählt werden und keine Werbung sind. Die Aufnahme hängt von der Relevanz ab und von Faktoren wie Verfügbarkeit, Preis, Qualität und davon, ob Sie Hersteller oder Hauptverkäufer sind.",
      },
      {
        question:
          "Brauche ich einen Produkt-Feed, um in ChatGPT zu erscheinen?",
        answer:
          "Nicht immer. OpenAI sagt, dass Shopify-Produktdaten bereits über den Shopify Catalog eingebunden sind. Händler auf anderen Plattformen können sich bewerben, um einen Produkt-Feed einzureichen. Ein Feed verbessert die Genauigkeit, garantiert aber keine Empfehlung.",
      },
      {
        question: "Wie lange dauert es, bis meine Produkte erscheinen?",
        answer:
          "Einen festen Zeitrahmen gibt es nicht. Er hängt davon ab, wie oft jeder Assistent seine Daten aktualisiert und wie gut Ihre Produkte zu den Fragen Ihrer Kundschaft passen. Verfolgen Sie dieselben Fragen über die Zeit, um zu sehen, wann Ihre Produkte auftauchen.",
      },
      {
        question: "Unterscheidet sich KI-Suchoptimierung von SEO?",
        answer:
          "Sie baut auf denselben Grundlagen auf: crawlbare Seiten, klare Inhalte und strukturierte Daten. Der Unterschied ist das Ziel. Statt eine Seite in einer Liste von Links zu platzieren, wollen Sie, dass ein Assistent Ihr Produkt als eine von wenigen Empfehlungen auswählt. Das belohnt konkrete Produktfakten und korrekte Daten.",
      },
      {
        question: "Welche KI-Assistenten sind für Onlineshops am wichtigsten?",
        answer:
          "ChatGPT ist der grösste, aber Kundinnen und Kunden nutzen auch Gemini und Google AI Mode, Microsoft Copilot, Perplexity und Claude. Jeder greift auf andere Quellen zurück, deshalb lohnt es sich, sie nebeneinander zu verfolgen.",
      },
    ],
    sources: [
      {
        label: "OpenAI Hilfecenter: Shopping with ChatGPT search",
        url: "https://help.openai.com/en/articles/11128490-shopping-with-chatgpt-search",
      },
      {
        label: "OpenAI: Power product discovery in ChatGPT (Händler)",
        url: "https://chatgpt.com/merchants/",
      },
      {
        label: "OpenAI: Overview of OpenAI crawlers",
        url: "https://platform.openai.com/docs/bots",
      },
      {
        label: "Shopify: Agentic commerce, benefits and how to get started",
        url: "https://www.shopify.com/blog/agentic-commerce",
      },
      {
        label: "Digital Commerce 360: Adobe-Daten zu KI-Traffic, Juli 2026",
        url: "https://www.digitalcommerce360.com/2026/08/19/adobe-ai-referral-traffic-data-july-2026/",
      },
    ],
  },
  {
    slug: "product-descriptions-for-ai-search",
    title:
      "So schreiben Sie Produktbeschreibungen, die KI-Assistenten empfehlen",
    metaTitle: "Produktbeschreibungen für die KI-Suche: Checkliste & Beispiele",
    metaDescription:
      "Produktbeschreibungen, die ChatGPT und andere KI-Assistenten den Fragen Ihrer Kundschaft zuordnen. Mit Checkliste, Beispielen und häufigen Fehlern.",
    excerpt:
      "Eine Checkliste und Vorher-nachher-Beispiele für Produktbeschreibungen, die KI-Assistenten echten Kauffragen zuordnen können.",
    summary:
      "KI-Assistenten empfehlen Produkte, deren Seiten die Frage beantworten. Eine Beschreibung, die für KI funktioniert, nennt den Einsatzzweck, für wen das Produkt passt, die Eigenschaften, nach denen verglichen wird, und Hinweise zu Grösse oder Kompatibilität, in klarer Sprache. Ersetzen Sie Werbefloskeln durch Fakten, und halten Sie dieselben Fakten in Ihren Produktdaten fest.",
    published: "2026-10-10",
    updated: "2026-10-10",
    readingMinutes: 7,
    image: {
      src: "/images/blog/product-descriptions-for-ai-search.de.svg",
      og: "/images/blog/product-descriptions-for-ai-search.de.png",
      alt: "Illustration: eine vage Produktbeschreibung neben einer konkreten, für KI optimierten Version mit hervorgehobenen Fakten.",
    },
    keywords: [
      "Produktbeschreibungen für die KI-Suche",
      "KI-optimierte Produktbeschreibungen",
      "Checkliste Produktbeschreibung",
      "Produktbeschreibungen für ChatGPT",
      "E-Commerce-Produktinhalte",
    ],
    sections: [
      {
        id: "why-descriptions-matter",
        heading: "Warum sind Produktbeschreibungen für die KI-Suche wichtig?",
        blocks: [
          {
            type: "p",
            text: "Wenn jemand einen KI-Assistenten nach „Trailrunning-Schuhen für breite Füsse unter 150 €“ fragt, muss der Assistent entscheiden, welche Produkte passen. Das kann er nur mit Fakten: Ist der Schuh für Trails gemacht, gibt es ihn in weiter Passform, was kostet er? Steht das nicht in Ihrer Beschreibung, kann der Assistent Ihr Produkt nicht zuordnen, so gut es auch ist.",
          },
          {
            type: "p",
            text: "Suchmaschinen konnten eine Seite nach Keywords und Links reihen. KI-Assistenten lesen Ihre Seite wie eine aufmerksame Kundin und wählen eine Handvoll Produkte, die eindeutig passen. Das belohnt konkrete, vollständige Produktinformationen mehr denn je.",
          },
        ],
      },
      {
        id: "what-ai-looks-for",
        heading: "Worauf achtet ein KI-Assistent in einer Produktbeschreibung?",
        blocks: [
          {
            type: "ol",
            items: [
              "**Der Einsatzzweck.** Wofür das Produkt gedacht ist: Trailrunning, eine Sommerhochzeit, langes Stehen, Bildbearbeitung.",
              "**Für wen es passt.** Breite Füsse, empfindliche Haut, grosse Männer, Einsteiger, kleine Räume.",
              "**Die Eigenschaften, nach denen verglichen wird.** Material, Inhaltsstoffe, Masse, technische Daten, Akkulaufzeit, Gewicht.",
              "**Hinweise zu Grösse oder Kompatibilität.** Fällt klein oder normal aus; funktioniert mit iOS und Android.",
              "**Was es besonders macht.** Ein oder zwei konkrete Fakten, keine Superlative.",
              "**Praktische Details.** Pflegehinweise, Lieferumfang, Zertifizierungen.",
            ],
          },
        ],
      },
      {
        id: "examples",
        heading: "Vorher und nachher: drei Beispiele",
        blocks: [
          { type: "h3", text: "Schuhe" },
          {
            type: "table",
            head: ["Vorher", "Nachher"],
            rows: [
              [
                "Unser beliebtester Laufschuh. Stylish, bequem und perfekt für jeden Lauf!",
                "Ein wasserdichter Trailrunning-Schuh mit breiter Zehenbox und 8 mm Sprengung, gemacht für nasse und schlammige Trails. EU 38–47, in normaler und weiter Passform. Fällt normal aus.",
              ],
            ],
          },
          { type: "h3", text: "Beauty" },
          {
            type: "table",
            head: ["Vorher", "Nachher"],
            rows: [
              [
                "Unser legendäres Glow-Serum. Ein kleines Fläschchen Magie für strahlende Haut.",
                "Ein Serum mit 15 % Vitamin C und Hyaluronsäure für fahle, ungleichmässige Haut. Leicht und parfümfrei, für normale bis Mischhaut. Morgens vor dem Sonnenschutz auftragen.",
              ],
            ],
          },
          { type: "h3", text: "Elektronik" },
          {
            type: "table",
            head: ["Vorher", "Nachher"],
            rows: [
              [
                "Erleben Sie Sound wie nie zuvor. Premium-Audio und ganztägiger Komfort.",
                "Over-Ear-Kopfhörer mit aktivem Noise Cancelling und bis zu 50 Stunden Akkulaufzeit mit eingeschaltetem ANC. Bluetooth 5.3, Multipoint-Verbindung mit iOS und Android, USB-C-Schnellladen.",
              ],
            ],
          },
          {
            type: "p",
            text: "In jedem Fall beantwortet die „Nachher“-Version die Fragen, die man einem Assistenten stellen würde. Weitere Beispiele pro Branche finden Sie auf unseren Seiten für [Schuhe](/solutions/footwear), [Mode](/solutions/fashion-apparel), [Beauty](/solutions/beauty-cosmetics) und [Elektronik](/solutions/consumer-electronics).",
          },
        ],
      },
      {
        id: "how-to-write",
        heading:
          "So schreiben Sie eine KI-taugliche Produktbeschreibung, Schritt für Schritt",
        blocks: [
          {
            type: "ol",
            items: [
              "**Fragen sammeln.** Notieren Sie fünf Fragen, die vor dem Kauf dieses Produkts gestellt werden. Prüfen Sie E-Mails an den Kundenservice und Bewertungen auf die genaue Wortwahl.",
              "**Mit der Antwort beginnen.** Starten Sie mit einem Satz, der sagt, was das Produkt ist, wofür es gedacht ist und zu wem es passt.",
              "**Vergleichsfakten ergänzen.** Material, Grössen, technische Daten: die Eigenschaften, nach denen man zwischen zwei Produkten wählt.",
              "**Rat geben.** Grösse, Passform, Kompatibilität oder Anwendung, in klaren Worten.",
              "**Füllwörter streichen.** Entfernen Sie Formulierungen, die zu jedem Produkt passen würden, wie „hochwertig“ oder „perfekt für alle“.",
              "**Produktdaten angleichen.** Halten Sie dieselben Fakten in Ihren Produktattributen und strukturierten Daten fest, für jede Variante.",
            ],
          },
          {
            type: "callout",
            title: "Lesbar bleiben",
            text: "Für KI schreiben heisst nicht, für Roboter zu schreiben. Assistenten belohnen dasselbe wie Ihre Kundschaft: klare, konkrete Informationen. Eine Beschreibung, die Fragen beantwortet, verkauft auch in Ihrem eigenen Shop besser.",
          },
        ],
      },
      {
        id: "mistakes",
        heading: "Häufige Fehler, die Produkte aus KI-Antworten fernhalten",
        blocks: [
          {
            type: "ul",
            items: [
              "**Lieferantenbeschreibungen unverändert übernommen.** Sie gleichen denen hunderter anderer Shops und beantworten selten die Fragen Ihrer Kundschaft.",
              "**Wichtige Fakten nur in Bildern.** Grössentabellen und Inhaltsstofflisten als Bild sind für die KI schwer zu lesen. Schreiben Sie sie als Text.",
              "**Passform-Tipps nur in Bewertungen.** Steht „eine Grösse kleiner wählen“ nur in Bewertungen, nennen Sie es in der Beschreibung.",
              "**Beschreibung und Daten widersprechen sich.** Sagt der Text etwas anderes als die Produktdaten, vertrauen Assistenten keinem von beiden.",
              "**Keyword-Stuffing.** Einen Begriff zu wiederholen, hilft einem Assistenten nicht, das Produkt zu verstehen. Fakten schon.",
            ],
          },
        ],
      },
      {
        id: "at-scale",
        heading: "Wie macht man das für einen ganzen Katalog?",
        blocks: [
          {
            type: "p",
            text: "Beginnen Sie mit den wichtigsten Produkten: Ihren Bestsellern und den Produkten, die wichtigen Kauffragen am nächsten sind. Verbessern Sie diese zuerst, messen Sie die Wirkung, und arbeiten Sie sich dann durch die Liste.",
          },
          {
            type: "p",
            text: "[Die Optimierung von Produktbeschreibungen mit Beseam](/product/product-descriptions) übernimmt das für Sie: Sie findet fehlende Fakten im ganzen Katalog, schlägt bessere Beschreibungen und Produktdaten vor und sortiert sie nach erwarteter Umsatzwirkung. So geben Sie zuerst die Änderungen frei, die zählen.",
          },
        ],
      },
    ],
    faqs: [
      {
        question:
          "Wie lang sollte eine Produktbeschreibung für die KI-Suche sein?",
        answer:
          "So lang, dass sie die Fragen Ihrer Kundschaft beantwortet, und nicht länger. Für die meisten Produkte sind das zwei bis vier kurze Absätze oder ein kurzer Absatz plus eine Liste der wichtigsten Fakten. Vollständigkeit zählt mehr als Länge.",
      },
      {
        question:
          "Soll ich separate Beschreibungen für KI und für Kundinnen und Kunden schreiben?",
        answer:
          "Nein. KI-Assistenten lesen dieselbe Seite wie Ihre Kundschaft, und beide belohnen klare, konkrete Fakten. Eine gute Beschreibung erfüllt beides.",
      },
      {
        question: "Kann ich meine Produktbeschreibungen mit KI schreiben?",
        answer:
          "Ja, solange die Fakten stimmen. KI kann helfen, Beschreibungen in grosser Zahl zu strukturieren und umzuschreiben, aber jede Aussage, Grösse und technische Angabe sollte vor der Veröffentlichung mit Ihren echten Produktdaten abgeglichen werden.",
      },
      {
        question: "Beeinflussen Produktbeschreibungen auch das Google-Ranking?",
        answer:
          "Klare, konkrete und eigenständige Produktinformationen belohnen Suchmaschinen und KI-Assistenten gleichermassen. Bessere Beschreibungen für KI und für Google zielen deshalb in dieselbe Richtung.",
      },
      {
        question: "Welche Produkte sollte ich zuerst optimieren?",
        answer:
          "Beginnen Sie mit Bestsellern und mit Produkten in Kategorien, in denen Kundinnen und Kunden Assistenten um Rat fragen, etwa Schuhe, Beauty und Elektronik. Dort bringt eine bessere Zuordnung den meisten Umsatz.",
      },
    ],
    sources: [
      {
        label: "OpenAI Hilfecenter: Shopping with ChatGPT search",
        url: "https://help.openai.com/en/articles/11128490-shopping-with-chatgpt-search",
      },
      {
        label: "Google Search Central: Strukturierte Daten für Produkte",
        url: "https://developers.google.com/search/docs/appearance/structured-data/product",
      },
      {
        label: "Shopify: Agentic commerce, benefits and how to get started",
        url: "https://www.shopify.com/blog/agentic-commerce",
      },
    ],
  },
  {
    slug: "track-ai-traffic-ga4-shopify",
    title: "So messen Sie KI-Traffic und Umsatz in GA4 und Shopify",
    metaTitle: "KI-Traffic und Umsatz in GA4 und Shopify messen",
    metaDescription:
      "Sehen Sie, wie viele Besucher und wie viel Umsatz ChatGPT, Gemini und andere KI-Assistenten Ihrem Onlineshop bringen, mit dem KI-Kanal in GA4.",
    excerpt:
      "Nutzen Sie den neuen KI-Assistent-Kanal in GA4 und eine eigene Kanalgruppe, um zu sehen, wie viel Traffic und Umsatz KI-Assistenten Ihrem Shop bringen.",
    summary:
      "GA4 fasst Besuche von KI-Assistenten wie ChatGPT, Gemini und Copilot jetzt in einem Standardkanal „AI Assistant“ zusammen. Für das ganze Bild ergänzen Sie eine eigene Kanalgruppe, die auch Perplexity und Claude erfasst, sorgen dafür, dass Shopify Kaufereignisse an GA4 sendet, und vergleichen Umsatz und Conversion-Rate pro Kanal. Rechnen Sie mit zu tiefen Zahlen: Manche KI-Besuche kommen ohne Referrer an und erscheinen als Direct.",
    published: "2026-10-09",
    updated: "2026-10-09",
    readingMinutes: 7,
    image: {
      src: "/images/blog/track-ai-traffic-ga4-shopify.de.svg",
      og: "/images/blog/track-ai-traffic-ga4-shopify.de.png",
      alt: "Illustration: ein Analytics-Bericht mit einer Zeile für den KI-Assistent-Kanal und steigenden Umsatzbalken.",
    },
    keywords: [
      "KI-Traffic in GA4 messen",
      "ChatGPT-Traffic Google Analytics",
      "GA4 AI Assistant Kanal",
      "KI-Traffic Shopify",
      "Umsatz aus der KI-Suche messen",
    ],
    sections: [
      {
        id: "why-track",
        heading: "Warum sollten Onlineshops KI-Traffic separat messen?",
        blocks: [
          {
            type: "p",
            text: "Besucherinnen und Besucher aus KI-Assistenten verhalten sich anders als andere. Laut Daten von Adobe zu US-Onlineshops konvertierten sie im Juli 2026 60 % besser als anderer Traffic und brachten 53 % mehr Umsatz pro Besuch. Ist dieser Traffic unter Referral oder Direct vermischt, können Sie ihn weder sehen noch bewerten noch ausbauen.",
          },
          {
            type: "p",
            text: "Eine separate Messung beantwortet drei Fragen: wie viele Besucher Ihnen KI-Assistenten bringen, auf welchen Seiten sie landen und wie viel sie kaufen.",
          },
        ],
      },
      {
        id: "ga4-ai-assistant-channel",
        heading: "Was ist der KI-Assistent-Kanal in GA4?",
        blocks: [
          {
            type: "p",
            text: "Im Mai 2026 hat Google der Standard-Kanalgruppe in GA4 einen Kanal „AI Assistant“ hinzugefügt. Sitzungen von erkannten KI-Assistenten werden dort automatisch zusammengefasst, je nachdem, woher der Besuch kam. Er braucht keine Einrichtung, gilt aber nicht rückwirkend für Daten von vor seiner Einführung.",
          },
          {
            type: "p",
            text: "Prüfen Sie in Googles Dokumentation zur Standard-Kanalgruppe, welche Assistenten er abdeckt, denn die Liste hat sich seit dem Start geändert. Zum Zeitpunkt dieses Artikels umfasst er laut Berichten ChatGPT, Gemini, Copilot, DeepSeek und Grok, während Besuche von Perplexity weiterhin unter Referral erscheinen und Googles AI Overviews als Organic Search zählen.",
          },
          {
            type: "p",
            text: "So finden Sie ihn: Gehen Sie zu **Berichte → Akquisition → Traffic-Akquisition** und suchen Sie die Zeile „AI Assistant“ in der Standard-Kanalgruppe der Sitzung.",
          },
        ],
      },
      {
        id: "custom-channel-group",
        heading: "So richten Sie in GA4 eine eigene KI-Kanalgruppe ein",
        blocks: [
          {
            type: "p",
            text: "Da sich die Standard-Kanalgruppe nicht bearbeiten lässt, legen Sie eine eigene Kanalgruppe an, die alle Assistenten erfasst, die Ihnen wichtig sind. Anders als der Standardkanal gilt eine eigene Kanalgruppe auch für Ihre historischen Daten.",
          },
          {
            type: "ol",
            items: [
              "Gehen Sie zu **Verwaltung → Datenanzeige → Kanalgruppen** und erstellen Sie eine neue Kanalgruppe (oder kopieren Sie die Standardgruppe).",
              "Fügen Sie einen Kanal mit dem Namen **KI-Assistenten** hinzu.",
              "Setzen Sie die Bedingung auf **Sitzungsquelle entspricht regulärem Ausdruck**, mit einem Muster wie: `chatgpt|openai|perplexity|claude|gemini|copilot|deepseek|grok|meta\\.ai`",
              "Verschieben Sie den Kanal KI-Assistenten **über Referral**, damit diese Sitzungen nicht als gewöhnliche Verweise zählen.",
              "Speichern Sie und wählen Sie Ihre neue Kanalgruppe im Bericht Traffic-Akquisition aus.",
            ],
          },
          {
            type: "callout",
            title: "Tipp",
            text: "ChatGPT ergänzt die angezeigten Links oft mit utm_source=chatgpt.com, sodass seine Besuche leicht zu erkennen sind. Halten Sie Ihren regulären Ausdruck breit und prüfen Sie ihn alle paar Monate, wenn neue Assistenten dazukommen.",
          },
        ],
      },
      {
        id: "revenue",
        heading: "So sehen Sie den Umsatz, den KI-Assistenten bringen",
        blocks: [
          {
            type: "p",
            text: "Besuche sind nur die halbe Geschichte. Um den Umsatz pro Kanal zu sehen, braucht GA4 Ihre Käufe.",
          },
          {
            type: "ol",
            items: [
              "Sorgen Sie dafür, dass Ihr Shopify-Shop Kaufereignisse an GA4 sendet, zum Beispiel über die App Google & YouTube.",
              "Ergänzen Sie im Bericht Traffic-Akquisition die Messwerte **Gesamtumsatz**, **Schlüsselereignisse** und **Rate der Schlüsselereignisse für Sitzungen**.",
              "Vergleichen Sie den Kanal KI-Assistenten mit Organic Search und Paid Search bei Conversion-Rate und Umsatz pro Sitzung.",
              "Fügen Sie **Landingpage** als sekundäre Dimension hinzu, um zu sehen, zu welchen Produkten und Seiten KI-Assistenten Kundinnen und Kunden schicken.",
            ],
          },
          {
            type: "p",
            text: "In Shopify selbst gruppieren die Analytics-Berichte Sitzungen nach Verweisquelle, und die Conversion-Details jeder Bestellung zeigen, woher der Besuch kam. Das eignet sich für Stichproben; für Trends über die Zeit ist GA4 besser.",
          },
        ],
      },
      {
        id: "limits",
        heading: "Was erfasst die Messung von KI-Traffic nicht?",
        blocks: [
          {
            type: "ul",
            items: [
              "**Besuche ohne Referrer.** Manche Assistenten-Apps öffnen Links, ohne einen Referrer zu übergeben. Hat der Link auch kein UTM-Tag, erscheint der Besuch als Direct.",
              "**Einfluss ohne Klick.** Jemand liest eine Empfehlung und sucht später nach Ihrer Marke oder tippt Ihre Adresse ein. Dieser Verkauf wird nicht der KI zugeschrieben.",
              "**AI Overviews.** Klicks aus Googles AI Overviews zählen als Organic Search, nicht als KI-Traffic.",
            ],
          },
          {
            type: "p",
            text: "Betrachten Sie die Zahlen Ihres KI-Kanals deshalb als Untergrenze. Ein gleichzeitiger Anstieg von direktem Traffic und Markensuchen gehört oft zum selben Effekt.",
          },
        ],
      },
      {
        id: "visibility",
        heading: "Traffic ist das Ergebnis. Sichtbarkeit ist die Ursache.",
        blocks: [
          {
            type: "p",
            text: "Analytics zeigt die Besuche, die KI-Assistenten Ihnen schicken, aber nicht die Empfehlungen, die Sie verpasst haben. Um den Kanal auszubauen, verfolgen Sie, bei welchen Kauffragen Ihre Produkte erscheinen und welche Mitbewerber stattdessen auftauchen. Unser Leitfaden [So empfehlen ChatGPT und andere KI-Assistenten Ihre Produkte](/blog/get-products-recommended-by-chatgpt) erklärt, wie das geht.",
          },
          {
            type: "callout",
            title: "Sichtbarkeit und Umsatz zusammen sehen",
            text: "[Beseam](/product/ai-visibility-tracking) verfolgt Ihre Produkte in sechs KI-Assistenten und verknüpft KI-Sichtbarkeit mit Traffic und Umsatz aus KI-Assistenten, nach Frage, Produkt und Landingpage.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Erfasst GA4 ChatGPT-Traffic automatisch?",
        answer:
          "Grösstenteils ja. Seit Mai 2026 fasst GA4 Sitzungen von erkannten KI-Assistenten, darunter ChatGPT, im Standardkanal „AI Assistant“ zusammen. Besuche ohne Referrer erscheinen weiterhin als Direct.",
      },
      {
        question: "Warum ist Perplexity-Traffic nicht im KI-Assistent-Kanal?",
        answer:
          "Zum Zeitpunkt dieses Artikels steht Perplexity nicht auf der Liste der Quellen, die GA4 als AI Assistant einordnet, daher erscheinen seine Besuche unter Referral. Eine eigene Kanalgruppe mit einem regulären Ausdruck auf die Sitzungsquelle kann ihn einschliessen.",
      },
      {
        question: "Wie viel meines Traffics kommt von KI-Assistenten?",
        answer:
          "Bei den meisten Onlineshops ist es noch ein kleiner Anteil aller Besuche, aber er wächst schnell und konvertiert überdurchschnittlich. Prüfen Sie den Kanal AI Assistant oder Ihre eigene Kanalgruppe im Bericht Traffic-Akquisition in GA4.",
      },
      {
        question: "Kann ich KI-Traffic in Shopify Analytics sehen?",
        answer:
          "Shopifys Berichte gruppieren Sitzungen nach Verweisquelle, sodass Besuche von chatgpt.com oder perplexity.ai dort erscheinen, und die Conversion-Details jeder Bestellung zeigen, woher der Besuch kam. GA4 bietet mehr Kontrolle über Kanalgruppen und Trends.",
      },
      {
        question: "Lohnt es sich, für KI-Traffic zu optimieren?",
        answer:
          "Laut Daten von Adobe zu US-Onlineshops konvertierten Besucherinnen und Besucher aus KI-Assistenten im Juli 2026 60 % besser als anderer Traffic und brachten 53 % mehr Umsatz pro Besuch. Der Kanal ist klein, aber wertvoll, und er wächst schnell.",
      },
    ],
    sources: [
      {
        label: "Google Analytics Hilfe: Standard-Kanalgruppe",
        url: "https://support.google.com/analytics/answer/9756891",
      },
      {
        label: "GA Agency: GA4's new AI Assistant channel is a start",
        url: "https://ga.agency/en/ga4s-new-ai-assistant-channel-is-a-start-its-not-the-full-picture/",
      },
      {
        label: "Digital Power: How to track AI referral traffic in GA4",
        url: "https://digital-power.com/en/inspiration/measuring-ai-referral-traffic-in-web-analytics/",
      },
      {
        label: "Digital Commerce 360: Adobe-Daten zu KI-Traffic, Juli 2026",
        url: "https://www.digitalcommerce360.com/2026/08/19/adobe-ai-referral-traffic-data-july-2026/",
      },
    ],
  },
];
