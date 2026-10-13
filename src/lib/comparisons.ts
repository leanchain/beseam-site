import type { Locale } from "@/i18n/locale-rules.mjs";
import {
  PRACTICAL_DE,
  SEED_TEXT_DE,
  TEMPLATE_DE,
} from "@/lib/content/comparisons.de";
import {
  PRACTICAL_NL,
  SEED_TEXT_NL,
  TEMPLATE_NL,
} from "@/lib/content/comparisons.nl";

export type ComparisonRow = {
  criterion: string;
  competitor: string;
  beseam: string;
};

export type ComparisonWorkflowStep = {
  step: string;
  competitor: string;
  beseam: string;
};

export type ComparisonFaq = {
  question: string;
  answer: string;
};

export type ComparisonSource = {
  label: string;
  url: string;
};

export type Comparison = {
  slug: string;
  name: string;
  category: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  intro: string;
  competitorSummary: string;
  beseamSummary: string;
  useTogetherSummary: string;
  chooseCompetitorWhen: string[];
  chooseBeseamWhen: string[];
  notAReplacementFor: string;
  rows: ComparisonRow[];
  workflow: ComparisonWorkflowStep[];
  evidence: {
    src: string;
    alt: string;
    caption: string;
  };
  faqs: ComparisonFaq[];
  sources: ComparisonSource[];
  lastReviewed: string;
};

export type PracticalComparison = {
  reviewedAt: string;
  source: ComparisonSource;
  rows: ComparisonRow[];
};

export type AiVisibilitySeed = {
  slug: string;
  name: string;
  headline: string;
  platformSummary: string;
  bestFor: string;
  strengths: readonly [string, string, string];
  monitoringModel: string;
  diagnosisModel: string;
  actionModel: string;
  sources: ComparisonSource[];
};

/** The text of a seed that differs per language. */
export type SeedText = Pick<
  AiVisibilitySeed,
  | "headline"
  | "platformSummary"
  | "bestFor"
  | "strengths"
  | "monitoringModel"
  | "diagnosisModel"
  | "actionModel"
>;

/**
 * Everything the comparison template says around a competitor's own facts,
 * in one language. German and Dutch versions live in `src/lib/content/`.
 */
export type ComparisonTemplate = {
  category: string;
  metaTitle: (name: string) => string;
  metaDescription: (name: string) => string;
  introSuffix: string;
  competitorSummary: (name: string, bestFor: string) => string;
  beseamSummary: string;
  useTogetherSummary: (name: string) => string;
  chooseBeseamWhen: readonly [string, string, string];
  notAReplacementFor: (name: string) => string;
  rows: {
    primaryJob: { criterion: string; beseam: string };
    diagnosis: { criterion: string; beseam: string };
    actionModel: { criterion: string; beseam: string };
    afterAnswer: { criterion: string; competitor: string; beseam: string };
    relationship: { criterion: string; competitor: string; beseam: string };
  };
  workflow: {
    observe: { step: string; competitor: string; beseam: string };
    understand: { step: string; beseam: string };
    change: { step: string; beseam: string };
    askAgain: { step: string; competitor: string; beseam: string };
  };
  evidenceAlt: string;
  evidenceCaption: string;
  faqs: {
    replace: (name: string) => { question: string; answer: string };
    together: (name: string) => { question: string; answer: string };
    choose: (
      name: string,
      bestFor: string,
    ) => { question: string; answer: string };
  };
};

export const TEMPLATE_EN: ComparisonTemplate = {
  category: "AI discovery & visibility",
  metaTitle: (name) => `Beseam vs ${name}: AI visibility compared`,
  metaDescription: (name) =>
    `Compare Beseam and ${name}: what each AI visibility tool does best, and when to choose Beseam to get your products recommended by AI.`,
  introSuffix:
    "Beseam also watches AI discovery, then follows a missed shopping question into the product or page you can change. It prepares the change and asks the same question again afterward.",
  competitorSummary: (name, bestFor) => `Choose ${name} when ${bestFor}`,
  beseamSummary:
    "Choose Beseam when you need more than a visibility score: see which shopping question you missed, what you can change on the store, make the change with approval, and ask again.",
  useTogetherSummary: (name) =>
    `Keep ${name} for specialist AI-visibility monitoring. Use Beseam when a missed shopping question needs to become a store change and then be checked again.`,
  chooseBeseamWhen: [
    "A missing recommendation or citation needs to be tied to the right product, page, source, or catalog fact before anyone changes content.",
    "The team wants to see who was recommended and what product, store, shopper, or purchase data may help explain why.",
    "The original shopping question, proposed change, approval, application, and check afterward need to stay together.",
  ],
  notAReplacementFor: (name) =>
    `Beseam is not a one-for-one replacement for ${name}'s dedicated AI-visibility reporting, competitor benchmarking, or the specialist monitoring process teams already use there.`,
  rows: {
    primaryJob: {
      criterion: "Primary job",
      beseam:
        "Watch AI answers, tie a miss to the right product or page, make an approved change, and ask the same shopping question again.",
    },
    diagnosis: {
      criterion: "Diagnosis",
      beseam:
        "Keep the answer, sources, competing brands, product facts, and page checks with the same question.",
    },
    actionModel: {
      criterion: "Action model",
      beseam:
        "Turn a finding into a specific change that waits for brand-owner approval instead of ending as another recommendation.",
    },
    afterAnswer: {
      criterion: "What happens after the answer",
      competitor:
        "Specialist evidence about AI answers, mentions, citations, competitors, prompts, and sources.",
      beseam:
        "Connect the answer to product facts, the store, shopper behavior, checkout, orders, and the same question asked again.",
    },
    relationship: {
      criterion: "Best relationship",
      competitor: "Specialist AI-discovery monitoring and analysis.",
      beseam:
        "Carries a missed shopping question into an approved store change and checks it again.",
    },
  },
  workflow: {
    observe: {
      step: "Observe the answer",
      competitor:
        "Track a prompt set and surface how often the brand appears, how it compares with rivals, and which sources are cited.",
      beseam:
        "Ask a real shopping question across the AI assistants you track and keep the answer, who was recommended, and the sources behind it.",
    },
    understand: {
      step: "Understand the gap",
      beseam:
        "Tie the lost recommendation to the right product, page, source, claim, or store issue before choosing what to change.",
    },
    change: {
      step: "Change what you control",
      beseam:
        "Keep the proposed change, affected product or page, owner, and brand-owner approval with the original answer.",
    },
    askAgain: {
      step: "Ask again",
      competitor:
        "Continue monitoring the tracked prompt set and compare subsequent visibility metrics.",
      beseam:
        "Ask the same shopping question again and keep the before-and-after answers with the change that was made.",
    },
  },
  evidenceAlt:
    "Real Beseam AI visibility workspace showing assistant answers and competitor evidence",
  evidenceCaption:
    "Real Beseam AI-discovery evidence. The question, answer, competing recommendation, supporting evidence, change, and check again stay connected instead of ending as a visibility score.",
  faqs: {
    replace: (name) => ({
      question: `Does Beseam replace ${name}?`,
      answer: `Not necessarily. ${name} is a specialist AI-visibility platform. Beseam also watches AI discovery, then connects a useful miss with the product, store, shopper, and outcome evidence needed to decide what to do next.`,
    }),
    together: (name) => ({
      question: `Can ${name} and Beseam be used together?`,
      answer: `Yes. ${name} can remain a specialist monitoring source while Beseam connects the finding to the affected product or journey, the approved work, and the relevant result afterward. Exact integration availability depends on the setup.`,
    }),
    choose: (name, bestFor) => ({
      question: `When should I choose ${name} instead of Beseam?`,
      answer: `Choose ${name} when ${bestFor} Choose Beseam when the bigger problem is carrying discovery evidence into product, store, shopper, and business decisions rather than stopping at the monitoring layer.`,
    }),
  },
};

function buildAiVisibilityComparison(
  seed: AiVisibilitySeed,
  t: ComparisonTemplate,
): Comparison {
  return {
    slug: seed.slug,
    name: seed.name,
    category: t.category,
    metaTitle: t.metaTitle(seed.name),
    metaDescription: t.metaDescription(seed.name),
    headline: seed.headline,
    intro: `${seed.platformSummary} ${t.introSuffix}`,
    competitorSummary: t.competitorSummary(seed.name, seed.bestFor),
    beseamSummary: t.beseamSummary,
    useTogetherSummary: t.useTogetherSummary(seed.name),
    chooseCompetitorWhen: [...seed.strengths],
    chooseBeseamWhen: [...t.chooseBeseamWhen],
    notAReplacementFor: t.notAReplacementFor(seed.name),
    rows: [
      { ...t.rows.primaryJob, competitor: seed.monitoringModel },
      { ...t.rows.diagnosis, competitor: seed.diagnosisModel },
      { ...t.rows.actionModel, competitor: seed.actionModel },
      t.rows.afterAnswer,
      t.rows.relationship,
    ],
    workflow: [
      t.workflow.observe,
      { ...t.workflow.understand, competitor: seed.diagnosisModel },
      { ...t.workflow.change, competitor: seed.actionModel },
      t.workflow.askAgain,
    ],
    evidence: {
      src: "/images/product-live/ai-visibility.webp",
      alt: t.evidenceAlt,
      caption: t.evidenceCaption,
    },
    faqs: [
      t.faqs.replace(seed.name),
      t.faqs.together(seed.name),
      t.faqs.choose(seed.name, seed.bestFor),
    ],
    sources: seed.sources,
    lastReviewed: "2026-08-22",
  };
}

const SEEDS: readonly AiVisibilitySeed[] = [
  {
    slug: "profound",
    name: "Profound",
    headline:
      "Profound measures AI visibility. Beseam shows what to change when your products are missed.",
    platformSummary:
      "Profound is an AI-visibility platform for measuring brand presence, share of voice, and citations across multiple answer engines, with platform comparisons that can switch between visibility, share of voice, and citation share.",
    bestFor:
      "multi-engine brand monitoring, competitor benchmarking, and flexible visibility/citation analysis are the core job.",
    strengths: [
      "You need a specialist platform comparison across multiple AI engines.",
      "Your team wants to switch the same competitive view between visibility, share of voice, and citation share.",
      "AI visibility reporting and competitive monitoring are the primary process.",
    ],
    monitoringModel:
      "Measure brand visibility, share of voice, and citation share across multiple AI platforms.",
    diagnosisModel:
      "Compare brands and engines to identify where visibility or citation share differs across the tracked prompt set.",
    actionModel:
      "Public product materials emphasize measurement and platform comparison; teams carry the resulting changes into their existing operating processes.",
    sources: [
      {
        label: "Profound: Platform Comparisons",
        url: "https://help.tryprofound.com/articles/6240000968",
      },
      {
        label: "Profound help center",
        url: "https://help.tryprofound.com/",
      },
    ],
  },
  {
    slug: "peec-ai",
    name: "Peec AI",
    headline:
      "Peec AI tracks AI search visibility. Beseam shows what to change when a product is missed.",
    platformSummary:
      "Peec AI is an AI-search analytics platform that tracks visibility, share of voice, sentiment, position, competitors, cited domains, and individual chats, with AI engines used as a top-level filter.",
    bestFor:
      "a focused AI-search analytics workspace for visibility, share of voice, sentiment, position, competitors, domains, and chats is the main need.",
    strengths: [
      "You want a focused dashboard for AI visibility, share of voice, sentiment, and average position.",
      "Your team wants to drill into individual competitors, cited domains, and chats behind the aggregate metrics.",
      "Filtering the same analysis by AI engine is more useful than a large brand-by-engine matrix.",
    ],
    monitoringModel:
      "Track visibility, share of voice, sentiment, and position across brands and AI engines.",
    diagnosisModel:
      "Drill into competitors, domains, and individual chats to understand which prompts and sources are driving the gap.",
    actionModel:
      "Teams use the monitoring and drill-down evidence to decide what to change in their existing content and operating processes.",
    sources: [
      {
        label: "Peec AI: Understanding your performance",
        url: "https://docs.peec.ai/understanding-your-performance",
      },
      {
        label: "Peec AI documentation",
        url: "https://docs.peec.ai/",
      },
    ],
  },
  {
    slug: "otterly-ai",
    name: "Otterly.AI",
    headline:
      "Otterly.AI turns visibility findings into to-dos. Beseam carries a missed shopping question through the store change and checks it again.",
    platformSummary:
      "Otterly.AI monitors brand visibility and sentiment across AI search, including a Brand Visibility Index and recommendation process that can move findings into a tracked to-do list.",
    bestFor:
      "AI-search monitoring with a structured recommendations-to-do process is the central requirement.",
    strengths: [
      "You want a Brand Visibility Index and AI-search monitoring focused on brand presence and likelihood-to-buy signals.",
      "Your team values a brand-by-engine sentiment view for spotting uneven perception across assistants.",
      "Recommendations need to become tracked to-dos that can be completed or archived inside the specialist tool.",
    ],
    monitoringModel:
      "Monitor brand visibility, position-derived buying likelihood, sentiment, and engine-level differences across AI search.",
    diagnosisModel:
      "Use visibility, sentiment, prompt, and source evidence to identify where the brand underperforms and which recommendations deserve attention.",
    actionModel:
      "Recommendations can be accepted into a to-do list, tracked through completion, and archived as work progresses.",
    sources: [
      {
        label: "Otterly.AI: Brand Visibility Index",
        url: "https://help.otterly.ai/brand-visibility-index",
      },
      {
        label: "Otterly.AI: Recommendations - from data to done",
        url: "https://otterly.ai/blog/otterlyai-recommendations-data-to-done",
      },
    ],
  },
  {
    slug: "rankscale",
    name: "Rankscale",
    headline:
      "Rankscale measures AI visibility in detail. Beseam shows what to change when a shopping question misses you.",
    platformSummary:
      "Rankscale is an AI-search visibility platform that separates visibility, mentions, citations, sentiment, position, and detection rate, with audit recommendations tied to underperforming prompt sets.",
    bestFor:
      "teams want detailed AI-search reporting, including a detection rate that shows when a missing result may simply be a failed observation.",
    strengths: [
      "You want visibility, mentions, citations, sentiment, position, and detection rate shown separately.",
      "Distinguishing a real zero from a low-detection or failed observation is important to your reporting model.",
      "Audit recommendations tied to underperforming prompt sets are the main path from diagnosis to work.",
    ],
    monitoringModel:
      "Track visibility, mentions, citations, sentiment, position, and detection rate across AI-search prompt sets.",
    diagnosisModel:
      "Separate whether an answer was detected at all from whether the brand appeared, then inspect underperforming prompt sets and audit findings.",
    actionModel:
      "Audit recommendations are tied to the prompt sets that underperform so teams can prioritize follow-up work.",
    sources: [
      {
        label: "Rankscale: How to read your dashboard",
        url: "https://rankscale.ai/resources/modules/diagnose/how-to-read-your-rankscale-dashboard",
      },
      {
        label: "Rankscale resources",
        url: "https://rankscale.ai/resources",
      },
    ],
  },
  {
    slug: "athena-hq",
    name: "Athena",
    headline:
      "Athena tracks AI share of voice and recommends content. Beseam ties a missed shopping question to the product or store change and checks again.",
    platformSummary:
      "Athena is an AI-search visibility platform centered on share of voice, competitor discovery, source analysis, and an Action Center for prioritized recommendations and content work.",
    bestFor:
      "AI share-of-voice monitoring and a specialist Action Center for turning visibility gaps into prioritized content recommendations are the main buying criteria.",
    strengths: [
      "You want AI-search share of voice and competitor monitoring as a dedicated program.",
      "Source and citation analysis are central to how your team diagnoses why competitors appear.",
      "A specialist Action Center with prioritized recommendations and content drafting support fits your way of working.",
    ],
    monitoringModel:
      "Measure AI-search share of voice and compare brand mentions, competitors, sources, and engine-level performance.",
    diagnosisModel:
      "Use competitor and source evidence to identify visibility gaps and the content opportunities most likely to improve citation presence.",
    actionModel:
      "The Action Center prioritizes recommendations and supports content work intended to improve citation likelihood.",
    sources: [
      {
        label: "Athena: Understanding Share of Voice in AI Search",
        url: "https://athenahq.ai/blog/understanding-share-voice-ai-search",
      },
      {
        label: "Athena",
        url: "https://athenahq.ai/",
      },
    ],
  },
  {
    slug: "amionai",
    name: "AmIOnAI",
    headline:
      "AmIOnAI gives you an AI visibility plan. Beseam keeps each missed shopping question tied to the store change and the result.",
    platformSummary:
      "AmIOnAI is an AI-visibility product built around a visibility score, source analysis, and a week-by-week action plan for improving presence in ChatGPT and Google AI surfaces.",
    bestFor:
      "a guided AI-visibility grade and prescriptive week-by-week action plan are more valuable than a broad analytics workspace.",
    strengths: [
      "You want a simple AI visibility score and guided action plan rather than a large monitoring workspace.",
      "ChatGPT and Google AI visibility are the priority surfaces for the program.",
      "Week-by-week tasks with an estimated prompt-impact framing fit the team's way of working.",
    ],
    monitoringModel:
      "Track an AI Visibility Score across relevant prompts and surface the source domains associated with those answers.",
    diagnosisModel:
      "Use the visibility grade, prompt coverage, and source-domain evidence to identify which gaps should enter the action plan.",
    actionModel:
      "The product centers a week-by-week action plan, with tasks framed around their expected impact on relevant prompts.",
    sources: [
      {
        label: "AmIOnAI product",
        url: "https://amionai.com/product",
      },
      {
        label: "AmIOnAI",
        url: "https://amionai.com/",
      },
    ],
  },
  {
    slug: "ahrefs-brand-radar",
    name: "Ahrefs Brand Radar",
    headline:
      "Ahrefs Brand Radar measures AI visibility at search scale. Beseam shows what to change when your product is missed.",
    platformSummary:
      "Ahrefs Brand Radar extends competitive search intelligence into AI visibility, including AI share of voice, mentions, citations, and platform-level comparisons informed by Ahrefs' search-demand data.",
    bestFor:
      "AI visibility belongs inside a broader Ahrefs competitive-search process and search-volume-weighted share of voice is useful to the team.",
    strengths: [
      "Your SEO team already works in Ahrefs and wants AI visibility beside broader search and competitor intelligence.",
      "Search-volume-weighted AI share of voice is a useful way to prioritize the tracked market.",
      "Mentions and citations across multiple AI platforms need to be explored as competitive data rather than an action queue.",
    ],
    monitoringModel:
      "Measure AI share of voice, mentions, citations, and platform-level performance with search-demand context.",
    diagnosisModel:
      "Use competitive mention and citation data to understand which brands and sources dominate the tracked AI-search market.",
    actionModel:
      "Brand Radar is primarily a measurement and competitive-research surface; teams carry the findings into their existing SEO and content processes.",
    sources: [
      {
        label: "Ahrefs: AI visibility metrics",
        url: "https://help.ahrefs.com/en/articles/15501968-ai-visibility-metrics",
      },
      {
        label: "Ahrefs Brand Radar",
        url: "https://ahrefs.com/brand-radar",
      },
    ],
  },
  {
    slug: "semrush-ai-toolkit",
    name: "Semrush AI Toolkit",
    headline:
      "Semrush finds AI topic and source gaps. Beseam turns a missed shopping question into a store change and checks again.",
    platformSummary:
      "Semrush AI Toolkit measures AI visibility against industry competitors and turns gaps into topic and source opportunities, including prompts and domains where competitors appear and the tracked brand does not.",
    bestFor:
      "AI visibility needs to live inside the Semrush search-marketing stack with explicit topic and source opportunity lists.",
    strengths: [
      "Your search team already works in Semrush and wants AI visibility in the same competitive-research environment.",
      "Benchmarking visibility against automatically detected industry competitors is useful for the program.",
      "Topic Opportunities and Source Opportunities are the preferred way to turn visibility gaps into a content backlog.",
    ],
    monitoringModel:
      "Measure AI visibility, mentions, cited pages, and distribution by LLM against an industry-competitor benchmark.",
    diagnosisModel:
      "Surface topic and source gaps where competitors appear and the tracked brand does not, including the prompts and domains behind the opportunity.",
    actionModel:
      "Topic Opportunities and Source Opportunities turn competitor gaps into explicit prompt and domain lists for teams to work through.",
    sources: [
      {
        label: "Semrush: AI Visibility Overview report",
        url: "https://www.semrush.com/kb/1596-visibility-overview-report",
      },
      {
        label: "Semrush: AI Toolkit",
        url: "https://www.semrush.com/kb/1493-ai-toolkit",
      },
    ],
  },
];

/**
 * Only direct competitors: AI visibility and AI search tools. Analytics,
 * behaviour, testing and monitoring tools were removed when Beseam narrowed
 * to AI search optimisation for webshops.
 */
export const COMPARISONS: Comparison[] = SEEDS.map((seed) =>
  buildAiVisibilityComparison(seed, TEMPLATE_EN),
);

const TEMPLATES: Record<Exclude<Locale, "en">, ComparisonTemplate> = {
  de: TEMPLATE_DE,
  nl: TEMPLATE_NL,
};
const SEED_TEXT: Record<Exclude<Locale, "en">, Record<string, SeedText>> = {
  de: SEED_TEXT_DE,
  nl: SEED_TEXT_NL,
};

/** The comparisons in one language; slugs are the same in every language. */
export function getComparisons(locale: Locale): Comparison[] {
  if (locale === "en") return COMPARISONS;
  return SEEDS.map((seed) => {
    const text = SEED_TEXT[locale][seed.slug];
    if (!text) throw new Error(`Missing ${locale} comparison: ${seed.slug}`);
    return buildAiVisibilityComparison({ ...seed, ...text }, TEMPLATES[locale]);
  });
}

export const COMPARISON_SLUGS = COMPARISONS.map(
  (comparison) => comparison.slug,
);

const BESEAM_PRACTICAL = {
  owner:
    "Ecommerce or commerce operations, with product, growth, marketing, or engineering involved as the question requires.",
  setup:
    "Connect the relevant store and data sources around the business question being investigated.",
  output:
    "An evidence-backed decision, owned action, explicit brand-owner approval, and check again of the original problem.",
  pricing: "Plans based on catalogue size; book an intro call for details.",
} as const;

export const PRACTICAL_COMPARISONS: Record<string, PracticalComparison> = {
  profound: {
    reviewedAt: "2026-08-22",
    source: {
      label: "Profound pricing",
      url: "https://www.tryprofound.com/pricing",
    },
    rows: [
      {
        criterion: "Typical owner",
        competitor:
          "SEO, AEO, brand, and search marketing teams monitoring AI visibility.",
        beseam: BESEAM_PRACTICAL.owner,
      },
      {
        criterion: "Setup",
        competitor:
          "Configure the brand, competitors, prompts, and answer engines to monitor on a recurring basis.",
        beseam: BESEAM_PRACTICAL.setup,
      },
      {
        criterion: "Primary output",
        competitor:
          "AI visibility, share-of-voice, citation, sentiment, and competitive monitoring views.",
        beseam: BESEAM_PRACTICAL.output,
      },
      {
        criterion: "Replace or keep?",
        competitor:
          "Keep Profound when specialist multi-engine AI visibility monitoring is a core process.",
        beseam:
          "Use Beseam alongside it when a visibility gap needs to become a store-level decision, change, and check again.",
      },
      {
        criterion: "Pricing model",
        competitor:
          "Public Starter and Growth plans with prompt and engine limits, plus custom Enterprise pricing.",
        beseam: BESEAM_PRACTICAL.pricing,
      },
    ],
  },
  "peec-ai": {
    reviewedAt: "2026-08-22",
    source: {
      label: "Peec AI pricing",
      url: "https://peec.ai/pricing",
    },
    rows: [
      {
        criterion: "Typical owner",
        competitor:
          "SEO, content, and marketing teams; agency plans support multiple client projects.",
        beseam: BESEAM_PRACTICAL.owner,
      },
      {
        criterion: "Setup",
        competitor:
          "Create projects, allocate prompts, choose models, and configure markets for recurring tracking.",
        beseam: BESEAM_PRACTICAL.setup,
      },
      {
        criterion: "Primary output",
        competitor:
          "Visibility, share of voice, sentiment, position, competitor, cited-domain, and chat analysis.",
        beseam: BESEAM_PRACTICAL.output,
      },
      {
        criterion: "Replace or keep?",
        competitor:
          "Keep Peec AI when focused AI-search analytics and prompt monitoring are the main job.",
        beseam:
          "Use Beseam when the finding must be tied to the affected product, page, query, or journey and carried through change and check.",
      },
      {
        criterion: "Pricing model",
        competitor:
          "Tiered mainly by tracked prompts, models, and projects, with custom Enterprise coverage.",
        beseam: BESEAM_PRACTICAL.pricing,
      },
    ],
  },
  "otterly-ai": {
    reviewedAt: "2026-08-22",
    source: {
      label: "Otterly.AI pricing",
      url: "https://otterly.ai/pricing",
    },
    rows: [
      {
        criterion: "Typical owner",
        competitor:
          "SEO and marketing teams, plus agencies managing AI-search visibility for clients.",
        beseam: BESEAM_PRACTICAL.owner,
      },
      {
        criterion: "Setup",
        competitor:
          "Choose search prompts, workspaces, and AI engines; tracking runs on the configured prompt set.",
        beseam: BESEAM_PRACTICAL.setup,
      },
      {
        criterion: "Primary output",
        competitor:
          "AI-search visibility, citations, brand reporting, audits, and recommendation-to-do processes.",
        beseam: BESEAM_PRACTICAL.output,
      },
      {
        criterion: "Replace or keep?",
        competitor:
          "Keep Otterly.AI when prompt tracking and specialist GEO recommendations are the central process.",
        beseam:
          "Use Beseam when the recommendation needs to stay attached to store evidence, owner, execution, and the next answer check.",
      },
      {
        criterion: "Pricing model",
        competitor:
          "Prompt-based Lite, Standard, and Premium plans with add-ons, plus custom Enterprise pricing.",
        beseam: BESEAM_PRACTICAL.pricing,
      },
    ],
  },
};

const PRACTICAL_BY_LOCALE: Record<
  Locale,
  Record<string, PracticalComparison>
> = { en: PRACTICAL_COMPARISONS, de: PRACTICAL_DE, nl: PRACTICAL_NL };

export function getPracticalComparison(
  slug: string,
  locale: Locale = "en",
): PracticalComparison | undefined {
  return PRACTICAL_BY_LOCALE[locale][slug];
}

export function getComparison(
  slug: string,
  locale: Locale = "en",
): Comparison | undefined {
  return getComparisons(locale).find((comparison) => comparison.slug === slug);
}
