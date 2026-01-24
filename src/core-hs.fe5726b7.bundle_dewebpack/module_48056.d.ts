/**
 * Array.prototype.at() Polyfill Module
 * 
 * This module adds the `at()` method to Array.prototype, which allows
 * accessing array elements using positive or negative indices.
 * 
 * @module Array.prototype.at
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at
 */

/**
 * Extends the Array interface with the `at` method.
 */
declare global {
  interface Array<T> {
    /**
     * Returns the element at the specified index in the array.
     * Supports both positive and negative indices.
     * 
     * @param index - The zero-based index of the element to retrieve.
     *                Positive indices count from the start of the array.
     *                Negative indices count backwards from the end of the array.
     * @returns The element at the specified index, or `undefined` if the index is out of bounds.
     * 
     * @example
     * const arr = [10, 20, 30, 40, 50];
     * arr.at(0);   // 10
     * arr.at(2);   // 30
     * arr.at(-1);  // 50 (last element)
     * arr.at(-2);  // 40 (second to last)
     * arr.at(10);  // undefined (out of bounds)
     */
    at(index: number): T | undefined;
  }

  interface ReadonlyArray<T> {
    /**
     * Returns the element at the specified index in the array.
     * Supports both positive and negative indices.
     * 
     * @param index - The zero-based index of the element to retrieve.
     *                Positive indices count from the start of the array.
     *                Negative indices count backwards from the end of the array.
     * @returns The element at the specified index, or `undefined` if the index is out of bounds.
     */
    at(index: number): T | undefined;
  }

  interface Int8Array {
    /** Returns the element at the specified index, or `undefined` if out of bounds. */
    at(index: number): number | undefined;
  }

  interface Uint8Array {
    /** Returns the element at the specified index, or `undefined` if out of bounds. */
    at(index: number): number | undefined;
  }

  interface Uint8ClampedArray {
    /** Returns the element at the specified index, or `undefined` if out of bounds. */
    at(index: number): number | undefined;
  }

  interface Int16Array {
    /** Returns the element at the specified index, or `undefined` if out of bounds. */
    at(index: number): number | undefined;
  }

  interface Uint16Array {
    /** Returns the element at the specified index, or `undefined` if out of bounds. */
    at(index: number): number | undefined;
  }

  interface Int32Array {
    /** Returns the element at the specified index, or `undefined` if out of bounds. */
    at(index: number): number | undefined;
  }

  interface Uint32Array {
    /** Returns the element at the specified index, or `undefined` if out of bounds. */
    at(index: number): number | undefined;
  }

  interface Float32Array {
    /** Returns the element at the specified index, or `undefined` if out of bounds. */
    at(index: number): number | undefined;
  }

  interface Float64Array {
    /** Returns the element at the specified index, or `undefined` if out of bounds. */
    at(index: number): number | undefined;
  }

  interface BigInt64Array {
    /** Returns the element at the specified index, or `undefined` if out of bounds. */
    at(index: number): bigint | undefined;
  }

  interface BigUint64Array {
    /** Returns the element at the specified index, or `undefined` if out of bounds. */
    at(index: number): bigint | undefined;
  }
}

export {};