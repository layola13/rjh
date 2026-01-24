/**
 * React Icon Component Module
 * Provides a forwarded ref icon component with customizable properties
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGAttributes } from 'react';

/**
 * Base properties for the icon component
 * Extends standard SVG element attributes
 */
export interface IconComponentProps extends SVGAttributes<SVGElement> {
  /**
   * Icon size in pixels or CSS size value
   * @default 16
   */
  size?: number | string;
  
  /**
   * Icon color (CSS color value)
   * @default 'currentColor'
   */
  color?: string;
  
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Inline style object
   */
  style?: React.CSSProperties;
  
  /**
   * Accessibility label for screen readers
   */
  'aria-label'?: string;
  
  /**
   * Icon data definition (SVG path or configuration)
   */
  icon?: IconDefinition;
}

/**
 * Icon definition structure containing SVG path data and metadata
 */
export interface IconDefinition {
  /**
   * SVG viewBox coordinates
   */
  viewBox?: string;
  
  /**
   * SVG path data string(s)
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
  
  /**
   * Additional SVG attributes
   */
  attrs?: Record<string, unknown>;
}

/**
 * Icon component with forwarded ref support
 * 
 * @example
 *