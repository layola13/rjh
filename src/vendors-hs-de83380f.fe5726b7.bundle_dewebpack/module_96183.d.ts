import React from 'react';

/**
 * Props for the icon component
 * Extends standard SVG element attributes
 */
export interface IconComponentProps extends React.SVGAttributes<SVGElement> {
  /**
   * Icon size
   */
  size?: number | string;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Custom class name
   */
  className?: string;
  
  /**
   * Custom style object
   */
  style?: React.CSSProperties;
  
  /**
   * Icon data object (internal)
   */
  icon?: unknown;
}

/**
 * Forward ref type for the icon component
 */
export type IconComponentRef = SVGSVGElement;

/**
 * Icon component created with forwardRef
 * Renders an SVG icon with forwarded ref support
 * 
 * @example
 *