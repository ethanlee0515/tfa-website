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
    <article className="flex items-center gap-5 border-b border-tfa-ink/20 py-6 last:border-b-0">
      {editor.photo && (
        <div className="relative h-24 w-20 shrink-0 overflow-hidden bg-tfa-ink/5 sm:h-28 sm:w-24">
          <Image
            src={editor.photo}
            alt={editor.name}
            fill
            className={photoClassName}
            sizes="96px"
          />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <h3 className="font-serif text-xl leading-tight font-semibold tracking-[-0.015em] text-tfa-ink sm:text-2xl">
          {editor.name}
          {editor.classYear && (
            <span className="font-normal text-tfa-muted">
              {" "}
              &apos;{editor.classYear}
            </span>
          )}
        </h3>
        <p className="mt-2 font-display text-[0.6875rem] leading-relaxed text-tfa-muted">
          {editor.role}
        </p>
      </div>
    </article>
  );
}

export function EditorGrid({ editors }: { editors: Editor[] }) {
  const eic = editors.filter(isEditorInChief);
  const exec = editors.filter((e) => e.role === "Executive Editor");
  const sharedPhoto =
    eic[0]?.photo && eic.every((editor) => editor.photo === eic[0].photo)
      ? eic[0].photo
      : undefined;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
      {eic.length > 0 && (
        <section className="border-t border-tfa-ink/20 pt-5">
          <p className="eyebrow text-tfa-muted">Editors-in-Chief</p>
          {sharedPhoto ? (
            <div className="mt-6">
              <div className="relative aspect-[3/2] max-w-[440px] overflow-hidden bg-tfa-ink/5">
                <Image
                  src={sharedPhoto}
                  alt={`${eic.map((editor) => editor.name).join(" and ")}, Editors-in-Chief`}
                  fill
                  className="object-cover object-[center_40%]"
                  sizes="(max-width: 640px) 90vw, 440px"
                />
              </div>
              <div className="mt-5 grid max-w-[440px] gap-4 min-[480px]:grid-cols-2">
                {eic.map((editor) => (
                  <article key={editor.name}>
                    <h3 className="font-serif text-xl leading-tight font-semibold tracking-[-0.015em] text-tfa-ink sm:text-2xl">
                      {editor.name}
                      {editor.classYear && (
                        <span className="font-normal text-tfa-muted">
                          {" "}
                          &apos;{editor.classYear}
                        </span>
                      )}
                    </h3>
                    <p className="mt-2 font-display text-[0.6875rem] leading-relaxed text-tfa-muted">
                      {editor.role}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          ) : (
            <div>
              {eic.map((editor) => (
                <EditorRow key={editor.name} editor={editor} />
              ))}
            </div>
          )}
        </section>
      )}

      {exec.length > 0 && (
        <section className="border-t border-tfa-ink/20 pt-5">
          <p className="eyebrow text-tfa-muted">Executive Editors</p>
          <div>
            {exec.map((editor) => (
              <EditorRow key={editor.name} editor={editor} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
