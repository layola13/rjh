/**
 * Icon component module
 * Provides a forwardRef-wrapped icon component
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
   * Icon size (width and height)
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
}

/**
 * Icon definition structure
 * Contains SVG path data and metadata
 */
export interface IconDefinition {
  /**
   * Icon name/identifier
   */
  name?: string;
  
  /**
   * SVG viewBox attribute
   */
  viewBox?: string;
  
  /**
   * SVG path data
   */
  path?: string | string[];
  
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