import type {
  ComparisonTemplate,
  PracticalComparison,
  SeedText,
} from "@/lib/comparisons";

/** German comparison copy (Swiss spelling: ss, never ß; formal "Sie"). */
export const TEMPLATE_DE: ComparisonTemplate = {
  category: "KI-Auffindbarkeit & Sichtbarkeit",
  metaTitle: (name) => `Beseam vs ${name}: KI-Sichtbarkeit im Vergleich`,
  metaDescription: (name) =>
    `Beseam und ${name} im Vergleich: was jedes Tool für KI-Sichtbarkeit am besten kann und wann Sie Beseam wählen sollten.`,
  introSuffix:
    "Beseam beobachtet ebenfalls KI-Antworten und verfolgt eine verpasste Kauffrage bis zu dem Produkt oder der Seite, die Sie ändern können. Es bereitet die Änderung vor und stellt danach dieselbe Frage erneut.",
  competitorSummary: (name, bestFor) => `Wählen Sie ${name}, wenn ${bestFor}`,
  beseamSummary:
    "Wählen Sie Beseam, wenn Sie mehr als einen Sichtbarkeitswert brauchen: sehen, welche Kauffrage Sie verpasst haben, was Sie im Shop ändern können, die Änderung mit Freigabe umsetzen und erneut fragen.",
  useTogetherSummary: (name) =>
    `Behalten Sie ${name} für das spezialisierte Monitoring der KI-Sichtbarkeit. Nutzen Sie Beseam, wenn aus einer verpassten Kauffrage eine Änderung im Shop werden und diese anschliessend geprüft werden soll.`,
  chooseBeseamWhen: [
    "Eine fehlende Empfehlung oder Quellenangabe muss dem richtigen Produkt, der richtigen Seite, Quelle oder Katalogangabe zugeordnet werden, bevor jemand Inhalte ändert.",
    "Das Team will sehen, wer empfohlen wurde und welche Produkt-, Shop-, Kunden- oder Kaufdaten erklären können, warum.",
    "Die ursprüngliche Kauffrage, die vorgeschlagene Änderung, die Freigabe, die Umsetzung und die anschliessende Prüfung sollen zusammenbleiben.",
  ],
  notAReplacementFor: (name) =>
    `Beseam ersetzt nicht eins zu eins das spezialisierte Reporting zur KI-Sichtbarkeit von ${name}, das Benchmarking von Mitbewerbern oder den Monitoring-Prozess, den Teams dort bereits nutzen.`,
  rows: {
    primaryJob: {
      criterion: "Hauptaufgabe",
      beseam:
        "KI-Antworten beobachten, eine verpasste Empfehlung dem richtigen Produkt oder der richtigen Seite zuordnen, eine freigegebene Änderung umsetzen und dieselbe Kauffrage erneut stellen.",
    },
    diagnosis: {
      criterion: "Diagnose",
      beseam:
        "Antwort, Quellen, konkurrierende Marken, Produktfakten und Seitenprüfungen bei derselben Frage festhalten.",
    },
    actionModel: {
      criterion: "Vom Befund zur Massnahme",
      beseam:
        "Einen Befund in eine konkrete Änderung verwandeln, die auf die Freigabe der Markeninhaberin oder des Markeninhabers wartet, statt als weitere Empfehlung zu enden.",
    },
    afterAnswer: {
      criterion: "Was nach der Antwort passiert",
      competitor:
        "Spezialisierte Daten zu KI-Antworten, Erwähnungen, Quellenangaben, Mitbewerbern, Fragen und Quellen.",
      beseam:
        "Die Antwort mit Produktfakten, dem Shop, dem Kundenverhalten, dem Checkout, den Bestellungen und derselben, erneut gestellten Frage verbinden.",
    },
    relationship: {
      criterion: "Am besten geeignet für",
      competitor:
        "Spezialisiertes Monitoring und Analyse der KI-Auffindbarkeit.",
      beseam:
        "Führt eine verpasste Kauffrage bis zu einer freigegebenen Änderung im Shop und prüft sie erneut.",
    },
  },
  workflow: {
    observe: {
      step: "Die Antwort beobachten",
      competitor:
        "Eine Reihe von Fragen verfolgen und zeigen, wie oft die Marke erscheint, wie sie im Vergleich zu Mitbewerbern abschneidet und welche Quellen genannt werden.",
      beseam:
        "Eine echte Kauffrage den verfolgten KI-Assistenten stellen und die Antwort, die Empfehlungen und die Quellen dahinter festhalten.",
    },
    understand: {
      step: "Die Lücke verstehen",
      beseam:
        "Die verpasste Empfehlung dem richtigen Produkt, der richtigen Seite, Quelle, Aussage oder dem Problem im Shop zuordnen, bevor entschieden wird, was sich ändert.",
    },
    change: {
      step: "Ändern, was Sie steuern",
      beseam:
        "Die vorgeschlagene Änderung, das betroffene Produkt oder die Seite, die verantwortliche Person und die Freigabe bei der ursprünglichen Antwort festhalten.",
    },
    askAgain: {
      step: "Erneut fragen",
      competitor:
        "Die verfolgten Fragen weiter beobachten und spätere Sichtbarkeitswerte vergleichen.",
      beseam:
        "Dieselbe Kauffrage erneut stellen und die Antworten vor und nach der Änderung zusammen mit der umgesetzten Änderung festhalten.",
    },
  },
  evidenceAlt:
    "Echter Beseam-Arbeitsbereich zur KI-Sichtbarkeit mit Antworten von Assistenten und Hinweisen zu Mitbewerbern",
  evidenceCaption:
    "Echte Beseam-Daten zur KI-Auffindbarkeit. Frage, Antwort, konkurrierende Empfehlung, Belege, Änderung und erneute Prüfung bleiben verbunden, statt als Sichtbarkeitswert zu enden.",
  faqs: {
    replace: (name) => ({
      question: `Ersetzt Beseam ${name}?`,
      answer: `Nicht unbedingt. ${name} ist eine spezialisierte Plattform für KI-Sichtbarkeit. Beseam beobachtet ebenfalls KI-Antworten und verbindet eine relevante verpasste Empfehlung mit den Produkt-, Shop-, Kunden- und Ergebnisdaten, die Sie brauchen, um über den nächsten Schritt zu entscheiden.`,
    }),
    together: (name) => ({
      question: `Lassen sich ${name} und Beseam zusammen nutzen?`,
      answer: `Ja. ${name} kann eine spezialisierte Monitoring-Quelle bleiben, während Beseam den Befund mit dem betroffenen Produkt oder der Kaufreise, der freigegebenen Arbeit und dem späteren Ergebnis verbindet. Welche Integrationen genau verfügbar sind, hängt vom Setup ab.`,
    }),
    choose: (name, bestFor) => ({
      question: `Wann sollte ich ${name} statt Beseam wählen?`,
      answer: `Wählen Sie ${name}, wenn ${bestFor} Wählen Sie Beseam, wenn die grössere Aufgabe darin besteht, Erkenntnisse zur Auffindbarkeit in Entscheidungen zu Produkt, Shop, Kundschaft und Geschäft zu überführen, statt beim Monitoring stehen zu bleiben.`,
    }),
  },
};

export const SEED_TEXT_DE: Record<string, SeedText> = {
  profound: {
    headline:
      "Profound misst KI-Sichtbarkeit. Beseam zeigt, was Sie ändern sollten, wenn Ihre Produkte fehlen.",
    platformSummary:
      "Profound ist eine Plattform für KI-Sichtbarkeit, die Markenpräsenz, Share of Voice und Quellenangaben über mehrere Antwortmaschinen misst, mit Plattformvergleichen, die zwischen Sichtbarkeit, Share of Voice und Anteil an Quellenangaben wechseln können.",
    bestFor:
      "Markenmonitoring über mehrere Engines, Benchmarking von Mitbewerbern und flexible Analysen von Sichtbarkeit und Quellenangaben die Kernaufgabe sind.",
    strengths: [
      "Sie brauchen einen spezialisierten Plattformvergleich über mehrere KI-Engines.",
      "Ihr Team will dieselbe Wettbewerbsansicht zwischen Sichtbarkeit, Share of Voice und Anteil an Quellenangaben wechseln.",
      "Reporting zur KI-Sichtbarkeit und Wettbewerbsmonitoring sind der Hauptprozess.",
    ],
    monitoringModel:
      "Markensichtbarkeit, Share of Voice und Anteil an Quellenangaben über mehrere KI-Plattformen messen.",
    diagnosisModel:
      "Marken und Engines vergleichen, um zu erkennen, wo sich Sichtbarkeit oder Anteil an Quellenangaben über die verfolgten Fragen unterscheiden.",
    actionModel:
      "Öffentliche Produktmaterialien betonen Messung und Plattformvergleich; Teams überführen die Änderungen in ihre bestehenden Abläufe.",
  },
  "peec-ai": {
    headline:
      "Peec AI verfolgt die Sichtbarkeit in der KI-Suche. Beseam zeigt, was Sie ändern sollten, wenn ein Produkt fehlt.",
    platformSummary:
      "Peec AI ist eine Analyseplattform für die KI-Suche, die Sichtbarkeit, Share of Voice, Stimmung, Position, Mitbewerber, zitierte Domains und einzelne Chats verfolgt, mit KI-Engines als oberstem Filter.",
    bestFor:
      "ein fokussierter Analysebereich für Sichtbarkeit, Share of Voice, Stimmung, Position, Mitbewerber, Domains und Chats in der KI-Suche der Hauptbedarf ist.",
    strengths: [
      "Sie wollen ein fokussiertes Dashboard für KI-Sichtbarkeit, Share of Voice, Stimmung und durchschnittliche Position.",
      "Ihr Team will einzelne Mitbewerber, zitierte Domains und Chats hinter den Gesamtwerten genauer ansehen.",
      "Dieselbe Analyse nach KI-Engine zu filtern, ist nützlicher als eine grosse Matrix aus Marken und Engines.",
    ],
    monitoringModel:
      "Sichtbarkeit, Share of Voice, Stimmung und Position über Marken und KI-Engines verfolgen.",
    diagnosisModel:
      "Mitbewerber, Domains und einzelne Chats genauer ansehen, um zu verstehen, welche Fragen und Quellen die Lücke verursachen.",
    actionModel:
      "Teams nutzen die Monitoring- und Detaildaten, um zu entscheiden, was sie in ihren bestehenden Inhalten und Abläufen ändern.",
  },
  "otterly-ai": {
    headline:
      "Otterly.AI macht aus Befunden zur Sichtbarkeit To-dos. Beseam führt eine verpasste Kauffrage bis zur Änderung im Shop und prüft sie erneut.",
    platformSummary:
      "Otterly.AI beobachtet Markensichtbarkeit und Stimmung in der KI-Suche, mit einem Brand Visibility Index und einem Empfehlungsprozess, der Befunde in eine verfolgte To-do-Liste überführen kann.",
    bestFor:
      "Monitoring der KI-Suche mit einem strukturierten Prozess von Empfehlungen zu To-dos die zentrale Anforderung ist.",
    strengths: [
      "Sie wollen einen Brand Visibility Index und Monitoring der KI-Suche mit Fokus auf Markenpräsenz und Kaufwahrscheinlichkeit.",
      "Ihr Team schätzt eine Ansicht der Stimmung nach Marke und Engine, um ungleiche Wahrnehmung zwischen Assistenten zu erkennen.",
      "Empfehlungen sollen zu verfolgten To-dos werden, die im spezialisierten Tool erledigt oder archiviert werden.",
    ],
    monitoringModel:
      "Markensichtbarkeit, aus der Position abgeleitete Kaufwahrscheinlichkeit, Stimmung und Unterschiede zwischen Engines in der KI-Suche beobachten.",
    diagnosisModel:
      "Sichtbarkeit, Stimmung, Fragen und Quellen nutzen, um zu erkennen, wo die Marke schwächer abschneidet und welche Empfehlungen Aufmerksamkeit verdienen.",
    actionModel:
      "Empfehlungen lassen sich in eine To-do-Liste übernehmen, bis zur Erledigung verfolgen und archivieren, wenn die Arbeit vorankommt.",
  },
  rankscale: {
    headline:
      "Rankscale misst KI-Sichtbarkeit im Detail. Beseam zeigt, was Sie ändern sollten, wenn eine Kauffrage Sie verpasst.",
    platformSummary:
      "Rankscale ist eine Plattform für Sichtbarkeit in der KI-Suche, die Sichtbarkeit, Erwähnungen, Quellenangaben, Stimmung, Position und Erkennungsrate getrennt ausweist, mit Audit-Empfehlungen zu schwachen Fragengruppen.",
    bestFor:
      "Teams ein detailliertes Reporting zur KI-Suche wollen, inklusive einer Erkennungsrate, die zeigt, wann ein fehlendes Ergebnis einfach eine fehlgeschlagene Beobachtung sein könnte.",
    strengths: [
      "Sie wollen Sichtbarkeit, Erwähnungen, Quellenangaben, Stimmung, Position und Erkennungsrate getrennt sehen.",
      "Eine echte Null von einer schwachen oder fehlgeschlagenen Beobachtung zu unterscheiden, ist für Ihr Reporting wichtig.",
      "Audit-Empfehlungen zu schwachen Fragengruppen sind der Hauptweg von der Diagnose zur Arbeit.",
    ],
    monitoringModel:
      "Sichtbarkeit, Erwähnungen, Quellenangaben, Stimmung, Position und Erkennungsrate über Fragengruppen der KI-Suche verfolgen.",
    diagnosisModel:
      "Unterscheiden, ob eine Antwort überhaupt erkannt wurde und ob die Marke darin vorkam, und dann schwache Fragengruppen und Audit-Befunde prüfen.",
    actionModel:
      "Audit-Empfehlungen sind mit den schwachen Fragengruppen verknüpft, damit Teams die Folgearbeit priorisieren können.",
  },
  "athena-hq": {
    headline:
      "Athena verfolgt den Share of Voice in der KI und empfiehlt Inhalte. Beseam verknüpft eine verpasste Kauffrage mit der Änderung an Produkt oder Shop und prüft erneut.",
    platformSummary:
      "Athena ist eine Plattform für Sichtbarkeit in der KI-Suche mit Fokus auf Share of Voice, Erkennung von Mitbewerbern, Quellenanalyse und einem Action Center für priorisierte Empfehlungen und Content-Arbeit.",
    bestFor:
      "Monitoring des Share of Voice in der KI und ein spezialisiertes Action Center, das Sichtbarkeitslücken in priorisierte Content-Empfehlungen verwandelt, die wichtigsten Kaufkriterien sind.",
    strengths: [
      "Sie wollen Share of Voice in der KI-Suche und Monitoring von Mitbewerbern als eigenes Programm.",
      "Quellen- und Zitationsanalyse stehen im Zentrum, wenn Ihr Team untersucht, warum Mitbewerber erscheinen.",
      "Ein spezialisiertes Action Center mit priorisierten Empfehlungen und Unterstützung beim Schreiben passt zu Ihrer Arbeitsweise.",
    ],
    monitoringModel:
      "Share of Voice in der KI-Suche messen und Markenerwähnungen, Mitbewerber, Quellen und Leistung pro Engine vergleichen.",
    diagnosisModel:
      "Daten zu Mitbewerbern und Quellen nutzen, um Sichtbarkeitslücken und die Content-Chancen zu erkennen, die die Präsenz in Quellenangaben am ehesten verbessern.",
    actionModel:
      "Das Action Center priorisiert Empfehlungen und unterstützt Content-Arbeit, die die Wahrscheinlichkeit von Quellenangaben erhöhen soll.",
  },
  amionai: {
    headline:
      "AmIOnAI gibt Ihnen einen Plan für KI-Sichtbarkeit. Beseam verknüpft jede verpasste Kauffrage mit der Änderung im Shop und dem Ergebnis.",
    platformSummary:
      "AmIOnAI ist ein Produkt für KI-Sichtbarkeit rund um einen Sichtbarkeitswert, eine Quellenanalyse und einen Wochenplan, um die Präsenz in ChatGPT und in den KI-Oberflächen von Google zu verbessern.",
    bestFor:
      "eine geführte Bewertung der KI-Sichtbarkeit und ein konkreter Wochenplan wertvoller sind als ein umfassender Analysebereich.",
    strengths: [
      "Sie wollen einen einfachen Wert für KI-Sichtbarkeit und einen geführten Massnahmenplan statt eines grossen Monitoring-Bereichs.",
      "ChatGPT und die KI-Oberflächen von Google haben für das Programm Priorität.",
      "Wöchentliche Aufgaben mit einer geschätzten Wirkung auf Fragen passen zur Arbeitsweise des Teams.",
    ],
    monitoringModel:
      "Einen KI-Sichtbarkeitswert über relevante Fragen verfolgen und die Quell-Domains hinter diesen Antworten zeigen.",
    diagnosisModel:
      "Bewertung, Abdeckung der Fragen und Quell-Domains nutzen, um zu entscheiden, welche Lücken in den Massnahmenplan gehören.",
    actionModel:
      "Im Zentrum steht ein Wochenplan mit Aufgaben, die nach ihrer erwarteten Wirkung auf relevante Fragen beschrieben sind.",
  },
  "ahrefs-brand-radar": {
    headline:
      "Ahrefs Brand Radar misst KI-Sichtbarkeit im Massstab der Suche. Beseam zeigt, was Sie ändern sollten, wenn Ihr Produkt fehlt.",
    platformSummary:
      "Ahrefs Brand Radar erweitert die Wettbewerbsanalyse der Suche um KI-Sichtbarkeit, mit Share of Voice in der KI, Erwähnungen, Quellenangaben und Vergleichen pro Plattform auf Basis der Suchnachfragedaten von Ahrefs.",
    bestFor:
      "KI-Sichtbarkeit in einen umfassenderen Ahrefs-Prozess der Wettbewerbsanalyse gehört und ein nach Suchvolumen gewichteter Share of Voice für das Team nützlich ist.",
    strengths: [
      "Ihr SEO-Team arbeitet bereits in Ahrefs und will KI-Sichtbarkeit neben breiteren Such- und Wettbewerbsdaten sehen.",
      "Ein nach Suchvolumen gewichteter Share of Voice in der KI ist eine nützliche Art, den verfolgten Markt zu priorisieren.",
      "Erwähnungen und Quellenangaben über mehrere KI-Plattformen sollen als Wettbewerbsdaten erkundet werden, nicht als Aufgabenliste.",
    ],
    monitoringModel:
      "Share of Voice in der KI, Erwähnungen, Quellenangaben und Leistung pro Plattform mit dem Kontext der Suchnachfrage messen.",
    diagnosisModel:
      "Wettbewerbsdaten zu Erwähnungen und Quellenangaben nutzen, um zu verstehen, welche Marken und Quellen den verfolgten Markt der KI-Suche dominieren.",
    actionModel:
      "Brand Radar ist vor allem ein Werkzeug für Messung und Wettbewerbsanalyse; Teams überführen die Erkenntnisse in ihre bestehenden SEO- und Content-Prozesse.",
  },
  "semrush-ai-toolkit": {
    headline:
      "Semrush findet Themen- und Quellenlücken in der KI. Beseam macht aus einer verpassten Kauffrage eine Änderung im Shop und prüft erneut.",
    platformSummary:
      "Das Semrush AI Toolkit misst KI-Sichtbarkeit im Vergleich zu Mitbewerbern der Branche und macht aus Lücken Themen- und Quellenchancen, inklusive Fragen und Domains, bei denen Mitbewerber erscheinen und die verfolgte Marke nicht.",
    bestFor:
      "KI-Sichtbarkeit im Semrush-Stack für Suchmaschinenmarketing leben soll, mit klaren Listen von Themen- und Quellenchancen.",
    strengths: [
      "Ihr Suchteam arbeitet bereits in Semrush und will KI-Sichtbarkeit in derselben Umgebung für Wettbewerbsanalysen.",
      "Ein Benchmark der Sichtbarkeit gegenüber automatisch erkannten Mitbewerbern der Branche ist für das Programm nützlich.",
      "Topic Opportunities und Source Opportunities sind der bevorzugte Weg, Sichtbarkeitslücken in einen Content-Backlog zu überführen.",
    ],
    monitoringModel:
      "KI-Sichtbarkeit, Erwähnungen, zitierte Seiten und Verteilung nach Sprachmodell gegenüber einem Benchmark von Mitbewerbern messen.",
    diagnosisModel:
      "Themen- und Quellenlücken zeigen, bei denen Mitbewerber erscheinen und die verfolgte Marke nicht, inklusive der Fragen und Domains hinter der Chance.",
    actionModel:
      "Topic Opportunities und Source Opportunities machen aus Lücken gegenüber Mitbewerbern klare Listen von Fragen und Domains, die Teams abarbeiten.",
  },
};

const BESEAM_PRACTICAL_DE = {
  owner:
    "E-Commerce oder Commerce Operations, mit Produkt, Wachstum, Marketing oder Entwicklung, je nach Frage.",
  setup:
    "Shop und Datenquellen verbinden, die für die untersuchte geschäftliche Frage relevant sind.",
  output:
    "Eine belegte Entscheidung, eine verantwortete Massnahme, eine ausdrückliche Freigabe und die erneute Prüfung des ursprünglichen Problems.",
  pricing: "Pläne nach Kataloggrösse; Details im Kennenlerngespräch.",
} as const;

export const PRACTICAL_DE: Record<string, PracticalComparison> = {
  profound: {
    reviewedAt: "2026-08-22",
    source: {
      label: "Preise von Profound",
      url: "https://www.tryprofound.com/pricing",
    },
    rows: [
      {
        criterion: "Typische Verantwortung",
        competitor:
          "SEO-, AEO-, Marken- und Suchmarketing-Teams, die KI-Sichtbarkeit beobachten.",
        beseam: BESEAM_PRACTICAL_DE.owner,
      },
      {
        criterion: "Einrichtung",
        competitor:
          "Marke, Mitbewerber, Fragen und Antwortmaschinen für ein wiederkehrendes Monitoring konfigurieren.",
        beseam: BESEAM_PRACTICAL_DE.setup,
      },
      {
        criterion: "Wichtigstes Ergebnis",
        competitor:
          "Ansichten zu KI-Sichtbarkeit, Share of Voice, Quellenangaben, Stimmung und Wettbewerb.",
        beseam: BESEAM_PRACTICAL_DE.output,
      },
      {
        criterion: "Ersetzen oder behalten?",
        competitor:
          "Behalten Sie Profound, wenn spezialisiertes Monitoring der KI-Sichtbarkeit über mehrere Engines ein Kernprozess ist.",
        beseam:
          "Nutzen Sie Beseam ergänzend, wenn aus einer Sichtbarkeitslücke eine Entscheidung im Shop, eine Änderung und eine erneute Prüfung werden soll.",
      },
      {
        criterion: "Preismodell",
        competitor:
          "Öffentliche Pläne Starter und Growth mit Limits für Fragen und Engines, plus individuelle Enterprise-Preise.",
        beseam: BESEAM_PRACTICAL_DE.pricing,
      },
    ],
  },
  "peec-ai": {
    reviewedAt: "2026-08-22",
    source: { label: "Preise von Peec AI", url: "https://peec.ai/pricing" },
    rows: [
      {
        criterion: "Typische Verantwortung",
        competitor:
          "SEO-, Content- und Marketing-Teams; Agenturpläne unterstützen mehrere Kundenprojekte.",
        beseam: BESEAM_PRACTICAL_DE.owner,
      },
      {
        criterion: "Einrichtung",
        competitor:
          "Projekte anlegen, Fragen zuteilen, Modelle wählen und Märkte für das wiederkehrende Tracking konfigurieren.",
        beseam: BESEAM_PRACTICAL_DE.setup,
      },
      {
        criterion: "Wichtigstes Ergebnis",
        competitor:
          "Analysen zu Sichtbarkeit, Share of Voice, Stimmung, Position, Mitbewerbern, zitierten Domains und Chats.",
        beseam: BESEAM_PRACTICAL_DE.output,
      },
      {
        criterion: "Ersetzen oder behalten?",
        competitor:
          "Behalten Sie Peec AI, wenn fokussierte Analysen der KI-Suche und Monitoring von Fragen die Hauptaufgabe sind.",
        beseam:
          "Nutzen Sie Beseam, wenn der Befund mit dem betroffenen Produkt, der Seite, der Frage oder der Kaufreise verknüpft und bis zur Änderung und Prüfung geführt werden soll.",
      },
      {
        criterion: "Preismodell",
        competitor:
          "Gestaffelt vor allem nach verfolgten Fragen, Modellen und Projekten, mit individueller Enterprise-Abdeckung.",
        beseam: BESEAM_PRACTICAL_DE.pricing,
      },
    ],
  },
  "otterly-ai": {
    reviewedAt: "2026-08-22",
    source: {
      label: "Preise von Otterly.AI",
      url: "https://otterly.ai/pricing",
    },
    rows: [
      {
        criterion: "Typische Verantwortung",
        competitor:
          "SEO- und Marketing-Teams sowie Agenturen, die KI-Sichtbarkeit für Kunden betreuen.",
        beseam: BESEAM_PRACTICAL_DE.owner,
      },
      {
        criterion: "Einrichtung",
        competitor:
          "Suchfragen, Workspaces und KI-Engines wählen; das Tracking läuft über die konfigurierten Fragen.",
        beseam: BESEAM_PRACTICAL_DE.setup,
      },
      {
        criterion: "Wichtigstes Ergebnis",
        competitor:
          "Sichtbarkeit in der KI-Suche, Quellenangaben, Markenberichte, Audits und Prozesse von Empfehlungen zu To-dos.",
        beseam: BESEAM_PRACTICAL_DE.output,
      },
      {
        criterion: "Ersetzen oder behalten?",
        competitor:
          "Behalten Sie Otterly.AI, wenn das Tracking von Fragen und spezialisierte GEO-Empfehlungen der zentrale Prozess sind.",
        beseam:
          "Nutzen Sie Beseam, wenn die Empfehlung mit Hinweisen aus dem Shop, der verantwortlichen Person, der Umsetzung und der nächsten Prüfung der Antwort verbunden bleiben soll.",
      },
      {
        criterion: "Preismodell",
        competitor:
          "Pläne Lite, Standard und Premium nach Anzahl Fragen mit Zusatzoptionen, plus individuelle Enterprise-Preise.",
        beseam: BESEAM_PRACTICAL_DE.pricing,
      },
    ],
  },
};
