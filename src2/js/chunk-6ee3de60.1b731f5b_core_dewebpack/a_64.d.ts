/**
 * Represents an error that occurs when one or more errors happen during the unsubscription process.
 * This error aggregates multiple errors that occurred while cleaning up subscriptions.
 */
export class UnsubscriptionError extends Error {
  /**
   * The name of the error type.
   */
  readonly name: string = 'UnsubscriptionError';

  /**
   * Array of errors that occurred during unsubscription.
   */
  readonly errors: Error[];

  /**
   * Creates a new UnsubscriptionError instance.
   * 
   * @param errors - Array of errors that occurred during unsubscription
   */
  constructor(errors: Error[]) {
    const message = errors.length > 0
      ? `${errors.length} errors occurred during unsubscription:\n${errors
          .map((error: Error, index: number) => `${index + 1}) ${error.toString()}`)
          .join('\n ')}`
      : '';

    super(message);

    this.errors = errors;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UnsubscriptionError);
    }
  }
}