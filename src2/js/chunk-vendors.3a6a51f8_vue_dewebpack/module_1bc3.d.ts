/**
 * Converts an object to a primitive value using standard JavaScript type conversion methods.
 * 
 * This module attempts to convert an object to a primitive value by trying various conversion methods
 * in a specific order based on the hint parameter.
 * 
 * @module ToPrimitive
 * @see https://tc39.es/ecma262/#sec-toprimitive
 */

import { isObject } from './f772';

/**
 * Attempts to convert an object to a primitive value.
 * 
 * The conversion follows ECMAScript's ToPrimitive abstract operation:
 * - If the value is not an object, returns it as-is
 * - If hint is 'string', tries toString() first, then valueOf()
 * - If hint is 'number' or 'default', tries valueOf() first, then toString()
 * - Throws TypeError if no conversion produces a primitive value
 * 
 * @param input - The value to convert to a primitive
 * @param preferString - When true, prefer string conversion (toString before valueOf)
 * @returns The primitive value resulting from the conversion
 * @throws {TypeError} When the object cannot be converted to a primitive value
 * 
 * @example
 *