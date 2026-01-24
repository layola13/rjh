/**
 * String splitting utility module
 * Splits a string into an array based on the provided separator pattern
 */

/**
 * Splits a string into an array of substrings using a separator pattern.
 * 
 * @param input - The string to be split
 * @param separator - The pattern or string to split by. If undefined and context is falsy, uses default splitting logic
 * @param context - Context flag to determine splitting behavior
 * @returns An array of split string segments, or an empty array if no matches found
 * 
 * @remarks
 * - When separator is undefined and context is falsy, applies intelligent splitting:
 *   - Uses Unicode-aware splitting if the input contains Unicode characters
 *   - Falls back to ASCII-based splitting otherwise
 * - When separator is provided, uses standard string matching
 * 
 * @example
 *