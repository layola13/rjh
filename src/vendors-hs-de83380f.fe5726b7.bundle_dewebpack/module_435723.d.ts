/**
 * Icon component module
 * Provides a forward ref wrapper around a base icon component
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Base props for the icon component
 * Extends standard SVG element attributes
 */
export interface IconProps extends ComponentPropsWithoutRef<'svg'> {
  /**
   * Icon size in pixels
   * @default 24
   */
  size?: number | string;
  
  /**
   * Icon color
   * @default 'currentColor'
   */
  color?: string;
  
  /**
   * Stroke width for the icon paths
   * @default 2
   */
  strokeWidth?: number | string;
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Inline styles
   */
  style?: React.CSSProperties;
}

/**
 * Icon component with forward ref support
 * Wraps the icon data with the base icon renderer
 */
export type IconComponent = ForwardRefExoticComponent<
  IconProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default export: Icon component with ref forwarding capability
 * 
 * @example
 *