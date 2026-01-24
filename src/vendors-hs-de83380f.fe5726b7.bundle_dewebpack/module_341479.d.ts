/**
 * React Icon Component Module
 * 
 * This module exports a React component that wraps an icon with forwarded ref support.
 * The component accepts all standard icon props and passes them to the underlying icon implementation.
 */

import * as React from 'react';

/**
 * Props interface for the Icon component
 * Extends standard React SVG attributes and supports custom icon properties
 */
export interface IconComponentProps extends React.SVGAttributes<SVGElement> {
  /**
   * Icon size in pixels or as a string with units
   * @default 16
   */
  size?: number | string;
  
  /**
   * Icon color, accepts any valid CSS color value
   */
  color?: string;
  
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Inline style overrides
   */
  style?: React.CSSProperties;
  
  /**
   * ARIA label for accessibility
   */
  'aria-label'?: string;
  
  /**
   * Additional props passed to the underlying icon component
   */
  [key: string]: unknown;
}

/**
 * Icon component with forwarded ref support
 * 
 * @example
 *