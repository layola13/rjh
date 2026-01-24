/**
 * Object property definition utilities
 * Provides a polyfill for Object.defineProperty with accessor validation
 */

import { AnObject } from './cb7c';
import { IEObjectDefinePropertySupport } from './c69a';
import { ToPrimitive } from './6a99';
import { DescriptorsSupport } from './9e1e';

/**
 * Property descriptor interface
 */
interface PropertyDescriptor {
  /** Property value */
  value?: any;
  /** Getter function */
  get?: () => any;
  /** Setter function */
  set?: (value: any) => void;
  /** Whether property is writable */
  writable?: boolean;
  /** Whether property is enumerable */
  enumerable?: boolean;
  /** Whether property is configurable */
  configurable?: boolean;
}

/**
 * Define property function signature
 * @param target - Target object to define property on
 * @param propertyKey - Name of the property to define
 * @param descriptor - Property descriptor
 * @returns The modified target object
 * @throws {TypeError} If accessors (get/set) are not supported
 */
export function defineProperty<T extends object>(
  target: T,
  propertyKey: PropertyKey,
  descriptor: PropertyDescriptor
): T;

/**
 * Object.defineProperty polyfill with fallback behavior
 * Uses native Object.defineProperty when descriptors are supported,
 * otherwise falls back to simple property assignment for value descriptors
 */
export const f: typeof defineProperty = DescriptorsSupport
  ? Object.defineProperty
  : function <T extends object>(
      target: T,
      propertyKey: PropertyKey,
      descriptor: PropertyDescriptor
    ): T {
      // Validate target is an object
      AnObject(target);
      
      // Convert property key to primitive
      propertyKey = ToPrimitive(propertyKey, true);
      
      // Validate descriptor is an object
      AnObject(descriptor);

      // Handle IE8 Object.defineProperty support
      if (IEObjectDefinePropertySupport) {
        try {
          return Object.defineProperty(target, propertyKey, descriptor);
        } catch (error) {
          // Fall through to manual assignment
        }
      }

      // Throw error if accessors are used (not supported in fallback)
      if ('get' in descriptor || 'set' in descriptor) {
        throw new TypeError('Accessors not supported!');
      }

      // Simple value assignment fallback
      if ('value' in descriptor) {
        (target as any)[propertyKey] = descriptor.value;
      }

      return target;
    };