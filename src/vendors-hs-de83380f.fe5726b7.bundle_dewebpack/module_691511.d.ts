/**
 * Icon component module
 * Provides a forwardRef-wrapped icon component with customizable props
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for the icon component
 * Extends standard SVG element properties
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * Custom class name for styling
   */
  className?: string;
  
  /**
   * Icon size in pixels or CSS size value
   */
  size?: number | string;
  
  /**
   * Icon color, accepts any valid CSS color value
   */
  color?: string;
  
  /**
   * Additional style properties
   */
  style?: React.CSSProperties;
  
  /**
   * Icon data configuration
   */
  icon?: IconData;
}

/**
 * Icon data structure containing SVG path information
 */
export interface IconData {
  /**
   * SVG path data or icon identifier
   */
  path?: string | string[];
  
  /**
   * ViewBox dimensions for the SVG
   */
  viewBox?: string;
  
  /**
   * Icon metadata
   */
  metadata?: Record<string, unknown>;
}

/**
 * Icon component with ref forwarding support
 * Renders an SVG icon with customizable properties
 * 
 * @example
 *