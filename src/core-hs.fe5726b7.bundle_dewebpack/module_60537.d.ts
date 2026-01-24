/**
 * Array.prototype.push polyfill module
 * 
 * Provides a standards-compliant implementation of Array.prototype.push that:
 * - Handles edge cases with maximum array length (2^32 - 1)
 * - Works correctly with array-like objects
 * - Properly handles non-writable length properties
 * 
 * @module ArrayPushPolyfill
 */

/**
 * Maximum safe array length constant (2^32 - 1)
 */
declare const MAX_ARRAY_LENGTH: number;

/**
 * Converts a value to an object
 * @param value - The value to convert to an object
 * @returns The converted object
 */
declare function toObject(value: unknown): object;

/**
 * Gets the length property of an array-like object
 * @param arrayLike - The array-like object
 * @returns The length as a number
 */
declare function toLength(arrayLike: ArrayLike<unknown>): number;

/**
 * Sets the length property of an array-like object
 * @param target - The target object
 * @param length - The new length value
 */
declare function setLength(target: object, length: number): void;

/**
 * Validates that a length value doesn't exceed the maximum array length
 * @param length - The length to validate
 * @throws {RangeError} If length exceeds MAX_ARRAY_LENGTH
 */
declare function validateLength(length: number): void;

/**
 * Enhanced Array.prototype.push implementation
 * 
 * Appends elements to the end of an array and returns the new length.
 * This implementation properly handles:
 * - Array-like objects
 * - Length overflow checks
 * - Non-writable length properties
 * 
 * @template T - The type of elements in the array
 * @param this - The array or array-like object
 * @param items - Items to add to the array
 * @returns The new length of the array
 * @throws {RangeError} If the resulting length would exceed MAX_ARRAY_LENGTH
 * @throws {TypeError} If the length property is not writable
 */
declare function push<T>(this: ArrayLike<T> & object, ...items: T[]): number;

/**
 * Polyfill configuration interface
 */
interface PolyfillConfig {
  /** The target object to polyfill (e.g., "Array") */
  target: string;
  /** Whether to add to the prototype */
  proto: boolean;
  /** Expected arity of the function */
  arity: number;
  /** Whether the polyfill is forced */
  forced: boolean;
}

/**
 * Installs the push polyfill if needed
 * @param config - The polyfill configuration
 * @param methods - Object containing the polyfill methods
 */
declare function installPolyfill(
  config: PolyfillConfig,
  methods: { push: typeof push }
): void;

export { push, installPolyfill, validateLength, toObject, toLength, setLength };
export type { PolyfillConfig };