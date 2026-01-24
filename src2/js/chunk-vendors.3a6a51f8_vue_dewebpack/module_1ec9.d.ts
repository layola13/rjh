/**
 * DOM element creation utility for cross-environment compatibility.
 * Creates DOM elements when available, otherwise returns empty objects.
 * 
 * @module DOMElementFactory
 */

/**
 * Checks if a value is an object type.
 * 
 * @param value - The value to check
 * @returns True if the value is an object, false otherwise
 */
declare function isObject(value: unknown): value is object;

/**
 * Global document reference for DOM operations.
 * May be undefined in non-browser environments.
 */
declare const globalDocument: Document | undefined;

/**
 * Creates a DOM element if the environment supports it, otherwise returns an empty object.
 * Useful for maintaining compatibility across different JavaScript environments (browser/Node.js).
 * 
 * @param tagName - The HTML tag name of the element to create (e.g., 'div', 'span', 'input')
 * @returns A new DOM element if document.createElement is available, otherwise an empty object
 * 
 * @example
 *