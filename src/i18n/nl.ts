import type { Dictionary } from "./en";

/**
 * Dutch copy. Informal "je/jouw", the register Dutch ecommerce software uses
 * with merchants. Brand and product names (ChatGPT, Gemini, AI Mode, Google,
 * Buy Box, Amazon, bol, Shopify) stay as they are.
 *
 * Labels in the hero graph sit on fixed coordinates, so they are kept as short
 * as the English ones rather than translated word for word.
 */
export const nl: Dictionary = {
  nav: {
    skipToContent: "Naar de inhoud",
    homeAriaLabel: "Beseam home",
    primaryAriaLabel: "Hoofdnavigatie",
    mobileAriaLabel: "Mobiele navigatie",
    openNavigation: "Navigatie openen",
    closeNavigation: "Navigatie sluiten",
    // Primary menu. Groups open as dropdowns; `pricing` is a plain link.
    menu: {
      product: {
        label: "Product",
        items: {
          tracking: "AI-zichtbaarheid volgen",
          descriptions: "Productbeschrijvingen",
          content: "Contentcreatie",
          technical: "Technische prestaties",
        },
      },
      solutions: {
        label: "Oplossingen",
        items: {
          footwear: "Schoenen",
          apparel: "Mode & kleding",
          beauty: "Beauty & cosmetica",
          electronics: "Consumentenelektronica",
          shopify: "Beseam voor Shopify",
        },
      },
      resources: {
        label: "Kennisbank",
        items: {
          blog: "Blog",
          report: "AI Shopping Rapport",
          compare: "Vergelijkingen",
        },
      },
      company: {
        label: "Bedrijf",
        items: {
          about: "Over ons",
          contact: "Contact",
        },
      },
      pricing: "Prijzen",
    },
    login: "Inloggen",
    register: "Registreren",
    cta: "Krijg vroege toegang",
  },
  switcher: {
    triggerAriaLabel: "Taal wijzigen",
    listboxAriaLabel: "Taal",
    short: { en: "EN", de: "DE", nl: "NL" },
    names: { en: "English", de: "Deutsch", nl: "Nederlands" },
  },
  cookies: {
    ariaLabel: "Cookiekeuzes",
    text: "Essentiële cookies houden de site werkend. Optionele analytics laden pas nadat je ze accepteert.",
    policy: "Privacybeleid",
    reject: "Analytics weigeren",
    accept: "Analytics accepteren",
  },
  // Shown in Dutch to someone who chose Dutch and landed on a page that has
  // no Dutch version yet.
  notice: {
    text: "Deze pagina is nog niet beschikbaar in het Nederlands.",
    link: "Naar de Nederlandse homepage",
    dismiss: "Melding sluiten",
  },
  // The early access dialog behind every primary call to action
  // (early-access-cta.tsx).
  earlyAccess: {
    title: "Krijg vroege toegang tot Beseam",
    body: "Hoor bij de eerste webshops die van AI een omzetkanaal maken. We richten je webshop samen met je in en laten je de eerste acties zien die omzet opleveren.",
    name: "Naam",
    email: "Zakelijk e-mailadres",
    company: "Bedrijf",
    submit: "Vraag vroege toegang aan",
    sending: "Versturen…",
    successEyebrow: "Aanvraag ontvangen",
    successTitle: "Je staat op de lijst",
    successBody:
      "Bedankt! We nemen snel contact op om je webshop in te richten.",
    error: "Er ging iets mis. Probeer het zo nog eens.",
    close: "Sluiten",
    honeypot: "Laat dit veld leeg",
  },
  footer: {
    homeAriaLabel: "Beseam home",
    copyright: (year: number) => `© ${year} Beseam. Alle rechten voorbehouden.`,
    privacy: "Privacy",
    terms: "Voorwaarden",
    bot: "BeseamBot",
    askAi: "Vraag AI over Beseam",
    linkedin: "Beseam op LinkedIn",
    madeWith: "Ontwikkeld in Zwitserland",
    swissFlagAriaLabel: "Zwitserse vlag",
  },
  meta: {
    home: {
      title: "Beseam | Maak AI een omzetkanaal voor je webshop",
      description:
        "De makkelijkste manier om je producten door AI te laten aanbevelen aan miljoenen shoppers. Optimaliseer beschrijvingen, content en techniek in minuten.",
      imageAlt: "Beseam: maak AI een omzetkanaal voor je webshop",
      schemaSoftwareDescription:
        "Beseam zorgt dat AI-assistenten zoals ChatGPT, Claude en Gemini de producten van webshops aanbevelen. Het volgt AI-zichtbaarheid, optimaliseert productbeschrijvingen, content en techniek, en koppelt de resultaten aan AI-verkeer en omzet.",
      schemaFeatures: [
        "Volg waar je producten verschijnen in ChatGPT, Claude, Gemini en andere AI-assistenten",
        "Optimaliseer productbeschrijvingen en productdata voor AI-zoekopdrachten",
        "Maak categoriepagina's, vergelijkingen en gidsen die AI-assistenten citeren",
        "Los technische problemen op en koppel AI-zichtbaarheid aan verkeer en omzet",
      ],
      schemaFaqName: "Vragen over Beseam",
    },
    scan: {
      title: "Gratis webshopscan | Beseam",
      description:
        "Check gratis of ChatGPT en andere AI-assistenten je producten kunnen vinden en aanbevelen, en wat je eerst verbetert. Zonder login of webshoptoegang.",
    },
  },

  hero: {
    headlineBefore: "Maak AI een ",
    headlineAccent: "omzetkanaal",
    headlineAfter: " voor je webshop",
    sub: "Beseam is de makkelijkste manier om je producten door AI te laten aanbevelen aan miljoenen shoppers. Optimaliseer productbeschrijvingen, content en technische prestaties in een paar minuten.",
    ctaStart: "Krijg vroege toegang",
    ctaDemo: "Demo aanvragen",
    scrollCue: "Scroll",
  },

  heroGraph: {
    satelliteValues: { "recs.3": "aan" },
    hubs: {
      ai: {
        label: "AI-antwoorden",
        satellites: {
          0: "ChatGPT",
          1: "Gemini",
          2: "AI Mode",
          3: "bronnen",
        },
        metrics: {
          0: "Zichtbaarheid in ChatGPT",
          1: "Zichtbaarheid in Gemini",
          2: "Google AI Mode",
        },
        capabilities: {
          0: {
            label: "Word je genoemd?",
            description:
              "Bekijk hoe producten en het merk verschijnen in AI-shoppingomgevingen.",
          },
          1: {
            label: "Wat is er veranderd?",
            description:
              "Stel dezelfde shoppervragen opnieuw en laat zien wat er veranderd is.",
          },
          2: {
            label: "Vragen waarop je verschijnt",
            description:
              "Meet of producten aanwezig zijn bij de shoppervragen die ertoe doen.",
          },
          3: {
            label: "Wie werd er gekozen?",
            description:
              "Zie welke producten verschijnen in plaats van of naast je eigen catalogus.",
          },
          4: {
            label: "Welke bronnen?",
            description:
              "Volg de bronnen die bepalen hoe het product wordt beschreven.",
          },
        },
      },
      search: {
        label: "Zoekresultaten",
        satellites: {
          0: "JSON-LD",
          1: "indexeerbaar",
          2: "zoektermen",
          3: "snippets",
        },
        metrics: {
          0: "JSON-LD-dekking",
          1: "Indexeerbaarheid",
          2: "Zoekmatch",
        },
        capabilities: {
          0: {
            label: "Zoektermen die je vinden",
            description:
              "Koppel zoekresultaten aan de producten die shoppers proberen te vinden.",
          },
          1: {
            label: "Machineleesbare feiten",
            description:
              "Gestructureerde productinformatie voor zoek- en shoppingsystemen.",
          },
          2: {
            label: "Is de pagina vindbaar?",
            description:
              "Of belangrijke productpagina's gevonden en geïndexeerd kunnen worden.",
          },
          3: {
            label: "Klopt de formulering?",
            description:
              "Hoe goed productfeiten aansluiten op echte zoekopdrachten van shoppers.",
          },
          4: {
            label: "Wat zoekmachines tonen",
            description:
              "Zichtbare en gestructureerde productdata die rijkere zoekresultaten mogelijk maakt.",
          },
        },
      },
      catalog: {
        label: "Overwogen producten",
        satellites: {
          0: "velden",
          1: "actualiteit",
          2: "varianten",
          3: "voorraad",
        },
        metrics: {
          0: "Volledigheid",
          1: "Actualiteit",
          2: "Variantdekking",
        },
        capabilities: {
          0: {
            label: "Beschikbare producten",
            description:
              "De producten en varianten waaruit shoppers echt kunnen kiezen.",
          },
          1: {
            label: "Kiesbare varianten",
            description:
              "Productfeiten per variant, beschikbaar op het moment dat shoppers kiezen.",
          },
          2: {
            label: "Feiten om toe te voegen",
            description:
              "Productfeiten die het kiezen makkelijker kunnen maken.",
          },
          3: {
            label: "Goedgekeurde wijzigingen",
            description:
              "Door de webshop goedgekeurde productwijzigingen, klaar voor de webshop.",
          },
          4: {
            label: "Variantkeuzes",
            description:
              "Dekking van productinformatie per variant in de hele catalogus.",
          },
          5: {
            label: "Beschikbaarheid klopt",
            description:
              "Overeenkomst tussen beschikbaarheid in de catalogus en wat de webshop toont.",
          },
        },
      },
      brand: {
        label: "Merkvertrouwen",
        satellites: {
          0: "claims",
          1: "identiteit",
          2: "vertrouwen",
          3: "bewijs",
        },
        metrics: {
          0: "Goedgekeurde claims",
          1: "Identiteitsdekking",
          2: "Vertrouwensbewijs",
        },
        capabilities: {
          0: {
            label: "Wie je bent",
            description:
              "Merkinformatie die beschikbaar is wanneer shoppers je met alternatieven vergelijken.",
          },
          1: {
            label: "Actuele merkinfo",
            description: "Houd de merkinformatie die shoppers zien up-to-date.",
          },
          2: {
            label: "Betrouwbare claims",
            description: "Claims met genoeg bewijs om veilig te hergebruiken.",
          },
          3: {
            label: "Beleid en bewijs",
            description:
              "Beleid, bewijs en vertrouwensinformatie die bij het merk horen.",
          },
          4: {
            label: "Overal hetzelfde verhaal",
            description:
              "Consistentie tussen de goedgekeurde merkcontext en wat shoppers tegenkomen.",
          },
        },
      },
      truth: {
        label: "Productfeiten",
        satellites: {
          0: "prijs",
          1: "verzending",
          2: "reviews",
          3: "feiten",
        },
        metrics: {
          0: "Gedekte feiten",
          1: "Verzendfeiten",
          2: "Gestructureerde feiten",
        },
        capabilities: {
          0: {
            label: "Prijs & beschikbaarheid",
            description:
              "Overeenkomst in prijs, beschikbaarheid en aanbodstatus.",
          },
          1: {
            label: "Prijs klopt",
            description:
              "Consistente prijzen in catalogus, schema en de zichtbare productpagina.",
          },
          2: {
            label: "Antwoord over levering",
            description:
              "Verzendinformatie die in de data en op de pagina staat.",
          },
          3: {
            label: "Reviews als bewijs",
            description: "Of reviews zichtbaar zijn waar shoppers beslissen.",
          },
          4: {
            label: "Feiten kloppen met pagina",
            description:
              "Of gestructureerde productdata overeenkomt met wat shoppers op de pagina zien.",
          },
          5: {
            label: "Opnieuw checken",
            description:
              "Controleer dezelfde productinformatie na een goedgekeurde wijziging.",
          },
        },
      },
      creative: {
        label: "Wat ze zien",
        satellites: {
          0: "beelden",
          1: "video",
          2: "merkfit",
          3: "assets",
        },
        metrics: {
          0: "Dekking productbeelden",
          1: "Merkconsistentie",
          2: "Videodekking",
        },
        capabilities: {
          0: {
            label: "Wat shoppers eerst zien",
            description:
              "De beelden en content die shoppers zien voordat ze in detail vergelijken.",
          },
          1: {
            label: "Productbeelden",
            description:
              "Beelden die shoppers helpen het product en het gebruik te begrijpen.",
          },
          2: {
            label: "Productvideo",
            description:
              "Video die vragen beantwoordt die statische productfeiten niet kunnen beantwoorden.",
          },
          3: {
            label: "Is het bewijs duidelijk?",
            description:
              "Controleer of de beelden of video de productclaim ondersteunen.",
          },
          4: {
            label: "Beschikbaar productbewijs",
            description:
              "Herbruikbare assets die bij het product en de merkcontext horen.",
          },
          5: {
            label: "Toepassingscontent",
            description:
              "Content die shoppers helpt te begrijpen of het product bij hun behoefte past.",
          },
        },
      },
      campaigns: {
        label: "Advertenties",
        satellites: {
          0: "Google Ads",
          1: "Meta Ads",
          2: "landing",
          3: "tracking",
        },
        metrics: {
          0: "Google Ads-gereedheid",
          1: "Meta Ads-gereedheid",
          2: "Landingsgereedheid",
        },
        capabilities: {
          0: {
            label: "Landt de advertentie goed?",
            description:
              "Controleer of het product, de tracking en de landingservaring de belofte uit de advertentie waarmaken.",
          },
          1: {
            label: "Aanbod en boodschap",
            description:
              "De belofte die een shopper ziet voordat hij bij het product of de webshop aankomt.",
          },
          2: {
            label: "Goedgekeurde campagnewijziging",
            description:
              "Een door de webshop goedgekeurde campagnewijziging, gekoppeld aan de reden erachter.",
          },
          3: {
            label: "Geeft de landingspagina antwoord?",
            description:
              "Controleer of de landingspagina de vraag beantwoordt die de advertentie opriep.",
          },
          4: {
            label: "Creatieve varianten",
            description:
              "Alternatieve boodschappen en creatives voor hetzelfde product en dezelfde shopperbehoefte.",
          },
          5: {
            label: "Wat de klik oplevert",
            description:
              "Zie welke productboodschap de aandacht van shoppers trekt.",
          },
          6: {
            label: "Wie klikte en kocht?",
            description: "Koppel campagnerespons aan het verdere aankooppad.",
          },
          7: {
            label: "Wat het verkeer kostte",
            description:
              "Houd de kosten van betaald verkeer gescheiden van de aankopen die volgen.",
          },
        },
      },
      onsite: {
        label: "Zoeken in de webshop",
        satellites: {
          0: "vindbaarheid",
          1: "top 3",
          2: "geen resultaat",
          3: "filters",
        },
        metrics: {
          0: "Vindbaarheidsdekking",
          1: "Top-3-plaatsing",
          2: "Nulresultaat-ratio",
        },
        capabilities: {
          0: {
            label: "Waar shoppers op zochten",
            description:
              "De woorden die shoppers gebruiken als ze het juiste product proberen te vinden.",
          },
          1: {
            label: "Welke producten verschenen",
            description:
              "Waar relevante producten verschijnen in de zoekresultaten van de webshop.",
          },
          2: {
            label: "Waar zoeken faalde",
            description:
              "Zoekopdrachten die geen bruikbaar productresultaat opleveren.",
          },
          3: {
            label: "Wat ze daarna deden",
            description:
              "Gedrag van shoppers nadat een zoekresultaat is getoond.",
          },
          4: {
            label: "Wat de ranking bepaalt",
            description:
              "Regels en productdata die bepalen welke opties een shopper ziet.",
          },
        },
      },
      recs: {
        label: "Wat wordt aanbevolen",
        satellites: {
          0: "dekking",
          1: "affiniteit",
          2: "regels",
          3: "holdout",
        },
        metrics: {
          0: "Catalogusdekking",
          1: "Affiniteitszekerheid",
          2: "Holdout-dekking",
        },
        capabilities: {
          0: {
            label: "Wat werd aanbevolen",
            description: "De producten die de webshop aan de shopper voorlegt.",
          },
          1: {
            label: "Waarom deze producten?",
            description:
              "De merchandisingregels en productdata die aanbevelingen bepalen.",
          },
          2: {
            label: "Past bij de shopper",
            description:
              "Hoe goed het product aansluit op wat de shopper lijkt te willen.",
          },
          3: {
            label: "Geschikte producten",
            description:
              "Hoeveel van de relevante catalogus kan meedoen in aanbevelingen.",
          },
          4: {
            label: "Hielpen aanbevelingen?",
            description:
              "Vergelijk de blootstelling aan aanbevelingen met wat shoppers daarna deden.",
          },
        },
      },
      pdp: {
        label: "Productpagina",
        satellites: {
          0: "bewijs",
          1: "beleid",
          2: "vertrouwen",
          3: "content",
        },
        metrics: {
          0: "Beantwoorde vragen",
          1: "Duidelijk beleid",
          2: "Vertrouwensdekking",
        },
        capabilities: {
          0: {
            label: "Beantwoorde vragen",
            description:
              "Informatie op de productpagina voor de vragen die shoppers stellen voordat ze kiezen.",
          },
          1: {
            label: "Wat ontbreekt er?",
            description:
              "Vind gaten in de productpagina zonder te doen alsof elk gat de keuze veroorzaakte.",
          },
          2: {
            label: "Check na de wijziging",
            description:
              "Controleer dezelfde productpagina-informatie na een goedgekeurde wijziging.",
          },
          3: {
            label: "Feiten kloppen met pagina",
            description:
              "Overeenkomst tussen zichtbare pagina-inhoud en gestructureerde productfeiten.",
          },
          4: {
            label: "Maat & pasvorm",
            description:
              "Pasvormadvies en maataanbevelingen die shoppers helpen de juiste variant te kiezen.",
          },
          5: {
            label: "Reviews & vertrouwen",
            description:
              "Reviews en vertrouwensinformatie die zichtbaar zijn wanneer shoppers beslissen.",
          },
          6: {
            label: "Retour & levering",
            description:
              "Beleid en leveringsinformatie die zichtbaar zijn voordat de shopper beslist.",
          },
        },
      },
      behavior: {
        label: "Wat ze daarna doen",
        satellites: {
          0: "interactie",
          1: "frictie",
          2: "zoekacties",
          3: "replay",
        },
        metrics: {
          0: "Interactieratio",
          1: "Sessies met frictie",
          2: "Waargenomen zoekacties",
        },
        capabilities: {
          0: {
            label: "Wat shoppers deden",
            description:
              "Navigatie-, interactie-, commerce- en frictie-events rond het aankooppad.",
          },
          1: {
            label: "Waar ze twijfelden",
            description:
              "Shoppergedrag dat kan wijzen op onzekerheid of frictie.",
          },
          2: {
            label: "Waar ze op zochten",
            description: "Zoekgedrag gekoppeld aan wat de shopper daarna deed.",
          },
          3: {
            label: "Wat ze openden",
            description:
              "Welke producten, pagina's en informatie de shopper echt bekeek.",
          },
          4: {
            label: "Waar ze afhaakten",
            description:
              "Het punt in de reis waarop een shopper niet verder ging.",
          },
          5: {
            label: "Sessie-replay",
            description:
              "Replay om frictie te begrijpen, zonder te doen alsof die de oorzaak bewijst.",
          },
          6: {
            label: "Interactiepatronen",
            description:
              "Zie welke delen van een pagina shoppers gebruiken of negeren over veel sessies.",
          },
        },
      },
      checkout: {
        label: "Checkout",
        satellites: {
          0: "afgerond",
          1: "betaling",
          2: "uitval",
          3: "fouten",
        },
        metrics: {
          0: "Afronding",
          1: "Geslaagde betalingen",
          2: "Uitval",
        },
        capabilities: {
          0: {
            label: "Waar de checkout stopte",
            description:
              "Waargenomen uitval van shoppers tijdens het aankooppad.",
          },
          1: {
            label: "Geslaagde betalingen",
            description:
              "Waargenomen afgeronde betalingen in gevolgde checkoutsessies.",
          },
          2: {
            label: "Frictie bij levering",
            description:
              "Leverkosten en levertijd die de uiteindelijke keuze van een shopper kunnen veranderen.",
          },
          3: {
            label: "Technische fouten",
            description:
              "Runtimefouten die het afronden van een aankoop kunnen verstoren.",
          },
          4: {
            label: "Bleef de fix werken?",
            description:
              "Controleer dezelfde checkoutdata na een goedgekeurde wijziging.",
          },
        },
      },
      revenue: {
        label: "Aankoop",
        satellites: {
          0: "orders",
          1: "CVR",
          2: "AOV",
          3: "impact",
        },
        metrics: {
          0: "Orders",
          1: "Conversieratio",
          2: "Waargenomen impact",
        },
        capabilities: {
          0: {
            label: "Werd er gekocht?",
            description: "Geboekte orders en omzet als bewijs van aankoop.",
          },
          1: {
            label: "Wat veranderde erna?",
            description:
              "Voor-en-na-meting gekoppeld aan een afgeronde wijziging.",
          },
          2: {
            label: "Waargenomen vs toegeschreven",
            description:
              "Houd direct waargenomen en toegeschreven omzet gescheiden.",
          },
          3: {
            label: "Conversiepad",
            description: "Waar shoppers doorgaan of stoppen in de aankoopreis.",
          },
          4: {
            label: "Welke shoppers veranderden?",
            description: "Zie hoe resultaten verschillen per groep shoppers.",
          },
          5: {
            label: "Klopt de omzet?",
            description:
              "Controleer of de gevolgde omzet overeenkomt met de omzetdata van de webshop.",
          },
        },
      },
      marketplaces: {
        label: "Marktplaatsen",
        satellites: {
          0: "Amazon",
          1: "eBay",
          2: "Otto",
          3: "Galaxus",
        },
        metrics: {
          0: "Zichtbaarheid op Amazon",
          1: "Zichtbaarheid op eBay",
          2: "Buy Box-dekking",
        },
        capabilities: {
          0: {
            label: "Wie wint de Buy Box?",
            description:
              "Aandeel van de gevolgde listings dat nu de Buy Box wint van concurrerende verkopers.",
          },
          1: {
            label: "Kunnen shoppers vergelijken?",
            description:
              "Verplichte marktplaatsvelden en beelden aanwezig bij de gevolgde SKU's.",
          },
          2: {
            label: "Klopt de prijs?",
            description:
              "Gevolgde listings geprijsd in lijn met de eigen webshop.",
          },
          3: {
            label: "Waar staat het?",
            description:
              "Mediane positie op de categoriepagina van de marktplaats.",
          },
          4: {
            label: "Is er genoeg bewijs?",
            description:
              "Gevolgde producten met genoeg reviews om shoppers te helpen kiezen.",
          },
        },
      },
    },
  },

  loop: {
    title: "De Beseam-werkcyclus",
    desc: "Vijf stappen in een cirkel, elke pijl wijst naar de volgende: Vinden, Voorbereiden, Goedkeuren, Toepassen, Meten. Meten leidt terug naar Vinden.",
    steps: {
      find: { label: "Vinden", detail: "wat beter kan" },
      prepare: { label: "Voorbereiden", detail: "de wijziging" },
      approve: { label: "Goedkeuren", detail: "jij beslist" },
      apply: { label: "Toepassen", detail: "Beseam voert uit" },
      measure: { label: "Meten", detail: "dezelfde reis" },
    },
    centre: { line1: "Doorlopende", line2: "cyclus" },
    caption: "Meten is niet het einde. Het begint de volgende ronde Vinden.",
  },

  systemMap: {
    signalsAriaLabel: "Informatie over de hele shopperreis",
    columns: {
      signals: { label: "Signalen", note: "Vaste set" },
      journey: { label: "Eén shopperreis", note: "Dekking" },
      useCases: {
        label: "Wat Beseam kan doen",
        noLinkNote: "Verbonden resultaten",
      },
    },
    feedsBefore: "Voedt ",
    feedsBetween: " van ",
    inputBefore: "Input: wat ",
    inputAfter: " leest",
    platformLabel: "Platform",
    platformQuestion: "Wat gaat deze shopper kiezen?",
    explore: "Ontdek het platform",
    signalsUsed: "Gebruikte signalen:",
    moreLabel: "+ meer",
    moreDetail:
      "Immersieve productervaringen, marktplaatsen, merkworkflows en andere specialistische functies, waar ingeschakeld.",
    signals: {
      discovery: {
        label: "AI-vindbaarheid",
        layer: "Buiten de site",
        scope: "Waar producten op de shortlist komen, of niet.",
        caveat:
          "Momentopnamen, gedateerd en herhaalbaar. Nooit de verborgen rankinglogica van een model.",
        does: "Zichtbaarheid op de shortlist",
      },
      store: {
        label: "Webshop & product",
        layer: "Webshop",
        scope: "Wat de pagina beantwoordt, en wat ze daarna biedt.",
        caveat:
          "Alleen openbare webshopdata. Geen login, geen privé-klantdata.",
        does: "Catalogus- en paginagereedheid",
      },
      behavior: {
        label: "Shoppergedrag",
        layer: "Reis",
        scope: "Wat shoppers verfijnen, openen, negeren en verlaten.",
        caveat:
          "Wat shoppers deden. Waarom blijft een hypothese tot het getest is.",
        does: "Proactieve personalisatie",
      },
      revenue: {
        label: "Omzet",
        layer: "Resultaat",
        scope: "Wat er veranderde nadat er op de beslissing is gehandeld.",
        caveat:
          "Gemeten nadat de wijziging live staat, met dezelfde vragen die het gat blootlegden.",
        does: "Impact en attributie",
      },
    },
    short: {
      discovery: "Vindbaarheid",
      store: "Webshop",
      behavior: "Gedrag",
      revenue: "Omzet",
    },
    cards: {
      getDiscovered: {
        name: "Gevonden worden",
        detail:
          "Vind gaten in je zichtbaarheid in AI en zoekmachines, en versterk het bewijs achter de shortlist.",
      },
      productsChoose: {
        name: "Maak producten makkelijker te kiezen",
        detail:
          "Verbeter catalogusdata, productpagina's, merchandising en het bewijs dat shoppers nodig hebben om te beslissen.",
      },
      fitSizing: {
        name: "Help shoppers aan de juiste pasvorm",
        detail:
          "Gebruik maatadvies, metingen, pasvormaanbevelingen en productspecifieke uitzonderingen.",
      },
      understandBehavior: {
        name: "Begrijp shoppergedrag",
        detail:
          "Verbind analytics, klantreizen, replay, heatmaps, zoekgedrag en conversiesignalen.",
      },
      personalizeTest: {
        name: "Personaliseer & test",
        detail:
          "Stem zoeken, aanbevelingen, merchandising en experimenten af op de context van de shopper.",
      },
      journeyHealth: {
        name: "Houd de aankoopreis gezond",
        detail:
          "Vang prestatieproblemen, frontendfouten, incidenten en storingen op die een aankoop onderbreken.",
      },
      creativeStudio: {
        name: "Maak content & productmedia",
        detail:
          "Bereid productcontent, creatives, beelden, video en rijkere productervaringen voor.",
      },
      prioritizeMeasure: {
        name: "Prioriteer & meet wat werkte",
        detail:
          "Maak van bewijs een gerangschikte wachtrij van wijzigingen en houd het voor-en-na-resultaat erbij.",
      },
      campaigns: {
        name: "Lanceer & verbeter campagnes",
        detail:
          "Bereid Google- en Meta-campagnes voor, publiceer en meet ze, waar campagnefuncties zijn ingeschakeld.",
      },
    },
  },
  appScreens: {
    illustrative: "Illustratief voorbeeld · geen klantresultaten.",
    actions: {
      columns: {
        change: "Wijziging",
        salesShare: "Omzetaandeel",
        effort: "Moeite",
        status: "Status",
      },
      efforts: { quick: "Snel", hard: "Lastig" },
      rows: {
        commuting: {
          title:
            "Voeg het woon-werkgebruik toe aan de productpagina van Urban Shell.",
          why: "De shopper vroeg om een jas voor woon-werkverkeer, en de productpagina zegt nergens of deze daarvoor geschikt is.",
          band: "Top 5% van je geboekte omzet",
          step: "Wacht op goedkeuring",
        },
        layers: {
          title: "Leg uit hoe Urban Shell over dagelijkse lagen past.",
          why: "De shopper opende de maattabel, en de pasvorm over lagen blijft onbeantwoord op het beslismoment.",
          band: "Bovenste kwart van de geboekte omzet",
          step: "Bezig",
        },
        recheck: {
          title:
            "Stel de forensvragen opnieuw na de wijziging van de productpagina.",
          why: "Stel dezelfde shoppingvraag opnieuw voordat je zegt dat de wijziging de vindbaarheid hielp.",
          band: "Niet gemeten",
          step: "Wordt gemeten",
        },
      },
      note: "Elke wijziging houdt bij elkaar wat Beseam vond, wie eigenaar is, de status en wat je daarna controleert.",
    },
    impact: {
      title: "Resultaten",
      meta: "Voorbeeldcijfers",
      verified: "Wijziging gecontroleerd",
      windowLabel: "Meetperiode",
      windowValue: "28 dagen",
      rows: {
        naming: {
          metric: "Forensantwoorden die Urban Shell noemen",
          before: "9%",
          after: "23%",
          delta: "+14 ptn",
        },
        citing: {
          metric: "Antwoorden die je eigen productpagina citeren",
          before: "1 op 12",
          after: "1 op 4",
          delta: "+3 antwoorden",
        },
        position: {
          metric: "Je positie wanneer je genoemd wordt",
          before: "5e",
          after: "2e",
          delta: "+3 plaatsen",
        },
      },
    },
  },

  rail: {
    ariaLabel: "Onderzoeksresultaat",
    eyebrow: "Nieuw onderzoek",
    finding: (share: number) =>
      `${share}% van de merkvermeldingen kwam voor bij maar één AI-assistent.`,
    runDate: (date: string) => `Onderzoek uitgevoerd ${date}`,
    link: "Bekijk het rapport & de methode",
  },

  sections: {
    fixes: {
      heading: "Optimaliseer wat AI tegenhoudt om je producten aan te bevelen",
      items: {
        descriptions: {
          title: "Productbeschrijvingen",
          body: "Optimaliseer beschrijvingen en productdata, zodat AI-assistenten begrijpen wat elk product is, voor wie het is en wanneer ze het moeten aanbevelen.",
        },
        content: {
          title: "Contentcreatie",
          body: "Maak en optimaliseer de collectiepagina's, vergelijkingspagina's, blogs en gidsen waar AI-assistenten op terugvallen als shoppers vragen wat ze moeten kopen.",
        },
        technical: {
          title: "Technische prestaties",
          body: "Los problemen op met gestructureerde data, crawlertoegang en trage pagina's, zodat AI-assistenten elke pagina van je webshop kunnen lezen en vertrouwen.",
        },
      },
    },
    quote: {
      // DRAFT customer quote, written for a customer to approve or adapt. It
      // only appears in local previews until \`approved\` is true and
      // \`name\` and \`role\` hold the real customer's details.
      text: "Eerlijk gezegd verwachtte ik weer een tool waar ik constant achteraan moest. We koppelden onze Shopify-webshop met één klik, en nu keur ik bij mijn ochtendkoffie een paar suggesties goed. Beseam doet de rest!",
      name: "",
      role: "",
      approved: false,
    },
    platforms: {
      eyebrow: "Word aanbevolen in",
    },
    howItWorks: {
      heading: "Zo werkt het",
      stepLabel: (n: number) => `Stap ${n}`,
      steps: {
        connect: {
          title: "Koppel je Shopify-webshop",
          body: "Koppel je webshop met één klik. Beseam importeert je catalogus zonder je thema aan te raken.",
          visual: {
            label: "Webshopkoppeling",
            action: "Koppel Shopify",
            synced: {
              products: "Producten gesynchroniseerd",
              orders: "Bestelgegevens gesynchroniseerd",
              pages: "Contentpagina's gesynchroniseerd",
            },
            done: "Gekoppeld",
          },
        },
        actions: {
          title: "Krijg acties, geprioriteerd op omzetimpact",
          body: "Beseam vertelt je wat je als eerste moet verbeteren, gerangschikt op hoeveel omzet het kan opleveren.",
          visual: {
            label: "Acties voor vandaag",
            items: {
              description: "Beschrijvingen van 12 bestsellers herschrijven",
              data: "Ontbrekende maten en materialen toevoegen",
              speed: "4 trage productpagina's versnellen",
            },
            impact: { high: "Grote impact", medium: "Gemiddelde impact" },
          },
        },
        approve: {
          title: "Keur acties goed, of automatiseer ze",
          body: "Bekijk elke wijziging met één klik, of laat Beseam de acties die je vertrouwt automatisch uitvoeren.",
          visual: {
            label: "Klaar voor jou",
            items: {
              description: "Beschrijvingen van 12 bestsellers herschrijven",
              data: "Ontbrekende maten en materialen toevoegen",
            },
            approve: "Goedkeuren",
            approved: "Goedgekeurd",
            automate: "Vergelijkbare acties automatiseren",
          },
        },
        measure: {
          title: "Volg de impact terwijl je bezig bent",
          body: "Volg hoe je AI-zichtbaarheid, verkeer en omzet in de loop van de tijd groeien.",
          visual: { label: "Omzet via AI", lift: "+23% in 30 dagen" },
        },
      },
    },
    categories: {
      heading: "AI-zoekoptimalisatie voor elk producttype",
      learnMore: "Lees meer",
      items: {
        footwear: {
          title: "Schoenen",
          body: "Maak maten, pasvorm en materialen duidelijk, zodat AI-assistenten je schoenen kunnen koppelen aan wat shoppers vragen.",
        },
        apparel: {
          title: "Kleding & Mode",
          body: "Maak van kleuren, snitten en stylingdetails productdata die AI aanbeveelt voor de juiste gelegenheid.",
        },
        beauty: {
          title: "Beauty & Cosmetica",
          body: "Licht ingrediënten, huidtypes en voordelen uit, zodat je producten verschijnen als shoppers vragen wat bij hen past.",
        },
        electronics: {
          title: "Consumentenelektronica",
          body: "Houd specificaties, compatibiliteit en prijzen kloppend, zodat AI je producten correct vergelijkt met de concurrentie.",
        },
      },
    },
    features: {
      webshops: {
        title: "Speciaal gebouwd voor webshops",
        body: "Met honderden of duizenden producten is het onhaalbaar om ze allemaal met de hand te optimaliseren voor AI-zoekmachines. De meeste tools voor AI-zichtbaarheid zijn gemaakt voor blogs en merkpagina's, niet voor productcatalogi. Beseam leest je hele webshop, product voor product, en doet het werk op de schaal van je catalogus.",
        visual: {
          label: "Je catalogus",
          stat: "1.240 producten gesynchroniseerd",
          status: "Gekoppeld",
        },
      },
      presence: {
        title: "Volg AI-zichtbaarheid en omzetimpact tot in detail",
        body: "Beseam houdt de antwoorden van ChatGPT, Claude, Gemini en andere AI-assistenten bij en ziet wanneer ze je merk en producten noemen. Die vermeldingen koppelt Beseam aan het AI-verkeer en de omzet die ze opleveren, uitgesplitst per onderwerp, prompt, product en landingspagina.",
        visual: {
          label: "AI-zichtbaarheid & omzet",
          named: "Aanbevolen",
          missed: "Ontbreekt",
          trend: "+€3,2k AI-omzet deze maand",
        },
      },
      revenue: {
        title: "Maak van data acties, geprioriteerd op omzetimpact",
        body: "Beseam combineert wat AI-assistenten zeggen met je eigen verkoopdata en rangschikt elke verbetering op de omzet die ze naar verwachting oplevert. Zo weet je altijd wat je eerst moet doen, en raakt niets verloren in een lange to-dolijst.",
        visual: {
          label: "Geprioriteerde acties",
          items: {
            description: "12 bestsellerteksten herschrijven",
            data: "Maten & materialen aanvullen",
            speed: "4 productpagina's versnellen",
          },
          sorted: "Gesorteerd op omzet",
        },
      },
      impact: {
        title: "Meer AI-verkeer in een paar minuten per week",
        body: "Een webshop runnen is al lastig genoeg. Daarom maken we AI-zoekoptimalisatie zo eenvoudig mogelijk: bekijk en keur de voorgestelde wijzigingen goed met een paar klikken, of laat Beseam de meeste ervan automatisch doorvoeren.",
        visual: {
          label: "Deze week",
          rows: {
            suggested: "Voorgestelde acties",
            approved: "Goedgekeurd door jou",
            automated: "Geautomatiseerd",
          },
          total: "4 min deze week",
        },
      },
    },
    proof: {
      heading: "Zie wat de keuze in de weg staat.",
      body: "Beseam kijkt naar wat de shopper deed, controleert product-, zoek- en voorraaddata, sluit zwakkere verklaringen uit en maakt van het sterkste inzicht een concrete wijziging.",
      traceLabel: "Voorbeeldspoor",
      traceScope: "Vindbaarheid in de webshop · schematisch",
      queries: {
        searched: { label: "Zocht op", value: "“waterdichte jas”" },
        thenAdded: {
          label: "Voegde toe",
          value: "... “voor woon-werkverkeer”",
        },
      },
      signal: "Kreeg dezelfde jassen terug en vertrok zonder er één te openen.",
      whatHappenedNext: "Wat er daarna gebeurde",
      candidates: {
        onsiteSearch: {
          domain: "Zoeken in de webshop",
          verdict: "Zoeken werkt",
          claim: "De verfijning leverde helemaal niets op.",
          why: "Ze toont nog steeds de waterdichte jassen.",
        },
        productPages: {
          domain: "Productpagina's",
          claim: "Geen van die jassen noemt woon-werkverkeer.",
          why: "Niet in de titels, de beschrijvingen of de tags.",
        },
        availability: {
          domain: "Beschikbaarheid",
          verdict: "Voorraad is in orde",
          claim: "De getoonde jassen zijn uitverkocht.",
          why: "Bijna alle zijn op voorraad in de markt van de shopper.",
        },
      },
      strongestEvidence: "Sterkste bewijs",
      ruledOut: "Uitgesloten",
      proposedChange: "Voorgestelde wijziging",
      change:
        "Voeg het woon-werkgebruik toe aan de productpagina's van de getoonde jassen.",
      approve: "Jij keurt goed",
      applies: "Beseam voert het uit",
      checkAgain: "Opnieuw controleren",
      mobile: {
        whatTheShopperDid: "Wat de shopper deed",
        query: "waterdichte jas",
        refinement: "+ voor woon-werkverkeer",
        signal:
          "Dezelfde jassen getoond. De shopper vertrok zonder er één te openen.",
        findings: {
          onsiteSearch: {
            domain: "Zoeken in de webshop",
            finding: "Zoeken werkt.",
            detail:
              "De verfijnde zoekopdracht toont nog steeds de waterdichte jassen.",
          },
          productPages: {
            domain: "Productpagina's",
            finding: "Woon-werkverkeer wordt nergens genoemd.",
            detail: "Niet in de titels, beschrijvingen of tags.",
          },
          availability: {
            domain: "Beschikbaarheid",
            finding: "Voorraad is beschikbaar.",
            detail:
              "Bijna alle getoonde jassen zijn op voorraad in de markt van de shopper.",
          },
        },
      },
    },

    oneSystem: {
      heading: "Overwogen worden is nog niet gekozen worden.",
      body: "Beseam volgt de shopper van ontdekking tot aankoop om te vinden waar het vertrouwen daalt, vragen onbeantwoord blijven of de reis stopt.",
      discovery: {
        buyingQuestion: "Koopvraag",
        example: "Voorbeeld",
        asked: "waterdichte jas voor woon-werkverkeer, maat M, onder €200",
        parsed: {
          useCase: "Woon-werk",
          material: "Waterdicht",
          size: "Maat M",
          price: "Onder €200",
        },
        andMore: "en nog zeven, geen ervan van jou",
        verdict: "Jouw webshop, niet genoemd",
      },
      store: {
        breadcrumb: (product: string) => `Home / Jassen / ${product}`,
        reviews: "128 reviews",
        size: "Maat",
        addToCart: "In winkelwagen",
        stock: "Op voorraad · morgen verzonden",
        whatShoppersAsk: "Wat shoppers hier vragen",
        questions: {
          waterproofRating: {
            question: "Waterkolom",
            answer: "20.000 mm",
          },
          breathable: {
            question: "Ademend voor woon-werk",
            answer: "Niet beantwoord",
          },
          suitJacket: {
            question: "Past over een colbert",
            answer: "Niet beantwoord",
          },
          returnWindow: { question: "Retourtermijn", answer: "60 dagen" },
        },
        verdict: "Twee vragen onbeantwoord",
      },
      personalization: {
        forThisShopper: "Voor deze shopper",
        wants: {
          waterproof: "waterdicht",
          size: "maat M",
          commuting: "woon-werk",
        },
        addedToCart: "Toegevoegd aan winkelwagen",
        twoAdded: "Twee toegevoegd",
        added: {
          breathable: "3-laags shell, ventilatieritsen",
          suitJacket: "Normale pasvorm, maat groter",
        },
        verdict: "Alle vier beantwoord",
      },
      domains: {
        getFound: {
          title: "Gevonden worden",
          capabilities: {
            aiAnswers: "AI-antwoorden",
            search: "Zoeken",
            productFeeds: "Productfeeds",
          },
          detail: "Als shoppers je nooit zien, kunnen ze je niet kiezen.",
        },
        hesitate: {
          title: "Zie waarom shoppers twijfelen",
          capabilities: {
            productPages: "Productpagina's",
            onsiteSearch: "Zoeken in de webshop",
            behavior: "Gedrag",
          },
          detail: "Vind de onbeantwoorde vraag die de shopper laat twijfelen.",
        },
        choose: {
          title: "Help shoppers kiezen",
          capabilities: {
            recommendations: "Aanbevelingen",
            personalization: "Personalisatie",
          },
          detail:
            "Voeg de ontbrekende informatie toe die de shopper helpt kiezen.",
        },
      },
      gate: {
        eyebrow: "Niets gaat live zonder jou",
        body: "Elke wijziging die klanten zien, wacht bij stap 03 tot jij hem goedkeurt.",
        note: "En stap 05 controleert dezelfde reis waar hij begon (AI-vermeldingen, productbezoeken, in winkelwagen), zodat een wijziging gemeten wordt tegen de situatie die hij veranderde.",
      },
    },

    benchmarks: {
      eyebrow: "AI Shopping Rapport",
      heading:
        "Producten kunnen op de ene plek zichtbaar zijn en op de andere gemist worden.",
      body: "Beseam stelt dezelfde koopvragen aan verschillende AI-assistenten om te vinden waar je producten verschijnen, waar ze gemist worden en hoe die resultaten verschillen. In de laatste ronde ",
      finding: (share: number) =>
        `kwam ${share}% van de merkvermeldingen voor bij maar één assistent.`,
      link: "Bekijk het rapport en de methode",
      pullQuote:
        "Een leesbare catalogus zorgt dat je overwogen wordt. Beseam volgt of je gekozen wordt, en laat zien wat er veranderde.",
      figureLabel: "Hoe vaak assistenten het eens waren",
      appearances: (namings: number) => `${namings} merkvermeldingen`,
      agreementAriaLabel: (one: number, two: number, every: number) =>
        `${one} merkvermeldingen kwamen voor bij maar één assistent, ${two} bij twee assistenten en ${every} bij elke assistent`,
      bands: {
        one: "Maar één assistent",
        two: "Twee assistenten",
        every: "Elke assistent",
      },
      columns: {
        category: "Categorie",
        question: "Waar assistenten het het minst eens waren",
        solo: "Merken bij één assistent",
      },
      outOf: (total: number) => ` van ${total}`,
    },

    actions: {
      heading: "Maak van het sterkste inzicht een verbetering.",
    },

    system: {
      eyebrow: "Eén verbonden overzicht",
      heading: "Eén probleem. Al het bewijs erachter.",
      body: "Een gemiste aanbeveling, een twijfelende shopper of een misgelopen verkoop zit zelden in één tool. Beseam verbindt AI-vindbaarheid, je webshop, shoppergedrag en resultaten, zodat de volgende wijziging begint met het volledige beeld.",
      compact: {
        inputs: [
          "AI & zoeken",
          "Product & webshop",
          "Shoppergedrag",
          "Orders & omzet",
        ],
        center: "Beseam verbindt het bewijs",
        outputs: [
          "Wat is er gebeurd?",
          "Wat zit in de weg?",
          "Wat moet er veranderen?",
          "Heeft het gewerkt?",
        ],
        link: "Ontdek het platform",
      },
    },

    impact: {
      heading: "Het telt alleen als het resultaat verandert.",
      body: "Na een wijziging stelt Beseam dezelfde shoppervragen opnieuw, en laat zien of de antwoorden nu jouw webshop noemen.",
    },

    promise: {
      heading: "Laat de AI-omzet van je webshop groeien",
    },

    stickyCta: {
      cta: "Krijg vroege toegang",
    },
  },

  faq: {
    heading: "Veelgestelde vragen",
    items: {
      whatIs: {
        question: "Wat is AI-zoekoptimalisatie?",
        answer:
          "AI-zoekoptimalisatie zorgt ervoor dat AI-assistenten zoals ChatGPT, Claude en Gemini je producten makkelijk kunnen vinden, begrijpen en aanbevelen. Het gaat om je productbeschrijvingen, productdata en technische setup, zodat assistenten je producten kunnen koppelen aan wat shoppers vragen.",
      },
      whyItMatters: {
        question: "Waarom is AI-zoeken belangrijk voor webshops?",
        answer:
          "Steeds meer shoppers vragen een AI-assistent wat ze moeten kopen in plaats van door zoekresultaten te scrollen, en een assistent beveelt maar een handvol producten aan. Staan jouw producten daar niet tussen, dan komt de shopper nooit in je webshop. Beseam helpt je producten bij die aanbevelingen te krijgen.",
      },
      getRecommended: {
        question:
          "Hoe zorg ik dat ChatGPT en andere AI-assistenten mijn producten aanbevelen?",
        answer:
          "Beseam controleert hoe ChatGPT, Claude, Gemini, Google AI Mode, Perplexity en Copilot de vragen van je shoppers beantwoorden, en zoekt uit waarom je producten ontbreken. Daarna stelt Beseam concrete verbeteringen voor in je productbeschrijvingen, content en technische setup, gerangschikt op de verwachte omzetimpact.",
      },
      different: {
        question:
          "Wat maakt Beseam anders dan andere tools voor AI-zichtbaarheid?",
        answer:
          "Beseam is speciaal gebouwd voor webshops met honderden of duizenden producten. De meeste tools voor AI-zichtbaarheid volgen merkvermeldingen voor blogs en bedrijfspagina's; Beseam werkt product voor product, koppelt AI-zichtbaarheid aan je verkeer en omzet, en maakt er acties van die je kunt goedkeuren of automatiseren.",
      },
      platforms: {
        question: "Met welke webshopplatformen werkt Beseam?",
        answer:
          "Beseam werkt op dit moment met Shopify-webshops. Je koppelt je webshop met één klik, en Beseam importeert je catalogus zonder je themacode aan te raken.",
      },
      time: {
        question: "Hoeveel tijd kost Beseam per week?",
        answer:
          "Beseam is ontworpen om maar een paar minuten per week te kosten. Je bekijkt en keurt de voorgestelde wijzigingen goed met een paar klikken, of laat Beseam de soorten wijzigingen die je vertrouwt automatisch doorvoeren.",
      },
      approval: {
        question: "Past Beseam mijn webshop aan zonder mijn goedkeuring?",
        answer:
          "Nee. Elke wijziging die klanten zien, wacht op jouw goedkeuring, tenzij je dat soort wijziging automatiseert. Alle wijzigingen blijven terug te draaien, zodat je alles kunt ongedaan maken wat Beseam heeft doorgevoerd.",
      },
      pricing: {
        question: "Wat kost Beseam?",
        answer:
          "Je kunt Beseam gratis starten en de eerste resultaten voor je webshop zien voordat je een plan kiest.",
      },
    },
  },

  answerCheck: {
    steps: {
      labels: {
        storefront: "Je webshop lezen",
        catalog: "Je producten en prijzen controleren",
        pages: "Je productpagina's bekijken",
        questions: "Vragen opstellen die shoppers kunnen stellen",
        answers: "Controleren hoe je producten gevonden worden",
      },
      technical: (position: number, total: number) =>
        `Je webshop scannen · stap ${position} van ${total}`,
      readingDomain: (domain: string) => `${domain} lezen`,
      readingStorefront: "Je webshop lezen",
      resultsAsTheyArrive:
        "We tonen nuttige inzichten zodra ze klaar zijn. Je hoeft niet op alles te wachten.",
      questionsLater:
        "Deze eerste check is een momentopname. In Beseam blijven de checks daarna doorlopen.",
      quickEstimate: "De eerste resultaten komen meestal binnen een minuut.",
      fullAuditRunning: "Volledige audit loopt",
      fullAuditEstimate: "Meestal 2–5 minuten na bevestiging.",
      progressDetails: "Bekijk de voortgang van de scan",
      currentStep: "Nu",
      progress: (done: number, total: number) => `${done} van ${total}`,
      productsFound: (count: number) =>
        `${count} ${count === 1 ? "product" : "producten"} gevonden`,
      pagesAnalyzed: (count: number) =>
        `${count} ${count === 1 ? "productpagina" : "productpagina's"} geanalyseerd`,
      pagesProgress: (done: number, total: number) =>
        `${done} van ${total} productpagina's geanalyseerd`,
      pagesFinishing:
        "Je producten en prijzen staan al hieronder terwijl deze klaar worden",
      pagesFailed: "We konden deze pagina's in deze ronde niet volledig lezen",
      questionsWritten: (count: number) =>
        `${count} ${count === 1 ? "vraag" : "vragen"} opgesteld`,
      questionsFromProducts:
        "Opgesteld op basis van de producten die we vonden",
      confirmEmail: (channels: string) =>
        `Bevestig je e-mailadres en we gaan verder met ${channels}`,
      askingChannels: (channels: string) => `${channels} bevragen`,
    },
    result: {
      productsFound: "producten gecontroleerd",
      productPagesSampled: "productpagina's gecontroleerd",
      answersNamed: "AI-antwoorden raadden je aan",
      answersMissed: "AI-antwoorden misten je",
      answersPending: "antwoorden van assistenten in afwachting",
      opportunitiesFound: (count: number): string =>
        count === 1 ? "kans gevonden" : "kansen gevonden",
      prioritiesFound: (count: number): string =>
        count === 1 ? "prioriteit" : "prioriteiten",
      supportingFindings: (count: number): string =>
        count === 1 ? "ondersteunend inzicht" : "ondersteunende inzichten",
      readOn: (date: string) => `Webshop gelezen op ${date}`,
      answeredOn: (date: string) => `AI-antwoorden van ${date}`,
      statusRejected: "Kon deze webshop niet lezen",
      statusRunning: "Nog bezig",
      statusFreeReady: "Gratis scan klaar",
      statusFailed: "Audit onvolledig",
      statusComplete: "Scan voltooid",
      statusCompleteSampled: (pages: number) =>
        `Steekproefscan voltooid · ${pages} ${pages === 1 ? "productpagina" : "productpagina's"} gecontroleerd`,
      shareAria: "Deel deze scan",
      moreActions: "Meer rapportacties",
      linkCopied: "Link gekopieerd",
      shared: "Gedeeld",
      copyFailed: "Kopiëren mislukt",
      share: "Delen",
      print: "Afdrukken",
      brandAppearance: "AI-zichtbaarheid",
      strong: "Sterk",
      mixed: "Wisselend",
      weak: "Zwak",
      barelyVisible: "Niet gezien in deze steekproef",
      brandEverywhere: "Je merk verscheen in elk waargenomen antwoord.",
      brandNowhere: "Je merk verscheen in geen enkel waargenomen antwoord.",
      brandMissing: (missed: number, total: number) =>
        `Je merk ontbrak in ${missed} van de ${total} waargenomen antwoorden.`,
      frequentAlternative: "Meest genoemde alternatief:",
      byAssistant: "Per assistent",
      assistants: (count: number) =>
        `${count} ${count === 1 ? "assistent" : "assistenten"}`,
      namedYou: "noemde je",
      noAnswer: "geen antwoord",
      didNotNameYou: "noemde je niet",
      noImage: "Geen afbeelding",
      yours: "van jou",
      merchant: "Webshop",
      assistant: "Assistent",
      commerceStorefront: "Commerce-webshop",
      storefront: "Webshop",
      openProduct: "Product openen →",
      details: "Details",
      close: "Sluiten",
      valueSummary:
        "Beseam controleerde hoe je producten gevonden, begrepen en gekozen worden in je webshop en bij AI-shopping.",
      pageQuality: "gemiddelde kwaliteit productpagina's",
      deepResults: "diagnostische checks",
      credibilityLine: (products: string, pages: number, qualified: number) =>
        `${products} producten · ${pages} ${pages === 1 ? "productpagina" : "productpagina's"} · ${qualified} kwaliteitschecks gescoord`,
      headlineAll: (brand: string, total: number) =>
        `${brand} werd genoemd in alle ${total} bruikbare AI-antwoorden uit onze steekproef.`,
      headlineNone: (brand: string, total: number) =>
        `${brand} werd in geen van de ${total} bruikbare AI-antwoorden uit onze steekproef genoemd.`,
      headlineMissed: (brand: string, missed: number, total: number) =>
        `${brand} ontbrak in ${missed} van de ${total} bruikbare AI-antwoorden uit onze steekproef.`,
      headlineFindings: (brand: string, count: number) =>
        `We lazen de openbare webshop van ${brand} en vonden ${count} ${count === 1 ? "kans" : "kansen"} die het bekijken waard ${count === 1 ? "is" : "zijn"}.`,
      headlinePriorities: (brand: string, count: number) =>
        `${count} ${count === 1 ? "punt is" : "punten zijn"} het waard om eerst op te lossen bij ${brand}.`,
      prioritySupport: (count: number) =>
        count > 0
          ? `Hier zouden we beginnen. ${count} ${count === 1 ? "ander inzicht staat" : "andere inzichten staan"} hieronder als ondersteunend bewijs.`
          : "Hier zouden we beginnen. Het bewijs hieronder laat zien waarom elk punt telt.",
      headlineReading: (brand: string) =>
        `De webshop van ${brand} wordt nu gelezen.`,
      headlineClear: (brand: string) =>
        `Er viel niets duidelijks op aan de pagina's van ${brand} die we konden lezen.`,
      sampledSupport:
        "Dit zijn momentopnamen, geen ranking. Bruikbare antwoorden en pogingen zonder antwoord staan hieronder apart.",
      moreMayFollow:
        "Er kan meer volgen zodra je productpagina's gelezen zijn.",
      findingsSupport:
        "Elk punt staat hieronder in gewone taal beschreven, met het bewijs eronder.",
      readingSupport:
        "Resultaten verschijnen hieronder zodra elk onderdeel klaar is.",
      clearSupport:
        "Dat is een goed teken, maar een openbare scan van een paar pagina's kan niet alles uitsluiten.",
    },
    findings: {
      priorityFirst: "Eerst doen",
      priorityLook: "Het bekijken waard",
      priorityMinor: "Klein",
      impactHigh: "Grote impact",
      impactMedium: "Gemiddelde impact",
      impactLower: "Kleinere impact",
      effortQuick: "Snelle winst",
      effortMedium: "Gemiddelde moeite",
      effortHigher: "Meer moeite",
      areas: {
        discovery: "Gevonden worden",
        listing: "Hoe je producten vermeld staan",
        page: "Wat de productpagina shoppers vertelt",
        trust: "Vertrouwen en veiligheid",
        markets: "Markten en talen",
        searchStructured: "Zoeken & gestructureerde data",
        internationalization: "Internationalisering",
        trustDelivery: "Vertrouwen & levering",
        machineReadability: "Machineleesbaarheid",
        productEvidence: "Productbewijs",
      },
      recommendation: "Bekijk bewijs & volgende stap",
      close: "Sluiten",
      whyItMatters: "Waarom het telt",
      improveNext: "Volgende stap:",
      startFixing: "Ga verder met deze webshop in Beseam",
      evidence: "Bewijs",
      measuredEvidence: "Gemeten bewijs",
      affectedExamples: "Getroffen voorbeelden",
      fixLabel: "Oplossing",
      proofObserved: "Waargenomen",
      proofInput: "Gebruikte input",
      proofExpected: "Verwacht",
      proofSource: "Gelezen uit",
      proofRecommendation: "Aanbeveling",
      proofSourceLabel: (source: string) =>
        ({
          rendered_page: "de weergegeven openbare pagina",
          http_response_headers: "de HTTP-responseheaders",
          html_source: "de HTML-broncode",
          catalog_record: "het catalogusrecord",
          platform_api: "een antwoord van de platform-API",
          feed_export: "de geëxporteerde feed",
          sitemap: "de sitemap",
          robots_txt: "robots.txt",
          serp_result: "een zoekresultaat",
          ai_channel_answer: "een antwoord van een AI-assistent",
          crawl_metadata: "crawlmetadata",
          derived: "meerdere waargenomen inputs",
          declared: "door de webshop aangeleverde data",
        })[source] ?? source.replaceAll("_", " "),
      proofInputLabel: (label: string) =>
        ({
          acao: "Access-Control-Allow-Origin",
          acac: "Access-Control-Allow-Credentials",
          acam: "Access-Control-Allow-Methods",
          acah: "Access-Control-Allow-Headers",
          found_types: "Gevonden patronen van inloggegevens",
          redacted_matches: "Doorzoekbare bronvorm",
          source_locations: "Bronlocatie",
          cache_control: "Cache-Control",
          pragma: "Pragma",
          insecure_ws: "Onveilige WebSocket-URL's",
        })[label] ?? label.replaceAll("_", " "),
      checks: (count: number) => `${count} checks`,
      moreSampledPages: (count: number) =>
        `+ nog ${count} ${count === 1 ? "gecontroleerde pagina" : "gecontroleerde pagina's"}`,
      moreProofChecks: (count: number) =>
        `Bekijk nog ${count} ${count === 1 ? "check" : "checks"}`,
      productsSeenOn: "Producten waarbij dit gezien werd",
      seePage: "Bekijk de pagina →",
      rawCatalog: "Het ruwe catalogusbestand dat we lazen →",
      fullPageReport: "Volledig paginarapport →",
      heading: "Los deze eerst op",
      intro:
        "Dit zijn de prioriteiten waarmee we zouden beginnen. Open er één voor het bewijs en de volgende stap.",
      stillReading: "Nog bezig met lezen.",
      moreMayAppear:
        " Er kan meer verschijnen zodra je productpagina's klaar zijn.",
      showOther: (count: number) =>
        `Bekijk ${count} ${count === 1 ? "ondersteunend inzicht" : "ondersteunende inzichten"}`,
      readingPages: "Je productpagina's worden nog gelezen.",
      aiVisibilityTitle: "Zichtbaarheid in AI-shopping",
      aiVisibilityAllMissed: (count: number) =>
        `Je merk ontbrak in ${count === 1 ? "het enige bruikbare AI-shoppingantwoord" : `alle ${count} bruikbare AI-shoppingantwoorden`}.`,
      aiVisibilitySomeMissed: (missed: number, total: number) =>
        `Je merk ontbrak in ${missed} van de ${total} bruikbare AI-shoppingantwoorden.`,
      aiVisibilityWhy:
        "Als een AI-shoppingassistent een koopvraag beantwoordt zonder jouw webshop te noemen, worden shoppers naar concurrenten geleid voordat ze ooit je webshop bereiken. Ontbrekende identificatiecodes of afwijkende prijzen zorgen er vaak voor dat AI-systemen listings laten vallen ten gunste van geverifieerde concurrenten.",
      aiVisibilityNext:
        "Open de vragen hieronder om te zien wat er gevraagd werd, welke assistenten een bruikbaar antwoord gaven, wie ze in plaats van jou noemden en welk productbewijs je het best eerst kunt versterken.",
      aiVisibilityAttempts: (usable: number, total: number) =>
        `${usable} van ${total} pogingen bij assistenten gaven een bruikbaar antwoord.`,
      aiVisibilityRivals: (names: string) =>
        `Genoemde alternatieven: ${names}.`,
      aiVisibilityObserved: (named: number, usable: number, brand: string) =>
        `${named} van ${usable} bruikbare AI-shoppingantwoorden raadden ${brand} aan`,
      aiVisibilityExpected:
        "Het merk wordt aanbevolen in bruikbare AI-shoppingantwoorden op relevante koopvragen",
      discoveryFiles: {
        llms: "Een korte samenvatting van je webshop voor AI-assistenten die ernaar zoeken. Optioneel.",
        agents:
          "Notities voor AI-agents die namens een shopper door je webshop bladeren. Optioneel.",
        skill:
          "Beschrijft wat een assistent in je webshop kan doen, in een formaat dat sommige AI-tools lezen. Heel nieuw en optioneel. Sla het over tenzij je al met AI-agents werkt.",
        ucp: "Een machineleesbare kaart die je webshop beschrijft voor commerce-agents. Optioneel.",
      },
    },
    boundary: {
      heading: "Waar deze scan ophoudt",
      intro:
        "Een openbare scan kan maar zo ver reiken. Dit is precies hoe ver hij ging, en wat daarna doorloopt.",
      did: "Wat deze scan deed",
      didPublic:
        "Je openbare webshop gelezen zoals elke bezoeker dat kan: geen login, geen toegang tot je webshop.",
      didPages: (count: number) =>
        `De paginachecks uitgevoerd op ${count} ${count === 1 ? "productpagina" : "productpagina's"}, plus je robots-bestand, sitemap en crawlertoegang.`,
      didPagesSample:
        "De paginachecks uitgevoerd op een steekproef van je productpagina's, plus je robots-bestand, sitemap en crawlertoegang.",
      didCatalog:
        "Je catalogusdata vergeleken met wat elke pagina echt toont: namen, prijzen, beschikbaarheid.",
      not: "Wat hij niet deed",
      notKeepAsking:
        "Blijven vragen. De antwoorden van assistenten hierboven zijn één keer opgehaald, in deze ronde.",
      notAskLive:
        "ChatGPT of Google AI Mode iets over je producten vragen. Niets hier is een live antwoord van een assistent.",
      notRepeat:
        "Zichzelf herhalen. Er zit geen planning achter een openbare scan.",
      notHistory:
        "Een geschiedenis bijhouden. Er is geen eerdere ronde om dit mee te vergelijken.",
      next: "Wat er begint in Beseam",
      nextItems: [
        "Shoppervragen die je leest en aanpast voordat ze worden gesteld.",
        "Die vragen volgens een planning gesteld in plaats van één keer.",
        "Echte Lighthouse-browsertests voor laadsnelheid en Core Web Vitals, rechtstreeks uitgevoerd in de Chromium-worker van Beseam.",
        "De antwoorden bewaard als bewijs, met de datum waarop ze gegeven werden.",
        "Verbeteringen gerangschikt op wat het eerst de moeite waard is.",
        "Dezelfde vragen opnieuw gesteld na een wijziging, zodat je ziet wat er verschoof.",
      ],
    },
    continue: {
      opportunities: (count: number): string =>
        count === 0
          ? "Geen duidelijke gaten in deze momentopname"
          : `${count} ${count === 1 ? "kans" : "kansen"} gevonden`,
      nextLabel: "Ga verder in Beseam",
      once: (count: number): string =>
        count === 0
          ? "Deze scan is een momentopname. Beseam blijft volgen wat er verandert."
          : "Deze scan vond de gaten. Beseam blijft eraan werken.",
      body: "Koppel Shopify om met deze webshop verder te gaan in Beseam. Laat vindbaarheids- en webshopchecks doorlopen, maak van de sterkste inzichten verbeteringen ter goedkeuring en controleer daarna wat er veranderde.",
      benefits: [
        "Houd dezelfde webshop in de gaten",
        "Maak van inzichten voorbereide wijzigingen",
        "Eerst goedkeuren, dan opnieuw meten",
      ],
      safetyAssurances: [
        "Shopify koppelen met 1 klik (geen themacode aangeraakt)",
        "Elke wijziging die klanten zien, vraagt jouw goedkeuring",
        "Alle wijzigingen blijven 100% terug te draaien",
        "Dezelfde shoppervragen worden opnieuw gesteld om te bewijzen wat er verschoof",
      ],
      prepared: "Voorbereid door Beseam",
      approval: "Wacht op jouw goedkeuring",
      afterConnection: "Gecontroleerd na koppeling",
      start: "Koppel Shopify en ga verder",
      mobileStart: "Koppel Shopify en ga verder",
      carryStore: (domain: string) =>
        `${domain} wordt meegenomen in de setup, zodat je de webshop niet opnieuw hoeft in te voeren.`,
      closingEyebrow: "Volgende stap",
      closingTitle: (count: number) =>
        `Maak van ${count === 1 ? "deze prioriteit" : `deze ${count} prioriteiten`} verbeteringen die Beseam kan controleren.`,
      closingBody:
        "Beseam blijft de webshop controleren, bereidt de wijzigingen voor, wacht op jouw goedkeuring en controleert hetzelfde bewijs opnieuw na elke wijziging.",
      reviewWithFinding: "Loop je dit liever samen met ons door?",
      reviewWithoutFinding: "Loop je dit liever samen met ons door?",
      startingWith: (headline: string) => `Te beginnen met “${headline}”`,
      reviewBody:
        "In 20 minuten gebruiken we één inzicht uit deze scan om de volledige cyclus op jouw webshop te laten zien: bewijs, voorgestelde wijziging, goedkeuring en hercontrole.",
      reviewCta: "Plan een webshopreview van 20 minuten",
    },
    visibility: {
      googleSearch: "Google-zoekopdracht:",
      excerpt: "Fragment van wat er terugkwam · niet het volledige antwoord",
      unreachable: (channel: string, error: string) =>
        `${channel} was niet bereikbaar: ${error}`,
      noWrittenAnswer: (channel: string) =>
        `${channel} gaf geen geschreven antwoord op deze vraag.`,
      namedYou: "Noemde je",
      didNotNameYou: "Noemde je niet",
      noVerdict: "Geen oordeel",
      namedInstead: "noemde in plaats daarvan:",
      productsSurfaced: "Producten die de shopper te zien kreeg",
      noProducts: "Er werden geen producten getoond",
      addsUpTo: "Wat dit samen betekent",
      noUsableAnswer: "Geen enkele assistent gaf hier een bruikbaar antwoord.",
      verdictAll: (count: number) =>
        `Je werd genoemd door ${count === 1 ? "de assistent" : `alle ${count} assistenten`} die deze vraag kregen.`,
      verdictNone: (count: number, rivals: string) =>
        count === 1
          ? `De assistent die deze vraag kreeg, noemde je niet.${rivals}`
          : `Geen van de ${count} assistenten die deze vraag kregen, noemde je.${rivals}`,
      verdictSome: (named: number, count: number, rivals: string) =>
        `${named} van ${count} ${count === 1 ? "assistent" : "assistenten"} ${named === 1 ? "noemde" : "noemden"} je.${rivals}`,
      rivalsTail: (names: string, count: number) =>
        ` ${names} ${count === 1 ? "werd" : "werden"} in plaats daarvan naar voren geschoven.`,
      askedOne: "gesteld aan 1 assistent",
      askedMany: (count: number) =>
        `afzonderlijk gesteld aan elk van ${count} assistenten`,
      title: "Zichtbaarheid in AI-shopping",
      summary: (named: number, total: number, questions: number) =>
        `${named === 0 ? `Geen van de ${total}` : named === total ? `Alle ${total}` : `${named} van ${total}`} bruikbare AI-shopping${total === 1 ? "antwoord" : "antwoorden"} raadde${named > 1 ? "n" : ""} je aan · ${questions} ${questions === 1 ? "koopvraag" : "koopvragen"}`,
      summaryWithAttempts: (
        named: number,
        usable: number,
        attempts: number,
        questions: number,
      ) =>
        `${named === 0 ? `Geen van de ${usable}` : named === usable ? `Alle ${usable}` : `${named} van ${usable}`} bruikbare AI-shopping${usable === 1 ? "antwoord" : "antwoorden"} raadde${named > 1 ? "n" : ""} je aan · ${attempts} pogingen over ${questions} ${questions === 1 ? "koopvraag" : "koopvragen"}`,
      usableAttempts: (usable: number, total: number) =>
        `${usable} van ${total} pogingen raadden specifieke webshops aan (de rest was informatief)`,
      noUsableAttempts: (total: number) =>
        `${total} ${total === 1 ? "poging" : "pogingen"} · alleen informatief (geen webshops genoemd)`,
      noUsableSummary: (attempts: number, questions: number) =>
        `0/${attempts} pogingen bij assistenten gaven een bruikbaar antwoord · ${questions} ${questions === 1 ? "koopvraag" : "koopvragen"}`,
      checking: "Controleren wat shoppers te zien krijgen",
      competitors: "Concurrenten die genoemd werden toen jij het niet was",
      assistantEvidence: "Bekijk bewijs van assistenten",
      openQuestion: "Open een vraag om te zien wat elke assistent antwoordde",
      askedIn: (language: string) => `Gesteld in het ${language}`,
    },
    summary: {
      evidenceHeading: "Bewijs & dekking",
      evidenceIntro:
        "Zie wat Beseam echt gemeten heeft, wat een review nodig heeft en waar je het volledige bewijs per pagina opent.",
      statusHealthy: "Gezond",
      statusReview: "Review nodig",
      statusReading: "Wordt gelezen",
      statusLimited: "Beperkt",
      productCatalog: "Productcatalogus",
      noCatalogBrandSite:
        "Geen productcatalogus gevonden. Geaudit als merksite.",
      homepage: "Je homepage",
      homepageGated: "Bevestig je e-mailadres en we lezen je homepage grondig",
      homepageReading: "Je homepage en vertrouwenspagina's worden nu gelezen",
      homepageFailed: "We konden je homepage in deze ronde niet lezen.",
      homepageCompleted: "Homepage-audit voltooid",
      homepageSummary: (_score: number, failed: number, total: number) =>
        `Homepage gecontroleerd · ${failed ? `${failed} ${failed === 1 ? "observatie" : "observaties"} om te bekijken` : "geen observaties gemarkeerd"} · ${total} checkresultaten gemeten`,
      trustPages: "Vertrouwenspagina's",
      aboutPage: "Over-ons-pagina",
      contactPage: "Contactpagina",
      pageCouldNotRead: "We konden deze pagina in deze ronde niet lezen.",
      openFullReport: "Volledig rapport openen",
      store: "Webshop",
      catalog: "Catalogus",
      productPages: "Productpagina's",
      collectionPageAudits: "Collectiepagina's",
      collectionPagesGated: (count: number) =>
        `Tot ${count} representatieve ${count === 1 ? "collectiepagina" : "collectiepagina's"} · na bevestiging van je e-mail`,
      collectionPagesReading:
        "Representatieve collectiepagina's worden nu gelezen",
      collectionPagesUnavailable:
        "Er was in deze ronde geen representatieve collectiepagina beschikbaar voor een grondige check.",
      contentPageAudits: "Redactioneel & content",
      contentPagesGated: (count: number) =>
        `Tot ${count} representatieve ${count === 1 ? "contentpagina" : "contentpagina's"} · na bevestiging van je e-mail`,
      contentPagesReading:
        "Representatieve redactionele en contentpagina's worden nu gelezen",
      contentPagesUnavailable:
        "Er was in deze ronde geen representatieve redactionele/contentpagina beschikbaar voor een grondige check.",
      sampledPageGroupSummary: (
        pages: number,
        failed: number,
        evaluated: number,
        unreadable: number,
      ) =>
        `${pages} ${pages === 1 ? "pagina" : "pagina's"} gecontroleerd · ${failed ? `${failed} ${failed === 1 ? "observatie" : "observaties"} om te bekijken` : "geen observaties gemarkeerd"} · ${evaluated} checkresultaten gemeten${unreadable ? ` · ${unreadable} niet leesbaar` : ""}`,
      templatePatterns: "Herhaald op gecontroleerde pagina's",
      templatePatternCoverage: (affected: number, total: number) =>
        affected === total
          ? `Gezien op alle ${total} gecontroleerde pagina's`
          : `Gezien op ${affected} van ${total} gecontroleerde pagina's`,
      templatePatternHint:
        "Omdat dit terugkomt op meerdere pagina's van hetzelfde type, komt het mogelijk uit hun gedeelde template en niet van één losse pagina.",
      pdpLayoutCoverage: "Dekking productpagina-layouts",
      pdpLayoutCoverageSummary: (
        detected: number,
        covered: number,
        audits: number,
      ) =>
        `${detected} ${detected === 1 ? "layout" : "layouts"} gevonden · ${covered} vertegenwoordigd in ${audits} ${audits === 1 ? "audit" : "audits"}`,
      pdpLayoutsAllCovered: "Alle gevonden layouts vertegenwoordigd",
      pdpLayoutsPartiallyCovered: (covered: number, detected: number) =>
        `${covered} van ${detected} gevonden layouts vertegenwoordigd`,
      pdpLayoutAuditCount: (count: number) => `${count} geaudit`,
      pdpLayoutObservedCount: (count: number) =>
        `${count} ${count === 1 ? "kandidaat-productpagina" : "kandidaat-productpagina's"} gematcht`,
      pdpLayoutPublicTemplate: "templatesleutel openbaar zichtbaar",
      pdpLayoutStructural: "gevonden via paginastructuur",
      pdpLayoutSampleNote: (count: number) =>
        `Gevonden via ${count} openbare ${count === 1 ? "productpagina" : "productpagina's"}. Dit is een representatieve steekproef, geen volledige inventaris van thema's/templates.`,
      sampledPageGroupGatedBody:
        "We controleren een paar representatieve pagina's in plaats van elke URL te crawlen, zodat de scan snel blijft en toch de template controleert die shoppers en assistenten echt tegenkomen.",
      publicFootprint: "Openbare voetafdruk",
      localePaths: "Taalpaden",
      domains: "Domeinen",
      whatExists: "Wat er bestaat",
      discoverable: "Is het vindbaar?",
      productPagesLabel: "Productpagina's",
      collections: "Collecties",
      collectionUrls: "Collectie-URL's",
      pages: "Pagina's",
      articles: "Artikelen",
      blogs: "Blogs",
      policies: "Beleid",
      localeCopies: "Taalkopieën van URL's",
      searchPageSignals: "Zoek- & paginasignalen",
      productShoppingData: "Product- & shoppingdata",
      contentMerchandising: "Content & merchandising",
      trustConfidence: "Vertrouwen & koopzekerheid",
      marketsLocalization: "Markten & lokalisatie",
      technicalSecurity: "Techniek & beveiliging",
      notMeasured: "Niet gemeten",
      readable: "Leesbaar",
      open: "Open",
      unavailable: "Niet beschikbaar",
      found: "Gevonden",
      declared: "Opgegeven",
      notFound: "Niet gevonden",
      blocked: (count: number) => `${count} geblokkeerd`,
      quickNotMeasured: "Niet gemeten in snelle scan",
      primary: "Primair",
      primaryStorefront: "Primaire webshop",
      platformUnknown: "platform onbekend",
      publicUrls: "Gevonden openbare URL's",
      productsSampled: (count: number) => `${count} producten gecontroleerd`,
      localePathCount: (count: number) => `${count} taalpaden`,
      storeSummary: (
        products: string,
        _collections: string,
        _location: string,
        sitemap: string,
        crawler: string,
      ) =>
        `${products} producten gevonden · sitemap ${sitemap} · toegang zoekcrawlers ${crawler}`,
      internalReachSummary: (
        links: number,
        products: number,
        collections: number,
      ) =>
        `${links} links op de homepage · ${products} product · ${collections} collectie`,
      pageAuditSummary: (
        pages: number,
        failed: number,
        evaluated: number,
        unchecked: number,
      ) =>
        `${pages} representatieve ${pages === 1 ? "productpagina" : "productpagina's"} · ${evaluated} gekwalificeerde checks${failed ? ` · ${failed} vragen een review` : " · geen gekwalificeerde checks vragen een review"}${unchecked ? ` · ${unchecked} niet gemeten` : ""}`,
      pdpQualitySummary: (
        pages: number,
        score: number,
        qualified: number,
        diagnostics: number,
      ) =>
        `${pages} representatieve ${pages === 1 ? "productpagina" : "productpagina's"} · gemiddelde kwaliteit ${score}/100 · ${qualified} gekwalificeerde resultaten · ${diagnostics} diepe resultaten`,
      pdpQualityHeading: "Kwaliteit productpagina's",
      pdpQualityAverage: "Gemiddelde paginakwaliteit",
      pdpQualifiedChecks: "Gekwalificeerde beoordelingen",
      pdpChecksNeedReview: (count: number) => `${count} review nodig`,
      pdpChecksPassed: (count: number) => `${count} geslaagd`,
      pdpDeepDiagnostics: "Resultaten diepe checks",
      pdpDiagnosticsMeasured: (count: number) => `${count} gemeten`,
      pdpDiagnosticsUnavailable: (count: number) => `${count} niet gemeten`,
      pdpDiagnosticsComplete: "Alle beschikbare diagnostiek gemeten",
      localizedCopies: (count: number) => `${count}+ vertaalde URL-kopieën`,
      robots: "robots.txt",
      sitemap: "Sitemap",
      searchCrawlers: "Zoekcrawlers",
      assistantCrawlers: "Crawlers van assistenten",
      blockedUrls: "URL's geblokkeerd door robots",
      internalReach: "Interne bereikbaarheid",
      orphanProducts: "Verweesde producten",
      discoveryFiles: "Vindbaarheidsbestanden",
      sitemapFreshness: "Actualiteit sitemap",
      sitemapImages: "Afbeeldingen in sitemap",
      allowed: (allowed: number, total: number) =>
        `${allowed}/${total} toegestaan`,
      noDates: "Geen datums zichtbaar",
      noImages: "Geen afbeeldingen zichtbaar",
      lowerBounds:
        "Aantallen met + zijn ondergrenzen, omdat de snelle URL-inventaris zijn limiet van 5.000 URL's bereikte.",
      homepageSample:
        "Paden vanaf de homepage zijn hier een steekproef. Echte dekking van verweesde pagina's vraagt de volledige interne linkstructuur.",
      emergingFiles: (present: number, total: number) =>
        `Die vier zijn opkomende standaarden om AI-assistenten te vertellen wat je webshop is en hoe ze die kunnen gebruiken. ${present} van ${total} zijn gepubliceerd. Geen ervan is verplicht, van geen ervan is bekend dat het vandaag je positie in zoekmachines beïnvloedt, en een ontbrekend bestand is geen fout. We melden ze omdat webshops die ze publiceren makkelijker correct te lezen zijn voor assistenten, niet omdat je zonder ze iets verkeerd doet.`,
      catalogQuestion: "Zijn producten te begrijpen en te onderscheiden?",
      countsChecked:
        "aantallen hieronder gaan over de gecontroleerde producten",
      withGap: (count: number) => `${count} producten met minstens één gat`,
      catalogSummary: (
        checked: string,
        gaps: number,
        unavailable: number,
        _consistency: number,
      ) =>
        `${checked} · ${gaps} met minstens één gat in de catalogus · ${unavailable} momenteel niet beschikbaar`,
      catalogGaps: (count: number) =>
        `${count} ${count === 1 ? "gat" : "gaten"} in de catalogus`,
      productTypes: (count: number) => `${count} producttypes`,
      categories: "Categorieën & collecties",
      withoutCategory: "zonder categorie",
      withoutTags: "zonder tags",
      membership: "Lidmaatschap van collecties:",
      commonTypes: "Veelvoorkomende producttypes:",
      collectionsList: "Collecties:",
      identity: "Productidentiteit",
      withoutId: "zonder SKU/barcode",
      brandVendorGaps: "gaten in merk/leverancier",
      idConflicts: "conflicten in identificatiecodes",
      variants: "Varianten & kopersopties",
      withVariants: "producten met varianten",
      noBuyerOptions: "tonen geen kopersopties",
      variantOptionGaps: "echte gaten in variantopties",
      variantIdGaps: "gaten in variant-ID's",
      options: "Opties:",
      productInfo: "Productinformatie",
      wellDescribed: "goed beschreven",
      missingDescriptions: "ontbrekende beschrijvingen",
      thin: "mager",
      withoutImages: "zonder afbeeldingen",
      duplicateCopy: "dubbele tekst",
      availability: "Beschikbaarheid",
      unavailableProducts: "niet-beschikbare producten",
      variantsAcross: "varianten over",
      checkedProducts: "gecontroleerde producten",
      consistency: "Productconsistentie",
      comparingPages: "Voorbeeldproductpagina's vergelijken…",
      sampledGaps: "gaten in steekproef",
      consistencyBody: (pages: number) =>
        `Catalogus ↔ paginadata voor prijs, beschikbaarheid, productdata en koperskenmerken op ${pages} voorbeeldproductpagina's.`,
      standsOut: "Wat opvalt",
      high: "Hoog",
      catalogLimited:
        "Detail over de hele catalogus is beperkt in deze webshop; de representatieve productpagina's volgen hieronder.",
      pagesReading: (count: number) =>
        `${count} productpagina's · worden nu gelezen`,
      pagesFailed: (count: number) =>
        `${count} productpagina's · we konden ze niet volledig lezen`,
      pagesUnavailable:
        "Controle van representatieve productpagina's was in deze ronde niet beschikbaar",
      pagesGated: (count: number) =>
        `${count} productpagina's · nadat je je e-mailadres bevestigt`,
      pagesGatedBody:
        "Deze pagina's grondig lezen is de trage helft van de scan, en het bevestigen van je e-mailadres start die. Het webshop- en catalogusbewijs hierboven blijft gewoon staan.",
      inspecting: (count: number) =>
        `${count} representatieve productpagina's worden gecontroleerd`,
      evidenceReady:
        "Webshop- en catalogusbewijs staat al hierboven. Resultaten per pagina verschijnen hier automatisch.",
      pdpFailed:
        "De observaties over webshop en catalogus blijven geldig. De controle van representatieve productpagina's kon in deze ronde niet worden afgerond.",
      sampleShows: "Wat de voorbeeldproductpagina's laten zien",
      deepAuditCoverage: "Auditdiepte per onderdeel",
      deepAuditCoverageSummary: (
        pages: number,
        measured: number,
        notMeasured: number,
      ) =>
        `${measured} diagnostische checkresultaten gemeten over ${pages} ${pages === 1 ? "gecontroleerde productpagina" : "gecontroleerde productpagina's"}${notMeasured ? ` · ${notMeasured} extra resultaten niet gemeten` : ""}`,
      deepAuditCoverageNote:
        "De kaarten per onderdeel vatten de geregistreerde domeinen SEO, AI-shopping, GEO, CRO, shopping, vertrouwen en beveiliging samen. Categorieplaybooks, catalogus↔productpagina-pariteit, AI-probes en andere gespecialiseerde checks zitten in het diepe totaal; Lighthouse en visueel bewijs staan in elk paginarapport.",
      areaClear: "Geen observaties gemarkeerd",
      areaIssues: (count: number) =>
        `${count} ${count === 1 ? "observatie" : "observaties"} om te bekijken`,
      areaCoverage: (measured: number, notMeasured: number) =>
        `${measured} checkresultaten gemeten${notMeasured ? ` · ${notMeasured} niet gemeten` : ""}`,
      semanticSignalsHeading: "SEO- & gestructureerde-datasignalen",
      semanticSignalsNote:
        "Dit zijn semantische checks, geen syntaxchecks. Product en Offer kunnen worden aangeleverd als JSON-LD, Microdata of RDFa; Beseam rekent een pagina niet af alleen omdat ze niet specifiek JSON-LD gebruikt.",
      opportunity: "Kans",
      signalIssues: (issues: number, total: number) =>
        `${issues} van ${total} gecontroleerde ${total === 1 ? "productpagina vraagt" : "productpagina's vragen"} aandacht`,
      signalVerified: (passed: number, total: number) =>
        passed === total
          ? `Gecontroleerd op ${total === 1 ? "de enige gecontroleerde productpagina" : `alle ${total} gecontroleerde productpagina's`}`
          : `Gecontroleerd op ${passed} van ${total} gecontroleerde productpagina's`,
      signalNotMeasured: (count: number) => `${count} niet gemeten`,
      signalLabels: {
        "seo.l2.product_schema_present": "Gestructureerde productdata",
        "seo.l2.offer_present": "Gestructureerde aanboddata",
        "seo.l3.schema_visible_parity":
          "Gestructureerde data ↔ zichtbare pagina",
        "seo.l1.canonical_present": "Canonieke URL",
        "seo.l1.title_present": "Paginatitel",
        "shopping.l2.price_present": "Prijs",
        "shopping.l2.availability_present": "Beschikbaarheid",
        "shopping.l2.brand_present": "Merk",
        "shopping.l2.identifier_present": "Productcode",
        "shopping.l2.image_present": "Productafbeelding",
        "shopping.l2.description_present": "Productbeschrijving",
        "shopping.l2.description_sufficient": "Diepgang beschrijving",
        "aeo.l3.variant_picker_present": "Variantkiezer",
      },
      pdpRepeatedPatterns: "Herhaald op gecontroleerde productpagina's",
      pdpRepeatedHint:
        "Dit zijn de patronen die het waard zijn om op te lossen voordat je losse paginadetails najaagt.",
      sampledPagesDisclosure: (count: number) =>
        `${count} ${count === 1 ? "gecontroleerde productpagina" : "gecontroleerde productpagina's"}`,
      sampledPagesHeading: "Gecontroleerde productpagina's",
      sampledPagesNote:
        "Open een pagina voor de volledige Lighthouse-test, sectieanalyse, AI-checks, technische audit en het bewijs.",
      needAttention: (count: number) => `${count} vragen aandacht`,
      checked: (count: number) => `van ${count} gecontroleerd`,
      couldNotCheck: (count: number) =>
        ` · ${count} konden we niet controleren`,
      passedOf: (passed: number, total: number) =>
        `${passed}/${total} geslaagd`,
      verifiedInSample: "Gecontroleerd in deze steekproef",
      notMeasuredCount: (count: number) => ` · ${count} niet gemeten`,
      pageCheckResult: (
        failed: number,
        evaluated: number,
        unevaluated: number,
      ) =>
        failed
          ? `${failed} ${failed === 1 ? "beoordeling vraagt" : "beoordelingen vragen"} een review · ${evaluated} gekwalificeerde resultaten${unevaluated ? ` · ${unevaluated} niet gemeten` : ""}`
          : `${evaluated} gekwalificeerde resultaten geslaagd${unevaluated ? ` · ${unevaluated} niet gemeten` : ""}`,
      health: (score: number) => `Kwaliteit ${score}/100`,
      needAttentionOf: (failed: number, total: number) =>
        `${failed} van ${total} vragen aandacht`,
      openReport: "Open het paginarapport",
      reportUnavailable: "Rapport niet beschikbaar",
    },
    deeper: {
      eyebrow: "Volgende · volledige audit",
      title: "Bevestig je e-mailadres voordat we de volledige audit starten.",
      intro:
        "We vonden hierboven de eerste kansen. Eén klik in je inbox start de diepere pagina-audit en AI-review, inclusief wat ChatGPT en Google AI Mode shoppers vertellen.",
      assurances: ["Gratis", "Geen account", "Eén e-mail, geen mailinglijst"],
      aiPages: "AI-review per pagina",
      aiPagesDetail:
        "Open een productpaginarapport en AI loopt de pagina door naast de inzichten hierboven, en schrijft daarna concrete verbeteringen terug, samen met de paginatekst waarop ze gebaseerd zijn.",
      shopperAnswers: "ChatGPT + Google AI Mode",
      shopperAnswersDetail: (count: number) =>
        `Vragen opgesteld op basis van ${count === 1 ? "het product" : `de ${count} producten`} die we net lazen, voorgelegd aan ChatGPT en Google AI Mode, met de antwoorden vastgelegd.`,
      alternatives: "Concurrenten die in plaats van jou verschijnen",
      alternativesDetail:
        "De concurrerende merken en producten die op jouw plek verschijnen.",
    },
    email: {
      sentTo: (email: string) => `Verstuurd naar ${email}`,
      completeTitle: "Je link staat in je inbox.",
      continueTitle: "Bevestig hem om de volledige audit te starten.",
      completeBody:
        "Niets op deze pagina verdwijnt. De link opent dezelfde audit wanneer je hem terug wilt.",
      continueBody:
        "Klik op de link in je inbox en we starten de audit per pagina, de AI-review en de checks met shoppervragen. Deze pagina blijft staan terwijl ze lopen.",
      differentEmail: "Naar een ander e-mailadres sturen",
      label: "Zakelijk e-mailadres",
      runningLabel: "Start de volledige audit",
      completeLabel: "Bewaar deze audit",
      completeIntro: (domain: string) =>
        `De audit voor ${domain} is klaar. Laat een adres achter en we sturen je de link, zodat je hem kunt openen en bewaren.`,
      runningIntro: (domain: string) =>
        `We vonden de eerste kansen op ${domain}. Bevestig je e-mailadres om de diepere pagina-audit, AI-review en checks in ChatGPT + Google AI Mode te starten.`,
      placeholder: "jij@bedrijf.nl",
      sending: "Versturen…",
      send: "Versturen",
      runningCta: "Bevestigingslink versturen",
      completeCta: "Mail me de audit",
      assurances: [
        "Geen account",
        "Geen creditcard",
        "Eén e-mail, geen mailinglijst",
      ],
      sent: "E-mail verstuurd",
      clickContinue: "Eén klik in je inbox start de volledige audit.",
      openSent: (email: string) =>
        `Open de link die we naar ${email} stuurden. Niets op deze pagina verdwijnt intussen. Je kunt verder lezen of er later op terugkomen.`,
      sendAgain: "Opnieuw versturen",
      differentAddress: "Een ander adres gebruiken",
      confirmTitle: "Bevestig je e-mailadres om de volledige audit te starten",
      confirmBody:
        "We sturen één link. Klik erop om te starten: geen account, geen creditcard, geen mailinglijst.",
      addEmail: "Voeg je e-mailadres toe",
      privacyPrefix: "Bekijk ons",
      privacy: "privacybeleid",
    },
    errors: {
      scanDomain: "We konden dat domein niet scannen.",
      serviceUnavailable: "De scanservice is op dit moment niet beschikbaar.",
      missingToken:
        "Die verificatielink mist zijn token. Start of hervat je scan hieronder.",
      usedToken:
        "Die verificatielink is ongeldig of al gebruikt. Start de scan opnieuw als je een nieuwe link nodig hebt.",
      verifyUnavailable:
        "We konden die link nu niet verifiëren. Probeer de link uit je e-mail opnieuw.",
      enterDomain: "Vul het domein van je webshop in.",
      enterEmail: "Vul je zakelijke e-mailadres in.",
      invalidEmail: "Vul een geldig zakelijk e-mailadres in.",
      ownDomain: "Vul het domein van je eigen webshop in.",
      rateLimited:
        "Er zijn nu te veel scanverzoeken. Probeer het zo meteen opnieuw.",
      sendEmail: "We konden de verificatie-e-mail niet versturen.",
      sendEmailNow: "We konden de verificatie-e-mail nu niet versturen.",
      retryNeedsEmail: "Bevestig je e-mailadres voordat je de volledige audit opnieuw probeert.",
      retryLimit: "Deze audit heeft alle automatische nieuwe pogingen al gebruikt.",
      noScanYet: "Er is nog geen scan voor dit domein.",
      scansPaused: "Scans zijn tijdelijk gepauzeerd. Probeer het later opnieuw.",
      retrying: "Opnieuw proberen…",
      tryAgain: "Opnieuw proberen",
      pollExhausted:
        "Deze audit duurt langer dan verwacht. We bewaren het bewijs dat al gevonden is en stoppen met een eindeloze laadindicator als de worker gestopt is.",
      auditDidNotFinish: "Deze audit is niet afgerond.",
      auditDidNotFinishBody:
        "De resultaten die al getoond worden, blijven beschikbaar. Probeer alleen de onafgeronde checks opnieuw — je hoeft je e-mailadres niet opnieuw te bevestigen.",
      retryAudit: "Onafgeronde checks opnieuw proberen",
      retryAuditRunning: "Audit wordt opnieuw geprobeerd…",
      running: "Bezig…",
      runAgain: "Opnieuw uitvoeren",
      rejectedTitle: (domain: string) => `We konden ${domain} niet lezen.`,
      blockedExplanation:
        "Je webshop weigerde ons verzoek. Dat komt meestal door een firewall of botbeveiliging, en het betekent niet dat er iets mis is met je webshop.",
      noProductsExplanation:
        "We bereikten de site, maar vonden er geen openbare productpagina's. Dat gebeurt bij webshops die producten pas na inloggen tonen, of die helemaal geen webshop zijn.",
      genericExplanation:
        "Het domein reageerde niet op een openbaar verzoek. Het is misschien verkeerd gespeld, geparkeerd of tijdelijk offline.",
      blockedSuggestions: [
        "Controleer of het domein de webshop is die shoppers gebruiken, en geen staging- of beheeradres.",
        "Vraag wie de webshop beheert of botbeveiliging externe lezers blokkeert. Dezelfde regel blokkeert meestal ook zoekmachines.",
      ],
      noProductsSuggestions: [
        "Probeer het domein waarop shoppers echt producten bekijken, inclusief een eventueel marktvoorvoegsel.",
        "Als je producten alleen na inloggen zichtbaar zijn, kan een openbare scan ze niet bereiken, maar we kunnen ze samen met je bekijken.",
      ],
      genericSuggestions: [
        "Controleer de spelling, en probeer het zonder www of een pad erachter.",
        "Als de site live is in je browser, wacht dan even en probeer het opnieuw.",
      ],
      reported: (reason: string) => `Wat de scan meldde: ${reason}`,
      continueCta: "Koppel deze webshop in Beseam",
      reviewCta: "Hulp krijgen met deze webshop",
    },
  },
  scan: {
    eyebrow: "Gratis webshopscan",
    heading:
      "Zie wat je producten moeilijker maakt om te vinden, te kiezen of te kopen.",
    intro:
      "Vul het domein van je webshop in. Beseam leest de openbare webshop en laat zien waar producten gemist kunnen worden, lastig te vergelijken zijn of het kopen bemoeilijken, met bewijs en wat je eerst oplost.",
    duration: "Meestal ongeveer een minuut.",
    promiseBody:
      "We lezen je openbare webshop zoals een zoekmachine of een AI-assistent dat doet: je productpagina's, je catalogusdata en je site-instellingen. We mailen je de link naar je audit, zodat je ziet wat zij kunnen zien en wat je eerst oplost. Het is geen zoekwoordenrapport. We meten geen zoekvolume, en shoppervragen komen later, niet hier.",
    assurances: [
      "Geen account, geen creditcard",
      "Alleen openbare webshoppagina's",
      "Geen toegang tot je webshop",
    ],
    formNote: {
      line: "De gratis scan leest je webshop één keer.",
      loop: "Beseam: Vinden → Voorbereiden → Goedkeuren → Toepassen → Meten",
    },
    form: {
      domainLabel: "Domein van je webshop",
      websiteHoneypot: "Website",
      domainPlaceholder: "jouwwebshop.nl",
      submit: "Scan mijn webshop",
      submitting: "Je webshop wordt gelezen…",
      again: "Een andere webshop scannen",
      startNote:
        "Start meteen. We vragen pas om je e-mailadres als de eerste inzichten op je scherm staan.",
    },
    contentsHeading: "Wat we controleren",
    scopeNote: "Alleen de openbare webshop · geen toegang tot je webshop",
    contents: [
      {
        label: "Je webshop",
        detail:
          "Robots-bestand, sitemap en of zoek- en AI-crawlers überhaupt binnen mogen.",
      },
      {
        label: "Je catalogusdata",
        detail:
          "Categorieën, merk, beschrijvingen, afbeeldingen, variantopties, SKU's en barcodes, beschikbaarheid, duplicaten.",
      },
      {
        label: "Je productpagina's",
        detail:
          "We lezen een steekproef van pagina's volledig en vergelijken ze met je catalogus: namen, prijzen en voorraad die niet kloppen.",
      },
      {
        label: "Een voorbeeld-AI-antwoord",
        detail:
          "Eén blik op hoe assistenten je webshop vandaag beschrijven. Hier één keer gevraagd; in de app volgens een planning.",
      },
    ],
    notKeywordReport:
      "Elk inzicht noemt de producten erachter en linkt naar de pagina's die we lazen. Het is geen zoekwoordenrapport. We meten geen zoekvolume, en shoppervragen komen later, niet hier.",
    returnsHeading: "Wat je terugkrijgt",
    returns: [
      {
        term: "Wat we kunnen vinden",
        detail:
          "Hoeveel van je producten openbaar zijn, plus een steekproef van productpagina's die we van begin tot eind lazen.",
      },
      {
        term: "Waar shoppers kunnen afhaken",
        detail:
          "In gewone taal: welke producten overgeslagen kunnen worden, lastig te kiezen zijn of lastig te kopen.",
      },
      {
        term: "Wat je eerst oplost",
        detail:
          "Eén volgende stap per inzicht, met het bewijs eronder. Een openbare scan kan geen omzeteffect bewijzen, en dat beweren we ook niet.",
      },
    ],
    once: "Deze scan leest je webshop één keer. Beseam blijft controleren en bewijst wat er veranderde.",
    continuous: "Zie wat er doorlopend draait →",
    beyond: {
      eyebrow: "Na de gratis scan",
      heading: "Een scan vindt het gat. Beseam blijft werken nadat je weggaat.",
      body: "Laat dezelfde shoppervragen doorlopen, maak van de sterkste inzichten voorbereide wijzigingen, keur goed wat klanten te zien krijgen en controleer het bewijs opnieuw na elke wijziging.",
      review:
        "Of breng je webshop naar een review van twintig minuten, en we gebruiken één echt inzicht om te laten zien wat Beseam vond, wat het zou veranderen en wat het daarna opnieuw controleert.",
      start: "Gratis starten met mijn webshop",
      book: "Plan een webshopreview van 20 minuten",
    },
  },
};
