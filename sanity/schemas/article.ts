import { defineField, defineType } from "sanity";

export const article = defineType({
  name: "article",
  title: "Article",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "deck", type: "text", rows: 3 }),
    defineField({
      name: "section",
      type: "string",
      options: {
        list: [
          { title: "Domestic", value: "domestic" },
          { title: "International", value: "international" },
          { title: "Economics", value: "economics" },
          { title: "Features", value: "features" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "authors",
      type: "array",
      of: [{ type: "reference", to: [{ type: "author" }] }],
    }),
    defineField({ name: "heroImage", type: "image", options: { hotspot: true } }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      description:
        "Article text. Use the + menu to insert a **Pull quote** block anywhere you want a highlighted sentence (1–2 per article, like the print layout).",
      of: [{ type: "block" }, { type: "pullQuote" }],
    }),
    defineField({ name: "publishedAt", type: "datetime" }),
    defineField({ name: "isFeatured", type: "boolean", initialValue: false }),
    defineField({
      name: "status",
      type: "string",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "Published", value: "published" },
        ],
      },
      initialValue: "draft",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "section", media: "heroImage" },
  },
});
