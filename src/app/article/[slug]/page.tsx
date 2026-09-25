import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Masthead } from "@/components/Masthead";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { ArticleBody } from "@/components/ArticleBody";
import { ArticleCard } from "@/components/ArticleCard";
import { ArticleImage } from "@/components/ArticleImage";
import { getAllArticles, getArticle, getSectionArticles } from "@/lib/content";
import { getCurrentIssueLabel } from "@/lib/site-content";
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
  const [article, issueLabel] = await Promise.all([
    getArticle(slug),
    getCurrentIssueLabel(),
  ]);
  if (!article) notFound();

  const related = (await getSectionArticles(article.section))
    .filter((a) => a.slug !== article.slug)
    .slice(0, 2);
  const authors = formatAuthors(article.authors);
  const hasPublishedDate =
    article.publishedAt && !Number.isNaN(Date.parse(article.publishedAt));

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <header className="border-b border-tfa-ink/25">
        <div className="page-shell pt-7 sm:pt-9">
          <Masthead issueLabel={issueLabel} showTagline={false} />
          <SiteNav />
        </div>
      </header>

      <main id="main-content" className="page-shell py-10 sm:py-14">
        <article>
          <header className="mx-auto max-w-[960px]">
            <Link
              href={`/${article.section}`}
              className="eyebrow text-tfa-red hover:underline underline-offset-4"
            >
              {SECTION_LABELS[article.section as Section]}
            </Link>
            <h1 className="mt-4 max-w-[24ch] font-serif text-[clamp(2rem,9vw,2.5rem)] leading-[1.08] font-semibold tracking-[-0.025em] text-tfa-ink sm:text-5xl lg:text-[3.75rem]">
              {article.title}
            </h1>
            <p className="mt-5 max-w-[65ch] text-xl leading-relaxed text-tfa-muted sm:text-2xl sm:leading-[1.45]">
              {article.deck}
            </p>
            <div className="mt-7 flex flex-col gap-2 border-t border-tfa-ink/20 pt-4 font-display text-xs leading-relaxed sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-8">
              {authors && (
                <p className="font-semibold text-tfa-ink">By {authors}</p>
              )}
              {hasPublishedDate && (
                <time dateTime={article.publishedAt} className="text-tfa-muted">
                  {formatDate(article.publishedAt)}
                </time>
              )}
            </div>
          </header>

          {article.image && (
            <ArticleImage
              article={article}
              priority
              className="mx-auto mt-8 max-w-[960px] sm:mt-10"
              aspectClass="aspect-[4/3] sm:aspect-[16/9]"
            />
          )}

          <div className="mx-auto mt-10 max-w-[68ch] text-lg sm:mt-12 sm:text-[1.2rem]">
            <ArticleBody body={article.body} />
            <div aria-hidden="true" className="mt-10 h-2 w-2 bg-tfa-red" />
          </div>
        </article>
      </main>

      {related.length > 0 && (
        <section
          className="border-t border-tfa-ink/25"
          aria-labelledby="related-heading"
        >
          <div className="page-shell py-10 sm:py-12">
            <h2 id="related-heading" className="section-heading">
              More in {SECTION_LABELS[article.section as Section]}
            </h2>
            <div className="mt-7 grid gap-8 sm:grid-cols-2 sm:gap-10">
              {related.map((a) => (
                <ArticleCard key={a._id} article={a} layout="vertical" />
              ))}
            </div>
          </div>
        </section>
      )}

      <SiteFooter />
    </>
  );
}
