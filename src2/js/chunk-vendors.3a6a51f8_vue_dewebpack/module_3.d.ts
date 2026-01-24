/**
 * CustomEvent polyfill for older browsers
 * Ensures CustomEvent constructor is available and works correctly with preventDefault()
 */

/**
 * Options for creating a CustomEvent
 */
interface CustomEventOptions<T = any> {
  /** Indicates whether the event bubbles up through the DOM */
  bubbles?: boolean;
  /** Indicates whether the event can be cancelled */
  cancelable?: boolean;
  /** Custom data passed with the event */
  detail?: T;
}

/**
 * Polyfill constructor for CustomEvent
 * @template T - Type of the detail property
 * @param eventType - The name of the event
 * @param options - Configuration options for the event
 * @returns A CustomEvent instance
 */
declare function CustomEventPolyfill<T = any>(
  eventType: string,
  options?: CustomEventOptions<T>
): CustomEvent<T>;

/**
 * Global augmentation to ensure CustomEvent is available on Window
 */
declare global {
  interface Window {
    /**
     * CustomEvent constructor (native or polyfilled)
     */
    CustomEvent: typeof CustomEvent;
  }
}

export {};