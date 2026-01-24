/**
 * Icon component module
 * Provides a forwardable React icon component
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGAttributes } from 'react';

/**
 * Base props for the icon component
 * Extends standard SVG attributes for maximum flexibility
 */
export interface IconComponentProps extends SVGAttributes<SVGSVGElement> {
  /**
   * Icon size in pixels or CSS unit
   */
  size?: string | number;
  
  /**
   * Icon color, defaults to currentColor
   */
  color?: string;
  
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Inline style object
   */
  style?: React.CSSProperties;
  
  /**
   * Additional props passed to the underlying component
   */
  [key: string]: unknown;
}

/**
 * Icon component type with ref forwarding support
 * Allows parent components to access the underlying SVG element
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component
 * Created using React.forwardRef for ref forwarding capability
 * 
 * @example
 *