/**
 * JSON.stringify polyfill with Symbol and surrogate pair handling
 * 
 * This module provides an enhanced JSON.stringify implementation that:
 * - Properly handles ES6 Symbol values
 * - Correctly serializes Unicode surrogate pairs
 * - Maintains compatibility with the native JSON.stringify API
 */

/**
 * Replacer function type for JSON.stringify
 * @param key - The property key being stringified
 * @param value - The value being stringified
 * @returns The transformed value or undefined to omit the property
 */
type JSONReplacer = (this: unknown, key: string, value: unknown) => unknown;

/**
 * Replacer parameter type: can be a function or an array of allowed keys
 */
type ReplacerParam = JSONReplacer | Array<string | number> | null;

/**
 * Enhanced JSON.stringify function signature
 * @param value - The value to convert to a JSON string
 * @param replacer - A function or array that transforms values during stringification
 * @param space - A string or number used to insert white space for readability
 * @returns A JSON string representing the given value
 */
interface JSONStringify {
  (value: unknown, replacer?: ReplacerParam, space?: string | number): string;
}

/**
 * Options for the export operation
 */
interface ExportOptions {
  /** The target global object (e.g., "JSON") */
  target: string;
  /** Whether this is a static method */
  stat: boolean;
  /** The arity (number of parameters) of the function */
  arity: number;
  /** Whether to force override the native implementation */
  forced: boolean;
}

/**
 * Implementation details namespace
 */
declare namespace JSONStringifyPolyfill {
  /** Regular expression matching all surrogate pair characters */
  const SURROGATE_PAIR_REGEX: RegExp;
  
  /** Regular expression matching high surrogate characters (U+D800 to U+DBFF) */
  const HIGH_SURROGATE_REGEX: RegExp;
  
  /** Regular expression matching low surrogate characters (U+DC00 to U+DFFF) */
  const LOW_SURROGATE_REGEX: RegExp;
  
  /**
   * Checks if native JSON.stringify properly handles Symbol values
   * @returns true if the native implementation is buggy
   */
  const hasSymbolBug: boolean;
  
  /**
   * Checks if native JSON.stringify properly handles surrogate pairs
   * @returns true if the native implementation is buggy
   */
  const hasSurrogatePairBug: boolean;
  
  /**
   * Custom replacer that filters out Symbol values
   * @param key - Property key
   * @param value - Property value
   * @param userReplacer - User-provided replacer function
   * @returns Filtered value
   */
  function symbolFilteringReplacer(
    key: string,
    value: unknown,
    userReplacer: JSONReplacer | null
  ): unknown;
  
  /**
   * Escapes unpaired surrogate characters in a string
   * @param char - The character to potentially escape
   * @param index - The character's index in the string
   * @param fullString - The complete string being processed
   * @returns The escaped character or original character
   */
  function escapeSurrogate(
    char: string,
    index: number,
    fullString: string
  ): string;
  
  /**
   * Enhanced stringify implementation with Symbol and surrogate pair handling
   * @param value - The value to stringify
   * @param replacer - Optional replacer function or array
   * @param space - Optional spacing for formatting
   * @returns JSON string representation
   */
  function enhancedStringify(
    value: unknown,
    replacer?: ReplacerParam,
    space?: string | number
  ): string;
}

/**
 * Export configuration for the polyfill
 */
export interface PolyfillExport {
  /** Method name to export */
  stringify: JSONStringify;
}

export default JSONStringifyPolyfill;