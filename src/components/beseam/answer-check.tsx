"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";

import { useRouter } from "next/navigation";

import {
  ArrowRight,
  Check,
  ChevronDown,
  Loader2,
  MailCheck,
  Printer,
  RefreshCw,
  Share2,
  X,
} from "lucide-react";

import type {
  Answer,
  AnswerCheckResult,
  Finding,
  ShownProduct,
  Step,
} from "@/components/beseam/answer-check-types";
import { BookReviewCta } from "@/components/beseam/book-review-cta";
import { ChannelIcon } from "@/components/beseam/channel-icon";
import { fixExampleFor } from "@/components/beseam/fix-examples";
import TrackedLink from "@/components/beseam/tracked-link";
import useAnalytics from "@/hooks/useAnalytics";
import { APP_REGISTER_URL, APP_REPORT_URL } from "@/lib/app-urls";

export type { AnswerCheckResult };

const POLL_MS = 6000;
const MAX_POLLS = 60; // ~6 minutes, then stop asking

const LIVE_STATUSES = new Set(["running", "queued", "validating"]);
const PENDING_PAGE_AUDIT_STATUSES = new Set(["queued", "running"]);

// `awaiting_verification` is not a resting state: the free five-PDP sample keeps
// landing behind it, and its findings only reach the card on a later fetch. Poll
// on the work that is actually outstanding rather than on the status word alone,
// so a still-active progress step can never spin forever.
export function isScanInFlight(result: AnswerCheckResult) {
  return (
    LIVE_STATUSES.has(result.status) ||
    PENDING_PAGE_AUDIT_STATUSES.has(result.page_audits_status ?? "") ||
    result.steps.some((step) => step.state === "active")
  );
}

function faviconHost(raw: string | null | undefined): string | null {
  const value = (raw ?? "").trim().toLowerCase();
  if (!value) return null;
  const host = value
    .replace(/^[a-z]+:\/\//, "")
    .split("/")[0]
    .split("?")[0]
    .split(":")[0]
    .replace(/^www\./, "");
  return host.includes(".") ? host : null;
}

function BrandFavicon({
  domain,
  name,
}: {
  domain?: string | null;
  name: string;
}) {
  const [source, setSource] = useState<"site" | "google" | "fallback">("site");
  // A favicon that is slow, missing, or blocked used to leave an empty bordered
  // square as the first glyph on the result. The initial is drawn immediately
  // and the image only replaces it once it has actually decoded.
  const [loaded, setLoaded] = useState(false);
  const host = faviconHost(domain);
  const initial = name.trim().charAt(0).toUpperCase() || "?";

  if (!host) return null;

  if (source !== "fallback") {
    const src =
      source === "site"
        ? `https://${host}/favicon.ico`
        : `https://www.google.com/s2/favicons?domain=${encodeURIComponent(host)}&sz=64`;
    return (
      <span
        aria-hidden="true"
        className="relative inline-flex h-7 w-7 shrink-0 items-center justify-center border border-black/14 bg-white font-mono text-[11px] font-semibold text-black/58"
      >
        {loaded ? null : initial}
        <img
          src={src}
          alt=""
          aria-hidden="true"
          width={28}
          height={28}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setSource(source === "site" ? "google" : "fallback")}
          className={`absolute inset-0 h-full w-full object-contain p-0.5 ${loaded ? "" : "opacity-0"}`}
        />
      </span>
    );
  }

  return (
    <span
      aria-hidden="true"
      className="inline-flex h-7 w-7 shrink-0 items-center justify-center border border-black/14 bg-white font-mono text-[11px] font-semibold text-black/58"
    >
      {initial}
    </span>
  );
}

const FINDING_RANK: Record<string, number> = {
  blocker: 0,
  high: 1,
  medium: 2,
  low: 3,
  info: 4,
};

function sortedFindings(result: AnswerCheckResult) {
  return [...result.findings].sort(
    (a, b) =>
      (FINDING_RANK[a.severity ?? "medium"] ?? 2) -
      (FINDING_RANK[b.severity ?? "medium"] ?? 2),
  );
}

function findingArea(code: string) {
  if (code.startsWith("seo.")) return "Search & structured data";
  if (code.startsWith("i18n.")) return "Internationalization";
  if (code.startsWith("security.")) return "Trust & delivery";
  if (code.startsWith("geo.")) return "Machine readability";
  return "Product evidence";
}

// ── Merchant-facing reading of one finding ──────────────────────────────────
// The backend attaches `headline` / `why` / `next_step` / `area`. A payload
// cached before that layer shipped will not carry them, so every accessor
// degrades to the technical string rather than rendering an empty line.

function findingHeadline(finding: Finding) {
  return finding.headline?.trim() || finding.title;
}

function findingWhy(finding: Finding) {
  return finding.why?.trim() || null;
}

function findingNextStep(finding: Finding) {
  return finding.next_step?.trim() || finding.detail?.trim() || null;
}

function findingGroup(finding: Finding) {
  return finding.area?.trim() || findingArea(finding.code);
}

// Severity words are engineering words. A store owner needs to know what to do
// first, not how a check classified itself — and a scan of five public pages
// has not earned the word "critical".
function priorityOf(finding: Finding) {
  const severity = finding.severity ?? "medium";
  if (severity === "blocker" || severity === "high") {
    return { label: "Worth doing first", urgent: true };
  }
  if (severity === "medium") return { label: "Worth a look", urgent: false };
  return { label: "Minor", urgent: false };
}

// Locale paths arrive as raw prefixes (`de-ch`, `en-us`). Those are
// implementation detail; the merchant reads a country and a language.
const LANGUAGE_NAMES: Record<string, string> = {
  ar: "Arabic",
  cs: "Czech",
  da: "Danish",
  de: "German",
  el: "Greek",
  en: "English",
  es: "Spanish",
  fi: "Finnish",
  fr: "French",
  he: "Hebrew",
  hu: "Hungarian",
  it: "Italian",
  ja: "Japanese",
  ko: "Korean",
  nb: "Norwegian",
  nl: "Dutch",
  no: "Norwegian",
  pl: "Polish",
  pt: "Portuguese",
  ro: "Romanian",
  ru: "Russian",
  sv: "Swedish",
  tr: "Turkish",
  uk: "Ukrainian",
  zh: "Chinese",
};

// ISO 3166-1 alpha-2 -> display name, for `questions_country` (backend:
// `public_answer_check._COUNTRY_NAMES`). Same idea as `LANGUAGE_NAMES`: a
// short code the crawl/domain gave us, read out in words.
const COUNTRY_NAMES: Record<string, string> = {
  us: "United States",
  gb: "United Kingdom",
  ie: "Ireland",
  ca: "Canada",
  au: "Australia",
  nz: "New Zealand",
  de: "Germany",
  at: "Austria",
  ch: "Switzerland",
  fr: "France",
  be: "Belgium",
  it: "Italy",
  nl: "Netherlands",
  es: "Spain",
  mx: "Mexico",
  pt: "Portugal",
  br: "Brazil",
  pl: "Poland",
  se: "Sweden",
  dk: "Denmark",
  no: "Norway",
  fi: "Finland",
  cz: "Czechia",
  ro: "Romania",
  hu: "Hungary",
  gr: "Greece",
  tr: "Turkey",
  ru: "Russia",
  ua: "Ukraine",
  jp: "Japan",
  kr: "South Korea",
  cn: "China",
};

function marketLabel(result: AnswerCheckResult): string | null {
  const market = result.brand_evidence?.market ?? null;
  const languages: string[] = [];
  for (const locale of result.site_inventory?.locales ?? []) {
    for (const part of locale.toLowerCase().split(/[-_]/)) {
      const name = LANGUAGE_NAMES[part];
      if (name && !languages.includes(name)) languages.push(name);
    }
  }
  // Locale-prefixed URLs (/de/, /fr-ch/) are the strongest signal but plenty of
  // single-language stores (a .ch store that just serves German at the root,
  // no /de/ prefix) publish none. The language the buying questions were
  // actually written in is a second, always-available signal for the same
  // fact, so it fills this in rather than leaving the identity line silent.
  if (!languages.length && result.questions_language) {
    const name = LANGUAGE_NAMES[result.questions_language.toLowerCase()];
    if (name) languages.push(name);
  }
  const spoken = languages.slice(0, 3).join(" · ");
  if (!market && !spoken) return null;
  return [market, spoken].filter(Boolean).join(" · ");
}

// Language and country the questions were actually written for, together —
// always shown, English included: a quiet default is still a fact the
// merchant did not have to infer for themselves.
function questionLanguageBadge(result: AnswerCheckResult): string | null {
  const code = result.questions_language;
  const language = code
    ? (LANGUAGE_NAMES[code.toLowerCase()] ?? code.toUpperCase())
    : null;
  // `questions_country` is interpreted from the crawl (which locale-prefixed
  // URL the store's own site actually used), same source and same fallback
  // order as `questions_language` — read it first. `brand_evidence.market` is
  // a ccTLD guess and only fills in when the crawl named nothing.
  const countryCode = result.questions_country?.toLowerCase();
  const country =
    (countryCode ? COUNTRY_NAMES[countryCode] : null) ??
    result.brand_evidence?.market ??
    null;
  return [language, country].filter(Boolean).join(" · ") || null;
}

function countLabel(count: number, noun: string) {
  return `${count} ${noun}${count === 1 ? "" : "s"}`;
}

// ── What the free scan promises, before anyone types a domain ───────────────

const FREE_SCAN_RETURNS = [
  [
    "What we can find",
    "How many of your products are public, plus a sample of product pages read end to end.",
  ],
  [
    "Where shoppers may lose you",
    "In plain words: which products may get skipped, be hard to choose between, or be hard to buy.",
  ],
  [
    "What to fix first",
    "One next step per finding, with the evidence under it. A public scan cannot prove revenue impact, and we do not claim it.",
  ],
] as const;

export function FreeScanPromise({ compact = false }: { compact?: boolean }) {
  return (
    <div className="mx-auto w-full max-w-3xl text-left">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h2 className="text-[19px] font-semibold tracking-[-0.015em] text-ink-deep">
          Free store scan
        </h2>
        <p className="text-[13px] text-black/56">Usually about a minute.</p>
      </div>
      {/* The kind of assessment, and the one it is not. A merchant who types a
          domain expecting keyword analysis has to be able to correct that here,
          before the findings arrive and do it for us. */}
      <p className="mt-2 max-w-[62ch] text-[14.5px] leading-[1.65] text-black/68">
        We read your public store the way a search engine or an AI assistant
        reads it: your product pages, your catalog data, and your site settings.
        We email you the link to your audit, so you get what they can see, and
        what to fix first. It is not a keyword report — we do not measure search
        demand, and shopper questions come later, not here.
      </p>

      <ul className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
        {[
          // Not "no login" any more: the scan is sent to an email address, and a
          // promise the form immediately breaks is worse than no promise.
          "No account, no card",
          "Public storefront pages only",
          "No access to your store",
        ].map((item) => (
          <li
            key={item}
            className="flex items-center gap-2 text-[13px] font-medium text-[#3b3833]"
          >
            <Check
              aria-hidden="true"
              className="h-3.5 w-3.5 shrink-0 text-[#1f7a4d]"
            />
            {item}
          </li>
        ))}
      </ul>

      {compact ? null : (
        <dl className="mt-6 border-t border-black/12">
          {FREE_SCAN_RETURNS.map(([term, detail]) => (
            <div
              key={term}
              className="grid gap-1 border-b border-black/12 py-3.5 sm:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] sm:gap-6"
            >
              <dt className="text-[14px] font-semibold text-ink-deep">
                {term}
              </dt>
              <dd className="max-w-[62ch] text-[13.5px] leading-[1.6] text-black/62">
                {detail}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}

// ── Progress, in the merchant's words ───────────────────────────────────────

function StepMark({ state }: { state: Step["state"] }) {
  if (state === "done") {
    return (
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1f7a4d]/12">
        <Check className="h-3 w-3 text-[#1a6b43]" aria-hidden="true" />
      </span>
    );
  }
  if (state === "active") {
    return (
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
        <Loader2
          className="h-4 w-4 animate-spin text-signal-ink"
          aria-hidden="true"
        />
      </span>
    );
  }
  if (state === "failed") {
    return (
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-signal-ink/12">
        <X className="h-3 w-3 text-signal-ink" aria-hidden="true" />
      </span>
    );
  }
  return (
    <span
      className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-black/22"
      aria-hidden="true"
    />
  );
}

// Steps shown before the first payload lands. The POST runs the storefront read
// synchronously, so without this the visitor watches a disabled button for
// several seconds. It states what is being done, never what was found.
const OPTIMISTIC_STEPS: Step[] = [
  {
    key: "storefront",
    label: "Reading your storefront",
    state: "active",
    detail: null,
  },
  {
    key: "catalog",
    label: "Checking your products and prices",
    state: "pending",
    detail: null,
  },
  {
    key: "pages",
    label: "Looking at your product pages",
    state: "pending",
    detail: null,
  },
];

function ScanProgress({
  steps,
  domain,
}: {
  steps: Step[];
  domain: string | null;
}) {
  const visible = steps.filter((step) => step.state !== "skipped");
  if (!visible.length) return null;

  // Position inside the very list rendered below — no second progress model.
  // The active step when there is one; otherwise the next step not yet done, so
  // a list caught between states still reads as somewhere rather than nowhere.
  const activeIndex = visible.findIndex((step) => step.state === "active");
  const doneCount = visible.filter((step) => step.state === "done").length;
  const position = Math.min(
    activeIndex >= 0 ? activeIndex + 1 : doneCount + 1,
    visible.length,
  );

  return (
    <section
      aria-live="polite"
      className="mx-auto w-full max-w-3xl border border-black/18 bg-white px-5 py-5 text-left sm:px-6"
    >
      {/* The mode, held in place for the whole run. Without it the step labels
          are the only clue to what kind of assessment this is, and they read
          equally well as the start of a keyword report. */}
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-black/44">
        Technical discoverability · step {position} of {visible.length}
      </p>
      <h3 className="mt-1.5 text-[15px] font-semibold tracking-[-0.01em] text-ink-deep">
        {domain ? `Reading ${domain}` : "Reading your storefront"}
      </h3>
      <p className="mt-1 text-[13px] leading-relaxed text-black/56">
        Results appear below as soon as each part is done. You do not have to
        wait for all of it.
      </p>
      <p className="mt-1.5 text-[12.5px] leading-relaxed text-black/50">
        Shopper questions come after this, and tracking them over time happens
        inside Beseam.
      </p>
      <ol className="mt-4 space-y-3">
        {visible.map((step) => (
          <li key={step.key} className="flex items-start gap-3">
            <StepMark state={step.state} />
            <div className="min-w-0">
              <p
                className={`text-[14px] leading-snug ${
                  step.state === "pending"
                    ? "text-black/44"
                    : "font-medium text-ink-deep"
                }`}
              >
                {step.label}
              </p>
              {step.detail ? (
                <p className="mt-0.5 text-[12.5px] leading-relaxed text-black/54">
                  {step.detail}
                </p>
              ) : null}
              {step.state === "active" &&
              step.progress &&
              step.progress.total > 0 ? (
                <div
                  className="mt-1.5 h-1 w-full max-w-[220px] overflow-hidden rounded-full bg-black/10"
                  role="progressbar"
                  aria-valuenow={step.progress.done}
                  aria-valuemin={0}
                  aria-valuemax={step.progress.total}
                  aria-label={`${step.progress.done} of ${step.progress.total}`}
                >
                  <div
                    className="h-full rounded-full bg-[#1a6b43] transition-[width] duration-500 ease-out"
                    style={{
                      width: `${Math.round(
                        (Math.min(step.progress.done, step.progress.total) /
                          step.progress.total) *
                          100,
                      )}%`,
                    }}
                  />
                </div>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

// ── The real numbers, the moment they exist ─────────────────────────────────
function FoundStrip({ result }: { result: AnswerCheckResult }) {
  const catalog = result.catalog_inventory;
  const productCount =
    catalog?.products_checked && catalog.products_checked > 0
      ? `${catalog.products_checked}${catalog.products_capped ? "+" : ""}`
      : String(result.products_seen);
  const findingCount = groupFindings(sortedFindings(result)).length;
  const scored = result.answers.filter((answer) => answer.mentioned !== null);
  const named = scored.filter((answer) => answer.mentioned === true).length;

  const facts: Array<[string, string, boolean]> = [
    [productCount, "products found", false],
    [
      scored.length ? `${named}/${scored.length}` : "—",
      scored.length
        ? "assistant answers named you"
        : "assistant answers pending",
      !scored.length && isScanInFlight(result),
    ],
    [
      String(findingCount),
      findingCount === 1 ? "opportunity found" : "opportunities found",
      false,
    ],
  ];

  return (
    <dl className="grid border-b border-black/14 bg-white sm:grid-cols-3">
      {facts.map(([value, label, pending], index) => (
        <div
          key={label}
          className={`flex items-baseline gap-2.5 px-5 py-4 sm:px-6 ${
            index > 0
              ? "border-t border-black/12 sm:border-l sm:border-t-0"
              : ""
          }`}
        >
          <dd
            className={`text-[26px] font-semibold leading-none tracking-[-0.03em] tabular-nums ${
              index === 1 && scored.length && named < scored.length
                ? "text-signal-ink"
                : index === 2 && findingCount > 0
                  ? "text-signal-ink"
                  : "text-ink-deep"
            }`}
          >
            {value}
          </dd>
          <dt className="flex items-center gap-1.5 text-[12.5px] leading-snug text-black/58">
            {label}
            {pending ? (
              <Loader2
                className="h-3 w-3 animate-spin text-signal-ink"
                aria-hidden="true"
              />
            ) : null}
          </dt>
        </div>
      ))}
    </dl>
  );
}

// ── The heart of the result ─────────────────────────────────────────────────
/**
 * Findings that say the same thing to the merchant, collapsed into one row.
 *
 * Several technical checks legitimately map to one consequence — two
 * `security.*` checks both mean “the store may be missing protections shoppers
 * expect”, and the same template usually fails on every sampled page. Printing
 * that sentence twice reads as a bug to the person we are trying to convince,
 * so the group is merged here and every underlying check stays listed under
 * “What we saw”. Nothing is dropped; the technical rows keep their own detail,
 * evidence and code.
 */
type FindingGroupRow = { lead: Finding; members: Finding[] };

function groupFindings(findings: Finding[]): FindingGroupRow[] {
  const groups = new Map<string, FindingGroupRow>();
  for (const finding of findings) {
    // Already sorted by severity, so the first arrival is the most severe and
    // is the one whose priority label the row carries.
    const key = findingHeadline(finding).trim().toLowerCase();
    const existing = groups.get(key);
    if (existing) existing.members.push(finding);
    else groups.set(key, { lead: finding, members: [finding] });
  }
  return Array.from(groups.values());
}

function FindingRow({
  group,
  index,
  reportIdByUrl,
  exampleContext,
  fixHref,
}: {
  group: FindingGroupRow;
  index: number;
  reportIdByUrl: Map<string, number>;
  exampleContext: Parameters<typeof fixExampleFor>[1];
  fixHref: string;
}) {
  const finding = group.lead;
  const priority = priorityOf(finding);
  const why = findingWhy(finding);
  const nextStep = findingNextStep(finding);
  const example = fixExampleFor(finding.code, {
    ...exampleContext,
    product: finding.product ?? exampleContext.product,
  });

  return (
    <li className="border-b border-black/12 last:border-b-0">
      <details className="group/finding bg-white">
        <summary className="grid cursor-pointer list-none gap-3 px-5 py-4 transition-colors hover:bg-[#fffaf7] sm:grid-cols-[2.5rem_minmax(0,1fr)_auto] sm:items-center sm:px-6 [&::-webkit-details-marker]:hidden">
          <span className="font-mono text-[11px] font-semibold tabular-nums text-black/36">
            {String(index + 1).padStart(2, "0")}
          </span>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10.5px] font-semibold uppercase tracking-[0.08em]">
              <span className="text-black/44">{findingGroup(finding)}</span>
              <span aria-hidden="true" className="text-black/20">
                ·
              </span>
              <span
                className={
                  priority.urgent ? "text-signal-ink" : "text-black/46"
                }
              >
                {priority.label}
              </span>
            </div>
            <p className="mt-1 text-balance text-[16px] font-semibold leading-[1.4] tracking-[-0.012em] text-ink-deep sm:text-[17px]">
              {findingHeadline(finding)}
            </p>
          </div>

          <span className="inline-flex min-h-9 items-center gap-2 justify-self-start text-[12px] font-semibold text-black/52 group-hover/finding:text-signal-ink sm:justify-self-end">
            <span className="group-open/finding:hidden">
              See recommendation
            </span>
            <span className="hidden group-open/finding:inline">Close</span>
            <ChevronDown
              className="h-3.5 w-3.5 transition-transform group-open/finding:rotate-180"
              aria-hidden="true"
            />
          </span>
        </summary>

        <div className="border-t border-black/10 bg-[#fffaf7] px-5 py-5 sm:px-6 sm:pl-[5.5rem]">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1.25fr)_minmax(16rem,0.75fr)]">
            <div>
              {why ? (
                <p className="max-w-[68ch] text-[14px] leading-[1.65] text-black/64">
                  {why}
                </p>
              ) : null}
              {nextStep ? (
                <p className="mt-4 max-w-[68ch] border-l border-signal-ink/35 pl-3.5 text-[14px] leading-[1.6] text-ink-deep">
                  <span className="font-semibold">Improve next: </span>
                  {nextStep}
                </p>
              ) : null}
              {example ? (
                <div className="mt-4 max-w-[68ch]">
                  <p className="text-[12.5px] leading-relaxed text-black/60">
                    {example.caption}
                  </p>
                  <p className="mt-1 text-[11.5px] text-black/44">
                    {example.placement}
                  </p>
                  <pre className="mt-2 overflow-x-auto border border-black/12 bg-white px-3 py-2.5 font-mono text-[11px] leading-[1.55] text-ink-deep">
                    {example.code}
                  </pre>
                </div>
              ) : null}

              {/* Reading a finding and having nowhere to go with it is where
                  the scan stops being useful. Every finding ends on the same
                  offer: Beseam does this one against your real catalog. */}
              <TrackedLink
                href={`${fixHref}&fix=${encodeURIComponent(finding.code)}`}
                eventName="finding_fix_clicked"
                eventCategory="conversion"
                placement="answer_check_finding"
                preserveUtm
                className="group/fix mt-5 inline-flex min-h-10 items-center gap-2 border border-ink-deep px-4 text-[12.5px] font-semibold text-ink-deep transition-colors hover:bg-ink-deep hover:text-white"
              >
                Start fixing this in Beseam
                <ArrowRight
                  aria-hidden="true"
                  className="h-3.5 w-3.5 transition-transform group-hover/fix:translate-x-0.5"
                />
              </TrackedLink>
            </div>

            <div className="border-t border-black/10 pt-4 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-black/42">
                Evidence
                {group.members.length > 1
                  ? ` · ${group.members.length} checks`
                  : ""}
              </p>
              <div className="mt-3 space-y-4 text-[12px] leading-relaxed text-black/58">
                {group.members.map((member, position) => {
                  const reportId = member.url
                    ? reportIdByUrl.get(member.url)
                    : undefined;
                  return (
                    <div key={`${member.code}-${member.product ?? position}`}>
                      <p className="font-semibold text-ink-deep">
                        {member.title}
                      </p>
                      {member.detail ? (
                        <p className="mt-1">{member.detail}</p>
                      ) : null}
                      {member.evidence?.length ? (
                        <ul className="mt-2 space-y-1">
                          {member.evidence
                            .slice(0, 3)
                            .map((line, evidenceIndex) => (
                              <li
                                key={`${line}-${evidenceIndex}`}
                                className="break-words font-mono text-[11px] text-black/50"
                              >
                                {line}
                              </li>
                            ))}
                        </ul>
                      ) : null}
                      {/* The products the count was made of. "31 products have
                          an unidentified variant" pointed at products.json and
                          left the merchant to find out which 31. */}
                      {member.examples?.length ? (
                        <div className="mt-2.5 border-l border-signal-ink/30 pl-3">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-black/42">
                            Products this was seen on
                          </p>
                          <ul className="mt-1.5 space-y-1.5">
                            {member.examples.slice(0, 4).map((sample) => (
                              <li key={sample.url} className="leading-snug">
                                <a
                                  href={sample.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="font-semibold text-ink-deep underline decoration-black/24 underline-offset-4 hover:decoration-signal-ink"
                                >
                                  {sample.title}
                                </a>
                                {sample.note ? (
                                  <span className="block text-[11px] text-black/50">
                                    {sample.note}
                                  </span>
                                ) : null}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                      <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-black/42">
                        {member.product ? <span>{member.product}</span> : null}
                        <span className="font-mono">{member.code}</span>
                        {/* Where we saw it. A finding that names a product and
                            gives nothing to click sends the merchant hunting for
                            the origin of a claim we already know the source of. */}
                        {member.url ? (
                          <a
                            href={member.url}
                            target="_blank"
                            rel="noreferrer"
                            className="font-semibold text-black/56 underline decoration-black/20 underline-offset-4 hover:text-ink-deep hover:decoration-signal-ink"
                          >
                            See the page →
                          </a>
                        ) : null}
                        {member.catalog_url ? (
                          <a
                            href={member.catalog_url}
                            target="_blank"
                            rel="noreferrer"
                            className="font-semibold text-black/56 underline decoration-black/20 underline-offset-4 hover:text-ink-deep hover:decoration-signal-ink"
                          >
                            The raw catalog file we read →
                          </a>
                        ) : null}
                        {member.url && reportId ? (
                          <a
                            href={`${APP_REPORT_URL}/${reportId}`}
                            target="_blank"
                            rel="noreferrer"
                            className="font-semibold text-ink-deep underline decoration-black/24 underline-offset-4 hover:decoration-signal-ink"
                          >
                            Full page report →
                          </a>
                        ) : null}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </details>
    </li>
  );
}

// "Why would I publish a /SKILL.md file?" is a fair question and the report never
// answered it. Each file gets a plain sentence naming who reads it. All four are
// young conventions; saying so is more useful than implying a gap.
const DISCOVERY_FILE_NOTES: Record<string, string> = {
  "/llms.txt":
    "A short summary of your store for AI assistants that look for one. Optional.",
  "/agents.md":
    "Notes for AI agents browsing your store on a shopper's behalf. Optional.",
  "/SKILL.md":
    "Describes what an assistant can do on your store, in a format some AI tools read. Very new and optional — skip it unless you already work with AI agents.",
  "/.well-known/ucp":
    "A machine-readable card describing your store for commerce agents. Optional.",
};

const FIRST_SHOWN = 4;

function WorthLookingAt({ result }: { result: AnswerCheckResult }) {
  // Every finding, in order, with nothing held back behind a "show the rest".
  const [expanded, setExpanded] = useState(false);
  const findings = groupFindings(sortedFindings(result));
  const audits = result.page_audits ?? [];
  // The store's own details, so a worked example reads as theirs rather than as
  // documentation they have to translate. Currency is not in this payload, so the
  // snippet marks it for the merchant to set rather than guessing a wrong one.
  const exampleContext = {
    brand: result.brand ?? result.domain,
    product: (result.page_audits ?? [])[0]?.title ?? null,
    country: result.brand_evidence?.market ?? null,
    currency: null,
    image: null,
  };
  const pageStatus =
    result.page_audits_status ?? (audits.length ? "complete" : "not_started");
  const pagesInFlight = pageStatus === "queued" || pageStatus === "running";
  const reportIdByUrl = new Map<string, number>(
    audits.flatMap((audit) =>
      audit.report_id ? ([[audit.url, audit.report_id]] as const) : [],
    ),
  );
  const shown = expanded ? findings : findings.slice(0, FIRST_SHOWN);
  const hidden = findings.length - shown.length;

  // With nothing found and nothing still running, this section would only
  // restate the headline directly above it in slightly different words. The
  // headline and the scope note already carry that message.
  if (!findings.length && !pagesInFlight) return null;
  return (
    <section className="border-b border-black/14 bg-white">
      <div className="border-b border-black/12 px-5 py-5 sm:px-6">
        <h3 className="text-[19px] font-semibold tracking-[-0.02em] text-ink-deep">
          Fix these first
        </h3>
        <p className="mt-1.5 max-w-[70ch] text-[13.5px] leading-relaxed text-black/60">
          {findings.length
            ? "The clearest opportunities from this public scan, ordered by what is worth looking at first. Open one for the recommendation and evidence."
            : "Still reading."}
          {pagesInFlight
            ? " More may appear as your product pages finish."
            : ""}
        </p>
      </div>

      {findings.length ? (
        <>
          <ol>
            {shown.map((group, index) => (
              <FindingRow
                key={`${group.lead.code}-${group.lead.product ?? index}`}
                group={group}
                index={index}
                reportIdByUrl={reportIdByUrl}
                exampleContext={exampleContext}
                fixHref={`${APP_REGISTER_URL}?scan_domain=${encodeURIComponent(result.domain)}`}
              />
            ))}
          </ol>
          {hidden > 0 ? (
            <div className="border-t border-black/12 px-5 py-4 sm:px-6">
              <button
                type="button"
                onClick={() => setExpanded(true)}
                className="inline-flex min-h-11 items-center gap-2 text-[13.5px] font-semibold text-ink-deep underline decoration-black/28 underline-offset-6 transition-colors hover:text-signal-ink hover:decoration-signal-ink"
              >
                Show the other {countLabel(hidden, "finding")}
                <ChevronDown className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          ) : null}
        </>
      ) : (
        // Only reachable while pages are still being read — the empty, settled
        // case returns null above.
        <div className="flex items-center gap-3 px-5 py-5 sm:px-6">
          <Loader2
            className="h-4 w-4 animate-spin text-signal-ink"
            aria-hidden="true"
          />
          <p className="text-[13.5px] text-black/62">
            Still reading your product pages.
          </p>
        </div>
      )}
    </section>
  );
}

// The standalone “What this free scan did not cover” panel and the closing
// point-in-time footnote were removed at the owner's request. The scan's limits
// are still stated where they are actually read: the pre-scan promise (public
// pages only, no login, no store access) and the standing line above the list
// — “Read as possibilities, not verdicts … it cannot prove what it costs you.”

// ── Where the scan stops, and what continues ────────────────────────────────
// Every line here is checkable against what actually ran. The public probe
// fetches the storefront over plain HTTPS and samples five product pages
// (`storefront.probe_storefront`); the page checks are deterministic, with the
// analyzer's AI nodes left unevaluated (`page_audit.py`); one row per domain is
// overwritten on each submission, so there is no history to compare against.
// The Beseam column is the product's own behavior: questions a merchant edits
// in setup, the daily visibility cycle, the raw channel answer kept on the run,
// the ranked action queue, and the post-publish recheck of the same questions.
function ScanBoundary({ result }: { result: AnswerCheckResult }) {
  const sampledPages = (result.page_audits ?? []).length;
  const asked = result.answers.some((answer) => answer.mentioned !== null);

  const columns: Array<{
    label: string;
    tone: "did" | "not" | "next";
    items: string[];
  }> = [
    {
      label: "What this scan did",
      tone: "did",
      items: [
        "Read your public storefront the way any visitor can — no login, no store access.",
        sampledPages
          ? `Ran the page checks over ${countLabel(sampledPages, "product page")}, plus your robots file, sitemap and crawler access.`
          : "Ran the page checks over a sample of your product pages, plus your robots file, sitemap and crawler access.",
        "Compared your catalog data against what each page actually renders — names, prices, availability.",
      ],
    },
    {
      label: "What it did not do",
      tone: "not",
      items: [
        asked
          ? "Keep asking. The assistant answers above were sampled once, on this run."
          : "Ask ChatGPT or Google AI Mode anything about your products. Nothing here is a live assistant answer.",
        "Repeat on its own. A public scan has no schedule behind it.",
        "Keep a history. There is no earlier run to compare this against.",
      ],
    },
    {
      label: "What starts in Beseam",
      tone: "next",
      items: [
        "Shopper questions you read and edit before any of them run.",
        "Those questions asked on a schedule instead of once.",
        "The answers kept as evidence, with the date they were given.",
        "Fixes ordered by what is worth doing first.",
        "The same questions asked again after a change, so you can see what moved.",
      ],
    },
  ];

  return (
    <section className="border-b border-black/14 bg-white">
      <div className="border-b border-black/12 px-5 py-5 sm:px-6">
        <h3 className="text-[19px] font-semibold tracking-[-0.02em] text-ink-deep">
          Where this scan stops
        </h3>
        <p className="mt-1.5 max-w-[70ch] text-[13.5px] leading-relaxed text-black/60">
          A public scan can only reach so far. This is exactly how far it went,
          and what continues after it.
        </p>
      </div>
      <div className="grid md:grid-cols-3">
        {columns.map((column) => (
          <div
            key={column.label}
            className="border-b border-black/12 px-5 py-5 last:border-b-0 sm:px-6 md:border-b-0 md:border-r md:last:border-r-0"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-black/42">
              {column.label}
            </p>
            <ul className="mt-3 space-y-2.5">
              {column.items.map((item) => (
                <li
                  key={item}
                  className="flex max-w-[46ch] items-start gap-2.5 text-[13px] leading-[1.55] text-black/68"
                >
                  {column.tone === "did" ? (
                    <Check
                      aria-hidden="true"
                      className="mt-[3px] h-3.5 w-3.5 shrink-0 text-[#1f7a4d]"
                    />
                  ) : column.tone === "not" ? (
                    <X
                      aria-hidden="true"
                      className="mt-[3px] h-3.5 w-3.5 shrink-0 text-black/34"
                    />
                  ) : (
                    <ArrowRight
                      aria-hidden="true"
                      className="mt-[3px] h-3.5 w-3.5 shrink-0 text-signal-ink"
                    />
                  )}
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Two distinct ways forward ───────────────────────────────────────────────

function ContinuePaths({
  result,
  continueHref,
}: {
  result: AnswerCheckResult;
  continueHref: string;
}) {
  const top = sortedFindings(result)[0] ?? null;
  const topHeadline = top ? findingHeadline(top) : null;
  const opportunityCount = groupFindings(sortedFindings(result)).length;

  return (
    // Two offers, two grounds. The upgrade — the same checks kept running — is
    // the primary path and takes the one solid button; the assisted review keeps
    // the pigment ground but takes the outlined treatment, so the ranking is
    // carried by weight instead of by two solid buttons competing.
    <section
      data-print-hide
      className="grid border-t border-black/18 text-white lg:grid-cols-2"
    >
      <div className="bg-ink-deep px-5 py-7 sm:px-6 sm:py-8">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-white/50">
          {opportunityCount}{" "}
          {opportunityCount === 1 ? "opportunity" : "opportunities"} found
        </p>
        {/* The one line the product owner wants carrying this moment. It sits
            with the primary CTA so the upgrade is read as the reason to start,
            not as a second offer. */}
        <h3 className="mt-2 max-w-[28ch] text-[19px] font-semibold leading-[1.3] tracking-[-0.02em]">
          This scan reads your store once. Beseam keeps checking, and proves
          what changed.
        </h3>
        <p className="mt-2.5 max-w-[46ch] text-[14px] leading-[1.62] text-white/64">
          Connect your store and Beseam checks these against your real catalog,
          prepares the changes, and asks for your approval before anything
          customer-facing changes.
        </p>
        <div className="mt-5 grid gap-2 text-[12.5px] sm:grid-cols-2">
          <div className="border border-white/16 px-3 py-2.5">
            <span className="block text-white/46">Prepared by Beseam</span>
            <span className="mt-0.5 block font-semibold text-white">
              Checked after connection
            </span>
          </div>
          <div className="border border-white/16 px-3 py-2.5">
            <span className="block text-white/46">Needs your approval</span>
            <span className="mt-0.5 block font-semibold text-white">
              Checked after connection
            </span>
          </div>
        </div>
        <TrackedLink
          href={continueHref}
          eventName="scan_continue_clicked"
          eventCategory="conversion"
          placement="answer_check_result"
          preserveUtm
          className="group mt-6 inline-flex min-h-12 items-center justify-center gap-2 bg-white px-6 text-[14px] font-semibold text-ink-deep transition-colors hover:bg-signal hover:text-ink-deep"
        >
          Start ongoing checks
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          />
        </TrackedLink>
      </div>

      <div className="bg-pigment px-5 py-7 sm:px-6 sm:py-8">
        <h3 className="text-[19px] font-semibold tracking-[-0.02em]">
          {topHeadline
            ? "Want to see Beseam follow this end to end?"
            : "See how Beseam works on a real store"}
        </h3>
        {topHeadline ? (
          <p className="mt-2.5 max-w-[44ch] text-[14px] leading-[1.5] text-signal">
            Starting with “{topHeadline}”
          </p>
        ) : null}
        <p className="mt-2.5 max-w-[44ch] text-[14px] leading-[1.62] text-white/70">
          In a 20-minute store review, we use one real finding to show how
          Beseam works: check what may explain it, prepare the change, get your
          approval, apply it, and check what happened.
        </p>
        <BookReviewCta
          variant="primary"
          location="scan_result_managed"
          label="See Beseam on my store"
          className="mt-6 min-h-12 gap-2 border border-white/45 bg-transparent px-6 py-0 text-[14px] font-semibold text-white hover:bg-white hover:text-ink-deep"
        />
      </div>
    </section>
  );
}

const RIVAL_LIMIT = 6;

// "Amazon / EverJoy Daily" and "BLOCH Dance US (official)" are the same rival
// showing up twice. Collapse to the brand so the tally means something.
function rivalIdentity(raw: string) {
  const label = raw
    .split("/")[0]
    .replace(/\(.*?\)/g, "")
    .trim();
  return { key: label.toLowerCase(), label };
}

function tallyRivals(answers: Answer[]) {
  const counts = new Map<string, { label: string; count: number }>();
  for (const answer of answers) {
    for (const raw of answer.competitors ?? []) {
      const { key, label } = rivalIdentity(raw);
      if (!key) continue;
      const entry = counts.get(key);
      if (entry) entry.count += 1;
      else counts.set(key, { label, count: 1 });
    }
  }
  // "Bloch" and "BLOCH Dance US" are one rival: fold the longer label into the
  // shorter one it starts with.
  const entries = Array.from(counts.entries()).sort(
    (a, b) => a[0].length - b[0].length,
  );
  const merged: { key: string; label: string; count: number }[] = [];
  for (const [key, value] of entries) {
    const parent = merged.find((item) => key.startsWith(`${item.key} `));
    if (parent) parent.count += value.count;
    else merged.push({ key, ...value });
  }
  return merged.sort((a, b) => b.count - a.count);
}

// Three signals only: green won, red lost, ink in between. Blue is reserved
// for things you can click. The reds are the light-ground signal (#b8441d);
// #e8653a only ever sits on the dark grounds.
// Platform names arrive lowercase from the API. They are proper nouns on the
// card, where every other identifier is set the way its owner writes it.
const PLATFORM_LABELS: Record<string, string> = {
  shopify: "Commerce storefront",
  woocommerce: "WooCommerce",
  bigcommerce: "BigCommerce",
  magento: "Magento",
  squarespace: "Squarespace",
  wix: "Wix",
  prestashop: "PrestaShop",
  generic: "Storefront",
};

function platformLabel(platform: string) {
  const key = platform.trim().toLowerCase();
  return (
    PLATFORM_LABELS[key] ?? platform.charAt(0).toUpperCase() + platform.slice(1)
  );
}

function scoreBand(score: number) {
  if (score >= 70)
    return { label: "Strong", text: "text-[#1a6b43]", fill: "bg-[#1f7a4d]" };
  if (score >= 40)
    return { label: "Mixed", text: "text-ink-deep", fill: "bg-ink-deep" };
  if (score >= 15)
    return { label: "Weak", text: "text-signal-ink", fill: "bg-[#d95028]" };
  return {
    label: "Barely visible",
    text: "text-signal-ink",
    fill: "bg-[#d95028]",
  };
}

// The card only ever knows the channel's display label, so map it to a mark.
const CHANNEL_BRAND_KEYS: Record<string, string> = {
  chatgpt: "openai_web_search_probe",
  "chatgpt shopping": "openai_web_search_probe",
  "google ai mode": "google_ai_mode_readiness",
  "google shopping": "google_structured_data",
  gemini: "gemini_grounded_probe",
  perplexity: "perplexity_search_probe",
  claude: "claude_web_search_probe",
  "bing (copilot)": "copilot_consumer_observation",
  copilot: "copilot_consumer_observation",
};

function AiVisibilityWorkspace({ result }: { result: AnswerCheckResult }) {
  const scored = result.answers.filter((answer) => answer.mentioned !== null);
  if (!scored.length) return null;

  const named = scored.filter((answer) => answer.mentioned === true).length;
  const channels = Array.from(
    new Set(
      scored
        .map((answer) => answer.channel_label)
        .filter((label): label is string => Boolean(label)),
    ),
  );
  const engines = channels.map((channel) => {
    const observations = scored.filter(
      (answer) => answer.channel_label === channel,
    );
    const wins = observations.filter(
      (answer) => answer.mentioned === true,
    ).length;
    return {
      channel,
      wins,
      total: observations.length,
      pct: observations.length
        ? Math.round((wins / observations.length) * 100)
        : 0,
    };
  });
  const rivals = tallyRivals(scored);
  const topRival = rivals[0] ?? null;
  const pct = Math.round((named / scored.length) * 100);

  return (
    <section className="bg-white">
      <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="border-b border-black/12 px-5 py-6 sm:px-6 lg:border-b-0 lg:border-r">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-black/42">
            Brand appearance
          </p>
          <div className="mt-2 flex flex-wrap items-end gap-3">
            <span
              className={`text-[52px] font-semibold leading-none tracking-[-0.045em] tabular-nums ${scoreBand(pct).text}`}
            >
              {named}/{scored.length}
            </span>
            <span
              className={`mb-1 text-[12px] font-semibold ${scoreBand(pct).text}`}
            >
              {scoreBand(pct).label} · {pct}%
            </span>
          </div>
          <p className="mt-3 max-w-[42ch] text-[13.5px] leading-relaxed text-black/62">
            {named === scored.length
              ? "Your brand appeared in every observed answer."
              : named === 0
                ? "Your brand did not appear in any observed answer."
                : `Your brand was missing from ${scored.length - named} of ${scored.length} observed answers.`}
          </p>
          {topRival && named < scored.length ? (
            <p className="mt-4 border-t border-black/10 pt-3 text-[12.5px] leading-relaxed text-black/58">
              <span className="font-semibold text-ink-deep">
                Most frequent alternative:{" "}
              </span>
              {topRival.label} · {topRival.count}×
            </p>
          ) : null}
        </div>

        <div className="px-5 py-6 sm:px-6">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-black/42">
              By assistant
            </p>
            <span className="font-mono text-[11px] text-black/42">
              {channels.length}{" "}
              {channels.length === 1 ? "assistant" : "assistants"}
            </span>
          </div>
          <div className="mt-2 divide-y divide-black/10 border-y border-black/10">
            {engines.map((engine) => (
              <div
                key={engine.channel}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-3"
              >
                <div className="min-w-0">
                  <p className="flex items-center gap-2.5 text-[13px] font-semibold text-ink-deep">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-black/12 bg-white">
                      <ChannelIcon
                        channel={
                          CHANNEL_BRAND_KEYS[engine.channel.toLowerCase()] ??
                          engine.channel
                        }
                        className="h-3.5 w-3.5 opacity-80"
                      />
                    </span>
                    <span className="truncate">{engine.channel}</span>
                  </p>
                  <div className="ml-9 mt-2 h-1 bg-black/8">
                    <span
                      className={`block h-full ${scoreBand(engine.pct).fill}`}
                      style={{ width: `${Math.max(engine.pct, 1.5)}%` }}
                    />
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-mono text-[13px] font-semibold text-ink-deep">
                    {engine.wins}/{engine.total}
                  </p>
                  <p className="mt-0.5 text-[10.5px] text-black/44">
                    named you
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
// `observation_method` is deliberately not rendered. "Probe", "Live SERP",
// "Google-grounded" are our collection vocabulary, and a merchant reading an
// acquisition page has no way to price the difference between them. The one
// piece of provenance that does mean something concrete — the Google searches a
// grounded engine actually ran — is shown as itself instead.

function ChannelChip({ channel, answer }: { channel: string; answer: Answer }) {
  const named = answer.mentioned === true;
  const unknown = answer.mentioned === null || Boolean(answer.error);
  const tone = unknown
    ? "border-black/20 bg-black/[0.03] text-black/62"
    : named
      ? "border-[#1f7a4d]/40 bg-[#1f7a4d]/10 text-[#1a6b43]"
      : "border-signal-ink/45 bg-signal-ink/[0.08] text-signal-ink";

  return (
    <span
      className={`inline-flex items-center gap-1.5 border px-2 py-0.5 text-[12px] font-medium ${tone}`}
    >
      <ChannelIcon
        channel={CHANNEL_BRAND_KEYS[channel.toLowerCase()] ?? channel}
        className="h-3 w-3 opacity-70"
      />
      {channel}
      {/* The outcome follows the name it belongs to: a mark in front of the
          label reads as a dismiss affordance, not a result. */}
      {unknown ? (
        <span aria-hidden="true">–</span>
      ) : named ? (
        <Check className="h-2.5 w-2.5" aria-hidden="true" />
      ) : (
        <X className="h-2.5 w-2.5" aria-hidden="true" />
      )}
      <span className="sr-only">
        {unknown ? "no answer" : named ? "named you" : "did not name you"}
      </span>
    </span>
  );
}

function shownProducts(answers: Answer[]) {
  const seen = new Set<string>();
  const tiles: ShownProduct[] = [];
  for (const answer of answers) {
    for (const product of answer.products ?? []) {
      const key = product.title.trim().toLowerCase();
      if (!key || seen.has(key)) continue;
      seen.add(key);
      tiles.push(product);
    }
  }
  // Anything of yours that did surface leads the shelf; tiles that carry an
  // image come next, because a shelf of empty boxes says nothing.
  // Every product the assistants surfaced is shown; the shelf scrolls.
  return tiles.sort(
    (a, b) =>
      Number(b.ours) - Number(a.ours) ||
      Number(Boolean(b.image_url)) - Number(Boolean(a.image_url)),
  );
}

// Merchant CDNs refuse hotlinked images (Cross-Origin-Resource-Policy), so the
// image comes back through our own worker instead of straight from the CDN.
function ProductTile({ product }: { product: ShownProduct }) {
  // Stage 1 is the worker proxy (the only thing that beats hotlink blocking).
  // `next dev` does not run the worker, so fall back to the CDN URL there
  // before giving up on the image entirely.
  const [stage, setStage] = useState<"proxy" | "direct" | "none">("proxy");
  const src = !product.image_url
    ? null
    : stage === "proxy"
      ? `/api/product-image?u=${encodeURIComponent(product.image_url)}`
      : stage === "direct"
        ? product.image_url
        : null;

  return (
    <li className="border border-black/12">
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-ground">
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt=""
            loading="lazy"
            onError={() => setStage(stage === "proxy" ? "direct" : "none")}
            className="h-full w-full object-contain mix-blend-multiply"
          />
        ) : (
          <span className="px-2 text-center text-[12px] leading-tight text-black/62">
            {product.merchant ?? "No image"}
          </span>
        )}
        {product.ours ? (
          <span className="absolute left-0 top-0 bg-[#1f7a4d] px-1.5 py-0.5 text-[12px] font-semibold uppercase tracking-[0.06em] text-white">
            yours
          </span>
        ) : null}
      </div>
      <div className="border-t border-black/10 px-2.5 py-2">
        <p className="line-clamp-2 text-[11.5px] font-semibold leading-snug text-ink-deep">
          {product.title}
        </p>
        <p className="mt-1 text-[11px] leading-snug text-black/48">
          {product.merchant ?? "Merchant"}
          {product.price ? ` · ${product.price}` : ""}
        </p>
        {product.url && product.link_live ? (
          <a
            href={product.url}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex text-[11px] font-semibold text-ink-deep underline decoration-black/24 underline-offset-4 hover:decoration-signal-ink"
          >
            Open product →
          </a>
        ) : null}
      </div>
    </li>
  );
}
function InitialScanSummary({ result }: { result: AnswerCheckResult }) {
  const findings = sortedFindings(result);
  const audits = result.page_audits ?? [];
  const pageAuditStatus =
    result.page_audits_status ?? (audits.length ? "complete" : "not_started");
  const pageAuditsInFlight =
    pageAuditStatus === "queued" || pageAuditStatus === "running";
  const catalogFindings = findings.filter(
    (finding) =>
      finding.source !== "page_audit" && finding.source !== "catalog_sample",
  );
  const consistencyFindings = findings.filter(
    (finding) => finding.source === "catalog_sample",
  );
  const evaluatedChecks = audits.reduce(
    (sum, audit) => sum + audit.checks_evaluated,
    0,
  );
  const failedChecks = audits.reduce(
    (sum, audit) => sum + audit.checks_failed,
    0,
  );

  const market = result.brand_evidence?.market ?? null;
  // Rows written before the inventory stage existed come back as `{}` rather
  // than absent. An empty object is truthy, so every `!inventory` guard below
  // would pass and then dereference `inventory.robots`, taking the whole card
  // down with a client-side exception. Treat an incomplete payload as absent.
  const rawInventory = result.site_inventory;
  const inventory =
    rawInventory?.robots &&
    rawInventory.sitemap &&
    rawInventory.search_crawlers &&
    rawInventory.assistant_crawlers
      ? rawInventory
      : undefined;
  const rawCatalog = result.catalog_inventory;
  const catalog =
    rawCatalog &&
    rawCatalog.products_checked != null &&
    rawCatalog.describability
      ? rawCatalog
      : undefined;
  const rawPageTypes = inventory?.page_types ?? {};
  const entityPageTypes = inventory?.entity_page_types ?? rawPageTypes;
  const siteHosts = Object.keys(inventory?.hosts ?? {});
  const localeCount = inventory?.locales?.length ?? 0;
  const entitySuffix = inventory?.urls_capped ? "+" : "";
  const siteProductCount = entityPageTypes.product ?? 0;
  const productCount =
    catalog && !catalog.products_capped
      ? catalog.products_checked
      : siteProductCount || result.products_seen;
  const productCountSuffix =
    catalog && !catalog.products_capped ? "" : entitySuffix;
  // A measured catalog count is the only one allowed to be called a collection.
  // The URL inventory counts collection *URLs*, which includes locale copies, so
  // it routinely exceeds the real number by an order of magnitude — printing it
  // as "1,346 collections" next to "291 products" is a claim the merchant can
  // disprove from memory, and it discredits every other number on the card.
  const collectionsMeasured = catalog?.collections_status === "measured";
  const collectionCount = collectionsMeasured
    ? Number(catalog?.collections_checked ?? 0)
    : (entityPageTypes.collection ?? 0);
  const collectionCountSuffix = collectionsMeasured
    ? catalog?.collections_capped
      ? "+"
      : ""
    : entitySuffix;
  const collectionNoun = collectionsMeasured
    ? "collections"
    : "collection URLs";
  const contentPageCount = entityPageTypes.page ?? 0;
  const articleCount = entityPageTypes.article ?? 0;
  const blogCount = entityPageTypes.blog ?? 0;
  const policyCount = entityPageTypes.policy ?? 0;
  const inventoryUrlLabel = inventory
    ? `${inventory.urls_discovered}${inventory.urls_capped ? "+" : ""} URLs`
    : `${result.products_seen} products sampled`;
  const robotsLabel = !inventory
    ? "Not measured"
    : inventory.robots.status === "rules_found"
      ? "Readable"
      : inventory.robots.status === "open"
        ? "Open"
        : inventory.robots.status === "unavailable"
          ? "Unavailable"
          : "Not measured";
  const sitemapLabel = !inventory
    ? "Not measured"
    : inventory.sitemap.status === "found"
      ? "Found"
      : inventory.sitemap.status === "declared"
        ? "Declared"
        : inventory.sitemap.status === "not_found"
          ? "Not found"
          : "Not measured";
  const crawlerLabel =
    !inventory || inventory.search_crawlers.status !== "measured"
      ? "Not measured"
      : inventory.search_crawlers.blocked > 0
        ? `${inventory.search_crawlers.blocked} blocked`
        : "Open";
  const discoveryFiles = Object.entries(inventory?.discovery_files ?? {});
  const discoveryFilesPresent = discoveryFiles.filter(
    ([, value]) => value.present === true,
  ).length;
  const internalReach = inventory?.internal_reach;
  const internalReachLabel = !internalReach
    ? "Not measured"
    : internalReach.status === "sampled"
      ? `${internalReach.internal_links ?? 0} homepage links · ${internalReach.product_links ?? 0} product · ${internalReach.collection_links ?? 0} collection`
      : internalReach.status === "not_measured"
        ? "Not measured in quick scan"
        : internalReach.status;

  const siteMapRows = (
    [
      ["Product pages", `${productCount}${productCountSuffix}`],
      [
        collectionsMeasured ? "Collections" : "Collection URLs",
        `${collectionCount}${collectionCountSuffix}`,
      ],
      ["Pages", `${contentPageCount}${entitySuffix}`],
      ["Articles", `${articleCount}${entitySuffix}`],
      ["Blogs", `${blogCount}${entitySuffix}`],
      ["Policies", `${policyCount}${entitySuffix}`],
      [
        "Locale URL copies",
        `${inventory?.localized_url_copies ?? 0}${inventory?.urls_capped ? "+" : ""}`,
      ],
    ] as Array<[string, string]>
  ).filter(([, value]) => Number.parseInt(value, 10) > 0);

  const staticAreas = [
    { label: "Search & page signals", domains: ["seo"] },
    { label: "Product & shopping data", domains: ["shopping"] },
    { label: "Content & merchandising", domains: ["aeo", "cro", "geo"] },
    { label: "Trust & purchase confidence", domains: ["eeat", "compliance"] },
    { label: "Markets & localization", domains: ["i18n"] },
    { label: "Technical & security", domains: ["security"] },
  ].map((area) => {
    const counts = audits.reduce(
      (acc, audit) => {
        for (const domain of area.domains) {
          const row = audit.domain_counts?.[domain];
          if (!row) continue;
          acc.evaluated += Number(row.evaluated ?? 0);
          acc.failed += Number(row.failed ?? 0);
          acc.unevaluated += Number(row.unevaluated ?? 0);
        }
        return acc;
      },
      { evaluated: 0, failed: 0, unevaluated: 0 },
    );
    return { ...area, ...counts };
  });

  const Fold = ({
    title,
    summary,
    children,
  }: {
    title: string;
    summary: string;
    children: React.ReactNode;
  }) => (
    // Level 2 in the card's depth scale: anything openable sits on the warm
    // ground so it reads as a lid, and its contents open onto white. Before
    // this, every section and every row was the same white and the card was one
    // undifferentiated sheet.
    // Summary first. The merchant can open the catalog/page evidence when it
    // helps, without making every technical section compete on first render.
    <details className="group/fold border-b border-black/14 bg-[#fffaf7]">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-4 transition-colors hover:bg-[#fdf1e9] sm:px-6 [&::-webkit-details-marker]:hidden">
        <div className="min-w-0">
          <h3 className="text-[14px] font-semibold text-ink-deep">{title}</h3>
          <p className="mt-1 text-[12.5px] leading-relaxed text-black/56">
            {summary}
          </p>
        </div>
        <span className="flex min-h-11 shrink-0 items-center gap-2 text-[12px] font-semibold text-ink-deep">
          <span className="group-open/fold:hidden">Details</span>
          <span className="hidden group-open/fold:inline">Close</span>
          <ChevronDown
            className="h-4 w-4 transition-transform group-open/fold:rotate-180"
            aria-hidden="true"
          />
        </span>
      </summary>
      <div className="border-t border-black/12 bg-white">{children}</div>
    </details>
  );

  const catalogCheckedLabel = catalog
    ? `${catalog.products_checked}${catalog.products_capped ? "+" : ""} products checked`
    : `${result.products_seen} products sampled`;

  // Store, Catalog and Product pages each already collapse on their own. An
  // outer disclosure around them was a fold inside a fold — two clicks and a
  // paragraph of preamble between the merchant and a number they can read. The
  // three rows now sit directly on the card and speak for themselves.
  return (
    <section className="border-b border-black/14 bg-white">
      <Fold
        title="Store"
        summary={
          inventory
            ? `${productCount}${productCountSuffix} products · ${collectionCount}${collectionCountSuffix} ${collectionNoun} · ${localeCount ? `${localeCount} locale paths` : (market ?? "primary storefront")} · sitemap ${sitemapLabel.toLowerCase()} · crawler access ${crawlerLabel.toLowerCase()}`
            : `${result.brand ?? result.domain} · ${result.platform ?? "platform unknown"}`
        }
      >
        <div className="grid gap-px bg-black/10 sm:grid-cols-4">
          <div className="bg-white px-5 py-4 sm:px-6">
            <p className="text-[11px] text-black/42">Store</p>
            <p className="mt-1 text-[12.5px] font-semibold text-ink-deep">
              {result.brand ?? result.domain}
            </p>
            <p className="mt-0.5 text-[11px] text-black/48">
              {result.platform ?? "Storefront"}
            </p>
          </div>
          <div className="bg-white px-5 py-4">
            <p className="text-[11px] text-black/42">Public footprint</p>
            <p className="mt-1 text-[12.5px] font-semibold text-ink-deep">
              {inventoryUrlLabel}
            </p>
            <p className="mt-0.5 text-[11px] text-black/48">
              {inventory?.localized_url_copies
                ? `${inventory.localized_url_copies}+ localized URL copies`
                : "Public URLs discovered"}
            </p>
          </div>
          <div className="bg-white px-5 py-4">
            <p className="text-[11px] text-black/42">Locale paths</p>
            <p className="mt-1 text-[12.5px] font-semibold text-ink-deep">
              {localeCount || "Primary"}
            </p>
            <p className="mt-0.5 text-[11px] text-black/48">
              {inventory?.locales.length
                ? inventory.locales.join(", ")
                : (market ?? "Primary storefront")}
            </p>
          </div>
          <div className="bg-white px-5 py-4 sm:px-6">
            <p className="text-[11px] text-black/42">Domains</p>
            <p className="mt-1 text-[12.5px] font-semibold text-ink-deep">
              {siteHosts.length || 1}
            </p>
            <p className="mt-0.5 truncate text-[11px] text-black/48">
              {siteHosts.join(", ") || result.domain}
            </p>
          </div>
        </div>

        {inventory ? (
          <div className="border-t border-black/10 bg-[#fffaf7] px-5 py-5 sm:px-6">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
              <div>
                <p className="text-[11px] font-semibold text-ink-deep">
                  What exists
                </p>
                <div className="mt-3 grid grid-cols-2 gap-px border border-black/10 bg-black/10 sm:grid-cols-3 lg:grid-cols-2">
                  {siteMapRows.map(([label, count]) => (
                    <div key={label} className="bg-white px-3 py-3">
                      <p className="text-[11px] text-black/44">{label}</p>
                      <p className="mt-1 text-[18px] font-semibold text-ink-deep tabular-nums">
                        {count}
                      </p>
                    </div>
                  ))}
                </div>
                {inventory.urls_capped ? (
                  <p className="mt-2 text-[11px] leading-relaxed text-black/42">
                    Counts with + are lower bounds because the quick URL
                    inventory reached its 5,000-URL cap.
                  </p>
                ) : null}
              </div>

              <div>
                <p className="text-[11px] font-semibold text-ink-deep">
                  Can it be discovered?
                </p>
                <dl className="mt-3 divide-y divide-black/10 border-y border-black/10 bg-white">
                  {[
                    [
                      "robots.txt",
                      robotsLabel,
                      inventory.robots.status === "unavailable",
                    ],
                    [
                      "Sitemap",
                      `${sitemapLabel}${inventory.sitemap.urls_from_sitemap ? ` · ${inventory.sitemap.urls_from_sitemap}${inventory.urls_capped ? "+" : ""} URLs` : ""}`,
                      inventory.sitemap.status === "not_found",
                    ],
                    [
                      "Search crawlers",
                      inventory.search_crawlers.status === "measured"
                        ? `${inventory.search_crawlers.allowed}/${inventory.search_crawlers.total} allowed`
                        : "Not measured",
                      inventory.search_crawlers.blocked > 0,
                    ],
                    [
                      "Assistant crawlers",
                      inventory.assistant_crawlers.status === "measured"
                        ? `${inventory.assistant_crawlers.allowed}/${inventory.assistant_crawlers.total} allowed`
                        : "Not measured",
                      inventory.assistant_crawlers.blocked > 0,
                    ],
                    [
                      "URLs blocked by robots",
                      inventory.robots.blocked_urls == null
                        ? "Not measured"
                        : String(inventory.robots.blocked_urls),
                      Number(inventory.robots.blocked_urls ?? 0) > 0,
                    ],
                    ["Internal reach", internalReachLabel, false],
                    [
                      "Orphan products",
                      internalReach?.orphan_products === "not_measured"
                        ? "Not measured in quick scan"
                        : (internalReach?.orphan_products ?? "Not measured"),
                      false,
                    ],
                    // Each discovery file gets its own row. Summarising them as
                    // "2/4 found" and then listing the four as loose chips under
                    // the table left merchants asking why those boxes were not
                    // part of the table they were sitting beneath.
                    ...(discoveryFiles.length
                      ? discoveryFiles.map(([path, value]) => [
                          path,
                          value.present
                            ? "Found"
                            : value.present === false
                              ? "Not found"
                              : "Not measured",
                          false,
                        ])
                      : [["Discovery files", "Not measured", false]]),
                    [
                      "Sitemap freshness",
                      inventory.sitemap.dated_urls
                        ? `${inventory.sitemap.dated_urls}${inventory.urls_capped ? "+" : ""} dated URLs`
                        : "No dates exposed",
                      false,
                    ],
                    [
                      "Images in sitemap",
                      inventory.sitemap.image_entries
                        ? `${inventory.sitemap.image_entries}${inventory.urls_capped ? "+" : ""} references`
                        : "No image entries exposed",
                      false,
                    ],
                  ].map(([label, value, warn]) => (
                    <div
                      key={String(label)}
                      className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 px-3 py-2.5"
                    >
                      <dt className="text-[11px] text-black/50">
                        {label}
                        {DISCOVERY_FILE_NOTES[String(label)] ? (
                          <span className="mt-0.5 block text-[10.5px] leading-snug text-black/38">
                            {DISCOVERY_FILE_NOTES[String(label)]}
                          </span>
                        ) : null}
                      </dt>
                      <dd
                        className={`text-right text-[11px] font-semibold ${warn ? "text-signal-ink" : "text-ink-deep"}`}
                      >
                        {String(value)}
                      </dd>
                    </div>
                  ))}
                </dl>
                {internalReach?.status === "sampled" ? (
                  <p className="mt-2 text-[11px] leading-relaxed text-black/42">
                    Homepage paths are sampled here. True orphan coverage needs
                    the full internal-link graph.
                  </p>
                ) : null}
                {discoveryFiles.length ? (
                  <p className="mt-2 text-[11px] leading-relaxed text-black/42">
                    Those four are emerging conventions for telling AI
                    assistants what your store is and how to use it.{" "}
                    {discoveryFilesPresent} of {discoveryFiles.length} are
                    published. <strong>None of them is required</strong>, none
                    is known to affect how you rank in search today, and a
                    missing one is not a fault. We report them because the
                    stores that publish them are easier for assistants to read
                    correctly — not because you are doing anything wrong without
                    them.
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
      </Fold>

      <Fold
        title="Catalog"
        summary={
          catalog
            ? `${catalogCheckedLabel} · ${catalog.products_with_gaps} need attention · ${catalog.unavailable_products} unavailable${consistencyFindings.length ? ` · ${consistencyFindings.length} sampled consistency gaps` : ""}`
            : `${catalogFindings.length} catalog ${catalogFindings.length === 1 ? "gap" : "gaps"}`
        }
      >
        {catalog ? (
          <div className="bg-[#fffaf7] px-5 py-5 sm:px-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-[13px] font-semibold text-ink-deep">
                  Can products be understood and distinguished?
                </p>
                <p className="mt-1 text-[11.5px] text-black/50">
                  {catalogCheckedLabel}
                  {catalog.products_capped
                    ? " · counts below cover the products checked"
                    : ""}
                </p>
              </div>
              <span className="text-[11px] text-black/44">
                {catalog.products_with_gaps} products with at least one gap
              </span>
            </div>

            <div className="mt-4 grid gap-px border border-black/10 bg-black/10 md:grid-cols-2 xl:grid-cols-3">
              <div className="bg-white p-4">
                <p className="text-[11px] font-semibold text-ink-deep">
                  Categories & collections
                </p>
                <p className="mt-2 text-[18px] font-semibold text-ink-deep">
                  {catalog.missing_product_types}{" "}
                  <span className="text-[11px] font-normal text-black/46">
                    without category
                  </span>
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-black/48">
                  {catalog.product_type_count ?? 0} product types ·{" "}
                  {collectionCount}
                  {collectionCountSuffix} {collectionNoun} ·{" "}
                  {catalog.missing_tags} without tags
                </p>
                <p className="mt-2 text-[11px] text-black/38">
                  Collection membership:{" "}
                  {catalog.collection_membership?.status === "not_measured"
                    ? "not measured in quick scan"
                    : (catalog.collection_membership?.status ?? "not measured")}
                </p>
                {catalog.top_product_types?.length ? (
                  <p className="mt-2 line-clamp-2 text-[11px] text-black/46">
                    Common product types:{" "}
                    {catalog.top_product_types
                      .slice(0, 4)
                      .map((item) => item.name)
                      .join(" · ")}
                  </p>
                ) : null}
                {catalog.collection_titles?.length ? (
                  <p className="mt-1 line-clamp-2 text-[11px] text-black/46">
                    Collections:{" "}
                    {catalog.collection_titles.slice(0, 4).join(" · ")}
                  </p>
                ) : null}
              </div>
              <div className="bg-white p-4">
                <p className="text-[11px] font-semibold text-ink-deep">
                  Product identity
                </p>
                <p className="mt-2 text-[18px] font-semibold text-ink-deep">
                  {catalog.missing_identifiers}{" "}
                  <span className="text-[11px] font-normal text-black/46">
                    without SKU/barcode
                  </span>
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-black/48">
                  {catalog.placeholder_vendors} brand/vendor gaps ·{" "}
                  {catalog.identifier_conflicts} identifier conflicts
                </p>
              </div>
              <div className="bg-white p-4">
                <p className="text-[11px] font-semibold text-ink-deep">
                  Variants & buyer options
                </p>
                <p className="mt-2 text-[18px] font-semibold text-ink-deep">
                  {catalog.multi_variant_products}{" "}
                  <span className="text-[11px] font-normal text-black/46">
                    products with variants
                  </span>
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-black/48">
                  {catalog.default_only_options} expose no buyer options ·{" "}
                  {catalog.variant_option_gaps ?? 0} true variant-option gaps ·{" "}
                  {catalog.variant_identifier_gaps} variant ID gaps
                </p>
                {catalog.option_dimensions?.length ? (
                  <p className="mt-2 line-clamp-2 text-[11px] text-black/46">
                    Options:{" "}
                    {catalog.option_dimensions
                      .slice(0, 5)
                      .map((item) => item.name)
                      .join(" · ")}
                  </p>
                ) : null}
              </div>
              <div className="bg-white p-4">
                <p className="text-[11px] font-semibold text-ink-deep">
                  Product information
                </p>
                <p className="mt-2 text-[18px] font-semibold text-ink-deep">
                  {catalog.describability.strong}{" "}
                  <span className="text-[11px] font-normal text-black/46">
                    well described
                  </span>
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-black/48">
                  {catalog.missing_descriptions} missing descriptions ·{" "}
                  {catalog.thin_descriptions} thin · {catalog.missing_images}{" "}
                  without images · {catalog.duplicate_description_products}{" "}
                  duplicate copy
                </p>
              </div>
              <div className="bg-white p-4">
                <p className="text-[11px] font-semibold text-ink-deep">
                  Availability
                </p>
                <p
                  className={`mt-2 text-[18px] font-semibold ${catalog.unavailable_products ? "text-signal-ink" : "text-ink-deep"}`}
                >
                  {catalog.unavailable_products}{" "}
                  <span className="text-[11px] font-normal text-black/46">
                    unavailable products
                  </span>
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-black/48">
                  {catalog.total_variants} variants across{" "}
                  {catalog.products_checked} checked products
                </p>
              </div>
              <div className="bg-white p-4">
                <p className="text-[11px] font-semibold text-ink-deep">
                  Product consistency
                </p>
                {pageAuditsInFlight ? (
                  <div className="mt-2 flex items-center gap-2 text-[11px] text-black/52">
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-signal-ink" />
                    Comparing sample product pages…
                  </div>
                ) : (
                  <p className="mt-2 text-[18px] font-semibold text-ink-deep">
                    {consistencyFindings.length}{" "}
                    <span className="text-[11px] font-normal text-black/46">
                      sampled gaps
                    </span>
                  </p>
                )}
                <p className="mt-1 text-[11px] leading-relaxed text-black/48">
                  Catalog ↔ page data for price, availability, product data and
                  buyer attributes on {audits.length || result.products_seen}{" "}
                  sample product pages.
                </p>
              </div>
            </div>

            {catalogFindings.length ? (
              <div className="mt-5 border-t border-black/10 pt-4">
                <p className="text-[11px] font-semibold text-ink-deep">
                  What stands out
                </p>
                <ul className="mt-2 divide-y divide-black/10 border-y border-black/10 bg-white px-3">
                  {catalogFindings.map((finding, index) => (
                    <li
                      key={`${finding.code}-${index}`}
                      className="flex items-start justify-between gap-4 py-3"
                    >
                      <div>
                        <p className="text-[11.5px] font-semibold text-ink-deep">
                          {finding.title}
                        </p>
                        <p className="mt-1 text-[11px] leading-relaxed text-black/50">
                          {finding.detail}
                        </p>
                      </div>
                      {finding.severity === "high" ||
                      finding.severity === "blocker" ? (
                        <span className="shrink-0 text-[11px] font-semibold uppercase text-signal-ink">
                          High
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="bg-white px-5 py-4 text-[12.5px] text-black/54 sm:px-6">
            Catalog-wide detail is limited on this storefront; the
            representative product pages continue below.
          </div>
        )}
      </Fold>
      <Fold
        title="Product pages"
        summary={
          pageAuditsInFlight
            ? `${result.products_seen} product pages · reading now`
            : pageAuditStatus === "failed"
              ? `${result.products_seen} product pages · we could not finish reading them`
              : audits.length === 0
                ? "Representative product-page inspection was not available in this run"
                : `${audits.length} product ${audits.length === 1 ? "page" : "pages"} read · ${failedChecks} of ${evaluatedChecks} checks need attention · ${staticAreas.reduce((sum, area) => sum + area.unevaluated, 0)} we could not check`
        }
      >
        {pageAuditsInFlight ? (
          <div className="flex items-start gap-3 bg-white px-5 py-5 sm:px-6">
            <Loader2 className="mt-0.5 h-4 w-4 animate-spin text-signal-ink" />
            <div>
              <p className="text-[12.5px] font-semibold text-ink-deep">
                Inspecting {result.products_seen} representative product pages
              </p>
              <p className="mt-1 text-[11.5px] text-black/50">
                Store and catalog evidence is already available above.
                Page-level results will appear here automatically.
              </p>
            </div>
          </div>
        ) : pageAuditStatus === "failed" ? (
          <p className="bg-white px-5 py-4 text-[12px] text-black/54 sm:px-6">
            The Store and Catalog observations are still valid. The
            representative PDP inspection could not complete on this run.
          </p>
        ) : (
          <>
            <div className="border-b border-black/12 bg-[#fffaf7] px-5 py-4 sm:px-6">
              <p className="text-[11px] font-semibold text-ink-deep">
                What the sample product pages show
              </p>
              <div className="mt-3 grid gap-px border border-black/10 bg-black/10 sm:grid-cols-2 lg:grid-cols-3">
                {staticAreas.map((area) => (
                  <div key={area.label} className="bg-white px-3 py-3">
                    <p className="text-[11px] font-semibold leading-snug text-ink-deep">
                      {area.label}
                    </p>
                    <div className="mt-2 flex items-baseline justify-between gap-2">
                      <span
                        className={`text-[16px] font-semibold ${area.failed ? "text-signal-ink" : "text-ink-deep"}`}
                      >
                        {area.failed} need attention
                      </span>
                      <span className="text-[11px] text-black/42">
                        of {area.evaluated} checked
                        {area.unevaluated
                          ? ` · ${area.unevaluated} we could not check`
                          : ""}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <ul className="divide-y divide-black/10 bg-white">
              {audits.map((audit, index) => (
                <li
                  key={audit.url}
                  className="grid gap-3 px-5 py-3.5 sm:grid-cols-[28px_minmax(0,1fr)_auto_auto] sm:items-center sm:px-6"
                >
                  <span className="font-mono text-[11px] text-black/38">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-[12.5px] font-semibold text-ink-deep">
                      {audit.title ?? audit.url}
                    </p>
                    <p className="mt-0.5 truncate text-[11px] text-black/44">
                      {audit.url}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] sm:justify-end">
                    {audit.score != null ? (
                      <span className="font-semibold text-ink-deep">
                        Health {Math.round(audit.score)}
                      </span>
                    ) : null}
                    <span
                      className={
                        audit.checks_failed > 0
                          ? "font-semibold text-signal-ink"
                          : "text-black/48"
                      }
                    >
                      {audit.checks_failed} of {audit.checks_evaluated} need
                      attention
                    </span>
                  </div>
                  {audit.report_id ? (
                    <a
                      href={`${APP_REPORT_URL}/${audit.report_id}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 justify-self-start text-[11.5px] font-semibold text-ink-deep underline decoration-black/18 underline-offset-4 hover:text-signal-ink hover:decoration-signal-ink sm:justify-self-end"
                    >
                      Open the page report{" "}
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  ) : (
                    <span className="justify-self-start text-[11px] text-black/34 sm:justify-self-end">
                      Report unavailable
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </>
        )}
      </Fold>
    </section>
  );
}

// Section numbers went with the sections. There is one disclosure left, so a
// “02” in front of it numbered a sequence that no longer exists.
function ScanDisclosure({
  title,
  summary,
  children,
  defaultOpen = false,
}: {
  title: string;
  summary: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details
      open={defaultOpen}
      className="group/section border-b border-black/14 bg-[#fffaf7]"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-4 transition-colors hover:bg-[#fdf1e9] sm:px-6 [&::-webkit-details-marker]:hidden">
        <div className="min-w-0">
          <h3 className="text-[15px] font-semibold text-ink-deep">{title}</h3>
          <p className="mt-1 text-[12.5px] text-black/56">{summary}</p>
        </div>
        <span className="flex min-h-11 shrink-0 items-center gap-2 text-[12px] font-semibold text-ink-deep">
          <span className="group-open/section:hidden">Details</span>
          <span className="hidden group-open/section:inline">Close</span>
          <ChevronDown
            className="h-4 w-4 transition-transform group-open/section:rotate-180"
            aria-hidden="true"
          />
        </span>
      </summary>
      <div className="border-t border-black/14 bg-white">{children}</div>
    </details>
  );
}

/**
 * What continuing actually adds, stated before the ask rather than hidden
 * behind padlocks. The previous version showed three locked rows with no
 * explanation, which reads as a paywall for something the visitor cannot value
 * — and this stage is free, so a paywall was the wrong story entirely.
 */
function DeeperAnalysisPanel({
  result,
  gate,
}: {
  result: AnswerCheckResult;
  gate: React.ReactNode;
}) {
  // Two distinct things open up, and both are gated by the same one click:
  // the answer probe (`execute_probe`) and the per-page AI interpretation
  // (`/pdp/public/pdp-audit/{id}/complete-ai`, which is handed the failed
  // checks above plus the real page copy and returns concrete suggestions).
  // Only advertising the first one undersold what confirming actually buys.
  const adds = [
    [
      "AI reads your pages and says what to change",
      "Open any product page report and AI goes through the page next to the findings above, then writes back concrete improvements and the page copy it based them on.",
    ],
    [
      "What shoppers are told today",
      `Questions written from the ${countLabel(result.products_seen, "product")} we just read, put to ChatGPT and Google AI Mode, with the answers recorded.`,
    ],
    [
      "Who gets named when you do not",
      "The competing brands and products that appear in place of yours.",
    ],
  ] as const;

  return (
    <section className="border-b border-black/14 bg-white">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div className="border-b border-black/12 bg-white px-5 py-6 sm:px-6 lg:border-b-0 lg:border-r">
          {/* Merchant-facing only. What this costs Beseam to run is our
              problem, not something to put in front of someone deciding
              whether to trust us. */}
          <h3 className="text-[19px] font-semibold tracking-[-0.02em] text-ink-deep">
            Let AI go through your store with you
          </h3>
          <p className="mt-1.5 max-w-[52ch] text-[13.5px] leading-relaxed text-black/62">
            Everything above is yours already. Next, AI reads your product pages
            alongside these findings and writes back what to change, and your
            shoppers’ own questions go to ChatGPT and Google AI Mode so you can
            see what they are told today. Confirm your email to open both.
          </p>
          <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12.5px] font-medium text-[#3b3833]">
            {["Free", "No account", "One email, no marketing list"].map(
              (item) => (
                <span key={item} className="inline-flex items-center gap-1.5">
                  <Check
                    aria-hidden="true"
                    className="h-3.5 w-3.5 text-[#1f7a4d]"
                  />
                  {item}
                </span>
              ),
            )}
          </p>
          <dl className="mt-5 border-t border-black/12">
            {adds.map(([term, detail]) => (
              <div key={term} className="border-b border-black/12 py-3">
                <dt className="flex items-start gap-2 text-[13.5px] font-semibold text-ink-deep">
                  <MailCheck
                    aria-hidden="true"
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-black/38"
                  />
                  {term}
                </dt>
                <dd className="mt-1 pl-[1.375rem] text-[12.5px] leading-relaxed text-black/58">
                  {detail}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        {/* The one ask on the card gets its own ground and a little more air
            than the explanation beside it. */}
        <div className="bg-[#fffaf7] px-5 py-6 sm:px-6">{gate}</div>
      </div>
    </section>
  );
}

/**
 * One question, expandable into what each assistant did with it.
 *
 * `probe.py` keeps the reduction, not the prose: `_summarize()` records whether
 * you were named, who was named instead, and the product cards the surface put
 * up — `fetched.raw_response` is parsed and dropped. So this shows exactly what
 * was observed and never implies we kept an answer we did not.
 */
/**
 * Beseam's own read of one question, derived only from what was recorded.
 * `probe.py` keeps no answer prose, so this states the counts and the names —
 * never a paraphrase of something we did not keep.
 */
function questionVerdict(answers: Answer[]) {
  const scored = answers.filter((answer) => answer.mentioned !== null);
  if (!scored.length) return "No assistant returned a usable answer here.";

  const named = scored.filter((answer) => answer.mentioned === true).length;
  const rivals = Array.from(
    new Set(
      scored
        .filter((answer) => answer.mentioned === false)
        .flatMap((answer) =>
          (answer.competitors ?? []).map((raw) => rivalIdentity(raw).label),
        ),
    ),
  ).filter(Boolean);

  const assistants = countLabel(scored.length, "assistant");
  const tail = rivals.length
    ? ` ${rivals.slice(0, 3).join(", ")} ${rivals.length === 1 ? "was" : "were"} put forward instead.`
    : "";

  if (named === scored.length) {
    return `You were named by ${named === 1 ? "the assistant" : `all ${assistants}`} asked this question.`;
  }
  if (named === 0) {
    return `None of the ${assistants} asked this question named you.${tail}`;
  }
  return `${named} of ${assistants} named you.${tail}`;
}

function QuestionRow({
  question,
  answers,
}: {
  question: string;
  answers: Answer[];
}) {
  const products = shownProducts(answers);

  return (
    <li className="border-t border-black/12">
      {/* Named group: this sits inside ScanDisclosure's own open <details
          class="group">, so a bare `group-open:` would read that ancestor's
          state and render every chevron pre-rotated. */}
      <details className="group/question">
        <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-4 py-3.5 transition-colors hover:bg-[#fffaf7] sm:px-5 [&::-webkit-details-marker]:hidden">
          <div className="min-w-0">
            <p className="text-[13.5px] font-medium leading-snug text-ink-deep">
              “{question}”
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1.5">
              {answers.map((answer, index) => (
                <ChannelChip
                  key={`${answer.channel_label}-${index}`}
                  channel={answer.channel_label ?? "Assistant"}
                  answer={answer}
                />
              ))}
            </div>
          </div>
          <ChevronDown
            className="mt-1 h-4 w-4 shrink-0 text-black/40 transition-transform group-open/question:rotate-180"
            aria-hidden="true"
          />
        </summary>

        <div className="grid items-start border-t border-black/10 bg-white lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
          {/* Left: the exchange, read-only. Square bubbles and hairline rules
              rather than the rounded chat idiom — this is the same visual world
              as the rest of the card, and it is a record, not a live thread.
              There is deliberately no input: we cannot continue this
              conversation on the merchant's behalf, so offering a box would be
              a lie about what the page can do. */}
          <div className="border-b border-black/10 px-4 py-4 sm:px-5 lg:border-b-0 lg:border-r">
            <div className="flex justify-end">
              <p className="max-w-[85%] bg-ink-deep px-3.5 py-2.5 text-[13px] leading-[1.55] text-white">
                {question}
              </p>
            </div>
            <p className="mt-1.5 text-right text-[11px] text-black/40">
              {answers.length === 1
                ? "asked to 1 assistant"
                : `asked to each of ${countLabel(answers.length, "assistant")} separately`}
            </p>

            <ul className="mt-4 space-y-5">
              {answers.map((answer, index) => {
                const instead = Array.from(
                  new Set(
                    (answer.competitors ?? []).map(
                      (raw) => rivalIdentity(raw).label,
                    ),
                  ),
                ).filter(Boolean);
                const said = answer.framing?.trim();
                const channel = answer.channel_label ?? "Assistant";

                return (
                  <li key={`${channel}-${index}`}>
                    <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] font-semibold text-ink-deep">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center border border-black/14 bg-white">
                        <ChannelIcon
                          channel={
                            CHANNEL_BRAND_KEYS[channel.toLowerCase()] ?? channel
                          }
                          className="h-3 w-3 opacity-80"
                        />
                      </span>
                      {channel}
                    </p>

                    {/* The engine rewrites the question before it searches, so
                        the answer is a reply to these words, not the shopper's.
                        Named for what it is — a Google search — rather than for
                        how we collected it. */}
                    {answer.search_queries?.length ? (
                      <p className="mt-1.5 text-[11.5px] leading-relaxed text-black/50">
                        <span className="font-semibold">Google search: </span>
                        {answer.search_queries
                          .slice(0, 3)
                          .map((q) => `“${q}”`)
                          .join(", ")}
                      </p>
                    ) : null}

                    {said ? (
                      <div className="mt-1.5 border border-black/14 bg-[#fbfaf9]">
                        <p className="px-3.5 py-2.5 text-[13px] leading-[1.6] text-ink-deep">
                          {said}
                        </p>
                        {/* Never let this read as the whole reply. The parser
                            keeps a summary line; the full provider payload is
                            not retained. */}
                        <p className="border-t border-black/10 px-3.5 py-1.5 text-[11px] text-black/40">
                          Excerpt of what came back · not the full reply
                        </p>
                      </div>
                    ) : answer.error ? (
                      <p className="mt-1.5 border border-dashed border-black/16 px-3.5 py-2.5 text-[12.5px] leading-relaxed text-black/48">
                        {channel} could not be reached: {answer.error}
                      </p>
                    ) : (answer.products?.length ?? 0) > 0 ||
                      instead.length > 0 ||
                      answer.mentioned !== null ? null : (
                      // Only when there is genuinely nothing to report. If the
                      // engine returned a verdict, competitors or products, the
                      // summary line directly below already says what happened
                      // — an apology stacked on top of it reads as a broken scan
                      // rather than as a thin answer.
                      <p className="mt-1.5 border border-dashed border-black/16 px-3.5 py-2.5 text-[12.5px] leading-relaxed text-black/48">
                        {channel} returned no written answer for this question.
                      </p>
                    )}

                    <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12.5px]">
                      <span
                        className={`font-semibold ${answer.mentioned === true ? "text-[#1a6b43]" : answer.mentioned === false ? "text-signal-ink" : "text-black/56"}`}
                      >
                        {answer.mentioned === true
                          ? "Named you"
                          : answer.mentioned === false
                            ? "Did not name you"
                            : "No verdict"}
                      </span>
                      {instead.length ? (
                        <span className="text-black/62">
                          · named instead: {instead.join(", ")}
                        </span>
                      ) : null}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right: everything the surfaces put in front of the shopper for
              this question, then what it adds up to. */}
          <div className="px-4 py-3.5 sm:px-5">
            <p className="text-[12px] font-semibold text-black/62">
              {products.length
                ? "Products put in front of the shopper"
                : "No products were surfaced"}
            </p>
            {/* Bounded: a question that surfaced eight products would otherwise
                tower over the transcript beside it and leave the left column a
                column of white. The shelf scrolls instead. */}
            {products.length ? (
              <ul className="mt-2.5 grid max-h-[24rem] grid-cols-2 gap-2 overflow-y-auto pr-1 sm:grid-cols-3 lg:grid-cols-2">
                {products.map((product) => (
                  <ProductTile
                    key={`${product.title}-${product.merchant ?? ""}`}
                    product={product}
                  />
                ))}
              </ul>
            ) : null}

            <div className="mt-4 border-t border-black/10 pt-3">
              <p className="text-[12px] font-semibold text-black/62">
                What this adds up to
              </p>
              <p className="mt-1.5 max-w-[46ch] text-[13px] leading-relaxed text-ink-deep">
                {questionVerdict(answers)}
              </p>
            </div>
          </div>
        </div>
      </details>
    </li>
  );
}
function VisibilityDisclosure({ result }: { result: AnswerCheckResult }) {
  const scored = result.answers.filter((answer) => answer.mentioned !== null);
  const named = scored.filter((answer) => answer.mentioned === true).length;
  const rivals = tallyRivals(result.answers).slice(0, RIVAL_LIMIT);
  const rows = result.questions
    .map((question) => ({
      question,
      answers: result.answers.filter((answer) => answer.question === question),
    }))
    .filter((row) => row.answers.length > 0);

  return (
    <ScanDisclosure
      defaultOpen
      title="How you appear when shoppers ask"
      summary={
        scored.length > 0
          ? `${named}/${scored.length} observed answers named you · ${rows.length} buying ${rows.length === 1 ? "question" : "questions"}`
          : "Checking what shoppers are being shown"
      }
    >
      <AiVisibilityWorkspace result={result} />

      {rows.length > 0 ? (
        <div className="border-t border-black/18 bg-white">
          {rivals.length > 0 ? (
            <div className="px-4 py-4 sm:px-5">
              <p className="text-[12px] font-semibold text-black/62">
                Competitors named when you were not
              </p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2 sm:gap-x-10">
                {rivals.map((rival) => (
                  <li key={rival.label} className="flex items-center gap-3">
                    <span
                      className="w-[8.5rem] shrink-0 truncate text-[12.5px] text-black/70"
                      title={rival.label}
                    >
                      {rival.label}
                    </span>
                    <span className="h-1 flex-1 bg-black/8">
                      <span
                        className="block h-full bg-[#d95028]"
                        style={{
                          width: `${(rival.count / rivals[0].count) * 100}%`,
                        }}
                      />
                    </span>
                    <span className="w-8 shrink-0 text-right font-mono text-[12px] text-black/62">
                      {rival.count}×
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="border-t border-black/12">
            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 px-4 pb-1 pt-4 sm:px-5">
              <p className="text-[12px] font-semibold text-black/62">
                Open a question to see what each assistant answered
              </p>
              {questionLanguageBadge(result) ? (
                <span className="shrink-0 rounded-full border border-black/16 px-2 py-0.5 text-[10.5px] font-medium text-black/58">
                  Asked in {questionLanguageBadge(result)}
                </span>
              ) : null}
            </div>
            <ul>
              {rows.map((row) => (
                <QuestionRow
                  key={row.question}
                  question={row.question}
                  answers={row.answers}
                />
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </ScanDisclosure>
  );
}
// `AiAuditDisclosure` lived here: a second, technical rendering of the same
// findings the card now leads with in plain words. Two lists of one set of
// findings is the duplication this redesign exists to remove — the technical
// reading moved under each finding's "What we saw", and the per-page numbers
// live in Full evidence.

/**
 * The one sentence a merchant would repeat to their team. It replaces the
 * separate "Owner takeaway" card that used to float above the result and state
 * the run status a second time.
 */
function ScanHeadline({ result }: { result: AnswerCheckResult }) {
  const brand = result.brand || result.domain;
  const scored = result.answers.filter((answer) => answer.mentioned !== null);
  const missed = scored.filter((answer) => answer.mentioned === false).length;
  const findings = result.findings.length;
  const running = isScanInFlight(result);

  let headline: string;
  let support: string | null = null;

  if (scored.length) {
    headline =
      missed === 0
        ? `${brand} was named in all ${scored.length} assistant answers we sampled.`
        : missed === scored.length
          ? `${brand} was named in none of the ${scored.length} assistant answers we sampled.`
          : `${brand} was missing from ${missed} of the ${scored.length} assistant answers we sampled.`;
    support =
      "These are point-in-time samples, not a ranking. They show what shoppers were told when we asked.";
  } else if (findings) {
    headline = `We read ${brand}’s public storefront and found ${countLabel(findings, "thing")} worth looking at.`;
    support = running
      ? "More may follow as your product pages finish reading."
      : "Each one is written below in plain words, with the evidence kept underneath it.";
  } else if (running) {
    headline = `Reading ${brand}’s storefront now.`;
    support = "Results appear below as each part finishes.";
  } else {
    headline = `Nothing obvious stood out on the ${brand} pages we could read.`;
    support =
      "That is a good sign, but a public scan of a few pages cannot rule everything out.";
  }

  return (
    // The one statement of the whole page sits on the warm ground, so the
    // result opens as a sentence rather than as the top of a table.
    <section className="border-b border-black/14 bg-[#fffaf7] px-5 py-7 sm:px-6 sm:py-8">
      <p className="max-w-[30ch] text-balance font-display text-[clamp(1.65rem,3.4vw,2.4rem)] font-normal leading-[1.1] tracking-[-0.024em] text-ink-deep">
        {headline}
      </p>
      {support ? (
        <p className="mt-3 max-w-[62ch] text-[14px] leading-[1.62] text-black/58">
          {support}
        </p>
      ) : null}
    </section>
  );
}

/**
 * The scan could not read this storefront. Say which of the three things went
 * wrong, in the merchant's terms, and leave both recovery routes open — a
 * dead end here is a visitor lost at the moment they were most interested.
 */
function RejectedNotice({ result }: { result: AnswerCheckResult }) {
  const reason = result.reject_reason ?? "";
  const blocked = reason.toLowerCase().includes("blocked");
  const noProducts = reason.toLowerCase().includes("product pages");

  const explanation = blocked
    ? "Your storefront turned our request away. That is usually a firewall or bot-protection rule, and it does not mean anything is wrong with your store."
    : noProducts
      ? "We reached the site but could not find public product pages on it. That happens with storefronts that render products only after login, or that are not a shop at all."
      : "The domain did not answer a public request. It may be misspelled, parked, or temporarily down.";

  const suggestions = blocked
    ? [
        "Check the domain is the storefront shoppers use, not a staging or admin address.",
        "Ask whoever maintains the store whether bot protection is blocking outside readers. The same rule usually blocks search engines too.",
      ]
    : noProducts
      ? [
          "Try the domain shoppers actually browse products on, including any market prefix.",
          "If your products are only visible after login, a public scan cannot reach them, but we can look at them with you.",
        ]
      : [
          "Check the spelling, and try it without www or a trailing path.",
          "If the site is live in your browser, wait a moment and run it again.",
        ];

  return (
    <section className="border-b border-black/14 bg-white px-5 py-6 sm:px-6">
      <p className="max-w-[32ch] text-balance font-display text-[clamp(1.4rem,2.8vw,1.95rem)] font-normal leading-[1.14] tracking-[-0.02em] text-ink-deep">
        We could not read {result.domain}.
      </p>
      <p className="mt-2.5 max-w-[64ch] text-[14px] leading-[1.6] text-black/62">
        {explanation}
      </p>
      <ul className="mt-4 space-y-2 border-t border-black/12 pt-4">
        {suggestions.map((item) => (
          <li
            key={item}
            className="flex max-w-[68ch] items-start gap-2.5 text-[13.5px] leading-relaxed text-black/68"
          >
            <ArrowRight
              aria-hidden="true"
              className="mt-1 h-3.5 w-3.5 shrink-0 text-signal-ink"
            />
            {item}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-[12.5px] leading-relaxed text-black/48">
        What the scan reported: {reason}
      </p>
      <div className="mt-5 border-t border-black/12 pt-5">
        <BookReviewCta
          variant="primary"
          location="scan_rejected"
          label="See Beseam on my store"
          className="min-h-12 gap-2 px-6 py-0 text-[14px] font-semibold"
        />
      </div>
    </section>
  );
}

export function ResultCard({
  result,
  identity,
  identityMeta,
  continueHref,
  verificationGate,
}: {
  result: AnswerCheckResult;
  identity?: string;
  identityMeta?: string;
  continueHref?: string;
  verificationGate?: React.ReactNode;
}) {
  const answers = result.answers;
  const inFlight = isScanInFlight(result);
  const scored = answers.filter((answer) => answer.mentioned !== null);
  const [shareStatus, setShareStatus] = useState<
    "idle" | "shared" | "copied" | "failed"
  >("idle");

  // Printing a set of collapsed disclosures produces a page with no evidence on
  // it. Open every fold, print, then put the reader's own folds back exactly as
  // they left them.
  const onPrint = () => {
    const folds = Array.from(
      document.querySelectorAll<HTMLDetailsElement>("details"),
    );
    const wasOpen = folds.map((fold) => fold.open);
    folds.forEach((fold) => {
      fold.open = true;
    });
    const restore = () => {
      folds.forEach((fold, index) => {
        fold.open = wasOpen[index];
      });
      window.removeEventListener("afterprint", restore);
    };
    window.addEventListener("afterprint", restore);
    window.print();
    // Safari never fires `afterprint` from a cancelled dialog; the timeout is
    // the only guarantee the reader's folds come back.
    window.setTimeout(restore, 1000);
  };

  const onShare = async () => {
    const shareUrl = new URL("/scan", window.location.origin);
    shareUrl.searchParams.set("domain", result.domain);
    const title = `${identity ?? result.brand ?? result.domain} · Beseam Observe scan`;

    if (navigator.share) {
      try {
        await navigator.share({ title, url: shareUrl.toString() });
        setShareStatus("shared");
        window.setTimeout(() => setShareStatus("idle"), 1800);
        return;
      } catch (shareError) {
        if (
          shareError instanceof DOMException &&
          shareError.name === "AbortError"
        )
          return;
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl.toString());
      setShareStatus("copied");
      window.setTimeout(() => setShareStatus("idle"), 1800);
    } catch {
      setShareStatus("failed");
    }
  };

  const marketing = marketLabel(result);
  const identityLine =
    identityMeta ??
    [
      result.domain,
      result.platform ? platformLabel(result.platform) : null,
      marketing,
    ]
      .filter(Boolean)
      .join(" · ");

  return (
    <div className="overflow-hidden border border-black/18 bg-white text-left">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-black/14 bg-white px-5 py-5 sm:px-6">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <BrandFavicon
              domain={result.domain}
              name={identity ?? result.brand ?? result.domain}
            />
            <h2 className="text-[22px] font-semibold leading-snug tracking-[-0.02em] text-ink-deep">
              {identity ?? result.brand ?? result.domain}
            </h2>
          </div>
          <p className="mt-1.5 text-[12.5px] text-[#5f5a55]">{identityLine}</p>
        </div>
        {/* One status statement for the whole card. The run detail lives in the
            progress list above; repeating it here — next to a section that also
            announced "Observe complete" — was the page telling the visitor the
            same thing three times in three different vocabularies. */}
        <div className="flex flex-wrap items-center gap-2">
          {/* One height across the row. Print alone carried `min-h-11` for its
              touch target, which left it 44px next to two 30px siblings. */}
          <span className="inline-flex min-h-11 items-center gap-2 border border-black/18 bg-white px-3 text-[12px] font-semibold text-ink-deep">
            <span
              className={`h-2 w-2 rounded-full ${
                result.reject_reason
                  ? "bg-signal-ink"
                  : inFlight
                    ? "animate-pulse bg-signal-ink"
                    : "bg-[#1f7a4d]"
              }`}
              aria-hidden="true"
            />
            {result.reject_reason
              ? "Could not read this store"
              : inFlight
                ? "Still running"
                : "Scan complete"}
          </span>
          {/* Nothing to share or print when the scan could not read the store. */}
          <button
            type="button"
            hidden={Boolean(result.reject_reason)}
            onClick={() => void onShare()}
            className="inline-flex min-h-11 items-center gap-2 border border-black/18 bg-white px-3 text-[12px] font-semibold text-ink-deep transition-colors hover:border-black/32 hover:bg-[#fffaf7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-ink/35"
            aria-label="Share this scan"
          >
            {shareStatus === "copied" || shareStatus === "shared" ? (
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            <span aria-live="polite">
              {shareStatus === "copied"
                ? "Link copied"
                : shareStatus === "shared"
                  ? "Shared"
                  : shareStatus === "failed"
                    ? "Copy failed"
                    : "Share"}
            </span>
          </button>
          <button
            type="button"
            hidden={Boolean(result.reject_reason)}
            onClick={onPrint}
            className="inline-flex min-h-11 items-center gap-2 border border-black/18 bg-white px-3 text-[12px] font-semibold text-ink-deep transition-colors hover:border-black/32 hover:bg-[#fffaf7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-ink/35"
          >
            <Printer className="h-3.5 w-3.5" aria-hidden="true" />
            Print
          </button>
        </div>
      </div>

      {result.reject_reason ? (
        <RejectedNotice result={result} />
      ) : (
        <>
          <ScanHeadline result={result} />
          <FoundStrip result={result} />
          <WorthLookingAt result={result} />

          {verificationGate ? (
            <DeeperAnalysisPanel result={result} gate={verificationGate} />
          ) : scored.length > 0 || result.questions.length > 0 ? (
            <VisibilityDisclosure result={result} />
          ) : null}

          <InitialScanSummary result={result} />

          {/* Prints with the report: the scope of a finding list is part of the
              finding list, not a sales aside. */}
          <ScanBoundary result={result} />

          {continueHref ? (
            <ContinuePaths result={result} continueHref={continueHref} />
          ) : null}
        </>
      )}
    </div>
  );
}

export default function AnswerCheck({
  placement = "homepage_hero",
  formNote,
  showPromise = false,
  handOffTo,
  glowInput = false,
}: {
  placement?: string;
  /**
   * Route to send the visitor to on submit instead of rendering the result in
   * place. Set on surfaces that are not built to hold a result — the homepage
   * hero is a centred, viewport-height composition, and a finished scan card is
   * an order of magnitude taller than it. The destination reads `?domain=` on
   * arrival and starts the scan itself.
   */
  handOffTo?: string;
  /**
   * Reassurance shown directly under the field. It has to render between the
   * form and the result, or a scanned store pushes it a full card away from the
   * ask it is reassuring.
   */
  formNote?: ReactNode;
  /**
   * Render the free-scan promise above the field. On by default nowhere: the
   * homepage hero already carries its own framing, while a visitor landing
   * cold on /scan has to be told what entering a domain will get them before
   * they enter one.
   */
  showPromise?: boolean;
  /**
   * Warm ambient glow on the domain field itself. Off by default -- the
   * homepage hero is the one surface with nothing else competing for
   * attention above the fold, so it is the one place a glow reads as an
   * invitation rather than noise.
   */
  glowInput?: boolean;
}) {
  const { trackEvent } = useAnalytics();
  const router = useRouter();
  const [domain, setDomain] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [result, setResult] = useState<AnswerCheckResult | null>(null);
  const [error, setError] = useState("");
  const [verificationError, setVerificationError] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [verificationSubmitting, setVerificationSubmitting] = useState(false);
  const pollCount = useRef(0);
  const [pollExhausted, setPollExhausted] = useState(false);

  const load = useCallback(async (target: string) => {
    const response = await fetch(
      `/api/answer-check?domain=${encodeURIComponent(target)}`,
    );
    if (!response.ok) return null;
    return (await response.json()) as AnswerCheckResult;
  }, []);

  // The one place a scan is actually started. Both the form and an arriving
  // ?domain= go through it, so a link to a domain nobody has scanned yet
  // behaves exactly like typing that domain into the field.
  const runScan = useCallback(
    async (target: string, address: string) => {
      setSubmitting(true);
      try {
        const response = await fetch("/api/answer-check", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            domain: target,
            email: address || null,
            source: placement,
            website,
          }),
        });
        const payload = await response.json();

        if (!response.ok) {
          setError(
            payload?.detail ||
              payload?.error ||
              "We could not scan that domain.",
          );
          return;
        }

        pollCount.current = 0;
        setPollExhausted(false);
        const scan = payload as AnswerCheckResult;
        setResult(scan);
        // The audit is read from the emailed link, not from this page. Say the
        // mail is coming instead of rendering a card the visitor is about to be
        // sent a better version of. A rejected domain never gets a mail, so it
        // keeps rendering its own reason here.
        if (address && scan.status === "awaiting_verification") {
          setVerificationSent(true);
          trackEvent({
            action: "answer_check_verification_requested",
            category: "conversion",
            label: placement,
          });
        }
      } catch {
        setError("The scan service is unavailable right now.");
      } finally {
        setSubmitting(false);
      }
    },
    [placement, trackEvent, website],
  );

  // Arrivals with ?domain=: a verification click, a shared link, or the hand-off
  // from the homepage hero. Failed verification links land here too, with a
  // specific human-readable error.
  const arrivalHandled = useRef(false);
  useEffect(() => {
    if (arrivalHandled.current) return;
    arrivalHandled.current = true;

    const params = new URLSearchParams(window.location.search);
    const scanError = params.get("scan_error");
    if (scanError === "missing_token") {
      setError(
        "That verification link is missing its token. Start or continue your scan below.",
      );
    } else if (scanError === "link_used") {
      setError(
        "That verification link is invalid or has already been used. Start the scan again if you need a new link.",
      );
    } else if (scanError === "unavailable") {
      setError(
        "We could not verify that link right now. Try the link from your email again.",
      );
    }

    const fromUrl = params.get("domain");
    if (!fromUrl) return;
    setDomain(fromUrl);
    void load(fromUrl).then((payload) => {
      // A cached scan renders immediately — this is the path back from the
      // emailed link. Nothing cached means nobody has scanned this domain yet;
      // the arrival cannot start one on its own any more, because starting a
      // scan now requires an email address the URL does not carry. Leaving the
      // domain prefilled puts the visitor one field from the same result.
      if (payload) setResult(payload);
    });
  }, [load]);
  // Poll while either the free PDP sample or the verified live probe is running.
  // The budget is finite, so the exhausted case has to say so: silently ceasing
  // to poll leaves a progress row spinning forever with nothing to act on.
  useEffect(() => {
    if (!result || !isScanInFlight(result)) return;
    if (pollCount.current >= MAX_POLLS) {
      setPollExhausted(true);
      return;
    }

    const timer = setTimeout(() => {
      pollCount.current += 1;
      void load(result.domain).then((payload) => {
        if (payload) setResult(payload);
      });
    }, POLL_MS);

    return () => clearTimeout(timer);
  }, [result, load]);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setVerificationSent(false);

    const target = domain.trim();
    if (!target) {
      setError("Enter your store domain.");
      return;
    }

    // The scan is not started until there is somewhere to send it. Asked here
    // rather than after the findings render, because the paid stage is
    // authorized by clicking the emailed link either way — asking twice only
    // made the visitor pass the same gate in two sittings.
    const address = handOffTo ? "" : email.trim();
    if (!handOffTo && !address) {
      setError("Enter the email we should send your scan to.");
      return;
    }

    trackEvent({
      action: "answer_check_started",
      category: "conversion",
      label: placement,
    });

    // Hand off to the page built for a result instead of growing a 2,000px card
    // inside a viewport-height hero. The scan then owns a real URL: shareable,
    // reloadable, and back returns to where the visitor came from.
    if (handOffTo) {
      setSubmitting(true);
      const next = new URLSearchParams();
      next.set("domain", target);
      for (const [key, value] of new URLSearchParams(window.location.search)) {
        if (key.startsWith("utm_")) next.set(key, value);
      }
      router.push(`${handOffTo}?${next.toString()}`);
      return;
    }

    await runScan(target, address);
  };

  const onVerificationSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setVerificationError("");

    const address = email.trim();
    if (!address) {
      setVerificationError("Enter your work email.");
      return;
    }
    if (!result) return;

    setVerificationSubmitting(true);
    try {
      const response = await fetch("/api/answer-check", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          domain: result.domain,
          email: address,
          source: placement,
          website,
        }),
      });
      const payload = await response.json();
      if (!response.ok) {
        setVerificationError(
          payload?.detail ||
            payload?.error ||
            "We could not send the verification email.",
        );
        return;
      }

      setResult(payload as AnswerCheckResult);
      setVerificationSent(true);
      trackEvent({
        action: "answer_check_verification_requested",
        category: "conversion",
        label: placement,
      });
    } catch {
      setVerificationError(
        "We could not send the verification email right now.",
      );
    } finally {
      setVerificationSubmitting(false);
    }
  };

  const inputClass =
    "h-12 w-full border border-black/22 bg-white px-4 text-left text-[15px] text-ink-deep placeholder:text-black/40 focus:border-signal-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-ink";

  // One button, two jobs: on a surface that hands off it starts the journey, on
  // the page that owns the result it posts the scan.
  const submitButton = (
    <button
      type="submit"
      disabled={submitting}
      className={`group inline-flex min-h-12 items-center justify-center gap-2 bg-signal-ink px-6 text-[15px] font-semibold text-white disabled:opacity-70 ${handOffTo ? "" : "w-full"}`}
    >
      {submitting
        ? handOffTo
          ? "Reading your store…"
          : "Sending…"
        : handOffTo
          ? "Scan my store"
          : "Email me my scan"}
      <ArrowRight
        aria-hidden="true"
        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
      />
    </button>
  );

  // While the link is in their inbox there is nothing to watch and nothing to
  // read here: the audit is the thing behind the link.
  const showProgress = Boolean(
    !verificationSent &&
    (submitting || (result && isScanInFlight(result) && !result.reject_reason)),
  );

  return (
    <div>
      {showPromise && !result ? (
        <div className="mb-6">
          <FreeScanPromise />
        </div>
      ) : null}

      <form
        id="answer-check-form"
        onSubmit={onSubmit}
        noValidate
        className="mx-auto w-full max-w-3xl border border-black/18 bg-white p-3 sm:p-4"
      >
        <div className="grid gap-3">
          <div
            className={
              handOffTo
                ? "grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]"
                : "grid gap-3 sm:grid-cols-2"
            }
          >
            <div>
              <label className="sr-only" htmlFor="answer-check-domain">
                Store domain
              </label>
              <input
                id="answer-check-domain"
                value={domain}
                onChange={(event) => {
                  setDomain(event.target.value);
                  if (error) setError("");
                }}
                placeholder="yourstore.com"
                aria-invalid={Boolean(error)}
                className={inputClass}
                style={
                  glowInput
                    ? {
                        boxShadow:
                          "0 0 0 1px rgba(184,68,29,0.18), 0 0 14px 1px rgba(184,68,29,0.14)",
                      }
                    : undefined
                }
              />
            </div>
            {handOffTo ? (
              submitButton
            ) : (
              <div>
                <label className="sr-only" htmlFor="answer-check-scan-email">
                  Email for your scan
                </label>
                <input
                  id="answer-check-scan-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (error) setError("");
                  }}
                  placeholder="you@company.com"
                  aria-invalid={Boolean(error)}
                  className={inputClass}
                />
              </div>
            )}
          </div>
          {handOffTo ? null : submitButton}
        </div>
        {handOffTo ? null : (
          <p className="mt-2.5 max-w-[62ch] text-[12.5px] leading-relaxed text-black/58">
            We read your store, then email you the link to your audit. No
            account, no card.
          </p>
        )}
        <label className="sr-only" aria-hidden="true">
          Website
          <input
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
          />
        </label>

        <p
          role={error ? "alert" : undefined}
          className={`mt-3 text-[13px] leading-relaxed ${error ? "text-[#b3261e]" : "text-black/62"}`}
        >
          {error}
        </p>
        {/* A failed scan is usually the API being briefly unavailable, so give
            the visitor the retry instead of making them retype the domain. */}
        {error && domain.trim() ? (
          <button
            type="submit"
            disabled={submitting}
            className="mt-3 inline-flex min-h-10 items-center gap-2 border border-black/36 bg-white px-4 text-[13px] font-semibold text-ink-deep transition-colors hover:border-signal-ink hover:text-signal-ink disabled:cursor-wait disabled:opacity-70"
          >
            <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
            {submitting ? "Retrying…" : "Try again"}
          </button>
        ) : null}
      </form>

      {formNote}

      {/* One progress surface, and only while something is genuinely
          outstanding. The storefront read happens inside the POST, so without
          the optimistic list the visitor watches a disabled button for several
          seconds with no idea what is happening. */}
      {showProgress ? (
        <div className="mt-6">
          <ScanProgress
            steps={result && !submitting ? result.steps : OPTIMISTIC_STEPS}
            domain={result?.domain ?? (domain.trim() || null)}
          />
        </div>
      ) : null}

      {verificationSent ? (
        <div className="mx-auto mt-6 w-full max-w-3xl border border-black/18 bg-white p-5 sm:p-6">
          <p className="flex items-center gap-2 text-[13px] font-semibold text-[#1a6b43]">
            <Check className="h-4 w-4" aria-hidden="true" />
            Check your email
          </p>
          <p className="mt-2.5 text-[18px] font-semibold tracking-[-0.01em] text-ink-deep">
            Your scan is on its way to {email.trim()}.
          </p>
          <p className="mt-1.5 max-w-[54ch] text-[13.5px] leading-relaxed text-[#5f5a55]">
            We have already read {result?.domain ?? "your store"}. Open the link
            in that email and we ask the assistants about your products, then
            show you the whole audit.
          </p>
          {/* A sent state with no exit strands anyone who mistyped their
              address or never received the mail. */}
          <button
            type="button"
            onClick={() => setVerificationSent(false)}
            className="mt-4 inline-flex min-h-11 items-center text-[13px] font-semibold text-ink-deep underline decoration-black/30 underline-offset-4 transition-colors hover:text-signal-ink hover:decoration-signal-ink"
          >
            Send it to a different email
          </button>
        </div>
      ) : null}

      {result && !verificationSent ? (
        <div className="mx-auto mt-10 max-w-[72rem]">
          {/* The poll budget ran out with work still outstanding. Name what did
              finish, so the evidence already on the card is not thrown into
              doubt by one stalled stage. */}
          {pollExhausted ? (
            <div
              role="status"
              className="mb-4 flex flex-wrap items-center justify-between gap-3 border border-black/18 bg-[#fffaf7] px-5 py-4"
            >
              <p className="max-w-[62ch] text-[13px] leading-relaxed text-ink-deep">
                We did not finish reading your product pages this time. The
                completed observations below are still useful; read the findings
                as possibilities, not verdicts.
              </p>
              <button
                type="submit"
                form="answer-check-form"
                disabled={submitting}
                className="inline-flex min-h-11 shrink-0 items-center gap-2 border border-black/36 bg-white px-4 text-[13px] font-semibold text-ink-deep transition-colors hover:border-signal-ink hover:text-signal-ink disabled:cursor-wait disabled:opacity-70"
              >
                <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
                {submitting ? "Running…" : "Run it again"}
              </button>
            </div>
          ) : null}
          <ResultCard
            result={result}
            continueHref={`${APP_REGISTER_URL}?scan_domain=${encodeURIComponent(result.domain)}`}
            verificationGate={
              result.status === "awaiting_verification" ? (
                verificationSent ? (
                  <div>
                    <p className="flex items-center gap-2 text-[13px] font-semibold text-[#1a6b43]">
                      <Check className="h-4 w-4" aria-hidden="true" />
                      Email sent
                    </p>
                    <p className="mt-2.5 text-[18px] font-semibold tracking-[-0.01em] text-ink-deep">
                      One click in your inbox and we continue.
                    </p>
                    <p className="mt-1.5 max-w-[52ch] text-[13.5px] leading-relaxed text-[#5f5a55]">
                      Open the link we sent to {email.trim()}. Nothing on this
                      page goes away in the meantime. You can keep reading, or
                      come back to it later.
                    </p>
                    {/* A sent state with no exit strands anyone who mistyped
                        their address or never received the mail. */}
                    <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px]">
                      <button
                        type="button"
                        onClick={() => setVerificationSent(false)}
                        className="inline-flex min-h-11 items-center font-semibold text-ink-deep underline decoration-black/30 underline-offset-4 transition-colors hover:text-signal-ink hover:decoration-signal-ink"
                      >
                        Send it again
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEmail("");
                          setVerificationSent(false);
                        }}
                        className="inline-flex min-h-11 items-center text-[#5f5a55] underline decoration-black/20 underline-offset-4 transition-colors hover:text-signal-ink hover:decoration-signal-ink"
                      >
                        Use a different address
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={onVerificationSubmit} noValidate>
                    <label
                      className="text-[15px] font-semibold tracking-[-0.01em] text-ink-deep"
                      htmlFor="answer-check-email"
                    >
                      Confirm your email to continue
                    </label>
                    <p className="mt-1.5 max-w-[52ch] text-[13px] leading-relaxed text-[#5f5a55]">
                      We send one link. Click it and both open up: no account,
                      no card, no marketing list.
                    </p>
                    <div className="mt-3.5 grid gap-3">
                      <input
                        id="answer-check-email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(event) => {
                          setEmail(event.target.value);
                          if (verificationError) setVerificationError("");
                        }}
                        placeholder="you@company.com"
                        aria-invalid={Boolean(verificationError)}
                        className={inputClass}
                      />
                      <button
                        type="submit"
                        disabled={verificationSubmitting}
                        className="inline-flex min-h-12 items-center justify-center gap-2 bg-signal-ink px-6 text-[14px] font-semibold text-white disabled:opacity-70"
                      >
                        {verificationSubmitting
                          ? "Sending…"
                          : "Send me the link"}
                      </button>
                    </div>
                    <p className="mt-2.5 max-w-[52ch] text-[12px] leading-relaxed text-[#5f5a55]">
                      See our{" "}
                      <a
                        href="/privacy-policy"
                        className="underline decoration-black/25 underline-offset-2 hover:text-signal-ink hover:decoration-signal-ink"
                      >
                        privacy policy
                      </a>
                      .
                    </p>
                    {verificationError ? (
                      <p
                        role="alert"
                        className="mt-3 text-[13px] leading-relaxed text-[#b3261e]"
                      >
                        {verificationError}
                      </p>
                    ) : null}
                  </form>
                )
              ) : undefined
            }
          />
        </div>
      ) : null}
    </div>
  );
}
