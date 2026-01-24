/**
 * Checks if a value is an iterable array-like object.
 * 
 * This function determines whether the given value implements the iterator protocol
 * compatible with arrays, either through the well-known iterator symbol or by matching
 * the Array prototype's iterator implementation.
 * 
 * @param value - The value to check for array iterator compatibility
 * @returns `true` if the value is defined and has an array-compatible iterator, `false` otherwise
 */
export function isArrayIterator(value: unknown): boolean;

/**
 * Type guard to check if a value implements the array iterator protocol.
 * 
 * @remarks
 * This function performs two checks:
 * 1. Verifies the value's iterator matches the registered Array iterator in the iterators registry
 * 2. Verifies the value's iterator matches the native Array.prototype iterator
 * 
 * @example
 *