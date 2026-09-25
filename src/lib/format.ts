import type { Author } from "./types";

export function formatAuthors(authors: Author[] | null | undefined): string {
  if (!authors?.length) return "";
  return authors
    .filter((author) => author?.name)
    .map((a) => (a.classYear ? `${a.name} '${a.classYear}` : a.name))
    .join(", ");
}

export function formatDate(iso: string | null | undefined): string {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
