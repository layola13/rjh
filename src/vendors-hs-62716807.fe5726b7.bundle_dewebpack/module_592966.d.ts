/**
 * Object.defineProperties polyfill module
 * Provides a fallback implementation for Object.defineProperties when native support is unavailable
 */

/**
 * Defines multiple properties on an object
 * @param target - The object on which to define or modify properties
 * @param properties - An object whose keys represent the names of properties to be defined or modified
 *                     and whose values are objects describing those properties
 * @returns The object that was passed to the function
 * @throws {TypeError} If target is not an object
 */
export function f<T extends object>(
  target: T,
  properties: PropertyDescriptorMap & ThisType<any>
): T;

/**
 * Internal type: Property descriptor map with additional constraints
 */
interface PropertyDescriptorMap {
  [key: string]: PropertyDescriptor;
}

/**
 * Internal type: Single property descriptor
 */
interface PropertyDescriptor {
  configurable?: boolean;
  enumerable?: boolean;
  value?: any;
  writable?: boolean;
  get?(): any;
  set?(v: any): void;
}