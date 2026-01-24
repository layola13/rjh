/**
 * Browser environment detection module.
 * 
 * This module determines whether the code is running in a browser environment
 * by checking for the presence of global `window` and `document` objects,
 * and validating that certain environmental flags are not set.
 * 
 * @module BrowserDetection
 */

/**
 * Determines if the current environment is a browser.
 * 
 * The detection logic checks:
 * 1. Two environmental flags (likely for Node.js or other non-browser environments) are falsy
 * 2. The global `window` object exists and is of type "object"
 * 3. The global `document` object exists and is of type "object"
 * 
 * @returns {boolean} `true` if running in a browser environment, `false` otherwise
 */
declare const isBrowserEnvironment: boolean;

export default isBrowserEnvironment;

/**
 * Type guard function that checks the typeof an object (imported from module 194243).
 * 
 * @param value - The value to check
 * @returns The string representation of the value's type
 */
declare function getTypeOf(value: unknown): string;

/**
 * Environmental flag (from module 283747).
 * Likely indicates a Node.js or server-side environment.
 */
declare const isServerEnvironment: boolean;

/**
 * Environmental flag (from module 144151).
 * Likely indicates a specific runtime or build configuration.
 */
declare const isAlternativeRuntime: boolean;