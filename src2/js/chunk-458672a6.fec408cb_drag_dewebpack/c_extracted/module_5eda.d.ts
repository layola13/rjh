/**
 * Object method polyfill utility
 * 
 * This module provides a utility function for safely polyfilling Object static methods.
 * It wraps the original method, applies transformations, and exports it with error handling.
 * 
 * @module ObjectMethodPolyfill
 */

/**
 * Polyfills an Object static method with enhanced functionality
 * 
 * @template T - The type of the original method being polyfilled
 * @param methodName - The name of the Object static method to polyfill (e.g., 'keys', 'values', 'entries')
 * @param enhancer - A function that receives the original method and returns an enhanced version
 * @returns void - The polyfill is applied as a side effect
 * 
 * @example
 *