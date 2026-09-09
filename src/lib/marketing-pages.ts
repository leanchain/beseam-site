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
      "You see the actual answer and the facts behind it—not a vague visibility score or a guess about how the AI ranks products.",
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
        question: "Is this AI visibility monitoring?",
        answer:
          "This page covers the observable part people often call AI visibility monitoring. Inside Beseam, those answers are one discovery signal that can be connected with product, store, behavior, conversion, and revenue evidence.",
      },
      {
        question: "Which AI assistants can Beseam test?",
        answer:
          "Configured targets can include assistants and shopping-answer surfaces such as ChatGPT, Gemini, Perplexity, Claude, Google AI experiences and Microsoft Copilot. Available coverage depends on the configured test surface.",
      },
      {
        question:
          "Can Beseam tell me exactly why a competitor ranked above me?",
        answer:
          "Not from hidden model logic. Beseam records the observed answer and compares it with product evidence you control, then separates supported facts from likely causes and hypotheses.",
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
      "One place to see where shoppers choose you — and where they don't.",
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
        question: "What do I need to connect first?",
        answer:
          "You can start with your domain. The free scan reads the public storefront without an account. For ongoing work, connect the store first; add analytics, behavior, search, or other data only when it helps explain a problem or measure a change.",
      },
      {
        question: "Is Beseam another analytics dashboard?",
        answer:
          "No. Beseam uses the signals it can observe to decide what is worth looking at next, keeps the evidence attached, and turns the strongest findings into specific work. The queue is the product; the underlying dashboards are evidence when you need them.",
      },
      {
        question: "What can Beseam actually change?",
        answer:
          "With the right connection, Beseam can prepare changes to product data, content, merchandising, onsite search, recommendations, and other editable parts of the store. What it can apply directly depends on the connected system. Customer-facing changes require your approval.",
      },
      {
        question: "How do I know whether a change helped?",
        answer:
          "Beseam checks the relevant signal again after the change: the same shopper question, the same page or journey, or a before-and-after outcome when the data supports it. It shows what moved without claiming causation the evidence cannot establish.",
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
