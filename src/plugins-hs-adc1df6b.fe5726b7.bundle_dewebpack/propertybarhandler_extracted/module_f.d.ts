/**
 * Iterator cleanup utility module
 * Handles proper cleanup and error propagation for iterators
 * @module module_f
 */

/**
 * Cleans up an iterator and handles error propagation
 * 
 * This function ensures that:
 * - The iterator's return method is called if it exists (unless a flag prevents it)
 * - Any errors are properly propagated after cleanup
 * 
 * @remarks
 * This is typically used in for-of loops and destructuring assignments
 * to ensure iterators are properly closed, even when errors occur.
 * 
 * @param shouldSkipReturn - Flag indicating whether to skip calling the return method
 * @param iterator - The iterator object that may have a return method
 * @param shouldThrow - Flag indicating whether an error should be thrown
 * @param error - The error to throw if shouldThrow is true
 * 
 * @throws {unknown} Throws the provided error if shouldThrow is true
 * 
 * @example
 *