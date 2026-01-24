/**
 * Tests if a given function properly handles iterables with early termination.
 * 
 * This utility checks whether a function correctly implements the iteration protocol,
 * including support for the `return()` method on iterators (used for cleanup when
 * iteration is terminated early).
 * 
 * @module IterableComplianceChecker
 */

/**
 * Symbol for the iterator protocol.
 * Represents the well-known Symbol.iterator used in ES6+ iteration.
 */
declare const ITERATOR_SYMBOL: symbol;

/**
 * Checks if a function correctly handles iterable objects and their iteration protocol.
 * 
 * @param targetFunction - The function to test for proper iterable handling
 * @param requireStrictCompliance - If true, requires the function to handle all iteration edge cases.
 *                                   If false, skips the test in non-compliant environments.
 * @returns `true` if the function properly handles iterables, `false` otherwise
 * 
 * @remarks
 * This function performs two levels of testing:
 * 1. Checks if the environment supports iterator return() for cleanup
 * 2. Tests if the target function correctly consumes iterables
 * 
 * @example
 *