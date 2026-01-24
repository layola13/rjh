/**
 * Array.prototype.copyWithin polyfill implementation
 * 
 * Copies a sequence of array elements within the array to the position starting at target.
 * The copy is taken from the index positions of the second and third arguments start and end.
 * 
 * @module ArrayCopyWithinPolyfill
 * @dependencies
 *   - 4bf8: toObject - Converts value to object
 *   - 77f1: toAbsoluteIndex - Converts relative index to absolute position
 *   - 9def: toLength - Converts value to valid array length
 */

import { toObject } from './4bf8';
import { toAbsoluteIndex } from './77f1';
import { toLength } from './9def';

/**
 * Polyfill for Array.prototype.copyWithin
 * Shallow copies part of an array to another location in the same array and returns it without modifying its length.
 * 
 * @template T - The type of array elements
 * @param target - Zero-based index at which to copy the sequence to. If negative, target will be counted from the end.
 * @param start - Zero-based index at which to start copying elements from. If negative, start will be counted from the end.
 * @param end - Zero-based index at which to end copying elements from. copyWithin copies up to but not including end. If negative, end will be counted from the end. If omitted, copyWithin will copy until the end.
 * @returns The modified array
 * 
 * @example
 * [1, 2, 3, 4, 5].copyWithin(0, 3); // [4, 5, 3, 4, 5]
 * [1, 2, 3, 4, 5].copyWithin(0, 3, 4); // [4, 2, 3, 4, 5]
 * [1, 2, 3, 4, 5].copyWithin(-2, -3, -1); // [1, 2, 3, 3, 4]
 */
declare function copyWithin<T>(
  this: T[],
  target: number,
  start: number,
  end?: number
): T[];

export = Array.prototype.copyWithin || copyWithin;

/**
 * Type definition for the copyWithin function implementation
 */
declare namespace copyWithin {
  /**
   * Implementation signature matching Array.prototype.copyWithin
   */
  function <T>(
    this: ArrayLike<T>,
    target: number,
    start: number,
    end?: number
  ): ArrayLike<T>;
}

/**
 * Extended Array interface with copyWithin method
 */
declare global {
  interface Array<T> {
    /**
     * Returns the this object after copying a section of the array identified by start and end
     * to the same array starting at position target
     * @param target - If target is negative, it is treated as length+target where length is the length of the array.
     * @param start - If start is negative, it is treated as length+start. If end is negative, it is treated as length+end.
     * @param end - If not specified, length of the this object is used as its default value.
     */
    copyWithin(target: number, start: number, end?: number): this;
  }
}