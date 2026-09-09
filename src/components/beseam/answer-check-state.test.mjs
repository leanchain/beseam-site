import { describe, expect, it } from 'bun:test';
import { deriveDeepAuditCardState } from './answer-check-state.ts';

function result(overrides) {
  return {
    domain: 'example.com',
    status: 'awaiting_verification',
    platform: 'generic',
    products_seen: 0,
    findings: [],
    questions: [],
    results: [],
    steps: [],
    ...overrides,
  };
}

describe('deep audit card state', () => {
  for (const site_kind of ['store', 'brand_site']) {
    it(`${site_kind}: gated`, () => {
      const state = deriveDeepAuditCardState(result({ site_kind, page_audits_status: 'not_started', page_audits: [] }));
      expect(state.homepageState).toBe('gated');
      expect(state.gated).toBe(true);
      expect(state.showProductPages).toBe(site_kind === 'store');
    });

    it(`${site_kind}: in flight`, () => {
      const state = deriveDeepAuditCardState(result({ site_kind, page_audits_status: 'running', page_audits: [] }));
      expect(state.homepageState).toBe('reading');
      expect(state.inFlight).toBe(true);
    });

    it(`${site_kind}: complete`, () => {
      const state = deriveDeepAuditCardState(result({
        site_kind,
        page_audits_status: 'complete',
        homepage_audit: {
          url: 'https://example.com/', ok: true, title: 'Example', error: null,
          score: 80, grade: 'B', report_id: 1, coverage: 1, degraded: false,
          domain_scores: {}, domain_counts: {}, checks_evaluated: 10,
          checks_failed: 1, checks_unevaluated: 0, findings: [], page_type: 'HOMEPAGE',
        },
      }));
      expect(state.homepageState).toBe('complete');
    });

    it(`${site_kind}: failed`, () => {
      const state = deriveDeepAuditCardState(result({
        site_kind,
        page_audits_status: 'failed',
        homepage_audit: { url: 'https://example.com/', ok: false, error: 'unreadable', page_type: 'HOMEPAGE' },
      }));
      expect(state.homepageState).toBe('failed');
    });
  }

  it('legacy rows default to store presentation', () => {
    const state = deriveDeepAuditCardState(result({ page_audits_status: 'not_started' }));
    expect(state.siteKind).toBe('store');
    expect(state.showProductPages).toBe(true);
  });
});
