/**
 * Webpack Bundle Index - Type Definitions
 * 
 * This module provides type definitions for the bundled modules.
 */

/**
 * onScroll module - Handles scroll event functionality
 * @module module_onscroll
 */
declare module 'module_onscroll' {
  /**
   * Scroll event handler callback type
   */
  export type ScrollHandler = (event: Event) => void;

  /**
   * Scroll options configuration
   */
  export interface ScrollOptions {
    /** Throttle delay in milliseconds */
    throttle?: number;
    /** Enable passive event listener */
    passive?: boolean;
    /** Target element selector or element */
    target?: string | HTMLElement;
  }

  /**
   * Register a scroll event handler
   * @param handler - The scroll event callback function
   * @param options - Optional configuration for scroll handling
   */
  export function onScroll(handler: ScrollHandler, options?: ScrollOptions): void;
}

/**
 * onClick module - Handles click event functionality
 * @module module_onclick
 */
declare module 'module_onclick' {
  /**
   * Click event handler callback type
   */
  export type ClickHandler = (event: MouseEvent) => void;

  /**
   * Click options configuration
   */
  export interface ClickOptions {
    /** Prevent default behavior */
    preventDefault?: boolean;
    /** Stop event propagation */
    stopPropagation?: boolean;
    /** Target element selector or element */
    target?: string | HTMLElement;
    /** Debounce delay in milliseconds */
    debounce?: number;
  }

  /**
   * Register a click event handler
   * @param handler - The click event callback function
   * @param options - Optional configuration for click handling
   */
  export function onClick(handler: ClickHandler, options?: ClickOptions): void;
}

/**
 * Main bundle exports
 */
declare module 'webpack-bundle' {
  export * from 'module_onscroll';
  export * from 'module_onclick';
}