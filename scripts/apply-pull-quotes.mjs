#!/usr/bin/env node
/**
 * Insert pull quotes into content/articles/*.md from content/pull-quotes.json.
 * Run: npm run apply:pull-quotes
 */
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, "content", "articles");
const CONFIG_PATH = path.join(ROOT, "content", "pull-quotes.json");

function normalize(text) {
  return text.replace(/\s+/g, " ").trim();
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function cleanupArtifacts(text) {
  return text
    .replace(/["""]\s*["""]/g, " ")
    .replace(
      /The Washington Monument \(Diliff\).*?Jan\. 2026\s*/gi,
      " ",
    )
    .replace(/Department of Homeland Security \(DHSgov\)\s*/gi, " ")
    .replace(/U\.S\. Capitol Building \(U\.S\. House of Representatives\)\s*/gi, " ")
    .replace(/Amanda Huo ['']29\s*/gi, " ")
    .replace(/Graphic by:.*?(?=\s[A-Z])/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function stripInlineQuote(text, quoteText) {
  const core = escapeRegExp(quoteText).replace(/\s+/g, "\\s+");
  let result = text;
  result = result.replace(new RegExp(`["""]\\s*${core}\\s*["""]`, "gi"), " ");
  result = result.replace(new RegExp(`>\\s*${core}`, "gi"), " ");
  result = result.replace(new RegExp(core, "i"), " ");
  return cleanupArtifacts(result);
}

function truncateBody(body, marker) {
  if (!marker) return body;
  const idx = body.indexOf(marker);
  if (idx <= 0) return body;
  return body.slice(0, idx).trim();
}

function removeBlockquotes(body) {
  return body
    .split(/\n\n+/)
    .filter((block) => !block.trim().startsWith("> "))
    .join("\n\n");
}

function splitParagraphs(body) {
  return body
    .split(/\n\n+/)
    .map((p) => cleanupArtifacts(normalize(p)))
    .filter((p) => p.length > 40);
}

function findAnchorEnd(paragraph, anchor) {
  const lower = paragraph.toLowerCase();
  const idx = lower.indexOf(anchor.toLowerCase());
  if (idx < 0) return -1;

  const tail = paragraph.slice(idx);
  const match = tail.match(/[.!?]["'\u201d]?(?:\s|$)/);
  if (match?.index != null) {
    return idx + match.index + match[0].trimEnd().length;
  }
  return idx + anchor.length;
}

function insertQuoteAfterAnchor(paragraphs, anchor, quoteText) {
  for (let i = 0; i < paragraphs.length; i++) {
    const end = findAnchorEnd(paragraphs[i], anchor);
    if (end < 0) continue;

    const before = paragraphs[i].slice(0, end).trim();
    const after = paragraphs[i].slice(end).trim();
    const next = [];
    if (before.length > 40) next.push(before);
    next.push(`> ${quoteText}`);
    if (after.length > 40) next.push(after);
    paragraphs.splice(i, 1, ...next);
    return true;
  }
  return false;
}

function applyQuotes(body, config) {
  const quotes = config.quotes ?? [];
  if (!quotes.length) return body;

  let cleaned = truncateBody(body, config.truncateBefore);
  cleaned = removeBlockquotes(cleaned);

  for (const q of quotes) {
    cleaned = stripInlineQuote(cleaned, q.text);
  }

  let paragraphs = splitParagraphs(cleaned);

  for (const q of quotes) {
    const anchor = q.afterContains ?? "";
    const inserted = anchor
      ? insertQuoteAfterAnchor(paragraphs, anchor, q.text)
      : false;
    if (!inserted) {
      paragraphs.push(`> ${q.text}`);
    }
  }

  return paragraphs.join("\n\n");
}

function main() {
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));
  let updated = 0;

  for (const [slug, articleConfig] of Object.entries(config)) {
    const filePath = path.join(CONTENT_DIR, `${slug}.md`);
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠ missing ${slug}.md`);
      continue;
    }

    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);
    const newBody = applyQuotes(content, articleConfig);

    const out = matter.stringify(newBody, data);
    fs.writeFileSync(filePath, out);
    console.log(`✓ ${slug}`);
    updated++;
  }

  console.log(`\nUpdated ${updated} article(s).`);
}

main();
