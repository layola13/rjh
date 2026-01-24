/**
 * Object.getOwnPropertyDescriptors polyfill module
 * 
 * Provides a polyfill for Object.getOwnPropertyDescriptors which returns
 * all own property descriptors of a given object.
 */

/**
 * Property descriptor interface matching TypeScript's built-in PropertyDescriptor
 */
interface PropertyDescriptor {
  configurable?: boolean;
  enumerable?: boolean;
  value?: unknown;
  writable?: boolean;
  get?(): unknown;
  set?(v: unknown): void;
}

/**
 * Result type for getOwnPropertyDescriptors - maps property keys to their descriptors
 */
interface PropertyDescriptorMap {
  [key: string]: PropertyDescriptor;
  [key: symbol]: PropertyDescriptor;
}

/**
 * Gets all own property descriptors of the given object
 * 
 * @param target - The object whose own property descriptors are to be retrieved
 * @returns An object containing all own property descriptors of the target object
 * 
 * @example
 * const obj = { prop: 42 };
 * const descriptors = getOwnPropertyDescriptors(obj);
 * // { prop: { value: 42, writable: true, enumerable: true, configurable: true } }
 */
declare function getOwnPropertyDescriptors<T>(
  target: T
): PropertyDescriptorMap & { [K in keyof T]: TypedPropertyDescriptor<T[K]> };

declare global {
  interface ObjectConstructor {
    /**
     * Returns an object containing all own property descriptors of an object
     * 
     * @param target - Object that contains the properties and methods
     */
    getOwnPropertyDescriptors<T>(target: T): PropertyDescriptorMap & {
      [K in keyof T]: TypedPropertyDescriptor<T[K]>;
    };
  }
}

export {};