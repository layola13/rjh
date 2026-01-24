/**
 * React component wrapper for an icon component
 * Provides a forwarded ref implementation for the icon
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Props for the icon component
 * Extends standard SVG element properties
 */
export interface IconProps extends ComponentPropsWithoutRef<'svg'> {
  /**
   * Optional CSS class name for styling
   */
  className?: string;
  
  /**
   * Icon size in pixels or as a string value
   */
  size?: number | string;
  
  /**
   * Icon color, accepts any valid CSS color value
   */
  color?: string;
  
  /**
   * Additional style properties
   */
  style?: React.CSSProperties;
}

/**
 * Icon component configuration object
 * Contains the SVG path data and viewBox settings
 */
export interface IconDefinition {
  /**
   * SVG path data string
   */
  path: string;
  
  /**
   * ViewBox attribute for the SVG element
   */
  viewBox?: string;
  
  /**
   * Default width of the icon
   */
  width?: number;
  
  /**
   * Default height of the icon
   */
  height?: number;
}

/**
 * Icon component with forwarded ref support
 * Wraps the base icon definition with React component functionality
 * 
 * @example
 *