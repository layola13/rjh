/**
 * Represents a cancellation token with an optional message.
 * Used to signal that an operation has been cancelled.
 */
export class Cancel {
  /**
   * The cancellation message explaining why the operation was cancelled.
   */
  readonly message: string;

  /**
   * Marker property to identify Cancel instances.
   * @internal
   */
  readonly __CANCEL__: true;

  /**
   * Creates a new Cancel instance.
   * @param message - Optional message describing the cancellation reason
   */
  constructor(message: string);

  /**
   * Returns a string representation of the cancellation.
   * @returns A formatted string like "Cancel" or "Cancel: reason"
   */
  toString(): string;
}

/**
 * Type guard to check if a value is a Cancel instance.
 * @param value - The value to check
 * @returns True if the value is a Cancel instance
 */
export function isCancel(value: unknown): value is Cancel;

export default Cancel;