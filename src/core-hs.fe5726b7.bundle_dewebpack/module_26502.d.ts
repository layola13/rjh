/**
 * Object merging utility module
 * Provides type-safe object composition functionality
 */

/**
 * Merges two objects into a new object, with properties from the second object
 * overriding properties from the first object when keys overlap.
 * 
 * @template T - The type of the first source object
 * @template U - The type of the second source object
 * @param source - The base object to merge from
 * @param override - The object whose properties will override the source
 * @returns A new object containing all properties from both objects
 * 
 * @example
 *