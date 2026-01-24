/**
 * React component wrapper for an icon.
 * This module creates a forwarded ref icon component using a base icon implementation.
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Props for the icon component.
 * Extends standard HTML attributes and includes custom icon properties.
 */
export interface IconProps extends ComponentPropsWithoutRef<'svg'> {
  /**
   * Size of the icon in pixels or as a string value
   */
  size?: number | string;
  
  /**
   * Color of the icon
   */
  color?: string;
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Icon data/definition object
   */
  icon?: IconDefinition;
}

/**
 * Icon definition structure containing path data and metadata
 */
export interface IconDefinition {
  /**
   * SVG path data or content
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
  
  /**
   * Additional attributes
   */
  attrs?: Record<string, unknown>;
}

/**
 * Forwarded ref icon component type
 */
type IconComponent = ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;

/**
 * Icon component with forwarded ref support.
 * Renders an SVG icon with customizable properties.
 * 
 * @example
 *