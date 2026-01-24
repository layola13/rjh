/**
 * Icon component module
 * Exports a forwarded ref icon component
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for icon components
 * Extends standard SVG element properties
 */
export interface IconBaseProps extends SVGProps<SVGSVGElement> {
  /**
   * Icon size in pixels or as a string value
   */
  size?: number | string;
  
  /**
   * Icon color, defaults to currentColor
   */
  color?: string;
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Custom style object
   */
  style?: React.CSSProperties;
}

/**
 * Props specific to this icon component
 * Combines base icon props with ref attributes
 */
export type IconComponentProps = IconBaseProps & RefAttributes<SVGSVGElement>;

/**
 * Forwarded ref icon component type
 * Wraps an SVG icon with React.forwardRef for ref forwarding
 */
export type IconComponent = ForwardRefExoticComponent<IconComponentProps>;

/**
 * Default export: A forwarded ref icon component
 * Renders an SVG icon with configurable props and ref support
 * 
 * @example
 *