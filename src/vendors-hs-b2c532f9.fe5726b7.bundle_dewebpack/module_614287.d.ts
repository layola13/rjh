/**
 * Updates the scrollbar dimensions and positions for a custom scrollbar implementation.
 * This function recalculates rail margins, handles negative scroll adjustments,
 * and updates the visual state of both horizontal and vertical scrollbars.
 * 
 * @param element - The DOM element with custom scrollbars to update
 */
declare function updateScrollbarLayout(element: HTMLElement): void;

export = updateScrollbarLayout;

/**
 * Internal state interface for scrollbar instance data
 */
interface ScrollbarInstance {
  /** Adjustment value for browsers with negative scroll behavior */
  negativeScrollAdjustment: number;
  
  /** Flag indicating if the browser uses negative scroll values */
  isNegativeScroll: boolean;
  
  /** The horizontal scrollbar rail element */
  scrollbarXRail: HTMLElement;
  
  /** The vertical scrollbar rail element */
  scrollbarYRail: HTMLElement;
  
  /** Combined left and right margin width of the horizontal rail */
  railXMarginWidth: number;
  
  /** Combined top and bottom margin height of the vertical rail */
  railYMarginHeight: number;
}

/**
 * Utility module for number conversion operations
 */
declare module "833588" {
  export function toInt(value: string | number): number;
}

/**
 * CSS manipulation utility module
 */
declare module "194586" {
  export function css(element: HTMLElement, property: string, value?: string): string | void;
}

/**
 * Instance data storage module
 */
declare module "436476" {
  export function get(element: HTMLElement): ScrollbarInstance | null | undefined;
}

/**
 * Scrollbar update handler module (likely handles internal DOM updates)
 */
declare module "391564" {
  function updateScrollbarInternal(element: HTMLElement): void;
  export = updateScrollbarInternal;
}

/**
 * Scroll position synchronization module
 */
declare module "289929" {
  function syncScrollPosition(
    element: HTMLElement,
    axis: "top" | "left",
    scrollValue: number
  ): void;
  export = syncScrollPosition;
}