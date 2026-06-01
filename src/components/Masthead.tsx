import Image from "next/image";
import Link from "next/link";
import { CURRENT_ISSUE } from "@/lib/site";

type MastheadProps = {
  variant?: "light" | "dark";
  showTagline?: boolean;
  showIssue?: boolean;
  issueLabel?: string;
};

const LOGO = {
  light: "/tfa-logo-transparent.png",
  dark: "/tfa-logo-white.png",
  width: 220,
  height: 220,
} as const;

export function Masthead({
  variant = "light",
  showTagline = true,
  showIssue = true,
  issueLabel,
}: MastheadProps) {
  const isDark = variant === "dark";
  const issue = issueLabel ?? CURRENT_ISSUE.label;

  return (
    <header className={isDark ? "text-white" : "text-tfa-ink"}>
      <Link
        href="/"
        className="group mx-auto flex max-w-2xl flex-col items-center"
        aria-label="The First Amendment — home"
      >
        {showIssue && (
          <p className="font-display text-[0.65rem] font-semibold tracking-[0.35em] text-tfa-red uppercase sm:text-xs">
            {issue}
          </p>
        )}

        <div className="mt-3">
          <Image
            src={isDark ? LOGO.dark : LOGO.light}
            alt=""
            width={LOGO.width}
            height={LOGO.height}
            className={`h-[4.5rem] w-auto object-contain sm:h-24 ${
              isDark ? "drop-shadow-[0_2px_20px_rgba(0,0,0,0.45)]" : ""
            }`}
            priority
            sizes="(max-width: 640px) 180px, 220px"
            aria-hidden
          />
        </div>

        <p
          className={`mt-4 text-center font-serif text-[1.65rem] font-semibold leading-none tracking-[0.02em] sm:text-3xl ${
            isDark ? "text-white" : "text-tfa-ink"
          }`}
        >
          The First Amendment
        </p>

        {showTagline && (
          <p
            className={`mt-3 text-center font-display text-[0.7rem] tracking-[0.2em] uppercase sm:text-xs ${
              isDark ? "text-white/75" : "text-tfa-muted"
            }`}
          >
            A student publication of The Lawrenceville School
          </p>
        )}
      </Link>
    </header>
  );
}
