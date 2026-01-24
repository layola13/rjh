/**
 * Interceptor manager for handling request/response transformations.
 * Manages a chain of fulfilled and rejected handlers that can be applied to axios requests/responses.
 */
declare class InterceptorManager<T> {
  /**
   * Array of interceptor handlers.
   * Null entries represent ejected interceptors.
   */
  private handlers: Array<InterceptorHandler<T> | null>;

  constructor();

  /**
   * Add a new interceptor to the stack.
   * 
   * @param fulfilled - Callback to be executed on successful resolution
   * @param rejected - Callback to be executed on rejection
   * @returns The ID of the interceptor for later ejection
   */
  use(
    fulfilled?: ((value: T) => T | Promise<T>) | null,
    rejected?: ((error: unknown) => unknown) | null
  ): number;

  /**
   * Remove an interceptor from the stack by its ID.
   * 
   * @param id - The interceptor ID returned by `use()`
   */
  eject(id: number): void;

  /**
   * Iterate over all active interceptors.
   * Null (ejected) interceptors are automatically skipped.
   * 
   * @param fn - Function to execute for each active interceptor
   */
  forEach(fn: (handler: InterceptorHandler<T>) => void): void;
}

/**
 * Represents a single interceptor handler with success and error callbacks.
 */
interface InterceptorHandler<T> {
  /**
   * Handler invoked when the operation succeeds.
   */
  fulfilled?: ((value: T) => T | Promise<T>) | null;

  /**
   * Handler invoked when the operation fails.
   */
  rejected?: ((error: unknown) => unknown) | null;
}

export = InterceptorManager;