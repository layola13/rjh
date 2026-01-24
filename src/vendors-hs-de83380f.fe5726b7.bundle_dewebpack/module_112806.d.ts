/**
 * Icon component module
 * Wraps an icon with forwarded ref support
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for icon components
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * Custom class name for styling
   */
  className?: string;
  
  /**
   * Icon size (width and height)
   */
  size?: number | string;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Additional style properties
   */
  style?: React.CSSProperties;
}

/**
 * Icon component with ref forwarding
 * 
 * @example
 *