/**
 * React icon component wrapper
 * Wraps an icon component with forwardRef support
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for icon components
 */
export interface IconBaseProps extends SVGProps<SVGSVGElement> {
  /**
   * Icon size in pixels or CSS units
   */
  size?: string | number;
  
  /**
   * Icon color
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
export type IconComponentProps = IconBaseProps & RefAttributes<SVGSVGElement>;

/**
 * Default export: Forward ref icon component
 * 
 * @remarks
 * This component wraps an SVG icon with React.forwardRef to allow
 * ref forwarding to the underlying SVG element.
 * 
 * @example
 *