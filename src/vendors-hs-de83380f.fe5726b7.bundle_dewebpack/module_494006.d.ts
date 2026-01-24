/**
 * React component wrapper for an icon.
 * This module creates a forwarded ref icon component using a base icon implementation.
 * 
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for the icon component.
 * Extends standard SVG element properties.
 */
export interface IconBaseProps extends SVGProps<SVGSVGElement> {
  /**
   * Optional CSS class name for styling
   */
  className?: string;
  
  /**
   * Icon size in pixels or CSS units
   */
  size?: number | string;
  
  /**
   * Icon color, defaults to currentColor
   */
  color?: string;
  
  /**
   * Additional style properties
   */
  style?: React.CSSProperties;
}

/**
 * Props for the icon component with ref support
 */
export interface IconComponentProps extends IconBaseProps {
  /**
   * Icon data/path configuration passed to the base component
   */
  icon?: unknown;
}

/**
 * Forwarded ref type for SVG elements
 */
export type IconRef = SVGSVGElement;

/**
 * Icon component type with forwarded ref support.
 * Allows parent components to access the underlying SVG element.
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<IconRef>
>;

/**
 * Default exported icon component with ref forwarding.
 * Renders an SVG icon using the base icon component with icon data injected.
 * 
 * @example
 *