# Importing real TFA articles

Articles in this folder **replace** the placeholder seed text on the site (matched by `slug`).

## What to send

For each story from your PDFs / Google Docs:

1. Copy `_template.md` to `article-slug.md`
2. Fill in **exact** title, authors, class years, section, and date
3. Paste the **full article text** below the frontmatter (paragraphs separated by blank lines)
4. Set `graphic` to the matching file in `public/graphics/` if needed

## Pull quotes & subheads

Editors can highlight 1–2 sentences mid-article (like the print magazine):

```markdown
> When SNAP benefits ended, many states declared state of emergencies…
```

In **Sanity Studio**, click **+** in the body field and choose **Pull quote**.

To bulk-update from the curated list: `npm run apply:pull-quotes` (see `content/pull-quotes.json`).

## Subheads

```markdown
## Subhead title
```

## After adding files

Restart the dev server:

```bash
npm run dev
```

Or deploy — articles are read at build time from this folder until Sanity CMS is connected.

## Prefer a CMS instead?

Once Sanity is set up (see `docs/PUBLISHING.md`), editors can publish in the browser and you do not need markdown files.
