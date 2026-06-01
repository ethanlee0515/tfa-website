import type { BoardMember, Editor } from "./types";

export type { BoardMember, Editor };

export {
  DEFAULT_BOARD_SECTIONS as BOARD_SECTIONS,
  DEFAULT_LEADERSHIP as EDITORS,
} from "./site-defaults";

/** @deprecated Prefer filtering editors by role === "Editor-in-Chief". */
export const EIC_NAMES = ["Ethan Lee", "Jamie Ho"];

export function isEditorInChief(editor: Editor): boolean {
  return editor.role === "Editor-in-Chief";
}
