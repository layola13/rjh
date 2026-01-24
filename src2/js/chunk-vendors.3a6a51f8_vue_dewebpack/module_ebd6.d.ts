/**
 * Symbol.species accessor utility
 * 
 * Gets the constructor's @@species symbol value for creating derived objects.
 * Falls back to the default constructor if species is not defined.
 * 
 * @module SpeciesConstructor
 */

/**
 * Gets the species constructor for an object.
 * This is used to determine which constructor should be used when creating
 * derived objects (e.g., in array methods that return new arrays).
 * 
 * @param instance - The object instance to get the species constructor from
 * @param defaultConstructor - The fallback constructor to use if species is undefined or null
 * @returns The species constructor or the default constructor
 * 
 * @example
 *