/**
 * Icon component module
 * Provides a forward-ref wrapped icon component
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for the icon component
 * Extends standard SVG element properties
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Icon size in pixels or CSS unit
   */
  size?: number | string;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Icon stroke width
   */
  strokeWidth?: number;
  
  /**
   * Additional custom properties
   */
  [key: string]: any;
}

/**
 * Icon component with ref forwarding support
 * 
 * @example
 *