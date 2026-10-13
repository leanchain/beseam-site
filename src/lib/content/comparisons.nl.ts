import type {
  ComparisonTemplate,
  PracticalComparison,
  SeedText,
} from "@/lib/comparisons";

/** Dutch comparison copy (informal "je"). */
export const TEMPLATE_NL: ComparisonTemplate = {
  category: "AI-vindbaarheid & zichtbaarheid",
  metaTitle: (name) => `Beseam vs ${name}: AI-zichtbaarheid vergeleken`,
  metaDescription: (name) =>
    `Beseam en ${name} vergeleken: waar elke tool voor AI-zichtbaarheid goed in is, en wanneer je voor Beseam kiest.`,
  introSuffix:
    "Beseam volgt ook AI-antwoorden, en volgt daarna een gemiste koopvraag tot aan het product of de pagina die je kunt aanpassen. Het bereidt de wijziging voor en stelt daarna dezelfde vraag opnieuw.",
  competitorSummary: (name, bestFor) => `Kies ${name} wanneer ${bestFor}`,
  beseamSummary:
    "Kies Beseam wanneer je meer nodig hebt dan een zichtbaarheidsscore: zie welke koopvraag je hebt gemist, wat je in je winkel kunt veranderen, voer de wijziging door met goedkeuring, en vraag het opnieuw.",
  useTogetherSummary: (name) =>
    `Houd ${name} voor gespecialiseerde monitoring van AI-zichtbaarheid. Gebruik Beseam wanneer een gemiste koopvraag een wijziging in je winkel moet worden en daarna opnieuw gecontroleerd moet worden.`,
  chooseBeseamWhen: [
    "Een ontbrekende aanbeveling of bronvermelding moet aan het juiste product, de juiste pagina, bron of catalogusgegeven worden gekoppeld voordat iemand content aanpast.",
    "Het team wil zien wie er werd aanbevolen en welke product-, winkel-, klant- of aankoopdata kan verklaren waarom.",
    "De oorspronkelijke koopvraag, de voorgestelde wijziging, de goedkeuring, de uitvoering en de controle daarna moeten bij elkaar blijven.",
  ],
  notAReplacementFor: (name) =>
    `Beseam is geen één-op-één vervanging voor de gespecialiseerde rapportage over AI-zichtbaarheid van ${name}, het benchmarken van concurrenten, of het monitoringproces dat teams daar al gebruiken.`,
  rows: {
    primaryJob: {
      criterion: "Hoofdtaak",
      beseam:
        "AI-antwoorden volgen, een gemiste aanbeveling aan het juiste product of de juiste pagina koppelen, een goedgekeurde wijziging doorvoeren, en dezelfde koopvraag opnieuw stellen.",
    },
    diagnosis: {
      criterion: "Diagnose",
      beseam:
        "Het antwoord, de bronnen, concurrerende merken, productfeiten en paginacontroles bij dezelfde vraag bewaren.",
    },
    actionModel: {
      criterion: "Van bevinding naar actie",
      beseam:
        "Een bevinding omzetten in een concrete wijziging die wacht op goedkeuring van de merkeigenaar, in plaats van te eindigen als zoveelste aanbeveling.",
    },
    afterAnswer: {
      criterion: "Wat er na het antwoord gebeurt",
      competitor:
        "Gespecialiseerde data over AI-antwoorden, vermeldingen, bronvermeldingen, concurrenten, vragen en bronnen.",
      beseam:
        "Het antwoord verbinden met productfeiten, de winkel, klantgedrag, de checkout, bestellingen en dezelfde vraag die opnieuw wordt gesteld.",
    },
    relationship: {
      criterion: "Het meest geschikt voor",
      competitor: "Gespecialiseerde monitoring en analyse van AI-vindbaarheid.",
      beseam:
        "Brengt een gemiste koopvraag tot een goedgekeurde wijziging in de winkel en controleert die opnieuw.",
    },
  },
  workflow: {
    observe: {
      step: "Het antwoord bekijken",
      competitor:
        "Een reeks vragen volgen en laten zien hoe vaak het merk verschijnt, hoe het zich verhoudt tot concurrenten en welke bronnen worden genoemd.",
      beseam:
        "Een echte koopvraag stellen aan de AI-assistenten die je volgt, en het antwoord, wie er werd aanbevolen en de bronnen erachter bewaren.",
    },
    understand: {
      step: "Het gat begrijpen",
      beseam:
        "De gemiste aanbeveling koppelen aan het juiste product, de juiste pagina, bron, claim of het juiste winkelprobleem voordat je kiest wat je verandert.",
    },
    change: {
      step: "Veranderen wat je in de hand hebt",
      beseam:
        "De voorgestelde wijziging, het betrokken product of de pagina, de eigenaar en de goedkeuring bij het oorspronkelijke antwoord bewaren.",
    },
    askAgain: {
      step: "Opnieuw vragen",
      competitor:
        "De gevolgde vragen blijven monitoren en latere zichtbaarheidscijfers vergelijken.",
      beseam:
        "Dezelfde koopvraag opnieuw stellen en de antwoorden van voor en na bewaren bij de wijziging die werd doorgevoerd.",
    },
  },
  evidenceAlt:
    "Echte Beseam-werkomgeving voor AI-zichtbaarheid met antwoorden van assistenten en signalen over concurrenten",
  evidenceCaption:
    "Echte data over AI-vindbaarheid uit Beseam. De vraag, het antwoord, de concurrerende aanbeveling, het bewijs, de wijziging en de nieuwe controle blijven verbonden, in plaats van te eindigen als zichtbaarheidsscore.",
  faqs: {
    replace: (name) => ({
      question: `Vervangt Beseam ${name}?`,
      answer: `Niet per se. ${name} is een gespecialiseerd platform voor AI-zichtbaarheid. Beseam volgt ook AI-antwoorden, en verbindt een relevante gemiste aanbeveling met de product-, winkel-, klant- en resultaatdata die je nodig hebt om te bepalen wat je daarna doet.`,
    }),
    together: (name) => ({
      question: `Kun je ${name} en Beseam samen gebruiken?`,
      answer: `Ja. ${name} kan een gespecialiseerde monitoringbron blijven, terwijl Beseam de bevinding verbindt met het betrokken product of de klantreis, het goedgekeurde werk en het resultaat daarna. Welke integraties precies beschikbaar zijn, hangt af van de opzet.`,
    }),
    choose: (name, bestFor) => ({
      question: `Wanneer kies ik ${name} in plaats van Beseam?`,
      answer: `Kies ${name} wanneer ${bestFor} Kies Beseam wanneer de grotere uitdaging is om inzichten over vindbaarheid door te vertalen naar beslissingen over product, winkel, klanten en business, in plaats van te stoppen bij monitoring.`,
    }),
  },
};

export const SEED_TEXT_NL: Record<string, SeedText> = {
  profound: {
    headline:
      "Profound meet AI-zichtbaarheid. Beseam laat zien wat je verandert als je producten ontbreken.",
    platformSummary:
      "Profound is een platform voor AI-zichtbaarheid dat merkaanwezigheid, share of voice en bronvermeldingen meet over meerdere antwoordmachines, met platformvergelijkingen die kunnen wisselen tussen zichtbaarheid, share of voice en aandeel in bronvermeldingen.",
    bestFor:
      "merkmonitoring over meerdere engines, benchmarking van concurrenten en flexibele analyse van zichtbaarheid en bronvermeldingen de kerntaak zijn.",
    strengths: [
      "Je hebt een gespecialiseerde platformvergelijking nodig over meerdere AI-engines.",
      "Je team wil hetzelfde concurrentieoverzicht kunnen wisselen tussen zichtbaarheid, share of voice en aandeel in bronvermeldingen.",
      "Rapportage over AI-zichtbaarheid en concurrentiemonitoring zijn het belangrijkste proces.",
    ],
    monitoringModel:
      "Merkzichtbaarheid, share of voice en aandeel in bronvermeldingen meten over meerdere AI-platforms.",
    diagnosisModel:
      "Merken en engines vergelijken om te zien waar zichtbaarheid of aandeel in bronvermeldingen verschilt over de gevolgde vragen.",
    actionModel:
      "Publieke productinformatie legt de nadruk op meten en platformvergelijking; teams nemen de wijzigingen mee in hun bestaande werkprocessen.",
  },
  "peec-ai": {
    headline:
      "Peec AI volgt zichtbaarheid in AI-zoekopdrachten. Beseam laat zien wat je verandert als een product ontbreekt.",
    platformSummary:
      "Peec AI is een analyseplatform voor AI-zoekopdrachten dat zichtbaarheid, share of voice, sentiment, positie, concurrenten, geciteerde domeinen en individuele chats volgt, met AI-engines als hoofdfilter.",
    bestFor:
      "een gerichte analyseomgeving voor zichtbaarheid, share of voice, sentiment, positie, concurrenten, domeinen en chats in AI-zoekopdrachten de belangrijkste behoefte is.",
    strengths: [
      "Je wilt een gericht dashboard voor AI-zichtbaarheid, share of voice, sentiment en gemiddelde positie.",
      "Je team wil inzoomen op individuele concurrenten, geciteerde domeinen en chats achter de totaalcijfers.",
      "Dezelfde analyse filteren op AI-engine is nuttiger dan een grote matrix van merken en engines.",
    ],
    monitoringModel:
      "Zichtbaarheid, share of voice, sentiment en positie volgen over merken en AI-engines.",
    diagnosisModel:
      "Inzoomen op concurrenten, domeinen en individuele chats om te begrijpen welke vragen en bronnen het gat veroorzaken.",
    actionModel:
      "Teams gebruiken de monitoring- en detaildata om te bepalen wat ze in hun bestaande content en werkprocessen veranderen.",
  },
  "otterly-ai": {
    headline:
      "Otterly.AI maakt van zichtbaarheidsbevindingen to-do's. Beseam brengt een gemiste koopvraag tot een wijziging in de winkel en controleert die opnieuw.",
    platformSummary:
      "Otterly.AI volgt merkzichtbaarheid en sentiment in AI-zoekopdrachten, met een Brand Visibility Index en een aanbevelingsproces dat bevindingen in een gevolgde to-dolijst kan zetten.",
    bestFor:
      "monitoring van AI-zoekopdrachten met een gestructureerd proces van aanbevelingen naar to-do's de centrale eis is.",
    strengths: [
      "Je wilt een Brand Visibility Index en monitoring van AI-zoekopdrachten met de nadruk op merkaanwezigheid en koopwaarschijnlijkheid.",
      "Je team waardeert een overzicht van sentiment per merk en engine om ongelijke beeldvorming tussen assistenten te zien.",
      "Aanbevelingen moeten gevolgde to-do's worden die je in de gespecialiseerde tool afrondt of archiveert.",
    ],
    monitoringModel:
      "Merkzichtbaarheid, uit positie afgeleide koopwaarschijnlijkheid, sentiment en verschillen tussen engines in AI-zoekopdrachten volgen.",
    diagnosisModel:
      "Zichtbaarheid, sentiment, vragen en bronnen gebruiken om te zien waar het merk achterblijft en welke aanbevelingen aandacht verdienen.",
    actionModel:
      "Aanbevelingen kunnen in een to-dolijst worden gezet, tot afronding worden gevolgd en gearchiveerd naarmate het werk vordert.",
  },
  rankscale: {
    headline:
      "Rankscale meet AI-zichtbaarheid tot in detail. Beseam laat zien wat je verandert als een koopvraag jou mist.",
    platformSummary:
      "Rankscale is een platform voor zichtbaarheid in AI-zoekopdrachten dat zichtbaarheid, vermeldingen, bronvermeldingen, sentiment, positie en detectieratio apart toont, met auditaanbevelingen bij slecht presterende vraaggroepen.",
    bestFor:
      "teams gedetailleerde rapportage over AI-zoekopdrachten willen, inclusief een detectieratio die laat zien wanneer een ontbrekend resultaat simpelweg een mislukte meting kan zijn.",
    strengths: [
      "Je wilt zichtbaarheid, vermeldingen, bronvermeldingen, sentiment, positie en detectieratio apart zien.",
      "Een echte nul onderscheiden van een zwakke of mislukte meting is belangrijk voor je rapportage.",
      "Auditaanbevelingen bij slecht presterende vraaggroepen zijn de belangrijkste route van diagnose naar werk.",
    ],
    monitoringModel:
      "Zichtbaarheid, vermeldingen, bronvermeldingen, sentiment, positie en detectieratio volgen over vraaggroepen in AI-zoekopdrachten.",
    diagnosisModel:
      "Onderscheiden of een antwoord überhaupt is gedetecteerd en of het merk erin voorkwam, en daarna slecht presterende vraaggroepen en auditbevindingen bekijken.",
    actionModel:
      "Auditaanbevelingen zijn gekoppeld aan de slecht presterende vraaggroepen, zodat teams vervolgwerk kunnen prioriteren.",
  },
  "athena-hq": {
    headline:
      "Athena volgt AI-share of voice en beveelt content aan. Beseam koppelt een gemiste koopvraag aan de wijziging in product of winkel en controleert opnieuw.",
    platformSummary:
      "Athena is een platform voor zichtbaarheid in AI-zoekopdrachten, gericht op share of voice, het ontdekken van concurrenten, bronanalyse en een Action Center voor geprioriteerde aanbevelingen en contentwerk.",
    bestFor:
      "monitoring van AI-share of voice en een gespecialiseerd Action Center dat zichtbaarheidsgaten omzet in geprioriteerde contentaanbevelingen de belangrijkste koopcriteria zijn.",
    strengths: [
      "Je wilt share of voice in AI-zoekopdrachten en concurrentiemonitoring als apart programma.",
      "Bron- en citatieanalyse staan centraal wanneer je team onderzoekt waarom concurrenten verschijnen.",
      "Een gespecialiseerd Action Center met geprioriteerde aanbevelingen en hulp bij het schrijven past bij je manier van werken.",
    ],
    monitoringModel:
      "Share of voice in AI-zoekopdrachten meten en merkvermeldingen, concurrenten, bronnen en prestaties per engine vergelijken.",
    diagnosisModel:
      "Data over concurrenten en bronnen gebruiken om zichtbaarheidsgaten te vinden en de contentkansen die aanwezigheid in bronvermeldingen het meest verbeteren.",
    actionModel:
      "Het Action Center prioriteert aanbevelingen en ondersteunt contentwerk dat de kans op bronvermeldingen moet vergroten.",
  },
  amionai: {
    headline:
      "AmIOnAI geeft je een plan voor AI-zichtbaarheid. Beseam koppelt elke gemiste koopvraag aan de wijziging in de winkel en het resultaat.",
    platformSummary:
      "AmIOnAI is een product voor AI-zichtbaarheid rond een zichtbaarheidsscore, bronanalyse en een weekplan om je aanwezigheid in ChatGPT en de AI-onderdelen van Google te verbeteren.",
    bestFor:
      "een begeleide beoordeling van AI-zichtbaarheid en een concreet weekplan waardevoller zijn dan een uitgebreide analyseomgeving.",
    strengths: [
      "Je wilt een eenvoudige score voor AI-zichtbaarheid en een begeleid actieplan in plaats van een grote monitoringomgeving.",
      "ChatGPT en de AI-onderdelen van Google hebben prioriteit voor het programma.",
      "Wekelijkse taken met een geschatte impact op vragen passen bij de manier van werken van het team.",
    ],
    monitoringModel:
      "Een AI-zichtbaarheidsscore volgen over relevante vragen en de brondomeinen achter die antwoorden tonen.",
    diagnosisModel:
      "De beoordeling, dekking van vragen en brondomeinen gebruiken om te bepalen welke gaten in het actieplan horen.",
    actionModel:
      "Centraal staat een weekplan, met taken die zijn beschreven op basis van hun verwachte impact op relevante vragen.",
  },
  "ahrefs-brand-radar": {
    headline:
      "Ahrefs Brand Radar meet AI-zichtbaarheid op de schaal van zoekmachines. Beseam laat zien wat je verandert als je product ontbreekt.",
    platformSummary:
      "Ahrefs Brand Radar breidt concurrentieanalyse voor zoekmachines uit naar AI-zichtbaarheid, met AI-share of voice, vermeldingen, bronvermeldingen en vergelijkingen per platform op basis van de zoekvolumedata van Ahrefs.",
    bestFor:
      "AI-zichtbaarheid thuishoort in een breder Ahrefs-proces voor concurrentieanalyse en een op zoekvolume gewogen share of voice nuttig is voor het team.",
    strengths: [
      "Je SEO-team werkt al in Ahrefs en wil AI-zichtbaarheid naast bredere zoek- en concurrentiedata zien.",
      "Een op zoekvolume gewogen AI-share of voice is een nuttige manier om de gevolgde markt te prioriteren.",
      "Vermeldingen en bronvermeldingen over meerdere AI-platforms moeten als concurrentiedata worden verkend, niet als takenlijst.",
    ],
    monitoringModel:
      "AI-share of voice, vermeldingen, bronvermeldingen en prestaties per platform meten met de context van zoekvraag.",
    diagnosisModel:
      "Concurrentiedata over vermeldingen en bronvermeldingen gebruiken om te begrijpen welke merken en bronnen de gevolgde markt voor AI-zoekopdrachten domineren.",
    actionModel:
      "Brand Radar is vooral een tool voor meten en concurrentieonderzoek; teams nemen de inzichten mee in hun bestaande SEO- en contentprocessen.",
  },
  "semrush-ai-toolkit": {
    headline:
      "Semrush vindt onderwerp- en brongaten in AI. Beseam maakt van een gemiste koopvraag een wijziging in de winkel en controleert opnieuw.",
    platformSummary:
      "De Semrush AI Toolkit meet AI-zichtbaarheid ten opzichte van concurrenten in de branche en zet gaten om in onderwerp- en bronkansen, inclusief vragen en domeinen waar concurrenten verschijnen en het gevolgde merk niet.",
    bestFor:
      "AI-zichtbaarheid onderdeel moet zijn van de Semrush-stack voor zoekmachinemarketing, met duidelijke lijsten van onderwerp- en bronkansen.",
    strengths: [
      "Je zoekteam werkt al in Semrush en wil AI-zichtbaarheid in dezelfde omgeving voor concurrentieonderzoek.",
      "Zichtbaarheid benchmarken ten opzichte van automatisch herkende concurrenten in de branche is nuttig voor het programma.",
      "Topic Opportunities en Source Opportunities zijn de voorkeursmanier om zichtbaarheidsgaten om te zetten in een contentbacklog.",
    ],
    monitoringModel:
      "AI-zichtbaarheid, vermeldingen, geciteerde pagina's en verdeling per taalmodel meten ten opzichte van een benchmark met concurrenten.",
    diagnosisModel:
      "Onderwerp- en brongaten tonen waar concurrenten verschijnen en het gevolgde merk niet, inclusief de vragen en domeinen achter de kans.",
    actionModel:
      "Topic Opportunities en Source Opportunities maken van gaten ten opzichte van concurrenten duidelijke lijsten met vragen en domeinen voor teams om af te werken.",
  },
};

const BESEAM_PRACTICAL_NL = {
  owner:
    "E-commerce of commerce operations, met product, groei, marketing of development erbij, afhankelijk van de vraag.",
  setup:
    "De winkel en databronnen koppelen die relevant zijn voor de zakelijke vraag die wordt onderzocht.",
  output:
    "Een onderbouwde beslissing, een actie met een eigenaar, expliciete goedkeuring, en een nieuwe controle van het oorspronkelijke probleem.",
  pricing:
    "Abonnementen op basis van catalogusgrootte; details in een kennismakingsgesprek.",
} as const;

export const PRACTICAL_NL: Record<string, PracticalComparison> = {
  profound: {
    reviewedAt: "2026-08-22",
    source: {
      label: "Prijzen van Profound",
      url: "https://www.tryprofound.com/pricing",
    },
    rows: [
      {
        criterion: "Typische eigenaar",
        competitor:
          "SEO-, AEO-, merk- en zoekmarketingteams die AI-zichtbaarheid monitoren.",
        beseam: BESEAM_PRACTICAL_NL.owner,
      },
      {
        criterion: "Inrichting",
        competitor:
          "Merk, concurrenten, vragen en antwoordmachines instellen voor terugkerende monitoring.",
        beseam: BESEAM_PRACTICAL_NL.setup,
      },
      {
        criterion: "Belangrijkste resultaat",
        competitor:
          "Overzichten van AI-zichtbaarheid, share of voice, bronvermeldingen, sentiment en concurrentie.",
        beseam: BESEAM_PRACTICAL_NL.output,
      },
      {
        criterion: "Vervangen of houden?",
        competitor:
          "Houd Profound wanneer gespecialiseerde monitoring van AI-zichtbaarheid over meerdere engines een kernproces is.",
        beseam:
          "Gebruik Beseam ernaast wanneer een zichtbaarheidsgat een beslissing in de winkel, een wijziging en een nieuwe controle moet worden.",
      },
      {
        criterion: "Prijsmodel",
        competitor:
          "Publieke Starter- en Growth-abonnementen met limieten voor vragen en engines, plus Enterprise-prijzen op maat.",
        beseam: BESEAM_PRACTICAL_NL.pricing,
      },
    ],
  },
  "peec-ai": {
    reviewedAt: "2026-08-22",
    source: { label: "Prijzen van Peec AI", url: "https://peec.ai/pricing" },
    rows: [
      {
        criterion: "Typische eigenaar",
        competitor:
          "SEO-, content- en marketingteams; bureauabonnementen ondersteunen meerdere klantprojecten.",
        beseam: BESEAM_PRACTICAL_NL.owner,
      },
      {
        criterion: "Inrichting",
        competitor:
          "Projecten aanmaken, vragen toewijzen, modellen kiezen en markten instellen voor terugkerende tracking.",
        beseam: BESEAM_PRACTICAL_NL.setup,
      },
      {
        criterion: "Belangrijkste resultaat",
        competitor:
          "Analyse van zichtbaarheid, share of voice, sentiment, positie, concurrenten, geciteerde domeinen en chats.",
        beseam: BESEAM_PRACTICAL_NL.output,
      },
      {
        criterion: "Vervangen of houden?",
        competitor:
          "Houd Peec AI wanneer gerichte analyse van AI-zoekopdrachten en monitoring van vragen de hoofdtaak zijn.",
        beseam:
          "Gebruik Beseam wanneer de bevinding gekoppeld moet worden aan het betrokken product, de pagina, de vraag of de klantreis, en door moet lopen tot wijziging en controle.",
      },
      {
        criterion: "Prijsmodel",
        competitor:
          "Gestaffeld vooral op gevolgde vragen, modellen en projecten, met Enterprise-dekking op maat.",
        beseam: BESEAM_PRACTICAL_NL.pricing,
      },
    ],
  },
  "otterly-ai": {
    reviewedAt: "2026-08-22",
    source: {
      label: "Prijzen van Otterly.AI",
      url: "https://otterly.ai/pricing",
    },
    rows: [
      {
        criterion: "Typische eigenaar",
        competitor:
          "SEO- en marketingteams, plus bureaus die AI-zichtbaarheid voor klanten beheren.",
        beseam: BESEAM_PRACTICAL_NL.owner,
      },
      {
        criterion: "Inrichting",
        competitor:
          "Zoekvragen, werkruimtes en AI-engines kiezen; de tracking loopt over de ingestelde vragen.",
        beseam: BESEAM_PRACTICAL_NL.setup,
      },
      {
        criterion: "Belangrijkste resultaat",
        competitor:
          "Zichtbaarheid in AI-zoekopdrachten, bronvermeldingen, merkrapportage, audits en processen van aanbeveling naar to-do.",
        beseam: BESEAM_PRACTICAL_NL.output,
      },
      {
        criterion: "Vervangen of houden?",
        competitor:
          "Houd Otterly.AI wanneer het volgen van vragen en gespecialiseerde GEO-aanbevelingen het centrale proces zijn.",
        beseam:
          "Gebruik Beseam wanneer de aanbeveling verbonden moet blijven met signalen uit de winkel, een eigenaar, de uitvoering en de volgende controle van het antwoord.",
      },
      {
        criterion: "Prijsmodel",
        competitor:
          "Lite-, Standard- en Premium-abonnementen op basis van vragen met add-ons, plus Enterprise-prijzen op maat.",
        beseam: BESEAM_PRACTICAL_NL.pricing,
      },
    ],
  },
};
