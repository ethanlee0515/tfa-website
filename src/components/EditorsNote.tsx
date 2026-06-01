import Link from "next/link";
import type { SiteContent } from "@/lib/site-defaults";
import { RichTextBody } from "./RichTextBody";

export function EditorsNote({
  note,
}: {
  note: SiteContent["homepageNote"];
}) {
  return (
    <section className="border-b border-tfa-ink/10 bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div>
          <p className="font-display text-xs font-semibold tracking-[0.25em] text-tfa-red uppercase">
            {note.eyebrow}
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-tfa-ink sm:text-4xl">
            {note.title}
          </h2>
        </div>
        <div className="space-y-4 text-base leading-relaxed text-tfa-muted sm:text-lg">
          <RichTextBody value={note.body} />
          {note.closing && (
            <p className="font-serif text-tfa-ink italic">{note.closing}</p>
          )}
          <Link
            href="/about"
            className="inline-block font-display text-xs font-semibold tracking-[0.2em] text-tfa-red uppercase hover:underline"
          >
            {note.linkText}
          </Link>
        </div>
      </div>
    </section>
  );
}
