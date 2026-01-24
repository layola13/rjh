/**
 * UMD (Universal Module Definition) module wrapper generator
 * Generates code that works in AMD, CommonJS, and browser global contexts
 */

/**
 * Options for configuring the UMD wrapper
 */
interface UmdOptions {
  /** Map of dependency names to their module paths */
  dependencies: Record<string, string>;
  /** Optional variable name to export to global scope in browser environments */
  exportVar?: string | null;
}

/**
 * Utility functions for working with objects
 */
interface ObjectUtils {
  /** Extract all values from an object */
  values<T>(obj: Record<string, T>): T[];
  /** Extract all keys from an object */
  keys<K extends string>(obj: Record<K, unknown>): K[];
}

/**
 * Utility functions for working with arrays
 */
interface ArrayUtils {
  /** Transform each element of an array using a mapping function */
  map<T, U>(array: T[], mapper: (item: T) => U): U[];
}

/**
 * JavaScript code generation utilities
 */
interface JsUtils {
  /** Escape a string for safe use in JavaScript code */
  stringEscape(str: string): string;
}

/**
 * Generates the module header/preamble
 */
declare function t(): string;

/**
 * Generates the module export expression
 */
declare function e(): string;

/**
 * Indents code by 2 levels
 */
declare function indent2(code: string): string;

/**
 * Generates a UMD module wrapper that encapsulates the module code
 * 
 * @param options - Configuration options for the UMD wrapper
 * @param objects - Object utility functions
 * @param arrays - Array utility functions
 * @param js - JavaScript code generation utilities
 * @returns The complete UMD-wrapped module code as a string
 * 
 * @example
 *