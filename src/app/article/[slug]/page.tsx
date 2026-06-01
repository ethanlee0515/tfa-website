import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Masthead } from "@/components/Masthead";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { SectionLabel } from "@/components/SectionLabel";
import { ArticleBody } from "@/components/ArticleBody";
import { ArticleCard } from "@/components/ArticleCard";
import { ArticleImage } from "@/components/ArticleImage";
import { getAllArticles, getArticle, getSectionArticles } from "@/lib/content";
import { formatAuthors, formatDate } from "@/lib/format";
import { SECTION_LABELS, type Section } from "@/lib/types";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 60;

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.deck,
    openGraph: article.image
      ? { images: [{ url: article.image, alt: article.imageAlt }] }
      : undefined,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const related = (await getSectionArticles(article.section))
    .filter((a) => a.slug !== article.slug)
    .slice(0, 2);

  return (
    <>
      <header className="border-b border-tfa-ink/10 bg-tfa-paper">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <Masthead showTagline={false} />
          <div className="mt-6">
            <SiteNav />
          </div>
        </div>
      </header>

      {article.image && (
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <ArticleImage
            article={article}
            priority
            className="mt-6"
            aspectClass="aspect-[16/9] sm:aspect-[2/1]"
          />
        </div>
      )}

      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12">
        <SectionLabel section={article.section} />
        <h1 className="mt-4 font-serif text-3xl leading-tight font-semibold text-tfa-ink sm:text-4xl md:text-[2.75rem]">
          {article.title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-tfa-muted sm:text-xl">
          {article.deck}
        </p>
        <p className="mt-6 border-y border-tfa-ink/10 py-4 font-display text-xs tracking-[0.12em] text-tfa-muted uppercase">
          {formatAuthors(article.authors) && (
            <>
              {formatAuthors(article.authors)}
              <span className="mx-3 text-tfa-ink/15">|</span>
            </>
          )}
          {formatDate(article.publishedAt)}
          <span className="mx-3 text-tfa-ink/15">|</span>
          <Link
            href={`/${article.section}`}
            className="text-tfa-red hover:underline"
          >
            {SECTION_LABELS[article.section as Section]}
          </Link>
        </p>

        <div className="mt-10">
          <ArticleBody body={article.body} />
        </div>
      </main>

      {related.length > 0 && (
        <section className="border-t border-tfa-ink/10 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
            <h2 className="font-display text-xs font-semibold tracking-[0.2em] uppercase">
              More in {SECTION_LABELS[article.section as Section]}
            </h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {related.map((a) => (
                <ArticleCard key={a._id} article={a} layout="horizontal" />
              ))}
            </div>
          </div>
        </section>
      )}

      <SiteFooter />
    </>
  );
}
