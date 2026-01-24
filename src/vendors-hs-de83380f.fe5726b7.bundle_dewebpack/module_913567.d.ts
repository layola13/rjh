/**
 * Icon Component Module
 * 
 * A React component that wraps an icon with forwarded ref support.
 * This module exports a forwardRef-wrapped component that combines
 * props from the parent with a specific icon.
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * Base props that can be passed to the icon component
 */
export interface IconComponentProps {
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Size of the icon (width/height in pixels or CSS string)
   */
  size?: number | string;
  
  /**
   * Color of the icon
   */
  color?: string;
  
  /**
   * Accessibility label
   */
  'aria-label'?: string;
  
  /**
   * Custom attributes
   */
  [key: string]: unknown;
}

/**
 * Icon component ref type - typically SVGSVGElement for icon components
 */
export type IconRef = SVGSVGElement;

/**
 * Complete component type with ref forwarding
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<IconRef>
>;

/**
 * Default export: A forwardRef-wrapped React icon component
 * 
 * @example
 *