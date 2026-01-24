/**
 * Keyboard event handler module for perfect-scrollbar
 * Handles arrow keys, page up/down, home/end navigation with scroll boundaries
 */

import type { PerfectScrollbarInstance } from './instance';

/**
 * Checks if scroll should be prevented based on boundaries
 * @param element - The scrollable element
 * @param instance - PerfectScrollbar instance
 * @param deltaX - Horizontal scroll delta
 * @param deltaY - Vertical scroll delta
 * @returns True if scroll should proceed, false if at boundary
 */
type ShouldPreventDefault = (
  element: HTMLElement,
  instance: PerfectScrollbarInstance,
  deltaX: number,
  deltaY: number
) => boolean;

/**
 * PerfectScrollbar instance interface
 */
interface PerfectScrollbarInstance {
  /** The scrollable container element */
  readonly element: HTMLElement;
  
  /** The owner document */
  readonly ownerDocument: Document;
  
  /** The horizontal scrollbar element */
  readonly scrollbarX: HTMLElement;
  
  /** The vertical scrollbar element */
  readonly scrollbarY: HTMLElement;
  
  /** Whether vertical scrollbar is active */
  readonly scrollbarYActive: boolean;
  
  /** Whether horizontal scrollbar is active */
  readonly scrollbarXActive: boolean;
  
  /** Total content width */
  readonly contentWidth: number;
  
  /** Total content height */
  readonly contentHeight: number;
  
  /** Visible container width */
  readonly containerWidth: number;
  
  /** Visible container height */
  readonly containerHeight: number;
  
  /** Event binding utilities */
  readonly event: {
    bind(element: HTMLElement | Document, eventName: string, handler: EventListener): void;
  };
  
  /** Configuration settings */
  readonly settings: {
    /** Whether to propagate wheel events to parent */
    wheelPropagation: boolean;
  };
}

/**
 * DOM utility functions
 */
interface DOMUtils {
  /**
   * Check if element matches selector
   */
  matches(element: HTMLElement, selector: string): boolean;
}

/**
 * Element utility functions
 */
interface ElementUtils {
  /**
   * Check if element is editable (input, textarea, contenteditable)
   */
  isEditable(element: HTMLElement): boolean;
}

/**
 * Scroll animation function
 */
type UpdateScroll = (
  element: HTMLElement,
  axis: 'top' | 'left',
  value: number
) => void;

/**
 * Update scrollbar state
 */
type UpdateGeometry = (element: HTMLElement) => void;

/**
 * Get PerfectScrollbar instance from element
 */
type GetInstance = (element: HTMLElement) => PerfectScrollbarInstance;

/**
 * Keyboard navigation constants
 */
const enum KeyCode {
  ARROW_LEFT = 37,
  ARROW_UP = 38,
  ARROW_RIGHT = 39,
  ARROW_DOWN = 40,
  PAGE_UP = 33,
  PAGE_DOWN = 34,
  SPACE = 32,
  END = 35,
  HOME = 36,
}

/**
 * Default scroll distances
 */
const enum ScrollDistance {
  /** Default arrow key scroll amount */
  ARROW = 30,
  /** Page up/down and space key scroll amount */
  PAGE = 90,
}

/**
 * Binds keyboard navigation handlers to a scrollable element
 * @param element - The scrollable element
 * @param instance - PerfectScrollbar instance
 */
declare function bindKeyboardHandler(
  element: HTMLElement,
  instance: PerfectScrollbarInstance
): void;

/**
 * Initializes keyboard navigation for a PerfectScrollbar element
 * @param element - The scrollable element with PerfectScrollbar attached
 */
export default function initializeKeyboardHandler(element: HTMLElement): void;