/**
 * Invariant error checking utilities for Apollo GraphQL
 * Provides runtime assertion and error handling with enhanced stack traces
 */

/**
 * Custom error class for invariant violations
 * Extends the native Error class with additional context and stack trace handling
 */
export class InvariantError extends Error {
  /**
   * Number of stack frames to remove from the stack trace
   * Used to hide internal implementation details from the error output
   */
  framesToPop: number;

  /**
   * Creates an instance of InvariantError
   * @param message - Error message or error code number. If a number is provided,
   *                  it will be formatted with a link to the invariant-packages repository
   */
  constructor(message?: string | number);
}

/**
 * Runtime assertion function that throws an InvariantError if the condition is falsy
 * 
 * @param condition - The condition to check. If falsy, an error will be thrown
 * @param message - Optional error message or code to include in the thrown error
 * @throws {InvariantError} When condition is falsy
 * 
 * @example
 *