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

/** Dutch product pages (informal "je"). */
export const PRODUCT_PAGES_NL: readonly ProductPageData[] = [
  {
    slug: "ai-visibility-tracking",
    name: "AI-zichtbaarheid volgen",
    metaTitle: "AI-zichtbaarheid volgen voor webshops | Beseam",
    metaDescription:
      "Zie wanneer ChatGPT, Claude, Gemini en andere AI-assistenten je producten aanbevelen, en hoe AI-zichtbaarheid zich vertaalt in verkeer en omzet.",
    headline: "Zie wanneer AI je producten aanbeveelt",
    intro:
      "Beseam volgt de antwoorden van ChatGPT, Claude, Gemini, Google AI Mode, Perplexity en Copilot op de vragen die je klanten stellen. Zie waar je merk en producten genoemd worden, wie in plaats daarvan wordt aanbevolen, en hoe AI-zichtbaarheid zich vertaalt in verkeer en omzet.",
    heroCard: {
      visual: {
        kind: "visibility",
        label: "Waterdichte laarzen voor woon-werkverkeer",
        rows: [
          { prompt: "ChatGPT", recommended: true },
          { prompt: "Claude", recommended: true },
          { prompt: "Gemini", recommended: false },
          { prompt: "Google AI Mode", recommended: true },
          { prompt: "Perplexity", recommended: false },
          { prompt: "Copilot", recommended: true },
        ],
      },
      sticker: "Aanbevolen door 4 van 6 assistenten",
    },
    benefitsHeading: "Weet precies waar je staat in AI-zoekresultaten",
    benefits: [
      {
        title: "Alle grote AI-assistenten",
        body: "Volg ChatGPT, Claude, Gemini, Google AI Mode, Perplexity en Copilot op één plek, voor de vragen die klanten echt stellen.",
        icon: Bot,
      },
      {
        title: "Tot op productniveau",
        body: "Zie welke producten worden aanbevolen, welke worden gemist en welke concurrenten in hun plaats verschijnen.",
        icon: Package,
      },
      {
        title: "Gekoppeld aan omzet",
        body: "Koppel AI-zichtbaarheid aan verkeer en omzet uit AI-assistenten, uitgesplitst per onderwerp, vraag, product en landingspagina.",
        icon: TrendingUp,
      },
    ],
    stepsHeading: "Zo werkt het volgen van AI-zichtbaarheid",
    steps: [
      {
        title: "Koppel je Shopify-webshop",
        body: "Beseam importeert je catalogus en stelt de vragen op die klanten over je producten stellen.",
      },
      {
        title: "Volg de antwoorden",
        body: "Beseam stelt die vragen regelmatig aan AI-assistenten en legt vast wie er wordt aanbevolen.",
      },
      {
        title: "Zie het effect",
        body: "Volg hoe je AI-zichtbaarheid, verkeer en omzet zich in de loop van de tijd ontwikkelen.",
      },
    ],
    faqs: [
      {
        question: "Welke AI-assistenten volgt Beseam?",
        answer:
          "Beseam volgt ChatGPT, Claude, Gemini, Google AI Mode, Perplexity en Copilot, op basis van de vragen die je klanten over je producten stellen.",
      },
      {
        question: "Wat is AI-zichtbaarheid?",
        answer:
          "AI-zichtbaarheid is hoe vaak en hoe prominent AI-assistenten je merk en producten noemen of aanbevelen wanneer klanten vragen wat ze moeten kopen.",
      },
      {
        question:
          "Kan ik zien welke concurrenten AI in mijn plaats aanbeveelt?",
        answer:
          "Ja. Voor elke gevolgde vraag laat Beseam zien welke merken en producten de assistent aanbeval, zodat je ziet wie er in jouw plaats verschijnt.",
      },
      {
        question: "Hoe weet Beseam welke vragen het moet volgen?",
        answer:
          "Beseam stelt de vragen op vanuit je eigen catalogus: het soort vragen dat klanten aan AI-assistenten stellen voordat ze producten zoals de jouwe kopen.",
      },
      {
        question: "Hoe vaak controleert Beseam de antwoorden van AI?",
        answer:
          "Beseam stelt dezelfde vragen regelmatig aan AI-assistenten, zodat je kunt volgen hoe je zichtbaarheid in de loop van de tijd verandert.",
      },
      {
        question: "Hoe hangt AI-zichtbaarheid samen met omzet?",
        answer:
          "Beseam koppelt AI-zichtbaarheid aan verkeer en omzet uit AI-assistenten, uitgesplitst per onderwerp, vraag, product en landingspagina, zodat je ziet wat een aanbeveling waard is.",
      },
      {
        question: "Waarom geven AI-assistenten verschillende antwoorden?",
        answer:
          "Elke assistent gebruikt een eigen model, eigen bronnen en een eigen updateritme, dus dezelfde vraag kan tot verschillende aanbevelingen leiden. Daarom volgt Beseam ze naast elkaar.",
      },
      {
        question: "Wat kan ik doen als AI mijn producten niet aanbeveelt?",
        answer:
          "Beseam laat zien wat je eerst moet verbeteren: productbeschrijvingen, content of technische problemen, gerangschikt op verwachte impact op je omzet.",
      },
    ],
  },
  {
    slug: "product-descriptions",
    name: "Productbeschrijvingen",
    metaTitle: "AI-geoptimaliseerde productbeschrijvingen | Beseam",
    metaDescription:
      "Optimaliseer productbeschrijvingen en productdata zodat ChatGPT, Gemini en andere AI-assistenten je producten begrijpen en aan de juiste klanten aanbevelen.",
    headline: "Productbeschrijvingen die AI begrijpt en aanbeveelt",
    intro:
      "AI-assistenten bevelen de producten aan die ze het best begrijpen. Beseam optimaliseert je beschrijvingen en vult ontbrekende productdata aan, zodat assistenten weten wat elk product is, voor wie het is en wanneer ze het moeten aanbevelen.",
    heroCard: {
      visual: {
        kind: "description",
        before: {
          label: "Voor",
          text: "Onze populairste laars. Stijlvol, comfortabel en perfect voor elk seizoen!",
        },
        after: {
          label: "Geoptimaliseerd voor AI",
          text: "Een waterdichte leren chelsea boot met een stevige rubberen zool, gemaakt voor dagelijks woon-werkverkeer in de regen. EU 36–46, in normale en brede pasvorm. Valt normaal.",
        },
      },
      sticker: "Klaar om goed te keuren",
    },
    benefitsHeading: "Beschrijvingen die aansluiten op hoe klanten vragen",
    benefits: [
      {
        title: "Geschreven voor echte vragen",
        body: "Beschrijvingen beantwoorden wat klanten AI vragen voordat ze kopen, zoals gebruik, pasvorm, materialen en voor wie het product is.",
        icon: MessageSquareText,
      },
      {
        title: "Complete productdata",
        body: "Beseam vindt ontbrekende kenmerken zoals maten, materialen en specificaties, en stelt voor hoe je ze aanvult.",
        icon: ListChecks,
      },
      {
        title: "Voor je hele catalogus",
        body: "Optimaliseer honderden of duizenden producten, te beginnen met de producten die het meest bijdragen aan je omzet.",
        icon: Layers,
      },
    ],
    stepsHeading: "Zo werkt het optimaliseren van productbeschrijvingen",
    steps: [
      {
        title: "Vind de hiaten",
        body: "Beseam leest elk product en vergelijkt het met wat klanten aan AI-assistenten vragen.",
      },
      {
        title: "Bekijk de voorstellen",
        body: "Ontvang geoptimaliseerde beschrijvingen en aangevulde productdata, gerangschikt op verwachte impact op je omzet.",
      },
      {
        title: "Keur goed of automatiseer",
        body: "Publiceer wijzigingen met één klik, of laat Beseam de soorten wijzigingen die je vertrouwt automatisch doorvoeren.",
      },
    ],
    faqs: [
      {
        question:
          "Waarom zijn productbeschrijvingen belangrijk voor AI-zoekopdrachten?",
        answer:
          "AI-assistenten bevelen producten aan die ze duidelijk aan de vraag van een klant kunnen koppelen. Specifieke, complete beschrijvingen en productdata maken die koppeling mogelijk.",
      },
      {
        question: "Welke producten optimaliseert Beseam als eerste?",
        answer:
          "Beseam rangschikt producten op hun verwachte impact op je omzet, zodat je bestsellers en producten met het meeste potentieel eerst aan de beurt zijn.",
      },
      {
        question: "Overschrijft Beseam mijn bestaande beschrijvingen?",
        answer:
          "Niet zonder je goedkeuring. Elke voorgestelde wijziging wacht op jou, tenzij je dat soort wijziging automatiseert, en alle wijzigingen blijven terug te draaien.",
      },
      {
        question: "Hoe ziet een AI-geoptimaliseerde productbeschrijving eruit?",
        answer:
          "Ze noemt de feiten waar klanten naar vragen, zoals gebruik, pasvorm, materialen, maten en specificaties, in begrijpelijke taal. Vage marketingzinnen maken plaats voor concrete details die AI aan een vraag kan koppelen.",
      },
      {
        question: "Welke productdata vult Beseam aan?",
        answer:
          "Beseam vindt ontbrekende kenmerken zoals maten, materialen en specificaties, en stelt voor hoe je ze aanvult, voor elk product en elke variant.",
      },
      {
        question: "Kan ik voorstellen bekijken voordat ze live gaan?",
        answer:
          "Ja. Elk voorstel wacht op je controle, tenzij je dat soort wijziging automatiseert, en alle wijzigingen blijven terug te draaien.",
      },
      {
        question:
          "Heeft optimaliseren voor AI invloed op mijn Google-posities?",
        answer:
          "Duidelijke, specifieke productinformatie wordt door zoekmachines en AI-assistenten allebei beloond, dus optimaliseren voor AI en voor Google wijst dezelfde kant op.",
      },
      {
        question: "Met welke webshopplatforms werkt Beseam?",
        answer:
          "Beseam werkt op dit moment met Shopify-webshops, die je met één klik koppelt zonder je themacode aan te raken.",
      },
    ],
  },
  {
    slug: "content-creation",
    name: "Contentcreatie",
    metaTitle: "AI-geoptimaliseerde content voor webshops | Beseam",
    metaDescription:
      "Maak en optimaliseer categoriepagina's, vergelijkingspagina's, blogs en gidsen waar AI-assistenten op terugvallen wanneer klanten vragen wat ze moeten kopen.",
    headline: "Content die je webshop in AI-antwoorden brengt",
    intro:
      "Wanneer klanten AI vragen wat ze moeten kopen, gebruiken assistenten pagina's die uitleggen, vergelijken en aanbevelen. Beseam helpt je de categoriepagina's, vergelijkingspagina's, blogs en gidsen te maken en te optimaliseren die je producten in die antwoorden brengen.",
    heroCard: {
      visual: {
        kind: "pages",
        label: "Gevonden contenthiaten",
        rows: [
          {
            type: "Categorie",
            title: "Waterdichte laarzen voor woon-werkverkeer",
            status: "Nieuwe pagina",
          },
          {
            type: "Gids",
            title: "Zo kies je een regenjas",
            status: "Concept klaar",
          },
          {
            type: "Vergelijking",
            title: "Linnen of katoenen overhemden",
            status: "Nieuwe pagina",
          },
          {
            type: "Categorie",
            title: "Huidverzorging voor gevoelige huid",
            status: "Verbeteren",
          },
        ],
      },
      sticker: "Gerangschikt op omzetimpact",
    },
    benefitsHeading: "De pagina's waar AI-assistenten op terugvallen",
    benefits: [
      {
        title: "Categoriepagina's",
        body: "Maak van categoriepagina's duidelijke overzichten die AI-assistenten helpen het juiste deel van je assortiment aan te bevelen.",
        icon: LayoutGrid,
      },
      {
        title: "Vergelijkingspagina's",
        body: "Beantwoord vragen als ‘welke moet ik kopen?’ met duidelijke vergelijkingen waarin je producten voorkomen.",
        icon: Scale,
      },
      {
        title: "Blogs en gidsen",
        body: "Behandel de onderwerpen die klanten uitzoeken voordat ze kopen, zodat assistenten je webshop als bron noemen.",
        icon: BookOpen,
      },
    ],
    stepsHeading: "Zo werkt contentcreatie",
    steps: [
      {
        title: "Vind de contenthiaten",
        body: "Beseam laat zien voor welke vragen van klanten je webshop nog geen goede pagina heeft.",
      },
      {
        title: "Ontvang een concept",
        body: "Beseam bereidt nieuwe pagina's of verbeteringen van bestaande pagina's voor, rond je eigen producten.",
      },
      {
        title: "Keur goed en publiceer",
        body: "Bekijk, bewerk en keur goed, en volg daarna hoe de content je AI-zichtbaarheid beïnvloedt.",
      },
    ],
    faqs: [
      {
        question: "Wat voor content maakt Beseam?",
        answer:
          "Beseam maakt en optimaliseert categoriepagina's, vergelijkingspagina's, blogartikelen en koopgidsen, allemaal rond je eigen producten.",
      },
      {
        question: "Moet ik de content zelf schrijven?",
        answer:
          "Nee. Beseam bereidt concepten voor die je bekijkt, bewerkt en goedkeurt voordat er iets live gaat.",
      },
      {
        question: "Waarom is content belangrijk voor AI-zoekopdrachten?",
        answer:
          "AI-assistenten baseren hun aanbevelingen op bronnen die producten uitleggen en vergelijken. Nuttige content op je eigen webshop geeft ze een reden om je producten te noemen.",
      },
      {
        question: "Hoe vindt Beseam contenthiaten?",
        answer:
          "Beseam vergelijkt de vragen die klanten aan AI-assistenten stellen met de pagina's op je webshop, en laat zien voor welke vragen nog geen goede pagina bestaat.",
      },
      {
        question: "Welke content stelt Beseam als eerste voor?",
        answer:
          "Contenthiaten worden gerangschikt op verwachte omzetimpact, zodat je begint met de pagina's die het meest waarschijnlijk verkopen opleveren.",
      },
      {
        question: "Kan Beseam pagina's verbeteren die ik al heb?",
        answer:
          "Ja. Naast nieuwe pagina's stelt Beseam verbeteringen voor aan je bestaande categoriepagina's, blogartikelen en gidsen.",
      },
      {
        question: "Is content die met AI is geschreven slecht voor SEO?",
        answer:
          "Waar het om gaat, is of content nuttig is. De concepten van Beseam zijn gebaseerd op je eigen producten en de vragen van klanten, en je bekijkt en bewerkt ze voordat er iets live gaat.",
      },
      {
        question: "Hoe weet ik of nieuwe content werkt?",
        answer:
          "Beseam volgt hoe je AI-zichtbaarheid verandert nadat content live is gegaan, voor de vragen waarvoor de content is geschreven.",
      },
    ],
  },
  {
    slug: "technical-performance",
    name: "Technische prestaties",
    metaTitle: "Technische AI-zoekoptimalisatie voor webshops | Beseam",
    metaDescription:
      "Los problemen met gestructureerde data, crawlertoegang en trage pagina's op, zodat AI-assistenten elke pagina van je webshop kunnen lezen.",
    headline: "Maak elke pagina van je webshop leesbaar voor AI",
    intro:
      "AI-assistenten kunnen alleen aanbevelen wat ze kunnen lezen. Beseam controleert je gestructureerde data, crawlertoegang en laadsnelheid, en laat precies zien wat je moet oplossen zodat assistenten elke pagina van je webshop kunnen lezen en vertrouwen.",
    heroCard: {
      visual: {
        kind: "checks",
        label: "Technische controle",
        rows: [
          {
            label: "Gestructureerde productdata",
            ok: true,
            detail: "Aanwezig",
          },
          {
            label: "Prijzen en voorraad per variant",
            ok: false,
            detail: "Niet synchroon",
          },
          { label: "Toegang voor AI-crawlers", ok: true, detail: "Toegestaan" },
          { label: "Sitemap", ok: true, detail: "Compleet" },
          { label: "Laadsnelheid productpagina's", ok: true, detail: "Snel" },
        ],
      },
      sticker: "Na elke oplossing opnieuw gecontroleerd",
    },
    benefitsHeading: "Haal de technische blokkades weg",
    benefits: [
      {
        title: "Gestructureerde data",
        body: "Controleer of product-, prijs- en beschikbaarheidsdata aanwezig zijn en overeenkomen met wat klanten op de pagina zien.",
        icon: Braces,
      },
      {
        title: "Crawlertoegang",
        body: "Zorg dat AI-crawlers worden toegelaten en de belangrijke pagina's bereiken, in plaats van per ongeluk te worden geblokkeerd.",
        icon: ShieldCheck,
      },
      {
        title: "Laadsnelheid",
        body: "Vind trage productpagina's en de oorzaken erachter, gemeten met echte browsertests.",
        icon: Gauge,
      },
    ],
    stepsHeading: "Zo werkt technische optimalisatie",
    steps: [
      {
        title: "Scan je webshop",
        body: "Beseam controleert je pagina's, sitemap, robots-bestand en gestructureerde data.",
      },
      {
        title: "Prioriteer de oplossingen",
        body: "Problemen worden gerangschikt op hoeveel producten ze raken en hun verwachte impact op je omzet.",
      },
      {
        title: "Los op en controleer",
        body: "Voer de oplossingen door, en Beseam controleert opnieuw of ze hebben gewerkt.",
      },
    ],
    faqs: [
      {
        question: "Wat is gestructureerde data, en waarom heeft AI het nodig?",
        answer:
          "Gestructureerde data is machineleesbare informatie over je producten, zoals naam, prijs en beschikbaarheid. AI-assistenten en zoekmachines gebruiken het om je producten betrouwbaar te begrijpen.",
      },
      {
        question:
          "Kan mijn webshop AI-crawlers blokkeren zonder dat ik het weet?",
        answer:
          "Ja. Botbescherming, firewallregels of instellingen in robots.txt kunnen AI-crawlers per ongeluk blokkeren. Beseam controleert of ze je pagina's kunnen bereiken.",
      },
      {
        question: "Heeft laadsnelheid invloed op AI-zichtbaarheid?",
        answer:
          "Trage of haperende pagina's zijn voor crawlers moeilijker volledig te lezen. Snelle, stabiele pagina's maken het waarschijnlijker dat assistenten al je productinformatie zien.",
      },
      {
        question: "Wat controleert Beseam?",
        answer:
          "Beseam controleert je pagina's, sitemap, robots-bestand, gestructureerde data, crawlertoegang en laadsnelheid, gemeten met echte browsertests.",
      },
      {
        question: "Welke AI-crawlers moeten mijn webshop kunnen bereiken?",
        answer:
          "AI-bedrijven gebruiken hun eigen crawlers, zoals OAI-SearchBot en GPTBot van OpenAI, PerplexityBot en ClaudeBot. Als ze je pagina's niet kunnen bereiken, hebben assistenten minder om op af te gaan bij het aanbevelen van je producten.",
      },
      {
        question:
          "Waarom moet gestructureerde data overeenkomen met de pagina?",
        answer:
          "Als gestructureerde data en de zichtbare pagina elkaar tegenspreken, bijvoorbeeld over prijs of voorraad, weten zoekmachines en AI-assistenten niet wat klopt, en vertrouwen ze je producten mogelijk minder.",
      },
      {
        question: "Hoe worden technische problemen geprioriteerd?",
        answer:
          "Problemen worden gerangschikt op hoeveel producten ze raken en hun verwachte impact op je omzet, zodat je eerst oplost wat het meest telt.",
      },
      {
        question: "Hoe weet ik dat een oplossing heeft gewerkt?",
        answer:
          "Nadat je een oplossing hebt doorgevoerd, controleert Beseam opnieuw of het probleem is verholpen.",
      },
    ],
  },
];
