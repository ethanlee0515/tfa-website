import Link from "next/link";
import { CURRENT_ISSUE } from "@/lib/site";

type MastheadProps = {
  variant?: "light" | "dark";
  showTagline?: boolean;
  showIssue?: boolean;
  issueLabel?: string;
  asTitle?: boolean;
};

export function Masthead({
  variant = "light",
  showTagline = true,
  showIssue = true,
  issueLabel = CURRENT_ISSUE.label,
  asTitle = false,
}: MastheadProps) {
  const Title = asTitle ? "h1" : "p";
  return (
    <div className={variant === "dark" ? "text-tfa-paper" : "text-tfa-ink"}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-current/25 pb-3 font-display text-[10px] font-semibold tracking-[0.09em] uppercase sm:text-[11px]">
        <p>The Lawrenceville School</p>
        {showIssue && <p>{issueLabel}</p>}
      </div>
      <Link
        href="/"
        className="inline-block py-5 sm:py-6"
        aria-label="The First Amendment — home"
      >
        <Title className="font-serif text-[clamp(2.5rem,6.25vw,5.25rem)] leading-[1.04] font-semibold tracking-[-0.055em]">
          <span className="mr-[0.06em] font-normal italic">The</span> First
          Amendment<span className="text-tfa-red">.</span>
        </Title>
      </Link>
      {showTagline && (
        <p className="pb-5 font-display text-[11px] leading-relaxed text-tfa-muted sm:pb-6 sm:text-xs">
          A student publication on politics, economics, and the world we
          inherit.
        </p>
      )}
    </div>
  );
}
