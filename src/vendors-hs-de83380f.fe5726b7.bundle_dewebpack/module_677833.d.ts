/**
 * React component module for an icon component
 * Provides a forwarded ref wrapper around a base icon component
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for the icon component
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * Custom class name for styling
   */
  className?: string;
  
  /**
   * Icon size
   */
  size?: number | string;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Additional inline styles
   */
  style?: React.CSSProperties;
}

/**
 * Icon component with forwarded ref support
 * Wraps the base icon implementation with ref forwarding capability
 */
declare const IconComponent: ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

export default IconComponent;