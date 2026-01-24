/**
 * Custom error thrown when attempting to use an Observable that has been unsubscribed
 * @public
 */
export class ObjectUnsubscribedError extends Error {
  /**
   * Error message indicating the object has been unsubscribed
   */
  override message: string;

  /**
   * Name of the error type
   */
  override name: string;

  /**
   * Creates a new ObjectUnsubscribedError instance
   */
  constructor() {
    super();
    this.message = "object unsubscribed";
    this.name = "ObjectUnsubscribedError";
  }
}