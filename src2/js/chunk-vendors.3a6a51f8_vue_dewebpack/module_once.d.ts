/**
 * Module: module_once
 * Original ID: once
 * 
 * Registers an event listener that will be automatically removed after being triggered once.
 * This is a common pattern in event emitter implementations.
 */

/**
 * Registers a one-time event listener that will be removed after first execution.
 * 
 * @template TContext - The type of the context object (typically an EventEmitter instance)
 * @template TArgs - The tuple type of arguments passed to the event handler
 * 
 * @param this - The context object (event emitter) on which to register the listener
 * @param eventName - The name of the event to listen for
 * @param handler - The callback function to execute when the event is triggered
 * @param context - Optional context to bind to the handler when it's called
 * 
 * @returns The context object for method chaining
 * 
 * @example
 *