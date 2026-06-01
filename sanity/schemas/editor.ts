import { defineField, defineType } from "sanity";

export const editor = defineType({
  name: "editor",
  title: "Editor / board member",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", type: "string", validation: (r) => r.required() }),
    defineField({ name: "classYear", type: "string" }),
    defineField({
      name: "profile",
      title: "Profile type",
      type: "string",
      options: {
        list: [
          { title: "Leadership (photos on About)", value: "leadership" },
          { title: "Board roster (list only)", value: "board" },
        ],
      },
      initialValue: "board",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "boardSection",
      title: "Board section",
      type: "string",
      description: "For board roster members only.",
      options: {
        list: [
          "Section Editors",
          "Senior Columnists",
          "Associates",
          "Graphics",
        ],
      },
      hidden: ({ parent }) => parent?.profile !== "board",
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      description: "Upload a headshot, or use Photo URL below.",
    }),
    defineField({
      name: "photoUrl",
      title: "Photo URL",
      type: "string",
      description: "Local path, e.g. /editors/eic-duo.png (used if no upload).",
    }),
    defineField({ name: "bio", type: "text", rows: 3 }),
    defineField({
      name: "sortOrder",
      title: "Sort order",
      type: "number",
      description: "Lower numbers appear first.",
    }),
    defineField({ name: "email", type: "string" }),
  ],
  orderings: [
    {
      title: "Sort order",
      name: "sortOrderAsc",
      by: [{ field: "sortOrder", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "photo" },
  },
});
