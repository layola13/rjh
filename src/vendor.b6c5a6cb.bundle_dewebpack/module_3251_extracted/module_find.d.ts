/**
 * Find descendants of the current set of matched elements, filtered by a selector.
 * 
 * @module module_find
 * @original_id find
 */

/**
 * Searches for descendant elements matching the specified selector within the current collection.
 * 
 * @template TElement - The type of DOM elements in the collection
 * @param {string | Element | Element[] | JQueryLike} selector - A string containing a selector expression, 
 *                                                                 or a DOM element/collection to match against
 * @returns {JQueryLike<TElement>} A new collection containing all found descendant elements
 * 
 * @remarks
 * - If selector is a string: performs a descendant search using the selector
 * - If selector is an element/collection: filters to elements contained within the current set
 * - Results are automatically de-duplicated when searching across multiple parent elements
 */
interface FindMethod {
  <TElement extends Element = Element>(
    selector: string | Element | Element[] | JQueryLike<Element>
  ): JQueryLike<TElement>;
}

/**
 * jQuery-like collection interface with array-like properties
 */
interface JQueryLike<T extends Element = Element> extends ArrayLike<T> {
  /**
   * The number of elements in the collection
   */
  readonly length: number;
  
  /**
   * Creates a new collection with elements added to the stack
   * 
   * @param elements - Elements to add to the new collection
   * @returns A new collection instance
   */
  pushStack(elements: T[]): JQueryLike<T>;
  
  /**
   * Find method implementation
   */
  find: FindMethod;
}

/**
 * Global utility object (typically jQuery instance)
 */
interface UtilityObject {
  /**
   * Checks if a container element contains a descendant element
   * 
   * @param container - The potential containing element
   * @param contained - The element to check for containment
   * @returns True if container contains the descendant element
   */
  contains(container: Element, contained: Element): boolean;
  
  /**
   * Searches for elements matching a selector within a context
   * 
   * @param selector - CSS selector string
   * @param context - The root element to search within
   * @param results - Array to append found elements to
   */
  find(selector: string, context: Element, results: Element[]): void;
  
  /**
   * Removes duplicate elements from an array and sorts them in document order
   * 
   * @param elements - Collection to de-duplicate and sort
   * @returns The sorted, de-duplicated collection
   */
  uniqueSort<T extends JQueryLike>(elements: T): T;
}

declare const b: UtilityObject;