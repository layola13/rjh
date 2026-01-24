/**
 * Event listener management utility with React batched updates support
 * @module EventListenerManager
 */

import type ReactDOM from 'react-dom';

/**
 * Event listener removal handle
 */
export interface EventListenerHandle {
  /**
   * Removes the attached event listener from the target element
   */
  remove(): void;
}

/**
 * Attaches an event listener to a DOM element with optional React batched updates support.
 * If React's unstable_batchedUpdates is available, wraps the handler to batch state updates.
 * 
 * @template K - The event type (e.g., 'click', 'scroll', 'resize')
 * @param target - The DOM element to attach the listener to
 * @param eventType - The type of event to listen for
 * @param handler - The event handler callback function
 * @param options - Optional event listener options (capture, once, passive, etc.)
 * @returns An object with a `remove` method to detach the listener
 * 
 * @example
 * const handle = addEventListener(document.body, 'click', (e) => console.log(e), false);
 * // Later: handle.remove();
 */
export default function addEventListener<K extends keyof HTMLElementEventMap>(
  target: HTMLElement | Document | Window | null | undefined,
  eventType: K,
  handler: (event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions
): EventListenerHandle;

export default function addEventListener(
  target: EventTarget | null | undefined,
  eventType: string,
  handler: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions
): EventListenerHandle;

export default function addEventListener(
  target: EventTarget | null | undefined,
  eventType: string,
  handler: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions
): EventListenerHandle {
  // Wrap handler with React's batched updates if available
  const wrappedHandler: EventListenerOrEventListenerObject =
    (ReactDOM as typeof ReactDOM & { unstable_batchedUpdates?: Function }).unstable_batchedUpdates
      ? (event: Event) => {
          (ReactDOM as any).unstable_batchedUpdates(handler, event);
        }
      : handler;

  // Attach event listener if target supports it
  if (target?.addEventListener) {
    target.addEventListener(eventType, wrappedHandler, options);
  }

  // Return handle for cleanup
  return {
    remove(): void {
      if (target?.removeEventListener) {
        target.removeEventListener(eventType, wrappedHandler, options);
      }
    }
  };
}