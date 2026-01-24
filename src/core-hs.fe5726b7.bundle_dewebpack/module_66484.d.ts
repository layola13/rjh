/**
 * Object property definition utilities
 * Provides cross-environment support for defining object properties with descriptors
 */

/**
 * Property descriptor interface with all possible property attributes
 */
interface PropertyDescriptor {
  /** The value associated with the property */
  value?: unknown;
  /** Function serving as a getter for the property */
  get?: () => unknown;
  /** Function serving as a setter for the property */
  set?: (value: unknown) => void;
  /** Whether the property descriptor may be changed and the property deleted */
  configurable?: boolean;
  /** Whether the property shows up during enumeration */
  enumerable?: boolean;
  /** Whether the value can be changed with an assignment operator */
  writable?: boolean;
}

/**
 * Define property function signature
 * @param target - The object on which to define the property
 * @param propertyKey - The name or Symbol of the property to be defined or modified
 * @param attributes - The descriptor for the property being defined or modified
 * @returns The object that was passed to the function
 */
type DefinePropertyFunction = (
  target: object,
  propertyKey: PropertyKey,
  attributes: PropertyDescriptor
) => object;

/**
 * Property definition export with environment-specific implementation
 */
export const f: DefinePropertyFunction;

/**
 * Native implementation for modern environments with full descriptor support
 * Handles special case for prototype property on functions to maintain compatibility
 */
declare function nativeDefineProperty(
  target: object,
  propertyKey: PropertyKey,
  attributes: PropertyDescriptor
): object;

/**
 * Fallback implementation for legacy environments without full Object.defineProperty support
 * @throws {TypeError} When attempting to use getter/setter accessors in unsupported environments
 */
declare function fallbackDefineProperty(
  target: object,
  propertyKey: PropertyKey,
  attributes: PropertyDescriptor
): object;