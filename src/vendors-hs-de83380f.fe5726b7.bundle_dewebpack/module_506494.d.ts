/**
 * Icon component module
 * Provides a forwarded ref icon component wrapper
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Icon component props
 * Extends standard SVG element properties
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Icon size in pixels
   */
  size?: number | string;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Custom style object
   */
  style?: React.CSSProperties;
}

/**
 * Icon definition object containing SVG path data and metadata
 */
export interface IconDefinition {
  /**
   * Icon name identifier
   */
  name: string;
  
  /**
   * SVG path data or element content
   */
  icon: string | React.ReactNode;
  
  /**
   * ViewBox dimensions [x, y, width, height]
   */
  viewBox?: string;
  
  /**
   * Additional attributes for the SVG element
   */
  attrs?: Record<string, unknown>;
}

/**
 * Forwarded ref icon component type
 * Combines component props with ref support for SVGSVGElement
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component with forwarded ref support
 * Wraps an icon definition with React.forwardRef for ref forwarding
 */
declare const IconComponentWithRef: IconComponent;

export default IconComponentWithRef;