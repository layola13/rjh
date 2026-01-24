/**
 * Defines a property on an object with a specified value.
 * 
 * This module provides a cross-environment property definition utility that:
 * - Uses Object.defineProperty when available (via descriptors support check)
 * - Falls back to direct property assignment for legacy environments
 * 
 * @module PropertyDefiner
 */

/**
 * Property descriptor configuration
 */
interface PropertyDescriptor {
  value: unknown;
  writable?: boolean;
  enumerable?: boolean;
  configurable?: boolean;
}

/**
 * Object property definition utility interface
 */
interface ObjectDefineProperty {
  /**
   * Defines a property on an object
   * @param obj - Target object
   * @param prop - Property key
   * @param descriptor - Property descriptor
   */
  f<T extends object, K extends PropertyKey>(
    obj: T,
    prop: K,
    descriptor: PropertyDescriptor
  ): T & Record<K, unknown>;
}

/**
 * Creates a property descriptor with specified attributes
 * @param bitmap - Bitmask for descriptor flags (e.g., writable, enumerable, configurable)
 * @param value - The property value
 * @returns Property descriptor object
 */
declare function createDescriptor(
  bitmap: number,
  value: unknown
): PropertyDescriptor;

/**
 * Defines a property on an object.
 * 
 * In modern environments with descriptor support:
 * - Uses Object.defineProperty with a descriptor created from bitmap flags
 * 
 * In legacy environments:
 * - Falls back to direct property assignment
 * 
 * @param target - The object on which to define the property
 * @param propertyKey - The name of the property to define or modify
 * @param value - The value associated with the property
 * @returns The target object with the newly defined property
 * 
 * @example
 *