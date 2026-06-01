import { getAllArticles } from "@/lib/content";
import { SECTION_LABELS, type Section } from "@/lib/types";

export async function GET() {
  const articles = await getAllArticles();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thefirstamendment.org";

  const items = articles
    .map((article) => {
      const url = `${siteUrl}/article/${article.slug}`;
      return `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description><![CDATA[${article.deck}]]></description>
      <category>${SECTION_LABELS[article.section as Section]}</category>
      <pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>The First Amendment</title>
    <link>${siteUrl}</link>
    <description>Student political magazine of The Lawrenceville School</description>
    <language>en-us</language>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
