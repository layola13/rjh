/**
 * Creates a DOM element using document.createElement if available in the environment.
 * Falls back to an empty object if document or createElement is not supported.
 * 
 * @module DOMElementFactory
 */

/**
 * Type guard function to check if a value is an object.
 * Imported from module d3f4.
 */
declare function isObject(value: unknown): value is object;

/**
 * Global environment object containing document reference.
 * Imported from module 7726.
 */
declare const globalEnvironment: {
  document?: Document;
};

/**
 * Creates a DOM element with the specified tag name.
 * If the environment supports DOM (browser), creates an actual element.
 * Otherwise, returns an empty object for compatibility.
 * 
 * @param tagName - The HTML tag name for the element to create (e.g., 'div', 'span')
 * @returns The created HTMLElement or an empty object if DOM is not available
 * 
 * @example
 *