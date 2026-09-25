import type { Metadata } from "next";
import Link from "next/link";
import { Masthead } from "@/components/Masthead";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { EditorGrid } from "@/components/EditorGrid";
import { BoardRoster } from "@/components/BoardRoster";
import { RichTextBody } from "@/components/RichTextBody";
import {
  getBoardSections,
  getLeadershipEditors,
  getSiteContent,
} from "@/lib/site-content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet the editorial board of The First Amendment, Lawrenceville's student political magazine.",
};

export const revalidate = 60;

export default async function AboutPage() {
  const [site, leadership, boardSections] = await Promise.all([
    getSiteContent(),
    getLeadershipEditors(),
    getBoardSections(),
  ]);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <header className="border-b border-tfa-ink/25">
        <div className="page-shell pt-7 sm:pt-9">
          <Masthead issueLabel={site.currentIssueLabel} />
          <SiteNav />
        </div>
      </header>

      <main id="main-content" className="page-shell py-10 sm:py-14">
        <section
          className="grid gap-6 border-b border-tfa-ink/25 pb-10 sm:pb-14 lg:grid-cols-[1.3fr_1fr] lg:gap-14"
          aria-labelledby="about-heading"
        >
          <div>
            <p className="eyebrow text-tfa-red">{site.aboutMission.eyebrow}</p>
            <h1
              id="about-heading"
              className="mt-4 max-w-[23ch] font-serif text-[2.5rem] leading-[1.12] font-semibold tracking-[-0.025em] sm:text-5xl"
            >
              {site.aboutMission.headline}
            </h1>
          </div>
          <RichTextBody
            value={site.aboutMission.body}
            className="max-w-[48ch] lg:self-end"
          />
        </section>

        <div className="mt-10 grid gap-10 sm:mt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,300px)] lg:gap-16">
          <article>
            <p className="eyebrow text-tfa-red">{site.aboutLetter.eyebrow}</p>
            <h2 className="mt-3 max-w-[28ch] font-serif text-3xl leading-tight font-semibold tracking-[-0.02em] text-tfa-ink sm:text-4xl">
              {site.aboutLetter.title}
            </h2>
            <div className="mt-6 max-w-[68ch]">
              <RichTextBody value={site.aboutLetter.body} />
            </div>
            {site.aboutLetter.signoff && (
              <p className="mt-6 font-display text-xs leading-relaxed font-medium text-tfa-muted">
                {site.aboutLetter.signoff}
              </p>
            )}
          </article>

          <aside className="border-t border-tfa-ink/25 pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
            <div>
              <h2 className="eyebrow text-tfa-ink">At a glance</h2>
              <dl className="mt-6 space-y-5">
                <div>
                  <dt className="font-display text-[0.6875rem] font-semibold text-tfa-muted">
                    Publication
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-tfa-ink">
                    {site.aboutSidebar.publication}
                  </dd>
                </div>
                <div>
                  <dt className="font-display text-[0.6875rem] font-semibold text-tfa-muted">
                    Current issue
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-tfa-ink">
                    {site.currentIssueLabel}
                  </dd>
                </div>
                <div>
                  <dt className="font-display text-[0.6875rem] font-semibold text-tfa-muted">
                    Sections
                  </dt>
                  <dd className="mt-1 text-base leading-relaxed text-tfa-ink">
                    Domestic · International · Economics · Features
                  </dd>
                </div>
                <div>
                  <dt className="font-display text-[0.6875rem] font-semibold text-tfa-muted">
                    For writers
                  </dt>
                  <dd className="mt-1 text-base leading-relaxed text-tfa-ink">
                    {site.aboutSidebar.forWriters}
                  </dd>
                </div>
              </dl>
              <Link
                href="/#sections"
                className="editorial-link mt-6 inline-block font-display text-xs font-semibold text-tfa-red"
              >
                Browse all sections
              </Link>
            </div>
          </aside>
        </div>

        <section
          className="mt-12 border-t border-tfa-ink/25 pt-8 sm:mt-16 sm:pt-10"
          aria-labelledby="leadership-heading"
        >
          <div className="max-w-2xl">
            <p className="eyebrow text-tfa-red">Leadership</p>
            <h2
              id="leadership-heading"
              className="mt-3 font-serif text-3xl font-semibold tracking-[-0.02em] text-tfa-ink sm:text-4xl"
            >
              Editorial leadership
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-tfa-muted">
              {site.aboutLeadershipIntro}
            </p>
          </div>
          <div className="mt-8">
            <EditorGrid editors={leadership} />
          </div>
        </section>

        <section
          className="mt-12 border-t border-tfa-ink/25 pt-8 sm:mt-16 sm:pt-10"
          aria-labelledby="board-heading"
        >
          <div className="max-w-2xl">
            <p className="eyebrow text-tfa-red">The board</p>
            <h2
              id="board-heading"
              className="mt-3 font-serif text-3xl leading-tight font-semibold tracking-[-0.02em] text-tfa-ink sm:text-4xl"
            >
              {site.currentIssueLabel} editorial board
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-tfa-muted">
              {site.aboutBoardIntro}
            </p>
          </div>
          <div className="mt-8">
            <BoardRoster sections={boardSections} />
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
