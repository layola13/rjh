/**
 * Module: module_711282
 * Original ID: 711282
 * 
 * Provides a polyfill for Object.getPrototypeOf that works across different JavaScript environments.
 * Falls back to __proto__, constructor.prototype, or Object.prototype depending on availability.
 */

/**
 * Checks if an object has a specific property.
 * @param target - The object to check
 * @param property - The property key to look for
 * @returns True if the property exists on the object
 */
declare function hasOwnProperty(target: object, property: string | symbol): boolean;

/**
 * Checks if a value is callable (function).
 * @param value - The value to check
 * @returns True if the value is a function
 */
declare function isCallable(value: unknown): value is Function;

/**
 * Converts a value to an object, throwing if null or undefined.
 * @param value - The value to convert
 * @returns The converted object
 * @throws TypeError if value is null or undefined
 */
declare function toObject(value: unknown): object;

/**
 * Retrieves a shared key for storing prototype references.
 * @param key - The identifier for the shared key
 * @returns The shared key string or symbol
 */
declare function getSharedKey(key: string): string | symbol;

/**
 * Determines if native getPrototypeOf is available and reliable.
 */
declare const supportsNativeGetPrototypeOf: boolean;

/**
 * Symbol or string key used to store prototype references in objects.
 */
declare const IE_PROTO_KEY: string | symbol;

/**
 * Gets the prototype of an object.
 * 
 * This function provides a cross-environment implementation of Object.getPrototypeOf:
 * 1. First checks for __proto__ property (IE_PROTO)
 * 2. Falls back to constructor.prototype if constructor is callable and object is an instance
 * 3. Returns Object.prototype if object is an Object instance
 * 4. Returns null otherwise
 * 
 * @param target - The object whose prototype is to be retrieved
 * @returns The prototype of the object, or null if none exists
 * 
 * @example
 *