/**
 * Type guard to check if a value is a cancellation token.
 * Verifies that the object has the __CANCEL__ property set to a truthy value.
 * 
 * @param value - The value to check
 * @returns True if the value is a cancellation token, false otherwise
 */
export declare function isCancelToken(value: unknown): value is CancelToken;

/**
 * Interface representing a cancellation token.
 * Used to identify objects that represent cancelled operations.
 */
export interface CancelToken {
  /**
   * Internal marker property indicating this is a cancellation token.
   * Should always be true for valid cancel tokens.
   */
  __CANCEL__: true;
}

export default isCancelToken;