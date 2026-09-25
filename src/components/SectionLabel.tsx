import { SECTION_LABELS, type Section } from "@/lib/types";

export function SectionLabel({
  section,
  className = "",
}: {
  section: Section;
  className?: string;
}) {
  return (
    <span className={`eyebrow text-tfa-red ${className}`}>
      {SECTION_LABELS[section]}
    </span>
  );
}
