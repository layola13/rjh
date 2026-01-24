/**
 * Icon component module with forward ref support
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Props for the icon component
 * Extends standard SVG element props
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Icon size (width and height)
   */
  size?: number | string;
  
  /**
   * Icon color (fill or stroke)
   */
  color?: string;
  
  /**
   * Custom style object
   */
  style?: React.CSSProperties;
  
  /**
   * Icon title for accessibility
   */
  title?: string;
  
  /**
   * Any additional props to pass to the underlying icon component
   */
  [key: string]: any;
}

/**
 * Icon component with forward ref support
 * Allows ref forwarding to the underlying SVG element
 * 
 * @example
 *