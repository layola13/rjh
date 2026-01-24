/**
 * Utility module for creating typed tuples
 * @module TupleUtils
 */

/**
 * Creates a typed tuple from the provided arguments.
 * Preserves the exact types of all input parameters.
 * 
 * @template T - The tuple of argument types
 * @param args - Variable number of arguments of any type
 * @returns A tuple array containing all provided arguments with preserved types
 * 
 * @example
 * const result = tuple('hello', 42, true);
 * // Type: [string, number, boolean]
 */
export function tuple<T extends unknown[]>(...args: T): T;

/**
 * Creates a typed tuple specifically for numeric values.
 * Preserves the exact types of all input number parameters.
 * 
 * @template T - The tuple of number types
 * @param args - Variable number of numeric arguments
 * @returns A tuple array containing all provided numbers with preserved types
 * 
 * @example
 * const result = tupleNum(1, 2, 3);
 * // Type: [number, number, number]
 */
export function tupleNum<T extends number[]>(...args: T): T;