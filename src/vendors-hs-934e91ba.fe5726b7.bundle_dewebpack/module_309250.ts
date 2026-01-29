const SURROGATE_PAIRS = '\\ud800-\\udfff';
const MISC_SYMBOLS = '\\u2700-\\u27bf';
const LOWERCASE_LETTERS = 'a-z\\xdf-\\xf6\\xf8-\\xff';
const UPPERCASE_LETTERS = 'A-Z\\xc0-\\xd6\\xd8-\\xde';
const WHITESPACE_AND_PUNCTUATION = '\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000';

const WHITESPACE_CLASS = `[${WHITESPACE_AND_PUNCTUATION}]`;
const DIGITS = '\\d+';
const MISC_SYMBOL_CLASS = `[${MISC_SYMBOLS}]`;
const LOWERCASE_CLASS = `[${LOWERCASE_LETTERS}]`;
const NON_WORD_CHAR = `[^${SURROGATE_PAIRS}${WHITESPACE_AND_PUNCTUATION}${DIGITS}${MISC_SYMBOLS}${LOWERCASE_LETTERS}${UPPERCASE_LETTERS}]`;
const REGIONAL_INDICATOR = '(?:\\ud83c[\\udde6-\\uddff]){2}';
const SURROGATE_PAIR = '[\\ud800-\\udbff][\\udc00-\\udfff]';
const UPPERCASE_CLASS = `[${UPPERCASE_LETTERS}]`;
const LOWERCASE_SEQUENCE = `(?:${LOWERCASE_CLASS}|${NON_WORD_CHAR})`;
const UPPERCASE_SEQUENCE = `(?:${UPPERCASE_CLASS}|${NON_WORD_CHAR})`;
const LOWERCASE_CONTRACTION = "(?:[''](?:d|ll|m|re|s|t|ve))?";
const UPPERCASE_CONTRACTION = "(?:[''](?:D|LL|M|RE|S|T|VE))?";
const COMBINING_MARKS = "(?:[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]|\\ud83c[\\udffb-\\udfff])?";
const VARIATION_SELECTOR = '[\\ufe0e\\ufe0f]?';
const EMOJI_MODIFIER = VARIATION_SELECTOR + COMBINING_MARKS + `(?:\\u200d(?:${['[^' + SURROGATE_PAIRS + ']', REGIONAL_INDICATOR, SURROGATE_PAIR].join('|')})${VARIATION_SELECTOR}${COMBINING_MARKS})*`;
const EMOJI_SEQUENCE = `(?:${[MISC_SYMBOL_CLASS, REGIONAL_INDICATOR, SURROGATE_PAIR].join('|')})${EMOJI_MODIFIER}`;

const WORD_PATTERN = RegExp(
  [
    `${UPPERCASE_CLASS}?${LOWERCASE_CLASS}+${LOWERCASE_CONTRACTION}(?=${[WHITESPACE_CLASS, UPPERCASE_CLASS, '$'].join('|')})`,
    `${UPPERCASE_SEQUENCE}+${UPPERCASE_CONTRACTION}(?=${[WHITESPACE_CLASS, UPPERCASE_CLASS + LOWERCASE_SEQUENCE, '$'].join('|')})`,
    `${UPPERCASE_CLASS}?${LOWERCASE_SEQUENCE}+${LOWERCASE_CONTRACTION}`,
    `${UPPERCASE_CLASS}+${UPPERCASE_CONTRACTION}`,
    "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])",
    "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])",
    DIGITS,
    EMOJI_SEQUENCE
  ].join('|'),
  'g'
);

/**
 * Splits a string into an array of words, including support for Unicode characters,
 * emojis, contractions, and ordinal numbers.
 *
 * @param text - The input string to split into words
 * @returns An array of word tokens, or an empty array if no matches found
 */
export function words(text: string): string[] {
  return text.match(WORD_PATTERN) ?? [];
}