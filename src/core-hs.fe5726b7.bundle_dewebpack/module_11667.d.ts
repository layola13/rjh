/**
 * White space characters collection
 * 
 * This module exports a string containing all Unicode whitespace characters
 * commonly used in JavaScript string processing and parsing operations.
 * 
 * Includes:
 * - \t (U+0009) - Horizontal Tab
 * - \n (U+000A) - Line Feed
 * - \v (U+000B) - Vertical Tab
 * - \f (U+000C) - Form Feed
 * - \r (U+000D) - Carriage Return
 * - Space characters (U+0020, U+00A0, U+1680, U+2000-U+200A, U+202F, U+205F, U+3000)
 * - U+2028 - Line Separator
 * - U+2029 - Paragraph Separator
 * - U+FEFF - Zero Width No-Break Space (BOM)
 * 
 * @module WhitespaceCharacters
 */

/**
 * A string containing all standard whitespace characters
 * Used for whitespace detection, trimming, and parsing operations
 */
declare const whitespaceCharacters: "\t\n\v\f\r                　\u2028\u2029\ufeff";

export default whitespaceCharacters;