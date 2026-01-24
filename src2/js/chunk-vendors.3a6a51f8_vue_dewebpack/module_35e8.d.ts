/**
 * Property descriptor configuration for creating non-enumerable properties
 */
interface PropertyDescriptor {
  /** Whether the property can be changed or deleted */
  writable?: boolean;
  /** Whether the property shows up during enumeration */
  enumerable: boolean;
  /** Whether the descriptor itself can be changed */
  configurable?: boolean;
  /** The value associated with the property */
  value?: any;
}

/**
 * Object definition utilities
 */
interface ObjectDefineProperty {
  /**
   * Defines a new property directly on an object
   * @param target - The object on which to define the property
   * @param propertyKey - The name or symbol of the property
   * @param descriptor - The descriptor for the property being defined
   */
  f<T extends object, K extends PropertyKey>(
    target: T,
    propertyKey: K,
    descriptor: PropertyDescriptor
  ): T;
}

/**
 * Creates a property descriptor with specified enumerable flag and value
 * @param enumerable - Whether the property should be enumerable (1 for true, 0 for false)
 * @param value - The value to assign to the property
 * @returns Property descriptor object
 */
declare function createPropertyDescriptor(
  enumerable: 0 | 1,
  value: any
): PropertyDescriptor;

/**
 * Utility function to define a property on an object
 * 
 * In ES5+ environments (when Object.defineProperty is available):
 * - Uses Object.defineProperty with a non-enumerable descriptor
 * 
 * In legacy environments:
 * - Falls back to simple property assignment
 * 
 * @param target - The target object to define the property on
 * @param propertyKey - The name of the property to define
 * @param value - The value to assign to the property
 * @returns The target object with the property defined
 * 
 * @example
 *