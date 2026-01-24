/**
 * Module: module_149865
 * Original ID: 149865
 * 
 * React icon component wrapper that creates a forwarded ref component
 * using a base icon implementation.
 */

import type * as React from 'react';

/**
 * Props for the icon component.
 * Extends standard React component props with icon-specific properties.
 */
export interface IconComponentProps extends React.SVGAttributes<SVGElement> {
  /**
   * Size of the icon (width and height)
   */
  size?: string | number;
  
  /**
   * Color of the icon
   */
  color?: string;
  
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Icon-specific data or configuration
   */
  icon?: unknown;
  
  /**
   * Any additional props
   */
  [key: string]: unknown;
}

/**
 * Icon component type with forwarded ref support.
 * Accepts IconComponentProps and forwards refs to the underlying DOM element.
 */
export type IconComponent = React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGSVGElement>
>;

/**
 * Default export: A React component that renders an icon with forwarded ref support.
 * 
 * @example
 *