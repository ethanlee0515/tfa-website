import { Masthead } from "@/components/Masthead";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { FeaturedStories } from "@/components/FeaturedStories";
import { SectionBlock } from "@/components/SectionBlock";
import { EditorsNote } from "@/components/EditorsNote";
import { getAllArticles, getFeaturedCarousel } from "@/lib/content";
import { getSiteContent } from "@/lib/site-content";
import { SECTIONS } from "@/lib/types";

export const revalidate = 60;

export default async function HomePage() {
  const [featured, all, site] = await Promise.all([
    getFeaturedCarousel(5),
    getAllArticles(),
    getSiteContent(),
  ]);
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <header className="page-shell pt-5 sm:pt-8">
        <Masthead issueLabel={site.currentIssueLabel} asTitle />
        <SiteNav />
      </header>
      <main id="main-content">
        <FeaturedStories articles={featured} />
        <div id="sections">
          {SECTIONS.map((section, index) => (
            <div key={section}>
              {index === 2 && <EditorsNote note={site.homepageNote} />}
              <SectionBlock
                section={section}
                articles={all
                  .filter((article) => article.section === section)
                  .slice(0, 3)}
              />
            </div>
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
