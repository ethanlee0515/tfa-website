import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Article, ArticleBlock, Author, Section } from "./types";
import { SECTIONS } from "./types";

function asSection(value: unknown): Section {
  if (typeof value === "string" && SECTIONS.includes(value as Section)) {
    return value as Section;
  }
  return "features";
}
import { ARTICLE_IMAGES } from "./article-images";

const CONTENT_DIR = path.join(process.cwd(), "content", "articles");

function parseBody(markdown: string): ArticleBlock[] {
  const blocks: ArticleBlock[] = [];
  const parts = markdown.split(/\n\n+/);

  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;

    if (trimmed.startsWith("> ")) {
      const quoteLines = trimmed
        .split("\n")
        .map((l) => l.replace(/^>\s?/, ""))
        .join(" ")
        .trim();
      blocks.push({ _type: "pullQuote", text: quoteLines });
      continue;
    }

    if (trimmed.startsWith("## ")) {
      blocks.push({
        _type: "block",
        style: "h2",
        children: [{ text: trimmed.replace(/^##\s+/, "") }],
      });
      continue;
    }

    blocks.push({
      _type: "block",
      style: "normal",
      children: [{ text: trimmed.replace(/\n/g, " ") }],
    });
  }

  return blocks;
}

function parseAuthors(raw: unknown): Author[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((a) => {
      if (typeof a === "string") return { name: a };
      if (a && typeof a === "object" && "name" in a) {
        const o = a as { name: string; classYear?: string };
        return { name: o.name, classYear: o.classYear };
      }
      return null;
    })
    .filter((a): a is Author => Boolean(a));
}

/** Loads `content/articles/*.md` — overrides seed articles by slug when present. */
export function loadContentArticles(): Article[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter(
      (f) =>
        f.endsWith(".md") &&
        !f.startsWith("_") &&
        f.toLowerCase() !== "readme.md",
    );

  return files.map((file, index) => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
    const { data, content } = matter(raw);
    const slug = String(data.slug ?? file.replace(/\.md$/, ""));

    const graphicKey =
      typeof data.graphic === "string"
        ? data.graphic.replace(/\.png$/, "")
        : slug;
    const img =
      ARTICLE_IMAGES[slug] ??
      (typeof data.graphic === "string"
        ? {
            src: data.graphic.startsWith("/")
              ? data.graphic
              : `/graphics/${data.graphic}`,
            alt: String(data.title ?? slug),
            credit: "TFA Graphics",
          }
        : undefined);

    const graphicCredit =
      typeof data.graphicCredit === "string" ? data.graphicCredit : undefined;

    return {
      _id: `md-${slug}`,
      title: String(data.title ?? slug),
      slug,
      deck: String(data.deck ?? ""),
      section: asSection(data.section),
      authors: parseAuthors(data.authors),
      publishedAt: String(data.publishedAt ?? new Date().toISOString()),
      isFeatured: Boolean(data.isFeatured),
      body: parseBody(content),
      image: img?.src,
      imageAlt: img?.alt,
      imageCredit: graphicCredit ?? img?.credit,
    };
  });
}

export function mergeArticles(seed: Article[], fromMarkdown: Article[]): Article[] {
  if (!fromMarkdown.length) return seed;
  const bySlug = new Map<string, Article>();
  for (const a of seed) bySlug.set(a.slug, a);
  for (const a of fromMarkdown) bySlug.set(a.slug, a);
  return [...bySlug.values()].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}
