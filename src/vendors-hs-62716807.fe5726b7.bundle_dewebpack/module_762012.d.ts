/**
 * Object.prototype.toString polyfill module
 * 
 * Provides a fallback implementation for toString that returns
 * the object's internal [[Class]] property in the format "[object ClassName]"
 * 
 * @module ObjectToStringPolyfill
 */

/**
 * Checks if native Object.prototype.toString is correctly implemented
 * @returns {boolean} True if native implementation works correctly
 */
declare function hasNativeToString(): boolean;

/**
 * Gets the internal [[Class]] name of an object
 * @param {unknown} obj - The object to classify
 * @returns {string} The class name (e.g., "Array", "Object", "String")
 */
declare function classof(obj: unknown): string;

/**
 * Custom toString implementation that returns the object's class tag
 * @this {unknown} The object context
 * @returns {string} String representation in format "[object ClassName]"
 */
declare function customToString(this: unknown): string;

/**
 * Exported toString function
 * Uses native implementation if available, otherwise falls back to custom implementation
 */
declare const toStringPolyfill: typeof Object.prototype.toString;

export = toStringPolyfill;