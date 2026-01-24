/**
 * Detects if the environment supports Object.defineProperty on DOM elements.
 * 
 * This module checks whether the JavaScript engine correctly implements
 * Object.defineProperty for DOM elements by testing if a getter returns
 * the expected value (7) when defined on a div element.
 * 
 * @module BrowserPropertyDescriptorSupport
 */

/**
 * Checks if the environment is a standard browser environment (non-descriptor).
 * Imported from module 63855.
 */
declare const IS_PURE: boolean;

/**
 * Utility function to detect if a function throws an error.
 * Imported from module 87524.
 * 
 * @param fn - The function to test for errors
 * @returns true if the function throws an error, false otherwise
 */
declare function fails(fn: () => unknown): boolean;

/**
 * Creates a DOM element by tag name.
 * Imported from module 50312.
 * 
 * @param tagName - The HTML tag name to create
 * @returns The created DOM element
 */
declare function documentCreateElement(tagName: string): HTMLElement;

/**
 * Indicates whether the environment lacks native support for Object.defineProperty
 * on DOM elements. Returns true if:
 * - Not in a pure/standard browser environment (!IS_PURE)
 * - AND Object.defineProperty fails to work correctly on DOM elements
 * 
 * The test creates a div element and attempts to define a property 'a' with a getter
 * that returns 7. If the property access doesn't return 7, defineProperty is broken.
 */
declare const DESCRIPTORS_NOT_SUPPORTED: boolean;

export = DESCRIPTORS_NOT_SUPPORTED;