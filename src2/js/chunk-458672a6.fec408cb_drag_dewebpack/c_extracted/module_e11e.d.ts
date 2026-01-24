/**
 * Object prototype method names that may not be enumerable in all environments.
 * 
 * This array contains the names of standard Object.prototype methods that may have
 * enumerable issues in legacy JavaScript engines (particularly IE < 9).
 * 
 * These methods are:
 * - constructor: Returns a reference to the Object constructor function
 * - hasOwnProperty: Checks if object has a property as own (not inherited)
 * - isPrototypeOf: Checks if an object exists in another object's prototype chain
 * - propertyIsEnumerable: Checks if a property is enumerable
 * - toLocaleString: Returns a string representing the object (locale-aware)
 * - toString: Returns a string representing the object
 * - valueOf: Returns the primitive value of the object
 * 
 * @module NonEnumerableProps
 */

/**
 * Array of Object.prototype method names that require special handling
 * for enumeration in legacy environments.
 */
declare const nonEnumerableProps: readonly [
  "constructor",
  "hasOwnProperty",
  "isPrototypeOf",
  "propertyIsEnumerable",
  "toLocaleString",
  "toString",
  "valueOf"
];

export default nonEnumerableProps;

export type NonEnumerablePropertyName =
  | "constructor"
  | "hasOwnProperty"
  | "isPrototypeOf"
  | "propertyIsEnumerable"
  | "toLocaleString"
  | "toString"
  | "valueOf";