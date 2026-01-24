/**
 * Module: module_20756
 * Original ID: 20756
 * 
 * Gets an iterator from an iterable object.
 * Attempts to retrieve the iterator method from the object and call it.
 * If no valid iterator method is found, throws a TypeError.
 */

import { call } from './module_47730';
import { isCallable } from './module_94743';
import { anObject } from './module_77064';
import { tryToString } from './module_60056';
import { getIteratorMethod } from './module_74832';

/**
 * Retrieves an iterator from an iterable object.
 * 
 * @param iterable - The object to get an iterator from
 * @param iteratorMethod - Optional custom iterator method. If not provided, will attempt to get the default iterator method from the iterable
 * @returns The iterator object
 * @throws {TypeError} If the object is not iterable or the iterator method is not callable
 * 
 * @example
 * const arr = [1, 2, 3];
 * const iterator = getIterator(arr);
 * console.log(iterator.next()); // { value: 1, done: false }
 */
export function getIterator<T = unknown>(
  iterable: Iterable<T>,
  iteratorMethod?: () => Iterator<T>
): Iterator<T>;

export function getIterator(
  iterable: unknown,
  iteratorMethod?: unknown
): Iterator<unknown>;

export function getIterator(
  iterable: unknown,
  iteratorMethod?: unknown
): Iterator<unknown> {
  const method = arguments.length < 2 ? getIteratorMethod(iterable) : iteratorMethod;
  
  if (isCallable(method)) {
    return anObject(call(method, iterable));
  }
  
  throw new TypeError(tryToString(iterable) + ' is not iterable');
}

export default getIterator;