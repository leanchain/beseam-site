import type { ReactNode } from "react";

import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { BookReviewCta } from "@/components/beseam/book-review-cta";
import Halftone from "@/components/beseam/halftone";
import { Reveal } from "@/components/beseam/reveal";

/**
 * Building blocks shared by /compare and /compare/[slug], in the homepage's
 * visual language: a cream hero, alternating white and cream bands with
 * centred headings, white cards, and the dark closing call to action.
 */

export const CREAM = "#fff9e8";

/** Same pastel tiles as the homepage cards. */
export const TILES = ["#ffe680", "#e3d3ff", "#ffd3e2", "#c6efdc"] as const;

export function CompareHero({
  crumbs,
  title,
  intro,
  meta,
  breadcrumbLabel = "Breadcrumb",
}: {
  breadcrumbLabel?: string;
  crumbs: readonly { label: string; href?: string }[];
  title: string;
  intro: string;
  meta: string;
}) {
  return (
    <header className="relative isolate overflow-hidden bg-[#fff9e8]">
      <Halftone corner="top-right" size={220} className="hidden xl:block" />
      <div className="relative z-10 mx-auto max-w-[76rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <nav
          aria-label={breadcrumbLabel}
          className="text-[13px] font-medium text-black/55"
        >
          {crumbs.map((crumb, index) => (
            <span key={crumb.label}>
              {index > 0 ? (
                <span aria-hidden="true" className="mx-2">
                  /
                </span>
              ) : null}
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="text-ink-deep underline-offset-4 hover:underline"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span>{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
        <Reveal className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-end lg:gap-16">
          <h1 className="max-w-[18ch] text-balance font-display text-[clamp(2.6rem,5vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink-deep">
            {title}
          </h1>
          <div>
            <p className="max-w-[56ch] text-[17px] leading-[1.7] text-black/72 sm:text-[18px]">
              {intro}
            </p>
            <p className="mt-5 text-[13px] font-medium text-black/50">{meta}</p>
          </div>
        </Reveal>
      </div>
    </header>
  );
}

/** One full-width section with a centred heading. */
export function Band({
  warm,
  heading,
  intro,
  children,
}: {
  warm?: boolean;
  heading: string;
  intro?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className={warm ? "bg-[#fff9e8]" : "bg-ground"}>
      <div className="mx-auto max-w-[76rem] px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
        <Reveal>
          <h2 className="mx-auto max-w-[24ch] text-balance text-center font-display text-[clamp(2rem,3.2vw,3rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink-deep">
            {heading}
          </h2>
          {intro ? (
            <div className="mx-auto mt-5 max-w-[62ch] text-center text-[17px] leading-[1.7] text-black/64">
              {intro}
            </div>
          ) : null}
          {children}
        </Reveal>
      </div>
    </section>
  );
}

/**
 * A three-column comparison (question, competitor, Beseam) as one white card.
 * The Beseam column is tinted so the eye can follow it down the rows. On
 * small screens each row stacks, with the column names repeated as labels.
 */
export function CompareTable({
  firstLabel,
  competitor,
  rows,
  numbered,
}: {
  firstLabel: string;
  competitor: string;
  rows: readonly { label: string; competitor: string; beseam: string }[];
  numbered?: boolean;
}) {
  const grid = "md:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)_minmax(0,1fr)]";
  return (
    <div className="mt-10 overflow-hidden rounded-media border border-black/10 bg-white lg:mt-12">
      <div
        className={`hidden border-b border-black/10 font-display text-[13px] font-semibold text-ink-deep md:grid ${grid}`}
      >
        <span className="px-6 py-4 text-black/55">{firstLabel}</span>
        <span className="px-6 py-4">{competitor}</span>
        <span className="flex items-center bg-[#fff9e8] px-6 py-4">
          <span className="rounded-button bg-signal px-2.5 py-1">Beseam</span>
        </span>
      </div>
      {rows.map((row, index) => (
        <div
          key={row.label}
          className={`grid border-b border-black/8 last:border-b-0 ${grid}`}
        >
          <h3 className="flex items-start gap-3 px-6 pb-2 pt-5 text-[16px] font-semibold leading-snug text-ink-deep md:py-5">
            {numbered ? (
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-signal-ink text-[12px] font-semibold text-white">
                {index + 1}
              </span>
            ) : null}
            {row.label}
          </h3>
          <div className="px-6 py-2 md:py-5">
            <p className="text-[12px] font-semibold text-black/50 md:hidden">
              {competitor}
            </p>
            <p className="mt-1 text-[15px] leading-[1.6] text-black/64 md:mt-0">
              {row.competitor}
            </p>
          </div>
          <div className="bg-[#fff9e8] px-6 pb-5 pt-3 md:py-5">
            <p className="text-[12px] font-semibold text-ink-deep md:hidden">
              Beseam
            </p>
            <p className="mt-1 text-[15px] leading-[1.6] text-ink-deep md:mt-0">
              {row.beseam}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function LinkCard({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between gap-3 rounded-media border border-black/10 bg-white px-5 py-4 text-[15px] font-semibold text-ink-deep transition-colors hover:border-black/30"
    >
      {children}
      <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

/** The dark closing band, like the homepage's last call to action. */
export function CompareCta({
  heading,
  body,
  location,
  buttonLabel,
}: {
  heading: string;
  body: string;
  location: string;
  buttonLabel: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-pigment">
      <Halftone
        corner="top-left"
        size={220}
        colors={["#ffe14d", "#ff8fb3"]}
        opacity={0.7}
        className="hidden lg:block"
      />
      <Halftone
        corner="bottom-right"
        size={300}
        colors={["#ffe14d", "#ff8fb3"]}
        opacity={0.7}
        className="hidden lg:block"
      />
      <div className="relative mx-auto max-w-[76rem] px-5 py-16 text-center sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <Reveal>
          <h2 className="mx-auto max-w-[22ch] text-balance font-display text-[clamp(2.25rem,3.6vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-white">
            {heading}
          </h2>
          <p className="mx-auto mt-6 max-w-[60ch] text-[17px] leading-[1.7] text-white/72">
            {body}
          </p>
          <div className="mt-9 flex justify-center">
            <BookReviewCta
              location={location}
              label={buttonLabel}
              className="w-full bg-signal text-ink-deep transition-colors hover:bg-white focus-visible:ring-white focus-visible:ring-offset-pigment sm:w-auto"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
