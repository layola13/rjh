/**
 * Checks if a given function properly implements iteration protocol.
 * Tests whether the function correctly handles iterables and respects early termination.
 * 
 * @module IteratorSafetyCheck
 * @see https://tc39.es/ecma262/#sec-iteration
 */

import { getWellKnownSymbol } from './well-known-symbols';

/**
 * Callback function that accepts an iterable object
 */
type IterableConsumer = (iterable: Iterable<unknown>) => void;

/**
 * Verifies if a function correctly implements safe iteration behavior.
 * 
 * This utility performs two key checks:
 * 1. Validates that the function respects iterator return() method for cleanup
 * 2. Ensures the function properly handles iterator protocol with next()
 * 
 * @param iterableConsumer - Function to test (e.g., Array.from, for-of loops)
 * @param skipNativeCheck - If true, skips the initial native implementation check
 * @returns true if the function implements safe iteration, false otherwise
 * 
 * @example
 *