/**
 * Event listener management utility with batched updates support
 * @module EventListenerUtils
 */

import type React from 'react';

/**
 * Event listener removal interface
 */
export interface EventListenerHandle {
  /**
   * Removes the attached event listener
   */
  remove(): void;
}

/**
 * React DOM with unstable APIs
 */
interface ReactDOMWithBatchedUpdates {
  unstable_batchedUpdates?: <T>(callback: (arg: T) => void, arg: T) => void;
}

/**
 * Attaches an event listener to a target element with optional batched updates
 * 
 * @template K - Event type key
 * @template T - Target element type
 * @param target - The event target (e.g., DOM element, window, document)
 * @param eventType - The event type to listen for (e.g., 'click', 'scroll')
 * @param handler - The event handler callback function
 * @param options - Optional event listener options (capture, passive, once, etc.)
 * @returns An object with a `remove` method to detach the listener
 * 
 * @example
 *