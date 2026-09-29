/**
 * Umami page views for the marketing site.
 *
 * A self-contained copy of the app's rule in `frontend/src/lib/umami.ts` (this
 * repository cannot import from the app). Umami's tracker passes every payload
 * to the function named by `data-before-send` and sends what it returns; a
 * missing hook means "send unmodified". So the hook is installed before the
 * tag, never removed, and reads a consent latch. The payload is rebuilt from an
 * allowlist: the page title and every query parameter except campaign tags are
 * dropped, because the answer check carries the visitor's store address in the
 * URL (`?domain=`). Custom events are refused -- this site sends page views only.
 */

export const UMAMI_SCRIPT_ID = "beseam-umami";
export const UMAMI_BEFORE_SEND_GLOBAL = "__beseamUmamiBeforeSend";
export const UMAMI_CONSENT_GLOBAL = "__beseamUmamiConsent";

/** Campaign attribution only -- the app's ANALYTICS_ATTRIBUTION_PARAMS. */
const ATTRIBUTION_PARAMS: readonly string[] = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_id",
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
  "msclkid",
];
const PASSTHROUGH_FIELDS = [
  "website",
  "hostname",
  "language",
  "screen",
  "tag",
] as const;

export type UmamiPayload = Record<string, unknown>;
export type UmamiConfig = {
  websiteId: string;
  scriptUrl: string;
  domains: string;
};

export const BESEAM_PRODUCTION_UMAMI_CONFIG: UmamiConfig = {
  websiteId: "e05bd753-3d77-456f-aa40-1d5a5e336753",
  scriptUrl: "https://a.beseam.com/script.js",
  domains: "beseam.com,www.beseam.com",
};
type UmamiBeforeSend = (
  type: string,
  payload: UmamiPayload | null | undefined,
) => UmamiPayload | null;
type UmamiWindow = Window & {
  [UMAMI_BEFORE_SEND_GLOBAL]?: UmamiBeforeSend;
  [UMAMI_CONSENT_GLOBAL]?: boolean;
};

function umamiWindow(): UmamiWindow {
  return window as UmamiWindow;
}

function sanitizedAbsoluteUrl(value: string): string {
  try {
    const url = new URL(value);
    if (url.protocol !== "http:" && url.protocol !== "https:") return "";
    url.hash = "";
    const drop: string[] = [];
    url.searchParams.forEach((_value, name) => {
      if (!ATTRIBUTION_PARAMS.includes(name)) drop.push(name);
    });
    for (const name of drop) url.searchParams.delete(name);
    return url.toString();
  } catch {
    return "";
  }
}

/** An absolute URL, or a same-origin path as the tracker sends a referrer. */
export function sanitizedUmamiUrl(value: unknown, origin: string): string {
  if (typeof value !== "string" || value === "") return "";
  if (value.startsWith("/") && !value.startsWith("//")) {
    const absolute = sanitizedAbsoluteUrl(origin + value);
    return absolute.startsWith(origin + "/")
      ? absolute.slice(origin.length)
      : "";
  }
  return sanitizedAbsoluteUrl(value);
}

export function sanitizeUmamiPayload(
  type: string,
  payload: UmamiPayload | null | undefined,
  origin: string,
): UmamiPayload | null {
  if (
    type !== "event" ||
    !payload ||
    typeof payload !== "object" ||
    payload.name !== undefined
  ) {
    return null;
  }
  const out: UmamiPayload = {};
  for (const field of PASSTHROUGH_FIELDS) {
    if (typeof payload[field] === "string") out[field] = payload[field];
  }
  const url = sanitizedUmamiUrl(payload.url, origin);
  if (!url) return null;
  out.url = url;
  out.referrer = sanitizedUmamiUrl(payload.referrer, origin);
  return out;
}

export function umamiBeforeSend(): UmamiBeforeSend {
  return (type, payload) =>
    umamiWindow()[UMAMI_CONSENT_GLOBAL] === true
      ? sanitizeUmamiPayload(type, payload, window.location.origin)
      : null;
}

function parsedScriptUrl(value: string): URL | null {
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url : null;
  } catch {
    return null;
  }
}

/** All three unset is "off", silently; anything partial or plain-HTTP is logged and off. */
export function umamiConfig(input: {
  websiteId?: string;
  scriptUrl?: string;
  domains?: string;
}): UmamiConfig | null {
  const websiteId = input.websiteId?.trim() ?? "";
  const scriptUrl = input.scriptUrl?.trim() ?? "";
  const domains = input.domains?.trim() ?? "";
  if (!websiteId && !scriptUrl && !domains) return null;
  const url = parsedScriptUrl(scriptUrl);
  if (!websiteId || !domains || !url) {
    // eslint-disable-next-line no-console -- a broken Umami config must be visible; Umami stays off
    console.error(
      "[umami] incomplete or unsafe Umami settings; Umami stays off",
    );
    return null;
  }
  return { websiteId, scriptUrl: url.toString(), domains };
}

export function landingUmamiConfig(
  input: { websiteId?: string; scriptUrl?: string; domains?: string },
  environment: string | undefined,
): UmamiConfig | null {
  const defaults = environment === "production" ? BESEAM_PRODUCTION_UMAMI_CONFIG : undefined;
  return umamiConfig({
    websiteId: input.websiteId?.trim() || defaults?.websiteId,
    scriptUrl: input.scriptUrl?.trim() || defaults?.scriptUrl,
    domains: input.domains?.trim() || defaults?.domains,
  });
}

export function setUmamiConsent(granted: boolean): void {
  if (typeof window === "undefined") return;
  umamiWindow()[UMAMI_CONSENT_GLOBAL] = granted;
}

/** Mount the tracker once. The hook is (re)installed before the tag can exist, never removed. */
export function loadUmami(config: UmamiConfig): boolean {
  if (typeof document === "undefined") return false;
  umamiWindow()[UMAMI_BEFORE_SEND_GLOBAL] = umamiBeforeSend();
  if (document.getElementById(UMAMI_SCRIPT_ID)) return true;
  const script = document.createElement("script");
  script.id = UMAMI_SCRIPT_ID;
  script.async = true;
  script.src = config.scriptUrl;
  script.setAttribute("data-website-id", config.websiteId);
  script.setAttribute("data-before-send", UMAMI_BEFORE_SEND_GLOBAL);
  script.setAttribute("data-domains", config.domains);
  script.setAttribute("data-exclude-hash", "true");
  script.setAttribute("data-do-not-track", "true");
  document.head.appendChild(script);
  return true;
}
