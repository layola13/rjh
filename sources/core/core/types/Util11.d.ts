/**
 * Iterator method utility module
 * Provides functionality to retrieve iterator methods safely
 */

import type { RegisterManager } from './register-manager';

/**
 * Iterator prototype interface
 */
interface IteratorPrototype {
  [Symbol.iterator](): Iterator<any>;
  next(): IteratorResult<any>;
}

/**
 * Gets the iterator method from an object safely
 * 
 * @param obj - The object to get the iterator method from
 * @param methodName - The name of the method to retrieve
 * @returns The iterator method if it exists, undefined otherwise
 * 
 * @remarks
 * This utility provides safe access to iterator methods with feature detection.
 * It checks for native support before attempting to access methods.
 * 
 * Common use cases:
 * - Detecting if an object has Symbol.iterator
 * - Getting iterator methods like map, filter, reduce
 * - Implementing polyfills with fallback support
 * 
 * @example
 * ```typescript
 * // Check if an object has an iterator
 * const arr = [1, 2, 3];
 * const iteratorMethod = getIteratorMethod(arr, Symbol.iterator);
 * if (iteratorMethod) {
 *   const iterator = iteratorMethod.call(arr);
 *   console.log(iterator.next()); // { value: 1, done: false }
 * }
 * 
 * // Safe method retrieval
 * const map = [1, 2, 3];
 * const mapMethod = getIteratorMethod(map, 'map');
 * 
 * // Polyfill fallback pattern
 * const method = getIteratorMethod(obj, 'filter') || customFilterPolyfill;
 * ```
 */
declare function getIteratorMethod(obj: any, methodName: string | symbol): Function | undefined;

/**
 * Extended meta functionality
 */
declare const meta: RegisterManager & {
  getIteratorMethod: typeof getIteratorMethod;
};

export { getIteratorMethod, IteratorPrototype, meta };