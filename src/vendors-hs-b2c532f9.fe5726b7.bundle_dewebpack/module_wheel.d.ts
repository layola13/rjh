/**
 * Perfect Scrollbar wheel event handler module
 * Handles mouse wheel and trackpad scrolling with proper delta normalization
 */

/**
 * Scrollbar instance interface
 */
interface ScrollbarInstance {
  /** The DOM element being scrolled */
  element: HTMLElement;
  /** Event binding utility */
  event: {
    bind: (element: HTMLElement, eventType: string, handler: EventListener) => void;
  };
  /** Scrollbar configuration settings */
  settings: ScrollbarSettings;
  /** Whether vertical scrollbar is currently active */
  scrollbarYActive: boolean;
  /** Whether horizontal scrollbar is currently active */
  scrollbarXActive: boolean;
}

/**
 * Scrollbar configuration options
 */
interface ScrollbarSettings {
  /** Multiplier for wheel scroll speed */
  wheelSpeed: number;
  /** Whether to allow scrolling on both axes using a single wheel axis */
  useBothWheelAxes: boolean;
  /** Whether to propagate wheel events to parent elements when at scroll boundaries */
  wheelPropagation: boolean;
}

/**
 * CSS class names used by the scrollbar
 */
interface ScrollbarClassNames {
  element: {
    /** Class name for elements that consume scroll events */
    consuming: string;
  };
}

/**
 * Browser detection utilities
 */
interface BrowserDetection {
  /** Whether the current browser is WebKit-based */
  isWebKit: boolean;
}

/**
 * Normalized wheel delta values [deltaX, deltaY]
 */
type WheelDelta = [number, number];

/**
 * Initialize wheel event handler for a scrollbar instance
 * @param instance - The scrollbar instance to attach wheel handling to
 */
declare function initializeWheelHandler(instance: ScrollbarInstance): void;

/**
 * Normalize wheel event delta values across different browsers and input devices
 * @param event - The native wheel event
 * @returns Tuple of [deltaX, deltaY] in normalized units
 */
declare function normalizeWheelDelta(event: WheelEvent): WheelDelta;

/**
 * Check if the wheel event should be consumed by a child element
 * @param target - The event target element
 * @param deltaX - Horizontal scroll delta
 * @param deltaY - Vertical scroll delta
 * @returns True if a child element should handle the event, false otherwise
 */
declare function shouldConsumeEvent(
  target: EventTarget | null,
  deltaX: number,
  deltaY: number
): boolean;

/**
 * Update scrollbar visual state after scroll position changes
 * @param instance - The scrollbar instance to update
 */
declare function updateScrollbar(instance: ScrollbarInstance): void;

/**
 * Check if scroll event should propagate to parent elements
 * @param deltaX - Horizontal scroll delta
 * @param deltaY - Vertical scroll delta
 * @returns True if event should propagate, false if it should be stopped
 */
declare function shouldPropagateScroll(deltaX: number, deltaY: number): boolean;

/**
 * Handle wheel events on the scrollbar element
 * @param event - The wheel event to process
 */
declare function handleWheelEvent(event: WheelEvent): void;

/**
 * Get computed styles for an element
 * @param element - The DOM element
 * @returns Computed style declaration
 */
declare function getComputedStyle(element: Element): CSSStyleDeclaration;

/**
 * Global browser detection namespace
 */
declare const L: BrowserDetection;

/**
 * Global class names configuration
 */
declare const l: ScrollbarClassNames;

/**
 * Global scrollbar update function reference
 */
declare const g: typeof updateScrollbar;

/**
 * Global computed style getter reference
 */
declare const n: typeof getComputedStyle;