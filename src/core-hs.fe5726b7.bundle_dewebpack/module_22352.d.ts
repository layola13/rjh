/**
 * List of non-enumerable properties inherited from Object.prototype
 * that should be checked when iterating over object properties.
 * 
 * These properties exist on all JavaScript objects but are not returned
 * by Object.keys() or for...in loops by default.
 * 
 * @module ObjectPrototypeProperties
 */

/**
 * Array of property names from Object.prototype that are typically
 * non-enumerable but may need explicit handling in property iteration scenarios.
 * 
 * Commonly used for:
 * - Polyfilling Object.keys() in older environments
 * - Deep cloning operations that need to check inherited properties
 * - Property enumeration utilities that need comprehensive coverage
 */
export declare const OBJECT_PROTOTYPE_PROPERTIES: readonly [
  "constructor",
  "hasOwnProperty",
  "isPrototypeOf",
  "propertyIsEnumerable",
  "toLocaleString",
  "toString",
  "valueOf"
];

export default OBJECT_PROTOTYPE_PROPERTIES;