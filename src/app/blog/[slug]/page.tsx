import type { Metadata } from "next";

import BlogPostPage from "@/components/beseam/blog-post-page";
import { BLOG_POSTS, getBlogPost } from "@/lib/blog-posts";
import { buildPublicMetadata, languageAlternates } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return buildPublicMetadata({
    title: post.metaTitle,
    description: post.metaDescription,
    path: `/blog/${post.slug}`,
    image: post.image.og,
    imageAlt: post.image.alt,
    type: "article",
    modifiedTime: post.updated,
    section: "Blog",
    tags: [...post.keywords],
    languages: languageAlternates(`/blog/${post.slug}`),
  });
}

export default async function BlogPostRoute({ params }: Params) {
  const { slug } = await params;
  return <BlogPostPage slug={slug} />;
}
