/**
 * Error throwing utility module
 * 
 * This module provides a function that immediately throws any error passed to it.
 * Commonly used for error propagation or as a placeholder for unhandled error scenarios.
 * 
 * @module module_e
 */

/**
 * Throws the provided error
 * 
 * This function accepts any error value and immediately throws it.
 * Useful for error handling pipelines or promise rejection handlers.
 * 
 * @param error - The error to be thrown. Can be any type (Error instance, string, or custom error object)
 * @throws Always throws the provided error parameter
 * @example
 *