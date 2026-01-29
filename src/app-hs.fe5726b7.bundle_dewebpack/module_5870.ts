const SURROGATE_PAIR_RANGE = "\\ud800-\\udfff";
const SURROGATE_PAIR_CLASS = "[" + SURROGATE_PAIR_RANGE + "]";
const COMBINING_DIACRITICAL_MARKS = "[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]";
const SKIN_TONE_MODIFIER = "\\ud83c[\\udffb-\\udfff]";
const NON_SURROGATE_CHAR = "[^" + SURROGATE_PAIR_RANGE + "]";
const REGIONAL_INDICATOR_PAIR = "(?:\\ud83c[\\udde6-\\uddff]){2}";
const SURROGATE_PAIR = "[\\ud800-\\udbff][\\udc00-\\udfff]";
const OPTIONAL_MODIFIER = "(?:" + COMBINING_DIACRITICAL_MARKS + "|" + SKIN_TONE_MODIFIER + ")?";
const VARIATION_SELECTOR = "[\\ufe0e\\ufe0f]?";
const ZWJ_SEQUENCE = VARIATION_SELECTOR + OPTIONAL_MODIFIER + "(?:\\u200d(?:" + [
  NON_SURROGATE_CHAR,
  REGIONAL_INDICATOR_PAIR,
  SURROGATE_PAIR
].join("|") + ")" + VARIATION_SELECTOR + OPTIONAL_MODIFIER + ")*";
const GRAPHEME_PATTERN = "(?:" + [
  NON_SURROGATE_CHAR + COMBINING_DIACRITICAL_MARKS + "?",
  COMBINING_DIACRITICAL_MARKS,
  REGIONAL_INDICATOR_PAIR,
  SURROGATE_PAIR,
  SURROGATE_PAIR_CLASS
].join("|") + ")";
const GRAPHEME_REGEX = new RegExp(
  SKIN_TONE_MODIFIER + "(?=" + SKIN_TONE_MODIFIER + ")|" + GRAPHEME_PATTERN + ZWJ_SEQUENCE,
  "g"
);

/**
 * Counts the number of Unicode grapheme clusters in a string.
 * Handles complex characters including emojis, combining marks, and zero-width joiners.
 * 
 * @param text - The input string to count graphemes in
 * @returns The number of grapheme clusters in the string
 */
export function countGraphemes(text: string): number {
  let count = 0;
  GRAPHEME_REGEX.lastIndex = 0;
  
  while (GRAPHEME_REGEX.test(text)) {
    ++count;
  }
  
  return count;
}

export default countGraphemes;