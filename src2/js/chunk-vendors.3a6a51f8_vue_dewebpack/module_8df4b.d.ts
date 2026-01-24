/**
 * Represents a reason for cancellation, typically containing an error message.
 * This would be imported from module '7a77' (likely a Cancel or CancellationError class).
 */
interface CancelReason {
  message?: string;
}

/**
 * Function type for canceling an operation.
 * @param message - Optional cancellation message
 */
type Canceler = (message?: string) => void;

/**
 * Function type for the executor passed to CancelToken constructor.
 * @param cancel - The canceler function to trigger cancellation
 */
type CancelExecutor = (cancel: Canceler) => void;

/**
 * Return type of CancelToken.source() factory method.
 */
interface CancelTokenSource {
  /** The cancel token instance */
  token: CancelToken;
  /** Function to trigger cancellation */
  cancel: Canceler;
}

/**
 * CancelToken class for managing cancellable asynchronous operations.
 * 
 * A CancelToken can be used to request cancellation of an operation.
 * When cancelled, it stores the cancellation reason and settles an internal promise.
 * 
 * @example
 *