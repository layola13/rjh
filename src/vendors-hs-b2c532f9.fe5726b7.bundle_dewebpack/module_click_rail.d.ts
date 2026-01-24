/**
 * Click-rail module for scrollbar interaction
 * Handles click events on scrollbar rails to scroll the container by one page
 * Original Module: module_click_rail (click-rail)
 */

/**
 * Scrollbar instance interface containing scroll state and DOM elements
 */
interface ScrollbarInstance {
  /** The scrollable container element */
  element: HTMLElement;
  
  /** Event binding utility */
  event: {
    /**
     * Bind an event listener to a DOM element
     * @param element - The target DOM element
     * @param eventName - The event name (e.g., 'mousedown')
     * @param handler - The event handler function
     */
    bind(element: HTMLElement, eventName: string, handler: (event: MouseEvent) => void): void;
  };
  
  /** Vertical scrollbar thumb element */
  scrollbarY: HTMLElement;
  
  /** Vertical scrollbar rail (track) element */
  scrollbarYRail: HTMLElement;
  
  /** Current top position of the vertical scrollbar thumb */
  scrollbarYTop: number;
  
  /** Horizontal scrollbar thumb element */
  scrollbarX: HTMLElement;
  
  /** Horizontal scrollbar rail (track) element */
  scrollbarXRail: HTMLElement;
  
  /** Current left position of the horizontal scrollbar thumb */
  scrollbarXLeft: number;
  
  /** Height of the visible container area */
  containerHeight: number;
  
  /** Width of the visible container area */
  containerWidth: number;
}

/**
 * Direction multiplier for scroll calculation
 * 1 for forward/down scroll, -1 for backward/up scroll
 */
type ScrollDirection = 1 | -1;

/**
 * Updates the scrollbar position and appearance
 * @param instance - The scrollbar instance to update
 */
declare function updateScrollbar(instance: ScrollbarInstance): void;

/**
 * Initializes click-rail functionality for a scrollbar instance
 * Allows users to click on the scrollbar rail to scroll by one page in that direction
 * 
 * @param instance - The scrollbar instance to initialize
 * 
 * @remarks
 * - Clicking above/left of the thumb scrolls backward
 * - Clicking below/right of the thumb scrolls forward
 * - Clicking the thumb itself does not trigger scrolling
 */
declare function initializeClickRail(instance: ScrollbarInstance): void;

export { ScrollbarInstance, ScrollDirection, updateScrollbar, initializeClickRail };