/**
 * React icon component wrapper
 * Wraps an icon component with forwarded ref support
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
 * Icon component props with ref support
 */
export type IconComponentProps = IconBaseProps & RefAttributes<SVGSVGElement>;

/**
 * Icon component type definition
 * A React component that renders an SVG icon with forwarded ref
 */
export type IconComponent = ForwardRefExoticComponent<IconComponentProps>;

/**
 * Default export: Icon component with forwarded ref
 * 
 * @example
 *