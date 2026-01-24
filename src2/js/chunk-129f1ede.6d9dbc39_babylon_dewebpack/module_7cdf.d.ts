/**
 * Number.isInteger polyfill module
 * 
 * This module extends the Number constructor with the isInteger static method,
 * which determines whether the passed value is an integer.
 * 
 * @module NumberIsIntegerPolyfill
 */

/**
 * Export interface representing the module system utility
 */
interface ExportUtility {
  /**
   * Export static method flag
   */
  S: number;
}

/**
 * Determines whether the passed value is an integer
 * 
 * @param value - The value to be tested for being an integer
 * @returns true if the value is an integer, false otherwise
 * 
 * @example
 * Number.isInteger(42);        // true
 * Number.isInteger(42.0);      // true
 * Number.isInteger(42.1);      // false
 * Number.isInteger('42');      // false
 * Number.isInteger(Infinity);  // false
 * Number.isInteger(NaN);       // false
 */
declare function isInteger(value: unknown): value is number;

/**
 * Module export function that registers the isInteger method on Number constructor
 * 
 * @param exports - Module exports object
 * @param require - Module require function
 * @param moduleLoader - Module loader utility function
 */
declare function registerNumberIsInteger(
  exports: Record<string, unknown>,
  require: (moduleId: string) => unknown,
  moduleLoader: (id: string) => unknown
): void;

declare global {
  interface NumberConstructor {
    /**
     * Determines whether the passed value is an integer
     * 
     * @param value - The value to be tested for being an integer
     * @returns true if the value is an integer, false otherwise
     */
    isInteger(value: unknown): value is number;
  }
}

export { isInteger, registerNumberIsInteger };