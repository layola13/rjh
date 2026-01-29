import ReactDOM from 'react-dom';

interface EventListenerResult {
  remove: () => void;
}

type EventHandler = (event: Event) => void;

/**
 * Adds an event listener to a DOM element with optional batched updates support.
 * 
 * @param element - The target DOM element
 * @param eventType - The event type to listen for
 * @param handler - The event handler function
 * @param options - Optional event listener options
 * @returns An object with a remove method to unregister the listener
 */
export default function addEventListener(
  element: Element | Document | Window | null | undefined,
  eventType: string,
  handler: EventHandler,
  options?: boolean | AddEventListenerOptions
): EventListenerResult {
  const wrappedHandler = ReactDOM.unstable_batchedUpdates
    ? (event: Event) => {
        ReactDOM.unstable_batchedUpdates(handler, event);
      }
    : handler;

  if (element?.addEventListener) {
    element.addEventListener(eventType, wrappedHandler, options);
  }

  return {
    remove: () => {
      if (element?.removeEventListener) {
        element.removeEventListener(eventType, wrappedHandler, options);
      }
    }
  };
}