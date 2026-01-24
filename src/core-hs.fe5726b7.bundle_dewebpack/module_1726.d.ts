/**
 * Object property descriptor utility module
 * Provides a cross-browser compatible implementation of Object.getOwnPropertyDescriptor
 */

/**
 * Property descriptor interface matching ECMAScript specification
 */
interface PropertyDescriptor {
  /** Indicates if the property value can be changed */
  writable?: boolean;
  /** Indicates if the property shows up during enumeration */
  enumerable?: boolean;
  /** Indicates if the property descriptor can be changed or property deleted */
  configurable?: boolean;
  /** The value associated with the property (data descriptor) */
  value?: any;
  /** Getter function for the property (accessor descriptor) */
  get?(): any;
  /** Setter function for the property (accessor descriptor) */
  set?(value: any): void;
}

/**
 * Gets the property descriptor for an own property of an object
 * 
 * This implementation provides a fallback for environments that don't fully support
 * Object.getOwnPropertyDescriptor or have compatibility issues with certain property types.
 * 
 * @param target - The object that contains the property
 * @param propertyKey - The name or Symbol of the property whose descriptor is to be retrieved
 * @returns The property descriptor for the specified property if it exists on the object, undefined otherwise
 * 
 * @remarks
 * - Uses native Object.getOwnPropertyDescriptor when available and working correctly
 * - Falls back to manual descriptor construction in legacy environments
 * - Handles edge cases with IE8 DOM element property descriptors
 */
export function getOwnPropertyDescriptor(
  target: object,
  propertyKey: PropertyKey
): PropertyDescriptor | undefined;

/**
 * Export as 'f' property for compatibility with webpack module system
 */
export const f: typeof getOwnPropertyDescriptor;