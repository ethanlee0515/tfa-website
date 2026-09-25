# TFA editorial design

The website should feel like an extension of the publication: strong headlines, real artwork, readable stories, and clear editorial priorities. Build its identity from type and composition.

## Color and typography

- Paper: `#f3eee5`; ink: `#242824`; muted text: `#65665e`; accent: `#913c32`; rules: `#c8c3b8`. These tokens live in `src/app/globals.css`.
- Use Source Serif 4 for the masthead, headlines, and article text. Use Manrope for navigation, labels, bylines, dates, and other supporting information.
- The masthead is a text wordmark. Keep the issue label and school name quieter than the publication name.
- Headlines have a deliberate size hierarchy. Small uppercase labels are reserved for sections and editorial context, not entire paragraphs or author names.
- Article bodies use a 68ch column with generous line height. Long headlines wrap naturally; do not shrink all type to accommodate one title.

## Layout

- Use the shared `page-shell` for consistent margins: maximum width 1280px, 20px mobile gutters, 40px larger-screen gutters.
- The homepage has one static lead story followed by supporting text stories. Keep CMS featured ordering; do not rotate headlines automatically.
- Section previews pair one prominent story with compact rows. Use spacing and fine rules to group content instead of enclosing every story in a card.
- Section archives keep one lead and a readable list of the remaining stories. Keep dates and bylines legible.
- Article pages put the headline and byline before the artwork, then the reading column. About-page copy, editor names, and portraits remain CMS-driven.
- Mobile reflows the content rather than simply shrinking it. On the homepage the lead artwork follows the headline and precedes the summary.

## Artwork and interaction

- Use the publication's existing cover art, article illustrations, and editor photographs. No invented photos, statistics, quotes, avatars, partner logos, or decorative pseudo-content.
- Do not obscure artwork with gradients, tinted overlays, or noise textures. Do not animate image zoom on hover.
- Keep supplied image credits. The cover asset, label, alt text, and credit are maintained together in `src/lib/site.ts`; the current issue label in Sanity may change independently.
- Links should look and behave like links. Use visible keyboard focus, a skip link, descriptive image alt text, semantic heading levels, and readable contrast.
- Reserve motion for a useful change of state. Respect reduced-motion preferences. No autoplay carousel, floating keywords, sparkle icons, dot grids, glow effects, or animated backgrounds.

## Content and verification

Presentation changes must preserve article URLs, CMS publishing, featured selection, and cache revalidation. There is no article-to-issue relationship in the current schema, so do not invent issue-specific article counts. The local Studio still edits the production dataset; design verification must not publish test content.

Before shipping, check the homepage, a section, an article, the About page, and editor entry at desktop and mobile widths. Confirm there is one main heading per page, no horizontal overflow, valid links, and a successful production build.
