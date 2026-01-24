/**
 * Converts a value to an object, with special handling for strings.
 * 
 * This utility addresses inconsistencies in how different JavaScript environments
 * handle property enumeration on primitive strings. In environments where
 * `Object("z").propertyIsEnumerable(0)` returns false, strings are split into
 * character arrays to ensure consistent behavior.
 * 
 * @module StringToObject
 */

import { classofRaw } from './classof-raw';

/**
 * Converts a value to an object with consistent string handling.
 * 
 * In environments where string primitives don't properly enumerate their indices,
 * this function splits strings into arrays of characters. For all other values,
 * it uses the standard Object() constructor.
 * 
 * @param value - The value to convert to an object
 * @returns The converted object, or an array of characters if the input is a string
 * 
 * @example
 *