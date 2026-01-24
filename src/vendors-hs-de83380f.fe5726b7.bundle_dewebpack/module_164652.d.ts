/**
 * Module: module_164652
 * Original ID: 164652
 * 
 * Icon component wrapper that forwards refs to an underlying icon component.
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Icon component props interface
 * Extends standard React component props with icon-specific properties
 */
export interface IconProps extends ComponentPropsWithoutRef<'svg'> {
  /**
   * Icon data object containing SVG path and viewBox information
   */
  icon?: IconData;
  
  /**
   * Size of the icon (width and height)
   */
  size?: number | string;
  
  /**
   * Color of the icon
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
 * Icon data structure containing SVG information
 */
export interface IconData {
  /**
   * SVG path data
   */
  path: string | string[];
  
  /**
   * ViewBox attribute for the SVG
   */
  viewBox?: string;
  
  /**
   * Width of the icon
   */
  width?: number;
  
  /**
   * Height of the icon
   */
  height?: number;
}

/**
 * Forward ref icon component type
 * A React component that accepts IconProps and forwards refs to the underlying SVG element
 */
type IconComponent = ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;

/**
 * Default exported icon component with forwarded ref support
 * 
 * @example
 *