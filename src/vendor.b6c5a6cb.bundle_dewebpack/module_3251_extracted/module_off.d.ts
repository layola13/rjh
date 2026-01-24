/**
 * Event handler object returned by jQuery when handling events
 */
interface JQueryEventHandleObj {
  /** The namespace of the event handler (e.g., "click.custom") */
  namespace?: string;
  /** The original event type (e.g., "click") */
  origType: string;
  /** CSS selector for delegated events */
  selector?: string;
  /** The event handler function */
  handler: EventListener;
}

/**
 * jQuery event object extending the standard Event interface
 */
interface JQueryEventObject extends Event {
  /** Prevents the default action of the event */
  preventDefault(): void;
  /** Event handler metadata */
  handleObj?: JQueryEventHandleObj;
  /** The element to which the delegated event handler is attached */
  delegateTarget?: Element;
}

/**
 * Event handler removal options map
 * Maps event types to their corresponding handlers
 */
type EventRemovalMap = Record<string, EventListener | false>;

/**
 * Removes event handlers from selected elements
 * 
 * @param events - Event type string, event object, or map of event types to handlers
 * @param selector - Optional CSS selector for filtering delegated events
 * @param handler - Optional event handler function to remove. Pass `false` to remove default handlers
 * @returns The jQuery object for method chaining
 * 
 * @example
 * // Remove all click handlers
 * $('button').off('click');
 * 
 * @example
 * // Remove namespaced handler
 * $('button').off('click.myNamespace');
 * 
 * @example
 * // Remove multiple event types
 * $('button').off({
 *   click: handleClick,
 *   mouseenter: handleMouseEnter
 * });
 * 
 * @example
 * // Remove delegated event handler
 * $(document).off('click', '.dynamic-button', handleClick);
 */
declare function off(
  events: string | JQueryEventObject | EventRemovalMap,
  selector?: string | EventListener | false,
  handler?: EventListener | false
): JQuery;