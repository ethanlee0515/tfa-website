import type { BoardMember } from "@/lib/types";
import type { Editor } from "@/lib/types";
import type { SiteContent } from "@/lib/site-defaults";
import { serverClient } from "./client";
import {
  boardEditorsQuery,
  leadershipEditorsQuery,
  siteSettingsQuery,
} from "./site-queries";

const fetchOptions = { next: { tags: ["site"] as string[] } };

export async function fetchSiteSettings(): Promise<SiteContent | null> {
  try {
    return await serverClient.fetch<SiteContent | null>(
      siteSettingsQuery,
      {},
      fetchOptions,
    );
  } catch {
    return null;
  }
}

export async function fetchLeadershipEditors(): Promise<Editor[]> {
  try {
    return await serverClient.fetch<Editor[]>(
      leadershipEditorsQuery,
      {},
      fetchOptions,
    );
  } catch {
    return [];
  }
}

export async function fetchBoardEditors(): Promise<
  { title: string; members: BoardMember[] }[]
> {
  try {
    const rows = await serverClient.fetch<
      {
        name: string;
        role: string;
        classYear?: string;
        boardSection?: string;
      }[]
    >(boardEditorsQuery, {}, fetchOptions);

    if (!rows.length) return [];

    const order = [
      "Section Editors",
      "Senior Columnists",
      "Associates",
      "Graphics",
    ];
    const bySection = new Map<string, BoardMember[]>();
    for (const row of rows) {
      const title = row.boardSection ?? "Board";
      const members = bySection.get(title) ?? [];
      members.push({
        name: row.name,
        role: row.role,
        classYear: row.classYear,
      });
      bySection.set(title, members);
    }

    const sections = order
      .filter((title) => bySection.has(title))
      .map((title) => ({ title, members: bySection.get(title)! }));

    for (const [title, members] of bySection) {
      if (!order.includes(title)) sections.push({ title, members });
    }

    return sections;
  } catch {
    return [];
  }
}
