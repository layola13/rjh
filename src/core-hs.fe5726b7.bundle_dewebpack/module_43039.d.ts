/**
 * Collection union operation module
 * 
 * Performs a union operation by adding all elements from an iterable to a collection.
 * This function is typically used as a method on Set-like data structures.
 * 
 * @module CollectionUnion
 */

/**
 * Converts a value to an object representation
 * @param value - The value to convert to an object
 * @returns The object representation of the value
 */
type ToObject<T> = T extends object ? T : Object;

/**
 * Interface for objects that provide an iterator
 */
interface Iterable<T> {
  getIterator(): Iterator<T>;
}

/**
 * Standard iterator interface
 */
interface Iterator<T> {
  next(): IteratorResult<T>;
}

/**
 * Iterator result with value and done flag
 */
interface IteratorResult<T> {
  value: T;
  done: boolean;
}

/**
 * Performs a union operation on a collection by adding elements from an iterable source.
 * 
 * @template T - The type of elements in the collection
 * @this {any} - The collection instance (typically a Set or Set-like structure)
 * @param source - An object with a getIterator method that returns an iterator
 * @returns A new collection containing all elements from both this collection and the source
 * 
 * @example
 * const set1 = new Set([1, 2, 3]);
 * const set2 = { getIterator: () => [4, 5, 6][Symbol.iterator]() };
 * const result = unionOperation.call(set1, set2); // Set {1, 2, 3, 4, 5, 6}
 */
export default function unionOperation<T>(
  this: any,
  source: Iterable<T>
): Set<T> | any;