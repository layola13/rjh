/**
 * Object property definition utilities
 * Provides a polyfill for Object.defineProperty with fallback support
 */

import { assertIsObject } from './cb7c';
import { hasDefinePropertyBug } from './c69a';
import { toPrimitive } from './6a99';
import { hasNativeDefineProperty } from './9e1e';

/**
 * Property descriptor for defining object properties
 */
interface PropertyDescriptor {
  /** Property value */
  value?: unknown;
  /** Property getter function */
  get?(): unknown;
  /** Property setter function */
  set?(value: unknown): void;
  /** Whether the property is writable */
  writable?: boolean;
  /** Whether the property is enumerable */
  enumerable?: boolean;
  /** Whether the property is configurable */
  configurable?: boolean;
}

/**
 * Defines a property on an object with specified descriptor
 * Falls back to simple assignment if native defineProperty is unavailable or fails
 * 
 * @param target - The target object on which to define the property
 * @param propertyKey - The name or Symbol of the property to be defined
 * @param descriptor - The descriptor for the property being defined
 * @returns The target object
 * @throws {TypeError} If accessors (get/set) are not supported in fallback mode
 */
declare function defineProperty(
  target: object,
  propertyKey: PropertyKey,
  descriptor: PropertyDescriptor
): object;

/**
 * Exported defineProperty function with conditional implementation
 */
export const f: typeof defineProperty;