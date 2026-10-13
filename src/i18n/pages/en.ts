/**
 * Interface copy for the content pages (product, solutions, pricing, blog,
 * report, comparisons, about, contact): headings, labels and buttons that
 * are not part of a page's own content. The page content itself lives with
 * its data in `src/lib`. German uses Swiss spelling (ss, never ß) and formal
 * "Sie"; Dutch uses informal "je".
 */
export const pagesEn = {
  common: {
    faqHeading: "Frequently asked questions",
    breadcrumb: "Breadcrumb",
    dateLocale: "en-GB",
  },
  productPage: {
    relatedProducts: "Related products",
    moreIndustries: "More industries",
    moreFromBeseam: "More from Beseam",
    explore: (name: string) => `Explore ${name}`,
    aiAssistant: "AI assistant",
    recommended: "Recommended",
    competitor: "Competitor",
  },
  pricing: {
    metaTitle: "Pricing | Beseam",
    metaDescription:
      "Simple plans for AI search optimisation, based on the size of your catalogue. Start with a 14-day free trial, then pick the plan that fits your webshop.",
    jsonLdName: "Beseam pricing",
    title: "Simple pricing that grows with your catalogue",
    intro:
      "Every plan includes all six AI assistants and starts with a 14-day free trial. Pick a plan by the size of your catalogue, and change it whenever you need.",
    billingPeriod: "Billing period",
    monthly: "Monthly",
    annual: "Annual",
    twoMonthsFree: "2 months free",
    mostPopular: "Most popular",
    perMonth: "/ month",
    billedAnnually: (amount: string) =>
      `Billed annually: ${amount} per year, excl. VAT`,
    billedMonthly: "Billed monthly, excl. VAT",
    startTrial: "Start free trial",
    everythingIn: (name: string) => `Everything in ${name}, plus:`,
    enterpriseTitle: "Enterprise",
    enterpriseBody:
      "For catalogues over 5,000 products, several brands or agencies. A custom plan with a dedicated contact and onboarding.",
    talkToUs: "Talk to us",
    compareHeading: "Compare plans",
    feature: "Feature",
    included: "Included",
    notIncluded: "Not included",
    faqHeading: "Pricing questions",
  },
  about: {
    metaTitle: "About Beseam",
    metaDescription:
      "Beseam helps webshops get their products recommended by AI assistants like ChatGPT, Claude and Gemini. Meet the founder and advisors behind it.",
    jsonLdDescription:
      "Beseam helps webshops get their products recommended by AI assistants, and turns AI into a revenue channel. Meet the founder and advisors behind it.",
    breadcrumb: "About",
    title: "Helping webshops get recommended by AI.",
    intro:
      "Beseam is the easiest way for webshops to get their products recommended by AI assistants like ChatGPT, Claude and Gemini. We track where your products show up in AI answers, optimise your product descriptions, content and technical setup, and show what it earns you, so AI becomes a revenue channel for your store.",
    swissFlag: "Swiss flag",
    builtIn: "Built in Zurich, Switzerland",
    founderEyebrow: "The founder",
    founderHeading: "Built by an engineer from Google and Amazon.",
    founderParagraphs: [
      "Beseam was founded by Pankaj Kumar, a former Google and Amazon engineer focused on measurement, reliability, and data infrastructure.",
      "For the past year, he has worked closely with ecommerce founders and operators on real stores, following the same buying journey from how products are found, through what helps shoppers choose, to where purchases stop.",
      "The same problem kept repeating: teams could measure traffic, pages, behavior, and conversion, but it was hard to see why a shopper chose one product over another. Beseam was built to keep what happened, what changed, and the result in one place.",
    ],
    founderPhotoAlt: "Pankaj Kumar, founder of Beseam",
    founderRole: "Founder, Beseam",
    advisorsHeading: "Grounded in real commerce.",
    advisorsIntro:
      "Beseam is advised by operators who have built brands, led ecommerce teams, and worked directly with the systems merchants depend on.",
    advisors: {
      bettina: {
        role: "E-commerce expert & DTC founder",
        bio: "Co-Founder of Dancing Queens and e-commerce examination expert at Handelsverband.swiss. Former Co-Managing Director at HelloFresh Suisse.",
      },
      fabrizio: {
        role: "Founder & entrepreneur",
        bio: "Founder of OLEYVO. Former Key Partner Growth Manager at Too Good To Go. Lecturer in start-up and entrepreneurship at STF.",
      },
      laura: {
        role: "Marketing & business development",
        bio: "Works in marketing and business development. Previously product owner of a B2B soft-skill coaching platform. Runs her own Swiss ecommerce brand.",
      },
    },
    teamsHeading: "Built for the people who own ecommerce growth.",
    teamsIntro:
      "Many teams affect whether a shopper buys. Beseam keeps what happened, the proposed change, your decision, and the result in one place.",
    teams: [
      {
        role: "Product content and merchandising",
        body: "See where products are hard to find or choose, then inspect the product and merchandising evidence worth changing.",
      },
      {
        role: "Ecommerce and operations",
        body: "Connect shopper behavior, store friction, approved changes, and measured outcomes around the same commercial question.",
      },
      {
        role: "Developers and agencies",
        body: "Start with supported evidence, affected scope, and a narrower implementation path instead of a generic issue report.",
      },
    ],
    ctaHeading:
      "See how Beseam follows one shopper journey from start to finish.",
    ctaBody:
      "In a 20-minute store review, we use one real finding to show how Beseam shows what it found, what it would change, and what it checks again afterward.",
    ctaButton: "Book a 20-minute store review",
  },
  contact: {
    metaTitle: "Contact | Beseam",
    metaDescription:
      "Book a 20-minute call with the Beseam team, or send a short message and hear back within one business day.",
    jsonLdName: "Contact Beseam",
    breadcrumb: "Contact",
    title: "Let’s talk about your store",
    intro:
      "Curious what Beseam could do for your webshop, or have a question first? Book a 20-minute intro call, or send us a message and we’ll get back to you within one business day.",
    callPrompt: "Prefer to talk it through? Book a 20-minute call.",
    bookCall: "Book a 20-minute call",
    formEyebrow: "Or send a message",
    formHeading: "We read every message.",
    name: "Name",
    email: "Work email",
    message: "Message",
    messagePlaceholder: "What can we help with?",
    honeypot: "Website",
    sending: "Sending…",
    send: "Send message",
    sendError:
      "We could not send your message. Please try again in a moment, or book a call instead.",
    sentEyebrow: "Message received",
    sentHeading: "We’ll reply within one business day.",
    swissFlag: "Swiss flag",
    officeEyebrow: "Our office",
    officeHeading: "Based in Zurich, Switzerland",
    officeBody:
      "We build Beseam in Zurich, between the lake and the Alps. Our calls are online, so wherever your webshop is based, we’re only a click away.",
    officeImageAlt:
      "Illustration of Zurich: the twin towers of the Grossmünster, the Fraumünster spire and old town houses on the lake, with the Alps behind.",
  },
  blog: {
    metaTitle: "Blog: AI Search for Webshops | Beseam",
    metaDescription:
      "Practical guides for webshop owners on getting products recommended by ChatGPT and other AI assistants, and turning AI into a revenue channel.",
    jsonLdName: "Beseam blog",
    breadcrumb: "Blog",
    title: "Beseam blog",
    intro:
      "Practical guides on getting your products recommended by ChatGPT and other AI assistants, and turning AI into a revenue channel.",
    minRead: (minutes: number) => `${minutes} min read`,
    readGuide: "Read the guide",
    author: "The Beseam team",
    by: (author: string) => `By ${author}`,
    updated: "Updated",
    inShort: "In short",
    onThisPage: "On this page",
    sources: "Sources",
    keepReading: "Keep reading",
  },
  compare: {
    metaTitle: "Beseam vs AI Visibility Tools: Comparisons | Beseam",
    metaDescription:
      "Compare Beseam with Profound, Peec AI, Otterly.AI, Semrush and other AI visibility tools: what each does best, and where Beseam goes further for webshops.",
    jsonLdName: "Beseam comparisons",
    breadcrumb: "Comparisons",
    title: "Compare Beseam with other AI visibility tools.",
    intro:
      "Most AI visibility tools show whether AI mentions your brand. Beseam is built for webshops: it tracks your products in AI answers, then optimises your product pages, content and technical setup, and shows what it earns you.",
    meta: "Official product sources · reviewed 22 August 2026",
    gridHeading: (count: number) => `${count} tools, side by side`,
    compare: "Compare",
    vs: (name: string) => `Beseam vs ${name}`,
    reviewed: (category: string, date: string) =>
      `${category} · reviewed ${date}`,
    choiceHeading: (name: string) => `Beseam or ${name}?`,
    chooseCompetitor: (name: string) => `Choose ${name} when`,
    chooseBeseam: "Choose Beseam when",
    useBoth: "Use both when",
    notReplace: "What Beseam does not replace",
    practiceHeading: "What changes in practice.",
    checked: (date: string) => `Checked ${date}`,
    practicalQuestion: "Practical question",
    fitHeading: "Choose the tool that fits the job.",
    chooseWhen: (name: string) => `Choose ${name} when`,
    howHeading: "Compare how each tool works.",
    question: "Question",
    workflowHeading: "What happens after the signal appears?",
    step: "Step",
    evidenceHeading: "Beseam in practice",
    faqHeading: "Before you change the stack.",
    sourcesHeading: "Sources reviewed",
    sourcesMeta: (date: string) => `Official product sources · ${date}`,
    relatedHeading: "Related comparisons",
    seeAll: "See all comparisons",
    ctaButton: "See Beseam with my stack",
    hubCtaHeading: "See how Beseam fits around the tools you already use.",
    hubCtaBody:
      "In a 20-minute store review, we use one real finding to show how Beseam connects the systems already in place, prepares a change for approval, and checks what happens afterward.",
    detailCtaHeading:
      "Keep the systems that work. Connect the evidence they leave apart.",
    detailCtaBody:
      "In a 20-minute store review, we use one real finding to show how Beseam connects the tools already in place and keeps the loop moving from evidence to measured change.",
  },
  report: {
    metaTitle: "AI Shopping Report | Beseam",
    metaDescription:
      "We ask AI assistants the same public shopper questions and publish which engine named which brand, with dates, denominators and methodology.",
    breadcrumb: "AI Shopping Report",
    title: "AI Shopping Report",
    intro: (questions: number, engines: string, categories: string) =>
      `We asked the same ${questions} shopping questions to ${engines} across ${categories}. We kept every completed answer and recorded which brands each assistant named.`,
    list: (items: readonly string[]) =>
      items.length < 2
        ? items.join("")
        : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`,
    /** German keeps nouns capitalised inside a sentence. */
    lowercaseCategories: true,
    categoryNames: {
      "Consumer tech": "Consumer tech",
      Supplements: "Supplements",
      "Apparel & footwear": "Apparel & footwear",
      "Food & drink": "Food & drink",
    } as Record<string, string>,
    statDate: "Date asked",
    statEngines: "AI engines",
    statAnswers: "Completed answers",
    statNamings: "Brand namings",
    soloHeading: (share: number) =>
      `${share}% of brand appearances happened on just one assistant.`,
    soloSub: (total: number) =>
      `${total} appearances, by how many assistants named the brand`,
    allEngines: (count: number) =>
      count === 3 ? "All three engines" : `All ${count} engines`,
    oneEngine: "One engine only",
    nEngines: (count: number) =>
      count === 2 ? "Two engines" : `${count} engines`,
    aliasHeading: "The assistants do not answer alike.",
    aliasBody: (
      questions: number,
      loudest: string,
      ratio: string,
      quietest: string,
    ) =>
      `Across the same ${questions} questions, ${loudest} put ${ratio}× as many brands in front of a shopper per answer as ${quietest}. Where an engine answered and named nothing at all, that is recorded too.`,
    tableCaption: (questions: number) =>
      `Per-engine totals across the ${questions} charted questions`,
    colEngine: "Engine",
    colAnswers: "Answers",
    colNamed: "Brands named",
    colPerAnswer: "Per answer",
    colAlone: "Named by it alone",
    colNothing: "Answered, named nothing",
    tableNote: (questions: number, date: string) =>
      `One row per engine over the same ${questions} questions, ${date}. A naming is one brand in one answer; “named by it alone” counts the brands no other engine repeated on that question. Volume is not quality, and this is not a ranking of the engines.`,
    questionsHeading: "Every question, and which engine named what.",
    legendNamed: "Named",
    legendAll: (count: number) =>
      count === 3 ? "Named by all three" : `Named by all ${count}`,
    legendNot: "Not named",
    columnsNote: (engines: string) =>
      `Columns run in the same order on every figure: ${engines}. The number under an engine is how many brands it named for that question, so a column of rules under a 0 is an engine that answered and named nothing. An engine that returned no completed answer is left out of the question entirely rather than shown as a zero.`,
    methodHeading: "How every figure on this page is produced.",
    methodIntro:
      "The same discovery check shown on the Beseam homepage, pointed at a public category instead of a customer store. The date and denominator stay attached so the result can be interpreted in context.",
    method: [
      [
        "The question",
        "A question a real shopper would type, asked verbatim on every engine. Published exactly as it was asked: never rewritten afterwards to fit the result.",
      ],
      [
        "The engines",
        "Each assistant is asked the same question and kept in its own column, so every mark on this page is attributable to the engine that made it.",
      ],
      [
        "The denominator",
        "Every count is out of the engines that actually answered, and that number is printed on the figure. Nothing is averaged across questions or categories.",
      ],
      [
        "The date",
        "Answers move. Each figure carries the date it was run and is never quietly refreshed underneath the same numbers.",
      ],
      [
        "Whose data this is",
        "Public brands, observed from the outside. No customer store, no private catalog, and no claim about why any brand was or was not named.",
      ],
      [
        "What is not claimed",
        "Being named is not a ranking and not an endorsement, and a brand that went unnamed is not judged here: only recorded as absent from that answer.",
      ],
    ] as readonly (readonly [string, string])[],
    figEngines: (count: number, date: string) => `${count} engines · ${date}`,
    figTotals: (total: number, solo: number) =>
      `${total} brands named in total. ${solo} of them by only one engine.`,
    figBrand: "Brand",
    figMore: (hidden: number) =>
      `+ ${hidden} more brands, each named by a single engine.`,
    figCaption: (index: number, category: string) =>
      `Fig. ${index}: ${category}`,
    figNote: (engines: string, date: string) =>
      `Asked verbatim on ${engines}, ${date}. Public brands, observed: no customer data, and no ranking is implied.`,
    figNamedBy: (brand: string, engines: string) =>
      `${brand}: named by ${engines}`,
  },
};

export type PageCopy = typeof pagesEn;
