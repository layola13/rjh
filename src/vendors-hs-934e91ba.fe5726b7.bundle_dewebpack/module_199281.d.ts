/**
 * Attempts to freeze an array's length property.
 * This module provides a utility that tries to make arrays immutable by freezing their length.
 * Falls back to null if the operation fails.
 * 
 * @module ArrayLengthFreezer
 */

/**
 * Function that attempts to freeze the 'length' property of arrays.
 * Returns null if the freezing operation is not supported or fails.
 * 
 * @param target - The array or object to freeze
 * @param property - The property name to freeze (typically 'length')
 * @returns The frozen object or null if operation failed
 */
type FreezePropertyFunction = <T>(target: T[], property: keyof T[] | 'length') => T[] | null;

/**
 * The result of attempting to freeze array length.
 * Either the freeze function itself, or null if unavailable/failed.
 */
declare const arrayLengthFreezer: FreezePropertyFunction | null;

export = arrayLengthFreezer;