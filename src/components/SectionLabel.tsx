import { SECTION_LABELS, type Section } from "@/lib/types";

export function SectionLabel({
  section,
  className = "",
}: {
  section: Section;
  className?: string;
}) {
  return (
    <span
      className={`font-display text-[0.65rem] font-semibold tracking-[0.22em] text-tfa-red uppercase sm:text-xs ${className}`}
    >
      {SECTION_LABELS[section]}
    </span>
  );
}
