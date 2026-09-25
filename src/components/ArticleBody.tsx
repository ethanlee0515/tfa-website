import type { ArticleBlock } from "@/lib/types";

function PullQuote({ text }: { text: string }) {
  return (
    <figure className="my-10 border-y border-tfa-ink/25 py-6 sm:my-12 sm:py-8">
      <blockquote className="max-w-[36ch]">
        <p className="font-serif text-[1.6rem] leading-[1.3] font-medium tracking-[-0.015em] text-tfa-red sm:text-[1.9rem]">
          {text}
        </p>
      </blockquote>
    </figure>
  );
}

export function ArticleBody({ body }: { body: ArticleBlock[] }) {
  return (
    <div className="article-body space-y-6 text-lg leading-[1.8] text-tfa-ink sm:text-[1.2rem]">
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
              className="mt-10 mb-4 font-serif text-2xl leading-tight font-semibold tracking-[-0.015em] text-tfa-ink sm:text-3xl"
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
