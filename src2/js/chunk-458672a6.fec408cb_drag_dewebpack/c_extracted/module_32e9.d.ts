/**
 * Property descriptor creation utility
 * Creates a property descriptor with configurable attributes
 */
interface PropertyDescriptor<T = unknown> {
  /** Property value */
  value?: T;
  /** Whether the property can be written to */
  writable?: boolean;
  /** Whether the property shows up during enumeration */
  enumerable?: boolean;
  /** Whether the property descriptor can be changed or deleted */
  configurable?: boolean;
  /** Getter function for computed properties */
  get?(): T;
  /** Setter function for computed properties */
  set?(value: T): void;
}

/**
 * Object.defineProperty wrapper interface
 */
interface DefinePropertyFunction {
  /**
   * Define a property on an object using a descriptor
   * @param target - The target object
   * @param propertyKey - The property name or symbol
   * @param descriptor - The property descriptor
   * @returns The modified target object
   */
  f<T extends object, K extends PropertyKey>(
    target: T,
    propertyKey: K,
    descriptor: PropertyDescriptor
  ): T;
}

/**
 * Creates a property descriptor helper
 * @param bitmap - Configuration flags (bit 0: enumerable, bit 1: writable, etc.)
 * @param value - The value to assign to the property
 * @returns A property descriptor object
 */
declare function createDescriptor<T>(
  bitmap: number,
  value: T
): PropertyDescriptor<T>;

/**
 * Checks if Object.defineProperty is available and working correctly
 * @returns true if native defineProperty is supported, false otherwise
 */
declare function hasDefinePropertySupport(): boolean;

/**
 * Sets a property on an object, using Object.defineProperty if available,
 * or falling back to simple assignment
 * 
 * @param target - The object to modify
 * @param propertyKey - The property name to set
 * @param value - The value to assign
 * @returns The modified target object
 * 
 * @example
 *