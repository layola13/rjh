/**
 * Property descriptor map type for defining multiple properties at once
 * Maps property names to their corresponding property descriptors
 */
type PropertyDescriptorMap = {
  [key: string]: PropertyDescriptor;
};

/**
 * Object.defineProperties polyfill module
 * 
 * This module provides a fallback implementation for Object.defineProperties
 * when the native implementation is not available in the runtime environment.
 * 
 * @remarks
 * The implementation checks if the native Object.defineProperties exists via
 * a feature detection utility. If not available, it provides a polyfill that
 * iterates over property keys and defines each property individually.
 * 
 * Dependencies:
 * - `86cc`: Property definition utility (Object.defineProperty wrapper)
 * - `cb7c`: Object validation utility (ensures target is an object)
 * - `0d58`: Object keys utility (extracts enumerable property keys)
 * - `9e1e`: Feature detection utility (checks for native API support)
 */

/**
 * Defines multiple new or modifies existing properties directly on an object,
 * returning the object.
 * 
 * @template T - The type of the target object
 * @param target - The object on which to define or modify properties
 * @param properties - An object whose keys represent the names of properties to be
 *                     defined or modified and whose values are objects describing those properties
 * @returns The object that was passed to the function with the new or modified properties
 * 
 * @throws {TypeError} If target is null, undefined, or not an object
 * 
 * @example
 *