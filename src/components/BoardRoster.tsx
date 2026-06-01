import type { BoardMember } from "@/lib/types";

function formatName(member: BoardMember) {
  return member.classYear
    ? `${member.name} '${member.classYear}`
    : member.name;
}

export function BoardRoster({
  sections,
}: {
  sections: { title: string; members: BoardMember[] }[];
}) {
  return (
    <div className="divide-y divide-tfa-ink/10 border-y border-tfa-ink/10">
      {sections.map((section) => (
        <section key={section.title} className="py-10 first:pt-0 last:pb-0">
          <h2 className="font-display text-xs font-semibold tracking-[0.22em] text-tfa-muted uppercase">
            {section.title}
          </h2>
          <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {section.members.map((member) => (
              <li
                key={`${section.title}-${member.name}`}
                className="flex items-baseline justify-between gap-4 border-b border-tfa-ink/5 pb-4 sm:block sm:border-0 sm:pb-0"
              >
                <span className="font-serif text-base text-tfa-ink">
                  {formatName(member)}
                </span>
                <span className="shrink-0 font-display text-[0.62rem] tracking-[0.14em] text-tfa-muted uppercase sm:mt-1 sm:block">
                  {member.role}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
