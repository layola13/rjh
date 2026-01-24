/**
 * BackTop Component Type Definitions
 * A button component that appears after scrolling down and returns to the top when clicked
 */

import { CSSProperties, MouseEvent, ReactNode, RefObject } from 'react';

/**
 * BackTop component props interface
 */
export interface BackTopProps {
  /**
   * Custom CSS class name
   */
  className?: string;

  /**
   * Custom CSS styles
   */
  style?: CSSProperties;

  /**
   * Custom prefix for CSS class names
   * @default 'ant-back-top'
   */
  prefixCls?: string;

  /**
   * Custom content to render inside the back-to-top button
   * If not provided, a default icon will be used
   */
  children?: ReactNode;

  /**
   * The scroll height (in pixels) at which the BackTop button becomes visible
   * @default 400
   */
  visibilityHeight?: number;

  /**
   * Specifies the scrollable area where the component should listen for scroll events
   * Can be a function that returns the target element or window
   * @default () => window
   */
  target?: () => HTMLElement | Window | Document;

  /**
   * Whether the BackTop button is visible
   * Typically controlled internally based on scroll position
   */
  visible?: boolean;

  /**
   * Duration of the scroll animation in milliseconds when returning to top
   * @default 450
   */
  duration?: number;

  /**
   * Click event handler
   * @param event - The mouse click event
   */
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
}

/**
 * BackTop Component
 * 
 * A button to back to top of page, which will appear after scrolling down.
 * 
 * @example
 *