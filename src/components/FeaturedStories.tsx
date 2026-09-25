import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/types";
import { formatAuthors, formatDate } from "@/lib/format";
import { SectionLabel } from "./SectionLabel";

export function FeaturedStories({ articles }: { articles: Article[] }) {
  const [lead, ...more] = articles;
  if (!lead) return null;
  const authors = formatAuthors(lead.authors);

  return (
    <section
      aria-label="Featured stories"
      className="page-shell pt-8 pb-9 sm:pt-11 sm:pb-12"
    >
      <article
        className={`grid gap-5 ${lead.image ? "lg:grid-cols-[1fr_1.18fr] lg:grid-rows-[auto_1fr] lg:gap-x-12" : "max-w-3xl"}`}
      >
        <div className="min-w-0 lg:pt-3">
          <p className="eyebrow flex flex-wrap items-center gap-3">
            <span>In focus</span>
            <span aria-hidden="true" className="h-px w-6 bg-tfa-rule" />
            <SectionLabel section={lead.section} />
          </p>
          <h2 className="mt-5 font-serif text-[clamp(2.1rem,3.3vw,3.1rem)] leading-[1.08] font-semibold tracking-[-0.04em]">
            <Link
              href={`/article/${lead.slug}`}
              className="hover:underline hover:decoration-tfa-red/60 hover:underline-offset-4"
            >
              {lead.title}
            </Link>
          </h2>
        </div>
        {lead.image && (
          <figure className="min-w-0 lg:col-start-2 lg:row-start-1 lg:row-span-2">
            <Link
              href={`/article/${lead.slug}`}
              aria-label={`Read ${lead.title}`}
              className="relative block aspect-[4/3] bg-tfa-ink/5"
            >
              <Image
                src={lead.image}
                alt={lead.imageAlt ?? lead.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 650px"
                className="object-cover"
              />
            </Link>
            {lead.imageCredit && (
              <figcaption className="mt-3 font-display text-[11px] text-tfa-muted">
                {lead.imageCredit}
              </figcaption>
            )}
          </figure>
        )}
        <div className="lg:col-start-1 lg:row-start-2">
          {lead.deck && (
            <p className="max-w-lg text-[17px] leading-[1.65] text-tfa-muted">
              {lead.deck}
            </p>
          )}
          <p className="mt-6 font-display text-[11px] leading-relaxed text-tfa-muted">
            {authors && (
              <span className="font-semibold text-tfa-ink">{authors}</span>
            )}
            {authors && lead.publishedAt && (
              <span aria-hidden="true" className="mx-2">
                /
              </span>
            )}
            {lead.publishedAt && (
              <time dateTime={lead.publishedAt}>
                {formatDate(lead.publishedAt)}
              </time>
            )}
          </p>
          <Link
            href={`/article/${lead.slug}`}
            className="editorial-link mt-6 inline-flex min-h-8 items-center gap-3"
          >
            Read the story <span aria-hidden="true">→</span>
          </Link>
        </div>
      </article>
      {more.length > 0 && (
        <div className="mt-10 border-t border-tfa-rule pt-5 lg:grid lg:grid-cols-[150px_minmax(0,1fr)] lg:gap-8">
          <h2 className="eyebrow mb-5 text-tfa-muted">More perspectives</h2>
          <div className="grid gap-x-9 gap-y-6 sm:grid-cols-2">
            {more.map((article) => (
              <article
                key={article._id}
                className="border-b border-tfa-rule/70 pb-5"
              >
                <SectionLabel section={article.section} />
                <h3 className="mt-2 text-xl leading-[1.25] font-semibold tracking-[-0.02em]">
                  <Link
                    href={`/article/${article.slug}`}
                    className="hover:underline hover:decoration-tfa-red/60 hover:underline-offset-4"
                  >
                    {article.title}
                  </Link>
                </h3>
                <p className="mt-2 font-display text-[11px] leading-relaxed text-tfa-muted">
                  {formatAuthors(article.authors)}
                </p>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
