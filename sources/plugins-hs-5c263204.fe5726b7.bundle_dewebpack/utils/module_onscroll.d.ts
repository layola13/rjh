/**
 * Enum representing scroll direction states
 */
declare enum ScrollDirection {
  /** No scrolling available */
  None = 'None',
  /** Can scroll right */
  Right = 'Right',
  /** Can scroll left */
  Left = 'Left',
  /** Can scroll both directions */
  Both = 'Both'
}

/**
 * Ref object containing current element reference
 */
declare interface ScrollRef {
  /** Current DOM element being monitored */
  current: HTMLElement;
}

/**
 * Module: module_onScroll
 * Original ID: onScroll
 * 
 * Detects the scroll position of an element and determines available scroll directions.
 * 
 * @remarks
 * This function analyzes the scroll state by comparing:
 * - scrollWidth vs clientWidth (horizontal overflow)
 * - scrollLeft position (current scroll offset)
 * 
 * @returns void - Updates scroll direction state via callback
 */
declare function onScroll(): void;

/**
 * Callback function to update scroll direction state
 * 
 * @param direction - The detected scroll direction
 */
declare function setScrollDirection(direction: ScrollDirection): void;

/**
 * Global scroll reference object
 */
declare const scrollElementRef: ScrollRef;

export { onScroll, setScrollDirection, ScrollDirection, ScrollRef, scrollElementRef };