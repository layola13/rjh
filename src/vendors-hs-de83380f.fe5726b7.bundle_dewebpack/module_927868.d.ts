/**
 * Icon component module
 * Exports a forwarded ref component that wraps an icon element
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for the icon component
 * Extends standard SVG element properties
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * Optional class name for styling
   */
  className?: string;
  
  /**
   * Optional inline style object
   */
  style?: React.CSSProperties;
  
  /**
   * Icon size (width and height)
   * @default 24
   */
  size?: number | string;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Additional data attributes
   */
  [key: `data-${string}`]: unknown;
}

/**
 * Icon component with forwarded ref support
 * 
 * @example
 *