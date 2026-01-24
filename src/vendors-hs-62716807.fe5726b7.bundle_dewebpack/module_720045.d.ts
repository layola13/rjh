/**
 * Inspect the source code of a function.
 * Returns the string representation of the given function's source code.
 * If the native inspectSource is not available, falls back to Function.prototype.toString.
 * 
 * @module InspectSource
 */

/**
 * Retrieves the source code string representation of a function.
 * 
 * @param fn - The function whose source code should be inspected
 * @returns The string representation of the function's source code
 * 
 * @example
 *