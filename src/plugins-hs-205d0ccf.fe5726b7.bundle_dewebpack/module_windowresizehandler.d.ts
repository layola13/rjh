/**
 * Window resize handler that adjusts dimensions and position based on window size
 * @module windowResizeHandler
 */

/**
 * Configuration object for window dimensions and positioning
 */
interface WindowDimensions {
  /** Width of the element */
  w: number;
  /** Height of the element */
  h: number;
  /** Left position offset */
  l: number;
  /** Top position offset */
  t: number;
  /** Aspect ratio (-1 if not maintaining aspect ratio) */
  ratio: number;
  /** Updates UI based on current dimension data */
  updateUIByData(): void;
}

/**
 * Event data passed to the resize handler
 */
interface ResizeEventData {
  /** The target element or window being resized */
  target: Window | Element;
}

/**
 * jQuery-style event object with custom data
 */
interface ResizeEvent {
  data: ResizeEventData;
}

/**
 * Handles window resize events and adjusts element dimensions while maintaining constraints
 * 
 * - Adjusts width and left position when element exceeds window width
 * - Adjusts height and top position when element exceeds window height
 * - Maintains aspect ratio when specified (ratio !== -1)
 * 
 * @param dimensions - The current window dimensions configuration
 * @param event - The resize event object containing the target window
 */
declare function windowResizeHandler(
  dimensions: WindowDimensions,
  event: ResizeEvent
): void;

export { windowResizeHandler, WindowDimensions, ResizeEventData, ResizeEvent };