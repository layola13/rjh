/**
 * Signal system for event handling and task management
 * Provides base Signal class and specialized SaveSignal and TaskSignal implementations
 */

/**
 * Base Signal class for event-driven communication
 * Extends HSCore.Util.Signal to provide dispatch and listen functionality
 */
export declare class Signal {
  /**
   * Creates a new Signal instance
   * @param config - Configuration object for signal initialization
   */
  constructor(config: unknown);

  /**
   * Dispatches an event to all registered listeners
   * @param event - The event data to dispatch
   * @returns The result of the dispatch operation
   */
  dispatch(event: unknown): unknown;

  /**
   * Registers a listener function for this signal
   * @param listener - The callback function to invoke when signal is dispatched
   * @param context - Optional context (this) for the listener function
   * @returns A handle or subscription object for managing the listener
   */
  listen(listener: Function, context?: unknown): unknown;

  /**
   * Removes a previously registered listener
   * @param listener - The listener function to remove
   * @param context - Optional context used when the listener was registered
   * @returns Result indicating success of the unlisten operation
   */
  unlisten(listener: Function, context?: unknown): unknown;
}

/**
 * Specialized Signal for save operations
 * Inherits all Signal functionality for handling save-related events
 */
export declare class SaveSignal extends Signal {
  /**
   * Creates a new SaveSignal instance
   * @param config - Configuration object for save signal initialization
   */
  constructor(config: unknown);
}

/**
 * Specialized Signal for task management
 * Inherits all Signal functionality for handling task-related events
 */
export declare class TaskSignal extends Signal {
  /**
   * Creates a new TaskSignal instance
   * @param args - Variable arguments passed to the parent Signal constructor
   */
  constructor(...args: unknown[]);
}