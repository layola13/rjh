/**
 * Creates a DOM element or returns an empty object fallback.
 * 
 * This module provides a safe way to create DOM elements that works in both
 * browser and non-browser environments. If the document and createElement
 * are available, it creates a real DOM element; otherwise, it returns an
 * empty object as a fallback.
 * 
 * @module DOMElementCreator
 */

/**
 * Type guard to check if a value is a valid object.
 */
export type IsObject = (value: unknown) => value is object;

/**
 * Document interface with createElement method.
 */
export interface DocumentLike {
  createElement(tagName: string): HTMLElement;
}

/**
 * Global context interface containing document.
 */
export interface GlobalContext {
  document?: DocumentLike;
}

/**
 * Creates a DOM element with the specified tag name, or returns an empty
 * object if DOM creation is not supported in the current environment.
 * 
 * @param tagName - The HTML tag name of the element to create (e.g., 'div', 'span')
 * @returns A newly created DOM element, or an empty object if creation is not possible
 * 
 * @example
 *