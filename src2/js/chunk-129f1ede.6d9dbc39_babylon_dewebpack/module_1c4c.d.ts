/**
 * Array.from polyfill module
 * Provides ECMAScript 6 Array.from functionality for older environments
 */

/**
 * Callback function type for Array.from mapping
 * @template T The type of source elements
 * @template U The type of mapped elements
 */
type ArrayFromMapFn<T, U> = (value: T, index: number) => U;

/**
 * Array-like object interface
 * @template T The type of elements
 */
interface ArrayLike<T> {
  readonly length: number;
  readonly [n: number]: T;
}

/**
 * Iterable interface
 * @template T The type of elements
 */
interface Iterable<T> {
  [Symbol.iterator](): Iterator<T>;
}

/**
 * Iterator interface
 * @template T The type of elements
 */
interface Iterator<T> {
  next(): IteratorResult<T>;
}

/**
 * Iterator result interface
 * @template T The type of value
 */
interface IteratorResult<T> {
  done: boolean;
  value: T;
}

/**
 * Array.from static method declaration
 * Creates a new Array instance from an array-like or iterable object
 * 
 * @template T The type of source elements
 * @template U The type of resulting array elements
 * @param source An array-like or iterable object to convert to an array
 * @param mapFn Optional mapping function to call on every element
 * @param thisArg Optional value to use as 'this' when executing mapFn
 * @returns A new Array instance
 */
declare namespace Array {
  function from<T>(source: ArrayLike<T> | Iterable<T>): T[];
  
  function from<T, U>(
    source: ArrayLike<T> | Iterable<T>,
    mapFn: ArrayFromMapFn<T, U>,
    thisArg?: unknown
  ): U[];
}

/**
 * Array constructor type that can be called with new
 * @template T The type of array elements
 */
interface ArrayConstructor {
  new <T>(length: number): T[];
  new <T>(...items: T[]): T[];
  <T>(length: number): T[];
  <T>(...items: T[]): T[];
  readonly prototype: unknown[];
}

export {};