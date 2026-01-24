/**
 * Returns the minimum value from an iterable collection.
 * 
 * @module ArrayUtilities
 * @category Collection Operations
 */

import { reduce } from './reduce';
import { isFunction } from './typeChecks';

/**
 * Finds the minimum value in a collection.
 * 
 * @template T - The type of elements in the collection
 * @param comparatorOrUndefined - Optional comparator function that takes two elements and returns:
 *   - A negative number if the first element is smaller
 *   - Zero if elements are equal
 *   - A positive number if the first element is larger
 * @returns A reducer function that finds the minimum value
 * 
 * @example
 *