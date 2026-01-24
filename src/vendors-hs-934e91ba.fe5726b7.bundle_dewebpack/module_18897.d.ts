/**
 * Gets the native `Object.create` method.
 * 
 * This module retrieves the native Object.create function in a safe way,
 * typically used internally by utility libraries like Lodash.
 * 
 * @module module_18897
 * @returns The native Object.create method
 */

/**
 * The native Object.create method reference.
 * Creates a new object with the specified prototype object and properties.
 * 
 * @param proto - The object which should be the prototype of the newly-created object
 * @param propertiesObject - An object whose enumerable own properties specify property descriptors
 * @returns A new object with the specified prototype and properties
 */
declare const create: {
  <T>(proto: T | null): T extends null ? any : T;
  <T, U>(proto: T | null, propertiesObject: U): T extends null ? U : T & U;
};

export = create;