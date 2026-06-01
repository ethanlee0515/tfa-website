import { defineField, defineType } from "sanity";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name" },
    }),
    defineField({ name: "classYear", type: "string", title: "Class year (e.g. 27)" }),
    defineField({ name: "bio", type: "text" }),
    defineField({ name: "photo", type: "image" }),
  ],
});
