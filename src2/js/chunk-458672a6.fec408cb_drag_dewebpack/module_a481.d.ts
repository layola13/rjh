/**
 * String.prototype.replace polyfill/implementation
 * Handles replacement operations with support for named capture groups,
 * special replacement patterns ($&, $`, $', $n), and function replacers.
 */

/**
 * Special replacement pattern for standard capture groups and replacement tokens
 * Matches: $$ $& $` $' $1-$99
 */
type StandardReplacementPattern = RegExp;

/**
 * Extended replacement pattern including named capture groups
 * Matches: $$ $& $` $' $1-$99 $<groupName>
 */
type ExtendedReplacementPattern = RegExp;

/**
 * Match result from RegExp execution
 */
interface RegExpMatchResult extends Array<string> {
  /** Zero-based index of the match in the string */
  index: number;
  /** The original input string */
  input: string;
  /** Named capture groups (ES2018+) */
  groups?: Record<string, string>;
}

/**
 * Replacer function type for String.prototype.replace
 * @param match - The matched substring
 * @param captureGroups - Captured groups (variable number of string arguments)
 * @param offset - The offset of the matched substring within the whole string
 * @param fullString - The whole string being examined
 * @param namedGroups - Named capture groups object (ES2018+)
 * @returns The replacement string
 */
type ReplacerFunction = (
  match: string,
  ...args: [...captureGroups: string[], offset: number, fullString: string, namedGroups?: Record<string, string>]
) => string;

/**
 * Type guard to check if value is not null or undefined
 */
declare function requireObjectCoercible(value: unknown): asserts value is NonNullable<unknown>;

/**
 * Converts value to object
 */
declare function toObject(value: unknown): object;

/**
 * Converts value to length (integer in safe range)
 */
declare function toLength(value: unknown): number;

/**
 * Converts value to integer
 */
declare function toInteger(value: unknown): number;

/**
 * Advances string position considering Unicode code points
 * @param str - The string to advance within
 * @param index - Current position
 * @param unicode - Whether to treat as Unicode
 * @returns Next position
 */
declare function advanceStringIndex(str: string, index: number, unicode: boolean): number;

/**
 * Executes RegExp and returns match result
 * @param regexp - Regular expression to execute
 * @param str - String to match against
 * @returns Match result or null
 */
declare function regExpExec(regexp: RegExp, str: string): RegExpMatchResult | null;

/**
 * Installs a well-known Symbol method on a built-in prototype
 * @param methodName - Name of the method (e.g., 'replace')
 * @param length - Expected argument count
 * @param implementation - Implementation factory function
 */
declare function defineWellKnownSymbolMethod(
  methodName: string,
  length: number,
  implementation: ImplementationFactory
): void;

/**
 * Factory function that returns the implementation pair for String.prototype.replace
 */
type ImplementationFactory = (
  requireObjectCoercible: (value: unknown) => void,
  wellKnownSymbol: symbol,
  nativeMethod: (this: string, searchValue: unknown, replaceValue: unknown) => string,
  tryDelegateToSymbol: (nativeMethod: Function, thisArg: unknown, ...args: unknown[]) => { done: boolean; value?: string }
) => [StringReplaceMethod, RegExpReplaceMethod];

/**
 * String.prototype.replace implementation
 * @param searchValue - The pattern to search for (string or RegExp)
 * @param replaceValue - The replacement (string or function)
 * @returns The new string with replacement(s) applied
 */
type StringReplaceMethod = (
  this: unknown,
  searchValue: string | RegExp,
  replaceValue: string | ReplacerFunction
) => string;

/**
 * RegExp.prototype[@@replace] implementation
 * @param str - The string to perform replacement on
 * @param replaceValue - The replacement (string or function)
 * @returns The new string with replacement(s) applied
 */
type RegExpReplaceMethod = (
  this: RegExp,
  str: string,
  replaceValue: string | ReplacerFunction
) => string;

/**
 * Processes special replacement patterns in the replacement string
 * @param matchedSubstring - The full matched substring
 * @param originalString - The original input string
 * @param position - Position of the match in the original string
 * @param captures - Array of captured groups
 * @param namedCaptures - Named capture groups object
 * @param replacementString - The replacement template string
 * @returns Processed replacement string with substitutions applied
 */
declare function getSubstitution(
  matchedSubstring: string,
  originalString: string,
  position: number,
  captures: string[],
  namedCaptures: Record<string, string> | undefined,
  replacementString: string
): string;

export {};