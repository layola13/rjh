/**
 * Object.defineProperties utility module
 * Provides wrapper for defining multiple properties on objects
 */

/**
 * Property descriptor interface
 * Describes the attributes of an object property
 */
interface PropertyDescriptor {
  /**
   * The value associated with the property
   */
  value?: any;
  /**
   * If true, the property may be changed and deleted
   */
  writable?: boolean;
  /**
   * If true, the property will be enumerated in for-in loops
   */
  enumerable?: boolean;
  /**
   * If true, the property descriptor may be changed
   */
  configurable?: boolean;
  /**
   * Getter function for the property
   */
  get?(): any;
  /**
   * Setter function for the property
   */
  set?(value: any): void;
}

/**
 * Map of property names to their descriptors
 */
type PropertyDescriptorMap = Record<string, PropertyDescriptor>;

/**
 * Defines multiple properties on an object
 * 
 * @param target - The object on which to define properties
 * @param properties - Map of property names to their descriptors
 * @returns The modified object
 * 
 * @example
 * ```typescript
 * // Define multiple properties
 * const obj = {};
 * defineProperties(obj, {
 *   name: {
 *     value: 'John',
 *     writable: true,
 *     enumerable: true,
 *     configurable: true
 *   },
 *   age: {
 *     value: 30,
 *     writable: true,
 *     enumerable: true,
 *     configurable: false
 *   },
 *   fullName: {
 *     get() {
 *       return this.name;
 *     },
 *     set(value) {
 *       this.name = value;
 *     },
 *     enumerable: true,
 *     configurable: true
 *   }
 * });
 * 
 * // Non-enumerable property
 * defineProperties(obj, {
 *   secret: {
 *     value: 'hidden',
 *     enumerable: false
 *   }
 * });
 * ```
 */
declare function defineProperties<T extends object>(
  target: T,
  properties: PropertyDescriptorMap
): T;

export { defineProperties, PropertyDescriptor, PropertyDescriptorMap };