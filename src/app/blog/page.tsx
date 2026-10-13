import type { Metadata } from "next";

import BlogIndexPage from "@/components/beseam/blog-index-page";
import { getPageCopy } from "@/i18n/pages";
import { buildPublicMetadata, languageAlternates } from "@/lib/seo";

const t = getPageCopy("en").blog;

export const metadata: Metadata = buildPublicMetadata({
  title: t.metaTitle,
  description: t.metaDescription,
  path: "/blog",
  languages: languageAlternates("/blog"),
});

export default function BlogRoute() {
  return <BlogIndexPage />;
}
