/**
 * React Icon Component Module
 * 
 * This module exports a forwarded ref icon component that wraps a base icon
 * with additional props and functionality.
 */

import { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * Base properties that can be passed to the icon component
 * Extends standard SVG element attributes
 */
export interface IconProps extends ComponentPropsWithoutRef<'svg'> {
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
   * Stroke width for the icon
   * @default 2
   */
  strokeWidth?: number | string;
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Inline style object
   */
  style?: React.CSSProperties;
}

/**
 * Icon component with forwarded ref support
 * 
 * A React component that renders an SVG icon with customizable properties.
 * Supports ref forwarding to access the underlying SVG element.
 * 
 * @example
 *