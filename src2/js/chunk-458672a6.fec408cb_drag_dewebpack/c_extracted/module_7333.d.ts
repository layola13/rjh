/**
 * Object.assign polyfill implementation
 * 
 * Provides a polyfill for Object.assign that handles Symbol properties correctly.
 * Falls back to native Object.assign if it works properly with Symbols.
 * 
 * @module ObjectAssignPolyfill
 */

/**
 * Converts a value to an object
 * @internal
 */
declare function toObject(value: any): object;

/**
 * Gets own property symbols of an object
 * @internal
 */
declare const getOwnPropertySymbols: {
  f: (obj: object) => symbol[];
};

/**
 * Checks if a property is enumerable
 * @internal
 */
declare const propertyIsEnumerable: {
  f: (this: object, prop: PropertyKey) => boolean;
};

/**
 * Gets own property keys (string keys) of an object
 * @internal
 */
declare function getOwnPropertyKeys(obj: object): string[];

/**
 * Converts a value to an indexed object
 * @internal
 */
declare function toIndexedObject(value: any): object;

/**
 * Tests if a function throws an error
 * @internal
 */
declare function fails(fn: () => void): boolean;

/**
 * Polyfill implementation of Object.assign
 * 
 * Copies all enumerable own properties (including Symbol properties) from one or more
 * source objects to a target object.
 * 
 * @param target - The target object to copy properties to
 * @param sources - One or more source objects to copy properties from
 * @returns The modified target object
 * 
 * @example
 *