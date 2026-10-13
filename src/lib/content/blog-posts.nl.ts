import type { BlogPost } from "@/lib/blog-posts";

/** Dutch blog posts (informal "je"). */
export const BLOG_POSTS_NL: readonly BlogPost[] = [
  {
    slug: "get-products-recommended-by-chatgpt",
    title:
      "Zo laat je ChatGPT en andere AI-assistenten je producten aanbevelen",
    metaTitle: "Je producten laten aanbevelen door ChatGPT (gids 2026)",
    metaDescription:
      "Een praktische gids voor webwinkels: hoe ChatGPT en Gemini kiezen welke producten ze aanbevelen, en vijf stappen om in AI-antwoorden te komen.",
    excerpt:
      "Hoe AI-assistenten kiezen welke producten ze aanbevelen, en de vijf stappen die je webwinkel in hun antwoorden brengen.",
    summary:
      "AI-assistenten bevelen producten aan die ze kunnen vinden, begrijpen en vertrouwen. Wil je aanbevolen worden, zorg dan dat assistenten je winkel kunnen bereiken (productfeeds en crawlertoegang), geef elke productpagina de concrete feiten waar klanten naar vragen, publiceer content die koopvragen beantwoordt, houd prijzen en voorraad correct, en volg de vragen die je wilt winnen.",
    published: "2026-10-11",
    updated: "2026-10-11",
    readingMinutes: 8,
    image: {
      src: "/images/blog/get-products-recommended-by-chatgpt.nl.svg",
      og: "/images/blog/get-products-recommended-by-chatgpt.nl.png",
      alt: "Illustratie van een klant die een AI-assistent om waterdichte laarzen vraagt, en de assistent die het product van een webwinkel aanbeveelt.",
    },
    keywords: [
      "producten laten aanbevelen door ChatGPT",
      "ChatGPT shopping",
      "AI-zoekoptimalisatie voor e-commerce",
      "AI-productaanbevelingen",
      "generative engine optimization",
    ],
    sections: [
      {
        id: "why-it-matters",
        heading: "Waarom zijn AI-aanbevelingen belangrijk voor webwinkels?",
        blocks: [
          {
            type: "p",
            text: "Steeds meer klanten vragen een AI-assistent wat ze moeten kopen, in plaats van door zoekresultaten te scrollen. De assistent antwoordt met een korte lijst producten, en vaak klikt de klant direct door naar een daarvan. Staan jouw producten niet in die lijst, dan ben je geen onderdeel van de beslissing.",
          },
          {
            type: "p",
            text: "Het verkeer is nog klein naast zoekmachines en advertenties, maar het groeit snel en het converteert. Volgens data van Adobe over Amerikaanse webwinkels lag het aantal bezoeken via AI-assistenten in juli 2026 62% hoger dan een jaar eerder, converteerden die bezoekers 60% beter dan ander verkeer en leverden ze 53% meer omzet per bezoek op. In maart 2025 converteerde hetzelfde verkeer nog 38% slechter.",
          },
          {
            type: "callout",
            title: "Wat dit betekent",
            text: "AI wordt een eigen verkoopkanaal. Winkels die nu worden aanbevolen, bouwen een voorsprong op die later moeilijk in te halen is.",
          },
        ],
      },
      {
        id: "how-assistants-choose",
        heading: "Hoe bepaalt ChatGPT welke producten het aanbeveelt?",
        blocks: [
          {
            type: "p",
            text: "OpenAI zegt dat zijn productresultaten onafhankelijk worden geselecteerd en geen advertenties zijn, dus je kunt niet betalen om erin te komen. In het helpcentrum noemt OpenAI de factoren waarop het verkopers voor een product rangschikt: **beschikbaarheid, prijs, kwaliteit, en of een verkoper de maker of hoofdverkoper** van het artikel is. OpenAI zegt ook dat die factoren zich verder zullen ontwikkelen.",
          },
          {
            type: "p",
            text: "Achter de schermen combineren assistenten twee soorten informatie: gestructureerde productdata uit feeds en catalogi van verkopers, en wat ze op het open web lezen, waaronder je productpagina's, reviews en artikelen. Andere assistenten werken op dezelfde manier: ze moeten je product vinden, begrijpen wat het is en voor wie, en erop kunnen vertrouwen dat de feiten kloppen.",
          },
          {
            type: "table",
            head: [
              "Wat de assistent nodig heeft",
              "Waar het vandaan komt",
              "Wat jij in de hand hebt",
            ],
            rows: [
              [
                "Je product vinden",
                "Productfeeds, catalogusintegraties, crawlers",
                "Feedinstellingen, crawlertoegang, sitemap",
              ],
              [
                "Het begrijpen",
                "Productpagina's, productdata, gestructureerde data",
                "Beschrijvingen, kenmerken, schema",
              ],
              [
                "Het vertrouwen",
                "Kloppende prijzen en voorraad, reviews, andere bronnen",
                "Juiste data, reviews, content",
              ],
            ],
          },
        ],
      },
      {
        id: "step-1-access",
        heading: "Stap 1: Zorg dat AI-assistenten je producten kunnen bereiken",
        blocks: [
          {
            type: "p",
            text: "Assistenten kunnen alleen aanbevelen wat ze kunnen lezen. Begin met twee controles.",
          },
          {
            type: "ul",
            items: [
              "**Productfeeds en catalogi.** OpenAI zegt dat Shopify-productdata al via Shopify Catalog in ChatGPT is geïntegreerd, zonder extra werk voor individuele verkopers. Verkopers op andere platforms kunnen zich aanmelden om direct een productfeed te sturen. Controleer in je Shopify-beheer onder Verkoopkanalen welke AI-kanalen voor je winkel actief zijn, want de beschikbaarheid verschilt per kanaal en land.",
              "**Crawlertoegang.** AI-bedrijven gebruiken hun eigen crawlers, zoals OAI-SearchBot van OpenAI. Botbescherming, firewallregels of een oude regel in robots.txt kunnen ze blokkeren zonder dat iemand het merkt. Controleer of de crawlers van de assistenten die voor jou belangrijk zijn je product- en categoriepagina's kunnen bereiken.",
            ],
          },
        ],
      },
      {
        id: "step-2-product-pages",
        heading:
          "Stap 2: Geef elke productpagina de feiten waar klanten naar vragen",
        blocks: [
          {
            type: "p",
            text: "Klanten stellen assistenten concrete vragen: ‘waterdichte laarzen voor woon-werkverkeer, brede pasvorm’ of ‘parfumvrije crème voor een gevoelige huid’. Een assistent kan je product alleen aan die vraag koppelen als je pagina die feiten duidelijk noemt.",
          },
          {
            type: "ul",
            items: [
              "Zeg waarvoor het product is en bij wie het past, niet alleen wat het is.",
              "Noem de kenmerken waarop klanten vergelijken: maat en pasvorm, materialen, ingrediënten, specificaties, compatibiliteit.",
              "Vervang marketingzinnen als ‘perfect voor elke gelegenheid’ door feiten.",
              "Zet dezelfde feiten ook in je productdata, niet alleen in de beschrijving.",
            ],
          },
          {
            type: "p",
            text: "Onze gids over [productbeschrijvingen die AI-assistenten aanbevelen](/blog/product-descriptions-for-ai-search) laat stap voor stap zien hoe je dit doet, met voor-en-na-voorbeelden.",
          },
        ],
      },
      {
        id: "step-3-content",
        heading:
          "Stap 3: Publiceer content voor de vragen die klanten uitzoeken",
        blocks: [
          {
            type: "p",
            text: "Veel koopvragen gaan niet over één product. Klanten vragen assistenten om te vergelijken, uit te leggen en te helpen kiezen: ‘trail- of wegschoenen’, ‘wat trek ik aan naar een zomerbruiloft’, ‘minerale of chemische zonnebrand’. Assistenten beantwoorden die vragen met pagina's die uitleggen en vergelijken.",
          },
          {
            type: "ul",
            items: [
              "**Categoriepagina's** met een korte, concrete introductie over wat erin zit en voor wie.",
              "**Vergelijkingen** tussen producttypes of modellen die je verkoopt.",
              "**Koopgidsen** over maat, pasvorm, materialen of hoe je kiest.",
            ],
          },
          {
            type: "p",
            text: "Bouw elke pagina rond je eigen producten, en beantwoord de vraag in de eerste alinea. Assistenten geven de voorkeur aan pagina's die snel to the point komen.",
          },
        ],
      },
      {
        id: "step-4-accuracy",
        heading:
          "Stap 4: Houd prijzen, voorraad en gestructureerde data correct",
        blocks: [
          {
            type: "p",
            text: "Beschikbaarheid en prijs staan niet voor niets op de lijst van rankingfactoren van OpenAI: een assistent wil geen klant naar een uitverkocht product of een verkeerde prijs sturen. Zorg dat je gestructureerde data, productfeed en zichtbare pagina voor elke variant overeenkomen in prijs en voorraad. Dubbele gestructureerde data van een thema en een app is bij Shopify-winkels een veelvoorkomende oorzaak van conflicten.",
          },
        ],
      },
      {
        id: "step-5-track",
        heading: "Stap 5: Volg de vragen die je wilt winnen",
        blocks: [
          {
            type: "p",
            text: "Wat je niet meet, kun je niet verbeteren. Maak een lijst van 20 tot 50 vragen die je klanten stellen, per categorie en behoefte, en stel ze regelmatig in ChatGPT, Gemini, Google AI Mode, Perplexity, Copilot en Claude. Noteer welke producten worden aanbevolen, welke van jou ontbreken, en wie er in plaats daarvan verschijnt.",
          },
          {
            type: "p",
            text: "Koppel het daarna aan omzet: onze gids [Zo meet je AI-verkeer en omzet in GA4 en Shopify](/blog/track-ai-traffic-ga4-shopify) laat zien hoe je ziet wat bezoekers uit AI-assistenten kopen.",
          },
          {
            type: "callout",
            title: "Voor je hele catalogus",
            text: "Honderden producten en vragen met de hand controleren is niet realistisch. [Beseam](/product/ai-visibility-tracking) volgt je producten in zes AI-assistenten, vindt wat ze uit antwoorden houdt, en rangschikt de verbeteringen op verwachte omzetimpact.",
          },
        ],
      },
    ],
    faqs: [
      {
        question:
          "Kan ik betalen om mijn producten door ChatGPT te laten aanbevelen?",
        answer:
          "Nee. OpenAI zegt dat zijn productresultaten onafhankelijk worden geselecteerd en geen advertenties zijn. Of je erin komt, hangt af van relevantie en van factoren als beschikbaarheid, prijs, kwaliteit en of je de maker of hoofdverkoper bent.",
      },
      {
        question: "Heb ik een productfeed nodig om in ChatGPT te verschijnen?",
        answer:
          "Niet altijd. OpenAI zegt dat Shopify-productdata al via Shopify Catalog is geïntegreerd. Verkopers op andere platforms kunnen zich aanmelden om een productfeed in te dienen. Een feed maakt de data nauwkeuriger, maar garandeert geen aanbeveling.",
      },
      {
        question: "Hoe lang duurt het voordat mijn producten verschijnen?",
        answer:
          "Er is geen vaste termijn. Het hangt af van hoe vaak elke assistent zijn data bijwerkt en hoe goed je producten aansluiten op de vragen van klanten. Volg dezelfde vragen in de loop van de tijd om te zien wanneer je producten beginnen te verschijnen.",
      },
      {
        question: "Is AI-zoekoptimalisatie iets anders dan SEO?",
        answer:
          "Het bouwt voort op dezelfde basis: crawlbare pagina's, duidelijke content en gestructureerde data. Het verschil zit in het doel. In plaats van een pagina in een lijst links te laten scoren, wil je dat een assistent je product kiest als een van een paar aanbevelingen, en dat beloont concrete productfeiten en correcte data.",
      },
      {
        question: "Welke AI-assistenten zijn het belangrijkst voor webwinkels?",
        answer:
          "ChatGPT is de grootste, maar klanten gebruiken ook Gemini en Google AI Mode, Microsoft Copilot, Perplexity en Claude. Elk gebruikt andere bronnen, dus het loont om ze naast elkaar te volgen.",
      },
    ],
    sources: [
      {
        label: "OpenAI Help Center: Shopping with ChatGPT search",
        url: "https://help.openai.com/en/articles/11128490-shopping-with-chatgpt-search",
      },
      {
        label: "OpenAI: Power product discovery in ChatGPT (verkopers)",
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
        label: "Digital Commerce 360: Adobe-data over AI-verkeer, juli 2026",
        url: "https://www.digitalcommerce360.com/2026/08/19/adobe-ai-referral-traffic-data-july-2026/",
      },
    ],
  },
  {
    slug: "product-descriptions-for-ai-search",
    title: "Zo schrijf je productbeschrijvingen die AI-assistenten aanbevelen",
    metaTitle: "Productbeschrijvingen voor AI: checklist en voorbeelden",
    metaDescription:
      "Schrijf productbeschrijvingen die ChatGPT en andere AI-assistenten aan vragen van klanten koppelen. Met checklist, voorbeelden en veelgemaakte fouten.",
    excerpt:
      "Een checklist en voor-en-na-voorbeelden voor productbeschrijvingen die AI-assistenten aan echte koopvragen kunnen koppelen.",
    summary:
      "AI-assistenten bevelen producten aan waarvan de pagina de vraag van de klant beantwoordt. Een beschrijving die werkt voor AI noemt het gebruik, voor wie het product is, de kenmerken waarop klanten vergelijken, en advies over maat of compatibiliteit, in gewone taal. Vervang marketingzinnen door feiten, en zet dezelfde feiten in je productdata.",
    published: "2026-10-10",
    updated: "2026-10-10",
    readingMinutes: 7,
    image: {
      src: "/images/blog/product-descriptions-for-ai-search.nl.svg",
      og: "/images/blog/product-descriptions-for-ai-search.nl.png",
      alt: "Illustratie van een vage productbeschrijving naast een concrete, voor AI geoptimaliseerde versie met uitgelichte feiten.",
    },
    keywords: [
      "productbeschrijvingen voor AI-zoekopdrachten",
      "AI-geoptimaliseerde productbeschrijvingen",
      "checklist productbeschrijving",
      "productbeschrijvingen voor ChatGPT",
      "e-commerce productcontent",
    ],
    sections: [
      {
        id: "why-descriptions-matter",
        heading:
          "Waarom zijn productbeschrijvingen belangrijk voor AI-zoekopdrachten?",
        blocks: [
          {
            type: "p",
            text: "Als een klant een AI-assistent vraagt om ‘trailschoenen voor brede voeten onder €150’, moet de assistent bepalen welke producten passen. Dat kan alleen met feiten: is de schoen gemaakt voor trails, is er een brede pasvorm, wat kost hij? Staat dat niet in je beschrijving, dan kan de assistent je product niet koppelen, hoe goed het ook is.",
          },
          {
            type: "p",
            text: "Zoekmachines konden een pagina rangschikken op zoekwoorden en links. AI-assistenten lezen je pagina zoals een oplettende klant en kiezen een handvol producten die duidelijk passen. Dat beloont concrete, complete productinformatie meer dan ooit.",
          },
        ],
      },
      {
        id: "what-ai-looks-for",
        heading: "Waar let een AI-assistent op in een productbeschrijving?",
        blocks: [
          {
            type: "ol",
            items: [
              "**Het gebruik.** Waarvoor het product is: trailrunning, een zomerbruiloft, de hele dag staan, fotobewerking.",
              "**Voor wie het is.** Brede voeten, een gevoelige huid, lange mannen, beginners, kleine kamers.",
              "**De kenmerken waarop klanten vergelijken.** Materialen, ingrediënten, afmetingen, specificaties, accuduur, gewicht.",
              "**Advies over maat of compatibiliteit.** Valt klein of normaal; werkt met iOS en Android.",
              "**Wat het onderscheidt.** Eén of twee concrete feiten, geen superlatieven.",
              "**Praktische details.** Onderhoud, wat er in de doos zit, certificeringen.",
            ],
          },
        ],
      },
      {
        id: "examples",
        heading: "Voor en na: drie voorbeelden",
        blocks: [
          { type: "h3", text: "Schoenen" },
          {
            type: "table",
            head: ["Voor", "Na"],
            rows: [
              [
                "Onze populairste hardloopschoen. Stijlvol, comfortabel en perfect voor elke run!",
                "Een waterdichte trailschoen met een brede teenbox en 8 mm drop, gemaakt voor natte en modderige paden. EU 38–47, in normale en brede pasvorm. Valt normaal.",
              ],
            ],
          },
          { type: "h3", text: "Beauty" },
          {
            type: "table",
            head: ["Voor", "Na"],
            rows: [
              [
                "Ons iconische glow-serum. Een klein flesje magie voor een stralende huid.",
                "Een serum met 15% vitamine C en hyaluronzuur voor een doffe, ongelijkmatige huid. Licht en parfumvrij, voor een normale tot gecombineerde huid. 's Ochtends aanbrengen, vóór de zonnebrand.",
              ],
            ],
          },
          { type: "h3", text: "Elektronica" },
          {
            type: "table",
            head: ["Voor", "Na"],
            rows: [
              [
                "Beleef geluid zoals nooit tevoren. Premium audio en de hele dag comfort.",
                "Over-ear koptelefoon met actieve noise cancelling en tot 50 uur accuduur met ANC aan. Bluetooth 5.3, multipoint-verbinding met iOS en Android, snelladen via USB-C.",
              ],
            ],
          },
          {
            type: "p",
            text: "In elk voorbeeld beantwoordt de ‘na’-versie de vragen die een klant aan een assistent zou stellen. Meer voorbeelden per branche vind je op onze pagina's voor [schoenen](/solutions/footwear), [mode](/solutions/fashion-apparel), [beauty](/solutions/beauty-cosmetics) en [elektronica](/solutions/consumer-electronics).",
          },
        ],
      },
      {
        id: "how-to-write",
        heading:
          "Zo schrijf je stap voor stap een AI-klare productbeschrijving",
        blocks: [
          {
            type: "ol",
            items: [
              "**Verzamel de vragen.** Schrijf vijf vragen op die klanten stellen voordat ze dit product kopen. Kijk in mails aan je klantenservice en in reviews voor de echte bewoordingen.",
              "**Begin met het antwoord.** Start met één zin die zegt wat het product is, waarvoor het is en bij wie het past.",
              "**Voeg de vergelijkingsfeiten toe.** Materialen, maten, specificaties: de kenmerken waarmee een klant tussen twee producten kiest.",
              "**Geef advies.** Maat, pasvorm, compatibiliteit of gebruik, in gewone woorden.",
              "**Schrap de vulling.** Haal zinnen weg die bij elk product zouden passen, zoals ‘hoogwaardig’ of ‘perfect voor iedereen’.",
              "**Laat je productdata aansluiten.** Zet dezelfde feiten in je productkenmerken en gestructureerde data, voor elke variant.",
            ],
          },
          {
            type: "callout",
            title: "Houd het leesbaar",
            text: "Schrijven voor AI betekent niet schrijven voor robots. Assistenten belonen hetzelfde als klanten: duidelijke, concrete informatie. Een beschrijving die vragen beantwoordt, converteert ook op je eigen site beter.",
          },
        ],
      },
      {
        id: "mistakes",
        heading: "Veelgemaakte fouten die producten uit AI-antwoorden houden",
        blocks: [
          {
            type: "ul",
            items: [
              "**Leveranciersbeschrijvingen ongewijzigd overgenomen.** Ze zijn gelijk aan die van honderden andere winkels en beantwoorden zelden de vragen van klanten.",
              "**Belangrijke feiten alleen in afbeeldingen.** Maattabellen en ingrediëntenlijsten als afbeelding zijn moeilijk te lezen voor AI. Zet ze in de tekst.",
              "**Pasvormadvies alleen in reviews.** Staat ‘neem een maat kleiner’ alleen in reviews, noem het dan in de beschrijving.",
              "**Beschrijving en data spreken elkaar tegen.** Als de tekst iets anders zegt dan de productdata, vertrouwen assistenten geen van beide.",
              "**Zoekwoorden stapelen.** Een woord herhalen helpt een assistent niet om het product te begrijpen. Feiten wel.",
            ],
          },
        ],
      },
      {
        id: "at-scale",
        heading: "Hoe doe je dit voor een hele catalogus?",
        blocks: [
          {
            type: "p",
            text: "Begin met de producten die het meest tellen: je bestsellers en de producten die het dichtst bij belangrijke koopvragen zitten. Verbeter die eerst, meet het effect, en werk daarna de lijst af.",
          },
          {
            type: "p",
            text: "[Productbeschrijvingen optimaliseren met Beseam](/product/product-descriptions) doet dit voor je: het vindt ontbrekende feiten in je hele catalogus, stelt betere beschrijvingen en productdata voor, en rangschikt ze op verwachte omzetimpact, zodat je eerst de wijzigingen goedkeurt die het meest opleveren.",
          },
        ],
      },
    ],
    faqs: [
      {
        question:
          "Hoe lang moet een productbeschrijving voor AI-zoekopdrachten zijn?",
        answer:
          "Lang genoeg om de vragen van klanten te beantwoorden, en niet langer. Voor de meeste producten zijn dat twee tot vier korte alinea's, of een korte alinea plus een lijst met de belangrijkste feiten. Volledigheid telt meer dan lengte.",
      },
      {
        question:
          "Moet ik aparte beschrijvingen schrijven voor AI en voor klanten?",
        answer:
          "Nee. AI-assistenten lezen dezelfde pagina als je klanten, en allebei belonen ze duidelijke, concrete feiten. Eén goede beschrijving werkt voor allebei.",
      },
      {
        question:
          "Kan ik AI gebruiken om mijn productbeschrijvingen te schrijven?",
        answer:
          "Ja, zolang de feiten kloppen. AI kan helpen om beschrijvingen op grote schaal te structureren en te herschrijven, maar elke claim, maat en specificatie moet je controleren met je echte productdata voordat het live gaat.",
      },
      {
        question:
          "Hebben productbeschrijvingen ook invloed op Google-posities?",
        answer:
          "Duidelijke, concrete en originele productinformatie wordt door zoekmachines en AI-assistenten allebei beloond, dus betere beschrijvingen voor AI en voor Google wijzen dezelfde kant op.",
      },
      {
        question: "Welke producten moet ik als eerste optimaliseren?",
        answer:
          "Begin met bestsellers en met producten in categorieën waarin klanten assistenten om advies vragen, zoals schoenen, beauty en elektronica. Daar levert een betere koppeling de meeste omzet op.",
      },
    ],
    sources: [
      {
        label: "OpenAI Help Center: Shopping with ChatGPT search",
        url: "https://help.openai.com/en/articles/11128490-shopping-with-chatgpt-search",
      },
      {
        label: "Google Search Central: Gestructureerde data voor producten",
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
    title: "Zo meet je AI-verkeer en omzet in GA4 en Shopify",
    metaTitle: "AI-verkeer en omzet meten in GA4 en Shopify",
    metaDescription:
      "Zie hoeveel bezoekers en omzet ChatGPT, Gemini, Perplexity en andere AI-assistenten je webwinkel opleveren, met het AI Assistant-kanaal in GA4.",
    excerpt:
      "Gebruik het nieuwe AI Assistant-kanaal in GA4 en een eigen kanaalgroep om te zien hoeveel verkeer en omzet AI-assistenten je webwinkel opleveren.",
    summary:
      "GA4 groepeert bezoeken van AI-assistenten zoals ChatGPT, Gemini en Copilot nu in een standaardkanaal ‘AI Assistant’. Voor het volledige beeld voeg je een eigen kanaalgroep toe die ook Perplexity en Claude meeneemt, zorg je dat Shopify aankoopgebeurtenissen naar GA4 stuurt, en vergelijk je omzet en conversieratio per kanaal. Reken op een onderschatting: sommige AI-bezoeken komen zonder referrer binnen en verschijnen als Direct.",
    published: "2026-10-09",
    updated: "2026-10-09",
    readingMinutes: 7,
    image: {
      src: "/images/blog/track-ai-traffic-ga4-shopify.nl.svg",
      og: "/images/blog/track-ai-traffic-ga4-shopify.nl.png",
      alt: "Illustratie van een analyticsrapport met een rij voor het AI Assistant-kanaal en stijgende omzetbalken.",
    },
    keywords: [
      "AI-verkeer meten in GA4",
      "ChatGPT-verkeer Google Analytics",
      "GA4 AI Assistant-kanaal",
      "AI-verkeer Shopify",
      "omzet uit AI-zoekopdrachten meten",
    ],
    sections: [
      {
        id: "why-track",
        heading: "Waarom zouden webwinkels AI-verkeer apart moeten meten?",
        blocks: [
          {
            type: "p",
            text: "Bezoekers uit AI-assistenten gedragen zich anders dan andere bezoekers. Volgens data van Adobe over Amerikaanse webwinkels converteerden ze in juli 2026 60% beter dan ander verkeer en leverden ze 53% meer omzet per bezoek op. Als dat verkeer is vermengd met Referral of Direct, kun je het niet zien, niet waarderen en niet laten groeien.",
          },
          {
            type: "p",
            text: "Apart meten beantwoordt drie vragen: hoeveel bezoekers AI-assistenten je sturen, op welke pagina's ze landen, en hoeveel ze kopen.",
          },
        ],
      },
      {
        id: "ga4-ai-assistant-channel",
        heading: "Wat is het AI Assistant-kanaal in GA4?",
        blocks: [
          {
            type: "p",
            text: "In mei 2026 voegde Google een kanaal ‘AI Assistant’ toe aan de standaard kanaalgroep van GA4. Sessies van herkende AI-assistenten worden daar automatisch gegroepeerd, op basis van waar het bezoek vandaan kwam. Het werkt zonder instellingen, maar geldt niet voor data van vóór de introductie.",
          },
          {
            type: "p",
            text: "Controleer in Googles documentatie over de standaard kanaalgroep welke assistenten erin zitten, want de lijst is sinds de lancering veranderd. Op het moment van schrijven bevat hij volgens berichten ChatGPT, Gemini, Copilot, DeepSeek en Grok, terwijl bezoeken van Perplexity nog onder Referral vallen en Googles AI Overviews als Organic Search tellen.",
          },
          {
            type: "p",
            text: "Zo vind je het: ga naar **Rapporten → Acquisitie → Verkeersacquisitie** en zoek de rij AI Assistant in de standaard kanaalgroep van de sessie.",
          },
        ],
      },
      {
        id: "custom-channel-group",
        heading: "Zo stel je een eigen AI-kanaalgroep in GA4 in",
        blocks: [
          {
            type: "p",
            text: "Omdat je de standaard kanaalgroep niet kunt aanpassen, voeg je een eigen kanaalgroep toe die elke assistent meeneemt die voor jou belangrijk is. Anders dan het standaardkanaal geldt een eigen kanaalgroep ook voor je historische data.",
          },
          {
            type: "ol",
            items: [
              "Ga naar **Beheer → Gegevensweergave → Kanaalgroepen** en maak een nieuwe kanaalgroep (of kopieer de standaardgroep).",
              "Voeg een kanaal toe met de naam **AI-assistenten**.",
              "Stel de voorwaarde in op **Sessiebron komt overeen met reguliere expressie**, met een patroon zoals: `chatgpt|openai|perplexity|claude|gemini|copilot|deepseek|grok|meta\\.ai`",
              "Zet het kanaal AI-assistenten **boven Referral**, zodat deze sessies niet als gewone verwijzingen tellen.",
              "Sla op en kies je nieuwe kanaalgroep in het rapport Verkeersacquisitie.",
            ],
          },
          {
            type: "callout",
            title: "Tip",
            text: "ChatGPT voegt vaak utm_source=chatgpt.com toe aan de links die het toont, waardoor de bezoeken makkelijk te herkennen zijn. Houd je reguliere expressie breed en controleer hem om de paar maanden, nu er steeds nieuwe assistenten bijkomen.",
          },
        ],
      },
      {
        id: "revenue",
        heading: "Zo zie je de omzet die AI-assistenten opleveren",
        blocks: [
          {
            type: "p",
            text: "Bezoeken zijn maar de helft van het verhaal. Om omzet per kanaal te zien, heeft GA4 je aankopen nodig.",
          },
          {
            type: "ol",
            items: [
              "Zorg dat je Shopify-winkel aankoopgebeurtenissen naar GA4 stuurt, bijvoorbeeld via de app Google & YouTube.",
              "Voeg in het rapport Verkeersacquisitie de statistieken **Totale opbrengst**, **Belangrijke gebeurtenissen** en **Percentage belangrijke gebeurtenissen per sessie** toe.",
              "Vergelijk het kanaal AI-assistenten met Organic Search en Paid Search op conversieratio en omzet per sessie.",
              "Voeg **Bestemmingspagina** toe als secundaire dimensie om te zien naar welke producten en pagina's AI-assistenten klanten sturen.",
            ],
          },
          {
            type: "p",
            text: "In Shopify zelf groeperen de analyticsrapporten sessies op verwijzingsbron, en de conversiegegevens van elke bestelling laten zien waar het bezoek vandaan kwam. Dat is handig voor steekproeven; voor trends over langere tijd is GA4 beter.",
          },
        ],
      },
      {
        id: "limits",
        heading: "Wat mist het meten van AI-verkeer?",
        blocks: [
          {
            type: "ul",
            items: [
              "**Bezoeken zonder referrer.** Sommige apps van assistenten openen links zonder een referrer door te geven. Heeft de link ook geen UTM-tag, dan verschijnt het bezoek als Direct.",
              "**Invloed zonder klik.** Een klant leest een aanbeveling en zoekt later naar je merk of typt je adres in. Die verkoop wordt niet aan AI toegeschreven.",
              "**AI Overviews.** Klikken uit Googles AI Overviews tellen als Organic Search, niet als AI-verkeer.",
            ],
          },
          {
            type: "p",
            text: "Zie de cijfers van je AI-kanaal daarom als een ondergrens. Een gelijktijdige stijging van direct verkeer en zoekopdrachten op je merknaam hoort vaak bij hetzelfde effect.",
          },
        ],
      },
      {
        id: "visibility",
        heading: "Verkeer is het resultaat. Zichtbaarheid is de oorzaak.",
        blocks: [
          {
            type: "p",
            text: "Analytics laat de bezoeken zien die AI-assistenten je sturen, maar niet de aanbevelingen die je hebt gemist. Om het kanaal te laten groeien, volg je bij welke koopvragen je producten verschijnen en welke concurrenten er in plaats daarvan verschijnen. Onze gids [Zo laat je ChatGPT en andere AI-assistenten je producten aanbevelen](/blog/get-products-recommended-by-chatgpt) legt uit hoe.",
          },
          {
            type: "callout",
            title: "Zie zichtbaarheid en omzet samen",
            text: "[Beseam](/product/ai-visibility-tracking) volgt je producten in zes AI-assistenten en koppelt AI-zichtbaarheid aan verkeer en omzet uit AI-assistenten, per vraag, product en landingspagina.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Meet GA4 ChatGPT-verkeer automatisch?",
        answer:
          "Grotendeels wel. Sinds mei 2026 groepeert GA4 sessies van herkende AI-assistenten, waaronder ChatGPT, in een standaardkanaal ‘AI Assistant’. Bezoeken zonder referrer verschijnen nog steeds als Direct.",
      },
      {
        question:
          "Waarom staat Perplexity-verkeer niet in het AI Assistant-kanaal?",
        answer:
          "Op het moment van schrijven staat Perplexity niet op de lijst van bronnen die GA4 als AI Assistant indeelt, dus de bezoeken verschijnen onder Referral. Een eigen kanaalgroep met een reguliere expressie op de sessiebron kan het wel meenemen.",
      },
      {
        question: "Hoeveel van mijn verkeer komt van AI-assistenten?",
        answer:
          "Bij de meeste webwinkels is het nog een klein deel van alle bezoeken, maar het groeit snel en converteert bovengemiddeld. Bekijk het kanaal AI Assistant, of je eigen kanaalgroep, in het rapport Verkeersacquisitie in GA4.",
      },
      {
        question: "Kan ik AI-verkeer zien in Shopify Analytics?",
        answer:
          "De rapporten van Shopify groeperen sessies op verwijzingsbron, dus bezoeken van chatgpt.com of perplexity.ai verschijnen daar, en de conversiegegevens van elke bestelling laten zien waar het bezoek vandaan kwam. GA4 geeft meer controle over kanaalgroepen en trends.",
      },
      {
        question: "Is het de moeite waard om voor AI-verkeer te optimaliseren?",
        answer:
          "Volgens data van Adobe over Amerikaanse webwinkels converteerden bezoekers uit AI-assistenten in juli 2026 60% beter dan ander verkeer, met 53% meer omzet per bezoek. Het kanaal is klein maar waardevol, en het groeit snel.",
      },
    ],
    sources: [
      {
        label: "Google Analytics Help: Standaard kanaalgroep",
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
        label: "Digital Commerce 360: Adobe-data over AI-verkeer, juli 2026",
        url: "https://www.digitalcommerce360.com/2026/08/19/adobe-ai-referral-traffic-data-july-2026/",
      },
    ],
  },
];
