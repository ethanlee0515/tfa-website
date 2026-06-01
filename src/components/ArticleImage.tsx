import Image from "next/image";
import type { Article } from "@/lib/types";

export function ArticleImage({
  article,
  priority = false,
  className = "",
  aspectClass = "aspect-[16/10] sm:aspect-[2/1]",
}: {
  article: Pick<Article, "image" | "imageAlt" | "imageCredit" | "title">;
  priority?: boolean;
  className?: string;
  aspectClass?: string;
}) {
  if (!article.image) return null;

  return (
    <figure className={className}>
      <div className={`relative overflow-hidden bg-tfa-charcoal/10 ${aspectClass}`}>
        <Image
          src={article.image}
          alt={article.imageAlt ?? article.title}
          fill
          priority={priority}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
      </div>
      {article.imageCredit && (
        <figcaption className="mt-2 font-display text-[0.6rem] tracking-wider text-tfa-muted uppercase">
          Illustration: {article.imageCredit}
        </figcaption>
      )}
    </figure>
  );
}
