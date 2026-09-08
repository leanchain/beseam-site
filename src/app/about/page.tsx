import Image from "next/image";
import Link from "next/link";

import { ArrowUpRight, Linkedin, Mail } from "lucide-react";
import type { Metadata } from "next";

import { BookReviewCta } from "@/components/beseam/book-review-cta";
import { Reveal } from "@/components/beseam/reveal";
import TeamsSection from "@/components/beseam/teams-section";
import { SITE_URL, buildPublicMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPublicMetadata({
  title: "About Beseam",
  description:
    "Why Beseam was founded to help ecommerce teams see what makes shoppers find, choose, and buy products, and what changes afterward.",
  path: "/about",
});

/**
 * `image` and `linkedin` are optional because an advisor can join before the
 * headshot and the profile link arrive. A missing photo renders as initials
 * rather than a stock face, and a missing profile drops the link instead of
 * pointing somewhere invented.
 */
type Advisor = {
  name: string;
  role: string;
  bio: string;
  image?: string;
  linkedin?: string;
};

const ADVISORS: readonly Advisor[] = [
  {
    name: "Bettina Gimenez",
    role: "E-commerce expert & DTC founder",
    image: "/images/about/bettina-gimenez.jpg",
    bio: "Co-Founder of Dancing Queens and e-commerce examination expert at Handelsverband.swiss. Former Co-Managing Director at HelloFresh Suisse.",
    linkedin: "https://www.linkedin.com/in/bettina-gimenez-a6315655/",
  },
  {
    name: "Fabrizio Metzler",
    role: "Founder & entrepreneur",
    image: "/images/about/fabrizio-metzler.jpg",
    bio: "Founder of OLEYVO. Former Key Partner Growth Manager at Too Good To Go. Lecturer in start-up and entrepreneurship at STF.",
    linkedin: "https://www.linkedin.com/in/fabrizio-metzler/",
  },
  {
    // Everything here is what Laura confirmed and nothing more. No company
    // name, no headshot, no quote until she supplies them.
    name: "Laura Plobner",
    role: "Marketing & business development",
    bio: "Works in marketing and business development. Previously product owner of a B2B soft-skill coaching platform. Runs her own Swiss ecommerce brand.",
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${SITE_URL}/about#webpage`,
        url: `${SITE_URL}/about`,
        name: "About Beseam",
        description:
          "Why Beseam was founded to help ecommerce teams understand what makes shoppers find, choose, and buy products, with evidence kept connected through the decision.",
        about: { "@id": `${SITE_URL}/#organization` },
        mainEntity: { "@id": `${SITE_URL}/about#pankaj-kumar` },
        inLanguage: "en",
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/about#pankaj-kumar`,
        name: "Pankaj Kumar",
        url: `${SITE_URL}/about`,
        jobTitle: "Founder",
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
            name: "About",
            item: `${SITE_URL}/about`,
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
      <section className="border-b border-black/18">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <Reveal className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end lg:gap-20">
            <div>
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-signal-ink">
                About Beseam
              </p>
              <h1 className="mt-7 max-w-[17ch] font-display text-[clamp(2.8rem,6.2vw,4.5rem)] font-normal leading-[1] tracking-[-0.02em] text-ink-deep">
                Being found is not the same as being chosen.
              </h1>
            </div>
            <p className="max-w-[64ch] text-[19px] leading-[1.72] text-black/66">
              Beseam follows a simple question: what did shoppers want, what did
              they see, what made them hesitate, what changed, and what happened
              next. That is what Find, Prepare, Approve, Apply, and Measure
              means.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-black/18 bg-ground-2">
        <div className="mx-auto grid max-w-[92rem] gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[minmax(0,1.2fr)_minmax(20rem,0.8fr)] lg:items-start lg:gap-20 lg:px-10 lg:py-28">
          <Reveal>
            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.12em] text-signal-ink">
              The founder
            </p>
            <h2 className="mt-6 max-w-[18ch] font-display text-[clamp(2.25rem,3.4vw,3.5rem)] font-normal leading-[1.05] tracking-[-0.02em] text-ink-deep">
              Built by an engineer from Google and Amazon.
            </h2>
            <div className="mt-8 max-w-[68ch] space-y-6 text-[17px] leading-[1.72] text-black/66">
              <p>
                Beseam was founded by Pankaj Kumar, a former Google and Amazon
                engineer focused on measurement, reliability, and data
                infrastructure.
              </p>
              <p>
                For the past year, he has worked closely with ecommerce founders
                and operators on real stores, following the same buying journey
                from how products are found, through what helps shoppers choose,
                to where purchases stop.
              </p>
              <p>
                The same problem kept repeating: teams could measure traffic,
                pages, behavior, and conversion, but it was hard to see why a
                shopper chose one product over another. Beseam was built to keep
                what happened, what changed, and the result in one place.
              </p>
            </div>
            <Link
              href="/manifesto"
              className="mt-9 inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold text-signal-ink underline decoration-black/20 underline-offset-7 hover:decoration-signal-ink"
            >
              Read why I am building Beseam
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                href="https://linkedin.com/in/pankaj4u4m"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 text-[14px] font-semibold text-black/66 hover:text-signal-ink"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
                LinkedIn
              </Link>
              <a
                href="mailto:pankaj@beseam.com"
                className="inline-flex min-h-11 items-center gap-2 text-[14px] font-semibold text-black/66 hover:text-signal-ink"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                pankaj@beseam.com
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <figure className="border border-black/18 bg-white">
              <div className="relative aspect-[4/5]">
                <Image
                  src="/images/about/pankaj-kumar.jpg"
                  alt="Pankaj Kumar, founder of Beseam"
                  fill
                  sizes="(min-width: 1024px) 34vw, 100vw"
                  className="object-cover object-center"
                  priority
                />
              </div>
              <figcaption className="border-t border-black/18 px-5 py-4">
                <p className="text-[15px] font-semibold text-ink-deep">
                  Pankaj Kumar
                </p>
                <p className="mt-1 font-mono text-[12px] uppercase tracking-[0.09em] text-black/62">
                  Founder, Beseam
                </p>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-black/18 bg-ground">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <Reveal className="grid gap-10 border-b border-black/22 pb-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
            <h2 className="max-w-[16ch] font-display text-[clamp(2.25rem,3.4vw,3.5rem)] font-normal leading-[1.05] tracking-[-0.02em] text-ink-deep">
              Grounded in real commerce.
            </h2>
            <p className="max-w-[64ch] self-end text-[17px] leading-[1.65] text-black/66">
              Beseam is advised by operators who have built brands, led
              ecommerce teams, and worked directly with the systems merchants
              depend on.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3">
            {ADVISORS.map((advisor, index) => (
              <Reveal
                key={advisor.name}
                delay={index * 0.06}
                className="grid gap-5 border-b border-black/18 py-8 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0 md:last:pr-0 lg:grid-cols-[5rem_1fr] lg:px-8"
              >
                {advisor.image ? (
                  <Image
                    src={advisor.image}
                    alt={advisor.name}
                    width={80}
                    height={80}
                    className="h-20 w-20 border border-black/18 object-cover"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="flex h-20 w-20 items-center justify-center border border-black/18 bg-white font-mono text-[20px] font-semibold tracking-[0.04em] text-black/45"
                  >
                    {initials(advisor.name)}
                  </span>
                )}
                <div>
                  <h3 className="text-[17px] font-semibold text-ink-deep">
                    {advisor.name}
                  </h3>
                  <p className="mt-1 font-mono text-[12px] uppercase tracking-[0.08em] text-signal-ink">
                    {advisor.role}
                  </p>
                  <p className="mt-4 text-[14px] leading-relaxed text-black/64">
                    {advisor.bio}
                  </p>
                  {advisor.linkedin ? (
                    <a
                      href={advisor.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-[13px] font-semibold text-signal-ink underline decoration-black/20 underline-offset-5"
                    >
                      <Linkedin className="h-3.5 w-3.5" aria-hidden="true" />
                      LinkedIn
                      <ArrowUpRight
                        className="h-3.5 w-3.5"
                        aria-hidden="true"
                      />
                    </a>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <TeamsSection />

      <section className="bg-ink-deep text-white">
        <div className="mx-auto grid max-w-[92rem] gap-10 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[minmax(0,1.15fr)_auto] lg:items-end lg:gap-20 lg:px-10 lg:py-28">
          <Reveal>
            <h2 className="max-w-[18ch] font-display text-[clamp(2.25rem,3.4vw,3.5rem)] font-normal leading-[1.05] tracking-[-0.02em]">
              See how Beseam follows one shopper journey from start to finish.
            </h2>
            <p className="mt-7 max-w-[64ch] text-[17px] leading-[1.65] text-white/72">
              In a 20-minute store review, we use one real finding to show how
              Beseam shows what it found, what it would change, and what it
              checks again afterward.
            </p>
            <p className="mt-5 text-[14px] text-white/62">
              Questions first?{" "}
              <a
                href="mailto:pankaj@beseam.com"
                className="font-semibold text-signal underline underline-offset-4"
              >
                pankaj@beseam.com
              </a>
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <BookReviewCta
              variant="primary"
              location="about_footer"
              className="bg-white text-ink-deep hover:bg-signal hover:text-white"
            />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
