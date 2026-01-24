/**
 * React icon component module
 * Exports a forwarded ref icon component
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Icon component props interface
 * Extends standard SVG element properties
 */
export interface IconProps extends SVGProps<SVGSVGElement> {
  /**
   * Optional icon size
   */
  size?: number | string;
  
  /**
   * Optional icon color
   */
  color?: string;
  
  /**
   * Optional class name for styling
   */
  className?: string;
  
  /**
   * Optional inline style object
   */
  style?: React.CSSProperties;
}

/**
 * Icon component with forwarded ref support
 * Wraps an SVG icon with configurable properties
 * 
 * @example
 *