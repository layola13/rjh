/**
 * Set utility module providing wrapped and direct access to native Set methods.
 * 
 * This module exports a collection of Set operations with both wrapped (for safe cross-realm usage)
 * and direct proto method references.
 * 
 * @module SetUtilities
 */

/**
 * Function wrapper type that binds methods to their appropriate context.
 * Typically used for creating context-bound versions of prototype methods.
 */
type MethodBinder = <T extends Function>(method: T) => T;

/**
 * Native JavaScript Set constructor.
 */
export const Set: SetConstructor;

/**
 * Context-bound wrapper for Set.prototype.add.
 * Safe to use across different realms/contexts.
 * 
 * @param value - The value to add to the Set
 * @returns The Set instance (for chaining)
 */
export const add: <T>(this: Set<T>, value: T) => Set<T>;

/**
 * Context-bound wrapper for Set.prototype.has.
 * Safe to use across different realms/contexts.
 * 
 * @param value - The value to check for existence
 * @returns true if the value exists in the Set, false otherwise
 */
export const has: <T>(this: Set<T>, value: T) => boolean;

/**
 * Context-bound wrapper for Set.prototype.delete.
 * Safe to use across different realms/contexts.
 * 
 * @param value - The value to remove from the Set
 * @returns true if the value was removed, false if it didn't exist
 */
export const remove: <T>(this: Set<T>, value: T) => boolean;

/**
 * Direct reference to Set.prototype.
 * Provides access to all native Set prototype methods.
 */
export const proto: Set<any>;

/**
 * Direct reference to Set.prototype.has method (uncurried).
 * Use with caution - not context-bound.
 */
export const $has: <T>(this: Set<T>, value: T) => boolean;

/**
 * Direct reference to Set.prototype.keys method (uncurried).
 * Use with caution - not context-bound.
 * 
 * Note: For Sets, keys() is equivalent to values() and returns an iterator of values.
 */
export const $keys: <T>(this: Set<T>) => IterableIterator<T>;