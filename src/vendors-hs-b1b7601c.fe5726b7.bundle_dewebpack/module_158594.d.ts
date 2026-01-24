/**
 * Scrolling behavior configuration interface
 */
interface ScrollOptions {
  /** Vertical alignment of the element */
  block?: 'start' | 'center' | 'end' | 'nearest';
  /** Horizontal alignment of the element */
  inline?: 'start' | 'center' | 'end' | 'nearest';
  /** Scroll behavior animation */
  behavior?: 'auto' | 'smooth';
}

/**
 * Custom scroll behavior function
 * @param actions - Array of scroll actions to perform
 */
type CustomScrollBehavior = (actions: ScrollAction[]) => void;

/**
 * Extended scroll options with custom behavior
 */
interface ExtendedScrollOptions extends ScrollOptions {
  /** Custom scroll behavior implementation */
  behavior?: ScrollOptions['behavior'] | CustomScrollBehavior;
}

/**
 * Scroll action describing how to scroll a specific element
 */
interface ScrollAction {
  /** The element to scroll */
  el: Element;
  /** Target scroll top position */
  top: number;
  /** Target scroll left position */
  left: number;
}

/**
 * Checks if the element is currently connected to the DOM
 * @param element - The element to check
 * @returns True if element is in the DOM tree
 */
declare function isElementConnected(element: Element): boolean;

/**
 * Checks if a value is a non-empty plain object
 * @param value - The value to check
 * @returns True if value is a non-empty object
 */
declare function isNonEmptyObject(value: unknown): value is Record<string, unknown>;

/**
 * Normalizes scroll options to a standard format
 * @param options - Raw scroll options (boolean or object)
 * @returns Normalized scroll options object
 */
declare function normalizeScrollOptions(
  options: boolean | ScrollOptions
): ScrollOptions;

/**
 * Performs scroll actions on elements
 * @param actions - Array of scroll actions to execute
 * @param behavior - Scroll behavior ('auto' or 'smooth')
 */
declare function executeScrollActions(
  actions: ScrollAction[],
  behavior?: 'auto' | 'smooth'
): void;

/**
 * Computes scroll actions for the given element
 * @param element - The element to scroll into view
 * @param options - Scroll configuration options
 * @returns Array of scroll actions
 */
declare function computeScrollActions(
  element: Element,
  options: ScrollOptions
): ScrollAction[];

/**
 * Scrolls an element into view with optional custom behavior
 * @param element - The element to scroll into view
 * @param options - Scroll options (boolean, ScrollOptions, or ExtendedScrollOptions with custom behavior)
 */
export default function scrollIntoView(
  element: Element,
  options?: boolean | ScrollOptions | ExtendedScrollOptions
): void;