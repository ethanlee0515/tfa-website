import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/types";
import { SectionLabel } from "./SectionLabel";
import { formatAuthors, formatDate } from "@/lib/format";

export function ArticleCard({
  article,
  featured = false,
  layout = "horizontal",
  headingLevel = "h3",
}: {
  article: Article;
  featured?: boolean;
  layout?: "horizontal" | "vertical";
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  const horizontal = layout === "horizontal" && Boolean(article.image);
  const authors = formatAuthors(article.authors);
  return (
    <article className="group min-w-0">
      <Link
        href={`/article/${article.slug}`}
        className={
          horizontal
            ? `grid items-start gap-5 ${featured ? "sm:grid-cols-[1.15fr_1fr] sm:gap-8" : "grid-cols-[100px_minmax(0,1fr)] sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-7"}`
            : "block"
        }
      >
        {article.image && (
          <div
            className={`relative overflow-hidden bg-tfa-ink/5 ${horizontal && !featured ? "aspect-square sm:aspect-[4/3]" : "aspect-[3/2]"}`}
          >
            <Image
              src={article.image}
              alt={article.imageAlt ?? article.title}
              fill
              className="object-cover"
              sizes={
                horizontal && !featured
                  ? "(max-width: 640px) 100px, 180px"
                  : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
              }
            />
          </div>
        )}
        <div className={!horizontal && article.image ? "pt-5" : ""}>
          <SectionLabel section={article.section} />
          <Heading
            className={`mt-2 font-serif font-semibold tracking-[-0.025em] text-tfa-ink group-hover:underline group-hover:decoration-tfa-red/60 group-hover:underline-offset-4 ${featured ? "text-3xl leading-[1.14] sm:text-[2.2rem]" : "text-xl leading-[1.2] sm:text-2xl"}`}
          >
            {article.title}
          </Heading>
          {article.deck && (
            <p
              className={`mt-3 text-base leading-[1.65] text-tfa-muted ${horizontal && !featured ? "hidden sm:line-clamp-2" : "line-clamp-3"}`}
            >
              {article.deck}
            </p>
          )}
          <p className="mt-4 font-display text-[11px] leading-relaxed text-tfa-muted">
            {authors && (
              <span className="font-semibold text-tfa-ink">{authors}</span>
            )}
            {authors && article.publishedAt && (
              <span className="mx-2" aria-hidden="true">
                /
              </span>
            )}
            {article.publishedAt && (
              <time dateTime={article.publishedAt}>
                {formatDate(article.publishedAt)}
              </time>
            )}
          </p>
        </div>
      </Link>
    </article>
  );
}
