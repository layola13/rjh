/**
 * Event listener registration module
 * 
 * Registers an event handler on the current context
 * 
 * @module module_on
 * @original-id on
 */

/**
 * Registers an event listener
 * 
 * @template T - Event target type
 * @template K - Event type (typically a string literal type)
 * @param this - The context object (event target)
 * @param eventType - The type of event to listen for
 * @param handler - The event handler function
 * @param options - Optional event listener options
 * @param capture - Optional capture phase flag (legacy parameter)
 * @returns The result of the internal event registration function
 */
declare function on<T = any, K extends string = string>(
    this: T,
    eventType: K,
    handler: EventListenerOrEventListenerObject | ((...args: any[]) => void),
    options?: boolean | AddEventListenerOptions,
    capture?: boolean
): T | void;

export = on;