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
      <header className="border-b border-tfa-ink/10 bg-tfa-paper">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <Masthead issueLabel={site.currentIssueLabel} />
          <div className="mt-8">
            <SiteNav />
          </div>
        </div>
      </header>

      <section className="border-b border-tfa-ink/10 bg-tfa-black text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="font-display text-[0.65rem] font-semibold tracking-[0.3em] text-tfa-red uppercase">
            {site.aboutMission.eyebrow}
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl font-semibold leading-tight sm:text-5xl">
            {site.aboutMission.headline}
          </h1>
          <div className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 [&_p]:text-white/80">
            <RichTextBody value={site.aboutMission.body} />
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,340px)] lg:gap-20">
          <article>
            <p className="font-display text-xs font-semibold tracking-[0.22em] text-tfa-red uppercase">
              {site.aboutLetter.eyebrow}
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-tfa-ink">
              {site.aboutLetter.title}
            </h2>
            <div className="mt-8">
              <RichTextBody value={site.aboutLetter.body} />
            </div>
            {site.aboutLetter.signoff && (
              <p className="mt-6 font-display text-xs tracking-[0.15em] text-tfa-muted uppercase">
                {site.aboutLetter.signoff}
              </p>
            )}
          </article>

          <aside className="lg:pt-2">
            <div className="border border-tfa-ink/10 bg-white p-6 sm:p-8">
              <h2 className="font-display text-xs font-semibold tracking-[0.22em] text-tfa-muted uppercase">
                At a glance
              </h2>
              <dl className="mt-6 space-y-5 text-sm">
                <div>
                  <dt className="font-display text-[0.62rem] tracking-[0.14em] text-tfa-muted uppercase">
                    Publication
                  </dt>
                  <dd className="mt-1 font-serif text-base text-tfa-ink">
                    {site.aboutSidebar.publication}
                  </dd>
                </div>
                <div>
                  <dt className="font-display text-[0.62rem] tracking-[0.14em] text-tfa-muted uppercase">
                    Current issue
                  </dt>
                  <dd className="mt-1 font-serif text-base text-tfa-ink">
                    {site.currentIssueLabel}
                  </dd>
                </div>
                <div>
                  <dt className="font-display text-[0.62rem] tracking-[0.14em] text-tfa-muted uppercase">
                    Sections
                  </dt>
                  <dd className="mt-1 leading-relaxed text-tfa-muted">
                    Domestic · International · Economics · Features
                  </dd>
                </div>
                <div>
                  <dt className="font-display text-[0.62rem] tracking-[0.14em] text-tfa-muted uppercase">
                    For writers
                  </dt>
                  <dd className="mt-1 leading-relaxed text-tfa-muted">
                    {site.aboutSidebar.forWriters}
                  </dd>
                </div>
              </dl>
              <Link
                href="/international"
                className="mt-8 inline-flex w-full items-center justify-center border border-tfa-ink/15 bg-tfa-paper px-4 py-3 font-display text-[0.65rem] font-semibold tracking-[0.18em] text-tfa-ink uppercase transition-colors hover:border-tfa-red hover:text-tfa-red"
              >
                Read the latest issue
              </Link>
            </div>
          </aside>
        </div>

        <section className="mt-20 border-t border-tfa-ink/10 pt-20">
          <div className="max-w-2xl">
            <p className="font-display text-xs font-semibold tracking-[0.22em] text-tfa-red uppercase">
              Leadership
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-tfa-ink">
              Editorial leadership
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-tfa-muted">
              {site.aboutLeadershipIntro}
            </p>
          </div>
          <div className="mt-10 max-w-3xl">
            <EditorGrid editors={leadership} />
          </div>
        </section>

        <section className="mt-20 border-t border-tfa-ink/10 pt-20">
          <div className="max-w-2xl">
            <p className="font-display text-xs font-semibold tracking-[0.22em] text-tfa-red uppercase">
              The board
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-tfa-ink">
              {site.currentIssueLabel} editorial board
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-tfa-muted">
              {site.aboutBoardIntro}
            </p>
          </div>
          <div className="mt-12">
            <BoardRoster sections={boardSections} />
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
