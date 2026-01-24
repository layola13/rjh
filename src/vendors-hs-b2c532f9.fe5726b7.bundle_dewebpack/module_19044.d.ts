/**
 * Touch and pointer event handler for scrollable elements with swipe support
 * @module TouchHandler
 */

/**
 * Touch/pointer position coordinates
 */
interface Position {
  /** Horizontal position in pixels */
  pageX: number;
  /** Vertical position in pixels */
  pageY: number;
}

/**
 * Velocity vector for swipe momentum
 */
interface Velocity {
  /** Horizontal velocity in pixels per millisecond */
  x: number;
  /** Vertical velocity in pixels per millisecond */
  y: number;
}

/**
 * Scrollbar instance with settings and event management
 */
interface ScrollbarInstance {
  /** Scrollbar configuration options */
  settings: ScrollbarSettings;
  /** Event binding utilities */
  event: EventManager;
  /** Current scroll content height */
  contentHeight: number;
  /** Container visible height */
  containerHeight: number;
  /** Current scroll content width */
  contentWidth: number;
  /** Container visible width */
  containerWidth: number;
}

/**
 * Scrollbar configuration settings
 */
interface ScrollbarSettings {
  /** Allow swipe gestures to propagate to parent elements */
  swipePropagation: boolean;
  /** Enable momentum scrolling with easing after swipe release */
  swipeEasing: boolean;
}

/**
 * Event manager for binding DOM events
 */
interface EventManager {
  /**
   * Bind an event listener to a target
   * @param target - DOM element or window
   * @param eventName - Event type (e.g., 'touchstart', 'pointerdown')
   * @param handler - Event handler function
   */
  bind(target: Element | Window, eventName: string, handler: EventListener): void;
}

/**
 * Environment detection utilities
 */
interface Environment {
  /** Browser supports touch events */
  supportsTouch: boolean;
  /** Browser supports IE pointer events */
  supportsIePointer: boolean;
}

/**
 * Module with environment detection
 */
interface EnvironmentModule {
  env: Environment;
}

/**
 * Instance registry operations
 */
interface InstanceRegistry {
  /**
   * Get scrollbar instance for an element
   * @param element - Target DOM element
   * @returns Scrollbar instance or null if not found
   */
  get(element: Element): ScrollbarInstance | null;
}

/**
 * Trigger update for scrollbar instance
 * @param element - Scrollable element to update
 */
declare function triggerUpdate(element: Element): void;

/**
 * Set scroll position with boundary checks
 * @param element - Scrollable element
 * @param axis - Scroll axis ('top' or 'left')
 * @param value - New scroll position in pixels
 */
declare function setScrollPosition(
  element: Element,
  axis: 'top' | 'left',
  value: number
): void;

/**
 * Initialize touch and pointer event handlers for scrollable element
 * @param element - Target scrollable DOM element
 * @param instance - Scrollbar instance with configuration
 * @param useTouchEvents - Use touch events instead of pointer events
 * @param usePointerEvents - Use pointer events (IE/Edge legacy)
 */
declare function initializeTouchHandler(
  element: Element,
  instance: ScrollbarInstance,
  useTouchEvents: boolean,
  usePointerEvents: boolean
): void;

/**
 * Main entry point: Setup touch/pointer handlers if supported by browser
 * @param element - Scrollable element to enhance with touch support
 */
export default function setupTouchHandling(element: Element): void;