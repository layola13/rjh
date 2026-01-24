/**
 * React icon component wrapper
 * Wraps an icon definition with React forwardRef support
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for icon components
 */
export interface IconBaseProps extends SVGProps<SVGSVGElement> {
  /**
   * Icon size (width and height)
   */
  size?: string | number;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Custom class name
   */
  className?: string;
  
  /**
   * Custom style object
   */
  style?: React.CSSProperties;
}

/**
 * Icon component type with forwardRef support
 */
export type IconComponent = ForwardRefExoticComponent<
  IconBaseProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default export: A React forwardRef icon component
 * 
 * This component wraps an icon definition (likely from module 941715)
 * with a generic icon wrapper component (from module 445959),
 * forwarding refs to the underlying SVG element.
 * 
 * @example
 *