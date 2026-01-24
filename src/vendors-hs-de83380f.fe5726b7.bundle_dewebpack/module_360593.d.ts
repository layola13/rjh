/**
 * Icon Component Module
 * 
 * A React icon component that wraps an icon with additional props support.
 * This module provides a forward-ref enabled icon component for use in React applications.
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * Base properties that can be passed to the icon component.
 * Extends standard HTML attributes and icon-specific configurations.
 */
export interface IconProps {
  /**
   * Optional CSS class name for styling
   */
  className?: string;
  
  /**
   * Size of the icon (width/height in pixels or CSS units)
   */
  size?: number | string;
  
  /**
   * Color of the icon (CSS color value)
   */
  color?: string;
  
  /**
   * Stroke width for outline-style icons
   */
  strokeWidth?: number;
  
  /**
   * Additional style properties
   */
  style?: React.CSSProperties;
  
  /**
   * Click event handler
   */
  onClick?: (event: React.MouseEvent<SVGElement>) => void;
  
  /**
   * Accessible title for screen readers
   */
  title?: string;
  
  /**
   * ARIA label for accessibility
   */
  'aria-label'?: string;
  
  /**
   * Additional HTML/SVG attributes
   */
  [key: string]: unknown;
}

/**
 * Default icon component that renders the base SVG icon.
 * This is typically an SVG-based icon component.
 */
export const icon: React.ComponentType<IconProps>;

/**
 * Forward-ref enabled icon component.
 * 
 * This component wraps the base icon with React.forwardRef support,
 * allowing parent components to access the underlying DOM node.
 * 
 * @example
 *