/**
 * Utility module providing object manipulation and array flattening functions.
 * Module: module_709758
 * Original ID: 709758
 */

/**
 * Checks if an object has a specific property as its own property (not inherited).
 * @param obj - The object to check
 * @param prop - The property name to verify
 * @returns True if the property exists on the object itself
 */
declare function hasOwnProperty<T extends object>(obj: T, prop: PropertyKey): boolean;

/**
 * Assigns properties from multiple source objects to a target object.
 * Similar to Object.assign(), merging all enumerable own properties.
 * 
 * @param target - The target object to receive properties
 * @param sources - One or more source objects whose properties will be copied
 * @returns The modified target object
 * @throws TypeError if any source is not an object
 * 
 * @example
 *