/**
 * Non-enumerable Object.prototype properties
 * 
 * This module exports an array of property names that exist on Object.prototype
 * but are not enumerable in standard JavaScript implementations. These properties
 * are often skipped by for-in loops and Object.keys(), but may need special handling
 * in polyfills, enumeration utilities, or object introspection tools.
 * 
 * @module NonEnumerableProperties
 */

/**
 * Array of standard Object.prototype method names that are typically non-enumerable.
 * 
 * These include:
 * - constructor: Reference to the constructor function
 * - hasOwnProperty: Checks if object has own property
 * - isPrototypeOf: Checks if object is in prototype chain
 * - propertyIsEnumerable: Checks if property is enumerable
 * - toLocaleString: Returns locale-specific string representation
 * - toString: Returns string representation
 * - valueOf: Returns primitive value of object
 */
declare const nonEnumerableProperties: readonly [
  "constructor",
  "hasOwnProperty",
  "isPrototypeOf",
  "propertyIsEnumerable",
  "toLocaleString",
  "toString",
  "valueOf"
];

export default nonEnumerableProperties;