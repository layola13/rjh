/**
 * Module: module_ss
 * Original ID: ss
 * 
 * Handles scroll start initialization and tracking.
 * This module ensures scroll events are properly initialized and state is managed.
 */

/**
 * Global flag indicating whether scroll tracking has been initialized.
 * When false, triggers a "scrollStart" event and updates to the current scroll position.
 */
declare let Lh: number | boolean | undefined;

/**
 * Triggers a custom scroll start event.
 * Should be called when scroll tracking is first initialized.
 * 
 * @param eventName - The name of the event to dispatch (typically "scrollStart")
 */
declare function id(eventName: string): void;

/**
 * Gets the current scroll position or state.
 * 
 * @returns The current scroll position (typically in pixels) or scroll state
 */
declare function Bh(): number;

/**
 * Initializes scroll tracking if not already initialized.
 * - Checks if scroll tracking is active (Lh)
 * - If not active, dispatches a "scrollStart" event
 * - Updates the scroll state to the current position
 * 
 * This function is typically invoked immediately as part of module initialization.
 */
declare function initializeScrollTracking(): void;