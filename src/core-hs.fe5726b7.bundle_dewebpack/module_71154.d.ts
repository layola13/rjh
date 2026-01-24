/**
 * Creates a property on an object with the specified value.
 * Uses Object.defineProperty when available (ES5+), otherwise falls back to direct assignment.
 * 
 * @module PropertyCreator
 */

/**
 * Checks if the environment supports ES5+ property descriptors
 */
declare const DESCRIPTORS_SUPPORTED: boolean;

/**
 * Object.defineProperty wrapper with descriptor configuration
 */
declare const defineProperty: {
  /**
   * Defines a new property directly on an object, or modifies an existing property
   * @param target - The object on which to define the property
   * @param propertyKey - The name or Symbol of the property to be defined or modified
   * @param descriptor - The descriptor for the property being defined or modified
   * @returns The object that was passed to the function
   */
  f<T extends object, K extends PropertyKey>(
    target: T,
    propertyKey: K,
    descriptor: PropertyDescriptor
  ): T;
};

/**
 * Creates a property descriptor object
 * @param attributes - Attribute flags (bitmap)
 * @param value - The value associated with the property
 * @returns A property descriptor object
 */
declare function createPropertyDescriptor(
  attributes: number,
  value: unknown
): PropertyDescriptor;

/**
 * Creates or assigns a property on an object.
 * In ES5+ environments, uses Object.defineProperty with writable descriptor.
 * In legacy environments, performs direct property assignment.
 * 
 * @param target - The target object to modify
 * @param propertyKey - The property name to create or modify
 * @param value - The value to assign to the property
 * @returns The modified target object
 * 
 * @example
 *