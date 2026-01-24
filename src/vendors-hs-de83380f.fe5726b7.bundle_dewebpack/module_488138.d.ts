/**
 * React Icon Component Module
 * 
 * This module exports a forwarded ref icon component that wraps a base icon
 * with additional props spreading functionality.
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for icon components
 * Extends standard SVG element properties
 */
export interface IconBaseProps extends SVGProps<SVGSVGElement> {
  /**
   * Icon size in pixels or CSS units
   */
  size?: string | number;
  
  /**
   * Icon color (CSS color value)
   */
  color?: string;
  
  /**
   * Custom class name for styling
   */
  className?: string;
  
  /**
   * Inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Icon data/path definition
   */
  icon?: IconDefinition;
}

/**
 * Icon definition structure containing SVG path data
 */
export interface IconDefinition {
  /**
   * SVG path data or child elements
   */
  path?: string | React.ReactNode;
  
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
 * Icon component type with forwarded ref support
 * 
 * @example
 *