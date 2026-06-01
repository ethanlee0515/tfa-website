/** TFA student graphics — mapped from Fall 2025 & Spring 2026 issues. */
export type ArticleImage = { src: string; alt: string; credit?: string };

const g = (file: string, alt: string): ArticleImage => ({
  src: `/graphics/${file}`,
  alt,
  credit: "TFA Graphics",
});

export const ARTICLE_IMAGES: Record<string, ArticleImage> = {
  "morocco-gen-z-protests": g(
    "morocco-gen-z.png",
    "Illustration of Morocco Gen Z protests",
  ),
  "shutdown-showdown": g(
    "shutdown.png",
    "Illustration of the U.S. Capitol closed during government shutdown",
  ),
  "market-correction-threat": g(
    "market-correction.png",
    "Illustration on sovereign credit and market risk",
  ),
  "higher-education-compact": g(
    "trump-climate.png",
    "Illustration on federal policy and higher education",
  ),
  "brown-bold-refusal": g(
    "indictments.png",
    "Illustration on federal investigations and institutional independence",
  ),
  "china-hanwha-sanctions": g(
    "china-belt-road.png",
    "Illustration on China and international economic pressure",
  ),
  "gerrymandering-do-all-votes-count": g(
    "gerrymandering.png",
    "Illustration of U.S. states and gerrymandering",
  ),
  "explaining-the-indictments": g(
    "indictments.png",
    "Illustration on high-profile federal indictments",
  ),
  "nepal-digital-blackout": g(
    "nepal-social-media.png",
    "Illustration on Nepal social media and Gen Z protests",
  ),
  "venezuela-oil-politics": g(
    "venezuela.png",
    "Illustration on U.S. and Venezuela flags with oil imagery",
  ),
  "sudan-silent-stalemate": g(
    "sudan-stalemate.png",
    "Illustration on Sudan and protest",
  ),
  "china-investment-africa": g(
    "china-belt-road.png",
    "Illustration on China's Belt and Road Initiative in Africa",
  ),
  "trump-administration-climate": g(
    "trump-climate.png",
    "Illustration on climate policy",
  ),
  "maxwell-dilemma": g(
    "epstein-network.png",
    "Illustration on the Maxwell case",
  ),
  "shutdown-negotiation-ends": g("shutdown.png", "Government shutdown illustration"),
  "shutdown-economics": g("market-correction.png", "Shutdown economics illustration"),
  "who-gets-to-be-a-refugee": g(
    "sudan-stalemate.png",
    "Refugee policy illustration",
  ),
  "kristi-noem-firings": g(
    "kristi-noem.png",
    "Illustration on political firings",
  ),
  "civics-isnt-extra-credit": g("nj-governor.png", "Civics education illustration"),
};

export function getArticleImage(slug: string): ArticleImage | undefined {
  return ARTICLE_IMAGES[slug];
}
