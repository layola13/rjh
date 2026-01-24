/**
 * Checks if a value is a plain object (created by Object constructor or with null prototype)
 */

/**
 * Reference to the global object in different environments
 */
declare const globalObject: typeof globalThis;

/**
 * Reference to the Symbol constructor, if available
 */
declare const SymbolConstructor: SymbolConstructor | undefined;

/**
 * Gets the string tag of a value using Symbol.toStringTag if available
 * @param value - The value to inspect
 * @returns The string representation of the value's type
 */
declare function getTag(value: unknown): string;

/**
 * Gets the raw type string of a value using Object.prototype.toString
 * @param value - The value to inspect
 * @returns The raw object string (e.g., "[object Object]")
 */
declare function getRawTag(value: unknown): string;

/**
 * Gets the prototype of an object
 * @param value - The value whose prototype to retrieve
 * @returns The prototype object or null
 */
declare function getPrototype(value: unknown): object | null;

/**
 * Checks if a value is an object type (excluding null)
 * @param value - The value to check
 * @returns True if the value is an object, false otherwise
 */
declare function isObjectLike(value: unknown): value is object;

/**
 * Checks if a value is a plain object.
 * A plain object is an object created by the Object constructor or one with a null prototype.
 * 
 * @param value - The value to check
 * @returns True if the value is a plain object, false otherwise
 * 
 * @example
 *