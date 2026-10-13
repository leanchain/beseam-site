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
 * Dutch solution pages (informal "je"). Same structure, images and links as
 * the English pages in `solution-pages.ts`.
 */
const steps = (category: string) =>
  [
    {
      title: "Koppel je Shopify-winkel",
      body: "Beseam importeert je catalogus zonder je themacode aan te raken.",
    },
    {
      title: "Zie waar je ontbreekt",
      body: `Beseam stelt AI-assistenten de vragen die klanten over ${category} stellen en laat zien waar je producten ontbreken.`,
    },
    {
      title: "Verbeter eerst wat het meest telt",
      body: "Ontvang verbeteringen gerangschikt op verwachte omzetimpact, en keur ze goed of laat Beseam ze automatisch doorvoeren.",
    },
  ] as const;

const catalogueFaq = {
  question: "Werkt Beseam ook met grote catalogi?",
  answer:
    "Ja. Beseam is gemaakt voor webwinkels met honderden of duizenden producten en varianten, en begint met de producten die het meest bijdragen aan je omzet.",
} as const;

const platformFaq = {
  question: "Werkt Beseam met mijn webwinkelplatform?",
  answer:
    "Beseam werkt op dit moment met Shopify-webwinkels, die je met één klik koppelt zonder je themacode aan te raken.",
} as const;

const trackedCompetitorsAnswer =
  "Ja. Voor elke gevolgde vraag laat Beseam zien welke merken en producten de assistent aanbeval, zodat je ziet wie er in jouw plaats verschijnt.";

const timelineAnswer =
  "Er is geen vaste termijn: het hangt af van de assistent en hoe vaak die zijn informatie bijwerkt. Beseam stelt dezelfde vragen in de loop van de tijd, zodat je ziet wanneer je producten beginnen te verschijnen.";

const crawlerMistake = {
  title: "AI-crawlers per ongeluk geblokkeerd",
  body: "Botbescherming, firewallregels of instellingen in robots.txt kunnen AI-crawlers buitensluiten zonder dat je het weet.",
};

const notKnowingMistake = (what: string) => ({
  title: "Niet weten waar je staat",
  body: `Zonder de vragen van klanten te volgen, weet je niet of AI ${what} aanbeveelt, of die van een concurrent.`,
});

const ALL_PRODUCTS = [
  "ai-visibility-tracking",
  "product-descriptions",
  "content-creation",
  "technical-performance",
] as const;

const TRACKING_POINTS = [
  "Gevolgd per vraag, product en assistent",
  "Zie welke merken in plaats daarvan worden aanbevolen",
  "Gekoppeld aan verkeer en omzet uit AI-assistenten",
] as const;

export const SOLUTION_PAGES_NL: readonly ProductPageData[] = [
  {
    slug: "footwear",
    name: "Schoenen",
    metaTitle: "AI-zoekoptimalisatie voor schoenenwebwinkels | Beseam",
    metaDescription:
      "Laat ChatGPT, Gemini en andere AI-assistenten je schoenen aanbevelen. Volg je AI-zichtbaarheid en optimaliseer productpagina's, content en techniek.",
    headline: "Laat je schoenen aanbevelen wanneer klanten het AI vragen",
    intro:
      "Klanten vragen AI-assistenten om hardloopschoenen voor platvoeten, waterdichte laarzen voor de stad of sneakers die normaal vallen. Beseam volgt waar je schoenen in die antwoorden verschijnen, en optimaliseert je productpagina's, content en techniek zodat assistenten ze aanbevelen.",
    heroChat: {
      prompt:
        "Waterdichte leren laarzen voor dagelijks woon-werkverkeer, brede pasvorm?",
      reply:
        "Voor dagelijks woon-werkverkeer in de regen werkt een waterdichte leren laars met een stevige zool goed. Deze is er ook in een brede pasvorm:",
      product: {
        name: "City Leather Boot",
        store: "jouwwinkel.nl",
        price: "€149",
        image: "/images/catalog/boot.webp",
        facts: ["Waterdicht", "Brede pasvorm", "Valt normaal"],
      },
      sticker: "Aanbevolen door 3 van 4 assistenten",
    },
    shopperQuestions: {
      heading: "Wat klanten AI vragen over schoenen",
      items: [
        "Beste hardloopschoenen voor platvoeten onder €150",
        "Waterdichte leren laarzen voor dagelijks woon-werkverkeer",
        "Vallen deze sneakers normaal?",
        "Comfortabele schoenen om de hele dag op te staan",
        "Trailschoenen voor brede voeten",
        "Vegan sneakers die lang meegaan",
      ],
    },
    pillars: {
      heading: "Alles wat ervoor zorgt dat AI je schoenen aanbeveelt",
      intro:
        "Goede productpagina's zijn maar een deel van het verhaal. Beseam dekt de vier dingen af die bepalen of AI-assistenten jouw schoenen aanbevelen, of die van een ander.",
      items: [
        {
          product: "ai-visibility-tracking",
          title: "Zie bij welke schoenvragen je verschijnt",
          body: "Beseam stelt AI-assistenten de vragen van je klanten, van hardloopschoenen voor platvoeten tot waterdichte laarzen voor woon-werkverkeer, en laat zien waar je schoenen worden aanbevolen en wie in plaats daarvan verschijnt.",
          points: [
            "Gevolgd per vraag, product en assistent",
            "Zie welke concurrenten in plaats daarvan worden aanbevolen",
            "Gekoppeld aan verkeer en omzet uit AI-assistenten",
          ],
          visual: {
            kind: "visibility",
            label: "AI-zichtbaarheid · schoenvragen",
            rows: [
              { prompt: "Hardloopschoenen voor platvoeten", recommended: true },
              {
                prompt: "Waterdichte laarzen voor woon-werk",
                recommended: false,
              },
              { prompt: "Trailschoenen met brede pasvorm", recommended: true },
              { prompt: "Vegan sneakers die lang meegaan", recommended: false },
            ],
          },
        },
        {
          product: "product-descriptions",
          title: "Productpagina's die vragen over pasvorm en maat beantwoorden",
          body: "Wie online schoenen koopt, wil vooraf weten hoe breed ze zijn, welke maat past en waarvoor ze bedoeld zijn. Beseam herschrijft beschrijvingen en vult ontbrekende productdata aan, zodat assistenten elke schoen aan een concrete vraag kunnen koppelen.",
          points: [
            "Maatadvies en breedte in de tekst, niet alleen in een tabel",
            "Gebruik, materialen en bescherming tegen het weer",
            "Complete data voor elke maat en kleur",
          ],
          visual: {
            kind: "description",
            before: {
              label: "Voor",
              text: "Onze populairste hardloopschoen. Stijlvol, comfortabel en verkrijgbaar in vier kleuren. Perfect voor elke run!",
            },
            after: {
              label: "Geoptimaliseerd voor AI",
              text: "Een waterdichte trailschoen met een brede teenbox en 8 mm drop, gemaakt voor natte en modderige paden. EU 38–47, in normale en brede pasvorm. Valt normaal.",
            },
          },
        },
        {
          product: "content-creation",
          title: "Content voor de vraag ‘welke schoen moet ik kopen?’",
          body: "Veel schoenvragen gaan niet over één product: klanten vragen AI om te vergelijken, uit te leggen en te helpen kiezen. Beseam helpt je de categoriepagina's, vergelijkingen en koopgidsen te maken die je assortiment in die antwoorden brengen.",
          points: [
            "Categoriepagina's voor behoeften zoals brede pasvorm of vegan",
            "Vergelijkingen zoals trail- of wegschoenen",
            "Koopgidsen over maat, pasvorm en onderhoud",
          ],
          visual: {
            kind: "pages",
            label: "Gevonden contenthiaten",
            rows: [
              {
                type: "Categorie",
                title: "Hardloopschoenen met brede pasvorm",
                status: "Nieuwe pagina",
              },
              {
                type: "Vergelijking",
                title: "Trail- of wegschoenen",
                status: "Nieuwe pagina",
              },
              {
                type: "Gids",
                title: "Zo vind je je hardloopschoenmaat",
                status: "Concept klaar",
              },
            ],
          },
        },
        {
          product: "technical-performance",
          title: "Productdata die AI kan lezen en vertrouwen",
          body: "Schoenen komen in veel maten en kleuren, waardoor productdata snel fout gaat. Beseam controleert of gestructureerde data, prijzen en voorraad overeenkomen met je pagina's, en of AI-crawlers ze kunnen bereiken.",
          points: [
            "Gestructureerde data voor elke maatvariant",
            "Voorraad per maat die klopt met de pagina",
            "AI-crawlers toegelaten, pagina's laden snel",
          ],
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
                label: "Voorraad per maatvariant",
                ok: false,
                detail: "Niet synchroon",
              },
              {
                label: "Toegang voor AI-crawlers",
                ok: true,
                detail: "Toegestaan",
              },
              {
                label: "Laadsnelheid productpagina's",
                ok: true,
                detail: "Snel",
              },
            ],
          },
        },
      ],
    },
    checklist: {
      heading: "Wat AI nodig heeft van een schoenenwebwinkel",
      intro:
        "AI-assistenten bevelen schoenen aan die ze kunnen begrijpen, vergelijken en vertrouwen. Dit zijn de details die het meest tellen, op je productpagina's en daarbuiten.",
      items: [
        {
          title: "Maten en maatadvies",
          body: "Beschikbare maten in een duidelijk systeem (EU, UK of US), en of de schoen klein, groot of normaal valt.",
        },
        {
          title: "Breedte en pasvorm",
          body: "Normale, brede of smalle pasvorm, en de vorm van de teenbox. Vragen over brede pasvorm komen vaak voor en blijven vaak onbeantwoord.",
        },
        {
          title: "Gebruik",
          body: "Waarvoor de schoen gemaakt is: de weg, trail, wandelen, kantoor of de hele dag staan. Assistenten bevelen schoenen aan voor situaties.",
        },
        {
          title: "Materialen en bescherming",
          body: "Materialen van bovenwerk, voering en zool, of de schoen vegan is, en of hij waterdicht of ademend is.",
        },
        {
          title: "Technische specificaties",
          body: "Voor sportschoenen: drop, demping, gewicht en stabiliteit, de feiten waarop assistenten vergelijken.",
        },
        {
          title: "Categoriepagina's voor veelvoorkomende behoeften",
          body: "Pagina's voor brede, vegan of waterdichte schoenen geven assistenten een duidelijk overzicht van je aanbod.",
        },
        {
          title: "Gidsen en vergelijkingen",
          body: "Content over maat, pasvorm en het kiezen van de juiste schoen geeft assistenten een reden om je winkel te noemen.",
        },
        {
          title: "Correcte data per variant",
          body: "Gestructureerde data, prijzen en voorraad voor elke maat en kleur, die kloppen met wat klanten op de pagina zien.",
        },
      ],
    },
    benefitsHeading: "Hoe Beseam schoenenwebwinkels helpt",
    benefits: [
      {
        title: "Maat en pasvorm, duidelijk beschreven",
        body: "Beschrijf maat, breedte en pasvorm, de details waar klanten het meest naar vragen voordat ze online schoenen kopen.",
        icon: Ruler,
      },
      {
        title: "Materialen en gebruik",
        body: "Beschrijf materialen, waterdichtheid en waarvoor elke schoen gemaakt is, van trailrunning tot kantoor.",
        icon: Footprints,
      },
      {
        title: "Elke variant gedekt",
        body: "Houd maten, kleuren en voorraaddata compleet, zodat AI geen schoen aanbeveelt die niet leverbaar is.",
        icon: Layers,
      },
    ],
    mistakes: {
      heading: "Veelgemaakte fouten die schoenen uit AI-antwoorden houden",
      items: [
        notKnowingMistake("jouw schoenen"),
        {
          title: "Marketingtaal in plaats van feiten",
          body: "‘Stijlvol en comfortabel’ geeft een assistent niets om mee te werken. Breedte, drop, materialen en gebruik wel.",
        },
        {
          title: "Maatinformatie verstopt in een afbeelding",
          body: "Maattabellen als afbeelding zijn moeilijk te lezen voor AI. Zet maatadvies in de tekst en in je productdata.",
        },
        {
          title: "Alleen productpagina's, geen gidsen",
          body: "Bij ‘welke hardloopschoen moet ik kopen?’ gebruiken assistenten gidsen en vergelijkingen. Zonder die pagina's is je winkel geen onderdeel van het antwoord.",
        },
        {
          title: "Uitverkochte maten als beschikbaar getoond",
          body: "Als productdata en voorraad elkaar tegenspreken, slaan assistenten je schoenen mogelijk over of sturen ze klanten naar een doodlopende weg.",
        },
        crawlerMistake,
      ],
    },
    stepsHeading: "Zo werkt Beseam voor schoenenwebwinkels",
    steps: steps("schoenen"),
    faqs: [
      {
        question: "Hoe zorg ik dat ChatGPT mijn schoenen aanbeveelt?",
        answer:
          "Begin met weten bij welke schoenvragen je verschijnt. Zorg er daarna voor dat je productpagina's maat, pasvorm, materialen en gebruik noemen, voeg content toe voor de vragen die klanten uitzoeken, en houd je productdata correct. Beseam dekt alle vier af en laat zien wat je eerst moet verbeteren.",
      },
      {
        question: "Welke productinformatie is het belangrijkst voor schoenen?",
        answer:
          "Maten en maatadvies, breedte en pasvorm, gebruik, materialen, bescherming tegen het weer en, voor sportschoenen, specificaties zoals drop en demping. Samen laten ze AI een schoen aan een concrete vraag koppelen.",
      },
      {
        question:
          "Welke content helpt schoenenwebwinkels om aanbevolen te worden?",
        answer:
          "Categoriepagina's voor veelvoorkomende behoeften, zoals brede of waterdichte schoenen, vergelijkingen zoals trail- of wegschoenen, en koopgidsen over maat en pasvorm. AI-assistenten gebruiken dit soort content wanneer klanten om advies vragen.",
      },
      {
        question:
          "Welke technische problemen komen vaak voor bij schoenenwebwinkels?",
        answer:
          "Gestructureerde data waarin maatvarianten ontbreken, voorraad per maat die niet klopt met de pagina, en AI-crawlers die door botbescherming worden geblokkeerd. Omdat schoenen in veel maten en kleuren komen, raken kleine datafouten veel producten tegelijk.",
      },
      {
        question:
          "Kan ik zien welke schoenmerken AI in plaats van het mijne aanbeveelt?",
        answer: trackedCompetitorsAnswer,
      },
      {
        question:
          "Hoe lang duurt het voordat mijn schoenen in AI-antwoorden verschijnen?",
        answer: timelineAnswer,
      },
      catalogueFaq,
      platformFaq,
    ],
    relatedProducts: ALL_PRODUCTS,
  },
  {
    slug: "fashion-apparel",
    name: "Mode & kleding",
    metaTitle: "AI-zoekoptimalisatie voor modewebwinkels | Beseam",
    metaDescription:
      "Laat ChatGPT, Gemini en andere AI-assistenten je kleding aanbevelen. Volg je AI-zichtbaarheid en optimaliseer productpagina's, content en techniek voor mode.",
    headline: "Laat AI je modecollectie aanbevelen",
    intro:
      "Klanten vragen AI om een linnen overhemd voor een zomerbruiloft, een winterjas die over een colbert past, of jeans voor lange mannen. Beseam volgt waar je kleding in die antwoorden verschijnt, en optimaliseert je productpagina's, content en techniek zodat assistenten ze aanbevelen.",
    heroChat: {
      prompt: "Biologisch katoenen T-shirt dat na het wassen in vorm blijft?",
      reply:
        "Kies voor zwaarder, voorgewassen biologisch katoen, dat wasbeurt na wasbeurt in vorm blijft. Deze past goed:",
      product: {
        name: "Everyday Organic Tee",
        store: "jouwwinkel.nl",
        price: "€35",
        image: "/images/catalog/tshirt.webp",
        facts: ["Biologisch katoen", "Voorgewassen", "Normale pasvorm"],
      },
      sticker: "Aanbevolen door 3 van 4 assistenten",
    },
    shopperQuestions: {
      heading: "Wat klanten AI vragen over mode",
      items: [
        "Linnen overhemd voor een zomerbruiloft",
        "Warme winterjas die over een colbert past",
        "Duurzame jeans voor lange mannen",
        "Wat draag ik op een smart casual kantoor?",
        "Luchtige jurken voor warm weer",
        "Biologisch katoenen T-shirt dat in vorm blijft",
      ],
    },
    pillars: {
      heading: "Alles wat ervoor zorgt dat AI je kleding aanbeveelt",
      intro:
        "Goede productpagina's zijn maar een deel van het verhaal. Beseam dekt de vier dingen af die bepalen of AI-assistenten jouw kleding aanbevelen, of die van een ander.",
      items: [
        {
          product: "ai-visibility-tracking",
          title: "Zie bij welke modevragen je verschijnt",
          body: "Beseam stelt AI-assistenten de vragen van je klanten, van wat je draagt naar een zomerbruiloft tot jeans voor lange mannen, en laat zien waar je kleding wordt aanbevolen en wie in plaats daarvan verschijnt.",
          points: TRACKING_POINTS,
          visual: {
            kind: "visibility",
            label: "AI-zichtbaarheid · modevragen",
            rows: [
              {
                prompt: "Linnen overhemd voor een zomerbruiloft",
                recommended: true,
              },
              { prompt: "Jeans voor lange mannen", recommended: false },
              { prompt: "Jas die over een colbert past", recommended: true },
              { prompt: "Luchtige jurken voor warm weer", recommended: false },
            ],
          },
        },
        {
          product: "product-descriptions",
          title:
            "Productpagina's die vragen over pasvorm en gelegenheid beantwoorden",
          body: "Klanten vragen hoe een kledingstuk valt, waar het van gemaakt is en wanneer je het draagt. Beseam herschrijft beschrijvingen en vult ontbrekende productdata aan, zodat assistenten elk item aan een concrete vraag kunnen koppelen.",
          points: [
            "Snit, pasvorm en maatadvies in de tekst",
            "Stof, gewicht en wasvoorschriften",
            "Gelegenheden en styling, voor elke kleur en maat",
          ],
          visual: {
            kind: "description",
            before: {
              label: "Voor",
              text: "Ons best verkochte linnen overhemd. Moeiteloos stijlvol en perfect voor de zomer. Verkrijgbaar in vijf kleuren.",
            },
            after: {
              label: "Geoptimaliseerd voor AI",
              text: "Een overhemd met losse pasvorm van 100% Europees linnen, licht genoeg voor warme dagen en net genoeg voor een zomerbruiloft. Valt net onder de heup. Valt normaal; kies een maat kleiner voor een strakkere pasvorm.",
            },
          },
        },
        {
          product: "content-creation",
          title: "Content voor de vraag ‘wat moet ik aantrekken?’",
          body: "Veel modevragen gaan over gelegenheden, stijlen en vergelijkingen, niet over één product. Beseam helpt je de categoriepagina's, stijlgidsen en vergelijkingen te maken die je assortiment in die antwoorden brengen.",
          points: [
            "Categoriepagina's voor gelegenheden zoals bruiloften of kantoor",
            "Stijlgidsen, zoals wat je draagt op een smart casual kantoor",
            "Gidsen over pasvorm en stoffen, zoals linnen of katoen",
          ],
          visual: {
            kind: "pages",
            label: "Gevonden contenthiaten",
            rows: [
              {
                type: "Categorie",
                title: "Outfits voor bruiloftsgasten in de zomer",
                status: "Nieuwe pagina",
              },
              {
                type: "Gids",
                title: "Wat draag ik op een smart casual kantoor?",
                status: "Concept klaar",
              },
              {
                type: "Vergelijking",
                title: "Linnen of katoenen overhemden",
                status: "Nieuwe pagina",
              },
            ],
          },
        },
        {
          product: "technical-performance",
          title: "Productdata die AI kan lezen en vertrouwen",
          body: "Elk kledingstuk komt in meerdere kleuren en maten, waardoor productdata snel fout gaat. Beseam controleert of gestructureerde data, prijzen en voorraad overeenkomen met je pagina's, en of AI-crawlers ze kunnen bereiken.",
          points: [
            "Gestructureerde data voor elke kleur en maat",
            "Voorraad per variant die klopt met de pagina",
            "AI-crawlers toegelaten, pagina's laden snel",
          ],
          visual: {
            kind: "checks",
            label: "Technische controle",
            rows: [
              {
                label: "Gestructureerde productdata",
                ok: true,
                detail: "Aanwezig",
              },
              { label: "Kleurvarianten", ok: false, detail: "Data ontbreekt" },
              {
                label: "Toegang voor AI-crawlers",
                ok: true,
                detail: "Toegestaan",
              },
              {
                label: "Laadsnelheid productpagina's",
                ok: true,
                detail: "Snel",
              },
            ],
          },
        },
      ],
    },
    checklist: {
      heading: "Wat AI nodig heeft van een modewebwinkel",
      intro:
        "AI-assistenten bevelen kleding aan die ze kunnen begrijpen, vergelijken en vertrouwen. Dit zijn de details die het meest tellen, op je productpagina's en daarbuiten.",
      items: [
        {
          title: "Snit, pasvorm en maatadvies",
          body: "Slanke, normale of losse pasvorm, de lengte, en of het item klein, groot of normaal valt.",
        },
        {
          title: "Stof en gewicht",
          body: "De materialen en hoe de stof aanvoelt en draagt: licht linnen, zwaar katoen, stretchdenim.",
        },
        {
          title: "Gelegenheid en seizoen",
          body: "Wanneer je het draagt: bruiloften, kantoor, vakantie of de winterse rit naar je werk. Assistenten bevelen kleding aan voor situaties.",
        },
        {
          title: "Kleuren en varianten",
          body: "Duidelijke kleurnamen en elke kleur en maat als eigen variant, niet alleen ‘verkrijgbaar in vijf kleuren’.",
        },
        {
          title: "Onderhoud en duurzaamheid",
          body: "Wasvoorschriften en eventuele certificeringen of gerecyclede materialen, duidelijk in de tekst vermeld.",
        },
        {
          title: "Categoriepagina's voor veelvoorkomende behoeften",
          body: "Pagina's voor gelegenheden, stijlen en pasvormen geven assistenten een duidelijk overzicht van je aanbod.",
        },
        {
          title: "Stijlgidsen en vergelijkingen",
          body: "Content over wat je draagt en hoe je kiest geeft assistenten een reden om je winkel te noemen.",
        },
        {
          title: "Correcte data per variant",
          body: "Gestructureerde data, prijzen en voorraad voor elke kleur en maat, die kloppen met wat klanten op de pagina zien.",
        },
      ],
    },
    benefitsHeading: "Wat AI nodig heeft om je kleding aan te bevelen",
    benefits: [
      {
        title: "Snitten, pasvormen en maten",
        body: "Beschrijf snit, pasvorm en maten, zodat assistenten kleding aan lichaamstypes en voorkeuren kunnen koppelen.",
        icon: Shirt,
      },
      {
        title: "Gelegenheden en styling",
        body: "Koppel producten aan de gelegenheden en stijlen waar klanten naar vragen, van bruiloften tot kantoor.",
        icon: Sparkles,
      },
      {
        title: "Kleuren en materialen",
        body: "Maak kleuren, stoffen en wasvoorschriften expliciet, voor elke variant in je assortiment.",
        icon: Palette,
      },
    ],
    mistakes: {
      heading: "Veelgemaakte fouten die kleding uit AI-antwoorden houden",
      items: [
        notKnowingMistake("jouw kleding"),
        {
          title: "Sfeer in plaats van feiten",
          body: "‘Moeiteloos stijlvol’ geeft een assistent niets om mee te werken. Pasvorm, stof, lengte en gelegenheid wel.",
        },
        {
          title: "Pasvormadvies alleen in reviews",
          body: "Als ‘neem een maat kleiner’ alleen in klantreviews staat, mist een assistent het mogelijk. Zet het in de beschrijving.",
        },
        {
          title: "Geen pagina's voor gelegenheden",
          body: "Bij ‘wat trek ik aan naar een zomerbruiloft?’ gebruiken assistenten categoriepagina's en gidsen. Zonder die pagina's is je assortiment geen onderdeel van het antwoord.",
        },
        {
          title: "Vage kleurnamen",
          body: "‘Zand’, ‘steen’ en ‘haver’ zeggen op zichzelf weinig. Voeg de gewone kleur toe zodat assistenten de vraag kunnen koppelen.",
        },
        crawlerMistake,
      ],
    },
    stepsHeading: "Zo werkt Beseam voor modewebwinkels",
    steps: steps("mode"),
    faqs: [
      {
        question: "Hoe zorg ik dat AI-assistenten mijn kleding aanbevelen?",
        answer:
          "Begin met weten bij welke modevragen je verschijnt. Zorg er daarna voor dat je productpagina's snit, pasvorm, stof en gelegenheid noemen, voeg content toe voor de vragen die klanten uitzoeken, en houd je productdata correct. Beseam dekt alle vier af en laat zien wat je eerst moet verbeteren.",
      },
      {
        question: "Welke productinformatie is het belangrijkst voor mode?",
        answer:
          "Snit en pasvorm, maatadvies, stof en gewicht, gelegenheid en seizoen, kleuren en onderhoud. Samen laten ze AI een kledingstuk aan een concrete vraag koppelen.",
      },
      {
        question: "Waarom zijn gelegenheden belangrijk voor AI-zoekopdrachten?",
        answer:
          "Klanten vragen AI vaak wat ze moeten dragen voor een bepaalde gelegenheid. Productpagina's en categorieën die die gelegenheden noemen, worden makkelijker aanbevolen door assistenten.",
      },
      {
        question: "Welke content helpt modewebwinkels om aanbevolen te worden?",
        answer:
          "Categoriepagina's voor gelegenheden en stijlen, stijlgidsen zoals wat je draagt op kantoor, en vergelijkingen van stoffen of pasvormen. AI-assistenten gebruiken dit soort content wanneer klanten om advies vragen.",
      },
      {
        question:
          "Kan ik zien welke merken AI in plaats van het mijne aanbeveelt?",
        answer: trackedCompetitorsAnswer,
      },
      {
        question:
          "Hoe lang duurt het voordat mijn kleding in AI-antwoorden verschijnt?",
        answer: timelineAnswer,
      },
      catalogueFaq,
      platformFaq,
    ],
    relatedProducts: ALL_PRODUCTS,
  },
  {
    slug: "beauty-cosmetics",
    name: "Beauty & cosmetica",
    metaTitle: "AI-zoekoptimalisatie voor beautywebwinkels | Beseam",
    metaDescription:
      "Laat ChatGPT en andere AI-assistenten je beauty- en huidverzorgingsproducten aanbevelen. Volg je AI-zichtbaarheid en optimaliseer pagina's en techniek.",
    headline: "Laat AI je beautyproducten aanbevelen",
    intro:
      "Klanten vragen AI welk serum helpt tegen een doffe huid, welke zonnebrand bij een gevoelige huid past, of welke shampoo sulfaatvrij is. Beseam volgt waar je producten in die antwoorden verschijnen, en optimaliseert je productpagina's, content en techniek zodat assistenten ze aanbevelen.",
    heroChat: {
      prompt: "Parfumvrije vochtinbrengende crème voor een gevoelige huid?",
      reply:
        "Voor een gevoelige huid ondersteunt een parfumvrije crème met ceramiden de huidbarrière. Deze past bij wat je zoekt:",
      product: {
        name: "Calm Barrier Moisturiser",
        store: "jouwwinkel.nl",
        price: "€24",
        // "A jar of cream with mint leaves on a white table" by Maria
        // Kovalets, unsplash.com/photos/Y89Qfa_H7-o (Unsplash licence).
        image: "/images/catalog/moisturiser.webp",
        facts: ["Parfumvrij", "Ceramiden", "Gevoelige huid"],
      },
      sticker: "Aanbevolen door 3 van 4 assistenten",
    },
    shopperQuestions: {
      heading: "Wat klanten AI vragen over beauty",
      items: [
        "Beste vitamine C-serum voor een doffe huid",
        "Parfumvrije crème voor een gevoelige huid",
        "Sulfaatvrije shampoo voor krullend haar",
        "Minerale zonnebrand zonder witte waas",
        "Vegan en dierproefvrije mascara",
        "Alternatief voor retinol voor beginners",
      ],
    },
    pillars: {
      heading: "Alles wat ervoor zorgt dat AI je beautyproducten aanbeveelt",
      intro:
        "Goede productpagina's zijn maar een deel van het verhaal. Beseam dekt de vier dingen af die bepalen of AI-assistenten jouw producten aanbevelen, of die van een ander.",
      items: [
        {
          product: "ai-visibility-tracking",
          title: "Zie bij welke beautyvragen je verschijnt",
          body: "Beseam stelt AI-assistenten de vragen van je klanten, van serums voor een doffe huid tot sulfaatvrije shampoo, en laat zien waar je producten worden aanbevolen en wie in plaats daarvan verschijnt.",
          points: TRACKING_POINTS,
          visual: {
            kind: "visibility",
            label: "AI-zichtbaarheid · beautyvragen",
            rows: [
              {
                prompt: "Vitamine C-serum voor een doffe huid",
                recommended: true,
              },
              { prompt: "Minerale zonnebrand zonder waas", recommended: false },
              {
                prompt: "Sulfaatvrije shampoo voor krullen",
                recommended: true,
              },
              {
                prompt: "Retinol-alternatief voor beginners",
                recommended: false,
              },
            ],
          },
        },
        {
          product: "product-descriptions",
          title:
            "Productpagina's die vragen over ingrediënten en huidtypes beantwoorden",
          body: "Beautyklanten vragen wat er in een product zit, wat het doet en of het bij hen past. Beseam herschrijft beschrijvingen en vult ontbrekende productdata aan, zodat assistenten elk product aan een concrete behoefte kunnen koppelen.",
          points: [
            "Belangrijke ingrediënten en wat ze doen",
            "Huidtypes, haartypes en aandachtspunten",
            "Hoe je het gebruikt, en waar het vrij van is",
          ],
          visual: {
            kind: "description",
            before: {
              label: "Voor",
              text: "Ons iconische glow-serum. Een klein flesje magie voor een stralende, gezond ogende huid. Je gaat het geweldig vinden!",
            },
            after: {
              label: "Geoptimaliseerd voor AI",
              text: "Een serum met 15% vitamine C en hyaluronzuur voor een doffe, ongelijkmatige huid. Licht en parfumvrij, voor een normale tot gecombineerde huid. 's Ochtends aanbrengen, vóór de zonnebrand.",
            },
          },
        },
        {
          product: "content-creation",
          title: "Content voor de vraag ‘wat moet ik gebruiken?’",
          body: "Veel beautyvragen gaan over routines, ingrediënten en vergelijkingen. Beseam helpt je de categoriepagina's, routinegidsen en uitleg over ingrediënten te maken die je assortiment in die antwoorden brengen.",
          points: [
            "Categoriepagina's per huidtype of aandachtspunt",
            "Routinegidsen, zoals een ochtendroutine voor een droge huid",
            "Uitleg en vergelijkingen van ingrediënten",
          ],
          visual: {
            kind: "pages",
            label: "Gevonden contenthiaten",
            rows: [
              {
                type: "Categorie",
                title: "Huidverzorging voor een gevoelige huid",
                status: "Nieuwe pagina",
              },
              {
                type: "Gids",
                title: "Ochtendroutine voor een droge huid",
                status: "Concept klaar",
              },
              {
                type: "Vergelijking",
                title: "Minerale of chemische zonnebrand",
                status: "Nieuwe pagina",
              },
            ],
          },
        },
        {
          product: "technical-performance",
          title: "Productdata die AI kan lezen en vertrouwen",
          body: "Tinten, maten en navullingen vermenigvuldigen je varianten, en ingrediëntenlijsten zitten vaak in afbeeldingen. Beseam controleert of gestructureerde data, prijzen en voorraad overeenkomen met je pagina's, en of AI-crawlers ze kunnen bereiken.",
          points: [
            "Gestructureerde data voor elke tint en maat",
            "Ingrediëntenlijsten als tekst, niet als afbeelding",
            "AI-crawlers toegelaten, pagina's laden snel",
          ],
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
                label: "Ingrediëntenlijsten",
                ok: false,
                detail: "In afbeeldingen",
              },
              {
                label: "Toegang voor AI-crawlers",
                ok: true,
                detail: "Toegestaan",
              },
              {
                label: "Laadsnelheid productpagina's",
                ok: true,
                detail: "Snel",
              },
            ],
          },
        },
      ],
    },
    checklist: {
      heading: "Wat AI nodig heeft van een beautywebwinkel",
      intro:
        "AI-assistenten bevelen beautyproducten aan die ze kunnen begrijpen, vergelijken en vertrouwen. Dit zijn de details die het meest tellen, op je productpagina's en daarbuiten.",
      items: [
        {
          title: "Belangrijke ingrediënten",
          body: "De werkzame stoffen, waar relevant hun concentratie, en wat elk ervan doet.",
        },
        {
          title: "Huid- en haartypes",
          body: "Voor wie het product geschikt is: droge, vette, gevoelige of gecombineerde huid, en krullend, fijn of gekleurd haar.",
        },
        {
          title: "Aandachtspunten die het aanpakt",
          body: "Doffe huid, roodheid, pluis of droogte. Klanten vragen AI naar huidproblemen, niet naar productnamen.",
        },
        {
          title: "Vrij van en certificeringen",
          body: "Parfumvrij, vegan, dierproefvrij of sulfaatvrij, duidelijk in de tekst vermeld.",
        },
        {
          title: "Hoe je het gebruikt",
          body: "Wanneer en hoe je het aanbrengt, en waarmee je het combineert, zodat assistenten het in een routine kunnen plaatsen.",
        },
        {
          title: "Categoriepagina's per aandachtspunt",
          body: "Pagina's per huidtype of aandachtspunt geven assistenten een duidelijk overzicht van je aanbod.",
        },
        {
          title: "Routines en ingrediëntengidsen",
          body: "Content over routines en ingrediënten geeft assistenten een reden om je winkel te noemen.",
        },
        {
          title: "Correcte data per variant",
          body: "Gestructureerde data, prijzen en voorraad voor elke tint en maat, die kloppen met wat klanten op de pagina zien.",
        },
      ],
    },
    benefitsHeading: "Wat AI nodig heeft om je beautyproducten aan te bevelen",
    benefits: [
      {
        title: "Ingrediënten duidelijk beschreven",
        body: "Noem de belangrijke ingrediënten en wat ze doen, de details waar beautyklanten AI het eerst naar vragen.",
        icon: FlaskConical,
      },
      {
        title: "Afgestemd op huid- en haartypes",
        body: "Koppel elk product aan de huidtypes, haartypes en aandachtspunten waarvoor het gemaakt is.",
        icon: Droplet,
      },
      {
        title: "Duidelijke, consistente claims",
        body: "Houd productclaims, certificeringen en gebruiksaanwijzingen duidelijk en consistent in je hele winkel.",
        icon: BadgeCheck,
      },
    ],
    mistakes: {
      heading:
        "Veelgemaakte fouten die beautyproducten uit AI-antwoorden houden",
      items: [
        notKnowingMistake("jouw producten"),
        {
          title: "Hype in plaats van feiten",
          body: "‘Een klein flesje magie’ geeft een assistent niets om mee te werken. Ingrediënten, huidtypes en aandachtspunten wel.",
        },
        {
          title: "Ingrediëntenlijsten als afbeelding",
          body: "Ingrediëntenlijsten op productfoto's zijn moeilijk te lezen voor AI. Zet ze in de tekst en in je productdata.",
        },
        {
          title: "Geen huidtype of aandachtspunt genoemd",
          body: "Als je pagina niet zegt dat een product geschikt is voor een gevoelige huid, bevelen assistenten het niet aan aan klanten die daarnaar vragen.",
        },
        {
          title: "Geen routines of gidsen",
          body: "Bij ‘wat is een goede routine voor een droge huid?’ gebruiken assistenten gidsen. Zonder die pagina's is je winkel geen onderdeel van het antwoord.",
        },
        crawlerMistake,
      ],
    },
    stepsHeading: "Zo werkt Beseam voor beautywebwinkels",
    steps: steps("beauty"),
    faqs: [
      {
        question: "Hoe zorg ik dat ChatGPT mijn beautyproducten aanbeveelt?",
        answer:
          "Begin met weten bij welke beautyvragen je verschijnt. Zorg er daarna voor dat je productpagina's belangrijke ingrediënten, huid- of haartypes en aandachtspunten noemen, voeg content toe voor de vragen die klanten uitzoeken, en houd je productdata correct. Beseam dekt alle vier af en laat zien wat je eerst moet verbeteren.",
      },
      {
        question: "Waarom zijn ingrediënten belangrijk voor AI-zoekopdrachten?",
        answer:
          "Beautyklanten vragen vaak naar specifieke ingrediënten of naar wat ze moeten vermijden. Productpagina's die ingrediënten duidelijk noemen, laten AI-assistenten je producten aan die vragen koppelen.",
      },
      {
        question:
          "Welke content helpt beautywebwinkels om aanbevolen te worden?",
        answer:
          "Categoriepagina's per huidtype of aandachtspunt, routinegidsen en uitleg over ingrediënten. AI-assistenten gebruiken dit soort content wanneer klanten om advies vragen.",
      },
      {
        question: "Past Beseam mijn productclaims aan?",
        answer:
          "Niet zonder je goedkeuring. Elke voorgestelde wijziging wacht op jou, tenzij je dat soort wijziging automatiseert, zodat jij de controle houdt over claims en formuleringen. Alle wijzigingen blijven terug te draaien.",
      },
      {
        question:
          "Kan ik zien welke merken AI in plaats van het mijne aanbeveelt?",
        answer: trackedCompetitorsAnswer,
      },
      {
        question:
          "Hoe lang duurt het voordat mijn producten in AI-antwoorden verschijnen?",
        answer: timelineAnswer,
      },
      catalogueFaq,
      platformFaq,
    ],
    relatedProducts: ALL_PRODUCTS,
  },
  {
    slug: "consumer-electronics",
    name: "Consumentenelektronica",
    metaTitle: "AI-zoekoptimalisatie voor elektronicawebwinkels | Beseam",
    metaDescription:
      "Laat ChatGPT, Gemini en andere AI-assistenten je elektronica aanbevelen. Volg je AI-zichtbaarheid en optimaliseer specificaties, content en techniek.",
    headline: "Laat je elektronica aanbevelen wanneer klanten het AI vragen",
    intro:
      "Klanten vragen AI welke noise-cancelling koptelefoon het langst meegaat, welke laptop fotobewerking aankan, of welke oplader bij hun telefoon past. Beseam volgt waar je producten in die antwoorden verschijnen, en optimaliseert je productpagina's, content en techniek zodat assistenten ze correct vergelijken.",
    heroChat: {
      prompt: "Noise-cancelling koptelefoon met de langste accuduur?",
      reply:
        "Als accuduur het belangrijkst is, kies dan voor 40 uur of meer met noise cancelling aan. Deze is een sterke keuze:",
      product: {
        name: "Studio ANC Headphones",
        store: "jouwwinkel.nl",
        price: "€229",
        // "Black and brown wireless headphones" by Blaz Erzetic,
        // unsplash.com/photos/tqAmHGbIPdM (Unsplash licence).
        image: "/images/catalog/headphones.webp",
        facts: ["50 uur accu", "Noise cancelling", "USB-C"],
      },
      sticker: "Aanbevolen door 3 van 4 assistenten",
    },
    shopperQuestions: {
      heading: "Wat klanten AI vragen over elektronica",
      items: [
        "Noise-cancelling koptelefoon met de langste accuduur",
        "Laptop onder €1.000 voor fotobewerking",
        "USB-C-oplader die werkt met mijn telefoon",
        "Smartwatch die compatibel is met Android",
        "Beste budgetspeakers voor een kleine kamer",
        "Robotstofzuiger voor huisdierharen",
      ],
    },
    pillars: {
      heading: "Alles wat ervoor zorgt dat AI je elektronica aanbeveelt",
      intro:
        "Goede productpagina's zijn maar een deel van het verhaal. Beseam dekt de vier dingen af die bepalen of AI-assistenten jouw producten aanbevelen, of die van een ander.",
      items: [
        {
          product: "ai-visibility-tracking",
          title: "Zie bij welke elektronicavragen je verschijnt",
          body: "Beseam stelt AI-assistenten de vragen van je klanten, van koptelefoons met de langste accuduur tot opladers voor een specifieke telefoon, en laat zien waar je producten worden aanbevolen en wie in plaats daarvan verschijnt.",
          points: [
            "Gevolgd per vraag, product en assistent",
            "Zie welke merken en winkels in plaats daarvan worden aanbevolen",
            "Gekoppeld aan verkeer en omzet uit AI-assistenten",
          ],
          visual: {
            kind: "visibility",
            label: "AI-zichtbaarheid · elektronicavragen",
            rows: [
              { prompt: "Koptelefoon met langste accuduur", recommended: true },
              { prompt: "Laptop voor fotobewerking", recommended: false },
              { prompt: "Smartwatch voor Android", recommended: true },
              {
                prompt: "Robotstofzuiger voor huisdierharen",
                recommended: false,
              },
            ],
          },
        },
        {
          product: "product-descriptions",
          title:
            "Productpagina's die vragen over specificaties en compatibiliteit beantwoorden",
          body: "Wie elektronica koopt, vergelijkt op feiten: accuduur, compatibiliteit, afmetingen. Beseam herschrijft beschrijvingen en vult ontbrekende specificaties aan, zodat assistenten je producten correct kunnen vergelijken.",
          points: [
            "Complete, consistente specificaties",
            "Compatibiliteit met apparaten en systemen",
            "Wat er in de doos zit en voor wie het is",
          ],
          visual: {
            kind: "description",
            before: {
              label: "Voor",
              text: "Beleef geluid zoals nooit tevoren. Premium audio, de hele dag comfort en de nieuwste technologie.",
            },
            after: {
              label: "Geoptimaliseerd voor AI",
              text: "Over-ear koptelefoon met actieve noise cancelling en tot 50 uur accuduur met ANC aan. Bluetooth 5.3, multipoint-verbinding met iOS en Android, snelladen via USB-C: 10 minuten laden geeft 5 uur.",
            },
          },
        },
        {
          product: "content-creation",
          title: "Content voor de vraag ‘welke moet ik kopen?’",
          body: "Wie elektronica koopt, zoekt het vooraf uit en vraagt AI om te vergelijken. Beseam helpt je de vergelijkingen, koopgidsen en categoriepagina's te maken die je assortiment in die antwoorden brengen.",
          points: [
            "Vergelijkingen tussen modellen en categorieën",
            "Koopgidsen, zoals het kiezen van een laptop voor fotobewerking",
            "Categoriepagina's voor behoeften zoals reizen of gaming",
          ],
          visual: {
            kind: "pages",
            label: "Gevonden contenthiaten",
            rows: [
              {
                type: "Vergelijking",
                title: "Over-ear of in-ear met noise cancelling",
                status: "Nieuwe pagina",
              },
              {
                type: "Gids",
                title: "Zo kies je een laptop voor fotobewerking",
                status: "Concept klaar",
              },
              {
                type: "Categorie",
                title: "Koptelefoons voor op reis",
                status: "Nieuwe pagina",
              },
            ],
          },
        },
        {
          product: "technical-performance",
          title: "Prijzen, voorraad en specificaties die AI vertrouwt",
          body: "Prijzen en voorraad van elektronica veranderen vaak, en assistenten vergelijken ze tussen winkels. Beseam controleert of gestructureerde data, prijzen en beschikbaarheid overeenkomen met je pagina's, en of AI-crawlers ze kunnen bereiken.",
          points: [
            "Prijzen en voorraad die kloppen met de pagina",
            "Gestructureerde data met kenmerken zoals de GTIN",
            "AI-crawlers toegelaten, pagina's laden snel",
          ],
          visual: {
            kind: "checks",
            label: "Technische controle",
            rows: [
              {
                label: "Gestructureerde productdata",
                ok: true,
                detail: "Aanwezig",
              },
              { label: "Prijs in productdata", ok: false, detail: "Verouderd" },
              {
                label: "Toegang voor AI-crawlers",
                ok: true,
                detail: "Toegestaan",
              },
              {
                label: "Laadsnelheid productpagina's",
                ok: true,
                detail: "Snel",
              },
            ],
          },
        },
      ],
    },
    checklist: {
      heading: "Wat AI nodig heeft van een elektronicawebwinkel",
      intro:
        "AI-assistenten bevelen elektronica aan die ze kunnen vergelijken en vertrouwen. Dit zijn de details die het meest tellen, op je productpagina's en daarbuiten.",
      items: [
        {
          title: "Complete specificaties",
          body: "De specificaties waarop klanten vergelijken, zoals accuduur, schermgrootte, opslag of vermogen, in de tekst en de productdata.",
        },
        {
          title: "Compatibiliteit",
          body: "Met welke apparaten, besturingssystemen, aansluitingen en accessoires het product werkt.",
        },
        {
          title: "Gebruik",
          body: "Voor wie en waarvoor het is: reizen, gaming, thuiswerken of fotobewerking. Assistenten bevelen producten aan voor situaties.",
        },
        {
          title: "Productkenmerken",
          body: "Merk, modelnummer en GTIN, zodat assistenten het exacte product herkennen en kunnen vergelijken.",
        },
        {
          title: "Inhoud van de doos en garantie",
          body: "Meegeleverde accessoires, garantie en retourvoorwaarden, duidelijk op de pagina vermeld.",
        },
        {
          title: "Vergelijkingen en koopgidsen",
          body: "Content die modellen vergelijkt en keuzes uitlegt, geeft assistenten een reden om je winkel te noemen.",
        },
        {
          title: "Categoriepagina's voor behoeften",
          body: "Pagina's voor behoeften zoals reiskoptelefoons of budgetlaptops geven assistenten een duidelijk overzicht.",
        },
        {
          title: "Correcte prijzen en voorraad",
          body: "Gestructureerde data, prijzen en beschikbaarheid die kloppen met wat klanten zien, en bijgewerkt worden als ze veranderen.",
        },
      ],
    },
    benefitsHeading: "Wat AI nodig heeft om je elektronica aan te bevelen",
    benefits: [
      {
        title: "Correcte specificaties",
        body: "Houd technische specificaties compleet en consistent, zodat assistenten je producten op de juiste feiten vergelijken.",
        icon: Cpu,
      },
      {
        title: "Compatibiliteit duidelijk vermeld",
        body: "Maak duidelijk met welke apparaten, systemen en accessoires elk product werkt.",
        icon: Plug,
      },
      {
        title: "Prijzen en voorraad synchroon",
        body: "Zorg dat de prijzen en beschikbaarheid op je pagina's overeenkomen met je productdata.",
        icon: RefreshCw,
      },
    ],
    mistakes: {
      heading: "Veelgemaakte fouten die elektronica uit AI-antwoorden houden",
      items: [
        notKnowingMistake("jouw producten"),
        {
          title: "Slogans in plaats van specificaties",
          body: "‘Geluid zoals nooit tevoren’ geeft een assistent niets om te vergelijken. Accuduur, compatibiliteit en afmetingen wel.",
        },
        {
          title: "Specificaties alleen in een pdf of afbeelding",
          body: "Specificatiebladen als pdf of afbeelding zijn moeilijk te lezen voor AI. Zet de belangrijkste specificaties in de tekst en de productdata.",
        },
        {
          title: "Compatibiliteit niet vermeld",
          body: "Als je pagina niet zegt dat een oplader met een specifieke telefoon werkt, bevelen assistenten hem niet aan voor die vraag.",
        },
        {
          title: "Verouderde prijzen in productdata",
          body: "Als gestructureerde data en de pagina niet overeenkomen over prijs of voorraad, slaan assistenten je producten mogelijk over.",
        },
        crawlerMistake,
      ],
    },
    stepsHeading: "Zo werkt Beseam voor elektronicawebwinkels",
    steps: steps("elektronica"),
    faqs: [
      {
        question: "Hoe zorg ik dat AI-assistenten mijn elektronica aanbevelen?",
        answer:
          "Begin met weten bij welke elektronicavragen je verschijnt. Zorg er daarna voor dat je productpagina's specificaties, compatibiliteit en gebruik noemen, voeg vergelijkingen en koopgidsen toe, en houd prijzen en voorraad correct. Beseam dekt alle vier af en laat zien wat je eerst moet verbeteren.",
      },
      {
        question:
          "Waarom zijn specificaties zo belangrijk voor AI-zoekopdrachten?",
        answer:
          "Elektronicaklanten vragen AI om producten te vergelijken op concrete feiten, zoals accuduur of compatibiliteit. Als die feiten ontbreken of elkaar tegenspreken, bevelen assistenten eerder een concurrent aan.",
      },
      {
        question:
          "Welke content helpt elektronicawebwinkels om aanbevolen te worden?",
        answer:
          "Vergelijkingen tussen modellen, koopgidsen die keuzes uitleggen, en categoriepagina's voor specifieke behoeften. AI-assistenten gebruiken dit soort content wanneer klanten vragen welk product ze moeten kopen.",
      },
      {
        question:
          "Waarom zijn prijzen en voorraad belangrijk voor AI-zoekopdrachten?",
        answer:
          "Assistenten vergelijken producten tussen winkels en vermijden aanbevelingen voor artikelen die niet leverbaar of verkeerd geprijsd lijken. Gestructureerde data die klopt met je pagina's helpt ze je winkel te vertrouwen.",
      },
      {
        question:
          "Kan ik zien welke winkels AI in plaats van de mijne aanbeveelt?",
        answer: trackedCompetitorsAnswer,
      },
      {
        question:
          "Hoe lang duurt het voordat mijn producten in AI-antwoorden verschijnen?",
        answer: timelineAnswer,
      },
      catalogueFaq,
      platformFaq,
    ],
    relatedProducts: ALL_PRODUCTS,
  },
  {
    slug: "shopify",
    name: "Beseam voor Shopify",
    metaTitle: "AI-zoekoptimalisatie voor Shopify-winkels | Beseam",
    metaDescription:
      "Koppel je Shopify-winkel met één klik. Volg je AI-zichtbaarheid en optimaliseer pagina's, content en techniek zodat ChatGPT je producten aanbeveelt.",
    headline: "AI-zoekoptimalisatie, gemaakt voor Shopify",
    intro:
      "Koppel je Shopify-winkel met één klik. Beseam importeert je catalogus zonder je themacode aan te raken, volgt hoe AI-assistenten over je producten praten, en optimaliseert je productpagina's, content en techniek, te beginnen met de wijzigingen die de meeste omzet kunnen opleveren.",
    heroChat: {
      prompt: "Lichte jas voor het voorjaar?",
      reply:
        "Voor het voorjaar werkt een lichte bomberjack die een bui tegenhoudt en over een trui past goed. Deze past goed:",
      product: {
        name: "Lightweight Bomber Jacket",
        store: "jouwwinkel.myshopify.com",
        price: "€119",
        // "Brown bomber jacket on hanger" by Tobias Tullius,
        // unsplash.com/photos/Fg15LdqpWrs (Unsplash licence).
        image: "/images/catalog/bomber-jacket.webp",
        facts: ["Waterafstotend", "Licht", "Normale pasvorm"],
      },
      sticker: "Aanbevolen door 3 van 4 assistenten",
    },
    pillars: {
      heading:
        "Alles wat je Shopify-winkel nodig heeft om door AI aanbevolen te worden",
      intro:
        "Beseam dekt de vier dingen af die bepalen of AI-assistenten je producten aanbevelen, allemaal via één koppeling met je Shopify-winkel.",
      items: [
        {
          product: "ai-visibility-tracking",
          title: "Zie bij welke vragen je winkel verschijnt",
          body: "Beseam stelt de vragen van je klanten op vanuit je Shopify-catalogus, stelt ze aan AI-assistenten, en laat zien waar je producten worden aanbevolen en wie in plaats daarvan verschijnt.",
          points: [
            "Vragen op basis van je eigen catalogus",
            "Gevolgd per vraag, product en assistent",
            "Gekoppeld aan verkeer en omzet uit AI-assistenten",
          ],
          visual: {
            kind: "visibility",
            label: "AI-zichtbaarheid · je catalogus",
            rows: [
              { prompt: "Lichte jas voor het voorjaar", recommended: true },
              {
                prompt: "Waterdichte laarzen voor woon-werk",
                recommended: false,
              },
              { prompt: "Opvouwbare jas voor op reis", recommended: true },
              { prompt: "Warme fietshandschoenen", recommended: false },
            ],
          },
        },
        {
          product: "product-descriptions",
          title: "Betere productpagina's, direct in Shopify gepubliceerd",
          body: "Beseam leest elk product en elke variant in je winkel, herschrijft beschrijvingen en vult ontbrekende productdata aan. Keur de wijzigingen goed en ze worden in je winkel gepubliceerd, of automatiseer de wijzigingen die je vertrouwt.",
          points: [
            "Elk product en elke variant in je catalogus",
            "Gerangschikt op verwachte omzetimpact",
            "Met een paar klikken goedgekeurd, altijd terug te draaien",
          ],
          visual: {
            kind: "description",
            before: {
              label: "Voor",
              text: "Onze favoriete regenjas. Blijf stijlvol droog, waar je dag je ook brengt!",
            },
            after: {
              label: "Geoptimaliseerd voor AI",
              text: "Een lichte, volledig waterdichte jas met getapete naden en reflecterende details, gemaakt om naar je werk te fietsen. Opvouwbaar in de eigen zak. Normale pasvorm met ruimte voor een laag eronder.",
            },
          },
        },
        {
          product: "content-creation",
          title: "Categoriepagina's, gidsen en vergelijkingen",
          body: "Assistenten gebruiken pagina's die uitleggen en vergelijken. Beseam helpt je categoriepagina's, blogartikelen en koopgidsen in je winkel te maken en te verbeteren, rond je eigen producten.",
          points: [
            "Categoriepagina's die je assortiment uitleggen",
            "Koopgidsen en vergelijkingen voor je blog",
            "Concepten die je bekijkt voordat er iets live gaat",
          ],
          visual: {
            kind: "pages",
            label: "Gevonden contenthiaten",
            rows: [
              {
                type: "Categorie",
                title: "Regenkleding voor fietsers",
                status: "Verbeteren",
              },
              {
                type: "Gids",
                title: "Zo kies je een regenjas",
                status: "Concept klaar",
              },
              {
                type: "Vergelijking",
                title: "Waterdicht of waterafstotend",
                status: "Nieuwe pagina",
              },
            ],
          },
        },
        {
          product: "technical-performance",
          title: "Een Shopify-winkel die AI kan lezen en vertrouwen",
          body: "Thema's en apps kunnen gestructureerde data onvolledig of dubbel maken. Beseam controleert of productdata, prijzen en voorraad overeenkomen met je pagina's, en of AI-crawlers ze kunnen bereiken.",
          points: [
            "Gestructureerde data uit je thema en apps",
            "Prijzen en voorraad per variant",
            "Toegang voor AI-crawlers en laadsnelheid",
          ],
          visual: {
            kind: "checks",
            label: "Technische controle",
            rows: [
              {
                label: "Gestructureerde productdata",
                ok: false,
                detail: "Dubbel",
              },
              {
                label: "Prijzen en voorraad per variant",
                ok: true,
                detail: "Synchroon",
              },
              {
                label: "Toegang voor AI-crawlers",
                ok: true,
                detail: "Toegestaan",
              },
              {
                label: "Laadsnelheid productpagina's",
                ok: true,
                detail: "Snel",
              },
            ],
          },
        },
      ],
    },
    checklist: {
      heading: "Wat AI nodig heeft van een Shopify-winkel",
      intro:
        "AI-assistenten bevelen producten aan die ze kunnen begrijpen, vergelijken en vertrouwen. Dit zijn de details die in een Shopify-winkel het meest tellen.",
      items: [
        {
          title: "Concrete productbeschrijvingen",
          body: "Gebruik, pasvorm, materialen en specificaties in de beschrijving, niet alleen een slogan en een foto.",
        },
        {
          title: "Complete productdata",
          body: "Producttype, leverancier, opties en kenmerken ingevuld voor elk product, niet leeg gelaten.",
        },
        {
          title: "Duidelijke varianten",
          body: "Elke maat en kleur als eigen variant met een duidelijke naam, prijs en voorraad.",
        },
        {
          title: "Categoriepagina's met context",
          body: "Collecties met een korte beschrijving van wat erin zit en voor wie, niet alleen een productraster.",
        },
        {
          title: "Gidsen en vergelijkingen",
          body: "Blogartikelen en gidsen die koopvragen beantwoorden, geven assistenten een reden om je winkel te noemen.",
        },
        {
          title: "Schone gestructureerde data",
          body: "Eén complete set gestructureerde productdata, zonder conflicten tussen je thema en apps.",
        },
        {
          title: "Open voor AI-crawlers",
          body: "Instellingen in robots.txt en botbescherming die AI-crawlers je producten en collecties laten bereiken.",
        },
        {
          title: "Snelle productpagina's",
          body: "Pagina's die snel en volledig laden, ook met meerdere apps geïnstalleerd.",
        },
      ],
    },
    benefitsHeading: "Gemaakt voor Shopify-winkels",
    showBenefits: true,
    benefits: [
      {
        title: "Koppeling met één klik",
        body: "Koppel je Shopify-winkel met één klik. Geen developers, geen themawijzigingen.",
        icon: Plug,
      },
      {
        title: "Je hele catalogus",
        body: "Beseam leest elk product en elke variant in je winkel, hoe groot je catalogus ook is.",
        icon: Package,
      },
      {
        title: "Wijzigingen die jij goedkeurt",
        body: "Keur voorgestelde wijzigingen met een paar klikken goed, of automatiseer de wijzigingen die je vertrouwt. Alle wijzigingen blijven terug te draaien.",
        icon: CheckCircle2,
      },
    ],
    mistakes: {
      heading:
        "Veelgemaakte fouten die Shopify-winkels uit AI-antwoorden houden",
      items: [
        notKnowingMistake("jouw producten"),
        {
          title: "Leveranciersbeschrijvingen ongewijzigd overgenomen",
          body: "Van leveranciers gekopieerde beschrijvingen zijn gelijk aan die van honderden andere winkels en beantwoorden zelden de vragen van klanten.",
        },
        {
          title: "Lege categoriepagina's",
          body: "Een collectie met alleen een productraster zegt assistenten weinig. Een korte, concrete beschrijving helpt ze die te begrijpen.",
        },
        {
          title: "Tegenstrijdige gestructureerde data",
          body: "Als je thema en een app allebei productdata toevoegen, krijgen assistenten mogelijk tegenstrijdige prijzen of voorraad.",
        },
        {
          title: "Te veel apps die pagina's vertragen",
          body: "Elke app voegt scripts toe. Trage of onvolledige pagina's zijn moeilijker te lezen voor crawlers.",
        },
        crawlerMistake,
      ],
    },
    stepsHeading: "Zo werkt Beseam met Shopify",
    steps: [
      {
        title: "Koppel Shopify",
        body: "Koppel je winkel met één klik. Beseam importeert je catalogus zonder je themacode aan te raken.",
      },
      {
        title: "Volg je AI-zichtbaarheid",
        body: "Zie hoe ChatGPT, Claude, Gemini en andere assistenten de vragen van je klanten beantwoorden.",
      },
      {
        title: "Optimaliseer en meet",
        body: "Keur de voorgestelde wijzigingen goed of automatiseer ze, en volg hoe je AI-verkeer en omzet groeien.",
      },
    ],
    faqs: [
      {
        question: "Werkt Beseam met Shopify?",
        answer:
          "Ja. Beseam koppelt met één klik aan Shopify en importeert je catalogus zonder je themacode aan te raken.",
      },
      {
        question: "Hoe zorg ik dat ChatGPT mijn Shopify-producten aanbeveelt?",
        answer:
          "Begin met weten bij welke vragen je winkel verschijnt. Maak daarna je productbeschrijvingen concreet, voeg categoriepagina's en gidsen toe voor de vragen die klanten uitzoeken, en houd je gestructureerde data schoon. Beseam dekt alle vier af en laat zien wat je eerst moet verbeteren.",
      },
      {
        question: "Heb ik een developer nodig om Beseam in te stellen?",
        answer:
          "Nee. De koppeling met Shopify kost één klik, en Beseam regelt de rest.",
      },
      {
        question: "Wijzigt Beseam mijn Shopify-winkel zonder mijn goedkeuring?",
        answer:
          "Nee. Elke wijziging die klanten zien, wacht op je goedkeuring, tenzij je dat soort wijziging automatiseert, en alle wijzigingen blijven terug te draaien.",
      },
      {
        question: "Welke AI-assistenten volgt Beseam?",
        answer:
          "Beseam volgt ChatGPT, Claude, Gemini, Google AI Mode, Perplexity en Copilot, op basis van de vragen die je klanten over je producten stellen.",
      },
      {
        question: "Kunnen Shopify-apps mijn AI-zichtbaarheid beïnvloeden?",
        answer:
          "Ja. Apps kunnen dubbele gestructureerde data toevoegen, pagina's vertragen of veranderen wat crawlers zien. Beseam controleert je winkel zoals die echt wordt geladen, inclusief wat je apps toevoegen.",
      },
      {
        question:
          "Hoe lang duurt het voordat mijn producten in AI-antwoorden verschijnen?",
        answer: timelineAnswer,
      },
      catalogueFaq,
    ],
    relatedProducts: ALL_PRODUCTS,
  },
];
