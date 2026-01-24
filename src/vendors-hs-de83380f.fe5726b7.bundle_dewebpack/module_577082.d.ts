/**
 * React icon component wrapper
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for icon components
 */
export interface IconBaseProps extends SVGProps<SVGSVGElement> {
  /**
   * Icon size in pixels or as a CSS value
   */
  size?: number | string;
  
  /**
   * Icon color, defaults to currentColor
   */
  color?: string;
  
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Inline styles
   */
  style?: React.CSSProperties;
}

/**
 * Icon definition structure
 */
export interface IconDefinition {
  /**
   * Icon name/identifier
   */
  name: string;
  
  /**
   * SVG path data or icon content
   */
  icon: string | React.ReactNode;
  
  /**
   * ViewBox dimensions
   */
  viewBox?: string;
  
  /**
   * Default width
   */
  width?: number;
  
  /**
   * Default height
   */
  height?: number;
}

/**
 * Forward ref icon component type
 */
export type IconComponent = ForwardRefExoticComponent<
  IconBaseProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default exported icon component
 * 
 * This is a forward ref component that wraps an icon definition
 * and renders it as an SVG element with customizable props.
 * 
 * @example
 *