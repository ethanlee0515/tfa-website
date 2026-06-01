export type Section = "domestic" | "international" | "economics" | "features";

export const SECTIONS: Section[] = [
  "domestic",
  "international",
  "economics",
  "features",
];

export const SECTION_LABELS: Record<Section, string> = {
  domestic: "Domestic",
  international: "International",
  economics: "Economics",
  features: "Features",
};

export type Article = {
  _id: string;
  title: string;
  slug: string;
  deck: string;
  section: Section;
  authors: Author[];
  publishedAt: string;
  body: ArticleBlock[];
  image?: string;
  imageAlt?: string;
  imageCredit?: string;
  isFeatured?: boolean;
};

export const SECTION_ACCENT: Record<
  Section,
  { bar: string; bg: string; text: string }
> = {
  domestic: {
    bar: "bg-tfa-red",
    bg: "bg-tfa-red/5",
    text: "text-tfa-red",
  },
  international: {
    bar: "bg-tfa-blue",
    bg: "bg-tfa-blue/5",
    text: "text-tfa-blue",
  },
  economics: {
    bar: "bg-amber-700",
    bg: "bg-amber-700/5",
    text: "text-amber-800",
  },
  features: {
    bar: "bg-tfa-charcoal",
    bg: "bg-tfa-charcoal/5",
    text: "text-tfa-charcoal",
  },
};

export type ArticleBlock =
  | { _type: "block"; style?: string; children: { text: string }[] }
  | { _type: "pullQuote"; text: string };

export type Author = {
  name: string;
  classYear?: string;
};

export type Editor = {
  name: string;
  role: string;
  classYear?: string;
  bio?: string;
  photo?: string;
  sortOrder: number;
};

export type BoardMember = {
  name: string;
  role: string;
  classYear?: string;
};
