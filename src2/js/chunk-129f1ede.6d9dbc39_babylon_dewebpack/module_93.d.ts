/**
 * Converts a Promise into an Observable-like subscription handler.
 * When the promise resolves, emits the value and completes the observer.
 * When the promise rejects, forwards the error to the observer.
 * 
 * @template T - The type of value emitted by the promise
 * @param promise - The promise to convert
 * @returns A function that subscribes an observer to the promise result
 */
export function subscribeToPromise<T>(promise: Promise<T>): (observer: Observer<T>) => Observer<T> {
  return (observer: Observer<T>): Observer<T> => {
    promise
      .then(
        (value: T) => {
          if (!observer.closed) {
            observer.next(value);
            observer.complete();
          }
        },
        (error: unknown) => {
          observer.error(error);
        }
      )
      .then(null, hostReportError);
    
    return observer;
  };
}

/**
 * Represents an observer that can receive notifications from an Observable.
 * 
 * @template T - The type of value the observer can receive
 */
export interface Observer<T> {
  /**
   * Indicates whether the observer has been closed/unsubscribed.
   */
  closed?: boolean;
  
  /**
   * Receives the next value in the sequence.
   * 
   * @param value - The emitted value
   */
  next(value: T): void;
  
  /**
   * Receives an error notification.
   * 
   * @param error - The error that occurred
   */
  error(error: unknown): void;
  
  /**
   * Notifies that the sequence has completed successfully.
   */
  complete(): void;
}

/**
 * Reports an error to the host environment (e.g., setTimeout for async error throwing).
 * Used to prevent unhandled promise rejections from being silently swallowed.
 * 
 * @param error - The error to report
 */
declare function hostReportError(error: unknown): void;