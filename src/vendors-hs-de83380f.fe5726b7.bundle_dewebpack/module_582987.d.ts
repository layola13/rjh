/**
 * React Icon Component Module
 * 
 * This module exports a forwarded ref React component that wraps an icon.
 * The component merges props with a default icon and supports ref forwarding.
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for the icon component
 * Extends standard SVG element properties
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * Custom className for styling
   */
  className?: string;
  
  /**
   * Icon size (width and height)
   */
  size?: number | string;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Additional style overrides
   */
  style?: React.CSSProperties;
}

/**
 * Icon component with forwarded ref support
 * 
 * This component renders an SVG icon element with customizable props.
 * Supports ref forwarding to access the underlying SVG element.
 * 
 * @example
 *