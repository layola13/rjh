/**
 * React Icon Component Module
 * 
 * This module exports a forwarded ref icon component that wraps a base icon
 * with custom props and ref handling.
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for the icon component
 * Extends standard SVG element properties
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * Optional CSS class name for styling
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
   * Custom style object
   */
  style?: React.CSSProperties;
  
  /**
   * Accessibility title for the icon
   */
  title?: string;
  
  /**
   * Additional data attributes or custom props
   */
  [key: string]: unknown;
}

/**
 * Icon component type with forwarded ref support
 * 
 * This is a forwarded ref component that allows parent components
 * to access the underlying SVG element directly.
 * 
 * @example
 *