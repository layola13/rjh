/**
 * Converts a value to an object, with special handling for strings.
 * 
 * This utility addresses a legacy issue where string primitives may not have
 * enumerable indexed properties in older JavaScript environments. It ensures
 * consistent behavior by converting strings to character arrays when necessary.
 * 
 * @module IndexedObject
 */

import type { ClassofRaw } from './module_2d95';

/**
 * Determines the internal [[Class]] of a value.
 * Imported from module 2d95.
 */
declare const classofRaw: ClassofRaw;

/**
 * Checks if the current environment supports enumerable string indices.
 * In modern environments, `Object("z")[0]` should be enumerable.
 * @internal
 */
declare const supportsEnumerableStringIndices: boolean;

/**
 * Converts a value to an indexed object representation.
 * 
 * - If the value is a string primitive and the environment doesn't support
 *   enumerable string indices, splits it into an array of characters.
 * - Otherwise, coerces the value to an Object using the Object constructor.
 * 
 * @param value - The value to convert to an indexed object
 * @returns An object representation with enumerable indexed properties
 * 
 * @example
 *