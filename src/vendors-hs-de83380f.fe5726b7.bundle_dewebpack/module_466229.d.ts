/**
 * Icon component module
 * Provides a forwardRef-wrapped icon component with merged props
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for the icon component
 * Extends standard SVG element properties
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * Additional CSS class name(s)
   */
  className?: string;
  
  /**
   * Icon size (width and height)
   * @default 24
   */
  size?: number | string;
  
  /**
   * Icon color
   * Inherits from current text color by default
   */
  color?: string;
  
  /**
   * Accessible title for the icon
   */
  title?: string;
  
  /**
   * Additional inline styles
   */
  style?: React.CSSProperties;
}

/**
 * Icon component with ref forwarding support
 * Wraps the base icon with additional functionality
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component
 * A forward ref component that renders an SVG icon
 * 
 * @example
 *