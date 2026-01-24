/**
 * React Icon Component Type Definitions
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Icon component properties extending standard SVG attributes
 * @interface IconComponentProps
 */
export interface IconComponentProps extends Omit<SVGProps<SVGSVGElement>, 'ref'> {
  /**
   * Icon size (width and height)
   * @default 24
   */
  size?: number | string;
  
  /**
   * Icon color
   * @default "currentColor"
   */
  color?: string;
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * ARIA label for accessibility
   */
  'aria-label'?: string;
}

/**
 * Icon component type with forwarded ref support
 * 
 * This component renders an SVG icon with configurable properties.
 * It uses React.forwardRef to allow parent components to access the underlying SVG element.
 * 
 * @example
 *