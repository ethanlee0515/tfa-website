import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site & About page",
  type: "document",
  fields: [
    defineField({
      name: "currentIssueLabel",
      title: "Current issue label",
      type: "string",
      description: 'Shown on the About page and masthead, e.g. "Spring Issue 2026".',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "homepageNote",
      title: "Homepage — Why this issue matters",
      type: "object",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow label",
          type: "string",
          initialValue: "From the editors",
        }),
        defineField({
          name: "title",
          title: "Heading",
          type: "string",
          initialValue: "Why this issue matters",
          validation: (r) => r.required(),
        }),
        defineField({
          name: "body",
          title: "Body",
          type: "array",
          of: [{ type: "block" }],
          description: "One or two short paragraphs.",
        }),
        defineField({
          name: "closing",
          title: "Closing line",
          type: "string",
          description: "Optional italic sign-off, e.g. “Be empathetic, and love all.”",
        }),
        defineField({
          name: "linkText",
          title: "Link text",
          type: "string",
          initialValue: "Meet the board →",
        }),
      ],
    }),
    defineField({
      name: "aboutMission",
      title: "About — Mission band",
      type: "object",
      options: { collapsible: true },
      fields: [
        defineField({
          name: "eyebrow",
          type: "string",
          initialValue: "About the magazine",
        }),
        defineField({
          name: "headline",
          type: "string",
          validation: (r) => r.required(),
        }),
        defineField({
          name: "body",
          type: "array",
          of: [{ type: "block" }],
        }),
      ],
    }),
    defineField({
      name: "aboutLetter",
      title: "About — Editors' letter",
      type: "object",
      options: { collapsible: true },
      fields: [
        defineField({
          name: "eyebrow",
          type: "string",
          initialValue: "From the editors",
        }),
        defineField({
          name: "title",
          type: "string",
          description: 'e.g. "A few words from the spring issue board"',
        }),
        defineField({
          name: "body",
          type: "array",
          of: [{ type: "block" }],
        }),
        defineField({
          name: "signoff",
          type: "string",
          description: 'e.g. "— Ethan Lee \'27 & Jamie Ho \'27, Editors-in-Chief"',
        }),
      ],
    }),
    defineField({
      name: "aboutSidebar",
      title: "About — At a glance sidebar",
      type: "object",
      options: { collapsible: true },
      fields: [
        defineField({
          name: "publication",
          title: "Publication",
          type: "string",
          initialValue: "The Lawrenceville School",
        }),
        defineField({
          name: "forWriters",
          title: "For writers",
          type: "text",
          rows: 3,
        }),
      ],
    }),
    defineField({
      name: "aboutLeadershipIntro",
      title: "About — Leadership intro",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "aboutBoardIntro",
      title: "About — Board roster intro",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "contactEmail",
      title: "Contact email (optional)",
      type: "string",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site & About page" };
    },
  },
});
