/**
 * Perfect Scrollbar Initialization Module
 * 
 * This module provides the main initialization function for Perfect Scrollbar,
 * a minimalistic but perfect custom scrollbar plugin.
 */

/**
 * Configuration options for Perfect Scrollbar
 */
export interface PerfectScrollbarOptions {
  /**
   * Theme name for the scrollbar styling
   * @default 'default'
   */
  theme?: string;

  /**
   * List of event handlers to enable
   * Available handlers: 'click-rail', 'drag-scrollbar', 'keyboard', 'wheel', 'touch', 'selection'
   */
  handlers?: ReadonlyArray<ScrollbarHandler>;

  /**
   * Additional settings for scrollbar behavior
   */
  settings?: {
    theme: string;
    handlers: ReadonlyArray<ScrollbarHandler>;
    [key: string]: unknown;
  };
}

/**
 * Supported scrollbar event handler types
 */
export type ScrollbarHandler = 
  | 'click-rail'
  | 'drag-scrollbar'
  | 'keyboard'
  | 'wheel'
  | 'touch'
  | 'selection';

/**
 * Internal state management for scrollbar instances
 */
export interface ScrollbarInstance {
  settings: {
    theme: string;
    handlers: ReadonlyArray<ScrollbarHandler>;
  };
  [key: string]: unknown;
}

/**
 * Initializes Perfect Scrollbar on a DOM element
 * 
 * @param element - The container element to apply scrollbar to
 * @param options - Configuration options for the scrollbar behavior and appearance
 * 
 * @remarks
 * This function:
 * - Adds the 'ps' class to the element
 * - Registers the instance with internal state management
 * - Applies the specified theme class
 * - Initializes all configured event handlers
 * - Sets up the scrollbar UI and behavior
 * 
 * @example
 *