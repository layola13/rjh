/**
 * Attaches an event handler to the current element(s)
 * @module module_on
 * @original-id on
 */

/**
 * Event handler function type
 */
type EventHandler<TElement = Element, TData = any> = (
  this: TElement,
  event: Event,
  data?: TData
) => void | false;

/**
 * Attaches one or more event handlers for the selected elements
 * 
 * @param eventType - One or more space-separated event types (e.g., "click", "mouseover")
 * @param selector - A selector string to filter descendants that trigger the event (optional)
 * @param data - Data to be passed to the handler in event.data when an event is triggered (optional)
 * @param handler - A function to execute when the event is triggered
 * @param priority - Event priority for execution order (optional)
 * @returns The current instance for method chaining
 * 
 * @example
 * element.on('click', handleClick);
 * element.on('click', '.button', handleClick);
 * element.on('click', '.button', { key: 'value' }, handleClick);
 */
declare function on<TElement = Element, TData = any>(
  this: TElement,
  eventType: string,
  selector?: string | TData | EventHandler<TElement, TData>,
  data?: TData | EventHandler<TElement, TData>,
  handler?: EventHandler<TElement, TData>,
  priority?: number
): TElement;