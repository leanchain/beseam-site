/**
 * English copy. The source of truth for the key set: `de.ts` is declared as
 * `Dictionary`, so any key added here must be translated in the same commit or
 * the build fails. That is the point -- there is no runtime fallback to
 * English, because a silent fallback ships an English string to a German
 * visitor and nobody finds out.
 *
 * Values that interpolate are functions rather than format strings, so the
 * arguments are type-checked per locale instead of failing at runtime.
 */
const enDictionary = {
  nav: {
    skipToContent: "Skip to content",
    homeAriaLabel: "Beseam home",
    primaryAriaLabel: "Primary",
    mobileAriaLabel: "Mobile",
    openNavigation: "Open navigation",
    closeNavigation: "Close navigation",
    links: {
      platform: "Platform",
      howWeWork: "How we work",
      report: "AI Shopping Report",
    },
    login: "Log in",
    cta: "Scan my store",
  },
  switcher: {
    triggerAriaLabel: "Change language",
    listboxAriaLabel: "Language",
    // `short` is the navbar trigger, `names` the open list. A code is enough
    // once you are already looking at the control; the choice itself is
    // spelled out, each language in its own language.
    short: { en: "EN", de: "DE" },
    names: { en: "English", de: "Deutsch" },
  },
  // These three strings are German in BOTH dictionaries, deliberately: the
  // notice only ever appears to someone who has just asked for German by
  // switching to it or arriving with a German-language signal, so telling
  // them in English that German is unavailable here defeats the purpose.
  // Do not "fix" this by translating it back to English.
  notice: {
    text: "Diese Seite gibt es noch nicht auf Deutsch.",
    link: "Zur deutschen Startseite",
    dismiss: "Hinweis schließen",
  },
  footer: {
    homeAriaLabel: "Beseam home",
    tagline: {
      before: "Make products easier to",
      highlight: "find, choose, and buy",
    },
    description:
      "Beseam continuously watches the buying journey, finds what is worth improving, applies approved changes where supported, and measures what changed.",
    groups: {
      product: {
        label: "Product",
        links: {
          platform: "Platform",
          aiShoppingDiscovery: "AI shopping discovery",
          compare: "Compare",
        },
      },
      aiShoppingAgents: {
        label: "AI shopping agents",
        links: {
          aiShoppingData: "AI shopping data",
          forShoppingAgents: "For shopping agents",
          report: "AI Shopping Report",
        },
      },
      company: {
        label: "Company",
        links: {
          howWeWork: "How we work",
          about: "About",
          manifesto: "Manifesto",
          contact: "Contact us",
        },
      },
      fieldbook: {
        label: "Fieldbook",
        links: {
          fieldbook: "Fieldbook",
        },
      },
    },
    copyright: (year: number) => `© ${year} Beseam. All rights reserved.`,
    privacy: "Privacy",
    terms: "Terms",
    bot: "BeseamBot",
    madeWith: "Made with love in Switzerland",
    swissFlagAriaLabel: "Swiss flag",
  },
  meta: {
    home: {
      title: "Beseam | See why AI picked someone else",
      description:
        "Beseam shows you where AI shopping assistants leave your products out, why, what to fix, and whether the fix worked. Free store scan; customer-facing changes only with your approval.",
      imageAlt:
        "Beseam finding, fixing, and measuring ecommerce growth opportunities",
    },
    scan: {
      title: "Free Store Scan | Beseam",
      description:
        "A technical discoverability read of your public storefront: what search engines and AI assistants can see in your product pages, catalog data and site signals, and what to improve first. No login, no store access. Not a keyword report.",
    },
  },

  /**
   * Hero copy is ruled, not iterated (see `production-homepage.tsx`). The
   * headline is three keys rather than one string carrying markup, so a
   * locale can put the coloured span wherever its own word order puts the
   * emphasis -- German moves it to the middle of the sentence.
   */
  hero: {
    headlineBefore: "See why AI picked ",
    headlineAccent: "someone else",
    headlineAfter: ".",
    sub: "Beseam keeps watching AI discovery, your store, and your shoppers to find what is worth improving, makes the changes you approve, and shows you the impact of your changes.",
    scanReturns: {
      readable: "Can AI shopping agents read your store?",
      standing: "See where you stand",
      fixFirst: "What to fix first",
    },
    scrollCue: "Scroll",
  },

  rail: {
    ariaLabel: "Research finding",
    eyebrow: "New research",
    // The share itself stays computed in `credibility-rail.tsx` from
    // `BENCHMARK_RUN`; only the sentence around it is translated.
    finding: (share: number) =>
      `${share}% of brand appearances occurred on only one AI assistant.`,
    link: "See the report & method",
  },

  sections: {
    // #proof -- connected-evidence.tsx
    proof: {
      heading: "See what gets in the way of the choice.",
      body: "Beseam looks at what the shopper did, checks product, search, and stock data, rules out weaker explanations, then turns the strongest finding into a change you can approve and check again.",
      traceLabel: "Example trace",
      traceScope: "Onsite discovery · schematic",
      queries: {
        searched: { label: "Searched", value: "“waterproof jacket”" },
        thenAdded: {
          label: "Then added",
          value: "... “for commuting”",
        },
      },
      signal: "Got the same jackets back, then left without opening one.",
      whatHappenedNext: "What happened next",
      /**
       * The three branches must stay independent explanations of the same
       * signal -- each could be true while the other two are false. Whether a
       * branch is the cause is structure, not copy, so it stays in the
       * component; only the words live here.
       */
      candidates: {
        onsiteSearch: {
          domain: "Onsite search",
          verdict: "Search works",
          claim: "The refinement returned nothing at all.",
          why: "It still returns the waterproof jackets.",
        },
        productPages: {
          domain: "Product pages",
          claim: "None of those jackets mention commuting.",
          why: "Not in the titles, the descriptions, or the tags.",
        },
        availability: {
          domain: "Availability",
          verdict: "Stock is fine",
          claim: "The jackets it returned are out of stock.",
          why: "Almost all are in stock in the shopper’s market.",
        },
      },
      strongestEvidence: "Strongest evidence",
      ruledOut: "Ruled out",
      proposedChange: "Proposed change",
      change:
        "Add the commuting use case to the returned jacket product pages.",
      approve: "You approve",
      applies: "Beseam applies it",
      checkAgain: "Check again",
      mobile: {
        whatTheShopperDid: "What the shopper did",
        query: "waterproof jacket",
        refinement: "+ for commuting",
        signal: "Same jackets returned. The shopper left without opening one.",
        findings: {
          onsiteSearch: {
            domain: "Onsite search",
            finding: "Search works.",
            detail: "The refined query still returns the waterproof jackets.",
          },
          productPages: {
            domain: "Product pages",
            finding: "Commuting language is missing.",
            detail: "Not in the titles, descriptions, or tags.",
          },
          availability: {
            domain: "Availability",
            finding: "Stock is available.",
            detail:
              "Almost all returned jackets are in stock in the shopper’s market.",
          },
        },
      },
    },

    // #one-system -- what-beseam-does.tsx
    oneSystem: {
      heading: "Being considered doesn’t mean being chosen.",
      body: "Beseam follows the shopper from discovery to purchase to find where confidence drops, questions go unanswered, or the journey stops.",
      discovery: {
        buyingQuestion: "Buying question",
        example: "Example",
        /**
         * Typed one character at a time by `.vig-type` in globals.css, whose
         * `steps(51)` counts this string. Any translation has to be 51
         * characters too, or the typing and the string stop agreeing.
         */
        asked: "waterproof jacket for commuting, size M, under €200",
        // Every badge is derivable from `asked` alone -- no invented
        // constraint the shopper never gave.
        parsed: {
          useCase: "Commuting",
          material: "Waterproof",
          size: "Size M",
          price: "Under €200",
        },
        andMore: "and seven more, none of them yours",
        verdict: "Your store, not named",
      },
      store: {
        breadcrumb: (product: string) => `Home / Jackets / ${product}`,
        reviews: "128 reviews",
        size: "Size",
        addToCart: "Add to cart",
        stock: "In stock · ships tomorrow",
        whatShoppersAsk: "What shoppers ask here",
        /**
         * `personalization.added` answers two of these by key, not by
         * matching the question text -- which is what lets the pairing
         * survive translation. Add a question here and the last panel has
         * nothing to flip; drop one and the two panels stop telling one story.
         */
        questions: {
          waterproofRating: {
            question: "Waterproof rating",
            answer: "20,000 mm",
          },
          breathable: {
            question: "Breathable for commuting",
            answer: "Not answered",
          },
          suitJacket: {
            question: "Fits over a suit jacket",
            answer: "Not answered",
          },
          returnWindow: { question: "Return window", answer: "60 days" },
        },
        verdict: "Two questions unanswered",
      },
      personalization: {
        forThisShopper: "For this shopper",
        wants: {
          waterproof: "waterproof",
          size: "size M",
          commuting: "commuting",
        },
        addedToCart: "Added to cart",
        twoAdded: "Two added",
        added: {
          breathable: "3-layer shell, pit zips",
          suitJacket: "Regular cut, size up",
        },
        verdict: "All four answered",
      },
      domains: {
        getFound: {
          title: "Get found",
          capabilities: {
            aiAnswers: "AI answers",
            search: "Search",
            productFeeds: "Product feeds",
          },
          detail: "If shoppers never see you, they cannot choose you.",
        },
        hesitate: {
          title: "See why shoppers hesitate",
          capabilities: {
            productPages: "Product pages",
            onsiteSearch: "On-site search",
            behavior: "Behavior",
          },
          detail:
            "Find the unanswered question that makes the shopper hesitate.",
        },
        choose: {
          title: "Help shoppers choose",
          capabilities: {
            recommendations: "Recommendations",
            personalization: "Personalization",
          },
          detail: "Add the missing information that helps the shopper choose.",
        },
      },
      gate: {
        eyebrow: "Nothing ships without you",
        body: "Every customer-facing change waits at step 03 until you approve it.",
        note: "And step 05 checks the same journey it started from — AI appearances, product visits, add to cart — so a change is measured against the state it changed.",
      },
    },

    // #benchmarks -- category-benchmarks-section.tsx. The benchmark questions
    // and category names come from `@/data/category-benchmarks`: they are the
    // questions that were actually asked, so they stay verbatim in every
    // locale rather than being translated into something nobody ran.
    benchmarks: {
      eyebrow: "AI Shopping Report",
      heading: "Products can be visible in one place and missed in another.",
      body: "Beseam asks the same buying questions across AI assistants to find where your products appear, where they are missed, and how those results differ. In the latest run, ",
      finding: (share: number) =>
        `${share}% of brand appearances occurred on only one assistant.`,
      link: "See the report and method",
      pullQuote:
        "A readable catalog gets you considered. Beseam follows whether you get chosen, and shows what changed.",
      figureLabel: "How often assistants agreed",
      appearances: (namings: number) => `${namings} brand appearances`,
      agreementAriaLabel: (one: number, two: number, every: number) =>
        `${one} brand appearances occurred on one assistant only, ${two} on two assistants, and ${every} on every assistant`,
      bands: {
        one: "One assistant only",
        two: "Two assistants",
        every: "Every assistant",
      },
      columns: {
        category: "Category",
        question: "Where assistants disagreed most",
        solo: "Brands on one assistant",
      },
      outOf: (total: number) => ` of ${total}`,
    },

    // #actions -- evidence-to-work.tsx
    actions: {
      heading: "Beseam finds what to improve next.",
    },

    // #system -- the homepage's DecisionBridge mount. The component takes its
    // copy as props, so this is the only place the homepage's wording lives.
    system: {
      heading: "The whole store, seen together.",
      body: "What AI answers about you, what your pages say, and what shoppers do. Apart they are separate reports; together they show what moved and what moved with it.",
    },

    // #impact -- measure-impact.tsx
    impact: {
      heading: "It only matters if the outcome moves.",
      body: "After a change, Beseam asks the same shopper questions again — and shows whether the answers now name your store.",
    },

    // #promise -- first-month-promise.tsx. Two block spans, not one balanced
    // line: the two sentences must not merge mid-thought.
    promise: {
      headingLine1: "Start free.",
      headingLine2: "Pay when it proves its value.",
      body: "Beseam watches, prepares the change, applies it once you approve, and shows you what moved, one subscription instead of a tool plus an agency. Try for free to see the impact before you pay anything.",
      cta: "Start free",
    },

    // mobile-sticky-cta.tsx
    stickyCta: {
      cta: "Start for free",
    },
  },

  /**
   * Read twice: by `faq-section.tsx` for the visible list and by
   * `homeJsonLd` for the `FAQPage` graph, so the structured data is in the
   * same language as the page that carries it. Keyed rather than an array
   * because `Dictionary` only enforces a key set -- an array would let a
   * locale ship four questions where English ships six.
   */
  faq: {
    heading: "FAQ",
    items: {
      connect: {
        question: "What do I need to connect to get started?",
        answer:
          "Start with your domain. Add store, analytics, search, behavior, or customer data only when it helps Beseam understand the problem or make an approved change.",
      },
      priority: {
        question: "How does Beseam decide what to fix first?",
        answer:
          "Beseam looks at what shoppers did, what happened on the store, and what changed in sales. It separates facts from possible explanations and shows what is most worth fixing first, with the reason attached.",
      },
      changes: {
        question: "What can Beseam actually change?",
        answer:
          "With the right access, Beseam can change product data, content, merchandising, onsite search, recommendations, and other editable parts of the store. What it can apply depends on the system you connect and the approval rules you choose.",
      },
      approval: {
        question: "What needs approval before it goes live?",
        answer:
          "You choose the rules. Beseam prepares customer-facing changes and applies them only after the required approval. Changes that need brand judgment stop for review. Where the system supports rollback, Beseam keeps the previous state.",
      },
      cadence: {
        question: "How often does Beseam check?",
        answer:
          "It keeps running after the first scan. Beseam re-asks a rotating sample of your shopper questions every day, so an answer that changes is caught when it changes, and a weekly email tells you what moved, what is waiting for your approval, and what to fix next. You do not have to open it every day.",
      },
      measurement: {
        question: "How does Beseam measure whether a change helped?",
        answer:
          "Beseam asks the same shopper questions again after the change and shows whether the answers now name your store. The before-and-after stays with the change, and Beseam does not claim the change caused something the data cannot prove.",
      },
    },
  },
};

export const en = enDictionary;
export type Dictionary = typeof enDictionary;
