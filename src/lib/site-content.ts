import type { PortableTextBlock } from "@portabletext/types";
import type { BoardMember } from "./editors";
import { isSanityConfigured } from "@/sanity/lib/client";
import {
  fetchBoardEditors,
  fetchLeadershipEditors,
  fetchSiteSettings,
} from "@/sanity/lib/fetch-site";
import {
  DEFAULT_BOARD_SECTIONS,
  DEFAULT_LEADERSHIP,
  DEFAULT_SITE_CONTENT,
  type SiteContent,
} from "./site-defaults";
import type { Editor } from "./types";

function hasBlocks(blocks?: PortableTextBlock[] | null): boolean {
  return Boolean(blocks?.length);
}

function mergeSiteContent(
  remote: Partial<SiteContent> | null,
): SiteContent {
  if (!remote) return DEFAULT_SITE_CONTENT;

  return {
    currentIssueLabel:
      remote.currentIssueLabel ?? DEFAULT_SITE_CONTENT.currentIssueLabel,
    homepageNote: {
      eyebrow:
        remote.homepageNote?.eyebrow ?? DEFAULT_SITE_CONTENT.homepageNote.eyebrow,
      title:
        remote.homepageNote?.title ?? DEFAULT_SITE_CONTENT.homepageNote.title,
      body: hasBlocks(remote.homepageNote?.body)
        ? remote.homepageNote!.body!
        : DEFAULT_SITE_CONTENT.homepageNote.body,
      closing:
        remote.homepageNote?.closing ?? DEFAULT_SITE_CONTENT.homepageNote.closing,
      linkText:
        remote.homepageNote?.linkText ??
        DEFAULT_SITE_CONTENT.homepageNote.linkText,
    },
    aboutMission: {
      eyebrow:
        remote.aboutMission?.eyebrow ?? DEFAULT_SITE_CONTENT.aboutMission.eyebrow,
      headline:
        remote.aboutMission?.headline ??
        DEFAULT_SITE_CONTENT.aboutMission.headline,
      body: hasBlocks(remote.aboutMission?.body)
        ? remote.aboutMission!.body!
        : DEFAULT_SITE_CONTENT.aboutMission.body,
    },
    aboutLetter: {
      eyebrow:
        remote.aboutLetter?.eyebrow ?? DEFAULT_SITE_CONTENT.aboutLetter.eyebrow,
      title:
        remote.aboutLetter?.title ?? DEFAULT_SITE_CONTENT.aboutLetter.title,
      body: hasBlocks(remote.aboutLetter?.body)
        ? remote.aboutLetter!.body!
        : DEFAULT_SITE_CONTENT.aboutLetter.body,
      signoff:
        remote.aboutLetter?.signoff ?? DEFAULT_SITE_CONTENT.aboutLetter.signoff,
    },
    aboutSidebar: {
      publication:
        remote.aboutSidebar?.publication ??
        DEFAULT_SITE_CONTENT.aboutSidebar.publication,
      forWriters:
        remote.aboutSidebar?.forWriters ??
        DEFAULT_SITE_CONTENT.aboutSidebar.forWriters,
    },
    aboutLeadershipIntro:
      remote.aboutLeadershipIntro ??
      DEFAULT_SITE_CONTENT.aboutLeadershipIntro,
    aboutBoardIntro:
      remote.aboutBoardIntro ?? DEFAULT_SITE_CONTENT.aboutBoardIntro,
  };
}

export async function getSiteContent(): Promise<SiteContent> {
  if (isSanityConfigured()) {
    const remote = await fetchSiteSettings();
    if (remote) return mergeSiteContent(remote);
  }
  return DEFAULT_SITE_CONTENT;
}

export async function getLeadershipEditors(): Promise<Editor[]> {
  if (isSanityConfigured()) {
    const remote = await fetchLeadershipEditors();
    if (remote.length > 0) return remote;
  }
  return DEFAULT_LEADERSHIP;
}

export async function getBoardSections(): Promise<
  { title: string; members: BoardMember[] }[]
> {
  if (isSanityConfigured()) {
    const remote = await fetchBoardEditors();
    if (remote.length > 0) return remote;
  }
  return DEFAULT_BOARD_SECTIONS;
}

/** Issue label for masthead / About — prefers Sanity when configured. */
export async function getCurrentIssueLabel(): Promise<string> {
  const content = await getSiteContent();
  return content.currentIssueLabel;
}
