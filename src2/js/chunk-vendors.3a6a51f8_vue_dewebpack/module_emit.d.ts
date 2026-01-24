/**
 * Event emitter module that triggers registered event listeners.
 * 
 * @template TEvents - Type map of event names to their argument types
 */
interface EventEmitter<TEvents extends Record<string, unknown[]> = Record<string, unknown[]>> {
  /**
   * Internal storage for event listeners.
   * Maps event names to arrays of listener objects.
   */
  e?: {
    [K in keyof TEvents]?: Array<{
      /** The callback function to invoke */
      fn: (...args: TEvents[K]) => void;
      /** The context (this value) to bind when calling the function */
      ctx: unknown;
    }>;
  };

  /**
   * Emits an event, invoking all registered listeners with the provided arguments.
   * 
   * @param eventName - The name of the event to emit
   * @param args - Arguments to pass to each listener callback
   * @returns The emitter instance for method chaining
   * 
   * @example
   *