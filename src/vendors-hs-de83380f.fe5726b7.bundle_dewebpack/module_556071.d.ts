/**
 * Sets the prototype of an object to another object or null.
 * Polyfill for Object.setPrototypeOf with fallback to __proto__.
 * 
 * @param target - The object which is to have its prototype set
 * @param prototype - The object's new prototype (an object or null)
 * @returns The target object with updated prototype
 */
export function setPrototypeOf(target: object, prototype: object | null): object;

/**
 * Establishes inheritance between a subclass and superclass.
 * Creates the prototype chain and sets up the constructor property.
 * 
 * @param subClass - The constructor function that will inherit
 * @param superClass - The constructor function to inherit from (must be a function or null)
 * @throws {TypeError} If superClass is not a function or null
 * 
 * @example
 *