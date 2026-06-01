import type { Article } from "@/lib/types";
import { serverClient } from "./client";
import {
  allArticlesQuery,
  articleBySlugQuery,
  articlesBySectionQuery,
  featuredArticleQuery,
} from "./queries";

const fetchOptions = { next: { tags: ["articles"] as string[] } };

export async function fetchAllArticles(): Promise<Article[]> {
  try {
    return await serverClient.fetch<Article[]>(allArticlesQuery, {}, fetchOptions);
  } catch {
    return [];
  }
}

export async function fetchArticleBySlug(slug: string): Promise<Article | null> {
  try {
    return await serverClient.fetch<Article | null>(
      articleBySlugQuery,
      { slug },
      fetchOptions,
    );
  } catch {
    return null;
  }
}

export async function fetchArticlesBySection(
  section: string,
): Promise<Article[]> {
  try {
    return await serverClient.fetch<Article[]>(
      articlesBySectionQuery,
      { section },
      fetchOptions,
    );
  } catch {
    return [];
  }
}

export async function fetchFeaturedArticle(): Promise<Article | null> {
  try {
    return await serverClient.fetch<Article | null>(
      featuredArticleQuery,
      {},
      fetchOptions,
    );
  } catch {
    return null;
  }
}
