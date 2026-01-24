/**
 * Module: module_346725
 * Original ID: 346725
 * 
 * Icon component wrapper that forwards refs to the underlying icon implementation.
 * This module creates a React component that wraps a default icon with forwarded ref support.
 */

import type React from 'react';

/**
 * Props for the icon component.
 * Extends standard HTML attributes and custom icon properties.
 */
export interface IconComponentProps extends React.SVGAttributes<SVGElement> {
  /**
   * Custom class name for styling
   */
  className?: string;
  
  /**
   * Icon size in pixels or as a string
   */
  size?: number | string;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Icon style object
   */
  style?: React.CSSProperties;
  
  /**
   * Additional props passed to the icon
   */
  [key: string]: unknown;
}

/**
 * Icon component with ref forwarding support.
 * 
 * @param props - Icon component properties
 * @param ref - Forwarded ref to the underlying SVG element
 * @returns React element representing the icon
 * 
 * @example
 *