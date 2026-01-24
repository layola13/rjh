/**
 * Icon component module
 * Provides a forwarded ref icon component wrapper
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for the icon component
 * Extends standard SVG element properties
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Icon size in pixels or as a string
   */
  size?: number | string;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Icon style object
   */
  style?: React.CSSProperties;
  
  /**
   * Icon data object containing path definitions
   */
  icon?: IconDefinition;
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
   * Icon width
   */
  width?: number;
  
  /**
   * Icon height
   */
  height?: number;
}

/**
 * Icon component with forwarded ref support
 * Wraps an icon definition and renders it as an SVG element
 * 
 * @example
 *