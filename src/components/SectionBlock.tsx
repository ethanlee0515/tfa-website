import Link from "next/link";
import type { Article, Section } from "@/lib/types";
import { SECTION_LABELS, SECTION_ACCENT } from "@/lib/types";
import { ArticleCard } from "./ArticleCard";

export function SectionBlock({
  section,
  articles,
}: {
  section: Section;
  articles: Article[];
}) {
  if (!articles.length) return null;
  const accent = SECTION_ACCENT[section];
  const [lead, ...rest] = articles;

  return (
    <section className={`${accent.bg} border-y border-tfa-ink/8 py-12 sm:py-14`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-end justify-between gap-4 border-b border-tfa-ink/10 pb-4">
          <div>
            <div className={`mb-2 h-1 w-12 ${accent.bar}`} />
            <h2 className="font-display text-2xl font-bold tracking-[0.08em] uppercase sm:text-3xl">
              {SECTION_LABELS[section]}
            </h2>
          </div>
          <Link
            href={`/${section}`}
            className={`shrink-0 font-display text-[0.65rem] font-semibold tracking-[0.15em] uppercase ${accent.text} hover:underline`}
          >
            All {SECTION_LABELS[section]} →
          </Link>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <ArticleCard article={lead} featured layout="vertical" />
          {rest.map((article) => (
            <ArticleCard key={article._id} article={article} layout="horizontal" />
          ))}
        </div>
      </div>
    </section>
  );
}
