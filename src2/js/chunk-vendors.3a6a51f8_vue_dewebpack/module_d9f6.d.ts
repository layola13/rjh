/**
 * Object property definition utilities
 * Provides a cross-browser compatible Object.defineProperty implementation
 * 
 * @module PropertyDescriptor
 */

/**
 * Checks if the given value is an object (non-primitive)
 * @param value - The value to check
 * @returns The value if it's an object
 * @throws TypeError if the value is not an object
 */
declare function assertIsObject(value: any): object;

/**
 * Checks if there's a known issue with Object.defineProperty in the current environment
 * @returns true if defineProperty has known issues (e.g., IE8)
 */
declare function hasDefinePropertyIssue(): boolean;

/**
 * Converts a value to a property key (string or symbol)
 * @param value - The value to convert
 * @param hint - Whether to prefer string conversion
 * @returns A valid property key
 */
declare function toPropertyKey(value: any, hint: boolean): PropertyKey;

/**
 * Checks if the environment supports native Object.defineProperty
 * @returns true if Object.defineProperty is fully supported
 */
declare function isDefinePropertySupported(): boolean;

/**
 * Property descriptor object structure
 */
interface PropertyDescriptor {
  /** Property value */
  value?: any;
  /** Getter function */
  get?(): any;
  /** Setter function */
  set?(value: any): void;
  /** Whether the property is writable */
  writable?: boolean;
  /** Whether the property is enumerable */
  enumerable?: boolean;
  /** Whether the property is configurable */
  configurable?: boolean;
}

/**
 * Cross-browser compatible Object.defineProperty implementation
 * Falls back to simple property assignment in legacy environments
 * 
 * @param target - The object on which to define the property
 * @param propertyKey - The name or Symbol of the property to be defined
 * @param descriptor - The descriptor for the property being defined
 * @returns The modified object
 * @throws TypeError if accessors (get/set) are provided in unsupported environments
 */
declare function defineProperty(
  target: object,
  propertyKey: PropertyKey,
  descriptor: PropertyDescriptor
): object;

/**
 * Exported property descriptor utilities
 */
export interface PropertyDescriptorModule {
  /**
   * The defineProperty function, either native or polyfilled
   */
  f: typeof defineProperty;
}

declare const exports: PropertyDescriptorModule;
export default exports;