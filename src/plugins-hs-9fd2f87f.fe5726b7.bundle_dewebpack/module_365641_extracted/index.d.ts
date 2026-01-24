/**
 * Mouse Event Handlers Module
 * 
 * This module provides type definitions for mouse enter and leave event handlers.
 * Commonly used for hover interactions and tooltip triggers in web applications.
 */

/**
 * Mouse enter event handler callback type
 * 
 * Triggered when the mouse pointer enters an element's boundaries.
 * This event does not bubble and is not triggered when moving to child elements.
 * 
 * @param event - The mouse event object containing position, target, and related information
 * @returns void or a cleanup function to be called on unmount
 */
export type OnMouseEnterHandler = (event: MouseEvent) => void | (() => void);

/**
 * Mouse leave event handler callback type
 * 
 * Triggered when the mouse pointer leaves an element's boundaries.
 * This event does not bubble and is not triggered when moving to child elements.
 * 
 * @param event - The mouse event object containing position, target, and related information
 * @returns void or a cleanup function to be called on unmount
 */
export type OnMouseLeaveHandler = (event: MouseEvent) => void | (() => void);

/**
 * Configuration options for mouse enter/leave behavior
 */
export interface MouseEventOptions {
  /**
   * Whether to capture the event during the capture phase
   * @default false
   */
  capture?: boolean;
  
  /**
   * Whether the event handler can be triggered multiple times
   * @default false
   */
  once?: boolean;
  
  /**
   * Whether to call preventDefault() on the event
   * @default false
   */
  passive?: boolean;
  
  /**
   * Delay in milliseconds before triggering the handler
   * Useful for debouncing rapid mouse movements
   * @default 0
   */
  delay?: number;
}

/**
 * Attaches a mouse enter event handler to an element
 * 
 * @param element - The target DOM element
 * @param handler - The callback function to execute on mouse enter
 * @param options - Optional configuration for event behavior
 * @returns Cleanup function to remove the event listener
 * 
 * @example
 *