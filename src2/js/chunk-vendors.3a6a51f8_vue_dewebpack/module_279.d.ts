/**
 * A lightweight event emitter implementation.
 * Provides methods for subscribing to events, emitting events, and unsubscribing.
 */
declare class TinyEmitter {
  /**
   * Internal storage for event listeners.
   * Maps event names to arrays of listener objects.
   */
  private e?: Record<string, Array<EventListener>>;

  /**
   * Subscribe to an event.
   * 
   * @param event - The name of the event to listen for
   * @param fn - The callback function to execute when the event is emitted
   * @param context - Optional context (this binding) for the callback function
   * @returns The emitter instance for method chaining
   */
  on(event: string, fn: Function, context?: any): this;

  /**
   * Subscribe to an event that will only fire once.
   * After the first emission, the listener is automatically removed.
   * 
   * @param event - The name of the event to listen for
   * @param fn - The callback function to execute when the event is emitted
   * @param context - Optional context (this binding) for the callback function
   * @returns The emitter instance for method chaining
   */
  once(event: string, fn: Function, context?: any): this;

  /**
   * Emit an event, triggering all registered listeners.
   * 
   * @param event - The name of the event to emit
   * @param args - Arguments to pass to the listener callbacks
   * @returns The emitter instance for method chaining
   */
  emit(event: string, ...args: any[]): this;

  /**
   * Unsubscribe from an event.
   * If no callback is provided, all listeners for the event are removed.
   * 
   * @param event - The name of the event to unsubscribe from
   * @param fn - Optional specific callback function to remove
   * @returns The emitter instance for method chaining
   */
  off(event: string, fn?: Function): this;
}

/**
 * Internal representation of an event listener.
 */
interface EventListener {
  /** The callback function to execute */
  fn: Function;
  /** The context (this binding) for the callback */
  ctx?: any;
  /** Reference to the original function (used for once listeners) */
  _?: Function;
}

export = TinyEmitter;
export { TinyEmitter };