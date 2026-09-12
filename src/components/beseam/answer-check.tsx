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

import type { Dictionary, Locale } from "@/i18n";
import { useDictionary, useLocale } from "@/i18n/use-locale";

import {
  ArrowRight,
  Check,
  ChevronDown,
  Loader2,
  MailCheck,
  MoreHorizontal,
  Printer,
  RefreshCw,
  Share2,
  X,
} from "lucide-react";

import type {
  Answer,
  AnswerCheckResult,
  Finding,
  PageAudit,
  ShownProduct,
  Step,
} from "@/components/beseam/answer-check-types";
import { BookReviewCta } from "@/components/beseam/book-review-cta";
import {
  deriveDeepAuditCardState,
  derivePdpLayoutCoverage,
  deriveSampledAuditGroups,
  deriveTemplatePatterns,
  isCatalogFinding,
} from "@/components/beseam/answer-check-state";
import { ChannelIcon } from "@/components/beseam/channel-icon";
import { fixExampleFor } from "@/components/beseam/fix-examples";
import TrackedLink from "@/components/beseam/tracked-link";
import useAnalytics from "@/hooks/useAnalytics";
import { APP_REGISTER_URL, APP_REPORT_URL } from "@/lib/app-urls";

export type { AnswerCheckResult };

const POLL_MS = 6000;
const MAX_POLLS = 110; // ~6 minutes, then stop asking

const LIVE_STATUSES = new Set(["running", "queued", "validating"]);
const PENDING_PAGE_AUDIT_STATUSES = new Set(["queued", "running"]);

// Poll on the work that is actually outstanding rather than on the status word
// alone. The page-audit sample is armed by the verification click and can still
// be in flight after the paid status settles, and a row left `queued` by an
// older build must not spin a step forever either.
export function isScanInFlight(result: AnswerCheckResult) {
  return (
    LIVE_STATUSES.has(result.status) ||
    PENDING_PAGE_AUDIT_STATUSES.has(result.page_audits_status ?? "") ||
    result.steps.some((step) => step.state === "active")
  );
}

// A cached row is worth rendering on its own only when its free stage actually
// produced something, or is still producing it. A row that never got a
// storefront read is an empty card — the arrival re-runs the scan instead of
// showing it.
export function hasUsableFreeStage(result: AnswerCheckResult) {
  if (result.reject_reason) return true;
  if ((result.page_audits ?? []).length > 0) return true;
  if (result.homepage_audit != null) return true;
  if ((result.site_inventory?.urls_discovered ?? 0) > 0) return true;
  if (result.site_description?.title || result.site_description?.description)
    return true;
  if (PENDING_PAGE_AUDIT_STATUSES.has(result.page_audits_status ?? "")) {
    return true;
  }
  // A storefront read that landed is a usable free stage on its own. The product
  // pages below it are waiting for the emailed link, not for another probe, so
  // re-running the scan here would re-read the storefront to arrive back at the
  // page the visitor is already looking at.
  if (result.products_seen > 0) return true;
  return LIVE_STATUSES.has(result.status) || result.status === "ready";
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
  const nested = [
    ...(result.homepage_audit && "findings" in result.homepage_audit
      ? (result.homepage_audit.findings ?? [])
      : []),
    ...(result.entity_page_audits ?? []).flatMap((audit) =>
      "findings" in audit ? (audit.findings ?? []) : [],
    ),
    ...(result.category_page_audits ?? []).flatMap((audit) =>
      "findings" in audit ? (audit.findings ?? []) : [],
    ),
    ...(result.content_page_audits ?? []).flatMap((audit) =>
      "findings" in audit ? (audit.findings ?? []) : [],
    ),
    ...(result.page_audits ?? []).flatMap((audit) => audit.findings ?? []),
  ];
  const seen = new Set<string>();
  const findings = [...result.findings, ...nested].filter((finding) => {
    const key = `${finding.code}|${finding.url ?? ""}|${finding.product ?? ""}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  return findings.sort(
    (a, b) =>
      (FINDING_RANK[a.severity ?? "medium"] ?? 2) -
      (FINDING_RANK[b.severity ?? "medium"] ?? 2),
  );
}

function findingArea(code: string, copy: Dictionary["answerCheck"]) {
  if (code.startsWith("seo.")) return copy.findings.areas.searchStructured;
  if (code.startsWith("i18n.")) return copy.findings.areas.internationalization;
  if (code.startsWith("security.")) return copy.findings.areas.trustDelivery;
  if (code.startsWith("geo.")) return copy.findings.areas.machineReadability;
  return copy.findings.areas.productEvidence;
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

function findingGroup(finding: Finding, copy: Dictionary["answerCheck"]) {
  const area = finding.area?.trim();
  if (area) {
    const localized: Record<string, string> = {
      "Getting found": copy.findings.areas.discovery,
      "How your products are listed": copy.findings.areas.listing,
      "What the product page tells shoppers": copy.findings.areas.page,
      "Trust and safety": copy.findings.areas.trust,
      "Markets and languages": copy.findings.areas.markets,
    };
    return localized[area] ?? area;
  }
  return findingArea(finding.code, copy);
}

// Severity words are engineering words. A store owner needs to know what to do
// first, not how a check classified itself — and a scan of five public pages
// has not earned the word "critical".
function priorityOf(finding: Finding, copy: Dictionary["answerCheck"]) {
  const severity = finding.severity ?? "medium";
  if (severity === "blocker" || severity === "high") {
    return { label: copy.findings.priorityFirst, urgent: true };
  }
  if (severity === "medium") {
    return { label: copy.findings.priorityLook, urgent: false };
  }
  return { label: copy.findings.priorityMinor, urgent: false };
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

const LANGUAGE_NAMES_DE: Record<string, string> = {
  ar: "Arabisch",
  cs: "Tschechisch",
  da: "Dänisch",
  de: "Deutsch",
  el: "Griechisch",
  en: "Englisch",
  es: "Spanisch",
  fi: "Finnisch",
  fr: "Französisch",
  he: "Hebräisch",
  hu: "Ungarisch",
  it: "Italienisch",
  ja: "Japanisch",
  ko: "Koreanisch",
  nb: "Norwegisch",
  nl: "Niederländisch",
  no: "Norwegisch",
  pl: "Polnisch",
  pt: "Portugiesisch",
  ro: "Rumänisch",
  ru: "Russisch",
  sv: "Schwedisch",
  tr: "Türkisch",
  uk: "Ukrainisch",
  zh: "Chinesisch",
};
const COUNTRY_NAMES_DE: Record<string, string> = {
  us: "Vereinigte Staaten",
  gb: "Vereinigtes Königreich",
  ie: "Irland",
  ca: "Kanada",
  au: "Australien",
  nz: "Neuseeland",
  de: "Deutschland",
  at: "Österreich",
  ch: "Schweiz",
  fr: "Frankreich",
  be: "Belgien",
  it: "Italien",
  nl: "Niederlande",
  es: "Spanien",
  mx: "Mexiko",
  pt: "Portugal",
  br: "Brasilien",
  pl: "Polen",
  se: "Schweden",
  dk: "Dänemark",
  no: "Norwegen",
  fi: "Finnland",
  cz: "Tschechien",
  ro: "Rumänien",
  hu: "Ungarn",
  gr: "Griechenland",
  tr: "Türkei",
  ru: "Russland",
  ua: "Ukraine",
  jp: "Japan",
  kr: "Südkorea",
  cn: "China",
};
function localizedLanguageName(code: string, locale: Locale) {
  const names = locale === "de" ? LANGUAGE_NAMES_DE : LANGUAGE_NAMES;
  return names[code.toLowerCase()];
}
function localizedCountryName(code: string, locale: Locale) {
  const names = locale === "de" ? COUNTRY_NAMES_DE : COUNTRY_NAMES;
  return names[code.toLowerCase()];
}
function localizedMarketName(name: string | null, locale: Locale) {
  if (!name || locale !== "de") return name;
  const code = Object.keys(COUNTRY_NAMES).find(
    (key) => COUNTRY_NAMES[key] === name,
  );
  return code ? (COUNTRY_NAMES_DE[code] ?? name) : name;
}

function marketLabel(result: AnswerCheckResult, locale: Locale): string | null {
  const market = localizedMarketName(
    result.brand_evidence?.market ?? null,
    locale,
  );
  const languages: string[] = [];
  for (const localeTag of result.site_inventory?.locales ?? []) {
    for (const part of localeTag.toLowerCase().split(/[-_]/)) {
      const name = localizedLanguageName(part, locale);
      if (name && !languages.includes(name)) languages.push(name);
    }
  }
  // Locale-prefixed URLs (/de/, /fr-ch/) are the strongest signal but plenty of
  // single-language stores (a .ch store that just serves German at the root,
  // no /de/ prefix) publish none. The language the buying questions were
  // actually written in is a second, always-available signal for the same
  // fact, so it fills this in rather than leaving the identity line silent.
  if (!languages.length && result.questions_language) {
    const name = localizedLanguageName(result.questions_language, locale);
    if (name) languages.push(name);
  }
  const spoken = languages.slice(0, 3).join(" · ");
  if (!market && !spoken) return null;
  return [market, spoken].filter(Boolean).join(" · ");
}

// Language and country the questions were actually written for, together —
// always shown, English included: a quiet default is still a fact the
// merchant did not have to infer for themselves.
function questionLanguageBadge(
  result: AnswerCheckResult,
  locale: Locale,
): string | null {
  const code = result.questions_language;
  const language = code
    ? (localizedLanguageName(code, locale) ?? code.toUpperCase())
    : null;
  // `questions_country` is interpreted from the crawl (which locale-prefixed
  // URL the store's own site actually used), same source and same fallback
  // order as `questions_language` — read it first. `brand_evidence.market` is
  // a ccTLD guess and only fills in when the crawl named nothing.
  const countryCode = result.questions_country?.toLowerCase();
  const country =
    (countryCode ? localizedCountryName(countryCode, locale) : null) ??
    localizedMarketName(result.brand_evidence?.market ?? null, locale) ??
    null;
  return [language, country].filter(Boolean).join(" · ") || null;
}

function countLabel(count: number, noun: string) {
  return `${count} ${noun}${count === 1 ? "" : "s"}`;
}

// ── What the free scan promises, before anyone types a domain ───────────────

// The three limits of the free read, as a row. Exported because they belong
// next to the field on /scan -- a boundary a visitor reads after typing is a
// boundary that arrived too late.
//
// The copy comes from the dictionary, not from a constant here: this renders
// on /scan, /de/scan and /playbook, and `useDictionary` reads the locale off
// the path, which is the only locale signal a static export has. Not "no
// login" any more, in either language: the scan is sent to an email address,
// and a promise the form immediately breaks is worse than no promise.
export function ScanAssurances({ className = "" }: { className?: string }) {
  const t = useDictionary();
  return (
    <ul className={`flex flex-wrap items-center gap-x-5 gap-y-2 ${className}`}>
      {t.scan.assurances.map((item) => (
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
  );
}

// What comes back, as opposed to what gets read. Exported so /scan can put it
// under the field, where it answers "was that worth typing" rather than
// competing with the field for a visitor who has not typed yet.
export function ScanReturns() {
  const t = useDictionary();
  return (
    <dl className="border-t border-black/12">
      {t.scan.returns.map(({ term, detail }) => (
        <div
          key={term}
          className="grid gap-1 border-b border-black/12 py-3.5 sm:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] sm:gap-6"
        >
          <dt className="text-[14px] font-semibold text-ink-deep">{term}</dt>
          <dd className="max-w-[62ch] text-[13.5px] leading-[1.6] text-black/62">
            {detail}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function FreeScanPromise({ compact = false }: { compact?: boolean }) {
  const t = useDictionary();
  return (
    <div className="mx-auto w-full max-w-3xl text-left">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h2 className="text-[19px] font-semibold tracking-[-0.015em] text-ink-deep">
          {t.scan.eyebrow}
        </h2>
        <p className="text-[13px] text-black/56">{t.scan.duration}</p>
      </div>
      {/* The kind of assessment, and the one it is not. A merchant who types a
          domain expecting keyword analysis has to be able to correct that here,
          before the findings arrive and do it for us. */}
      <p className="mt-2 max-w-[62ch] text-[14.5px] leading-[1.65] text-black/68">
        {t.scan.promiseBody}
      </p>

      <ScanAssurances className="mt-4" />

      {compact ? null : (
        <div className="mt-6">
          <ScanReturns />
        </div>
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

// The storefront read and the catalog read finish inside the POST. Everything
// after them -- the product-page sample, the questions, the answers -- is the
// slow half, and it is the half the address buys: none of it starts until the
// emailed link is clicked. So the rail breaks there and the ask sits in the
// seam: what already ran is above it, what the address starts is below it,
// pending.

function localizedStepLabel(step: Step, copy: Dictionary["answerCheck"]) {
  return (
    copy.steps.labels[step.key as keyof typeof copy.steps.labels] ?? step.label
  );
}

function localizedStepDetail(step: Step, copy: Dictionary["answerCheck"]) {
  const detail = step.detail?.trim();
  if (!detail) return null;

  let match: RegExpMatchArray | null;
  if (
    step.key === "catalog" &&
    (match = detail.match(/^(\d+) products? found$/))
  ) {
    return copy.steps.productsFound(Number(match[1]));
  }
  if (step.key === "pages") {
    if ((match = detail.match(/^(\d+) product pages? analyzed$/))) {
      return copy.steps.pagesAnalyzed(Number(match[1]));
    }
    if (
      (match = detail.match(/^Analyzed (\d+) of (\d+) product pages so far$/))
    ) {
      return copy.steps.pagesProgress(Number(match[1]), Number(match[2]));
    }
    if (
      detail === "Your products and prices are already below while these finish"
    ) {
      return copy.steps.pagesFinishing;
    }
    if (detail === "We could not finish reading these pages on this run") {
      return copy.steps.pagesFailed;
    }
  }
  if (step.key === "questions") {
    if ((match = detail.match(/^(\d+) questions? written$/))) {
      return copy.steps.questionsWritten(Number(match[1]));
    }
    if (detail === "Written from the products we found") {
      return copy.steps.questionsFromProducts;
    }
  }
  if (step.key === "answers") {
    const confirm = "Confirm your email and we continue with ";
    const asking = "Asking ";
    if (detail.startsWith(confirm))
      return copy.steps.confirmEmail(detail.slice(confirm.length));
    if (detail.startsWith(asking))
      return copy.steps.askingChannels(detail.slice(asking.length));
  }
  // Reject reasons and other backend facts are deliberately left verbatim;
  // phase 2 localizes API-supplied copy.
  return detail;
}

function StepRow({ step }: { step: Step }) {
  const copy = useDictionary().answerCheck;
  const label = localizedStepLabel(step, copy);
  const detail = localizedStepDetail(step, copy);
  return (
    <li className="flex items-start gap-3">
      <StepMark state={step.state} />
      <div className="min-w-0">
        <p
          className={`text-[14px] leading-snug ${
            step.state === "pending"
              ? "text-black/44"
              : "font-medium text-ink-deep"
          }`}
        >
          {label}
        </p>
        {detail ? (
          <p className="mt-0.5 text-[12.5px] leading-relaxed text-black/54">
            {detail}
          </p>
        ) : null}
        {step.state === "active" && step.progress && step.progress.total > 0 ? (
          <div
            className="mt-1.5 h-1 w-full max-w-[220px] overflow-hidden rounded-full bg-black/10"
            role="progressbar"
            aria-valuenow={step.progress.done}
            aria-valuemin={0}
            aria-valuemax={step.progress.total}
            aria-label={copy.steps.progress(
              step.progress.done,
              step.progress.total,
            )}
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
  );
}

function ScanProgress({
  steps,
  domain,
  deepAudit = false,
}: {
  steps: Step[];
  domain: string | null;
  deepAudit?: boolean;
}) {
  const copy = useDictionary().answerCheck;
  const visible = steps.filter((step) => step.state !== "skipped");
  if (!visible.length) return null;

  const activeIndex = visible.findIndex((step) => step.state === "active");
  const doneCount = visible.filter((step) => step.state === "done").length;
  const position = Math.min(
    activeIndex >= 0 ? activeIndex + 1 : doneCount + 1,
    visible.length,
  );
  const active =
    visible[
      activeIndex >= 0 ? activeIndex : Math.min(doneCount, visible.length - 1)
    ];
  const percent = Math.max(
    4,
    Math.round((Math.min(doneCount, visible.length) / visible.length) * 100),
  );

  return (
    <section
      aria-live="polite"
      className="mx-auto w-full border border-black/18 bg-white px-5 py-4 text-left sm:px-6"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.1em] text-black/44">
            {deepAudit
              ? copy.steps.fullAuditRunning
              : copy.steps.technical(position, visible.length)}
          </p>
          <h3 className="mt-1.5 text-[15px] font-semibold tracking-[-0.01em] text-ink-deep">
            {active
              ? localizedStepLabel(active, copy)
              : domain
                ? copy.steps.readingDomain(domain)
                : copy.steps.readingStorefront}
          </h3>
          {active ? (
            <p className="mt-1 text-[12.5px] leading-relaxed text-black/54">
              {localizedStepDetail(active, copy) ||
                copy.steps.resultsAsTheyArrive}
            </p>
          ) : null}
        </div>
        <p className="shrink-0 text-[11.5px] font-medium text-black/48">
          {deepAudit ? copy.steps.fullAuditEstimate : copy.steps.quickEstimate}
        </p>
      </div>

      <div
        className="mt-3 h-1.5 overflow-hidden rounded-full bg-black/8"
        role="progressbar"
        aria-valuenow={doneCount}
        aria-valuemin={0}
        aria-valuemax={visible.length}
        aria-label={copy.steps.progress(doneCount, visible.length)}
      >
        <div
          className="h-full rounded-full bg-signal-ink transition-[width] duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>

      <details className="group/progress mt-3 border-t border-black/10 pt-2.5">
        <summary className="flex min-h-9 cursor-pointer list-none items-center gap-2 text-[12px] font-semibold text-black/52 hover:text-ink-deep [&::-webkit-details-marker]:hidden">
          {copy.steps.progressDetails}
          <ChevronDown
            className="h-3.5 w-3.5 transition-transform group-open/progress:rotate-180"
            aria-hidden="true"
          />
        </summary>
        <ol className="mt-2 space-y-3 pb-1">
          {visible.map((step) => (
            <StepRow key={step.key} step={step} />
          ))}
        </ol>
      </details>
    </section>
  );
}

function FoundStrip({ result }: { result: AnswerCheckResult }) {
  const copy = useDictionary().answerCheck;
  const catalog = result.catalog_inventory;
  const productCount =
    catalog?.products_checked && catalog.products_checked > 0
      ? `${catalog.products_checked}${catalog.products_capped ? "+" : ""}`
      : String(result.products_seen);
  const groups = reportFindingGroups(result, copy);
  const findingCount = groups.length;
  const priorityCount = Math.min(FIRST_SHOWN, findingCount);
  const supportingCount = Math.max(0, findingCount - priorityCount);
  const sampledPages = result.page_audits ?? [];
  const scored = result.answers.filter((answer) => answer.mentioned !== null);
  const named = scored.filter((answer) => answer.mentioned === true).length;
  const qualityScores = sampledPages
    .map((audit) => audit.score)
    .filter((score): score is number => typeof score === "number");
  const averageQuality = qualityScores.length
    ? Math.round(
        qualityScores.reduce((sum, score) => sum + score, 0) /
          qualityScores.length,
      )
    : null;
  const qualifiedChecks = sampledPages.reduce(
    (sum, audit) =>
      sum + (audit.quality_checks_evaluated ?? audit.checks_evaluated ?? 0),
    0,
  );
  const deepResults = sampledPages.reduce(
    (sum, audit) =>
      sum + (audit.diagnostic_checks_evaluated ?? audit.checks_evaluated ?? 0),
    0,
  );

  const facts: Array<{ value: string; label: string; accent?: boolean }> = [
    ...(averageQuality != null
      ? [
          {
            value: `${averageQuality}/100`,
            label: copy.result.pageQuality,
          },
        ]
      : [{ value: productCount, label: copy.result.productsFound }]),
    ...(findingCount
      ? [
          {
            value: String(priorityCount),
            label: copy.result.prioritiesFound(priorityCount),
            accent: true,
          },
        ]
      : []),
    ...(scored.length
      ? [
          {
            value: `${named}/${scored.length}`,
            label: copy.result.answersNamed,
            accent: named < scored.length,
          },
        ]
      : []),
    ...(deepResults > 0
      ? [
          {
            value: String(deepResults),
            label: copy.result.deepResults,
          },
        ]
      : supportingCount
        ? [
            {
              value: String(supportingCount),
              label: copy.result.supportingFindings(supportingCount),
            },
          ]
        : []),
  ];
  const gridClass =
    facts.length >= 4
      ? "grid-cols-2 lg:grid-cols-4"
      : facts.length === 3
        ? "grid-cols-2 sm:grid-cols-3"
        : facts.length === 2
          ? "grid-cols-2"
          : "grid-cols-1";

  return (
    <dl
      className={`grid gap-px border-b border-black/14 bg-black/12 ${gridClass}`}
    >
      {facts.map((fact) => (
        <div
          key={fact.label}
          className="flex min-w-0 items-baseline gap-2.5 bg-white px-5 py-4 sm:px-6"
        >
          <dd
            className={`text-[26px] font-semibold leading-none tracking-[-0.03em] tabular-nums ${
              fact.accent ? "text-signal-ink" : "text-ink-deep"
            }`}
          >
            {fact.value}
          </dd>
          <dt className="text-[12.5px] leading-snug text-black/58">
            {fact.label}
          </dt>
        </div>
      ))}
    </dl>
  );
}
// ── The heart of the result ─────────────────────────────────────────────────
/**
 * Findings that say the same thing to the merchant, collapsed into one row.
 * Several technical checks can map to one merchant consequence, and the same
 * template often fails on every sampled page. The technical evidence remains
 * available inside the row; the priority list itself stays concise.
 */
type FindingGroupRow = { lead: Finding; members: Finding[] };

function groupFindings(findings: Finding[]): FindingGroupRow[] {
  const groups = new Map<string, FindingGroupRow>();
  for (const finding of findings) {
    const key = findingHeadline(finding).trim().toLowerCase();
    const existing = groups.get(key);
    if (existing) existing.members.push(finding);
    else groups.set(key, { lead: finding, members: [finding] });
  }

  // Severity stays primary. Within one severity band, repeated evidence across
  // sampled pages outranks an isolated check, then shopper-facing AI evidence
  // outranks a one-off implementation detail.
  const sourceWeight = (group: FindingGroupRow) => {
    if (group.lead.source === "assistant_observation") return 2;
    if (group.lead.source === "homepage_audit") return 1;
    return 0;
  };
  const affectedPages = (group: FindingGroupRow) =>
    new Set(
      group.members
        .flatMap(
          (member) => member.affected_urls ?? (member.url ? [member.url] : []),
        )
        .filter(Boolean),
    ).size;

  return Array.from(groups.values()).sort((left, right) => {
    const severity =
      (FINDING_RANK[left.lead.severity ?? "medium"] ?? 2) -
      (FINDING_RANK[right.lead.severity ?? "medium"] ?? 2);
    if (severity) return severity;
    const recurrence = affectedPages(right) - affectedPages(left);
    if (recurrence) return recurrence;
    return sourceWeight(right) - sourceWeight(left);
  });
}

function aiVisibilityFinding(
  result: AnswerCheckResult,
  copy: Dictionary["answerCheck"],
): Finding | null {
  const attempts = result.answers.filter((answer) =>
    Boolean(answer.channel_label),
  );
  const usable = attempts.filter((answer) => answer.mentioned !== null);
  if (!usable.length) return null;

  const named = usable.filter((answer) => answer.mentioned === true).length;
  if (named === usable.length) return null;

  const missed = usable.length - named;
  const rivals = tallyRivals(usable).slice(0, 3);
  const evidence = [
    copy.findings.aiVisibilityAttempts(usable.length, attempts.length),
  ];
  if (rivals.length) {
    evidence.push(
      copy.findings.aiVisibilityRivals(
        rivals.map((rival) => rival.label).join(", "),
      ),
    );
  }

  return {
    code: "ai_visibility.brand_presence",
    title: copy.findings.aiVisibilityTitle,
    detail: copy.findings.aiVisibilityAttempts(usable.length, attempts.length),
    product: null,
    severity:
      named === 0 ? "high" : missed / usable.length >= 0.5 ? "medium" : "low",
    source: "assistant_observation",
    headline:
      named === 0
        ? copy.findings.aiVisibilityAllMissed(usable.length)
        : copy.findings.aiVisibilitySomeMissed(missed, usable.length),
    why: copy.findings.aiVisibilityWhy,
    next_step: copy.findings.aiVisibilityNext,
    area: "Getting found",
    evidence,
  };
}

function reportFindingGroups(
  result: AnswerCheckResult,
  copy: Dictionary["answerCheck"],
): FindingGroupRow[] {
  const aiFinding = aiVisibilityFinding(result, copy);
  const groups = groupFindings([
    ...sortedFindings(result),
    ...(aiFinding ? [aiFinding] : []),
  ]);

  // The first three are a merchant decision layer, not a severity dump. Keep
  // serious findings ranked first, but avoid filling all three slots with the
  // same problem family when the scan found meaningful issues elsewhere.
  const featured: FindingGroupRow[] = [];
  const deferred: FindingGroupRow[] = [];
  const seenAreas = new Set<string>();
  for (const group of groups) {
    const area =
      group.lead.area?.trim().toLowerCase() ||
      group.lead.code.split(".", 1)[0].split("-", 1)[0].toLowerCase();
    if (featured.length < FIRST_SHOWN && !seenAreas.has(area)) {
      featured.push(group);
      seenAreas.add(area);
    } else {
      deferred.push(group);
    }
  }
  while (featured.length < FIRST_SHOWN && deferred.length) {
    featured.push(deferred.shift()!);
  }
  return [...featured, ...deferred];
}
function FindingRow({
  group,
  index,
  reportIdByUrl,
  exampleContext,
  fixHref,
  sampledPagesTotal,
  featured,
}: {
  group: FindingGroupRow;
  index: number;
  reportIdByUrl: Map<string, number>;
  exampleContext: Parameters<typeof fixExampleFor>[1];
  fixHref: string;
  sampledPagesTotal: number;
  featured: boolean;
}) {
  const copy = useDictionary().answerCheck;
  const finding = group.lead;
  const priority = priorityOf(finding, copy);
  const why = findingWhy(finding);
  const nextStep = findingNextStep(finding);
  const example = fixExampleFor(finding.code, {
    ...exampleContext,
    product: finding.product ?? exampleContext.product,
  });
  const affectedPageCount = new Set(
    group.members
      .filter((member) => member.source === "page_audit")
      .flatMap(
        (member) => member.affected_urls ?? (member.url ? [member.url] : []),
      )
      .filter(Boolean),
  ).size;
  const repeatedAcrossSample =
    affectedPageCount >= 2 &&
    sampledPagesTotal > 0 &&
    affectedPageCount <= sampledPagesTotal;
  const evidenceMembers = repeatedAcrossSample
    ? group.members.slice(0, 2)
    : group.members;

  return (
    <li className="border-b border-black/10 last:border-b-0">
      <details className="group/finding bg-white">
        <summary
          className={`grid cursor-pointer list-none grid-cols-[2.25rem_minmax(0,1fr)] gap-x-3 gap-y-2 border-l-[3px] px-5 transition-colors hover:bg-[#fdf1e9] sm:grid-cols-[2.75rem_minmax(0,1fr)_auto] sm:items-center sm:px-6 [&::-webkit-details-marker]:hidden ${featured ? "bg-[#fffaf7] py-6" : "py-4"} ${priority.urgent ? "border-l-signal-ink/55" : "border-l-transparent"}`}
        >
          <span
            className={
              featured
                ? "font-display text-[23px] leading-none tabular-nums text-signal-ink/72"
                : "font-mono text-[11px] font-semibold tabular-nums text-black/36"
            }
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10.5px] font-semibold uppercase tracking-[0.08em] sm:text-[11px]">
              <span className="text-black/44">
                {findingGroup(finding, copy)}
              </span>
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
              {repeatedAcrossSample ? (
                <span className="rounded-[3px] border border-signal-ink/18 bg-[#fff0e9] px-2 py-0.5 text-[9.5px] tracking-[0.05em] text-signal-ink">
                  {copy.summary.templatePatternCoverage(
                    affectedPageCount,
                    sampledPagesTotal,
                  )}
                </span>
              ) : null}
            </div>
            <p className="mt-1.5 text-balance text-[16px] font-semibold leading-[1.36] tracking-[-0.014em] text-ink-deep sm:text-[17px]">
              {findingHeadline(finding)}
            </p>
            {featured && why ? (
              <p className="mt-2 max-w-[72ch] text-[12.5px] leading-[1.6] text-black/56">
                {why}
              </p>
            ) : null}
          </div>
          <span className="col-start-2 mt-1 inline-flex min-h-9 items-center gap-2 justify-self-start text-[11.5px] font-semibold text-black/50 transition-colors group-hover/finding:text-signal-ink sm:col-start-auto sm:mt-0 sm:justify-self-end">
            <span className="group-open/finding:hidden">
              {copy.findings.recommendation}
            </span>
            <span className="hidden group-open/finding:inline">
              {copy.findings.close}
            </span>
            <ChevronDown
              className="h-3.5 w-3.5 transition-transform group-open/finding:rotate-180"
              aria-hidden="true"
            />
          </span>
        </summary>

        <div className="border-t border-black/10 bg-[#fffaf7] px-5 py-5 sm:px-6 sm:pl-[5.5rem]">
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              {why ? (
                <div className="mb-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-black/44">
                    {copy.findings.whyItMatters}
                  </p>
                  <p className="mt-1 max-w-[68ch] text-[13.5px] leading-[1.65] text-black/70">
                    {why}
                  </p>
                </div>
              ) : null}
              {nextStep ? (
                <p className="max-w-[68ch] border-l border-signal-ink/35 pl-3.5 text-[14px] leading-[1.6] text-ink-deep">
                  <span className="font-semibold">
                    {copy.findings.improveNext}{" "}
                  </span>
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
                  <pre className="mt-2 overflow-x-auto rounded-[3px] border border-black/12 bg-white px-3 py-2.5 font-mono text-[11px] leading-[1.55] text-ink-deep">
                    {example.code}
                  </pre>
                </div>
              ) : null}
              <TrackedLink
                href={`${fixHref}&fix=${encodeURIComponent(finding.code)}`}
                eventName="finding_fix_clicked"
                eventCategory="conversion"
                placement="answer_check_finding"
                preserveUtm
                className="group/fix mt-5 inline-flex min-h-10 items-center gap-2 rounded-[3px] border border-ink-deep px-4 text-[12.5px] font-semibold text-ink-deep transition-colors hover:bg-ink-deep hover:text-white"
              >
                {copy.findings.startFixing}
                <ArrowRight
                  aria-hidden="true"
                  className="h-3.5 w-3.5 transition-transform group-hover/fix:translate-x-0.5"
                />
              </TrackedLink>
            </div>

            <div className="border-t border-black/10 pt-5 lg:col-span-7 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-black/42">
                {copy.findings.evidence}
                {group.members.length > 1
                  ? ` · ${copy.findings.checks(group.members.length)}`
                  : ""}
              </p>
              <div className="mt-3 space-y-4 text-[12px] leading-relaxed text-black/58">
                {evidenceMembers.map((member, position) => {
                  const reportId = member.url
                    ? reportIdByUrl.get(member.url)
                    : undefined;
                  return (
                    <div key={`${member.code}-${member.product ?? position}`}>
                      <p className="font-semibold text-ink-deep">
                        {member.title}
                      </p>

                      {member.proof ? (
                        <div className="mt-2.5 border border-black/12 bg-white">
                          {member.proof.observed ? (
                            <div className="grid gap-1 border-b border-black/10 px-3 py-2.5 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-3">
                              <span className="text-[10.5px] font-semibold uppercase tracking-[0.07em] text-black/40">
                                {copy.findings.proofObserved}
                              </span>
                              <code className="break-words font-mono text-[11.5px] text-ink-deep">
                                {member.proof.observed}
                              </code>
                            </div>
                          ) : null}

                          {member.proof.inputs?.length ? (
                            <div className="grid gap-1 border-b border-black/10 px-3 py-2.5 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-3">
                              <span className="text-[10.5px] font-semibold uppercase tracking-[0.07em] text-black/40">
                                {copy.findings.proofInput}
                              </span>
                              <div className="min-w-0 space-y-2.5">
                                {member.proof.inputs.map((input) => (
                                  <div key={`${member.code}-${input.label}`}>
                                    <p className="text-[10.5px] font-semibold text-black/48">
                                      {copy.findings.proofInputLabel(
                                        input.label,
                                      )}
                                    </p>
                                    <code className="mt-0.5 block break-words font-mono text-[11.5px] text-ink-deep">
                                      {input.value}
                                    </code>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : null}
                          {member.proof.expected ? (
                            <div className="grid gap-1 border-b border-black/10 px-3 py-2.5 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-3">
                              <span className="text-[10.5px] font-semibold uppercase tracking-[0.07em] text-black/40">
                                {copy.findings.proofExpected}
                              </span>
                              <code className="break-words font-mono text-[11.5px] text-black/64">
                                {member.proof.expected}
                              </code>
                            </div>
                          ) : null}
                          {member.proof.source ? (
                            <div
                              className={`grid gap-1 px-3 py-2.5 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-3 ${member.detail ? "border-b border-black/10" : ""}`}
                            >
                              <span className="text-[10.5px] font-semibold uppercase tracking-[0.07em] text-black/40">
                                {copy.findings.proofSource}
                              </span>
                              <span className="text-[11.5px] text-black/60">
                                {copy.findings.proofSourceLabel(
                                  member.proof.source,
                                )}
                              </span>
                            </div>
                          ) : null}
                          {member.detail ? (
                            <div className="grid gap-1 bg-[#fffaf7] px-3 py-3 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-3">
                              <span className="text-[10.5px] font-semibold uppercase tracking-[0.07em] text-black/40">
                                {copy.findings.proofRecommendation}
                              </span>
                              <p className="text-[11.5px] leading-relaxed text-black/62">
                                {member.detail}
                              </p>
                            </div>
                          ) : null}
                        </div>
                      ) : member.evidence?.length ? (
                        <ul className="mt-2 space-y-1 border-l border-black/12 pl-3">
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

                      {!member.proof && member.detail ? (
                        <div className="mt-2.5">
                          <p className="text-[10.5px] font-semibold uppercase tracking-[0.07em] text-black/40">
                            {copy.findings.proofRecommendation}
                          </p>
                          <p className="mt-1 text-[11.5px] leading-relaxed text-black/58">
                            {member.detail}
                          </p>
                        </div>
                      ) : null}
                      {member.examples?.length ? (
                        <div className="mt-2.5 border-l border-signal-ink/30 pl-3">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-black/42">
                            {copy.findings.productsSeenOn}
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
                        {member.url ? (
                          <a
                            href={member.url}
                            target="_blank"
                            rel="noreferrer"
                            className="font-semibold text-black/56 underline decoration-black/20 underline-offset-4 hover:text-ink-deep hover:decoration-signal-ink"
                          >
                            {copy.findings.seePage}
                          </a>
                        ) : null}
                        {member.catalog_url ? (
                          <a
                            href={member.catalog_url}
                            target="_blank"
                            rel="noreferrer"
                            className="font-semibold text-black/56 underline decoration-black/20 underline-offset-4 hover:text-ink-deep hover:decoration-signal-ink"
                          >
                            {copy.findings.rawCatalog}
                          </a>
                        ) : null}
                        {member.url && reportId ? (
                          <a
                            href={`${APP_REPORT_URL}/${reportId}`}
                            target="_blank"
                            rel="noreferrer"
                            className="font-semibold text-ink-deep underline decoration-black/24 underline-offset-4 hover:decoration-signal-ink"
                          >
                            {copy.findings.fullPageReport}
                          </a>
                        ) : null}
                      </p>
                    </div>
                  );
                })}
                {group.members.length > evidenceMembers.length ? (
                  <details className="group/more-proof border-t border-black/10 pt-3">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[11.5px] font-semibold text-ink-deep hover:text-signal-ink [&::-webkit-details-marker]:hidden">
                      {copy.findings.moreProofChecks(
                        group.members.length - evidenceMembers.length,
                      )}
                      <ChevronDown
                        className="h-3.5 w-3.5 shrink-0 text-black/38 transition-transform group-open/more-proof:rotate-180"
                        aria-hidden="true"
                      />
                    </summary>
                    <ul className="mt-2 max-h-[24rem] divide-y divide-black/10 overflow-y-auto border-y border-black/10">
                      {group.members
                        .slice(evidenceMembers.length)
                        .map((member, position) => (
                          <li
                            key={`${member.code}-${member.url ?? member.product ?? position}`}
                            className="py-2.5"
                          >
                            <p className="text-[11.5px] font-semibold text-ink-deep">
                              {member.title}
                            </p>
                            {member.proof?.observed ? (
                              <code className="mt-1 block break-words font-mono text-[10.5px] text-black/56">
                                {member.proof.observed}
                              </code>
                            ) : null}
                            <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] text-black/38">
                              <span>{member.code}</span>
                              {member.url ? (
                                <a
                                  href={member.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="font-sans font-semibold text-black/52 underline decoration-black/18 underline-offset-3 hover:text-signal-ink"
                                >
                                  {copy.findings.seePage}
                                </a>
                              ) : null}
                            </p>
                          </li>
                        ))}
                    </ul>
                  </details>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </details>
    </li>
  );
}
function discoveryFileNotes(
  copy: Dictionary["answerCheck"],
): Record<string, string> {
  return {
    "/llms.txt": copy.findings.discoveryFiles.llms,
    "/agents.md": copy.findings.discoveryFiles.agents,
    "/SKILL.md": copy.findings.discoveryFiles.skill,
    "/.well-known/ucp": copy.findings.discoveryFiles.ucp,
  };
}

const FIRST_SHOWN = 3;

function WorthLookingAt({ result }: { result: AnswerCheckResult }) {
  const copy = useDictionary().answerCheck;
  const [expanded, setExpanded] = useState(false);
  const findings = reportFindingGroups(result, copy);
  const audits = result.page_audits ?? [];
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
  if (!findings.length && !pagesInFlight) return null;

  return (
    <section className="border-b border-black/14 bg-white">
      <div className="border-b border-black/10 px-5 py-5 sm:px-6">
        <h3 className="text-[18px] font-semibold tracking-[-0.018em] text-ink-deep sm:text-[19px]">
          {copy.findings.heading}
        </h3>
        <p className="mt-1.5 max-w-[70ch] text-[13px] leading-relaxed text-black/56">
          {findings.length ? copy.findings.intro : copy.findings.stillReading}
          {pagesInFlight ? copy.findings.moreMayAppear : ""}
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
                sampledPagesTotal={audits.length}
                featured={index < FIRST_SHOWN}
              />
            ))}
          </ol>
          {hidden > 0 ? (
            <div className="border-t border-black/10 bg-white px-5 py-3 sm:px-6">
              <button
                type="button"
                onClick={() => setExpanded(true)}
                className="inline-flex min-h-9 items-center gap-1.5 rounded-[3px] px-1 text-[11.5px] font-medium text-black/50 transition-colors hover:text-signal-ink"
              >
                {copy.findings.showOther(hidden)}
                <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          ) : null}
        </>
      ) : (
        <div className="flex items-center gap-3 px-5 py-5 sm:px-6">
          <Loader2
            className="h-4 w-4 animate-spin text-signal-ink"
            aria-hidden="true"
          />
          <p className="text-[13px] text-black/60">
            {copy.findings.readingPages}
          </p>
        </div>
      )}
    </section>
  );
}
// Every line here is checkable against what actually ran. The public probe
// fetches the storefront over plain HTTPS and samples five product pages
// (`storefront.probe_storefront`); the page checks are deterministic, with the
// analyzer's AI nodes left unevaluated (`page_audit.py`); one row per domain is
// overwritten on each submission, so there is no history to compare against.
// The Beseam column is the product's own behavior: questions a merchant edits
// in setup, the daily visibility cycle, the raw channel answer kept on the run,
// the ranked action queue, and the post-publish recheck of the same questions.
function ScanBoundary({ result }: { result: AnswerCheckResult }) {
  const copy = useDictionary().answerCheck;
  const sampledPages = (result.page_audits ?? []).length;
  const asked = result.answers.some((answer) => answer.mentioned !== null);

  const columns: Array<{
    label: string;
    tone: "did" | "not" | "next";
    items: string[];
  }> = [
    {
      label: copy.boundary.did,
      tone: "did",
      items: [
        copy.boundary.didPublic,
        sampledPages
          ? copy.boundary.didPages(sampledPages)
          : copy.boundary.didPagesSample,
        copy.boundary.didCatalog,
      ],
    },
    {
      label: copy.boundary.not,
      tone: "not",
      items: [
        asked ? copy.boundary.notKeepAsking : copy.boundary.notAskLive,
        copy.boundary.notRepeat,
        copy.boundary.notHistory,
      ],
    },
    {
      label: copy.boundary.next,
      tone: "next",
      items: [...copy.boundary.nextItems],
    },
  ];

  return (
    <details className="group/boundary border-b border-black/14 bg-white">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 hover:bg-[#fffaf7] sm:px-6 [&::-webkit-details-marker]:hidden">
        <div>
          <h3 className="text-[15px] font-semibold text-ink-deep">
            {copy.boundary.heading}
          </h3>
          <p className="mt-1 max-w-[70ch] text-[12.5px] leading-relaxed text-black/56">
            {copy.boundary.intro}
          </p>
        </div>
        <ChevronDown
          className="h-4 w-4 shrink-0 transition-transform group-open/boundary:rotate-180"
          aria-hidden="true"
        />
      </summary>
      <div className="grid border-t border-black/12 md:grid-cols-3">
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
    </details>
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
  const copy = useDictionary().answerCheck;
  const opportunityCount = reportFindingGroups(result, copy).length;

  return (
    <section
      data-print-hide
      className="border-t border-black/18 bg-ink-deep px-5 py-8 text-white sm:px-6 sm:py-9"
    >
      <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.46fr)] lg:items-center">
        <div>
          <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.1em] text-white/46">
            {copy.continue.opportunities(opportunityCount)} ·{" "}
            {copy.continue.nextLabel}
          </p>
          <h3 className="mt-2 max-w-[32ch] text-[22px] font-semibold leading-[1.25] tracking-[-0.022em] sm:text-[24px]">
            {copy.continue.once(opportunityCount)}
          </h3>
          <p className="mt-3 max-w-[64ch] text-[14px] leading-[1.65] text-white/68">
            {copy.continue.body}
          </p>
          <ul className="mt-5 grid gap-2.5 text-[12.5px] text-white/76 sm:grid-cols-3">
            {copy.continue.benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-2">
                <Check
                  aria-hidden="true"
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-signal"
                />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-white/14 pt-6 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
          <TrackedLink
            href={continueHref}
            eventName="scan_continue_clicked"
            eventCategory="conversion"
            placement="answer_check_result_primary"
            preserveUtm
            className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[3px] bg-white px-6 text-[14px] font-semibold text-ink-deep transition-colors hover:bg-signal"
          >
            {copy.continue.start}
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            />
          </TrackedLink>
          <p className="mt-3 text-center text-[11.5px] leading-[1.5] text-white/52">
            {copy.continue.carryStore(result.domain)}
          </p>
        </div>
      </div>
    </section>
  );
}

function ClosingContinue({
  domain,
  continueHref,
  priorityCount,
}: {
  domain: string;
  continueHref: string;
  priorityCount: number;
}) {
  const copy = useDictionary().answerCheck;
  const assurances = copy.continue.safetyAssurances ?? copy.continue.benefits;

  return (
    <section
      data-print-hide
      className="border-t border-black/14 bg-ink-deep px-5 py-7 text-white sm:px-6 sm:py-8"
    >
      <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/46">
            {copy.continue.closingEyebrow}
          </p>
          <p className="mt-1.5 max-w-[34ch] text-[21px] font-semibold leading-[1.25] tracking-[-0.02em] text-white">
            {copy.continue.closingTitle(priorityCount)}
          </p>
          <p className="mt-2 max-w-[66ch] text-[13px] leading-[1.6] text-white/68">
            {copy.continue.closingBody}
          </p>
          <p className="mt-2 text-[11.5px] text-white/46">
            {copy.continue.carryStore(domain)}
          </p>
        </div>
        <TrackedLink
          href={continueHref}
          eventName="scan_continue_clicked"
          eventCategory="conversion"
          placement="answer_check_result_bottom"
          preserveUtm
          className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-[3px] bg-white px-6 text-[13.5px] font-semibold text-ink-deep transition-colors hover:bg-signal"
        >
          {copy.continue.start}
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          />
        </TrackedLink>
      </div>
      {assurances?.length ? (
        <ul className="mt-6 grid gap-2.5 border-t border-white/12 pt-5 text-[12px] text-white/76 sm:grid-cols-2 lg:grid-cols-4">
          {assurances.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <Check
                aria-hidden="true"
                className="mt-0.5 h-3.5 w-3.5 shrink-0 text-signal"
              />
              <span className="leading-snug">{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
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

function platformLabel(platform: string, copy: Dictionary["answerCheck"]) {
  const key = platform.trim().toLowerCase();
  if (key === "shopify") return copy.result.commerceStorefront;
  if (key === "generic") return copy.result.storefront;
  return (
    PLATFORM_LABELS[key] ?? platform.charAt(0).toUpperCase() + platform.slice(1)
  );
}

function scoreBand(score: number, copy: Dictionary["answerCheck"]) {
  if (score >= 70)
    return {
      label: copy.result.strong,
      text: "text-[#1a6b43]",
      fill: "bg-[#1f7a4d]",
    };
  if (score >= 40)
    return {
      label: copy.result.mixed,
      text: "text-ink-deep",
      fill: "bg-ink-deep",
    };
  if (score >= 15)
    return {
      label: copy.result.weak,
      text: "text-signal-ink",
      fill: "bg-[#d95028]",
    };
  return {
    label: copy.result.barelyVisible,
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
  const copy = useDictionary().answerCheck;
  const observed = result.answers.filter((answer) =>
    Boolean(answer.channel_label),
  );
  const scored = observed.filter((answer) => answer.mentioned !== null);
  if (!observed.length) return null;

  const named = scored.filter((answer) => answer.mentioned === true).length;
  const channels = Array.from(
    new Set(
      observed
        .map((answer) => answer.channel_label)
        .filter((label): label is string => Boolean(label)),
    ),
  );
  const engines = channels.map((channel) => {
    const attempts = observed.filter(
      (answer) => answer.channel_label === channel,
    );
    const usable = attempts.filter((answer) => answer.mentioned !== null);
    const wins = usable.filter((answer) => answer.mentioned === true).length;
    return {
      channel,
      wins,
      usable: usable.length,
      total: attempts.length,
      pct: usable.length ? Math.round((wins / usable.length) * 100) : 0,
    };
  });
  const rivals = tallyRivals(scored);
  const topRival = rivals[0] ?? null;
  const pct = scored.length ? Math.round((named / scored.length) * 100) : 0;

  return (
    <section className="bg-white">
      <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="border-b border-black/10 px-5 py-6 sm:px-6 lg:border-b-0 lg:border-r">
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.09em] text-black/40">
            {copy.result.brandAppearance}
          </p>
          <div className="mt-2.5 flex flex-wrap items-end gap-3">
            <span
              className={`text-[48px] font-semibold leading-none tracking-[-0.045em] tabular-nums ${scoreBand(pct, copy).text}`}
            >
              {named}/{scored.length}
            </span>
            <span
              className={`mb-1 text-[11.5px] font-semibold ${scoreBand(pct, copy).text}`}
            >
              {scoreBand(pct, copy).label} · {pct}%
            </span>
          </div>
          <p className="mt-3 max-w-[42ch] text-[13px] leading-[1.62] text-black/60">
            {scored.length === 0
              ? copy.visibility.noUsableAnswer
              : named === scored.length
                ? copy.result.brandEverywhere
                : named === 0
                  ? copy.result.brandNowhere
                  : copy.result.brandMissing(
                      scored.length - named,
                      scored.length,
                    )}
          </p>
          {observed.length > scored.length ? (
            <p className="mt-1.5 text-[11px] font-medium text-black/42">
              {copy.visibility.usableAttempts(scored.length, observed.length)}
            </p>
          ) : null}
          {topRival && named < scored.length ? (
            <p className="mt-4 border-t border-black/8 pt-3 text-[12px] leading-relaxed text-black/56">
              <span className="font-semibold text-ink-deep">
                {copy.result.frequentAlternative}{" "}
              </span>
              {topRival.label} · {topRival.count}×
            </p>
          ) : null}
        </div>

        <div className="px-5 py-6 sm:px-6">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.09em] text-black/40">
              {copy.result.byAssistant}
            </p>
            <span className="font-mono text-[10.5px] text-black/40">
              {copy.result.assistants(channels.length)}
            </span>
          </div>
          <div className="mt-2 divide-y divide-black/8 border-y border-black/8">
            {engines.map((engine) => (
              <div
                key={engine.channel}
                className="grid gap-2 py-3.5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-4"
              >
                <div className="min-w-0">
                  <p className="flex items-center gap-2.5 text-[12.5px] font-semibold text-ink-deep">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[3px] border border-black/10 bg-[#fffaf7]">
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
                      className={`block h-full ${scoreBand(engine.pct, copy).fill}`}
                      style={{ width: `${Math.max(engine.pct, 1.5)}%` }}
                    />
                  </div>
                </div>
                <div className="pl-9 text-left sm:pl-0 sm:text-right">
                  <p className="font-mono text-[13px] font-semibold text-ink-deep">
                    {engine.usable ? `${engine.wins}/${engine.usable}` : "—"}
                  </p>
                  <p className="mt-0.5 text-[11px] text-black/42">
                    {engine.usable
                      ? copy.result.namedYou
                      : copy.visibility.noUsableAttempts(engine.total)}
                  </p>
                  {engine.total > engine.usable && engine.usable > 0 ? (
                    <p className="mt-0.5 text-[10.5px] text-black/36">
                      {engine.total - engine.usable} {copy.result.noAnswer}
                    </p>
                  ) : null}
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
  const copy = useDictionary().answerCheck;
  const named = answer.mentioned === true;
  const unknown = answer.mentioned === null || Boolean(answer.error);
  const tone = unknown
    ? "border-black/20 bg-black/[0.03] text-black/62"
    : named
      ? "border-[#1f7a4d]/40 bg-[#1f7a4d]/10 text-[#1a6b43]"
      : "border-signal-ink/45 bg-signal-ink/[0.08] text-signal-ink";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-[3px] border px-2 py-0.5 text-[12px] font-medium ${tone}`}
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
        {unknown
          ? copy.result.noAnswer
          : named
            ? copy.result.namedYou
            : copy.result.didNotNameYou}
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
  const copy = useDictionary().answerCheck;
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
            {product.merchant ?? copy.result.noImage}
          </span>
        )}
        {product.ours ? (
          <span className="absolute left-0 top-0 bg-[#1f7a4d] px-1.5 py-0.5 text-[12px] font-semibold uppercase tracking-[0.06em] text-white">
            {copy.result.yours}
          </span>
        ) : null}
      </div>
      <div className="border-t border-black/10 px-2.5 py-2">
        <p className="line-clamp-2 text-[11.5px] font-semibold leading-snug text-ink-deep">
          {product.title}
        </p>
        <p className="mt-1 text-[11px] leading-snug text-black/48">
          {product.merchant ?? copy.result.merchant}
          {product.price ? ` · ${product.price}` : ""}
        </p>
        {product.url && product.link_live ? (
          <a
            href={product.url}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex text-[11px] font-semibold text-ink-deep underline decoration-black/24 underline-offset-4 hover:decoration-signal-ink"
          >
            {copy.result.openProduct}
          </a>
        ) : null}
      </div>
    </li>
  );
}
// Level 2 in the card's depth scale: anything openable sits on the warm ground
// so it reads as a lid, and its contents open onto white.
// Declared at module scope, not inside the section that renders it: a component
// defined in a render body is a new type on every render, so each streaming
function Fold({
  title,
  summary,
  defaultOpen = false,
  children,
}: {
  title: string;
  summary: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  return (
    <details
      open={defaultOpen}
      className="group/fold border-b border-black/12 bg-[#fffaf7]"
    >
      <summary className="flex min-h-[66px] cursor-pointer list-none items-center justify-between gap-5 px-5 py-3.5 transition-colors hover:bg-[#fdf1e9] sm:px-6 [&::-webkit-details-marker]:hidden">
        <div className="min-w-0">
          <h3 className="text-[13.5px] font-semibold tracking-[-0.006em] text-ink-deep">
            {title}
          </h3>
          <p className="mt-1 text-[12px] leading-[1.5] text-black/54">
            {summary}
          </p>
        </div>
        <span className="flex min-h-11 shrink-0 items-center text-black/36 transition-colors group-hover/fold:text-ink-deep">
          <ChevronDown
            className="h-4 w-4 transition-transform group-open/fold:rotate-180"
            aria-hidden="true"
          />
        </span>
      </summary>
      <div className="border-t border-black/10 bg-white">{children}</div>
    </details>
  );
}

type SampledAuditRow = {
  url: string;
  ok: boolean;
  error?: string | null;
  title?: string | null;
  score?: number | null;
  report_id?: number | null;
  checks_evaluated?: number;
  checks_failed?: number;
  diagnostic_checks_evaluated?: number;
  diagnostic_checks_unevaluated?: number;
  findings?: Finding[];
};

function SampledAuditFold({
  title,
  audits,
  gated,
  inFlight,
  gatedSummary,
  readingSummary,
  unavailableSummary,
  patterns = [],
}: {
  title: string;
  audits: SampledAuditRow[];
  gated: boolean;
  inFlight: boolean;
  gatedSummary: string;
  readingSummary: string;
  unavailableSummary: string;
  patterns?: Finding[];
}) {
  const copy = useDictionary().answerCheck;
  const evaluated = audits.reduce(
    (sum, audit) => sum + (audit.checks_evaluated ?? 0),
    0,
  );
  const failedChecks = audits.reduce(
    (sum, audit) => sum + (audit.checks_failed ?? 0),
    0,
  );
  const unreadable = audits.filter((audit) => audit.ok === false).length;
  const repeatedCodes = new Set(patterns.map((finding) => finding.code));
  const summary = gated
    ? gatedSummary
    : inFlight && audits.length === 0
      ? readingSummary
      : audits.length
        ? copy.summary.sampledPageGroupSummary(
            audits.length,
            failedChecks,
            evaluated,
            unreadable,
          )
        : unavailableSummary;

  return (
    <Fold title={title} summary={summary}>
      {gated ? (
        <p className="bg-white px-5 py-4 text-[12.5px] leading-relaxed text-black/54 sm:px-6">
          {copy.summary.sampledPageGroupGatedBody}
        </p>
      ) : inFlight && audits.length === 0 ? (
        <div className="flex items-start gap-3 bg-white px-5 py-5 sm:px-6">
          <Loader2 className="mt-0.5 h-4 w-4 animate-spin text-signal-ink" />
          <p className="text-[12.5px] font-semibold text-ink-deep">
            {readingSummary}
          </p>
        </div>
      ) : audits.length ? (
        <>
          {patterns.length ? (
            <div className="border-b border-black/10 bg-[#fffaf7] px-5 py-4 sm:px-6">
              <p className="text-[11px] font-semibold text-ink-deep">
                {copy.summary.templatePatterns}
              </p>
              <ul className="mt-2 divide-y divide-black/10 border-y border-black/10 bg-white px-3">
                {patterns.map((finding) => (
                  <li key={finding.code} className="py-3">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <p className="text-[11.5px] font-semibold text-ink-deep">
                        {finding.headline ?? finding.title}
                      </p>
                      <span className="shrink-0 text-[10.5px] font-semibold uppercase tracking-[0.04em] text-signal-ink">
                        {copy.summary.templatePatternCoverage(
                          finding.affected_pages ?? 0,
                          audits.length,
                        )}
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] leading-relaxed text-black/50">
                      {finding.why ?? finding.detail}
                    </p>
                    <p className="mt-1 text-[10.5px] leading-relaxed text-black/38">
                      {copy.summary.templatePatternHint}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <ul className="divide-y divide-black/10 bg-white">
            {audits.map((audit, index) => {
              const firstFinding = audit.findings?.find(
                (finding) => !repeatedCodes.has(finding.code),
              );
              return (
                <li
                  key={audit.url}
                  className="grid gap-3 px-5 py-3.5 sm:grid-cols-[28px_minmax(0,1fr)_auto] sm:items-center sm:px-6"
                >
                  <span className="font-mono text-[11px] text-black/38">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-[12.5px] font-semibold text-ink-deep">
                      {audit.title ?? audit.url}
                    </p>
                    <p className="mt-0.5 truncate text-[11px] text-black/44">
                      {audit.ok === false
                        ? copy.summary.pageCouldNotRead
                        : (firstFinding?.headline ??
                          firstFinding?.title ??
                          audit.url)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] sm:justify-end">
                    {audit.score != null ? (
                      <span className="font-semibold text-ink-deep">
                        {copy.summary.health(Math.round(audit.score))}
                      </span>
                    ) : null}
                    {audit.report_id ? (
                      <a
                        href={`${APP_REPORT_URL}/${audit.report_id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 font-semibold text-ink-deep underline decoration-black/18 underline-offset-4 hover:text-signal-ink"
                      >
                        {copy.summary.openReport}
                        <ArrowRight
                          className="h-3.5 w-3.5"
                          aria-hidden="true"
                        />
                      </a>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <p className="bg-white px-5 py-4 text-[12px] text-black/54 sm:px-6">
          {unavailableSummary}
        </p>
      )}
    </Fold>
  );
}

function InitialScanSummary({ result }: { result: AnswerCheckResult }) {
  const copy = useDictionary().answerCheck;
  const locale = useLocale();
  const discoveryNotes = discoveryFileNotes(copy);
  const findings = sortedFindings(result);
  const audits = result.page_audits ?? [];
  const homepageAudit = result.homepage_audit;
  const entityAudits = result.entity_page_audits ?? [];
  const categoryAudits = result.category_page_audits ?? [];
  const contentAudits = result.content_page_audits ?? [];
  const homepageDetailed =
    homepageAudit && "checks_evaluated" in homepageAudit ? homepageAudit : null;
  const homepageOk = Boolean(homepageDetailed?.ok);
  const deepAuditState = deriveDeepAuditCardState(result);
  const sampledAuditGroups = deriveSampledAuditGroups(result);
  const pdpLayoutCoverage = derivePdpLayoutCoverage(result);
  const pdpLayoutLabelByKey = new Map(
    (pdpLayoutCoverage?.families ?? []).map((family) => [
      family.key,
      family.label,
    ]),
  );
  const categoryTemplatePatterns = deriveTemplatePatterns(
    result,
    "category_page_audit",
  );
  const contentTemplatePatterns = deriveTemplatePatterns(
    result,
    "content_page_audit",
  );
  const pdpRepeatedPatterns = (() => {
    const grouped = new Map<string, { finding: Finding; urls: Set<string> }>();
    for (const audit of audits) {
      for (const finding of audit.findings ?? []) {
        const key = `${findingHeadline(finding).trim().toLowerCase()}|${finding.template_key ?? ""}`;
        const existing = grouped.get(key);
        if (existing) existing.urls.add(audit.url);
        else grouped.set(key, { finding, urls: new Set([audit.url]) });
      }
    }
    return Array.from(grouped.values())
      .filter((item) => item.urls.size >= 2)
      .map(({ finding, urls }) => ({
        ...finding,
        affected_pages: urls.size,
        affected_urls: Array.from(urls),
      }))
      .sort((left, right) => {
        const severity =
          (FINDING_RANK[left.severity ?? "medium"] ?? 2) -
          (FINDING_RANK[right.severity ?? "medium"] ?? 2);
        if (severity) return severity;
        return (right.affected_pages ?? 0) - (left.affected_pages ?? 0);
      })
      .slice(0, 5);
  })();
  const pageAuditStatus = deepAuditState.status;
  const pageAuditsInFlight = deepAuditState.inFlight;
  const pageAuditsGated = deepAuditState.gated;
  const catalogFindings = findings.filter(isCatalogFinding);
  const consistencyFindings = findings.filter(
    (finding) => finding.source === "catalog_sample",
  );
  const qualityChecksEvaluated = audits.reduce(
    (sum, audit) =>
      sum + (audit.quality_checks_evaluated ?? audit.checks_evaluated),
    0,
  );
  const qualityChecksPassed = audits.reduce(
    (sum, audit) =>
      sum +
      (audit.quality_checks_passed ??
        Math.max(
          0,
          (audit.quality_checks_evaluated ?? audit.checks_evaluated) -
            (audit.quality_checks_failed ?? audit.checks_failed),
        )),
    0,
  );
  const qualityChecksFailed = audits.reduce(
    (sum, audit) => sum + (audit.quality_checks_failed ?? audit.checks_failed),
    0,
  );
  const qualityChecksUnevaluated = audits.reduce(
    (sum, audit) =>
      sum + (audit.quality_checks_unevaluated ?? audit.checks_unevaluated),
    0,
  );
  const scoredPages = audits.filter(
    (audit): audit is PageAudit & { score: number } =>
      typeof audit.score === "number" && Number.isFinite(audit.score),
  );
  const averageQualityScore = scoredPages.length
    ? scoredPages.reduce((sum, audit) => sum + audit.score, 0) /
      scoredPages.length
    : null;
  const diagnosticChecksEvaluated = audits.reduce(
    (sum, audit) =>
      sum + (audit.diagnostic_checks_evaluated ?? audit.checks_evaluated),
    0,
  );
  const diagnosticChecksUnevaluated = audits.reduce(
    (sum, audit) =>
      sum + (audit.diagnostic_checks_unevaluated ?? audit.checks_unevaluated),
    0,
  );
  const semanticSignalOrder = [
    "seo.l2.product_schema_present",
    "seo.l2.offer_present",
    "seo.l3.schema_visible_parity",
    "seo.l1.canonical_present",
    "seo.l1.title_present",
    "shopping.l2.price_present",
    "shopping.l2.availability_present",
    "shopping.l2.brand_present",
    "shopping.l2.identifier_present",
    "shopping.l2.image_present",
    "shopping.l2.description_present",
    "shopping.l2.description_sufficient",
    "aeo.l3.variant_picker_present",
  ];
  const semanticSignals = (() => {
    const rows = new Map<
      string,
      {
        checkId: string;
        fallbackLabel: string;
        passed: number;
        issues: number;
        notMeasured: number;
        kind: string;
        domain: string;
      }
    >();
    for (const audit of audits) {
      for (const signal of audit.signals ?? []) {
        const row = rows.get(signal.check_id) ?? {
          checkId: signal.check_id,
          fallbackLabel: signal.label,
          passed: 0,
          issues: 0,
          notMeasured: 0,
          kind: signal.kind,
          domain: signal.domain,
        };
        if (signal.status === "pass") row.passed += 1;
        else if (signal.status === "issue") row.issues += 1;
        else row.notMeasured += 1;
        rows.set(signal.check_id, row);
      }
    }
    return semanticSignalOrder
      .map((checkId) => rows.get(checkId))
      .filter((row): row is NonNullable<typeof row> => Boolean(row));
  })();

  const market = localizedMarketName(
    result.brand_evidence?.market ?? null,
    locale,
  );
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
  const categoryAuditCandidates = sampledAuditGroups.collectionCandidates;
  const contentAuditCandidates = sampledAuditGroups.contentCandidates;
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
    ? copy.summary.collections.toLowerCase()
    : copy.summary.collectionUrls.toLowerCase();
  const contentPageCount = entityPageTypes.page ?? 0;
  const articleCount = entityPageTypes.article ?? 0;
  const blogCount = entityPageTypes.blog ?? 0;
  const policyCount = entityPageTypes.policy ?? 0;
  const inventoryUrlLabel = inventory
    ? `${inventory.urls_discovered}${inventory.urls_capped ? "+" : ""} URLs`
    : copy.summary.productsSampled(result.products_seen);
  const robotsLabel = !inventory
    ? copy.summary.notMeasured
    : inventory.robots.status === "rules_found"
      ? copy.summary.readable
      : inventory.robots.status === "open"
        ? copy.summary.open
        : inventory.robots.status === "unavailable"
          ? copy.summary.unavailable
          : copy.summary.notMeasured;
  const sitemapLabel = !inventory
    ? copy.summary.notMeasured
    : inventory.sitemap.status === "found"
      ? copy.summary.found
      : inventory.sitemap.status === "declared"
        ? copy.summary.declared
        : inventory.sitemap.status === "not_found"
          ? copy.summary.notFound
          : copy.summary.notMeasured;
  const crawlerLabel =
    !inventory || inventory.search_crawlers.status !== "measured"
      ? copy.summary.notMeasured
      : inventory.search_crawlers.blocked > 0
        ? copy.summary.blocked(inventory.search_crawlers.blocked)
        : copy.summary.open;
  const discoveryFiles = Object.entries(inventory?.discovery_files ?? {});
  const discoveryFilesPresent = discoveryFiles.filter(
    ([, value]) => value.present === true,
  ).length;
  const internalReach = inventory?.internal_reach;
  const internalReachLabel = !internalReach
    ? copy.summary.notMeasured
    : internalReach.status === "sampled"
      ? copy.summary.internalReachSummary(
          internalReach.internal_links ?? 0,
          internalReach.product_links ?? 0,
          internalReach.collection_links ?? 0,
        )
      : internalReach.status === "not_measured"
        ? copy.summary.quickNotMeasured
        : internalReach.status;

  const siteMapRows = (
    [
      [copy.summary.productPagesLabel, `${productCount}${productCountSuffix}`],
      [
        collectionsMeasured
          ? copy.summary.collections
          : copy.summary.collectionUrls,
        `${collectionCount}${collectionCountSuffix}`,
      ],
      [copy.summary.pages, `${contentPageCount}${entitySuffix}`],
      [copy.summary.articles, `${articleCount}${entitySuffix}`],
      [copy.summary.blogs, `${blogCount}${entitySuffix}`],
      [copy.summary.policies, `${policyCount}${entitySuffix}`],
      [
        copy.summary.localeCopies,
        `${inventory?.localized_url_copies ?? 0}${inventory?.urls_capped ? "+" : ""}`,
      ],
    ] as Array<[string, string]>
  ).filter(([, value]) => Number.parseInt(value, 10) > 0);

  const staticAreas = [
    { label: copy.summary.searchPageSignals, domains: ["seo"] },
    { label: copy.summary.productShoppingData, domains: ["shopping"] },
    {
      label: copy.summary.contentMerchandising,
      domains: ["aeo", "cro", "geo"],
    },
    { label: copy.summary.trustConfidence, domains: ["eeat", "compliance"] },
    { label: copy.summary.marketsLocalization, domains: ["i18n"] },
    { label: copy.summary.technicalSecurity, domains: ["security"] },
  ]
    .map((area) => {
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
    })
    // An unmeasured capability is not a clean capability. Hide empty domains
    // instead of presenting a reassuring "0 need attention" for work we did not do.
    .filter((area) => area.evaluated + area.unevaluated > 0);

  const catalogCheckedLabel = catalog
    ? `${catalog.products_checked}${catalog.products_capped ? "+" : ""} ${copy.summary.checkedProducts}`
    : copy.summary.productsSampled(result.products_seen);
  // Store, Catalog and Product pages each already collapse on their own. An
  // outer disclosure around them was a fold inside a fold — two clicks and a
  // paragraph of preamble between the merchant and a number they can read. The
  // three rows now sit directly on the card and speak for themselves.
  return (
    <section className="border-b border-black/14 bg-[#fffaf7]">
      <div className="border-b border-black/12 bg-[#fffaf7] px-5 py-5 sm:px-6">
        <h3 className="text-[16px] font-semibold tracking-[-0.012em] text-ink-deep">
          {copy.summary.evidenceHeading}
        </h3>
        <p className="mt-1.5 max-w-[76ch] text-[12.5px] leading-relaxed text-black/56">
          {copy.summary.evidenceIntro}
        </p>
      </div>
      <Fold
        title={copy.summary.store}
        summary={
          inventory
            ? copy.summary.storeSummary(
                `${productCount}${productCountSuffix}`,
                `${collectionCount}${collectionCountSuffix} ${collectionNoun}`,
                localeCount
                  ? copy.summary.localePathCount(localeCount)
                  : (market ?? copy.summary.primaryStorefront),
                sitemapLabel.toLowerCase(),
                crawlerLabel.toLowerCase(),
              )
            : `${result.brand ?? result.domain} · ${result.platform ? platformLabel(result.platform, copy) : copy.summary.platformUnknown}`
        }
      >
        <div className="grid gap-px bg-black/10 sm:grid-cols-4">
          <div className="bg-white px-5 py-4 sm:px-6">
            <p className="text-[11px] text-black/42">{copy.summary.store}</p>
            <p className="mt-1 text-[12.5px] font-semibold text-ink-deep">
              {result.brand ?? result.domain}
            </p>
            <p className="mt-0.5 text-[11px] text-black/48">
              {result.platform
                ? platformLabel(result.platform, copy)
                : copy.summary.store}
            </p>
          </div>
          <div className="bg-white px-5 py-4">
            <p className="text-[11px] text-black/42">
              {copy.summary.publicFootprint}
            </p>
            <p className="mt-1 text-[12.5px] font-semibold text-ink-deep">
              {inventoryUrlLabel}
            </p>
            <p className="mt-0.5 text-[11px] text-black/48">
              {inventory?.localized_url_copies
                ? copy.summary.localizedCopies(inventory.localized_url_copies)
                : copy.summary.publicUrls}
            </p>
          </div>
          <div className="bg-white px-5 py-4">
            <p className="text-[11px] text-black/42">
              {copy.summary.localePaths}
            </p>
            <p className="mt-1 text-[12.5px] font-semibold text-ink-deep">
              {localeCount || copy.summary.primary}
            </p>
            <p className="mt-0.5 text-[11px] text-black/48">
              {inventory?.locales.length
                ? inventory.locales.join(", ")
                : (market ?? copy.summary.primaryStorefront)}
            </p>
          </div>
          <div className="bg-white px-5 py-4 sm:px-6">
            <p className="text-[11px] text-black/42">{copy.summary.domains}</p>
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
                  {copy.summary.whatExists}
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
                    {copy.summary.lowerBounds}
                  </p>
                ) : null}
              </div>

              <div>
                <p className="text-[11px] font-semibold text-ink-deep">
                  {copy.summary.discoverable}
                </p>
                <dl className="mt-3 divide-y divide-black/10 border-y border-black/10 bg-white">
                  {[
                    [
                      copy.summary.robots,
                      robotsLabel,
                      inventory.robots.status === "unavailable",
                    ],
                    [
                      copy.summary.sitemap,
                      `${sitemapLabel}${inventory.sitemap.urls_from_sitemap ? ` · ${inventory.sitemap.urls_from_sitemap}${inventory.urls_capped ? "+" : ""} URLs` : ""}`,
                      inventory.sitemap.status === "not_found",
                    ],
                    [
                      copy.summary.searchCrawlers,
                      inventory.search_crawlers.status === "measured"
                        ? copy.summary.allowed(
                            inventory.search_crawlers.allowed,
                            inventory.search_crawlers.total,
                          )
                        : copy.summary.notMeasured,
                      inventory.search_crawlers.blocked > 0,
                    ],
                    [
                      copy.summary.assistantCrawlers,
                      inventory.assistant_crawlers.status === "measured"
                        ? copy.summary.allowed(
                            inventory.assistant_crawlers.allowed,
                            inventory.assistant_crawlers.total,
                          )
                        : copy.summary.notMeasured,
                      inventory.assistant_crawlers.blocked > 0,
                    ],
                    [
                      copy.summary.blockedUrls,
                      inventory.robots.blocked_urls == null
                        ? copy.summary.notMeasured
                        : String(inventory.robots.blocked_urls),
                      Number(inventory.robots.blocked_urls ?? 0) > 0,
                    ],
                    [copy.summary.internalReach, internalReachLabel, false],
                    [
                      copy.summary.orphanProducts,
                      internalReach?.orphan_products === "not_measured"
                        ? copy.summary.quickNotMeasured
                        : (internalReach?.orphan_products ??
                          copy.summary.notMeasured),
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
                            ? copy.summary.found
                            : value.present === false
                              ? copy.summary.notFound
                              : copy.summary.notMeasured,
                          false,
                        ])
                      : [
                          [
                            copy.summary.discoveryFiles,
                            copy.summary.notMeasured,
                            false,
                          ],
                        ]),
                    [
                      copy.summary.sitemapFreshness,
                      inventory.sitemap.dated_urls
                        ? `${inventory.sitemap.dated_urls}${inventory.urls_capped ? "+" : ""} dated URLs`
                        : copy.summary.noDates,
                      false,
                    ],
                    [
                      copy.summary.sitemapImages,
                      inventory.sitemap.image_entries
                        ? `${inventory.sitemap.image_entries}${inventory.urls_capped ? "+" : ""} references`
                        : copy.summary.noImages,
                      false,
                    ],
                  ].map(([label, value, warn]) => (
                    <div
                      key={String(label)}
                      className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 px-3 py-2.5"
                    >
                      <dt className="text-[11px] text-black/50">
                        {label}
                        {discoveryNotes[String(label)] ? (
                          <span className="mt-0.5 block text-[11.5px] leading-snug text-black/38">
                            {discoveryNotes[String(label)]}
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
                    {copy.summary.homepageSample}
                  </p>
                ) : null}
                {discoveryFiles.length ? (
                  <p className="mt-2 text-[11px] leading-relaxed text-black/42">
                    {copy.summary.emergingFiles(
                      discoveryFilesPresent,
                      discoveryFiles.length,
                    )}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
      </Fold>

      <Fold
        title={
          result.site_kind === "brand_site"
            ? copy.summary.productCatalog
            : copy.summary.catalog
        }
        summary={
          result.site_kind === "brand_site"
            ? copy.summary.noCatalogBrandSite
            : catalog
              ? copy.summary.catalogSummary(
                  catalogCheckedLabel,
                  catalog.products_with_gaps,
                  catalog.unavailable_products,
                  consistencyFindings.length,
                )
              : copy.summary.catalogGaps(catalogFindings.length)
        }
      >
        {catalog ? (
          <div className="bg-[#fffaf7] px-5 py-5 sm:px-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-[13px] font-semibold text-ink-deep">
                  {copy.summary.catalogQuestion}
                </p>
                <p className="mt-1 text-[11.5px] text-black/50">
                  {catalogCheckedLabel}
                  {catalog.products_capped
                    ? ` · ${copy.summary.countsChecked}`
                    : ""}
                </p>
              </div>
              <span className="text-[11px] text-black/44">
                {copy.summary.withGap(catalog.products_with_gaps)}
              </span>
            </div>

            <div className="mt-4 grid gap-px border border-black/10 bg-black/10 md:grid-cols-2 xl:grid-cols-3">
              <div className="bg-white p-4">
                <p className="text-[11px] font-semibold text-ink-deep">
                  {copy.summary.categories}
                </p>
                <p className="mt-2 text-[18px] font-semibold text-ink-deep">
                  {catalog.missing_product_types}{" "}
                  <span className="text-[11px] font-normal text-black/46">
                    {copy.summary.withoutCategory}
                  </span>
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-black/48">
                  {copy.summary.productTypes(catalog.product_type_count ?? 0)} ·{" "}
                  {collectionCount}
                  {collectionCountSuffix} {collectionNoun} ·{" "}
                  {catalog.missing_tags} {copy.summary.withoutTags}
                </p>
                <p className="mt-2 text-[11px] text-black/38">
                  {copy.summary.membership}{" "}
                  {catalog.collection_membership?.status === "not_measured"
                    ? copy.summary.quickNotMeasured
                    : (catalog.collection_membership?.status ??
                      copy.summary.notMeasured)}
                </p>
                {catalog.top_product_types?.length ? (
                  <p className="mt-2 line-clamp-2 text-[11px] text-black/46">
                    {copy.summary.commonTypes}{" "}
                    {catalog.top_product_types
                      .slice(0, 4)
                      .map((item) => item.name)
                      .join(" · ")}
                  </p>
                ) : null}
                {catalog.collection_titles?.length ? (
                  <p className="mt-1 line-clamp-2 text-[11px] text-black/46">
                    {copy.summary.collectionsList}{" "}
                    {catalog.collection_titles.slice(0, 4).join(" · ")}
                  </p>
                ) : null}
              </div>
              <div className="bg-white p-4">
                <p className="text-[11px] font-semibold text-ink-deep">
                  {copy.summary.identity}
                </p>
                <p className="mt-2 text-[18px] font-semibold text-ink-deep">
                  {catalog.missing_identifiers}{" "}
                  <span className="text-[11px] font-normal text-black/46">
                    {copy.summary.withoutId}
                  </span>
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-black/48">
                  {catalog.placeholder_vendors} {copy.summary.brandVendorGaps} ·{" "}
                  {catalog.identifier_conflicts} {copy.summary.idConflicts}
                </p>
              </div>
              <div className="bg-white p-4">
                <p className="text-[11px] font-semibold text-ink-deep">
                  {copy.summary.variants}
                </p>
                <p className="mt-2 text-[18px] font-semibold text-ink-deep">
                  {catalog.multi_variant_products}{" "}
                  <span className="text-[11px] font-normal text-black/46">
                    {copy.summary.withVariants}
                  </span>
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-black/48">
                  {catalog.default_only_options} {copy.summary.noBuyerOptions} ·{" "}
                  {catalog.variant_option_gaps ?? 0}{" "}
                  {copy.summary.variantOptionGaps} ·{" "}
                  {catalog.variant_identifier_gaps} {copy.summary.variantIdGaps}
                </p>
                {catalog.option_dimensions?.length ? (
                  <p className="mt-2 line-clamp-2 text-[11px] text-black/46">
                    {copy.summary.options}{" "}
                    {catalog.option_dimensions
                      .slice(0, 5)
                      .map((item) => item.name)
                      .join(" · ")}
                  </p>
                ) : null}
              </div>
              <div className="bg-white p-4">
                <p className="text-[11px] font-semibold text-ink-deep">
                  {copy.summary.productInfo}
                </p>
                <p className="mt-2 text-[18px] font-semibold text-ink-deep">
                  {catalog.describability.strong}{" "}
                  <span className="text-[11px] font-normal text-black/46">
                    {copy.summary.wellDescribed}
                  </span>
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-black/48">
                  {catalog.missing_descriptions}{" "}
                  {copy.summary.missingDescriptions} ·{" "}
                  {catalog.thin_descriptions} {copy.summary.thin} ·{" "}
                  {catalog.missing_images} {copy.summary.withoutImages} ·{" "}
                  {catalog.duplicate_description_products}{" "}
                  {copy.summary.duplicateCopy}
                </p>
              </div>
              <div className="bg-white p-4">
                <p className="text-[11px] font-semibold text-ink-deep">
                  {copy.summary.availability}
                </p>
                <p
                  className={`mt-2 text-[18px] font-semibold ${catalog.unavailable_products ? "text-signal-ink" : "text-ink-deep"}`}
                >
                  {catalog.unavailable_products}{" "}
                  <span className="text-[11px] font-normal text-black/46">
                    {copy.summary.unavailableProducts}
                  </span>
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-black/48">
                  {catalog.total_variants} {copy.summary.variantsAcross}{" "}
                  {catalog.products_checked} {copy.summary.checkedProducts}
                </p>
              </div>
              <div className="bg-white p-4">
                <p className="text-[11px] font-semibold text-ink-deep">
                  {copy.summary.consistency}
                </p>
                {pageAuditsInFlight ? (
                  <div className="mt-2 flex items-center gap-2 text-[11px] text-black/52">
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-signal-ink" />
                    {copy.summary.comparingPages}
                  </div>
                ) : (
                  <p className="mt-2 text-[18px] font-semibold text-ink-deep">
                    {consistencyFindings.length}{" "}
                    <span className="text-[11px] font-normal text-black/46">
                      {copy.summary.sampledGaps}
                    </span>
                  </p>
                )}
                <p className="mt-1 text-[11px] leading-relaxed text-black/48">
                  {copy.summary.consistencyBody(
                    audits.length || result.products_seen,
                  )}
                </p>
              </div>
            </div>

            {catalogFindings.length ? (
              <div className="mt-5 border-t border-black/10 pt-4">
                <p className="text-[11px] font-semibold text-ink-deep">
                  {copy.summary.standsOut}
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
                          {copy.summary.high}
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
            {result.site_kind === "brand_site"
              ? copy.summary.noCatalogBrandSite
              : copy.summary.catalogLimited}
          </div>
        )}
      </Fold>

      <Fold
        defaultOpen={deepAuditState.homepageState === "reading"}
        title={copy.summary.homepage}
        summary={
          deepAuditState.homepageState === "gated"
            ? copy.summary.homepageGated
            : deepAuditState.homepageState === "reading"
              ? copy.summary.homepageReading
              : deepAuditState.homepageState === "failed"
                ? copy.summary.homepageFailed
                : homepageDetailed?.score != null
                  ? copy.summary.homepageSummary(
                      Math.round(homepageDetailed.score),
                      homepageDetailed.checks_failed,
                      homepageDetailed.checks_evaluated,
                    )
                  : copy.summary.homepageCompleted
        }
      >
        {deepAuditState.homepageState === "gated" ? (
          <p className="bg-white px-5 py-4 text-[12.5px] leading-relaxed text-black/54 sm:px-6">
            {copy.summary.homepageGated}
          </p>
        ) : deepAuditState.homepageState === "reading" ? (
          <div className="flex items-start gap-3 bg-white px-5 py-5 sm:px-6">
            <Loader2 className="mt-0.5 h-4 w-4 animate-spin text-signal-ink" />
            <p className="text-[12.5px] font-semibold text-ink-deep">
              {copy.summary.homepageReading}
            </p>
          </div>
        ) : deepAuditState.homepageState === "failed" ? (
          <p className="bg-white px-5 py-4 text-[12.5px] text-black/54 sm:px-6">
            {copy.summary.homepageFailed}
          </p>
        ) : homepageDetailed ? (
          <div className="bg-white">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/10 px-5 py-4 sm:px-6">
              <div>
                <p className="text-[12.5px] font-semibold text-ink-deep">
                  {homepageDetailed.title ?? homepageDetailed.url}
                </p>
                <p className="mt-1 text-[11px] text-black/46">
                  {copy.summary.pageCheckResult(
                    homepageDetailed.checks_failed,
                    homepageDetailed.checks_evaluated,
                    homepageDetailed.checks_unevaluated,
                  )}
                </p>
              </div>
              {homepageDetailed.report_id ? (
                <a
                  href={`${APP_REPORT_URL}/${homepageDetailed.report_id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-ink-deep underline decoration-black/18 underline-offset-4 hover:text-signal-ink"
                >
                  {copy.summary.openFullReport}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              ) : null}
            </div>
            {homepageDetailed.findings?.length ? (
              <ul className="divide-y divide-black/10 px-5 sm:px-6">
                {homepageDetailed.findings.slice(0, 4).map((finding) => (
                  <li
                    key={`${finding.code}-${finding.url ?? "home"}`}
                    className="py-3"
                  >
                    <p className="text-[11.5px] font-semibold text-ink-deep">
                      {finding.headline ?? finding.title}
                    </p>
                    <p className="mt-1 text-[11px] leading-relaxed text-black/50">
                      {finding.why ?? finding.detail}
                    </p>
                  </li>
                ))}
              </ul>
            ) : null}
            {entityAudits.length ? (
              <div className="border-t border-black/10 bg-[#fffaf7] px-5 py-4 sm:px-6">
                <p className="text-[11px] font-semibold text-ink-deep">
                  {copy.summary.trustPages}
                </p>
                <div className="mt-2 divide-y divide-black/10 border-y border-black/10 bg-white px-3">
                  {entityAudits.map((audit) => {
                    const detailed = "checks_evaluated" in audit ? audit : null;
                    const label =
                      audit.role === "about"
                        ? copy.summary.aboutPage
                        : copy.summary.contactPage;
                    return (
                      <div
                        key={`${audit.role}-${audit.url}`}
                        className="flex items-center justify-between gap-4 py-3"
                      >
                        <div className="min-w-0">
                          <p className="text-[11.5px] font-semibold text-ink-deep">
                            {label}
                          </p>
                          <p className="mt-0.5 truncate text-[11px] text-black/46">
                            {audit.ok === false
                              ? copy.summary.pageCouldNotRead
                              : (detailed?.findings?.[0]?.headline ??
                                detailed?.findings?.[0]?.title ??
                                audit.url)}
                          </p>
                        </div>
                        {detailed?.score != null ? (
                          <span className="shrink-0 text-[11px] font-semibold text-ink-deep">
                            {copy.summary.health(Math.round(detailed.score))}
                          </span>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </Fold>

      {sampledAuditGroups.showCollections ? (
        <SampledAuditFold
          title={copy.summary.collectionPageAudits}
          audits={categoryAudits}
          gated={pageAuditsGated}
          inFlight={pageAuditsInFlight}
          gatedSummary={copy.summary.collectionPagesGated(
            Math.max(categoryAuditCandidates, 1),
          )}
          readingSummary={copy.summary.collectionPagesReading}
          unavailableSummary={copy.summary.collectionPagesUnavailable}
          patterns={categoryTemplatePatterns}
        />
      ) : null}
      {/* Keep completed PDP evidence behind one disclosure. The summary carries
          the important quality + coverage numbers; merchants can open this
          layer when they want the supporting diagnostics and page reports. */}
      {deepAuditState.showProductPages ? (
        <Fold
          defaultOpen={pageAuditsInFlight}
          title={copy.summary.productPages}
          summary={
            pageAuditsInFlight
              ? copy.summary.pagesReading(result.products_seen)
              : pageAuditStatus === "failed"
                ? copy.summary.pagesFailed(result.products_seen)
                : pageAuditsGated
                  ? copy.summary.pagesGated(result.products_seen)
                  : audits.length === 0
                    ? copy.summary.pagesUnavailable
                    : averageQualityScore != null
                      ? copy.summary.pdpQualitySummary(
                          audits.length,
                          Math.round(averageQualityScore),
                          qualityChecksEvaluated,
                          diagnosticChecksEvaluated,
                        )
                      : copy.summary.pageAuditSummary(
                          audits.length,
                          qualityChecksFailed,
                          qualityChecksEvaluated,
                          qualityChecksUnevaluated,
                        )
          }
        >
          {pageAuditsInFlight ? (
            <div className="flex items-start gap-3 bg-white px-5 py-5 sm:px-6">
              <Loader2 className="mt-0.5 h-4 w-4 animate-spin text-signal-ink" />
              <div>
                <p className="text-[12.5px] font-semibold text-ink-deep">
                  {copy.summary.inspecting(result.products_seen)}
                </p>
                <p className="mt-1 text-[11.5px] text-black/50">
                  {copy.summary.evidenceReady}
                </p>
              </div>
            </div>
          ) : pageAuditStatus === "failed" ? (
            <p className="bg-white px-5 py-4 text-[12px] text-black/54 sm:px-6">
              {copy.summary.pdpFailed}
            </p>
          ) : pageAuditsGated ? (
            <p className="bg-white px-5 py-4 text-[12.5px] leading-relaxed text-black/54 sm:px-6">
              {copy.summary.pagesGatedBody}
            </p>
          ) : (
            <>
              {audits.length ? (
                <div className="border-b border-black/12 bg-white px-5 py-5 sm:px-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-black/42">
                    {copy.summary.pdpQualityHeading}
                  </p>
                  <div className="mt-3 grid gap-px border border-black/10 bg-black/10 sm:grid-cols-3">
                    <div className="bg-[#fffaf7] px-4 py-3.5">
                      <p className="text-[10.5px] text-black/46">
                        {copy.summary.pdpQualityAverage}
                      </p>
                      <p className="mt-1 text-[22px] font-semibold tracking-[-0.02em] text-ink-deep tabular-nums">
                        {averageQualityScore != null
                          ? `${Math.round(averageQualityScore)}/100`
                          : "—"}
                      </p>
                    </div>
                    <div className="bg-[#fffaf7] px-4 py-3.5">
                      <p className="text-[10.5px] text-black/46">
                        {copy.summary.pdpQualifiedChecks}
                      </p>
                      <p className="mt-1 text-[22px] font-semibold tracking-[-0.02em] text-ink-deep tabular-nums">
                        {qualityChecksEvaluated}
                      </p>
                      <p
                        className={`mt-1 text-[10.5px] ${qualityChecksFailed ? "text-signal-ink" : "text-[#1a6b43]"}`}
                      >
                        {qualityChecksFailed
                          ? `${copy.summary.pdpChecksNeedReview(qualityChecksFailed)} · ${copy.summary.pdpChecksPassed(qualityChecksPassed)}`
                          : copy.summary.pdpChecksPassed(qualityChecksPassed)}
                        {qualityChecksUnevaluated
                          ? ` · ${copy.summary.signalNotMeasured(qualityChecksUnevaluated)}`
                          : ""}
                      </p>
                    </div>
                    <div className="bg-[#fffaf7] px-4 py-3.5">
                      <p className="text-[10.5px] text-black/46">
                        {copy.summary.pdpDeepDiagnostics}
                      </p>
                      <p className="mt-1 text-[22px] font-semibold tracking-[-0.02em] text-ink-deep tabular-nums">
                        {diagnosticChecksEvaluated}
                      </p>
                      <p className="mt-1 text-[10.5px] text-black/44">
                        {diagnosticChecksUnevaluated
                          ? copy.summary.pdpDiagnosticsUnavailable(
                              diagnosticChecksUnevaluated,
                            )
                          : copy.summary.pdpDiagnosticsComplete}
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}
              {pdpLayoutCoverage ? (
                <details className="group/layout border-b border-black/12 bg-white">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-3.5 hover:bg-[#fffaf7] sm:px-6 [&::-webkit-details-marker]:hidden">
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold text-ink-deep">
                        {copy.summary.pdpLayoutCoverage}
                      </p>
                      <p className="mt-1 text-[10.5px] leading-relaxed text-black/46">
                        {copy.summary.pdpLayoutCoverageSummary(
                          pdpLayoutCoverage.layoutsDetected,
                          pdpLayoutCoverage.layoutsAudited,
                          pdpLayoutCoverage.auditedPages,
                        )}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <span className="hidden text-[10.5px] font-semibold text-black/46 sm:inline">
                        {pdpLayoutCoverage.fullyCovered
                          ? copy.summary.pdpLayoutsAllCovered
                          : copy.summary.pdpLayoutsPartiallyCovered(
                              pdpLayoutCoverage.layoutsAudited,
                              pdpLayoutCoverage.layoutsDetected,
                            )}
                      </span>
                      <ChevronDown
                        className="h-4 w-4 text-black/40 transition-transform group-open/layout:rotate-180"
                        aria-hidden="true"
                      />
                    </div>
                  </summary>
                  <div className="border-t border-black/10 bg-[#fffaf7] px-5 py-4 sm:px-6">
                    <div className="grid gap-px border border-black/10 bg-black/10 sm:grid-cols-2">
                      {pdpLayoutCoverage.families.map((family) => (
                        <div key={family.key} className="bg-white px-3 py-2.5">
                          <div className="flex items-center justify-between gap-3">
                            <p className="truncate text-[11.5px] font-semibold text-ink-deep">
                              {family.label}
                            </p>
                            <span className="shrink-0 font-mono text-[10px] text-black/42">
                              {copy.summary.pdpLayoutAuditCount(
                                family.audited_pages,
                              )}
                            </span>
                          </div>
                          <p className="mt-1 text-[10.5px] text-black/44">
                            {copy.summary.pdpLayoutObservedCount(
                              family.pages_observed,
                            )}{" "}
                            ·{" "}
                            {family.source === "public_markup"
                              ? copy.summary.pdpLayoutPublicTemplate
                              : copy.summary.pdpLayoutStructural}
                          </p>
                        </div>
                      ))}
                    </div>
                    <p className="mt-2.5 text-[10.5px] leading-relaxed text-black/38">
                      {copy.summary.pdpLayoutSampleNote(
                        pdpLayoutCoverage.candidatePages,
                      )}
                    </p>
                  </div>
                </details>
              ) : null}
              {semanticSignals.length ? (
                <div className="border-b border-black/12 bg-white px-5 py-4 sm:px-6">
                  <p className="text-[11px] font-semibold text-ink-deep">
                    {copy.summary.semanticSignalsHeading}
                  </p>
                  <p className="mt-1 max-w-[82ch] text-[10.5px] leading-relaxed text-black/46">
                    {copy.summary.semanticSignalsNote}
                  </p>
                  <div className="mt-3 grid gap-px border border-black/10 bg-black/10 sm:grid-cols-2 lg:grid-cols-3">
                    {semanticSignals.map((signal) => {
                      const total =
                        signal.passed + signal.issues + signal.notMeasured;
                      const labels = copy.summary.signalLabels as Record<
                        string,
                        string
                      >;
                      const label =
                        labels[signal.checkId] ?? signal.fallbackLabel;
                      return (
                        <div
                          key={signal.checkId}
                          className="bg-[#fffaf7] px-3 py-3"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <p className="text-[11px] font-semibold leading-snug text-ink-deep">
                              {label}
                            </p>
                            {signal.kind === "advisory" && signal.issues ? (
                              <span className="shrink-0 text-[9px] font-semibold uppercase tracking-wide text-black/40">
                                {copy.summary.opportunity}
                              </span>
                            ) : null}
                          </div>
                          <p
                            className={`mt-2 text-[14px] font-semibold ${signal.issues ? "text-signal-ink" : "text-[#1a6b43]"}`}
                          >
                            {signal.issues
                              ? copy.summary.signalIssues(signal.issues, total)
                              : copy.summary.signalVerified(
                                  signal.passed,
                                  total,
                                )}
                          </p>
                          {signal.notMeasured ? (
                            <p className="mt-0.5 text-[10px] text-black/40">
                              {copy.summary.signalNotMeasured(
                                signal.notMeasured,
                              )}
                            </p>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : null}
              <div className="border-b border-black/12 bg-[#fffaf7] px-5 py-4 sm:px-6">
                <p className="text-[11px] font-semibold text-ink-deep">
                  {copy.summary.deepAuditCoverage}
                </p>
                <p className="mt-1 text-[13px] font-semibold leading-relaxed text-ink-deep">
                  {copy.summary.deepAuditCoverageSummary(
                    audits.length,
                    diagnosticChecksEvaluated,
                    diagnosticChecksUnevaluated,
                  )}
                </p>
                <p className="mt-1.5 max-w-[84ch] text-[10.5px] leading-relaxed text-black/46">
                  {copy.summary.deepAuditCoverageNote}
                </p>
                <div className="mt-3 grid gap-px border border-black/10 bg-black/10 sm:grid-cols-2">
                  {staticAreas.map((area) => (
                    <div key={area.label} className="bg-white px-3 py-3">
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-[11px] font-semibold leading-snug text-ink-deep">
                          {area.label}
                        </p>
                        <span className="shrink-0 font-mono text-[10px] text-black/38">
                          {area.evaluated}
                        </span>
                      </div>
                      <p
                        className={`mt-2 text-[13px] font-semibold ${area.failed ? "text-signal-ink" : "text-[#1a6b43]"}`}
                      >
                        {area.failed
                          ? copy.summary.areaIssues(area.failed)
                          : copy.summary.areaClear}
                      </p>
                      <p className="mt-1 text-[10.5px] leading-relaxed text-black/42">
                        {copy.summary.areaCoverage(
                          area.evaluated,
                          area.unevaluated,
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              {pdpRepeatedPatterns.length ? (
                <div className="border-b border-black/12 bg-white px-5 py-4 sm:px-6">
                  <p className="text-[11px] font-semibold text-ink-deep">
                    {copy.summary.pdpRepeatedPatterns}
                  </p>
                  <p className="mt-1 text-[11px] leading-relaxed text-black/48">
                    {copy.summary.pdpRepeatedHint}
                  </p>
                  <ul className="mt-3 divide-y divide-black/10 border-y border-black/10">
                    {pdpRepeatedPatterns.map((finding) => (
                      <li
                        key={`${finding.code}-${finding.template_key ?? "all"}`}
                        className="flex items-start justify-between gap-4 py-3"
                      >
                        <div className="min-w-0">
                          <p className="text-[12.5px] font-semibold leading-snug text-ink-deep">
                            {findingHeadline(finding)}
                          </p>
                          {findingWhy(finding) ? (
                            <p className="mt-1 max-w-[70ch] text-[11.5px] leading-relaxed text-black/52">
                              {findingWhy(finding)}
                            </p>
                          ) : null}
                        </div>
                        <span className="shrink-0 font-mono text-[11px] font-semibold text-signal-ink">
                          {copy.summary.templatePatternCoverage(
                            finding.affected_pages ?? 0,
                            audits.length,
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              <div className="bg-white">
                <div className="border-b border-black/10 px-5 py-4 sm:px-6">
                  <p className="text-[11px] font-semibold text-ink-deep">
                    {copy.summary.sampledPagesHeading}
                  </p>
                  <p className="mt-1 max-w-[82ch] text-[10.5px] leading-relaxed text-black/46">
                    {copy.summary.sampledPagesNote}
                  </p>
                </div>
                <ul className="divide-y divide-black/10 bg-white">
                  {audits.map((audit, index) => {
                    const qualified =
                      audit.quality_checks_evaluated ?? audit.checks_evaluated;
                    const qualifiedFailed =
                      audit.quality_checks_failed ?? audit.checks_failed;
                    const qualifiedUnevaluated =
                      audit.quality_checks_unevaluated ??
                      audit.checks_unevaluated;
                    return (
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
                          <div className="mt-0.5 flex min-w-0 items-center gap-2">
                            <p className="min-w-0 truncate text-[11px] text-black/44">
                              {audit.url}
                            </p>
                            {audit.template_key ? (
                              <span className="shrink-0 border border-black/10 bg-[#fffaf7] px-1.5 py-0.5 text-[9.5px] font-semibold text-black/46">
                                {pdpLayoutLabelByKey.get(audit.template_key) ??
                                  audit.template_key}
                              </span>
                            ) : null}
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] sm:justify-end">
                          {audit.score != null ? (
                            <span className="font-semibold text-ink-deep">
                              {copy.summary.health(Math.round(audit.score))}
                            </span>
                          ) : null}
                          <span
                            className={
                              qualifiedFailed > 0
                                ? "font-semibold text-signal-ink"
                                : "font-semibold text-[#1a6b43]"
                            }
                          >
                            {copy.summary.pageCheckResult(
                              qualifiedFailed,
                              qualified,
                              qualifiedUnevaluated,
                            )}
                          </span>
                        </div>
                        {audit.report_id ? (
                          <a
                            href={`${APP_REPORT_URL}/${audit.report_id}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 justify-self-start text-[11.5px] font-semibold text-ink-deep underline decoration-black/18 underline-offset-4 hover:text-signal-ink hover:decoration-signal-ink sm:justify-self-end"
                          >
                            {copy.summary.openReport}{" "}
                            <ArrowRight
                              className="h-3.5 w-3.5"
                              aria-hidden="true"
                            />
                          </a>
                        ) : (
                          <span className="justify-self-start text-[11px] text-black/34 sm:justify-self-end">
                            {copy.summary.reportUnavailable}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </>
          )}
        </Fold>
      ) : null}

      {sampledAuditGroups.showContent ? (
        <SampledAuditFold
          title={copy.summary.contentPageAudits}
          audits={contentAudits}
          gated={pageAuditsGated}
          inFlight={pageAuditsInFlight}
          gatedSummary={copy.summary.contentPagesGated(
            Math.max(contentAuditCandidates, 1),
          )}
          readingSummary={copy.summary.contentPagesReading}
          unavailableSummary={copy.summary.contentPagesUnavailable}
          patterns={contentTemplatePatterns}
        />
      ) : null}
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
  const copy = useDictionary().answerCheck;
  return (
    <details
      open={defaultOpen}
      className="group/section border-b border-black/12 bg-[#fffaf7]"
    >
      <summary className="flex min-h-[70px] cursor-pointer list-none items-center justify-between gap-5 px-5 py-4 transition-colors hover:bg-[#fdf1e9] sm:px-6 [&::-webkit-details-marker]:hidden">
        <div className="min-w-0">
          <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-ink-deep">
            {title}
          </h3>
          <p className="mt-1 text-[12px] leading-[1.5] text-black/54">
            {summary}
          </p>
        </div>
        <span className="flex min-h-11 shrink-0 items-center gap-2 text-[11.5px] font-semibold text-black/56 transition-colors group-hover/section:text-ink-deep">
          <span className="group-open/section:hidden">
            {copy.result.details}
          </span>
          <span className="hidden group-open/section:inline">
            {copy.result.close}
          </span>
          <ChevronDown
            className="h-4 w-4 transition-transform group-open/section:rotate-180"
            aria-hidden="true"
          />
        </span>
      </summary>
      <div className="border-t border-black/10 bg-white">{children}</div>
    </details>
  );
}
/**
 * What continuing actually adds, stated before the ask rather than hidden
 * behind padlocks. The previous version showed three locked rows with no
 * explanation, which reads as a paywall for something the visitor cannot value
 * — and this stage is free, so a paywall was the wrong story entirely.
 */
function DeeperAnalysisPanel({ gate }: { gate: React.ReactNode }) {
  const copy = useDictionary().answerCheck;
  const adds = [
    copy.deeper.aiPages,
    copy.deeper.shopperAnswers,
    copy.deeper.alternatives,
  ] as const;

  return (
    <section className="border-b border-black/14 bg-[#fffaf7] px-5 py-7 sm:px-6 sm:py-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.72fr)] lg:items-center lg:gap-10">
        <div>
          <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.1em] text-signal-ink">
            {copy.deeper.eyebrow}
          </p>
          <h3 className="mt-2 max-w-[34ch] text-[20px] font-semibold leading-[1.28] tracking-[-0.02em] text-ink-deep sm:text-[22px]">
            {copy.deeper.title}
          </h3>
          <p className="mt-2 max-w-[60ch] text-[13.5px] leading-relaxed text-black/62">
            {copy.deeper.intro}
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[12.5px] font-medium text-black/64">
            {adds.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check
                  aria-hidden="true"
                  className="h-3.5 w-3.5 shrink-0 text-[#1f7a4d]"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t border-black/12 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          {gate}
        </div>
      </div>
    </section>
  );
}

/**
 * Beseam's own read of one question, derived only from what was recorded.
 * `probe.py` keeps no answer prose, so this states the counts and the names —
 * never a paraphrase of something we did not keep.
 */
function questionVerdict(answers: Answer[], copy: Dictionary["answerCheck"]) {
  const scored = answers.filter((answer) => answer.mentioned !== null);
  if (!scored.length) return copy.visibility.noUsableAnswer;

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

  const tail = rivals.length
    ? copy.visibility.rivalsTail(rivals.slice(0, 3).join(", "), rivals.length)
    : "";

  if (named === scored.length) {
    return copy.visibility.verdictAll(scored.length);
  }
  if (named === 0) {
    return copy.visibility.verdictNone(scored.length, tail);
  }
  return copy.visibility.verdictSome(named, scored.length, tail);
}

function QuestionRow({
  question,
  answers,
}: {
  question: string;
  answers: Answer[];
}) {
  const copy = useDictionary().answerCheck;
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
                  channel={answer.channel_label ?? copy.result.assistant}
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
                ? copy.visibility.askedOne
                : copy.visibility.askedMany(answers.length)}
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
                const channel = answer.channel_label ?? copy.result.assistant;

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
                        <span className="font-semibold">
                          {copy.visibility.googleSearch}{" "}
                        </span>
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
                          {copy.visibility.excerpt}
                        </p>
                      </div>
                    ) : answer.error ? (
                      <p className="mt-1.5 border border-dashed border-black/16 px-3.5 py-2.5 text-[12.5px] leading-relaxed text-black/48">
                        {copy.visibility.unreachable(channel, answer.error)}
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
                        {copy.visibility.noWrittenAnswer(channel)}
                      </p>
                    )}

                    <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12.5px]">
                      <span
                        className={`font-semibold ${answer.mentioned === true ? "text-[#1a6b43]" : answer.mentioned === false ? "text-signal-ink" : "text-black/56"}`}
                      >
                        {answer.mentioned === true
                          ? copy.visibility.namedYou
                          : answer.mentioned === false
                            ? copy.visibility.didNotNameYou
                            : copy.visibility.noVerdict}
                      </span>
                      {instead.length ? (
                        <span className="text-black/62">
                          · {copy.visibility.namedInstead} {instead.join(", ")}
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
                ? copy.visibility.productsSurfaced
                : copy.visibility.noProducts}
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
                {copy.visibility.addsUpTo}
              </p>
              <p className="mt-1.5 max-w-[46ch] text-[13px] leading-relaxed text-ink-deep">
                {questionVerdict(answers, copy)}
              </p>
            </div>
          </div>
        </div>
      </details>
    </li>
  );
}
function VisibilityDisclosure({ result }: { result: AnswerCheckResult }) {
  const copy = useDictionary().answerCheck;
  const locale = useLocale();
  const attempts = result.answers.filter((answer) =>
    Boolean(answer.channel_label),
  );
  const scored = attempts.filter((answer) => answer.mentioned !== null);
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
      title={copy.visibility.title}
      summary={
        scored.length > 0
          ? attempts.length > scored.length
            ? copy.visibility.summaryWithAttempts(
                named,
                scored.length,
                attempts.length,
                rows.length,
              )
            : copy.visibility.summary(named, scored.length, rows.length)
          : attempts.length > 0
            ? copy.visibility.noUsableSummary(attempts.length, rows.length)
            : copy.visibility.checking
      }
    >
      <AiVisibilityWorkspace result={result} />

      {rows.length > 0 ? (
        <details className="group/ai-evidence border-t border-black/18 bg-white">
          <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-[12.5px] font-semibold text-ink-deep hover:bg-[#fffaf7] sm:px-5 [&::-webkit-details-marker]:hidden">
            {copy.visibility.assistantEvidence}
            <ChevronDown
              className="h-4 w-4 shrink-0 text-black/40 transition-transform group-open/ai-evidence:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <div className="border-t border-black/12">
            {rivals.length > 0 ? (
              <div className="px-4 py-4 sm:px-5">
                <p className="text-[12px] font-semibold text-black/62">
                  {copy.visibility.competitors}
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
                  {copy.visibility.openQuestion}
                </p>
                {questionLanguageBadge(result, locale) ? (
                  <span className="shrink-0 rounded-[3px] border border-black/16 px-2 py-0.5 text-[11.5px] font-medium text-black/58">
                    {copy.visibility.askedIn(
                      questionLanguageBadge(result, locale)!,
                    )}
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
        </details>
      ) : null}
    </ScanDisclosure>
  );
}
// findings the card now leads with in plain words. Two lists of one set of
// findings is the duplication this redesign exists to remove — the technical
// reading moved under each finding's "What we saw", and the per-page numbers
// live in Full evidence.

/**
 * The one sentence a merchant would repeat to their team. On a completed scan
 * the report leads with the decision layer (the top priorities), while the AI
 * sampling result remains visible immediately below as evidence.
 */
function ScanHeadline({ result }: { result: AnswerCheckResult }) {
  const copy = useDictionary().answerCheck;
  const brand = result.brand || result.domain;
  const scored = result.answers.filter((answer) => answer.mentioned !== null);
  const missed = scored.filter((answer) => answer.mentioned === false).length;
  const findings = reportFindingGroups(result, copy).length;
  const running = isScanInFlight(result);
  const sampledPages = result.page_audits ?? [];
  const catalog = result.catalog_inventory;
  const productCount =
    catalog?.products_checked && catalog.products_checked > 0
      ? `${catalog.products_checked}${catalog.products_capped ? "+" : ""}`
      : String(result.products_seen);
  const qualifiedChecks = sampledPages.reduce(
    (sum, audit) =>
      sum + (audit.quality_checks_evaluated ?? audit.checks_evaluated ?? 0),
    0,
  );
  const credibility =
    sampledPages.length > 0 && qualifiedChecks > 0
      ? copy.result.credibilityLine(
          productCount,
          sampledPages.length,
          qualifiedChecks,
        )
      : null;

  let headline: string;
  let support: string | null = null;

  if (findings > 0 && !running) {
    const priorityCount = Math.min(FIRST_SHOWN, findings);
    headline = copy.result.headlinePriorities(brand, priorityCount);
    support = null;
  } else if (scored.length) {
    headline =
      missed === 0
        ? copy.result.headlineAll(brand, scored.length)
        : missed === scored.length
          ? copy.result.headlineNone(brand, scored.length)
          : copy.result.headlineMissed(brand, missed, scored.length);
    support = copy.result.sampledSupport;
  } else if (findings) {
    headline = copy.result.headlineFindings(brand, findings);
    support = running ? copy.result.moreMayFollow : copy.result.findingsSupport;
  } else if (running) {
    headline = copy.result.headlineReading(brand);
    support = copy.result.readingSupport;
  } else {
    headline = copy.result.headlineClear(brand);
    support = copy.result.clearSupport;
  }

  return (
    <section className="border-b border-black/12 bg-[#fffaf7] px-5 py-7 sm:px-6 sm:py-8">
      <p className="max-w-[30ch] text-balance font-display text-[clamp(1.65rem,3.4vw,2.4rem)] font-normal leading-[1.1] tracking-[-0.024em] text-ink-deep">
        {headline}
      </p>
      <p className="mt-3 max-w-[68ch] text-[14px] font-medium leading-[1.58] text-ink-deep/76">
        {copy.result.valueSummary}
      </p>
      {support ? (
        <p className="mt-1.5 max-w-[62ch] text-[12.5px] leading-[1.55] text-black/48">
          {support}
        </p>
      ) : null}
      {credibility ? (
        <p className="mt-4 border-t border-black/10 pt-3 text-[11.5px] leading-[1.5] text-black/46">
          {credibility}
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
function RejectedNotice({
  result,
  continueHref,
}: {
  result: AnswerCheckResult;
  continueHref?: string;
}) {
  const copy = useDictionary().answerCheck;
  const reason = result.reject_reason ?? "";
  const blocked = reason.toLowerCase().includes("blocked");
  const noProducts = reason.toLowerCase().includes("product pages");

  const explanation = blocked
    ? copy.errors.blockedExplanation
    : noProducts
      ? copy.errors.noProductsExplanation
      : copy.errors.genericExplanation;

  const suggestions = blocked
    ? copy.errors.blockedSuggestions
    : noProducts
      ? copy.errors.noProductsSuggestions
      : copy.errors.genericSuggestions;

  return (
    <section className="border-b border-black/14 bg-white px-5 py-6 sm:px-6">
      <p className="max-w-[32ch] text-balance font-display text-[clamp(1.4rem,2.8vw,1.95rem)] font-normal leading-[1.14] tracking-[-0.02em] text-ink-deep">
        {copy.errors.rejectedTitle(result.domain)}
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
        {copy.errors.reported(reason)}
      </p>
      <div className="mt-5 flex flex-col gap-3 border-t border-black/12 pt-5 sm:flex-row">
        {continueHref ? (
          <TrackedLink
            href={continueHref}
            eventName="scan_continue_clicked"
            eventCategory="conversion"
            placement="answer_check_rejected"
            preserveUtm
            className="group inline-flex min-h-12 items-center justify-center gap-2 bg-ink-deep px-6 text-[14px] font-semibold text-white transition-colors hover:bg-signal-ink"
          >
            {copy.errors.continueCta}
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            />
          </TrackedLink>
        ) : null}
        <BookReviewCta
          location="scan_rejected"
          label={copy.errors.reviewCta}
          className="min-h-12 gap-2 border border-black/24 bg-white px-6 py-0 text-[14px] font-semibold text-ink-deep hover:border-ink-deep"
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
  const copy = useDictionary().answerCheck;
  const locale = useLocale();
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
    const shareUrl = new URL(
      locale === "de" ? "/de/scan" : "/scan",
      window.location.origin,
    );
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

  const marketing = marketLabel(result, locale);
  const identityLine =
    identityMeta ??
    [
      result.domain,
      result.platform ? platformLabel(result.platform, copy) : null,
      marketing,
    ]
      .filter(Boolean)
      .join(" · ");

  return (
    <div className="overflow-hidden rounded-[3px] border border-black/16 bg-white text-left shadow-[0_18px_55px_rgba(44,31,24,0.055)]">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-black/12 bg-white px-5 py-4 sm:px-6 sm:py-5">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <BrandFavicon
              domain={result.domain}
              name={identity ?? result.brand ?? result.domain}
            />
            {/* The page's heading once a result is on it: the marketing
                headline is gone by then, and this names the store, so the
                document is not left with no top-level title. */}
            <h1 className="text-[21px] font-semibold leading-snug tracking-[-0.022em] text-ink-deep sm:text-[22px]">
              {identity ?? result.brand ?? result.domain}
            </h1>
          </div>
          <p className="mt-1.5 text-[12px] leading-relaxed text-[#5f5a55]">
            {identityLine}
          </p>
        </div>
        {/* One status statement for the whole card. The run detail lives in the
            progress list above; repeating it here — next to a section that also
            announced "Observe complete" — was the page telling the visitor the
            same thing three times in three different vocabularies. */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex min-h-10 items-center gap-2 rounded-[3px] border border-black/14 bg-[#fffaf7] px-3 text-[11.5px] font-semibold text-ink-deep sm:min-h-11 sm:text-[12px]">
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
              ? copy.result.statusRejected
              : inFlight
                ? copy.result.statusRunning
                : result.status === "awaiting_verification"
                  ? copy.result.statusFreeReady
                  : result.status === "failed"
                    ? copy.result.statusFailed
                    : copy.result.statusComplete}
          </span>
          <button
            type="button"
            hidden={Boolean(result.reject_reason) || result.status !== "ready"}
            onClick={() => void onShare()}
            className="hidden min-h-11 items-center gap-2 rounded-[3px] border border-black/14 bg-white px-3 text-[12px] font-semibold text-ink-deep transition-colors hover:border-black/30 hover:bg-[#fffaf7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-ink/35 sm:inline-flex"
            aria-label={copy.result.shareAria}
          >
            {shareStatus === "copied" || shareStatus === "shared" ? (
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            <span aria-live="polite">
              {shareStatus === "copied"
                ? copy.result.linkCopied
                : shareStatus === "shared"
                  ? copy.result.shared
                  : shareStatus === "failed"
                    ? copy.result.copyFailed
                    : copy.result.share}
            </span>
          </button>
          <button
            type="button"
            hidden={Boolean(result.reject_reason) || result.status !== "ready"}
            onClick={onPrint}
            className="hidden min-h-11 items-center gap-2 rounded-[3px] border border-black/14 bg-white px-3 text-[12px] font-semibold text-ink-deep transition-colors hover:border-black/30 hover:bg-[#fffaf7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-ink/35 sm:inline-flex"
          >
            <Printer className="h-3.5 w-3.5" aria-hidden="true" />
            {copy.result.print}
          </button>
          {!result.reject_reason && result.status === "ready" ? (
            <details className="group/actions relative sm:hidden">
              <summary
                className="inline-flex min-h-10 min-w-10 cursor-pointer list-none items-center justify-center rounded-[3px] border border-black/14 bg-white text-ink-deep hover:bg-[#fffaf7] sm:min-h-11 sm:min-w-11 [&::-webkit-details-marker]:hidden"
                aria-label={copy.result.moreActions}
              >
                <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
              </summary>
              <div className="absolute right-0 top-[calc(100%+0.35rem)] z-40 min-w-[10rem] rounded-[3px] border border-black/14 bg-white p-1 shadow-[0_12px_28px_rgba(17,17,17,0.14)]">
                <button
                  type="button"
                  onClick={() => void onShare()}
                  className="flex min-h-10 w-full items-center gap-2 rounded-[3px] px-3 text-left text-[12px] font-semibold text-ink-deep hover:bg-[#fffaf7]"
                >
                  <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
                  {copy.result.share}
                </button>
                <button
                  type="button"
                  onClick={onPrint}
                  className="flex min-h-10 w-full items-center gap-2 rounded-[3px] px-3 text-left text-[12px] font-semibold text-ink-deep hover:bg-[#fffaf7]"
                >
                  <Printer className="h-3.5 w-3.5" aria-hidden="true" />
                  {copy.result.print}
                </button>
              </div>
            </details>
          ) : null}
        </div>
      </div>
      {result.reject_reason ? (
        <RejectedNotice result={result} continueHref={continueHref} />
      ) : (
        <>
          <ScanHeadline result={result} />
          <FoundStrip result={result} />
          <WorthLookingAt result={result} />

          {verificationGate && result.status === "awaiting_verification" ? (
            <DeeperAnalysisPanel gate={verificationGate} />
          ) : null}

          {scored.length > 0 || result.questions.length > 0 ? (
            <VisibilityDisclosure result={result} />
          ) : null}

          <InitialScanSummary result={result} />

          {/* Method and limits are useful proof, but secondary to the findings. */}
          {result.status === "ready" ? <ScanBoundary result={result} /> : null}

          {continueHref && result.status === "ready" ? (
            <ClosingContinue
              domain={result.domain}
              continueHref={continueHref}
              priorityCount={Math.min(
                FIRST_SHOWN,
                reportFindingGroups(result, copy).length,
              )}
            />
          ) : null}
        </>
      )}
    </div>
  );
}

export default function AnswerCheck({
  placement = "homepage_hero",
  formNote,
  preamble,
  belowForm,
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
   * The case for running a scan, rendered above the field. It is true for a
   * cold visitor and in the way the moment a real audit is on the page, so it
   * retires as soon as the scan is the content: an argument for the thing has
   * no business sitting on top of the thing.
   */
  preamble?: ReactNode;
  /**
   * The scope and the returns, rendered under the field. Everything a visitor
   * needs in order to judge the scan but not in order to start one belongs
   * here: put it above the field and the field lands a screen down, which is
   * what this page did before. It retires the moment a scan starts -- an
   * argument for the thing has no business sitting next to the thing running.
   */
  belowForm?: ReactNode;
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
  const locale = useLocale();
  const t = useDictionary();
  const copy = t.answerCheck;

  const apiError = (
    payload: unknown,
    status: number,
    fallback: string,
  ): string => {
    if (status === 429) return copy.errors.rateLimited;
    const value =
      payload && typeof payload === "object"
        ? String(
            (payload as { detail?: unknown; error?: unknown }).detail ??
              (payload as { error?: unknown }).error ??
              "",
          ).trim()
        : "";
    const known: Record<string, string> = {
      "Enter your store domain.": copy.errors.enterDomain,
      "Enter a store domain, like yourstore.com.": copy.errors.enterDomain,
      "Enter your own store domain.": copy.errors.ownDomain,
      "Enter a valid work email.": copy.errors.invalidEmail,
      "The scan service is unavailable right now.":
        copy.errors.serviceUnavailable,
      "We could not scan that domain.": copy.errors.scanDomain,
      "We could not send the verification email.": copy.errors.sendEmail,
    };
    return (known[value] ?? value) || fallback;
  };
  const [domain, setDomain] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [result, setResult] = useState<AnswerCheckResult | null>(null);
  const [error, setError] = useState("");
  const [verificationError, setVerificationError] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);
  const [verifiedArrival, setVerifiedArrival] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [verificationSubmitting, setVerificationSubmitting] = useState(false);
  const [retrySubmitting, setRetrySubmitting] = useState(false);
  const pollCount = useRef(0);
  const [pollExhausted, setPollExhausted] = useState(false);

  const load = useCallback(
    async (target: string) => {
      const response = await fetch(
        `/api/answer-check?domain=${encodeURIComponent(target)}&locale=${encodeURIComponent(locale)}`,
      );
      if (!response.ok) return null;
      return (await response.json()) as AnswerCheckResult;
    },
    [locale],
  );

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
            locale,
          }),
        });
        const payload = await response.json();

        if (!response.ok) {
          setError(apiError(payload, response.status, copy.errors.scanDomain));
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
        setError(copy.errors.serviceUnavailable);
      } finally {
        setSubmitting(false);
      }
    },
    [locale, placement, trackEvent, website],
  );

  // Arrivals with ?domain=: a verification click, a shared link, or the hand-off
  // from the homepage hero. Failed verification links land here too, with a
  // specific human-readable error.
  const arrivalHandled = useRef(false);
  useEffect(() => {
    if (arrivalHandled.current) return;
    arrivalHandled.current = true;

    const params = new URLSearchParams(window.location.search);
    setVerifiedArrival(params.get("verified") === "1");
    const scanError = params.get("scan_error");
    if (scanError === "missing_token") {
      setError(copy.errors.missingToken);
    } else if (scanError === "link_used") {
      setError(copy.errors.usedToken);
    } else if (scanError === "unavailable") {
      setError(copy.errors.verifyUnavailable);
    }

    const fromUrl = params.get("domain");
    if (!fromUrl) return;
    setDomain(fromUrl);
    void load(fromUrl).then((payload) => {
      // A cached scan renders immediately — this is the path back from the
      // emailed link. Nothing usable cached means the free stage never produced
      // anything for this domain, so the arrival starts it on the domain alone:
      // the hero promised a scan, and a page that only re-asks for the domain
      // does not deliver one. The address is asked once the store is on screen.
      if (payload && hasUsableFreeStage(payload)) {
        setResult(payload);
        return;
      }
      if (handOffTo) return;
      trackEvent({
        action: "answer_check_started",
        category: "conversion",
        label: placement,
      });
      void runScan(fromUrl, "");
    });
  }, [load, runScan, handOffTo, placement, trackEvent]);
  // Poll while the paid probe or its page-audit sample is running, and while a
  // sent link is still unclicked: nothing runs behind the gate any more, and the
  // click usually happens in a mail app or on a phone, so this page has to notice
  // it and continue on its own. The budget is finite, so the exhausted case has
  // to say so: silently ceasing to poll leaves a row spinning with nothing to act
  // on.
  const awaitingClick =
    verificationSent && result?.status === "awaiting_verification";
  useEffect(() => {
    if (!result || (!isScanInFlight(result) && !awaitingClick)) return;
    if (pollCount.current >= MAX_POLLS) {
      // Only work that was actually running can have stalled. A link that has
      // not been clicked yet is not a failure to report, so the budget simply
      // runs out in silence and the ask stays where it is.
      if (isScanInFlight(result)) setPollExhausted(true);
      return;
    }

    const timer = setTimeout(() => {
      pollCount.current += 1;
      void load(result.domain).then((payload) => {
        if (payload) setResult(payload);
      });
    }, POLL_MS);

    return () => clearTimeout(timer);
  }, [result, load, awaitingClick]);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setVerificationSent(false);

    const target = domain.trim();
    if (!target) {
      setError(copy.errors.enterDomain);
      return;
    }

    // The domain alone starts the scan. The free stage needs no address, and
    // asking for one before anything has run puts the gate in front of the
    // evidence: the visitor pays before seeing what they are paying for. The
    // email is asked while the scan is on screen, doing its work.
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

    await runScan(target, "");
  };

  const onVerificationSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setVerificationError("");

    const address = email.trim();
    if (!address) {
      setVerificationError(copy.errors.enterEmail);
      return;
    }
    if (!result) return;

    setVerificationSubmitting(true);
    try {
      const send = () =>
        fetch("/api/answer-check", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            domain: result.domain,
            email: address,
            source: placement,
            website,
            locale,
          }),
        });

      // The arrival spent this IP's burst slot seconds ago starting the scan.
      // A 429 here is the two-step flow working as designed, not a refusal:
      // hold the sending state and try once more when the window has cleared.
      let response = await send();
      if (response.status === 429) {
        const retryAfter = Number(response.headers.get("retry-after"));
        const waitMs =
          Number.isFinite(retryAfter) && retryAfter > 0
            ? Math.min(retryAfter, 60) * 1000
            : 30_000;
        await new Promise((resolve) => setTimeout(resolve, waitMs));
        response = await send();
      }

      const payload = await response.json();
      if (!response.ok) {
        setVerificationError(
          apiError(payload, response.status, copy.errors.sendEmail),
        );
        return;
      }

      setResult(payload as AnswerCheckResult);
      setVerificationSent(true);
      // The link is what starts the slow half, and the wait for the click is its
      // own budget: whatever the free stage already spent polling must not eat
      // into it.
      pollCount.current = 0;
      setPollExhausted(false);
      trackEvent({
        action: "answer_check_verification_requested",
        category: "conversion",
        label: placement,
      });
    } catch {
      setVerificationError(copy.errors.sendEmailNow);
    } finally {
      setVerificationSubmitting(false);
    }
  };

  const onRetryAudit = useCallback(async () => {
    if (!result || !result.retryable) return;
    setRetrySubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/answer-check", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          domain: result.domain,
          retry: true,
          source: placement,
          website,
          locale,
        }),
      });
      const payload = await response.json();
      if (!response.ok) {
        setError(apiError(payload, response.status, copy.errors.scanDomain));
        return;
      }
      setResult(payload as AnswerCheckResult);
      pollCount.current = 0;
      setPollExhausted(false);
    } catch {
      setError(copy.errors.serviceUnavailable);
    } finally {
      setRetrySubmitting(false);
    }
  }, [
    copy.errors.scanDomain,
    copy.errors.serviceUnavailable,
    locale,
    placement,
    result,
    website,
  ]);

  const inputClass =
    "h-12 w-full border border-black/22 bg-white px-4 text-left text-[15px] text-ink-deep placeholder:text-black/40 focus:border-signal-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-ink";

  // Once the visitor has submitted, the page belongs to the result: the form,
  // the progress rail, the address ask and the audit share one column so they
  // read as a single surface instead of three cards of different widths
  // floating over each other. A cold page keeps the narrow, focused field.
  const inResultMode = Boolean(submitting || result);
  const columnClass = inResultMode ? "max-w-[80rem]" : "max-w-3xl";

  // One button, one job on every surface: start the scan. The hero routes to
  // the page that owns the result and the page posts it, but the promise the
  // visitor reads is the same in both places.
  //
  // Filled while it is the page's one action; quiet once a scan is on screen,
  // where the address ask below owns the primary weight and this is only the
  // way to point at a different store. Two filled buttons a gap apart is two
  // primaries, which is none.
  const submitButton = (
    <button
      type="submit"
      disabled={submitting}
      className={`group inline-flex min-h-12 items-center justify-center gap-2 px-6 text-[15px] font-semibold disabled:opacity-70 ${
        inResultMode
          ? "border border-black/28 bg-white text-ink-deep transition-colors hover:border-signal-ink hover:text-signal-ink"
          : "bg-signal-ink text-white"
      }`}
    >
      {submitting
        ? t.scan.form.submitting
        : inResultMode
          ? t.scan.form.again
          : t.scan.form.submit}
      <ArrowRight
        aria-hidden="true"
        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
      />
    </button>
  );

  // Keep the progress rail only while work is actually running. Once the fast
  // public read lands, the findings themselves are more persuasive than a list
  // of pending steps; the email unlock inside the result explains what starts
  // next without pushing the evidence below the fold.
  const showProgress = Boolean(
    submitting || (result && !result.reject_reason && isScanInFlight(result)),
  );

  // A domain someone already ran to completion is the one path where the whole
  // audit renders with nothing asked for it, so `ready` asks too — the address
  // buys the link rather than the probe. `rejected` never asks: there is no
  // audit to send.
  const scanIsComplete = result?.status === "ready";

  // The email gate has two jobs only: authorize the slow half of a fresh scan,
  // or let someone who opened a shared/cached finished scan keep a copy. A
  // visitor who arrived through the verification link has already given us the
  // address, and must never be asked for it again.
  const showEmailAsk = Boolean(
    !handOffTo &&
    result &&
    !result.reject_reason &&
    (result.status === "awaiting_verification" ||
      (scanIsComplete && !verificationSent && !verifiedArrival)),
  );

  // The address ask is rendered inside the result, after the visitor has seen
  // the first useful evidence. The form itself stays compact; the result panel
  // around it explains what confirming unlocks.
  const emailAsk = showEmailAsk ? (
    <div>
      {verificationSent ? (
        <>
          <p className="flex items-center gap-2 text-[13px] font-semibold text-[#1a6b43]">
            <MailCheck className="h-4 w-4" aria-hidden="true" />
            {copy.email.sentTo(email.trim())}
          </p>
          <p className="mt-2 text-[16px] font-semibold tracking-[-0.01em] text-ink-deep">
            {scanIsComplete
              ? copy.email.completeTitle
              : copy.email.continueTitle}
          </p>
          <p className="mt-1.5 text-[12.5px] leading-relaxed text-[#5f5a55]">
            {scanIsComplete ? copy.email.completeBody : copy.email.continueBody}
          </p>
          <button
            type="button"
            onClick={() => setVerificationSent(false)}
            className="mt-3 inline-flex min-h-10 items-center text-[12.5px] font-semibold text-ink-deep underline decoration-black/30 underline-offset-4 transition-colors hover:text-signal-ink hover:decoration-signal-ink"
          >
            {copy.email.differentEmail}
          </button>
        </>
      ) : (
        <form onSubmit={onVerificationSubmit} noValidate>
          <label className="sr-only" htmlFor="answer-check-email">
            {copy.email.label}
          </label>
          <div className="grid gap-2.5">
            <input
              id="answer-check-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (verificationError) setVerificationError("");
              }}
              placeholder={copy.email.placeholder}
              aria-invalid={Boolean(verificationError)}
              className={inputClass}
            />
            <button
              type="submit"
              disabled={verificationSubmitting}
              className="group inline-flex min-h-12 w-full items-center justify-center gap-2 bg-signal-ink px-6 text-[14px] font-semibold text-white disabled:opacity-70"
            >
              {verificationSubmitting
                ? copy.email.sending
                : scanIsComplete
                  ? copy.email.completeCta
                  : copy.email.runningCta}
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              />
            </button>
          </div>
          <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11.5px] font-medium text-[#3b3833]">
            {copy.email.assurances.map((item) => (
              <span key={item} className="inline-flex items-center gap-1.5">
                <Check aria-hidden="true" className="h-3 w-3 text-[#1f7a4d]" />
                {item}
              </span>
            ))}
          </p>
          <p className="mt-2 text-[11px] leading-relaxed text-[#5f5a55]">
            {copy.email.privacyPrefix}{" "}
            <a
              href="/privacy-policy"
              className="underline decoration-black/25 underline-offset-2 hover:text-signal-ink hover:decoration-signal-ink"
            >
              {copy.email.privacy}
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
      )}
    </div>
  ) : null;

  return (
    <div>
      {preamble && !inResultMode ? (
        <div className="mb-2">{preamble}</div>
      ) : null}

      {showPromise && !result ? (
        <div className="mb-6">
          <FreeScanPromise />
        </div>
      ) : null}

      {/* A merchant owns one store. Once it has been read, the field they typed
          it into is furniture: the audit's own header names the store, and a
          live input inviting them to scan a different one answers a question
          nobody asked. So the form exists to start a scan and then goes. */}
      {inResultMode ? null : (
        <form
          id="answer-check-form"
          onSubmit={onSubmit}
          noValidate
          className={`mx-auto w-full border border-black/18 bg-white p-3 sm:p-4 ${columnClass}`}
        >
          <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
            <div>
              <label className="sr-only" htmlFor="answer-check-domain">
                {t.scan.form.domainLabel}
              </label>
              <input
                id="answer-check-domain"
                value={domain}
                onChange={(event) => {
                  setDomain(event.target.value);
                  if (error) setError("");
                }}
                placeholder={t.scan.form.domainPlaceholder}
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
            {submitButton}
          </div>
          {handOffTo ? null : (
            <p className="mt-2.5 max-w-[62ch] text-[12.5px] leading-relaxed text-black/58">
              {t.scan.form.startNote}
            </p>
          )}
          <label className="sr-only" aria-hidden="true">
            {t.scan.form.websiteHoneypot}
            <input
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(event) => setWebsite(event.target.value)}
            />
          </label>
        </form>
      )}

      {/* Outside the form on purpose: a scan that fails after the form has gone
          still has to say so, and still has to offer the retry. */}
      {error ? (
        <div
          className={`mx-auto w-full ${columnClass} ${inResultMode ? "" : "mt-1"}`}
        >
          <p
            role="alert"
            className="text-[13px] leading-relaxed text-[#b3261e]"
          >
            {error}
          </p>
          {/* A failed scan is usually the API being briefly unavailable, so give
              the visitor the retry instead of making them retype the domain. */}
          {domain.trim() ? (
            <button
              type="button"
              disabled={submitting}
              onClick={() => void runScan(domain.trim(), "")}
              className="mt-3 inline-flex min-h-10 items-center gap-2 border border-black/36 bg-white px-4 text-[13px] font-semibold text-ink-deep transition-colors hover:border-signal-ink hover:text-signal-ink disabled:cursor-wait disabled:opacity-70"
            >
              <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
              {submitting ? copy.errors.retrying : copy.errors.tryAgain}
            </button>
          ) : null}
        </div>
      ) : null}

      {inResultMode ? null : formNote}

      {belowForm && !inResultMode && !result && !submitting ? (
        <div className="mt-14">{belowForm}</div>
      ) : null}

      {/* One progress surface, and only while something is genuinely
          outstanding. The storefront read happens inside the POST, so without
          the optimistic list the visitor watches a disabled button for several
          seconds with no idea what is happening. */}
      {showProgress ? (
        <div className={`mx-auto mt-4 w-full ${columnClass}`}>
          <ScanProgress
            steps={result && !submitting ? result.steps : OPTIMISTIC_STEPS}
            domain={result?.domain ?? (domain.trim() || null)}
            deepAudit={Boolean(
              result &&
              (result.status === "queued" || result.status === "running"),
            )}
          />
        </div>
      ) : null}

      {result ? (
        <div
          className={`mx-auto max-w-[80rem] ${showEmailAsk && !showProgress ? "-mt-px" : "mt-4"}`}
        >
          {result.retryable ? (
            <div
              role="status"
              className="mb-4 flex flex-wrap items-center justify-between gap-4 border border-signal-ink/30 bg-[#fffaf7] px-5 py-4 sm:px-6"
            >
              <div>
                <p className="text-[14px] font-semibold text-ink-deep">
                  {copy.errors.auditDidNotFinish}
                </p>
                <p className="mt-1 max-w-[64ch] text-[12.5px] leading-relaxed text-black/58">
                  {copy.errors.auditDidNotFinishBody}
                </p>
              </div>
              <button
                type="button"
                disabled={retrySubmitting}
                onClick={() => void onRetryAudit()}
                className="inline-flex min-h-11 shrink-0 items-center gap-2 bg-ink-deep px-4 text-[13px] font-semibold text-white transition-colors hover:bg-signal-ink disabled:cursor-wait disabled:opacity-70"
              >
                <RefreshCw
                  className={`h-3.5 w-3.5 ${retrySubmitting ? "animate-spin" : ""}`}
                  aria-hidden="true"
                />
                {retrySubmitting
                  ? copy.errors.retryAuditRunning
                  : copy.errors.retryAudit}
              </button>
            </div>
          ) : pollExhausted ? (
            <div
              role="status"
              className="mb-4 border border-black/18 bg-[#fffaf7] px-5 py-4 text-[13px] leading-relaxed text-ink-deep sm:px-6"
            >
              {copy.errors.pollExhausted}
            </div>
          ) : null}
          <ResultCard
            result={result}
            continueHref={`${APP_REGISTER_URL}?scan_domain=${encodeURIComponent(result.domain)}`}
            verificationGate={emailAsk ?? undefined}
          />
        </div>
      ) : null}
    </div>
  );
}
