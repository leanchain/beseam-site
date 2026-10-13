import type { Locale } from "@/i18n/locale-rules.mjs";
import { BLOG_POSTS_DE } from "@/lib/content/blog-posts.de";
import { BLOG_POSTS_NL } from "@/lib/content/blog-posts.nl";

/**
 * Blog posts under /blog. Written for webshop owners who want more revenue
 * from AI assistants, and structured for both search engines and AI answers:
 * an answer-first summary, question-shaped headings, short paragraphs, lists
 * and tables, a FAQ (also published as FAQPage data) and dated, linked
 * sources for every number.
 *
 * Inline text supports `[label](href)` links and `**bold**`.
 */
export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul" | "ol"; items: readonly string[] }
  | {
      type: "table";
      head: readonly string[];
      rows: readonly (readonly string[])[];
    }
  | { type: "callout"; title: string; text: string };

export type BlogPost = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  /** Card text on /blog. */
  excerpt: string;
  /** Answer-first summary at the top of the post. */
  summary: string;
  published: string;
  updated: string;
  readingMinutes: number;
  image: { src: string; og: string; alt: string };
  keywords: readonly string[];
  sections: readonly {
    id: string;
    heading: string;
    blocks: readonly BlogBlock[];
  }[];
  faqs: readonly { question: string; answer: string }[];
  sources: readonly { label: string; url: string }[];
};

export const BLOG_POSTS: readonly BlogPost[] = [
  {
    slug: "get-products-recommended-by-chatgpt",
    title:
      "How to get your products recommended by ChatGPT and other AI assistants",
    metaTitle: "How to Get Your Products Recommended by ChatGPT (2026 Guide)",
    metaDescription:
      "A practical guide for webshops: how ChatGPT, Gemini and Copilot choose which products to recommend, and the five steps that get your products into AI answers.",
    excerpt:
      "How AI assistants choose which products to recommend, and the five steps that get your webshop into their answers.",
    summary:
      "AI assistants recommend products they can find, understand and trust. To get recommended, make sure assistants can reach your store (product feeds and crawler access), give every product page the specific facts shoppers ask about, publish content that answers buying questions, keep prices and stock accurate, and track the questions you want to win.",
    published: "2026-10-11",
    updated: "2026-10-11",
    readingMinutes: 8,
    image: {
      src: "/images/blog/get-products-recommended-by-chatgpt.svg",
      og: "/images/blog/get-products-recommended-by-chatgpt.png",
      alt: "Illustration of a shopper asking an AI assistant for waterproof boots, and the assistant recommending a webshop's product.",
    },
    keywords: [
      "get products recommended by ChatGPT",
      "ChatGPT shopping",
      "AI search optimisation for ecommerce",
      "AI product recommendations",
      "generative engine optimisation",
    ],
    sections: [
      {
        id: "why-it-matters",
        heading: "Why do AI recommendations matter for webshops?",
        blocks: [
          {
            type: "p",
            text: "More shoppers now ask an AI assistant what to buy instead of scrolling through search results. The assistant answers with a short list of products, and the shopper often clicks straight through to one of them. If your products are not in that list, you are not part of the decision.",
          },
          {
            type: "p",
            text: "The traffic is still small next to search and ads, but it grows fast and it converts. According to Adobe's data on US retail sites, AI-referred visits were up 62% year over year in July 2026, converted 60% better than other traffic and brought 53% more revenue per visit. In March 2025, the same traffic still converted 38% worse.",
          },
          {
            type: "callout",
            title: "What this means",
            text: "AI is becoming a sales channel of its own. The stores that get recommended now build a lead that is hard to catch up on later.",
          },
        ],
      },
      {
        id: "how-assistants-choose",
        heading: "How does ChatGPT decide which products to recommend?",
        blocks: [
          {
            type: "p",
            text: "OpenAI says its product results are selected independently and are not ads, so you cannot pay to be included. Its help centre lists the factors it uses to rank merchants for a product: **availability, price, quality, and whether a merchant is the maker or primary seller** of the item. OpenAI also says these factors will keep evolving.",
          },
          {
            type: "p",
            text: "Underneath, assistants combine two kinds of information: structured product data from merchant feeds and catalogues, and what they read on the open web, including your product pages, reviews and articles. Other assistants work along the same lines: they need to find your product, understand what it is and who it is for, and trust that the facts are right.",
          },
          {
            type: "table",
            head: [
              "What the assistant needs",
              "Where it gets it",
              "What you control",
            ],
            rows: [
              [
                "To find your product",
                "Product feeds, catalogue integrations, crawlers",
                "Feed setup, crawler access, sitemap",
              ],
              [
                "To understand it",
                "Product pages, product data, structured data",
                "Descriptions, attributes, schema",
              ],
              [
                "To trust it",
                "Matching prices and stock, reviews, other sources",
                "Data accuracy, reviews, content",
              ],
            ],
          },
        ],
      },
      {
        id: "step-1-access",
        heading: "Step 1: Make sure AI assistants can reach your products",
        blocks: [
          {
            type: "p",
            text: "Assistants can only recommend what they can read. Start with two checks.",
          },
          {
            type: "ul",
            items: [
              "**Product feeds and catalogues.** OpenAI says Shopify product data is already integrated into ChatGPT through Shopify Catalog, with no extra work for individual merchants. Merchants on other platforms can apply to send a product feed directly. In your Shopify admin, check Sales channels to see which AI channels are active for your store, since availability differs by channel and country.",
              "**Crawler access.** AI companies use their own crawlers, such as OpenAI's OAI-SearchBot. Bot protection, firewall rules or an old robots.txt rule can block them without anyone noticing. Check that the crawlers of the assistants you care about are allowed to reach your product and collection pages.",
            ],
          },
        ],
      },
      {
        id: "step-2-product-pages",
        heading: "Step 2: Give every product page the facts shoppers ask about",
        blocks: [
          {
            type: "p",
            text: "Shoppers ask assistants specific questions: “waterproof boots for commuting, wide fit” or “fragrance-free moisturiser for sensitive skin”. An assistant can only match your product to that question if your page states those facts plainly.",
          },
          {
            type: "ul",
            items: [
              "Say what the product is for and who it suits, not just what it is.",
              "State the attributes shoppers compare on: size and fit, materials, ingredients, specs, compatibility.",
              "Replace marketing phrases like “perfect for every occasion” with facts.",
              "Keep the same facts in your product data, not only in the description text.",
            ],
          },
          {
            type: "p",
            text: "Our guide to [writing product descriptions AI assistants recommend](/blog/product-descriptions-for-ai-search) shows how to do this step by step, with before-and-after examples.",
          },
        ],
      },
      {
        id: "step-3-content",
        heading: "Step 3: Publish content for the questions shoppers research",
        blocks: [
          {
            type: "p",
            text: "Many shopping questions are not about one product. Shoppers ask assistants to compare, explain and help them choose: “trail vs road running shoes”, “what to wear to a summer wedding”, “mineral vs chemical sunscreen”. Assistants answer these from pages that explain and compare.",
          },
          {
            type: "ul",
            items: [
              "**Collection pages** with a short, specific introduction about what is in them and who they are for.",
              "**Comparisons** between product types or models you sell.",
              "**Buying guides** on sizing, fit, materials or how to choose.",
            ],
          },
          {
            type: "p",
            text: "Build each page around your own products, and answer the question in the first paragraph. Assistants favour pages that get to the point.",
          },
        ],
      },
      {
        id: "step-4-accuracy",
        heading: "Step 4: Keep prices, stock and structured data accurate",
        blocks: [
          {
            type: "p",
            text: "Availability and price are on OpenAI's list of ranking factors for a reason: an assistant does not want to send a shopper to a sold-out product or a wrong price. Make sure your structured data, product feed and visible page agree on price and stock for every variant. Duplicate structured data from a theme and an app is a common cause of conflicts on Shopify stores.",
          },
        ],
      },
      {
        id: "step-5-track",
        heading: "Step 5: Track the questions you want to win",
        blocks: [
          {
            type: "p",
            text: "You cannot improve what you do not measure. Make a list of 20 to 50 questions your shoppers ask, by category and need, and ask them regularly in ChatGPT, Gemini, Google AI Mode, Perplexity, Copilot and Claude. Note which products are recommended, which of yours are missing, and who appears instead.",
          },
          {
            type: "p",
            text: "Then connect it to revenue: our guide on [how to track AI traffic and revenue in GA4 and Shopify](/blog/track-ai-traffic-ga4-shopify) shows how to see what AI-referred visitors buy.",
          },
          {
            type: "callout",
            title: "Doing this at catalogue scale",
            text: "Checking hundreds of products and questions by hand is not realistic. [Beseam](/product/ai-visibility-tracking) tracks your products across six AI assistants, finds what keeps them out of answers, and ranks the fixes by expected revenue impact.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Can I pay to have my products recommended by ChatGPT?",
        answer:
          "No. OpenAI says its product results are selected independently and are not ads. Inclusion depends on relevance and on factors such as availability, price, quality and whether you are the maker or primary seller.",
      },
      {
        question: "Do I need a product feed to appear in ChatGPT?",
        answer:
          "Not always. OpenAI says Shopify product data is already integrated through Shopify Catalog. Merchants on other platforms can apply to submit a product feed. A feed improves accuracy, but it does not guarantee a recommendation.",
      },
      {
        question: "How long does it take before my products show up?",
        answer:
          "There is no fixed timeline. It depends on how often each assistant refreshes its data and on how well your products match the questions shoppers ask. Track the same questions over time to see when your products start to appear.",
      },
      {
        question: "Is AI search optimisation different from SEO?",
        answer:
          "It builds on the same foundations: crawlable pages, clear content and structured data. The difference is the goal. Instead of ranking a page in a list of links, you want an assistant to pick your product as one of a few recommendations, which rewards specific product facts and accurate data.",
      },
      {
        question: "Which AI assistants matter most for webshops?",
        answer:
          "ChatGPT is the largest, but shoppers also use Gemini and Google AI Mode, Microsoft Copilot, Perplexity and Claude. Each draws on different sources, so it pays to track them side by side.",
      },
    ],
    sources: [
      {
        label: "OpenAI Help Center: Shopping with ChatGPT search",
        url: "https://help.openai.com/en/articles/11128490-shopping-with-chatgpt-search",
      },
      {
        label: "OpenAI: Power product discovery in ChatGPT (merchants)",
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
        label:
          "Digital Commerce 360: Adobe AI-referral traffic data, July 2026",
        url: "https://www.digitalcommerce360.com/2026/08/19/adobe-ai-referral-traffic-data-july-2026/",
      },
    ],
  },
  {
    slug: "product-descriptions-for-ai-search",
    title: "How to write product descriptions AI assistants recommend",
    metaTitle: "Product Descriptions for AI Search: Checklist and Examples",
    metaDescription:
      "Write product descriptions that ChatGPT and other AI assistants match to shoppers' questions. With a checklist, before-and-after examples and mistakes.",
    excerpt:
      "A checklist and before-and-after examples for product descriptions that AI assistants can match to real shopping questions.",
    summary:
      "AI assistants recommend products whose pages answer the shopper's question. A description that works for AI states the use case, who the product suits, the attributes shoppers compare on, and sizing or compatibility advice, in plain language. Replace marketing phrases with facts, and keep the same facts in your product data.",
    published: "2026-10-10",
    updated: "2026-10-10",
    readingMinutes: 7,
    image: {
      src: "/images/blog/product-descriptions-for-ai-search.svg",
      og: "/images/blog/product-descriptions-for-ai-search.png",
      alt: "Illustration of a vague product description next to a specific, AI-optimised version with highlighted facts.",
    },
    keywords: [
      "product descriptions for AI search",
      "AI-optimised product descriptions",
      "product description checklist",
      "ChatGPT product descriptions",
      "ecommerce product content",
    ],
    sections: [
      {
        id: "why-descriptions-matter",
        heading: "Why do product descriptions matter for AI search?",
        blocks: [
          {
            type: "p",
            text: "When a shopper asks an AI assistant for “trail running shoes for wide feet under €150”, the assistant has to decide which products fit. It can only do that with facts: is the shoe made for trails, does it come in a wide fit, what does it cost? If your description does not say so, the assistant cannot match your product, however good it is.",
          },
          {
            type: "p",
            text: "Search engines could rank a page on keywords and links. AI assistants read your page like a careful shopper and pick a handful of products that clearly fit. That rewards specific, complete product information more than ever.",
          },
        ],
      },
      {
        id: "what-ai-looks-for",
        heading: "What does an AI assistant look for in a product description?",
        blocks: [
          {
            type: "ol",
            items: [
              "**The use case.** What the product is for: trail running, a summer wedding, standing all day, photo editing.",
              "**Who it suits.** Wide feet, sensitive skin, tall men, beginners, small rooms.",
              "**The attributes shoppers compare on.** Materials, ingredients, dimensions, specs, battery life, weight.",
              "**Sizing or compatibility advice.** Runs small or true to size; works with iOS and Android.",
              "**What makes it different.** One or two concrete facts, not superlatives.",
              "**Practical details.** Care instructions, what is in the box, certifications.",
            ],
          },
        ],
      },
      {
        id: "examples",
        heading: "Before and after: three examples",
        blocks: [
          { type: "h3", text: "Footwear" },
          {
            type: "table",
            head: ["Before", "After"],
            rows: [
              [
                "Our most popular running shoe. Stylish, comfortable and perfect for every run!",
                "A waterproof trail running shoe with a wide toe box and an 8 mm drop, made for wet and muddy trails. EU 38–47, in standard and wide fit. Runs true to size.",
              ],
            ],
          },
          { type: "h3", text: "Beauty" },
          {
            type: "table",
            head: ["Before", "After"],
            rows: [
              [
                "Our iconic glow serum. A little bottle of magic for radiant skin.",
                "A 15% vitamin C serum with hyaluronic acid for dull, uneven skin. Lightweight and fragrance-free, for normal to combination skin. Apply in the morning before sunscreen.",
              ],
            ],
          },
          { type: "h3", text: "Electronics" },
          {
            type: "table",
            head: ["Before", "After"],
            rows: [
              [
                "Experience sound like never before. Premium audio and all-day comfort.",
                "Over-ear headphones with active noise cancelling and up to 50 hours of battery life with ANC on. Bluetooth 5.3, multipoint pairing with iOS and Android, USB-C fast charging.",
              ],
            ],
          },
          {
            type: "p",
            text: "In each case, the “after” version answers the questions a shopper would ask an assistant. Find more examples per category on our pages for [footwear](/solutions/footwear), [fashion](/solutions/fashion-apparel), [beauty](/solutions/beauty-cosmetics) and [electronics](/solutions/consumer-electronics).",
          },
        ],
      },
      {
        id: "how-to-write",
        heading: "How to write an AI-ready product description, step by step",
        blocks: [
          {
            type: "ol",
            items: [
              "**List the questions.** Write down five questions shoppers ask before buying this product. Check your customer service emails and reviews for the real wording.",
              "**Open with the answer.** Start with one sentence that says what the product is, what it is for and who it suits.",
              "**Add the comparison facts.** Materials, sizes, specs: the attributes a shopper would use to choose between two products.",
              "**Give advice.** Sizing, fit, compatibility or how to use it, in plain words.",
              "**Cut the filler.** Remove phrases that would fit any product, such as “high quality” or “perfect for everyone”.",
              "**Match your product data.** Put the same facts in your product attributes and structured data, for every variant.",
            ],
          },
          {
            type: "callout",
            title: "Keep it readable",
            text: "Writing for AI does not mean writing for robots. Assistants reward the same thing shoppers do: clear, specific information. A description that answers questions converts better on your own site too.",
          },
        ],
      },
      {
        id: "mistakes",
        heading: "Common mistakes that keep products out of AI answers",
        blocks: [
          {
            type: "ul",
            items: [
              "**Supplier descriptions copied as-is.** They match hundreds of other stores and rarely answer shoppers' questions.",
              "**Key facts only in images.** Size charts and ingredient lists as images are hard for AI to read. Put them in text.",
              "**Fit advice only in reviews.** If “size down” only appears in reviews, state it in the description.",
              "**Description and data disagree.** When the text says one thing and the product data another, assistants trust neither.",
              "**Keyword stuffing.** Repeating a phrase does not help an assistant understand the product. Facts do.",
            ],
          },
        ],
      },
      {
        id: "at-scale",
        heading: "How do you do this for a whole catalogue?",
        blocks: [
          {
            type: "p",
            text: "Start with the products that matter most: your bestsellers and the products closest to winning important shopping questions. Fix those first, measure the effect, then work down the list.",
          },
          {
            type: "p",
            text: "[Beseam's product description optimisation](/product/product-descriptions) does this for you: it finds missing facts across your catalogue, suggests improved descriptions and product data, and ranks them by expected revenue impact, so you approve the changes that matter first.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "How long should a product description be for AI search?",
        answer:
          "Long enough to answer the questions shoppers ask, and no longer. For most products that is two to four short paragraphs or a short paragraph plus a list of key facts. Completeness matters more than length.",
      },
      {
        question:
          "Should I write separate descriptions for AI and for shoppers?",
        answer:
          "No. AI assistants read the same page your shoppers do, and both reward clear, specific facts. One good description serves both.",
      },
      {
        question: "Can I use AI to write my product descriptions?",
        answer:
          "Yes, as long as the facts are right. AI can help structure and rewrite descriptions at scale, but every claim, size and spec should be checked against your real product data before it goes live.",
      },
      {
        question: "Do product descriptions affect Google rankings too?",
        answer:
          "Clear, specific and original product information is what both search engines and AI assistants reward, so improving descriptions for AI and for Google points in the same direction.",
      },
      {
        question: "Which products should I optimise first?",
        answer:
          "Start with bestsellers and products in categories where shoppers ask assistants for advice, such as footwear, beauty and electronics. Those are where a better match brings the most revenue.",
      },
    ],
    sources: [
      {
        label: "OpenAI Help Center: Shopping with ChatGPT search",
        url: "https://help.openai.com/en/articles/11128490-shopping-with-chatgpt-search",
      },
      {
        label: "Google Search Central: Product structured data",
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
    title: "How to track AI traffic and revenue in GA4 and Shopify",
    metaTitle: "How to Track AI Traffic and Revenue in GA4 and Shopify",
    metaDescription:
      "See how many visitors and how much revenue ChatGPT, Gemini, Perplexity and other AI assistants bring your webshop, with GA4's AI Assistant channel.",
    excerpt:
      "Use GA4's new AI Assistant channel and a custom channel group to see how much traffic and revenue AI assistants bring your webshop.",
    summary:
      "GA4 now groups visits from AI assistants such as ChatGPT, Gemini and Copilot into a default “AI Assistant” channel. To see the full picture, add a custom channel group that also catches Perplexity and Claude, make sure Shopify sends purchase events to GA4, and compare revenue and conversion rate per channel. Expect an undercount: some AI visits arrive without a referrer and show up as Direct.",
    published: "2026-10-09",
    updated: "2026-10-09",
    readingMinutes: 7,
    image: {
      src: "/images/blog/track-ai-traffic-ga4-shopify.svg",
      og: "/images/blog/track-ai-traffic-ga4-shopify.png",
      alt: "Illustration of an analytics report with an AI Assistant channel row and rising revenue bars.",
    },
    keywords: [
      "track AI traffic GA4",
      "ChatGPT traffic Google Analytics",
      "GA4 AI Assistant channel",
      "AI referral traffic Shopify",
      "measure AI search revenue",
    ],
    sections: [
      {
        id: "why-track",
        heading: "Why should webshops track AI traffic separately?",
        blocks: [
          {
            type: "p",
            text: "AI-referred visitors behave differently from other visitors. Adobe's data on US retail sites shows they converted 60% better than other traffic in July 2026 and brought 53% more revenue per visit. If that traffic is mixed into Referral or Direct, you cannot see it, value it or grow it.",
          },
          {
            type: "p",
            text: "Tracking it separately answers three questions: how many visitors AI assistants send you, which pages they land on, and how much they buy.",
          },
        ],
      },
      {
        id: "ga4-ai-assistant-channel",
        heading: "What is GA4's AI Assistant channel?",
        blocks: [
          {
            type: "p",
            text: "In May 2026, Google added an “AI Assistant” channel to GA4's default channel group. Sessions from recognised AI assistants are grouped there automatically, based on where the visit came from. It needs no setup, but it does not apply to data from before it was introduced.",
          },
          {
            type: "p",
            text: "Check which assistants it covers in Google's default channel group documentation, because the list has changed since launch. At the time of writing, reports indicate it includes ChatGPT, Gemini, Copilot, DeepSeek and Grok, while Perplexity visits still land in Referral and Google's AI Overviews count as Organic Search.",
          },
          {
            type: "p",
            text: "To see it: go to **Reports → Acquisition → Traffic acquisition** and look for the AI Assistant row in the Session default channel group.",
          },
        ],
      },
      {
        id: "custom-channel-group",
        heading: "How to set up a custom AI channel group in GA4",
        blocks: [
          {
            type: "p",
            text: "Because the default channel group cannot be edited, add your own channel group to catch every assistant you care about. Unlike the default channel, a custom channel group also applies to your historical data.",
          },
          {
            type: "ol",
            items: [
              "Go to **Admin → Data display → Channel groups** and create a new channel group (or copy the default one).",
              "Add a channel named **AI assistants**.",
              "Set the condition to **Session source matches regex**, with a pattern such as: `chatgpt|openai|perplexity|claude|gemini|copilot|deepseek|grok|meta\\.ai`",
              "Move the AI assistants channel **above Referral**, so these sessions are not counted as ordinary referrals.",
              "Save, then select your new channel group in the Traffic acquisition report.",
            ],
          },
          {
            type: "callout",
            title: "Tip",
            text: "ChatGPT often adds utm_source=chatgpt.com to the links it shows, which makes its visits easy to recognise. Keep your regex broad and review it every few months as new assistants appear.",
          },
        ],
      },
      {
        id: "revenue",
        heading: "How to see the revenue AI assistants bring",
        blocks: [
          {
            type: "p",
            text: "Visits are only half the story. To see revenue per channel, GA4 needs your purchases.",
          },
          {
            type: "ol",
            items: [
              "Make sure your Shopify store sends purchase events to GA4, for example through the Google & YouTube app.",
              "In the Traffic acquisition report, add the metrics **Total revenue**, **Key events** and **Session key event rate**.",
              "Compare the AI assistants channel with Organic Search and Paid Search on conversion rate and revenue per session.",
              "Add **Landing page** as a secondary dimension to see which products and pages AI assistants send shoppers to.",
            ],
          },
          {
            type: "p",
            text: "In Shopify itself, the analytics reports group sessions by referrer, and each order's conversion details show where the visit came from. That is useful for spot checks; GA4 is better for trends over time.",
          },
        ],
      },
      {
        id: "limits",
        heading: "What does AI traffic tracking miss?",
        blocks: [
          {
            type: "ul",
            items: [
              "**Visits without a referrer.** Some assistant apps open links without passing a referrer. If the link has no UTM tag either, the visit shows up as Direct.",
              "**Influence without a click.** A shopper may read a recommendation and later search for your brand or type your URL. That sale is not credited to AI.",
              "**AI Overviews.** Clicks from Google's AI Overviews count as Organic Search, not as AI traffic.",
            ],
          },
          {
            type: "p",
            text: "So treat your AI channel numbers as a minimum. A rise in direct and branded traffic alongside it is often part of the same effect.",
          },
        ],
      },
      {
        id: "visibility",
        heading: "Traffic is the result. Visibility is the cause.",
        blocks: [
          {
            type: "p",
            text: "Analytics shows the visits AI assistants send you, but not the recommendations you missed. To grow the channel, track which shopping questions your products appear for, and which competitors appear instead. Our guide on [getting your products recommended by ChatGPT](/blog/get-products-recommended-by-chatgpt) explains how.",
          },
          {
            type: "callout",
            title: "See visibility and revenue together",
            text: "[Beseam](/product/ai-visibility-tracking) tracks your products across six AI assistants and links AI visibility to AI-referred traffic and revenue, by question, product and landing page.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Does GA4 track ChatGPT traffic automatically?",
        answer:
          "Yes, mostly. Since May 2026, GA4 groups sessions from recognised AI assistants, including ChatGPT, into a default AI Assistant channel. Visits that arrive without a referrer still show up as Direct.",
      },
      {
        question: "Why is Perplexity traffic not in the AI Assistant channel?",
        answer:
          "At the time of writing, Perplexity is not on the list of sources GA4 classifies as AI Assistant, so its visits appear under Referral. A custom channel group with a regex on session source can include it.",
      },
      {
        question: "How much of my traffic comes from AI assistants?",
        answer:
          "For most webshops it is still a small share of total visits, but it is growing fast and converts above average. Check the AI Assistant channel, or your custom channel group, in GA4's Traffic acquisition report.",
      },
      {
        question: "Can I see AI traffic in Shopify analytics?",
        answer:
          "Shopify's reports group sessions by referrer, so visits from chatgpt.com or perplexity.ai show up there, and each order's conversion details show where the visit came from. GA4 gives more control over channel grouping and trends.",
      },
      {
        question: "Is AI traffic worth optimising for?",
        answer:
          "Adobe's data on US retail sites shows AI-referred visitors converting 60% better than other traffic in July 2026, with 53% more revenue per visit. The channel is small but valuable, and it is growing quickly.",
      },
    ],
    sources: [
      {
        label: "Google Analytics Help: Default channel group",
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
        label:
          "Digital Commerce 360: Adobe AI-referral traffic data, July 2026",
        url: "https://www.digitalcommerce360.com/2026/08/19/adobe-ai-referral-traffic-data-july-2026/",
      },
    ],
  },
];

const BLOG_POSTS_BY_LOCALE: Record<Locale, readonly BlogPost[]> = {
  en: BLOG_POSTS,
  de: BLOG_POSTS_DE,
  nl: BLOG_POSTS_NL,
};

/** The posts in one language; slugs are the same in every language. */
export function getBlogPosts(locale: Locale): readonly BlogPost[] {
  return BLOG_POSTS_BY_LOCALE[locale];
}

export function getBlogPost(
  slug: string,
  locale: Locale = "en",
): BlogPost | undefined {
  return getBlogPosts(locale).find((post) => post.slug === slug);
}

export const formatPostDate = (value: string, dateLocale = "en-GB") =>
  new Intl.DateTimeFormat(dateLocale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
