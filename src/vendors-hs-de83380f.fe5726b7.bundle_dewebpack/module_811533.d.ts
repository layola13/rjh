/**
 * Icon component module
 * A forwardRef-wrapped React component that renders an icon
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for the icon component
 * Extends standard SVG element properties
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * Additional CSS class name for styling
   */
  className?: string;
  
  /**
   * Icon size in pixels or CSS unit
   */
  size?: number | string;
  
  /**
   * Icon color (fill/stroke)
   */
  color?: string;
  
  /**
   * Custom style object
   */
  style?: React.CSSProperties;
  
  /**
   * Accessibility label
   */
  'aria-label'?: string;
  
  /**
   * Icon definition object
   */
  icon?: IconDefinition;
}

/**
 * Icon definition structure
 * Contains SVG path data and metadata
 */
export interface IconDefinition {
  /**
   * Icon name identifier
   */
  name: string;
  
  /**
   * SVG viewBox coordinates
   */
  viewBox?: string;
  
  /**
   * SVG path data
   */
  path: string | string[];
  
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