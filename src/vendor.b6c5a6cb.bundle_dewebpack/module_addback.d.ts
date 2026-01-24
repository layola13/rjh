/**
 * Adds the previous set of elements on the stack to the current set, optionally filtered by a selector.
 * 
 * @description
 * The .addBack() method is useful when traversing the DOM and you want to include
 * the previous set of elements in the current matched set. It can optionally take
 * a selector to filter the previous set.
 * 
 * @template TElement - The type of DOM elements in the collection
 * @param {string | undefined | null} [selector] - A string containing a selector expression to match elements against
 * @returns {JQuery<TElement>} A new jQuery object containing the combined set of elements
 * 
 * @example
 * // Add all list items and their parent ul to the set
 * $('li.third-item').siblings().addBack();
 * 
 * @example
 * // Add only list items from the previous set
 * $('li.third-item').siblings().addBack('.third-item');
 */
declare function addBack<TElement extends HTMLElement>(
  selector?: string | null
): JQuery<TElement>;

/**
 * jQuery collection interface extension for addBack method
 */
interface JQuery<TElement = HTMLElement> {
  /**
   * Adds the previous set of elements on the stack to the current set, optionally filtered by a selector.
   * 
   * @param {string | null} [selector] - Optional selector to filter the previous set of elements
   * @returns {JQuery<TElement>} jQuery object containing current elements plus previous elements
   */
  addBack(selector?: string | null): JQuery<TElement>;
  
  /**
   * Reference to the previous set of elements in the jQuery chain
   * @internal
   */
  prevObject: JQuery<TElement>;
}