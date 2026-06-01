import { createClient } from "next-sanity";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-01-01";

export function isSanityConfigured(): boolean {
  return Boolean(projectId && projectId.length > 0);
}

export const client = createClient({
  projectId: projectId ?? "placeholder",
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});

/** Fresh reads for the public site (no CDN — deletes/publishes show up immediately). */
export const serverClient = createClient({
  projectId: projectId ?? "placeholder",
  dataset,
  apiVersion,
  useCdn: false,
  perspective: "published",
});

export const previewClient = createClient({
  projectId: projectId ?? "placeholder",
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
  perspective: "previewDrafts",
});
