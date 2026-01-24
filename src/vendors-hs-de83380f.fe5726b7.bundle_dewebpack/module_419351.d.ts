/**
 * Icon Component Module
 * 
 * This module exports a forwarded React icon component that wraps a base icon
 * with additional properties and ref forwarding support.
 * 
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base icon properties interface
 * Extends standard SVG element properties
 */
interface IconProps extends SVGProps<SVGSVGElement> {
  /**
   * Optional custom className for styling
   */
  className?: string;
  
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
   * Additional custom properties
   */
  [key: string]: unknown;
}

/**
 * Icon component with ref forwarding
 * 
 * A React component that renders an SVG icon with forwarded ref support.
 * The component merges external props with internal icon data.
 * 
 * @example
 *