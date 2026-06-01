import { defineField, defineType } from "sanity";

export const pullQuote = defineType({
  name: "pullQuote",
  title: "Pull quote",
  type: "object",
  description:
    "A highlighted sentence or two shown large in the middle of the article (like the print magazine). Use 1–2 per story.",
  fields: [
    defineField({
      name: "text",
      title: "Quote text",
      type: "text",
      rows: 3,
      description: "1–2 sentences copied from the article body. Do not include quotation marks.",
      validation: (r) => r.required().max(320),
    }),
  ],
  preview: {
    select: { text: "text" },
    prepare({ text }) {
      const preview = text?.slice(0, 72) ?? "";
      return {
        title: "Pull quote",
        subtitle: preview + (text && text.length > 72 ? "…" : ""),
      };
    },
  },
});
