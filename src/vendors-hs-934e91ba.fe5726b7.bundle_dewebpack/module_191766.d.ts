/**
 * Creates a shallow copy of an array-like object, preserving index and input properties if present.
 * 
 * This utility is commonly used to clone RegExp match results, which are array-like objects
 * that may contain additional metadata properties like `index` and `input`.
 * 
 * @template T - The type of the array-like object
 * @param source - The source array-like object to copy
 * @returns A new instance with the same constructor, length, and optional index/input properties
 * 
 * @example
 *