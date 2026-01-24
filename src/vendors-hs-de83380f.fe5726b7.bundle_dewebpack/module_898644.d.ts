/**
 * React icon component wrapper
 * Wraps a base icon component with forwarded ref support
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for the icon component
 * Extends standard SVG element properties
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * Additional CSS class name(s)
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
   * Aria label for accessibility
   */
  'aria-label'?: string;
}

/**
 * Icon definition type
 * Contains the SVG path data and metadata for the icon
 */
export interface IconDefinition {
  /**
   * Icon name identifier
   */
  name: string;
  
  /**
   * SVG viewBox dimensions
   */
  viewBox?: string;
  
  /**
   * SVG path data or child elements
   */
  path: string | React.ReactNode;
  
  /**
   * Default icon attributes
   */
  attrs?: Record<string, unknown>;
}

/**
 * Forward ref icon component type
 * Combines icon props with ref forwarding capability
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component
 * A forward-ref enabled React component that renders an SVG icon
 * 
 * @example
 *