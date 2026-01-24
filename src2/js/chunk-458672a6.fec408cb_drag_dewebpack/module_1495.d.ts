/**
 * Defines multiple properties on an object with descriptors.
 * Polyfill for Object.defineProperties when not natively available.
 * 
 * @param target - The object on which to define or modify properties
 * @param properties - An object whose keys represent property names and values are property descriptors
 * @returns The modified target object
 */
export default function defineProperties<T extends object>(
  target: T,
  properties: PropertyDescriptorMap
): T;