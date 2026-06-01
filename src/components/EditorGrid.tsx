import Image from "next/image";
import type { Editor } from "@/lib/types";
import { isEditorInChief } from "@/lib/editors";

function EditorRow({
  editor,
  photoClassName = "object-cover object-[center_20%]",
}: {
  editor: Editor;
  photoClassName?: string;
}) {
  return (
    <article className="flex gap-5 border-b border-tfa-ink/10 py-7 last:border-b-0 sm:gap-6">
      {editor.photo ? (
        <div className="relative h-[4.5rem] w-[4.5rem] shrink-0 overflow-hidden rounded-full bg-tfa-charcoal/5 ring-1 ring-tfa-ink/10 sm:h-20 sm:w-20">
          <Image
            src={editor.photo}
            alt={editor.name}
            fill
            className={photoClassName}
            sizes="80px"
          />
        </div>
      ) : (
        <div
          className="flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center rounded-full bg-tfa-charcoal/5 font-display text-sm text-tfa-muted ring-1 ring-tfa-ink/10 sm:h-20 sm:w-20"
          aria-hidden
        >
          {editor.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
      )}
      <div className="min-w-0 flex-1 pt-0.5">
        <h3 className="font-serif text-xl font-semibold text-tfa-ink">
          {editor.name}
          {editor.classYear && (
            <span className="font-normal text-tfa-muted"> &apos;{editor.classYear}</span>
          )}
        </h3>
        <p className="mt-1 font-display text-[0.62rem] font-semibold tracking-[0.16em] text-tfa-red uppercase">
          {editor.role}
        </p>
      </div>
    </article>
  );
}

export function EditorGrid({ editors }: { editors: Editor[] }) {
  const eic = editors.filter(isEditorInChief);
  const exec = editors.filter((e) => e.role === "Executive Editor");
  const ethan = eic.find((e) => e.name === "Ethan Lee") ?? eic[0];

  return (
    <div className="space-y-12">
      {ethan && (
        <section className="rounded-sm border border-tfa-ink/10 bg-white px-5 py-6 sm:px-8 sm:py-8">
          <p className="font-display text-[0.62rem] font-semibold tracking-[0.18em] text-tfa-red uppercase">
            Editors-in-Chief
          </p>
          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
            {ethan.photo && (
              <div className="mx-auto shrink-0 sm:mx-0">
                <div className="relative h-36 w-52 overflow-hidden rounded-sm bg-tfa-charcoal/5 ring-1 ring-tfa-ink/10 sm:h-40 sm:w-56">
                  <div className="absolute inset-0 scale-[1.4]">
                    <Image
                      src={ethan.photo}
                      alt="Ethan Lee and Jamie Ho, Editors-in-Chief"
                      fill
                      className="object-cover object-[center_40%]"
                      sizes="224px"
                    />
                  </div>
                </div>
              </div>
            )}
            <div className="min-w-0 flex-1 space-y-5 sm:space-y-4">
              {eic.map((editor) => (
                <article key={editor.name}>
                  <h3 className="font-serif text-xl font-semibold text-tfa-ink sm:text-2xl">
                    {editor.name}
                    {editor.classYear && (
                      <span className="font-normal text-tfa-muted">
                        {" "}
                        &apos;{editor.classYear}
                      </span>
                    )}
                  </h3>
                  <p className="mt-1 font-display text-[0.62rem] font-semibold tracking-[0.16em] text-tfa-red uppercase">
                    {editor.role}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {exec.length > 0 && (
        <section>
          <p className="font-display text-[0.62rem] font-semibold tracking-[0.18em] text-tfa-muted uppercase">
            Executive Editors
          </p>
          <div className="mt-4 divide-y divide-tfa-ink/10 rounded-sm border border-tfa-ink/10 bg-white px-5 sm:px-8">
            {exec.map((editor) => (
              <EditorRow key={editor.name} editor={editor} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
