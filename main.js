import { LOCALES, redirectTargetFor } from "./src/i18n/locale-rules.mjs";

const ALLOWED_ORIGINS = new Set([
  "https://beseam.com",
  "https://www.beseam.com",
]);

const LEAD_SOURCES = new Set([
  "ai_visibility_scan",
  "platform_audit",
  "store_health_review",
  "product_visibility_monitoring",
  "contact",
]);

// Sources where a person is waiting to hear back: notify contact@beseam.com
// directly instead of only queueing the lead into the marketing list.
const REVIEW_SOURCES = new Set([
  "store_health_review",
  "product_visibility_monitoring",
  "contact",
]);

const UTM_KEYS = new Set([
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
]);

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function clean(value, maxLength) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function validEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function readLead(request, url, forcedSource) {
  const origin = request.headers.get("origin");
  if (origin && origin !== url.origin && !ALLOWED_ORIGINS.has(origin)) {
    return { response: json({ error: "Origin not allowed." }, 403) };
  }

  const declaredLength = Number(request.headers.get("content-length") || 0);
  if (declaredLength > 8000)
    return { response: json({ error: "Request is too large." }, 413) };

  const raw = await request.text();
  if (raw.length > 8000)
    return { response: json({ error: "Request is too large." }, 413) };

  let body;
  try {
    body = JSON.parse(raw);
  } catch {
    return { response: json({ error: "Invalid request." }, 400) };
  }

  // Honeypot: real people leave this hidden field empty.
  if (clean(body.website, 200)) return { response: json({ ok: true }) };

  const source = forcedSource || clean(body.source, 60);
  if (!LEAD_SOURCES.has(source)) {
    return { response: json({ error: "Unknown lead source." }, 400) };
  }

  const email = clean(body.email, 200).toLowerCase();
  if (!validEmail(email)) {
    return { response: json({ error: "Enter a valid work email." }, 400) };
  }

  return {
    lead: {
      source,
      email,
      submissionId: clean(body.submissionId, 100),
      name: clean(body.name, 100),
      store: clean(body.store, 300),
      message: clean(body.message, 2000),
      utm:
        body.utm && typeof body.utm === "object"
          ? Object.fromEntries(
              Object.entries(body.utm)
                .filter(
                  ([key, value]) =>
                    UTM_KEYS.has(key) && typeof value === "string",
                )
                .map(([key, value]) => [key, clean(value, 200)]),
            )
          : {},
    },
  };
}

function trevraCaptureConfigured(env) {
  return Boolean(
    env.TREVRA_CAPTURE_API_BASE_URL &&
    env.TREVRA_CAPTURE_SOURCE_ID &&
    env.TREVRA_CAPTURE_SECRET,
  );
}

async function trevraHmac(secret, timestamp, idempotencyKey, raw) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const input = new TextEncoder().encode(
    timestamp + "." + idempotencyKey + "." + raw,
  );
  const signed = new Uint8Array(await crypto.subtle.sign("HMAC", key, input));
  return [...signed].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

/**
 * Canonical GTM write when this deployment has been connected to a Trevra
 * workspace. The Worker keeps validation/abuse protection; Trevra owns the
 * durable Person + Submission. A retry reuses the same idempotency key and
 * exact bytes, so an uncertain first response cannot create two submissions.
 */
async function addLeadToTrevra(env, lead) {
  if (!trevraCaptureConfigured(env)) return false;

  const payload = {
    kind: lead.source,
    person: {
      email: lead.email,
      ...(lead.name ? { name: lead.name } : {}),
    },
    ...(lead.store ? { company: { domain: lead.store } } : {}),
    ...(lead.message ? { message: lead.message } : {}),
    ...(Object.keys(lead.utm).length ? { attribution: lead.utm } : {}),
  };
  const raw = JSON.stringify(payload);
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const idempotencyKey = lead.submissionId || crypto.randomUUID();
  const signature = await trevraHmac(
    env.TREVRA_CAPTURE_SECRET,
    timestamp,
    idempotencyKey,
    raw,
  );
  const endpoint =
    env.TREVRA_CAPTURE_API_BASE_URL.replace(/\/$/, "") +
    "/api/intake/v1/submissions";
  const send = () =>
    fetch(endpoint, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-trevra-source": env.TREVRA_CAPTURE_SOURCE_ID,
        "x-trevra-timestamp": timestamp,
        "x-trevra-idempotency-key": idempotencyKey,
        "x-trevra-signature": "sha256=" + signature,
      },
      body: raw,
    });

  let response = await send();
  if (response.status >= 500) response = await send();
  if (!response.ok) {
    throw new Error("Trevra capture rejected the lead: " + response.status);
  }
  return true;
}

let sendPulseToken = null;

async function getSendPulseToken(env, force) {
  if (
    !force &&
    sendPulseToken &&
    sendPulseToken.expiresAt > Date.now() + 60_000
  ) {
    return sendPulseToken.token;
  }

  const response = await fetch("https://api.sendpulse.com/oauth/access_token", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      grant_type: "client_credentials",
      client_id: env.SENDPULSE_CLIENT_ID,
      client_secret: env.SENDPULSE_CLIENT_SECRET,
    }),
  });

  const payload = await response.json().catch(() => null);
  if (!response.ok || !payload || !payload.access_token) {
    throw new Error("SendPulse token request failed: " + response.status);
  }

  sendPulseToken = {
    token: payload.access_token,
    expiresAt: Date.now() + (payload.expires_in || 3600) * 1000,
  };
  return sendPulseToken.token;
}

/**
 * Adds the contact to the configured SendPulse address book.
 * Variables beyond Name must already exist in that address book.
 */
async function addLeadToSendPulse(env, lead) {
  if (
    !env.SENDPULSE_CLIENT_ID ||
    !env.SENDPULSE_CLIENT_SECRET ||
    !env.SENDPULSE_ADDRESS_BOOK_ID
  ) {
    throw new Error("SendPulse is not configured for this environment.");
  }

  const variables = { Source: lead.source };
  if (lead.name) variables.Name = lead.name;
  if (lead.store) variables.Store = lead.store;
  if (lead.message) variables.Message = lead.message.slice(0, 500);
  if (lead.utm.utm_source) variables.UtmSource = lead.utm.utm_source;
  if (lead.utm.utm_medium) variables.UtmMedium = lead.utm.utm_medium;
  if (lead.utm.utm_campaign) variables.UtmCampaign = lead.utm.utm_campaign;

  const send = async (token) =>
    fetch(
      "https://api.sendpulse.com/addressbooks/" +
        env.SENDPULSE_ADDRESS_BOOK_ID +
        "/emails",
      {
        method: "POST",
        headers: {
          authorization: "Bearer " + token,
          "content-type": "application/json",
        },
        body: JSON.stringify({ emails: [{ email: lead.email, variables }] }),
      },
    );

  let response = await send(await getSendPulseToken(env, false));
  if (response.status === 401) {
    sendPulseToken = null;
    response = await send(await getSendPulseToken(env, true));
  }

  const payload = await response.json().catch(() => null);
  if (!response.ok || (payload && payload.result === false)) {
    throw new Error("SendPulse rejected the contact: " + response.status);
  }
}

async function submitScanLead(lead, env) {
  try {
    if (await addLeadToTrevra(env, lead)) return json({ ok: true }, 202);
    // Cutover fallback only. Once Trevra credentials are installed in
    // production this branch stops receiving traffic and can be removed after
    // the live source has been verified.
    await addLeadToSendPulse(env, lead);
  } catch (error) {
    console.error("[lead] canonical lead capture failed", lead.source, error);
    return json({ error: "We could not store your email right now." }, 502);
  }

  return json({ ok: true }, 202);
}

async function submitReview(lead, env) {
  const { source, name, email, store, message, utm } = lead;
  const requiresStore = source !== "contact";
  const label =
    source === "contact"
      ? "New contact form message"
      : "New Store Health Review request";

  if (
    name.length < 2 ||
    (requiresStore && store.length < 4) ||
    (!requiresStore && message.length < 3)
  ) {
    return json(
      {
        error: requiresStore
          ? "Name, work email and store URL are required."
          : "Name, work email and a message are required.",
      },
      400,
    );
  }

  let capturedByTrevra = false;
  try {
    capturedByTrevra = await addLeadToTrevra(env, lead);
  } catch (error) {
    console.error("[lead] Trevra capture failed for review request", error);
    return json({ error: "We could not store your request right now." }, 502);
  }

  // Before Trevra is configured, keep the previous deployment contract intact:
  // review email is the only durable notification path. After cutover, Trevra
  // is the record and email becomes best-effort notification only.
  if (!env.REVIEW_EMAIL && !capturedByTrevra) {
    return json({ error: "Review requests are temporarily unavailable." }, 503);
  }

  const textBody = [
    label,
    "",
    "Name: " + name,
    "Work email: " + email,
    store ? "Store: " + store : null,
    "Message: " + (message || "Not provided"),
    "",
    "Attribution:",
    JSON.stringify(utm, null, 2),
  ]
    .filter((line) => line !== null)
    .join("\n");

  const htmlBody =
    "<h1>" +
    escapeHtml(label) +
    "</h1>" +
    "<p><strong>Name:</strong> " +
    escapeHtml(name) +
    "</p><p><strong>Work email:</strong> " +
    escapeHtml(email) +
    "</p>" +
    (store ? "<p><strong>Store:</strong> " + escapeHtml(store) + "</p>" : "") +
    "<p><strong>Message:</strong><br>" +
    escapeHtml(message || "Not provided").replaceAll("\n", "<br>") +
    "</p><p><strong>Attribution:</strong><br><code>" +
    escapeHtml(JSON.stringify(utm)) +
    "</code></p>";

  if (env.REVIEW_EMAIL) {
    try {
      await env.REVIEW_EMAIL.send({
        to: "contact@beseam.com",
        from: "website@beseam.com",
        replyTo: email,
        subject:
          source === "contact"
            ? label + " from " + name
            : label + " - " + store,
        text: textBody,
        html: htmlBody,
      });
    } catch (error) {
      if (!capturedByTrevra)
        return json({ error: "Message could not be delivered." }, 502);
      console.error(
        "[lead] review notification email failed after Trevra capture",
        error,
      );
    }
  }

  if (!capturedByTrevra) {
    // Legacy cutover fallback only; Trevra-configured deployments do not create
    // a second lead database in SendPulse.
    try {
      await addLeadToSendPulse(env, lead);
    } catch (error) {
      console.error(
        "[lead] SendPulse capture failed for review request",
        error,
      );
    }
  }

  return json({ ok: true }, 202);
}

// Backend that runs the scan. Proxied through the worker so the browser never
// needs a cross-origin call and the API host stays out of the page source.
const DEFAULT_API_BASE = "https://api.beseam.com/api";

// Where the product app lives. `npm run dev` overrides it with a --var so a
// local verification click lands on the local app instead of production.
const DEFAULT_APP_BASE = "https://app.beseam.com";

async function proxyAnswerCheck(request, url, env) {
  const apiBase = (env.API_BASE_URL || DEFAULT_API_BASE).replace(/\/$/, "");

  if (request.method === "GET") {
    const domain = clean(url.searchParams.get("domain"), 253);
    if (!domain) return json({ error: "domain is required" }, 422);
    const locale = clean(url.searchParams.get("locale"), 8);
    const upstream = new URL(
      `${apiBase}/monitoring/public/answer-check/${encodeURIComponent(domain)}`,
    );
    if (LOCALES.includes(locale)) upstream.searchParams.set("locale", locale);
    return forwardJson(upstream.toString(), { method: "GET" });
  }

  if (request.method !== "POST") {
    return json({ error: "method not allowed" }, 405);
  }

  // Same-origin is always fine (this is how the site itself calls it); the
  // allowlist covers the apex/www split.
  const origin = request.headers.get("origin");
  if (origin && origin !== url.origin && !ALLOWED_ORIGINS.has(origin)) {
    return json({ error: "Origin not allowed." }, 403);
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ error: "invalid body" }, 400);
  }

  const domain = clean(payload?.domain, 253);
  const email = clean(payload?.email, 320);
  const locale = clean(payload?.locale, 8);
  if (!domain) return json({ error: "Enter your store domain." }, 422);
  if (email && !validEmail(email)) {
    return json({ error: "Enter a valid work email." }, 422);
  }

  return forwardJson(`${apiBase}/monitoring/public/answer-check`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      domain,
      email: email || null,
      source: clean(payload?.source, 64) || "homepage_hero",
      // Honeypot passes straight through: the backend decides what to do.
      website: clean(payload?.website, 200) || null,
      ...(payload?.retry === true ? { retry: true } : {}),
      ...(LOCALES.includes(locale) ? { locale } : {}),
    }),
  });
}

// Merchant CDNs serve product images with Cross-Origin-Resource-Policy, so the
// browser refuses them when they are hotlinked. The worker fetches them
// server-side and re-serves them from this origin.
const IMAGE_MAX_BYTES = 3_000_000;
const IMAGE_CACHE_SECONDS = 604800; // 7 days

// Shopify's CDN resizes from URL params, so we ask upstream for roughly the
// size the page renders instead of proxying multi-hundred-KB originals into
// 48px thumbnails. Callers opt into a smaller step with `w`.
const IMAGE_WIDTHS = [96, 128, 192, 256, 384, 512, 768, 1024];
const DEFAULT_IMAGE_WIDTH = 512;

function resizableHost(hostname) {
  return (
    hostname === "cdn.shopify.com" ||
    hostname.endsWith(".myshopify.com") ||
    hostname.endsWith(".shopifycdn.com")
  );
}

function pickImageWidth(raw) {
  const asked = Number(raw);
  if (!Number.isFinite(asked) || asked <= 0) return DEFAULT_IMAGE_WIDTH;
  return IMAGE_WIDTHS.find((w) => w >= asked) || IMAGE_WIDTHS.at(-1);
}

async function proxyProductImage(request, url) {
  const target = clean(url.searchParams.get("u"), 1000);
  if (!target) return json({ error: "u is required" }, 422);

  let source;
  try {
    source = new URL(target);
  } catch {
    return json({ error: "invalid url" }, 422);
  }
  // https only: no internal addresses, no other schemes.
  if (source.protocol !== "https:") {
    return json({ error: "unsupported url" }, 422);
  }

  const width = pickImageWidth(url.searchParams.get("w"));
  const wantsWebp = (request.headers.get("accept") || "").includes(
    "image/webp",
  );
  // Only rewrite hosts we know transform from query params, and never override
  // sizing the caller already put on the upstream URL.
  if (
    resizableHost(source.hostname) &&
    !source.searchParams.has("width") &&
    !source.searchParams.has("height")
  ) {
    source.searchParams.set("width", String(width));
    if (wantsWebp) source.searchParams.set("format", "webp");
  }

  const cache = caches.default;
  // Same-origin cache key, varied by the size/format actually fetched so a
  // webp variant is never served to a client that cannot read it.
  const cacheUrl = new URL(url.toString());
  cacheUrl.searchParams.set("w", String(width));
  cacheUrl.searchParams.set("fmt", wantsWebp ? "webp" : "orig");
  const cacheKey = new Request(cacheUrl.toString(), { method: "GET" });
  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  let upstream;
  try {
    upstream = await fetch(source.toString(), {
      headers: {
        accept: "image/*",
        "user-agent": "Mozilla/5.0 (compatible; BeseamImageProxy/1.0)",
      },
      redirect: "follow",
      cf: { cacheTtl: IMAGE_CACHE_SECONDS, cacheEverything: true },
    });
  } catch {
    return json({ error: "image unavailable" }, 502);
  }

  const type = upstream.headers.get("content-type") || "";
  const length = Number(upstream.headers.get("content-length") || 0);
  if (!upstream.ok || !type.startsWith("image/") || length > IMAGE_MAX_BYTES) {
    return json({ error: "image unavailable" }, 502);
  }

  const response = new Response(upstream.body, {
    status: 200,
    headers: {
      "content-type": type,
      "cache-control": `public, max-age=${IMAGE_CACHE_SECONDS}, immutable`,
      vary: "accept",
      "x-content-type-options": "nosniff",
      "content-security-policy": "default-src 'none'; img-src 'self' data:",
    },
  });
  await cache.put(cacheKey, response.clone());
  return response;
}

async function verifyAnswerCheck(url, env) {
  const apiBase = (env.API_BASE_URL || DEFAULT_API_BASE).replace(/\/$/, "");
  const token = clean(url.searchParams.get("token"), 128);
  const reportId = clean(url.searchParams.get("report_id"), 32);
  const scan = new URL(url);
  scan.pathname = "/scan";
  scan.search = "";

  if (!token) {
    scan.searchParams.set("scan_error", "missing_token");
    return Response.redirect(scan.toString(), 302);
  }

  try {
    const response = await fetch(
      `${apiBase}/monitoring/public/answer-check/verify?token=${encodeURIComponent(token)}`,
      { method: "POST" },
    );
    const payload = await response.json();
    if (!response.ok || !payload?.domain) {
      scan.searchParams.set("scan_error", "link_used");
      return Response.redirect(scan.toString(), 302);
    }
    if (/^\d+$/.test(reportId)) {
      const appBase = (env.APP_BASE_URL || DEFAULT_APP_BASE).replace(
        /\/+$/,
        "",
      );
      return Response.redirect(`${appBase}/report/${reportId}`, 302);
    }
    scan.searchParams.set("domain", payload.domain);
    // The visitor got here by clicking the email we just sent. Mark that fact
    // so the result page never asks for the same address a second time.
    scan.searchParams.set("verified", "1");
  } catch {
    scan.searchParams.set("scan_error", "unavailable");
  }

  return Response.redirect(scan.toString(), 302);
}

async function forwardJson(target, init) {
  try {
    const response = await fetch(target, init);
    const body = await response.text();
    const headers = {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    };
    // The scan is two POSTs seconds apart (domain, then address), so a 429 on
    // the second is a window the page can simply wait out. Rebuilding the
    // headers from scratch would swallow how long that wait is.
    const retryAfter = response.headers.get("retry-after");
    if (retryAfter) headers["retry-after"] = retryAfter;
    return new Response(body, {
      status: response.status,
      headers,
    });
  } catch {
    return json({ error: "The scan service is unavailable right now." }, 502);
  }
}

/**
 * First visit, no remembered choice, German signal -> the German page.
 *
 * 302 rather than 301: this is a default, not a property of the URL, and a
 * cached 301 in a visitor's browser would outlive their later switch to
 * English. `private, no-store` plus `Vary` is what stops the CDN handing one
 * visitor's redirect to the next.
 */
function localeRedirect(request, url) {
  const target = redirectTargetFor({
    method: request.method,
    pathname: url.pathname,
    search: url.search,
    cookieHeader: request.headers.get("cookie"),
    acceptLanguage: request.headers.get("accept-language"),
    country: request.cf?.country || request.headers.get("cf-ipcountry"),
    userAgent: request.headers.get("user-agent"),
    hasLangParam: url.searchParams.has("lang"),
  });
  if (!target) return null;
  return new Response(null, {
    status: 302,
    headers: {
      location: target,
      "cache-control": "private, no-store",
      vary: "Cookie, Accept-Language, CF-IPCountry",
    },
  });
}

const worker = {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/answer-check") {
      return proxyAnswerCheck(request, url, env);
    }

    if (
      url.pathname === "/api/product-image" &&
      (request.method === "GET" || request.method === "HEAD")
    ) {
      return proxyProductImage(request, url);
    }

    // Target of the verification email: authorize the paid probe, then send the
    // visitor to the card so they can watch it finish.
    if (url.pathname === "/scan/verify") {
      return verifyAnswerCheck(url, env);
    }

    if (request.method === "POST" && url.pathname === "/api/lead") {
      const parsed = await readLead(request, url, null);
      if (parsed.response) return parsed.response;
      return REVIEW_SOURCES.has(parsed.lead.source)
        ? submitReview(parsed.lead, env)
        : submitScanLead(parsed.lead, env);
    }
    const redirected = localeRedirect(request, url);
    if (redirected) return redirected;

    // Local development: `npm run dev` runs this worker in front of `next dev`,
    // so everything that is not an API route is handed to Next (keeping HMR)
    // instead of the exported ./out directory, which is stale or absent.
    if (env.DEV_ORIGIN) {
      const upstream = new URL(url.pathname + url.search, env.DEV_ORIGIN);
      return fetch(new Request(upstream, request));
    }

    if (!env.ASSETS) {
      return new Response(
        "No ASSETS binding and no DEV_ORIGIN. Run `npm run dev` (worker + next), " +
          "or deploy with wrangler.jsonc, which serves ./out.",
        { status: 500, headers: { "content-type": "text/plain" } },
      );
    }

    return env.ASSETS.fetch(request);
  },
};

export default worker;
