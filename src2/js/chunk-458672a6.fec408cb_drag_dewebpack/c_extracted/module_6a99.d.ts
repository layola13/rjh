/**
 * Converts an object to a primitive value using its toString or valueOf methods.
 * 
 * @module ToPrimitive
 * @description Attempts to convert an object to a primitive value by trying:
 * 1. toString() method (if preferString is true)
 * 2. valueOf() method
 * 3. toString() method (if preferString is false)
 * 
 * This implements the ToPrimitive abstract operation from ECMAScript specification.
 */

import type { isObject } from './d3f4';

/**
 * Method that can convert an object to a primitive value
 */
type ToPrimitiveMethod = () => unknown;

/**
 * Object with potential toString/valueOf methods
 */
interface ConvertibleObject {
  toString?: ToPrimitiveMethod;
  valueOf?: ToPrimitiveMethod;
}

/**
 * Primitive value types that can be returned
 */
type PrimitiveValue = string | number | boolean | symbol | null | undefined;

/**
 * Converts an object to a primitive value.
 * 
 * @param target - The value to convert to a primitive
 * @param preferString - If true, tries toString before valueOf; if false, tries valueOf first
 * @returns The primitive value
 * @throws {TypeError} When the object cannot be converted to a primitive value
 * 
 * @example
 *