import Link from "next/link";
import { SECTIONS, SECTION_LABELS, type Section } from "@/lib/types";

export function SiteNav({ variant = "light" }: { variant?: "light" | "dark" }) {
  const isDark = variant === "dark";

  return (
    <nav
      className={`border-y ${
        isDark ? "border-white/20" : "border-tfa-ink/10"
      }`}
      aria-label="Sections"
    >
      <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 py-3 font-display text-[0.7rem] font-semibold tracking-[0.18em] uppercase sm:gap-x-10 sm:text-xs">
        {SECTIONS.map((section: Section) => (
          <li key={section}>
            <Link
              href={`/${section}`}
              className={`transition-colors hover:text-tfa-red ${
                isDark ? "text-white/90" : "text-tfa-ink"
              }`}
            >
              {SECTION_LABELS[section]}
            </Link>
          </li>
        ))}
        <li>
          <Link
            href="/about"
            className={`transition-colors hover:text-tfa-red ${
              isDark ? "text-white/90" : "text-tfa-ink"
            }`}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/login"
            className={`transition-colors hover:text-tfa-red ${
              isDark ? "text-white/70" : "text-tfa-muted"
            }`}
          >
            Editors
          </Link>
        </li>
      </ul>
    </nav>
  );
}
