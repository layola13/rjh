/**
 * jQuery event capture utilities
 * Provides cross-browser support for capture-phase event handling
 */

declare global {
  interface JQuery {
    /**
     * Binds an event listener in the capture phase (bubbling from root to target)
     * Provides cross-browser compatibility for both modern and legacy browsers
     * 
     * @param eventType - The event type to listen for (e.g., 'click', 'mousedown')
     * @param handler - The event handler function to execute
     * 
     * @example
     *