#!/usr/bin/env node
/**
 * Import Articles folder docx/pdf into content/articles markdown.
 * Run: npm run import:articles
 */
import fs from "fs";
import path from "path";
import mammoth from "mammoth";
import { PDFParse } from "pdf-parse";

const ROOT = path.join(process.cwd(), "Articles");
const OUT = path.join(process.cwd(), "content", "articles");

/** Manual metadata — filenames → site fields */
const MANIFEST = [
  {
    file: "International/Angela Lo - Venezuela Article.docx",
    slug: "venezuela-oil-politics",
    title: "Sovereignty for Sale: Oil, Power, and the U.S. Seizure of Venezuela",
    section: "international",
    authors: [{ name: "Angela Lo", classYear: "27" }],
    publishedAt: "2026-04-01T12:00:00.000Z",
    graphic: "venezuela.png",
    issue: "spring-2026",
    isFeatured: true,
  },
  {
    file: "International/Tarini Jalagam - The Silent Stalemate_ Why the World Abandoned Sudan.docx",
    slug: "sudan-silent-stalemate",
    title: "The Silent Stalemate: Why the World Abandoned Sudan",
    section: "international",
    authors: [{ name: "Tarini Jalagam", classYear: "27" }],
    publishedAt: "2026-04-02T12:00:00.000Z",
    graphic: "sudan-stalemate.png",
    issue: "spring-2026",
  },
  {
    file: "International/Yvonne Chen - Chinese Investment into Africa.docx",
    slug: "china-investment-africa",
    title: "Chinese Investment into Africa",
    section: "international",
    authors: [{ name: "Yvonne Chen", classYear: "27" }],
    publishedAt: "2026-04-03T12:00:00.000Z",
    graphic: "china-belt-road.png",
    issue: "spring-2026",
  },
  {
    file: "Features/TFA -- Trump Administration and Climate_.docx",
    slug: "trump-administration-climate",
    title: "The Trump Administration's Stance on Climate Change",
    section: "features",
    authors: [{ name: "Katherine Qiu", classYear: "27" }],
    publishedAt: "2026-04-04T12:00:00.000Z",
    graphic: "trump-climate.png",
    graphicCredit: "Jennifer Kim '27",
    issue: "spring-2026",
  },
  {
    file: "Features/Rebecca Chen -- Silence and Clemency_ The Maxwell Dilemma (TFA Article).docx",
    slug: "maxwell-dilemma",
    title: "Silence and Clemency: The Maxwell Dilemma",
    section: "features",
    authors: [{ name: "Rebecca Chen", classYear: "27" }],
    publishedAt: "2026-04-05T12:00:00.000Z",
    graphic: "epstein-network.png",
    graphicCredit: "Jennifer Kim '27",
    issue: "spring-2026",
  },
  {
    file: "Features/Copy of Pam Bondi+Kristi Noem.docx",
    slug: "kristi-noem-firings",
    title: "The Abrupt Firing of Kristi Noem and Pam Bondi",
    section: "features",
    authors: [],
    autoAuthor: true,
    publishedAt: "2026-04-06T12:00:00.000Z",
    graphic: "kristi-noem.png",
    graphicCredit: "Jennifer Kim '27",
    issue: "spring-2026",
  },
  {
    file: "Economics Final/Karina Stakh 2 Pager .pdf",
    slug: "market-correction-threat",
    title: "The Looming Threat of a Market Correction",
    section: "economics",
    authors: [{ name: "Karina Stakh", classYear: "27" }],
    publishedAt: "2026-01-10T12:00:00.000Z",
    graphic: "market-correction.png",
    issue: "winter-2025",
    isFeatured: false,
  },
];

/** Winter PDF — bodyStart must match article prose, not TOC blurbs */
const WINTER_ARTICLES = [
  {
    slug: "morocco-gen-z-protests",
    title: "Morocco's Gen-Z Protests and a Global Reckoning",
    section: "international",
    authors: [{ name: "Connor Hwang", classYear: "26" }],
    publishedAt: "2026-01-15T12:00:00.000Z",
    graphic: "morocco-gen-z.png",
    bodyStart: "Morocco\u2019s Gen-Z Protests and a",
  },
  {
    slug: "shutdown-showdown",
    title: "Shutdown Showdown",
    section: "domestic",
    authors: [{ name: "Mira Trappe", classYear: "26" }],
    publishedAt: "2026-01-12T12:00:00.000Z",
    graphic: "shutdown.png",
    bodyStart: "Shutdown Showdown\nOn Wednesday",
  },
  {
    slug: "shutdown-negotiation-ends",
    title: "Longest Government Shutdown Negotiations Ends",
    section: "domestic",
    authors: [{ name: "Ethan Wei", classYear: "26" }],
    publishedAt: "2026-01-11T12:00:00.000Z",
    graphic: "shutdown.png",
    bodyStart: "As of November 13, 2025, the lon-",
  },
  {
    slug: "china-hanwha-sanctions",
    title: "Breaking Down China's Sanctions on Hanwha",
    section: "international",
    authors: [{ name: "Andrew Zhang", classYear: "26" }],
    publishedAt: "2026-01-03T12:00:00.000Z",
    graphic: "china-belt-road.png",
    bodyStart: "The Geopolitics Behind\nChina\u2019s Sanctions on\nHanwha",
  },
  {
    slug: "brown-bold-refusal",
    title: "Brown University's Bold Refusal",
    section: "domestic",
    authors: [{ name: "Kelly Zhu", classYear: "27" }],
    publishedAt: "2026-01-05T12:00:00.000Z",
    graphic: "indictments.png",
    bodyStart: "Brown University announced on",
  },
  {
    slug: "shutdown-economics",
    title: "The Cost of Inaction: The Economic Toll of the Government Shutdown",
    section: "economics",
    authors: [{ name: "Dhruv Soni", classYear: "28" }],
    publishedAt: "2026-01-04T12:00:00.000Z",
    graphic: "market-correction.png",
    bodyStart: "Weeks have gone by since the start",
  },
  {
    slug: "higher-education-compact",
    title: "Reflections on the White House's Higher Education 'Compact'",
    section: "features",
    authors: [{ name: "Cody Suh", classYear: "27" }],
    publishedAt: "2026-01-08T12:00:00.000Z",
    graphic: "trump-climate.png",
    bodyStart: "On October 1, 2025, the Trump Ad-",
  },
  {
    slug: "who-gets-to-be-a-refugee",
    title: "Who Gets to Be a Real Refugee in Korea and Germany?",
    section: "international",
    authors: [{ name: "Ethan Lee", classYear: "27" }],
    publishedAt: "2025-12-18T12:00:00.000Z",
    graphic: "sudan-stalemate.png",
    bodyStart: "Across the world, refugee protec-",
  },
  {
    slug: "gerrymandering-do-all-votes-count",
    title: "Gerrymandering—Do All Votes Count?",
    section: "domestic",
    authors: [{ name: "Noah Strauss", classYear: "28" }],
    publishedAt: "2025-12-15T12:00:00.000Z",
    graphic: "gerrymandering.png",
    bodyStart: "Gerrymandering: Do\nAll Votes Count?",
  },
  {
    slug: "explaining-the-indictments",
    title: "Explaining the Indictments",
    section: "features",
    authors: [{ name: "Celestine Sutter", classYear: "27" }],
    publishedAt: "2025-12-28T12:00:00.000Z",
    graphic: "indictments.png",
    bodyStart: "Explaining the In-\ndictments\nJames B. Comey",
  },
  {
    slug: "nepal-digital-blackout",
    title: "Nepal's Digital Blackout & Gen-Z Protests",
    section: "international",
    authors: [{ name: "Angela Lo", classYear: "27" }],
    publishedAt: "2025-12-20T12:00:00.000Z",
    graphic: "nepal-social-media.png",
    bodyStart: "Nepal\u2019s Social Media\nBlackout and Gen Z Revolt",
  },
  {
    slug: "civics-isnt-extra-credit",
    title: "Civics Isn't Extra Credit",
    section: "features",
    authors: [
      { name: "Roshan Hoban", classYear: "26" },
      { name: "Connor Hwang", classYear: "26" },
      { name: "Miranda De Olden", classYear: "26" },
    ],
    publishedAt: "2025-12-10T12:00:00.000Z",
    graphic: "nj-governor.png",
    bodyStart: "Civic education has been a corner-",
  },
];

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function cleanBody(text) {
  let body = text
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  const bibMarkers = [
    "\nBibliography\n",
    "\nBibliography\r",
    "\nbib\n",
    "\nSources\n",
    "\nWorks Cited\n",
    "\nEndnotes\n",
  ];
  for (const m of bibMarkers) {
    const i = body.indexOf(m);
    if (i > 0) body = body.slice(0, i).trim();
  }

  return body;
}

function extractDeck(paragraphs, fallback = "") {
  const first = paragraphs[0]?.replace(/\s+/g, " ").trim() ?? "";
  if (first.length > 220) return first.slice(0, 217) + "…";
  return first || fallback;
}

function extractGraphicCredit(text) {
  const m = text.match(/Graphic by:\s*([^\n]+)/i);
  if (!m) return { credit: null, text };
  const credit = m[1].replace(/\s+/g, " ").trim();
  const cleaned = text.replace(/Graphic by:[^\n]*/gi, "").trim();
  return { credit, text: cleaned };
}

function detectAuthorFromText(text) {
  const patterns = [
    /^([A-Z][a-z]+(?: [A-Z]\. )?[A-Z][a-z]+)\s*['\u2019](\d{2})['\u2019]?\s*$/m,
    /^([A-Z][a-z]+ [A-Z][a-z]+)\s*['\u2019](\d{2})['\u2019]?\s*\n/m,
  ];
  for (const re of patterns) {
    const m = text.match(re);
    if (m && !/^(Graphic|TFA|The First)/i.test(m[1])) {
      return [{ name: m[1].trim(), classYear: m[2] }];
    }
  }
  return [];
}

function stripAuthorLine(content, authors) {
  let text = content;
  for (const a of authors) {
    const patterns = [
      new RegExp(
        `^${escapeRegex(a.name)}\\s*['\u2019]?${a.classYear ?? "\\d{2}"}?\\s*\\n`,
        "im",
      ),
      new RegExp(`^${escapeRegex(a.name)}\\s*\\n`, "im"),
    ];
    for (const re of patterns) {
      text = text.replace(re, "");
    }
  }
  return text.trim();
}

function stripLeadingTitle(content, title) {
  if (!title) return content;
  const lines = content.split("\n");
  let i = 0;
  const titleNorm = title.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  while (i < lines.length && i < 6) {
    const line = lines[i].replace(/\s+/g, " ").trim();
    if (!line) {
      i++;
      continue;
    }
    const lineNorm = line.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
    if (
      lineNorm.includes(titleNorm.slice(0, 24)) ||
      titleNorm.includes(lineNorm.slice(0, 24))
    ) {
      i++;
      continue;
    }
    if (/^tab \d+$/i.test(line) || line === "TFA") {
      i++;
      continue;
    }
    break;
  }
  return lines.slice(i).join("\n").trim();
}

function docxToParagraphs(raw) {
  const cleaned = cleanBody(raw);
  return cleaned
    .split(/\n\n+/)
    .map((p) =>
      p
        .replace(/^\t+/gm, "")
        .replace(/\n/g, " ")
        .replace(/\s+/g, " ")
        .trim(),
    )
    .filter((p) => p.length > 25)
    .filter((p) => !/^Graphic by:/i.test(p))
    .filter((p) => !/^(Tab \d+|TFA)$/i.test(p));
}

function pdfToParagraphs(raw) {
  const { credit, text } = extractGraphicCredit(raw);

  let t = text
    .replace(/\r/g, "")
    .replace(/\n-- \d+ of \d+ --\n/g, "\n\n")
    .replace(/\nJan\.\s*2026[\s\S]*?ISSUE N\. V[\s\S]*?\n\d+\s*\n/g, "\n\n")
    .replace(/\n(AWickham|E Wickham|\d+)\n/g, "\n")
    .replace(/\n(SOURCE|Source):[^\n]+\n/g, "\n")
    .replace(/\n(CONTENTS|Endnotes)[^\n]*\n/g, "\n\n");

  t = t.replace(/(\w)-\n(\w)/g, "$1$2");
  t = t.replace(/\t+/g, " ");
  t = t.replace(/\n(?=[a-z])/g, " ");
  t = t.replace(/\.\s*\n\s*(?=[A-Z"“])/g, ".\n\n");
  t = t.replace(/"\s*\n\s*(?=[A-Z])/g, "\"\n\n");
  t = t.replace(/\n{2,}/g, "\n\n");

  const paragraphs = t
    .split(/\n\n+/)
    .map((p) => p.replace(/\s+/g, " ").trim())
    .filter((p) => p.length > 40)
    .filter((p) => !/^Graphic by:/i.test(p))
    .filter(
      (p) =>
        !/^(DOMESTIC|INTERNATIONAL|FEATURES|ECONOMICS)$/i.test(p) &&
        !/^[A-Z][a-z]+ [A-Z][a-z]+ ['\u2019]?\d{2}['\u2019]?$/.test(p),
    );

  return { credit, paragraphs };
}

function stripTitleFromFirstParagraph(paragraphs, title) {
  if (!paragraphs.length || !title) return paragraphs;
  let first = paragraphs[0];
  const bodyStart = first.search(
    /\b(In|On|When|After|Across|As of|The|Weeks|Earlier|Yet|Even|While|Morocco witnessed|In September|In October|In April)\b/,
  );
  if (bodyStart > 25) {
    first = first.slice(bodyStart);
  }
  return [first, ...paragraphs.slice(1)];
}

function cleanParagraphText(text) {
  return text
    .replace(
      /\b[A-Z][a-z]+ [A-Z][a-z]+\s*['\u2018\u2019]\d{2}['\u2018\u2019]?\s*(?:DOMESTIC|INTERNATIONAL|FEATURES|ECONOMICS)\b/gi,
      "",
    )
    .replace(/\s+/g, " ")
    .replace(/\bnationwide\s+uprising\b/i, "nationwide uprising")
    .trim();
}

function hasUnclosedQuote(text) {
  const opens = (text.match(/[“"]/g) || []).length;
  return opens % 2 !== 0;
}

function mergeBrokenParagraphs(paragraphs) {
  const merged = [];
  for (const p of paragraphs) {
    const prev = merged[merged.length - 1];
    if (
      prev &&
      (hasUnclosedQuote(prev) ||
        (!/[.!?][”"\u201d]?$/.test(prev) && prev.length < 900))
    ) {
      merged[merged.length - 1] = `${prev} ${p}`;
    } else {
      merged.push(p);
    }
  }
  return merged;
}

function findPullQuotes(paragraph) {
  const quotes = [];
  const patterns = [
    /(?:As [A-Z][^,.\n]{2,55},?\s*)[“"]([^”"]{50,}?)[”"]/g,
    /organizers declared that\s*[“"]([^”"]{40,}?)[”"]/gi,
    /[“"](We are the youth, we are not parasites)[”"]/g,
  ];

  for (const re of patterns) {
    let m;
    while ((m = re.exec(paragraph)) !== null) {
      const text = m[1].replace(/\s+/g, " ").trim();
      if (text.length >= 40 && !quotes.some((q) => q.text === text)) {
        quotes.push({ text, fullMatch: m[0] });
      }
    }
  }

  return quotes.slice(0, 2);
}

function paragraphsToMarkdown(paragraphs, maxPullQuotes = 4) {
  const blocks = [];
  let pullCount = 0;

  for (const para of paragraphs) {
    if (pullCount < maxPullQuotes) {
      const pulls = findPullQuotes(para);
      if (pulls.length > 0) {
        let remaining = para;
        for (const q of pulls) {
          if (pullCount >= maxPullQuotes) break;
          const idx = remaining.indexOf(q.fullMatch);
          if (idx < 0) continue;
          const before = remaining.slice(0, idx).replace(/\s+/g, " ").trim();
          const after = remaining
            .slice(idx + q.fullMatch.length)
            .replace(/\s+/g, " ")
            .trim();
          if (before.length > 30) blocks.push(before);
          blocks.push(`> ${q.text}`);
          pullCount++;
          remaining = after;
        }
        if (remaining.length > 30) blocks.push(remaining);
        continue;
      }
    }
    blocks.push(para);
  }

  return blocks.join("\n\n");
}

async function readDocx(filePath) {
  const { value } = await mammoth.extractRawText({ path: filePath });
  return value;
}

async function readPdf(filePath) {
  const buf = fs.readFileSync(filePath);
  const parser = new PDFParse({ data: buf });
  const result = await parser.getText();
  await parser.destroy();
  return result.text;
}

function writeMarkdown(meta, body, { isPdf = false } = {}) {
  let content = cleanBody(body);
  let graphicCredit = meta.graphicCredit ?? null;

  if (isPdf) {
    const pdf = pdfToParagraphs(content);
    if (pdf.credit) graphicCredit = pdf.credit;
    content = pdf.paragraphs.join("\n\n");
  } else {
    content = stripLeadingTitle(content, meta.title);
  }

  let authors = [...(meta.authors ?? [])];
  if (meta.autoAuthor || !authors.length) {
    const detected = detectAuthorFromText(content);
    if (detected.length) authors = detected;
  }

  content = stripAuthorLine(content, authors);

  let paragraphs = isPdf
    ? content.split(/\n\n+/).filter(Boolean)
    : docxToParagraphs(content);

  paragraphs = paragraphs.filter(
    (p) =>
      !p.toLowerCase().includes("bibliography") &&
      !/^https?:\/\//.test(p) &&
      p.split(/\s+/).length > 8,
  );

  paragraphs = stripTitleFromFirstParagraph(paragraphs, meta.title);
  paragraphs = mergeBrokenParagraphs(paragraphs);
  paragraphs = paragraphs.map(cleanParagraphText).filter((p) => p.length > 40);

  const deck = meta.deck || extractDeck(paragraphs, meta.title);
  const markdownBody = paragraphsToMarkdown(paragraphs);

  const yaml = [
    "---",
    `title: ${JSON.stringify(meta.title)}`,
    `slug: ${meta.slug}`,
    `deck: ${JSON.stringify(deck)}`,
    `section: ${meta.section}`,
    authors.length
      ? "authors:\n" +
        authors
          .map(
            (a) =>
              `  - name: ${JSON.stringify(a.name)}${a.classYear ? `\n    classYear: ${JSON.stringify(a.classYear)}` : ""}`,
          )
          .join("\n")
      : "authors: []",
    `publishedAt: ${meta.publishedAt}`,
    meta.issue ? `issue: ${meta.issue}` : null,
    meta.graphic ? `graphic: ${meta.graphic}` : null,
    graphicCredit ? `graphicCredit: ${JSON.stringify(graphicCredit)}` : null,
    meta.isFeatured ? `isFeatured: true` : null,
    "---",
    "",
    markdownBody,
    "",
  ]
    .filter(Boolean)
    .join("\n");

  fs.writeFileSync(path.join(OUT, `${meta.slug}.md`), yaml, "utf8");
  console.log("✓", meta.slug);
}

async function importManifest() {
  for (const entry of MANIFEST) {
    const filePath = path.join(ROOT, entry.file);
    if (!fs.existsSync(filePath)) {
      console.warn("✗ missing:", entry.file);
      continue;
    }
    const raw = entry.file.endsWith(".pdf")
      ? await readPdf(filePath)
      : await readDocx(filePath);
    writeMarkdown(entry, raw, { isPdf: entry.file.endsWith(".pdf") });
  }
}

async function importWinterPdf() {
  const pdfPath = path.join(ROOT, "Winter TFA #4 (1).pdf");
  if (!fs.existsSync(pdfPath)) {
    console.warn("Winter PDF not found");
    return;
  }

  const fullText = await readPdf(pdfPath);
  const located = [];

  for (const art of WINTER_ARTICLES) {
    const idx = fullText.indexOf(art.bodyStart);
    if (idx < 0) {
      console.warn("✗ winter body not found:", art.slug, art.bodyStart.slice(0, 40));
      continue;
    }
    located.push({ art, idx });
  }

  located.sort((a, b) => a.idx - b.idx);

  for (let i = 0; i < located.length; i++) {
    const { art, idx } = located[i];
    const endIdx = located[i + 1]?.idx ?? fullText.length;
    const slice = fullText.slice(idx, endIdx);
    writeMarkdown({ ...art, issue: "winter-2025" }, slice, { isPdf: true });
  }
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  console.log("Importing Winter TFA #4 PDF…");
  await importWinterPdf();
  console.log("\nImporting docx/pdf from Articles/…");
  await importManifest();
  console.log("\nDone. Restart: npm run dev");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
