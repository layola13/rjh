/**
 * Icon Component Module
 * 
 * A React icon component that wraps a base icon component with forwarded ref support.
 * This module provides type-safe icon rendering with customizable properties.
 * 
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Base properties for the icon component
 * Extends standard SVG element properties for maximum flexibility
 */
export interface IconProps extends ComponentPropsWithoutRef<'svg'> {
  /**
   * Icon size in pixels
   * @default 24
   */
  size?: number | string;
  
  /**
   * Icon color
   * Can be any valid CSS color value
   */
  color?: string;
  
  /**
   * Stroke width for outlined icons
   */
  strokeWidth?: number | string;
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Icon data definition
   * @internal
   */
  icon?: IconDefinition;
}

/**
 * Icon definition structure
 * Contains the actual icon path data and metadata
 * 
 * @internal
 */
export interface IconDefinition {
  /**
   * SVG path data or element structure
   */
  path: string | React.ReactElement;
  
  /**
   * ViewBox dimensions for the SVG
   */
  viewBox?: string;
  
  /**
   * Icon width (for non-square icons)
   */
  width?: number;
  
  /**
   * Icon height (for non-square icons)
   */
  height?: number;
}

/**
 * Forward ref component type for the icon
 * Allows parent components to access the underlying SVG element
 */
export type IconComponent = ForwardRefExoticComponent<
  IconProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component
 * 
 * A forward-ref enabled React component that renders an SVG icon.
 * Supports all standard SVG attributes plus custom icon properties.
 * 
 * @example
 *