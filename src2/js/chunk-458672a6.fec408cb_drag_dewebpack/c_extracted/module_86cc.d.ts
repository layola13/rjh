/**
 * Object property definition module
 * Provides a polyfill for Object.defineProperty with fallback support for older environments
 */

/**
 * Property descriptor interface for defining object properties
 */
interface PropertyDescriptor {
  /** Property value */
  value?: any;
  /** Property getter function */
  get?: () => any;
  /** Property setter function */
  set?: (value: any) => void;
  /** Whether the property is writable */
  writable?: boolean;
  /** Whether the property is enumerable */
  enumerable?: boolean;
  /** Whether the property is configurable */
  configurable?: boolean;
}

/**
 * Object property definition exports
 */
export interface ObjectDefinePropertyExports {
  /**
   * Defines a new property or modifies an existing property on an object
   * 
   * @param target - The object on which to define the property
   * @param propertyKey - The name or Symbol of the property to be defined or modified
   * @param descriptor - The descriptor for the property being defined or modified
   * @returns The object that was passed to the function
   * @throws {TypeError} If target or descriptor is not an object
   * @throws {TypeError} If accessors (get/set) are not supported in fallback mode
   */
  f(
    target: object,
    propertyKey: PropertyKey,
    descriptor: PropertyDescriptor
  ): object;
}

/**
 * Validates that a value is an object
 * @internal
 */
declare function assertIsObject(value: any): object;

/**
 * Checks if IE8 DOM property definition bug exists
 * @internal
 */
declare function hasIE8DOMDefinePropertyBug(): boolean;

/**
 * Converts a value to a property key (string or symbol)
 * @internal
 */
declare function toPropertyKey(value: any, hint: boolean): PropertyKey;

/**
 * Checks if ES5 Object.defineProperty is fully supported
 * @internal
 */
declare function isES5Supported(): boolean;

declare const exports: ObjectDefinePropertyExports;
export default exports;