/**
 * Icon component module
 * Provides a forwarded ref icon component wrapper
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for the icon component
 * Extends standard SVG element properties
 */
export interface IconBaseProps extends SVGProps<SVGSVGElement> {
  /**
   * Custom class name for styling
   */
  className?: string;
  
  /**
   * Icon size in pixels or CSS units
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
 * Props for the icon component with ref support
 */
export type IconComponentProps = IconBaseProps & RefAttributes<SVGSVGElement>;

/**
 * Icon component type definition
 * A forward ref component that renders an SVG icon with customizable properties
 */
export type IconComponent = ForwardRefExoticComponent<IconComponentProps>;

/**
 * Default exported icon component
 * 
 * @example
 *