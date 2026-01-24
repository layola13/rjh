/**
 * jQuery closest method type definition
 * Finds the first ancestor element that matches the selector
 */

/**
 * Traverses the DOM tree upward from the current element to find the first ancestor matching the selector
 * @param selector - CSS selector string or jQuery object to match against
 * @param context - Optional context element to stop traversal at
 * @returns jQuery collection containing matched ancestor elements
 */
declare function closest<TElement extends Node = HTMLElement>(
  selector: string | JQuery<TElement>,
  context?: Element
): JQuery<TElement>;

interface JQuery<TElement = HTMLElement> {
  /**
   * For each element in the set, get the first element that matches the selector 
   * by testing the element itself and traversing up through its ancestors in the DOM tree.
   * 
   * @param selector - A string containing a selector expression to match elements against
   * @param context - A DOM element within which a matching element may be found
   * @returns A jQuery object containing zero or one element for each element in the original set
   * 
   * @example
   * // Find the closest list item ancestor
   * $('li.item-a').closest('ul');
   * 
   * @example
   * // Find closest ancestor with class, stopping at a specific context
   * $('span').closest('.container', document.getElementById('main'));
   */
  closest(
    selector: string | JQuery<TElement>,
    context?: Element
  ): JQuery<TElement>;

  /**
   * Internal properties used by jQuery
   */
  readonly length: number;
  
  /**
   * Adds elements to the internal jQuery stack
   * @internal
   */
  pushStack(elements: TElement[]): JQuery<TElement>;
}

/**
 * Internal jQuery utilities
 * @internal
 */
interface JQueryStatic {
  find: {
    matchesSelector(element: Element, selector: string): boolean;
  };
  uniqueSort<T extends Node>(array: T[]): T[];
}