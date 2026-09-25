import type { BoardMember } from "@/lib/types";

function formatName(member: BoardMember) {
  return member.classYear ? `${member.name} '${member.classYear}` : member.name;
}

export function BoardRoster({
  sections,
}: {
  sections: { title: string; members: BoardMember[] }[];
}) {
  return (
    <div className="divide-y divide-tfa-ink/20 border-t border-tfa-ink/20">
      {sections.map((section) => (
        <section
          key={section.title}
          className="grid gap-5 py-7 sm:grid-cols-[180px_1fr] sm:gap-8 sm:py-8"
        >
          <h3 className="eyebrow text-tfa-muted sm:pt-1">{section.title}</h3>
          <ul className="grid gap-x-8 gap-y-5 min-[480px]:grid-cols-2">
            {section.members.map((member) => (
              <li key={`${section.title}-${member.name}`} className="min-w-0">
                <span className="font-serif text-lg leading-snug text-tfa-ink">
                  {formatName(member)}
                </span>
                <span className="mt-1 block font-display text-[0.6875rem] leading-relaxed text-tfa-muted">
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
