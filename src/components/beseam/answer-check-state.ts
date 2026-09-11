import type { AnswerCheckResult, Finding } from "./answer-check-types";

export type HomepageAuditCardState =
  "gated" | "reading" | "failed" | "complete";

export function deriveDeepAuditCardState(result: AnswerCheckResult) {
  const audits = result.page_audits ?? [];
  const status =
    result.page_audits_status ?? (audits.length ? "complete" : "not_started");
  const inFlight = status === "queued" || status === "running";
  const gated = status === "not_started" && audits.length === 0;
  const homepage = result.homepage_audit;
  const siteKind = result.site_kind ?? "store";

  let homepageState: HomepageAuditCardState;
  if (gated) homepageState = "gated";
  else if (inFlight && !homepage) homepageState = "reading";
  else if (homepage?.ok === false) homepageState = "failed";
  else if (homepage?.ok === true) homepageState = "complete";
  else if (status === "failed" || result.status === "ready" || result.status === "failed") {
    homepageState = "failed";
  } else homepageState = "reading";

  return {
    siteKind,
    status,
    inFlight,
    gated,
    homepageState,
    showProductPages: siteKind !== "brand_site",
  } as const;
}

export function isCatalogFinding(finding: Finding): boolean {
  return !new Set([
    "page_audit",
    "catalog_sample",
    "homepage_audit",
    "entity_page_audit",
    "category_page_audit",
    "content_page_audit",
  ]).has(finding.source ?? "catalog");
}

export function deriveSampledAuditGroups(result: AnswerCheckResult) {
  const pageTypes =
    result.site_inventory?.entity_page_types ??
    result.site_inventory?.page_types ??
    {};
  const collectionCandidates = Math.min(
    result.page_audit_plan?.category ?? pageTypes.collection ?? 0,
    2,
  );
  const contentCandidates = Math.min(
    result.page_audit_plan?.content ??
      (pageTypes.article ?? 0) + (pageTypes.blog ?? 0) + (pageTypes.page ?? 0),
    2,
  );
  const collectionAudits = result.category_page_audits ?? [];
  const contentAudits = result.content_page_audits ?? [];

  return {
    collectionCandidates,
    contentCandidates,
    showCollections: collectionCandidates > 0 || collectionAudits.length > 0,
    showContent: contentCandidates > 0 || contentAudits.length > 0,
  } as const;
}

export type TemplatePatternSource =
  "category_page_audit" | "content_page_audit";

export function deriveTemplatePatterns(
  result: AnswerCheckResult,
  source: TemplatePatternSource,
) {
  const severityRank: Record<string, number> = {
    blocker: 5,
    high: 4,
    medium: 3,
    low: 2,
    info: 1,
  };
  return (result.findings ?? [])
    .filter((finding) => {
      if (finding.source !== source || (finding.affected_pages ?? 0) < 2) {
        return false;
      }
      return new Set(finding.affected_urls ?? []).size >= 2;
    })
    .sort((left, right) => {
      const affected = (right.affected_pages ?? 0) - (left.affected_pages ?? 0);
      if (affected) return affected;
      return (
        (severityRank[right.severity ?? ""] ?? 0) -
        (severityRank[left.severity ?? ""] ?? 0)
      );
    })
    .slice(0, 3);
}

export function derivePdpLayoutCoverage(result: AnswerCheckResult) {
  const summary = result.pdp_template_summary;
  if (
    !summary ||
    summary.layouts_detected <= 0 ||
    summary.candidate_pages_read <= 0
  ) {
    return null;
  }
  return {
    candidatePages: summary.candidate_pages_read,
    layoutsDetected: summary.layouts_detected,
    layoutsAudited: summary.layouts_audited,
    auditedPages: summary.audited_pages,
    fullyCovered: summary.all_detected_layouts_covered,
    exhaustive: summary.exhaustive,
    families: summary.families ?? [],
  } as const;
}
