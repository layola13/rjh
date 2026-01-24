/**
 * Unicode whitespace characters collection
 * 
 * This module exports a string containing all Unicode whitespace characters
 * used for text processing, parsing, and normalization operations.
 * 
 * @module whitespace-characters
 */

/**
 * A string containing all Unicode whitespace characters including:
 * - ASCII whitespace: tab (\t), newline (\n), vertical tab (\v), form feed (\f), carriage return (\r), space
 * - Unicode whitespace: non-breaking spaces, Mongolian vowel separator, zero-width spaces, etc.
 * - Line/paragraph separators: \u2028 (line separator), \u2029 (paragraph separator)
 * - Special: \ufeff (zero-width no-break space / BOM)
 * 
 * Character breakdown:
 * - \t (U+0009): Horizontal tab
 * - \n (U+000A): Line feed
 * - \v (U+000B): Vertical tab
 * - \f (U+000C): Form feed
 * - \r (U+000D): Carriage return
 * - ' ' (U+0020): Space
 * - \u00A0: Non-breaking space
 * - \u1680: Ogham space mark
 * - \u180E: Mongolian vowel separator
 * - \u2000-\u200A: Various width spaces (en quad, em quad, en space, em space, etc.)
 * - \u2028: Line separator
 * - \u2029: Paragraph separator
 * - \u202F: Narrow no-break space
 * - \u205F: Medium mathematical space
 * - \u3000: Ideographic space
 * - \uFEFF: Zero-width no-break space (Byte Order Mark)
 */
declare const whitespaceCharacters: "\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff";

export default whitespaceCharacters;