/**
 * Inspect source code of a function.
 * Returns the string representation of a function's source code.
 * Falls back to Function.prototype.toString if native inspectSource is not available.
 * 
 * @module InspectSource
 */

/**
 * Type for the function binding utility (typically from a polyfill or helper library)
 */
type FunctionBindUtil = <T extends Function>(fn: T) => T;

/**
 * Type for callable check utility
 */
type IsCallableUtil = (value: unknown) => value is Function;

/**
 * Shared state object that may contain inspectSource method
 */
interface SharedState {
  /**
   * Optional native or polyfilled function source inspector
   */
  inspectSource?: InspectSourceFunction;
}

/**
 * Function that inspects and returns the source code of a given function
 * 
 * @param fn - The function whose source code should be inspected
 * @returns The string representation of the function's source code
 */
type InspectSourceFunction = (fn: Function) => string;

/**
 * Inspects the source code of a function.
 * If no native implementation exists, uses Function.prototype.toString.
 * 
 * @param fn - The function to inspect
 * @returns The source code of the function as a string
 * 
 * @example
 *