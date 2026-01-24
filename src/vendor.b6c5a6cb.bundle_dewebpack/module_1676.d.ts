/**
 * Bootstrap transition utility module
 * Provides cross-browser CSS transition support and emulation
 */

declare global {
  interface JQuerySupport {
    /**
     * Transition support detection result
     * Contains the appropriate transitionend event name for the current browser
     * or false if transitions are not supported
     */
    transition: {
      /** The browser-specific transition end event name */
      end: string;
    } | false;
  }

  interface JQuerySpecialEvent {
    /**
     * Normalized Bootstrap transition end event
     * Provides consistent cross-browser handling of CSS transition end events
     */
    bsTransitionEnd?: {
      /** Event type to bind to */
      bindType: string;
      /** Event type for delegation */
      delegateType: string;
      /**
       * Custom event handler that ensures event target matches the element
       * @param event - The transition end event
       * @returns The result of the original handler or undefined
       */
      handle(event: JQuery.Event): any;
    };
  }

  interface JQuery {
    /**
     * Emulates a CSS transition end event with a fallback timeout
     * Ensures callback execution even if the transitionend event fails to fire
     * 
     * @param duration - Timeout duration in milliseconds after which to force trigger the event
     * @returns The jQuery object for chaining
     * 
     * @example
     *