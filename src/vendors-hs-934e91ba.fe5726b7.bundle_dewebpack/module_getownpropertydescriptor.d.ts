/**
 * Gets the property descriptor for an own property of an object.
 * 
 * This function retrieves the property descriptor and ensures it returns
 * a standardized descriptor with writable flag and conditional configurability.
 * 
 * @param target - The target object to get the property descriptor from
 * @param propertyKey - The name of the property whose descriptor is to be retrieved
 * @returns The property descriptor if it exists, otherwise undefined
 */
declare function getOwnPropertyDescriptor<T extends object>(
  target: T,
  propertyKey: PropertyKey
): PropertyDescriptor | undefined;

/**
 * Property descriptor interface with standardized properties
 */
interface PropertyDescriptor {
  /** Indicates whether the property value can be changed */
  writable: boolean;
  
  /** 
   * Indicates whether the property descriptor can be changed or the property deleted.
   * Depends on target's internal state and property name.
   */
  configurable: boolean;
  
  /** Indicates whether the property shows up during enumeration */
  enumerable: boolean;
  
  /** The value associated with the property */
  value: unknown;
}

/**
 * Helper function to convert or validate the target object
 * 
 * @param target - The object to be processed
 * @returns The processed object reference
 */
declare function B<T extends object>(target: T): T;