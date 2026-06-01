import Link from "next/link";
import { Masthead } from "@/components/Masthead";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { ArticleCard } from "@/components/ArticleCard";
import { FeaturedCarousel } from "@/components/FeaturedCarousel";
import { SectionBlock } from "@/components/SectionBlock";
import { EditorsNote } from "@/components/EditorsNote";
import { getAllArticles, getFeaturedCarousel } from "@/lib/content";
import { getSiteContent } from "@/lib/site-content";
import { SECTIONS, type Section } from "@/lib/types";

/** Refresh from Sanity at least every minute even without a webhook. */
export const revalidate = 60;

export default async function HomePage() {
  const [featuredSlides, all, site] = await Promise.all([
    getFeaturedCarousel(5),
    getAllArticles(),
    getSiteContent(),
  ]);
  const featuredSlugs = new Set(featuredSlides.map((a) => a.slug));
  const latest = all.filter((a) => !featuredSlugs.has(a.slug)).slice(0, 4);

  return (
    <>
      <FeaturedCarousel articles={featuredSlides}>
        <Masthead variant="dark" />
        <div className="mt-8">
          <SiteNav variant="dark" />
        </div>
      </FeaturedCarousel>

      <EditorsNote note={site.homepageNote} />

      {SECTIONS.map((section: Section) => {
        const sectionArticles = all.filter((a) => a.section === section).slice(0, 3);
        return (
          <SectionBlock key={section} section={section} articles={sectionArticles} />
        );
      })}

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex items-baseline justify-between border-b-2 border-tfa-ink pb-3">
          <h2 className="font-display text-xl font-bold tracking-[0.12em] uppercase">
            Latest
          </h2>
          <Link
            href="/international"
            className="font-display text-[0.65rem] tracking-[0.15em] text-tfa-muted uppercase hover:text-tfa-red"
          >
            Browse all sections
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {latest.map((article) => (
            <ArticleCard key={article._id} article={article} layout="vertical" />
          ))}
        </div>
      </section>

      <section className="bg-tfa-charcoal py-16 text-white">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <p className="font-display text-xs tracking-[0.3em] text-tfa-red uppercase">
            The First Amendment
          </p>
          <p className="mx-auto mt-4 max-w-xl font-serif text-2xl leading-snug sm:text-3xl">
            Student analysis on politics, economics, and the world we inherit.
          </p>
          <Link
            href="/about"
            className="mt-8 inline-block border border-white/40 px-8 py-3 font-display text-xs font-semibold tracking-[0.2em] uppercase hover:bg-white hover:text-tfa-black"
          >
            About our team
          </Link>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
