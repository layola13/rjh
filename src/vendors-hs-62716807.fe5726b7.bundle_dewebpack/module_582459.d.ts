/**
 * Cancel token for aborting HTTP requests or async operations.
 * This class represents a cancellation with an optional message.
 */
declare class Cancel {
  /**
   * The cancellation message providing context for why the operation was cancelled.
   */
  message: string;

  /**
   * Internal flag to identify Cancel instances.
   * Used for type checking without instanceof.
   */
  __CANCEL__: true;

  /**
   * Creates a new Cancel instance.
   * @param message - Optional message describing the reason for cancellation
   */
  constructor(message?: string);

  /**
   * Returns a string representation of the cancellation.
   * @returns A formatted string like "Cancel" or "Cancel: <message>"
   */
  toString(): string;
}

export = Cancel;