/**
 * Icon component module
 * Provides a forwarded ref icon component wrapper
 */

import { ForwardRefExoticComponent, RefAttributes, SVGAttributes } from 'react';

/**
 * Props for the icon component
 * Extends standard SVG attributes
 */
export interface IconComponentProps extends SVGAttributes<SVGSVGElement> {
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Icon size in pixels or as a string value
   */
  size?: number | string;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Icon stroke width
   */
  strokeWidth?: number | string;
  
  /**
   * Additional inline styles
   */
  style?: React.CSSProperties;
}

/**
 * Icon component type with forwarded ref support
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component
 * A React component that renders an SVG icon with forwarded ref support
 */
declare const IconComponentWithRef: IconComponent;

export default IconComponentWithRef;