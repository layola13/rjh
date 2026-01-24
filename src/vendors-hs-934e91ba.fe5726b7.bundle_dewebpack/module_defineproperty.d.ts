/**
 * Module: module_defineProperty
 * 
 * Provides utilities for defining properties on objects with specific descriptors.
 * This module typically handles property definition with configurable attributes
 * like enumerable, writable, and configurable flags.
 */

/**
 * Defines a property on an object with the specified descriptor.
 * 
 * @param target - The object on which to define the property
 * @param propertyKey - The name or Symbol of the property to be defined
 * @param descriptor - The descriptor for the property being defined or modified
 * @returns The object that was passed to the function
 */
export declare function defineProperty<T extends object, K extends PropertyKey>(
  target: T,
  propertyKey: K,
  descriptor: PropertyDescriptor
): T;

/**
 * Helper function to create a property descriptor with default values.
 * 
 * @param value - The value associated with the property
 * @param writable - Whether the value can be changed (default: true)
 * @param enumerable - Whether the property shows up in enumeration (default: true)
 * @param configurable - Whether the property can be deleted or modified (default: true)
 * @returns A property descriptor object
 */
export declare function createDescriptor(
  value: unknown,
  writable?: boolean,
  enumerable?: boolean,
  configurable?: boolean
): PropertyDescriptor;