/**
 * jQuery-like index method
 * Returns the index of an element among its siblings or relative to a selector/element
 * 
 * @param selector - Optional selector string, jQuery object, or DOM element to compare against
 * @returns The zero-based index of the element, or -1 if not found or no element exists
 * 
 * @example
 * // Get index among siblings
 * element.index(); // returns position in parent
 * 
 * // Get index relative to selector
 * element.index('.my-class'); // returns position within matched elements
 * 
 * // Get index relative to element
 * element.index(otherElement); // returns position relative to other element
 */
declare function index(selector?: string | JQueryObject | Element): number;

/**
 * jQuery-like object interface
 */
interface JQueryObject {
  /** Flag indicating this is a jQuery object */
  jquery: string | boolean;
  /** Indexed access to wrapped elements */
  [index: number]: Element;
}

/**
 * Element with parent node reference
 */
interface Element {
  /** Parent node of the element */
  parentNode: Node | null;
}

/**
 * DOM Node interface
 */
interface Node {
  // Standard DOM Node properties
}