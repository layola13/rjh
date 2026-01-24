/**
 * Custom error thrown when attempting to operate on an unsubscribed object.
 * This error is typically used in reactive programming patterns (e.g., RxJS)
 * when a Subject or Observable has been unsubscribed and subsequent operations are attempted.
 * 
 * @extends Error
 */
export class ObjectUnsubscribedError extends Error {
  /**
   * Error message describing the unsubscribed state.
   */
  public readonly message: string;

  /**
   * Name of the error type.
   */
  public readonly name: string;

  /**
   * Creates an instance of ObjectUnsubscribedError.
   */
  constructor() {
    super('object unsubscribed');
    this.message = 'object unsubscribed';
    this.name = 'ObjectUnsubscribedError';
    
    // Maintains proper stack trace for where error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ObjectUnsubscribedError);
    }
    
    // Set the prototype explicitly to maintain instanceof checks
    Object.setPrototypeOf(this, ObjectUnsubscribedError.prototype);
  }
}