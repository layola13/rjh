/**
 * Icon component module
 * Exports a forwarded ref React component that wraps an icon
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Base props for the icon component
 * Extends standard SVG element properties
 */
export interface IconComponentProps extends ComponentPropsWithoutRef<'svg'> {
  /**
   * Custom className for styling
   */
  className?: string;
  
  /**
   * Icon size
   */
  size?: number | string;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Additional style properties
   */
  style?: React.CSSProperties;
  
  /**
   * Icon data object containing path definitions
   */
  icon?: IconDefinition;
}

/**
 * Icon definition structure
 */
export interface IconDefinition {
  /**
   * Icon name identifier
   */
  name: string;
  
  /**
   * SVG path data
   */
  path: string | string[];
  
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
 * Icon component with forwarded ref support
 * Allows parent components to access the underlying SVG element
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component
 * A React component that renders an SVG icon with forwarded ref
 */
declare const IconComponentWithRef: IconComponent;

export default IconComponentWithRef;