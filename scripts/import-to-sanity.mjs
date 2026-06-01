#!/usr/bin/env node
/**
 * Import content/articles/*.md into Sanity (authors + articles).
 *
 * Requires SANITY_API_WRITE_TOKEN in .env.local (Sanity → API → Tokens → Editor).
 *
 * Run: npm run import:sanity
 */
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { createClient } from "@sanity/client";

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, "content", "articles");
const GRAPHICS_DIR = path.join(ROOT, "public", "graphics");

function loadEnvLocal() {
  const envPath = path.join(ROOT, ".env.local");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq <= 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = val;
  }
}

loadEnvLocal();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local");
  process.exit(1);
}
if (!token) {
  console.error(`
Missing SANITY_API_WRITE_TOKEN in .env.local

1. Go to https://sanity.io/manage → your project → API → Tokens
2. Add API token → Permissions: Editor (or Admin)
3. Add to .env.local:
   SANITY_API_WRITE_TOKEN=your_token_here
4. Run again: npm run import:sanity
`);
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-01-01",
  token,
  useCdn: false,
});

function key() {
  return Math.random().toString(36).slice(2, 11);
}

function authorSlug(name) {
  return name
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function parseBody(markdown) {
  const blocks = [];
  for (const part of markdown.split(/\n\n+/)) {
    const trimmed = part.trim();
    if (!trimmed) continue;

    if (trimmed.startsWith("> ")) {
      const text = trimmed
        .split("\n")
        .map((l) => l.replace(/^>\s?/, ""))
        .join(" ")
        .trim();
      blocks.push({ _type: "pullQuote", _key: key(), text });
      continue;
    }

    if (trimmed.startsWith("## ")) {
      blocks.push({
        _type: "block",
        _key: key(),
        style: "h2",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: key(),
            text: trimmed.replace(/^##\s+/, ""),
            marks: [],
          },
        ],
      });
      continue;
    }

    blocks.push({
      _type: "block",
      _key: key(),
      style: "normal",
      markDefs: [],
      children: [
        {
          _type: "span",
          _key: key(),
          text: trimmed.replace(/\n/g, " "),
          marks: [],
        },
      ],
    });
  }
  return blocks;
}

function parseAuthors(raw) {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((a) => {
      if (typeof a === "string") return { name: a };
      if (a && typeof a === "object" && a.name) {
        return { name: String(a.name), classYear: a.classYear ? String(a.classYear) : undefined };
      }
      return null;
    })
    .filter(Boolean);
}

async function ensureAuthor(author, cache) {
  const slug = authorSlug(author.name);
  if (cache.has(slug)) return cache.get(slug);

  const doc = {
    _id: `author-${slug}`,
    _type: "author",
    name: author.name,
    slug: { _type: "slug", current: slug },
    ...(author.classYear ? { classYear: author.classYear } : {}),
  };

  await client.createOrReplace(doc);
  const ref = { _type: "reference", _ref: doc._id, _key: key() };
  cache.set(slug, ref);
  return ref;
}

async function uploadGraphic(filename) {
  if (!filename) return undefined;
  const filePath = path.join(GRAPHICS_DIR, filename.replace(/^\//, ""));
  if (!fs.existsSync(filePath)) return undefined;

  const asset = await client.assets.upload("image", fs.createReadStream(filePath), {
    filename: path.basename(filePath),
  });

  return {
    _type: "image",
    asset: { _type: "reference", _ref: asset._id },
  };
}

async function main() {
  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter(
      (f) =>
        f.endsWith(".md") &&
        !f.startsWith("_") &&
        f.toLowerCase() !== "readme.md",
    );

  console.log(`Importing ${files.length} articles to Sanity (${projectId})…\n`);

  const authorCache = new Map();

  for (const file of files) {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
    const { data, content } = matter(raw);
    const slug = String(data.slug ?? file.replace(/\.md$/, ""));
    const authors = parseAuthors(data.authors);
    const authorRefs = [];

    for (const a of authors) {
      authorRefs.push(await ensureAuthor(a, authorCache));
    }

    let heroImage;
    if (data.graphic) {
      try {
        heroImage = await uploadGraphic(String(data.graphic));
      } catch (e) {
        console.warn(`  ⚠ graphic upload failed for ${slug}:`, e.message);
      }
    }

    const doc = {
      _id: `article-${slug}`,
      _type: "article",
      title: String(data.title ?? slug),
      slug: { _type: "slug", current: slug },
      deck: String(data.deck ?? ""),
      section: String(data.section ?? "features"),
      authors: authorRefs,
      body: parseBody(content),
      publishedAt: String(data.publishedAt ?? new Date().toISOString()),
      isFeatured: Boolean(data.isFeatured),
      status: "published",
      ...(heroImage ? { heroImage } : {}),
    };

    await client.createOrReplace(doc);
    console.log("✓", slug);
  }

  console.log(`\nDone. Open /studio — you should see ${files.length} articles.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
