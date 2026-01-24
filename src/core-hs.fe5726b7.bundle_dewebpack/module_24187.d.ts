/**
 * Set intersection operation module
 * Computes the intersection of two sets (elements present in both)
 * @module SetIntersection
 */

/**
 * Computes the intersection of the current Set with another iterable collection.
 * Returns a new Set containing only elements that exist in both collections.
 * 
 * @template T - The type of elements in the Set
 * @param this - The source Set instance
 * @param otherCollection - The collection to intersect with (can be Set, Array, or any iterable)
 * @returns A new Set containing elements present in both collections
 * 
 * @example
 * const setA = new Set([1, 2, 3, 4]);
 * const setB = new Set([3, 4, 5, 6]);
 * const intersection = setA.intersection(setB); // Set { 3, 4 }
 */
export default function intersection<T>(
  this: Set<T>,
  otherCollection: Iterable<T> | SetLike<T>
): Set<T>;

/**
 * Interface representing a Set-like object with standard Set methods
 */
interface SetLike<T> {
  /** Returns the number of elements in the collection */
  readonly size: number;
  
  /** Checks if an element exists in the collection */
  has(value: T): boolean;
  
  /** Returns an iterator over the keys/values in the collection */
  keys(): Iterator<T>;
  
  /** Returns an iterator for the collection */
  getIterator?(): Iterator<T>;
  
  /** Checks if a value is included in the collection */
  includes?(value: T): boolean;
}

/**
 * Iterator interface for traversing collections
 */
interface Iterator<T> {
  /** Advances the iterator and returns the next result */
  next(): IteratorResult<T>;
}

/**
 * Result returned by an iterator's next() method
 */
interface IteratorResult<T> {
  /** Indicates whether the iterator has finished */
  done: boolean;
  
  /** The current value (undefined if done is true) */
  value: T | undefined;
}