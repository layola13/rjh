/**
 * Error thrown when one or more errors occur during the unsubscription process.
 * Aggregates multiple errors that may happen when tearing down subscriptions.
 */
export class UnsubscriptionError extends Error {
  /**
   * Human-readable name of the error.
   */
  public readonly name: string = 'UnsubscriptionError';

  /**
   * Array of errors that occurred during unsubscription.
   */
  public readonly errors: ReadonlyArray<Error>;

  /**
   * Detailed message describing all errors that occurred.
   */
  public readonly message: string;

  /**
   * Creates a new UnsubscriptionError instance.
   * 
   * @param errors - Array of errors that occurred during unsubscription
   */
  constructor(errors: ReadonlyArray<Error>) {
    super();

    this.errors = errors;
    this.message = errors.length > 0
      ? `${errors.length} errors occurred during unsubscription:\n${errors
          .map((error, index) => `${index + 1}) ${error.toString()}`)
          .join('\n ')}`
      : '';

    // Maintain proper prototype chain for instanceof checks
    Object.setPrototypeOf(this, UnsubscriptionError.prototype);
  }
}