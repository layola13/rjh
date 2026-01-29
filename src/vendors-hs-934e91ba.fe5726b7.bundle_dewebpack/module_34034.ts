const SURROGATES = "\\ud800-\\udfff";
const SURROGATE_CLASS = "[" + SURROGATES + "]";
const COMBINING_MARKS = "[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]";
const SKIN_TONE_MODIFIER = "\\ud83c[\\udffb-\\udfff]";
const NON_SURROGATE = "[^" + SURROGATES + "]";
const REGIONAL_INDICATOR = "(?:\\ud83c[\\udde6-\\uddff]){2}";
const SURROGATE_PAIR = "[\\ud800-\\udbff][\\udc00-\\udfff]";
const MODIFIER_GROUP = "(?:" + COMBINING_MARKS + "|" + SKIN_TONE_MODIFIER + ")" + "?";
const VARIATION_SELECTOR = "[\\ufe0e\\ufe0f]?";
const ZWJ_SEQUENCE = VARIATION_SELECTOR + MODIFIER_GROUP + 
  ("(?:\\u200d(?:" + [NON_SURROGATE, REGIONAL_INDICATOR, SURROGATE_PAIR].join("|") + ")" + VARIATION_SELECTOR + MODIFIER_GROUP + ")*");
const GRAPHEME_PATTERN = "(?:" + [
  NON_SURROGATE + COMBINING_MARKS + "?",
  COMBINING_MARKS,
  REGIONAL_INDICATOR,
  SURROGATE_PAIR,
  SURROGATE_CLASS
].join("|") + ")";
const GRAPHEME_REGEX = RegExp(
  SKIN_TONE_MODIFIER + "(?=" + SKIN_TONE_MODIFIER + ")|" + GRAPHEME_PATTERN + ZWJ_SEQUENCE,
  "g"
);

/**
 * Counts the number of Unicode grapheme clusters (user-perceived characters) in a string.
 * Handles emoji, combining marks, skin tone modifiers, and zero-width joiners correctly.
 * 
 * @param input - The string to count grapheme clusters in
 * @returns The count of grapheme clusters
 */
export function countGraphemeClusters(input: string): number {
  let count = 0;
  GRAPHEME_REGEX.lastIndex = 0;
  
  while (GRAPHEME_REGEX.test(input)) {
    ++count;
  }
  
  return count;
}