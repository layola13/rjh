/**
 * Icon component module
 * 
 * This module exports a React component that wraps an icon with forwarded ref support.
 * The component extends base icon properties and applies a specific icon implementation.
 */

import { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * Base properties for the icon component
 * Extends standard HTML SVG element attributes
 */
export interface IconComponentProps extends React.SVGProps<SVGSVGElement> {
  /**
   * Custom CSS class name for styling
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
   * Additional style properties
   */
  style?: React.CSSProperties;
  
  /**
   * Accessibility title for screen readers
   */
  title?: string;
  
  /**
   * Click event handler
   */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
}

/**
 * Icon component with forwarded ref support
 * 
 * A React component that renders an SVG icon with customizable properties.
 * Supports ref forwarding to access the underlying SVG element.
 * 
 * @example
 *