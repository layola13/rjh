/**
 * Icon component module
 * Provides a forwarded ref icon component wrapper
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Props for the icon component
 * Extends standard SVG element properties
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * Optional class name for styling
   */
  className?: string;
  
  /**
   * Icon size in pixels or as a string
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
 * Icon component type with forwarded ref support
 * Wraps an SVG icon with ref forwarding capabilities
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component
 * A React component that renders an SVG icon with forwarded ref
 * 
 * @example
 *