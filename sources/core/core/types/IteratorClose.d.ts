/**
 * Closes an iterator by calling its return method if available.
 * 
 * This utility implements the ECMAScript iterator closing protocol, which is used
 * to properly clean up iterator resources when iteration is terminated early
 * (e.g., by a break statement, return, or exception in a for-of loop).
 * 
 * According to the ECMAScript specification, when an iterator is not fully consumed,
 * its optional 'return' method should be called to allow cleanup of any resources
 * (like closing file handles, network connections, etc.).
 * 
 * The function handles several scenarios:
 * - If the iterator has no 'return' method, does nothing (successful completion)
 * - If the 'return' method exists, calls it with the iterator as 'this' context
 * - If 'return' throws an error, propagates that error
 * - If 'return' returns a non-object value, throws a TypeError
 * 
 * @template T - The type of values yielded by the iterator
 * @param iterator - The iterator object to close
 * @returns The result of calling iterator.return(), or undefined if no return method exists
 * @throws {TypeError} If iterator.return() returns a non-object value
 * @throws {Error} Any error thrown by the iterator's return method
 * 
 * @example
 * ```typescript
 * // Example 1: Iterator with return method (normal completion)
 * const iterator1 = {
 *   next() { return { value: 1, done: false }; },
 *   return() { 
 *     console.log('Cleanup called');
 *     return { done: true };
 *   }
 * };
 * iteratorClose(iterator1); // Logs: "Cleanup called"
 * 
 * // Example 2: Iterator without return method (no-op)
 * const iterator2 = {
 *   next() { return { value: 1, done: false }; }
 * };
 * iteratorClose(iterator2); // Does nothing, returns undefined
 * 
 * // Example 3: Using with generators (automatic cleanup)
 * function* generator() {
 *   try {
 *     yield 1;
 *     yield 2;
 *     yield 3;
 *   } finally {
 *     console.log('Generator cleanup');
 *   }
 * }
 * const iter = generator();
 * iter.next(); // { value: 1, done: false }
 * iteratorClose(iter); // Logs: "Generator cleanup", triggers finally block
 * ```
 */
declare function iteratorClose<T>(iterator: Iterator<T, any, undefined>): any;

export { iteratorClose };