/**
 * Converts a value to an object, with special handling for strings.
 * 
 * This module provides a workaround for environments where string primitives
 * don't have enumerable indexed properties. In such cases, strings are split
 * into arrays of characters.
 * 
 * @module IndexedObject
 */

/**
 * Checks if a value needs special handling and converts it to an object.
 * 
 * @param value - The value to convert to an object
 * @returns An object representation of the input value. Strings are split into
 *          character arrays if they don't support enumerable indexing, otherwise
 *          the value is wrapped in an Object.
 * 
 * @example
 *