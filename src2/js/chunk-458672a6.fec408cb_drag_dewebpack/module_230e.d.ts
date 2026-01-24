/**
 * Creates a DOM element if the environment supports it, otherwise returns an empty object.
 * This utility is commonly used for feature detection in environments where the DOM may not be available.
 * 
 * @module DOMElementCreator
 */

/**
 * Type guard function to check if a value is an object type.
 * Used to verify that the global document object exists and is valid.
 * 
 * @param value - The value to check
 * @returns True if the value is an object, false otherwise
 */
declare function isObject(value: unknown): value is object;

/**
 * Global document object interface reference.
 * Represents the browser's document API.
 */
declare const document: Document | undefined;

/**
 * Creates a DOM element with the specified tag name if createElement is supported.
 * Falls back to an empty object in non-DOM environments (e.g., Node.js without jsdom).
 * 
 * @param tagName - The HTML tag name of the element to create (e.g., 'div', 'span', 'a')
 * @returns A newly created DOM element, or an empty object if DOM is not available
 * 
 * @example
 *