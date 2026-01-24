/**
 * Feature detection module for Object.defineProperty support
 * 
 * Checks if the environment supports ES5 Object.defineProperty on DOM elements.
 * This is commonly used in polyfills to determine if property descriptors work correctly.
 * 
 * Dependencies:
 * - Module 9e1e: IE8 detection check
 * - Module 79e5: Try-catch error handler
 * - Module 230e: DOM element creator
 */

/**
 * Determines if Object.defineProperty is fully supported in the current environment.
 * 
 * Returns `true` if:
 * - Not running in IE8 (module 9e1e returns falsy)
 * - OR if Object.defineProperty on DOM elements fails to work correctly
 * 
 * The test creates a div element and tries to define a getter that returns 7.
 * If the property access doesn't return 7, it means defineProperty is broken.
 * 
 * @returns {boolean} True if defineProperty is NOT supported or broken
 */
export declare function isDefinePropertyBroken(): boolean;

/**
 * Type definitions for dependency modules
 */

/**
 * Module 9e1e: Checks if running in IE8 environment
 * @returns {boolean} True if running in IE8
 */
declare function isIE8(): boolean;

/**
 * Module 79e5: Safe error handler wrapper
 * @param {() => unknown} fn - Function to execute with error handling
 * @returns {boolean} True if function threw an error
 */
declare function tryCatch(fn: () => unknown): boolean;

/**
 * Module 230e: Creates a DOM element with given tag name
 * @param {string} tagName - HTML tag name (e.g., "div")
 * @returns {HTMLElement} Created DOM element
 */
declare function createElement(tagName: string): HTMLElement;

/**
 * Property descriptor configuration for Object.defineProperty test
 */
interface PropertyDescriptor {
  /**
   * Getter function that should return the value 7
   */
  get(): number;
}