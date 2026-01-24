/**
 * Filters the current set by removing elements that match the selector.
 * This is typically used in a chaining context to exclude certain elements from the set.
 * 
 * @module module_not
 * @original_id not
 */

/**
 * Removes elements from the matched set that match the selector.
 * Returns a new collection that excludes the specified elements.
 * 
 * @template TElement - The type of elements in the collection
 * @param selector - A selector expression, element, or array of elements to match against the set
 * @returns A new collection with the matching elements removed
 */
declare function not<TElement = Element>(
  this: ArrayLike<TElement> & { pushStack(elements: TElement[]): any },
  selector?: string | TElement | TElement[] | null
): any;

/**
 * Interface representing a collection with stack manipulation capabilities
 * @template T - The type of elements in the collection
 */
interface StackableCollection<T> {
  /**
   * Creates a new collection from the provided elements and adds it to the internal stack
   * @param elements - Array of elements to push onto the stack
   * @returns A new collection containing the elements
   */
  pushStack(elements: T[]): this;
}

/**
 * Type definition for the filter function used internally
 * @template T - The type of elements being filtered
 */
type FilterFunction<T> = (
  collection: ArrayLike<T>,
  selector: string | T | T[] | null | undefined,
  invert: boolean
) => T[];