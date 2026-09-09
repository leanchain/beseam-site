import {
  Brain,
  Radar,
  RefreshCw,
  Sparkles,
  Store,
  TrendingUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Metadata } from "next";

import { buildPublicMetadata } from "@/lib/seo";

export type MarketingFaq = {
  question: string;
  answer: string;
};

export type MarketingPageData = {
  slug: string;
  eyebrow: string;
  headline: string;
  metaTitle: string;
  description: string;
  intro: string;
  proofLine: string;
  // Optional heading/intro override for the observations grid. Falls back to
  // "What Beseam uses" / evidence-source framing, which fits the single-topic
  // evidence pages but not a capability directory like /platform.
  observationsHeading?: string;
  observationsIntro?: string;
  observations: Array<{ title: string; detail: string; icon?: LucideIcon }>;
  sections: Array<{
    title: string;
    body: string;
    points: string[];
    icon?: LucideIcon;
  }>;
  // The detail pages carry an explicit "what Beseam does not claim" block.
  // /platform states its boundaries inside the capability acts instead, so the
  // field is optional rather than an empty list rendering an empty box.
  limits?: string[];
  faqs: MarketingFaq[];
  related: Array<{ label: string; href: string }>;
};

export const MARKETING_PAGES: Record<string, MarketingPageData> = {
  "ai-visibility-monitoring": {
    slug: "ai-visibility-monitoring",
    eyebrow: "AI shopping discovery",
    headline: "See when AI shopping leaves your products out.",
    metaTitle: "AI Shopping Discovery Monitoring for Ecommerce | Beseam",
    description:
      "Ask real shopping questions across AI assistants, see which products appear, find what you can improve, prepare a change for approval, and ask the same question again.",
    intro:
      "Beseam asks the same shopping questions across AI assistants and keeps each answer with the products and competitors it mentions. When your product is missing, Beseam checks the product and store details you can change, then prepares the strongest change for your approval.",
    proofLine:
      "You see the actual answer and the facts behind it, not a vague visibility score or a guess about how the AI ranks products.",
    observations: [
      {
        title: "The shopping question",
        detail:
          "Ask the exact question a shopper might ask about a brand, category, comparison, use case, deal, shipping, or where to buy.",
      },
      {
        title: "Who appeared",
        detail:
          "See the answer, the products it named, and whether your product appeared instead of hiding everything behind one score.",
      },
      {
        title: "Competitors and sources",
        detail:
          "See which competing products appeared and which sources the assistant showed, when those sources are available.",
      },
      {
        title: "What you can change",
        detail:
          "Check the product page, catalog, structured data, and feed for things you can improve, then prepare the change for approval.",
      },
    ],
    sections: [
      {
        title: "Start with the actual answer.",
        body: "You need to know what happened on a specific shopping question: what the assistant said, which products it recommended, and whether your product was described correctly. Beseam keeps that answer visible instead of turning it into a single grade.",
        points: [
          "Keep the original question and observed answer together.",
          "Record the products and merchants named in that answer.",
          "Separate incorrect product facts from simple absence.",
        ],
      },
      {
        title: "See what you can change.",
        body: "Beseam cannot see an assistant's hidden ranking rules. It compares the answer with your product and store data to find missing or different information you can actually change.",
        points: [
          "Inspect titles, descriptions, attributes, availability and structured product evidence.",
          "Keep competitor sightings attached to the exact question where they appeared.",
          "Treat a likely cause as a hypothesis unless the evidence can establish more.",
        ],
      },
      {
        title: "Change it, then ask again.",
        body: "After you approve a product-data change, Beseam can apply it where the store connection supports that change. Then it asks the same shopping question again so you can compare the new answer with the old one.",
        points: [
          "Keep approval and the previous product value attached to the change.",
          "Re-run the same question instead of substituting a new prompt.",
          "Do not treat one changed answer as proof of guaranteed future placement.",
        ],
      },
    ],
    limits: [
      "AI answers are point-in-time observations and can change between runs.",
      "Beseam cannot see or control an assistant's hidden ranking logic.",
      "A competitor appearing, a source being cited, or a product-data difference does not prove why the AI chose one product over another.",
      "No recommendation, ranking, traffic or revenue outcome is guaranteed.",
    ],
    faqs: [
      {
        question: "What does Beseam actually measure in an AI answer?",
        answer:
          "Beseam keeps the shopping question with the observed answer, the products and merchants named, and the sources or citations the surface exposes. It treats the result as a dated observation rather than a hidden ranking score.",
      },
      {
        question: "Which AI assistants and shopping surfaces can Beseam check?",
        answer:
          "Configured targets can include surfaces such as ChatGPT, Gemini, Claude, Perplexity, Microsoft Copilot, Google AI experiences, and traditional search. Available coverage depends on the configured monitoring setup.",
      },
      {
        question:
          "Can Beseam tell me exactly why another product was recommended?",
        answer:
          "Not from hidden model logic. Beseam records what was observed, compares it with product and store evidence you control, and separates supported facts from likely causes and hypotheses.",
      },
      {
        question: "What happens when my product is missing from an answer?",
        answer:
          "Beseam can inspect the relevant product, page, catalog, structured data, availability, claims, and other connected evidence to find gaps you can actually change. The original question stays attached to the investigation.",
      },
      {
        question: "Can Beseam make a change and test the same question again?",
        answer:
          "Yes, where the connected system supports the change. Beseam can prepare it for approval, apply supported changes after approval, and then ask the same shopping question again so the before-and-after answers stay together.",
      },
      {
        question:
          "How is this different from a traditional AI visibility tracker?",
        answer:
          "AI visibility tracking is one part of Beseam. Beseam can carry a missed shopping question into product and store evidence, shopper behavior, an approved change, and the relevant outcome afterward instead of stopping at the visibility report.",
      },
    ],
    related: [
      {
        label: "Try the free AI discovery scan",
        href: "/scan",
      },
    ],
  },
  platform: {
    slug: "platform",
    eyebrow: "Platform",
    headline:
      "One place to see where shoppers choose you, and where they don't.",
    metaTitle: "Beseam Platform | From Shopper Signals to Measured Changes",
    description:
      "Beseam connects AI discovery, product and store evidence, shopper behavior, and outcomes. It turns those signals into changes you can approve, apply, and measure.",
    intro:
      "Beseam connects what shoppers see before they visit, what they find on your store, what they do next, and what happens after a change. It turns those signals into a ranked queue of work instead of another set of dashboards to manage.",
    proofLine:
      "The shopper question, the evidence, the change, your approval, and the result stay connected.",
    observationsHeading: "Follow the shopper from discovery to outcome",
    observationsIntro:
      "See where shoppers find you, what helps them decide, where intent gets lost, and whether the outcome moves after a change.",
    observations: [
      {
        title: "Get found",
        icon: Radar,
        detail:
          "AI answers, external search, onsite search, marketplaces, and other places where shoppers discover products.",
      },
      {
        title: "Help them choose",
        icon: Store,
        detail:
          "Product pages, comparisons, recommendations, fit, reviews, price, and product facts that help a shopper decide which product is right.",
      },
      {
        title: "Help them buy",
        icon: Brain,
        detail:
          "Cart, delivery, checkout, payment, and shopper behavior that show where a decided shopper still moves forward or stops.",
      },
      {
        title: "See what changed",
        icon: TrendingUp,
        detail:
          "Conversion, orders, revenue, and the original signals checked again after a change so the next decision starts with evidence.",
      },
    ],
    sections: [
      {
        title: "See what may be getting in the way.",
        icon: RefreshCw,
        body: "A missed AI recommendation, search exit, product-page hesitation, checkout drop, or sales change tells you something happened. Beseam checks the surrounding product, store, shopper, competitor, and sales data to find the most likely reason without pretending it knows more than it does.",
        points: [
          "Keep the original observation, source, affected scope, and time attached.",
          "Connect evidence from before the visit with what happened on the store and afterward.",
          "Separate observed facts from likely causes and hypotheses.",
        ],
      },
      {
        title: "Make the change. Check what happened.",
        icon: Sparkles,
        body: "Beseam turns the strongest finding into a specific change to product data, content, merchandising, creative, campaigns, or the store. You approve customer-facing changes. Beseam applies what it can, hands the rest to whoever does, and then asks the same shopper questions again.",
        points: [
          "Tie each change to the observed opportunity and affected product, page, or journey.",
          "Keep what Beseam found, what it affects, your approval, and what to check afterward together.",
          "Carry what was learned into the next cycle.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do I need to use every Beseam capability?",
        answer:
          "No. Start with the storefront and store connection, then turn on deeper discovery, analytics, behavior, fit, personalization, reliability, creative, campaign, or revenue capabilities only when they help answer a real question or execute the work you want Beseam to handle.",
      },
      {
        question: "What kinds of systems can Beseam connect to?",
        answer:
          "Beseam can work with commerce and catalog data plus connected analytics, behavior, search, reliability, campaign, customer, and revenue sources. The exact integrations and write capabilities depend on the store and systems you connect.",
      },
      {
        question: "Can Beseam work alongside tools we already use?",
        answer:
          "Yes. Existing analytics, replay, experimentation, reliability, advertising, or other specialist tools can remain in place. Beseam can use their evidence where connected and keep it attached to the product, journey, action, and outcome being investigated.",
      },
      {
        question:
          "How do findings from different parts of the journey stay connected?",
        answer:
          "Beseam keeps the original observation, affected product or journey, supporting evidence, proposed change, approval state, and later measurement in the same work record. Discovery, store, behavior, and outcome evidence can contribute without becoming separate inboxes.",
      },
      {
        question: "What can Beseam apply directly?",
        answer:
          "That depends on the connected system. Beseam can prepare work across product data, content, merchandising, search, recommendations and personalization, fit, experiments, creative assets, campaigns, and store changes; supported writes can be applied after the required approval, while unsupported work stays as a concrete handoff.",
      },
      {
        question:
          "How do Creative Studio, fit, personalization, and campaigns fit into the platform?",
        answer:
          "They are not separate stories bolted onto an AI-search product. They are capabilities that can use the same product, shopper, store, and outcome context. Availability depends on what is enabled for the store, and campaign capabilities are only available where campaign access is enabled.",
      },
      {
        question: "How are customer-facing changes controlled?",
        answer:
          "You set the approval rules. Beseam can keep monitoring and preparing work automatically, but customer-facing changes that require approval stay pending until someone with the right authority approves them.",
      },
      {
        question: "How is impact measured across different kinds of changes?",
        answer:
          "Beseam re-checks the evidence appropriate to the original problem: an AI answer, product or store condition, shopper behavior, experiment, reliability signal, campaign performance, conversion, orders, or revenue. Observed movement stays separate from causal claims the evidence cannot establish.",
      },
    ],
    related: [
      { label: "How we work", href: "/how-we-work" },
      { label: "AI shopping discovery", href: "/ai-visibility-monitoring" },
      { label: "See Beseam work", href: "/#proof" },
    ],
  },
};

export function getMarketingPage(slug: string): MarketingPageData {
  const page = MARKETING_PAGES[slug];
  if (!page) throw new Error("Unknown marketing page: " + slug);
  return page;
}

export function getMarketingMetadata(page: MarketingPageData): Metadata {
  return buildPublicMetadata({
    title: page.metaTitle,
    description: page.description,
    path: "/" + page.slug,
  });
}
