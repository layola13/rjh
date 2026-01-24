/**
 * Analyzes function arguments to determine if they represent an array or object structure.
 * 
 * This utility handles three cases:
 * 1. Multiple arguments - returns them as-is
 * 2. Single array argument - extracts and returns the array
 * 3. Single plain object argument - extracts values and keys separately
 * 
 * @param args - The arguments array to analyze
 * @returns An object containing the processed args array and optional keys array
 */
export function argsArgArrayOrObject(
  args: unknown[]
): ArgsResult;

/**
 * Result of argument analysis
 */
export interface ArgsResult {
  /**
   * The processed arguments as an array
   */
  args: unknown[];
  
  /**
   * Object keys if the input was a plain object, null otherwise
   */
  keys: string[] | null;
}

/**
 * Type guard to check if a value is a plain object (not an array, not null, and has Object.prototype)
 */
export function isPlainObject(value: unknown): value is Record<string, unknown>;