/**
 * React Icon Component Module
 * 
 * A forwarded ref icon component that wraps a base icon component
 * with additional props and icon data.
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for the icon component
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Icon size in pixels or CSS string
   */
  size?: number | string;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Icon data definition
   */
  icon?: IconDefinition;
  
  [key: string]: any;
}

/**
 * Icon definition structure containing SVG path data
 */
export interface IconDefinition {
  /**
   * Icon name identifier
   */
  name?: string;
  
  /**
   * SVG path data
   */
  path?: string | string[];
  
  /**
   * ViewBox dimensions
   */
  viewBox?: string;
  
  /**
   * Default width
   */
  width?: number;
  
  /**
   * Default height
   */
  height?: number;
}

/**
 * Forwarded ref icon component type
 * 
 * A React component that accepts icon props and forwards refs to the underlying SVG element.
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component with forwarded ref support
 * 
 * @example
 *