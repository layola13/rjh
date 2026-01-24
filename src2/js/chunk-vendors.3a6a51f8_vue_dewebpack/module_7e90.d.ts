/**
 * Object.defineProperties polyfill module
 * 
 * Provides a fallback implementation of Object.defineProperties for environments
 * that don't support it natively. This function allows defining multiple properties
 * on an object with their descriptors in a single operation.
 * 
 * @module ObjectDefineProperties
 */

/**
 * Property descriptor object that defines characteristics of a property
 */
interface PropertyDescriptor {
  /** The value associated with the property */
  value?: unknown;
  /** If true, the property may be changed and deleted */
  configurable?: boolean;
  /** If true, the property shows up during enumeration */
  enumerable?: boolean;
  /** If true, the value may be changed with assignment operator */
  writable?: boolean;
  /** A function which serves as a getter for the property */
  get?(): unknown;
  /** A function which serves as a setter for the property */
  set?(value: unknown): void;
}

/**
 * Map of property names to their descriptors
 */
interface PropertyDescriptorMap {
  [key: string]: PropertyDescriptor;
}

/**
 * Object.defineProperty implementation with descriptor support
 */
interface DefinePropertyFunction {
  /** Function signature for defining a single property */
  f<T extends object>(
    target: T,
    propertyKey: PropertyKey,
    descriptor: PropertyDescriptor
  ): T;
}

/**
 * Checks if the environment supports native Object.defineProperties
 * @returns True if native support is available
 */
declare const hasNativeDefinePropertiesSupport: () => boolean;

/**
 * Returns an array of all enumerable property names from an object
 * @param target - The object to get keys from
 * @returns Array of property keys
 */
declare const getObjectKeys: (target: object) => string[];

/**
 * Validates that a value is an object, throws if not
 * @param value - The value to validate
 * @returns The validated object
 * @throws {TypeError} If value is not an object
 */
declare const requireObjectCoercible: <T>(value: T) => T;

/**
 * Object.defineProperty polyfill
 */
declare const defineProperty: DefinePropertyFunction;

/**
 * Defines multiple properties on an object using their descriptors.
 * Falls back to manual iteration if native Object.defineProperties is not available.
 * 
 * @param target - The object on which to define or modify properties
 * @param descriptors - An object whose keys represent property names and values are property descriptors
 * @returns The modified target object
 * @throws {TypeError} If target is not an object
 * 
 * @example
 *