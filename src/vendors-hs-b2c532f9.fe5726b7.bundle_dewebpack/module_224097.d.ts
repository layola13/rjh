/**
 * Auto-scroll module for handling automatic scrolling during text selection
 * near element boundaries.
 */

/**
 * Scroll offset configuration for auto-scrolling behavior
 */
interface ScrollOffset {
  /** Vertical scroll offset in pixels */
  top: number;
  /** Horizontal scroll offset in pixels */
  left: number;
}

/**
 * Mouse position coordinates
 */
interface MousePosition {
  /** Horizontal position in pixels */
  x: number;
  /** Vertical position in pixels */
  y: number;
}

/**
 * Element boundary rectangle
 */
interface ElementBounds {
  /** Left boundary position */
  left: number;
  /** Right boundary position */
  right: number;
  /** Top boundary position */
  top: number;
  /** Bottom boundary position */
  bottom: number;
}

/**
 * Perfect Scrollbar instance interface
 */
interface PerfectScrollbarInstance {
  /** The DOM element being scrolled */
  element: HTMLElement;
  /** Event binding utilities */
  event: {
    bind: (target: EventTarget, eventName: string, handler: EventListener) => void;
    unbind: (target: EventTarget, eventName: string, handler: EventListener) => void;
  };
  /** Reference to the owner document */
  ownerDocument: Document;
}

/**
 * Scroll utilities module
 */
declare module 'scroll-utils' {
  /**
   * Starts scrolling animation for the specified element
   * @param element - The element to scroll
   * @param axis - The scroll axis ('x' or 'y')
   */
  export function startScrolling(element: HTMLElement, axis: 'x' | 'y'): void;

  /**
   * Stops any ongoing scrolling animation
   * @param element - The element to stop scrolling
   */
  export function stopScrolling(element: HTMLElement): void;
}

/**
 * Instance retrieval module
 */
declare module 'instance-get' {
  /**
   * Retrieves the Perfect Scrollbar instance associated with an element
   * @param element - The DOM element
   * @returns The Perfect Scrollbar instance or null if not found
   */
  export function get(element: HTMLElement): PerfectScrollbarInstance | null;
}

/**
 * Update handler module
 */
declare module 'update-handler' {
  /**
   * Updates the scrollbar state and geometry
   * @param element - The element to update
   */
  export function updateGeometry(element: HTMLElement): void;
}

/**
 * Scroll process module
 */
declare module 'scroll-process' {
  /**
   * Processes scroll operation on an element
   * @param element - The element to scroll
   * @param axis - The scroll axis ('top' or 'left')
   * @param value - The scroll position value
   */
  export function processScroll(
    element: HTMLElement,
    axis: 'top' | 'left',
    value: number
  ): void;
}

/**
 * Initializes auto-scrolling behavior for text selection on the specified element.
 * Automatically scrolls the element when the user selects text near the edges.
 * 
 * @param element - The HTML element to enable auto-scroll selection on
 * 
 * @remarks
 * This module handles:
 * - Text selection detection via `selectionchange` event
 * - Mouse position tracking during selection
 * - Automatic scrolling when selection approaches element boundaries
 * - Scroll speed adjustment based on distance from edge (5px or 20px)
 * - Cleanup on selection end (mouseup, keyup events)
 * 
 * @example
 *