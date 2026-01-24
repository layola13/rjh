/**
 * Polyfill for Reflect.ownKeys
 * Returns an array of the target object's own property keys (both string and symbol keys).
 * Falls back to a manual implementation if Reflect.ownKeys is not natively available.
 * 
 * @module ReflectOwnKeys
 */

/**
 * Returns all own property keys (including non-enumerable and symbol properties) of an object.
 * Combines the results of Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
 * 
 * @param target - The object whose own property keys are to be returned
 * @returns An array containing all own property keys (strings and symbols)
 * @throws {TypeError} If target is not an object
 * 
 * @example
 *