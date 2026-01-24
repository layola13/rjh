/**
 * React icon component module
 * Wraps an icon with forwardRef support
 */

import { ForwardRefExoticComponent, RefAttributes, SVGAttributes } from 'react';

/**
 * Base props for icon components
 */
export interface IconBaseProps extends SVGAttributes<SVGElement> {
  /**
   * Icon size in pixels or CSS size value
   */
  size?: number | string;
  
  /**
   * Icon color (CSS color value)
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
}

/**
 * Icon component props combining base props with standard SVG attributes
 */
export type IconProps = IconBaseProps & RefAttributes<SVGSVGElement>;

/**
 * Forwarded ref icon component type
 */
export type IconComponent = ForwardRefExoticComponent<IconProps>;

/**
 * Default exported icon component with forwarded ref support
 * 
 * @remarks
 * This component wraps an SVG icon definition and forwards refs to the underlying SVG element.
 * It merges user-provided props with the icon's default configuration.
 * 
 * @example
 *