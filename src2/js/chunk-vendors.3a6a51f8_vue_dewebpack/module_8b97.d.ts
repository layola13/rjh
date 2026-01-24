/**
 * Prototype manipulation utilities for safely setting object prototypes.
 * 
 * @module PrototypeUtils
 * @remarks
 * This module provides functionality to set prototypes in a cross-environment manner,
 * falling back from Object.setPrototypeOf to __proto__ when necessary.
 */

/**
 * Checks if a value is a valid object (non-null and typeof 'object' or 'function').
 * 
 * @param value - The value to check
 * @returns True if the value is a valid object
 */
declare function isObject(value: unknown): value is object;

/**
 * Validates that a value is an object (throws if not).
 * 
 * @param value - The value to validate
 * @throws {TypeError} If the value is not an object
 */
declare function assertObject(value: unknown): asserts value is object;

/**
 * Creates a bound function context with specified thisArg and arity.
 * 
 * @param fn - The function to bind
 * @param thisArg - The context to bind to
 * @param arity - The number of arguments
 * @returns A bound function
 */
declare function createContext<T extends (...args: any[]) => any>(
  fn: T,
  thisArg: any,
  arity: number
): T;

/**
 * Gets a property descriptor for a given object and property key.
 * 
 * @param obj - The object to inspect
 * @param key - The property key
 * @returns The property descriptor if found
 */
declare function getPropertyDescriptor(
  obj: object,
  key: PropertyKey
): PropertyDescriptor | undefined;

/**
 * Validates prototype assignment parameters.
 * 
 * @param target - The object whose prototype will be set
 * @param proto - The new prototype value (must be an object or null)
 * @throws {TypeError} If target is not an object
 * @throws {TypeError} If proto is neither an object nor null
 */
export declare function check(target: unknown, proto: unknown): void;

/**
 * Sets the prototype of an object.
 * 
 * @param target - The object whose prototype will be set
 * @param proto - The new prototype (object or null)
 * @returns The target object with updated prototype
 * @throws {TypeError} If parameters are invalid
 * 
 * @remarks
 * Implementation strategy:
 * 1. Uses Object.setPrototypeOf if available
 * 2. Falls back to __proto__ assignment if supported
 * 3. Returns undefined if neither method is available
 */
export declare const set:
  | ((target: object, proto: object | null) => object)
  | undefined;

/**
 * Prototype utilities interface.
 */
export interface PrototypeUtils {
  /**
   * Sets the prototype of an object (may be undefined in unsupported environments).
   */
  set: typeof set;
  
  /**
   * Validates prototype assignment parameters.
   */
  check: typeof check;
}

declare const prototypeUtils: PrototypeUtils;

export default prototypeUtils;