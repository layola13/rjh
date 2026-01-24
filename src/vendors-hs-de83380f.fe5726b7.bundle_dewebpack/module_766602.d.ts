/**
 * Icon component module
 * Wraps an icon with forwardRef support
 */

import { ForwardRefExoticComponent, RefAttributes, SVGAttributes } from 'react';

/**
 * Base props for icon components
 */
export interface IconBaseProps extends SVGAttributes<SVGElement> {
  /**
   * Custom class name for styling
   */
  className?: string;
  
  /**
   * Icon size in pixels or CSS unit
   */
  size?: string | number;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Icon title for accessibility
   */
  title?: string;
  
  /**
   * Additional inline styles
   */
  style?: React.CSSProperties;
}

/**
 * Icon component props with ref support
 */
export type IconComponentProps = IconBaseProps & RefAttributes<SVGSVGElement>;

/**
 * Forward ref icon component
 * 
 * @remarks
 * This component wraps an SVG icon with React.forwardRef to allow
 * parent components to access the underlying SVG element reference.
 * 
 * @example
 *