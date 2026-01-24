/**
 * Icon Component Module
 * 
 * This module exports a React icon component with forwardRef support.
 * The component wraps an icon element with customizable properties.
 * 
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Icon component props interface
 * Extends standard HTML SVG element attributes
 */
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  /**
   * Icon size (width and height)
   * @default 24
   */
  size?: number | string;
  
  /**
   * Icon color
   * @default 'currentColor'
   */
  color?: string;
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Inline style object
   */
  style?: React.CSSProperties;
  
  /**
   * Icon-specific data (imported from icon definition)
   * @internal
   */
  icon?: IconDefinition;
}

/**
 * Icon definition structure
 * Contains SVG path data and viewBox configuration
 */
export interface IconDefinition {
  /**
   * SVG viewBox value
   */
  viewBox?: string;
  
  /**
   * SVG path data (string or array of path elements)
   */
  path?: string | string[];
  
  /**
   * Additional SVG attributes
   */
  attrs?: Record<string, unknown>;
}

/**
 * Icon component reference type
 * Points to the underlying SVG element
 */
export type IconRef = SVGSVGElement;

/**
 * Default exported icon component with forwardRef support
 * 
 * @example
 *