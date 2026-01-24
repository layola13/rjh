/**
 * Iterator cleanup utility for early iterator termination.
 * 
 * This module handles the proper cleanup of iterators when they are exited early
 * (e.g., via break, return, or throw). It ensures the iterator's return method
 * is called if present, and properly handles any errors that occur during cleanup.
 * 
 * @module IteratorClose
 */

/**
 * Closes an iterator and handles cleanup based on the completion type.
 * 
 * When an iterator is exited early (not exhausted naturally), this function
 * ensures proper resource cleanup by calling the iterator's optional return()
 * method as specified in the ECMAScript iteration protocol.
 * 
 * @template T - The type of value being returned or thrown
 * 
 * @param iterator - The iterator object to close. Must be a valid iterator.
 * @param completionType - The type of completion: "throw" or "normal"
 * @param completionValue - The value associated with the completion (return value or error to throw)
 * 
 * @returns The completion value if completionType is "normal"
 * @throws The completion value if completionType is "throw"
 * @throws Any error that occurred during iterator cleanup if completionType is "normal"
 * 
 * @example
 *