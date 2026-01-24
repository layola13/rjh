/**
 * String trimming utilities module
 * Provides trim functionality with configurable side trimming options
 */

/**
 * Trim mode flags
 */
export enum TrimMode {
  /** Trim whitespace from the start of the string */
  TRIM_START = 1,
  /** Trim whitespace from the end of the string */
  TRIM_END = 2,
  /** Trim whitespace from both sides */
  TRIM_BOTH = 3
}

/**
 * Polyfill configuration for a string method
 */
interface PolyfillConfig {
  /** The name of the method being polyfilled */
  [methodName: string]: (trimFunction: TrimFunction) => string;
}

/**
 * Trim function signature
 */
type TrimFunction = (value: string, mode: number) => string;

/**
 * Export target configuration
 */
interface ExportTarget {
  /** Prototype export flag */
  P: number;
  /** Fallback/Force flag */
  F: number;
}

/**
 * Main trim utility namespace
 */
interface TrimUtility {
  /**
   * Trims whitespace from a string based on the specified mode
   * @param value - The string to trim
   * @param mode - Bitmask indicating which sides to trim (1=start, 2=end, 3=both)
   * @returns The trimmed string
   */
  trim(value: string, mode: number): string;
  
  /**
   * Applies a polyfill for a string trimming method
   * @param methodName - Name of the method to polyfill
   * @param implementation - The implementation function
   * @param exportName - Optional export name for the method
   */
  (methodName: string, implementation: (fn: TrimFunction) => string, exportName?: string): void;
}

/**
 * Whitespace character pattern (start)
 */
declare const WHITESPACE_START_PATTERN: RegExp;

/**
 * Whitespace character pattern (end)
 */
declare const WHITESPACE_END_PATTERN: RegExp;

/**
 * Exports the string to an external module system
 * @param flags - Export configuration flags
 * @param targetName - Target object name (e.g., "String")
 * @param methods - Methods to export
 */
declare function exportToModule(flags: number, targetName: string, methods: Record<string, unknown>): void;

/**
 * Checks if a function call fails
 * @param fn - Function to test
 * @returns True if the function throws or returns unexpected result
 */
declare function fails(fn: () => boolean): boolean;

/**
 * Ensures value is defined (non-null/undefined)
 * @param value - Value to check
 * @returns The value if defined
 * @throws If value is null or undefined
 */
declare function requireDefined<T>(value: T): NonNullable<T>;

/**
 * Main export: String trimming utility
 */
declare const trimUtility: TrimUtility;

export default trimUtility;

/**
 * Trim a string with configurable mode
 * @param value - The input string
 * @param mode - Trim mode (1=start, 2=end, 3=both)
 * @returns Trimmed string
 * 
 * @example
 *