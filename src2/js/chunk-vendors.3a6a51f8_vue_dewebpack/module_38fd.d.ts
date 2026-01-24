/**
 * Polyfill for Object.getPrototypeOf
 * 
 * Provides a cross-browser implementation of getting an object's prototype.
 * Falls back to checking the IE_PROTO property or constructor.prototype
 * when the native Object.getPrototypeOf is not available.
 * 
 * @module ObjectGetPrototypeOf
 * @dependencies
 *   - 69a8: hasOwnProperty checker
 *   - 4bf8: toObject converter
 *   - 613b: shared key getter (IE_PROTO)
 */

/**
 * Gets the prototype of an object with fallback strategies for older browsers.
 * 
 * Priority order:
 * 1. Native Object.getPrototypeOf if available
 * 2. IE_PROTO hidden property if exists
 * 3. constructor.prototype if object is instance of constructor
 * 4. Object.prototype if object is instance of Object
 * 5. null otherwise
 * 
 * @param target - The object whose prototype is to be retrieved
 * @returns The prototype of the given object, or null if no prototype exists
 */
export declare function getPrototypeOf(target: unknown): object | null;