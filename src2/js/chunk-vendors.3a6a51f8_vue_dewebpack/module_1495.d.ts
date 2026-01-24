/**
 * Object.defineProperties polyfill module
 * 
 * Provides a polyfill implementation for Object.defineProperties in environments
 * that don't natively support it. Falls back to manual property definition using
 * Object.defineProperty.
 * 
 * @module ObjectDefineProperties
 */

/**
 * Property descriptor object structure used by Object.defineProperty
 */
interface PropertyDescriptor {
  configurable?: boolean;
  enumerable?: boolean;
  value?: any;
  writable?: boolean;
  get?: () => any;
  set?: (value: any) => void;
}

/**
 * Map of property names to their descriptors
 */
interface PropertyDescriptorMap {
  [propertyName: string]: PropertyDescriptor;
}

/**
 * Internal module for defining a single property
 */
interface DefinePropertyModule {
  /**
   * Defines a property on an object
   * @param target - The object on which to define the property
   * @param propertyKey - The name of the property
   * @param descriptor - The descriptor for the property
   * @returns The modified object
   */
  f(target: object, propertyKey: string | symbol, descriptor: PropertyDescriptor): object;
}

/**
 * Validates and ensures an object is not null or undefined
 * @param value - The value to validate as an object
 * @returns The validated object
 * @throws TypeError if value is null or undefined
 */
declare function toObject(value: any): object;

/**
 * Gets all own property keys (string keys) of an object
 * @param obj - The object to get keys from
 * @returns Array of property keys
 */
declare function getKeys(obj: object): string[];

/**
 * Checks if Object.defineProperties is natively supported
 */
declare const hasNativeDefineProperties: boolean;

/**
 * Defines multiple properties on an object
 * 
 * This is either a reference to the native Object.defineProperties (if supported)
 * or a polyfill implementation that iterates through property descriptors and
 * applies them individually using Object.defineProperty.
 * 
 * @param target - The object on which to define or modify properties
 * @param properties - An object whose own enumerable properties constitute descriptors
 *                     for the properties to be defined or modified
 * @returns The target object with the newly defined or modified properties
 * @throws TypeError if target is null or undefined
 * 
 * @example
 *