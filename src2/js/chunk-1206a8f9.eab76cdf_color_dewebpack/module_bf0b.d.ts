/**
 * Property descriptor utilities module
 * Provides a polyfill for Object.getOwnPropertyDescriptor with fallback support
 */

/**
 * Property descriptor object structure
 */
interface PropertyDescriptor {
  configurable?: boolean;
  enumerable?: boolean;
  value?: any;
  writable?: boolean;
  get?(): any;
  set?(v: any): void;
}

/**
 * Get property descriptor function signature
 * Retrieves the property descriptor for a given property on an object
 * 
 * @param target - The object containing the property
 * @param propertyKey - The name or Symbol of the property
 * @returns The property descriptor if found, undefined otherwise
 */
export declare function f(
  target: any,
  propertyKey: PropertyKey
): PropertyDescriptor | undefined;

/**
 * Module exports interface
 */
export interface PropertyDescriptorModule {
  /**
   * Property descriptor getter function with polyfill support
   * Falls back to manual descriptor creation for older environments
   */
  f: typeof f;
}

declare const module: PropertyDescriptorModule;
export default module;