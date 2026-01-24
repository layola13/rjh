/**
 * Icon component module
 * Wraps an icon with forwarded ref support
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGAttributes } from 'react';

/**
 * Props for the icon component
 * Extends standard SVG attributes to support all SVG element properties
 */
export interface IconComponentProps extends SVGAttributes<SVGElement> {
  /**
   * Optional CSS class name for styling
   */
  className?: string;
  
  /**
   * Icon size (width and height)
   * @default 24
   */
  size?: number | string;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Additional styles
   */
  style?: React.CSSProperties;
}

/**
 * Forward ref icon component type
 * Allows parent components to access the underlying SVG element via ref
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component with forwarded ref
 * 
 * @example
 *