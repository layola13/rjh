/**
 * Array.prototype.reverse polyfill module
 * @description Provides a fixed implementation for Array.prototype.reverse method
 * ensuring correct behavior in edge cases such as sparse arrays
 * @module ArrayReversePolyfill
 * @example
 * const arr = [1, 2, 3, 4, 5];
 * arr.reverse(); // [5, 4, 3, 2, 1]
 */

/**
 * Checks if the given object is an array or array-like object
 * @param target - The target object to check
 * @returns True if it's an array or array-like object
 */
declare function isArray(target: unknown): target is ArrayLike<unknown>;

/**
 * Native array reverse method reference
 * @param array - The array to reverse
 * @returns The reversed array
 */
declare function nativeReverse<T>(array: T[]): T[];

export { isArray, nativeReverse };