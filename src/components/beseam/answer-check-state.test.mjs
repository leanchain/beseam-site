import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  deriveDeepAuditCardState,
  deriveSampledAuditGroups,
  isCatalogFinding,
} from "./answer-check-state.ts";

function result(overrides) {
  return {
    domain: "example.com",
    status: "awaiting_verification",
    platform: "generic",
    products_seen: 0,
    findings: [],
    questions: [],
    results: [],
    steps: [],
    ...overrides,
  };
}

describe("deep audit card state", () => {
  for (const site_kind of ["store", "brand_site"]) {
    it(`${site_kind}: gated`, () => {
      const state = deriveDeepAuditCardState(
        result({
          site_kind,
          page_audits_status: "not_started",
          page_audits: [],
        }),
      );
      assert.equal(state.homepageState, "gated");
      assert.equal(state.gated, true);
      assert.equal(state.showProductPages, site_kind === "store");
    });

    it(`${site_kind}: in flight`, () => {
      const state = deriveDeepAuditCardState(
        result({ site_kind, page_audits_status: "running", page_audits: [] }),
      );
      assert.equal(state.homepageState, "reading");
      assert.equal(state.inFlight, true);
    });

    it(`${site_kind}: complete`, () => {
      const state = deriveDeepAuditCardState(
        result({
          site_kind,
          page_audits_status: "complete",
          homepage_audit: {
            url: "https://example.com/",
            ok: true,
            title: "Example",
            error: null,
            score: 80,
            grade: "B",
            report_id: 1,
            coverage: 1,
            degraded: false,
            domain_scores: {},
            domain_counts: {},
            checks_evaluated: 10,
            checks_failed: 1,
            checks_unevaluated: 0,
            findings: [],
            page_type: "HOMEPAGE",
          },
        }),
      );
      assert.equal(state.homepageState, "complete");
    });

    it(`${site_kind}: failed`, () => {
      const state = deriveDeepAuditCardState(
        result({
          site_kind,
          page_audits_status: "failed",
          homepage_audit: {
            url: "https://example.com/",
            ok: false,
            error: "unreadable",
            page_type: "HOMEPAGE",
          },
        }),
      );
      assert.equal(state.homepageState, "failed");
    });
  }

  it("legacy rows default to store presentation", () => {
    const state = deriveDeepAuditCardState(
      result({ page_audits_status: "not_started" }),
    );
    assert.equal(state.siteKind, "store");
    assert.equal(state.showProductPages, true);
  });
});

describe("catalog finding classification", () => {
  it("keeps catalog findings and excludes deep-page findings", () => {
    assert.equal(
      isCatalogFinding({
        code: "catalog.foo",
        title: "x",
        detail: "x",
        product: null,
        source: "catalog",
      }),
      true,
    );
    assert.equal(
      isCatalogFinding({
        code: "page.foo",
        title: "x",
        detail: "x",
        product: null,
        source: "page_audit",
      }),
      false,
    );
    assert.equal(
      isCatalogFinding({
        code: "home.foo",
        title: "x",
        detail: "x",
        product: null,
        source: "homepage_audit",
      }),
      false,
    );
    assert.equal(
      isCatalogFinding({
        code: "about.foo",
        title: "x",
        detail: "x",
        product: null,
        source: "entity_page_audit",
      }),
      false,
    );
    for (const [code, source] of [
      ["sample.foo", "catalog_sample"],
      ["category.foo", "category_page_audit"],
      ["content.foo", "content_page_audit"],
    ]) {
      assert.equal(
        isCatalogFinding({
          code,
          title: "x",
          detail: "x",
          product: null,
          source,
        }),
        false,
      );
    }
  });
});

describe("sampled audit group visibility", () => {
  it("caps discovered candidates at two per group", () => {
    const groups = deriveSampledAuditGroups(
      result({
        page_audit_plan: { category: 1, content: 2 },
        site_inventory: {
          entity_page_types: { collection: 12, article: 4, blog: 2, page: 20 },
        },
      }),
    );
    assert.equal(groups.collectionCandidates, 1);
    assert.equal(groups.contentCandidates, 2);
    assert.equal(groups.showCollections, true);
    assert.equal(groups.showContent, true);
  });

  it("falls back to inventory counts for legacy payloads without an audit plan", () => {
    const groups = deriveSampledAuditGroups(
      result({
        site_inventory: {
          page_types: { collection: 1, article: 1 },
        },
      }),
    );
    assert.equal(groups.collectionCandidates, 1);
    assert.equal(groups.contentCandidates, 1);
  });

  it("shows completed groups even when discovery counts were unavailable", () => {
    const groups = deriveSampledAuditGroups(
      result({
        category_page_audits: [{ url: "https://example.com/c", ok: true }],
        content_page_audits: [{ url: "https://example.com/blog", ok: true }],
      }),
    );
    assert.equal(groups.collectionCandidates, 0);
    assert.equal(groups.contentCandidates, 0);
    assert.equal(groups.showCollections, true);
    assert.equal(groups.showContent, true);
  });
});
