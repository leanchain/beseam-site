import type { Metadata } from "next";

export const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://beseam.com";

export const DEFAULT_SOCIAL_IMAGE = "/images/social/default-2026-10.png";
export const HOME_SOCIAL_IMAGE = "/images/social/home-2026-10-en.png";
/** The homepage sharing image in each language; dated so link previews refresh. */
export const homeSocialImage = (locale: "en" | "de" | "nl") =>
  `/images/social/home-2026-10-${locale}.png`;
export const COMPARE_SOCIAL_IMAGE = "/images/social/compare-2026-10.png";
export const FIELDBOOK_SOCIAL_IMAGE = "/images/social/fieldbook.png";

export function buildPublicMetadata({
  title,
  description,
  path,
  image = DEFAULT_SOCIAL_IMAGE,
  imageAlt = title,
  type = "website",
  noIndex = false,
  modifiedTime,
  section,
  tags,
  languages,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  noIndex?: boolean;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  languages?: Record<string, string>;
}): Metadata {
  const common = {
    title,
    description,
    url: path,
    siteName: "Beseam",
    images: [
      {
        url: image,
        width: 1200,
        height: 630,
        alt: imageAlt,
        type: "image/png",
      },
    ],
  };

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path, ...(languages ? { languages } : {}) },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
    openGraph:
      type === "article"
        ? {
            ...common,
            type: "article",
            ...(modifiedTime ? { modifiedTime } : {}),
            ...(section ? { section } : {}),
            ...(tags?.length ? { tags } : {}),
          }
        : { ...common, type: "website" },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

/**
 * hreflang alternates for a page that exists in every language, from its
 * English path: `{ en: "/x", de: "/de/x", nl: "/nl/x", "x-default": "/x" }`.
 */
export function languageAlternates(
  englishPath: string,
): Record<string, string> {
  const prefixed = (locale: string) =>
    englishPath === "/" ? `/${locale}` : `/${locale}${englishPath}`;
  return {
    en: englishPath,
    de: prefixed("de"),
    nl: prefixed("nl"),
    "x-default": englishPath,
  };
}
