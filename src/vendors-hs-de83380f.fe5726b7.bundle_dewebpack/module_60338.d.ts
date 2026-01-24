/**
 * Module: module_60338
 * Original ID: 60338
 * 
 * Icon component module that wraps a forward ref icon component
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for the icon component
 */
export interface IconProps extends SVGProps<SVGSVGElement> {
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Icon size in pixels or CSS units
   */
  size?: number | string;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Accessibility label
   */
  'aria-label'?: string;
  
  /**
   * Additional inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Any other SVG attributes
   */
  [key: string]: unknown;
}

/**
 * Icon component reference type
 */
export type IconRef = SVGSVGElement;

/**
 * Forward ref icon component that renders an SVG icon
 * 
 * @example
 *