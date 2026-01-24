/**
 * Converts an object to a primitive value.
 * 
 * Attempts conversion using `toString()` and `valueOf()` methods in a specific order
 * based on the provided hint. Throws TypeError if conversion fails.
 * 
 * @module ToPrimitive
 */

/**
 * Function type for callable methods like toString or valueOf
 */
type CallableMethod = () => unknown;

/**
 * Checks if a value is callable (function)
 */
declare function isCallable(value: unknown): value is CallableMethod;

/**
 * Checks if a value is an object
 */
declare function isObject(value: unknown): value is object;

/**
 * Calls a function with context
 */
declare function call(fn: CallableMethod, context: unknown): unknown;

/**
 * Hint for preferred primitive conversion type
 */
type PrimitiveHint = 'string' | 'number' | 'default';

/**
 * Converts an object to a primitive value using toString/valueOf methods.
 * 
 * @param input - The object to convert to a primitive value
 * @param hint - Preferred type hint ('string' | 'number' | 'default')
 * @returns The primitive value extracted from the object
 * @throws {TypeError} When the object cannot be converted to a primitive value
 * 
 * @remarks
 * Conversion order:
 * - If hint is 'string': tries toString() first, then valueOf()
 * - Otherwise: tries valueOf() first, then toString()
 * - Returns the first non-object result
 * 
 * @example
 *