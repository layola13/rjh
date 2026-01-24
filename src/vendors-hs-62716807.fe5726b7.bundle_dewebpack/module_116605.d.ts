/**
 * Module: module_116605
 * Original ID: 116605
 * 
 * Defines or redefines a property on a target object with configurable options.
 * This utility allows for flexible property definition with control over enumerability,
 * writability, configurability, and global scope attachment.
 */

/**
 * Options for defining a property
 */
interface DefinePropertyOptions {
  /**
   * Whether the property should be enumerable in for...in loops
   */
  enumerable?: boolean;

  /**
   * Custom name for the property (defaults to the `propertyKey` parameter if not provided)
   */
  name?: string;

  /**
   * If true, attempts to define the property globally
   */
  global?: boolean;

  /**
   * If true, allows unsafe operations (preserves existing property to determine enumerability)
   */
  unsafe?: boolean;

  /**
   * If true, the property will not be configurable (cannot be deleted or reconfigured)
   */
  nonConfigurable?: boolean;

  /**
   * If true, the property will not be writable (read-only)
   */
  nonWritable?: boolean;
}

/**
 * Checks if a value is callable (function)
 * @param value - The value to check
 * @returns True if the value is a function
 */
declare function isCallable(value: unknown): value is Function;

/**
 * Object property descriptor definition utility
 */
declare const defineProperty: {
  /**
   * Defines a property on an object with a descriptor
   * @param target - The target object
   * @param propertyKey - The property key
   * @param descriptor - The property descriptor
   */
  f(target: object, propertyKey: PropertyKey, descriptor: PropertyDescriptor): void;
};

/**
 * Sets a function name with proper descriptor configuration
 * @param fn - The function to configure
 * @param name - The name to set
 * @param options - Additional options
 */
declare function setFunctionName(
  fn: Function,
  name: string | symbol,
  options?: DefinePropertyOptions
): void;

/**
 * Creates or updates a global property
 * @param key - The property key
 * @param value - The value to assign
 */
declare function createGlobalProperty(key: PropertyKey, value: unknown): void;

/**
 * Defines or redefines a property on a target object with specified options.
 * Handles global properties, function naming, and descriptor configuration.
 * 
 * @param target - The target object on which to define the property
 * @param propertyKey - The key of the property to define
 * @param value - The value to assign to the property
 * @param options - Configuration options for the property definition
 * @returns The target object with the property defined
 * 
 * @example
 *