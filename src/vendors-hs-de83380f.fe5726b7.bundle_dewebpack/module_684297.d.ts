/**
 * Module: module_684297
 * Original ID: 684297
 * 
 * A React component that renders an icon using a forwardRef pattern.
 * This module exports a forwarded ref component that wraps an icon component.
 */

import type React from 'react';

/**
 * Props for the icon component.
 * Extends standard React component props and SVG attributes.
 */
export interface IconComponentProps extends React.SVGProps<SVGSVGElement> {
  /**
   * Optional CSS class name
   */
  className?: string;
  
  /**
   * Optional inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Icon size (width and height)
   */
  size?: number | string;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Additional props passed to the underlying component
   */
  [key: string]: unknown;
}

/**
 * Icon component with forwarded ref support.
 * 
 * @param props - Component props including standard SVG attributes
 * @param ref - Forwarded ref to the underlying SVG element
 * @returns A React element representing the icon
 * 
 * @example
 *