/**
 * React icon component that wraps a base icon implementation
 * Module: module_920497
 * Original ID: 920497
 */

import * as React from 'react';

/**
 * Props for the icon component
 * Extends all standard React SVG attributes
 */
export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  /**
   * Icon size in pixels
   */
  size?: number | string;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * CSS class name
   */
  className?: string;
  
  /**
   * Inline style object
   */
  style?: React.CSSProperties;
  
  /**
   * Additional props spread to the root SVG element
   */
  [key: string]: unknown;
}

/**
 * Icon component with forwarded ref support
 * 
 * @param props - Icon component props
 * @param ref - Forwarded ref to the underlying SVG element
 * @returns Rendered icon component
 */
declare const IconComponent: React.ForwardRefExoticComponent<
  IconProps & React.RefAttributes<SVGSVGElement>
>;

export default IconComponent;