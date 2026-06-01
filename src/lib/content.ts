import type { Article } from "./types";
import {
  ARTICLES,
  getArticleBySlug,
  getArticlesBySection,
  getFeaturedArticle,
  getFeaturedArticles,
} from "./articles";
import { isSanityConfigured } from "@/sanity/lib/client";
import {
  fetchAllArticles,
  fetchArticleBySlug,
  fetchArticlesBySection,
  fetchFeaturedArticle,
} from "@/sanity/lib/fetch";
import { sanityIsActive } from "./sanity-active";

export async function getAllArticles(): Promise<Article[]> {
  if (isSanityConfigured()) {
    const remote = await fetchAllArticles();
    if (remote.length > 0) return remote;
  }
  return [...ARTICLES].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export async function getArticle(slug: string): Promise<Article | null> {
  if (isSanityConfigured()) {
    const remote = await fetchArticleBySlug(slug);
    if (remote) return remote;
    if (await sanityIsActive()) return null;
  }
  return getArticleBySlug(slug) ?? null;
}

export async function getSectionArticles(section: string): Promise<Article[]> {
  if (isSanityConfigured()) {
    if (await sanityIsActive()) {
      return fetchArticlesBySection(section);
    }
    const remote = await fetchArticlesBySection(section);
    if (remote.length > 0) return remote;
  }
  return getArticlesBySection(section);
}

export async function getFeatured(): Promise<Article> {
  if (isSanityConfigured()) {
    if (await sanityIsActive()) {
      const remote = await fetchFeaturedArticle();
      if (remote) return remote;
      const all = await fetchAllArticles();
      if (all[0]) return all[0];
    } else {
      const remote = await fetchFeaturedArticle();
      if (remote) return remote;
    }
  }
  return getFeaturedArticle();
}

export async function getFeaturedCarousel(limit = 5): Promise<Article[]> {
  if (isSanityConfigured()) {
    const remote = await fetchAllArticles();
    if (remote.length > 0) {
      const featured = remote.filter((a) => a.isFeatured);
      const withImages = remote.filter((a) => a.image);
      const picked: Article[] = [];
      const seen = new Set<string>();
      const add = (a: Article) => {
        if (seen.has(a.slug) || picked.length >= limit) return;
        seen.add(a.slug);
        picked.push(a);
      };
      featured.forEach(add);
      withImages.forEach(add);
      remote.forEach(add);
      return picked;
    }
  }
  return getFeaturedArticles(limit);
}
