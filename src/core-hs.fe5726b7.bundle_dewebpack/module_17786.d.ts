/**
 * Checks if the current collection is a superset of the provided collection.
 * Returns true if all elements in the provided collection exist in this collection.
 * 
 * @param other - The collection to compare against
 * @returns false if this collection's size is smaller than the other, 
 *          or if any element from the other collection is not found in this collection
 * 
 * @example
 * const setA = new Set([1, 2, 3, 4]);
 * const setB = new Set([2, 3]);
 * isSupersetOf.call(setA, setB); // true
 */
declare function isSupersetOf<T>(this: Set<T> | Map<T, unknown>, other: Iterable<T>): boolean;

export = isSupersetOf;

/**
 * Type definitions for the superset checking operation
 */
declare namespace isSupersetOf {
  /**
   * The collection being checked (must have a size property and support membership testing)
   */
  interface Collection<T> {
    readonly size: number;
    has(element: T): boolean;
  }

  /**
   * The input collection that provides an iterator
   */
  interface IterableCollection<T> {
    readonly size: number;
    getIterator(): Iterator<T>;
  }
}