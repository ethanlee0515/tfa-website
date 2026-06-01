#!/usr/bin/env node
/**
 * Seed Site & About content + editor roster into Sanity.
 * Run: npm run seed:site
 */
import fs from "fs";
import path from "path";
import { createClient } from "@sanity/client";

const ROOT = process.cwd();

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

if (!projectId || !token) {
  console.error("Needs NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN in .env.local");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-01-01",
  token,
  useCdn: false,
});

function block(text, key) {
  return {
    _type: "block",
    _key: key,
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: `${key}-s`, text, marks: [] }],
  };
}

const siteSettings = {
  _id: "siteSettings",
  _type: "siteSettings",
  currentIssueLabel: "Spring Issue 2026",
  homepageNote: {
    eyebrow: "From the editors",
    title: "Why this issue matters",
    body: [
      block(
        "As Lawrentians analyze our world in a polarized political environment, this issue highlights diverse voices that illuminate the tensions of our time—and the ideas that might address them.",
        "hn1",
      ),
    ],
    closing: "Be empathetic, and love all.",
    linkText: "Meet the board →",
  },
  aboutMission: {
    eyebrow: "About the magazine",
    headline: "Student analysis on politics, economics, and the world we inherit.",
    body: [
      block(
        "The First Amendment is Lawrenceville's student-led political magazine. Each issue brings together reporting and argument across domestic policy, international affairs, economics, and features—written by Lawrentians for their peers.",
        "am1",
      ),
    ],
  },
  aboutLetter: {
    eyebrow: "From the editors",
    title: "A few words from the spring issue board",
    body: [
      block(
        "As we mark another year of publication, Lawrentians have lived through the unthinkable—government shutdowns, trade wars, escalating international conflicts, and some of the largest protests in American history. Tensions continue to rise on multiple fronts as students, families, and institutions navigate a polarized political environment.",
        "al1",
      ),
      block(
        "As Lawrentians bravely analyze our world's issues, each issue of The First Amendment highlights diverse voices that illuminate the tensions of our time and the ideas that might address them. We remain committed to freedom of expression and to the belief that all voices have a role in shaping our democracy.",
        "al2",
      ),
    ],
    signoff: "— Ethan Lee '27 & Jamie Ho '27, Editors-in-Chief",
  },
  aboutSidebar: {
    publication: "The Lawrenceville School",
    forWriters:
      "Interested in contributing? Reach out to any section editor or Editor-in-Chief through Lawrenceville email.",
  },
  aboutLeadershipIntro:
    "The board sets editorial standards, develops each issue, and works with writers from draft to publication.",
  aboutBoardIntro:
    "Section editors, senior columnists, associates, and graphics staff who bring each issue to print and to the web.",
};

const leadership = [
  { name: "Ethan Lee", role: "Editor-in-Chief", classYear: "27", photoUrl: "/editors/eic-duo.png", sortOrder: 1 },
  { name: "Jamie Ho", role: "Editor-in-Chief", classYear: "27", photoUrl: "/editors/eic-duo.png", sortOrder: 2 },
  { name: "Katherine Qiu", role: "Executive Editor", classYear: "27", photoUrl: "/editors/katherine-qiu.png", sortOrder: 3 },
  { name: "Darshan Chidambaram", role: "Executive Editor", classYear: "28", photoUrl: "/editors/darshan-chidambaram.png", sortOrder: 4 },
];

const board = [
  { name: "Rebecca Chen", role: "Features", classYear: "27", boardSection: "Section Editors", sortOrder: 1 },
  { name: "Noah Strauss", role: "Domestic", classYear: "28", boardSection: "Section Editors", sortOrder: 2 },
  { name: "Celestine Sutter", role: "Domestic", classYear: "27", boardSection: "Section Editors", sortOrder: 3 },
  { name: "Yvonne Chen", role: "International", classYear: "28", boardSection: "Section Editors", sortOrder: 4 },
  { name: "Angela Lo", role: "International", classYear: "27", boardSection: "Section Editors", sortOrder: 5 },
  { name: "Karina Stakh", role: "Economics", classYear: "27", boardSection: "Section Editors", sortOrder: 6 },
  { name: "Jillian Upton", role: "Senior Columnist", classYear: "27", boardSection: "Senior Columnists", sortOrder: 1 },
  { name: "Madisen Kim", role: "Senior Columnist", classYear: "27", boardSection: "Senior Columnists", sortOrder: 2 },
  { name: "Aiden Shou", role: "Associate", classYear: "28", boardSection: "Associates", sortOrder: 1 },
  { name: "Dhruv Soni", role: "Associate", classYear: "28", boardSection: "Associates", sortOrder: 2 },
  { name: "Sawyer Nordberg", role: "Associate", classYear: "29", boardSection: "Associates", sortOrder: 3 },
  { name: "Teri Kim", role: "Graphics Editor", classYear: "27", boardSection: "Graphics", sortOrder: 1 },
  { name: "Jennifer Kim", role: "Graphics Associate", classYear: "28", boardSection: "Graphics", sortOrder: 2 },
  { name: "Bella Wu", role: "Graphics Associate", classYear: "28", boardSection: "Graphics", sortOrder: 3 },
  { name: "Kate Wei", role: "Graphics Associate", classYear: "28", boardSection: "Graphics", sortOrder: 4 },
];

function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

async function main() {
  await client.createOrReplace(siteSettings);
  console.log("✓ Site & About page");

  const stale = await client.fetch(`*[_type == "editor"]._id`);
  for (const id of stale) {
    await client.delete(id);
  }
  if (stale.length) console.log(`✓ Removed ${stale.length} old editor record(s)`);

  for (const person of leadership) {
    const slug = slugify(person.name);
    await client.createOrReplace({
      _id: `editor-${slug}`,
      _type: "editor",
      profile: "leadership",
      ...person,
    });
    console.log("✓ leadership:", person.name);
  }

  for (const person of board) {
    const slug = slugify(`${person.name}-${person.boardSection}`);
    await client.createOrReplace({
      _id: `editor-board-${slug}`,
      _type: "editor",
      profile: "board",
      ...person,
    });
    console.log("✓ board:", person.name);
  }

  console.log("\nOpen /studio → Site & About page to edit copy.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
