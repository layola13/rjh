/**
 * Set operation: checks if current set is disjoint from another set
 * (i.e., has no elements in common)
 * 
 * @template T - The type of elements in the set
 * @param otherSet - The set to compare against
 * @returns true if the sets have no common elements, false otherwise
 * 
 * @remarks
 * This function implements an optimized disjoint check:
 * - If current set size <= other set size: iterates current set checking if elements exist in other
 * - Otherwise: iterates other set checking if elements exist in current set
 * 
 * @example
 * const set1 = new Set([1, 2, 3]);
 * const set2 = new Set([4, 5, 6]);
 * set1.isDisjointFrom(set2); // returns true
 * 
 * const set3 = new Set([3, 4, 5]);
 * set1.isDisjointFrom(set3); // returns false (3 is common)
 */
export default function isDisjointFrom<T>(
  this: Set<T>,
  otherSet: SetLike<T>
): boolean;

/**
 * Represents a Set-like object that can be used in set operations
 * @template T - The type of elements in the set-like structure
 */
export interface SetLike<T> {
  /** The number of elements in the set */
  readonly size: number;
  
  /** Check if an element exists in the set */
  has(value: T): boolean;
  
  /** Check if the set includes a value (alias for has) */
  includes(value: T): boolean;
  
  /** Get an iterator for the set elements */
  getIterator(): Iterator<T>;
}

/**
 * Iterator result from set operations
 * @template T - The type of value being iterated
 */
export interface IteratorResult<T> {
  /** The current value */
  value: T;
  
  /** Whether iteration is complete */
  done: boolean;
}

/**
 * Standard iterator interface
 * @template T - The type of values returned by the iterator
 */
export interface Iterator<T> {
  /** Get the next value from the iterator */
  next(): IteratorResult<T>;
}