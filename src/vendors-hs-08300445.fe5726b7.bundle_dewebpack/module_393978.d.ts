/**
 * Immutable object/array manipulation utilities for deeply nested structures.
 * Provides functions to set, merge, and manipulate nested paths without mutating original data.
 */

/**
 * Represents a path segment, which can be a string key or numeric index.
 */
type PathSegment = string | number;

/**
 * Represents a path as an array of segments for nested object/array access.
 */
type Path = PathSegment[];

/**
 * Represents any object that can be deeply manipulated.
 */
type DeepObject = Record<string | number, any> | any[];

/**
 * Options for controlling merge and set operations.
 */
interface SetOptions {
  /** Whether to delete the value at the path instead of setting it */
  shouldDelete?: boolean;
}

/**
 * Creates a shallow clone of the input, returning an empty array or object.
 * @param source - The source value to clone the type from
 * @returns An empty array if source is an array, otherwise an empty object
 */
declare function cloneEmpty(source: any): DeepObject;

/**
 * Gets all own keys from an object, including symbol keys if Reflect is available.
 * @param obj - The object to get keys from
 * @returns Array of property keys (strings, numbers, and symbols)
 */
declare function getOwnKeys(obj: object): (string | number | symbol)[];

/**
 * Immutably sets a value at a deeply nested path in an object or array.
 * Creates intermediate objects/arrays as needed without mutating the original.
 * 
 * @param source - The source object or array to modify
 * @param path - Array of keys/indices representing the path to the target value
 * @param value - The value to set at the path
 * @param shouldDelete - If true and value is undefined with single remaining path segment, deletes the property
 * @returns A new object/array with the value set at the specified path
 * 
 * @example
 *