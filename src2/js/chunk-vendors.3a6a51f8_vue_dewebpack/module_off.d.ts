/**
 * Event listener removal method
 * Removes event listeners for a specific event type and handler function
 * 
 * @template T - Event context type
 */
interface EventEmitter<T = any> {
  /**
   * Internal event storage map
   * Keys are event names, values are arrays of listener objects
   */
  e?: Record<string, Array<EventListener>>;

  /**
   * Removes an event listener from the emitter
   * 
   * @param eventName - The name of the event to remove the listener from
   * @param handler - Optional specific handler function to remove. If omitted, all listeners for the event are removed
   * @returns The EventEmitter instance for method chaining
   * 
   * @example
   *