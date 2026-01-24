/**
 * Checks if a value is a constructor function.
 * 
 * This module provides a reliable way to determine if a value can be used as a constructor
 * (i.e., can be called with the `new` keyword). It handles various edge cases including
 * built-in constructors, class declarations, and async/generator functions.
 * 
 * @module isConstructor
 */

/**
 * Determines whether the given value is a valid constructor function.
 * 
 * A constructor is a function that can be invoked with the `new` keyword to create
 * new object instances. This includes:
 * - Class declarations
 * - Regular function declarations/expressions (except arrow functions)
 * - Built-in constructors (Object, Array, etc.)
 * 
 * The following are NOT considered constructors:
 * - Arrow functions
 * - Async functions
 * - Generator functions
 * - Async generator functions
 * - Non-callable values
 * 
 * @param value - The value to check
 * @returns `true` if the value is a constructor, `false` otherwise
 * 
 * @example
 *