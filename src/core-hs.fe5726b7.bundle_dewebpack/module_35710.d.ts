/**
 * Gets the flags string from a RegExp object.
 * 
 * This module extracts and concatenates all active flags from a RegExp instance
 * into a string representation (e.g., "gimu").
 * 
 * @remarks
 * The function checks the following RegExp flags in order:
 * - d: hasIndices - Generates indices for substring matches
 * - g: global - Find all matches rather than stopping after the first match
 * - i: ignoreCase - Case-insensitive matching
 * - m: multiline - ^ and $ match start/end of line
 * - s: dotAll - . matches newline characters
 * - u: unicode - Treat pattern as Unicode code points
 * - v: unicodeSets - Enable Unicode sets mode
 * - y: sticky - Match only from the index indicated by lastIndex
 * 
 * @returns A string containing all active flags in alphabetical order
 * 
 * @example
 *