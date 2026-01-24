/**
 * Module: module_ss
 * Handles scroll start initialization
 */

/**
 * Initializes scroll tracking by triggering a "scrollStart" event
 * and updating the scroll state tracker.
 * 
 * This function checks if the scroll has already started (Lh flag).
 * If not, it dispatches a scrollStart event and captures the current scroll position.
 * 
 * @returns void
 */
declare function module_ss(): void;

/**
 * Global scroll state flag indicating whether scrolling has been initialized
 */
declare let Lh: boolean | number | undefined;

/**
 * Dispatches a custom event with the given event name
 * @param eventName - The name of the event to dispatch
 */
declare function id(eventName: string): void;

/**
 * Captures and returns the current scroll position or scroll-related metrics
 * @returns The current scroll position or scroll state value
 */
declare function Bh(): number;

export { module_ss, Lh, id, Bh };