/**
 * Keyboard handler module for scrollable elements
 * Handles arrow keys, page up/down, home/end, and space bar for scrolling
 */

/**
 * Keyboard navigation configuration interface
 */
interface KeyboardHandlerConfig {
  /** The scrollable DOM element */
  element: HTMLElement;
  
  /** Event binding utility */
  event: EventBindingUtility;
  
  /** Owner document reference */
  ownerDocument: Document;
  
  /** Horizontal scrollbar element */
  scrollbarX: HTMLElement;
  
  /** Vertical scrollbar element */
  scrollbarY: HTMLElement;
  
  /** Total content width */
  contentWidth: number;
  
  /** Total content height */
  contentHeight: number;
  
  /** Visible container width */
  containerWidth: number;
  
  /** Visible container height */
  containerHeight: number;
  
  /** Whether horizontal scrollbar is active */
  scrollbarXActive: boolean;
  
  /** Whether vertical scrollbar is active */
  scrollbarYActive: boolean;
  
  /** Module settings */
  settings: KeyboardSettings;
}

/**
 * Keyboard module settings
 */
interface KeyboardSettings {
  /** If true, suppress horizontal scrolling via keyboard */
  suppressScrollX: boolean;
  
  /** If true, suppress vertical scrolling via keyboard */
  suppressScrollY: boolean;
  
  /** If true, prevent scroll propagation to parent elements when boundaries reached */
  wheelPropagation: boolean;
}

/**
 * Event binding utility interface
 */
interface EventBindingUtility {
  /**
   * Bind an event listener to a target
   * @param target - The event target
   * @param eventName - The event name
   * @param handler - The event handler function
   */
  bind(target: Document | HTMLElement, eventName: string, handler: (event: KeyboardEvent) => void): void;
}

/**
 * Extended keyboard event with prevention checks
 */
interface ExtendedKeyboardEvent extends KeyboardEvent {
  /** Legacy prevention check method */
  isDefaultPrevented?(): boolean;
}

/**
 * Initialize keyboard navigation handler for a scrollable element
 * 
 * Supported keys:
 * - Arrow Left/Right: Scroll horizontally (30px, or container width with Alt, or full content with Meta)
 * - Arrow Up/Down: Scroll vertically (30px, or container height with Alt, or full content with Meta)
 * - Space: Scroll one page down (up with Shift)
 * - Page Up/Down: Scroll one page
 * - Home/End: Scroll to top/bottom
 * 
 * @param config - Keyboard handler configuration
 */
declare function initializeKeyboardHandler(config: KeyboardHandlerConfig): void;

export { KeyboardHandlerConfig, KeyboardSettings, EventBindingUtility, ExtendedKeyboardEvent, initializeKeyboardHandler };