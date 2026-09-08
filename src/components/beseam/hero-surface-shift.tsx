"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { User } from "lucide-react";

type Metric = readonly [label: string, value: string, score: number];
type Satellite = readonly [label: string, value: string];
type Capability = readonly [label: string, value: string, description: string];

type Hub = {
  id: string;
  label: string;
  x: number;
  y: number;
  satellites: readonly Satellite[];
  metrics: readonly Metric[];
};

type Point = { x: number; y: number };

type CapabilityNode = {
  hubId: string;
  index: number;
  x: number;
  y: number;
  capability: Capability;
};

type CardState =
  | { kind: "hub"; hubId: string }
  | { kind: "capability"; hubId: string; index: number }
  | null;

// Matches the app's --secondary token. The focus/expanded-hub color -- the
// one thing actually active right now: the selected hub, its journey line,
// connected edges, active capability/satellite dots.
const ACCENT = "#2e5da6";
// Matches the app's --signal-ink token (brand orange, light-ground variant).
// Reserved for the journey's *supporting* hubs/edges while a story plays --
// evidence backing the claim, not the claim itself.
const SECONDARY = "#b8441d";
const INK = "#111318";
const PAPER = "#fafafa";
const FOREGROUND_SPREAD = 1.3;
// One motion scale. Values JS ramps every frame (--kg-spot, --kg-expand) get a
// short linear TRACK so CSS never eases an already-eased ramp; class flips
// (active, selected, connected) get STATE; whole layers get LAYER.
const TRACK = "110ms linear";
const STATE = "240ms cubic-bezier(.22,.61,.36,1)";
// Colour moves faster than the rest: ink -> accent passes through a muddy brown
// at the midpoint, so the hue crosses before the eye can read it.
const COLOR = "140ms cubic-bezier(.22,.61,.36,1)";
const LAYER = "380ms cubic-bezier(.22,.61,.36,1)";
// The graph's auto-journey waits for the cursor to actually settle before it
// starts moving on its own -- a mouse still in motion means the visitor is
// reading/scanning, and starting motion under an active cursor reads as
// competing for attention rather than demonstrating the product.
const AUTO_JOURNEY_IDLE_DELAY_MS = 10000;
const HUBS: readonly Hub[] = [
  {
    id: "ai",
    label: "AI answers",
    x: 170,
    y: 158,
    satellites: [
      ["ChatGPT", "68"],
      ["Gemini", "61"],
      ["AI Mode", "72"],
      ["citations", "54"],
    ],
    metrics: [
      ["ChatGPT visibility", "68 / 100", 68],
      ["Gemini visibility", "61 / 100", 61],
      ["Google AI Mode", "72 / 100", 72],
    ],
  },
  {
    id: "search",
    label: "Search results",
    x: 365,
    y: 108,
    satellites: [
      ["JSON-LD", "83%"],
      ["indexable", "100%"],
      ["queries", "74%"],
      ["snippets", "66%"],
    ],
    metrics: [
      ["JSON-LD coverage", "83%", 83],
      ["Indexability", "100%", 100],
      ["Query match", "74%", 74],
    ],
  },
  {
    id: "catalog",
    label: "Products considered",
    x: 590,
    y: 245,
    satellites: [
      ["fields", "91%"],
      ["freshness", "96%"],
      ["variants", "88%"],
      ["stock", "94%"],
    ],
    metrics: [
      ["Completeness", "91%", 91],
      ["Freshness", "96%", 96],
      ["Variant coverage", "88%", 88],
    ],
  },
  {
    id: "brand",
    label: "Brand trust",
    x: 770,
    y: 112,
    satellites: [
      ["claims", "86%"],
      ["identity", "94%"],
      ["trust", "71%"],
      ["evidence", "79%"],
    ],
    metrics: [
      ["Approved claims", "86%", 86],
      ["Identity coverage", "94%", 94],
      ["Trust proof", "71%", 71],
    ],
  },
  {
    id: "truth",
    label: "Product facts",
    x: 840,
    y: 315,
    satellites: [
      ["price", "100%"],
      ["shipping", "80%"],
      ["reviews", "60%"],
      ["facts", "89%"],
    ],
    metrics: [
      ["Facts covered", "5 / 7", 71],
      ["Shipping facts", "4 / 5", 80],
      ["Structured facts", "89%", 89],
    ],
  },
  {
    id: "creative",
    label: "What they see",
    x: 1040,
    y: 118,
    satellites: [
      ["images", "82%"],
      ["video", "46%"],
      ["brand fit", "91%"],
      ["assets", "24"],
    ],
    metrics: [
      ["Product image coverage", "82%", 82],
      ["Brand consistency", "91%", 91],
      ["Video coverage", "46%", 46],
    ],
  },
  {
    id: "campaigns",
    label: "Ads they see",
    x: 1245,
    y: 155,
    satellites: [
      ["Google Ads", "82%"],
      ["Meta Ads", "76%"],
      ["landing", "91%"],
      ["tracking", "88%"],
    ],
    metrics: [
      ["Google Ads readiness", "82%", 82],
      ["Meta Ads readiness", "76%", 76],
      ["Landing readiness", "91%", 91],
    ],
  },
  {
    id: "onsite",
    label: "Store search",
    x: 1085,
    y: 330,
    satellites: [
      ["retrieval", "86%"],
      ["top 3", "64%"],
      ["zero result", "3.8%"],
      ["filters", "77%"],
    ],
    metrics: [
      ["Retrieval coverage", "86%", 86],
      ["Top-3 placement", "64%", 64],
      ["Zero-result rate", "3.8%", 38],
    ],
  },
  {
    id: "recs",
    label: "What gets suggested",
    x: 1325,
    y: 315,
    satellites: [
      ["coverage", "84%"],
      ["affinity", "73%"],
      ["rules", "12"],
      ["holdout", "on"],
    ],
    metrics: [
      ["Catalog coverage", "84%", 84],
      ["Affinity confidence", "73%", 73],
      ["Holdout coverage", "62%", 62],
    ],
  },
  {
    id: "pdp",
    label: "Product page",
    x: 925,
    y: 500,
    satellites: [
      ["evidence", "5/7"],
      ["policy", "82%"],
      ["trust", "60%"],
      ["content", "89%"],
    ],
    metrics: [
      ["Questions answered", "5 / 7", 71],
      ["Policy clarity", "82%", 82],
      ["Trust coverage", "60%", 60],
    ],
  },
  {
    id: "behavior",
    label: "What they do next",
    x: 1225,
    y: 500,
    satellites: [
      ["engagement", "18%"],
      ["friction", "7.2%"],
      ["searches", "426"],
      ["replay", "128"],
    ],
    metrics: [
      ["Interaction rate", "18%", 58],
      ["Friction sessions", "7.2%", 28],
      ["Searches observed", "426", 76],
    ],
  },
  {
    id: "checkout",
    label: "Checkout",
    x: 1490,
    y: 385,
    satellites: [
      ["complete", "72%"],
      ["payment", "97%"],
      ["drop-off", "28%"],
      ["errors", "1.4%"],
    ],
    metrics: [
      ["Completion", "72%", 72],
      ["Payment success", "97%", 97],
      ["Drop-off", "28%", 28],
    ],
  },
  {
    id: "revenue",
    label: "Purchase",
    x: 1630,
    y: 210,
    satellites: [
      ["orders", "184"],
      ["CVR", "3.6%"],
      ["AOV", "€84"],
      ["impact", "+8.4%"],
    ],
    metrics: [
      ["Orders", "184", 74],
      ["Conversion rate", "3.6%", 60],
      ["Observed impact", "+8.4%", 68],
    ],
  },
  {
    id: "marketplaces",
    label: "Marketplaces",
    x: 1720,
    y: 260,
    satellites: [
      ["Amazon", "74"],
      ["eBay", "58"],
      ["Otto", "62"],
      ["Galaxus", "69"],
    ],
    metrics: [
      ["Amazon visibility", "74 / 100", 74],
      ["eBay visibility", "58 / 100", 58],
      ["Buy Box coverage", "72%", 72],
    ],
  },
] as const;

type HubId = (typeof HUBS)[number]["id"];
type GraphLayoutName = "mobile" | "tablet" | "desktop" | "wide" | "ultrawide";
type GraphLayout = {
  width: number;
  height: number;
  capabilityLimit: number;
  capabilityRadius: number;
  satelliteRadius: number;
  positions: Record<HubId, Point>;
};
type ForegroundLabelSide = "left" | "right";
// offsetY is a leash-limited nudge away from the label's own dot -- not an
// absolute stacked position. Zero unless another label actually overlaps it.
type ForegroundLabelPlacement = {
  side: ForegroundLabelSide;
  offsetY: number;
};
type ForegroundLabelItem = {
  key: string;
  side: ForegroundLabelSide;
  desiredY: number;
  height: number;
};

const FOREGROUND_TYPE: Record<
  GraphLayoutName,
  { capability: number; hub: number; satellite: number; value: number }
> = {
  mobile: { capability: 8, hub: 8, satellite: 8, value: 7 },
  tablet: { capability: 13.5, hub: 14, satellite: 14, value: 12 },
  desktop: { capability: 14.5, hub: 15, satellite: 15, value: 13 },
  wide: { capability: 13, hub: 13.5, satellite: 13.5, value: 11.5 },
  ultrawide: { capability: 11.5, hub: 12, satellite: 12, value: 10.5 },
};

const GRAPH_LAYOUTS: Record<GraphLayoutName, GraphLayout> = {
  mobile: {
    width: 720,
    height: 1180,
    capabilityLimit: 2,
    capabilityRadius: 0.82,
    satelliteRadius: 0.9,
    positions: {
      ai: { x: 86, y: 150 },
      search: { x: 300, y: 92 },
      catalog: { x: 150, y: 330 },
      brand: { x: 520, y: 230 },
      truth: { x: 350, y: 430 },
      creative: { x: 612, y: 390 },
      campaigns: { x: 630, y: 590 },
      onsite: { x: 128, y: 610 },
      recs: { x: 330, y: 735 },
      pdp: { x: 92, y: 850 },
      behavior: { x: 520, y: 835 },
      checkout: { x: 380, y: 1035 },
      revenue: { x: 632, y: 1040 },
      marketplaces: { x: 220, y: 500 },
    },
  },
  tablet: {
    width: 1160,
    height: 900,
    capabilityLimit: 4,
    capabilityRadius: 1.02,
    satelliteRadius: 1.08,
    positions: {
      ai: { x: 92, y: 165 },
      search: { x: 280, y: 92 },
      catalog: { x: 330, y: 300 },
      brand: { x: 510, y: 120 },
      truth: { x: 585, y: 350 },
      creative: { x: 760, y: 105 },
      campaigns: { x: 1000, y: 180 },
      onsite: { x: 820, y: 345 },
      recs: { x: 1035, y: 405 },
      pdp: { x: 650, y: 675 },
      behavior: { x: 900, y: 685 },
      checkout: { x: 1070, y: 590 },
      revenue: { x: 1080, y: 275 },
      marketplaces: { x: 430, y: 480 },
    },
  },
  desktop: {
    width: 1800,
    height: 760,
    capabilityLimit: 99,
    capabilityRadius: 1.18,
    satelliteRadius: 1.22,
    positions: {
      ai: { x: 150, y: 92 },
      search: { x: 390, y: 64 },
      catalog: { x: 660, y: 145 },
      brand: { x: 870, y: 72 },
      truth: { x: 310, y: 360 },
      creative: { x: 1110, y: 68 },
      campaigns: { x: 1390, y: 88 },
      onsite: { x: 220, y: 565 },
      recs: { x: 1377, y: 360 },
      pdp: { x: 520, y: 675 },
      behavior: { x: 1280, y: 675 },
      checkout: { x: 1580, y: 580 },
      revenue: { x: 1640, y: 126 },
      marketplaces: { x: 130, y: 400 },
    },
  },
  wide: {
    width: 2200,
    height: 780,
    capabilityLimit: 99,
    capabilityRadius: 1.28,
    satelliteRadius: 1.34,
    positions: {
      ai: { x: 135, y: 92 },
      search: { x: 420, y: 62 },
      catalog: { x: 760, y: 145 },
      brand: { x: 1020, y: 68 },
      truth: { x: 330, y: 370 },
      creative: { x: 1330, y: 64 },
      campaigns: { x: 1690, y: 84 },
      onsite: { x: 210, y: 590 },
      recs: { x: 1693, y: 370 },
      pdp: { x: 600, y: 690 },
      behavior: { x: 1590, y: 700 },
      checkout: { x: 1940, y: 610 },
      revenue: { x: 2070, y: 128 },
      marketplaces: { x: 110, y: 420 },
    },
  },
  ultrawide: {
    width: 2800,
    height: 820,
    capabilityLimit: 99,
    capabilityRadius: 1.38,
    satelliteRadius: 1.44,
    positions: {
      ai: { x: 125, y: 98 },
      search: { x: 500, y: 66 },
      catalog: { x: 940, y: 150 },
      brand: { x: 1260, y: 74 },
      truth: { x: 380, y: 390 },
      creative: { x: 1650, y: 68 },
      campaigns: { x: 2150, y: 88 },
      onsite: { x: 240, y: 625 },
      recs: { x: 2161, y: 395 },
      pdp: { x: 760, y: 730 },
      behavior: { x: 2020, y: 742 },
      checkout: { x: 2460, y: 650 },
      revenue: { x: 2660, y: 132 },
      marketplaces: { x: 100, y: 430 },
    },
  },
};

function resolveGraphLayout(width: number, height: number): GraphLayoutName {
  const aspect = width / Math.max(1, height);
  if (width < 640) return "mobile";
  if (width < 1024) return "tablet";
  if (width >= 2200 || aspect >= 2.7) return "ultrawide";
  if (width >= 1600 || aspect >= 2.15) return "wide";
  return "desktop";
}

const CAPABILITIES: Readonly<Record<string, readonly Capability[]>> = {
  ai: [
    [
      "Did they name you?",
      "Observed",
      "Check how products and the brand appear across AI shopping surfaces.",
    ],
    [
      "What changed?",
      "Check again",
      "Ask the same shopper questions again and show what changed.",
    ],
    [
      "Questions you appear for",
      "68%",
      "Measure whether products are present for the shopper questions that matter.",
    ],
    [
      "Who was chosen instead?",
      "Observed",
      "Observe products that appear instead of or alongside the merchant catalog.",
    ],
    [
      "What sources support it?",
      "54%",
      "Track the sources that support how the product is described.",
    ],
  ],
  search: [
    [
      "Queries finding you",
      "Observed",
      "Connect search results to the products shoppers are trying to find.",
    ],
    [
      "Machine-readable facts",
      "83%",
      "Structured product information available to search and shopping systems.",
    ],
    [
      "Can the page be found?",
      "100%",
      "Whether important product pages can be found and indexed.",
    ],
    [
      "Does the wording match?",
      "74%",
      "How well product facts match real shopper searches.",
    ],
    [
      "What search can show",
      "66%",
      "Visible and structured product data that can support richer search results.",
    ],
  ],
  catalog: [
    [
      "Products available",
      "Catalog",
      "The products and variants shoppers can actually choose.",
    ],
    [
      "Variants shoppers can choose",
      "Catalog",
      "Variant-level product facts available when shoppers choose.",
    ],
    [
      "Facts worth adding",
      "Gap",
      "Product facts that may make choosing easier.",
    ],
    [
      "Approved product changes",
      "Approved",
      "Merchant-approved product changes prepared for the storefront.",
    ],
    [
      "Variant choices",
      "88%",
      "Coverage of variant-level product truth across the catalog.",
    ],
    [
      "Availability matches",
      "94%",
      "Agreement between catalog availability and visible storefront state.",
    ],
  ],
  brand: [
    [
      "Who you are",
      "Info",
      "Brand information available when shoppers compare you with alternatives.",
    ],
    [
      "Current brand info",
      "Fresh",
      "Keep the brand information shoppers see up to date.",
    ],
    [
      "Claims shoppers can trust",
      "86%",
      "Claims with enough proof to reuse safely.",
    ],
    [
      "Policies and proof",
      "71%",
      "Policies, proof, and trust information attached to the brand.",
    ],
    [
      "Same story everywhere",
      "94%",
      "Consistency between approved brand context and what shoppers encounter.",
    ],
  ],
  truth: [
    [
      "Price & availability",
      "96%",
      "Canonical price, availability and offer-state agreement.",
    ],
    [
      "Price matches",
      "100%",
      "Price consistency across catalog, schema and the visible product page.",
    ],
    [
      "Delivery answer",
      "80%",
      "Shipping information available in the data and on the page.",
    ],
    [
      "Review proof",
      "60%",
      "Whether reviews are visible where shoppers decide.",
    ],
    [
      "Facts match the page",
      "89%",
      "Whether structured product data matches what shoppers see on the page.",
    ],
    [
      "Check again after change",
      "Check again",
      "Check the same product information after an approved change.",
    ],
  ],
  creative: [
    [
      "What shoppers see first",
      "Content",
      "The images and content shoppers see before they compare in detail.",
    ],
    [
      "Product imagery",
      "Available",
      "Images that help shoppers understand the product and use case.",
    ],
    [
      "Product video",
      "Available",
      "Video that can answer questions static product facts cannot.",
    ],
    [
      "Is the proof clear?",
      "Review",
      "Check whether the images or video support the product claim.",
    ],
    [
      "Available product proof",
      "Content",
      "Reusable assets tied to the product and brand context.",
    ],
    [
      "Use-case content",
      "Content",
      "Content that helps shoppers understand whether the product fits their need.",
    ],
  ],
  campaigns: [
    [
      "Can the ad land well?",
      "Readiness",
      "Check whether the product, tracking, and landing experience support the promise in the ad.",
    ],
    [
      "Offer and message",
      "Message",
      "The promise a shopper sees before arriving at the product or store.",
    ],
    [
      "Approved campaign change",
      "Approved",
      "A merchant-approved campaign change tied to the reason behind it.",
    ],
    [
      "Does the landing answer?",
      "Check",
      "Check whether the landing page answers the question the ad created.",
    ],
    [
      "Creative variants",
      "Options",
      "Alternative messages and creative for the same product and shopper need.",
    ],
    [
      "What earns the click",
      "Observed",
      "See which product message gets shopper attention.",
    ],
    [
      "Who clicked and bought?",
      "Observed",
      "Connect campaign response with the downstream buying path.",
    ],
    [
      "What the traffic cost",
      "Measured",
      "Keep paid traffic cost separate from the purchases that follow.",
    ],
  ],
  onsite: [
    [
      "What shoppers searched",
      "Observed",
      "The words shoppers use when they are trying to find the right product.",
    ],
    [
      "Which products appeared",
      "64% top 3",
      "Where relevant products appear in onsite search results.",
    ],
    [
      "Where search failed",
      "3.8%",
      "Shopping searches that return no useful product result.",
    ],
    [
      "What they did next",
      "Observed",
      "Shopper behavior after a search result is shown.",
    ],
    [
      "What shapes the ranking",
      "Rules",
      "Rules and product data that influence which options a shopper sees.",
    ],
  ],
  recs: [
    [
      "What was recommended",
      "Observed",
      "The products the storefront places in front of the shopper.",
    ],
    [
      "Why these products?",
      "Rules",
      "The merchandising rules and product data that shape recommendations.",
    ],
    [
      "Fit to shopper need",
      "73%",
      "How well the product matches what the shopper appears to want.",
    ],
    [
      "Eligible products",
      "84%",
      "How much of the relevant catalog can participate in recommendations.",
    ],
    [
      "Did recommendations help?",
      "Measured",
      "Compare recommendation exposure with what shoppers did afterward.",
    ],
  ],
  pdp: [
    [
      "Questions answered",
      "Page",
      "Product-page information available for the questions shoppers ask before choosing.",
    ],
    [
      "What is missing?",
      "Observed",
      "Find gaps in the product page without pretending every gap caused the choice.",
    ],
    [
      "Check after the change",
      "Check again",
      "Check the same product-page information after an approved change.",
    ],
    [
      "Facts match the page",
      "89%",
      "Agreement between visible page content and structured product facts.",
    ],
    [
      "Size & fit",
      "Info",
      "Fit guidance and size recommendations that help shoppers choose the right variant.",
    ],
    [
      "Reviews & trust",
      "60%",
      "Reviews and trust information visible when shoppers decide.",
    ],
    [
      "Returns & delivery",
      "82%",
      "Policy and delivery information visible before the shopper commits.",
    ],
  ],
  behavior: [
    [
      "What shoppers did",
      "Observed",
      "Navigation, engagement, commerce, and friction events around the buying path.",
    ],
    [
      "Where they hesitated",
      "Observed",
      "Shopper behavior that may point to uncertainty or friction.",
    ],
    [
      "What they searched",
      "Observed",
      "Search behavior connected to what the shopper did afterward.",
    ],
    [
      "What they opened",
      "Observed",
      "Which products, pages, and information the shopper actually viewed.",
    ],
    [
      "Where they left",
      "Observed",
      "The point in the journey where a shopper stopped moving forward.",
    ],
    [
      "Session replay",
      "Replay",
      "Replay to understand shopper friction without pretending it proves the cause.",
    ],
    [
      "Interaction patterns",
      "Heatmap",
      "See which parts of a page shoppers use or ignore across many sessions.",
    ],
  ],
  checkout: [
    [
      "Where checkout stopped",
      "28%",
      "Observed shopper loss during the purchase path.",
    ],
    [
      "Payment success",
      "97%",
      "Observed payment completion across tracked checkout sessions.",
    ],
    [
      "Delivery friction",
      "Observed",
      "Delivery cost and timing that can change a shopper's final choice.",
    ],
    [
      "Technical errors",
      "Observed",
      "Runtime errors that may interfere with purchase completion.",
    ],
    [
      "Did the fix hold?",
      "Check again",
      "Check the same checkout data after an approved change.",
    ],
  ],
  revenue: [
    [
      "Was there a purchase?",
      "Orders",
      "Booked orders and revenue used as proof of purchase.",
    ],
    [
      "What changed after?",
      "Check again",
      "Before-and-after measurement tied to a completed change.",
    ],
    [
      "Observed vs attributed",
      "Separate",
      "Keep directly observed and attributed revenue separate.",
    ],
    [
      "Conversion path",
      "Funnel",
      "Where shoppers move forward or stop across the buying journey.",
    ],
    [
      "Which shoppers changed?",
      "Cohort",
      "See how results differ across shopper groups.",
    ],
    [
      "Does revenue reconcile?",
      "Check",
      "Check that tracked revenue matches the store's revenue data.",
    ],
  ],
  marketplaces: [
    [
      "Who wins the Buy Box?",
      "72%",
      "Share of tracked listings currently winning the buy box against competing sellers.",
    ],
    [
      "Can shoppers compare it?",
      "88%",
      "Required marketplace fields and imagery present across tracked SKUs.",
    ],
    [
      "Does the price match?",
      "91%",
      "Tracked listings priced in line with the merchant's own storefront.",
    ],
    [
      "Where does it rank?",
      "Top 20",
      "Median tracked position within its marketplace category page.",
    ],
    [
      "Is there enough proof?",
      "64%",
      "Tracked products with enough reviews to help shoppers choose.",
    ],
  ],
};

const LINKS = [
  ["ai", "search"],
  ["ai", "catalog"],
  ["search", "catalog"],
  ["search", "brand"],
  ["catalog", "brand"],
  ["catalog", "truth"],
  ["brand", "truth"],
  ["brand", "creative"],
  ["truth", "creative"],
  ["truth", "onsite"],
  ["truth", "pdp"],
  ["creative", "campaigns"],
  ["campaigns", "revenue"],
  ["onsite", "recs"],
  ["onsite", "behavior"],
  ["recs", "behavior"],
  ["recs", "checkout"],
  ["pdp", "behavior"],
  ["pdp", "checkout"],
  ["behavior", "checkout"],
  ["checkout", "revenue"],
  ["search", "behavior"],
  ["catalog", "campaigns"],
  ["brand", "campaigns"],
  ["creative", "pdp"],
  ["revenue", "recs"],
  ["catalog", "marketplaces"],
  ["brand", "marketplaces"],
  ["marketplaces", "revenue"],
] as const;

const WEAK_LINKS = [
  ["ai", "brand"],
  ["search", "campaigns"],
  ["catalog", "recs"],
  ["creative", "behavior"],
  ["truth", "revenue"],
  ["pdp", "revenue"],
  ["campaigns", "marketplaces"],
] as const;

type JourneyDefinition = {
  id: string;
  nodes: readonly HubId[];
  supportByNode?: Partial<Record<HubId, readonly HubId[]>>;
};

const JOURNEYS: readonly JourneyDefinition[] = [
  {
    id: "ai-discovery",
    nodes: ["ai", "pdp", "checkout", "revenue"],
    supportByNode: {
      ai: ["catalog", "truth", "behavior"],
      pdp: ["catalog", "truth", "behavior"],
      checkout: ["behavior"],
      revenue: ["behavior"],
    },
  },
  {
    id: "search-discovery",
    nodes: ["search", "pdp", "checkout", "revenue"],
    supportByNode: {
      search: ["catalog", "truth", "behavior"],
      pdp: ["catalog", "truth", "behavior"],
      checkout: ["behavior"],
      revenue: ["behavior"],
    },
  },
  {
    id: "onsite-discovery",
    nodes: ["onsite", "recs", "pdp", "checkout", "revenue"],
    supportByNode: {
      onsite: ["catalog", "behavior"],
      recs: ["catalog", "behavior"],
      pdp: ["catalog", "behavior"],
      checkout: ["behavior"],
      revenue: ["behavior"],
    },
  },
  {
    id: "campaign-discovery",
    nodes: ["campaigns", "pdp", "checkout", "revenue"],
    supportByNode: {
      campaigns: ["brand", "creative", "behavior"],
      pdp: ["creative", "behavior"],
      checkout: ["behavior"],
      revenue: ["behavior"],
    },
  },
  {
    id: "marketplace-discovery",
    nodes: ["marketplaces", "pdp", "checkout", "revenue"],
    supportByNode: {
      marketplaces: ["catalog", "brand", "behavior"],
      pdp: ["catalog", "behavior"],
      checkout: ["behavior"],
      revenue: ["behavior"],
    },
  },
];

const INITIAL_AUTO_HUB_ID: HubId | null = JOURNEYS[0]?.nodes[0] ?? null;
// A hub is either a stop the journeys actually travel to, or evidence that
// only ever backs one up (see supportByNode above) -- never both. Derived,
// not hand-tagged, so it can't drift from the journeys as they change.
const JOURNEY_HUB_IDS = new Set<HubId>(
  JOURNEYS.flatMap((journey) => journey.nodes),
);
function isEvidenceHub(id: HubId) {
  return !JOURNEY_HUB_IDS.has(id);
}
function curve(a: Hub, b: Hub, bend = 0) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const length = Math.max(1, Math.hypot(dx, dy));
  const nx = -dy / length;
  const ny = dx / length;
  const control = 18 + Math.min(34, length * 0.045) + bend;
  return `M ${a.x} ${a.y} Q ${mx + nx * control} ${my + ny * control} ${b.x} ${b.y}`;
}

function journeySegmentCommand(a: Hub, b: Hub, offset: number) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  return `Q ${mx} ${my + offset} ${b.x} ${b.y}`;
}

function journeySegmentPath(a: Hub, b: Hub, offset: number) {
  return `M ${a.x} ${a.y} ${journeySegmentCommand(a, b, offset)}`;
}

function journeyPath(
  ids: readonly string[],
  offset: number,
  hubById: Record<string, Hub>,
) {
  return ids.reduce((path, id, index) => {
    const hub = hubById[id];
    if (index === 0) return `M ${hub.x} ${hub.y}`;
    const previous = hubById[ids[index - 1]];
    return `${path} ${journeySegmentCommand(previous, hub, offset)}`;
  }, "");
}

function stableSvgCoordinate(value: number) {
  return Math.round(value * 1_000_000) / 1_000_000;
}

function satellitePoint(
  hub: Hub,
  index: number,
  radiusScale: number,
  canvasWidth: number,
  canvasHeight: number,
) {
  const outwardAngle = Math.atan2(
    hub.y - canvasHeight / 2,
    hub.x - canvasWidth / 2,
  );
  const angle = outwardAngle + (index - 1.5) * 0.78;
  const radius = (78 + (index % 2) * 34) * radiusScale;
  return {
    x: stableSvgCoordinate(hub.x + Math.cos(angle) * radius),
    y: stableSvgCoordinate(hub.y + Math.sin(angle) * radius),
  };
}

type HeroExclusion = {
  left: number;
  right: number;
  top: number;
  bottom: number;
};

function heroExclusionRect(
  layoutName: GraphLayoutName,
  canvasWidth: number,
  canvasHeight: number,
): HeroExclusion | null {
  if (
    layoutName !== "desktop" &&
    layoutName !== "wide" &&
    layoutName !== "ultrawide"
  ) {
    return null;
  }
  return {
    left: canvasWidth * 0.28,
    right: canvasWidth * 0.72,
    top: canvasHeight * 0.18,
    bottom: canvasHeight * 0.76,
  };
}

// Foreground nodes fan out from their hub, nothing else.
function foregroundPoint(hub: Point, point: Point) {
  return {
    x: hub.x + (point.x - hub.x) * FOREGROUND_SPREAD,
    y: hub.y + (point.y - hub.y) * FOREGROUND_SPREAD,
  };
}

function squaredDistance(a: Point, b: Point) {
  return (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
}

// Leashed rectangle separation: each label starts pinned to its own dot
// (offset 0). Overlapping pairs push apart by half their overlap each pass;
// a spring pulls every label back toward its own dot every pass. Labels with
// nothing overlapping them settle back to ~0 -- only genuinely crowded ones
// end up displaced, and only by as much as their neighbors force.
function relaxForegroundLabels(
  items: readonly ForegroundLabelItem[],
  gap: number,
) {
  if (!items.length) return new Map<string, ForegroundLabelPlacement>();
  const offsets = items.map(() => 0);
  const ITERATIONS = 24;
  const SPRING = 0.15;
  // No hard min/max clamp: unlike the old whole-canvas stack, displacement
  // here is already leash-bounded by the spring (push settles once it
  // balances the 15%-per-iteration pull-back), so a hub near the canvas
  // edge can't get clamped into colliding with itself the way a global
  // bound would.
  for (let iter = 0; iter < ITERATIONS; iter += 1) {
    for (let i = 0; i < items.length; i += 1) {
      for (let j = i + 1; j < items.length; j += 1) {
        const yi = items[i].desiredY + offsets[i];
        const yj = items[j].desiredY + offsets[j];
        const minGap = (items[i].height + items[j].height) / 2 + gap;
        const dy = yj - yi;
        const overlap = minGap - Math.abs(dy);
        if (overlap > 0) {
          const dir = dy >= 0 ? 1 : -1;
          const shift = (overlap / 2) * dir;
          offsets[i] -= shift;
          offsets[j] += shift;
        }
      }
    }
    for (let i = 0; i < items.length; i += 1) {
      offsets[i] *= 1 - SPRING;
    }
  }

  return new Map(
    items.map((item, index) => [
      item.key,
      {
        side: item.side,
        offsetY: offsets[index],
      } satisfies ForegroundLabelPlacement,
    ]),
  );
}

function proximityProgress(distance: number, radius: number) {
  const linear = Math.max(0, Math.min(1, 1 - distance / Math.max(1, radius)));
  return linear * linear * (3 - 2 * linear);
}

export default function HeroSurfaceShift() {
  const svgRef = useRef<SVGSVGElement>(null);
  const lensRef = useRef<SVGCircleElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const focusFrameRef = useRef<number | null>(null);
  const autoTravelFrameRef = useRef<number | null>(null);
  const autoResumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoIdleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const foregroundExitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const pointerForegroundFrameRef = useRef<number | null>(null);
  const pointerForegroundTargetRef = useRef(INITIAL_AUTO_HUB_ID ? 1 : 0);
  const cardExitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const foregroundSvgRef = useRef<SVGSVGElement>(null);
  const foregroundProgressRef = useRef(INITIAL_AUTO_HUB_ID ? 1 : 0);
  const renderedForegroundHubRef = useRef<string | null>(INITIAL_AUTO_HUB_ID);
  const pointerApproachHubRef = useRef<string | null>(null);
  const pointerProximityRef = useRef(0);
  const autoJourneyPathRef = useRef<SVGPathElement>(null);
  const autoSignalRef = useRef<HTMLDivElement>(null);
  const autoSignalAnimationRef = useRef<Animation | null>(null);
  const autoVisualFrameTimeRef = useRef(0);
  const autoVisualRef = useRef<{ full: string | null; soft: string | null }>({
    full: INITIAL_AUTO_HUB_ID,
    soft: INITIAL_AUTO_HUB_ID,
  });
  const autoContextHubRef = useRef<HubId | null>(INITIAL_AUTO_HUB_ID);
  const pendingFocusRef = useRef<Point | null>(null);
  const smoothedFocusRef = useRef<Point | null>(null);
  const activeHubRef = useRef<string | null>(null);
  const activeTargetRef = useRef<string | null>(null);
  const [layoutName, setLayoutName] = useState<GraphLayoutName>("desktop");
  const [shortViewport, setShortViewport] = useState(false);
  const [activeHubId, setActiveHubId] = useState<string | null>(null);
  const [activeCapability, setActiveCapability] = useState<{
    hubId: string;
    index: number;
  } | null>(null);
  const [activeSatellite, setActiveSatellite] = useState<number | null>(null);
  const [cardState, setCardState] = useState<CardState>(null);
  const [autoJourneyIndex, setAutoJourneyIndex] = useState(0);
  const [autoPhase, setAutoPhase] = useState<
    "waiting" | "traveling" | "ending"
  >("waiting");
  const [autoFocusHubId, setAutoFocusHubId] = useState<string | null>(
    INITIAL_AUTO_HUB_ID,
  );
  const [autoApproachHubId, setAutoApproachHubId] = useState<string | null>(
    INITIAL_AUTO_HUB_ID,
  );
  const [autoContextHubId, setAutoContextHubId] = useState<HubId | null>(
    INITIAL_AUTO_HUB_ID,
  );
  // Autoplay is an introduction, not a loop: it runs each journey once and
  // then rests, and the first hover/tap ends it for good. The hero shares the
  // viewport with the headline and the scan form, so motion that never stops
  // competes with the two things that convert.
  const [autoInteractionPaused, setAutoInteractionPaused] = useState(false);
  const [autoJourneyDone, setAutoJourneyDone] = useState(false);
  const [pointerApproachHubId, setPointerApproachHubId] = useState<
    string | null
  >(null);
  const [renderedForegroundHubId, setRenderedForegroundHubId] = useState<
    string | null
  >(INITIAL_AUTO_HUB_ID);
  // Gate the auto-journey's start on cursor idle, not just a mount timer:
  // devices without a fine pointer (touch) skip the gate outright, and a
  // moving mouse keeps re-arming the timer until it actually stops.
  const [autoIdleElapsed, setAutoIdleElapsed] = useState(false);
  useEffect(() => {
    if (autoIdleElapsed) return;

    const canTrackMouse =
      typeof window.matchMedia !== "function" ||
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (!canTrackMouse) {
      setAutoIdleElapsed(true);
      return;
    }

    const armIdleTimer = () => {
      if (autoIdleTimerRef.current) clearTimeout(autoIdleTimerRef.current);
      autoIdleTimerRef.current = setTimeout(() => {
        setAutoIdleElapsed(true);
      }, AUTO_JOURNEY_IDLE_DELAY_MS);
    };

    armIdleTimer();
    window.addEventListener("mousemove", armIdleTimer, { passive: true });

    return () => {
      window.removeEventListener("mousemove", armIdleTimer);
      if (autoIdleTimerRef.current) {
        clearTimeout(autoIdleTimerRef.current);
        autoIdleTimerRef.current = null;
      }
    };
  }, [autoIdleElapsed]);
  useEffect(() => {
    let frame = 0;
    const updateLayout = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        setLayoutName(resolveGraphLayout(width, height));
        setShortViewport(width >= 900 && height < 720);
      });
    };
    updateLayout();
    window.addEventListener("resize", updateLayout, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", updateLayout);
    };
  }, []);

  const graphLayout = GRAPH_LAYOUTS[layoutName];
  const autoJourney = JOURNEYS[autoJourneyIndex];
  const autoJourneyVisible =
    !activeHubId &&
    !cardState &&
    !autoInteractionPaused &&
    !autoJourneyDone &&
    autoIdleElapsed;
  const focusRadius =
    layoutName === "ultrawide"
      ? 430
      : layoutName === "wide"
        ? 350
        : layoutName === "desktop"
          ? 280
          : layoutName === "tablet"
            ? 220
            : 180;
  const nodeScale =
    layoutName === "ultrawide"
      ? 3
      : layoutName === "wide"
        ? 2.8
        : layoutName === "desktop"
          ? 2.2
          : layoutName === "tablet"
            ? 2.35
            : 2.6;
  const verticalScale = shortViewport ? 0.82 : 1;
  const graphHeight = Math.round(graphLayout.height * verticalScale);
  const heroExclusion = useMemo(
    () => heroExclusionRect(layoutName, graphLayout.width, graphHeight),
    [graphHeight, graphLayout.width, layoutName],
  );
  const layoutHubs = useMemo<Hub[]>(
    () =>
      HUBS.map((hub) => {
        const position = graphLayout.positions[hub.id];
        const centre = graphLayout.width / 2;
        return {
          ...hub,
          x: centre + (position.x - centre) * 0.9,
          y: position.y * verticalScale,
        };
      }),
    [graphLayout, verticalScale],
  );
  const hubById = useMemo(
    () =>
      Object.fromEntries(layoutHubs.map((hub) => [hub.id, hub])) as Record<
        string,
        Hub
      >,
    [layoutHubs],
  );

  const capabilityNodes = useMemo<CapabilityNode[]>(() => {
    return layoutHubs.flatMap((hub, hubIndex) => {
      const capabilities = (CAPABILITIES[hub.id] ?? []).slice(
        0,
        graphLayout.capabilityLimit,
      );
      return capabilities.map((capability, index) => {
        const denominator = Math.max(1, capabilities.length - 1);
        const angle =
          -2.55 + (index / denominator) * 5.1 + ((hubIndex % 3) - 1) * 0.12;
        const radius =
          (48 + ((index * 23 + hubIndex * 11) % 78)) *
          graphLayout.capabilityRadius;
        let x = stableSvgCoordinate(hub.x + Math.cos(angle) * radius);
        let y = stableSvgCoordinate(hub.y + Math.sin(angle) * radius);

        if (
          heroExclusion &&
          x > heroExclusion.left &&
          x < heroExclusion.right &&
          y > heroExclusion.top &&
          y < heroExclusion.bottom
        ) {
          const margin = 22 + (index % 3) * 8;
          if (hub.y <= heroExclusion.top) {
            y = heroExclusion.top - margin;
          } else if (hub.y >= heroExclusion.bottom) {
            y = heroExclusion.bottom + margin;
          } else if (hub.x < graphLayout.width / 2) {
            x = heroExclusion.left - margin;
          } else {
            x = heroExclusion.right + margin;
          }
        }
        return { hubId: hub.id, index, x, y, capability };
      });
    });
  }, [graphHeight, graphLayout, heroExclusion, layoutHubs, layoutName]);
  const setAutoSignalPosition = useCallback((point: Point) => {
    const marker = autoSignalRef.current;
    const root = rootRef.current;
    const matrix = svgRef.current?.getScreenCTM();
    if (!marker || !root || !matrix) return;

    const bounds = root.getBoundingClientRect();
    const screenPoint = new DOMPoint(point.x, point.y).matrixTransform(matrix);
    const x = screenPoint.x - bounds.left;
    const y = screenPoint.y - bounds.top;

    marker.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    marker.style.opacity = "1";
  }, []);
  const setForegroundProgress = useCallback((value: number) => {
    const clamped = Math.max(0, Math.min(1, value));
    foregroundProgressRef.current = clamped;
    // Both layers read the same progress: the focus layer fades in on it, the
    // ambient graph steps down by it, so the two always cross-fade.
    foregroundSvgRef.current?.style.setProperty(
      "--kg-expand",
      clamped.toFixed(3),
    );
    svgRef.current?.style.setProperty("--kg-expand", clamped.toFixed(3));
  }, []);

  const easePointerForegroundProgress = useCallback(
    (value: number) => {
      const target = Math.max(0, Math.min(1, value));
      pointerForegroundTargetRef.current = target;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        if (pointerForegroundFrameRef.current !== null) {
          cancelAnimationFrame(pointerForegroundFrameRef.current);
          pointerForegroundFrameRef.current = null;
        }
        setForegroundProgress(target);
        return;
      }

      if (pointerForegroundFrameRef.current !== null) return;
      let previousTime = performance.now();

      const animate = (now: number) => {
        const current = foregroundProgressRef.current;
        const nextTarget = pointerForegroundTargetRef.current;
        const delta = nextTarget - current;
        const elapsed = Math.min(48, Math.max(1, now - previousTime));
        previousTime = now;
        const timeConstant = delta >= 0 ? 190 : 360;
        const blend = 1 - Math.exp(-elapsed / timeConstant);
        const next = current + delta * blend;

        if (Math.abs(delta) <= 0.004) {
          setForegroundProgress(nextTarget);
          pointerForegroundFrameRef.current = null;
          return;
        }

        setForegroundProgress(next);
        pointerForegroundFrameRef.current = requestAnimationFrame(animate);
      };

      pointerForegroundFrameRef.current = requestAnimationFrame(animate);
    },
    [setForegroundProgress],
  );

  const setSupportProgress = useCallback((value: number) => {
    const clamped = Math.max(0, Math.min(1, value));
    svgRef.current?.style.setProperty("--kg-support", clamped.toFixed(3));
  }, []);

  const holdAutoJourney = useCallback(() => {
    if (autoResumeTimerRef.current) {
      clearTimeout(autoResumeTimerRef.current);
      autoResumeTimerRef.current = null;
    }
    // Deliberately one-way: once a visitor takes the graph over, it stays
    // where they left it instead of restarting under their cursor.
    setAutoInteractionPaused(true);
  }, []);

  useEffect(
    () => () => {
      if (autoResumeTimerRef.current) {
        clearTimeout(autoResumeTimerRef.current);
        autoResumeTimerRef.current = null;
      }
      if (pointerForegroundFrameRef.current !== null) {
        cancelAnimationFrame(pointerForegroundFrameRef.current);
        pointerForegroundFrameRef.current = null;
      }
      if (cardExitTimerRef.current) {
        clearTimeout(cardExitTimerRef.current);
        cardExitTimerRef.current = null;
      }
    },
    [],
  );

  useEffect(() => {
    if (!autoJourneyVisible) {
      if (autoTravelFrameRef.current !== null) {
        cancelAnimationFrame(autoTravelFrameRef.current);
        autoTravelFrameRef.current = null;
      }
      autoVisualRef.current = { full: null, soft: null };
      autoContextHubRef.current = null;
      setAutoFocusHubId(null);
      setAutoApproachHubId(null);
      setAutoContextHubId(null);
      setForegroundProgress(0);
      setSupportProgress(0);
      if (autoPhase !== "waiting") setAutoPhase("waiting");
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (autoPhase === "traveling") return;

    if (autoPhase === "ending") {
      const endingTimer = window.setTimeout(() => {
        const nextIndex = autoJourneyIndex + 1;
        if (nextIndex >= JOURNEYS.length) {
          setAutoJourneyDone(true);
        } else {
          setAutoJourneyIndex(nextIndex);
        }
        autoVisualRef.current = { full: null, soft: null };
        autoContextHubRef.current = null;
        setAutoFocusHubId(null);
        setAutoApproachHubId(null);
        setAutoContextHubId(null);
        setForegroundProgress(0);
        setSupportProgress(0);
        setAutoPhase("waiting");
      }, 2200);
      return () => window.clearTimeout(endingTimer);
    }

    const firstHubId = autoJourney.nodes[0];
    if (autoVisualRef.current.full !== firstHubId) {
      autoVisualRef.current = { full: firstHubId, soft: firstHubId };
      autoContextHubRef.current = firstHubId;
      setAutoFocusHubId(firstHubId);
      setAutoApproachHubId(firstHubId);
      setAutoContextHubId(firstHubId);
      setForegroundProgress(1);
      setSupportProgress(1);
    }

    const departureTimer = window.setTimeout(() => {
      setAutoPhase("traveling");
    }, 1800);
    return () => window.clearTimeout(departureTimer);
  }, [
    autoJourney,
    autoJourneyIndex,
    autoJourneyVisible,
    autoPhase,
    setForegroundProgress,
    setSupportProgress,
  ]);

  useEffect(() => {
    if (!autoJourneyVisible || autoPhase === "traveling") return;

    const hubId =
      autoPhase === "ending"
        ? autoJourney.nodes[autoJourney.nodes.length - 1]
        : autoJourney.nodes[0];
    autoSignalAnimationRef.current?.cancel();
    autoSignalAnimationRef.current = null;
    setAutoSignalPosition(hubById[hubId]);
  }, [
    autoJourney,
    autoJourneyVisible,
    autoPhase,
    hubById,
    setAutoSignalPosition,
  ]);

  useEffect(() => {
    if (!autoJourneyVisible || autoPhase !== "traveling") return;

    const marker = autoSignalRef.current;
    const root = rootRef.current;
    const matrix = svgRef.current?.getScreenCTM();
    if (!marker || !root || !matrix) return;

    const activationRadius = Math.max(150, focusRadius * 0.64);
    const journeyOffset =
      (autoJourneyIndex % 2 === 0 ? -22 : 22) * verticalScale;
    const segmentDuration = 5400;
    const arrivalHoldDuration = 1100;
    const bounds = root.getBoundingClientRect();
    let cancelled = false;
    let arrivalTimer: number | null = null;
    let arrivalHoldResolve: (() => void) | null = null;
    let activeSegmentResolve: (() => void) | null = null;

    const activateNode = (hubId: HubId, full: boolean) => {
      autoContextHubRef.current = hubId;
      autoVisualRef.current = {
        full: full ? hubId : null,
        soft: hubId,
      };
      setAutoContextHubId(hubId);
      setAutoFocusHubId(full ? hubId : null);
      setAutoApproachHubId(hubId);
      if (full) {
        setForegroundProgress(1);
        setSupportProgress(1);
      }
    };

    const holdAtNode = () =>
      new Promise<void>((resolve) => {
        arrivalHoldResolve = resolve;
        arrivalTimer = window.setTimeout(() => {
          arrivalTimer = null;
          arrivalHoldResolve = null;
          resolve();
        }, arrivalHoldDuration);
      });

    const animateSegment = (fromId: HubId, toId: HubId) =>
      new Promise<void>((resolve) => {
        activeSegmentResolve = resolve;
        const from = hubById[fromId];
        const to = hubById[toId];
        const segmentPath = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path",
        );
        segmentPath.setAttribute(
          "d",
          journeySegmentPath(from, to, journeyOffset),
        );
        const length = segmentPath.getTotalLength();
        const sampleCount = Math.min(120, Math.max(36, Math.ceil(length / 5)));
        const keyframes: Keyframe[] = [];

        for (let index = 0; index < sampleCount; index += 1) {
          const offset = index / (sampleCount - 1);
          const point = segmentPath.getPointAtLength(length * offset);
          const screenPoint = new DOMPoint(point.x, point.y).matrixTransform(
            matrix,
          );
          keyframes.push({
            offset,
            transform: `translate3d(${screenPoint.x - bounds.left}px, ${screenPoint.y - bounds.top}px, 0)`,
          });
        }

        activateNode(fromId, true);
        autoSignalAnimationRef.current?.cancel();
        const markerAnimation = marker.animate(keyframes, {
          duration: segmentDuration,
          easing: "linear",
          fill: "forwards",
        });
        autoSignalAnimationRef.current = markerAnimation;
        autoVisualFrameTimeRef.current = 0;
        marker.style.opacity = "1";
        const startedAt = performance.now();

        const finishSegment = () => {
          if (activeSegmentResolve !== resolve) return;
          activeSegmentResolve = null;
          autoTravelFrameRef.current = null;
          markerAnimation.finish();
          markerAnimation.commitStyles?.();
          markerAnimation.cancel();
          if (autoSignalAnimationRef.current === markerAnimation) {
            autoSignalAnimationRef.current = null;
          }
          setAutoSignalPosition(to);
          activateNode(toId, true);
          resolve();
        };

        const updateVisuals = (now: number) => {
          if (cancelled) return;
          const animationTime = markerAnimation.currentTime;
          const elapsed =
            typeof animationTime === "number"
              ? animationTime
              : Math.max(0, now - startedAt);
          const progress = Math.min(1, elapsed / segmentDuration);

          if (now - autoVisualFrameTimeRef.current >= 34 || progress >= 1) {
            autoVisualFrameTimeRef.current = now;
            const point = segmentPath.getPointAtLength(length * progress);
            const fromDistance = Math.sqrt(squaredDistance(point, from));
            const toDistance = Math.sqrt(squaredDistance(point, to));
            const departureProgress = proximityProgress(
              fromDistance,
              activationRadius,
            );
            const arrivalProgress = proximityProgress(
              toDistance,
              activationRadius,
            );
            const useDestination = arrivalProgress > departureProgress;
            const visualHubId = useDestination ? toId : fromId;
            const nodeProgress = useDestination
              ? arrivalProgress
              : departureProgress;
            const supportDistance = useDestination ? toDistance : fromDistance;
            const supportProgress =
              0.32 +
              proximityProgress(supportDistance, activationRadius * 1.4) * 0.68;

            activateNode(visualHubId, false);
            setForegroundProgress(nodeProgress);
            setSupportProgress(supportProgress);
          }

          if (progress >= 1) {
            finishSegment();
            return;
          }

          autoTravelFrameRef.current = requestAnimationFrame(updateVisuals);
        };

        autoTravelFrameRef.current = requestAnimationFrame(updateVisuals);
      });

    const runJourney = async () => {
      const nodes = autoJourney.nodes;
      if (nodes.length === 0) {
        if (!cancelled) setAutoPhase("ending");
        return;
      }
      if (nodes.length === 1) {
        setAutoSignalPosition(hubById[nodes[0]]);
        activateNode(nodes[0], true);
        if (!cancelled) setAutoPhase("ending");
        return;
      }

      for (let index = 0; index < nodes.length - 1; index += 1) {
        if (cancelled) return;
        await animateSegment(nodes[index], nodes[index + 1]);
        if (cancelled) return;

        if (index < nodes.length - 2) {
          await holdAtNode();
          if (cancelled) return;
        }
      }

      if (!cancelled) setAutoPhase("ending");
    };

    void runJourney();

    return () => {
      cancelled = true;
      if (autoTravelFrameRef.current !== null) {
        cancelAnimationFrame(autoTravelFrameRef.current);
        autoTravelFrameRef.current = null;
      }
      if (arrivalTimer !== null) {
        window.clearTimeout(arrivalTimer);
        arrivalTimer = null;
      }
      arrivalHoldResolve?.();
      arrivalHoldResolve = null;
      activeSegmentResolve?.();
      activeSegmentResolve = null;
      autoSignalAnimationRef.current?.cancel();
      autoSignalAnimationRef.current = null;
    };
  }, [
    autoJourney,
    autoJourneyIndex,
    autoJourneyVisible,
    autoPhase,
    focusRadius,
    hubById,
    setAutoSignalPosition,
    setForegroundProgress,
    setSupportProgress,
    verticalScale,
  ]);
  const cancelClose = useCallback(() => {
    if (!closeTimerRef.current) return;
    clearTimeout(closeTimerRef.current);
    closeTimerRef.current = null;
  }, []);

  const cancelCardExit = useCallback(() => {
    if (!cardExitTimerRef.current) return;
    clearTimeout(cardExitTimerRef.current);
    cardExitTimerRef.current = null;
  }, []);

  const clearSelection = useCallback(() => {
    cancelClose();
    cancelCardExit();
    activeHubRef.current = null;
    activeTargetRef.current = null;
    setActiveHubId(null);
    setActiveCapability(null);
    setActiveSatellite(null);
    cardExitTimerRef.current = setTimeout(() => {
      setCardState(null);
      cardExitTimerRef.current = null;
    }, 240);
    if (!autoContextHubRef.current) {
      easePointerForegroundProgress(pointerProximityRef.current);
    }
  }, [cancelCardExit, cancelClose, easePointerForegroundProgress]);

  const scheduleClose = useCallback(() => {
    if (closeTimerRef.current) return;
    // Short enough that letting go of a node starts the cross-fade straight
    // away, long enough to survive skimming between a hub and its own nodes.
    closeTimerRef.current = setTimeout(clearSelection, 160);
  }, [clearSelection]);

  const selectHub = useCallback(
    (hubId: string) => {
      cancelClose();
      const targetKey = `hub:${hubId}`;
      if (activeTargetRef.current === targetKey) return;
      activeHubRef.current = hubId;
      activeTargetRef.current = targetKey;
      setActiveHubId(hubId);
      setActiveCapability(null);
      setActiveSatellite(null);
      setCardState({ kind: "hub", hubId });
      easePointerForegroundProgress(1);
    },
    [cancelClose, easePointerForegroundProgress],
  );

  const selectCapability = useCallback(
    (node: CapabilityNode) => {
      cancelClose();
      const targetKey = `cap:${node.hubId}:${node.index}`;
      if (activeTargetRef.current === targetKey) return;
      activeHubRef.current = node.hubId;
      activeTargetRef.current = targetKey;
      setActiveHubId(node.hubId);
      setActiveCapability({ hubId: node.hubId, index: node.index });
      setActiveSatellite(null);
      setCardState({
        kind: "capability",
        hubId: node.hubId,
        index: node.index,
      });
      easePointerForegroundProgress(1);
    },
    [cancelClose, easePointerForegroundProgress],
  );

  const clearFocus = useCallback(() => {
    if (focusFrameRef.current !== null) {
      cancelAnimationFrame(focusFrameRef.current);
      focusFrameRef.current = null;
    }
    pendingFocusRef.current = null;
    smoothedFocusRef.current = null;
    const svg = svgRef.current;
    svg?.classList.remove("hero-kg-context");
    lensRef.current?.classList.remove("hero-kg-visible");
    svg
      ?.querySelectorAll<SVGElement>(
        ".hero-kg-capability, .hero-kg-capability-edge, .hero-kg-hub, .hero-kg-focus-edge",
      )
      .forEach((element) => {
        element.classList.remove("hero-kg-near");
        element.style.removeProperty("--kg-spot");
      });
    pointerApproachHubRef.current = null;
    pointerProximityRef.current = 0;
    setPointerApproachHubId(null);
    if (!activeHubRef.current && !autoContextHubRef.current) {
      easePointerForegroundProgress(0);
    }
  }, [easePointerForegroundProgress]);
  useEffect(() => {
    clearFocus();
    clearSelection();
  }, [clearFocus, clearSelection, layoutName, shortViewport]);

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<SVGSVGElement>) => {
      holdAutoJourney();
      const svg = svgRef.current;
      const matrix = svg?.getScreenCTM();
      if (!svg || !matrix) return;

      pendingFocusRef.current = new DOMPoint(
        event.clientX,
        event.clientY,
      ).matrixTransform(matrix.inverse());
      if (focusFrameRef.current !== null) return;

      focusFrameRef.current = requestAnimationFrame(() => {
        focusFrameRef.current = null;
        const point = pendingFocusRef.current;
        const currentSvg = svgRef.current;
        const currentMatrix = currentSvg?.getScreenCTM();
        if (!point || !currentSvg || !currentMatrix) return;

        const previousFocus = smoothedFocusRef.current;
        const smoothPoint = previousFocus
          ? {
              x: previousFocus.x + (point.x - previousFocus.x) * 0.42,
              y: previousFocus.y + (point.y - previousFocus.y) * 0.42,
            }
          : point;
        smoothedFocusRef.current = smoothPoint;

        const lens = lensRef.current;
        if (lens) {
          lens.setAttribute("cx", String(smoothPoint.x));
          lens.setAttribute("cy", String(smoothPoint.y));
          lens.classList.add("hero-kg-visible");
        }

        const scale = Math.max(
          0.01,
          Math.hypot(currentMatrix.a, currentMatrix.b),
        );

        let nearestPointerHubId: string | null = null;
        let nearestPointerHubDistance = Number.POSITIVE_INFINITY;

        currentSvg
          .querySelectorAll<SVGGElement>(".hero-kg-capability")
          .forEach((element) => {
            const x = Number(element.dataset.x);
            const y = Number(element.dataset.y);
            const distance = Math.sqrt(squaredDistance({ x, y }, smoothPoint));
            const spot = proximityProgress(distance, focusRadius);
            element.style.setProperty("--kg-spot", spot.toFixed(3));
            element.classList.toggle("hero-kg-near", spot > 0.025);
          });

        currentSvg
          .querySelectorAll<SVGLineElement>(".hero-kg-capability-edge")
          .forEach((element) => {
            const x = Number(element.dataset.x);
            const y = Number(element.dataset.y);
            const hub = element.dataset.hub
              ? hubById[element.dataset.hub]
              : null;
            const endpointDistance = Math.sqrt(
              squaredDistance({ x, y }, smoothPoint),
            );
            const endpointSpot = proximityProgress(
              endpointDistance,
              focusRadius,
            );
            const hubSpot = hub
              ? proximityProgress(
                  Math.sqrt(squaredDistance(hub, smoothPoint)),
                  focusRadius * 0.86,
                )
              : 0;
            const spot = Math.max(endpointSpot * 0.72, hubSpot);
            element.style.setProperty("--kg-spot", spot.toFixed(3));
          });

        currentSvg
          .querySelectorAll<SVGGElement>(".hero-kg-hub")
          .forEach((element) => {
            const x = Number(element.dataset.x);
            const y = Number(element.dataset.y);
            const distance = Math.sqrt(squaredDistance({ x, y }, smoothPoint));
            const spot = proximityProgress(distance, focusRadius * 0.86);
            element.style.setProperty("--kg-spot", spot.toFixed(3));
            element.classList.toggle("hero-kg-near", spot > 0.025);
            if (distance < nearestPointerHubDistance) {
              nearestPointerHubDistance = distance;
              nearestPointerHubId = element.dataset.hub ?? null;
            }
          });

        const pointerActivationRadius = focusRadius * 0.52;
        const pointerProgress = proximityProgress(
          nearestPointerHubDistance,
          pointerActivationRadius,
        );
        pointerProximityRef.current = pointerProgress;
        // Only dim the ambient web while the pointer is actually approaching a
        // hub. Adding this unconditionally left the graph blank whenever the
        // pointer sat in open space, until it left the hero entirely.
        currentSvg.classList.toggle("hero-kg-context", pointerProgress > 0.02);

        if (nearestPointerHubId && pointerProgress > 0.02) {
          if (pointerApproachHubRef.current !== nearestPointerHubId) {
            pointerApproachHubRef.current = nearestPointerHubId;
            setPointerApproachHubId(nearestPointerHubId);
          }
        }

        currentSvg
          .querySelectorAll<SVGPathElement>(".hero-kg-focus-edge")
          .forEach((element) => {
            const x = Number(element.dataset.midX);
            const y = Number(element.dataset.midY);
            const distance = Math.sqrt(squaredDistance({ x, y }, smoothPoint));
            const spot = proximityProgress(distance, focusRadius * 1.02);
            element.style.setProperty("--kg-spot", spot.toFixed(3));
            element.classList.toggle("hero-kg-near", spot > 0.025);
          });

        type HoverTarget =
          | {
              kind: "capability";
              key: string;
              distance: number;
              node: CapabilityNode;
              element: Element;
            }
          | {
              kind: "hub";
              key: string;
              distance: number;
              hubId: string;
              element: Element;
            }
          | {
              kind: "satellite";
              key: string;
              distance: number;
              hubId: string;
              index: number;
            };

        let nearest: HoverTarget | null = null;
        const consider = (candidate: HoverTarget) => {
          if (!nearest || candidate.distance < nearest.distance) {
            nearest = candidate;
          }
        };
        const currentTarget = activeTargetRef.current;
        if (currentTarget) {
          const [kind, hubId, indexValue] = currentTarget.split(":");
          let keepDistance = Number.POSITIVE_INFINITY;
          let keepRadius = 0;

          if (kind === "hub") {
            const hub = hubById[hubId];
            if (hub) {
              keepDistance = Math.sqrt(squaredDistance(hub, point)) * scale;
              keepRadius = 38;
            }
          } else if (kind === "cap") {
            const index = Number(indexValue);
            const node = capabilityNodes.find(
              (candidate) =>
                candidate.hubId === hubId && candidate.index === index,
            );
            if (node) {
              keepDistance = Math.sqrt(squaredDistance(node, point)) * scale;
              keepRadius = 34;
            }
          } else if (kind === "sat") {
            const hub = hubById[hubId];
            const index = Number(indexValue);
            if (hub?.satellites[index]) {
              const satellite = satellitePoint(
                hub,
                index,
                graphLayout.satelliteRadius,
                graphLayout.width,
                graphHeight,
              );
              keepDistance =
                Math.sqrt(squaredDistance(satellite, point)) * scale;
              keepRadius = 34;
            }
          }

          if (keepDistance <= keepRadius) {
            cancelClose();
            return;
          }
        }

        let withinInteractionNeighborhood = false;
        const interactionHubId =
          activeHubRef.current ?? pointerApproachHubRef.current;
        if (interactionHubId) {
          const hub = hubById[interactionHubId];
          let farthestChildDistance = 0;

          hub.satellites.forEach((_, index) => {
            const satellite = satellitePoint(
              hub,
              index,
              graphLayout.satelliteRadius,
              graphLayout.width,
              graphHeight,
            );
            farthestChildDistance = Math.max(
              farthestChildDistance,
              Math.sqrt(squaredDistance(satellite, hub)),
            );
            const distance =
              Math.sqrt(squaredDistance(satellite, point)) * scale;
            if (distance <= 30) {
              consider({
                kind: "satellite",
                key: `sat:${interactionHubId}:${index}`,
                distance,
                hubId: interactionHubId,
                index,
              });
            }
          });

          capabilityNodes
            .filter((node) => node.hubId === interactionHubId)
            .forEach((node) => {
              farthestChildDistance = Math.max(
                farthestChildDistance,
                Math.sqrt(squaredDistance(node, hub)),
              );
              const distance = Math.sqrt(squaredDistance(node, point)) * scale;
              if (distance > 32) return;
              const element = currentSvg.querySelector(
                `[data-capability="${node.hubId}:${node.index}"]`,
              );
              if (!element) return;
              consider({
                kind: "capability",
                key: `cap:${node.hubId}:${node.index}`,
                distance,
                node,
                element,
              });
            });

          const pointerDistance =
            Math.sqrt(squaredDistance(hub, point)) * scale;
          const neighborhoodRadius = farthestChildDistance * scale + 54;
          withinInteractionNeighborhood = pointerDistance <= neighborhoodRadius;
        }

        if (activeHubRef.current || withinInteractionNeighborhood) {
          easePointerForegroundProgress(1);
        } else {
          easePointerForegroundProgress(pointerProgress);
          if (pointerProgress <= 0.02 && pointerApproachHubRef.current) {
            pointerApproachHubRef.current = null;
            setPointerApproachHubId(null);
          }
        }

        layoutHubs.forEach((hub) => {
          const distance = Math.sqrt(squaredDistance(hub, point)) * scale;
          if (distance > 28) return;
          const element = currentSvg.querySelector(`[data-hub="${hub.id}"]`);
          if (!element) return;
          consider({
            kind: "hub",
            key: `hub:${hub.id}`,
            distance,
            hubId: hub.id,
            element,
          });
        });

        const target = nearest as HoverTarget | null;
        if (!target) {
          if (withinInteractionNeighborhood) {
            cancelClose();
            return;
          }
          if (activeTargetRef.current) {
            activeTargetRef.current = null;
            setActiveSatellite(null);
            scheduleClose();
          }
          return;
        }

        cancelClose();
        if (target.key === activeTargetRef.current) return;

        if (target.kind === "capability") {
          selectCapability(target.node);
          return;
        }

        if (target.kind === "hub") {
          selectHub(target.hubId);
          return;
        }

        activeTargetRef.current = target.key;
        pointerApproachHubRef.current = target.hubId;
        setPointerApproachHubId(target.hubId);
        setActiveCapability(null);
        setActiveSatellite(target.index);
        easePointerForegroundProgress(1);
      });
    },
    [
      capabilityNodes,
      cancelClose,
      focusRadius,
      graphHeight,
      graphLayout.satelliteRadius,
      graphLayout.width,
      holdAutoJourney,
      hubById,
      layoutHubs,
      scheduleClose,
      selectCapability,
      selectHub,
      easePointerForegroundProgress,
    ],
  );
  const activeHub = activeHubId ? hubById[activeHubId] : null;
  const autoHoverHub =
    autoJourneyVisible && autoFocusHubId ? hubById[autoFocusHubId] : null;
  const desiredForegroundHubId =
    activeHub?.id ??
    pointerApproachHubId ??
    autoHoverHub?.id ??
    (autoJourneyVisible ? autoApproachHubId : null) ??
    null;

  useEffect(() => {
    if (foregroundExitTimerRef.current) {
      clearTimeout(foregroundExitTimerRef.current);
      foregroundExitTimerRef.current = null;
    }

    if (desiredForegroundHubId) {
      const rendered = renderedForegroundHubRef.current;
      // The auto journey's own "traveling" effect already drives
      // foregroundProgressRef continuously (per rAF, from real hub-to-hub
      // proximity) as autoApproachHubId flips from the departed hub to the
      // approaching one. Running the retract-then-re-ease branch below at the
      // same time fights that loop for control of --kg-expand: this effect
      // would snap progress to 0 and ease it back up on a delay, while the
      // travel loop keeps writing its own proximity-based value in between --
      // the result is edges whose draw length pulses out of sync with (and momentarily belongs to) the wrong hub. Only pointer/hover-driven swaps need the retract treatment.
      const isAutoDriven =
        autoJourneyVisible && !activeHub && !pointerApproachHubId;
      const swapping =
        !isAutoDriven &&
        rendered !== null &&
        rendered !== desiredForegroundHubId &&
        foregroundProgressRef.current > 0.05 &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (swapping) {
        // Hovering a second hub used to swap the cluster underneath a progress
        // value that was already 1, so the new one appeared fully expanded with
        // no animation. Retract first, then draw the new cluster in, the same
        // way the auto journey arrives at a node.
        pointerForegroundTargetRef.current = 0;
        if (pointerForegroundFrameRef.current !== null) {
          cancelAnimationFrame(pointerForegroundFrameRef.current);
          pointerForegroundFrameRef.current = null;
        }
        setForegroundProgress(0);
        foregroundExitTimerRef.current = setTimeout(() => {
          renderedForegroundHubRef.current = desiredForegroundHubId;
          setRenderedForegroundHubId(desiredForegroundHubId);
          foregroundExitTimerRef.current = null;
          easePointerForegroundProgress(1);
        }, 140);
        return;
      }

      renderedForegroundHubRef.current = desiredForegroundHubId;
      setRenderedForegroundHubId(desiredForegroundHubId);
      return;
    }

    if (renderedForegroundHubRef.current) {
      easePointerForegroundProgress(0);
      foregroundExitTimerRef.current = setTimeout(() => {
        renderedForegroundHubRef.current = null;
        setRenderedForegroundHubId(null);
        foregroundExitTimerRef.current = null;
      }, 760);
    }

    return () => {
      if (foregroundExitTimerRef.current) {
        clearTimeout(foregroundExitTimerRef.current);
        foregroundExitTimerRef.current = null;
      }
    };
  }, [
    activeHub,
    autoJourneyVisible,
    desiredForegroundHubId,
    easePointerForegroundProgress,
    pointerApproachHubId,
    setForegroundProgress,
  ]);

  useEffect(() => {
    const expand = foregroundProgressRef.current.toFixed(3);
    foregroundSvgRef.current?.style.setProperty("--kg-expand", expand);
    svgRef.current?.style.setProperty("--kg-expand", expand);
  }, [renderedForegroundHubId]);

  const foregroundHub = renderedForegroundHubId
    ? hubById[renderedForegroundHubId]
    : null;
  // A node keeps its own color through focus/expand -- it doesn't repaint to
  // a universal "active" hue. See isEvidenceHub: journey stops stay
  // secondary blue, evidence-only hubs stay signal-ink orange, whichever one
  // is actually in focus right now.
  const foregroundIsEvidence = foregroundHub
    ? isEvidenceHub(foregroundHub.id)
    : false;
  const foregroundType = FOREGROUND_TYPE[layoutName];
  const foregroundLabelPlacements = useMemo(() => {
    const empty = new Map<string, ForegroundLabelPlacement>();
    if (!foregroundHub) return empty;

    const lanes: Record<ForegroundLabelSide, ForegroundLabelItem[]> = {
      left: [],
      right: [],
    };
    const pickSide = (x: number): ForegroundLabelSide => {
      if (x > graphLayout.width * 0.82) return "left";
      if (x < graphLayout.width * 0.18) return "right";
      return x >= foregroundHub.x ? "right" : "left";
    };

    capabilityNodes
      .filter((node) => node.hubId === foregroundHub.id)
      .forEach((node) => {
        const { x, y } = foregroundPoint(foregroundHub, node);
        const side = pickSide(x);
        lanes[side].push({
          key: `cap:${node.hubId}:${node.index}`,
          side,
          desiredY: y,
          height: foregroundType.capability * 1.25,
        });
      });

    foregroundHub.satellites.forEach((_, index) => {
      const point = foregroundPoint(
        foregroundHub,
        satellitePoint(
          foregroundHub,
          index,
          graphLayout.satelliteRadius,
          graphLayout.width,
          graphHeight,
        ),
      );
      const side = pickSide(point.x);
      lanes[side].push({
        key: `sat:${foregroundHub.id}:${index}`,
        side,
        desiredY: point.y,
        height: foregroundType.satellite + foregroundType.value + 5,
      });
    });

    const hubSide = pickSide(foregroundHub.x + 1);
    lanes[hubSide].push({
      key: `hub:${foregroundHub.id}`,
      side: hubSide,
      desiredY: foregroundHub.y,
      height: foregroundType.hub * 1.3,
    });

    const gap = Math.max(5, foregroundType.capability * 0.35);
    return new Map([
      ...relaxForegroundLabels(lanes.left, gap),
      ...relaxForegroundLabels(lanes.right, gap),
    ]);
  }, [
    capabilityNodes,
    foregroundHub,
    foregroundType,
    graphHeight,
    graphLayout.satelliteRadius,
    graphLayout.width,
  ]);
  const autoSupportHubIds: readonly HubId[] =
    autoJourneyVisible && autoContextHubId
      ? (autoJourney.supportByNode?.[autoContextHubId] ?? [])
      : [];
  const autoSupportAnchor =
    autoJourneyVisible && autoContextHubId ? hubById[autoContextHubId] : null;
  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 isolate z-0 overflow-hidden"
    >
      <svg
        ref={svgRef}
        data-layout={layoutName}
        data-short={shortViewport || undefined}
        viewBox={`0 0 ${graphLayout.width} ${graphHeight}`}
        preserveAspectRatio="xMidYMid meet"
        className={`pointer-events-none absolute inset-0 h-full w-full ${autoJourneyVisible ? "hero-kg-auto-running" : ""} ${renderedForegroundHubId ? "hero-kg-focused" : ""}`}
        onPointerMove={handlePointerMove}
        onPointerLeave={() => {
          holdAutoJourney();
          clearFocus();
          scheduleClose();
        }}
      >
        <rect
          className="pointer-events-auto"
          x="0"
          y="0"
          width={graphLayout.width}
          height={graphHeight}
          fill="transparent"
        />

        <g className="hero-kg-main-edges" fill="none">
          {LINKS.map(([aId, bId], index) => {
            const a = hubById[aId];
            const b = hubById[bId];
            const midpoint = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
            const connected = activeHubId === aId || activeHubId === bId;
            return (
              <path
                key={`${aId}-${bId}`}
                data-mid-x={midpoint.x}
                data-mid-y={midpoint.y}
                d={curve(a, b, ((index % 3) - 1) * 6)}
                className={`hero-kg-focus-edge ${connected ? "hero-kg-connected" : ""}`}
              />
            );
          })}
          {WEAK_LINKS.map(([aId, bId], index) => {
            const a = hubById[aId];
            const b = hubById[bId];
            const connected = activeHubId === aId || activeHubId === bId;
            return (
              <path
                key={`weak-${aId}-${bId}`}
                d={curve(a, b, ((index % 3) - 1) * 5)}
                className={`hero-kg-weak ${connected ? "hero-kg-connected" : ""}`}
              />
            );
          })}
        </g>

        <g className="hero-kg-journeys" fill="none">
          <path
            ref={autoJourneyPathRef}
            key={autoJourney.id}
            className={autoJourneyVisible ? "hero-kg-journey-active" : ""}
            d={journeyPath(
              autoJourney.nodes,
              (autoJourneyIndex % 2 === 0 ? -22 : 22) * verticalScale,
              hubById,
            )}
          />
        </g>

        {autoJourneyVisible && autoSupportAnchor ? (
          <g className="hero-kg-support-edges" fill="none">
            {autoSupportHubIds.map((supportId, index) => (
              <path
                key={`auto-support-${autoSupportAnchor.id}-${supportId}`}
                d={curve(
                  hubById[supportId],
                  autoSupportAnchor,
                  ((index % 3) - 1) * 5,
                )}
              />
            ))}
          </g>
        ) : null}

        <g className="hero-kg-capability-edges">
          {capabilityNodes.map((node) => {
            const hub = hubById[node.hubId];
            const shadowed = foregroundHub?.id === node.hubId;
            return (
              <line
                key={`${node.hubId}-${node.index}`}
                x1={hub.x}
                y1={hub.y}
                x2={node.x}
                y2={node.y}
                data-hub={node.hubId}
                data-x={node.x}
                data-y={node.y}
                className={`hero-kg-capability-edge ${activeHubId === node.hubId ? "hero-kg-parent-active" : ""} ${shadowed ? "hero-kg-base-shadowed" : ""}`}
              />
            );
          })}
        </g>

        <g className="hero-kg-capabilities">
          {capabilityNodes.map((node) => {
            const parentActive = activeHubId === node.hubId;
            const autoSoftParent =
              autoJourneyVisible && autoApproachHubId === node.hubId;
            const isActive =
              activeCapability?.hubId === node.hubId &&
              activeCapability.index === node.index;
            const labelOnLeft = node.x > graphLayout.width * 0.82;
            const shadowed = foregroundHub?.id === node.hubId;

            return (
              <g
                key={`${node.hubId}-${node.index}`}
                data-capability={`${node.hubId}:${node.index}`}
                data-x={node.x}
                data-y={node.y}
                transform={`translate(${node.x} ${node.y})`}
                className={`hero-kg-capability ${parentActive ? "hero-kg-parent-active" : ""} ${autoSoftParent ? "hero-kg-auto-soft-parent" : ""} ${isActive ? "hero-kg-active" : ""} ${shadowed ? "hero-kg-base-shadowed" : ""}`}
              >
                <circle
                  className="hero-kg-cap-dot"
                  r={(0.72 + (node.index % 3) * 0.14) * nodeScale}
                />
                <text
                  className="hero-kg-cap-label"
                  x={labelOnLeft ? -4.2 : 4.2}
                  y={-3.8}
                  textAnchor={labelOnLeft ? "end" : "start"}
                >
                  {node.capability[0]}
                </text>
              </g>
            );
          })}
        </g>

        <g className="hero-kg-hubs">
          {layoutHubs.map((hub) => {
            const selected = activeHubId === hub.id;
            const autoSoft = autoJourneyVisible && autoApproachHubId === hub.id;
            const autoRoute =
              autoJourneyVisible && autoJourney.nodes.includes(hub.id as HubId);
            const autoSupport =
              autoJourneyVisible && autoSupportHubIds.includes(hub.id as HubId);
            const evidenceType = isEvidenceHub(hub.id as HubId);
            // Muted is the resting state, not an auto-journey special case. A
            // hub earns full brightness only while it is the focused cluster,
            // the open card, or a node of the journey that is actually running.
            // Otherwise the graph popped bright in every gap -- before the first
            // journey, between journeys, and during the pause after the pointer
            // moves but before the cluster retracts.
            const live =
              selected ||
              renderedForegroundHubId === hub.id ||
              autoRoute ||
              autoSupport;
            const muted = !live;
            const shadowed = foregroundHub?.id === hub.id;
            const labelBelow = hub.y > graphHeight * 0.58;

            return (
              <g
                key={hub.id}
                data-hub={hub.id}
                data-x={hub.x}
                data-y={hub.y}
                transform={`translate(${hub.x} ${hub.y})`}
                className={`hero-kg-hub ${evidenceType ? "hero-kg-evidence-type" : ""} ${selected ? "hero-kg-selected" : ""} ${autoSoft ? "hero-kg-auto-soft" : ""} ${autoRoute ? "hero-kg-auto-route" : ""} ${autoSupport ? "hero-kg-auto-support" : ""} ${muted ? "hero-kg-auto-muted" : ""} ${shadowed ? "hero-kg-base-shadowed" : ""}`}
              >
                <circle
                  className="hero-kg-hub-ring"
                  r={(hub.id === "truth" ? 4.8 : 4.2) * nodeScale}
                />
                <circle
                  className="hero-kg-hub-core"
                  r={(hub.id === "truth" ? 1.9 : 1.65) * nodeScale}
                />
                <text
                  className="hero-kg-hub-label"
                  x="7.5"
                  y={labelBelow ? 12 : -6.5}
                >
                  {hub.label}
                </text>
              </g>
            );
          })}
        </g>

        <circle
          ref={lensRef}
          className="hero-kg-lens"
          cx="0"
          cy="0"
          r={focusRadius}
          fill="none"
        />
      </svg>

      <div
        className={`hero-kg-center-wash hero-kg-center-wash-${layoutName} absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}
      />

      {autoJourneyVisible ? (
        <div
          ref={autoSignalRef}
          className="hero-kg-auto-signal absolute left-0 top-0 z-20 grid place-items-center"
        >
          <User
            aria-hidden="true"
            className="hero-kg-auto-user-icon"
            size={17}
            strokeWidth={2}
          />
        </div>
      ) : null}

      {foregroundHub ? (
        <svg
          ref={foregroundSvgRef}
          aria-hidden="true"
          data-layout={layoutName}
          viewBox={`0 0 ${graphLayout.width} ${graphHeight}`}
          preserveAspectRatio="xMidYMid meet"
          style={
            {
              "--kg-expand": foregroundProgressRef.current,
            } as React.CSSProperties
          }
          className={`hero-kg-foreground pointer-events-none absolute inset-0 z-20 h-full w-full ${autoJourneyVisible ? "hero-kg-foreground-auto" : ""}`}
        >
          <g className="hero-kg-foreground-neighbor-edges" fill="none">
            {LINKS.filter(
              ([aId, bId]) =>
                aId === foregroundHub.id || bId === foregroundHub.id,
            ).map(([aId, bId], index) => {
              const neighborId = aId === foregroundHub.id ? bId : aId;
              return (
                <path
                  key={`foreground-neighbor-${aId}-${bId}`}
                  d={curve(
                    foregroundHub,
                    hubById[neighborId],
                    ((index % 3) - 1) * 6,
                  )}
                  pathLength={1}
                  className="hero-kg-foreground-neighbor-edge"
                />
              );
            })}
            {WEAK_LINKS.filter(
              ([aId, bId]) =>
                aId === foregroundHub.id || bId === foregroundHub.id,
            ).map(([aId, bId], index) => {
              const neighborId = aId === foregroundHub.id ? bId : aId;
              return (
                <path
                  key={`foreground-neighbor-weak-${aId}-${bId}`}
                  d={curve(
                    foregroundHub,
                    hubById[neighborId],
                    ((index % 3) - 1) * 5,
                  )}
                  className="hero-kg-foreground-neighbor-edge hero-kg-foreground-neighbor-edge-weak"
                />
              );
            })}
          </g>

          <g className="hero-kg-capability-edges">
            {capabilityNodes
              .filter((node) => node.hubId === foregroundHub.id)
              .map((node) => {
                const { x, y } = foregroundPoint(foregroundHub, node);
                return (
                  <line
                    key={`foreground-edge-${node.hubId}-${node.index}`}
                    x1={foregroundHub.x}
                    y1={foregroundHub.y}
                    x2={x}
                    y2={y}
                    pathLength={1}
                    className={`hero-kg-parent-active hero-kg-foreground-cap-edge ${foregroundIsEvidence ? "hero-kg-evidence-type" : ""}`}
                  />
                );
              })}
          </g>

          <g className="hero-kg-capabilities">
            {capabilityNodes
              .filter((node) => node.hubId === foregroundHub.id)
              .map((node) => {
                const isActive =
                  activeCapability?.hubId === node.hubId &&
                  activeCapability.index === node.index;
                const { x, y } = foregroundPoint(foregroundHub, node);
                const placement = foregroundLabelPlacements.get(
                  `cap:${node.hubId}:${node.index}`,
                );
                const labelOnLeft = placement?.side === "left";
                // Pinned to this capability's own dot; only nudged if it
                // actually overlaps a neighbor (see relaxForegroundLabels).
                const labelY = -4.4 + (placement?.offsetY ?? 0);
                return (
                  <g
                    key={`foreground-cap-${node.hubId}-${node.index}`}
                    transform={`translate(${x} ${y})`}
                    className={`hero-kg-capability hero-kg-parent-active hero-kg-foreground-capability ${foregroundIsEvidence ? "hero-kg-evidence-type" : ""} ${isActive ? "hero-kg-active" : ""}`}
                  >
                    <circle
                      className="hero-kg-cap-dot"
                      r={(1.75 + (node.index % 3) * 0.22) * nodeScale}
                    />
                    <text
                      className="hero-kg-cap-label"
                      x={labelOnLeft ? -7.5 : 7.5}
                      y={labelY}
                      textAnchor={labelOnLeft ? "end" : "start"}
                    >
                      {node.capability[0]}
                    </text>
                  </g>
                );
              })}
          </g>

          {(() => {
            const placement = foregroundLabelPlacements.get(
              `hub:${foregroundHub.id}`,
            );
            const labelOnLeft = placement?.side === "left";
            // Pinned to the hub's own position -- see the capability label
            // comment above.
            const labelY =
              (foregroundHub.y > graphHeight * 0.58 ? 12 : -6.5) +
              (placement?.offsetY ?? 0);
            return (
              <g
                transform={`translate(${foregroundHub.x} ${foregroundHub.y})`}
                className={`hero-kg-hub hero-kg-selected hero-kg-foreground-hub ${foregroundIsEvidence ? "hero-kg-evidence-type" : ""}`}
              >
                <circle
                  className="hero-kg-hub-ring"
                  r={(foregroundHub.id === "truth" ? 4.8 : 4.2) * nodeScale}
                />
                <circle
                  className="hero-kg-hub-core"
                  r={(foregroundHub.id === "truth" ? 1.9 : 1.65) * nodeScale}
                />
                <text
                  className="hero-kg-hub-label"
                  x={labelOnLeft ? -9 : 9}
                  y={labelY}
                  textAnchor={labelOnLeft ? "end" : "start"}
                >
                  {foregroundHub.label}
                </text>
              </g>
            );
          })()}

          <g className="hero-kg-expanded hero-kg-expanded-foreground">
            {foregroundHub.satellites.map(([label, value], index) => {
              const { x, y } = foregroundPoint(
                foregroundHub,
                satellitePoint(
                  foregroundHub,
                  index,
                  graphLayout.satelliteRadius,
                  graphLayout.width,
                  graphHeight,
                ),
              );
              const active = activeHub ? activeSatellite === index : false;
              const placement = foregroundLabelPlacements.get(
                `sat:${foregroundHub.id}:${index}`,
              );
              const labelOnLeft = placement?.side === "left";
              // Pinned to this satellite's own dot -- see the capability
              // label comment above.
              const labelY =
                -(foregroundType.value + 3) / 2 + (placement?.offsetY ?? 0);
              const valueY = labelY + foregroundType.value + 3;
              return (
                <g key={`foreground-sat-${foregroundHub.id}-${label}`}>
                  <line
                    x1={foregroundHub.x}
                    y1={foregroundHub.y}
                    x2={x}
                    y2={y}
                    pathLength={1}
                    className={`hero-kg-sat-edge ${foregroundIsEvidence ? "hero-kg-evidence-type" : ""}`}
                  />
                  <g
                    className={`hero-kg-sat-item ${foregroundIsEvidence ? "hero-kg-evidence-type" : ""} ${active ? "hero-kg-active" : ""}`}
                    transform={`translate(${x} ${y})`}
                  >
                    <circle className="hero-kg-sat-dot" r={2.9 * nodeScale} />
                    <text
                      className="hero-kg-sat-label"
                      x={labelOnLeft ? -6.5 * nodeScale : 6.5 * nodeScale}
                      y={labelY}
                      textAnchor={labelOnLeft ? "end" : "start"}
                    >
                      {label}
                    </text>
                    <text
                      className="hero-kg-sat-value"
                      x={labelOnLeft ? -6.5 * nodeScale : 6.5 * nodeScale}
                      y={valueY}
                      textAnchor={labelOnLeft ? "end" : "start"}
                    >
                      {value}
                    </text>
                  </g>
                </g>
              );
            })}
          </g>
        </svg>
      ) : null}

      <style>{`
        /* One opacity ladder for the whole graph, in one place.
           ambient  edge .05 / .09   node .34-.62   label .30-.46
           live     edge .16 / .26   node .60-.80   label .32
           focus    edge .12 / .30   node .55-.85   label .26-.38
           active                    node .75-.80   label .34-.40
           Labels stay well under the hero copy: nodes carry the emphasis, text
           never competes with the headline.
           Ambient sits behind the headline and never competes with it. Live is
           the auto-journey and hover state. Focus is the expanded cluster and
           always outranks ambient. The focus layer fades in once, on the layer
           itself, so no child ever double-fades. */
        .hero-kg-main-edges path {
          stroke: ${INK};
          stroke-width: 0.78;
          stroke-opacity: 0.09;
          vector-effect: non-scaling-stroke;
          transition: stroke-opacity ${STATE}, stroke-width ${STATE}, stroke ${COLOR};
        }
        .hero-kg-main-edges path.hero-kg-weak {
          stroke-dasharray: 2 10;
          stroke-opacity: 0.05;
        }
        .hero-kg-auto-running .hero-kg-main-edges path {
          stroke-opacity: 0.065;
        }
        .hero-kg-auto-running .hero-kg-main-edges path.hero-kg-weak {
          stroke-opacity: 0.035;
        }
        .hero-kg-main-edges path.hero-kg-near {
          stroke-opacity: 0.16;
        }
        .hero-kg-main-edges path.hero-kg-connected {
          stroke: ${ACCENT};
          stroke-opacity: 0.45;
          stroke-width: 0.82;
        }
        .hero-kg-context .hero-kg-main-edges path:not(.hero-kg-near):not(.hero-kg-connected) {
          stroke-opacity: 0.015;
        }
        .hero-kg-journeys path {
          stroke: ${ACCENT};
          stroke-width: 0.75;
          stroke-opacity: 0;
          stroke-linecap: round;
          vector-effect: non-scaling-stroke;
          transition: stroke-opacity ${LAYER};
        }
        .hero-kg-journeys path.hero-kg-journey-active {
          stroke-width: 1.35;
          stroke-opacity: 0.52;
          stroke-dasharray: none;
          filter: drop-shadow(0 0 3px rgba(46,93,166,.16));
        }
        .hero-kg-auto-signal {
          width: 18px;
          height: 18px;
          margin-left: -9px;
          margin-top: -9px;
          opacity: 0;
          pointer-events: none;
          will-change: transform;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          contain: layout paint style;
        }
        .hero-kg-auto-user-icon {
          flex: 0 0 auto;
          color: ${ACCENT};
        }
        .hero-kg-support-edges path {
          stroke: ${SECONDARY};
          stroke-width: 0.82;
          stroke-opacity: calc(.04 + var(--kg-support, 0) * .22);
          stroke-dasharray: 2 8;
          stroke-linecap: round;
          vector-effect: non-scaling-stroke;
          transition: stroke-opacity ${TRACK};
        }
        .hero-kg-capability-edges line {
          --kg-spot: 0;
          stroke: ${ACCENT};
          stroke-width: 0.62;
          stroke-opacity: calc(var(--kg-spot, 0) * .18);
          vector-effect: non-scaling-stroke;
          transition: stroke-opacity ${TRACK};
        }
        .hero-kg-capability-edges line.hero-kg-parent-active {
          stroke-opacity: 0.22;
        }
        .hero-kg-capability {
          --kg-spot: 0;
        }
        .hero-kg-cap-dot {
          fill: ${ACCENT};
          opacity: calc(var(--kg-spot, 0) * .34);
          transform: scale(calc(.72 + var(--kg-spot, 0) * .28));
          transform-box: fill-box;
          transform-origin: center;
          transition: opacity ${TRACK}, transform ${STATE}, fill ${COLOR};
        }
        .hero-kg-cap-label {
          fill: ${INK};
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 7.2px;
          font-weight: 620;
          letter-spacing: 0.02em;
          /* Ambient capability labels stay hidden. The focus layer spreads its
             nodes, so the same text sits at different coordinates in the two
             layers -- showing both during the cross-fade read as labels being
             printed twice and then replaced. Dots and edges carry the ambient
             layer; text belongs to the focus layer only. */
          opacity: 0;
          pointer-events: none;
          transition: opacity ${TRACK};
        }
        .hero-kg-capability.hero-kg-active .hero-kg-cap-dot {
          fill: ${ACCENT};
          opacity: 0.75;
          transform: scale(1.7);
        }

        .hero-kg-hub {
          --kg-spot: 0;
          transition: opacity ${STATE}, filter ${STATE};
        }
        .hero-kg-hub-ring {
          fill: ${PAPER};
          stroke: ${INK};
          stroke-width: 0.78;
          stroke-opacity: calc(.34 + var(--kg-spot, 0) * .16);
          transform: scale(calc(1 + var(--kg-spot, 0) * .055));
          transform-box: fill-box;
          transform-origin: center;
          vector-effect: non-scaling-stroke;
          transition: stroke ${COLOR}, stroke-opacity ${TRACK}, transform ${STATE};
        }
        .hero-kg-hub-core {
          fill: ${INK};
          opacity: calc(.4 + var(--kg-spot, 0) * .22);
          transform: scale(calc(1 + var(--kg-spot, 0) * .1));
          transform-box: fill-box;
          transform-origin: center;
          transition: opacity ${TRACK}, transform ${STATE}, fill ${COLOR};
        }
        .hero-kg-hub-label {
          fill: ${INK};
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 8px;
          font-weight: 600;
          letter-spacing: 0.04em;
          opacity: calc(.3 + var(--kg-spot, 0) * .16);
          transition: opacity ${TRACK};
        }
        /* Evidence hubs (never a journey stop themselves, only ever cited as
           support -- see JOURNEY_HUB_IDS) carry the secondary hue at rest, at
           the exact same opacity math as a plain hub. Pure hue swap, so the
           kg-spot brightening and muted/selected states behave identically;
           only the color says "this is evidence," never the intensity. */
        .hero-kg-hub.hero-kg-evidence-type .hero-kg-hub-ring {
          stroke: ${SECONDARY};
        }
        .hero-kg-hub.hero-kg-evidence-type .hero-kg-hub-core {
          fill: ${SECONDARY};
        }
        .hero-kg-hub.hero-kg-auto-muted {
          opacity: 0.48;
        }
        .hero-kg-hub.hero-kg-auto-muted .hero-kg-hub-ring {
          stroke-opacity: 0.3;
          transform: scale(.9);
        }
        .hero-kg-hub.hero-kg-auto-muted .hero-kg-hub-core {
          opacity: 0.4;
          transform: scale(.9);
        }
        .hero-kg-hub.hero-kg-auto-muted .hero-kg-hub-label {
          font-size: 7.4px;
          opacity: 0.24;
        }
        .hero-kg-hub.hero-kg-auto-support {
          opacity: calc(.5 + var(--kg-support, 0) * .4);
        }
        .hero-kg-hub.hero-kg-auto-support .hero-kg-hub-ring {
          stroke: ${SECONDARY};
          /* Capped below the focused hub's autoplay floor (.62 layer x .72
             ring = ~.45 effective) so the node actually in focus never reads
             weaker than what's merely supporting it. */
          stroke-opacity: calc(.3 + var(--kg-support, 0) * .1);
          transform: scale(calc(.94 + var(--kg-support, 0) * .1));
        }
        .hero-kg-hub.hero-kg-auto-support .hero-kg-hub-core {
          fill: ${SECONDARY};
          opacity: calc(.34 + var(--kg-support, 0) * .14);
          transform: scale(calc(.94 + var(--kg-support, 0) * .18));
        }
        .hero-kg-hub.hero-kg-auto-support .hero-kg-hub-label {
          opacity: calc(.26 + var(--kg-support, 0) * .26);
        }
        .hero-kg-hub.hero-kg-selected {
          filter: drop-shadow(0 4px 7px rgba(17,19,24,0.07));
        }
        .hero-kg-hub.hero-kg-selected .hero-kg-hub-ring {
          stroke: ${ACCENT};
          stroke-opacity: 0.72;
        }
        .hero-kg-hub.hero-kg-selected .hero-kg-hub-core {
          fill: ${ACCENT};
          opacity: 0.8;
        }
        /* A node keeps its own color through focus -- see foregroundIsEvidence. */
        .hero-kg-hub.hero-kg-selected.hero-kg-evidence-type .hero-kg-hub-ring {
          stroke: ${SECONDARY};
        }
        .hero-kg-hub.hero-kg-selected.hero-kg-evidence-type .hero-kg-hub-core {
          fill: ${SECONDARY};
        }
        .hero-kg-hub.hero-kg-selected .hero-kg-hub-label {
          opacity: 0.32;
        }
        .hero-kg-sat-dot {
          fill: ${ACCENT};
          transform-box: fill-box;
          transform-origin: center;
        }
        .hero-kg-sat-item.hero-kg-evidence-type .hero-kg-sat-dot {
          fill: ${SECONDARY};
        }
        .hero-kg-sat-label {
          fill: ${INK};
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 8.5px;
          font-weight: 650;
        }
        .hero-kg-sat-value {
          fill: ${ACCENT};
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 7.4px;
          font-weight: 750;
        }
        .hero-kg-sat-item.hero-kg-evidence-type .hero-kg-sat-value {
          fill: ${SECONDARY};
        }
        .hero-kg-lens {
          fill: none;
          stroke: ${INK};
          stroke-width: 0.5;
          stroke-opacity: 0;
          stroke-dasharray: 2 10;
          vector-effect: non-scaling-stroke;
          pointer-events: none;
          transition: stroke-opacity ${STATE};
        }
        .hero-kg-lens.hero-kg-visible {
          stroke-opacity: 0.05;
        }
        /* The grey twin of whatever the focus layer is showing. It rides the same
           progress in reverse, so the accent node loses exactly the percentage
           the grey one gains -- no hold, no gap on the way back. */
        .hero-kg-hub.hero-kg-base-shadowed,
        .hero-kg-capability.hero-kg-base-shadowed,
        .hero-kg-capability-edges line.hero-kg-base-shadowed {
          opacity: calc(1 - var(--kg-expand, 0));
          transition: opacity ${TRACK};
        }

        /* While a focus cluster is up the ambient graph steps down by the same
           progress the focus layer fades in on, so the focused hub is always the
           strongest node on screen and the two states cross-fade. */
        .hero-kg-focused {
          opacity: calc(1 - var(--kg-expand, 0) * .62);
          transition: opacity ${TRACK};
          will-change: opacity;
        }

        /* Focus layer: one fade for the whole layer, constant values underneath. */
        .hero-kg-foreground {
          --kg-expand: 0;
          opacity: clamp(0, calc(var(--kg-expand) * 1.35), .9);
          filter: none;
          transition: opacity ${TRACK};
          will-change: opacity;
        }
        /* The auto journey expands clusters unattended, behind the headline, so
           it sits a step quieter than a cluster a hover explicitly asked for.
           Hover keeps the full .9. */
        .hero-kg-foreground.hero-kg-foreground-auto {
          opacity: clamp(0, calc(var(--kg-expand) * 1.35), .62);
        }
        .hero-kg-foreground-neighbor-edge {
          stroke: ${INK};
          stroke-width: 0.9;
          stroke-opacity: 0.22;
          stroke-dasharray: 1;
          stroke-dashoffset: calc(1 - var(--kg-expand));
          stroke-linecap: round;
          /* No vector-effect: non-scaling-stroke here -- combined with the
             pathLength=1 draw-on dasharray it makes the dash length track a
             different coordinate space than the stroke geometry, so the line
             visibly falls short of its endpoint in proportion to how much the
             viewBox is scaled up (invisible on small screens, obvious at 4K /
             100% zoom). */
          transition: stroke-dashoffset ${TRACK};
        }
        .hero-kg-foreground-neighbor-edge-weak {
          stroke-width: 0.72;
          stroke-opacity: 0.12;
          stroke-dasharray: 2 8;
          stroke-dashoffset: 0;
        }
        /* Outranks .hero-kg-capability-edges line.hero-kg-parent-active, which
           would otherwise hand the focus layer the ambient opacity and kill the
           draw-on that the neighbour and satellite edges use. */
        .hero-kg-foreground .hero-kg-capability-edges line.hero-kg-foreground-cap-edge {
          stroke: ${ACCENT};
          stroke-width: 0.82;
          stroke-opacity: 0.3;
          stroke-dasharray: 1;
          stroke-dashoffset: calc(1 - var(--kg-expand));
          /* No non-scaling-stroke: see .hero-kg-foreground-neighbor-edge. */
          transition: stroke-dashoffset ${TRACK};
        }
        .hero-kg-foreground .hero-kg-capability-edges line.hero-kg-foreground-cap-edge.hero-kg-evidence-type {
          stroke: ${SECONDARY};
        }
        .hero-kg-foreground-capability .hero-kg-cap-dot {
          fill: ${ACCENT};
          opacity: 0.55;
          transform: scale(calc(.86 + var(--kg-expand) * .14));
          transition: opacity ${STATE}, transform ${STATE};
        }
        .hero-kg-foreground-capability .hero-kg-cap-label {
          font-size: 8.2px;
          opacity: 0.26;
          transition: opacity ${STATE};
        }
        .hero-kg-foreground-capability.hero-kg-active .hero-kg-cap-dot {
          opacity: 0.8;
          transform: scale(1.75);
        }
        .hero-kg-foreground-capability.hero-kg-evidence-type .hero-kg-cap-dot {
          fill: ${SECONDARY};
        }
        .hero-kg-foreground-capability.hero-kg-active .hero-kg-cap-label {
          opacity: 0.4;
        }
        .hero-kg-foreground-hub .hero-kg-hub-ring {
          stroke: ${ACCENT};
          stroke-opacity: 0.72;
          transform: scale(calc(.98 + var(--kg-expand) * .07));
          transition: transform ${TRACK};
        }
        .hero-kg-foreground-hub .hero-kg-hub-core {
          fill: ${ACCENT};
          opacity: 0.85;
          transform: scale(calc(.96 + var(--kg-expand) * .42));
          transition: transform ${TRACK};
        }
        .hero-kg-foreground-hub.hero-kg-evidence-type .hero-kg-hub-ring {
          stroke: ${SECONDARY};
        }
        .hero-kg-foreground-hub.hero-kg-evidence-type .hero-kg-hub-core {
          fill: ${SECONDARY};
        }
        .hero-kg-foreground-hub .hero-kg-hub-label {
          opacity: 0.32;
          font-size: 8.4px;
          transition: opacity ${STATE};
        }
        .hero-kg-foreground .hero-kg-expanded-foreground .hero-kg-sat-edge {
          stroke: ${ACCENT};
          stroke-width: 0.78;
          stroke-opacity: 0.3;
          stroke-dasharray: 1;
          stroke-dashoffset: calc(1 - var(--kg-expand));
          /* No non-scaling-stroke: see .hero-kg-foreground-neighbor-edge. */
          transition: stroke-dashoffset ${TRACK};
        }
        .hero-kg-foreground .hero-kg-expanded-foreground .hero-kg-sat-edge.hero-kg-evidence-type {
          stroke: ${SECONDARY};
        }
        .hero-kg-foreground .hero-kg-sat-dot {
          opacity: 0.55;
          transform: scale(calc(.86 + var(--kg-expand) * .14));
          transition: opacity ${STATE}, transform ${STATE};
        }
        .hero-kg-foreground .hero-kg-sat-label {
          opacity: 0.3;
          transition: opacity ${STATE};
        }
        .hero-kg-foreground .hero-kg-sat-value {
          opacity: 0.38;
          transition: opacity ${STATE};
        }
        .hero-kg-foreground .hero-kg-sat-item.hero-kg-active .hero-kg-sat-dot {
          opacity: 0.8;
          transform: scale(1.8);
        }
        .hero-kg-center-wash {
          width: min(820px, 54vw);
          height: 68%;
          background: radial-gradient(ellipse at center, rgba(250,250,250,0.965) 0%, rgba(250,250,250,0.72) 40%, rgba(250,250,250,0.26) 66%, rgba(250,250,250,0) 100%);
          transition: width ${LAYER}, height ${LAYER};
        }
        svg[data-layout="tablet"] .hero-kg-cap-label { font-size: 7.8px; }
        svg[data-layout="tablet"] .hero-kg-sat-label { font-size: 9.5px; }
        svg[data-layout="tablet"] .hero-kg-sat-value { font-size: 8.4px; }
        svg[data-layout="wide"] .hero-kg-hub-label { font-size: 10px; }
        svg[data-layout="wide"] .hero-kg-cap-label { font-size: 8.8px; }
        svg[data-layout="wide"] .hero-kg-sat-label { font-size: 10px; }
        svg[data-layout="wide"] .hero-kg-sat-value { font-size: 8.7px; }
        svg[data-layout="ultrawide"] .hero-kg-hub-label { font-size: 11.5px; }
        svg[data-layout="ultrawide"] .hero-kg-cap-label { font-size: 9.6px; }
        svg[data-layout="ultrawide"] .hero-kg-sat-label { font-size: 11px; }
        svg[data-layout="ultrawide"] .hero-kg-sat-value { font-size: 9.5px; }
        .hero-kg-center-wash-mobile { width: 88vw; height: 64%; }
        .hero-kg-center-wash-tablet { width: 78vw; height: 68%; }
        .hero-kg-center-wash-wide { width: min(980px, 50vw); height: 70%; }
        .hero-kg-center-wash-ultrawide { width: min(1040px, 42vw); height: 68%; }
        svg[data-layout="tablet"].hero-kg-foreground .hero-kg-cap-label { font-size: 13.5px; }
        svg[data-layout="tablet"].hero-kg-foreground .hero-kg-hub-label { font-size: 14px; }
        svg[data-layout="tablet"].hero-kg-foreground .hero-kg-sat-label { font-size: 14px; }
        svg[data-layout="tablet"].hero-kg-foreground .hero-kg-sat-value { font-size: 12px; }
        svg[data-layout="desktop"].hero-kg-foreground .hero-kg-cap-label { font-size: 14.5px; }
        svg[data-layout="desktop"].hero-kg-foreground .hero-kg-hub-label { font-size: 15px; }
        svg[data-layout="desktop"].hero-kg-foreground .hero-kg-sat-label { font-size: 15px; }
        svg[data-layout="desktop"].hero-kg-foreground .hero-kg-sat-value { font-size: 13px; }
        svg[data-layout="wide"].hero-kg-foreground .hero-kg-cap-label { font-size: 13px; }
        svg[data-layout="wide"].hero-kg-foreground .hero-kg-hub-label { font-size: 13.5px; }
        svg[data-layout="wide"].hero-kg-foreground .hero-kg-sat-label { font-size: 13.5px; }
        svg[data-layout="wide"].hero-kg-foreground .hero-kg-sat-value { font-size: 11.5px; }
        svg[data-layout="ultrawide"].hero-kg-foreground .hero-kg-cap-label { font-size: 11.5px; }
        svg[data-layout="ultrawide"].hero-kg-foreground .hero-kg-hub-label { font-size: 12px; }
        svg[data-layout="ultrawide"].hero-kg-foreground .hero-kg-sat-label { font-size: 12px; }
        svg[data-layout="ultrawide"].hero-kg-foreground .hero-kg-sat-value { font-size: 10.5px; }

        @media (max-width: 1100px) {
          .hero-kg-cap-label {
            font-size: 5.2px;
          }
          .hero-kg-hub-label {
            font-size: 7.2px;
            opacity: 0.4;
          }
        }
        @media (max-width: 767px) {
          .hero-kg-cap-label,
          .hero-kg-sat-label,
          .hero-kg-sat-value {
            display: none;
          }
          .hero-kg-hub-label {
            display: block;
            font-size: 8px;
            opacity: 0.42;
          }
          .hero-kg-main-edges path {
            stroke-opacity: 0.1;
          }
          .hero-kg-auto-running .hero-kg-main-edges path {
            stroke-opacity: 0.08;
          }
          .hero-kg-auto-running .hero-kg-main-edges path.hero-kg-weak {
            stroke-opacity: 0.04;
          }
          .hero-kg-hub.hero-kg-auto-muted {
            opacity: 0.56;
          }
          .hero-kg-hub.hero-kg-auto-muted .hero-kg-hub-label {
            opacity: 0.3;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-kg-journeys path,
          .hero-kg-sat-item,
          .hero-kg-foreground,
          .hero-kg-focused,
          .hero-kg-hub,
          .hero-kg-hub-ring,
          .hero-kg-hub-core,
          .hero-kg-hub-label,
          .hero-kg-capability,
          .hero-kg-cap-dot,
          .hero-kg-cap-label,
          .hero-kg-main-edges path {
            animation: none;
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}
