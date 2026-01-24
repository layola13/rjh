/**
 * Document Root Element Module
 * 
 * This module provides access to the root element (documentElement) of the DOM.
 * It safely retrieves the HTML element representing the document's root,
 * typically the <html> element in an HTML document.
 * 
 * @module DocumentElement
 * @example
 * import documentElement from './module_fab2';
 * if (documentElement) {
 *   console.log(documentElement.tagName); // "HTML"
 * }
 */

/**
 * The root element of the document (typically the <html> element).
 * Returns null if the document object is not available (e.g., in non-browser environments).
 * 
 * @type {HTMLElement | null}
 */
declare const documentElement: HTMLElement | null;

export default documentElement;

/**
 * Type alias for the document element
 * @public
 */
export type DocumentElementType = HTMLElement | null;