/**
 * Polyfill for Array.from() method
 * Converts array-like or iterable objects to a real Array
 * 
 * @module ArrayFromPolyfill
 */

/**
 * Map function type for transforming elements during Array.from conversion
 * @template T - Source element type
 * @template U - Target element type
 */
type MapFunction<T, U> = (value: T, index: number) => U;

/**
 * Array-like object interface (has length and indexed elements)
 * @template T - Element type
 */
interface ArrayLike<T> {
  readonly length: number;
  readonly [index: number]: T;
}

/**
 * Iterable object interface
 * @template T - Element type
 */
interface Iterable<T> {
  [Symbol.iterator](): Iterator<T>;
}

/**
 * Iterator interface
 * @template T - Element type
 */
interface Iterator<T> {
  next(): IteratorResult<T>;
}

/**
 * Iterator result interface
 * @template T - Element type
 */
interface IteratorResult<T> {
  done: boolean;
  value: T;
}

/**
 * Array.from() static method signature
 * Creates a new Array instance from an array-like or iterable object
 * 
 * @template T - Source element type
 * @template U - Target element type (defaults to T)
 * @param source - Array-like or iterable object to convert
 * @param mapFn - Optional mapping function to transform elements
 * @param thisArg - Optional value to use as 'this' when executing mapFn
 * @returns New Array instance
 */
declare namespace Array {
  function from<T>(source: ArrayLike<T> | Iterable<T>): T[];
  
  function from<T, U>(
    source: ArrayLike<T> | Iterable<T>,
    mapFn: MapFunction<T, U>,
    thisArg?: unknown
  ): U[];
}

/**
 * Export polyfill installation interface
 */
export interface ArrayFromPolyfill {
  /**
   * Installs the Array.from polyfill if not natively supported
   * 
   * @remarks
   * - Checks for native Array.from support before installing
   * - Handles both array-like objects (with length property) and iterables
   * - Supports optional mapping function with custom thisArg binding
   * - Falls back to indexed iteration for array-like objects
   * - Uses iterator protocol for iterable objects
   */
  install(): void;
}

export {};