import Image from "next/image";
import Link from "next/link";

import {
  ArrowUpRight,
  Code2,
  Linkedin,
  Mail,
  Search,
  ShoppingCart,
} from "lucide-react";

import { BookReviewCta } from "@/components/beseam/book-review-cta";
import Halftone from "@/components/beseam/halftone";
import { Reveal } from "@/components/beseam/reveal";
import { localizedPath, type Locale } from "@/i18n/locale-rules.mjs";
import { getPageCopy } from "@/i18n/pages";
import { SITE_URL } from "@/lib/seo";

/**
 * `image` and `linkedin` are optional because an advisor can join before the
 * headshot and the profile link arrive. A missing photo renders as initials
 * rather than a stock face, and a missing profile drops the link instead of
 * pointing somewhere invented.
 */
type Advisor = {
  /** Key into the page copy's `about.advisors`, for the role and bio. */
  key: "bettina" | "fabrizio" | "laura";
  name: string;
  image?: string;
  linkedin?: string;
};

const ADVISORS: readonly Advisor[] = [
  {
    key: "bettina",
    name: "Bettina Gimenez",
    image: "/images/about/bettina-gimenez.jpg",
    linkedin: "https://www.linkedin.com/in/bettina-gimenez-a6315655/",
  },
  {
    key: "fabrizio",
    name: "Fabrizio Metzler",
    image: "/images/about/fabrizio-metzler.jpg",
    linkedin: "https://www.linkedin.com/in/fabrizio-metzler/",
  },
  {
    // Everything here is what Laura confirmed and nothing more. No company
    // name, no headshot, no quote until she supplies them.
    key: "laura",
    name: "Laura Plobner",
  },
];

/** Same pastel tiles as the homepage cards, in a fixed order. */
const TILES = ["#ffe680", "#e3d3ff", "#c6efdc"] as const;

/** Icons for the three teams, in the order of `about.teams` in the copy. */
const TEAM_ICONS = [Search, ShoppingCart, Code2] as const;

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

export default function AboutPage({ locale = "en" }: { locale?: Locale }) {
  const copy = getPageCopy(locale);
  const t = copy.about;
  const url = `${SITE_URL}${localizedPath("/about", locale)}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${url}#webpage`,
        url,
        name: t.metaTitle,
        description: t.jsonLdDescription,
        about: { "@id": `${SITE_URL}/#organization` },
        mainEntity: { "@id": `${SITE_URL}/about#pankaj-kumar` },
        inLanguage: locale,
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/about#pankaj-kumar`,
        name: "Pankaj Kumar",
        url: `${SITE_URL}/about`,
        jobTitle: "Founder",
        workLocation: {
          "@type": "Place",
          name: "Zurich, Switzerland",
        },
        worksFor: { "@id": `${SITE_URL}/#organization` },
        sameAs: ["https://linkedin.com/in/pankaj4u4m"],
        knowsAbout: [
          "Ecommerce",
          "Decision systems",
          "Measurement",
          "Reliability engineering",
          "Data infrastructure",
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${SITE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: t.breadcrumb,
            item: url,
          },
        ],
      },
    ],
  };

  return (
    <div className="bg-ground text-[#151515]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative isolate overflow-hidden bg-[#fff9e8]">
        {/* Top-right: the intro text sits bottom-right on desktop. */}
        <Halftone corner="top-right" size={220} className="hidden xl:block" />
        <div className="relative z-10 mx-auto max-w-[76rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <nav
            aria-label={copy.common.breadcrumb}
            className="text-[13px] font-medium text-black/55"
          >
            <Link
              href={localizedPath("/", locale)}
              className="text-ink-deep underline-offset-4 hover:underline"
            >
              Beseam
            </Link>
            <span aria-hidden className="mx-2">
              /
            </span>
            <span>{t.breadcrumb}</span>
          </nav>
          <Reveal className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
            <h1 className="max-w-[17ch] text-balance font-display text-[clamp(2.6rem,5vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink-deep">
              {t.title}
            </h1>
            <div>
              <p className="max-w-[56ch] text-[17px] leading-[1.7] text-black/72 sm:text-[18px]">
                {t.intro}
              </p>
              <p className="mt-5 inline-flex items-center gap-2.5 text-[15px] font-semibold text-ink-deep">
                <span
                  role="img"
                  aria-label={t.swissFlag}
                  className="relative inline-block h-4 w-4 shrink-0 rounded-[2px] bg-[#d52b1e]"
                >
                  <span className="absolute left-1/2 top-[3px] h-[10px] w-[3px] -translate-x-1/2 bg-white" />
                  <span className="absolute left-[3px] top-1/2 h-[3px] w-[10px] -translate-y-1/2 bg-white" />
                </span>
                {t.builtIn}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-ground">
        <div className="mx-auto grid max-w-[76rem] gap-12 px-5 py-12 sm:px-8 sm:py-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] lg:items-center lg:gap-20 lg:px-10 lg:py-16">
          <Reveal>
            <p className="font-display text-[12px] font-semibold uppercase tracking-[0.08em] text-black/50">
              {t.founderEyebrow}
            </p>
            <h2 className="mt-4 max-w-[18ch] text-balance font-display text-[clamp(2rem,3.2vw,3rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink-deep">
              {t.founderHeading}
            </h2>
            <div className="mt-6 max-w-[62ch] space-y-5 text-[16px] leading-[1.7] text-black/64">
              {t.founderParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link
                href="https://linkedin.com/in/pankaj4u4m"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 items-center gap-2 rounded-button border border-black/12 bg-white px-3.5 text-[14px] font-semibold text-ink-deep transition-colors hover:border-black/30"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
                LinkedIn
              </Link>
              <a
                href="mailto:pankaj@beseam.com"
                className="inline-flex min-h-10 items-center gap-2 rounded-button border border-black/12 bg-white px-3.5 text-[14px] font-semibold text-ink-deep transition-colors hover:border-black/30"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                pankaj@beseam.com
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <figure className="mx-auto w-full max-w-[26rem] rounded-media bg-[#fff9e8] p-5 sm:p-6">
              <div className="relative aspect-[4/5] overflow-hidden rounded-media">
                <Image
                  src="/images/about/pankaj-kumar.jpg"
                  alt={t.founderPhotoAlt}
                  fill
                  sizes="(min-width: 1024px) 26rem, 100vw"
                  className="object-cover object-center"
                  priority
                />
              </div>
              <figcaption className="mt-4 flex items-center justify-between gap-3">
                <p className="text-[16px] font-semibold text-ink-deep">
                  Pankaj Kumar
                </p>
                <p className="rounded-button bg-signal px-2.5 py-1 text-[12px] font-semibold text-ink-deep">
                  {t.founderRole}
                </p>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#fff9e8]">
        <div className="mx-auto max-w-[76rem] px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
          <Reveal>
            <h2 className="mx-auto max-w-[22ch] text-balance text-center font-display text-[clamp(2rem,3.2vw,3rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink-deep">
              {t.advisorsHeading}
            </h2>
            <p className="mx-auto mt-5 max-w-[60ch] text-center text-[17px] leading-[1.7] text-black/64">
              {t.advisorsIntro}
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <ul className="mt-10 grid gap-5 md:grid-cols-3 lg:mt-12 lg:gap-6">
              {ADVISORS.map((advisor, index) => (
                <li
                  key={advisor.name}
                  className="rounded-media border border-black/10 bg-white p-6 sm:p-7"
                >
                  {advisor.image ? (
                    <Image
                      src={advisor.image}
                      alt={advisor.name}
                      width={80}
                      height={80}
                      className="h-16 w-16 rounded-full object-cover"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="flex h-16 w-16 items-center justify-center rounded-full font-display text-[18px] font-semibold text-ink-deep"
                      style={{ background: TILES[index % TILES.length] }}
                    >
                      {initials(advisor.name)}
                    </span>
                  )}
                  <h3 className="mt-5 text-[19px] font-semibold tracking-[-0.01em] text-ink-deep">
                    {advisor.name}
                  </h3>
                  <p className="mt-1 text-[14px] font-medium text-black/55">
                    {t.advisors[advisor.key].role}
                  </p>
                  <p className="mt-4 text-[15px] leading-[1.6] text-black/64">
                    {t.advisors[advisor.key].bio}
                  </p>
                  {advisor.linkedin ? (
                    <a
                      href={advisor.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-[14px] font-semibold text-ink-deep underline-offset-4 hover:underline"
                    >
                      <Linkedin className="h-4 w-4" aria-hidden="true" />
                      LinkedIn
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  ) : null}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section id="teams" className="scroll-mt-24 bg-ground">
        <div className="mx-auto max-w-[76rem] px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
          <Reveal>
            <h2 className="mx-auto max-w-[22ch] text-balance text-center font-display text-[clamp(2rem,3.2vw,3rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink-deep">
              {t.teamsHeading}
            </h2>
            <p className="mx-auto mt-5 max-w-[60ch] text-center text-[17px] leading-[1.7] text-black/64">
              {t.teamsIntro}
            </p>
            <ul className="mt-10 grid gap-5 md:grid-cols-3 md:grid-rows-[auto_auto_1fr] lg:mt-12 lg:gap-6">
              {t.teams.map(({ role, body }, index) => {
                const Icon = TEAM_ICONS[index % TEAM_ICONS.length];
                return (
                  <li
                    key={role}
                    className="rounded-media border border-black/10 bg-white p-6 sm:p-7 md:row-span-3 md:grid md:grid-rows-subgrid md:gap-0"
                  >
                    <span
                      className="flex h-12 w-12 items-center justify-center rounded-media text-ink-deep"
                      style={{ background: TILES[index % TILES.length] }}
                    >
                      <Icon aria-hidden="true" className="h-6 w-6" />
                    </span>
                    <h3 className="mt-5 text-[19px] font-semibold tracking-[-0.01em] text-ink-deep">
                      {role}
                    </h3>
                    <p className="mt-2 text-[15px] leading-[1.6] text-black/64">
                      {body}
                    </p>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </section>

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
              {t.ctaHeading}
            </h2>
            <p className="mx-auto mt-6 max-w-[60ch] text-[17px] leading-[1.7] text-white/72">
              {t.ctaBody}
            </p>
            <div className="mt-9 flex justify-center">
              <BookReviewCta
                label={t.ctaButton}
                location="about_footer"
                className="w-full bg-signal text-ink-deep transition-colors hover:bg-white focus-visible:ring-white focus-visible:ring-offset-pigment sm:w-auto"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
