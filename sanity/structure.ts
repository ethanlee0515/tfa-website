import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("The First Amendment")
    .items([
      S.listItem()
        .title("Site & About page")
        .id("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings"),
        ),
      S.divider(),
      S.documentTypeListItem("article").title("Articles"),
      S.documentTypeListItem("author").title("Authors"),
      S.documentTypeListItem("editor").title("Editors & board"),
    ]);
