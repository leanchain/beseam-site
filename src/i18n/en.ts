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
        label: "What teams run on it",
        note: "The list keeps growing",
        /** Stands in for the explore link where the section links nowhere. */
        noLinkNote: "Connected coverage",
      },
    },
    /**
     * Split around their numbers rather than interpolated, because both sit
     * between two counts the component computes. German keeps the same order,
     * so the halves stay halves.
     */
    feedsBefore: "Feeds ",
    feedsBetween: " of ",
    inputBefore: "Input — what ",
    inputAfter: " reads",
    platformLabel: "Platform",
    platformQuestion: "What will this shopper choose?",
    explore: "Explore the platform",
    signalsUsed: "Signals used:",
    servedLive: "Served live",
    moreLabel: "+ more",
    moreDetail:
      "Campaigns, reliability, experiments, segments, media studio, marketplaces, fit. Not every capability is enabled for every store.",
    hint: "Select a signal to light what it feeds",
    /**
     * `scope` sits in a fixed 2.25rem slot and `caveat` under a 16rem column,
     * so both are two lines of a narrow measure: keep a locale's version close
     * to the English length rather than closer to the English wording.
     */
    signals: {
      discovery: {
        label: "AI discovery",
        layer: "Off-site",
        scope: "Where products enter — or miss — the shortlist.",
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
    /** Card-width names for the signals a use case reads. */
    short: {
      discovery: "Discovery",
      store: "Store",
      behavior: "Behavior",
      revenue: "Revenue",
    },
    /** One entry per real surface in the product. */
    cards: {
      aiAnswerVisibility: {
        name: "AI answer visibility",
        detail:
          "Named for the questions that matter, and what supported the answer.",
      },
      competitors: {
        name: "Competitors chosen instead",
        detail: "What appears in your place, tracked over time.",
      },
      agentReadiness: {
        name: "Agent readiness",
        detail: "Whether shopping agents can read the storefront at all.",
      },
      catalogTruth: {
        name: "Catalog truth",
        detail:
          "Fields, variants, freshness, and stock as a shopper meets them.",
      },
      productPageEvidence: {
        name: "Product page evidence",
        detail: "What the page answers, and what it leaves open.",
      },
      storeHealth: {
        name: "Store health and crawlability",
        detail: "Indexability, structured facts, machine readability.",
      },
      brandClaims: {
        name: "Brand claims and trust",
        detail: "Claims with enough evidence behind them to reuse safely.",
      },
      personalizedSearch: {
        name: "Personalized search and recommendations",
        detail: "Ranked results and placements, served live and measured.",
      },
      whyBuyersLeave: {
        name: "Why buyers leave",
        detail: "Sessions, replay, heatmaps, and the friction they show.",
      },
      funnels: {
        name: "Funnels, cohorts, journeys",
        detail: "Where shoppers move forward, and who stops.",
      },
      revenueAttribution: {
        name: "Revenue and attribution",
        detail:
          "Actual revenue, observed changes, attribution, and estimates stay separate.",
      },
      whatChanged: {
        name: "What changed",
        detail: "Before and after, tied to one completed change.",
      },
      oneChangeList: {
        name: "One change list",
        detail:
          "Every proposed change with an owner, approval status, and a check afterward.",
      },
    },
  },

  /**
   * `app-screens.tsx` -- the two rebuilt product screens. Row order, which row
   * leads, the effort tone and the column geometry stay in the component. The
   * ledger's figures live here because they are illustrative, and how a figure
   * is written is part of the locale: "1 in 12" is "1 von 12", and a delta has
   * to stay inside a 4.75rem column in every language.
   */
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
