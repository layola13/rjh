/**
 * React icon component module
 * Wraps an icon component with forwardRef for ref forwarding support
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Base props for the icon component
 * Extends standard SVG element props
 */
export interface IconBaseProps extends ComponentPropsWithoutRef<'svg'> {
  /**
   * Icon size in pixels or CSS size value
   */
  size?: number | string;
  
  /**
   * Icon color, accepts any valid CSS color value
   */
  color?: string;
  
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Inline styles
   */
  style?: React.CSSProperties;
}

/**
 * Icon component props
 * Combines base icon props with the specific icon data
 */
export interface IconComponentProps extends IconBaseProps {
  /**
   * Icon SVG path data or configuration
   */
  icon?: unknown;
}

/**
 * Forward ref icon component type
 * Accepts a ref to the underlying SVG element
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component with ref forwarding capability
 * 
 * @example
 *