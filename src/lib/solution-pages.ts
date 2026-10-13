import {
  BadgeCheck,
  CheckCircle2,
  Cpu,
  Droplet,
  FlaskConical,
  Footprints,
  Layers,
  Package,
  Palette,
  Plug,
  RefreshCw,
  Ruler,
  Shirt,
  Sparkles,
} from "lucide-react";

import type { Locale } from "@/i18n/locale-rules.mjs";
import { SOLUTION_PAGES_DE } from "@/lib/content/solution-pages.de";
import { SOLUTION_PAGES_NL } from "@/lib/content/solution-pages.nl";
import type { ProductPageData } from "@/lib/product-pages";

/**
 * The solution pages under /solutions: four industries plus Shopify. Same
 * shape and template as the product pages; the industry pages add example
 * questions shoppers put to AI in that category. English only for now.
 *
 * Copy rules as for the product pages: no prices, no platforms beyond
 * Shopify, no customer results. The shopper questions are illustrative
 * examples of the kind of question asked, not measured search volumes.
 */
const steps = (category: string) =>
  [
    {
      title: "Connect your Shopify webshop",
      body: "Beseam imports your catalogue without touching your theme code.",
    },
    {
      title: "See where you're missing",
      body: `Beseam asks AI assistants the questions ${category} shoppers ask and shows where your products are left out.`,
    },
    {
      title: "Fix what matters first",
      body: "Get improvements ranked by expected revenue impact, then approve them or let Beseam apply them automatically.",
    },
  ] as const;

const catalogueFaq = {
  question: "Does Beseam work with large catalogues?",
  answer:
    "Yes. Beseam is built for webshops with hundreds or thousands of products and variants, and starts with the products that matter most to your revenue.",
} as const;

const platformFaq = {
  question: "Does Beseam work with my webshop platform?",
  answer:
    "Beseam currently works with Shopify webshops, which connect in one click without touching your theme code.",
} as const;

/** Every industry page links all four products. */
const ALL_PRODUCTS = [
  "ai-visibility-tracking",
  "product-descriptions",
  "content-creation",
  "technical-performance",
] as const;

export const SOLUTION_PAGES: readonly ProductPageData[] = [
  {
    slug: "footwear",
    name: "Footwear",
    metaTitle: "AI Search Optimisation for Footwear Webshops | Beseam",
    metaDescription:
      "Get your shoes recommended by ChatGPT, Gemini and other AI assistants. Track AI visibility and optimise product pages, content and technical setup.",
    headline: "Get your shoes recommended when shoppers ask AI",
    intro:
      "Shoppers ask AI assistants for running shoes for flat feet, waterproof boots for city walks or sneakers that run true to size. Beseam tracks where your shoes show up in those answers, and optimises your product pages, content and technical setup so assistants recommend them.",
    heroChat: {
      prompt: "Waterproof leather boots for daily commuting, wide fit?",
      reply:
        "For a daily commute in the rain, a waterproof leather boot with a grippy sole works well. This one comes in a wide fit:",
      product: {
        name: "City Leather Boot",
        store: "yourstore.com",
        price: "€149",
        image: "/images/catalog/boot.webp",
        facts: ["Waterproof", "Wide fit", "True to size"],
      },
      sticker: "Recommended in 3 of 4 assistants",
    },
    shopperQuestions: {
      heading: "What shoppers ask AI about footwear",
      items: [
        "Best running shoes for flat feet under €150",
        "Waterproof leather boots for daily commuting",
        "Do these sneakers run true to size?",
        "Comfortable shoes for standing all day",
        "Trail running shoes for wide feet",
        "Vegan sneakers that last",
      ],
    },
    pillars: {
      heading: "Everything that gets your shoes recommended by AI",
      intro:
        "Good product pages are only part of it. Beseam covers the four things that decide whether AI assistants recommend your shoes, or someone else's.",
      items: [
        {
          product: "ai-visibility-tracking",
          title: "See which shoe questions you show up for",
          body: "Beseam asks AI assistants the questions your shoppers ask, from running shoes for flat feet to waterproof boots for commuting, and shows where your shoes are recommended and who appears instead.",
          points: [
            "Tracked per question, product and assistant",
            "See which competitors are recommended instead",
            "Linked to AI-referred traffic and revenue",
          ],
          visual: {
            kind: "visibility",
            label: "AI visibility · footwear questions",
            rows: [
              { prompt: "Running shoes for flat feet", recommended: true },
              { prompt: "Waterproof boots for commuting", recommended: false },
              { prompt: "Wide-fit trail running shoes", recommended: true },
              { prompt: "Vegan sneakers that last", recommended: false },
            ],
          },
        },
        {
          product: "product-descriptions",
          title: "Product pages that answer fit and sizing questions",
          body: "Shoppers want to know about width, sizing and use case before they buy shoes online. Beseam rewrites descriptions and fills missing product data, so assistants can match each shoe to a specific request.",
          points: [
            "Sizing advice and width in the text, not just a chart",
            "Use case, materials and weather protection",
            "Complete data for every size and colour",
          ],
          visual: {
            kind: "description",
            before: {
              label: "Before",
              text: "Our most popular running shoe. Stylish, comfortable and available in four colours. Perfect for every run!",
            },
            after: {
              label: "Optimised for AI",
              text: "A waterproof trail running shoe with a wide toe box and an 8 mm drop, made for wet and muddy trails. EU 38–47, in standard and wide fit. Runs true to size.",
            },
          },
        },
        {
          product: "content-creation",
          title: "Content for “which shoe should I buy?” questions",
          body: "Many footwear questions aren't about one product: shoppers ask AI to compare, explain and help them choose. Beseam helps you create the collection pages, comparisons and buying guides that put your range in those answers.",
          points: [
            "Collection pages for needs like wide fit or vegan",
            "Comparisons such as trail vs road running shoes",
            "Buying guides on sizing, fit and care",
          ],
          visual: {
            kind: "pages",
            label: "Content gaps found",
            rows: [
              {
                type: "Collection",
                title: "Wide-fit running shoes",
                status: "New page",
              },
              {
                type: "Comparison",
                title: "Trail vs road running shoes",
                status: "New page",
              },
              {
                type: "Guide",
                title: "How to find your running shoe size",
                status: "Draft ready",
              },
            ],
          },
        },
        {
          product: "technical-performance",
          title: "Product data AI can read and trust",
          body: "Shoes come in many sizes and colours, which makes product data easy to get wrong. Beseam checks that structured data, prices and stock match your pages, and that AI crawlers can reach them.",
          points: [
            "Structured data for every size variant",
            "Stock per size that matches the page",
            "AI crawlers allowed in, pages loading fast",
          ],
          visual: {
            kind: "checks",
            label: "Technical check",
            rows: [
              { label: "Product structured data", ok: true, detail: "Present" },
              {
                label: "Stock per size variant",
                ok: false,
                detail: "Out of sync",
              },
              { label: "AI crawler access", ok: true, detail: "Allowed" },
              { label: "Product page speed", ok: true, detail: "Fast" },
            ],
          },
        },
      ],
    },
    checklist: {
      heading: "What AI needs from a footwear webshop",
      intro:
        "AI assistants recommend shoes they can understand, compare and trust. These are the details that matter most, on your product pages and beyond.",
      items: [
        {
          title: "Sizing and size advice",
          body: "Available sizes in a clear system (EU, UK or US), and whether the shoe runs small, large or true to size.",
        },
        {
          title: "Width and fit",
          body: "Standard, wide or narrow fit, and the shape of the toe box. Wide-fit questions are common, and often left unanswered.",
        },
        {
          title: "Use case",
          body: "What the shoe is made for: road running, trail, hiking, the office or standing all day. Assistants recommend shoes for situations.",
        },
        {
          title: "Materials and protection",
          body: "Upper, lining and sole materials, whether the shoe is vegan, and whether it's waterproof or breathable.",
        },
        {
          title: "Technical specs",
          body: "For sports shoes: heel-to-toe drop, cushioning, weight and stability, the facts assistants compare on.",
        },
        {
          title: "Collection pages for common needs",
          body: "Pages for wide-fit, vegan or waterproof shoes give assistants a clear overview of what you offer.",
        },
        {
          title: "Guides and comparisons",
          body: "Content on sizing, fit and choosing the right shoe gives assistants a reason to cite your store.",
        },
        {
          title: "Accurate data per variant",
          body: "Structured data, prices and stock for every size and colour, matching what shoppers see on the page.",
        },
      ],
    },
    benefitsHeading: "How Beseam helps footwear webshops",
    benefits: [
      {
        title: "Size and fit, made clear",
        body: "Spell out sizing, width and fit, the details shoppers ask about most before buying shoes online.",
        icon: Ruler,
      },
      {
        title: "Materials and use cases",
        body: "Describe materials, waterproofing and what each shoe is made for, from trail running to the office.",
        icon: Footprints,
      },
      {
        title: "Every variant covered",
        body: "Keep sizes, colours and stock data complete, so AI doesn't recommend a shoe that isn't available.",
        icon: Layers,
      },
    ],
    mistakes: {
      heading: "Common mistakes that keep shoes out of AI answers",
      items: [
        {
          title: "Not knowing where you stand",
          body: "Without tracking the questions shoppers ask, you can't tell whether AI recommends your shoes, or a competitor's.",
        },
        {
          title: "Marketing language instead of facts",
          body: "“Stylish and comfortable” gives an assistant nothing to work with. Width, drop, materials and use case do.",
        },
        {
          title: "Sizing hidden in an image",
          body: "Size charts as images are hard for AI to read. Put sizing advice in the text and in your product data.",
        },
        {
          title: "Only product pages, no guides",
          body: "For “which running shoe should I buy?”, assistants draw on guides and comparisons. Without them, your store isn't part of the answer.",
        },
        {
          title: "Sold-out sizes shown as available",
          body: "When product data and stock disagree, assistants may skip your shoes or send shoppers to a dead end.",
        },
        {
          title: "AI crawlers blocked by accident",
          body: "Bot protection, firewall rules or robots.txt settings can keep AI crawlers out without you knowing.",
        },
      ],
    },
    stepsHeading: "How Beseam works for footwear webshops",
    steps: steps("footwear"),
    faqs: [
      {
        question: "How do I get my shoes recommended by ChatGPT?",
        answer:
          "Start by knowing which shoe questions you show up for. Then make sure your product pages state sizing, fit, materials and use case, add content for the questions shoppers research, and keep your product data accurate. Beseam covers all four and shows what to fix first.",
      },
      {
        question: "What product information matters most for footwear?",
        answer:
          "Sizing and size advice, width and fit, use case, materials, weather protection and, for sports shoes, technical specs such as drop and cushioning. Together they let AI match a shoe to a specific request.",
      },
      {
        question: "What content helps footwear webshops get recommended?",
        answer:
          "Collection pages for common needs, such as wide-fit or waterproof shoes, comparisons like trail vs road running shoes, and buying guides on sizing and fit. AI assistants draw on this kind of content when shoppers ask for advice.",
      },
      {
        question: "Which technical issues are common for footwear webshops?",
        answer:
          "Structured data that misses size variants, stock per size that doesn't match the page, and AI crawlers blocked by bot protection. Because shoes come in many sizes and colours, small data errors affect many products at once.",
      },
      {
        question: "Can I see which shoe brands AI recommends instead of mine?",
        answer:
          "Yes. For every tracked question, Beseam shows which brands and products the assistant recommended, so you can see who appears in your place.",
      },
      {
        question: "How long before my shoes show up in AI answers?",
        answer:
          "There is no fixed timeline: it depends on the assistant and how often it refreshes its information. Beseam asks the same questions over time, so you can see when your products start to appear.",
      },
      catalogueFaq,
      platformFaq,
    ],
    relatedProducts: ALL_PRODUCTS,
  },
  {
    slug: "fashion-apparel",
    name: "Fashion & apparel",
    metaTitle: "AI Search Optimisation for Fashion Webshops | Beseam",
    metaDescription:
      "Get your clothing recommended by ChatGPT, Gemini and other AI assistants. Track AI visibility and optimise product pages, content and technical setup.",
    headline: "Get your fashion range recommended by AI",
    intro:
      "Shoppers ask AI for a linen shirt for a summer wedding, a winter coat that fits over a blazer, or jeans for tall men. Beseam tracks where your clothing shows up in those answers, and optimises your product pages, content and technical setup so assistants recommend it.",
    heroChat: {
      prompt: "Organic cotton t-shirt that keeps its shape after washing?",
      reply:
        "Look for heavier organic cotton that's been pre-shrunk, so it holds its shape wash after wash. This one is a good match:",
      product: {
        name: "Everyday Organic Tee",
        store: "yourstore.com",
        price: "€35",
        image: "/images/catalog/tshirt.webp",
        facts: ["Organic cotton", "Pre-shrunk", "Regular fit"],
      },
      sticker: "Recommended in 3 of 4 assistants",
    },
    shopperQuestions: {
      heading: "What shoppers ask AI about fashion",
      items: [
        "Linen shirt for a summer wedding",
        "Warm winter coat that fits over a blazer",
        "Sustainable jeans for tall men",
        "What to wear to a smart-casual office",
        "Breathable dresses for hot weather",
        "Organic cotton t-shirt that keeps its shape",
      ],
    },
    pillars: {
      heading: "Everything that gets your clothing recommended by AI",
      intro:
        "Good product pages are only part of it. Beseam covers the four things that decide whether AI assistants recommend your clothing, or someone else's.",
      items: [
        {
          product: "ai-visibility-tracking",
          title: "See which fashion questions you show up for",
          body: "Beseam asks AI assistants the questions your shoppers ask, from what to wear to a summer wedding to jeans for tall men, and shows where your clothing is recommended and who appears instead.",
          points: [
            "Tracked per question, product and assistant",
            "See which brands are recommended instead",
            "Linked to AI-referred traffic and revenue",
          ],
          visual: {
            kind: "visibility",
            label: "AI visibility · fashion questions",
            rows: [
              { prompt: "Linen shirt for a summer wedding", recommended: true },
              { prompt: "Jeans for tall men", recommended: false },
              { prompt: "Coat that fits over a blazer", recommended: true },
              {
                prompt: "Breathable dresses for hot weather",
                recommended: false,
              },
            ],
          },
        },
        {
          product: "product-descriptions",
          title: "Product pages that answer fit and occasion questions",
          body: "Shoppers ask how a garment fits, what it's made of and when to wear it. Beseam rewrites descriptions and fills missing product data, so assistants can match each item to a specific request.",
          points: [
            "Cut, fit and size advice in the text",
            "Fabric, weight and care details",
            "Occasions and styling, for every colour and size",
          ],
          visual: {
            kind: "description",
            before: {
              label: "Before",
              text: "Our bestselling linen shirt. Effortlessly stylish and perfect for summer. Available in five colours.",
            },
            after: {
              label: "Optimised for AI",
              text: "A relaxed-fit shirt in 100% European linen, light enough for hot days and smart enough for a summer wedding. Falls just below the hip. Fits true to size; size down for a closer fit.",
            },
          },
        },
        {
          product: "content-creation",
          title: "Content for “what should I wear?” questions",
          body: "Many fashion questions are about occasions, styles and comparisons, not one product. Beseam helps you create the collection pages, style guides and comparisons that put your range in those answers.",
          points: [
            "Collection pages for occasions like weddings or the office",
            "Style guides such as what to wear to a smart-casual office",
            "Fit and fabric guides, like linen vs cotton",
          ],
          visual: {
            kind: "pages",
            label: "Content gaps found",
            rows: [
              {
                type: "Collection",
                title: "Summer wedding guest outfits",
                status: "New page",
              },
              {
                type: "Guide",
                title: "What to wear to a smart-casual office",
                status: "Draft ready",
              },
              {
                type: "Comparison",
                title: "Linen vs cotton shirts",
                status: "New page",
              },
            ],
          },
        },
        {
          product: "technical-performance",
          title: "Product data AI can read and trust",
          body: "Every garment comes in several colours and sizes, which makes product data easy to get wrong. Beseam checks that structured data, prices and stock match your pages, and that AI crawlers can reach them.",
          points: [
            "Structured data for every colour and size",
            "Stock per variant that matches the page",
            "AI crawlers allowed in, pages loading fast",
          ],
          visual: {
            kind: "checks",
            label: "Technical check",
            rows: [
              { label: "Product structured data", ok: true, detail: "Present" },
              { label: "Colour variants", ok: false, detail: "Missing data" },
              { label: "AI crawler access", ok: true, detail: "Allowed" },
              { label: "Product page speed", ok: true, detail: "Fast" },
            ],
          },
        },
      ],
    },
    checklist: {
      heading: "What AI needs from a fashion webshop",
      intro:
        "AI assistants recommend clothing they can understand, compare and trust. These are the details that matter most, on your product pages and beyond.",
      items: [
        {
          title: "Cut, fit and size advice",
          body: "Slim, regular or relaxed fit, the length, and whether the item runs small, large or true to size.",
        },
        {
          title: "Fabric and weight",
          body: "The materials and how the fabric feels and wears: light linen, heavyweight cotton, stretch denim.",
        },
        {
          title: "Occasion and season",
          body: "When to wear it: weddings, the office, holidays or winter commutes. Assistants recommend clothing for situations.",
        },
        {
          title: "Colours and variants",
          body: "Clear colour names and every colour and size as its own variant, not just “available in five colours”.",
        },
        {
          title: "Care and sustainability",
          body: "Care instructions and any certifications or recycled materials, stated plainly in the text.",
        },
        {
          title: "Collection pages for common needs",
          body: "Pages for occasions, styles and fits give assistants a clear overview of what you offer.",
        },
        {
          title: "Style guides and comparisons",
          body: "Content on what to wear and how to choose gives assistants a reason to cite your store.",
        },
        {
          title: "Accurate data per variant",
          body: "Structured data, prices and stock for every colour and size, matching what shoppers see on the page.",
        },
      ],
    },
    benefitsHeading: "What AI needs to recommend your clothing",
    benefits: [
      {
        title: "Cuts, fits and sizes",
        body: "Describe cut, fit and sizing, so assistants can match garments to body types and preferences.",
        icon: Shirt,
      },
      {
        title: "Occasions and styling",
        body: "Connect products to the occasions and styles shoppers ask about, from weddings to the office.",
        icon: Sparkles,
      },
      {
        title: "Colours and materials",
        body: "Make colours, fabrics and care details explicit, for every variant in your range.",
        icon: Palette,
      },
    ],
    mistakes: {
      heading: "Common mistakes that keep clothing out of AI answers",
      items: [
        {
          title: "Not knowing where you stand",
          body: "Without tracking the questions shoppers ask, you can't tell whether AI recommends your clothing, or a competitor's.",
        },
        {
          title: "Mood instead of facts",
          body: "“Effortlessly stylish” gives an assistant nothing to work with. Fit, fabric, length and occasion do.",
        },
        {
          title: "Fit advice only in reviews",
          body: "If “size down” only appears in customer reviews, assistants may miss it. Put fit advice in the description.",
        },
        {
          title: "No pages for occasions",
          body: "For “what should I wear to a summer wedding?”, assistants draw on collections and guides. Without them, your range isn't part of the answer.",
        },
        {
          title: "Vague colour names",
          body: "“Sand”, “stone” and “oat” mean little on their own. Add the plain colour so assistants can match the request.",
        },
        {
          title: "AI crawlers blocked by accident",
          body: "Bot protection, firewall rules or robots.txt settings can keep AI crawlers out without you knowing.",
        },
      ],
    },
    stepsHeading: "How Beseam works for fashion webshops",
    steps: steps("fashion"),
    faqs: [
      {
        question: "How do I get my clothing recommended by AI assistants?",
        answer:
          "Start by knowing which fashion questions you show up for. Then make sure your product pages state cut, fit, fabric and occasion, add content for the questions shoppers research, and keep your product data accurate. Beseam covers all four and shows what to fix first.",
      },
      {
        question: "What product information matters most for fashion?",
        answer:
          "Cut and fit, size advice, fabric and weight, occasion and season, colours and care. Together they let AI match a garment to a specific request.",
      },
      {
        question: "Why do occasions matter for AI search?",
        answer:
          "Shoppers often ask AI what to wear for a specific occasion. Product pages and collections that name those occasions are easier for assistants to recommend.",
      },
      {
        question: "What content helps fashion webshops get recommended?",
        answer:
          "Collection pages for occasions and styles, style guides such as what to wear to the office, and fabric or fit comparisons. AI assistants draw on this kind of content when shoppers ask for advice.",
      },
      {
        question: "Can I see which brands AI recommends instead of mine?",
        answer:
          "Yes. For every tracked question, Beseam shows which brands and products the assistant recommended, so you can see who appears in your place.",
      },
      {
        question: "How long before my clothing shows up in AI answers?",
        answer:
          "There is no fixed timeline: it depends on the assistant and how often it refreshes its information. Beseam asks the same questions over time, so you can see when your products start to appear.",
      },
      catalogueFaq,
      platformFaq,
    ],
    relatedProducts: ALL_PRODUCTS,
  },
  {
    slug: "beauty-cosmetics",
    name: "Beauty & cosmetics",
    metaTitle: "AI Search Optimisation for Beauty Webshops | Beseam",
    metaDescription:
      "Get your beauty and skincare products recommended by ChatGPT, Gemini and other AI assistants. Track AI visibility and optimise pages, content and tech.",
    headline: "Get your beauty products recommended by AI",
    intro:
      "Shoppers ask AI which serum helps with dull skin, which sunscreen suits sensitive skin, or which shampoo is sulphate-free. Beseam tracks where your products show up in those answers, and optimises your product pages, content and technical setup so assistants recommend them.",
    heroChat: {
      prompt: "Fragrance-free moisturiser for sensitive skin?",
      reply:
        "For sensitive skin, a fragrance-free moisturiser with ceramides helps support the skin barrier. This one fits what you're looking for:",
      product: {
        name: "Calm Barrier Moisturiser",
        store: "yourstore.com",
        price: "€24",
        // "A jar of cream with mint leaves on a white table" by Maria
        // Kovalets, unsplash.com/photos/Y89Qfa_H7-o (Unsplash licence: free
        // commercial use, no attribution required), cropped to 480 x 360.
        image: "/images/catalog/moisturiser.webp",
        facts: ["Fragrance-free", "Ceramides", "Sensitive skin"],
      },
      sticker: "Recommended in 3 of 4 assistants",
    },
    shopperQuestions: {
      heading: "What shoppers ask AI about beauty",
      items: [
        "Best vitamin C serum for dull skin",
        "Fragrance-free moisturiser for sensitive skin",
        "Sulphate-free shampoo for curly hair",
        "Mineral sunscreen without a white cast",
        "Vegan and cruelty-free mascara",
        "Retinol alternative for beginners",
      ],
    },
    pillars: {
      heading: "Everything that gets your beauty products recommended by AI",
      intro:
        "Good product pages are only part of it. Beseam covers the four things that decide whether AI assistants recommend your products, or someone else's.",
      items: [
        {
          product: "ai-visibility-tracking",
          title: "See which beauty questions you show up for",
          body: "Beseam asks AI assistants the questions your shoppers ask, from serums for dull skin to sulphate-free shampoo, and shows where your products are recommended and who appears instead.",
          points: [
            "Tracked per question, product and assistant",
            "See which brands are recommended instead",
            "Linked to AI-referred traffic and revenue",
          ],
          visual: {
            kind: "visibility",
            label: "AI visibility · beauty questions",
            rows: [
              { prompt: "Vitamin C serum for dull skin", recommended: true },
              {
                prompt: "Mineral sunscreen, no white cast",
                recommended: false,
              },
              { prompt: "Sulphate-free shampoo for curls", recommended: true },
              {
                prompt: "Retinol alternative for beginners",
                recommended: false,
              },
            ],
          },
        },
        {
          product: "product-descriptions",
          title: "Product pages that answer ingredient and skin-type questions",
          body: "Beauty shoppers ask what's in a product, what it does and whether it suits them. Beseam rewrites descriptions and fills missing product data, so assistants can match each product to a specific need.",
          points: [
            "Key ingredients and what they do",
            "Skin types, hair types and concerns",
            "How to use it, and what it's free from",
          ],
          visual: {
            kind: "description",
            before: {
              label: "Before",
              text: "Our iconic glow serum. A little bottle of magic for radiant, healthy-looking skin. You'll love it!",
            },
            after: {
              label: "Optimised for AI",
              text: "A 15% vitamin C serum with hyaluronic acid for dull, uneven skin. Lightweight and fragrance-free, suitable for normal to combination skin. Apply in the morning before sunscreen.",
            },
          },
        },
        {
          product: "content-creation",
          title: "Content for “what should I use?” questions",
          body: "Many beauty questions are about routines, ingredients and comparisons. Beseam helps you create the collection pages, routine guides and ingredient explainers that put your range in those answers.",
          points: [
            "Collection pages by skin type or concern",
            "Routine guides, like a morning routine for dry skin",
            "Ingredient explainers and comparisons",
          ],
          visual: {
            kind: "pages",
            label: "Content gaps found",
            rows: [
              {
                type: "Collection",
                title: "Skincare for sensitive skin",
                status: "New page",
              },
              {
                type: "Guide",
                title: "Morning routine for dry skin",
                status: "Draft ready",
              },
              {
                type: "Comparison",
                title: "Mineral vs chemical sunscreen",
                status: "New page",
              },
            ],
          },
        },
        {
          product: "technical-performance",
          title: "Product data AI can read and trust",
          body: "Shades, sizes and refills multiply your variants, and ingredient lists often hide in images. Beseam checks that structured data, prices and stock match your pages, and that AI crawlers can reach them.",
          points: [
            "Structured data for every shade and size",
            "Ingredient lists as text, not images",
            "AI crawlers allowed in, pages loading fast",
          ],
          visual: {
            kind: "checks",
            label: "Technical check",
            rows: [
              { label: "Product structured data", ok: true, detail: "Present" },
              { label: "Ingredient lists", ok: false, detail: "In images" },
              { label: "AI crawler access", ok: true, detail: "Allowed" },
              { label: "Product page speed", ok: true, detail: "Fast" },
            ],
          },
        },
      ],
    },
    checklist: {
      heading: "What AI needs from a beauty webshop",
      intro:
        "AI assistants recommend beauty products they can understand, compare and trust. These are the details that matter most, on your product pages and beyond.",
      items: [
        {
          title: "Key ingredients",
          body: "The active ingredients, their concentration where relevant, and what each one does.",
        },
        {
          title: "Skin and hair types",
          body: "Who the product suits: dry, oily, sensitive or combination skin, and curly, fine or coloured hair.",
        },
        {
          title: "Concerns it addresses",
          body: "Dullness, redness, frizz or dryness. Shoppers ask AI about concerns, not product names.",
        },
        {
          title: "Free-from and certifications",
          body: "Fragrance-free, vegan, cruelty-free or sulphate-free, stated plainly in the text.",
        },
        {
          title: "How to use it",
          body: "When and how to apply, and what to combine it with, so assistants can place it in a routine.",
        },
        {
          title: "Collection pages for concerns",
          body: "Pages by skin type or concern give assistants a clear overview of what you offer.",
        },
        {
          title: "Routines and ingredient guides",
          body: "Content on routines and ingredients gives assistants a reason to cite your store.",
        },
        {
          title: "Accurate data per variant",
          body: "Structured data, prices and stock for every shade and size, matching what shoppers see on the page.",
        },
      ],
    },
    benefitsHeading: "What AI needs to recommend your beauty products",
    benefits: [
      {
        title: "Ingredients made clear",
        body: "List key ingredients and what they do, the details beauty shoppers ask AI about first.",
        icon: FlaskConical,
      },
      {
        title: "Matched to skin and hair types",
        body: "Connect each product to the skin types, hair types and concerns it's made for.",
        icon: Droplet,
      },
      {
        title: "Clear, consistent claims",
        body: "Keep product claims, certifications and usage instructions clear and consistent across your store.",
        icon: BadgeCheck,
      },
    ],
    mistakes: {
      heading: "Common mistakes that keep beauty products out of AI answers",
      items: [
        {
          title: "Not knowing where you stand",
          body: "Without tracking the questions shoppers ask, you can't tell whether AI recommends your products, or a competitor's.",
        },
        {
          title: "Hype instead of facts",
          body: "“A little bottle of magic” gives an assistant nothing to work with. Ingredients, skin types and concerns do.",
        },
        {
          title: "Ingredient lists as images",
          body: "Ingredient lists in product photos are hard for AI to read. Put them in the text and your product data.",
        },
        {
          title: "No skin type or concern named",
          body: "If your page doesn't say a product suits sensitive skin, assistants won't recommend it to shoppers who ask.",
        },
        {
          title: "No routines or guides",
          body: "For “what's a good routine for dry skin?”, assistants draw on guides. Without them, your store isn't part of the answer.",
        },
        {
          title: "AI crawlers blocked by accident",
          body: "Bot protection, firewall rules or robots.txt settings can keep AI crawlers out without you knowing.",
        },
      ],
    },
    stepsHeading: "How Beseam works for beauty webshops",
    steps: steps("beauty"),
    faqs: [
      {
        question: "How do I get my beauty products recommended by ChatGPT?",
        answer:
          "Start by knowing which beauty questions you show up for. Then make sure your product pages state key ingredients, skin or hair types and concerns, add content for the questions shoppers research, and keep your product data accurate. Beseam covers all four and shows what to fix first.",
      },
      {
        question: "Why do ingredients matter for AI search?",
        answer:
          "Beauty shoppers often ask for specific ingredients or ask what to avoid. Product pages that list ingredients clearly let AI assistants match your products to those questions.",
      },
      {
        question: "What content helps beauty webshops get recommended?",
        answer:
          "Collection pages by skin type or concern, routine guides and ingredient explainers. AI assistants draw on this kind of content when shoppers ask for advice.",
      },
      {
        question: "Does Beseam change my product claims?",
        answer:
          "Not without your approval. Every suggested change waits for you, unless you choose to automate that type of change, so you stay in control of claims and wording. All changes stay reversible.",
      },
      {
        question: "Can I see which brands AI recommends instead of mine?",
        answer:
          "Yes. For every tracked question, Beseam shows which brands and products the assistant recommended, so you can see who appears in your place.",
      },
      {
        question: "How long before my products show up in AI answers?",
        answer:
          "There is no fixed timeline: it depends on the assistant and how often it refreshes its information. Beseam asks the same questions over time, so you can see when your products start to appear.",
      },
      catalogueFaq,
      platformFaq,
    ],
    relatedProducts: ALL_PRODUCTS,
  },
  {
    slug: "consumer-electronics",
    name: "Consumer electronics",
    metaTitle: "AI Search Optimisation for Electronics Webshops | Beseam",
    metaDescription:
      "Get your electronics recommended by ChatGPT, Gemini and other AI assistants. Track AI visibility and optimise specs, content and technical setup.",
    headline: "Get your electronics recommended when shoppers ask AI",
    intro:
      "Shoppers ask AI which noise-cancelling headphones last longest, which laptop handles photo editing, or which charger works with their phone. Beseam tracks where your products show up in those answers, and optimises your product pages, content and technical setup so assistants compare them correctly.",
    heroChat: {
      prompt: "Noise-cancelling headphones with the longest battery life?",
      reply:
        "If battery life matters most, look for 40 hours or more with noise cancelling on. This pair is a strong option:",
      product: {
        name: "Studio ANC Headphones",
        store: "yourstore.com",
        price: "€229",
        // "Black and brown wireless headphones" by Blaz Erzetic,
        // unsplash.com/photos/tqAmHGbIPdM (Unsplash licence: free commercial
        // use, no attribution required), cropped to 480 x 360.
        image: "/images/catalog/headphones.webp",
        facts: ["50 h battery", "Noise cancelling", "USB-C"],
      },
      sticker: "Recommended in 3 of 4 assistants",
    },
    shopperQuestions: {
      heading: "What shoppers ask AI about electronics",
      items: [
        "Noise-cancelling headphones with the longest battery life",
        "Laptop under €1,000 for photo editing",
        "USB-C charger that works with my phone",
        "Smartwatch compatible with Android",
        "Best budget speakers for a small room",
        "Robot vacuum for pet hair",
      ],
    },
    pillars: {
      heading: "Everything that gets your electronics recommended by AI",
      intro:
        "Good product pages are only part of it. Beseam covers the four things that decide whether AI assistants recommend your products, or someone else's.",
      items: [
        {
          product: "ai-visibility-tracking",
          title: "See which electronics questions you show up for",
          body: "Beseam asks AI assistants the questions your shoppers ask, from headphones with the longest battery life to chargers for a specific phone, and shows where your products are recommended and who appears instead.",
          points: [
            "Tracked per question, product and assistant",
            "See which brands and shops are recommended instead",
            "Linked to AI-referred traffic and revenue",
          ],
          visual: {
            kind: "visibility",
            label: "AI visibility · electronics questions",
            rows: [
              { prompt: "Headphones with longest battery", recommended: true },
              { prompt: "Laptop for photo editing", recommended: false },
              { prompt: "Smartwatch for Android", recommended: true },
              { prompt: "Robot vacuum for pet hair", recommended: false },
            ],
          },
        },
        {
          product: "product-descriptions",
          title: "Product pages that answer spec and compatibility questions",
          body: "Electronics shoppers compare on facts: battery life, compatibility, dimensions. Beseam rewrites descriptions and fills missing specs, so assistants can compare your products correctly.",
          points: [
            "Complete, consistent specifications",
            "Compatibility with devices and systems",
            "What's in the box and who it's for",
          ],
          visual: {
            kind: "description",
            before: {
              label: "Before",
              text: "Experience sound like never before. Premium audio, all-day comfort and the latest technology.",
            },
            after: {
              label: "Optimised for AI",
              text: "Over-ear headphones with active noise cancelling and up to 50 hours of battery life with ANC on. Bluetooth 5.3, multipoint pairing with iOS and Android, USB-C fast charging: 10 minutes gives 5 hours.",
            },
          },
        },
        {
          product: "content-creation",
          title: "Content for “which one should I buy?” questions",
          body: "Electronics shoppers research before they buy, and ask AI to compare. Beseam helps you create the comparisons, buying guides and collection pages that put your range in those answers.",
          points: [
            "Comparisons between models and categories",
            "Buying guides, like choosing a laptop for photo editing",
            "Collection pages for needs like travel or gaming",
          ],
          visual: {
            kind: "pages",
            label: "Content gaps found",
            rows: [
              {
                type: "Comparison",
                title: "Over-ear vs in-ear noise cancelling",
                status: "New page",
              },
              {
                type: "Guide",
                title: "How to choose a laptop for photo editing",
                status: "Draft ready",
              },
              {
                type: "Collection",
                title: "Headphones for travel",
                status: "New page",
              },
            ],
          },
        },
        {
          product: "technical-performance",
          title: "Prices, stock and specs AI can trust",
          body: "Electronics prices and stock change often, and assistants compare them across shops. Beseam checks that structured data, prices and availability match your pages, and that AI crawlers can reach them.",
          points: [
            "Prices and stock that match the page",
            "Structured data with identifiers like GTIN",
            "AI crawlers allowed in, pages loading fast",
          ],
          visual: {
            kind: "checks",
            label: "Technical check",
            rows: [
              { label: "Product structured data", ok: true, detail: "Present" },
              { label: "Price in product data", ok: false, detail: "Outdated" },
              { label: "AI crawler access", ok: true, detail: "Allowed" },
              { label: "Product page speed", ok: true, detail: "Fast" },
            ],
          },
        },
      ],
    },
    checklist: {
      heading: "What AI needs from an electronics webshop",
      intro:
        "AI assistants recommend electronics they can compare and trust. These are the details that matter most, on your product pages and beyond.",
      items: [
        {
          title: "Complete specifications",
          body: "The specs shoppers compare on, such as battery life, screen size, storage or power, in the text and product data.",
        },
        {
          title: "Compatibility",
          body: "Which devices, operating systems, connectors and accessories the product works with.",
        },
        {
          title: "Use case",
          body: "Who and what it's for: travel, gaming, home office or photo editing. Assistants recommend products for situations.",
        },
        {
          title: "Product identifiers",
          body: "Brand, model number and GTIN, so assistants can identify the exact product and compare it.",
        },
        {
          title: "What's in the box and warranty",
          body: "Included accessories, warranty and return terms, stated plainly on the page.",
        },
        {
          title: "Comparisons and buying guides",
          body: "Content that compares models and explains choices gives assistants a reason to cite your store.",
        },
        {
          title: "Collection pages for needs",
          body: "Pages for needs like travel headphones or budget laptops give assistants a clear overview.",
        },
        {
          title: "Accurate prices and stock",
          body: "Structured data, prices and availability that match what shoppers see, updated as they change.",
        },
      ],
    },
    benefitsHeading: "What AI needs to recommend your electronics",
    benefits: [
      {
        title: "Accurate specifications",
        body: "Keep technical specs complete and consistent, so assistants compare your products on the right facts.",
        icon: Cpu,
      },
      {
        title: "Compatibility spelled out",
        body: "Make clear which devices, systems and accessories each product works with.",
        icon: Plug,
      },
      {
        title: "Prices and stock in sync",
        body: "Make sure the prices and availability on your pages match your product data.",
        icon: RefreshCw,
      },
    ],
    mistakes: {
      heading: "Common mistakes that keep electronics out of AI answers",
      items: [
        {
          title: "Not knowing where you stand",
          body: "Without tracking the questions shoppers ask, you can't tell whether AI recommends your products, or a competitor's.",
        },
        {
          title: "Slogans instead of specs",
          body: "“Sound like never before” gives an assistant nothing to compare. Battery life, compatibility and dimensions do.",
        },
        {
          title: "Specs only in a PDF or image",
          body: "Spec sheets as PDFs or images are hard for AI to read. Put the key specs in the text and product data.",
        },
        {
          title: "Compatibility left unsaid",
          body: "If your page doesn't say a charger works with a specific phone, assistants won't recommend it for that question.",
        },
        {
          title: "Outdated prices in product data",
          body: "When structured data and the page disagree on price or stock, assistants may skip your products.",
        },
        {
          title: "AI crawlers blocked by accident",
          body: "Bot protection, firewall rules or robots.txt settings can keep AI crawlers out without you knowing.",
        },
      ],
    },
    stepsHeading: "How Beseam works for electronics webshops",
    steps: steps("electronics"),
    faqs: [
      {
        question: "How do I get my electronics recommended by AI assistants?",
        answer:
          "Start by knowing which electronics questions you show up for. Then make sure your product pages state specs, compatibility and use case, add comparisons and buying guides, and keep prices and stock accurate. Beseam covers all four and shows what to fix first.",
      },
      {
        question: "Why do specs matter so much for AI search?",
        answer:
          "Electronics shoppers ask AI to compare products on specific facts, such as battery life or compatibility. If those facts are missing or inconsistent, assistants are more likely to recommend a competitor.",
      },
      {
        question: "What content helps electronics webshops get recommended?",
        answer:
          "Comparisons between models, buying guides that explain choices, and collection pages for specific needs. AI assistants draw on this kind of content when shoppers ask which product to buy.",
      },
      {
        question: "Why do prices and stock matter for AI search?",
        answer:
          "Assistants compare products across shops and avoid recommending items that look unavailable or wrongly priced. Keeping structured data in sync with your pages helps them trust your store.",
      },
      {
        question: "Can I see which shops AI recommends instead of mine?",
        answer:
          "Yes. For every tracked question, Beseam shows which brands and products the assistant recommended, so you can see who appears in your place.",
      },
      {
        question: "How long before my products show up in AI answers?",
        answer:
          "There is no fixed timeline: it depends on the assistant and how often it refreshes its information. Beseam asks the same questions over time, so you can see when your products start to appear.",
      },
      catalogueFaq,
      platformFaq,
    ],
    relatedProducts: ALL_PRODUCTS,
  },
  {
    slug: "shopify",
    name: "Beseam for Shopify",
    metaTitle: "AI Search Optimisation for Shopify Stores | Beseam",
    metaDescription:
      "Connect your Shopify store in one click. Track AI visibility and optimise product pages, content and tech so ChatGPT and other assistants recommend you.",
    headline: "AI search optimisation, built for Shopify",
    intro:
      "Connect your Shopify store in one click. Beseam imports your catalogue without touching your theme code, tracks how AI assistants talk about your products, and optimises your product pages, content and technical setup, starting with the changes that can bring in the most revenue.",
    heroChat: {
      prompt: "Lightweight jacket for spring?",
      reply:
        "For spring, a light bomber that repels a shower and layers over a jumper works well. This one is a good match:",
      product: {
        name: "Lightweight Bomber Jacket",
        store: "yourstore.myshopify.com",
        price: "€119",
        // "Brown bomber jacket on hanger" by Tobias Tullius,
        // unsplash.com/photos/Fg15LdqpWrs (Unsplash licence: free commercial
        // use, no attribution required), cropped to 480 x 412 with the wall
        // extended on the left so the whole jacket fits.
        image: "/images/catalog/bomber-jacket.webp",
        facts: ["Water-repellent", "Lightweight", "Regular fit"],
      },
      sticker: "Recommended in 3 of 4 assistants",
    },
    pillars: {
      heading: "Everything your Shopify store needs to get recommended by AI",
      intro:
        "Beseam covers the four things that decide whether AI assistants recommend your products, all from one connection to your Shopify store.",
      items: [
        {
          product: "ai-visibility-tracking",
          title: "See which questions your store shows up for",
          body: "Beseam builds the questions shoppers ask from your Shopify catalogue, asks them across AI assistants, and shows where your products are recommended and who appears instead.",
          points: [
            "Questions built from your own catalogue",
            "Tracked per question, product and assistant",
            "Linked to AI-referred traffic and revenue",
          ],
          visual: {
            kind: "visibility",
            label: "AI visibility · your catalogue",
            rows: [
              { prompt: "Lightweight jacket for spring", recommended: true },
              { prompt: "Waterproof boots for commuting", recommended: false },
              { prompt: "Packable jacket for travel", recommended: true },
              { prompt: "Warm gloves for cycling", recommended: false },
            ],
          },
        },
        {
          product: "product-descriptions",
          title: "Better product pages, published to Shopify",
          body: "Beseam reads every product and variant in your store, rewrites descriptions and fills missing product data. Approve the changes and they're published to your store, or automate the ones you trust.",
          points: [
            "Every product and variant in your catalogue",
            "Ranked by expected revenue impact",
            "Approve in a few clicks, always reversible",
          ],
          visual: {
            kind: "description",
            before: {
              label: "Before",
              text: "Our favourite rain jacket. Stay dry in style, wherever the day takes you!",
            },
            after: {
              label: "Optimised for AI",
              text: "A lightweight, fully waterproof shell with taped seams and reflective details, made for cycling to work. Packs into its own pocket. Regular fit with room for a layer underneath.",
            },
          },
        },
        {
          product: "content-creation",
          title: "Collections, guides and comparisons",
          body: "Assistants draw on pages that explain and compare. Beseam helps you create and improve collection pages, blog posts and buying guides in your store, built around your own products.",
          points: [
            "Collection pages that explain your range",
            "Buying guides and comparisons for your blog",
            "Drafts you review before anything goes live",
          ],
          visual: {
            kind: "pages",
            label: "Content gaps found",
            rows: [
              {
                type: "Collection",
                title: "Rain gear for cycling",
                status: "Improve",
              },
              {
                type: "Guide",
                title: "How to choose a rain jacket",
                status: "Draft ready",
              },
              {
                type: "Comparison",
                title: "Waterproof vs water-resistant",
                status: "New page",
              },
            ],
          },
        },
        {
          product: "technical-performance",
          title: "A Shopify store AI can read and trust",
          body: "Themes and apps can leave structured data incomplete or duplicated. Beseam checks that product data, prices and stock match your pages, and that AI crawlers can reach them.",
          points: [
            "Structured data from your theme and apps",
            "Prices and stock per variant",
            "AI crawler access and page speed",
          ],
          visual: {
            kind: "checks",
            label: "Technical check",
            rows: [
              {
                label: "Product structured data",
                ok: false,
                detail: "Duplicated",
              },
              {
                label: "Variant prices and stock",
                ok: true,
                detail: "In sync",
              },
              { label: "AI crawler access", ok: true, detail: "Allowed" },
              { label: "Product page speed", ok: true, detail: "Fast" },
            ],
          },
        },
      ],
    },
    checklist: {
      heading: "What AI needs from a Shopify store",
      intro:
        "AI assistants recommend products they can understand, compare and trust. These are the details that matter most in a Shopify store.",
      items: [
        {
          title: "Specific product descriptions",
          body: "Use case, fit, materials and specs in the description, not just a slogan and a photo.",
        },
        {
          title: "Complete product data",
          body: "Product type, vendor, options and attributes filled in for every product, not left blank.",
        },
        {
          title: "Clear variants",
          body: "Every size and colour as its own variant with a clear name, price and stock level.",
        },
        {
          title: "Collection pages with context",
          body: "Collections with a short description of what's in them and who they're for, not just a product grid.",
        },
        {
          title: "Guides and comparisons",
          body: "Blog posts and guides that answer buying questions give assistants a reason to cite your store.",
        },
        {
          title: "Clean structured data",
          body: "One complete set of product structured data, without conflicts between your theme and apps.",
        },
        {
          title: "Open to AI crawlers",
          body: "Robots.txt and bot protection settings that let AI crawlers reach your products and collections.",
        },
        {
          title: "Fast product pages",
          body: "Pages that load quickly and completely, even with several apps installed.",
        },
      ],
    },
    benefitsHeading: "Made for Shopify stores",
    benefits: [
      {
        title: "One-click connection",
        body: "Connect your Shopify store in one click. No developers, no theme changes.",
        icon: Plug,
      },
      {
        title: "Your whole catalogue",
        body: "Beseam reads every product and variant in your store, at any catalogue size.",
        icon: Package,
      },
      {
        title: "Changes you approve",
        body: "Approve suggested changes in a few clicks, or automate the ones you trust. All changes stay reversible.",
        icon: CheckCircle2,
      },
    ],
    showBenefits: true,
    mistakes: {
      heading: "Common mistakes that keep Shopify stores out of AI answers",
      items: [
        {
          title: "Not knowing where you stand",
          body: "Without tracking the questions shoppers ask, you can't tell whether AI recommends your products, or a competitor's.",
        },
        {
          title: "Supplier descriptions copied as-is",
          body: "Descriptions copied from suppliers match hundreds of other stores and rarely answer shoppers' questions.",
        },
        {
          title: "Empty collection pages",
          body: "A collection with only a product grid tells assistants little. A short, specific description helps them understand it.",
        },
        {
          title: "Conflicting structured data",
          body: "When your theme and an app both add product data, assistants can get conflicting prices or stock.",
        },
        {
          title: "Too many apps slowing pages down",
          body: "Every app adds scripts. Slow or incomplete pages are harder for crawlers to read.",
        },
        {
          title: "AI crawlers blocked by accident",
          body: "Bot protection, firewall rules or robots.txt settings can keep AI crawlers out without you knowing.",
        },
      ],
    },
    stepsHeading: "How Beseam works with Shopify",
    steps: [
      {
        title: "Connect Shopify",
        body: "Link your store in one click. Beseam imports your catalogue without touching your theme code.",
      },
      {
        title: "Track your AI visibility",
        body: "See how ChatGPT, Claude, Gemini and other assistants answer the questions your shoppers ask.",
      },
      {
        title: "Optimise and measure",
        body: "Approve or automate the suggested changes, and follow how your AI traffic and revenue grow.",
      },
    ],
    faqs: [
      {
        question: "Does Beseam work with Shopify?",
        answer:
          "Yes. Beseam connects to Shopify in one click and imports your catalogue without touching your theme code.",
      },
      {
        question: "How do I get my Shopify products recommended by ChatGPT?",
        answer:
          "Start by knowing which questions your store shows up for. Then make your product descriptions specific, add collection pages and guides for the questions shoppers research, and keep your structured data clean. Beseam covers all four and shows what to fix first.",
      },
      {
        question: "Do I need a developer to set up Beseam?",
        answer:
          "No. The Shopify connection takes one click, and Beseam handles the rest.",
      },
      {
        question: "Will Beseam change my Shopify store without my approval?",
        answer:
          "No. Every customer-facing change waits for your approval, unless you choose to automate that type of change, and all changes stay reversible.",
      },
      {
        question: "Which AI assistants does Beseam track?",
        answer:
          "Beseam tracks ChatGPT, Claude, Gemini, Google AI Mode, Perplexity and Copilot, using the questions your shoppers ask about your products.",
      },
      {
        question: "Can Shopify apps affect my AI visibility?",
        answer:
          "Yes. Apps can add duplicate structured data, slow down pages or change what crawlers see. Beseam checks your store as it's actually served, including what your apps add.",
      },
      {
        question: "How long before my products show up in AI answers?",
        answer:
          "There is no fixed timeline: it depends on the assistant and how often it refreshes its information. Beseam asks the same questions over time, so you can see when your products start to appear.",
      },
      catalogueFaq,
    ],
    relatedProducts: ALL_PRODUCTS,
  },
];

const SOLUTION_PAGES_BY_LOCALE: Record<Locale, readonly ProductPageData[]> = {
  en: SOLUTION_PAGES,
  de: SOLUTION_PAGES_DE,
  nl: SOLUTION_PAGES_NL,
};

/** The solution pages in one language; slugs are the same in every language. */
export function getSolutionPages(locale: Locale): readonly ProductPageData[] {
  return SOLUTION_PAGES_BY_LOCALE[locale];
}

export function getSolutionPage(
  slug: string,
  locale: Locale = "en",
): ProductPageData {
  const page = getSolutionPages(locale).find(
    (candidate) => candidate.slug === slug,
  );
  if (!page) throw new Error(`Unknown solution page: ${slug}`);
  return page;
}
