/**
 * Icon component module
 * Wraps a base icon component with forwarded ref support
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for the icon component
 */
export interface IconBaseProps extends SVGProps<SVGSVGElement> {
  /**
   * Icon size in pixels or CSS unit
   */
  size?: number | string;
  
  /**
   * Icon color (CSS color value)
   */
  color?: string;
  
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Icon definition object
   */
  icon?: IconDefinition;
}

/**
 * Icon definition structure
 */
export interface IconDefinition {
  /**
   * Icon name/identifier
   */
  name: string;
  
  /**
   * SVG path data
   */
  path: string | string[];
  
  /**
   * ViewBox dimensions
   */
  viewBox?: string;
  
  /**
   * Icon width
   */
  width?: number;
  
  /**
   * Icon height
   */
  height?: number;
}

/**
 * Icon component with ref forwarding support
 * 
 * @example
 *