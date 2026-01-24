/**
 * React Icon Component Module
 * 
 * This module exports a forwarded ref icon component that wraps a base icon
 * with additional props merging functionality.
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Base props for the icon component
 * Extends standard SVG element properties
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * Additional CSS class name(s) to apply to the icon
   */
  className?: string;
  
  /**
   * Icon size (width and height)
   */
  size?: number | string;
  
  /**
   * Icon color/fill
   */
  color?: string;
  
  /**
   * Additional style properties
   */
  style?: React.CSSProperties;
  
  /**
   * Accessibility label for the icon
   */
  'aria-label'?: string;
  
  /**
   * Icon title for tooltips and accessibility
   */
  title?: string;
}

/**
 * Icon component with forwarded ref support
 * 
 * This is a React component that renders an SVG icon with customizable props.
 * It supports ref forwarding to allow parent components to access the underlying
 * SVG element.
 * 
 * @example
 *