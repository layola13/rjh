/**
 * Module: module_100899
 * Original ID: 100899
 * 
 * A React component that wraps a default icon component with forwarded refs.
 */

import type React from 'react';

/**
 * Props for the icon component.
 * Extends standard HTML attributes and custom icon properties.
 */
export interface IconComponentProps extends React.SVGAttributes<SVGSVGElement> {
  /**
   * Custom className for styling
   */
  className?: string;
  
  /**
   * Icon size in pixels or CSS unit
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
   * Icon rotation in degrees
   */
  rotate?: number;
  
  /**
   * Spin animation flag
   */
  spin?: boolean;
  
  [key: string]: unknown;
}

/**
 * Icon component type with forwarded ref support.
 * Renders an SVG icon element with customizable properties.
 */
declare const IconComponent: React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGSVGElement>
>;

export default IconComponent;