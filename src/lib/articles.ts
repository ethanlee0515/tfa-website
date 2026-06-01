import type { Article } from "./types";
import { loadContentArticles } from "./load-content-articles";

/** Published articles come from `content/articles/*.md` (or Sanity when configured). */
export const ARTICLES: Article[] = loadContentArticles().sort(
  (a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
);

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getArticlesBySection(section: string): Article[] {
  return ARTICLES.filter((a) => a.section === section).sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getFeaturedArticle(): Article {
  return getFeaturedArticles()[0] ?? ARTICLES[0];
}

/** Hero carousel — featured flag first, then recent stories with graphics. */
export function getFeaturedArticles(limit = 5): Article[] {
  const picked: Article[] = [];
  const seen = new Set<string>();

  const add = (article: Article | undefined) => {
    if (!article || seen.has(article.slug) || picked.length >= limit) return;
    seen.add(article.slug);
    picked.push(article);
  };

  for (const a of ARTICLES.filter((x) => x.isFeatured)) add(a);

  for (const a of ARTICLES) {
    if (a.image) add(a);
  }

  for (const a of ARTICLES) add(a);

  return picked;
}
