/**
 * Creates a property on an object with configurable descriptor or direct assignment.
 * If the property already exists, uses Object.defineProperty with a descriptor;
 * otherwise, performs direct property assignment.
 * 
 * @module PropertyCreator
 */

/**
 * Property descriptor configuration interface
 */
interface PropertyDescriptor {
  value?: unknown;
  writable?: boolean;
  enumerable?: boolean;
  configurable?: boolean;
  get?(): unknown;
  set?(value: unknown): void;
}

/**
 * Object.defineProperty wrapper interface
 */
interface DefinePropertyFunction {
  /**
   * Defines a new property or modifies an existing property on an object
   * @param target - The object on which to define the property
   * @param propertyKey - The name of the property to be defined or modified
   * @param descriptor - The descriptor for the property being defined or modified
   * @returns The object that was passed to the function
   */
  f<T extends object>(
    target: T,
    propertyKey: PropertyKey,
    descriptor: PropertyDescriptor
  ): T;
}

/**
 * Creates a property descriptor with specified flags
 * @param flags - Configuration flags for the descriptor
 * @param value - The value associated with the property
 * @returns Property descriptor object
 */
declare function createDescriptor(
  flags: number,
  value: unknown
): PropertyDescriptor;

/**
 * Creates or assigns a property on a target object.
 * Uses Object.defineProperty if the property exists, otherwise direct assignment.
 * 
 * @param target - The target object to add the property to
 * @param propertyKey - The name of the property to create or assign
 * @param value - The value to assign to the property
 */
export default function createProperty<T extends object>(
  target: T,
  propertyKey: PropertyKey,
  value: unknown
): void;