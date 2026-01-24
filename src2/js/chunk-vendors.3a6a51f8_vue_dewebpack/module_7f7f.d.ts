/**
 * ES5 Polyfill: Function.prototype.name property descriptor
 * 
 * This module adds a 'name' property getter to Function.prototype for environments
 * that don't natively support it. The name is extracted from the function's toString()
 * representation using a regular expression.
 * 
 * @module function-name-polyfill
 * @dependencies
 *   - Object.defineProperty utility (module 86cc)
 *   - Environment feature detection (module 9e1e)
 */

/**
 * Property descriptor configuration for Object.defineProperty
 */
interface PropertyDescriptor {
  /** Whether the property descriptor can be changed and property can be deleted */
  configurable?: boolean;
  /** Whether the property shows up during enumeration */
  enumerable?: boolean;
  /** Property value (mutually exclusive with get/set) */
  value?: unknown;
  /** Whether the property can be changed with assignment operator */
  writable?: boolean;
  /** Getter function for the property */
  get?(): unknown;
  /** Setter function for the property */
  set?(value: unknown): void;
}

/**
 * Object.defineProperty wrapper utility
 */
interface DefinePropertyUtil {
  /**
   * Defines a new property directly on an object, or modifies an existing property
   * @param target - The object on which to define the property
   * @param propertyKey - The name of the property to be defined or modified
   * @param attributes - The descriptor for the property being defined or modified
   * @returns The object that was passed to the function
   */
  f<T extends object>(
    target: T,
    propertyKey: PropertyKey,
    attributes: PropertyDescriptor
  ): T;
}

/**
 * Environment feature detection flag
 * Indicates whether the current environment supports ES5 features
 */
type ES5Support = boolean;

/**
 * Global Function constructor interface extension
 */
declare global {
  interface Function {
    /**
     * Returns the name of the function.
     * For anonymous functions, returns an empty string.
     * 
     * @example
     *