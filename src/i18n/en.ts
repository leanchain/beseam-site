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
    names: { en: "English", de: "Deutsch" },
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
};

export const en = enDictionary;
export type Dictionary = typeof enDictionary;
