import { cache } from "react";
import { isSanityConfigured } from "@/sanity/lib/client";
import { fetchAllArticles } from "@/sanity/lib/fetch";

/** Sanity is the live CMS once it has at least one published article. */
export const sanityIsActive = cache(async (): Promise<boolean> => {
  if (!isSanityConfigured()) return false;
  const articles = await fetchAllArticles();
  return articles.length > 0;
});
