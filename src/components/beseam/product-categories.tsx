import type { ReactNode } from "react";

import Link from "next/link";

import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/beseam/reveal";
import { getDictionary, type Dictionary } from "@/i18n";
import { localizedPath, type Locale } from "@/i18n/locale-rules.mjs";

type CategoryKey = keyof Dictionary["sections"]["categories"]["items"];

/**
 * One card per product vertical: a simple flat illustration on a soft tile,
 * then the category name and one sentence on what Beseam optimises for it.
 *
 * The illustrations are inline SVG placeholders rather than photos, so they
 * stay sharp and load with the page. They are decorative (the title next to
 * each one says the same thing), so they are hidden from screen readers.
 */
const CATEGORIES: readonly {
  key: CategoryKey;
  tile: string;
  art: ReactNode;
  /** The matching industry page (in the reader's language). */
  href: string;
}[] = [
  {
    key: "footwear",
    tile: "#ffe680",
    art: <SneakerArt />,
    href: "/solutions/footwear",
  },
  {
    key: "apparel",
    tile: "#e3d3ff",
    art: <ShirtArt />,
    href: "/solutions/fashion-apparel",
  },
  {
    key: "beauty",
    tile: "#ffd3e2",
    art: <BeautyArt />,
    href: "/solutions/beauty-cosmetics",
  },
  {
    key: "electronics",
    tile: "#c6efdc",
    art: <HeadphonesArt />,
    href: "/solutions/consumer-electronics",
  },
];

export default function ProductCategories({
  locale = "en",
}: {
  locale?: Locale;
}) {
  const t = getDictionary(locale).sections.categories;

  return (
    <section id="product-types" className="scroll-mt-24 bg-[#fff9e8]">
      <div className="mx-auto max-w-[76rem] px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
        <Reveal>
          <h2 className="mx-auto max-w-[22ch] text-balance text-center font-display text-[clamp(2.25rem,3.6vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink-deep">
            {t.heading}
          </h2>
          <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
            {CATEGORIES.map(({ key, tile, art, href }) => (
              <article key={key} className="flex flex-col">
                <div
                  aria-hidden="true"
                  className="flex aspect-[4/5] items-center justify-center overflow-hidden rounded-media"
                  style={{ background: tile }}
                >
                  {art}
                </div>
                <h3 className="mt-5 text-[19px] font-semibold tracking-[-0.01em] text-ink-deep">
                  {t.items[key].title}
                </h3>
                <p className="mt-2 flex-1 text-[15px] leading-[1.6] text-black/64">
                  {t.items[key].body}
                </p>
                {/* A text link rather than a button, so four of them in a
                    row stay quiet. */}
                <Link
                  href={localizedPath(href, locale)}
                  className="group mt-4 inline-flex items-center gap-1.5 self-start text-[15px] font-semibold text-ink-deep underline-offset-4 hover:underline"
                >
                  {t.learnMore}
                  <span className="sr-only">: {t.items[key].title}</span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 text-black/50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink-deep"
                  />
                </Link>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const INK = "#2b2f3a";
const ACCENT = "#ff5f8f";

function Art({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 14 200 250" className="h-full w-full">
      <ellipse cx="100" cy="196" rx="62" ry="7" fill="#000" opacity="0.08" />
      {children}
    </svg>
  );
}

function SneakerArt() {
  return (
    <Art>
      {/* sole */}
      <path
        d="M34 170 H160 a12 12 0 0 1 12 12 v2 a8 8 0 0 1 -8 8 H38 a10 10 0 0 1 -10 -10 v-4 a8 8 0 0 1 6 -8 Z"
        fill="#ffffff"
      />
      {/* upper */}
      <path
        d="M36 171 C34 150 40 130 58 122 L88 112 C97 109 104 114 110 122 L126 144 C142 148 162 152 170 162 C174 167 172 171 166 171 Z"
        fill={INK}
      />
      {/* heel tab and accent stripe */}
      <path d="M36 150 C36 134 42 126 50 124 L52 150 Z" fill={ACCENT} />
      <path
        d="M70 160 C92 150 118 150 146 158"
        stroke={ACCENT}
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      {/* laces */}
      {[0, 1, 2].map((i) => (
        <line
          key={i}
          x1={92 + i * 9}
          y1={120 + i * 8}
          x2={104 + i * 9}
          y2={114 + i * 8}
          stroke="#ffffff"
          strokeWidth="3"
          strokeLinecap="round"
        />
      ))}
    </Art>
  );
}

function ShirtArt() {
  return (
    <Art>
      {/* hanger */}
      <path
        d="M100 70 a9 9 0 1 1 9 -9"
        stroke="#6b5a50"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M100 70 L58 92 H142 Z"
        stroke="#6b5a50"
        strokeWidth="4"
        strokeLinejoin="round"
        fill="none"
      />
      {/* shirt */}
      <path
        d="M62 92 L86 84 Q100 96 114 84 L138 92 L160 122 L140 134 L134 124 V188 H66 V124 L60 134 L40 122 Z"
        fill="#fffaf6"
      />
      <path d="M86 84 Q100 104 114 84 Q100 94 86 84 Z" fill={ACCENT} />
      <rect
        x="112"
        y="136"
        width="14"
        height="10"
        rx="2"
        fill={ACCENT}
        opacity="0.8"
      />
    </Art>
  );
}

function BeautyArt() {
  return (
    <Art>
      {/* lipstick */}
      <path d="M60 128 L60 110 Q60 96 76 92 L82 92 L82 128 Z" fill={ACCENT} />
      <rect x="56" y="126" width="30" height="20" rx="2" fill="#c9a46a" />
      <rect x="54" y="144" width="34" height="48" rx="3" fill={INK} />
      {/* serum bottle */}
      <rect x="120" y="76" width="22" height="26" rx="3" fill={INK} />
      <rect x="112" y="100" width="38" height="92" rx="10" fill="#fffaf6" />
      <rect x="118" y="132" width="26" height="30" rx="3" fill="#ffd3e2" />
      <line
        x1="123"
        y1="142"
        x2="139"
        y2="142"
        stroke={ACCENT}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="123"
        y1="151"
        x2="134"
        y2="151"
        stroke={INK}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.4"
      />
    </Art>
  );
}

function HeadphonesArt() {
  return (
    <Art>
      {/* band */}
      <path
        d="M54 146 V128 a46 46 0 0 1 92 0 V146"
        stroke={INK}
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
      />
      {/* ear cups */}
      <rect x="40" y="134" width="30" height="54" rx="12" fill={INK} />
      <rect x="130" y="134" width="30" height="54" rx="12" fill={INK} />
      <rect x="62" y="142" width="10" height="38" rx="5" fill="#fffaf6" />
      <rect x="128" y="142" width="10" height="38" rx="5" fill="#fffaf6" />
      <circle cx="55" cy="161" r="6" fill={ACCENT} />
      <circle cx="145" cy="161" r="6" fill={ACCENT} />
    </Art>
  );
}
