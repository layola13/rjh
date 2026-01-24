/**
 * Object.getPrototypeOf polyfill for legacy environments
 * 
 * Provides a fallback implementation for retrieving an object's prototype.
 * Handles edge cases including:
 * - Objects with internal [[Prototype]] property
 * - Constructor-based prototype chains
 * - Objects inheriting from Object.prototype
 * - Non-object primitives (converts to objects first)
 * 
 * @module ObjectGetPrototype
 */

/**
 * Checks if an object has a specific property as own property
 * @param target - The object to check
 * @param property - The property key to look for
 * @returns True if the property exists as own property
 */
declare function hasOwnProperty(target: object, property: PropertyKey): boolean;

/**
 * Converts a value to an object, throwing if null or undefined
 * @param value - The value to convert
 * @returns The converted object
 * @throws TypeError if value is null or undefined
 */
declare function toObject(value: unknown): object;

/**
 * Gets the internal prototype storage key for IE compatibility
 * Used to access the [[Prototype]] internal slot in legacy browsers
 */
declare const IE_PROTO_KEY: string;

/**
 * Retrieves the prototype of an object
 * 
 * Implementation priority:
 * 1. Native Object.getPrototypeOf if available
 * 2. Internal [[Prototype]] property (IE_PROTO)
 * 3. Constructor.prototype if object is instance of constructor
 * 4. Object.prototype for plain objects
 * 5. null for objects with no prototype
 * 
 * @param target - The object whose prototype is to be retrieved
 * @returns The prototype of the given object, or null if none exists
 * 
 * @example
 *