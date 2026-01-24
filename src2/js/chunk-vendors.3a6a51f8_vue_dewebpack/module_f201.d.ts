/**
 * Species Constructor Resolver
 * 
 * Resolves the appropriate constructor to use based on the species pattern.
 * This implements the ECMAScript species pattern for creating derived objects.
 * 
 * @module SpeciesConstructor
 */

/**
 * Get the species constructor from an object, falling back to a default constructor.
 * 
 * Used in built-in methods to allow subclasses to override the type of objects created.
 * For example, Array subclasses can specify what constructor to use when map() creates a new array.
 * 
 * @param instance - The object instance to get the constructor from
 * @param defaultConstructor - The fallback constructor if species is not defined
 * @returns The resolved constructor function
 * 
 * @example
 *