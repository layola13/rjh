/**
 * Icon Component Module
 * 
 * A React component that wraps an icon with forwarded ref support.
 * This module provides a reusable icon component built on top of a base icon component.
 */

import * as React from 'react';

/**
 * Props for the icon component
 * Extends standard SVG element attributes
 */
export interface IconProps extends React.SVGProps<SVGSVGElement> {
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
   * Additional inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Icon data/path definition
   * @internal
   */
  icon?: unknown;
}

/**
 * Icon component with forwarded ref support
 * 
 * @example
 *