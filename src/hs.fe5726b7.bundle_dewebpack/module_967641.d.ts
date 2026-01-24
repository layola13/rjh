/**
 * Canvas resize manager for editor layout
 * Handles responsive canvas sizing based on window dimensions and UI elements
 */

/**
 * Signal class for managing event dispatching and listening
 */
interface Signal<T = any> {
  listen(callback: (data: { data: T }) => void, context?: any): void;
  dispatch(data: T): void;
}

/**
 * HSCore utility namespace
 */
declare namespace HSCore {
  namespace Util {
    class Signal<T = any> {
      constructor(context?: any);
      listen(callback: (data: { data: T }) => void, context?: any): void;
      dispatch(data: T): void;
    }
  }
}

/**
 * jQuery window resize event
 */
interface JQueryResizeEvent extends JQuery.Event {
  target: Window | HTMLElement;
}

/**
 * Canvas resize manager module
 */
interface CanvasResizeManager {
  /**
   * Signal emitted when window resize operation ends (debounced)
   */
  signalWindowResizeEnd?: Signal<JQueryResizeEvent>;

  /**
   * Recalculates and applies canvas dimensions based on viewport and UI element sizes
   * 
   * Layout calculation:
   * - Full window width for editor
   * - Height = window height - header height - status bar height
   */
  resizeCanvas(): void;

  /**
   * Initializes the resize manager
   * 
   * Sets up:
   * - Window resize signal with debouncing (200ms delay)
   * - Initial canvas sizing
   * - Resize event listeners
   */
  init(): void;
}

/**
 * Canvas resize manager instance
 * Manages responsive layout for the editor canvas
 */
declare const canvasResizeManager: CanvasResizeManager;

export default canvasResizeManager;