/**
 * Module: module_818223
 * Original ID: 818223
 * 
 * A React icon component that wraps a base icon with forwarded ref support.
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Props for the icon component.
 * Extends standard HTML SVG element props.
 */
export interface IconProps extends ComponentPropsWithoutRef<'svg'> {
  /**
   * Additional CSS class name(s) to apply to the icon
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
   * Accessible title for the icon
   */
  title?: string;
  
  /**
   * Additional inline styles
   */
  style?: React.CSSProperties;
}

/**
 * Base icon definition containing SVG path data and metadata
 */
export interface IconDefinition {
  /**
   * Icon name identifier
   */
  name: string;
  
  /**
   * SVG viewBox attribute
   */
  viewBox?: string;
  
  /**
   * SVG path data or child elements
   */
  path?: string | JSX.Element;
  
  /**
   * Default icon size
   */
  size?: number;
}

/**
 * Icon component with ref forwarding support.
 * Renders an SVG icon using the provided props and icon definition.
 * 
 * @example
 *