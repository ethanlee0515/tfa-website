export const articleFields = `
  _id,
  title,
  "slug": slug.current,
  deck,
  section,
  publishedAt,
  isFeatured,
  authors[]->{ name, classYear },
  body,
  "image": heroImage.asset->url,
  "imageAlt": title
`;

export const allArticlesQuery = `*[_type == "article" && status == "published"] | order(publishedAt desc) {
  ${articleFields}
}`;

export const articleBySlugQuery = `*[_type == "article" && slug.current == $slug && status == "published"][0] {
  ${articleFields}
}`;

export const articlesBySectionQuery = `*[_type == "article" && section == $section && status == "published"] | order(publishedAt desc) {
  ${articleFields}
}`;

export const featuredArticleQuery = `*[_type == "article" && status == "published" && isFeatured == true] | order(publishedAt desc)[0] {
  ${articleFields}
}`;
