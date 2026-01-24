/**
 * Icon component module
 * 
 * This module exports a React icon component that wraps a base icon component
 * with forwarded refs support.
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Props for the icon component
 * Extends standard SVG element properties
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * Additional CSS class name(s) to apply to the icon
   */
  className?: string;
  
  /**
   * Icon size (width and height)
   * @default 24
   */
  size?: number | string;
  
  /**
   * Icon color
   * Inherits current text color by default
   */
  color?: string;
  
  /**
   * Additional inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Accessible title for the icon
   */
  title?: string;
  
  /**
   * Whether the icon is decorative (hidden from screen readers)
   * @default false
   */
  'aria-hidden'?: boolean | 'true' | 'false';
}

/**
 * Icon component with ref forwarding support
 * 
 * A React component that renders an SVG icon with customizable properties.
 * Supports ref forwarding to access the underlying SVG element.
 * 
 * @example
 *