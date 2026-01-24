/**
 * React component module for icon rendering
 * Exports a forwarded ref icon component
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Props interface for the Icon component
 * Extends standard SVG element properties
 */
export interface IconComponentProps extends Omit<SVGProps<SVGSVGElement>, 'ref'> {
  /**
   * Additional CSS class name for styling
   */
  className?: string;
  
  /**
   * Icon size in pixels or CSS unit
   */
  size?: number | string;
  
  /**
   * Icon color, supports CSS color values
   */
  color?: string;
  
  /**
   * Custom style object
   */
  style?: React.CSSProperties;
  
  /**
   * Accessibility label for screen readers
   */
  'aria-label'?: string;
  
  /**
   * Icon rotation angle in degrees
   */
  rotate?: number;
  
  /**
   * Spin animation flag
   */
  spin?: boolean;
}

/**
 * Icon component with forwarded ref support
 * 
 * @example
 *