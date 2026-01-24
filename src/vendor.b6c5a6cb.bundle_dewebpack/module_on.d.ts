/**
 * Event listener registration module
 * Registers an event handler on the target object
 * 
 * @module module_on
 */

/**
 * Registers an event listener
 * 
 * @template T - The target object type
 * @template E - The event name type
 * @template H - The event handler type
 * @param this - The context object
 * @param t - Target object or event name
 * @param r - Event name or handler function
 * @param e - Handler function or options
 * @param n - Options or additional parameters
 * @returns The result from the internal event registration function
 */
declare function on<T = unknown, E = string, H = Function>(
  this: unknown,
  t: T | E,
  r: E | H,
  e?: H | EventListenerOptions,
  n?: EventListenerOptions | boolean
): unknown;

export default on;