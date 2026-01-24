/**
 * Custom error class for argument out of range exceptions.
 * Extends the native Error class to provide specific error handling
 * for cases where function arguments fall outside acceptable boundaries.
 */
export class ArgumentOutOfRangeError extends Error {
  /**
   * Creates an instance of ArgumentOutOfRangeError.
   * Automatically sets the error name and provides a default message.
   */
  constructor() {
    super('argument out of range');
    this.name = 'ArgumentOutOfRangeError';
    
    // Maintains proper stack trace for where error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ArgumentOutOfRangeError);
    }
  }
}