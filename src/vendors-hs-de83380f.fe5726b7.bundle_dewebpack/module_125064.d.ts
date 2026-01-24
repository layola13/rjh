/**
 * React Icon Component Module
 * 
 * This module exports a forwarded ref icon component that wraps a base icon
 * with extended properties.
 */

import { ForwardRefExoticComponent, RefAttributes, SVGAttributes } from 'react';

/**
 * Base properties for the icon component.
 * Extends standard SVG attributes for flexible customization.
 */
export interface IconBaseProps extends SVGAttributes<SVGElement> {
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
  
  /**
   * Icon title for accessibility
   */
  title?: string;
}

/**
 * Props accepted by the icon component.
 * Combines base icon properties with ref forwarding support.
 */
export type IconProps = IconBaseProps & RefAttributes<SVGSVGElement>;

/**
 * Forward ref icon component.
 * 
 * This component renders an SVG icon with support for:
 * - Ref forwarding to the underlying SVG element
 * - Customizable size, color, and styling
 * - Accessibility features
 * 
 * @example
 *