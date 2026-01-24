/**
 * React icon component module
 * Provides a forwarded ref icon component wrapper
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for icon components
 */
export interface IconBaseProps extends SVGProps<SVGSVGElement> {
  /**
   * Icon size (width and height)
   * @default 16
   */
  size?: number | string;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Icon style object
   */
  style?: React.CSSProperties;
}

/**
 * Icon component with forwarded ref support
 * Wraps an SVG icon with configurable props and ref forwarding
 */
export type IconComponent = ForwardRefExoticComponent<
  IconBaseProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component
 * A React component that renders an SVG icon with forwarded ref support
 */
declare const IconComponentWithRef: IconComponent;

export default IconComponentWithRef;