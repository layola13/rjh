/**
 * Icon component module
 * Exports a forwarded ref icon component
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base icon component props
 * Extends standard SVG element properties
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * Custom className for styling
   */
  className?: string;
  
  /**
   * Icon size in pixels or CSS units
   */
  size?: string | number;
  
  /**
   * Icon color (supports CSS color values)
   */
  color?: string;
  
  /**
   * Additional inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Accessibility title for screen readers
   */
  title?: string;
  
  /**
   * Click event handler
   */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
}

/**
 * Icon reference type
 * Allows direct access to the underlying SVG element
 */
export type IconRef = SVGSVGElement;

/**
 * Icon component type definition
 * A forwarded ref component that renders an SVG icon
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<IconRef>
>;

/**
 * Default export: Icon component with forwarded ref support
 * 
 * @example
 *