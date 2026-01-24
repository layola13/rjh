/**
 * Array iterator module
 * Implements ES6 Array iterator protocol (keys, values, entries)
 * 
 * @module ArrayIterator
 * @dependencies
 *   - 8436: Iterator registration helper
 *   - 50ed: Iterator result factory
 *   - 481b: Iterators storage
 *   - 36c3: ToIndexed converter
 *   - 30f1: Iterator constructor factory
 */

import { registerIterator } from './iterator-registration';
import { createIteratorResult } from './iterator-result-factory';
import { Iterators } from './iterators-storage';
import { toIndexed } from './to-indexed-converter';
import { createIteratorConstructor } from './iterator-constructor-factory';

/**
 * Iterator kind types
 */
type IteratorKind = 'keys' | 'values' | 'entries';

/**
 * Internal state for array iterator
 */
interface ArrayIteratorState<T> {
  /** The array being iterated */
  _t: ArrayLike<T> | undefined;
  /** Current iteration index */
  _i: number;
  /** Iterator kind: 'keys', 'values', or 'entries' */
  _k: IteratorKind;
}

/**
 * Array iterator implementation
 * Provides iteration over array indices, values, or key-value pairs
 * 
 * @template T - The type of array elements
 */
declare class ArrayIterator<T> implements Iterator<T | number | [number, T]> {
  private _t: ArrayLike<T> | undefined;
  private _i: number;
  private _k: IteratorKind;

  /**
   * Creates a new array iterator
   * 
   * @param array - The array-like object to iterate over
   * @param kind - The iteration kind ('keys', 'values', or 'entries')
   */
  constructor(array: ArrayLike<T>, kind: IteratorKind);

  /**
   * Gets the next iteration result
   * 
   * @returns Iterator result containing value or done flag
   *   - For 'keys': returns the index
   *   - For 'values': returns the element value
   *   - For 'entries': returns [index, value] tuple
   */
  next(): IteratorResult<T | number | [number, T]>;
}

/**
 * Iterator result type based on iteration kind
 */
type ArrayIteratorResult<T, K extends IteratorKind> = 
  K extends 'keys' ? IteratorResult<number> :
  K extends 'values' ? IteratorResult<T> :
  K extends 'entries' ? IteratorResult<[number, T]> :
  never;

/**
 * Augment Array prototype with iterator methods
 */
declare global {
  interface Array<T> {
    keys(): ArrayIterator<number>;
    values(): ArrayIterator<T>;
    entries(): ArrayIterator<[number, T]>;
  }

  interface ArrayConstructor {
    prototype: Array<unknown>;
  }
}

export {};