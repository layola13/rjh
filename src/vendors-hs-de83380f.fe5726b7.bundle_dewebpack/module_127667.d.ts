/**
 * React icon component wrapper
 * 
 * This module exports a forwarded ref icon component that wraps a base icon
 * with additional props and functionality.
 */

import React from 'react';

/**
 * Props for the icon component
 * Extends standard React SVG element attributes
 */
export interface IconComponentProps extends React.SVGAttributes<SVGSVGElement> {
  /**
   * Optional className for styling
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
   * Additional style properties
   */
  style?: React.CSSProperties;
  
  /**
   * Accessibility label
   */
  'aria-label'?: string;
  
  /**
   * Whether the icon is decorative only
   */
  'aria-hidden'?: boolean;
}

/**
 * Icon component with forwarded ref support
 * 
 * A React component that renders an SVG icon with proper ref forwarding
 * for integration with parent components that need direct DOM access.
 * 
 * @example
 *