/**
 * Icon component module
 * Provides a forwarded ref icon component wrapper
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Props for the base icon component
 */
export interface IconComponentProps extends ComponentPropsWithoutRef<'svg'> {
  /**
   * Icon size in pixels or CSS unit
   */
  size?: number | string;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Icon style object
   */
  style?: React.CSSProperties;
}

/**
 * Icon definition object containing SVG path data and metadata
 */
export interface IconDefinition {
  /**
   * Icon name identifier
   */
  name: string;
  
  /**
   * SVG path data or child elements
   */
  icon: React.ReactNode | string;
  
  /**
   * ViewBox dimensions
   */
  viewBox?: string;
  
  /**
   * Default icon dimensions
   */
  width?: number;
  height?: number;
}

/**
 * Combined props type for the forwarded icon component
 */
export type IconProps = IconComponentProps & RefAttributes<SVGSVGElement>;

/**
 * Forwarded ref icon component type
 * Renders an SVG icon with support for ref forwarding
 */
declare const IconComponent: ForwardRefExoticComponent<IconComponentProps & RefAttributes<SVGSVGElement>>;

export default IconComponent;