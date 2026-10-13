import type { LucideIcon } from "lucide-react";
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

import type { Locale } from "@/i18n/locale-rules.mjs";
import { PRODUCT_PAGES_DE } from "@/lib/content/product-pages.de";
import { PRODUCT_PAGES_NL } from "@/lib/content/product-pages.nl";

/**
 * The page shape shared by /product and /solutions, and the four product
 * pages under /product, one per thing Beseam does. German and Dutch
 * versions live in `src/lib/content/`, with the same slugs.
 *
 * Copy rules: every answer and benefit states only what the homepage and FAQ
 * already promise. Pricing, platforms beyond Shopify and customer results
 * are deliberately absent until they are confirmed.
 */
/** The hero visual on industry pages: a question to AI and its answer. */
export type HeroChatData = {
  prompt: string;
  reply: string;
  product: {
    name: string;
    store: string;
    price: string;
    /** An unbranded product photo, 4:3 or close to it. */
    image: string;
    facts: readonly string[];
  };
  sticker: string;
};

/** The hero visual on product pages: one pillar card with a sticker. */
export type HeroCardData = { visual: PillarVisual; sticker: string };

/** The illustrative card next to one pillar row. */
export type PillarVisual =
  | {
      kind: "visibility";
      label: string;
      rows: readonly { prompt: string; recommended: boolean }[];
    }
  | {
      kind: "description";
      before: { label: string; text: string };
      after: { label: string; text: string };
    }
  | {
      kind: "pages";
      label: string;
      rows: readonly { type: string; title: string; status: string }[];
    }
  | {
      kind: "checks";
      label: string;
      rows: readonly { label: string; ok: boolean; detail: string }[];
    };

/** One Beseam product, applied to an industry. */
export type PillarData = {
  /** The /product page this row links to; also names the eyebrow. */
  product: string;
  title: string;
  body: string;
  points: readonly string[];
  visual: PillarVisual;
};

export type ProductPageData = {
  slug: string;
  /** Menu and breadcrumb name. */
  name: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  intro: string;
  /** Optional hero visual; the hero becomes two columns on desktop. */
  heroChat?: HeroChatData;
  /** Optional hero card for product pages, in place of a chat. */
  heroCard?: HeroCardData;
  benefitsHeading: string;
  /** Show the benefit cards even when the page has pillars. */
  showBenefits?: boolean;
  benefits: readonly { title: string; body: string; icon: LucideIcon }[];
  /** Optional example questions shoppers put to AI (industry pages). */
  shopperQuestions?: { heading: string; items: readonly string[] };
  /**
   * Optional rows that apply each Beseam product to this industry, each with
   * a small illustrative visual (industry pages).
   */
  pillars?: {
    heading: string;
    intro: string;
    items: readonly PillarData[];
  };
  /** Optional checklist of what AI looks for on this kind of page. */
  checklist?: {
    heading: string;
    intro: string;
    items: readonly { title: string; body: string }[];
  };
  /** Optional common mistakes and how to avoid them. */
  mistakes?: {
    heading: string;
    items: readonly { title: string; body: string }[];
  };
  /** Optional product-page slugs to link at the bottom, before siblings. */
  relatedProducts?: readonly string[];
  stepsHeading: string;
  steps: readonly { title: string; body: string }[];
  faqs: readonly { question: string; answer: string }[];
};

export const PRODUCT_PAGES: readonly ProductPageData[] = [
  {
    slug: "ai-visibility-tracking",
    name: "AI visibility tracking",
    metaTitle: "AI Visibility Tracking for Webshops | Beseam",
    metaDescription:
      "Track when ChatGPT, Claude, Gemini and other AI assistants recommend your products, and how AI visibility turns into traffic and revenue for your webshop.",
    headline: "See when AI recommends your products",
    intro:
      "Beseam monitors answers from ChatGPT, Claude, Gemini, Google AI Mode, Perplexity and Copilot for the questions your shoppers ask. See where your brand and products are mentioned, who is recommended instead, and how AI visibility turns into traffic and revenue.",
    heroCard: {
      visual: {
        kind: "visibility",
        label: "Waterproof boots for commuting",
        rows: [
          { prompt: "ChatGPT", recommended: true },
          { prompt: "Claude", recommended: true },
          { prompt: "Gemini", recommended: false },
          { prompt: "Google AI Mode", recommended: true },
          { prompt: "Perplexity", recommended: false },
          { prompt: "Copilot", recommended: true },
        ],
      },
      sticker: "Recommended in 4 of 6 assistants",
    },
    benefitsHeading: "Know exactly where you stand in AI search",
    benefits: [
      {
        title: "Every major AI assistant",
        body: "Track ChatGPT, Claude, Gemini, Google AI Mode, Perplexity and Copilot in one place, for the questions shoppers actually ask.",
        icon: Bot,
      },
      {
        title: "Down to product level",
        body: "See which products get recommended, which get missed, and which competitors appear in their place.",
        icon: Package,
      },
      {
        title: "Connected to revenue",
        body: "Link AI visibility to AI-referred traffic and revenue, broken down by topic, prompt, product and landing page.",
        icon: TrendingUp,
      },
    ],
    stepsHeading: "How AI visibility tracking works",
    steps: [
      {
        title: "Connect your Shopify webshop",
        body: "Beseam imports your catalogue and builds the questions shoppers ask about your products.",
      },
      {
        title: "Track the answers",
        body: "Beseam asks those questions across AI assistants on a regular schedule and records who gets recommended.",
      },
      {
        title: "See the impact",
        body: "Follow how your AI visibility, traffic and revenue change over time.",
      },
    ],
    faqs: [
      {
        question: "Which AI assistants does Beseam track?",
        answer:
          "Beseam tracks ChatGPT, Claude, Gemini, Google AI Mode, Perplexity and Copilot, using the questions your shoppers ask about your products.",
      },
      {
        question: "What is AI visibility?",
        answer:
          "AI visibility is how often, and how prominently, AI assistants mention or recommend your brand and products when shoppers ask what to buy.",
      },
      {
        question: "Can I see which competitors AI recommends instead of me?",
        answer:
          "Yes. For every tracked question, Beseam shows which brands and products the assistant recommended, so you can see who appears in your place.",
      },
      {
        question: "How does Beseam know which questions to track?",
        answer:
          "Beseam builds the questions from your own catalogue: the kind of questions shoppers ask AI assistants before buying products like yours.",
      },
      {
        question: "How often does Beseam check AI answers?",
        answer:
          "Beseam asks the same questions across AI assistants on a regular schedule, so you can follow how your visibility changes over time.",
      },
      {
        question: "How is AI visibility connected to revenue?",
        answer:
          "Beseam links AI visibility to AI-referred traffic and revenue, broken down by topic, prompt, product and landing page, so you can see what being recommended is worth.",
      },
      {
        question: "Why do different AI assistants give different answers?",
        answer:
          "Each assistant uses its own model, sources and update schedule, so the same question can get different recommendations. That's why Beseam tracks them side by side.",
      },
      {
        question: "What can I do when AI doesn't recommend my products?",
        answer:
          "Beseam shows what to fix first: product descriptions, content or technical issues, ranked by expected revenue impact.",
      },
    ],
  },
  {
    slug: "product-descriptions",
    name: "Product descriptions",
    metaTitle: "AI-Optimised Product Descriptions for Webshops | Beseam",
    metaDescription:
      "Optimise product descriptions and product data so ChatGPT, Gemini and other AI assistants understand your products and recommend them to the right shoppers.",
    headline: "Product descriptions AI understands and recommends",
    intro:
      "AI assistants recommend the products they understand best. Beseam optimises your descriptions and fills gaps in your product data, so assistants know what each product is, who it's for and when to recommend it.",
    heroCard: {
      visual: {
        kind: "description",
        before: {
          label: "Before",
          text: "Our most popular boot. Stylish, comfortable and perfect for every season!",
        },
        after: {
          label: "Optimised for AI",
          text: "A waterproof leather Chelsea boot with a grippy rubber sole, made for daily commuting in the rain. EU 36–46, in standard and wide fit. Runs true to size.",
        },
      },
      sticker: "Ready to approve",
    },
    benefitsHeading: "Descriptions that match how shoppers ask",
    benefits: [
      {
        title: "Written for real questions",
        body: "Descriptions answer what shoppers ask AI before they buy, such as use case, fit, materials and who the product is for.",
        icon: MessageSquareText,
      },
      {
        title: "Complete product data",
        body: "Beseam finds missing attributes such as sizes, materials and specifications, and suggests how to fill them.",
        icon: ListChecks,
      },
      {
        title: "At catalogue scale",
        body: "Optimise hundreds or thousands of products, starting with the ones that matter most to your revenue.",
        icon: Layers,
      },
    ],
    stepsHeading: "How product description optimisation works",
    steps: [
      {
        title: "Find the gaps",
        body: "Beseam reads every product and compares it with what shoppers ask AI assistants.",
      },
      {
        title: "Review the suggestions",
        body: "Get optimised descriptions and completed product data, ranked by expected revenue impact.",
      },
      {
        title: "Approve or automate",
        body: "Publish changes in one click, or let Beseam apply the types of changes you trust automatically.",
      },
    ],
    faqs: [
      {
        question: "Why do product descriptions matter for AI search?",
        answer:
          "AI assistants recommend products they can clearly match to a shopper's question. Specific, complete descriptions and product data make that match possible.",
      },
      {
        question: "Which products does Beseam optimise first?",
        answer:
          "Beseam ranks products by their expected revenue impact, so your bestsellers and highest-potential products come first.",
      },
      {
        question: "Will Beseam overwrite my existing descriptions?",
        answer:
          "Not without your approval. Every suggested change waits for you, unless you choose to automate that type of change, and all changes stay reversible.",
      },
      {
        question: "What does an AI-optimised product description look like?",
        answer:
          "It states the facts shoppers ask about, such as use case, fit, materials, sizes and specifications, in plain language. Vague marketing phrases make way for specific details AI can match to a question.",
      },
      {
        question: "What product data does Beseam fill in?",
        answer:
          "Beseam finds missing attributes such as sizes, materials and specifications, and suggests how to fill them, for every product and variant.",
      },
      {
        question: "Can I review suggestions before they go live?",
        answer:
          "Yes. Every suggestion waits for your review, unless you choose to automate that type of change, and all changes stay reversible.",
      },
      {
        question: "Will optimising for AI affect my Google rankings?",
        answer:
          "Clear, specific product information is what both search engines and AI assistants reward, so optimising for AI and for Google point in the same direction.",
      },
      {
        question: "Which webshop platforms does Beseam work with?",
        answer:
          "Beseam currently works with Shopify webshops, which connect in one click without touching your theme code.",
      },
    ],
  },
  {
    slug: "content-creation",
    name: "Content creation",
    metaTitle: "AI-Optimised Content for Webshops | Beseam",
    metaDescription:
      "Create and optimise collection pages, comparison pages, blogs and guides that AI assistants draw on when shoppers ask what to buy.",
    headline: "Content that puts your webshop in AI answers",
    intro:
      "When shoppers ask AI what to buy, assistants draw on pages that explain, compare and recommend. Beseam helps you create and optimise the collection pages, comparison pages, blogs and guides that put your products in those answers.",
    heroCard: {
      visual: {
        kind: "pages",
        label: "Content gaps found",
        rows: [
          {
            type: "Collection",
            title: "Waterproof boots for commuting",
            status: "New page",
          },
          {
            type: "Guide",
            title: "How to choose a rain jacket",
            status: "Draft ready",
          },
          {
            type: "Comparison",
            title: "Linen vs cotton shirts",
            status: "New page",
          },
          {
            type: "Collection",
            title: "Skincare for sensitive skin",
            status: "Improve",
          },
        ],
      },
      sticker: "Ranked by revenue impact",
    },
    benefitsHeading: "The pages AI assistants draw on",
    benefits: [
      {
        title: "Collection pages",
        body: "Turn collection pages into clear overviews that help AI assistants recommend the right part of your range.",
        icon: LayoutGrid,
      },
      {
        title: "Comparison pages",
        body: "Answer “which one should I buy?” questions with clear comparisons that feature your products.",
        icon: Scale,
      },
      {
        title: "Blogs and guides",
        body: "Cover the topics shoppers research before they buy, so assistants cite your store as a source.",
        icon: BookOpen,
      },
    ],
    stepsHeading: "How content creation works",
    steps: [
      {
        title: "Find the content gaps",
        body: "Beseam shows which shopper questions have no good page on your webshop yet.",
      },
      {
        title: "Get a draft",
        body: "Beseam prepares new pages or improvements to existing ones, built around your own products.",
      },
      {
        title: "Approve and publish",
        body: "Review, edit and approve, then track how the content affects your AI visibility.",
      },
    ],
    faqs: [
      {
        question: "What kind of content does Beseam create?",
        answer:
          "Beseam creates and optimises collection pages, comparison pages, blog posts and buying guides, all built around your own products.",
      },
      {
        question: "Do I need to write the content myself?",
        answer:
          "No. Beseam prepares drafts for you to review, edit and approve before anything goes live.",
      },
      {
        question: "Why does content matter for AI search?",
        answer:
          "AI assistants base their recommendations on sources that explain and compare products. Helpful content on your own webshop gives them a reason to mention your products.",
      },
      {
        question: "How does Beseam find content gaps?",
        answer:
          "Beseam compares the questions shoppers ask AI assistants with the pages on your webshop, and shows which questions have no good page yet.",
      },
      {
        question: "Which content does Beseam suggest first?",
        answer:
          "Content gaps are ranked by expected revenue impact, so you start with the pages most likely to bring in sales.",
      },
      {
        question: "Can Beseam improve pages I already have?",
        answer:
          "Yes. Besides new pages, Beseam suggests improvements to your existing collection pages, blog posts and guides.",
      },
      {
        question: "Is content written with AI bad for SEO?",
        answer:
          "What matters is whether content is helpful. Beseam's drafts are built around your own products and the questions shoppers ask, and you review and edit them before anything goes live.",
      },
      {
        question: "How do I know if new content works?",
        answer:
          "Beseam tracks how your AI visibility changes after content goes live, for the questions the content was written to answer.",
      },
    ],
  },
  {
    slug: "technical-performance",
    name: "Technical performance",
    metaTitle: "Technical AI Search Optimisation for Webshops | Beseam",
    metaDescription:
      "Fix structured data, crawler access and slow pages so ChatGPT, Gemini and other AI assistants can read and trust every page of your webshop.",
    headline: "Make every page of your webshop readable for AI",
    intro:
      "AI assistants can only recommend what they can read. Beseam checks your structured data, crawler access and page speed, and shows exactly what to fix so assistants can read and trust every page of your store.",
    heroCard: {
      visual: {
        kind: "checks",
        label: "Technical check",
        rows: [
          { label: "Product structured data", ok: true, detail: "Present" },
          {
            label: "Variant prices and stock",
            ok: false,
            detail: "Out of sync",
          },
          { label: "AI crawler access", ok: true, detail: "Allowed" },
          { label: "Sitemap", ok: true, detail: "Complete" },
          { label: "Product page speed", ok: true, detail: "Fast" },
        ],
      },
      sticker: "Re-checked after each fix",
    },
    benefitsHeading: "Remove the technical blockers",
    benefits: [
      {
        title: "Structured data",
        body: "Check that product, price and availability data is present and matches what shoppers see on the page.",
        icon: Braces,
      },
      {
        title: "Crawler access",
        body: "Make sure AI crawlers are allowed in and can reach the pages that matter, instead of being blocked by accident.",
        icon: ShieldCheck,
      },
      {
        title: "Page speed",
        body: "Find slow product pages and the issues behind them, measured with real browser tests.",
        icon: Gauge,
      },
    ],
    stepsHeading: "How technical optimisation works",
    steps: [
      {
        title: "Scan your store",
        body: "Beseam checks your pages, sitemap, robots file and structured data.",
      },
      {
        title: "Prioritise the fixes",
        body: "Issues are ranked by how many products they affect and their expected revenue impact.",
      },
      {
        title: "Fix and verify",
        body: "Apply the fixes, and Beseam checks again to confirm they worked.",
      },
    ],
    faqs: [
      {
        question: "What is structured data, and why does AI need it?",
        answer:
          "Structured data is machine-readable information about your products, such as name, price and availability. AI assistants and search engines use it to understand your products reliably.",
      },
      {
        question: "Can my webshop block AI crawlers without me knowing?",
        answer:
          "Yes. Bot protection, firewall rules or robots.txt settings can block AI crawlers by accident. Beseam checks whether they can reach your pages.",
      },
      {
        question: "Does page speed affect AI visibility?",
        answer:
          "Slow or failing pages are harder for crawlers to read completely. Fast, stable pages make it more likely that assistants see all of your product information.",
      },
      {
        question: "What does Beseam check?",
        answer:
          "Beseam checks your pages, sitemap, robots file, structured data, crawler access and page speed, measured with real browser tests.",
      },
      {
        question: "Which AI crawlers should be able to reach my webshop?",
        answer:
          "AI companies use their own crawlers, such as OpenAI's OAI-SearchBot and GPTBot, PerplexityBot and ClaudeBot. If they can't reach your pages, assistants have less to go on when recommending your products.",
      },
      {
        question: "Why does structured data have to match the page?",
        answer:
          "When structured data and the visible page disagree, for example on price or stock, search engines and AI assistants can't tell which is right, and may trust your products less.",
      },
      {
        question: "How are technical issues prioritised?",
        answer:
          "Issues are ranked by how many products they affect and their expected revenue impact, so you fix what matters most first.",
      },
      {
        question: "How do I know a fix worked?",
        answer:
          "After you apply a fix, Beseam checks again to confirm the issue is resolved.",
      },
    ],
  },
];

const PRODUCT_PAGES_BY_LOCALE: Record<Locale, readonly ProductPageData[]> = {
  en: PRODUCT_PAGES,
  de: PRODUCT_PAGES_DE,
  nl: PRODUCT_PAGES_NL,
};

/** The product pages in one language; slugs are the same in every language. */
export function getProductPages(locale: Locale): readonly ProductPageData[] {
  return PRODUCT_PAGES_BY_LOCALE[locale];
}

export function getProductPage(
  slug: string,
  locale: Locale = "en",
): ProductPageData {
  const page = getProductPages(locale).find(
    (candidate) => candidate.slug === slug,
  );
  if (!page) throw new Error(`Unknown product page: ${slug}`);
  return page;
}
