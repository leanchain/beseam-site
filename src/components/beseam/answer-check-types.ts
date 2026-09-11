export type StepState = "pending" | "active" | "done" | "failed" | "skipped";

export type Step = {
  key: string;
  label: string;
  state: StepState;
  detail: string | null;
  /** Countable progress within this step (e.g. product pages checked so far). */
  progress?: { done: number; total: number } | null;
};

export type Finding = {
  code: string;
  /** Technical check name. Secondary on the result: shown under "what we saw". */
  title: string;
  /** Technical detail or analyzer recommendation. Also secondary. */
  detail: string;
  product: string | null;
  severity?: "blocker" | "high" | "medium" | "low" | "info";
  domain?: string;
  /** The page this was read from. */
  url?: string;
  /** The catalog record the claim was compared against. */
  catalog_url?: string;
  /**
   * The named products behind a catalog-wide count, each with its public page
   * and what is missing on it. A number with no product attached leaves the
   * merchant to reconstruct it from the raw feed.
   */
  examples?: { title: string; url: string; note?: string }[];
  evidence?: string[];
  fix_complexity?: string;
  source?:
    | "catalog"
    | "catalog_sample"
    | "page_audit"
    | "homepage_audit"
    | "entity_page_audit"
    | "category_page_audit"
    | "content_page_audit"
    | "assistant_observation";
  page_type?: "HOMEPAGE" | "CATEGORY" | "PDP" | "CONTENT" | string;
  role?:
    "about" | "contact" | "collection" | "article" | "blog" | "page" | null;
  affected_pages?: number;
  affected_urls?: string[];
  template_key?: string | null;
  template_source?: "public_markup" | "structural" | string | null;
  /**
   * Merchant-facing copy attached by the backend (`finding_copy.py`). These are
   * the primary strings on the result: what a shopper or search engine may be
   * experiencing, why it matters commercially, and the one next action.
   * Optional because a cached payload from an older deploy may not carry them.
   */
  headline?: string;
  why?: string;
  next_step?: string;
  area?: string;
};

export type PageAudit = {
  url: string;
  title: string | null;
  ok: boolean;
  error: string | null;
  score: number | null;
  grade: string | null;
  report_id?: number | null;
  coverage: number;
  degraded: boolean;
  domain_scores: Record<string, number>;
  domain_counts?: Record<
    string,
    { evaluated: number; failed: number; unevaluated: number }
  >;
  checks_evaluated: number;
  checks_failed: number;
  checks_unevaluated: number;
  findings: Finding[];
  page_type?: "HOMEPAGE" | "CATEGORY" | "PDP" | "CONTENT" | string;
  role?:
    "about" | "contact" | "collection" | "article" | "blog" | "page" | null;
  template_key?: string | null;
  template_source?: "public_markup" | "structural" | string | null;
  template_confidence?: number | null;
};

export type PdpTemplateFamily = {
  key: string;
  label: string;
  source: "public_markup" | "structural" | string;
  pages_observed: number;
  audited_pages: number;
  confidence: number;
};

export type PdpTemplateSummary = {
  mode: "public_layout_sample" | string;
  candidate_pages_read: number;
  layouts_detected: number;
  layouts_audited: number;
  audited_pages: number;
  all_detected_layouts_covered: boolean;
  families: PdpTemplateFamily[];
  exhaustive: boolean;
};

export type ShownProduct = {
  title: string;
  merchant: string | null;
  price: string | null;
  image_url: string | null;
  url: string | null;
  ours: boolean;
  link_live?: boolean;
};

export type Answer = {
  question: string | null;
  channel_label: string | null;
  observation_method?:
    | "probe"
    | "live_serp"
    | "consumer_sample"
    | "grounded"
    | "derived"
    | "fallback"
    | null;
  mentioned: boolean | null;
  competitors: string[];
  products?: ShownProduct[];
  /**
   * The assistant's own human-readable line for this question, as extracted by
   * the monitoring parser (`ParsedObservation.qualitative_framing`). Not the
   * raw provider payload — that is a JSON blob and is never persisted.
   */
  framing?: string | null;
  /**
   * The queries the surface actually ran. A grounded model rewrites the
   * question before searching, so these are what Google received — not what
   * the shopper typed.
   */
  search_queries?: string[];
  error: string | null;
};

export type BrandEvidenceProduct = {
  title: string;
  url: string | null;
  price: string | null;
  currency: string | null;
  available: boolean | null;
  attributes: string[];
};

export type BrandEvidence = {
  market: string | null;
  sources: string[];
  products: BrandEvidenceProduct[];
  catalog_signals: Array<{
    title: string | null;
    detail: string | null;
    product: string | null;
  }>;
};

export type SiteInventory = {
  urls_discovered: number;
  urls_capped: boolean;
  /** Raw URL counts, including locale/market copies. */
  page_types: Record<string, number>;
  /** Merchant-facing entities with locale copies collapsed. */
  entity_page_types?: Record<string, number>;
  localized_url_copies?: number;
  hosts: Record<string, number>;
  robots: {
    status: "rules_found" | "open" | "unavailable" | "not_measured" | string;
    crawl_delay_seconds: number | null;
    blocked_urls: number | null;
  };
  sitemap: {
    status: "found" | "declared" | "not_found" | string;
    directives: string[];
    sources: string[];
    urls_from_sitemap: number;
    dated_urls: number;
    image_entries: number;
  };
  locales: string[];
  search_crawlers: {
    status: string;
    allowed: number;
    blocked: number;
    total: number;
    blocked_names: string[];
  };
  assistant_crawlers: {
    status: string;
    allowed: number;
    blocked: number;
    total: number;
    blocked_names: string[];
  };
  discovery_files?: Record<
    string,
    {
      present: boolean | null;
      status_code: number | null;
      content_type: string | null;
    }
  >;
  internal_reach?: {
    status: string;
    scope?: string;
    internal_links?: number;
    product_links?: number;
    collection_links?: number;
    content_links?: number;
    orphan_products?: string;
    reason?: string | null;
  };
};

export type CatalogInventory = {
  products_checked: number;
  products_capped: boolean;
  products_with_gaps: number;
  total_variants: number;
  multi_variant_products: number;
  unavailable_products: number;
  missing_product_types: number;
  placeholder_vendors: number;
  default_only_options: number;
  variant_option_gaps?: number;
  missing_descriptions: number;
  thin_descriptions: number;
  missing_images: number;
  missing_tags: number;
  missing_identifiers: number;
  variant_identifier_gaps: number;
  identifier_conflicts: number;
  identifier_conflict_products?: number;
  duplicate_description_products: number;
  collections_status?: string;
  collections_checked?: number;
  collections_capped?: boolean;
  collection_titles?: string[];
  product_type_count?: number;
  top_product_types?: Array<{ name: string; products: number }>;
  option_dimensions?: Array<{ name: string; products: number }>;
  describability: { strong: number; thin: number; very_thin: number };
  collection_membership?: { status: string; reason?: string | null };
};

export type AnswerCheckResult = {
  domain: string;
  status: string;
  retryable?: boolean;
  failure_reason?: string | null;
  brand: string | null;
  platform: string | null;
  reject_reason: string | null;
  steps: Step[];
  findings: Finding[];
  questions: string[];
  /** ISO 639-1 code the questions were written in — "en" for cached rows from
   *  before this field existed. Interpreted from the crawled site's own
   *  locale-prefixed URLs when it has any; the domain's ccTLD otherwise. */
  questions_language?: string | null;
  /** ISO 3166-1 alpha-2 code for the same market, same source and same
   *  fallback order as `questions_language`. */
  questions_country?: string | null;
  answers: Answer[];
  products_seen: number;
  brand_evidence?: BrandEvidence;
  page_audits?: PageAudit[];
  homepage_audit?:
    | PageAudit
    | { url: string; ok: false; error: string; page_type: "HOMEPAGE" };
  entity_page_audits?: Array<
    (PageAudit | { url: string; ok: false; error: string }) & {
      page_type: "CONTENT";
      role: "about" | "contact";
    }
  >;
  category_page_audits?: Array<
    (PageAudit | { url: string; ok: false; error: string }) & {
      page_type: "CATEGORY";
      role?: "collection" | null;
    }
  >;
  content_page_audits?: Array<
    (PageAudit | { url: string; ok: false; error: string }) & {
      page_type: "CONTENT";
      role?: "article" | "blog" | "page" | null;
    }
  >;
  site_description?: { title: string | null; description: string | null };
  site_kind?: "store" | "brand_site";
  page_audits_status?:
    "not_started" | "queued" | "running" | "complete" | "failed" | string;
  page_audits_total?: number;
  page_audit_plan?: { category: number; content: number };
  pdp_template_summary?: PdpTemplateSummary | null;
  site_inventory?: SiteInventory;
  catalog_inventory?: CatalogInventory;
};
