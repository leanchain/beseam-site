import type { PageCopy } from "./en";

export const pagesDe: PageCopy = {
  common: {
    faqHeading: "Häufige Fragen",
    breadcrumb: "Brotkrumen-Navigation",
    dateLocale: "de-CH",
  },
  productPage: {
    relatedProducts: "Passende Produkte",
    moreIndustries: "Weitere Branchen",
    moreFromBeseam: "Mehr von Beseam",
    explore: (name: string) => `Mehr zu ${name}`,
    aiAssistant: "KI-Assistent",
    recommended: "Empfohlen",
    competitor: "Mitbewerber",
  },
  pricing: {
    metaTitle: "Preise | Beseam",
    metaDescription:
      "Einfache Pläne für KI-Suchoptimierung nach Grösse Ihres Katalogs. Starten Sie mit 14 Tagen gratis und wählen Sie dann den passenden Plan.",
    jsonLdName: "Beseam Preise",
    title: "Einfache Preise, die mit Ihrem Katalog wachsen",
    intro:
      "Jeder Plan umfasst alle sechs KI-Assistenten und beginnt mit einer 14-tägigen kostenlosen Testphase. Wählen Sie einen Plan nach der Grösse Ihres Katalogs, und wechseln Sie, wann immer Sie möchten.",
    billingPeriod: "Abrechnungszeitraum",
    monthly: "Monatlich",
    annual: "Jährlich",
    twoMonthsFree: "2 Monate gratis",
    mostPopular: "Am beliebtesten",
    perMonth: "/ Monat",
    billedAnnually: (amount: string) =>
      `Jährliche Abrechnung: ${amount} pro Jahr, exkl. MwSt.`,
    billedMonthly: "Monatliche Abrechnung, exkl. MwSt.",
    startTrial: "Kostenlos testen",
    everythingIn: (name: string) => `Alles aus ${name}, plus:`,
    enterpriseTitle: "Enterprise",
    enterpriseBody:
      "Für Kataloge mit mehr als 5000 Produkten, mehrere Marken oder Agenturen. Ein individueller Plan mit fester Ansprechperson und Onboarding.",
    talkToUs: "Sprechen Sie mit uns",
    compareHeading: "Pläne vergleichen",
    feature: "Funktion",
    included: "Inbegriffen",
    notIncluded: "Nicht inbegriffen",
    faqHeading: "Fragen zu den Preisen",
  },
  about: {
    metaTitle: "Über Beseam",
    metaDescription:
      "Beseam hilft Onlineshops, ihre Produkte von KI-Assistenten wie ChatGPT, Claude und Gemini empfehlen zu lassen. Lernen Sie das Team dahinter kennen.",
    jsonLdDescription:
      "Beseam hilft Onlineshops, ihre Produkte von KI-Assistenten empfehlen zu lassen, und macht KI zu einem Umsatzkanal. Lernen Sie den Gründer und die Beraterinnen und Berater dahinter kennen.",
    breadcrumb: "Über uns",
    title: "Wir helfen Onlineshops, von KI empfohlen zu werden.",
    intro:
      "Beseam ist der einfachste Weg für Onlineshops, ihre Produkte von KI-Assistenten wie ChatGPT, Claude und Gemini empfehlen zu lassen. Wir verfolgen, wo Ihre Produkte in KI-Antworten erscheinen, optimieren Ihre Produktbeschreibungen, Inhalte und Technik und zeigen, was es Ihnen bringt, damit KI zu einem Umsatzkanal für Ihren Shop wird.",
    swissFlag: "Schweizer Flagge",
    builtIn: "Entwickelt in Zürich, Schweiz",
    founderEyebrow: "Der Gründer",
    founderHeading: "Entwickelt von einem Ingenieur aus Google und Amazon.",
    founderParagraphs: [
      "Beseam wurde von Pankaj Kumar gegründet, einem ehemaligen Ingenieur von Google und Amazon mit Schwerpunkt auf Messung, Zuverlässigkeit und Dateninfrastruktur.",
      "Im vergangenen Jahr hat er eng mit Gründerinnen und Gründern sowie Betreiberinnen und Betreibern von Onlineshops an echten Shops gearbeitet und dabei immer dieselbe Kaufreise verfolgt: wie Produkte gefunden werden, was bei der Wahl hilft und wo Käufe abbrechen.",
      "Immer wieder zeigte sich dasselbe Problem: Teams konnten Traffic, Seiten, Verhalten und Conversion messen, aber kaum erkennen, warum sich jemand für ein Produkt und gegen ein anderes entschied. Beseam wurde gebaut, um festzuhalten, was passiert ist, was sich geändert hat und was dabei herauskam, alles an einem Ort.",
    ],
    founderPhotoAlt: "Pankaj Kumar, Gründer von Beseam",
    founderRole: "Gründer, Beseam",
    advisorsHeading: "Verwurzelt im echten Handel.",
    advisorsIntro:
      "Beseam wird von Praktikerinnen und Praktikern beraten, die Marken aufgebaut, E-Commerce-Teams geführt und direkt mit den Systemen gearbeitet haben, auf die Händler angewiesen sind.",
    advisors: {
      bettina: {
        role: "E-Commerce-Expertin & DTC-Gründerin",
        bio: "Mitgründerin von Dancing Queens und Prüfungsexpertin für E-Commerce beim Handelsverband.swiss. Ehemalige Co-Geschäftsführerin von HelloFresh Suisse.",
      },
      fabrizio: {
        role: "Gründer & Unternehmer",
        bio: "Gründer von OLEYVO. Ehemaliger Key Partner Growth Manager bei Too Good To Go. Dozent für Start-up und Unternehmertum an der STF.",
      },
      laura: {
        role: "Marketing & Business Development",
        bio: "Arbeitet in Marketing und Business Development. Zuvor Product Owner einer B2B-Plattform für Soft-Skill-Coaching. Führt ihre eigene Schweizer E-Commerce-Marke.",
      },
    },
    teamsHeading:
      "Gemacht für die Menschen, die E-Commerce-Wachstum verantworten.",
    teamsIntro:
      "Viele Teams beeinflussen, ob jemand kauft. Beseam hält fest, was passiert ist, welche Änderung vorgeschlagen wurde, wie Sie entschieden haben und was dabei herauskam, alles an einem Ort.",
    teams: [
      {
        role: "Produkt-Content und Merchandising",
        body: "Sehen Sie, wo Produkte schwer zu finden oder zu wählen sind, und prüfen Sie dann die Produkt- und Merchandising-Hinweise, die eine Änderung wert sind.",
      },
      {
        role: "E-Commerce und Betrieb",
        body: "Verbinden Sie Kundenverhalten, Hürden im Shop, freigegebene Änderungen und gemessene Ergebnisse rund um dieselbe geschäftliche Frage.",
      },
      {
        role: "Entwickler und Agenturen",
        body: "Starten Sie mit belegten Hinweisen, dem betroffenen Umfang und einem klaren Umsetzungsweg statt mit einem allgemeinen Fehlerbericht.",
      },
    ],
    ctaHeading:
      "Sehen Sie, wie Beseam eine Kaufreise von Anfang bis Ende verfolgt.",
    ctaBody:
      "In einer 20-minütigen Shop-Durchsprache zeigen wir anhand eines echten Befunds, was Beseam gefunden hat, was es ändern würde und was es danach erneut prüft.",
    ctaButton: "20-minütige Shop-Durchsprache buchen",
  },
  contact: {
    metaTitle: "Kontakt | Beseam",
    metaDescription:
      "Buchen Sie ein 20-minütiges Gespräch mit dem Beseam-Team, oder senden Sie uns eine kurze Nachricht und erhalten Sie innerhalb eines Arbeitstags eine Antwort.",
    jsonLdName: "Kontakt zu Beseam",
    breadcrumb: "Kontakt",
    title: "Sprechen wir über Ihren Shop",
    intro:
      "Möchten Sie wissen, was Beseam für Ihren Onlineshop tun kann, oder haben Sie zuerst eine Frage? Buchen Sie ein 20-minütiges Kennenlerngespräch, oder senden Sie uns eine Nachricht. Wir melden uns innerhalb eines Arbeitstags.",
    callPrompt: "Lieber direkt sprechen? Buchen Sie ein 20-minütiges Gespräch.",
    bookCall: "20-minütiges Gespräch buchen",
    formEyebrow: "Oder schreiben Sie uns",
    formHeading: "Wir lesen jede Nachricht.",
    name: "Name",
    email: "Geschäftliche E-Mail",
    message: "Nachricht",
    messagePlaceholder: "Wobei können wir helfen?",
    honeypot: "Website",
    sending: "Wird gesendet…",
    send: "Nachricht senden",
    sendError:
      "Ihre Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es gleich noch einmal, oder buchen Sie stattdessen ein Gespräch.",
    sentEyebrow: "Nachricht erhalten",
    sentHeading: "Wir antworten innerhalb eines Arbeitstags.",
    swissFlag: "Schweizer Flagge",
    officeEyebrow: "Unser Büro",
    officeHeading: "Mit Sitz in Zürich, Schweiz",
    officeBody:
      "Wir entwickeln Beseam in Zürich, zwischen See und Alpen. Unsere Gespräche finden online statt, also sind wir nur einen Klick entfernt, wo auch immer Ihr Onlineshop zu Hause ist.",
    officeImageAlt:
      "Illustration von Zürich: die Doppeltürme des Grossmünsters, der Turm des Fraumünsters und Altstadthäuser am See, mit den Alpen im Hintergrund.",
  },
  blog: {
    metaTitle: "Blog: KI-Suche für Onlineshops | Beseam",
    metaDescription:
      "Praktische Leitfäden für Onlineshops: wie Sie Ihre Produkte von ChatGPT und anderen KI-Assistenten empfehlen lassen und KI zu einem Umsatzkanal machen.",
    jsonLdName: "Beseam Blog",
    breadcrumb: "Blog",
    title: "Beseam Blog",
    intro:
      "Praktische Leitfäden dazu, wie Sie Ihre Produkte von ChatGPT und anderen KI-Assistenten empfehlen lassen und KI zu einem Umsatzkanal machen.",
    minRead: (minutes: number) => `${minutes} Min. Lesezeit`,
    readGuide: "Zum Leitfaden",
    author: "Das Beseam-Team",
    by: (author: string) => `Von ${author}`,
    updated: "Aktualisiert am",
    inShort: "Kurz gesagt",
    onThisPage: "Auf dieser Seite",
    sources: "Quellen",
    keepReading: "Weiterlesen",
  },
  compare: {
    metaTitle: "Beseam vs Tools für KI-Sichtbarkeit: Vergleiche | Beseam",
    metaDescription:
      "Beseam im Vergleich mit Profound, Peec AI, Otterly.AI, Semrush und anderen KI-Tools: was jedes am besten kann und wo Beseam weitergeht.",
    jsonLdName: "Beseam Vergleiche",
    breadcrumb: "Vergleiche",
    title: "Beseam im Vergleich mit anderen Tools für KI-Sichtbarkeit.",
    intro:
      "Die meisten Tools für KI-Sichtbarkeit zeigen, ob die KI Ihre Marke erwähnt. Beseam ist für Onlineshops gemacht: Es verfolgt Ihre Produkte in KI-Antworten, optimiert dann Ihre Produktseiten, Inhalte und Technik und zeigt, was es Ihnen bringt.",
    meta: "Offizielle Produktquellen · geprüft am 22. August 2026",
    gridHeading: (count: number) => `${count} Tools im direkten Vergleich`,
    compare: "Vergleichen",
    vs: (name: string) => `Beseam vs ${name}`,
    reviewed: (category: string, date: string) =>
      `${category} · geprüft am ${date}`,
    choiceHeading: (name: string) => `Beseam oder ${name}?`,
    chooseCompetitor: (name: string) => `Wählen Sie ${name}, wenn`,
    chooseBeseam: "Wählen Sie Beseam, wenn",
    useBoth: "Nutzen Sie beide, wenn",
    notReplace: "Was Beseam nicht ersetzt",
    practiceHeading: "Was sich in der Praxis ändert.",
    checked: (date: string) => `Geprüft am ${date}`,
    practicalQuestion: "Praktische Frage",
    fitHeading: "Wählen Sie das Tool, das zur Aufgabe passt.",
    chooseWhen: (name: string) => `Wählen Sie ${name}, wenn`,
    howHeading: "So arbeiten die Tools im Vergleich.",
    question: "Frage",
    workflowHeading: "Was passiert, nachdem das Signal auftaucht?",
    step: "Schritt",
    evidenceHeading: "Beseam in der Praxis",
    faqHeading: "Bevor Sie Ihre Tools ändern.",
    sourcesHeading: "Geprüfte Quellen",
    sourcesMeta: (date: string) => `Offizielle Produktquellen · ${date}`,
    relatedHeading: "Weitere Vergleiche",
    seeAll: "Alle Vergleiche ansehen",
    ctaButton: "Beseam mit meinen Tools ansehen",
    hubCtaHeading:
      "Sehen Sie, wie Beseam zu den Tools passt, die Sie bereits nutzen.",
    hubCtaBody:
      "In einer 20-minütigen Shop-Durchsprache zeigen wir anhand eines echten Befunds, wie Beseam Ihre bestehenden Systeme verbindet, eine Änderung zur Freigabe vorbereitet und prüft, was danach passiert.",
    detailCtaHeading:
      "Behalten Sie die Systeme, die funktionieren. Verbinden Sie, was sie getrennt lassen.",
    detailCtaBody:
      "In einer 20-minütigen Shop-Durchsprache zeigen wir anhand eines echten Befunds, wie Beseam Ihre bestehenden Tools verbindet und den Weg von der Erkenntnis bis zur gemessenen Änderung in Bewegung hält.",
  },
  report: {
    metaTitle: "KI-Shopping-Bericht | Beseam",
    metaDescription:
      "Wir stellen KI-Assistenten dieselben öffentlichen Kauffragen und veröffentlichen, welche Engine welche Marke nennt, mit Datum, Bezugsgrösse und Methode.",
    breadcrumb: "KI-Shopping-Bericht",
    title: "KI-Shopping-Bericht",
    intro: (questions: number, engines: string, categories: string) =>
      `Wir haben ${engines} dieselben ${questions} Kauffragen aus den Bereichen ${categories} gestellt. Wir haben jede vollständige Antwort behalten und festgehalten, welche Marken jeder Assistent genannt hat.`,
    list: (items: readonly string[]) =>
      items.length < 2
        ? items.join("")
        : `${items.slice(0, -1).join(", ")} und ${items[items.length - 1]}`,
    /** German keeps nouns capitalised inside a sentence. */
    lowercaseCategories: false,
    categoryNames: {
      "Consumer tech": "Unterhaltungselektronik",
      Supplements: "Nahrungsergänzung",
      "Apparel & footwear": "Bekleidung & Schuhe",
      "Food & drink": "Essen & Trinken",
    } as Record<string, string>,
    statDate: "Gefragt am",
    statEngines: "KI-Engines",
    statAnswers: "Vollständige Antworten",
    statNamings: "Markennennungen",
    soloHeading: (share: number) =>
      `${share} % der Markennennungen kamen von nur einem Assistenten.`,
    soloSub: (total: number) =>
      `${total} Nennungen, danach, wie viele Assistenten die Marke genannt haben`,
    allEngines: (count: number) =>
      count === 3 ? "Alle drei Engines" : `Alle ${count} Engines`,
    oneEngine: "Nur eine Engine",
    nEngines: (count: number) =>
      count === 2 ? "Zwei Engines" : `${count} Engines`,
    aliasHeading: "Die Assistenten antworten nicht gleich.",
    aliasBody: (
      questions: number,
      loudest: string,
      ratio: string,
      quietest: string,
    ) =>
      `Bei denselben ${questions} Fragen zeigte ${loudest} pro Antwort ${ratio}-mal so viele Marken wie ${quietest}. Wenn eine Engine geantwortet, aber keine Marke genannt hat, ist auch das festgehalten.`,
    tableCaption: (questions: number) =>
      `Summen pro Engine über die ${questions} dargestellten Fragen`,
    colEngine: "Engine",
    colAnswers: "Antworten",
    colNamed: "Genannte Marken",
    colPerAnswer: "Pro Antwort",
    colAlone: "Nur von ihr genannt",
    colNothing: "Geantwortet, nichts genannt",
    tableNote: (questions: number, date: string) =>
      `Eine Zeile pro Engine über dieselben ${questions} Fragen, ${date}. Eine Nennung ist eine Marke in einer Antwort; „nur von ihr genannt“ zählt die Marken, die keine andere Engine bei dieser Frage wiederholt hat. Menge ist nicht Qualität, und dies ist keine Rangliste der Engines.`,
    questionsHeading: "Jede Frage und welche Engine was genannt hat.",
    legendNamed: "Genannt",
    legendAll: (count: number) =>
      count === 3 ? "Von allen dreien genannt" : `Von allen ${count} genannt`,
    legendNot: "Nicht genannt",
    columnsNote: (engines: string) =>
      `Die Spalten stehen in jeder Grafik in derselben Reihenfolge: ${engines}. Die Zahl unter einer Engine zeigt, wie viele Marken sie bei dieser Frage genannt hat. Eine Spalte mit Strichen unter einer 0 bedeutet also, dass die Engine geantwortet und nichts genannt hat. Eine Engine ohne vollständige Antwort wird bei der Frage ganz weggelassen, statt als Null zu erscheinen.`,
    methodHeading: "So entsteht jede Zahl auf dieser Seite.",
    methodIntro:
      "Dieselbe Auffindbarkeitsprüfung wie auf der Startseite von Beseam, angewendet auf eine öffentliche Kategorie statt auf einen Kundenshop. Datum und Bezugsgrösse bleiben dabei, damit sich das Ergebnis im Kontext lesen lässt.",
    method: [
      [
        "Die Frage",
        "Eine Frage, wie sie eine echte Kundin oder ein echter Kunde eintippen würde, jeder Engine wörtlich gestellt. Veröffentlicht genau so, wie sie gestellt wurde: nie nachträglich umformuliert, damit sie zum Ergebnis passt.",
      ],
      [
        "Die Engines",
        "Jedem Assistenten wird dieselbe Frage gestellt, und jeder hat seine eigene Spalte. So lässt sich jede Markierung auf dieser Seite der Engine zuordnen, die sie gesetzt hat.",
      ],
      [
        "Die Bezugsgrösse",
        "Jede Zahl bezieht sich auf die Engines, die tatsächlich geantwortet haben, und diese Zahl steht in der Grafik. Nichts wird über Fragen oder Kategorien gemittelt.",
      ],
      [
        "Das Datum",
        "Antworten verändern sich. Jede Grafik trägt das Datum ihrer Erhebung und wird nie stillschweigend unter denselben Zahlen aktualisiert.",
      ],
      [
        "Wessen Daten das sind",
        "Öffentliche Marken, von aussen beobachtet. Kein Kundenshop, kein privater Katalog und keine Behauptung darüber, warum eine Marke genannt wurde oder nicht.",
      ],
      [
        "Was nicht behauptet wird",
        "Genannt zu werden ist weder eine Rangliste noch eine Empfehlung, und eine nicht genannte Marke wird hier nicht bewertet: Sie wird nur als in dieser Antwort fehlend festgehalten.",
      ],
    ] as readonly (readonly [string, string])[],
    figEngines: (count: number, date: string) => `${count} Engines · ${date}`,
    figTotals: (total: number, solo: number) =>
      `Insgesamt ${total} Marken genannt, ${solo} davon von nur einer Engine.`,
    figBrand: "Marke",
    figMore: (hidden: number) =>
      `+ ${hidden} weitere Marken, jeweils von nur einer Engine genannt.`,
    figCaption: (index: number, category: string) =>
      `Abb. ${index}: ${category}`,
    figNote: (engines: string, date: string) =>
      `Wörtlich gestellt auf ${engines}, ${date}. Öffentliche Marken, beobachtet: keine Kundendaten, und es wird keine Rangliste behauptet.`,
    figNamedBy: (brand: string, engines: string) =>
      `${brand}: genannt von ${engines}`,
  },
};
