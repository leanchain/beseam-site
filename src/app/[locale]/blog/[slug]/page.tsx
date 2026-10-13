import type { Metadata } from "next";

import BlogPostPage from "@/components/beseam/blog-post-page";
import type { Locale } from "@/i18n/locale-rules.mjs";
import { BLOG_POSTS, getBlogPost } from "@/lib/blog-posts";
import { buildPublicMetadata, languageAlternates } from "@/lib/seo";

type Params = { params: Promise<{ locale: Locale; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getBlogPost(slug, locale);
  if (!post) return {};
  return buildPublicMetadata({
    title: post.metaTitle,
    description: post.metaDescription,
    path: `/${locale}/blog/${slug}`,
    image: post.image.og,
    imageAlt: post.image.alt,
    type: "article",
    modifiedTime: post.updated,
    section: "Blog",
    tags: [...post.keywords],
    languages: languageAlternates(`/blog/${slug}`),
  });
}

export default async function LocalizedBlogPostRoute({ params }: Params) {
  const { locale, slug } = await params;
  return <BlogPostPage slug={slug} locale={locale} />;
}
