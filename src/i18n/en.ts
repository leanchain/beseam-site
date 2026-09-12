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

/**
 * Lists that are rendered in order and whose length is part of the design are
 * typed as fixed-length tuples. A plain array would widen to `string[]`, and
 * a locale that shipped three of four cards would render three cards and pass
 * the typecheck -- exactly the silent-English failure this file exists to
 * prevent.
 */
type Triple<T> = readonly [T, T, T];
type Quad<T> = readonly [T, T, T, T];
type Labelled = { label: string; detail: string };
type Termed = { term: string; detail: string };

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
  // The consent banner is client-rendered, so it never appears in the exported
  // HTML and was missed by every static sweep of the German page.
  cookies: {
    ariaLabel: "Cookie choices",
    text: "Essential cookies keep the site working. Optional analytics load only after you accept.",
    policy: "Privacy policy",
    reject: "Reject analytics",
    accept: "Accept analytics",
  },
  notice: {
    text: "Diese Seite gibt es noch nicht auf Deutsch.",
    link: "Zur deutschen Startseite",
    dismiss: "Hinweis schliessen",
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
      schemaSoftwareDescription:
        "Beseam continuously finds strong ecommerce growth opportunities, prepares supported fixes for brand-owner approval, applies approved changes, and measures what changes afterward.",
      schemaFeatures: [
        "Find where shoppers may be missed across discovery and the store",
        "Prioritize growth opportunities by evidence and projected impact",
        "Ask the brand owner to approve before customer-facing changes are applied",
        "Measure what changed with before-and-after evidence",
      ] as Quad<string>,
      schemaFaqName: "Questions about Beseam",
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

  /**
   * The hero knowledge graph (`hero-surface-shift.tsx`). Only the strings live
   * here: coordinates, ids, the graph topology and the numeric values stay in
   * the component, because they are identical in every locale.
   *
   * German labels are deliberately shorter than a literal translation would
   * be. The graph places nodes on fixed coordinates, so a label that grows
   * overlaps its neighbour rather than reflowing -- when German runs long, the
   * shorter true phrasing wins over the closer one.
   */
  heroGraph: {
    satelliteValues: { "recs.3": "on" },
    hubs: {
      ai: {
        label: "AI answers",
        satellites: {
          0: "ChatGPT",
          1: "Gemini",
          2: "AI Mode",
          3: "citations",
        },
        metrics: {
          0: "ChatGPT visibility",
          1: "Gemini visibility",
          2: "Google AI Mode",
        },
        capabilities: {
          0: {
            label: "Did they name you?",
            description:
              "Check how products and the brand appear across AI shopping surfaces.",
          },
          1: {
            label: "What changed?",
            description:
              "Ask the same shopper questions again and show what changed.",
          },
          2: {
            label: "Questions you appear for",
            description:
              "Measure whether products are present for the shopper questions that matter.",
          },
          3: {
            label: "Who was chosen instead?",
            description:
              "Observe products that appear instead of or alongside the merchant catalog.",
          },
          4: {
            label: "What sources support it?",
            description:
              "Track the sources that support how the product is described.",
          },
        },
      },
      search: {
        label: "Search results",
        satellites: {
          0: "JSON-LD",
          1: "indexable",
          2: "queries",
          3: "snippets",
        },
        metrics: {
          0: "JSON-LD coverage",
          1: "Indexability",
          2: "Query match",
        },
        capabilities: {
          0: {
            label: "Queries finding you",
            description:
              "Connect search results to the products shoppers are trying to find.",
          },
          1: {
            label: "Machine-readable facts",
            description:
              "Structured product information available to search and shopping systems.",
          },
          2: {
            label: "Can the page be found?",
            description:
              "Whether important product pages can be found and indexed.",
          },
          3: {
            label: "Does the wording match?",
            description: "How well product facts match real shopper searches.",
          },
          4: {
            label: "What search can show",
            description:
              "Visible and structured product data that can support richer search results.",
          },
        },
      },
      catalog: {
        label: "Products considered",
        satellites: {
          0: "fields",
          1: "freshness",
          2: "variants",
          3: "stock",
        },
        metrics: {
          0: "Completeness",
          1: "Freshness",
          2: "Variant coverage",
        },
        capabilities: {
          0: {
            label: "Products available",
            description:
              "The products and variants shoppers can actually choose.",
          },
          1: {
            label: "Variants shoppers can choose",
            description:
              "Variant-level product facts available when shoppers choose.",
          },
          2: {
            label: "Facts worth adding",
            description: "Product facts that may make choosing easier.",
          },
          3: {
            label: "Approved product changes",
            description:
              "Merchant-approved product changes prepared for the storefront.",
          },
          4: {
            label: "Variant choices",
            description:
              "Coverage of variant-level product truth across the catalog.",
          },
          5: {
            label: "Availability matches",
            description:
              "Agreement between catalog availability and visible storefront state.",
          },
        },
      },
      brand: {
        label: "Brand trust",
        satellites: {
          0: "claims",
          1: "identity",
          2: "trust",
          3: "evidence",
        },
        metrics: {
          0: "Approved claims",
          1: "Identity coverage",
          2: "Trust proof",
        },
        capabilities: {
          0: {
            label: "Who you are",
            description:
              "Brand information available when shoppers compare you with alternatives.",
          },
          1: {
            label: "Current brand info",
            description: "Keep the brand information shoppers see up to date.",
          },
          2: {
            label: "Claims shoppers can trust",
            description: "Claims with enough proof to reuse safely.",
          },
          3: {
            label: "Policies and proof",
            description:
              "Policies, proof, and trust information attached to the brand.",
          },
          4: {
            label: "Same story everywhere",
            description:
              "Consistency between approved brand context and what shoppers encounter.",
          },
        },
      },
      truth: {
        label: "Product facts",
        satellites: {
          0: "price",
          1: "shipping",
          2: "reviews",
          3: "facts",
        },
        metrics: {
          0: "Facts covered",
          1: "Shipping facts",
          2: "Structured facts",
        },
        capabilities: {
          0: {
            label: "Price & availability",
            description:
              "Canonical price, availability and offer-state agreement.",
          },
          1: {
            label: "Price matches",
            description:
              "Price consistency across catalog, schema and the visible product page.",
          },
          2: {
            label: "Delivery answer",
            description:
              "Shipping information available in the data and on the page.",
          },
          3: {
            label: "Review proof",
            description: "Whether reviews are visible where shoppers decide.",
          },
          4: {
            label: "Facts match the page",
            description:
              "Whether structured product data matches what shoppers see on the page.",
          },
          5: {
            label: "Check again after change",
            description:
              "Check the same product information after an approved change.",
          },
        },
      },
      creative: {
        label: "What they see",
        satellites: {
          0: "images",
          1: "video",
          2: "brand fit",
          3: "assets",
        },
        metrics: {
          0: "Product image coverage",
          1: "Brand consistency",
          2: "Video coverage",
        },
        capabilities: {
          0: {
            label: "What shoppers see first",
            description:
              "The images and content shoppers see before they compare in detail.",
          },
          1: {
            label: "Product imagery",
            description:
              "Images that help shoppers understand the product and use case.",
          },
          2: {
            label: "Product video",
            description:
              "Video that can answer questions static product facts cannot.",
          },
          3: {
            label: "Is the proof clear?",
            description:
              "Check whether the images or video support the product claim.",
          },
          4: {
            label: "Available product proof",
            description:
              "Reusable assets tied to the product and brand context.",
          },
          5: {
            label: "Use-case content",
            description:
              "Content that helps shoppers understand whether the product fits their need.",
          },
        },
      },
      campaigns: {
        label: "Ads they see",
        satellites: {
          0: "Google Ads",
          1: "Meta Ads",
          2: "landing",
          3: "tracking",
        },
        metrics: {
          0: "Google Ads readiness",
          1: "Meta Ads readiness",
          2: "Landing readiness",
        },
        capabilities: {
          0: {
            label: "Can the ad land well?",
            description:
              "Check whether the product, tracking, and landing experience support the promise in the ad.",
          },
          1: {
            label: "Offer and message",
            description:
              "The promise a shopper sees before arriving at the product or store.",
          },
          2: {
            label: "Approved campaign change",
            description:
              "A merchant-approved campaign change tied to the reason behind it.",
          },
          3: {
            label: "Does the landing answer?",
            description:
              "Check whether the landing page answers the question the ad created.",
          },
          4: {
            label: "Creative variants",
            description:
              "Alternative messages and creative for the same product and shopper need.",
          },
          5: {
            label: "What earns the click",
            description: "See which product message gets shopper attention.",
          },
          6: {
            label: "Who clicked and bought?",
            description:
              "Connect campaign response with the downstream buying path.",
          },
          7: {
            label: "What the traffic cost",
            description:
              "Keep paid traffic cost separate from the purchases that follow.",
          },
        },
      },
      onsite: {
        label: "Store search",
        satellites: {
          0: "retrieval",
          1: "top 3",
          2: "zero result",
          3: "filters",
        },
        metrics: {
          0: "Retrieval coverage",
          1: "Top-3 placement",
          2: "Zero-result rate",
        },
        capabilities: {
          0: {
            label: "What shoppers searched",
            description:
              "The words shoppers use when they are trying to find the right product.",
          },
          1: {
            label: "Which products appeared",
            description:
              "Where relevant products appear in onsite search results.",
          },
          2: {
            label: "Where search failed",
            description:
              "Shopping searches that return no useful product result.",
          },
          3: {
            label: "What they did next",
            description: "Shopper behavior after a search result is shown.",
          },
          4: {
            label: "What shapes the ranking",
            description:
              "Rules and product data that influence which options a shopper sees.",
          },
        },
      },
      recs: {
        label: "What gets suggested",
        satellites: {
          0: "coverage",
          1: "affinity",
          2: "rules",
          3: "holdout",
        },
        metrics: {
          0: "Catalog coverage",
          1: "Affinity confidence",
          2: "Holdout coverage",
        },
        capabilities: {
          0: {
            label: "What was recommended",
            description:
              "The products the storefront places in front of the shopper.",
          },
          1: {
            label: "Why these products?",
            description:
              "The merchandising rules and product data that shape recommendations.",
          },
          2: {
            label: "Fit to shopper need",
            description:
              "How well the product matches what the shopper appears to want.",
          },
          3: {
            label: "Eligible products",
            description:
              "How much of the relevant catalog can participate in recommendations.",
          },
          4: {
            label: "Did recommendations help?",
            description:
              "Compare recommendation exposure with what shoppers did afterward.",
          },
        },
      },
      pdp: {
        label: "Product page",
        satellites: {
          0: "evidence",
          1: "policy",
          2: "trust",
          3: "content",
        },
        metrics: {
          0: "Questions answered",
          1: "Policy clarity",
          2: "Trust coverage",
        },
        capabilities: {
          0: {
            label: "Questions answered",
            description:
              "Product-page information available for the questions shoppers ask before choosing.",
          },
          1: {
            label: "What is missing?",
            description:
              "Find gaps in the product page without pretending every gap caused the choice.",
          },
          2: {
            label: "Check after the change",
            description:
              "Check the same product-page information after an approved change.",
          },
          3: {
            label: "Facts match the page",
            description:
              "Agreement between visible page content and structured product facts.",
          },
          4: {
            label: "Size & fit",
            description:
              "Fit guidance and size recommendations that help shoppers choose the right variant.",
          },
          5: {
            label: "Reviews & trust",
            description:
              "Reviews and trust information visible when shoppers decide.",
          },
          6: {
            label: "Returns & delivery",
            description:
              "Policy and delivery information visible before the shopper commits.",
          },
        },
      },
      behavior: {
        label: "What they do next",
        satellites: {
          0: "engagement",
          1: "friction",
          2: "searches",
          3: "replay",
        },
        metrics: {
          0: "Interaction rate",
          1: "Friction sessions",
          2: "Searches observed",
        },
        capabilities: {
          0: {
            label: "What shoppers did",
            description:
              "Navigation, engagement, commerce, and friction events around the buying path.",
          },
          1: {
            label: "Where they hesitated",
            description:
              "Shopper behavior that may point to uncertainty or friction.",
          },
          2: {
            label: "What they searched",
            description:
              "Search behavior connected to what the shopper did afterward.",
          },
          3: {
            label: "What they opened",
            description:
              "Which products, pages, and information the shopper actually viewed.",
          },
          4: {
            label: "Where they left",
            description:
              "The point in the journey where a shopper stopped moving forward.",
          },
          5: {
            label: "Session replay",
            description:
              "Replay to understand shopper friction without pretending it proves the cause.",
          },
          6: {
            label: "Interaction patterns",
            description:
              "See which parts of a page shoppers use or ignore across many sessions.",
          },
        },
      },
      checkout: {
        label: "Checkout",
        satellites: {
          0: "complete",
          1: "payment",
          2: "drop-off",
          3: "errors",
        },
        metrics: {
          0: "Completion",
          1: "Payment success",
          2: "Drop-off",
        },
        capabilities: {
          0: {
            label: "Where checkout stopped",
            description: "Observed shopper loss during the purchase path.",
          },
          1: {
            label: "Payment success",
            description:
              "Observed payment completion across tracked checkout sessions.",
          },
          2: {
            label: "Delivery friction",
            description:
              "Delivery cost and timing that can change a shopper's final choice.",
          },
          3: {
            label: "Technical errors",
            description:
              "Runtime errors that may interfere with purchase completion.",
          },
          4: {
            label: "Did the fix hold?",
            description:
              "Check the same checkout data after an approved change.",
          },
        },
      },
      revenue: {
        label: "Purchase",
        satellites: {
          0: "orders",
          1: "CVR",
          2: "AOV",
          3: "impact",
        },
        metrics: {
          0: "Orders",
          1: "Conversion rate",
          2: "Observed impact",
        },
        capabilities: {
          0: {
            label: "Was there a purchase?",
            description: "Booked orders and revenue used as proof of purchase.",
          },
          1: {
            label: "What changed after?",
            description:
              "Before-and-after measurement tied to a completed change.",
          },
          2: {
            label: "Observed vs attributed",
            description:
              "Keep directly observed and attributed revenue separate.",
          },
          3: {
            label: "Conversion path",
            description:
              "Where shoppers move forward or stop across the buying journey.",
          },
          4: {
            label: "Which shoppers changed?",
            description: "See how results differ across shopper groups.",
          },
          5: {
            label: "Does revenue reconcile?",
            description:
              "Check that tracked revenue matches the store's revenue data.",
          },
        },
      },
      marketplaces: {
        label: "Marketplaces",
        satellites: {
          0: "Amazon",
          1: "eBay",
          2: "Otto",
          3: "Galaxus",
        },
        metrics: {
          0: "Amazon visibility",
          1: "eBay visibility",
          2: "Buy Box coverage",
        },
        capabilities: {
          0: {
            label: "Who wins the Buy Box?",
            description:
              "Share of tracked listings currently winning the buy box against competing sellers.",
          },
          1: {
            label: "Can shoppers compare it?",
            description:
              "Required marketplace fields and imagery present across tracked SKUs.",
          },
          2: {
            label: "Does the price match?",
            description:
              "Tracked listings priced in line with the merchant's own storefront.",
          },
          3: {
            label: "Where does it rank?",
            description:
              "Median tracked position within its marketplace category page.",
          },
          4: {
            label: "Is there enough proof?",
            description:
              "Tracked products with enough reviews to help shoppers choose.",
          },
        },
      },
    },
  },

  /**
   * `loop-diagram.tsx`. The five step labels and the accessibility
   * description name the same five steps, so a locale that renames a step has
   * to rename it in `desc` too, or the picture and the sentence describing it
   * stop agreeing. Geometry, the gate flag and the step order stay in the
   * component: they are identical in every locale.
   */
  loop: {
    title: "The Beseam operating loop",
    desc: "Five steps arranged in a circle, each arrow pointing to the next: Find, Prepare, Approve, Apply, Measure. Measure leads back to Find.",
    steps: {
      find: { label: "Find", detail: "what to improve" },
      prepare: { label: "Prepare", detail: "the change" },
      approve: { label: "Approve", detail: "you decide" },
      apply: { label: "Apply", detail: "Beseam ships it" },
      measure: { label: "Measure", detail: "the same journey" },
    },
    /**
     * Two keys, not one string: they are drawn as two `<text>` elements at
     * fixed baselines inside the ring, so the break is geometry rather than
     * wrapping. A locale that needs one word can repeat the shorter half.
     *
     * Both lines are clipped by the svg's viewBox, so keep them short --
     * roughly 14 characters is what fits at the 15px mono size.
     */
    centre: { line1: "Continuous", line2: "loop" },
    caption: "Measure does not end the work. It starts the next Find.",
  },

  /**
   * `connected-system-map.tsx`. Signal ids, wire geometry, hues, the icon set
   * and which use case reads which signal stay in the component; only what is
   * read lives here. The input tokens (`product_pages`, `add_to_cart`) are
   * deliberately absent: they are field names shown as field names, not prose,
   * and translating them would invent identifiers nothing emits.
   */
  systemMap: {
    signalsAriaLabel: "Information across the shopper journey",
    columns: {
      signals: { label: "Signals", note: "Fixed set" },
      journey: { label: "One shopper journey", note: "Coverage" },
      useCases: {
        label: "What Beseam can do",
        /** Stands in for the explore link where the section links nowhere. */
        noLinkNote: "Connected outcomes",
      },
    },
    /**
     * Split around their numbers rather than interpolated, because both sit
     * between two counts the component computes. German keeps the same order,
     * so the halves stay halves.
     */
    feedsBefore: "Feeds ",
    feedsBetween: " of ",
    inputBefore: "Input: what ",
    inputAfter: " reads",
    platformLabel: "Platform",
    platformQuestion: "What will this shopper choose?",
    explore: "Explore the platform",
    signalsUsed: "Signals used:",
    moreLabel: "+ more",
    moreDetail:
      "Immersive product experiences, marketplaces, brand workflows, and other specialist capabilities as enabled.",
    /**
     * `scope` sits in a fixed 2.25rem slot and `caveat` under a 16rem column,
     * so both are two lines of a narrow measure: keep a locale's version close
     * to the English length rather than closer to the English wording.
     */
    signals: {
      discovery: {
        label: "AI discovery",
        layer: "Off-site",
        scope: "Where products enter, or miss, the shortlist.",
        caveat:
          "Point-in-time samples, dated and repeatable. Never a model’s hidden ranking logic.",
        does: "Shortlist visibility",
      },
      store: {
        label: "Store & product",
        layer: "Storefront",
        scope: "What the page answers, and what it offers next.",
        caveat:
          "Public storefront data only. No store login, no private customer data.",
        does: "Catalog and page readiness",
      },
      behavior: {
        label: "Shopper behavior",
        layer: "Journey",
        scope: "What shoppers refine, open, ignore, and abandon.",
        caveat:
          "What shoppers did. Why it happened stays a hypothesis until it is tested.",
        does: "Proactive personalization",
      },
      revenue: {
        label: "Revenue",
        layer: "Outcome",
        scope: "What changed after the decision was acted on.",
        caveat:
          "Measured after the change ships, against the same questions that exposed the gap.",
        does: "Impact and attribution",
      },
    },
    short: {
      discovery: "Discovery",
      store: "Store",
      behavior: "Behavior",
      revenue: "Revenue",
    },
    /** Broad homepage outcomes; /platform carries the exhaustive capability list. */
    cards: {
      getDiscovered: {
        name: "Get discovered",
        detail:
          "Find visibility gaps across AI and search, then strengthen the evidence behind the shortlist.",
      },
      productsChoose: {
        name: "Make products easier to choose",
        detail:
          "Improve catalog truth, product pages, merchandising, and the evidence shoppers need to decide.",
      },
      fitSizing: {
        name: "Help shoppers get the right fit",
        detail:
          "Use sizing guidance, measurement, fit recommendations, and product-specific overrides.",
      },
      understandBehavior: {
        name: "Understand shopper behavior",
        detail:
          "Connect analytics, journeys, replay, heatmaps, search behavior, and conversion signals.",
      },
      personalizeTest: {
        name: "Personalize & test",
        detail:
          "Shape search, recommendations, merchandising, and experiments around shopper context.",
      },
      journeyHealth: {
        name: "Keep the buying journey healthy",
        detail:
          "Catch performance problems, frontend errors, incidents, and reliability issues that interrupt purchase.",
      },
      creativeStudio: {
        name: "Create content & product media",
        detail:
          "Prepare product content, creative assets, images, video, and richer product experiences.",
      },
      prioritizeMeasure: {
        name: "Prioritize & measure what worked",
        detail:
          "Turn evidence into a ranked change queue and keep the before-and-after result attached.",
      },
      campaigns: {
        name: "Launch & improve campaigns",
        detail:
          "Prepare, publish, and measure Google and Meta campaigns where campaign capabilities are enabled.",
      },
    },
  },
  appScreens: {
    illustrative: "Illustrative example · not customer results.",
    actions: {
      columns: {
        change: "Change",
        salesShare: "Sales share",
        effort: "Effort",
        status: "Status",
      },
      efforts: { quick: "Quick", hard: "Hard" },
      rows: {
        commuting: {
          title: "Add the commuting use case to the Urban Shell product page.",
          why: "The shopper asked for a commuting jacket, and the product page never answers whether this one fits that use case.",
          band: "Top 5% of your booked sales",
          step: "Needs approval",
        },
        layers: {
          title: "Explain how Urban Shell fits over everyday layers.",
          why: "The shopper opened the size guide, and fit over layers is still unanswered at the decision point.",
          band: "Top quarter of booked sales",
          step: "In motion",
        },
        recheck: {
          title:
            "Ask the commuter questions again after the product-page change.",
          why: "Ask the same shopping question again before saying the change helped discovery.",
          band: "Not measured",
          step: "Measuring",
        },
      },
      note: "Every change keeps what Beseam found, the owner, status, and what to check afterward together.",
    },
    impact: {
      title: "Results",
      meta: "Example figures",
      verified: "Change verified",
      windowLabel: "Measured window",
      windowValue: "28 days",
      rows: {
        naming: {
          metric: "Commuter answers naming Urban Shell",
          before: "9%",
          after: "23%",
          delta: "+14 pts",
        },
        citing: {
          metric: "Answers citing your own product page",
          before: "1 in 12",
          after: "1 in 4",
          delta: "+3 answers",
        },
        position: {
          metric: "Where you sit when you are named",
          before: "5th",
          after: "2nd",
          delta: "+3 places",
        },
      },
    },
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
      body: "Beseam looks at what the shopper did, checks product, search, and stock data, rules out weaker explanations, then turns the strongest finding into a specific change.",
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
         * Typed one character at a time by `.vig-type` in globals.css. The
         * element publishes this string's `.length` as `--vig-chars`, and the
         * CSS reads both its width and its step count from that, so a
         * translation is free to be a different length than this one.
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
        note: "And step 05 checks the same journey it started from (AI appearances, product visits, add to cart) so a change is measured against the state it changed.",
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
      eyebrow: "One connected view",
      heading: "One problem. All the evidence behind it.",
      body: "A missed recommendation, a hesitant shopper, or a lost sale rarely lives in one tool. Beseam connects AI discovery, your store, shopper behavior, and outcomes so the next change starts with the full picture.",
      compact: {
        inputs: [
          "AI & search",
          "Product & store",
          "Shopper behavior",
          "Orders & revenue",
        ] as Quad<string>,
        center: "Beseam connects the evidence",
        outputs: [
          "What happened?",
          "What is getting in the way?",
          "What should change?",
          "Did it work?",
        ] as Quad<string>,
        link: "Explore the platform",
      },
    },

    // #impact -- measure-impact.tsx
    impact: {
      heading: "It only matters if the outcome moves.",
      body: "After a change, Beseam asks the same shopper questions again, and shows whether the answers now name your store.",
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
      scanVsBeseam: {
        question: "What's the difference between the free scan and Beseam?",
        answer:
          "The free scan is a one-time look at your public storefront. Beseam keeps working after that: it connects the signals that matter, finds what deserves attention, prepares changes, applies supported changes after approval, and checks what happened afterward.",
      },
      watch: {
        question: "What does Beseam actually watch?",
        answer:
          "Depending on what you connect, Beseam can use AI and search discovery, catalog and storefront data, shopper behavior, fit, experiments, reliability, campaigns, conversion, orders, and revenue. You do not need every source; Beseam uses the evidence relevant to the problem being investigated.",
      },
      priority: {
        question: "How does Beseam decide what deserves attention first?",
        answer:
          "Beseam brings the evidence for a problem into one place, separates observed facts from possible explanations, and weighs things such as evidence strength, affected products or journeys, business context, effort, and risk. The reason a change is prioritized stays attached to the work.",
      },
      changes: {
        question: "What can Beseam actually change?",
        answer:
          "Where the connected system supports it, Beseam can prepare or apply changes to product data, content, merchandising, onsite search, recommendations and personalization, fit and sizing experiences, experiments, creative assets, campaigns, and other editable parts of the buying journey. Customer-facing changes follow your approval rules.",
      },
      alongside: {
        question:
          "Does Beseam replace my analytics, personalization, or monitoring tools?",
        answer:
          "Not necessarily. Existing tools can remain specialist sources of evidence. Beseam's job is to connect useful signals around the same product, shopper question, journey, or business problem, turn the strongest findings into work, and keep the result attached. Exact integrations depend on your setup.",
      },
      approval: {
        question: "What needs approval before it goes live?",
        answer:
          "You set the rules. Beseam can keep checking, gathering evidence, and preparing work without waiting for you, but customer-facing changes that require approval do not go live until they have it. Changes that need brand judgment stop for review.",
      },
      measurement: {
        question: "How does Beseam know whether a change worked?",
        answer:
          "Beseam checks the signal that exposed the problem again. That might be the same AI shopping question, a storefront or reliability check, shopper behavior, an experiment, campaign performance, conversion, orders, or revenue. The before-and-after stays with the change, and Beseam keeps observed movement separate from causation the evidence cannot prove.",
      },
      connect: {
        question: "What do I need to connect to get started?",
        answer:
          "Start with your domain. For ongoing work, connect the store first, then add analytics, behavior, search, campaign, customer, or revenue data only when it helps explain a problem, make an approved change, or measure what happened.",
      },
    },
  },

  /**
   * The /scan page body (`scan-page-content.tsx`) plus the two blocks it
   * borrows from `answer-check.tsx` -- `assurances` and `returns`, which are
   * rendered on /scan and on /playbook.
   *
   * `assurances`, `contents` and `returns` are ordered tuples, not keyed
   * objects: each is rendered in order and read as a sequence, and the order
   * is the same in every locale. The tuple types make a locale that drops or
   * adds an entry a type error rather than a short list.
   */
  answerCheck: {
    steps: {
      labels: {
        storefront: "Reading your storefront",
        catalog: "Checking your products and prices",
        pages: "Looking at your product pages",
        questions: "Writing questions shoppers may ask",
        answers: "Checking how your products appear in discovery",
      },
      technical: (position: number, total: number) =>
        `Scanning your store · step ${position} of ${total}`,
      readingDomain: (domain: string) => `Reading ${domain}`,
      readingStorefront: "Reading your storefront",
      resultsAsTheyArrive:
        "We show useful findings as soon as they are ready. You do not have to wait for everything.",
      questionsLater:
        "This first read is the snapshot. Beseam is where the checks keep running after it.",
      quickEstimate: "First results usually arrive in under a minute.",
      fullAuditRunning: "Full audit running",
      fullAuditEstimate: "Usually 2–5 minutes after confirmation.",
      progressDetails: "See scan progress",
      currentStep: "Now",
      progress: (done: number, total: number) => `${done} of ${total}`,
      productsFound: (count: number) =>
        `${count} ${count === 1 ? "product" : "products"} found`,
      pagesAnalyzed: (count: number) =>
        `${count} ${count === 1 ? "product page" : "product pages"} analyzed`,
      pagesProgress: (done: number, total: number) =>
        `Analyzed ${done} of ${total} product pages so far`,
      pagesFinishing:
        "Your products and prices are already below while these finish",
      pagesFailed: "We could not finish reading these pages on this run",
      questionsWritten: (count: number) =>
        `${count} ${count === 1 ? "question" : "questions"} written`,
      questionsFromProducts: "Written from the products we found",
      confirmEmail: (channels: string) =>
        `Confirm your email and we continue with ${channels}`,
      askingChannels: (channels: string) => `Asking ${channels}`,
    },
    result: {
      productsFound: "products checked",
      productPagesSampled: "product pages sampled",
      answersNamed: "AI answers named you",
      answersPending: "assistant answers pending",
      opportunitiesFound: (count: number): string =>
        count === 1 ? "opportunity found" : "opportunities found",
      prioritiesFound: (count: number): string =>
        count === 1 ? "priority" : "priorities",
      supportingFindings: (count: number): string =>
        count === 1 ? "supporting finding" : "supporting findings",
      statusRejected: "Could not read this store",
      statusRunning: "Still running",
      statusFreeReady: "Free scan ready",
      statusFailed: "Audit incomplete",
      statusComplete: "Scan complete",
      shareAria: "Share this scan",
      moreActions: "More report actions",
      linkCopied: "Link copied",
      shared: "Shared",
      copyFailed: "Copy failed",
      share: "Share",
      print: "Print",
      brandAppearance: "AI visibility",
      strong: "Strong",
      mixed: "Mixed",
      weak: "Weak",
      barelyVisible: "Not seen in this sample",
      brandEverywhere: "Your brand appeared in every observed answer.",
      brandNowhere: "Your brand did not appear in any observed answer.",
      brandMissing: (missed: number, total: number) =>
        `Your brand was missing from ${missed} of ${total} observed answers.`,
      frequentAlternative: "Most frequent alternative:",
      byAssistant: "By assistant",
      assistants: (count: number) =>
        `${count} ${count === 1 ? "assistant" : "assistants"}`,
      namedYou: "named you",
      noAnswer: "no answer",
      didNotNameYou: "did not name you",
      noImage: "No image",
      yours: "yours",
      merchant: "Merchant",
      assistant: "Assistant",
      commerceStorefront: "Commerce storefront",
      storefront: "Storefront",
      openProduct: "Open product →",
      details: "Details",
      close: "Close",
      valueSummary:
        "Beseam checked how your products are found, understood and chosen across your storefront and AI shopping.",
      pageQuality: "average PDP quality",
      deepResults: "diagnostic checks",
      credibilityLine: (products: string, pages: number, qualified: number) =>
        `${products} products · ${pages} ${pages === 1 ? "PDP" : "PDPs"} · ${qualified} quality checks scored`,
      headlineAll: (brand: string, total: number) =>
        `${brand} was named in all ${total} usable AI answers we sampled.`,
      headlineNone: (brand: string, total: number) =>
        `${brand} was named in none of the ${total} usable AI answers we sampled.`,
      headlineMissed: (brand: string, missed: number, total: number) =>
        `${brand} was missing from ${missed} of the ${total} usable AI answers we sampled.`,
      headlineFindings: (brand: string, count: number) =>
        `We read ${brand}’s public storefront and found ${count} ${count === 1 ? "opportunity" : "opportunities"} worth looking at.`,
      headlinePriorities: (brand: string, count: number) =>
        `${count} ${count === 1 ? "thing is" : "things are"} worth fixing first on ${brand}.`,
      prioritySupport: (count: number) =>
        count > 0
          ? `We would start here. ${count} more ${count === 1 ? "finding stays" : "findings stay"} below as supporting proof.`
          : "We would start here. The proof below shows why each one matters.",
      headlineReading: (brand: string) => `Reading ${brand}’s storefront now.`,
      headlineClear: (brand: string) =>
        `Nothing obvious stood out on the ${brand} pages we could read.`,
      sampledSupport:
        "These are point-in-time samples, not a ranking. Usable answers and no-answer attempts are kept separate below.",
      moreMayFollow: "More may follow as your product pages finish reading.",
      findingsSupport:
        "Each one is written below in plain words, with the evidence kept underneath it.",
      readingSupport: "Results appear below as each part finishes.",
      clearSupport:
        "That is a good sign, but a public scan of a few pages cannot rule everything out.",
    },
    findings: {
      priorityFirst: "Worth doing first",
      priorityLook: "Worth a look",
      priorityMinor: "Minor",
      areas: {
        discovery: "Getting found",
        listing: "How your products are listed",
        page: "What the product page tells shoppers",
        trust: "Trust and safety",
        markets: "Markets and languages",
        searchStructured: "Search & structured data",
        internationalization: "Internationalization",
        trustDelivery: "Trust & delivery",
        machineReadability: "Machine readability",
        productEvidence: "Product evidence",
      },
      recommendation: "See proof & next step",
      close: "Close",
      whyItMatters: "Why it matters",
      improveNext: "Do next:",
      startFixing: "Work on this in Beseam",
      evidence: "Proof",
      proofObserved: "Observed",
      proofInput: "Input used",
      proofExpected: "Expected",
      proofSource: "Read from",
      proofRecommendation: "Recommendation",
      proofSourceLabel: (source: string) =>
        ({
          rendered_page: "the rendered public page",
          http_response_headers: "the HTTP response headers",
          html_source: "the HTML page source",
          catalog_record: "the catalog record",
          platform_api: "a platform API response",
          feed_export: "the exported feed",
          sitemap: "the sitemap",
          robots_txt: "robots.txt",
          serp_result: "a search result",
          ai_channel_answer: "an AI assistant answer",
          crawl_metadata: "crawl metadata",
          derived: "multiple observed inputs",
          declared: "merchant-provided data",
        })[source] ?? source.replaceAll("_", " "),
      proofInputLabel: (label: string) =>
        ({
          acao: "Access-Control-Allow-Origin",
          acac: "Access-Control-Allow-Credentials",
          acam: "Access-Control-Allow-Methods",
          acah: "Access-Control-Allow-Headers",
          found_types: "Detected credential patterns",
          redacted_matches: "Searchable source shape",
          source_locations: "Source location",
          cache_control: "Cache-Control",
          pragma: "Pragma",
          insecure_ws: "Insecure WebSocket URLs",
        })[label] ?? label.replaceAll("_", " "),
      checks: (count: number) => `${count} checks`,
      moreSampledPages: (count: number) =>
        `+ ${count} more sampled ${count === 1 ? "page" : "pages"}`,
      moreProofChecks: (count: number) =>
        `View ${count} more ${count === 1 ? "check" : "checks"}`,
      productsSeenOn: "Products this was seen on",
      seePage: "See the page →",
      rawCatalog: "The raw catalog file we read →",
      fullPageReport: "Full page report →",
      heading: "Fix these first",
      intro:
        "These are the priorities we would start with. Open one for the proof and the next step.",
      stillReading: "Still reading.",
      moreMayAppear: " More may appear as your product pages finish.",
      showOther: (count: number) =>
        `View ${count} supporting ${count === 1 ? "finding" : "findings"}`,
      readingPages: "Still reading your product pages.",
      aiVisibilityTitle: "AI shopping visibility",
      aiVisibilityAllMissed: (count: number) =>
        `Your brand was absent from all ${count} usable AI shopping ${count === 1 ? "answer" : "answers"}.`,
      aiVisibilitySomeMissed: (missed: number, total: number) =>
        `Your brand was missing from ${missed} of ${total} usable AI shopping answers.`,
      aiVisibilityWhy:
        "When an AI shopping assistant answers a buying question without naming your store, shoppers are guided toward competitors before they ever reach your storefront. Missing identifiers or mismatched prices frequently cause AI engines to discard listings in favor of verified rivals.",
      aiVisibilityNext:
        "Open the questions below to see what was asked, which assistants returned a usable answer, who they named instead, and which product evidence is worth strengthening first.",
      aiVisibilityAttempts: (usable: number, total: number) =>
        `${usable} of ${total} assistant attempts returned a usable answer.`,
      aiVisibilityRivals: (names: string) => `Alternatives named: ${names}.`,
      discoveryFiles: {
        llms: "A short summary of your store for AI assistants that look for one. Optional.",
        agents:
          "Notes for AI agents browsing your store on a shopper's behalf. Optional.",
        skill:
          "Describes what an assistant can do on your store, in a format some AI tools read. Very new and optional. Skip it unless you already work with AI agents.",
        ucp: "A machine-readable card describing your store for commerce agents. Optional.",
      },
    },
    boundary: {
      heading: "Where this scan stops",
      intro:
        "A public scan can only reach so far. This is exactly how far it went, and what continues after it.",
      did: "What this scan did",
      didPublic:
        "Read your public storefront the way any visitor can: no login, no store access.",
      didPages: (count: number) =>
        `Ran the page checks over ${count} ${count === 1 ? "product page" : "product pages"}, plus your robots file, sitemap and crawler access.`,
      didPagesSample:
        "Ran the page checks over a sample of your product pages, plus your robots file, sitemap and crawler access.",
      didCatalog:
        "Compared your catalog data against what each page actually renders: names, prices, availability.",
      not: "What it did not do",
      notKeepAsking:
        "Keep asking. The assistant answers above were sampled once, on this run.",
      notAskLive:
        "Ask ChatGPT or Google AI Mode anything about your products. Nothing here is a live assistant answer.",
      notRepeat: "Repeat on its own. A public scan has no schedule behind it.",
      notHistory:
        "Keep a history. There is no earlier run to compare this against.",
      next: "What starts in Beseam",
      nextItems: [
        "Shopper questions you read and edit before any of them run.",
        "Those questions asked on a schedule instead of once.",
        "Real Lighthouse browser tests for page speed and Core Web Vitals, run directly in Beseam's Chromium worker.",
        "The answers kept as evidence, with the date they were given.",
        "Fixes ordered by what is worth doing first.",
        "The same questions asked again after a change, so you can see what moved.",
      ] as readonly [string, string, string, string, string, string],
    },
    continue: {
      opportunities: (count: number): string =>
        count === 0
          ? "No obvious gaps in this snapshot"
          : `${count} ${count === 1 ? "opportunity" : "opportunities"} found`,
      nextLabel: "Continue in Beseam",
      once: (count: number): string =>
        count === 0
          ? "This scan is a snapshot. Beseam keeps watching what changes."
          : "This scan found the gaps. Beseam keeps working on them.",
      body: "Carry this store into Beseam. Keep discovery and store checks running, turn the strongest findings into prepared changes, approve before anything customer-facing changes, and recheck what moved.",
      benefits: [
        "Keep the same store under watch",
        "Turn findings into prepared changes",
        "Approve first, then measure again",
      ] as readonly [string, string, string],
      safetyAssurances: [
        "1-click Shopify connect (no theme code touched)",
        "Every customer-facing change requires your approval",
        "All changes stay 100% reversible",
        "The same shopper questions rerun to prove what moved",
      ] as readonly [string, string, string, string],
      prepared: "Prepared by Beseam",
      approval: "Needs your approval",
      afterConnection: "Checked after connection",
      start: "Keep monitoring this store",
      mobileStart: "Keep these under watch",
      carryStore: (domain: string) =>
        `${domain} is carried into setup. You will not start over.`,
      closingEyebrow: "Next step",
      closingTitle: (count: number) =>
        `Keep ${count === 1 ? "this priority" : `these ${count} priorities`} under watch in Beseam.`,
      closingBody:
        "Beseam keeps checking the store, prepares changes for your approval, and shows you what improved after each change.",
      reviewWithFinding: "Prefer to walk through this with us?",
      reviewWithoutFinding: "Prefer to walk through this with us?",
      startingWith: (headline: string) => `Starting with “${headline}”`,
      reviewBody:
        "In 20 minutes, we use one finding from this scan to show the full loop on your store: evidence, proposed change, approval, and recheck.",
      reviewCta: "Book a 20-minute store review",
    },
    visibility: {
      googleSearch: "Google search:",
      excerpt: "Excerpt of what came back · not the full reply",
      unreachable: (channel: string, error: string) =>
        `${channel} could not be reached: ${error}`,
      noWrittenAnswer: (channel: string) =>
        `${channel} returned no written answer for this question.`,
      namedYou: "Named you",
      didNotNameYou: "Did not name you",
      noVerdict: "No verdict",
      namedInstead: "named instead:",
      productsSurfaced: "Products put in front of the shopper",
      noProducts: "No products were surfaced",
      addsUpTo: "What this adds up to",
      noUsableAnswer: "No assistant returned a usable answer here.",
      verdictAll: (count: number) =>
        `You were named by ${count === 1 ? "the assistant" : `all ${count} assistants`} asked this question.`,
      verdictNone: (count: number, rivals: string) =>
        `None of the ${count} ${count === 1 ? "assistant" : "assistants"} asked this question named you.${rivals}`,
      verdictSome: (named: number, count: number, rivals: string) =>
        `${named} of ${count} ${count === 1 ? "assistant" : "assistants"} named you.${rivals}`,
      rivalsTail: (names: string, count: number) =>
        ` ${names} ${count === 1 ? "was" : "were"} put forward instead.`,
      askedOne: "asked to 1 assistant",
      askedMany: (count: number) =>
        `asked to each of ${count} assistants separately`,
      title: "How AI shopping assistants see you",
      summary: (named: number, total: number, questions: number) =>
        `${named === 0 ? `None of the ${total}` : named === total ? `All ${total}` : `${named} of ${total}`} usable AI shopping ${total === 1 ? "answer" : "answers"} named you · ${questions} buying ${questions === 1 ? "question" : "questions"}`,
      summaryWithAttempts: (
        named: number,
        usable: number,
        attempts: number,
        questions: number,
      ) =>
        `${named === 0 ? `None of the ${usable}` : named === usable ? `All ${usable}` : `${named} of ${usable}`} usable AI shopping ${usable === 1 ? "answer" : "answers"} named you · ${attempts} attempts across ${questions} buying ${questions === 1 ? "question" : "questions"}`,
      usableAttempts: (usable: number, total: number) =>
        `${usable} of ${total} attempts recommended specific stores (remaining were informational)`,
      noUsableAttempts: (total: number) =>
        `${total} ${total === 1 ? "attempt" : "attempts"} · informational only (no stores named)`,
      noUsableSummary: (attempts: number, questions: number) =>
        `0/${attempts} assistant attempts returned a usable answer · ${questions} buying ${questions === 1 ? "question" : "questions"}`,
      checking: "Checking what shoppers are being shown",
      competitors: "Competitors named when you were not",
      assistantEvidence: "View assistant evidence",
      openQuestion: "Open a question to see what each assistant answered",
      askedIn: (language: string) => `Asked in ${language}`,
    },
    summary: {
      evidenceHeading: "Evidence & coverage",
      evidenceIntro:
        "See what Beseam actually measured, what needs review, and where to open the full page-level evidence.",
      productCatalog: "Product catalog",
      noCatalogBrandSite: "No product catalog found. Audited as a brand site.",
      homepage: "Your homepage",
      homepageGated: "Confirm your email and we read your homepage closely",
      homepageReading: "Reading your homepage and trust pages now",
      homepageFailed: "We could not read your homepage on this run.",
      homepageCompleted: "Homepage audit completed",
      homepageSummary: (_score: number, failed: number, total: number) =>
        `Homepage checked · ${failed ? `${failed} ${failed === 1 ? "observation" : "observations"} to review` : "no observations flagged"} · ${total} check results measured`,
      trustPages: "Trust pages",
      aboutPage: "About page",
      contactPage: "Contact page",
      pageCouldNotRead: "We could not read this page on this run.",
      openFullReport: "Open full report",
      store: "Store",
      catalog: "Catalog",
      productPages: "Product pages",
      collectionPageAudits: "Collection pages",
      collectionPagesGated: (count: number) =>
        `Up to ${count} representative collection ${count === 1 ? "page" : "pages"} · after email confirmation`,
      collectionPagesReading: "Reading representative collection pages now",
      collectionPagesUnavailable:
        "No representative collection page was available for a close read on this run.",
      contentPageAudits: "Editorial & content",
      contentPagesGated: (count: number) =>
        `Up to ${count} representative content ${count === 1 ? "page" : "pages"} · after email confirmation`,
      contentPagesReading:
        "Reading representative editorial and content pages now",
      contentPagesUnavailable:
        "No representative editorial/content page was available for a close read on this run.",
      sampledPageGroupSummary: (
        pages: number,
        failed: number,
        evaluated: number,
        unreadable: number,
      ) =>
        `${pages} ${pages === 1 ? "page" : "pages"} sampled · ${failed ? `${failed} ${failed === 1 ? "observation" : "observations"} to review` : "no observations flagged"} · ${evaluated} check results measured${unreadable ? ` · ${unreadable} could not be read` : ""}`,
      templatePatterns: "Repeated across sampled pages",
      templatePatternCoverage: (affected: number, total: number) =>
        affected === total
          ? `Seen on all ${total} sampled pages`
          : `Seen on ${affected} of ${total} sampled pages`,
      templatePatternHint:
        "Because this repeats on multiple pages of the same type, it may come from their shared template rather than one isolated page.",
      pdpLayoutCoverage: "PDP layout coverage",
      pdpLayoutCoverageSummary: (
        detected: number,
        covered: number,
        audits: number,
      ) =>
        `${detected} ${detected === 1 ? "layout" : "layouts"} detected · ${covered} represented in ${audits} ${audits === 1 ? "audit" : "audits"}`,
      pdpLayoutsAllCovered: "All detected layouts represented",
      pdpLayoutsPartiallyCovered: (covered: number, detected: number) =>
        `${covered} of ${detected} detected layouts represented`,
      pdpLayoutAuditCount: (count: number) => `${count} audited`,
      pdpLayoutObservedCount: (count: number) =>
        `${count} candidate ${count === 1 ? "PDP" : "PDPs"} matched`,
      pdpLayoutPublicTemplate: "template key exposed publicly",
      pdpLayoutStructural: "detected from page structure",
      pdpLayoutSampleNote: (count: number) =>
        `Detected from ${count} public ${count === 1 ? "PDP" : "PDPs"}. This is representative sampling, not a complete theme/template inventory.`,
      sampledPageGroupGatedBody:
        "We sample a few representative pages rather than crawling every URL, so the scan stays fast while still checking the template shoppers and assistants actually encounter.",
      publicFootprint: "Public footprint",
      localePaths: "Locale paths",
      domains: "Domains",
      whatExists: "What exists",
      discoverable: "Can it be discovered?",
      productPagesLabel: "Product pages",
      collections: "Collections",
      collectionUrls: "Collection URLs",
      pages: "Pages",
      articles: "Articles",
      blogs: "Blogs",
      policies: "Policies",
      localeCopies: "Locale URL copies",
      searchPageSignals: "Search & page signals",
      productShoppingData: "Product & shopping data",
      contentMerchandising: "Content & merchandising",
      trustConfidence: "Trust & purchase confidence",
      marketsLocalization: "Markets & localization",
      technicalSecurity: "Technical & security",
      notMeasured: "Not measured",
      readable: "Readable",
      open: "Open",
      unavailable: "Unavailable",
      found: "Found",
      declared: "Declared",
      notFound: "Not found",
      blocked: (count: number) => `${count} blocked`,
      quickNotMeasured: "Not measured in quick scan",
      primary: "Primary",
      primaryStorefront: "Primary storefront",
      platformUnknown: "platform unknown",
      publicUrls: "Public URLs discovered",
      productsSampled: (count: number) => `${count} products sampled`,
      localePathCount: (count: number) => `${count} locale paths`,
      storeSummary: (
        products: string,
        _collections: string,
        _location: string,
        sitemap: string,
        crawler: string,
      ) =>
        `${products} products found · sitemap ${sitemap} · search crawler access ${crawler}`,
      internalReachSummary: (
        links: number,
        products: number,
        collections: number,
      ) =>
        `${links} homepage links · ${products} product · ${collections} collection`,
      pageAuditSummary: (
        pages: number,
        failed: number,
        evaluated: number,
        unchecked: number,
      ) =>
        `${pages} representative product ${pages === 1 ? "page" : "pages"} · ${evaluated} qualified checks${failed ? ` · ${failed} need review` : " · no qualified checks need review"}${unchecked ? ` · ${unchecked} not measured` : ""}`,
      pdpQualitySummary: (
        pages: number,
        score: number,
        qualified: number,
        diagnostics: number,
      ) =>
        `${pages} representative ${pages === 1 ? "PDP" : "PDPs"} · average quality ${score}/100 · ${qualified} qualified results · ${diagnostics} deep results`,
      pdpQualityHeading: "Product-page quality",
      pdpQualityAverage: "Average page quality",
      pdpQualifiedChecks: "Qualified grade results",
      pdpChecksNeedReview: (count: number) => `${count} need review`,
      pdpChecksPassed: (count: number) => `${count} passed`,
      pdpDeepDiagnostics: "Deep check results",
      pdpDiagnosticsMeasured: (count: number) => `${count} measured`,
      pdpDiagnosticsUnavailable: (count: number) => `${count} not measured`,
      pdpDiagnosticsComplete: "All available diagnostics measured",
      localizedCopies: (count: number) => `${count}+ localized URL copies`,
      robots: "robots.txt",
      sitemap: "Sitemap",
      searchCrawlers: "Search crawlers",
      assistantCrawlers: "Assistant crawlers",
      blockedUrls: "URLs blocked by robots",
      internalReach: "Internal reach",
      orphanProducts: "Orphan products",
      discoveryFiles: "Discovery files",
      sitemapFreshness: "Sitemap freshness",
      sitemapImages: "Images in sitemap",
      allowed: (allowed: number, total: number) =>
        `${allowed}/${total} allowed`,
      noDates: "No dates exposed",
      noImages: "No image entries exposed",
      lowerBounds:
        "Counts with + are lower bounds because the quick URL inventory reached its 5,000-URL cap.",
      homepageSample:
        "Homepage paths are sampled here. True orphan coverage needs the full internal-link graph.",
      emergingFiles: (present: number, total: number) =>
        `Those four are emerging conventions for telling AI assistants what your store is and how to use it. ${present} of ${total} are published. None of them is required, none is known to affect how you rank in search today, and a missing one is not a fault. We report them because the stores that publish them are easier for assistants to read correctly, not because you are doing anything wrong without them.`,
      catalogQuestion: "Can products be understood and distinguished?",
      countsChecked: "counts below cover the products checked",
      withGap: (count: number) => `${count} products with at least one gap`,
      catalogSummary: (
        checked: string,
        gaps: number,
        unavailable: number,
        _consistency: number,
      ) =>
        `${checked} · ${gaps} have at least one catalog gap · ${unavailable} currently unavailable`,
      catalogGaps: (count: number) =>
        `${count} catalog ${count === 1 ? "gap" : "gaps"}`,
      productTypes: (count: number) => `${count} product types`,
      categories: "Categories & collections",
      withoutCategory: "without category",
      withoutTags: "without tags",
      membership: "Collection membership:",
      commonTypes: "Common product types:",
      collectionsList: "Collections:",
      identity: "Product identity",
      withoutId: "without SKU/barcode",
      brandVendorGaps: "brand/vendor gaps",
      idConflicts: "identifier conflicts",
      variants: "Variants & buyer options",
      withVariants: "products with variants",
      noBuyerOptions: "expose no buyer options",
      variantOptionGaps: "true variant-option gaps",
      variantIdGaps: "variant ID gaps",
      options: "Options:",
      productInfo: "Product information",
      wellDescribed: "well described",
      missingDescriptions: "missing descriptions",
      thin: "thin",
      withoutImages: "without images",
      duplicateCopy: "duplicate copy",
      availability: "Availability",
      unavailableProducts: "unavailable products",
      variantsAcross: "variants across",
      checkedProducts: "checked products",
      consistency: "Product consistency",
      comparingPages: "Comparing sample product pages…",
      sampledGaps: "sampled gaps",
      consistencyBody: (pages: number) =>
        `Catalog ↔ page data for price, availability, product data and buyer attributes on ${pages} sample product pages.`,
      standsOut: "What stands out",
      high: "High",
      catalogLimited:
        "Catalog-wide detail is limited on this storefront; the representative product pages continue below.",
      pagesReading: (count: number) => `${count} product pages · reading now`,
      pagesFailed: (count: number) =>
        `${count} product pages · we could not finish reading them`,
      pagesUnavailable:
        "Representative product-page inspection was not available in this run",
      pagesGated: (count: number) =>
        `${count} product pages · after you confirm your email`,
      pagesGatedBody:
        "Reading these pages closely is the slow half of the scan, and confirming your email is what starts it. The store and catalog evidence above stays exactly where it is.",
      inspecting: (count: number) =>
        `Inspecting ${count} representative product pages`,
      evidenceReady:
        "Store and catalog evidence is already available above. Page-level results will appear here automatically.",
      pdpFailed:
        "The Store and Catalog observations are still valid. The representative PDP inspection could not complete on this run.",
      sampleShows: "What the sample product pages show",
      deepAuditCoverage: "Audit depth by area",
      deepAuditCoverageSummary: (
        pages: number,
        measured: number,
        notMeasured: number,
      ) =>
        `${measured} diagnostic check results measured across ${pages} sampled ${pages === 1 ? "PDP" : "PDPs"}${notMeasured ? ` · ${notMeasured} additional results not measured` : ""}`,
      deepAuditCoverageNote:
        "The area cards summarize the registered SEO, AI-shopping, GEO, CRO, shopping, trust and security domains. Category playbooks, catalog↔PDP parity, AI probes and other specialized checks are included in the deep total; Lighthouse and visual evidence live in each page report.",
      areaClear: "No observations flagged",
      areaIssues: (count: number) =>
        `${count} ${count === 1 ? "observation" : "observations"} to review`,
      areaCoverage: (measured: number, notMeasured: number) =>
        `${measured} check results measured${notMeasured ? ` · ${notMeasured} not measured` : ""}`,
      semanticSignalsHeading: "SEO & structured-data signals",
      semanticSignalsNote:
        "These are semantic checks, not syntax checks. Product and Offer can be supplied as JSON-LD, Microdata or RDFa; Beseam does not mark a page down merely for not using JSON-LD specifically.",
      opportunity: "Opportunity",
      signalIssues: (issues: number, total: number) =>
        `${issues} of ${total} sampled ${total === 1 ? "PDP needs" : "PDPs need"} attention`,
      signalVerified: (passed: number, total: number) =>
        passed === total
          ? `Verified on all ${total} sampled ${total === 1 ? "PDP" : "PDPs"}`
          : `Verified on ${passed} of ${total} sampled PDPs`,
      signalNotMeasured: (count: number) => `${count} not measured`,
      signalLabels: {
        "seo.l2.product_schema_present": "Product structured data",
        "seo.l2.offer_present": "Offer structured data",
        "seo.l3.schema_visible_parity": "Structured data ↔ visible page",
        "seo.l1.canonical_present": "Canonical URL",
        "seo.l1.title_present": "Page title",
        "shopping.l2.price_present": "Price",
        "shopping.l2.availability_present": "Availability",
        "shopping.l2.brand_present": "Brand",
        "shopping.l2.identifier_present": "Product identifier",
        "shopping.l2.image_present": "Product image",
        "shopping.l2.description_present": "Product description",
        "shopping.l2.description_sufficient": "Description depth",
        "aeo.l3.variant_picker_present": "Variant selector",
      },
      pdpRepeatedPatterns: "Repeated across sampled product pages",
      pdpRepeatedHint:
        "These are the patterns worth fixing before chasing one-off page details.",
      sampledPagesDisclosure: (count: number) =>
        `${count} sampled product ${count === 1 ? "page" : "pages"}`,
      sampledPagesHeading: "Sampled product pages",
      sampledPagesNote:
        "Open any page for its full Lighthouse, section analysis, AI checks, technical audit and evidence.",
      needAttention: (count: number) => `${count} need attention`,
      checked: (count: number) => `of ${count} checked`,
      couldNotCheck: (count: number) => ` · ${count} we could not check`,
      passedOf: (passed: number, total: number) => `${passed}/${total} passed`,
      verifiedInSample: "Verified in this sample",
      notMeasuredCount: (count: number) => ` · ${count} not measured`,
      pageCheckResult: (
        failed: number,
        evaluated: number,
        unevaluated: number,
      ) =>
        failed
          ? `${failed} grade ${failed === 1 ? "result" : "results"} need review · ${evaluated} qualified results${unevaluated ? ` · ${unevaluated} not measured` : ""}`
          : `${evaluated} qualified results passed${unevaluated ? ` · ${unevaluated} not measured` : ""}`,
      health: (score: number) => `Quality ${score}/100`,
      needAttentionOf: (failed: number, total: number) =>
        `${failed} of ${total} need attention`,
      openReport: "Open the page report",
      reportUnavailable: "Report unavailable",
    },
    deeper: {
      eyebrow: "Next · full audit",
      title: "Confirm your email before we start the full audit.",
      intro:
        "We found the first opportunities above. One click in your inbox starts the deeper page audit and AI review, including what ChatGPT and Google AI Mode tell shoppers.",
      assurances: [
        "Free",
        "No account",
        "One email, no marketing list",
      ] as readonly [string, string, string],
      aiPages: "Page-by-page AI review",
      aiPagesDetail:
        "Open any product page report and AI goes through the page next to the findings above, then writes back concrete improvements and the page copy it based them on.",
      shopperAnswers: "ChatGPT + Google AI Mode",
      shopperAnswersDetail: (count: number) =>
        `Questions written from the ${count} ${count === 1 ? "product" : "products"} we just read, put to ChatGPT and Google AI Mode, with the answers recorded.`,
      alternatives: "Competitors shown instead",
      alternativesDetail:
        "The competing brands and products that appear in place of yours.",
    },
    email: {
      sentTo: (email: string) => `Sent to ${email}`,
      completeTitle: "Your link is in your inbox.",
      continueTitle: "Confirm it to start the full audit.",
      completeBody:
        "Nothing on this page goes away. The link opens this same audit whenever you want it back.",
      continueBody:
        "Click the link in your inbox and we start the page-level audit, AI review, and shopper-question checks. This page stays here while they run.",
      differentEmail: "Send it to a different email",
      label: "Work email",
      runningLabel: "Start the full audit",
      completeLabel: "Keep this audit",
      completeIntro: (domain: string) =>
        `The audit for ${domain} is complete. Leave an address and we send you the link, so it is yours to open and keep.`,
      runningIntro: (domain: string) =>
        `We found the first opportunities on ${domain}. Confirm your email to start the deeper page audit, AI review, and ChatGPT + Google AI Mode checks.`,
      placeholder: "you@company.com",
      sending: "Sending…",
      send: "Send it",
      runningCta: "Send confirmation link",
      completeCta: "Email me the audit",
      assurances: [
        "No account",
        "No card",
        "One email, no marketing list",
      ] as readonly [string, string, string],
      sent: "Email sent",
      clickContinue: "One click in your inbox starts the full audit.",
      openSent: (email: string) =>
        `Open the link we sent to ${email}. Nothing on this page goes away in the meantime. You can keep reading, or come back to it later.`,
      sendAgain: "Send it again",
      differentAddress: "Use a different address",
      confirmTitle: "Confirm your email to start the full audit",
      confirmBody:
        "We send one link. Click it to start: no account, no card, no marketing list.",
      addEmail: "Add your email",
      privacyPrefix: "See our",
      privacy: "privacy policy",
    },
    errors: {
      scanDomain: "We could not scan that domain.",
      serviceUnavailable: "The scan service is unavailable right now.",
      missingToken:
        "That verification link is missing its token. Start or continue your scan below.",
      usedToken:
        "That verification link is invalid or has already been used. Start the scan again if you need a new link.",
      verifyUnavailable:
        "We could not verify that link right now. Try the link from your email again.",
      enterDomain: "Enter your store domain.",
      enterEmail: "Enter your work email.",
      invalidEmail: "Enter a valid work email.",
      ownDomain: "Enter your own store domain.",
      rateLimited:
        "Too many scan requests right now. Please try again shortly.",
      sendEmail: "We could not send the verification email.",
      sendEmailNow: "We could not send the verification email right now.",
      retrying: "Retrying…",
      tryAgain: "Try again",
      pollExhausted:
        "This audit is taking longer than expected. We will keep the evidence already found and stop showing an endless spinner if the worker has stopped.",
      auditDidNotFinish: "This audit did not finish.",
      auditDidNotFinishBody:
        "The results already shown are still available. Retry only the unfinished checks — you do not need to confirm your email again.",
      retryAudit: "Retry unfinished checks",
      retryAuditRunning: "Retrying audit…",
      running: "Running…",
      runAgain: "Run it again",
      rejectedTitle: (domain: string) => `We could not read ${domain}.`,
      blockedExplanation:
        "Your storefront turned our request away. That is usually a firewall or bot-protection rule, and it does not mean anything is wrong with your store.",
      noProductsExplanation:
        "We reached the site but could not find public product pages on it. That happens with storefronts that render products only after login, or that are not a shop at all.",
      genericExplanation:
        "The domain did not answer a public request. It may be misspelled, parked, or temporarily down.",
      blockedSuggestions: [
        "Check the domain is the storefront shoppers use, not a staging or admin address.",
        "Ask whoever maintains the store whether bot protection is blocking outside readers. The same rule usually blocks search engines too.",
      ] as readonly [string, string],
      noProductsSuggestions: [
        "Try the domain shoppers actually browse products on, including any market prefix.",
        "If your products are only visible after login, a public scan cannot reach them, but we can look at them with you.",
      ] as readonly [string, string],
      genericSuggestions: [
        "Check the spelling, and try it without www or a trailing path.",
        "If the site is live in your browser, wait a moment and run it again.",
      ] as readonly [string, string],
      reported: (reason: string) => `What the scan reported: ${reason}`,
      continueCta: "Connect this store in Beseam",
      reviewCta: "Get help with this store",
    },
  },
  scan: {
    eyebrow: "Free store scan",
    heading: "See what makes your products harder to find, choose, or buy.",
    intro:
      "Enter your store domain. Beseam reads the public storefront and shows where products may get missed, become hard to compare, or create buying friction, with evidence and what to fix first.",
    duration: "Usually about a minute.",
    // `FreeScanPromise`'s longer version of `intro`: it runs above the field
    // on /playbook, where the visitor has not come for a scan and needs the
    // scope, the delivery and the disclaimer in one paragraph.
    promiseBody:
      "We read your public store the way a search engine or an AI assistant reads it: your product pages, your catalog data, and your site settings. We email you the link to your audit, so you get what they can see, and what to fix first. It is not a keyword report. We do not measure search demand, and shopper questions come later, not here.",
    // The three limits of the free read. A boundary a visitor reads after
    // typing is a boundary that arrived too late.
    assurances: [
      "No account, no card",
      "Public storefront pages only",
      "No access to your store",
    ] as Triple<string>,
    formNote: {
      line: "Free scan reads your store once.",
      // Spelled out rather than composed from `loop.steps`: those labels are
      // cut to fit a diagram ring ("Planen", not "Vorbereiten"), and a label
      // sized for 68px has no business in a sentence.
      loop: "Beseam: Find → Prepare → Approve → Apply → Measure",
    },
    /**
     * The field itself, in `answer-check.tsx`. Everything past the submit --
     * progress steps, findings, errors -- is still English in both locales;
     * that is a separate task, and it is a large one. These are the strings a
     * visitor reads before they act.
     */
    form: {
      domainLabel: "Store domain",
      websiteHoneypot: "Website",
      domainPlaceholder: "yourstore.com",
      submit: "Scan my store",
      submitting: "Reading your store…",
      again: "Scan another store",
      startNote:
        "Starts immediately. We ask for your email only after the first findings are on screen.",
    },
    contentsHeading: "What we check",
    scopeNote: "Public storefront only · no store access",
    // The four groups of checks the public scan actually runs, in the order
    // they run (`storefront.py`, `page_audit.py`). The fourth is deliberately
    // the limit rather than a feature: a one-off sample, not the ongoing
    // product.
    contents: [
      {
        label: "Your storefront",
        detail:
          "Robots file, sitemap, and whether search and AI crawlers are allowed in at all.",
      },
      {
        label: "Your catalog data",
        detail:
          "Categories, brand, descriptions, images, variant options, SKUs and barcodes, availability, duplicates.",
      },
      {
        label: "Your product pages",
        detail:
          "We read a sample of pages in full, then compare them with your catalog: names, prices and stock that do not match.",
      },
      {
        label: "A sample AI answer",
        detail:
          "One look at how assistants describe your store today. Asked once here; asked on a schedule in the app.",
      },
    ] as Quad<Labelled>,
    notKeywordReport:
      "Every finding names the products behind it and links to the pages we read. It is not a keyword report. We do not measure search demand, and shopper questions come later, not here.",
    returnsHeading: "What you get back",
    returns: [
      {
        term: "What we can find",
        detail:
          "How many of your products are public, plus a sample of product pages read end to end.",
      },
      {
        term: "Where shoppers may lose you",
        detail:
          "In plain words: which products may get skipped, be hard to choose between, or be hard to buy.",
      },
      {
        term: "What to fix first",
        detail:
          "One next step per finding, with the evidence under it. A public scan cannot prove revenue impact, and we do not claim it.",
      },
    ] as Triple<Termed>,
    once: "This scan reads your store once. Beseam keeps checking, and proves what changed.",
    continuous: "See what runs continuously →",
    beyond: {
      eyebrow: "After the free scan",
      heading: "A scan finds the gap. Beseam keeps working after you leave.",
      body: "Keep the same shopper questions running, turn the strongest findings into prepared changes, approve what reaches customers, and recheck the evidence after each change.",
      review:
        "Or bring your store to a twenty-minute review, and we will use one real finding to show what Beseam found, what it would change, and what it checks again afterward.",
      start: "Start free with my store",
      book: "Book a 20-minute store review",
    },
  },
};

export const en = enDictionary;
export type Dictionary = typeof enDictionary;
