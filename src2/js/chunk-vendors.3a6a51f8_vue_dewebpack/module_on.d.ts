/**
 * Event listener registration method
 * Registers an event handler for a specific event type
 * @module module_on
 */

/**
 * Registers an event listener
 * @param eventName - The name of the event to listen for
 * @param handler - The callback function to execute when the event is triggered
 * @param context - The context (this value) to bind to the handler function
 * @returns The current instance for method chaining
 */
declare function on<T = any>(
  eventName: string,
  handler: (...args: any[]) => void,
  context?: T
): any;

/**
 * Event listener configuration object
 */
interface EventListener<T = any> {
  /** The event handler function */
  fn: (...args: any[]) => void;
  /** The execution context for the handler */
  ctx?: T;
}

/**
 * Event registry structure
 * Maps event names to arrays of registered listeners
 */
interface EventRegistry {
  [eventName: string]: EventListener[];
}

/**
 * Object with event capabilities
 */
interface EventEmitter {
  /** Internal event registry */
  e?: EventRegistry;
  
  /**
   * Registers an event listener
   * @param eventName - The name of the event to listen for
   * @param handler - The callback function to execute when the event is triggered
   * @param context - The context (this value) to bind to the handler function
   * @returns The current instance for method chaining
   */
  on<T = any>(
    eventName: string,
    handler: (...args: any[]) => void,
    context?: T
  ): this;
}

export { on, EventListener, EventRegistry, EventEmitter };