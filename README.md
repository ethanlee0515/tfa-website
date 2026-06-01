# The First Amendment — Website

Student publication site for **The First Amendment** (TFA) at The Lawrenceville School.

## Stack

- **Next.js 15** (App Router) + TypeScript + Tailwind CSS
- **Sanity CMS** for editor publishing (optional until configured)
- Static seed articles and editor profiles ship out of the box

## Quick start

```bash
cd tfa-website
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Publishing & hosting

**Full guide:** [`docs/PUBLISHING.md`](docs/PUBLISHING.md) — Vercel deploy, Sanity CMS, inviting editors, webhooks.

**Editor UI:** [http://localhost:3000/studio](http://localhost:3000/studio) (after `.env.local` is configured)

## Import real article text

Placeholder seed copy is **not** final. Paste real stories in [`content/articles/`](content/articles/) — see [`content/articles/README.md`](content/articles/README.md).

## Project structure

- `src/app/` — pages (home, sections, articles, about)
- `src/lib/articles.ts` — demo articles until Sanity is live
- `src/lib/editors.ts` — current board roster
- `sanity/schemas/` — CMS content models
- `public/editors/` — board photos

## Brand assets

- **Logo:** `public/tfa-logo.png`
- **Issue covers:** `public/covers/` (Spring 2026, Fall 2025, Winter 2025)
- **Article graphics:** `public/graphics/` (student illustrations from print issues)

To swap the current issue, edit `src/lib/site.ts` (`CURRENT_ISSUE`).

## Design reference

Visual system based on TFA print issues: cover-forward hero, cream article pages, red accents, Montserrat + Source Serif, student graphics on every story card.
