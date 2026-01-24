/**
 * React icon component module
 * Provides a forwarded ref icon component wrapper
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for the icon component
 */
export interface IconBaseProps extends SVGProps<SVGSVGElement> {
  /**
   * Icon size in pixels or string value
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
 * Icon component props combining base props with additional attributes
 */
export type IconComponentProps = IconBaseProps & RefAttributes<SVGSVGElement>;

/**
 * Icon component type with forward ref support
 */
export type IconComponent = ForwardRefExoticComponent<IconComponentProps>;

/**
 * Default exported icon component with forwarded ref
 * Wraps an SVG icon with customizable props and ref forwarding capability
 */
declare const IconComponentWithRef: IconComponent;

export default IconComponentWithRef;