/**
 * Object.assign polyfill implementation
 * 
 * Provides a compliant implementation of Object.assign for environments where
 * the native implementation is missing or broken. Falls back to native assign
 * if it passes compliance tests.
 * 
 * @module ObjectAssignPolyfill
 */

/**
 * Polyfilled Object.assign implementation or native if available
 * 
 * Copies all enumerable own properties from one or more source objects to a
 * target object and returns the target object.
 * 
 * @param target - The target object to copy properties to
 * @param sources - One or more source objects to copy properties from
 * @returns The target object with properties copied from sources
 */
export function assign<T extends object, U>(
  target: T,
  source: U
): T & U;

export function assign<T extends object, U, V>(
  target: T,
  source1: U,
  source2: V
): T & U & V;

export function assign<T extends object, U, V, W>(
  target: T,
  source1: U,
  source2: V,
  source3: W
): T & U & V & W;

export function assign(target: object, ...sources: any[]): any;

/**
 * Tests whether the native Object.assign implementation is compliant
 * 
 * Checks if:
 * - Symbol properties are copied correctly
 * - All string keys are preserved in correct order
 * 
 * @internal
 */
declare function testNativeAssign(): boolean;

/**
 * Gets all enumerable own property keys (strings) of an object
 * @internal
 */
declare function getOwnPropertyKeys(obj: object): string[];

/**
 * Gets all enumerable own property symbols of an object
 * @internal
 */
declare function getOwnPropertySymbols(obj: object): symbol[];

/**
 * Checks if an object has an own property (not inherited)
 * @internal
 */
declare function hasOwnProperty(obj: object, key: PropertyKey): boolean;

/**
 * Converts a value to an object (wraps primitives, validates non-null)
 * @internal
 */
declare function toObject<T>(value: T): T extends object ? T : Object;

/**
 * Converts a value to an indexed object for iteration
 * @internal
 */
declare function toIndexedObject(value: any): object;

export default assign;