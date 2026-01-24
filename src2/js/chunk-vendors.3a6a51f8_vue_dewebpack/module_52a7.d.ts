/**
 * Property enumeration utility module
 * Provides a reference to the native propertyIsEnumerable method
 */

/**
 * Checks if a specified property is enumerable on an object
 * @param propertyName - The name of the property to check
 * @returns true if the property is enumerable, false otherwise
 */
export type PropertyIsEnumerableFunction = (propertyName: string | number | symbol) => boolean;

/**
 * Exports object containing property enumeration utilities
 */
export interface PropertyEnumerationExports {
  /**
   * Reference to Object.prototype.propertyIsEnumerable
   * Used to determine if a property is directly enumerable on an object
   */
  f: PropertyIsEnumerableFunction;
}

declare const exports: PropertyEnumerationExports;
export default exports;