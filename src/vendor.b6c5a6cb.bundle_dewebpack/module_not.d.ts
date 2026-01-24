/**
 * Filters the current collection by removing elements that match the given selector.
 * 
 * This method reduces the set of matched elements to those that do not match
 * the given selector, elements, or jQuery object.
 * 
 * @template TElement - The type of DOM elements in the collection
 * @param selector - A selector expression, DOM element(s), or jQuery object to match against.
 *                   Can be a CSS selector string, DOM Element, array of elements, or jQuery object.
 *                   If not provided or empty array, returns all elements (inverse filter with no criteria).
 * @returns A new jQuery object containing elements from the original set that do not match the selector.
 * 
 * @example
 * // Remove elements with class "selected"
 * $("li").not(".selected");
 * 
 * @example
 * // Remove a specific DOM element
 * const elem = document.getElementById("special");
 * $("li").not(elem);
 */
declare function not<TElement extends Element = HTMLElement>(
  selector?: string | Element | Element[] | JQuery<Element>
): JQuery<TElement>;

/**
 * Internal helper function that filters elements based on a selector and inversion flag.
 * 
 * @template TElement - The type of DOM elements
 * @param elements - The collection of elements to filter
 * @param selector - The selector criteria to match against (string, element, or array)
 * @param invert - When true, returns elements that do NOT match; when false, returns matching elements
 * @returns Filtered array of elements
 * 
 * @internal
 */
declare function O<TElement extends Element>(
  elements: ArrayLike<TElement>,
  selector: string | Element | Element[],
  invert: boolean
): TElement[];

/**
 * Adds elements to the internal stack and returns a new jQuery object.
 * 
 * This is an internal method used by traversal methods to maintain
 * the jQuery chain and enable .end() functionality.
 * 
 * @template TElement - The type of elements to add to the stack
 * @param elements - Array-like collection of elements to add
 * @returns A new jQuery object containing the specified elements
 * 
 * @internal
 */
declare function pushStack<TElement extends Element = HTMLElement>(
  elements: ArrayLike<TElement>
): JQuery<TElement>;

/**
 * jQuery collection interface representing a set of DOM elements.
 * 
 * @template TElement - The type of DOM elements contained in this jQuery object
 */
interface JQuery<TElement extends Element = HTMLElement> extends ArrayLike<TElement> {
  /**
   * Filters the current collection by removing elements that match the given selector.
   * 
   * @param selector - Optional selector to filter out. If omitted, returns all elements.
   * @returns A new jQuery object with filtered elements
   */
  not(selector?: string | Element | Element[] | JQuery<Element>): JQuery<TElement>;
  
  /**
   * Adds elements to the internal jQuery stack.
   * 
   * @param elements - Elements to add to the stack
   * @returns A new jQuery object
   * @internal
   */
  pushStack(elements: ArrayLike<TElement>): JQuery<TElement>;
  
  /**
   * Number of elements in the jQuery collection.
   */
  readonly length: number;
  
  /**
   * Array-like index access to elements.
   */
  [index: number]: TElement;
}