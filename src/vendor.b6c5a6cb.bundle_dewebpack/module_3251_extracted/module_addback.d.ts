/**
 * jQuery-like collection interface
 * Represents a set of DOM elements or similar objects that support chaining
 */
interface JQueryLikeCollection<T = HTMLElement> {
  /**
   * Add the previous set of elements on the stack to the current set,
   * optionally filtered by a selector.
   * 
   * This method allows you to combine the current set of matched elements
   * with the previous set of elements (stored via prevObject).
   * 
   * @template TElement - The type of elements in the collection
   * @param selector - Optional selector string to filter the previous object collection.
   *                   If null or undefined, all elements from prevObject are added.
   * @returns A new collection containing both the current elements and the 
   *          (optionally filtered) previous elements
   * 
   * @example
   * // Add all previous elements back
   * collection.find('.child').addBack();
   * 
   * @example
   * // Add only matching previous elements
   * collection.find('.child').addBack('.parent');
   */
  addBack(selector?: string | null): this;

  /**
   * Add elements to the current matched set.
   * 
   * @param elements - Elements to add to the collection
   * @returns A new collection with the added elements
   */
  add(elements: JQueryLikeCollection<T> | T[] | T | string | null): this;

  /**
   * Filter the current collection by a selector or function.
   * 
   * @param selector - CSS selector string or filter function
   * @returns A new filtered collection
   */
  filter(selector: string | ((index: number, element: T) => boolean)): this;

  /**
   * Reference to the previous set of elements in the jQuery object stack.
   * Used internally for operations like addBack() and end().
   */
  prevObject: JQueryLikeCollection<T>;
}