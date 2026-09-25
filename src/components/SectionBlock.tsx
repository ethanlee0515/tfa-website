import Link from "next/link";
import type { Article, Section } from "@/lib/types";
import { SECTION_LABELS } from "@/lib/types";
import { ArticleCard } from "./ArticleCard";

export function SectionBlock({
  section,
  articles,
}: {
  section: Section;
  articles: Article[];
}) {
  if (!articles.length) return null;
  const [lead, ...rest] = articles;
  return (
    <section
      id={section}
      aria-labelledby={`${section}-heading`}
      className="page-shell py-9 sm:py-12"
    >
      <div className="flex items-baseline justify-between gap-4 border-t-2 border-tfa-ink pt-4">
        <h2 id={`${section}-heading`} className="section-heading">
          {SECTION_LABELS[section]}
        </h2>
        <Link href={`/${section}`} className="editorial-link shrink-0">
          View section <span aria-hidden="true">↗</span>
        </Link>
      </div>
      <div className="mt-7 grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
        <ArticleCard article={lead} featured layout="vertical" />
        {rest.length > 0 && (
          <div className="divide-y divide-tfa-rule border-t border-tfa-rule lg:border-t-0 lg:border-l lg:pl-10">
            {rest.map((article, index) => (
              <div
                key={article._id}
                className={`py-6 ${index === 0 ? "lg:pt-0" : ""}`}
              >
                <ArticleCard article={article} layout="horizontal" />
              </div>
            ))}
            <p className="pt-5 font-display text-xs leading-relaxed text-tfa-muted">
              More perspectives in{" "}
              <Link
                href={`/${section}`}
                className="underline underline-offset-4 hover:text-tfa-red"
              >
                {SECTION_LABELS[section]}
              </Link>
              .
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
