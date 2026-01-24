/**
 * Error handler module that rethrows any error passed to it.
 * 
 * This module provides a utility function for propagating errors
 * in error handling pipelines or promise chains.
 * 
 * @module ErrorHandler
 */

/**
 * Rethrows the provided error without modification.
 * 
 * This function is typically used in error handling scenarios where
 * you want to ensure an error is propagated up the call stack.
 * 
 * @param error - The error to be rethrown
 * @throws Always throws the error that was passed in
 * 
 * @example
 *