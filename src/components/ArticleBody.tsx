import type { ArticleBlock } from "@/lib/types";

function PullQuote({ text }: { text: string }) {
  return (
    <figure className="my-12 sm:my-14">
      <blockquote className="relative mx-auto max-w-2xl px-8 text-center sm:px-12">
        <span
          aria-hidden
          className="absolute top-0 bottom-0 left-0 flex w-3 justify-center gap-[3px]"
        >
          <span className="w-px bg-tfa-ink" />
          <span className="w-px bg-tfa-ink" />
        </span>
        <span
          aria-hidden
          className="absolute top-0 right-0 bottom-0 flex w-3 justify-center gap-[3px]"
        >
          <span className="w-px bg-tfa-ink" />
          <span className="w-px bg-tfa-ink" />
        </span>
        <p className="font-serif text-xl leading-snug font-semibold text-tfa-ink sm:text-2xl md:text-[1.65rem] md:leading-snug">
          {text}
        </p>
      </blockquote>
    </figure>
  );
}

export function ArticleBody({ body }: { body: ArticleBlock[] }) {
  return (
    <div className="article-body space-y-5 text-[1.05rem] leading-[1.75] text-tfa-ink sm:text-lg">
      {body.map((block, i) => {
        if (block._type === "pullQuote") {
          return <PullQuote key={i} text={block.text} />;
        }
        const text = block.children?.map((c) => c.text).join("") ?? "";
        if (!text) return null;
        if (block.style === "h2") {
          return (
            <h2
              key={i}
              className="mt-10 mb-4 font-serif text-2xl font-semibold text-tfa-ink sm:text-3xl"
            >
              {text}
            </h2>
          );
        }
        return <p key={i}>{text}</p>;
      })}
    </div>
  );
}
