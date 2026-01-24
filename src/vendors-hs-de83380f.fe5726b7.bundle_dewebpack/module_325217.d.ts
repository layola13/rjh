/**
 * React Icon Component Module
 * 
 * This module exports a forwarded ref icon component that wraps a base icon
 * with additional props and configuration.
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for the icon component, extending standard SVG element properties
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * Additional CSS class name(s) to apply to the icon
   */
  className?: string;
  
  /**
   * Icon size (width and height in pixels or CSS units)
   */
  size?: number | string;
  
  /**
   * Icon color (CSS color value)
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
   * Additional props to be spread onto the component
   */
  [key: string]: unknown;
}

/**
 * Icon component with forwarded ref support
 * 
 * This is a React component that renders an SVG icon with configurable
 * properties and supports ref forwarding to access the underlying DOM element.
 * 
 * @example
 *