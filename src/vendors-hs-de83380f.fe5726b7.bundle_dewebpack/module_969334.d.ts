/**
 * Icon component module
 * Provides a forwardable React component that wraps an icon with customizable properties
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGAttributes } from 'react';

/**
 * Base properties for icon components
 * Extends standard SVG element attributes
 */
export interface IconComponentProps extends SVGAttributes<SVGElement> {
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
   * Inline styles to apply to the icon
   */
  style?: React.CSSProperties;

  /**
   * Accessibility label for screen readers
   */
  'aria-label'?: string;

  /**
   * Icon rotation angle in degrees
   */
  rotate?: number;

  /**
   * Whether to flip the icon horizontally
   */
  flip?: boolean;

  /**
   * Custom icon data or configuration
   */
  icon?: unknown;
}

/**
 * Forwardable icon component type
 * Allows ref forwarding to the underlying SVG element
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component
 * A React component that renders an icon with support for ref forwarding
 * 
 * @example
 *