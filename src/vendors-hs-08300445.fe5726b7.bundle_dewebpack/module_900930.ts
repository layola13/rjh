import ReactDOM from 'react-dom';

interface EventListenerHandle {
  remove: () => void;
}

export default function addEventListener<K extends keyof HTMLElementEventMap>(
  element: HTMLElement | null | undefined,
  eventType: K,
  handler: (event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions
): EventListenerHandle;

export default function addEventListener(
  element: EventTarget | null | undefined,
  eventType: string,
  handler: EventListener,
  options?: boolean | AddEventListenerOptions
): EventListenerHandle;

export default function addEventListener(
  element: EventTarget | null | undefined,
  eventType: string,
  handler: EventListener,
  options?: boolean | AddEventListenerOptions
): EventListenerHandle {
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