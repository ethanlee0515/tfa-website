import type { PortableTextBlock } from "@portabletext/types";
import type { BoardMember, Editor } from "./types";

export type SiteContent = {
  currentIssueLabel: string;
  homepageNote: {
    eyebrow: string;
    title: string;
    body: PortableTextBlock[];
    closing?: string;
    linkText: string;
  };
  aboutMission: {
    eyebrow: string;
    headline: string;
    body: PortableTextBlock[];
  };
  aboutLetter: {
    eyebrow: string;
    title: string;
    body: PortableTextBlock[];
    signoff?: string;
  };
  aboutSidebar: {
    publication: string;
    forWriters: string;
  };
  aboutLeadershipIntro: string;
  aboutBoardIntro: string;
};

function block(text: string, key: string): PortableTextBlock {
  return {
    _type: "block",
    _key: key,
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: `${key}-span`, text, marks: [] }],
  };
}

export const DEFAULT_SITE_CONTENT: SiteContent = {
  currentIssueLabel: "Spring Issue 2026",
  homepageNote: {
    eyebrow: "From the editors",
    title: "Why this issue matters",
    body: [
      block(
        "As Lawrentians analyze our world in a polarized political environment, this issue highlights diverse voices that illuminate the tensions of our time—and the ideas that might address them.",
        "hn1",
      ),
    ],
    closing: "Be empathetic, and love all.",
    linkText: "Meet the board →",
  },
  aboutMission: {
    eyebrow: "About the magazine",
    headline: "Student analysis on politics, economics, and the world we inherit.",
    body: [
      block(
        "The First Amendment is Lawrenceville's student-led political magazine. Each issue brings together reporting and argument across domestic policy, international affairs, economics, and features—written by Lawrentians for their peers.",
        "am1",
      ),
    ],
  },
  aboutLetter: {
    eyebrow: "From the editors",
    title: "A few words from the spring issue board",
    body: [
      block(
        "As we mark another year of publication, Lawrentians have lived through the unthinkable—government shutdowns, trade wars, escalating international conflicts, and some of the largest protests in American history. Tensions continue to rise on multiple fronts as students, families, and institutions navigate a polarized political environment.",
        "al1",
      ),
      block(
        "As Lawrentians bravely analyze our world's issues, each issue of The First Amendment highlights diverse voices that illuminate the tensions of our time and the ideas that might address them. We remain committed to freedom of expression and to the belief that all voices have a role in shaping our democracy.",
        "al2",
      ),
    ],
    signoff: "— Ethan Lee '27 & Jamie Ho '27, Editors-in-Chief",
  },
  aboutSidebar: {
    publication: "The Lawrenceville School",
    forWriters:
      "Interested in contributing? Reach out to any section editor or Editor-in-Chief through Lawrenceville email.",
  },
  aboutLeadershipIntro:
    "The board sets editorial standards, develops each issue, and works with writers from draft to publication.",
  aboutBoardIntro:
    "Section editors, senior columnists, associates, and graphics staff who bring each issue to print and to the web.",
};

export const DEFAULT_LEADERSHIP: Editor[] = [
  {
    name: "Ethan Lee",
    role: "Editor-in-Chief",
    classYear: "27",
    sortOrder: 1,
    photo: "/editors/eic-duo.png",
  },
  {
    name: "Jamie Ho",
    role: "Editor-in-Chief",
    classYear: "27",
    sortOrder: 2,
    photo: "/editors/eic-duo.png",
  },
  {
    name: "Katherine Qiu",
    role: "Executive Editor",
    classYear: "27",
    sortOrder: 3,
    photo: "/editors/katherine-qiu.png",
  },
  {
    name: "Darshan Chidambaram",
    role: "Executive Editor",
    classYear: "28",
    sortOrder: 4,
    photo: "/editors/darshan-chidambaram.png",
  },
];

export const DEFAULT_BOARD_SECTIONS: { title: string; members: BoardMember[] }[] =
  [
    {
      title: "Section Editors",
      members: [
        { name: "Rebecca Chen", role: "Features", classYear: "27" },
        { name: "Noah Strauss", role: "Domestic", classYear: "28" },
        { name: "Celestine Sutter", role: "Domestic", classYear: "27" },
        { name: "Yvonne Chen", role: "International", classYear: "28" },
        { name: "Angela Lo", role: "International", classYear: "27" },
        { name: "Karina Stakh", role: "Economics", classYear: "27" },
      ],
    },
    {
      title: "Senior Columnists",
      members: [
        { name: "Jillian Upton", role: "Senior Columnist", classYear: "27" },
        { name: "Madisen Kim", role: "Senior Columnist", classYear: "27" },
      ],
    },
    {
      title: "Associates",
      members: [
        { name: "Aiden Shou", role: "Associate", classYear: "28" },
        { name: "Dhruv Soni", role: "Associate", classYear: "28" },
        { name: "Sawyer Nordberg", role: "Associate", classYear: "29" },
      ],
    },
    {
      title: "Graphics",
      members: [
        { name: "Teri Kim", role: "Graphics Editor", classYear: "27" },
        { name: "Jennifer Kim", role: "Graphics Associate", classYear: "28" },
        { name: "Bella Wu", role: "Graphics Associate", classYear: "28" },
        { name: "Kate Wei", role: "Graphics Associate", classYear: "28" },
      ],
    },
  ];
