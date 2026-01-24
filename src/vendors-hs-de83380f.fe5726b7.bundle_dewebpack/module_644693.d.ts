/**
 * Icon component module with forwardRef support
 * @module module_644693
 * @originalId 644693
 */

import { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base icon component properties
 */
export interface IconBaseProps extends Omit<SVGProps<SVGSVGElement>, 'ref'> {
  /**
   * Icon size (width and height)
   * @default 24
   */
  size?: number | string;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Icon title for accessibility
   */
  title?: string;
  
  /**
   * Additional CSS class names
   */
  className?: string;
}

/**
 * Icon component reference type
 */
export type IconRef = SVGSVGElement;

/**
 * Icon component properties with ref support
 */
export interface IconComponentProps extends IconBaseProps, RefAttributes<IconRef> {}

/**
 * Forwardable icon component
 * 
 * A React component that renders an SVG icon with support for ref forwarding.
 * Wraps an icon definition with default styling and accessibility features.
 * 
 * @example
 *