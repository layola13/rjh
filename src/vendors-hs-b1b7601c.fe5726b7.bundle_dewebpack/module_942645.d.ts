/**
 * Timeout provider interface for delegating timeout operations.
 * Allows customization of setTimeout/clearTimeout behavior for testing or special environments.
 */
export interface TimeoutProvider {
  /**
   * Schedules a function to be called after a specified delay.
   * @param handler - The function to execute after the delay
   * @param timeout - The delay in milliseconds
   * @param args - Additional arguments to pass to the handler
   * @returns A timeout ID that can be used to cancel the timeout
   */
  setTimeout(handler: (...args: unknown[]) => void, timeout: number, ...args: unknown[]): number;

  /**
   * Cancels a timeout previously established by calling setTimeout.
   * @param handle - The timeout ID returned by setTimeout
   */
  clearTimeout(handle: number): void;

  /**
   * Optional delegate provider that can override the default timeout behavior.
   * When set, all setTimeout/clearTimeout calls will be forwarded to this delegate.
   */
  delegate?: TimeoutProvider | undefined;
}

/**
 * Global timeout provider instance.
 * Wraps native setTimeout/clearTimeout with delegation support.
 */
export declare const timeoutProvider: TimeoutProvider;