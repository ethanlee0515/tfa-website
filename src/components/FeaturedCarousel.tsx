"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type TouchEvent,
} from "react";
import type { Article } from "@/lib/types";
import { CURRENT_ISSUE } from "@/lib/site";
import { formatAuthors, formatDate } from "@/lib/format";
import { HeroCover } from "./HeroCover";
import { SECTION_LABELS, type Section } from "@/lib/types";

const AUTO_ADVANCE_MS = 9000;
const SWIPE_THRESHOLD = 48;

function FeaturedSlide({ article }: { article: Article }) {
  return (
    <div className="grid min-h-0 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,280px)] lg:items-end lg:gap-10">
      <div className="min-w-0 border-l-4 border-tfa-red bg-tfa-black/40 py-2 pl-5 backdrop-blur-sm sm:pl-7">
        <p className="font-display text-[0.65rem] font-semibold tracking-[0.3em] text-tfa-red uppercase">
          {CURRENT_ISSUE.label} · Featured
          <span className="mx-2 text-white/25">·</span>
          {SECTION_LABELS[article.section as Section]}
        </p>
        <h2 className="mt-4 font-serif text-3xl leading-[1.1] font-semibold sm:text-4xl lg:text-[2.65rem]">
          <Link href={`/article/${article.slug}`} className="hover:text-white/90">
            {article.title}
          </Link>
        </h2>
        <p className="mt-4 line-clamp-4 text-base leading-relaxed text-white/85 sm:text-lg">
          {article.deck}
        </p>
        <p className="mt-4 font-display text-xs tracking-[0.12em] text-white/55 uppercase">
          {formatAuthors(article.authors)}
          {formatAuthors(article.authors) && (
            <span className="mx-3 text-white/25">|</span>
          )}
          {formatDate(article.publishedAt)}
        </p>
        <Link
          href={`/article/${article.slug}`}
          className="mt-7 inline-flex items-center gap-2 border border-white/35 bg-tfa-red px-6 py-3 font-display text-xs font-semibold tracking-[0.2em] uppercase transition-colors hover:bg-white hover:text-tfa-black"
        >
          Read the story
          <span aria-hidden>→</span>
        </Link>
      </div>

      {article.image && (
        <div className="hidden justify-end lg:flex">
          <div className="w-full max-w-[280px]">
            <div className="relative aspect-square overflow-hidden border border-white/20 shadow-2xl">
              <Image
                src={article.image}
                alt={article.imageAlt ?? article.title}
                fill
                className="object-cover"
                sizes="280px"
                priority
              />
            </div>
            {article.imageCredit && (
              <p className="mt-2 text-right font-display text-[0.55rem] tracking-wider text-white/50 uppercase">
                {article.imageCredit}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function FeaturedCarousel({
  articles,
  children,
}: {
  articles: Article[];
  children: ReactNode;
}) {
  const slides = articles.length > 0 ? articles : [];
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const count = slides.length;

  const goTo = useCallback(
    (next: number) => {
      if (count <= 1) return;
      setIndex((next + count) % count);
    },
    [count],
  );

  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);
  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (count <= 1) return;
    const timer = window.setInterval(goNext, AUTO_ADVANCE_MS);
    return () => window.clearInterval(timer);
  }, [count, goNext, index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  const onTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (e: TouchEvent) => {
    if (touchStartX.current === null || count <= 1) return;
    const delta = e.changedTouches[0]?.clientX - touchStartX.current;
    touchStartX.current = null;
    if (delta === undefined) return;
    if (delta < -SWIPE_THRESHOLD) goNext();
    else if (delta > SWIPE_THRESHOLD) goPrev();
  };

  const active = slides[index] ?? slides[0];

  return (
    <section
      className="relative min-h-[90vh] bg-tfa-black text-white"
      aria-roledescription="carousel"
      aria-label="Featured stories"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="absolute inset-0">
        <Image
          src={CURRENT_ISSUE.coverImage}
          alt={CURRENT_ISSUE.coverAlt}
          fill
          priority
          className="object-cover object-top opacity-70 transition-opacity duration-700"
          sizes="100vw"
        />
        <HeroCover />
        <div className="absolute inset-0 bg-gradient-to-r from-tfa-black via-tfa-black/88 to-tfa-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-tfa-black via-tfa-black/45 to-transparent" />
      </div>

      <div className="relative z-10 flex min-h-[90vh] flex-col">
        <div className="mx-auto w-full max-w-6xl px-4 pt-8 sm:px-6 sm:pt-10">
          {children}
        </div>

        <div className="mx-auto mt-auto w-full max-w-6xl px-4 pb-10 sm:px-6 sm:pb-14">
          {active && (
            <div key={active.slug} className="featured-slide-enter" aria-live="polite">
              <FeaturedSlide article={active} />
            </div>
          )}

          {count > 1 && (
            <div className="mt-8 flex items-center justify-between gap-4 border-t border-white/10 pt-6">
              <div className="flex items-center gap-2">
                {slides.map((slide, i) => (
                  <button
                    key={slide.slug}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Show featured story: ${slide.title}`}
                    aria-current={i === index ? "true" : undefined}
                    className={`h-2 rounded-full transition-all ${
                      i === index
                        ? "w-8 bg-tfa-red"
                        : "w-2 bg-white/35 hover:bg-white/55"
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="Previous featured story"
                  className="flex h-10 w-10 items-center justify-center border border-white/25 font-display text-sm text-white/80 transition-colors hover:border-white hover:bg-white/10"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Next featured story"
                  className="flex h-10 w-10 items-center justify-center border border-white/25 font-display text-sm text-white/80 transition-colors hover:border-white hover:bg-white/10"
                >
                  →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
