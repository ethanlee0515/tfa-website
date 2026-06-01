export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  currentIssueLabel,
  homepageNote {
    eyebrow,
    title,
    body,
    closing,
    linkText
  },
  aboutMission {
    eyebrow,
    headline,
    body
  },
  aboutLetter {
    eyebrow,
    title,
    body,
    signoff
  },
  aboutSidebar {
    publication,
    forWriters
  },
  aboutLeadershipIntro,
  aboutBoardIntro
}`;

export const leadershipEditorsQuery = `*[_type == "editor" && profile == "leadership"] | order(sortOrder asc) {
  _id,
  name,
  role,
  classYear,
  sortOrder,
  "photo": coalesce(photo.asset->url, photoUrl)
}`;

export const boardEditorsQuery = `*[_type == "editor" && profile == "board"] | order(boardSection asc, sortOrder asc) {
  name,
  role,
  classYear,
  boardSection,
  sortOrder
}`;
