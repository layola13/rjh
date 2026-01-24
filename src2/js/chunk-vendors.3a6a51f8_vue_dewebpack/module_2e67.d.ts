/**
 * Type guard to check if a value is a cancellation token.
 * Verifies that the object has the __CANCEL__ property set to a truthy value.
 * 
 * @param value - The value to check for cancellation token properties
 * @returns True if the value is a valid cancellation token, false otherwise
 */
export function isCancelToken(value: unknown): value is CancelToken {
  return !!(value && (value as CancelToken).__CANCEL__);
}

/**
 * Represents a cancellation token used to signal cancellation of async operations.
 * Typically used in HTTP request libraries like Axios.
 */
export interface CancelToken {
  /** Internal marker property that identifies this object as a cancel token */
  __CANCEL__: boolean | string | object;
}