/**
 * Defines a property with custom getter/setter on an object.
 * This utility combines setting function names for getter/setter with defining the property descriptor.
 * 
 * @param target - The target object on which to define the property
 * @param propertyKey - The name of the property to define
 * @param descriptor - Property descriptor containing optional get/set accessors
 * @returns The result of Object.defineProperty operation
 */
declare function definePropertyWithAccessors<T extends object>(
  target: T,
  propertyKey: PropertyKey,
  descriptor: PropertyDescriptor
): void;

export = definePropertyWithAccessors;