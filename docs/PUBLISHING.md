# Hosting TFA & editor publishing

This site is built to run on **Vercel** (public website) + **Sanity** (editor backend). You do not need your own server.

---

## Part 1 — Put the site online (Vercel)

### 1. Push code to GitHub

```bash
cd /Users/ethanlee/tfa-website
git add .
git commit -m "Prepare TFA site for deploy"
```

Create a repo on GitHub, then:

```bash
git remote add origin git@github.com:YOUR_ORG/tfa-website.git
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
2. **Add New Project** → import `tfa-website`.
3. Framework preset: **Next.js** (auto-detected).
4. Click **Deploy** (env vars can wait for the first build).

Your site will be live at `https://tfa-website-xxx.vercel.app`.

### 3. Custom domain (optional)

In Vercel → Project → **Settings → Domains**, add e.g. `thefirstamendment.org` and follow DNS instructions from your registrar.

---

## Part 2 — Editor backend (Sanity CMS)

Sanity is where editors log in, write articles, upload graphics, and hit **Publish**. The public site pulls published content automatically.

### 1. Create a Sanity project

1. Sign up at [sanity.io](https://www.sanity.io).
2. **Create project** → name it e.g. `The First Amendment`.
3. Dataset: `production`.
4. Copy the **Project ID** from [sanity.io/manage](https://www.sanity.io/manage).

### 2. Local environment variables

In the project root:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01

# Create in Sanity → API → Tokens → Add API token (Viewer)
SANITY_API_READ_TOKEN=

# Random long strings (generate with: openssl rand -base64 32)
SANITY_PREVIEW_SECRET=
SANITY_REVALIDATE_SECRET=
```

### 3. CORS (required for Studio + site)

In [sanity.io/manage](https://www.sanity.io/manage) → your project → **API** → **CORS origins**, add:

- `http://localhost:3000`
- `https://YOUR-VERCEL-URL.vercel.app`
- `https://your-custom-domain.org` (when you have one)

Allow credentials: **yes**.

### 4. Invite editors

Sanity → **Project** → **Members** → **Invite**:

- **Editor** — can create and publish articles
- **Administrator** — you (full access)

Editors use their Sanity login; they do **not** need GitHub access.

### 5. Import existing markdown articles into Sanity

The site’s real articles live in `content/articles/*.md` until you import them. **Sanity Studio will look empty** until you run this once.

1. In [sanity.io/manage](https://www.sanity.io/manage) → **API** → **Tokens** → **Add API token**
   - Name: `TFA import`
   - Permissions: **Editor** (or Admin)
2. Add to `.env.local`:
   ```env
   SANITY_API_WRITE_TOKEN=your_token_here
   ```
3. Run:
   ```bash
   npm run import:sanity
   ```
4. Open [http://localhost:3000/studio](http://localhost:3000/studio) — you should see all articles and authors.

Re-run `import:sanity` anytime you refresh markdown from `Articles/` and want to sync back to Sanity (it upserts by slug).

### 6. Open the Studio (writing UI)

**Locally:**

```bash
npm run dev
```

Open [http://localhost:3000/studio](http://localhost:3000/studio)

**Production:** `https://your-domain.com/studio`

In Studio:

- **Site & About page** — homepage “Why this issue matters,” mission band, editors’ letter, sidebar copy, issue label
- **Editors & board** — leadership photos + full board roster
- **Article** — title, slug, section, body, pull quotes, hero image, `status: published`
- **Author** — byline names + class years

First-time setup (seeds current copy from the repo):

```bash
npm run seed:site
```

### 7. Connect Vercel to Sanity

In Vercel → Project → **Settings → Environment Variables**, add the same variables as `.env.local` for **Production** (and Preview if you want).

Redeploy after saving env vars.

### 8. Auto-update when someone publishes (webhook)

1. In Sanity → **API** → **Webhooks** → **Create**:
   - URL: `https://YOUR-DOMAIN.com/api/revalidate?secret=YOUR_SANITY_REVALIDATE_SECRET`
   - Trigger: Create, Update, Delete on `article`, `siteSettings`, and `editor`
2. Use the same `SANITY_REVALIDATE_SECRET` as in Vercel env.

After publish, the live site refreshes within about a minute.

---

## Part 3 — Markdown articles (source files & bylines)

For bulk import from Word/PDF into markdown:

```bash
npm run import:articles      # refresh markdown from Articles/
npm run apply:pull-quotes      # insert pull quotes from pull-quotes.json
npm run import:sanity          # push to Sanity (needs write token)
```

To add or edit by hand:

1. See [`content/articles/README.md`](../content/articles/README.md)
2. Copy [`content/articles/_template.md`](../content/articles/_template.md) for each story
3. Use **exact** author names and class years from the PDF
4. Paste full body text paragraph by paragraph
5. Restart `npm run dev` or redeploy

Markdown files **override** placeholder seed articles with the same `slug`.

**To send articles to a developer:** zip the folder `content/articles/` or share a Google Drive folder of `.md` files + graphics.

---

## Which source wins?

| Source | When used |
|--------|-----------|
| **Sanity** (published) | When configured and at least one published article exists — **Sanity is the only source** (deleting in Studio removes it from the site) |
| **`content/articles/*.md`** | Used only before Sanity has published content, or when Sanity is not configured |

---

## Quick checklist before launch

- [ ] Replace seed articles with markdown or Sanity content
- [ ] Verify About page editors and photos
- [ ] Add Vercel env vars + Sanity webhook
- [ ] Test publish flow: draft → published → live site updates
- [ ] Optional: compress large cover PNGs in `public/covers/` for faster loads

---

## Costs

- **Vercel** — free tier is enough for a school publication
- **Sanity** — free tier is usually enough (generous document limits)

---

## Need help?

- Vercel docs: [vercel.com/docs](https://vercel.com/docs)
- Sanity docs: [sanity.io/docs](https://www.sanity.io/docs)
