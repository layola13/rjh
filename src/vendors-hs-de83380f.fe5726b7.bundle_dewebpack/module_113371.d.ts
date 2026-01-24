/**
 * React icon component module
 * Provides a forwarded ref icon component wrapper
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Props for the icon component
 * Extends standard SVG element properties
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * Custom CSS class name
   */
  className?: string;
  
  /**
   * Icon size in pixels or CSS units
   */
  size?: string | number;
  
  /**
   * Icon color, accepts any valid CSS color value
   */
  color?: string;
  
  /**
   * Accessibility title for screen readers
   */
  title?: string;
  
  /**
   * Additional inline styles
   */
  style?: React.CSSProperties;
}

/**
 * Icon component type with forwarded ref support
 * Allows parent components to access the underlying SVG element
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component
 * A React component that renders an SVG icon with forwarded ref
 * 
 * @example
 *