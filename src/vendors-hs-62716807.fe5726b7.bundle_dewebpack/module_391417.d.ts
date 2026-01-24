/**
 * Defines or updates a property on an object with a specified key and value.
 * If the key already exists, it uses Object.defineProperty to set the value with a property descriptor.
 * Otherwise, it directly assigns the value to the object.
 * 
 * @module PropertySetter
 */

import type { PropertyKey } from './types';

/**
 * Property descriptor configuration
 */
interface PropertyDescriptor {
  value?: unknown;
  writable?: boolean;
  enumerable?: boolean;
  configurable?: boolean;
  get?(): unknown;
  set?(value: unknown): void;
}

/**
 * Object.defineProperty wrapper interface
 */
interface DefinePropertyFunction {
  f<T extends object>(
    target: T,
    propertyKey: PropertyKey,
    descriptor: PropertyDescriptor
  ): T;
}

/**
 * Converts a value to a property key (string or symbol)
 */
type ToPropertyKeyFunction = (value: unknown) => PropertyKey;

/**
 * Creates a property descriptor with specified attributes
 */
type CreateDescriptorFunction = (
  attributes: number,
  value: unknown
) => PropertyDescriptor;

/**
 * Sets a property on an object. If the property exists, uses Object.defineProperty
 * with a descriptor; otherwise performs direct assignment.
 * 
 * @param target - The target object to set the property on
 * @param key - The property key (will be converted to PropertyKey type)
 * @param value - The value to set for the property
 */
declare function setProperty<T extends object>(
  target: T,
  key: unknown,
  value: unknown
): void;

export default setProperty;