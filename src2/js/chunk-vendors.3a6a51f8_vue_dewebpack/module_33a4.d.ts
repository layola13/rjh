/**
 * Checks if a value is an array iterator.
 * 
 * This utility determines whether the provided value represents an array iterator
 * by comparing it against the standard Array iterator implementation.
 * 
 * @module ArrayIteratorCheck
 */

import type { Iterators } from './84f2';
import type { WellKnownSymbol } from './2b4c';

/**
 * Checks if the given value is an array iterator.
 * 
 * Verifies if the value matches either:
 * - The standard Array iterator from the Iterators collection
 * - The Symbol.iterator method of Array.prototype
 * 
 * @param value - The value to check for array iterator compatibility
 * @returns `true` if the value is an array iterator, `false` otherwise
 * 
 * @example
 *