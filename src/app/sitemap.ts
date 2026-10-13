import type { MetadataRoute } from "next";

import { CATEGORY_BENCHMARKS } from "@/data/category-benchmarks";
import { LOCALES, localizedPath } from "@/i18n/locale-rules.mjs";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { COMPARISONS } from "@/lib/comparisons";
import { PRICING_PUBLIC } from "@/lib/pricing";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://beseam.com";

  const routes = [
    { path: "/", changeFrequency: "weekly" as const, priority: 1 },
    {
      path: "/product/ai-visibility-tracking",
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      path: "/product/product-descriptions",
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      path: "/product/content-creation",
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      path: "/product/technical-performance",
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      path: "/solutions/footwear",
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      path: "/solutions/fashion-apparel",
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      path: "/solutions/beauty-cosmetics",
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      path: "/solutions/consumer-electronics",
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      path: "/solutions/shopify",
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    ...(PRICING_PUBLIC
      ? [
          {
            path: "/pricing",
            changeFrequency: "monthly" as const,
            priority: 0.8,
          },
        ]
      : []),
    { path: "/about", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/contact", changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "/bot", changeFrequency: "monthly" as const, priority: 0.5 },
    {
      path: "/scan",
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      path: "/privacy-policy",
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
    {
      path: "/terms-of-service",
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
    // Listed only once a real run is published: matches the noindex on the
    // page itself while the benchmark set is empty.
    ...(CATEGORY_BENCHMARKS.length > 0
      ? [
          {
            path: "/benchmarks",
            changeFrequency: "weekly" as const,
            priority: 0.88,
          },
        ]
      : []),
    { path: "/compare", changeFrequency: "monthly" as const, priority: 0.75 },
    { path: "/blog", changeFrequency: "weekly" as const, priority: 0.8 },
    ...BLOG_POSTS.map((post) => ({
      path: `/blog/${post.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      lastModified: new Date(post.updated),
    })),
    ...COMPARISONS.map((comparison) => ({
      path: `/compare/${comparison.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  const absolute = (path: string) => new URL(path, baseUrl).toString();

  // Every translated page is listed in all three languages, each entry
  // pointing at the others as hreflang alternates.
  const withLanguages = routes.flatMap((route) => {
    if (localizedPath(route.path, "de") === route.path) return [route];
    const languages = Object.fromEntries(
      LOCALES.map((locale) => [
        locale,
        absolute(localizedPath(route.path, locale)),
      ]),
    );
    return LOCALES.map((locale) => ({
      ...route,
      path: localizedPath(route.path, locale),
      alternates: { languages },
    }));
  });

  const uniqueRoutes = withLanguages.filter(
    (route, index) =>
      withLanguages.findIndex((candidate) => candidate.path === route.path) ===
      index,
  );

  return uniqueRoutes.map(({ path, ...route }) => ({
    url: absolute(path),
    ...route,
  }));
}
