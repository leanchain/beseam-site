import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

import worker, { MOVED_PAGES } from "./main.js";

const TREVRA_ENV = {
  TREVRA_CAPTURE_API_BASE_URL: "https://trevra.example",
  TREVRA_CAPTURE_SOURCE_ID: "cap_beseam_test",
  TREVRA_CAPTURE_SECRET: "trv_capture_test_secret_for_worker_tests",
};

function leadRequest(body) {
  return new Request("https://beseam.com/api/lead", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

async function withFetch(fake, run) {
  const previous = globalThis.fetch;
  globalThis.fetch = fake;
  try {
    return await run();
  } finally {
    globalThis.fetch = previous;
  }
}

test("configured /api/lead writes canonical GTM data to Trevra and not SendPulse", async () => {
  const calls = [];
  const response = await withFetch(
    async (url, init) => {
      calls.push({ url: String(url), init });
      return new Response(JSON.stringify({ submissionId: "sub_1" }), {
        status: 202,
        headers: { "content-type": "application/json" },
      });
    },
    () =>
      worker.fetch(
        leadRequest({
          source: "store_health_review",
          email: "founder@example.com",
          name: "Founder",
          store: "https://shop.example.com",
          message: "Please review my store",
          utm: { utm_source: "linkedin" },
        }),
        TREVRA_ENV,
      ),
  );

  assert.equal(response.status, 202);
  assert.equal(calls.length, 1);
  assert.equal(
    calls[0].url,
    "https://trevra.example/api/intake/v1/submissions",
  );
  assert.ok(!calls[0].url.includes("sendpulse"));
  const body = JSON.parse(calls[0].init.body);
  assert.deepEqual(body, {
    kind: "store_health_review",
    person: { email: "founder@example.com", name: "Founder" },
    company: { domain: "https://shop.example.com" },
    message: "Please review my store",
    attribution: { utm_source: "linkedin" },
  });
  assert.equal(calls[0].init.headers["x-trevra-source"], "cap_beseam_test");
  assert.match(
    calls[0].init.headers["x-trevra-signature"],
    /^sha256=[a-f0-9]{64}$/,
  );
});

test("one transient Trevra retry reuses the same idempotency key and exact body", async () => {
  const calls = [];
  let attempt = 0;
  const response = await withFetch(
    async (url, init) => {
      calls.push({ url: String(url), init });
      attempt += 1;
      return new Response("{}", { status: attempt === 1 ? 503 : 202 });
    },
    () =>
      worker.fetch(
        leadRequest({
          source: "ai_visibility_scan",
          email: "scan@example.com",
          submissionId: "submission-browser-001",
        }),
        TREVRA_ENV,
      ),
  );

  assert.equal(response.status, 202);
  assert.equal(calls.length, 2);
  assert.equal(
    calls[0].init.headers["x-trevra-idempotency-key"],
    "submission-browser-001",
  );
  assert.equal(
    calls[0].init.headers["x-trevra-idempotency-key"],
    calls[1].init.headers["x-trevra-idempotency-key"],
  );
  assert.equal(calls[0].init.body, calls[1].init.body);
  assert.equal(
    calls[0].init.headers["x-trevra-signature"],
    calls[1].init.headers["x-trevra-signature"],
  );
});

test("browser retry of the same logical submission keeps the Trevra idempotency key", async () => {
  const calls = [];
  await withFetch(
    async (url, init) => {
      calls.push({ url: String(url), init });
      return new Response("{}", { status: 202 });
    },
    async () => {
      const body = {
        source: "contact",
        email: "retry@example.com",
        name: "Retry Person",
        message: "Same logical form",
        submissionId: "submission-browser-retry-001",
      };
      await worker.fetch(leadRequest(body), TREVRA_ENV);
      await worker.fetch(leadRequest(body), TREVRA_ENV);
    },
  );

  assert.equal(calls.length, 2);
  assert.equal(
    calls[0].init.headers["x-trevra-idempotency-key"],
    "submission-browser-retry-001",
  );
  assert.equal(
    calls[1].init.headers["x-trevra-idempotency-key"],
    "submission-browser-retry-001",
  );
  assert.equal(calls[0].init.body, calls[1].init.body);
});

test("answer-check remains an e-commerce proxy rather than a Trevra route", async () => {
  const calls = [];
  const response = await withFetch(
    async (url, init) => {
      calls.push({ url: String(url), init });
      return new Response(JSON.stringify({ status: "ok" }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    },
    () =>
      worker.fetch(
        new Request("https://beseam.com/api/answer-check?domain=example.com"),
        { ...TREVRA_ENV, API_BASE_URL: "https://api.beseam.test/api" },
      ),
  );

  assert.equal(response.status, 200);
  assert.equal(
    calls[0].url,
    "https://api.beseam.test/api/monitoring/public/answer-check/example.com",
  );
});

test("a known locale is forwarded to the scan API", async () => {
  const seen = [];
  await withFetch(
    async (input) => {
      seen.push(String(input.url ?? input));
      return new Response("{}", {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    },
    async () => {
      await worker.fetch(
        new Request(
          "https://beseam.com/api/answer-check?domain=example.com&locale=de",
        ),
        { API_BASE_URL: "https://api.example/api" },
      );
    },
  );
  assert.match(seen[0], /locale=de/);
});

test("a known locale is forwarded in a scan POST body", async () => {
  const bodies = [];
  await withFetch(
    async (_input, init) => {
      bodies.push(JSON.parse(init.body));
      return new Response("{}", {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    },
    async () => {
      await worker.fetch(
        new Request("https://beseam.com/api/answer-check", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            origin: "https://beseam.com",
          },
          body: JSON.stringify({ domain: "example.com", locale: "de" }),
        }),
        { API_BASE_URL: "https://api.example/api" },
      );
    },
  );
  assert.equal(bodies[0].locale, "de");
});

test("an unknown locale is dropped, not proxied", async () => {
  const seen = [];
  await withFetch(
    async (input) => {
      seen.push(String(input.url ?? input));
      return new Response("{}", {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    },
    async () => {
      await worker.fetch(
        new Request(
          "https://beseam.com/api/answer-check?domain=example.com&locale=xx",
        ),
        { API_BASE_URL: "https://api.example/api" },
      );
    },
  );
  assert.doesNotMatch(seen[0], /locale=/);
});

test("/scan/verify is handled by the worker and sends missing tokens to the scan page", async () => {
  const response = await worker.fetch(
    new Request("https://beseam.com/scan/verify"),
    TREVRA_ENV,
  );

  assert.equal(response.status, 302);
  assert.equal(
    response.headers.get("location"),
    "https://beseam.com/scan?scan_error=missing_token",
  );
});

test("/scan/verify consumes a valid token and returns to the scan page", async () => {
  const calls = [];
  const response = await withFetch(
    async (url, init) => {
      calls.push({ url: String(url), init });
      return new Response(JSON.stringify({ domain: "shop.example" }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    },
    () =>
      worker.fetch(
        new Request("https://beseam.com/scan/verify?token=test-token"),
        { ...TREVRA_ENV, API_BASE_URL: "https://api.beseam.test/api" },
      ),
  );

  assert.equal(response.status, 302);
  assert.equal(calls.length, 1);
  assert.equal(
    calls[0].url,
    "https://api.beseam.test/api/monitoring/public/answer-check/verify?token=test-token",
  );
  assert.equal(calls[0].init.method, "POST");
  assert.equal(
    response.headers.get("location"),
    "https://beseam.com/scan?domain=shop.example&verified=1",
  );
});

test("/scan/verify returns a PDP verification to the originating report", async () => {
  const response = await withFetch(
    async () =>
      new Response(JSON.stringify({ domain: "shop.example" }), {
        status: 200,
        headers: { "content-type": "application/json" },
      }),
    () =>
      worker.fetch(
        new Request(
          "https://beseam.com/scan/verify?token=test-token&report_id=3909086518540540",
        ),
        { ...TREVRA_ENV, API_BASE_URL: "https://api.beseam.test/api" },
      ),
  );

  assert.equal(response.status, 302);
  assert.equal(
    response.headers.get("location"),
    "https://app.beseam.com/report/3909086518540540",
  );
});

test("a domain-only scan reaches the API with a null email", async () => {
  const calls = [];
  const response = await withFetch(
    async (url, init) => {
      calls.push({ url, init });
      return new Response(
        JSON.stringify({
          domain: "shop.example",
          status: "awaiting_verification",
        }),
        { status: 200, headers: { "content-type": "application/json" } },
      );
    },
    () =>
      worker.fetch(
        new Request("https://beseam.com/api/answer-check", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ domain: "shop.example", source: "scan_page" }),
        }),
        { ...TREVRA_ENV, API_BASE_URL: "https://api.beseam.test/api" },
      ),
  );

  assert.equal(response.status, 200);
  assert.equal(calls.length, 1);
  assert.deepEqual(JSON.parse(calls[0].init.body), {
    domain: "shop.example",
    email: null,
    source: "scan_page",
    website: null,
  });
});

function navigation(
  path,
  {
    country = null,
    acceptLanguage = null,
    cookie = null,
    userAgent = "Mozilla/5.0 (Macintosh) Chrome/140.0.0.0 Safari/537.36",
    method = "GET",
  } = {},
) {
  const headers = { "user-agent": userAgent };
  if (acceptLanguage) headers["accept-language"] = acceptLanguage;
  if (cookie) headers.cookie = cookie;
  if (country) headers["cf-ipcountry"] = country;
  return new Request(`https://beseam.com${path}`, { method, headers });
}

const ASSET_ENV = {
  ASSETS: { fetch: async () => new Response("asset", { status: 200 }) },
};

test("a German visitor is redirected to the German page", async () => {
  const response = await worker.fetch(
    navigation("/", { country: "DE" }),
    ASSET_ENV,
  );
  assert.equal(response.status, 302);
  assert.equal(response.headers.get("location"), "/de");
  assert.equal(response.headers.get("cache-control"), "private, no-store");
  assert.match(response.headers.get("vary"), /Cookie/);
});

test("the redirect keeps the campaign query", async () => {
  const response = await worker.fetch(
    navigation("/?utm_source=x", { country: "AT" }),
    ASSET_ENV,
  );
  assert.equal(response.headers.get("location"), "/de?utm_source=x");
});

test("/scan redirects to /de/scan", async () => {
  const response = await worker.fetch(
    navigation("/scan", { country: "CH" }),
    ASSET_ENV,
  );
  assert.equal(response.headers.get("location"), "/de/scan");
});

test("a German speaker outside DACH is redirected", async () => {
  const response = await worker.fetch(
    navigation("/", {
      country: "US",
      acceptLanguage: "de-DE,de;q=0.9,en;q=0.8",
    }),
    ASSET_ENV,
  );
  assert.equal(response.headers.get("location"), "/de");
});

test("an explicit English choice is never overridden", async () => {
  const response = await worker.fetch(
    navigation("/", { country: "DE", cookie: "bs_lang=en" }),
    ASSET_ENV,
  );
  assert.equal(response.status, 200);
});

test("crawlers, overrides, non-navigations and other routes are served the asset", async () => {
  for (const request of [
    navigation("/", {
      country: "DE",
      userAgent: "Mozilla/5.0 (compatible; Googlebot/2.1)",
    }),
    navigation("/?lang=en", { country: "DE" }),
    navigation("/", { country: "DE", method: "POST" }),
    navigation("/pricing", { country: "DE" }),
    navigation("/de", { country: "DE" }),
    navigation("/", { country: "US" }),
  ]) {
    const response = await worker.fetch(request, ASSET_ENV);
    assert.equal(response.status, 200, `${request.method} ${request.url}`);
  }
});

test("a rate-limited scan keeps its status and its Retry-After", async () => {
  const response = await withFetch(
    async () =>
      new Response(
        JSON.stringify({ detail: "Rate limit exceeded", retry_after: 30 }),
        {
          status: 429,
          headers: { "content-type": "application/json", "retry-after": "30" },
        },
      ),
    () =>
      worker.fetch(
        new Request("https://beseam.com/api/answer-check", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            domain: "shop.example",
            email: "buyer@shop.example",
          }),
        }),
        { ...TREVRA_ENV, API_BASE_URL: "https://api.beseam.test/api" },
      ),
  );

  assert.equal(response.status, 429);
  assert.equal(response.headers.get("retry-after"), "30");
});

test("serves a signed Web Bot Auth key directory", async () => {
  const pair = await crypto.subtle.generateKey({ name: "Ed25519" }, true, [
    "sign",
    "verify",
  ]);
  const pkcs8 = Buffer.from(
    await crypto.subtle.exportKey("pkcs8", pair.privateKey),
  ).toString("base64");
  const publicKeyX = Buffer.from(
    await crypto.subtle.exportKey("raw", pair.publicKey),
  ).toString("base64url");

  const response = await worker.fetch(
    new Request(
      "https://beseam.com/.well-known/http-message-signatures-directory",
    ),
    {
      WEB_BOT_AUTH_PRIVATE_KEY_PKCS8_B64: pkcs8,
      WEB_BOT_AUTH_PUBLIC_KEY_X: publicKeyX,
    },
  );

  assert.equal(response.status, 200);
  assert.equal(
    response.headers.get("content-type"),
    "application/http-message-signatures-directory+json",
  );
  assert.match(
    response.headers.get("signature-input") || "",
    /tag="http-message-signatures-directory"/,
  );
  assert.match(
    response.headers.get("signature") || "",
    /^sig1=:[A-Za-z0-9+/=]+:$/,
  );
  assert.deepEqual(await response.json(), {
    keys: [{ kty: "OKP", crv: "Ed25519", x: publicKeyX }],
  });
});

test("the removed /how-we-work page redirects permanently to /about", async () => {
  for (const path of ["/how-we-work", "/how-we-work/"]) {
    const response = await worker.fetch(
      new Request(`https://beseam.com${path}`),
      {},
    );
    assert.equal(response.status, 301);
    assert.equal(response.headers.get("location"), "https://beseam.com/about");
  }
});

test("removed pages redirect permanently to their replacements", async () => {
  const moves = {
    "/manifesto": "/about",
    "/platform": "/",
    "/ai-visibility-monitoring": "/product/ai-visibility-tracking",
    "/agents": "/AGENTS.md",
    "/data": "/benchmarks",
    "/data/ai-shopping.json": "/benchmarks",
  };
  for (const [from, to] of Object.entries(moves)) {
    const response = await worker.fetch(
      new Request(`https://beseam.com${from}`),
      {},
    );
    assert.equal(response.status, 301);
    assert.equal(response.headers.get("location"), `https://beseam.com${to}`);
  }
});

test("contact form messages are emailed to contact@ and copied to guido@", async () => {
  const sent = [];
  const env = {
    REVIEW_EMAIL: {
      send: async (message) => {
        sent.push(message);
      },
    },
  };
  const response = await worker.fetch(
    leadRequest({
      source: "contact",
      name: "Test Person",
      email: "test@example.com",
      message: "Hello there",
    }),
    env,
  );
  assert.equal(response.status, 202);
  assert.deepEqual(
    sent.map((message) => message.to),
    ["contact@beseam.com", "guido@beseam.com"],
  );
  assert.equal(sent[1].replyTo, "test@example.com");
  assert.match(sent[1].text, /Hello there/);
});

test("a failed copy to guido@ does not fail the contact form", async () => {
  const env = {
    REVIEW_EMAIL: {
      send: async (message) => {
        if (message.to === "guido@beseam.com") throw new Error("not verified");
      },
    },
  };
  const response = await worker.fetch(
    leadRequest({
      source: "contact",
      name: "Test Person",
      email: "test@example.com",
      message: "Hello there",
    }),
    env,
  );
  assert.equal(response.status, 202);
});

test("every redirected path runs through the Worker on Cloudflare", () => {
  // Without a run_worker_first entry, Cloudflare answers a removed page with
  // its 404 page and the redirect in MOVED_PAGES never runs.
  const config = readFileSync(
    new URL("./wrangler.jsonc", import.meta.url),
    "utf8",
  )
    .split("\n")
    .filter((line) => !line.trim().startsWith("//"))
    .join("\n");
  const match = /"run_worker_first":\s*(\[[^\]]*\])/.exec(config);
  assert.ok(match, "run_worker_first not found in wrangler.jsonc");
  const workerFirst = JSON.parse(match[1]);
  for (const path of Object.keys(MOVED_PAGES)) {
    assert.ok(
      workerFirst.includes(path),
      `${path} missing from run_worker_first`,
    );
  }
});
