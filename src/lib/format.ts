import type { Author } from "./types";

export function formatAuthors(authors: Author[]): string {
  if (!authors.length) return "";
  return authors
    .map((a) => (a.classYear ? `${a.name} '${a.classYear}` : a.name))
    .join(", ");
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
