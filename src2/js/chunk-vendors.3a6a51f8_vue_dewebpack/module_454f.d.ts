/**
 * Object.defineProperty polyfill wrapper
 * 
 * Defines a new property directly on an object, or modifies an existing property,
 * and returns the object.
 * 
 * @module ObjectDefinePropertyPolyfill
 */

/**
 * Property descriptor for defining or modifying object properties
 */
interface PropertyDescriptor {
  /** Indicates whether the property can be changed or deleted */
  configurable?: boolean;
  /** Indicates whether the property shows up during enumeration */
  enumerable?: boolean;
  /** The value associated with the property */
  value?: any;
  /** Indicates whether the value can be changed with an assignment operator */
  writable?: boolean;
  /** A function serving as a getter for the property */
  get?(): any;
  /** A function serving as a setter for the property */
  set?(value: any): void;
}

/**
 * Defines a new property directly on an object, or modifies an existing property
 * on an object, and returns the object.
 * 
 * @param target - The object on which to define the property
 * @param propertyKey - The name or Symbol of the property to be defined or modified
 * @param attributes - The descriptor for the property being defined or modified
 * @returns The object that was passed to the function
 * 
 * @example
 *