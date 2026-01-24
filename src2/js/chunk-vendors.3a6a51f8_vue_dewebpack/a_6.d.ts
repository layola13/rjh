/**
 * Deep equality comparison utility module
 * Performs structural comparison of complex JavaScript values including objects, arrays, Maps, Sets, etc.
 */

/**
 * Cache for tracking circular references during comparison
 * Maps objects to Sets of objects they've been compared with
 */
const circularReferenceCache = new Map<any, Set<any>>();

/**
 * Performs deep equality comparison between two values
 * Handles primitives, objects, arrays, Maps, Sets, Dates, RegExps, Errors, and circular references
 * 
 * @param left - First value to compare
 * @param right - Second value to compare
 * @returns True if values are deeply equal, false otherwise
 * 
 * @example
 *