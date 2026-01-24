/**
 * Property descriptor configuration for Object.defineProperty
 */
interface PropertyDescriptor {
  /** Indicates whether the property descriptor may be changed and whether the property may be deleted */
  configurable: boolean;
  /** The value associated with the property */
  value: unknown;
}

/**
 * Function to define a property on an object
 * Typically refers to Object.defineProperty
 */
type DefinePropertyFunction = (
  target: object,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
) => void;

/**
 * Function to check if an object has an own property
 * Typically refers to Object.prototype.hasOwnProperty
 */
type HasOwnPropertyFunction = (
  target: object,
  propertyKey: string | symbol
) => boolean;

/**
 * Sets the @@toStringTag property on a constructor or prototype.
 * This property is used by Object.prototype.toString() to customize the string representation.
 * 
 * @param target - The target constructor or object to define the tag on
 * @param tagValue - The string value for the toStringTag (e.g., 'MyClass', 'Promise', 'Map')
 * @param usePrototype - If true, sets the tag on target.prototype; if false, sets directly on target
 * 
 * @remarks
 * Dependencies:
 * - 86cc: Provides Object.defineProperty functionality
 * - 69a8: Provides hasOwnProperty check functionality
 * - 2b4c: Provides well-known Symbol.toStringTag
 * 
 * @example
 *