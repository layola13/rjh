/**
 * String.prototype.replace polyfill/extension module
 * Provides enhanced replace functionality with support for:
 * - Regular expression flags (global, unicode)
 * - Named capture groups
 * - Special replacement patterns ($&, $`, $', $<name>, $n)
 */

/**
 * Replacement pattern token type
 * - $$ : Literal dollar sign
 * - $& : The matched substring
 * - $` : The portion before the matched substring
 * - $' : The portion after the matched substring
 * - $n : The nth captured group (1-99)
 * - $<name> : Named capture group
 */
type ReplacementPattern = string;

/**
 * Match result with optional named groups
 */
interface RegExpMatchArrayWithGroups extends RegExpMatchArray {
  groups?: Record<string, string>;
}

/**
 * Search value that can be a string or RegExp with a custom replace method
 */
interface SearchValue {
  [Symbol.replace]?: (str: string, replaceValue: string | ReplacerFunction) => string;
}

/**
 * Replacer function signature
 * @param match - The matched substring
 * @param capturedGroups - Captured groups (variable length)
 * @param offset - The offset of the match in the string
 * @param string - The entire string being examined
 * @param groups - Named capture groups object (if any)
 * @returns The replacement string
 */
type ReplacerFunction = (
  match: string,
  ...args: [...capturedGroups: string[], offset: number, string: string, groups?: Record<string, string>]
) => string;

/**
 * Internal result object for early returns
 */
interface PolyfillResult {
  done: boolean;
  value?: string;
}

/**
 * RegExp execution helper
 * @param regexp - Regular expression to execute
 * @param str - String to test against
 * @returns Match array or null
 */
declare function regExpExec(regexp: RegExp, str: string): RegExpMatchArrayWithGroups | null;

/**
 * Advance string index by one code point (handles surrogate pairs)
 * @param str - The string
 * @param index - Current index
 * @param unicode - Whether unicode mode is enabled
 * @returns Next index
 */
declare function advanceStringIndex(str: string, index: number, unicode: boolean): number;

/**
 * Convert value to object, throw if null/undefined
 * @param value - Value to convert
 * @returns Object representation
 * @throws TypeError if value is null or undefined
 */
declare function requireObjectCoercible(value: unknown): object;

/**
 * Convert to object (ES internal ToObject)
 * @param value - Value to convert
 * @returns Object
 */
declare function toObject(value: unknown): object;

/**
 * Convert to length (ES internal ToLength)
 * @param value - Value to convert
 * @returns Non-negative integer
 */
declare function toLength(value: unknown): number;

/**
 * Convert to integer
 * @param value - Value to convert
 * @returns Integer value
 */
declare function toInteger(value: unknown): number;

/**
 * Install polyfill/extension for a well-known symbol method
 * @param key - Method name (e.g., 'replace')
 * @param length - Expected argument count
 * @param exec - Implementation factory
 */
declare function defineWellKnownSymbolMethod(
  key: string,
  length: number,
  exec: (
    requireObjectCoercible: typeof requireObjectCoercible,
    nativeMethod: Function,
    regExpExec: typeof regExpExec,
    polyfillHook: (
      regExpExec: typeof regExpExec,
      regexp: RegExp,
      str: string,
      replaceValue: string | ReplacerFunction
    ) => PolyfillResult
  ) => [
    (searchValue: SearchValue | null | undefined, replaceValue: string | ReplacerFunction) => string,
    (this: RegExp, str: string, replaceValue: string | ReplacerFunction) => string
  ]
): void;

/**
 * Process replacement string with special patterns
 * @param matched - The matched substring
 * @param str - The entire string
 * @param position - Match position
 * @param captures - Array of captured groups
 * @param namedCaptures - Named capture groups
 * @param replacement - Replacement template string
 * @returns Processed replacement string
 */
declare function getSubstitution(
  matched: string,
  str: string,
  position: number,
  captures: (string | undefined)[],
  namedCaptures: Record<string, string> | undefined,
  replacement: string
): string;

/**
 * Regular expression for replacement patterns including named groups
 * Matches: $$ $& $` $' $nn $<name>
 */
declare const REPLACEMENT_PATTERN_WITH_GROUPS: RegExp;

/**
 * Regular expression for basic replacement patterns
 * Matches: $$ $& $` $' $nn
 */
declare const REPLACEMENT_PATTERN_BASIC: RegExp;

/**
 * Export the polyfill installation
 * Enhances String.prototype.replace to support:
 * - Named capture groups
 * - Proper unicode handling
 * - All standard replacement patterns
 */
export {};