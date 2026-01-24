/**
 * Scroll alignment options for block direction (vertical)
 */
type ScrollLogicalPosition = 'start' | 'center' | 'end' | 'nearest';

/**
 * Scroll behavior mode
 */
type ScrollMode = 'if-needed' | 'always';

/**
 * Options for scrolling an element into view
 */
interface ScrollIntoViewOptions {
  /**
   * Scroll behavior mode - determines when scrolling should occur
   * @default 'always'
   */
  scrollMode?: ScrollMode;

  /**
   * Vertical alignment of the element within the viewport
   * @default 'center'
   */
  block?: ScrollLogicalPosition;

  /**
   * Horizontal alignment of the element within the viewport
   * @default 'nearest'
   */
  inline?: ScrollLogicalPosition;

  /**
   * Boundary element or predicate function to stop scrolling at
   * If a function is provided, scrolling stops when it returns false
   */
  boundary?: Element | ((element: Element) => boolean);

  /**
   * Whether to skip elements with overflow:hidden when finding scrollable ancestors
   * @default false
   */
  skipOverflowHiddenElements?: boolean;
}

/**
 * Represents a scroll action to be performed on an element
 */
interface ScrollAction {
  /**
   * The element to scroll
   */
  el: Element;

  /**
   * Vertical scroll position in pixels
   */
  top: number;

  /**
   * Horizontal scroll position in pixels
   */
  left: number;
}

/**
 * Computes the scroll actions needed to bring a target element into view
 * 
 * @param target - The DOM element to scroll into view
 * @param options - Configuration options for scrolling behavior
 * @returns Array of scroll actions to perform, ordered from innermost to outermost scrollable ancestor
 * @throws {TypeError} If target is not a valid DOM element
 */
declare function computeScrollIntoView(
  target: Element,
  options: ScrollIntoViewOptions
): ScrollAction[];

export = computeScrollIntoView;