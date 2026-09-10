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
import {
  deriveDeepAuditCardState,
  deriveSampledAuditGroups,
  isCatalogFinding,
} from "@/components/beseam/answer-check-state";
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
  return [...result.findings].sort(
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
const LIGHT_STEP_KEYS = new Set(["storefront", "catalog"]);

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
  interlude,
}: {
  steps: Step[];
  domain: string | null;
  /** Rendered between the finished light steps and the slow ones. */
  interlude?: ReactNode;
}) {
  const copy = useDictionary().answerCheck;
  const visible = steps.filter((step) => step.state !== "skipped");
  if (!visible.length) return null;

  const lightSteps = visible.filter((step) => LIGHT_STEP_KEYS.has(step.key));
  const heavySteps = visible.filter((step) => !LIGHT_STEP_KEYS.has(step.key));

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
      className="mx-auto w-full border border-black/18 bg-white px-5 py-5 text-left sm:px-6"
    >
      {/* The mode, held in place for the whole run. Without it the step labels
          are the only clue to what kind of assessment this is, and they read
          equally well as the start of a keyword report. */}
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-black/44">
        {copy.steps.technical(position, visible.length)}
      </p>
      <h3 className="mt-1.5 text-[15px] font-semibold tracking-[-0.01em] text-ink-deep">
        {domain
          ? copy.steps.readingDomain(domain)
          : copy.steps.readingStorefront}
      </h3>
      <p className="mt-1 text-[13px] leading-relaxed text-black/56">
        {copy.steps.resultsAsTheyArrive}
      </p>
      <p className="mt-1.5 text-[12.5px] leading-relaxed text-black/50">
        {copy.steps.questionsLater}
      </p>
      <ol className="mt-4 space-y-3">
        {(interlude ? lightSteps : visible).map((step) => (
          <StepRow key={step.key} step={step} />
        ))}
      </ol>
      {interlude ? (
        <>
          {/* The address buys the slow half, so it stands between the two
              halves rather than under all of them. */}
          <div className="mt-5 border-t border-black/12 pt-5">{interlude}</div>
          {heavySteps.length ? (
            <ol start={lightSteps.length + 1} className="mt-5 space-y-3">
              {heavySteps.map((step) => (
                <StepRow key={step.key} step={step} />
              ))}
            </ol>
          ) : null}
        </>
      ) : null}
    </section>
  );
}

// ── The real numbers, the moment they exist ─────────────────────────────────
function FoundStrip({ result }: { result: AnswerCheckResult }) {
  const copy = useDictionary().answerCheck;
  const catalog = result.catalog_inventory;
  const productCount =
    catalog?.products_checked && catalog.products_checked > 0
      ? `${catalog.products_checked}${catalog.products_capped ? "+" : ""}`
      : String(result.products_seen);
  const findingCount = groupFindings(sortedFindings(result)).length;
  const scored = result.answers.filter((answer) => answer.mentioned !== null);
  const named = scored.filter((answer) => answer.mentioned === true).length;

  const facts: Array<{ value: string; label: string; accent?: boolean }> = [
    { value: productCount, label: copy.result.productsFound },
    {
      value: String(findingCount),
      label: copy.result.opportunitiesFound(findingCount),
      accent: findingCount > 0,
    },
    ...(scored.length
      ? [
          {
            value: `${named}/${scored.length}`,
            label: copy.result.answersNamed,
            accent: named < scored.length,
          },
        ]
      : []),
  ];

  return (
    <dl
      className={`grid border-b border-black/14 bg-white ${facts.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}
    >
      {facts.map((fact, index) => (
        <div
          key={fact.label}
          className={`flex items-baseline gap-2.5 px-5 py-4 sm:px-6 ${
            index > 0
              ? "border-t border-black/12 sm:border-l sm:border-t-0"
              : ""
          }`}
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
  const copy = useDictionary().answerCheck;
  const finding = group.lead;
  const priority = priorityOf(finding, copy);
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
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11.5px] font-semibold uppercase tracking-[0.08em]">
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
            </div>
            <p className="mt-1 text-balance text-[16px] font-semibold leading-[1.4] tracking-[-0.012em] text-ink-deep sm:text-[17px]">
              {findingHeadline(finding)}
            </p>
          </div>

          <span className="inline-flex min-h-9 items-center gap-2 justify-self-start text-[12px] font-semibold text-black/52 group-hover/finding:text-signal-ink sm:justify-self-end">
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
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1.25fr)_minmax(16rem,0.75fr)]">
            <div>
              {why ? (
                <p className="max-w-[68ch] text-[14px] leading-[1.65] text-black/64">
                  {why}
                </p>
              ) : null}
              {nextStep ? (
                <p className="mt-4 max-w-[68ch] border-l border-signal-ink/35 pl-3.5 text-[14px] leading-[1.6] text-ink-deep">
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
                {copy.findings.startFixing}
                <ArrowRight
                  aria-hidden="true"
                  className="h-3.5 w-3.5 transition-transform group-hover/fix:translate-x-0.5"
                />
              </TrackedLink>
            </div>

            <div className="border-t border-black/10 pt-4 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-black/42">
                {copy.findings.evidence}
                {group.members.length > 1
                  ? ` · ${copy.findings.checks(group.members.length)}`
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
          {copy.findings.heading}
        </h3>
        <p className="mt-1.5 max-w-[70ch] text-[13.5px] leading-relaxed text-black/60">
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
                {copy.findings.showOther(hidden)}
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
            {copy.findings.readingPages}
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
    <section className="border-b border-black/14 bg-white">
      <div className="border-b border-black/12 px-5 py-5 sm:px-6">
        <h3 className="text-[19px] font-semibold tracking-[-0.02em] text-ink-deep">
          {copy.boundary.heading}
        </h3>
        <p className="mt-1.5 max-w-[70ch] text-[13.5px] leading-relaxed text-black/60">
          {copy.boundary.intro}
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
  const copy = useDictionary().answerCheck;
  const opportunityCount = groupFindings(sortedFindings(result)).length;

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
            className="group inline-flex min-h-12 w-full items-center justify-center gap-2 bg-white px-6 text-[14px] font-semibold text-ink-deep transition-colors hover:bg-signal"
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
}: {
  domain: string;
  continueHref: string;
}) {
  const copy = useDictionary().answerCheck;
  return (
    <section
      data-print-hide
      className="flex flex-col gap-4 border-t border-black/14 bg-[#fffaf7] px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6"
    >
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-black/42">
          {copy.continue.closingEyebrow}
        </p>
        <p className="mt-1 text-[16px] font-semibold tracking-[-0.01em] text-ink-deep">
          {copy.continue.closingTitle}
        </p>
        <p className="mt-1 text-[11.5px] text-black/48">
          {copy.continue.carryStore(domain)}
        </p>
      </div>
      <TrackedLink
        href={continueHref}
        eventName="scan_continue_clicked"
        eventCategory="conversion"
        placement="answer_check_result_bottom"
        preserveUtm
        className="group inline-flex min-h-11 items-center justify-center gap-2 bg-ink-deep px-5 text-[13px] font-semibold text-white transition-colors hover:bg-signal-ink"
      >
        {copy.continue.start}
        <ArrowRight
          aria-hidden="true"
          className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
        />
      </TrackedLink>
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
            {copy.result.brandAppearance}
          </p>
          <div className="mt-2 flex flex-wrap items-end gap-3">
            <span
              className={`text-[52px] font-semibold leading-none tracking-[-0.045em] tabular-nums ${scoreBand(pct, copy).text}`}
            >
              {named}/{scored.length}
            </span>
            <span
              className={`mb-1 text-[12px] font-semibold ${scoreBand(pct, copy).text}`}
            >
              {scoreBand(pct, copy).label} · {pct}%
            </span>
          </div>
          <p className="mt-3 max-w-[42ch] text-[13.5px] leading-relaxed text-black/62">
            {named === scored.length
              ? copy.result.brandEverywhere
              : named === 0
                ? copy.result.brandNowhere
                : copy.result.brandMissing(
                    scored.length - named,
                    scored.length,
                  )}
          </p>
          {topRival && named < scored.length ? (
            <p className="mt-4 border-t border-black/10 pt-3 text-[12.5px] leading-relaxed text-black/58">
              <span className="font-semibold text-ink-deep">
                {copy.result.frequentAlternative}{" "}
              </span>
              {topRival.label} · {topRival.count}×
            </p>
          ) : null}
        </div>

        <div className="px-5 py-6 sm:px-6">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-black/42">
              {copy.result.byAssistant}
            </p>
            <span className="font-mono text-[11px] text-black/42">
              {copy.result.assistants(channels.length)}
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
                      className={`block h-full ${scoreBand(engine.pct, copy).fill}`}
                      style={{ width: `${Math.max(engine.pct, 1.5)}%` }}
                    />
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-mono text-[13px] font-semibold text-ink-deep">
                    {engine.wins}/{engine.total}
                  </p>
                  <p className="mt-0.5 text-[11.5px] text-black/44">
                    {copy.result.namedYou}
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
// update remounted the <details> and shut whatever the merchant had opened.
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
  const copy = useDictionary().answerCheck;
  return (
    <details
      open={defaultOpen}
      className="group/fold border-b border-black/14 bg-[#fffaf7]"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-4 transition-colors hover:bg-[#fdf1e9] sm:px-6 [&::-webkit-details-marker]:hidden">
        <div className="min-w-0">
          <h3 className="text-[14px] font-semibold text-ink-deep">{title}</h3>
          <p className="mt-1 text-[12.5px] leading-relaxed text-black/56">
            {summary}
          </p>
        </div>
        <span className="flex min-h-11 shrink-0 items-center gap-2 text-[12px] font-semibold text-ink-deep">
          <span className="group-open/fold:hidden">{copy.result.details}</span>
          <span className="hidden group-open/fold:inline">
            {copy.result.close}
          </span>
          <ChevronDown
            className="h-4 w-4 transition-transform group-open/fold:rotate-180"
            aria-hidden="true"
          />
        </span>
      </summary>
      <div className="border-t border-black/12 bg-white">{children}</div>
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
}: {
  title: string;
  audits: SampledAuditRow[];
  gated: boolean;
  inFlight: boolean;
  gatedSummary: string;
  readingSummary: string;
  unavailableSummary: string;
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
        <ul className="divide-y divide-black/10 bg-white">
          {audits.map((audit, index) => {
            const firstFinding = audit.findings?.[0];
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
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
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
  const pageAuditStatus = deepAuditState.status;
  const pageAuditsInFlight = deepAuditState.inFlight;
  const pageAuditsGated = deepAuditState.gated;
  const catalogFindings = findings.filter(isCatalogFinding);
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

  const catalogCheckedLabel = catalog
    ? `${catalog.products_checked}${catalog.products_capped ? "+" : ""} ${copy.summary.checkedProducts}`
    : copy.summary.productsSampled(result.products_seen);

  // Store, Catalog and Product pages each already collapse on their own. An
  // outer disclosure around them was a fold inside a fold — two clicks and a
  // paragraph of preamble between the merchant and a number they can read. The
  // three rows now sit directly on the card and speak for themselves.
  return (
    <section className="border-b border-black/14 bg-white">
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
        defaultOpen
        title={copy.summary.homepage}
        summary={
          pageAuditsGated
            ? copy.summary.homepageGated
            : pageAuditsInFlight && !homepageAudit
              ? copy.summary.homepageReading
              : homepageAudit?.ok === false
                ? copy.summary.homepageFailed
                : homepageDetailed?.score != null
                  ? copy.summary.homepageSummary(
                      Math.round(homepageDetailed.score),
                      homepageDetailed.checks_failed,
                      homepageDetailed.checks_evaluated,
                    )
                  : homepageOk
                    ? copy.summary.homepageCompleted
                    : copy.summary.homepageReading
        }
      >
        {pageAuditsGated ? (
          <p className="bg-white px-5 py-4 text-[12.5px] leading-relaxed text-black/54 sm:px-6">
            {copy.summary.homepageGated}
          </p>
        ) : pageAuditsInFlight && !homepageAudit ? (
          <div className="flex items-start gap-3 bg-white px-5 py-5 sm:px-6">
            <Loader2 className="mt-0.5 h-4 w-4 animate-spin text-signal-ink" />
            <p className="text-[12.5px] font-semibold text-ink-deep">
              {copy.summary.homepageReading}
            </p>
          </div>
        ) : homepageAudit?.ok === false ? (
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
                  {copy.summary.needAttentionOf(
                    homepageDetailed.checks_failed,
                    homepageDetailed.checks_evaluated,
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
        />
      ) : null}

      {/* Store and Catalog stay shut: their summary lines already carry the
          numbers. Product pages opens by default -- it is the only one whose
          value is the per-check detail, not the one-line count. */}
      {deepAuditState.showProductPages ? (
        <Fold
          defaultOpen
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
                    : copy.summary.pageAuditSummary(
                        audits.length,
                        failedChecks,
                        evaluatedChecks,
                        staticAreas.reduce(
                          (sum, area) => sum + area.unevaluated,
                          0,
                        ),
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
              <div className="border-b border-black/12 bg-[#fffaf7] px-5 py-4 sm:px-6">
                <p className="text-[11px] font-semibold text-ink-deep">
                  {copy.summary.sampleShows}
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
                          {copy.summary.needAttention(area.failed)}
                        </span>
                        <span className="text-[11px] text-black/42">
                          {copy.summary.checked(area.evaluated)}
                          {area.unevaluated
                            ? copy.summary.couldNotCheck(area.unevaluated)
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
                          {copy.summary.health(Math.round(audit.score))}
                        </span>
                      ) : null}
                      <span
                        className={
                          audit.checks_failed > 0
                            ? "font-semibold text-signal-ink"
                            : "text-black/48"
                        }
                      >
                        {copy.summary.needAttentionOf(
                          audit.checks_failed,
                          audit.checks_evaluated,
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
                ))}
              </ul>
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
      className="group/section border-b border-black/14 bg-[#fffaf7]"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-4 transition-colors hover:bg-[#fdf1e9] sm:px-6 [&::-webkit-details-marker]:hidden">
        <div className="min-w-0">
          <h3 className="text-[15px] font-semibold text-ink-deep">{title}</h3>
          <p className="mt-1 text-[12.5px] text-black/56">{summary}</p>
        </div>
        <span className="flex min-h-11 shrink-0 items-center gap-2 text-[12px] font-semibold text-ink-deep">
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
  const copy = useDictionary().answerCheck;
  // Two distinct things open up, and both are gated by the same one click:
  // the answer probe (`execute_probe`) and the per-page AI interpretation
  // (`/pdp/public/pdp-audit/{id}/complete-ai`, which is handed the failed
  // checks above plus the real page copy and returns concrete suggestions).
  // Only advertising the first one undersold what confirming actually buys.
  const adds = [
    [copy.deeper.aiPages, copy.deeper.aiPagesDetail],
    [
      copy.deeper.shopperAnswers,
      copy.deeper.shopperAnswersDetail(result.products_seen),
    ],
    [copy.deeper.alternatives, copy.deeper.alternativesDetail],
  ] as const;

  return (
    <section className="border-b border-black/14 bg-[#fffaf7]">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
        <div className="border-b border-black/12 px-5 py-6 sm:px-6 lg:border-b-0 lg:border-r">
          <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.1em] text-black/40">
            {copy.deeper.eyebrow}
          </p>
          {/* Merchant-facing only. What this costs Beseam to run is our
              problem, not something to put in front of someone deciding
              whether to trust us. */}
          <h3 className="mt-2 text-[18px] font-semibold tracking-[-0.02em] text-ink-deep">
            {copy.deeper.title}
          </h3>
          <p className="mt-1.5 max-w-[52ch] text-[13.5px] leading-relaxed text-black/62">
            {copy.deeper.intro}
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
        <div className="bg-white px-5 py-6 sm:px-6">{gate}</div>
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
      title={copy.visibility.title}
      summary={
        scored.length > 0
          ? copy.visibility.summary(named, scored.length, rows.length)
          : copy.visibility.checking
      }
    >
      <AiVisibilityWorkspace result={result} />

      {rows.length > 0 ? (
        <div className="border-t border-black/18 bg-white">
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
                <span className="shrink-0 rounded-full border border-black/16 px-2 py-0.5 text-[11.5px] font-medium text-black/58">
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
  const copy = useDictionary().answerCheck;
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

function SaveAuditPanel({ domain, gate }: { domain: string; gate: ReactNode }) {
  const copy = useDictionary().answerCheck;
  return (
    <section className="border-b border-black/14 bg-[#fffaf7] px-5 py-6 sm:px-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(17rem,0.42fr)] lg:items-center">
        <div>
          <h3 className="text-[18px] font-semibold tracking-[-0.015em] text-ink-deep">
            {copy.email.completeLabel}
          </h3>
          <p className="mt-1.5 max-w-[58ch] text-[13px] leading-[1.6] text-black/58">
            {copy.email.completeIntro(domain)}
          </p>
        </div>
        <div className="border-t border-black/10 pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
          {gate}
        </div>
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
    <div className="overflow-hidden border border-black/18 bg-white text-left">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-black/14 bg-white px-5 py-5 sm:px-6">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <BrandFavicon
              domain={result.domain}
              name={identity ?? result.brand ?? result.domain}
            />
            {/* The page's heading once a result is on it: the marketing
                headline is gone by then, and this names the store, so the
                document is not left with no top-level title. */}
            <h1 className="text-[22px] font-semibold leading-snug tracking-[-0.02em] text-ink-deep">
              {identity ?? result.brand ?? result.domain}
            </h1>
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
              ? copy.result.statusRejected
              : inFlight
                ? copy.result.statusRunning
                : result.status === "awaiting_verification"
                  ? copy.result.statusFreeReady
                  : copy.result.statusComplete}
          </span>
          {/* Nothing to share or print when the scan could not read the store. */}
          <button
            type="button"
            hidden={Boolean(result.reject_reason) || result.status !== "ready"}
            onClick={() => void onShare()}
            className="inline-flex min-h-11 items-center gap-2 border border-black/18 bg-white px-3 text-[12px] font-semibold text-ink-deep transition-colors hover:border-black/32 hover:bg-[#fffaf7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-ink/35"
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
            className="inline-flex min-h-11 items-center gap-2 border border-black/18 bg-white px-3 text-[12px] font-semibold text-ink-deep transition-colors hover:border-black/32 hover:bg-[#fffaf7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-ink/35"
          >
            <Printer className="h-3.5 w-3.5" aria-hidden="true" />
            {copy.result.print}
          </button>
        </div>
      </div>

      {result.reject_reason ? (
        <RejectedNotice result={result} continueHref={continueHref} />
      ) : (
        <>
          <ScanHeadline result={result} />
          <FoundStrip result={result} />
          <WorthLookingAt result={result} />

          {continueHref ? (
            <ContinuePaths result={result} continueHref={continueHref} />
          ) : null}

          {verificationGate && result.status === "awaiting_verification" ? (
            <DeeperAnalysisPanel result={result} gate={verificationGate} />
          ) : null}

          {scored.length > 0 || result.questions.length > 0 ? (
            <VisibilityDisclosure result={result} />
          ) : null}

          {verificationGate && result.status !== "awaiting_verification" ? (
            <SaveAuditPanel domain={result.domain} gate={verificationGate} />
          ) : null}

          <InitialScanSummary result={result} />

          {/* Prints with the report: the scope of a finding list is part of the
              finding list, not a sales aside. */}
          <ScanBoundary result={result} />

          {continueHref ? (
            <ClosingContinue
              domain={result.domain}
              continueHref={continueHref}
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

  const inputClass =
    "h-12 w-full border border-black/22 bg-white px-4 text-left text-[15px] text-ink-deep placeholder:text-black/40 focus:border-signal-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-ink";

  // Once the visitor has submitted, the page belongs to the result: the form,
  // the progress rail, the address ask and the audit share one column so they
  // read as a single surface instead of three cards of different widths
  // floating over each other. A cold page keeps the narrow, focused field.
  const inResultMode = Boolean(submitting || result);
  const columnClass = inResultMode ? "max-w-[72rem]" : "max-w-3xl";

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
          />
        </div>
      ) : null}

      {result ? (
        <div
          className={`mx-auto max-w-[72rem] ${showEmailAsk && !showProgress ? "-mt-px" : "mt-4"}`}
        >
          {/* The poll budget ran out with work still outstanding. Name what did
              finish, so the evidence already on the card is not thrown into
              doubt by one stalled stage. */}
          {pollExhausted ? (
            <div
              role="status"
              className="mb-4 flex flex-wrap items-center justify-between gap-3 border border-black/18 bg-[#fffaf7] px-5 py-4"
            >
              <p className="max-w-[62ch] text-[13px] leading-relaxed text-ink-deep">
                {copy.errors.pollExhausted}
              </p>
              {/* Drives the scan directly. It used to submit the domain form by
                  id, which is not on the page any more once a result is. */}
              <button
                type="button"
                disabled={submitting}
                onClick={() => void runScan(result.domain, "")}
                className="inline-flex min-h-11 shrink-0 items-center gap-2 border border-black/36 bg-white px-4 text-[13px] font-semibold text-ink-deep transition-colors hover:border-signal-ink hover:text-signal-ink disabled:cursor-wait disabled:opacity-70"
              >
                <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
                {submitting ? copy.errors.running : copy.errors.runAgain}
              </button>
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
