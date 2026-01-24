/**
 * Property descriptors module
 * Provides a polyfill for Object.defineProperties in environments that don't support it natively
 */

/**
 * Property descriptor interface defining the attributes of an object property
 */
interface PropertyDescriptor {
  /** Property value */
  value?: any;
  /** Getter function */
  get?(): any;
  /** Setter function */
  set?(value: any): void;
  /** Property can be changed and deleted */
  configurable?: boolean;
  /** Property shows up during enumeration */
  enumerable?: boolean;
  /** Property value can be changed */
  writable?: boolean;
}

/**
 * Map of property names to their descriptors
 */
interface PropertyDescriptorMap {
  [propertyName: string]: PropertyDescriptor;
}

/**
 * Module exports containing the property definition function
 */
export interface DefinePropertiesModule {
  /**
   * Defines multiple properties on an object
   * 
   * @template T - The type of the target object
   * @param target - The object on which to define or modify properties
   * @param properties - An object whose keys represent property names and values are property descriptors
   * @returns The target object with the newly defined properties
   * 
   * @remarks
   * This function either uses the native Object.defineProperties implementation
   * or provides a polyfill that iterates through property descriptors and defines each one
   * 
   * @example
   *