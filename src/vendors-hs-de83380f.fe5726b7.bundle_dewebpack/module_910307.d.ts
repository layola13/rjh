/**
 * Module: module_910307
 * Original ID: 910307
 * 
 * This module exports a React component that wraps an icon with forwarded ref support.
 */

import React from 'react';

/**
 * Props for the icon component.
 * Extends standard SVG element properties.
 */
export interface IconComponentProps extends React.SVGProps<SVGSVGElement> {
  /**
   * Additional CSS class name
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
   * Custom style object
   */
  style?: React.CSSProperties;
  
  /**
   * Additional props passed to the underlying icon component
   */
  [key: string]: any;
}

/**
 * A forwarded ref icon component.
 * 
 * @param props - Component props including SVG attributes
 * @param ref - Forwarded ref to the SVG element
 * @returns React element representing the icon
 * 
 * @example
 *