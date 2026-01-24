/**
 * Object property descriptor definition utility
 * Provides a cross-environment implementation for defining object properties with descriptors
 */

/**
 * Property descriptor interface for object properties
 */
interface PropertyDescriptor {
  /** Property value */
  value?: any;
  /** Whether the property can be written to */
  writable?: boolean;
  /** Whether the property shows up in enumeration */
  enumerable?: boolean;
  /** Whether the property descriptor can be changed */
  configurable?: boolean;
  /** Getter function for the property */
  get?: () => any;
  /** Setter function for the property */
  set?: (value: any) => void;
}

/**
 * Define property function signature
 * @param target - The target object on which to define the property
 * @param propertyKey - The name of the property to be defined or modified
 * @param descriptor - The descriptor for the property being defined or modified
 * @returns The modified target object
 */
type DefinePropertyFunction = (
  target: object,
  propertyKey: PropertyKey,
  descriptor: PropertyDescriptor
) => object;

/**
 * Module exports containing the property definition function
 */
export interface DefinePropertyExports {
  /**
   * Defines or modifies a property directly on an object
   * 
   * This function handles multiple environments:
   * - Modern browsers with full descriptor support
   * - Older engines requiring special handling for function prototypes
   * - Legacy environments without getter/setter support
   * 
   * @param target - The object on which to define the property
   * @param propertyKey - The property name or Symbol
   * @param descriptor - The property descriptor
   * @returns The target object
   * @throws {TypeError} If accessors are not supported in legacy environments
   */
  f: DefinePropertyFunction;
}

declare const exports: DefinePropertyExports;
export default exports;