/**
 * Icon Component Module
 * 
 * A React icon component that wraps an icon element with forwarded ref support.
 * This module exports a default icon component that can be used throughout the application.
 * 
 * @module IconComponent
 */

import * as React from 'react';

/**
 * Props for the icon component
 * Extends standard React component props with additional icon-specific properties
 */
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  /**
   * Custom class name for styling
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
}

/**
 * Icon Component with forwarded ref
 * 
 * A functional React component that renders an icon element.
 * Supports ref forwarding to access the underlying SVG element.
 * 
 * @example
 *