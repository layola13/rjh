/**
 * Icon component module
 * Provides a forwarded ref icon component
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
   * Icon size in pixels or CSS unit
   */
  size?: number | string;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Icon data/path definition
   */
  icon?: IconDefinition;
}

/**
 * Icon definition structure
 * Contains SVG path data and metadata
 */
export interface IconDefinition {
  /**
   * SVG path data or child elements
   */
  path?: string | React.ReactNode;
  
  /**
   * Icon name identifier
   */
  name?: string;
  
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
 * Icon component with forwarded ref support
 * 
 * @example
 *