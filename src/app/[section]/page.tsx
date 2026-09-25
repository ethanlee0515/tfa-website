import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Masthead } from "@/components/Masthead";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { ArticleCard } from "@/components/ArticleCard";
import { getSectionArticles } from "@/lib/content";
import { getCurrentIssueLabel } from "@/lib/site-content";
import { SECTIONS, SECTION_LABELS, type Section } from "@/lib/types";

type Props = { params: Promise<{ section: string }> };

/** Refresh from Sanity at least every minute even without a webhook. */
export const revalidate = 60;

export async function generateStaticParams() {
  return SECTIONS.map((section) => ({ section }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section } = await params;
  if (!SECTIONS.includes(section as Section)) return {};
  return {
    title: SECTION_LABELS[section as Section],
    description: `${SECTION_LABELS[section as Section]} coverage from The First Amendment.`,
  };
}

export default async function SectionPage({ params }: Props) {
  const { section } = await params;
  if (!SECTIONS.includes(section as Section)) notFound();

  const [articles, issueLabel] = await Promise.all([
    getSectionArticles(section),
    getCurrentIssueLabel(),
  ]);
  const label = SECTION_LABELS[section as Section];

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <header className="border-b border-tfa-ink/25">
        <div className="page-shell pt-7 sm:pt-9">
          <Masthead issueLabel={issueLabel} />
          <SiteNav />
        </div>
      </header>

      <main id="main-content" className="page-shell py-10 sm:py-14">
        <header className="border-b border-tfa-ink/25 pb-7 sm:flex sm:items-end sm:justify-between sm:gap-10 sm:pb-9">
          <div>
            <p className="eyebrow text-tfa-red">The First Amendment</p>
            <h1 className="mt-2 font-serif text-5xl leading-[1.05] font-semibold tracking-[-0.03em] text-tfa-ink sm:text-6xl lg:text-7xl">
              {label}
            </h1>
          </div>
          <p className="mt-5 max-w-sm text-lg leading-relaxed text-tfa-muted sm:mt-0">
            Student-written analysis and reporting on {label.toLowerCase()}{" "}
            affairs.
          </p>
        </header>

        {articles.length === 0 ? (
          <p className="py-12 text-lg text-tfa-muted">
            No articles published yet in this section.
          </p>
        ) : (
          <div className="pt-8 sm:pt-10">
            <ArticleCard
              article={articles[0]}
              featured
              layout="horizontal"
              headingLevel="h2"
            />
            {articles.length > 1 && (
              <div className="mt-10 border-t border-tfa-ink/25">
                {articles.slice(1).map((article) => (
                  <div
                    key={article._id}
                    className="border-b border-tfa-ink/20 py-7 last:border-0 sm:py-8"
                  >
                    <ArticleCard
                      article={article}
                      layout="horizontal"
                      headingLevel="h2"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <SiteFooter />
    </>
  );
}
