"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SECTIONS, SECTION_LABELS } from "@/lib/types";

export function SiteNav({ variant = "light" }: { variant?: "light" | "dark" }) {
  const pathname = usePathname();
  const links = [
    ...SECTIONS.map((section) => ({
      href: `/${section}`,
      label: SECTION_LABELS[section],
    })),
    { href: "/about", label: "About the publication" },
    { href: "/login", label: "Editors" },
  ];
  return (
    <nav
      aria-label="Sections"
      className={`border-t-2 border-b border-t-current border-b-current/30 ${variant === "dark" ? "text-tfa-paper" : "text-tfa-ink"}`}
    >
      <ul className="flex flex-wrap gap-x-5 font-display text-xs font-semibold sm:gap-x-8">
        {links.map(({ href, label }) => (
          <li
            key={href}
            className={href === "/about" ? "sm:ml-auto" : undefined}
          >
            <Link
              href={href}
              aria-current={pathname === href ? "page" : undefined}
              className={`inline-flex min-h-11 items-center border-b-2 pt-0.5 hover:text-tfa-red ${pathname === href ? "border-tfa-red text-tfa-red" : "border-transparent"}`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
