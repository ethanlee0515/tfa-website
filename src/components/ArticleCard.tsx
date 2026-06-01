import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/types";
import { SECTION_ACCENT } from "@/lib/types";
import { SectionLabel } from "./SectionLabel";
import { formatAuthors, formatDate } from "@/lib/format";

export function ArticleCard({
  article,
  featured = false,
  layout = "horizontal",
}: {
  article: Article;
  featured?: boolean;
  layout?: "horizontal" | "vertical";
}) {
  const accent = SECTION_ACCENT[article.section] ?? SECTION_ACCENT.features;
  const isHorizontal = layout === "horizontal" && article.image;

  return (
    <article
      className={`group overflow-hidden border border-tfa-ink/8 bg-white shadow-sm transition-shadow hover:shadow-md ${
        featured ? "md:col-span-2" : ""
      }`}
    >
      <Link
        href={`/article/${article.slug}`}
        className={
          isHorizontal
            ? "grid md:grid-cols-2"
            : "flex flex-col"
        }
      >
        {article.image && (
          <div
            className={`relative overflow-hidden bg-tfa-charcoal/10 ${
              isHorizontal
                ? "aspect-[4/3] md:aspect-auto md:min-h-[220px]"
                : featured
                  ? "aspect-[16/10]"
                  : "aspect-[3/2]"
            }`}
          >
            <Image
              src={article.image}
              alt={article.imageAlt ?? article.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes={
                featured
                  ? "(max-width: 768px) 100vw, 50vw"
                  : "(max-width: 768px) 100vw, 33vw"
              }
            />
            <div
              className={`absolute bottom-0 left-0 h-1 w-full ${accent.bar}`}
              aria-hidden
            />
          </div>
        )}

        <div className={`flex flex-col justify-center p-5 sm:p-6 ${!article.image ? "border-t-4 " + accent.bar : ""}`}>
          <SectionLabel section={article.section} />
          <h2
            className={`mt-2 font-serif leading-tight font-semibold text-tfa-ink transition-colors group-hover:text-tfa-red ${
              featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
            }`}
          >
            {article.title}
          </h2>
          <p
            className={`mt-2 line-clamp-3 text-tfa-muted leading-relaxed ${
              featured ? "text-base" : "text-sm sm:text-base"
            }`}
          >
            {article.deck}
          </p>
          <p className="mt-4 font-display text-[0.65rem] tracking-wide text-tfa-muted uppercase">
            {formatAuthors(article.authors)}
            <span className="mx-2 text-tfa-ink/20">·</span>
            {formatDate(article.publishedAt)}
          </p>
        </div>
      </Link>
    </article>
  );
}
