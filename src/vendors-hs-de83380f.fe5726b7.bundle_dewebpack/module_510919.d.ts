/**
 * Module: module_510919
 * React Icon Component - Forward Ref Wrapper
 * 
 * This module exports a React component that wraps an icon component
 * with forwarded ref support for better composability.
 */

import { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for the icon component
 * Extends standard SVG element properties
 */
export interface IconComponentProps extends Omit<SVGProps<SVGSVGElement>, 'ref'> {
  /**
   * Custom CSS class name for styling
   */
  className?: string;
  
  /**
   * Icon size (width and height in pixels)
   * @default 24
   */
  size?: number | string;
  
  /**
   * Icon color
   * @default 'currentColor'
   */
  color?: string;
  
  /**
   * Additional custom properties passed to the icon wrapper
   */
  [key: string]: unknown;
}

/**
 * Icon component with forwarded ref
 * 
 * A React component that renders an SVG icon with support for ref forwarding,
 * allowing parent components to access the underlying DOM element.
 * 
 * @example
 *