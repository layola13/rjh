/**
 * Event emitter class for managing event listeners and dispatching events.
 * Provides a simple publish-subscribe pattern implementation.
 */
declare class EventEmitter {
  /**
   * Map of event names to their registered listener functions.
   * @private
   */
  private listeners: Record<string, Array<(...args: any[]) => void>>;

  /**
   * Creates a new EventEmitter instance.
   */
  constructor();

  /**
   * Emits an event, invoking all registered listeners for that event.
   * @param eventName - The name of the event to emit
   * @param args - Arguments to pass to the event listeners
   * @example
   * emitter.emit('userLogin', userId, timestamp);
   */
  emit(eventName: string, ...args: any[]): void;

  /**
   * Registers a listener function for a specific event.
   * If the event doesn't exist, creates a new listener array for it.
   * @param eventName - The name of the event to listen to
   * @param listener - The callback function to invoke when the event is emitted
   * @example
   * emitter.on('userLogin', (userId) => console.log(userId));
   */
  on(eventName: string, listener: (...args: any[]) => void): void;

  /**
   * Removes a specific listener function from an event.
   * If the event has no more listeners after removal, the array remains empty.
   * @param eventName - The name of the event
   * @param listener - The listener function to remove
   * @example
   * emitter.off('userLogin', handleLogin);
   */
  off(eventName: string, listener: (...args: any[]) => void): void;
}

export default EventEmitter;