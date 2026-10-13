"use client";

import { useEffect, useMemo, useState } from "react";

import Link from "next/link";

import { ArrowRight, Search, X } from "lucide-react";

import {
  RESOURCE_CATEGORIES,
  RESOURCE_KINDS,
  type EcosystemResource,
} from "@/lib/commerce-fieldbook";

const ALL = "All";

export default function ResourceIndex({
  resources,
}: {
  resources: EcosystemResource[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(ALL);
  const [kind, setKind] = useState(ALL);

  useEffect(() => {
    const initialQuery = new URLSearchParams(window.location.search).get(
      "query",
    );
    if (initialQuery) setQuery(initialQuery);
  }, []);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return resources.filter((resource) => {
      const searchable = [
        resource.name,
        resource.summary,
        resource.maintainer,
        resource.license,
        resource.category,
        resource.kind,
        ...resource.tags,
        ...resource.useCases,
      ]
        .join(" ")
        .toLowerCase();

      return (
        (!normalizedQuery || searchable.includes(normalizedQuery)) &&
        (category === ALL || resource.category === category) &&
        (kind === ALL || resource.kind === kind)
      );
    });
  }, [category, kind, query, resources]);

  const hasFilters = Boolean(query || category !== ALL || kind !== ALL);

  function resetFilters() {
    setQuery("");
    setCategory(ALL);
    setKind(ALL);
  }

  return (
    <div>
      <div className="border border-black/18 bg-ground-2 p-4 sm:p-5">
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1.5fr)_repeat(2,minmax(0,0.75fr))]">
          <label className="relative block">
            <span className="sr-only">Search resources</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black/62" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search projects, standards, use cases, or tags"
              className="h-12 w-full border border-black/18 bg-panel-white pl-10 pr-4 text-[14px] text-ink-deep placeholder:text-black/62 focus:border-signal-ink focus:outline-none"
            />
          </label>
          <FilterSelect
            label="Category"
            value={category}
            onChange={setCategory}
            options={RESOURCE_CATEGORIES}
          />
          <FilterSelect
            label="Resource type"
            value={kind}
            onChange={setKind}
            options={RESOURCE_KINDS}
          />
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-black/14 pt-4">
          <p className="font-display font-semibold text-[12px] uppercase tracking-[0.09em] text-black/62">
            Showing {filtered.length} of {resources.length} reviewed resources
          </p>
          {hasFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-2 text-[12px] font-semibold text-signal-ink"
            >
              <X className="h-3.5 w-3.5" /> Clear filters
            </button>
          )}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="mt-8 grid gap-px border border-black/16 bg-black/16 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((resource) => {
            return (
              <Link
                key={resource.slug}
                id={`resource-${resource.slug}`}
                href={`/resources/projects/${resource.slug}`}
                className="group flex min-h-full flex-col bg-panel-white p-6 transition-colors hover:bg-ground-2"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-display font-semibold text-[12px] uppercase tracking-[0.09em] text-black/62">
                    {resource.category}
                  </p>
                </div>
                <h2 className="mt-5 flex items-start gap-2 text-[20px] font-semibold leading-snug text-ink-deep">
                  <span>{resource.name}</span>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-signal-ink transition-transform group-hover:translate-x-0.5" />
                </h2>
                <p className="mt-3 text-[12px] leading-relaxed text-black/62">
                  Maintained by {resource.maintainer}
                </p>
                <p className="mt-1 font-display font-semibold text-[12px] uppercase tracking-[0.08em] text-signal-ink">
                  {resource.kind} · {resource.license}
                </p>
                <p className="mt-5 text-[14px] leading-relaxed text-black/62">
                  {resource.summary}
                </p>
                <ul className="mt-5 border-t border-black/14">
                  {resource.useCases.map((useCase) => (
                    <li
                      key={useCase}
                      className="border-b border-black/14 py-3 text-[12px] leading-relaxed text-black/62"
                    >
                      {useCase}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {resource.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-black/16 px-2.5 py-1 font-display font-semibold text-[12px] uppercase tracking-[0.07em] text-black/62"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="mt-auto pt-6 font-display font-semibold text-[12px] uppercase tracking-[0.08em] text-black/62">
                  Reviewed {resource.reviewedAt}
                </p>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="mt-8 border border-black/18 px-6 py-16 text-center">
          <p className="font-serif text-[30px] tracking-[-0.02em] text-ink-deep">
            No resources match those filters.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-5 text-[13px] font-semibold text-signal-ink"
          >
            Reset the index
          </button>
        </div>
      )}
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
}) {
  return (
    <label className="block">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full border border-black/18 bg-panel-white px-3 text-[13px] text-ink-deep focus:border-signal-ink focus:outline-none"
      >
        <option value={ALL}>{label}: all</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
