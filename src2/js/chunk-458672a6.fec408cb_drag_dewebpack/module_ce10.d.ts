/**
 * Object key enumeration utility
 * 
 * Enumerates own properties of an object, excluding specified internal properties
 * and ensuring certain properties are included if they exist.
 * 
 * @module ObjectKeysEnumeration
 */

/**
 * Type definition for the hasOwnProperty check function
 */
type HasOwnPropertyFn = (obj: object, key: string | symbol) => boolean;

/**
 * Type definition for the toIndexedObject function
 * Converts a value to an indexed object (array-like or object)
 */
type ToIndexedObjectFn = (value: any) => Record<string | number, any>;

/**
 * Type definition for the array indexOf function
 * Returns the index of an element in an array, or -1 if not found
 */
type IndexOfFn = (array: readonly any[], searchElement: any) => number;

/**
 * Type definition for the shared key function
 * Returns a shared/internal property key identifier
 */
type SharedKeyFn = (key: string) => string | symbol;

/**
 * Enumerates object keys with special handling for excluded and forced properties
 * 
 * @param target - The target object to enumerate keys from
 * @param forcedKeys - Array of keys that should be forcibly included if they exist on the target
 * @returns Array of enumerable property keys, excluding internal properties and including forced keys
 * 
 * @example
 *