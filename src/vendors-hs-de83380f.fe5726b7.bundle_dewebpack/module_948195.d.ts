/**
 * React icon component module
 * Wraps an icon with forwardRef support
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base icon props extending standard SVG element properties
 */
export interface IconBaseProps extends SVGProps<SVGSVGElement> {
  /**
   * Icon size in pixels or CSS unit
   */
  size?: string | number;
  
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
 * Icon component props with ref support
 */
export interface IconComponentProps extends IconBaseProps {
  /**
   * The underlying icon data/definition
   */
  icon: unknown;
}

/**
 * Icon component type with forwardRef
 */
export type IconComponent = ForwardRefExoticComponent<
  IconBaseProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component
 * A React forwardRef component that renders an SVG icon
 */
declare const IconComponentWithRef: IconComponent;

export default IconComponentWithRef;