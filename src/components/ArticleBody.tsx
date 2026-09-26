import type { ArticleBlock } from "@/lib/types";

const sentenceSegmenter = new Intl.Segmenter("en", {
  granularity: "sentence",
});

/**
 * Some archived articles arrived from PDF exports as one very long Portable
 * Text block. Preserve authored paragraph breaks when they exist, and give
 * flattened blocks readable editorial paragraphs without changing any words.
 */
function articleParagraphs(text: string): string[] {
  const authored = text
    .split(/\n\s*\n+/)
    .map((paragraph) => paragraph.replace(/\s*\n\s*/g, " ").trim())
    .filter(Boolean);

  if (authored.length > 1) return authored;

  const normalized = authored[0] ?? "";
  if (normalized.length < 560) return normalized ? [normalized] : [];

  const sentences = Array.from(sentenceSegmenter.segment(normalized), (part) =>
    part.segment.trim(),
  ).filter(Boolean);

  if (sentences.length < 4) return [normalized];

  const paragraphs: string[] = [];
  let current: string[] = [];
  let currentLength = 0;

  for (const sentence of sentences) {
    current.push(sentence);
    currentLength += sentence.length + 1;

    if (current.length >= 2 && currentLength >= 430) {
      paragraphs.push(current.join(" "));
      current = [];
      currentLength = 0;
    }
  }

  if (current.length) {
    const remainder = current.join(" ");
    if (remainder.length < 220 && paragraphs.length) {
      paragraphs[paragraphs.length - 1] += ` ${remainder}`;
    } else {
      paragraphs.push(remainder);
    }
  }

  return paragraphs;
}

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
        return articleParagraphs(text).map((paragraph, paragraphIndex) => (
          <p key={`${i}-${paragraphIndex}`}>{paragraph}</p>
        ));
      })}
    </div>
  );
}
