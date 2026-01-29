/**
 * Shared symbol keys module
 * Provides well-known symbols for implementing JavaScript protocols
 */

/**
 * Symbol.iterator key
 * Used to define the default iterator for an object
 */
declare const ITERATOR: typeof Symbol.iterator;

/**
 * Symbol.asyncIterator key
 * Used to define the default async iterator for an object
 */
declare const ASYNC_ITERATOR: typeof Symbol.asyncIterator;

/**
 * Symbol.toStringTag key
 * Used to customize Object.prototype.toString behavior
 */
declare const TO_STRING_TAG: typeof Symbol.toStringTag;

/**
 * Shared symbols interface
 */
interface SharedSymbols {
  ITERATOR: typeof Symbol.iterator;
  ASYNC_ITERATOR: typeof Symbol.asyncIterator;
  TO_STRING_TAG: typeof Symbol.toStringTag;
}

/**
 * Well-known symbols for implementing built-in JavaScript protocols
 * 
 * @remarks
 * These symbols are used to implement standard JavaScript iteration and object protocols:
 * - ITERATOR: Makes objects iterable (for...of loops)
 * - ASYNC_ITERATOR: Makes objects async iterable (for await...of loops)
 * - TO_STRING_TAG: Customizes Object.prototype.toString output
 * 
 * @example
 * ```typescript
 * // Implement Symbol.iterator for custom iterable
 * class Range {
 *   constructor(private start: number, private end: number) {}
 *   
 *   [Symbol.iterator]() {
 *     let current = this.start;
 *     const end = this.end;
 *     return {
 *       next() {
 *         if (current <= end) {
 *           return { value: current++, done: false };
 *         }
 *         return { value: undefined, done: true };
 *       }
 *     };
 *   }
 * }
 * 
 * const range = new Range(1, 5);
 * for (const num of range) {
 *   console.log(num); // 1, 2, 3, 4, 5
 * }
 * 
 * // Customize toString with Symbol.toStringTag
 * class CustomClass {
 *   get [Symbol.toStringTag]() {
 *     return 'CustomClass';
 *   }
 * }
 * 
 * const obj = new CustomClass();
 * console.log(Object.prototype.toString.call(obj)); // '[object CustomClass]'
 * 
 * // Implement async iterator
 * class AsyncRange {
 *   constructor(private start: number, private end: number) {}
 *   
 *   async *[Symbol.asyncIterator]() {
 *     for (let i = this.start; i <= this.end; i++) {
 *       await new Promise(resolve => setTimeout(resolve, 100));
 *       yield i;
 *     }
 *   }
 * }
 * 
 * const asyncRange = new AsyncRange(1, 3);
 * for await (const num of asyncRange) {
 *   console.log(num); // 1, 2, 3 (with delays)
 * }
 * ```
 */
declare const sharedSymbols: SharedSymbols;

export { ITERATOR, ASYNC_ITERATOR, TO_STRING_TAG, SharedSymbols, sharedSymbols };