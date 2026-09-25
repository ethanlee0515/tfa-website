import Image from "next/image";
import Link from "next/link";
import type { SiteContent } from "@/lib/site-defaults";
import { CURRENT_ISSUE } from "@/lib/site";
import { RichTextBody } from "./RichTextBody";

export function EditorsNote({ note }: { note: SiteContent["homepageNote"] }) {
  return (
    <section
      className="page-shell py-7 sm:py-10"
      aria-labelledby="editors-note-title"
    >
      <div className="grid gap-8 border-y border-tfa-rule py-8 sm:py-10 md:grid-cols-[200px_minmax(0,1fr)] md:gap-12 lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-16">
        <figure className="flex items-start gap-5 md:block">
          <a
            href={CURRENT_ISSUE.coverImage}
            aria-label={`View the ${CURRENT_ISSUE.label} cover`}
            className="block w-28 shrink-0 md:w-full"
          >
            <Image
              src={CURRENT_ISSUE.coverImage}
              alt={CURRENT_ISSUE.coverAlt}
              width={1696}
              height={2400}
              sizes="(max-width: 768px) 112px, 230px"
              className="h-auto w-full"
            />
          </a>
          <figcaption className="pt-1 font-display text-[11px] leading-relaxed text-tfa-muted md:mt-3 md:pt-0">
            <span className="block font-semibold text-tfa-ink">
              On the cover
            </span>
            {CURRENT_ISSUE.label}
            <br />
            {CURRENT_ISSUE.coverCredit}
          </figcaption>
        </figure>
        <div className="max-w-2xl md:self-center">
          <p className="eyebrow text-tfa-red">{note.eyebrow}</p>
          <h2
            id="editors-note-title"
            className="mt-3 font-serif text-3xl leading-tight font-semibold tracking-[-0.035em] sm:text-4xl"
          >
            {note.title}
          </h2>
          <div className="mt-5">
            <RichTextBody value={note.body} />
          </div>
          {note.closing && (
            <p className="mt-4 text-lg italic">{note.closing}</p>
          )}
          <Link href="/about" className="editorial-link mt-6 inline-block">
            {note.linkText}
          </Link>
        </div>
      </div>
    </section>
  );
}
