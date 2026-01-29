const HTML_ENTITY_PATTERN = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g;

const ENTITY_MAP: Record<string, string> = {
  "&amp;": "&",
  "&#38;": "&",
  "&lt;": "<",
  "&#60;": "<",
  "&gt;": ">",
  "&#62;": ">",
  "&apos;": "'",
  "&#39;": "'",
  "&quot;": '"',
  "&#34;": '"',
  "&nbsp;": " ",
  "&#160;": " ",
  "&copy;": "©",
  "&#169;": "©",
  "&reg;": "®",
  "&#174;": "®",
  "&hellip;": "…",
  "&#8230;": "…",
  "&#x2F;": "/",
  "&#47;": "/"
};

const replaceEntity = (entity: string): string => {
  return ENTITY_MAP[entity];
};

/**
 * Unescapes HTML entities in a string
 * @param text - The string containing HTML entities
 * @returns The unescaped string
 */
export const unescape = (text: string): string => {
  return text.replace(HTML_ENTITY_PATTERN, replaceEntity);
};