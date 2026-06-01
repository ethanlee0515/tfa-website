import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Masthead } from "@/components/Masthead";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { ArticleCard } from "@/components/ArticleCard";
import { getSectionArticles } from "@/lib/content";
import { SECTIONS, SECTION_LABELS, type Section } from "@/lib/types";

type Props = { params: Promise<{ section: string }> };

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

  const articles = await getSectionArticles(section);
  const label = SECTION_LABELS[section as Section];

  return (
    <>
      <header className="border-b border-tfa-ink/10">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <Masthead />
          <div className="mt-8">
            <SiteNav />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <p className="font-display text-xs font-semibold tracking-[0.25em] text-tfa-red uppercase">
          Section
        </p>
        <h1 className="mt-2 font-serif text-4xl font-semibold text-tfa-ink sm:text-5xl">
          {label}
        </h1>
        <p className="mt-4 max-w-xl text-tfa-muted">
          Student-written analysis and reporting on {label.toLowerCase()} affairs.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {articles.length === 0 ? (
            <p className="text-tfa-muted sm:col-span-2">
              No articles published yet in this section.
            </p>
          ) : (
            articles.map((article, i) => (
              <ArticleCard
                key={article._id}
                article={article}
                featured={i === 0}
                layout="vertical"
              />
            ))
          )}
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
