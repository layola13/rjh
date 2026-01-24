/**
 * Set Difference Operation Module
 * 
 * This module provides a set difference operation that removes elements from the current set
 * that are also present in another collection. The operation modifies and returns a copy of
 * the original set.
 * 
 * @module SetDifference
 */

/**
 * Represents a collection that supports iteration and size checking.
 * 
 * @template T - The type of elements in the collection
 */
interface Collection<T> {
  /**
   * The number of elements in the collection
   */
  readonly size: number;

  /**
   * Checks if the collection contains the specified element
   * 
   * @param element - The element to check for
   * @returns True if the element exists in the collection
   */
  includes(element: T): boolean;

  /**
   * Gets an iterator for the collection
   * 
   * @returns An iterator that yields elements of type T
   */
  getIterator(): Iterator<T>;
}

/**
 * Represents a set-like data structure with add, remove, and membership operations.
 * 
 * @template T - The type of elements in the set
 */
interface SetLike<T> {
  /**
   * The number of elements in the set
   */
  readonly size: number;

  /**
   * Checks if the set contains the specified element
   * 
   * @param element - The element to check for
   * @returns True if the element exists in the set
   */
  has(element: T): boolean;

  /**
   * Removes the specified element from the set
   * 
   * @param element - The element to remove
   * @returns True if the element was removed, false if it didn't exist
   */
  remove(element: T): boolean;
}

/**
 * Callback function invoked for each element during iteration.
 * 
 * @template T - The type of the element
 * @param element - The current element being processed
 * @returns void
 */
type ForEachCallback<T> = (element: T) => void;

/**
 * Performs set difference operation: removes all elements from the current set
 * that exist in the provided collection.
 * 
 * This function uses two different strategies depending on the relative sizes:
 * - If the current set is smaller or equal: iterates through the current set
 * - If the collection is smaller: iterates through the collection
 * 
 * @template T - The type of elements in the set
 * @this {SetLike<T>} - The set to perform the difference operation on
 * @param collection - The collection whose elements should be removed from this set
 * @returns A new set containing elements from the original set excluding those in the collection
 * 
 * @example
 *