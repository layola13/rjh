/**
 * Icon component module
 * Provides a React icon component with ref forwarding support
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGAttributes } from 'react';

/**
 * Props for the icon component
 * Extends standard SVG attributes to support all HTML SVG element properties
 */
export interface IconComponentProps extends SVGAttributes<SVGSVGElement> {
  /**
   * Optional CSS class name for styling
   */
  className?: string;
  
  /**
   * Icon size (width and height)
   * @default 24
   */
  size?: number | string;
  
  /**
   * Icon color
   * @default 'currentColor'
   */
  color?: string;
  
  /**
   * Custom style object
   */
  style?: React.CSSProperties;
  
  /**
   * Accessible label for screen readers
   */
  'aria-label'?: string;
}

/**
 * Icon component with forwarded ref support
 * 
 * @example
 *