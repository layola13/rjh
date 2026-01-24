/**
 * EventEmitter implementation for managing and dispatching events.
 * Provides a pub-sub pattern for decoupled communication between components.
 * 
 * @module EventEmitter
 */

/**
 * Type for event listener function
 */
export type ListenerFn<T = any> = (...args: T[]) => void;

/**
 * Internal representation of an event listener
 */
interface EventListener<T = any> {
  /** The listener function to be invoked */
  fn: ListenerFn<T>;
  /** The context (this binding) for the listener */
  context: any;
  /** Whether this listener should be removed after first invocation */
  once: boolean;
}

/**
 * Map of event names to their listeners
 */
interface EventsMap {
  [event: string]: EventListener | EventListener[];
}

/**
 * EventEmitter class for managing event subscriptions and emissions.
 * Supports namespaced events, one-time listeners, and context binding.
 */
export default class EventEmitter {
  /**
   * Prefix used for internal event namespacing (typically '~' or false)
   */
  static prefixed: string | boolean;

  /**
   * Reference to the EventEmitter constructor
   */
  static EventEmitter: typeof EventEmitter;

  /**
   * Internal storage for event listeners
   * @private
   */
  _events: EventsMap;

  /**
   * Count of registered events
   * @private
   */
  _eventsCount: number;

  /**
   * Creates a new EventEmitter instance
   */
  constructor();

  /**
   * Returns an array of event names for which listeners are registered.
   * 
   * @returns Array of event names (strings or symbols)
   */
  eventNames(): (string | symbol)[];

  /**
   * Returns an array of listeners for the specified event.
   * 
   * @param event - The event name
   * @returns Array of listener functions
   */
  listeners<T = any>(event: string | symbol): ListenerFn<T>[];

  /**
   * Returns the number of listeners for the specified event.
   * 
   * @param event - The event name
   * @returns Number of registered listeners
   */
  listenerCount(event: string | symbol): number;

  /**
   * Synchronously calls each listener registered for the event, in registration order.
   * 
   * @param event - The event name
   * @param args - Arguments to pass to the listeners
   * @returns true if the event had listeners, false otherwise
   */
  emit(event: string | symbol, ...args: any[]): boolean;

  /**
   * Adds a listener function to the end of the listeners array for the specified event.
   * 
   * @param event - The event name
   * @param fn - The listener function
   * @param context - Optional context (this binding) for the listener
   * @returns Reference to the EventEmitter for chaining
   */
  on<T = any>(event: string | symbol, fn: ListenerFn<T>, context?: any): this;

  /**
   * Adds a one-time listener function for the event.
   * The listener is invoked only once, then removed.
   * 
   * @param event - The event name
   * @param fn - The listener function
   * @param context - Optional context (this binding) for the listener
   * @returns Reference to the EventEmitter for chaining
   */
  once<T = any>(event: string | symbol, fn: ListenerFn<T>, context?: any): this;

  /**
   * Removes the specified listener from the listener array for the event.
   * 
   * @param event - The event name
   * @param fn - The listener function to remove
   * @param context - Optional context to match
   * @param once - Whether to only remove once-listeners
   * @returns Reference to the EventEmitter for chaining
   */
  removeListener<T = any>(
    event: string | symbol,
    fn?: ListenerFn<T>,
    context?: any,
    once?: boolean
  ): this;

  /**
   * Removes all listeners, or those of the specified event.
   * 
   * @param event - Optional event name; if omitted, removes all listeners
   * @returns Reference to the EventEmitter for chaining
   */
  removeAllListeners(event?: string | symbol): this;

  /**
   * Alias for removeListener
   * 
   * @param event - The event name
   * @param fn - The listener function to remove
   * @param context - Optional context to match
   * @param once - Whether to only remove once-listeners
   * @returns Reference to the EventEmitter for chaining
   */
  off<T = any>(
    event: string | symbol,
    fn?: ListenerFn<T>,
    context?: any,
    once?: boolean
  ): this;

  /**
   * Alias for on
   * 
   * @param event - The event name
   * @param fn - The listener function
   * @param context - Optional context (this binding) for the listener
   * @returns Reference to the EventEmitter for chaining
   */
  addListener<T = any>(event: string | symbol, fn: ListenerFn<T>, context?: any): this;
}