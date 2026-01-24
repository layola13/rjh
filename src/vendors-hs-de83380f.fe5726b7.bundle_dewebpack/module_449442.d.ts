/**
 * Icon component module
 * 
 * This module exports a forwarded ref icon component that wraps
 * a base icon component with specific icon data.
 */

import { ForwardRefExoticComponent, RefAttributes, SVGAttributes } from 'react';

/**
 * Props for the icon component
 * Extends standard SVG attributes to allow customization of the icon
 */
export interface IconComponentProps extends SVGAttributes<SVGSVGElement> {
  /**
   * CSS class name for styling
   */
  className?: string;
  
  /**
   * Icon size (width and height)
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
 * Icon component type with forwarded ref support
 * 
 * A React component that renders an SVG icon with customizable properties.
 * Supports ref forwarding to access the underlying SVG element.
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default export: Icon component with forwarded ref
 * 
 * @example
 *