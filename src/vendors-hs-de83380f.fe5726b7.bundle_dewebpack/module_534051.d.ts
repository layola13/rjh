/**
 * Icon Component Module
 * 
 * A React icon component that wraps a base icon with forwarded ref support.
 * This module provides a reusable icon component with customizable properties.
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base properties for the icon component
 * Extends standard SVG element properties
 */
export interface IconBaseProps extends SVGProps<SVGSVGElement> {
  /**
   * Custom className for styling the icon
   */
  className?: string;
  
  /**
   * Icon size in pixels or CSS unit
   * @default 24
   */
  size?: number | string;
  
  /**
   * Icon color, can be any valid CSS color value
   */
  color?: string;
  
  /**
   * Additional style properties
   */
  style?: React.CSSProperties;
  
  /**
   * ARIA label for accessibility
   */
  'aria-label'?: string;
  
  /**
   * Icon data definition
   */
  icon?: IconDefinition;
}

/**
 * Icon definition structure
 * Contains the SVG path data and metadata
 */
export interface IconDefinition {
  /**
   * Icon name/identifier
   */
  name: string;
  
  /**
   * SVG viewBox attribute
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
 * Props type for the exported icon component
 */
export type IconComponentProps = IconBaseProps & RefAttributes<SVGSVGElement>;

/**
 * Icon component with forwarded ref support
 * 
 * @example
 *