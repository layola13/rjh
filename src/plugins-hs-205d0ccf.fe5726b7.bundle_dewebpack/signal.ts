import { HSCore } from './HSCore';

/**
 * Signal class for event dispatching and listening
 * Extends HSCore.Util.Signal to provide type-safe event handling
 */
export class Signal<T = unknown> extends HSCore.Util.Signal {
  /**
   * Creates a new Signal instance
   * @param initialValue - The initial value for the signal
   */
  constructor(initialValue: T) {
    super(initialValue);
  }

  /**
   * Dispatches an event to all registered listeners
   * @param event - The event data to dispatch
   * @returns The result of the dispatch operation
   */
  dispatch(event: T): unknown {
    return super.dispatch(event);
  }

  /**
   * Registers an event listener
   * @param handler - The callback function to handle events
   * @param context - Optional context for the callback execution
   * @returns A function or identifier to unlisten
   */
  listen(handler: (event: T) => void, context?: unknown): unknown {
    return super.listen(handler, context);
  }

  /**
   * Unregisters an event listener
   * @param handler - The callback function to remove
   * @param context - Optional context used during registration
   * @returns The result of the unlisten operation
   */
  unlisten(handler: (event: T) => void, context?: unknown): unknown {
    return super.unlisten(handler, context);
  }
}